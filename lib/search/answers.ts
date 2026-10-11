// lib/search/answers.ts
//
// What the results page may quote from the site's own pages under the Quick guide. Pure functions, so the
// rules are tested (scripts/search-eval.ts) like everything else in lib/search/.
//
// NOTHING HERE IS WRITTEN BY THE SEARCH. Every line it returns is a sentence that is already on a department
// or test page, in the language of the page. The rules only decide WHEN a line may be quoted:
//   - "Good to know": for the department the guide names, the page's "book a consultation if" lines that
//     mention the question (or the first three), and its "go to emergency care now if" lines. Never for an
//     emergency or distress search, never for a close match, never for the Emergency department's own page.
//   - "From this site": a common question or a line from a test's page that contains EVERY word of the
//     question as a whole word ("pain" is not found inside "painkillers") and that the search itself rates as
//     about those words.

import type { Guide, SearchHit, SearchMode } from '@/lib/search/types'

/** One word in the form used to compare: lower case, a plural "s" and an "ing" dropped ("fasting" is "fast"). */
function plain(word: string): string {
  let out = word.toLowerCase()
  if (out.length > 3 && out.endsWith('s') && !out.endsWith('ss')) out = out.slice(0, -1)
  if (out.length > 5 && out.endsWith('ing')) out = out.slice(0, -3)
  return out
}

/** Lower-case whole words of a text, in comparable form. */
export function wholeWords(text: string): Set<string> {
  return new Set(text.split(/[^\p{L}\p{N}]+/u).filter(Boolean).map(plain))
}

/** The first sentence of a text for an answer line; a short one ("No.") is carried on by the next. */
export function firstSentence(text: string): string {
  const parts = text.split(/(?<=[.।?])\s+/)
  let out = parts[0] ?? text
  if (out.length < 30 && parts[1]) out = `${out} ${parts[1]}`
  return out.length > 240 ? `${out.slice(0, 237).trimEnd()}…` : out
}

interface Situation {
  mode: SearchMode
  emergency: boolean
  distress?: boolean
}

/** The department whose lists may be quoted, or null. */
export function goodToKnowHit(guide: Guide | null, result: Situation | null): SearchHit | null {
  if (!guide || !result) return null
  if (result.mode !== 'match' || result.emergency || result.distress) return null
  if (guide.kind !== 'department' && guide.kind !== 'named') return null
  const hit = guide.hit
  if (hit.id === 'svc:emergency-services' || !hit.lists) return null
  return hit
}

/** Up to three "book a consultation if" lines: those that mention the question first, then the page's first. */
export function pickWhen(hit: SearchHit | null, query: string): string[] {
  if (!hit?.lists) return []
  const asked = [...wholeWords(query)].filter((word) => word.length > 2)
  const lines = hit.lists.when
  const matching = lines.filter((line) => {
    const words = wholeWords(line)
    return asked.some((word) => words.has(word))
  })
  const rest = lines.filter((line) => !matching.includes(line))
  // At least two lines when the page has them, so the box is not a single line.
  const want = Math.min(3, Math.max(2, matching.length))
  return [...matching, ...rest].slice(0, want)
}

/** Up to two quoted answers. A single word is not a question: it gets none. */
export function pickAnswers(query: string, hits: SearchHit[], result: Situation | null, notListed: boolean): SearchHit[] {
  if (!result || result.mode !== 'match' || result.emergency || result.distress || notListed) return []
  const asked = [...wholeWords(query)].filter((word) => word.length > 2)
  if (asked.length < 2) return []
  return hits
    .filter((hit) => hit.kind === 'faq' && hit.parent && (hit.coverage ?? 0) >= 0.999 && hit.strong)
    .filter((hit) => {
      const have = wholeWords(`${hit.title} ${hit.detail ?? ''} ${hit.answer ?? ''}`)
      return asked.every((word) => have.has(word))
    })
    .slice(0, 2)
}

/**
 * "Can I eat before an ultrasound?", "is a CT scan safe?": a question about a TEST that asks for one kind of
 * thing the test's own page lists (what to do before it, whether it is safe). The answer is that page's own list
 * for that section, as written. Only when what is left of the question, once those asking-words are taken out,
 * is the name of the test (so "can I eat before breakfast" quotes nothing).
 */
const PREPARE = new Set(['eat', 'drink', 'food', 'fast', 'empty', 'prepare', 'preparation', 'before', 'bring', 'wear', 'bladder', 'water'].map(plain))
const SAFETY = new Set(['safe', 'safety', 'radiation', 'risk', 'harmful', 'dangerous'].map(plain))

export function sectionIntent(terms: string[]): 'prep' | 'safe' | null {
  const words = terms.map(plain)
  if (words.some((word) => SAFETY.has(word))) return 'safe'
  if (words.some((word) => PREPARE.has(word))) return 'prep'
  return null
}

export function pickSectionLines(
  terms: string[],
  hits: SearchHit[],
  result: Situation | null,
  lines: (slug: string, prefix: string) => SearchHit[],
): SearchHit[] {
  // A close match is fine here: "can I eat before an ultrasound" never covers every word of any page, but
  // what is left once the asking-words are taken out is exactly the name of a test.
  if (!result || result.mode === 'none' || result.emergency || result.distress) return []
  const intent = sectionIntent(terms)
  if (!intent) return []
  const asking = intent === 'safe' ? SAFETY : PREPARE
  const left = terms.map(plain).filter((word) => word.length > 2 && !asking.has(word))
  if (left.length === 0) return []
  const subject = hits.find(
    (hit) => hit.kind === 'test' && hit.id.startsWith('svc:') && left.every((word) => wholeWords(hit.title).has(word)),
  )
  if (!subject) return []
  return lines(subject.id.slice(4), intent === 'prep' ? 'prep' : 'safe').slice(0, 2)
}
