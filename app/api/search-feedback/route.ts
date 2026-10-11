import { NextResponse } from 'next/server'
import { routing } from '@/i18n/routing'
import { DISTRESS_PHRASES } from '@/lib/search/groups'

/*
 * "Was this helpful?" under the Quick guide on the results page.
 *
 * WHY. A search box is only as good as what it is told about its answers. A visitor pressing No on a result is
 * the surest sign that the answer was wrong or not enough, and it costs them one tap.
 *
 * WHAT IS KEPT. The phrase, the language, how many Yes and how many No, and the first and last time. Nothing about the
 * person: no IP address, no cookie, no account, no page they were on. The browser sends it once per phrase per visit,
 * not at all when the visitor has Do Not Track on (components/search/reportFeedback.ts), and a phrase that looks like
 * a phone number or an e-mail address is refused here. A phrase that contains a distress phrase (anything about
 * harming oneself) is refused as well: that search is never stored, here or anywhere else on the site.
 *
 * WHERE IT IS KEPT. In the same Cloudflare KV namespace as the missed searches (SEARCH_LOG, see
 * app/api/search-miss/route.ts), under the prefix "fb:". With none bound, the phrase goes to the Worker's log line
 * and nowhere else, and the endpoint still answers 204: feedback must never be the reason a search page breaks.
 *
 * READING IT. GET /api/search-feedback?token=... with the SEARCH_LOG_TOKEN secret returns the phrases people marked
 * "No" most often. With no such secret set, GET is a 404.
 */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const KEEP_SECONDS = 60 * 60 * 24 * 90

/** Every way of saying it in lib/search/groups.ts, one by one: the lines there are "a|b|c ; d|e" groups. */
const DISTRESS_TERMS = DISTRESS_PHRASES.flatMap((line) => line.split(/[|;]/))
  .map((term) => term.trim().toLowerCase())
  .filter((term) => term.length >= 4)

interface KvLike {
  get(key: string): Promise<string | null>
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>
  list(options: { prefix: string; limit?: number }): Promise<{ keys: { name: string }[] }>
}

async function logStore(): Promise<KvLike | undefined> {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare')
    const env = getCloudflareContext().env as unknown as { SEARCH_LOG?: KvLike }
    return env.SEARCH_LOG
  } catch {
    return undefined
  }
}

function clean(raw: unknown): string | null {
  if (typeof raw !== 'string') return null
  const phrase = raw.toLowerCase().replace(/\s+/g, ' ').trim()
  if (phrase.length < 3 || phrase.length > 60) return null
  if (phrase.includes('@')) return null
  if (/\d{6,}/.test(phrase.replace(/[\s-]/g, ''))) return null
  if (DISTRESS_TERMS.some((term) => phrase.includes(term))) return null
  return phrase
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return new NextResponse(null, { status: 400 })
  }

  const phrase = clean(body.q)
  const locale = typeof body.locale === 'string' ? body.locale : ''
  const helpful = typeof body.helpful === 'boolean' ? body.helpful : null
  if (!(routing.locales as readonly string[]).includes(locale) || helpful === null) {
    return new NextResponse(null, { status: 400 })
  }
  // A phrase that may not be stored is still a fine request: nothing is stored, and nothing is said about why.
  if (!phrase) return new NextResponse(null, { status: 204 })

  const store = await logStore()
  if (!store) {
    console.log(`search-feedback ${locale} ${helpful ? 'yes' : 'no'} ${JSON.stringify(phrase)}`)
    return new NextResponse(null, { status: 204 })
  }

  const key = `fb:${locale}:${phrase}`
  const now = new Date().toISOString()
  try {
    const existing = await store.get(key)
    const record = existing
      ? { ...(JSON.parse(existing) as { yes: number; no: number; first: string }), last: now }
      : { yes: 0, no: 0, first: now, last: now }
    if (helpful) record.yes += 1
    else record.no += 1
    await store.put(key, JSON.stringify(record), { expirationTtl: KEEP_SECONDS })
  } catch {
    // A counter that could not be written is not worth a failed request.
  }
  return new NextResponse(null, { status: 204 })
}

export async function GET(request: Request) {
  const secret = process.env.SEARCH_LOG_TOKEN
  const token = new URL(request.url).searchParams.get('token')
  if (!secret || token !== secret) return new NextResponse(null, { status: 404 })

  const store = await logStore()
  if (!store) return NextResponse.json({ ok: false, error: 'No SEARCH_LOG store is bound.' }, { status: 503 })

  const { keys } = await store.list({ prefix: 'fb:', limit: 1000 })
  const rows: { phrase: string; locale: string; yes: number; no: number; last: string }[] = []
  for (const { name } of keys) {
    const value = await store.get(name)
    if (!value) continue
    const [, locale, ...rest] = name.split(':')
    const record = JSON.parse(value) as { yes: number; no: number; last: string }
    rows.push({ phrase: rest.join(':'), locale, yes: record.yes, no: record.no, last: record.last })
  }
  rows.sort((a, b) => b.no - a.no)
  return NextResponse.json({ ok: true, count: rows.length, phrases: rows.slice(0, 200) })
}
