// lib/search/text.ts
//
// How text becomes search tokens: the same functions run over the pages when the index is built
// and over what the visitor types, so the two sides always agree.
//
// WHAT "AGREE" HAS TO COVER on this site, in order of how often it bites:
//
//   1. Spelling. A hospital in India writes "Paediatrics", "Gynaecology", "Anaesthesia";
//      patients type "pediatrics", "gynecology", "anesthesia", and misspell all of them.
//      British and American forms are folded together here; misspellings are the engine's job
//      (it matches within a small edit distance).
//   2. Script. The pages exist in English, Hindi (Devanagari) and Punjabi (Gurmukhi), and a
//      large share of patients type Hindi or Punjabi in English letters: "bukhar", "pet dard",
//      "dant". Nobody agrees on that spelling ("bukhar", "bukhaar", "bukhaar"), so it cannot be
//      matched letter for letter. phoneticKey() reduces a word, in any of the three scripts, to
//      its consonants, so "bukhar", "bukhaar" and "बुखार" all become the same key.
//   3. Word breaks. "x ray", "x-ray" and "xray" are one word to a patient; the engine joins
//      neighbouring tokens (see engine.ts) and the index stores the joined form.
//
// Pure functions, no imports: this file ships to the browser inside the search bundle.

export type Script = 'latin' | 'devanagari' | 'gurmukhi'

/** Filler that carries no meaning in a hospital catalogue. Kept short so it never eats "a" out of "vitamin a". */
export const STOP_WORDS = new Set([
  'and', 'the', 'of', 'for', 'in', 'at', 'to', 'a', 'an', 'or', 'with', 'my', 'me',
  'i', 'is', 'are', 'do', 'does', 'need', 'want', 'looking', 'find', 'search', 'show',
  'please', 'near', 'any', 'can', 'how', 'what', 'where', 'when', 'which', 'on', 'it',
  // The same filler in Hindi and Punjabi typed in English letters ("pet mein dard", "dil ka doctor").
  'mein', 'ka', 'ki', 'ke', 'ko', 'se', 'hai', 'hain', 'kya', 'kaise', 'chahiye', 'mujhe', 'mera',
  'meri', 'mere', 'aur', 'ya', 'par', 'bhi', 'ho', 'raha', 'rahi', 'hota', 'hoti', 'wala', 'wali',
  'karwana', 'karana', 'karna', 'karni', 'karwani', 'karu', 'karun', 'kare', 'kijiye', 'dikhana',
  'dikhani', 'dikhao', 'chahta', 'chahti', 'chahte', 'lena', 'dena', 'milegi', 'milega', 'gaya', 'gayi',
  'hoga', 'hogi', 'jana', 'jaana',
  // Plain English function words: "i want to see a doctor for my knees".
  'am', 'be', 'been', 'was', 'were', 'has', 'have', 'had', 'having', 'his', 'her', 'him', 'she', 'he',
  'they', 'them', 'their', 'your', 'you', 'we', 'our', 'us', 'this', 'that', 'these', 'those', 'there',
  'from', 'into', 'by', 'as', 'if', 'so', 'but', 'very', 'too', 'also', 'just', 'get', 'got', 'see',
  'seeing', 'go', 'going', 'take', 'taking', 'give', 'best', 'good', 'will', 'would', 'should', 'could',
  'tell', 'let', 'know', 'like',
  // The same kind of filler in Hindi and Punjabi: "and", "of", "in", "is", "for".
  'एवं', 'और', 'के', 'का', 'की', 'में', 'है', 'हैं', 'को', 'से', 'लिए', 'ਅਤੇ', 'ਦੇ', 'ਦਾ', 'ਦੀ',
  'ਵਿੱਚ', 'ਹੈ', 'ਨੂੰ', 'ਲਈ', 'ਤੋਂ',
])

/* -------------------------------------------------------------------------- */
/* Normalisation                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Lowercase, strip Latin accents, and reduce anything that is not a letter, a combining mark
 * or a digit to a space. Letters of ANY script survive: Hindi and Punjabi words are kept
 * whole, vowel signs and all (those are combining marks, hence \p{M}).
 */
export function normalise(value: string): string {
  return value
    // "can't" is one word, and "women's" is "womens": drop the apostrophe, do not split on it.
    .replace(/['’‘`]/g, '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, ' ')
    .trim()
}

/** Words whose British spelling differs from the American in a way "ae"/"oe" does not cover. */
const SPELLING: Record<string, string> = {
  colour: 'color',
  tumour: 'tumor',
  tumours: 'tumors',
  labour: 'labor',
  centre: 'center',
  litre: 'liter',
  programme: 'program',
  grey: 'gray',
  paralyse: 'paralyze',
  oesophagus: 'esophagus',
}

/**
 * One spelling for the British/American pairs that matter in medicine: paediatrics and
 * pediatrics, gynaecology and gynecology, anaesthesia and anesthesia, haemoglobin and
 * hemoglobin, diarrhoea and diarrhea, oedema and edema, orthopaedic and orthopedic.
 */
export function canon(token: string): string {
  if (!/^[a-z]+$/.test(token)) return token
  const mapped = SPELLING[token]
  if (mapped) return mapped
  if (token.length < 5) return token
  return token.replace(/ae/g, 'e').replace(/oe/g, 'e')
}

/** The words of a string: normalised, split, British/American folded. Stop words are kept (callers drop them). */
export function words(value: string): string[] {
  const out: string[] = []
  for (const raw of normalise(value).split(' ')) {
    if (raw) out.push(canon(raw))
  }
  return out
}

/**
 * The words that carry meaning: stop words dropped, unless that would leave nothing. Used for the
 * query AND for every phrase in the vocabulary, so "pet mein dard" and "पेट में दर्द" are compared
 * as "pet dard" and "पेट दर्द" on both sides.
 */
export function contentWords(value: string): string[] {
  const all = words(value)
  const kept = all.filter((word) => !STOP_WORDS.has(word))
  return kept.length > 0 ? kept : all
}

/**
 * Crude suffix stripping. Not a real stemmer: the vocabulary is medical, mostly proper nouns, and
 * the only inflections that show up are a plural, "-ing" and "-ed". Prefix matching in the engine
 * covers the rest (surgery, surgical, surgeon).
 */
export function stem(token: string): string {
  if (token.length <= 3 || !/^[a-z]+$/.test(token)) return token
  if (token.endsWith('ies') && token.length > 4) return `${token.slice(0, -3)}y`
  if (token.endsWith('sses')) return token.slice(0, -2)
  if (token.endsWith('ing') && token.length > 5) return token.slice(0, -3)
  if (token.endsWith('ed') && token.length > 5) return token.slice(0, -2)
  if (token.endsWith('es') && token.length > 4) return token.slice(0, -2)
  if (token.endsWith('s') && !token.endsWith('ss') && !token.endsWith('us') && !token.endsWith('is')) {
    return token.slice(0, -1)
  }
  return token
}

export function scriptOf(token: string): Script {
  for (const char of token) {
    const code = char.codePointAt(0) ?? 0
    if (code >= 0x0900 && code <= 0x097f) return 'devanagari'
    if (code >= 0x0a00 && code <= 0x0a7f) return 'gurmukhi'
    if ((code >= 0x61 && code <= 0x7a) || (code >= 0x30 && code <= 0x39)) return 'latin'
  }
  return 'latin'
}

/* -------------------------------------------------------------------------- */
/* Phonetic key                                                                */
/* -------------------------------------------------------------------------- */

/**
 * The consonants of a word, in a script-independent form. Devanagari and Gurmukhi consonants map
 * to the letter an English speaker would type for them; aspirated and plain, retroflex and dental
 * all share one letter, because that is exactly what people do not distinguish when they type.
 * Vowels are dropped (everyone spells them differently) except a word-initial vowel, kept as "a".
 *
 *   बुखार, ਬੁਖ਼ਾਰ, bukhar, bukhaar, bukkhar   ->  bkr
 *   दर्द, ਦਰਦ, dard, dardh, darad            ->  drd
 */
const INDIC: Record<string, string> = {
  // Devanagari consonants
  क: 'k', ख: 'k', ग: 'g', घ: 'g', ङ: 'n', च: 'C', छ: 'C', ज: 'j', झ: 'j', ञ: 'n',
  ट: 't', ठ: 't', ड: 'd', ढ: 'd', ण: 'n', त: 't', थ: 't', द: 'd', ध: 'd', न: 'n',
  प: 'p', फ: 'p', ब: 'b', भ: 'b', म: 'm', य: 'y', र: 'r', ल: 'l', व: 'w', श: 'S',
  ष: 'S', स: 's', ह: 'h', ळ: 'l', क़: 'k', ख़: 'k', ग़: 'g', ज़: 'j', ड़: 'r', ढ़: 'r', फ़: 'p',
  // Devanagari independent vowels (only an initial one is kept)
  अ: 'a', आ: 'a', इ: 'a', ई: 'a', उ: 'a', ऊ: 'a', ऋ: 'a', ए: 'a', ऐ: 'a', ओ: 'a', औ: 'a', ऑ: 'a',
  // Gurmukhi consonants
  ਕ: 'k', ਖ: 'k', ਗ: 'g', ਘ: 'g', ਙ: 'n', ਚ: 'C', ਛ: 'C', ਜ: 'j', ਝ: 'j', ਞ: 'n',
  ਟ: 't', ਠ: 't', ਡ: 'd', ਢ: 'd', ਣ: 'n', ਤ: 't', ਥ: 't', ਦ: 'd', ਧ: 'd', ਨ: 'n',
  ਪ: 'p', ਫ: 'p', ਬ: 'b', ਭ: 'b', ਮ: 'm', ਯ: 'y', ਰ: 'r', ਲ: 'l', ਵ: 'w', ੜ: 'r', ਸ: 's', ਹ: 'h',
  ਸ਼: 'S', ਖ਼: 'k', ਗ਼: 'g', ਜ਼: 'j', ਫ਼: 'p', ਲ਼: 'l',
  // Gurmukhi independent vowels
  ੳ: 'a', ਅ: 'a', ੲ: 'a', ਆ: 'a', ਇ: 'a', ਈ: 'a', ਉ: 'a', ਊ: 'a', ਏ: 'a', ਐ: 'a', ਓ: 'a', ਔ: 'a',
}

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u'])

function latinKey(word: string): string {
  let s = word.replace(/[^a-z]/g, '')
  s = s
    .replace(/chh|ch/g, 'C')
    .replace(/sh/g, 'S')
    .replace(/ph/g, 'p')
    .replace(/kh/g, 'k')
    .replace(/gh/g, 'g')
    .replace(/th/g, 't')
    .replace(/dh/g, 'd')
    .replace(/bh/g, 'b')
    .replace(/jh/g, 'j')
    .replace(/ck/g, 'k')
    .replace(/x/g, 'ks')
    .replace(/q/g, 'k')
    .replace(/z/g, 'j')
    .replace(/f/g, 'p')
    .replace(/v/g, 'w')
    .replace(/c(?=[eiy])/g, 's')
    .replace(/c/g, 'k')

  let out = ''
  for (let i = 0; i < s.length; i += 1) {
    const ch = s[i]
    const next = s[i + 1] ?? ''
    if (VOWELS.has(ch)) {
      if (i === 0) out += 'a'
      continue
    }
    if (ch === 'y') {
      if (i === 0 && VOWELS.has(next)) out += 'y'
      continue
    }
    if (ch === 'h') {
      const previous = s[i - 1] ?? ''
      if (i === 0 || VOWELS.has(previous)) out += 'h'
      continue
    }
    // A nasal before another consonant is not a letter anyone agrees on: "ankh", "akh", "आँख".
    if ((ch === 'n' || ch === 'm') && next !== '' && !VOWELS.has(next) && next !== 'y' && next !== 'h') continue
    out += ch
  }
  return out
}

function indicKey(word: string): string {
  let out = ''
  for (const ch of word) {
    const mapped = INDIC[ch]
    if (!mapped) continue
    if (mapped === 'a') {
      if (out === '') out += 'a'
      continue
    }
    out += mapped
  }
  return out
}

/**
 * The phonetic key of one token, or '' when the word is too short to key safely. A two-letter
 * key matches far too much ("dt" is data, date, dental and दांत), so those words are handled by
 * the vocabulary's explicit spellings instead (see groups.ts).
 */
export function phoneticKey(token: string): string {
  if (!token) return ''
  const key = scriptOf(token) === 'latin' ? latinKey(token) : indicKey(token)
  const collapsed = key.replace(/(.)\1+/g, '$1').toLowerCase()
  return collapsed.length >= 3 ? collapsed : ''
}

/* -------------------------------------------------------------------------- */
/* Distance                                                                    */
/* -------------------------------------------------------------------------- */

/** Damerau-Levenshtein distance (a swap of two neighbours counts as one edit, as in a typo). */
export function editDistance(a: string, b: string, limit = 3): number {
  if (a === b) return 0
  const la = a.length
  const lb = b.length
  if (Math.abs(la - lb) > limit) return limit + 1
  if (la === 0) return lb
  if (lb === 0) return la

  let twoAgo: number[] = []
  let previous = Array.from({ length: lb + 1 }, (_, i) => i)
  for (let i = 1; i <= la; i += 1) {
    const current = [i]
    let rowMin = i
    for (let j = 1; j <= lb; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      let value = Math.min(current[j - 1] + 1, previous[j] + 1, previous[j - 1] + cost)
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        value = Math.min(value, twoAgo[j - 2] + 1)
      }
      current[j] = value
      if (value < rowMin) rowMin = value
    }
    if (rowMin > limit) return limit + 1
    twoAgo = previous
    previous = current
  }
  return previous[lb]
}

/** Length of the shared start of two strings. */
export function commonPrefix(a: string, b: string): number {
  const n = Math.min(a.length, b.length)
  let i = 0
  while (i < n && a[i] === b[i]) i += 1
  return i
}
