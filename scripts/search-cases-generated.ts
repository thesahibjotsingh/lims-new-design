// scripts/search-cases-generated.ts
//
// Thousands of cases made from the hand-checked ones, by the ways real people vary a question:
//   - how it is worded      ("knee pain", "i have knee pain", "best hospital for knee pain", "knee pain treatment")
//   - how it is typed       (a letter missing, two letters swapped, a letter doubled, CAPITALS, extra spaces)
//   - how it is spoken      ("i have been having X since morning", Hindi and Punjabi sentence frames)
//
// Every generated case keeps the expectation of the case it came from, and it is checked by the SAME
// rules, including the Quick-guide rule in scripts/search-eval.ts: the guide may name one of the
// departments the seed expects, or none, never another. That rule is what makes a large set useful: a
// wrong sentence for ANY of these wordings fails the run.
//
// Deterministic (no randomness), so a failure is the same failure next time. A mistake that cannot be
// told from another word (a one-letter slip that makes a different real word) is not generated:
// see `mutable`.

import { ENGLISH_SYMPTOMS, ROMAN } from './search-cases'
import { BODY_SEEDS, ROMAN_SEEDS } from './search-cases-grid'
import { EXTRA_SCRIPT } from './search-cases-script'
import { EXTRA_VOICE } from './search-cases-voice'

function split(line: string): [string, string] {
  const at = line.indexOf(' => ')
  return [line.slice(0, at), line.slice(at + 4)]
}

/** Words that stay as they are: a slip in them is a different real word, or they are too short to repair. */
function mutable(word: string): boolean {
  return /^[a-z]+$/.test(word) && word.length >= 8
}

/** The longest mutable word of a query, or null. */
function target(query: string): { word: string; index: number } | null {
  const parts = query.split(' ')
  let best = -1
  parts.forEach((word, index) => {
    if (mutable(word) && (best < 0 || word.length > parts[best].length)) best = index
  })
  return best < 0 ? null : { word: parts[best], index: best }
}

function slip(query: string, kind: 'drop' | 'swap' | 'double'): string | null {
  const hit = target(query)
  if (!hit) return null
  const { word } = hit
  const at = Math.floor(word.length / 2)
  let changed: string
  if (kind === 'drop') changed = word.slice(0, at) + word.slice(at + 1)
  else if (kind === 'swap') changed = word.slice(0, at) + word[at + 1] + word[at] + word.slice(at + 2)
  else changed = word.slice(0, at) + word[at] + word.slice(at)
  if (changed === word) return null
  const parts = query.split(' ')
  parts[hit.index] = changed
  return parts.join(' ')
}

const ENGLISH_FRAMES: ((q: string) => string)[] = [
  (q) => `i have ${q}`,
  (q) => `${q} treatment`,
  (q) => `${q} doctor`,
  (q) => `${q} in hisar`,
  (q) => `best hospital for ${q}`,
  (q) => `${q} specialist near me`,
  (q) => `what to do for ${q}`,
  (q) => `i have been having ${q} since morning`,
  (q) => `${q}?`,
  (q) => `  ${q}   `,
  (q) => q.toUpperCase(),
]

const ROMAN_FRAMES: ((q: string) => string)[] = [
  (q) => `mujhe ${q} hai`,
  (q) => `${q} ka doctor`,
  (q) => `${q} ka ilaj`,
  (q) => `${q} ke liye doctor`,
  (q) => `${q} hai`,
  (q) => q.toUpperCase(),
]

const HINDI_FRAMES: ((q: string) => string)[] = [
  (q) => `मुझे ${q} है`,
  (q) => `${q} का इलाज`,
  (q) => `${q} के लिए डॉक्टर`,
  (q) => `${q} ?`,
]

const PUNJABI_FRAMES: ((q: string) => string)[] = [
  (q) => `ਮੈਨੂੰ ${q} ਹੈ`,
  (q) => `${q} ਦਾ ਇਲਾਜ`,
  (q) => `${q} ਲਈ ਡਾਕਟਰ`,
  (q) => `${q} ?`,
]

const ID_OK = /^(GAS|GEN|SURG|ORTHO|SPINE|NEURO|URO|OBG|PED|EYE|ENT|DENT|ANAES|TRAUMA|ER|ECHO|LAB|XRAY|USG|DOPP|ENDO|RAD|none|svc:[a-z-]+)$/
const NOT_A_COMPLAINT =
  /(doctor|appointment|physio|dietit|diet|pharm|chemist|medical store|medicine|ambulance|surgery|operation|dawai|डॉक्टर|सर्जरी|ऑपरेशन|फिजियो|डाइट|दवा|ਡਾਕਟਰ|ਫਿਜ਼ੀਓ|ਦਵਾਈ|ਸਰਜਰੀ|mulakat|मुलाकात|एम्बुलेंस|ਐਂਬੂਲੈਂਸ|एक्स|ਐਕਸ|अल्ट्रा|ਅਲਟਰਾ|जांच|ਜਾਂਚ|स्कैन|ਸਕੈਨ|ईसीजी|ਈਸੀਜੀ|एंडो|ਐਂਡੋ|सिटी|ਸੀਟੀ)/i

function frames(seeds: readonly string[], list: ((q: string) => string)[], slips: boolean): string[] {
  const out: string[] = []
  for (const line of seeds) {
    const [query, expect] = split(line)
    // Only plain "find this department" seeds are reworded: not emergencies (their wording is the point),
    // not sentences that already carry a frame, not cases that check an exact guide result.
    if (expect.includes('!') || expect.includes('G:') || expect.includes('Gx:') || expect.includes('-')) continue
    if (query.split(' ').length > 3) continue
    // Only seeds about a complaint or a department are reworded as "I have X": not the names of services,
    // pages or people ("physiotherapy", "doctor", "appointment"), which are not something one "has".
    if (!expect.split(' ').every((token) => ID_OK.test(token))) continue
    if (NOT_A_COMPLAINT.test(query)) continue
    for (const frame of list) out.push(`${frame(query)} => ${expect}`)
    if (slips) {
      for (const kind of ['drop', 'swap', 'double'] as const) {
        const changed = slip(query, kind)
        if (changed) out.push(`${changed} => ${expect}`)
      }
    }
  }
  return out
}

/** Emergencies stay emergencies however they are typed. */
function emergencyForms(seeds: readonly string[]): string[] {
  const out: string[] = []
  for (const line of seeds) {
    const [query, expect] = split(line)
    if (!expect.includes('!')) continue
    const locale = /^(hi|pa):/.exec(query)?.[0] ?? ''
    const bare = locale ? query.slice(3) : query
    out.push(`${locale}${bare.toUpperCase()} => ${expect}`)
    out.push(`${locale}  ${bare}  => ${expect}`)
    out.push(`${locale}${bare}? => ${expect}`)
    out.push(`${locale}${bare}!! => ${expect}`)
    out.push(`${locale}please help ${bare} => ${expect}`)
  }
  return out
}

const hindi = EXTRA_SCRIPT.filter((line) => line.startsWith('hi:'))
const punjabi = EXTRA_SCRIPT.filter((line) => line.startsWith('pa:'))
const strip = (lines: string[], prefix: string) => lines.map((line) => line.slice(prefix.length))

export const GENERATED: readonly string[] = [
  ...frames(ENGLISH_SYMPTOMS, ENGLISH_FRAMES, true),
  ...frames(ROMAN, ROMAN_FRAMES, true),
  ...frames(BODY_SEEDS, ENGLISH_FRAMES, true),
  ...frames(ROMAN_SEEDS, ROMAN_FRAMES, true),
  ...frames(strip(hindi, 'hi:'), HINDI_FRAMES, false).map((line) => `hi:${line}`),
  ...frames(strip(punjabi, 'pa:'), PUNJABI_FRAMES, false).map((line) => `pa:${line}`),
  ...emergencyForms(EXTRA_VOICE),
  ...emergencyForms(EXTRA_SCRIPT),
]
