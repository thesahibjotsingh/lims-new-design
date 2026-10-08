// app/api/search-index/[locale]/route.ts
//
// The site search's documents for one language, as JSON: every department, condition, treatment,
// question, doctor and hospital-information entry (lib/search/build-docs.ts). The browser fetches
// this the first time a search box is focused and builds the index itself (lib/search/engine.ts).
//
// Static: built once when the site is published, one file per language, served from the CDN with the
// rest of the assets. It changes only when the site's content does, so a short cache is enough and a
// new publish is visible within the hour.

import { routing } from '@/i18n/routing'
import type { Locale } from '@/i18n/routing'
import { buildSearchDocs } from '@/lib/search/build-docs'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) {
    return new Response('Unknown language', { status: 404 })
  }
  return Response.json(buildSearchDocs(locale as Locale), {
    headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' },
  })
}
