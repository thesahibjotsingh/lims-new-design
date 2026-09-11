// lib/search.ts
//
// Site search: the suggestion list under every search box, and the "did you mean"
// offered instead of a bare no-results page.
//
// WHY FUZZINESS IS ALLOWED HERE AND NOT IN searchDoctors(). lib/doctors.ts refuses to
// make searchDoctors() typo-tolerant, and that decision stands: a search that quietly
// returns the wrong consultant is worse than one that returns none, because the patient
// cannot tell it happened. Everything in this file is a SUGGESTION — shown to the
// reader as a labelled row they choose, never substituted behind their back. That is
// the whole difference, and it is why the fuzzy matching lives here.
//
// SIZE SETS THE TECHNIQUE. The whole corpus is four consultants, twenty-six services
// and ten pages — forty documents, in process, known at build time. So this is an
// exhaustive scan with hand-written rules, and it runs in well under a millisecond.
// TF-IDF, an inverted index or vector embeddings would all be slower to ship, heavier
// to send, and no more accurate on forty short strings where the vocabulary is fixed
// and medical.
//
// Runs on the client (the suggestion box is a client component), so it holds no secrets
// and does no I/O.

import { DOCTORS } from '@/lib/doctors'
import { SERVICES, serviceHref, serviceName } from '@/lib/services'

export type SuggestionKind = 'doctor' | 'department' | 'page'

export interface SearchSuggestion {
  label: string
  /** Disambiguates entries that read alike, e.g. the department under a name. */
  detail?: string
  kind: SuggestionKind
  href: string
}

interface IndexEntry extends SearchSuggestion {
  /** Normalised, stemmed, synonym-expanded tokens this entry matches on. */
  tokens: Set<string>
  /** The label, normalised, for whole-query prefix scoring. */
  normalisedLabel: string
}

/* -------------------------------------------------------------------------- */
/* Normalisation                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Lowercase, strip accents, and reduce anything that is not a letter or digit to a
 * space. "Café" and "cafe" become the same string, and so do "X-Ray", "x ray" and
 * "xray" once the tokens are joined — which matters here because patients type the
 * punctuation from a referral slip and the catalogue writes it differently.
 */
function normalise(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

/**
 * Filler that carries no meaning in a forty-document medical catalogue. Kept short on
 * purpose: an aggressive stop list would eat "a" out of "vitamin a" and "in" out of
 * real terms, and there is nothing here for it to save.
 */
const STOP_WORDS = new Set([
  'and', 'the', 'of', 'for', 'in', 'at', 'to', 'a', 'an', 'or', 'with', 'my', 'me',
  'i', 'is', 'are', 'do', 'does', 'need', 'want', 'looking', 'find', 'search', 'show',
])

/**
 * Crude suffix stripping — NOT a real stemmer.
 *
 * Porter would be the correct tool over a large corpus. Over this one it would mangle
 * more than it merges: the vocabulary is medical, mostly proper nouns, and the only
 * inflection that actually shows up in queries is a plural or an "-ing". So this
 * handles exactly that and leaves everything else alone.
 */
function stem(token: string): string {
  if (token.length <= 3) return token
  if (token.endsWith('ies')) return `${token.slice(0, -3)}y`
  if (token.endsWith('ing') && token.length > 5) return token.slice(0, -3)
  if (token.endsWith('es') && token.length > 4) return token.slice(0, -2)
  if (token.endsWith('s') && !token.endsWith('ss')) return token.slice(0, -1)
  return token
}

/**
 * What patients type, mapped to what the catalogue calls it.
 *
 * This is the single highest-value part of the file. LIMS names a department
 * "Ortho & Joint Replacement"; a patient with a broken wrist types "bone". No amount of
 * string distance connects those two, because they share no letters — only a vocabulary
 * does. Every entry here is a word a person would plausibly use for a thing this
 * hospital actually offers.
 *
 * Deliberately NOT a symptom checker. "chest pain" maps to the cardiac test LIMS lists,
 * not to a diagnosis, because suggesting what a symptom means is clinical advice and
 * this is a search box.
 */
const SYNONYMS: Record<string, string[]> = {
  // People
  dr: ['doctor', 'consultant'],
  doc: ['doctor', 'consultant'],
  doctor: ['doctor', 'consultant', 'physician'],
  consultant: ['doctor', 'consultant'],
  physician: ['doctor', 'consultant', 'medicine'],
  surgeon: ['surgery', 'doctor'],
  specialist: ['doctor', 'speciality'],

  // Body and complaint, mapped to the department that handles it
  bone: ['ortho', 'orthopedic', 'joint'],
  bones: ['ortho', 'orthopedic', 'joint'],
  fracture: ['ortho', 'orthopedic', 'trauma'],
  knee: ['ortho', 'joint', 'orthopedic'],
  hip: ['ortho', 'joint', 'orthopedic'],
  back: ['spine'],
  spinal: ['spine'],
  heart: ['echocardiogram', 'tmt', 'cardiac'],
  cardiac: ['echocardiogram', 'tmt'],
  chest: ['echocardiogram', 'tmt'],
  brain: ['neurosurgery', 'neuro'],
  nerve: ['neurosurgery', 'neuro'],
  head: ['neurosurgery', 'neuro'],
  eye: ['ophthalmology'],
  eyes: ['ophthalmology'],
  vision: ['ophthalmology'],
  sight: ['ophthalmology'],
  ear: ['ent'],
  nose: ['ent'],
  throat: ['ent'],
  tooth: ['dentistry', 'dental'],
  teeth: ['dentistry', 'dental'],
  gum: ['dentistry', 'dental'],
  stomach: ['gastroenterology', 'gastro'],
  gastric: ['gastroenterology', 'gastro'],
  liver: ['gastroenterology', 'gastro'],
  digestion: ['gastroenterology', 'gastro'],
  kidney: ['urology'],
  urine: ['urology'],
  urinary: ['urology'],
  bladder: ['urology'],
  skin: ['dermatology'],

  // Women's and children's health
  pregnant: ['obstetrics', 'gynaecology'],
  pregnancy: ['obstetrics', 'gynaecology'],
  delivery: ['obstetrics', 'gynaecology'],
  maternity: ['obstetrics', 'gynaecology'],
  obs: ['obstetrics'],
  gynae: ['gynaecology', 'obstetrics'],
  gyno: ['gynaecology', 'obstetrics'],
  obgyn: ['obstetrics', 'gynaecology'],
  child: ['paediatrics', 'pediatrics', 'neonatology'],
  kid: ['paediatrics', 'pediatrics'],
  baby: ['paediatrics', 'pediatrics', 'neonatology'],
  infant: ['neonatology', 'paediatrics'],
  newborn: ['neonatology', 'paediatrics'],

  // Tests and imaging
  xray: ['x', 'ray', 'ct', 'radiology'],
  scan: ['ct', 'radiology', 'ultrasound', 'imaging'],
  mri: ['radiology', 'imaging'],
  sonography: ['ultrasound'],
  usg: ['ultrasound'],
  blood: ['pathology', 'microbiology', 'lab'],
  lab: ['pathology', 'microbiology'],
  test: ['pathology', 'radiology', 'packages'],
  report: ['pathology', 'radiology'],
  doppler: ['doppler', 'color'],

  // Services and pages
  physio: ['physiotherapy', 'rehabilitation'],
  rehab: ['rehabilitation', 'physiotherapy'],
  diet: ['dietetics', 'nutrition'],
  food: ['dietetics', 'nutrition'],
  medicine: ['medicine'],
  medicines: ['pharmacy'],
  drug: ['pharmacy'],
  chemist: ['pharmacy'],
  ambulance: ['ambulance', 'emergency'],
  emergency: ['emergency', 'ambulance', 'casualty'],
  casualty: ['emergency'],
  accident: ['trauma', 'emergency'],
  injury: ['trauma', 'emergency'],
  operation: ['surgery'],
  surgery: ['surgery'],
  anesthesia: ['anaesthesia', 'pain'],
  pain: ['anaesthesia', 'pain'],
  book: ['appointment', 'booking'],
  booking: ['appointment'],
  appointment: ['appointment', 'booking'],
  opd: ['appointment', 'doctor'],
  price: ['packages', 'billing'],
  cost: ['packages', 'billing'],
  fee: ['packages', 'billing'],
  fees: ['packages', 'billing'],
  charge: ['packages', 'billing'],
  package: ['packages', 'checkup'],
  checkup: ['packages', 'health'],
  insurance: ['insurance', 'billing', 'tpa'],
  cashless: ['insurance', 'tpa'],
  claim: ['insurance', 'billing'],
  address: ['contact', 'location', 'directions'],
  location: ['contact', 'location', 'directions'],
  directions: ['contact', 'location'],
  phone: ['contact', 'call'],
  number: ['contact', 'call'],
  call: ['contact', 'call'],
  timing: ['visitors', 'visiting', 'contact'],
  timings: ['visitors', 'visiting', 'contact'],
  visiting: ['visitors', 'visiting'],
  visitor: ['visitors', 'visiting'],
  hours: ['visitors', 'visiting', 'contact'],
  admission: ['visitors', 'patient', 'care'],
  admitted: ['visitors', 'patient', 'care'],
  article: ['library', 'health'],
  articles: ['library', 'health'],
  information: ['library', 'about'],
  about: ['about', 'hospital'],
  hospital: ['about', 'lims'],
}

/** Normalise, drop stop words, stem, then add synonym expansions. */
function tokenise(value: string, expand = true): string[] {
  const base = normalise(value)
    .split(' ')
    .filter((token) => token.length > 0 && !STOP_WORDS.has(token))

  const out = new Set<string>()
  for (const raw of base) {
    const stemmed = stem(raw)
    out.add(raw)
    out.add(stemmed)
    if (!expand) continue
    for (const synonym of SYNONYMS[raw] ?? SYNONYMS[stemmed] ?? []) {
      out.add(synonym)
      out.add(stem(synonym))
    }
  }
  return [...out]
}

/* -------------------------------------------------------------------------- */
/* The index                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Pages worth reaching from a search box.
 *
 * Someone typing "cost" or "phone number" is not looking for a department, and without
 * these the only honest answer would be no results. `keywords` carries the words a
 * person uses that do not appear in the page's own title.
 */
const PAGES: { label: string; detail: string; href: string; keywords: string }[] = [
  {
    label: 'Book an appointment',
    detail: 'Request a consultation',
    href: '/appointments',
    keywords: 'book booking appointment opd consult request slot',
  },
  {
    label: 'Find a doctor',
    detail: 'The consultant roster',
    href: '/doctors',
    keywords: 'doctor consultant physician specialist roster directory',
  },
  {
    label: 'Contact LIMS',
    detail: 'Phone numbers, address and directions',
    href: '/contact',
    keywords: 'contact phone number call address location directions map reach',
  },
  {
    label: 'Health check packages',
    detail: 'Preventive checks and pricing',
    href: '/health-packages',
    keywords: 'packages package checkup health price cost fee rate preventive',
  },
  {
    label: 'Health library',
    detail: 'Clinically reviewed articles',
    href: '/health-library',
    keywords: 'library article information advice reading condition',
  },
  {
    label: 'Patient care',
    detail: 'Services alongside treatment',
    href: '/patient-care',
    keywords: 'patient care support services',
  },
  {
    label: 'Visitor information',
    detail: 'Visiting hours and ward policy',
    href: '/patient-care/visitors',
    keywords: 'visitor visiting hours timing ward policy attendant admission',
  },
  {
    label: 'Insurance & billing',
    detail: 'Empanelled insurers and TPAs',
    href: '/patient-care/insurance',
    keywords: 'insurance billing cashless tpa claim empanelled payment',
  },
  {
    label: 'About LIMS',
    detail: 'The hospital',
    href: '/about',
    keywords: 'about hospital lims lifeline institute who',
  },
  {
    label: 'Patient portal',
    detail: 'Reports and records',
    href: '/portal',
    keywords: 'portal login report record result',
  },
]

function buildIndex(): IndexEntry[] {
  const entries: Omit<IndexEntry, 'tokens' | 'normalisedLabel'>[] = [
    ...DOCTORS.map((doctor) => ({
      label: doctor.name,
      detail: [doctor.qualifications, serviceName(doctor.departmentSlug)]
        .filter(Boolean)
        .join(' · '),
      kind: 'doctor' as const,
      href: `/doctors/${doctor.id}`,
    })),
    // Departments come from the catalogue, not the roster, so a speciality with no
    // published consultant still suggests — it lands on the department page, which says
    // so honestly, instead of on a blank result.
    ...SERVICES.map((service) => ({
      label: service.name,
      // The wording from a referral slip is what people type — "Obs and Gynae", not
      // "Obstetrics & Gynaecology" — so it is searchable and shown.
      detail: service.alsoKnownAs?.length
        ? `Also: ${service.alsoKnownAs.join(', ')}`
        : undefined,
      kind: 'department' as const,
      href: serviceHref(service),
    })),
    ...PAGES.map((page) => ({
      label: page.label,
      detail: page.detail,
      kind: 'page' as const,
      href: page.href,
    })),
  ]

  const extraKeywords = new Map(PAGES.map((page) => [page.href, page.keywords]))
  // A consultant should be findable by the words that describe their department, not
  // only by their own name: "bone doctor" has to reach Dr Harshal Godara.
  for (const doctor of DOCTORS) {
    extraKeywords.set(`/doctors/${doctor.id}`, 'doctor consultant physician')
  }

  return entries.map((entry) => ({
    ...entry,
    normalisedLabel: normalise(entry.label),
    // EXPANSION IS OFF HERE — query side only.
    //
    // Expanding both sides looks symmetric and is quietly wrong: it makes the index
    // absorb every word its own keywords are synonyms FOR. "Patient portal" lists
    // "report" as a keyword, "report" expands to pathology and radiology, and the
    // portal then matched a search for "xray". Same for "Visitor information", whose
    // "timing" pulled in "contact" and put it under a search for a phone number.
    //
    // The query side alone already covers the direction that matters: a patient types
    // "bone", that expands to "ortho", and the literal token in the index is hit.
    tokens: new Set(
      tokenise(
        [entry.label, entry.detail ?? '', extraKeywords.get(entry.href) ?? ''].join(' '),
        false,
      ),
    ),
  }))
}

const INDEX = buildIndex()

/* -------------------------------------------------------------------------- */
/* Matching                                                                    */
/* -------------------------------------------------------------------------- */

/** Levenshtein distance, single-row. Forty short strings, so this is free. */
function editDistance(a: string, b: string): number {
  if (a === b) return 0
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length

  let previous = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i += 1) {
    const current = [i]
    for (let j = 1; j <= b.length; j += 1) {
      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
    }
    previous = current
  }
  return previous[b.length]
}

function fuzzyTolerance(token: string): number {
  if (token.length <= 4) return 0
  return token.length > 7 ? 2 : 1
}

/** Best score for one query token against one entry's token set. 0 means no match. */
function scoreToken(token: string, entry: IndexEntry): number {
  if (entry.tokens.has(token)) return 100

  let best = 0
  for (const candidate of entry.tokens) {
    if (candidate.startsWith(token)) best = Math.max(best, 75)
    else if (token.startsWith(candidate) && candidate.length >= 3) best = Math.max(best, 55)
    // Five characters, not three, for a match that is not at a word start. "call" is a
    // substring of "clinically", which put the health library under a search for a
    // phone number; the two word-start rules above already cover every case where a
    // short fragment is genuinely meaningful.
    else if (candidate.includes(token) && token.length >= 5) best = Math.max(best, 35)
  }
  if (best > 0) return best

  // Spelling correction last, and only against tokens of a similar length — comparing
  // "ent" to "neonatology" wastes the budget and can produce a nonsense match.
  const tolerance = fuzzyTolerance(token)
  if (tolerance === 0) return 0
  for (const candidate of entry.tokens) {
    if (Math.abs(candidate.length - token.length) > tolerance) continue
    const distance = editDistance(token, candidate)
    if (distance <= tolerance) return 30 - distance * 5
  }
  return 0
}

/**
 * Live suggestions for what the reader has typed so far.
 *
 * Every query token must match something (AND, not OR). "general medicine" should mean
 * both words, and an OR would rank every surgery in the catalogue above the department
 * actually named.
 */
export function suggestSearch(
  query: string,
  { limit = 7, kinds }: { limit?: number; kinds?: SuggestionKind[] } = {},
): SearchSuggestion[] {
  const cleaned = normalise(query)
  if (cleaned.length < 2) return []

  const tokens = tokenise(query)
  const rawTokens = cleaned.split(' ').filter((token) => !STOP_WORDS.has(token))
  if (rawTokens.length === 0) return []

  const scored: { entry: IndexEntry; score: number }[] = []

  for (const entry of INDEX) {
    if (kinds && !kinds.includes(entry.kind)) continue

    // Score the words actually typed; the synonym expansions are a fallback that can
    // rescue an entry the literal words missed.
    let total = 0
    let matchedAll = true
    for (const token of rawTokens) {
      const direct = scoreToken(token, entry)
      const expanded = direct > 0 ? 0 : Math.max(
        0,
        ...tokenise(token).map((alias) => (alias === token ? 0 : scoreToken(alias, entry) - 15)),
      )
      const best = Math.max(direct, expanded)
      if (best === 0) {
        matchedAll = false
        break
      }
      total += best
    }
    if (!matchedAll) continue

    // The whole query typed against the start of the label is the strongest signal
    // there is — "gen" should put General Medicine above a consultant whose department
    // merely contains the word.
    if (entry.normalisedLabel.startsWith(cleaned)) total += 90
    else if (entry.normalisedLabel.includes(cleaned)) total += 25

    if (entry.kind === 'doctor') total += 6
    if (entry.kind === 'department') total += 3

    scored.push({ entry, score: total })
    void tokens
  }

  return scored
    .sort(
      (a, b) =>
        b.score - a.score ||
        // Shorter label first on a tie: typing "general" prefix-matches both "General
        // Medicine" and "General & Laparoscopic Surgery", and the shorter one is closer
        // to what was actually typed.
        a.entry.label.length - b.entry.label.length ||
        a.entry.label.localeCompare(b.entry.label),
    )
    .slice(0, limit)
    .map(({ entry }) => ({
      label: entry.label,
      detail: entry.detail,
      kind: entry.kind,
      href: entry.href,
    }))
}

/**
 * "Did you mean …?" for a query that matched no consultant.
 *
 * Runs the same matcher and keeps only entries a typo could plausibly have meant, so a
 * nonsense string still gets nothing. A wrong "did you mean" on a hospital directory
 * sends someone to the wrong speciality, and silence is recoverable where a confident
 * wrong answer is not.
 */
export function didYouMean(query: string, limit = 3): SearchSuggestion[] {
  if (normalise(query).length < 3) return []
  return suggestSearch(query, { limit })
}
