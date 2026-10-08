// lib/search/types.ts
//
// What goes into the search index and what comes out of it. Plain data, safe to ship to the browser.

export type SearchKind =
  | 'doctor'
  | 'department'
  | 'condition'
  | 'treatment'
  | 'test'
  | 'faq'
  | 'info'
  | 'page'
  | 'action'

/** One searchable thing: a doctor, a department, a condition on a department page, a question, a page. */
export interface SearchDoc {
  /** Unique within a locale's index. */
  id: string
  kind: SearchKind
  /** Shown as the row's main line, and matched with the highest weight. */
  title: string
  /** Shown under the title: where the row goes, or what it is. Matched with a lower weight. */
  detail?: string
  /** Internal path (no locale prefix), or an absolute / tel: / mailto: link when `external` is set. */
  href: string
  /** A link the browser handles itself (a phone number, WhatsApp, Google Maps, the ABHA site). */
  external?: boolean
  /** Words matched with high weight but never shown: aliases, topics, the names of the doctor who treats it. */
  keys?: string
  /** Longer text matched with a low weight: descriptions, answers, qualifications. */
  text?: string
  /** The department (a service slug) this belongs to, so a hit on a condition can bring its department. */
  parent?: string
  /** Extra weight; 1 means none. */
  boost?: number
  /** Marks the pinned emergency card. */
  role?: 'emergency'
  /** Position in the list shown when nothing matched at all (1 is first). */
  fallback?: number
  /** Position in the "popular searches" list shown before anything is typed (1 is first). */
  pop?: number
}

export interface SearchHit {
  id: string
  kind: SearchKind
  title: string
  detail?: string
  href: string
  external?: boolean
  parent?: string
  /** Higher is better. Only meaningful relative to the other hits of the same search. */
  score: number
  /** True when the row was added because one of its sections matched, not because it matched itself. */
  inferred?: boolean
  /** The emergency card, pinned first. */
  emergency?: boolean
}

/**
 * match: found what was asked for.
 * weak:  found something close (a spelling, a sound, a part of the question). Say so.
 * none:  nothing; `hits` then holds the places a patient can go from here.
 */
export type SearchMode = 'match' | 'weak' | 'none'

export interface SearchResult {
  mode: SearchMode
  hits: SearchHit[]
  /** The words of the query that carried meaning, for highlighting. */
  terms: string[]
  /** True when the query looks like an emergency; the first hit is then the emergency card. */
  emergency: boolean
}

export interface SearchOptions {
  limit?: number
  /** Restricts the results to these kinds (the hero card's "A doctor" / "A department" toggle). */
  kinds?: readonly SearchKind[]
}
