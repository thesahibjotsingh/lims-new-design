import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import { SearchResults } from '@/components/search/SearchResults'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'searchPage' })
  // A results page is different for every query and says nothing a search engine should list.
  return { title: t('metaTitle'), robots: { index: false, follow: true } }
}

/*
 * The results page: /search?q=stomach+ache. Static; the answer is worked out in the browser from the
 * same index as the suggestion lists (components/search/SearchResults.tsx). The Suspense boundary is
 * what lets the page stay static while it reads ?q=.
 */
export default function SearchPage() {
  return (
    <Suspense fallback={<div aria-hidden="true" className="h-24 bg-gradient-to-r from-brand-teal-dark to-brand-teal" />}>
      <SearchResults />
    </Suspense>
  )
}
