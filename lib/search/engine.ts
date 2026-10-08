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

/** Single-word terms by exact word. */
const SINGLE = new Map<string, TermRef[]>()
/** Single-word Hindi/Punjabi terms by phonetic key. */
const SINGLE_KEY = new Map<string, TermRef[]>()
/** Multi-word terms by their first word (exact) and by its phonetic key. */
const PHRASE_FIRST = new Map<string, TermRef[]>()
const PHRASE_FIRST_KEY = new Map<string, TermRef[]>()

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
  // English word ("skin", "dent") is not matched to a word it merely sounds like.
  const sound = scriptOf(word) !== 'latin' || word.length >= 5 ? phoneticKey(word) : ''
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

    // How each word is really spelt, from the titles first and the keywords after, for showing a correction.
    for (const field of ['title', 'keys'] as const) {
      for (const doc of docs) {
        for (const raw of (doc[field] ?? '').split(/[^\p{L}\p{N}]+/u)) {
          if (raw.length < 4 || !/^[a-zA-Z]+$/.test(raw)) continue
          const key = stem(words(raw)[0] ?? '')
          if (key && !this.spelling.has(key)) this.spelling.set(key, raw.toLowerCase())
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

      // "x ray" typed with a space and indexed without one, or the other way round.
      if (longest === 1 && at + 1 < typed.length) {
        const joined = stem(word + typed[at + 1])
        if (this.postings.has(joined)) {
          const pair = Math.max(this.idf(stem(word)), this.idf(stem(typed[at + 1])))
          units.push({
            alts: [
              { tokens: [joined], weight: 0.95, loose: false },
              { tokens: [word, typed[at + 1]], weight: 1, loose: true },
            ],
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
      const call = this.fallbackHits(kinds, 12).find((hit) => hit.id === 'action:call')
      return { mode: 'match', hits: call ? [card, call] : [card], terms, emergency: true, distress: true }
    }

    const cache = new Map<string, Scored>()
    const units = this.buildUnits(typed)
    const lastUnit = units[units.length - 1]

    const scored: { map: Map<number, number>; importance: number }[] = []
    const strongDocs = new Set<number>()
    let droppedImportance = 0
    let allImportance = 0
    for (const unit of units) {
      const isLast = unit === lastUnit && typing
      let map: Map<number, number> | undefined
      for (const alt of unit.alts) {
        const found = this.altScores(alt, isLast, cache)
        for (const doc of found.strong) strongDocs.add(doc)
        if (!map) {
          map = new Map(found.scores)
        } else {
          for (const [doc, value] of found.scores) {
            if (value > (map.get(doc) ?? 0)) map.set(doc, value)
          }
        }
      }
      allImportance += unit.importance
      // A word that matches nothing anywhere (a typo past repair, a name we do not have) does not
      // sink the rest of the query; the rest is answered, and the answer is marked as a close match.
      if (map && map.size > 0) scored.push({ map, importance: unit.importance })
      else droppedImportance += unit.importance
    }

    const totalImportance = scored.reduce((sum, unit) => sum + unit.importance, 0)
    const accumulated = new Map<number, { score: number; covered: number }>()
    for (const { map, importance } of scored) {
      for (const [doc, value] of map) {
        const entry = accumulated.get(doc)
        if (entry) {
          entry.score += value * importance
          entry.covered += importance
        } else {
          accumulated.set(doc, { score: value * importance, covered: importance })
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
    const full = ranked.filter((entry) => entry.coverage >= 0.999)
    const all = full.length >= 3 ? full : ranked
    // Pages that are ABOUT the words (a title, an alias or a topic matches) come before pages that merely
    // mention them in passing. The passing mentions are kept only when there are too few of the first.
    const aboutIt = all.filter((entry) => strongDocs.has(entry.doc))
    const base = aboutIt.length >= 3 ? aboutIt : all
    // Weak company is dropped when there is a clear best: the rest of the list is things that
    // matched a word in passing.
    const floor = (base[0]?.rank ?? 0) * 0.38
    const candidates = base.filter((entry, index) => index < 3 || entry.rank >= floor).slice(0, 80)

    const hits = this.shape(candidates, limit, emergency)

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
    }
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
  correct(query: string): string | null {
    let changed = false
    const out = words(query).map((word) => {
      if (STOP_WORDS.has(word) || word.length < 5 || !/^[a-z]+$/.test(word)) return word
      const token = stem(word)
      if (this.postings.has(token)) return word
      const found = this.candidates(token, true, false)
      let best = ''
      let bestWeight = 0
      for (const [candidate, weight] of found) {
        // 0.82 and 0.7 are "starts with what was typed": the word is unfinished, not misspelt.
        if (weight >= 0.7) return word
        // Corrections only: one letter wrong (0.66) or the same sound (0.55). The weaker guesses (two
        // letters, a shared start, a shorter form) still help the search itself but are not worth announcing.
        if (weight < 0.55 || weight === 0.6) continue
        const better =
          weight > bestWeight ||
          (weight === bestWeight && (this.docFrequency.get(candidate) ?? 0) > (this.docFrequency.get(best) ?? 0))
        if (better) {
          best = candidate
          bestWeight = weight
        }
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

/** Where the hospital is: never what is being asked for, so it does not count as a word of the query. */
const CONTEXT_WORDS = new Set(['hisar', 'haryana', 'lims', 'lifeline', 'india', 'hospital', 'aspatal'])

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
  /** The typed words this unit stands for. */
  words: string[]
}

export function createEngine(docs: SearchDoc[]): SearchEngine {
  return new SearchEngine(docs)
}
