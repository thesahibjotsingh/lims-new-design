// scripts/gemini-descriptions.ts
//
// Gemini as a SECOND PAIR OF EYES and a first drafter for the overviews (lib/search/descriptions). Run by hand, on
// this PC, once in a while. It is never part of the site: nothing here ships, no key is in the repo, and a visitor's
// phone never talks to Google.
//
//   npx tsx scripts/gemini-descriptions.ts models                 which model names the key can use
//   npx tsx scripts/gemini-descriptions.ts check [--only a,b] [--force] [--limit N]
//                                                                  Gemini reads each existing overview and FLAGS what
//                                                                  looks wrong (it never rewrites)
//   npx tsx scripts/gemini-descriptions.ts draft [--only a,b] [--force] [--limit N]
//                                                                  Gemini drafts the topics in scripts/gemini-topics.ts
//   npx tsx scripts/gemini-descriptions.ts emit --ids a,b --file gemini-a
//                                                                  writes the chosen drafts as lib/search/descriptions/<file>.ts
//
// WHAT IS SENT. Only our own overview text and the names of subjects ("knee pain"). No visitor's search, no log, no
// personal data. WHAT IS NOT USED. Google Search: the call has no search tool. Grounded results come with terms
// (no changing them, no keeping them) and Gemini's terms bar medical advice, so Gemini here is a plain model asked to
// edit and draft, and everything it says goes to a person before it goes anywhere.
//
// THE KEY. GEMINI_API_KEY in .env.local (git-ignored: .gitignore has `.env*.local`), or in the environment. The
// script never prints it. Model: GEMINI_MODEL, default below; `models` lists what the key allows.
//
// OUTPUT goes to private/gemini/ (git-ignored): check.json, drafts.json. Every call is saved at once, so a stop (a
// rate limit, the PC sleeping) loses nothing: run it again and it carries on where it was.

import fs from 'node:fs'
import path from 'node:path'
import { DESCRIPTIONS } from '@/lib/search/descriptions/data'
import type { DescriptionEntry, DescriptionText } from '@/lib/search/descriptions/types'
import { TOPICS } from './gemini-topics'

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, 'private', 'gemini')
const CHECK_FILE = path.join(OUT_DIR, 'check.json')
const DRAFT_FILE = path.join(OUT_DIR, 'drafts.json')

/* ------------------------------------------------------------------ settings */

function loadEnvFile(file: string) {
  if (!fs.existsSync(file)) return
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
    if (!match || line.trim().startsWith('#')) continue
    if (process.env[match[1]] === undefined) process.env[match[1]] = match[2].replace(/^["']|["']$/g, '')
  }
}
loadEnvFile(path.join(ROOT, '.env.local'))
loadEnvFile(path.join(ROOT, '.env'))

const KEY = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY ?? ''
const MODEL = process.env.GEMINI_MODEL ?? 'gemini-3.8-flash'
const DELAY_MS = Number(process.env.GEMINI_DELAY_MS ?? 4000)
// GEMINI_BASE_URL is only for testing this script against a local stand-in server.
const BASE = process.env.GEMINI_BASE_URL ?? 'https://generativelanguage.googleapis.com/v1beta'

/* ------------------------------------------------------------------ the rules an overview must meet (the eval's) */

const BANNED_EN = /\b(tablets?|pills?|syrups?|doses?|dosage|mg|antibiotics?|painkillers?|paracetamol|ibuprofen|medicines?|medications?|drugs?|remedy|remedies|cure[sd]?|ointments?|creams?|injections?)\b/i
const BANNED_LOCAL = /(दवा|दवाई|गोली|घरेलू|नुस्खा|ਦਵਾਈ|ਗੋਲੀ|ਘਰੇਲੂ|ਨੁਸਖਾ)/

/** The same checks scripts/search-eval.ts makes of every overview, so a draft that fails is sent back at once. */
function problemsIn(text: Record<'en' | 'hi' | 'pa', DescriptionText>): string[] {
  const problems: string[] = []
  for (const locale of ['en', 'hi', 'pa'] as const) {
    const part = text[locale]
    if (!part || typeof part.about !== 'string' || !Array.isArray(part.points)) {
      problems.push(`${locale}: needs "about" and "points"`)
      continue
    }
    const all = [part.about, ...part.points]
    if (!part.about || part.about.length > 340) problems.push(`${locale}: "about" is missing or over 340 characters`)
    if (part.points.length < 3 || part.points.length > 6) problems.push(`${locale}: needs 3 to 6 points`)
    const limit = locale === 'en' ? 210 : 270
    all.forEach((line) => {
      if (line.length > limit) problems.push(`${locale}: a line is over ${limit} characters: "${line.slice(0, 50)}..."`)
    })
    if (all.some((line) => BANNED_EN.test(line) || BANNED_LOCAL.test(line))) problems.push(`${locale}: names a medicine, dose, remedy or cure`)
    if (new Set(all).size !== all.length) problems.push(`${locale}: a line is repeated`)
    if (locale === 'hi' && !/[ऀ-ॿ]/.test(all.join(''))) problems.push('hi: must be in Devanagari')
    if (locale === 'pa' && !/[਀-੿]/.test(all.join(''))) problems.push('pa: must be in Gurmukhi')
    if (locale === 'en' && /[ऀ-੿]/.test(all.join(''))) problems.push('en: must be English only')
  }
  return problems
}

/* ------------------------------------------------------------------ talking to Gemini */

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** One call, no tools (so no Google Search), JSON back. Retries a busy or rate-limited server, never a bad request. */
async function generate(system: string, prompt: string): Promise<string> {
  const body = {
    systemInstruction: { parts: [{ text: system }] },
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.2, responseMimeType: 'application/json' },
  }
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const response = await fetch(`${BASE}/models/${MODEL}:generateContent`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': KEY },
      body: JSON.stringify(body),
    })
    if (response.ok) {
      const data = (await response.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] }
      const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? '').join('') ?? ''
      if (!text) throw new Error('Gemini sent back no text (it may have declined the request).')
      return text
    }
    const detail = (await response.text()).slice(0, 400)
    if ((response.status === 429 || response.status >= 500) && attempt < 6) {
      const wait = Math.min(60_000, 5_000 * 2 ** (attempt - 1))
      console.log(`  ... Gemini said ${response.status}; waiting ${Math.round(wait / 1000)} s (try ${attempt} of 6)`)
      await sleep(wait)
      continue
    }
    throw new Error(`Gemini ${response.status}: ${detail}`)
  }
  throw new Error('Gemini kept refusing; try again later.')
}

function parseJson<T>(text: string): T {
  const clean = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')
  return JSON.parse(clean) as T
}

/* ------------------------------------------------------------------ small helpers */

function readJson<T>(file: string, fallback: T): T {
  return fs.existsSync(file) ? (JSON.parse(fs.readFileSync(file, 'utf8')) as T) : fallback
}

function writeJson(file: string, value: unknown) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, JSON.stringify(value, null, 2), 'utf8')
}

function flag(name: string): string | undefined {
  const at = process.argv.indexOf(`--${name}`)
  return at === -1 ? undefined : (process.argv[at + 1] ?? '')
}

function chosen<T extends { id: string }>(all: readonly T[]): T[] {
  const only = flag('only')?.split(',').map((id) => id.trim()).filter(Boolean)
  let list = only?.length ? all.filter((item) => only.includes(item.id)) : [...all]
  const limit = Number(flag('limit') ?? 0)
  if (limit > 0) list = list.slice(0, limit)
  return list
}

function needKey() {
  if (!KEY) {
    console.error('No key. Put GEMINI_API_KEY=... on a line of its own in .env.local (that file is git-ignored), then run this again.')
    process.exit(1)
  }
}

/* ------------------------------------------------------------------ check: a second opinion on what exists */

interface Issue {
  where: string
  problem: string
  suggestion?: string
}
interface CheckResult {
  id: string
  model: string
  checkedAt: string
  verdict: 'ok' | 'review'
  issues: Issue[]
}

const CHECK_SYSTEM = `You are a careful medical editor reviewing short patient-information overviews for the website of a multispecialty hospital in Hisar, Haryana, India.
Each overview is GENERAL INFORMATION only: what a complaint, condition or test is, and where a complaint commonly comes from. By design it never names a medicine, dose, home remedy or cure, never tells the reader they have a disease, and never gives numbers for a reader to measure themselves against. A different part of the page (written by the hospital) says when to see a doctor.
Your job is to FLAG problems, not to rewrite and not to add material. Flag only real problems:
1. a statement that is medically wrong or misleading;
2. a claim stronger than the evidence ("always", "never", "cures", "will");
3. a place where the text could falsely reassure a reader about something serious;
4. anything that reads like treatment or medicine advice;
5. in Hindi (hi) and Punjabi (pa): meaning that differs from the English, a wrong or unnatural medical term, or a grammar or script mistake.
Do NOT flag matters of style or taste, or things a short overview cannot cover. If the text is fine, say so.
Reply with JSON only: {"verdict":"ok"|"review","issues":[{"where":"en.about"|"en.points[N]"|"hi.about"|"hi.points[N]"|"pa.about"|"pa.points[N]","problem":"...","suggestion":"..."}]}
"points[N]" counts from 0. At most 6 issues. "ok" means no issues.`

async function runCheck() {
  needKey()
  const done = readJson<Record<string, CheckResult>>(CHECK_FILE, {})
  const force = process.argv.includes('--force')
  const todo = chosen(DESCRIPTIONS).filter((entry) => force || !done[entry.id])
  console.log(`Checking ${todo.length} of ${DESCRIPTIONS.length} overviews with ${MODEL}.`)
  let n = 0
  for (const entry of todo) {
    n += 1
    const prompt = JSON.stringify({ kind: entry.kind, searchedAs: entry.phrases.slice(0, 4), en: entry.en, hi: entry.hi, pa: entry.pa })
    try {
      const answer = parseJson<{ verdict?: string; issues?: Issue[] }>(await generate(CHECK_SYSTEM, prompt))
      const issues = (answer.issues ?? []).filter((issue) => issue && issue.problem).slice(0, 6)
      done[entry.id] = { id: entry.id, model: MODEL, checkedAt: new Date().toISOString(), verdict: issues.length ? 'review' : 'ok', issues }
      writeJson(CHECK_FILE, done)
      console.log(`[${n}/${todo.length}] ${entry.id}: ${issues.length ? `${issues.length} to look at` : 'ok'}`)
    } catch (error) {
      console.log(`[${n}/${todo.length}] ${entry.id}: failed (${(error as Error).message})`)
    }
    await sleep(DELAY_MS)
  }
  const all = Object.values(done)
  console.log(`\nDone. ${all.filter((r) => r.verdict === 'ok').length} ok, ${all.filter((r) => r.verdict === 'review').length} with something to look at. Saved in private/gemini/check.json.`)
}

/* ------------------------------------------------------------------ draft: new overviews */

interface Draft {
  id: string
  kind: DescriptionEntry['kind']
  phrases: string[]
  model: string
  draftedAt: string
  problems: string[]
  en: DescriptionText
  hi: DescriptionText
  pa: DescriptionText
}

const DRAFT_SYSTEM = `You write short patient-information overviews for the website of a multispecialty hospital in Hisar, Haryana, India, from your own general medical knowledge. Do not copy wording from any website or book.
THE FORM. For one subject, write the same overview in English (en), Hindi (hi, Devanagari) and Punjabi (pa, Gurmukhi):
  "about": one or two plain sentences. What it is, and for a complaint where it commonly comes from. At most 330 characters.
  "points": 3 to 6 short lines. For a COMPLAINT (kind symptom) they are common reasons it happens. For a CONDITION or a TEST (kind condition or test) they are key points. Each line at most 200 characters in English and 260 in Hindi or Punjabi.
THE RULES, which are checked by a program afterwards.
  - General information only. Never say "you have". Never diagnose.
  - NEVER name or hint at a medicine, tablet, pill, syrup, drug, dose, antibiotic, painkiller, injection, cream, ointment, home remedy or cure, in any language. Do not say what treatment to take. You may say a doctor can find the cause or that a test is done.
  - No numbers a reader could measure themselves against (no temperatures, blood-pressure or sugar values, no day counts). A scan or test may be described by what it shows.
  - Nothing frightening for its own sake; where something is serious or an emergency, say so calmly in one line.
  - Plain words a 12-year-old can read. Hindi and Punjabi in everyday spoken style, with English medical terms (MRI, ECG, ultrasound) kept in Latin letters where that is how people say them. Translate the meaning of the English, do not add to it.
  - The English text must contain only English letters (no Hindi or Punjabi). The Hindi must contain Devanagari. The Punjabi must contain Gurmukhi.
Reply with JSON only: {"en":{"about":"...","points":["..."]},"hi":{"about":"...","points":["..."]},"pa":{"about":"...","points":["..."]}}`

async function runDraft() {
  needKey()
  const existing = new Set(DESCRIPTIONS.map((entry) => entry.id))
  const done = readJson<Record<string, Draft>>(DRAFT_FILE, {})
  const force = process.argv.includes('--force')
  const topics = chosen(TOPICS).filter((topic) => {
    if (existing.has(topic.id)) {
      console.log(`  skipping ${topic.id}: already in lib/search/descriptions`)
      return false
    }
    return force || !done[topic.id]
  })
  console.log(`Drafting ${topics.length} topics with ${MODEL}.`)
  let n = 0
  for (const topic of topics) {
    n += 1
    const ask = `Subject: ${topic.title}\nkind: ${topic.kind}\nPeople search for it as: ${topic.phrases.slice(0, 4).join('; ')}`
    try {
      let text = parseJson<Record<'en' | 'hi' | 'pa', DescriptionText>>(await generate(DRAFT_SYSTEM, ask))
      let problems = problemsIn(text)
      // One chance to put right what the checks found, told exactly what it was.
      if (problems.length > 0) {
        await sleep(DELAY_MS)
        const retry = `${ask}\n\nYour first answer broke these rules, so write it again from the start and keep to them:\n- ${problems.join('\n- ')}`
        text = parseJson<Record<'en' | 'hi' | 'pa', DescriptionText>>(await generate(DRAFT_SYSTEM, retry))
        problems = problemsIn(text)
      }
      done[topic.id] = { id: topic.id, kind: topic.kind, phrases: topic.phrases, model: MODEL, draftedAt: new Date().toISOString(), problems, en: text.en, hi: text.hi, pa: text.pa }
      writeJson(DRAFT_FILE, done)
      console.log(`[${n}/${topics.length}] ${topic.id}: ${problems.length ? `still ${problems.length} problem(s)` : 'ok'}`)
    } catch (error) {
      console.log(`[${n}/${topics.length}] ${topic.id}: failed (${(error as Error).message})`)
    }
    await sleep(DELAY_MS)
  }
  const all = Object.values(done)
  console.log(`\nDone. ${all.length} drafts in private/gemini/drafts.json (${all.filter((d) => d.problems.length).length} with a problem still to fix by hand).`)
}

/* ------------------------------------------------------------------ emit: chosen drafts as a source file */

function quote(value: string): string {
  return JSON.stringify(value)
}

function runEmit() {
  const ids = (flag('ids') ?? '').split(',').map((id) => id.trim()).filter(Boolean)
  const file = (flag('file') ?? 'gemini-a').replace(/[^a-z0-9-]/gi, '')
  const constant = file.toUpperCase().replace(/-/g, '_')
  if (ids.length === 0) {
    console.error('Say which drafts: --ids a,b,c [--file gemini-a]')
    process.exit(1)
  }
  const drafts = readJson<Record<string, Draft>>(DRAFT_FILE, {})
  const missing = ids.filter((id) => !drafts[id])
  if (missing.length) {
    console.error(`No such draft: ${missing.join(', ')}`)
    process.exit(1)
  }
  const part = (text: DescriptionText) =>
    `{\n      about: ${quote(text.about)},\n      points: [\n${text.points.map((line) => `        ${quote(line)},`).join('\n')}\n      ],\n    }`
  const entries = ids
    .map((id) => {
      const d = drafts[id]
      return `  {\n    id: ${quote(d.id)},\n    kind: ${quote(d.kind)},\n    phrases: [${d.phrases.map(quote).join(', ')}],\n    en: ${part(d.en)},\n    hi: ${part(d.hi)},\n    pa: ${part(d.pa)},\n  },`
    })
    .join('\n')
  const source = `// lib/search/descriptions/${file}.ts
//
// Overviews drafted with Gemini (no Google Search), read and corrected by a person. DRAFT: not yet reviewed by a LIMS
// doctor (see types.ts). Hindi and Punjabi are drafts of the English. No medicine, dose, home remedy or cure appears in any.

import type { DescriptionEntry } from '@/lib/search/descriptions/types'

export const ${constant}: DescriptionEntry[] = [
${entries}
]
`
  const target = path.join(ROOT, 'lib', 'search', 'descriptions', `${file}.ts`)
  fs.writeFileSync(target, source, 'utf8')
  console.log(`Wrote ${path.relative(ROOT, target)} with ${ids.length} entries. Now add ${constant} to lib/search/descriptions/data.ts, run scripts/gen-known-words.ts and the eval.`)
}

/* ------------------------------------------------------------------ models */

async function runModels() {
  needKey()
  const response = await fetch(`${BASE}/models?pageSize=100`, { headers: { 'x-goog-api-key': KEY } })
  if (!response.ok) {
    console.error(`Gemini ${response.status}: ${(await response.text()).slice(0, 300)}`)
    process.exit(1)
  }
  const data = (await response.json()) as { models?: { name: string; supportedGenerationMethods?: string[] }[] }
  const names = (data.models ?? [])
    .filter((model) => model.supportedGenerationMethods?.includes('generateContent'))
    .map((model) => model.name.replace(/^models\//, ''))
  console.log(`Models this key can use for text (set GEMINI_MODEL in .env.local to pick one; now ${MODEL}):\n  ${names.join('\n  ')}`)
}

/* ------------------------------------------------------------------ go */

const mode = process.argv[2]
const run = mode === 'check' ? runCheck : mode === 'draft' ? runDraft : mode === 'emit' ? runEmit : mode === 'models' ? runModels : null
if (!run) {
  console.error('Usage: npx tsx scripts/gemini-descriptions.ts models | check | draft | emit   (see the top of the file)')
  process.exit(1)
}
Promise.resolve(run()).catch((error) => {
  console.error((error as Error).message)
  process.exit(1)
})
