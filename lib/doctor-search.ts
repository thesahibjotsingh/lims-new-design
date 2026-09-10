// lib/doctor-search.ts
//
// Two things the consultant directory needs that plain substring matching cannot do:
// the suggestion list under the search box, and the "did you mean" offered instead of a
// bare no-results page.
//
// WHY FUZZINESS IS ALLOWED HERE AND NOT IN searchDoctors(). lib/doctors.ts refuses to
// make searchDoctors() typo-tolerant, and that decision stands: a search that quietly
// returns the wrong consultant is worse than one that returns none, because the patient
// cannot tell it happened. Everything in this file is a SUGGESTION — it is shown to the
// reader as a question, they click it or they do not, and nothing is substituted behind
// their back. That is the whole difference.
//
// Runs on the client too (the suggestion box is a client component), so it holds no
// secrets and does no I/O — it reads the same in-process catalogue the pages render
// from.

import { DOCTORS } from '@/lib/doctors'
import { SERVICES, serviceHref, serviceName } from '@/lib/services'

export interface SearchSuggestion {
  /** What the reader sees. */
  label: string
  /** Disambiguates two entries that read alike, e.g. the department under a name. */
  detail?: string
  /** 'doctor' goes straight to a profile; 'department' filters the roster. */
  kind: 'doctor' | 'department'
  href: string
}

/**
 * Everything a person might reasonably type into this box, flattened once.
 *
 * Departments come from the catalogue rather than from the roster, so a speciality with
 * no published consultant still suggests — it lands on the department page, which says
 * so honestly, instead of on a blank result.
 */
function buildIndex(): SearchSuggestion[] {
  const doctors: SearchSuggestion[] = DOCTORS.map((doctor) => ({
    label: doctor.name,
    detail: [doctor.qualifications, serviceName(doctor.departmentSlug)]
      .filter(Boolean)
      .join(' · '),
    kind: 'doctor',
    href: `/doctors/${doctor.id}`,
  }))

  const departments: SearchSuggestion[] = SERVICES.map((service) => ({
    label: service.name,
    // The wording from a referral slip is what people type — "Obs and Gynae", not
    // "Obstetrics & Gynaecology" — so it is searchable and shown.
    detail: service.alsoKnownAs?.length
      ? `Also: ${service.alsoKnownAs.join(', ')}`
      : undefined,
    kind: 'department',
    href: serviceHref(service),
  }))

  return [...doctors, ...departments]
}

const INDEX = buildIndex()

/** Every string that should match a given entry, lowercased once. */
function haystack(entry: SearchSuggestion): string[] {
  return [entry.label, entry.detail ?? ''].join(' ').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)
}

/**
 * Live suggestions for what the reader has typed so far.
 *
 * Prefix matches rank above mid-word matches: someone typing "or" means "Ortho", not
 * "Doppler", and putting the word-start hits first is the difference between the list
 * feeling predictive and feeling random. Doctors rank above departments at equal score
 * because a named person is the more specific answer.
 */
export function suggestSearch(query: string, limit = 6): SearchSuggestion[] {
  const needle = query.trim().toLowerCase()
  if (needle.length < 2) return []

  const scored: { entry: SearchSuggestion; score: number }[] = []

  for (const entry of INDEX) {
    const words = haystack(entry)
    const label = entry.label.toLowerCase()

    let score = 0
    if (label.startsWith(needle)) score = 100
    else if (words.some((word) => word.startsWith(needle))) score = 70
    else if (label.includes(needle)) score = 40
    else if (words.some((word) => word.includes(needle))) score = 20

    if (score > 0) {
      if (entry.kind === 'doctor') score += 5
      scored.push({ entry, score })
    }
  }

  return scored
    .sort((a, b) => b.score - a.score || a.entry.label.localeCompare(b.entry.label))
    .slice(0, limit)
    .map((item) => item.entry)
}

/**
 * Levenshtein distance, iterative with a single row.
 *
 * The strings here are department names and consultant names — tens of characters, a
 * few dozen candidates — so this runs in well under a millisecond and a dependency
 * would cost more to ship than the function costs to write.
 */
function editDistance(a: string, b: string): number {
  if (a === b) return 0
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length

  let previous = Array.from({ length: b.length + 1 }, (_, i) => i)

  for (let i = 1; i <= a.length; i += 1) {
    const current = [i]
    for (let j = 1; j <= b.length; j += 1) {
      const substitution = previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      current[j] = Math.min(current[j - 1] + 1, previous[j] + 1, substitution)
    }
    previous = current
  }

  return previous[b.length]
}

/**
 * "Did you mean …?" for a query that matched nothing.
 *
 * Compares the query against each word of every name, not against the whole name: a
 * patient types "ortho", not "ortho and joint replacement", and whole-string distance
 * would score that as hopelessly far from every entry.
 *
 * The tolerance scales with word length — one edit for a short word, two for a long one
 * — because a fixed threshold either rejects every real typo in a long word or matches
 * everything short. Above that, no suggestion is offered: a wrong "did you mean" on a
 * hospital directory sends someone to the wrong speciality, and silence is recoverable
 * where a confident wrong answer is not.
 */
export function didYouMean(query: string, limit = 3): SearchSuggestion[] {
  const needle = query.trim().toLowerCase()
  if (needle.length < 3) return []

  const scored: { entry: SearchSuggestion; distance: number }[] = []

  for (const entry of INDEX) {
    let best = Infinity
    for (const word of haystack(entry)) {
      if (word.length < 3) continue
      const tolerance = word.length > 6 ? 2 : 1
      const distance = editDistance(needle, word)
      if (distance <= tolerance && distance < best) best = distance
    }
    if (best !== Infinity) scored.push({ entry, distance: best })
  }

  return scored
    .sort((a, b) => a.distance - b.distance || a.entry.label.localeCompare(b.entry.label))
    .slice(0, limit)
    .map((item) => item.entry)
}
