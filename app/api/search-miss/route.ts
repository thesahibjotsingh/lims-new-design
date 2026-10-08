import { NextResponse } from 'next/server'
import { routing } from '@/i18n/routing'

/*
 * The searches that found nothing, or only a near miss.
 *
 * WHY. A search box that answers every question is only possible if somebody finds out which questions
 * it could not answer. This keeps a count per phrase, so the hospital can see what patients typed that
 * the site had no page for, and add it (to lib/search/groups.ts or a department page).
 *
 * WHAT IS KEPT. The phrase, the language, how many times, and the first and last time. Nothing about
 * the person: no IP address, no cookie, no account, no page they were on. The browser sends it only for
 * a phrase that found nothing or a near miss, once per phrase per visit, and not at all when the visitor
 * has Do Not Track on (components/search/reportMiss.ts). Phone-number-like and e-mail-like text is
 * refused here as well, because a hospital search box is where somebody might type their own details.
 *
 * WHERE IT IS KEPT. In a Cloudflare KV namespace bound as SEARCH_LOG (see README-DEPLOY.md). With none
 * bound, which is the state of a fresh deploy and of `next dev`, the phrase goes to the Worker's log line
 * and nowhere else, and the endpoint still answers 204: logging must never be the reason a search fails.
 *
 * READING IT. GET /api/search-miss?token=... with the SEARCH_LOG_TOKEN secret returns the most-missed
 * phrases. With no such secret set, GET is a 404, so nothing is exposed by default.
 */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const KEEP_SECONDS = 60 * 60 * 24 * 90

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
    // Not running on Cloudflare (next dev, a unit test): no store.
    return undefined
  }
}

function clean(raw: unknown): string | null {
  if (typeof raw !== 'string') return null
  const phrase = raw.toLowerCase().replace(/\s+/g, ' ').trim()
  if (phrase.length < 3 || phrase.length > 60) return null
  if (phrase.includes('@')) return null
  if (/\d{6,}/.test(phrase.replace(/[\s-]/g, ''))) return null
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
  const mode = body.mode === 'none' ? 'none' : body.mode === 'weak' ? 'weak' : null
  if (!phrase || !mode || !(routing.locales as readonly string[]).includes(locale)) {
    return new NextResponse(null, { status: 400 })
  }

  const store = await logStore()
  if (!store) {
    console.log(`search-miss ${locale} ${mode} ${JSON.stringify(phrase)}`)
    return new NextResponse(null, { status: 204 })
  }

  const key = `miss:${locale}:${phrase}`
  const now = new Date().toISOString()
  try {
    const existing = await store.get(key)
    const record = existing
      ? { ...(JSON.parse(existing) as { n: number; first: string; mode: string }), last: now }
      : { n: 0, first: now, last: now, mode }
    record.n += 1
    // A phrase that found nothing at least once is a miss, even if it is a near miss other times.
    if (mode === 'none') record.mode = 'none'
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

  const { keys } = await store.list({ prefix: 'miss:', limit: 1000 })
  const rows: { phrase: string; locale: string; n: number; mode: string; last: string }[] = []
  for (const { name } of keys) {
    const value = await store.get(name)
    if (!value) continue
    const [, locale, ...rest] = name.split(':')
    const record = JSON.parse(value) as { n: number; mode: string; last: string }
    rows.push({ phrase: rest.join(':'), locale, n: record.n, mode: record.mode, last: record.last })
  }
  rows.sort((a, b) => b.n - a.n)
  return NextResponse.json({ ok: true, count: rows.length, misses: rows.slice(0, 200) })
}
