// lib/search/engine.ts
//
// The search engine: an in-memory index over a few hundred small documents, and a query pipeline
// built to ALWAYS return something useful. No dependencies, no network, runs in the browser (and on
// the server for the doctor directory's "did you mean").
//
// HOW A QUERY IS ANSWERED
//
//   1. The words are normalised exactly as the pages were (text.ts): British and American spellings
//      folded, plurals stemmed, any script kept whole.
//   2. Each word becomes a UNIT with alternatives: the word as typed; its synonyms from groups.ts
//      (English, Hindi, Punjabi, and Hindi or Punjabi typed in English letters); a joined form with its
//      neighbour ("x ray" and "xray"). A phrase in groups.ts ("pet dard") is one unit.
//   3. Each alternative is matched against the vocabulary loosely: the exact word, words that start
//      with it (as-you-type), a spelling mistake or two, and words that SOUND the same (phoneticKey), so
//      "bukhar", "bukhaar" and "बुखार", or "neurosergery" and "neurosurgery", find each other.
//   4. Every document is scored by how much of the query it covers and how well, with the title
//      counting most, then aliases and topics, then the sub-title, then the body text. Rare words
//      count for more than common ones ("knee" over "pain").
//   5. The list is shaped for a person: a condition brings its department with it, no department fills
//      the list, and anything that looks like an emergency pins the emergency card first.
//   6. If nothing matches at all, the answer is the places a patient can go from here (call, book, the
//      general doctor), never an empty box.
//
// Size: a few hundred documents and a few thousand words per language, so every query is a handful
// of dictionary lookups and a short scan. There is no need for anything cleverer, and nothing here
// is slow enough to debounce.

import { DISTRESS_PHRASES, EMERGENCY_PHRASES, GROUPS } from '@/lib/search/groups'
import { NOT_LISTED, PRIMARY, PRIMARY_WITH, QUALIFIERS, THINGS } from '@/lib/search/guide'
import type { DescriptionTrigger } from '@/lib/search/descriptions/types'
import { KNOWN_WORDS } from '@/lib/search/known-words'
import {
  commonPrefix,
  contentWords,
  editDistance,
  phoneticKey,
  scriptOf,
  stem,
  STOP_WORDS,
  words,
} from '@/lib/search/text'
import type {
  Guide,
  SearchDoc,
  SearchHit,
  SearchKind,
  SearchMode,
  SearchOptions,
  SearchResult,
} from '@/lib/search/types'

/* -------------------------------------------------------------------------- */
/* Weights                                                                     */
/* -------------------------------------------------------------------------- */

/** title, keys (aliases and topics), detail, text. */
const FIELD_WEIGHT = [1, 0.95, 0.5, 0.3] as const
const FIELD_COUNT = 4

const KIND_FACTOR: Record<SearchKind, number> = {
  doctor: 1,
  department: 1.12,
  test: 1.05,
  condition: 0.95,
  treatment: 0.88,
  faq: 0.8,
  info: 1,
  page: 1,
  action: 1,
}

/**
 * A section of a department page (a condition, a treatment, a question): it has a parent
 * department and is not itself a department. It brings its department with it into the results.
 */
function isChild(doc: SearchDoc): boolean {
  return doc.parent !== undefined && !doc.id.startsWith('svc:')
}

/** How many sections of one department one search may show, and how many sections in all. */
const CHILD_CAP_PER_PARENT = 2
const CHILD_CAP_TOTAL = 5

/* -------------------------------------------------------------------------- */
/* Synonym groups, parsed once                                                 */
/* -------------------------------------------------------------------------- */

interface Term {
  /** Normalised, folded and stemmed words. */
  words: string[]
  /** From the Hindi/Punjabi side of the group: also matched by sound. */
  indic: boolean
}

interface GroupDef {
  terms: Term[]
}

interface TermRef {
  group: number
  term: number
}

function stemmed(list: string[]): string[] {
  return list.map((word) => stem(word))
}

function parseGroup(line: string): GroupDef {
  const [english = '', local = ''] = line.split(';')
  const terms: Term[] = []
  for (const [side, indic] of [
    [english, false],
    [local, true],
  ] as const) {
    for (const raw of side.split('|')) {
      const list = stemmed(contentWords(raw))
      if (list.length > 0) terms.push({ words: list, indic })
    }
  }
  return { terms }
}

const GROUP_DEFS: GroupDef[] = GROUPS.map(parseGroup)

/* The guide's word lists, in the form the typed words take (canonical spelling, stemmed). */
const asTokens = (text: string) => stemmed(words(text))
const PRIMARY_SETS = new Map<string, Set<string>>(
  Object.entries(PRIMARY).map(([slug, list]) => [slug, new Set(asTokens(list))]),
)
const ALL_PRIMARY = new Set<string>([...PRIMARY_SETS.values()].flatMap((set) => [...set]))
const WITH_SETS = new Map<string, Set<string>>(
  Object.entries(PRIMARY_WITH).map(([slug, list]) => [slug, new Set(asTokens(list))]),
)
/** Words that ask for "a doctor" without saying which: they should not outweigh the complaint. */
const GENERIC_WORDS = new Set(asTokens('doctor doctors dr specialist specialists consultant treatment clinic centre center problem problems issue issues trouble dry cannot cant unable dont didnt doesnt isnt wasnt werent arent hasnt hadnt havent couldnt wouldnt shouldnt wont aint days day weeks week months month years year two three four five six seven'))
const QUALIFIER_SET = new Set(asTokens([...QUALIFIERS].join(' ')))
const THING_SET = new Set(asTokens([...THINGS].join(' ')))
const NOT_LISTED_ALL = new Set<string>(NOT_LISTED.flatMap((entry) => entry.words.flatMap((word) => asTokens(word))))
/** Every word of every synonym group, in every language and script, as typed words are compared. */
const ALL_GROUP_WORDS = new Set<string>(GROUP_DEFS.flatMap((group) => group.terms.flatMap((term) => term.words)))
const NOT_LISTED_WORDS = NOT_LISTED.flatMap((entry) => entry.words).filter((word) => /^[a-z]{6,}$/.test(word))
const NOT_LISTED_SETS = NOT_LISTED.map((entry) => ({
  key: entry.key,
  words: new Set(entry.words.flatMap((word) => asTokens(word))),
  pairs: (entry.pairs ?? []).map(([a, b]) => [asTokens(a)[0], asTokens(b)[0]] as const),
  unless: new Set((entry.unless ?? []).flatMap((word) => asTokens(word))),
}))

/** Single-word terms by exact word. */
const SINGLE = new Map<string, TermRef[]>()
/** Single-word Hindi/Punjabi terms by phonetic key. */
const SINGLE_KEY = new Map<string, TermRef[]>()
/** Multi-word terms by their first word (exact) and by its phonetic key. */
const PHRASE_FIRST = new Map<string, TermRef[]>()
const PHRASE_FIRST_KEY = new Map<string, TermRef[]>()

/** Single-word group terms in English letters, by length, for repairing a misspelt one ("mahari", "numbess"). */
const TERM_BY_LENGTH = new Map<number, { word: string; ref: TermRef }[]>()

function push(map: Map<string, TermRef[]>, key: string, ref: TermRef) {
  const list = map.get(key)
  if (list) list.push(ref)
  else map.set(key, [ref])
}

GROUP_DEFS.forEach((group, groupIndex) => {
  // The English words of the group. A Hindi/Punjabi-side spelling that is just the same English word
  // ("scan", "doppler") is matched as typed, never by sound: "skin" sounds like "scan" and is not it.
  const english = new Set(group.terms.filter((term) => !term.indic).map((term) => term.words.join(' ')))
  group.terms.forEach((term, termIndex) => {
    const ref = { group: groupIndex, term: termIndex }
    const first = term.words[0]
    if (term.words.length === 1) {
      push(SINGLE, first, ref)
      if (/^[a-z]{6,}$/.test(first)) {
        const bucket = TERM_BY_LENGTH.get(first.length)
        if (bucket) bucket.push({ word: first, ref })
        else TERM_BY_LENGTH.set(first.length, [{ word: first, ref }])
      }
      if (term.indic && !english.has(first)) {
        const key = phoneticKey(first)
        if (key) push(SINGLE_KEY, key, ref)
      }
    } else {
      push(PHRASE_FIRST, first, ref)
      if (term.indic && !english.has(term.words.join(' '))) {
        const key = phoneticKey(first)
        if (key) push(PHRASE_FIRST_KEY, key, ref)
      }
    }
  })
})

/** Whether a typed word is the same word as a term's word (exactly, or by sound for Hindi/Punjabi terms). */
function sameWord(typed: string, termWord: string, indic: boolean): boolean {
  if (typed === termWord) return true
  if (!indic) return false
  const key = phoneticKey(typed)
  return key !== '' && key === phoneticKey(termWord)
}

interface GroupMatch {
  group: number
  term: number
  /** How many typed words it covers. */
  length: number
}

/** Every group term that starts at typed word `at`. */
function groupMatchesAt(typed: string[], at: number): GroupMatch[] {
  const out: GroupMatch[] = []
  const word = typed[at]
  const seen = new Set<string>()
  const add = (ref: TermRef, length: number) => {
    const id = `${ref.group}:${ref.term}`
    if (seen.has(id)) return
    seen.add(id)
    out.push({ ...ref, length })
  }

  // By sound only for Hindi and Punjabi, which have no one spelling in English letters: a short
  // English word ("skin", "dent") is not matched to a word it merely sounds like. And a word that IS a
  // word of some group, as typed, is that word and nothing it merely sounds like: "tired" is not
  // "thyroid", "kahan" (where) is not "kuhni" (elbow), "thakan" (tiredness) is not "takhna" (ankle).
  const known = SINGLE.has(word) || PHRASE_FIRST.has(word)
  const sound = !known && (scriptOf(word) !== 'latin' || word.length >= 6) ? phoneticKey(word) : ''
  const phraseCandidates = [
    ...(PHRASE_FIRST.get(word) ?? []),
    ...(sound ? PHRASE_FIRST_KEY.get(sound) ?? [] : []),
  ]
  for (const ref of phraseCandidates) {
    const term = GROUP_DEFS[ref.group].terms[ref.term]
    if (at + term.words.length > typed.length) continue
    let ok = true
    for (let k = 0; k < term.words.length; k += 1) {
      if (!sameWord(typed[at + k], term.words[k], term.indic)) {
        ok = false
        break
      }
    }
    if (ok) add(ref, term.words.length)
  }

  for (const ref of SINGLE.get(word) ?? []) add(ref, 1)
  if (sound) for (const ref of SINGLE_KEY.get(sound) ?? []) add(ref, 1)

  // A word we do not know that is one letter away from exactly one group's word is that word, misspelt
  // ("mahari" for "mahwari", "numbess" for "numbness"). Two groups at the same distance: not guessed.
  if (out.length === 0 && /^[a-z]{6,}$/.test(word)) {
    const found = new Map<number, TermRef[]>()
    for (let size = word.length - 1; size <= word.length + 1; size += 1) {
      for (const entry of TERM_BY_LENGTH.get(size) ?? []) {
        if (entry.word[0] !== word[0] || entry.word === word) continue
        if (editDistance(word, entry.word, 1) > 1) continue
        const list = found.get(entry.ref.group)
        if (list) list.push(entry.ref)
        else found.set(entry.ref.group, [entry.ref])
      }
    }
    if (found.size === 1) for (const ref of [...found.values()][0]) add(ref, 1)
  }
  return out
}

/** Emergency phrases, each a list of words that must all be present in the query. */
interface EmergencyPhrase {
  words: string[]
  indic: boolean
}

/** Compiles "English ; Hindi/Punjabi" phrase lines. `keepFiller` keeps the little words (for distress). */
function compilePhrases(lines: readonly string[], keepFiller: boolean): EmergencyPhrase[] {
  return lines.flatMap((line) => {
    const [english = '', local = ''] = line.split(';')
    const out: EmergencyPhrase[] = []
    for (const [side, indic] of [
      [english, false],
      [local, true],
    ] as const) {
      for (const raw of side.split('|')) {
        const list = stemmed(keepFiller ? words(raw) : contentWords(raw))
        if (list.length > 0) out.push({ words: list, indic })
      }
    }
    return out
  })
}

const EMERGENCY: EmergencyPhrase[] = compilePhrases(EMERGENCY_PHRASES, false)
const DISTRESS: EmergencyPhrase[] = compilePhrases(DISTRESS_PHRASES, true)

function matchesPhrase(list: EmergencyPhrase[], typed: string[]): boolean {
  return list.some((phrase) => phrase.words.every((word) => typed.some((t) => sameWord(t, word, phrase.indic))))
}

function looksLikeEmergency(typed: string[]): boolean {
  return matchesPhrase(EMERGENCY, typed)
}

/* -------------------------------------------------------------------------- */
/* The index                                                                   */
/* -------------------------------------------------------------------------- */

/** The tokens to index for one field: stop words dropped, stemmed, plus joined neighbours for short fields. */
function fieldTokens(text: string | undefined, join: boolean): string[] {
  if (!text) return []
  const list = words(text).filter((word) => !STOP_WORDS.has(word))
  const out = list.map((word) => stem(word))
  if (join) {
    for (let i = 0; i + 1 < list.length; i += 1) {
      const a = list[i]
      const b = list[i + 1]
      if (/^[a-z0-9]+$/.test(a) && /^[a-z0-9]+$/.test(b) && a.length + b.length <= 18) {
        out.push(stem(a + b))
      }
    }
  }
  return out
}

export class SearchEngine {
  private readonly docs: SearchDoc[]
  /** token -> postings, each doc * FIELD_COUNT + field. */
  private readonly postings = new Map<string, number[]>()
  private readonly docFrequency = new Map<string, number>()
  private readonly sortedVocab: string[]
  private readonly byLength = new Map<number, string[]>()
  private readonly byKey = new Map<string, string[]>()
  private readonly titleNorm: string[]
  /** Index word -> the way it is spelt on the site (the index folds "gynaecology" to "gynecology"). */
  private readonly spelling = new Map<string, string>()
  private readonly serviceDoc = new Map<string, number>()
  private readonly describeIndexes = new WeakMap<
    readonly DescriptionTrigger[],
    Map<string, { id: string; exact: Set<string> }[]>
  >()
  private readonly emergencyDoc: number
  private readonly fallbackDocs: number[]
  private readonly popularDocs: number[]

  constructor(docs: SearchDoc[]) {
    this.docs = docs
    this.titleNorm = docs.map((doc) => stemmed(words(doc.title)).join(' '))

    docs.forEach((doc, docIndex) => {
      const fields = [
        fieldTokens(doc.title, true),
        fieldTokens(doc.keys, true),
        // A section's sub-title is only where it sits ("Gastroenterology › Conditions"); matching on it
        // would make every one of a department's sections answer a search for that department.
        isChild(doc) ? [] : fieldTokens(doc.detail, false),
        fieldTokens(doc.text, false),
      ]
      const seen = new Set<string>()
      fields.forEach((tokens, field) => {
        for (const token of tokens) {
          const code = docIndex * FIELD_COUNT + field
          const list = this.postings.get(token)
          if (list) {
            if (list[list.length - 1] !== code) list.push(code)
          } else {
            this.postings.set(token, [code])
          }
          if (!seen.has(token)) {
            seen.add(token)
            this.docFrequency.set(token, (this.docFrequency.get(token) ?? 0) + 1)
          }
        }
      })
      if (doc.id.startsWith('svc:')) this.serviceDoc.set(doc.id.slice(4), docIndex)
    })

    // How each word is really spelt, for showing a correction: a word in a title beats one in a keyword
    // list, and of two forms the shorter (the singular, "cancer" not "cancers") wins.
    const spellingFrom = new Map<string, 'title' | 'keys'>()
    for (const field of ['title', 'keys'] as const) {
      for (const doc of docs) {
        for (const raw of (doc[field] ?? '').split(/[^\p{L}\p{N}]+/u)) {
          if (raw.length < 4 || !/^[a-zA-Z]+$/.test(raw)) continue
          const key = stem(words(raw)[0] ?? '')
          if (!key) continue
          const have = this.spelling.get(key)
          const better =
            !have ||
            (field === 'title' && spellingFrom.get(key) === 'keys') ||
            (spellingFrom.get(key) === field && raw.length < have.length)
          if (better) {
            this.spelling.set(key, raw.toLowerCase())
            spellingFrom.set(key, field)
          }
        }
      }
    }

    this.sortedVocab = [...this.postings.keys()].sort()
    for (const token of this.sortedVocab) {
      const length = token.length
      const bucket = this.byLength.get(length)
      if (bucket) bucket.push(token)
      else this.byLength.set(length, [token])
      const key = phoneticKey(token)
      if (key) {
        const same = this.byKey.get(key)
        if (same) same.push(token)
        else this.byKey.set(key, [token])
      }
    }

    this.emergencyDoc = docs.findIndex((doc) => doc.role === 'emergency')
    this.fallbackDocs = docs
      .map((doc, index) => ({ index, order: doc.fallback ?? 0 }))
      .filter((entry) => entry.order > 0)
      .sort((a, b) => a.order - b.order)
      .map((entry) => entry.index)
    this.popularDocs = docs
      .map((doc, index) => ({ index, order: doc.pop ?? 0 }))
      .filter((entry) => entry.order > 0)
      .sort((a, b) => a.order - b.order)
      .map((entry) => entry.index)
  }

  get size(): number {
    return this.docs.length
  }

  /** How rare a word is, 1 for a word in one document down to about 0.1 for a word in all of them. */
  private idf(token: string): number {
    const df = this.docFrequency.get(token)
    if (!df) return 0.5
    return Math.log(1 + this.docs.length / df) / Math.log(1 + this.docs.length)
  }

  /* -------------------------------- candidates --------------------------------- */

  /** Index words that could be what was typed, each with how sure we are (1 is the exact word). */
  private candidates(token: string, loose: boolean, typing: boolean): Map<string, number> {
    const out = new Map<string, number>()
    const add = (word: string, weight: number) => {
      if (weight > (out.get(word) ?? 0)) out.set(word, weight)
    }

    if (this.postings.has(token)) add(token, 1)

    const indic = scriptOf(token) !== 'latin'
    const minPrefix = indic ? 2 : 3
    // A short word that is itself a word we have ("ent", "ear", "gas") is that word, not the start of
    // "entrance", "early", "gastro".
    const completesItself = token.length <= 4 && this.postings.has(token)
    if ((loose || token.length >= 5) && token.length >= minPrefix && !completesItself) {
      // Words that start with what was typed: the as-you-type case, and word families.
      let low = 0
      let high = this.sortedVocab.length
      while (low < high) {
        const mid = (low + high) >> 1
        if (this.sortedVocab[mid] < token) low = mid + 1
        else high = mid
      }
      let taken = 0
      for (let i = low; i < this.sortedVocab.length && taken < 60; i += 1) {
        const word = this.sortedVocab[i]
        if (!word.startsWith(token)) break
        if (word !== token) {
          add(word, typing ? 0.82 : 0.7)
          taken += 1
        }
      }
      // Typed a longer form of a word we have: "diabetic" for "diabet".
      for (let length = token.length - 1; length >= Math.max(4, Math.ceil(token.length * 0.7)); length -= 1) {
        const head = token.slice(0, length)
        if (this.postings.has(head)) add(head, 0.6)
      }
    }

    if (!loose) return out
    // "skin" is a word we have; it is not a misspelling of "scan", whatever it sounds like.
    if (this.postings.has(token)) return out

    // A spelling mistake or two.
    const length = token.length
    const limit = length >= 8 ? 2 : length >= 5 ? 1 : length === 4 ? 1 : 0
    if (limit > 0) {
      for (let size = length - limit; size <= length + limit; size += 1) {
        for (const word of this.byLength.get(size) ?? []) {
          if (word === token) continue
          if (length === 4 && word[0] !== token[0]) continue
          const distance = editDistance(token, word, limit)
          if (distance <= limit) add(word, distance === 1 ? 0.66 : 0.5)
        }
      }
    }

    // The index holds stems ("bloat"), the visitor types whole words ("bloaitng"): compare against the
    // common endings put back, so a slip in a word that is normally typed with one is still repaired.
    if (length >= 6) {
      for (const ending of ['ing', 'ed', 'es', 's', 'er']) {
        for (let size = length - ending.length - 1; size <= length - ending.length + 1; size += 1) {
          for (const word of this.byLength.get(size) ?? []) {
            if (word[0] !== token[0] || word.length < 4) continue
            if (editDistance(token, word + ending, 1) <= 1) add(word, 0.66)
          }
        }
      }
    }

    // Words that sound the same, in any script. Short English-letter words collide too often to trust.
    const key = indic || token.length >= 4 ? phoneticKey(token) : ''
    if (key) {
      for (const word of this.byKey.get(key) ?? []) {
        if (word !== token) add(word, 0.55)
      }
    }

    // A long shared start: "surgeon" and "surgery".
    if (length >= 6) {
      const first = token.slice(0, 3)
      let low = 0
      let high = this.sortedVocab.length
      while (low < high) {
        const mid = (low + high) >> 1
        if (this.sortedVocab[mid] < first) low = mid + 1
        else high = mid
      }
      for (let i = low; i < this.sortedVocab.length; i += 1) {
        const word = this.sortedVocab[i]
        if (!word.startsWith(first)) break
        if (word.length < 5) continue
        const shared = commonPrefix(token, word)
        if (shared >= 5 && shared >= Math.min(token.length, word.length) * 0.7) add(word, 0.45)
      }
    }
    return out
  }

  /**
   * Per document, how well one word matches: the best of its candidates in the best field. `strong`
   * is the set of documents where the match is in the title or the aliases and topics, as opposed to
   * a passing mention in the body text.
   */
  private tokenScores(
    token: string,
    loose: boolean,
    typing: boolean,
    cache: Map<string, Scored>,
  ): Scored {
    const cacheKey = `${loose ? 1 : 0}${typing ? 1 : 0}${token}`
    const cached = cache.get(cacheKey)
    if (cached) return cached

    const scores = new Map<number, number>()
    const strong = new Set<number>()
    for (const [word, weight] of this.candidates(token, loose, typing)) {
      const strength = 0.25 + 0.75 * this.idf(word)
      for (const code of this.postings.get(word) ?? []) {
        const doc = Math.floor(code / FIELD_COUNT)
        const field = code % FIELD_COUNT
        const value = weight * FIELD_WEIGHT[field] * strength
        if (value > (scores.get(doc) ?? 0)) scores.set(doc, value)
        if (field <= 1 && weight >= 0.55) strong.add(doc)
      }
    }
    const result = { scores, strong }
    cache.set(cacheKey, result)
    return result
  }

  /** Per document, how well an alternative (one word, or several that must all be there) matches. */
  private altScores(alt: Alt, typing: boolean, cache: Map<string, Scored>): Scored {
    const parts = alt.tokens.map((token) => this.tokenScores(token, alt.loose, typing, cache))
    if (parts.length === 1) {
      if (alt.weight === 1) return parts[0]
      const scaled = new Map<number, number>()
      for (const [doc, value] of parts[0].scores) scaled.set(doc, value * alt.weight)
      return { scores: scaled, strong: parts[0].strong }
    }
    const ordered = [...parts].sort((x, y) => x.scores.size - y.scores.size)
    const [smallest, ...others] = ordered
    const scores = new Map<number, number>()
    const strong = new Set<number>()
    for (const [doc, first] of smallest.scores) {
      let total = first
      let ok = true
      let allStrong = smallest.strong.has(doc)
      for (const other of others) {
        const value = other.scores.get(doc)
        if (value === undefined) {
          ok = false
          break
        }
        total += value
        if (!other.strong.has(doc)) allStrong = false
      }
      if (ok) {
        scores.set(doc, (total / parts.length) * alt.weight)
        if (allStrong) strong.add(doc)
      }
    }
    return { scores, strong }
  }

  /* ---------------------------------- query ------------------------------------ */

  private buildUnits(typed: string[]): Unit[] {
    const units: Unit[] = []
    let at = 0
    while (at < typed.length) {
      const word = typed[at]
      const matches = groupMatchesAt(typed, at)
      const longest = matches.reduce((max, match) => Math.max(max, match.length), 1)
      const consumed = typed.slice(at, at + longest)

      const alts: Alt[] = [{ tokens: consumed, weight: 1, loose: true }]
      // The two words side by side in a title or topic ("neck pain") beat the same two words found apart.
      if (consumed.length === 2) {
        const together = stem(consumed[0] + consumed[1])
        if (this.postings.has(together)) alts.push({ tokens: [together], weight: 1.04, loose: false })
      }
      // "kidney problem": a phrase that means the kidney, with a generic word along for the ride. The
      // kidney alone is a (nearly) full answer.
      if (consumed.length > 1) {
        const core = consumed.filter((word) => !GENERIC_WORDS.has(word))
        if (core.length > 0 && core.length < consumed.length) alts.push({ tokens: core, weight: 0.92, loose: true })
      }

      // "x ray" typed with a space and indexed without one, or the other way round.
      if (longest === 1 && at + 1 < typed.length) {
        const joined = stem(word + typed[at + 1])
        if (this.postings.has(joined)) {
          const pair = Math.max(this.idf(stem(word)), this.idf(stem(typed[at + 1])))
          const pairAlts: Alt[] = [
            { tokens: [joined], weight: 0.95, loose: false },
            { tokens: [word, typed[at + 1]], weight: 1, loose: true },
          ]
          // "kidney problem": the kidney alone is nearly the whole answer when the other word is generic.
          if (GENERIC_WORDS.has(typed[at + 1]) && !GENERIC_WORDS.has(word)) pairAlts.push({ tokens: [word], weight: 0.92, loose: true })
          if (GENERIC_WORDS.has(word) && !GENERIC_WORDS.has(typed[at + 1])) pairAlts.push({ tokens: [typed[at + 1]], weight: 0.92, loose: true })
          units.push({
            alts: pairAlts,
            importance: 0.5 + 0.5 * pair,
            words: [word, typed[at + 1]],
          })
          at += 2
          continue
        }
      }

      const seenAlt = new Set<string>([consumed.join(' ')])
      for (const match of matches) {
        if (match.length !== longest) continue
        const group = GROUP_DEFS[match.group]
        group.terms.forEach((term, termIndex) => {
          if (termIndex === match.term) return
          const id = term.words.join(' ')
          if (seenAlt.has(id)) return
          seenAlt.add(id)
          alts.push({ tokens: term.words, weight: 0.8, loose: false })
          // A two-word phrase said in another language ("gardan dard") is the same two words as a title or topic that
          // has them side by side ("neck pain"): that page beats one that only has both words somewhere.
          if (consumed.length === 2 && term.words.length === 2 && /^[a-z]+$/.test(term.words[0] + term.words[1])) {
            const together = stem(term.words[0] + term.words[1])
            if (this.postings.has(together)) alts.push({ tokens: [together], weight: 0.85, loose: false })
          }
        })
      }

      const known = consumed.map((token) => this.idf(token))
      units.push({
        alts,
        importance: 0.5 + 0.5 * Math.max(...known),
        words: consumed,
      })
      at += longest
    }
    // "dant kharab ka doctor": the tooth is the question, the doctor is not. A generic word beside a
    // specific one counts for less, or it pulls every doctor's page above the department.
    const generic = (unit: Unit) => unit.words.every((word) => GENERIC_WORDS.has(word))
    if (units.some((unit) => !generic(unit))) {
      for (const unit of units) {
        if (generic(unit)) {
          unit.importance *= 0.3
          unit.generic = true
        }
      }
    }
    return units
  }

  search(query: string, options: SearchOptions = {}): SearchResult {
    const limit = options.limit ?? 8
    const kinds = options.kinds ? new Set<SearchKind>(options.kinds) : undefined

    const everyWord = words(query)
    const typing = !/\s$/.test(query)
    let typed = everyWord.filter((word) => !STOP_WORDS.has(word)).map((word) => stem(word))
    if (typed.length === 0) typed = everyWord.map((word) => stem(word))
    if (typed.length === 0) return { mode: 'none', hits: [], terms: [], emergency: false }
    // "best doctor for pregnancy in Hisar": where we are is not what is being asked for.
    const without = typed.filter((word) => !CONTEXT_WORDS.has(word))
    if (without.length > 0) typed = without

    const terms = everyWord.filter((word) => word.length >= 2 && !STOP_WORDS.has(word))
    const emergency = this.emergencyDoc >= 0 && looksLikeEmergency(typed)

    // Someone saying they want to die or hurt themselves gets the emergency card and the phone number, and
    // nothing else: no department, no "closest match". Judged on every word typed, filler included.
    if (this.emergencyDoc >= 0 && matchesPhrase(DISTRESS, everyWord.map((word) => stem(word)))) {
      const card = this.toHit(this.emergencyDoc, 99, false)
      card.emergency = true
      // The hospital's own numbers first, then the national helplines (checked against the Government of
      // India's own pages: Tele-MANAS, KIRAN and the 112 emergency number).
      const extra = ['action:call', 'action:helpline-telemanas', 'action:helpline-kiran', 'action:helpline-112']
        .map((id) => this.docs.findIndex((doc) => doc.id === id))
        .filter((index) => index >= 0)
        .map((index) => this.toHit(index, 98, false))
      return { mode: 'match', hits: [card, ...extra], terms, emergency: true, distress: true }
    }

    const cache = new Map<string, Scored>()
    const units = this.buildUnits(typed)
    const lastUnit = units[units.length - 1]

    const scored: { map: Map<number, number>; importance: number; generic: boolean }[] = []
    const strongDocs = new Set<number>()
    /** For each document, in how many of the question's words it is ABOUT the word (title or topic). */
    const strongUnits = new Map<number, number>()
    let droppedImportance = 0
    let allImportance = 0
    for (const unit of units) {
      const isLast = unit === lastUnit && typing
      let map: Map<number, number> | undefined
      const strongHere = new Set<number>()
      for (const alt of unit.alts) {
        const found = this.altScores(alt, isLast, cache)
        for (const doc of found.strong) {
          strongDocs.add(doc)
          strongHere.add(doc)
        }
        if (!map) {
          map = new Map(found.scores)
        } else {
          for (const [doc, value] of found.scores) {
            if (value > (map.get(doc) ?? 0)) map.set(doc, value)
          }
        }
      }
      allImportance += unit.importance
      if (!unit.generic) for (const doc of strongHere) strongUnits.set(doc, (strongUnits.get(doc) ?? 0) + 1)
      // A word that matches nothing anywhere (a typo past repair, a name we do not have) does not
      // sink the rest of the query; the rest is answered, and the answer is marked as a close match.
      if (map && map.size > 0) scored.push({ map, importance: unit.importance, generic: unit.generic === true })
      else droppedImportance += unit.importance
    }

    // What must be covered is the specific words; a generic one ("doctor") adds to the score when it is
    // there and costs nothing when it is not.
    const totalImportance = scored.reduce((sum, unit) => sum + (unit.generic ? 0 : unit.importance), 0) || 1
    const accumulated = new Map<number, { score: number; covered: number }>()
    for (const { map, importance, generic } of scored) {
      for (const [doc, value] of map) {
        const entry = accumulated.get(doc)
        const covered = generic ? 0 : importance
        if (entry) {
          entry.score += value * importance
          entry.covered += covered
        } else {
          accumulated.set(doc, { score: value * importance, covered })
        }
      }
    }

    const query1 = typed.join(' ')
    const ranked: { doc: number; rank: number; coverage: number; average: number }[] = []
    for (const [doc, entry] of accumulated) {
      const record = this.docs[doc]
      if (kinds && !kinds.has(record.kind)) continue
      const coverage = entry.covered / totalImportance
      const average = entry.score / totalImportance
      let bonus = 0
      const title = this.titleNorm[doc]
      if (query1.length >= 3) {
        if (title === query1) bonus = 0.6
        else if (title.startsWith(query1)) bonus = 0.35
        else if (title.includes(query1)) bonus = 0.15
      }
      // A section of a page ("X-ray" under Ortho) is worth less than the page about it, and an exact
      // title match on a section is worth less than on a page: otherwise the same one-word section,
      // repeated on a dozen departments, outranks the department it is about.
      const child = isChild(record)
      const rank =
        (average * (0.2 + 0.8 * coverage * coverage) + (child ? bonus * 0.4 : bonus)) *
        KIND_FACTOR[record.kind] *
        (child ? 0.85 : 1) *
        (record.boost ?? 1)
      ranked.push({ doc, rank, coverage, average })
    }
    ranked.sort(
      (a, b) =>
        b.rank - a.rank ||
        this.docs[a.doc].title.length - this.docs[b.doc].title.length ||
        a.doc - b.doc,
    )

    // Everything the query asked for beats a partial answer, but a partial answer is kept when
    // there is not enough of the first kind.
    // ...but only when those full answers are also ABOUT every word: a page that merely mentions "pregnancy" and
    // "swelling" in passing does not outrank the pregnancy department just for containing both.
    const specific = scored.filter((unit) => !unit.generic).length
    const full = ranked.filter((entry) => entry.coverage >= 0.999 && (strongUnits.get(entry.doc) ?? 0) >= specific)
    const all = full.length >= 3 && full[0].rank >= ranked[0].rank * 0.85 ? full : ranked
    // Pages that are ABOUT the words (a title, an alias or a topic matches) come before pages that merely
    // mention them in passing. The passing mentions are kept only when there are too few of the first.
    const aboutIt = all.filter((entry) => strongDocs.has(entry.doc))
    const base = aboutIt.length >= 3 ? aboutIt : all
    // Weak company is dropped when there is a clear best: the rest of the list is things that
    // matched a word in passing.
    const floor = (base[0]?.rank ?? 0) * 0.38
    const candidates = base.filter((entry, index) => index < 3 || entry.rank >= floor).slice(0, 80)

    const hits = this.shape(candidates, limit, emergency)
    // What the results page needs to decide whether a row is an answer: whether it covers the whole question
    // and whether it is about the words (a title or a topic), not a passing mention.
    const rankedById = new Map(ranked.map((entry) => [this.docs[entry.doc].id, entry]))
    for (const hit of hits) {
      const entry = rankedById.get(hit.id)
      if (entry) {
        hit.coverage = entry.coverage
        hit.strong = strongDocs.has(entry.doc)
      }
    }

    let mode: SearchMode = 'match'
    if (hits.length === 0) {
      mode = 'none'
    } else {
      const top = candidates[0]
      // A close match, said as such, when: part of the question matched nothing, or the best hit
      // covers little of it, or none of the best hits matches in a title or a topic (a word that only
      // appears in passing in the body of a page).
      const hitDocs = candidates.slice(0, 3).map((entry) => entry.doc)
      const anyStrong = hitDocs.some((doc) => strongDocs.has(doc))
      // Only fragments of pages (a line in a list, a question) among the best hits: a word that is
      // mentioned somewhere, not a page about it.
      const onlyFragments = hitDocs.every((doc) => isChild(this.docs[doc]))
      if (
        top &&
        (top.coverage < 0.7 ||
          top.average < 0.42 ||
          !anyStrong ||
          onlyFragments ||
          (allImportance > 0 && droppedImportance / allImportance >= 0.45))
      ) {
        mode = 'weak'
      }
    }

    if (emergency && this.emergencyDoc >= 0) {
      const card = this.toHit(this.emergencyDoc, 99, false)
      card.emergency = true
      const rest = hits.filter((hit) => hit.id !== card.id && hit.id !== 'svc:emergency-services')
      return { mode: 'match', hits: [card, ...rest].slice(0, Math.max(limit, 1)), terms, emergency: true }
    }

    if (mode === 'none') {
      return { mode, hits: this.fallbackHits(kinds, limit), terms, emergency: false }
    }
    if (mode === 'weak') {
      // A close match is shown with a few of its best, and always with the way out: the places a
      // patient can go when what they typed is not on the site.
      const have = new Set(hits.map((hit) => hit.id))
      const close = hits.slice(0, Math.max(3, limit - 3))
      const ways = this.fallbackHits(kinds, 6).filter((hit) => !have.has(hit.id)).slice(0, limit - close.length)
      return { mode, hits: [...close, ...ways], terms, emergency: false }
    }
    return { mode, hits, terms, emergency: false }
  }

  /** Orders the list for a person: a section brings its department, and no department fills the list. */
  private shape(
    candidates: { doc: number; rank: number }[],
    limit: number,
    pinnedEmergency: boolean,
  ): SearchHit[] {
    const out: SearchHit[] = []
    const placed = new Set<number>()
    const perParent = new Map<string, number>()
    const childTitles = new Set<string>()
    let children = 0

    const place = (doc: number, score: number, inferred: boolean) => {
      if (placed.has(doc)) return
      placed.add(doc)
      out.push({ ...this.toHit(doc, score, inferred) })
    }

    for (const { doc, rank } of candidates) {
      if (out.length >= limit) break
      const record = this.docs[doc]
      if (pinnedEmergency && record.id === 'svc:emergency-services') continue
      if (isChild(record) && record.parent) {
        const used = perParent.get(record.parent) ?? 0
        if (used >= CHILD_CAP_PER_PARENT || children >= CHILD_CAP_TOTAL) continue
        // The same line on several departments ("X-ray", "Blood tests") is shown once.
        if (childTitles.has(this.titleNorm[doc])) continue
        childTitles.add(this.titleNorm[doc])
        const parentDoc = this.serviceDoc.get(record.parent)
        if (parentDoc !== undefined && !placed.has(parentDoc)) {
          if (out.length + 2 > limit) continue
          place(parentDoc, rank, true)
        }
        perParent.set(record.parent, used + 1)
        children += 1
      }
      place(doc, rank, false)
    }
    return out
  }

  private toHit(doc: number, score: number, inferred: boolean): SearchHit {
    const record = this.docs[doc]
    return {
      id: record.id,
      kind: record.kind,
      title: record.title,
      detail: record.detail,
      href: record.href,
      external: record.external,
      parent: record.parent,
      score,
      inferred: inferred || undefined,
      lists: record.lists,
      answer: record.kind === 'faq' ? record.text : undefined,
    }
  }

  /** The lines of one section of one page, as written there: ("ultrasound", "prep") is its "Preparing" list. */
  lines(slug: string, prefix: string): SearchHit[] {
    const out: SearchHit[] = []
    this.docs.forEach((record, index) => {
      if (record.parent === slug && record.id.startsWith(prefix) && /^\d+:/.test(record.id.slice(prefix.length))) {
        out.push(this.toHit(index, 0, false))
      }
    })
    return out
  }

  /** The places a patient can go when nothing matched. */
  private fallbackHits(kinds: Set<SearchKind> | undefined, limit: number): SearchHit[] {
    const picked = this.fallbackDocs.filter((doc) => !kinds || kinds.has(this.docs[doc].kind))
    const list = picked.length > 0 ? picked : this.fallbackDocs
    return list.slice(0, limit).map((doc) => this.toHit(doc, 0, false))
  }

  /** What to offer before anything is typed. */
  /**
   * The query with its misspelt English words put right ("neurosergery" becomes "neurosurgery"), or null
   * when nothing needed correcting. For the results page's "Showing results for". Only a word that is not
   * one we know, is not the start of one, and is a spelling mistake or a sound-alike of one that is, gets
   * changed; short words, names in other scripts and anything that already matches are left alone.
   */
  /**
   * What the results page may say about this question. See lib/search/guide.ts for the rule and why it is
   * stricter than the search: a sentence naming a department is a claim, a result list is not.
   */
  guide(query: string): Guide {
    const everyWord = words(query)
    let typed = everyWord.filter((word) => !STOP_WORDS.has(word)).map((word) => stem(word))
    if (typed.length === 0) return { kind: 'none' }
    const without = typed.filter((word) => !CONTEXT_WORDS.has(word))
    if (without.length > 0) typed = without
    const typedSet = new Set(typed)

    // 1. A subject this site has no department for.
    for (const entry of NOT_LISTED_SETS) {
      if ([...entry.unless].some((word) => typedSet.has(word))) continue
      const near = (word: string) =>
        entry.words.has(word) ||
        (word.length >= 6 && [...entry.words].some((anchor) => anchor.length >= 6 && anchor[0] === word[0] && editDistance(word, anchor, 1) <= 1))
      if (typed.some(near) || entry.pairs.some(([a, b]) => typedSet.has(a) && typedSet.has(b))) {
        return { kind: 'notListed', key: entry.key }
      }
    }

    const found = this.search(query, { limit: 12 })
    const pages = found.hits.filter((hit) => !hit.inferred && !hit.emergency && !isChildId(hit.id))

    // 2. The question is the name of one page.
    const needed = typed.filter((word) => !QUALIFIER_SET.has(word))
    if (needed.length > 0) {
      const named = pages
        .slice(0, 6)
        .filter((hit) => ['department', 'test', 'doctor', 'page', 'info'].includes(hit.kind))
        .filter((hit) => {
          const title = new Set(asTokens(hit.title))
          return needed.every((word) => title.has(word))
        })
      if (named.length === 1) return { kind: 'named', hit: named[0] }
    }

    // 3. Every meaningful word is a first-stop word of one department.
    const units = this.buildUnits(typed).map((unit) => {
      const singles = unit.alts.filter((alt) => alt.tokens.length === 1).map((alt) => alt.tokens[0])
      const qualifier =
        unit.words.every((word) => QUALIFIER_SET.has(word)) ||
        (singles.some((word) => QUALIFIER_SET.has(word)) && !singles.some((word) => ALL_PRIMARY.has(word)))
      return { typedWords: unit.words, alts: unit.alts, qualifier }
    })
    // A question about a test, a scan or a report is not a question about which doctor.
    if (units.some((unit) => unit.alts.some((alt) => alt.tokens.some((word) => THING_SET.has(word))))) {
      return { kind: 'none' }
    }
    const meaningful = units.filter((unit) => !unit.qualifier)
    if (meaningful.length === 0) return { kind: 'none' }
    // A word the site does not know at all (a slip the search repaired by guessing) is not something to
    // build a sentence on.
    const knownWord = (word: string) => this.postings.has(word) || SINGLE.has(word) || PHRASE_FIRST.has(word)
    if (meaningful.some((unit) => !unit.typedWords.some((word) => QUALIFIER_SET.has(word) || knownWord(word)))) {
      return { kind: 'none' }
    }

    /** 2: covered through the words as typed; 1: covered only through a synonym; 0: not covered. */
    const cover = (slug: string): 0 | 1 | 2 => {
      const primary = PRIMARY_SETS.get(slug)
      if (!primary) return 0
      const extra = WITH_SETS.get(slug)
      const covered = (words: Set<string>, unit: (typeof meaningful)[number]) => {
        const typedHere = unit.typedWords.filter((word) => !QUALIFIER_SET.has(word))
        const viaTyped = typedHere.length > 0 && typedHere.every((word) => words.has(word))
        const viaSynonym = unit.alts.some((alt) => {
          const core = alt.tokens.filter((word) => !QUALIFIER_SET.has(word))
          return core.length > 0 && core.every((word) => words.has(word))
        })
        return { viaTyped, viaSynonym }
      }
      const withExtra = extra ? new Set([...primary, ...extra]) : primary
      let direct = true
      let anchored = false
      for (const unit of meaningful) {
        const all = covered(withExtra, unit)
        if (!all.viaTyped && !all.viaSynonym) return 0
        if (!all.viaTyped) direct = false
        const own = covered(primary, unit)
        if (own.viaTyped || own.viaSynonym) anchored = true
      }
      if (!anchored) return 0
      return direct ? 2 : 1
    }

    // The search's own best department is the only one the sentence may name: the sentence confirms the
    // ranking, it never promotes a lower department that happens to fit the words.
    // A condition the department lists ("Eye pain, redness or watering") can come first with its department
    // beside it; the department it belongs to is still the search's answer, and cover() below checks the words.
    const firstHit = found.hits.find((hit) => !hit.emergency && (hit.id.startsWith('svc:') || hit.parent))
    const topSlug = firstHit ? (firstHit.id.startsWith('svc:') ? firstHit.id.slice(4) : firstHit.parent) : undefined
    if (!topSlug || !PRIMARY_SETS.has(topSlug)) return { kind: 'none' }
    const topCover = cover(topSlug)
    if (topCover === 0) return { kind: 'none' }
    // Reached only through synonyms, and another department fits as well: not clear enough to say.
    if (topCover === 1) {
      for (const slug of PRIMARY_SETS.keys()) if (slug !== topSlug && cover(slug) > 0) return { kind: 'none' }
    }
    const doc = this.serviceDoc.get(topSlug)
    if (doc === undefined) return { kind: 'none' }
    return { kind: 'department', hit: this.toHit(doc, firstHit?.score ?? 0, false) }
  }

  /**
   * The id of the overview that is ABOUT this question, or null. Strict like guide(): the question, with the small
   * words and "doctor" / "treatment" / "symptoms" taken out, must be exactly one entry's way of being searched, the
   * same words in any order and any language the synonym groups know ("kaan dard", "pain in ear", "earache"). Two
   * things in one question ("ear pain and fever"), a body part alone, or an emergency gets nothing.
   */
  describe(query: string, entries: readonly DescriptionTrigger[]): string | null {
    const asTyped = words(query).map((word) => stem(word))
    if (matchesPhrase(DISTRESS, asTyped) || looksLikeEmergency(asTyped.filter((word) => !STOP_WORDS.has(word)))) return null
    let index = this.describeIndexes.get(entries)
    if (!index) {
      index = new Map<string, { id: string; exact: Set<string> }[]>()
      for (const entry of entries) {
        for (const phrase of entry.phrases) {
          const key = this.describeKey(phrase)
          if (!key) continue
          const list = index.get(key) ?? []
          let item = list.find((candidate) => candidate.id === entry.id)
          if (!item) {
            item = { id: entry.id, exact: new Set<string>() }
            list.push(item)
          }
          item.exact.add(this.describeWords(phrase).sort().join('|'))
          index.set(key, list)
        }
      }
      this.describeIndexes.set(entries, index)
    }
    const key = this.describeKey(query)
    const found = key ? index.get(key) : undefined
    if (!found) return null
    if (found.length === 1) return found[0].id
    // Two entries are the same thing to the synonym groups ("nausea" and "vomiting"): the one whose own words were
    // typed. Neither typed ("ulti", Hindi for both): no overview.
    const exact = this.describeWords(query).sort().join('|')
    return found.find((item) => item.exact.has(exact))?.id ?? null
  }

  /** The words of a question that name the thing asked about: no small words, no "doctor", no "how bad". */
  private describeWords(text: string): string[] {
    return words(text)
      .filter((word) => !STOP_WORDS.has(word))
      .map((word) => stem(word))
      .filter((word) => !CONTEXT_WORDS.has(word) && !GENERIC_WORDS.has(word) && !DESCRIBE_FILLER.has(word) && !MODIFIERS.has(word))
  }

  /**
   * "It hurts", "im hurt", "pain", "severe pain": a complaint with no place in it. The results page asks where
   * instead of listing every department that mentions pain.
   */
  vague(query: string): boolean {
    const asTyped = words(query).map((word) => stem(word))
    if (matchesPhrase(DISTRESS, asTyped) || looksLikeEmergency(asTyped.filter((word) => !STOP_WORDS.has(word)))) return false
    const typed = this.describeWords(query)
    if (typed.length === 0) return false
    return typed.every((word, at) => groupMatchesAt(typed, at).some((match) => match.group === PAIN_GROUP && match.length === 1))
  }

  /** The way entries are compared: each word or group of words by its synonym group, as a sorted set. */
  private describeKey(text: string): string {
    const typed = this.describeWords(text)
    const parts = new Set<string>()
    let at = 0
    while (at < typed.length) {
      const matches = groupMatchesAt(typed, at)
      if (matches.length === 0) {
        parts.add(typed[at])
        at += 1
        continue
      }
      const longest = matches.reduce((max, match) => Math.max(max, match.length), 1)
      parts.add(`g${Math.min(...matches.filter((match) => match.length === longest).map((match) => match.group))}`)
      at += longest
    }
    return [...parts].sort().join('|')
  }

  correct(query: string): string | null {
    // Words of an emergency or of distress are matched as they were typed; they are never "corrected".
    const asTyped = words(query).map((word) => stem(word))
    if (matchesPhrase(DISTRESS, asTyped) || looksLikeEmergency(asTyped.filter((word) => !STOP_WORDS.has(word)))) return null
    let changed = false
    const out = words(query).map((word) => {
      // A word the vocabulary knows, in any language, is never "corrected": "peeth" (back, in Hindi) is not
      // a misspelt "teeth".
      // A short word is left alone when it is a word of any synonym group in any language ("pani": water, not "pain"),
      // or is, or is one letter from, a subject this site has no department for ("acne" is not "ache", "hart" is not "hurt").
      if (
        word.length <= 4 &&
        (ALL_GROUP_WORDS.has(stem(word)) ||
          NOT_LISTED_ALL.has(stem(word)) ||
          [...NOT_LISTED_ALL].some((anchor) => anchor.length >= 4 && anchor[0] === word[0] && editDistance(word, anchor, 1) <= 1))
      ) {
        return word
      }
      const slip = SLIP_FIXES[word]
      if (slip) {
        changed = true
        return slip
      }
      // An ordinary word the site's pages happen not to use ("thigh", "ringing") is not a slip for one they do.
      if (KNOWN_ENGLISH.has(word) || (word.endsWith('s') && KNOWN_ENGLISH.has(word.slice(0, -1)))) return word
      // Two neighbouring letters swapped in a short word: "pian" for "pain", "eey" for "eye". Only when exactly one
      // swap makes a word the site knows, and the word typed is not one itself.
      if (word.length >= 3 && word.length <= 4 && /^[a-z]+$/.test(word) && !STOP_WORDS.has(word) && !SINGLE.has(word) && !PHRASE_FIRST.has(word) && !this.postings.has(stem(word))) {
        const swaps = new Set<string>()
        for (let i = 0; i + 1 < word.length; i += 1) {
          const swapped = word.slice(0, i) + word[i + 1] + word[i] + word.slice(i + 2)
          if (swapped !== word && !STOP_WORDS.has(swapped) && (this.postings.has(stem(swapped)) || SINGLE.has(swapped))) swaps.add(swapped)
        }
        if (swaps.size === 1) {
          changed = true
          return [...swaps][0]
        }
        // One letter missing, extra or wrong in a short word ("toth", "paim"): only a first-stop or describing word
        // of the guide ("tooth", "pain"), only one such word, and the same first letter.
        if (swaps.size === 0) {
          const near = [...SHORT_TARGETS].filter(
            (target) => target[0] === word[0] && Math.abs(target.length - word.length) <= 1 && editDistance(word, target, 1) <= 1,
          )
          if (near.length === 1) {
            changed = true
            return near[0]
          }
        }
      }
      if (STOP_WORDS.has(word) || word.length < 5 || !/^[a-z]+$/.test(word)) return word
      if (SINGLE.has(word) || PHRASE_FIRST.has(word)) return word
      // "pimles" is a slip for "pimples" (skin) as much as for "piles": near a subject the site has no
      // department for, nothing is guessed.
      if (NOT_LISTED_WORDS.some((anchor) => anchor[0] === word[0] && editDistance(word, anchor, 2) <= 2)) return word
      const token = stem(word)
      if (this.postings.has(token)) return word
      let found = this.candidates(token, true, false)
      // "gastrits" is stemmed to "gastrit", which is the start of "gastritis": it looks unfinished. As typed
      // it is not the start of anything, so look again at the word itself.
      if (token !== word && /(s|es|ed|ing)$/.test(word) && [...found.values()].some((weight) => weight >= 0.7)) found = this.candidates(word, true, false)
      let best = ''
      let bestWeight = 0
      const tied = new Set<string>()
      for (const [candidate, weight] of found) {
        // 0.82 and 0.7 are "starts with what was typed": the word is unfinished, not misspelt.
        if (weight >= 0.7) return word
        // Corrections only: one letter wrong (0.66). The weaker guesses (two letters, a sound-alike, a
        // shared start, a shorter form) still help the search itself, but are not worth announcing:
        // "kamori" (Hindi) sounds like "camera" and is not a misspelling of it.
        if (weight !== 0.66) continue
        const better =
          weight > bestWeight ||
          (weight === bestWeight && (this.docFrequency.get(candidate) ?? 0) > (this.docFrequency.get(best) ?? 0))
        if (weight > bestWeight) tied.clear()
        if (weight >= bestWeight) tied.add(candidate)
        if (better) {
          best = candidate
          bestWeight = weight
        }
      }
      // Several words one letter away ("weakess": "weakness", and "weaken" once an ending is put back):
      // those that are one letter from what was typed, as it stands, win. Still several: not guessed.
      if (tied.size > 1) {
        const direct = [...tied].filter((candidate) => editDistance(word, this.spelling.get(candidate) ?? candidate, 1) <= 1)
        const byUse = direct.sort((a, b) => (this.docFrequency.get(b) ?? 0) - (this.docFrequency.get(a) ?? 0))
        // One word clearly in more pages than the other ("prostate", not "prostrate"): that one.
        const clear = byUse.length === 1 || (this.docFrequency.get(byUse[0]) ?? 0) >= 3 * (this.docFrequency.get(byUse[1]) ?? 1)
        if (byUse.length === 0 || !clear) return word
        best = byUse[0]
      }
      // Two letters wrong in a long word ("constipashion"): only when exactly one word is that near.
      if (!best && word.length >= 7) {
        const near = [...found.keys()].filter((candidate) => {
          const weight = found.get(candidate) ?? 0
          if (weight !== 0.5 && weight !== 0.55) return false
          const form = this.spelling.get(candidate) ?? candidate
          return form[0] === word[0] && Math.abs(form.length - word.length) <= 1 && editDistance(word, form, 2) <= 2
        })
        if (near.length === 1) best = near[0]
      }
      if (!best) return word
      changed = true
      return this.spelling.get(best) ?? best
    })
    return changed ? out.join(' ') : null
  }

  popular(limit = 6, kinds?: readonly SearchKind[]): SearchHit[] {
    const allowed = kinds ? new Set<SearchKind>(kinds) : undefined
    return this.popularDocs
      .filter((doc) => !allowed || allowed.has(this.docs[doc].kind))
      .slice(0, limit)
      .map((doc) => this.toHit(doc, 0, false))
  }
}

interface Scored {
  scores: Map<number, number>
  /** Documents matched in the title or the aliases and topics. */
  strong: Set<number>
}

/** The synonym group of "pain", "ache", "hurt" and "dard". */
const PAIN_GROUP = GROUP_DEFS.findIndex((group) => group.terms.some((term) => term.words.length === 1 && term.words[0] === 'pain'))
/** Words that say how bad a complaint is without changing what it is: "severe headache", "tez bukhar". */
const MODIFIERS = new Set(
  asTokens(
    'severe bad sharp sudden mild constant chronic terrible unbearable little lot too much more so very ' +
      'tez bahut bohot bahot zyada jyada halka halki thoda thodi kaafi ' +
      'बहुत तेज तेज़ ज्यादा ज़्यादा हल्का हल्की थोड़ा थोड़ी काफी काफ़ी ਬਹੁਤ ਤੇਜ਼ ਤੇਜ ਹਲਕਾ ਥੋੜ੍ਹਾ ਕਾਫ਼ੀ',
  ),
)

/** Words that ask about a thing without being part of its name: "ear pain causes", "diabetes symptoms". */
const DESCRIBE_FILLER = new Set(asTokens('symptom symptoms cause causes reason reasons sign signs meaning mean overview info information detail details explain explanation definition about'))

/** Ordinary English words (as typed, or with a plural "s") that are never "corrected": see scripts/gen-known-words.ts. */
const KNOWN_ENGLISH = new Set<string>(KNOWN_WORDS.split(' '))

/** The short words a one-letter slip may be put right to: what a department's first-stop list and a complaint use. */
const SHORT_TARGETS = new Set<string>(
  [...ALL_PRIMARY, ...asTokens('pain ache fever cough cold head neck back knee hand foot skin rash tooth teeth ear eye nose')].filter((word) =>
    /^[a-z]{3,6}$/.test(word),
  ),
)

/** Slips in the small words of a sentence that a search engine would put right and say so ("i hve eye pain"). */
const SLIP_FIXES: Record<string, string> = {
  hve: 'have', hav: 'have', hvae: 'have', haev: 'have', ahve: 'have', havee: 'have', hae: 'have', ihve: 'i have',
  ihav: 'i have', ihave: 'i have', iam: 'i am', haveing: 'having', havin: 'having', havng: 'having', hving: 'having',
  wat: 'what', wht: 'what', whr: 'where', hw: 'how', wen: 'when', wich: 'which',
}

/** Where the hospital is: never what is being asked for, so it does not count as a word of the query. */
const CONTEXT_WORDS = new Set([
  'hisar', 'hissar', 'hissaar', 'haryana', 'lims', 'lim', 'lifeline', 'india', 'hospital', 'aspatal',
  'हिसार', 'हरियाणा', 'ਹਿਸਾਰ', 'ਹਰਿਆਣਾ',
])

interface Alt {
  /** All of these words must be in the document. */
  tokens: string[]
  weight: number
  /** Allow prefixes, spelling mistakes and sound-alikes (only for what the visitor actually typed). */
  loose: boolean
}

interface Unit {
  alts: Alt[]
  importance: number
  /** "doctor", "treatment" next to a specific word: scored, but not required. */
  generic?: boolean
  /** The typed words this unit stands for. */
  words: string[]
}

/** A section of a page (a condition, a question) rather than a page, from its id. */
function isChildId(id: string): boolean {
  return !/^(svc|doc|page|action|info|article):/.test(id)
}

export function createEngine(docs: SearchDoc[]): SearchEngine {
  return new SearchEngine(docs)
}
