import type { Metadata } from 'next'
import { CategoryIndex } from '@/components/primitives/CategoryIndex'
import type { Locale } from '@/i18n/routing'
import { translatedCategoryBlurb, translatedCategoryTitle } from '@/lib/services-i18n'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: translatedCategoryTitle('clinical', locale as Locale),
    description: translatedCategoryBlurb('clinical', locale as Locale),
  }
}

// Next 15: searchParams is a Promise in page components.
export default async function SpecialitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  return <CategoryIndex category="clinical" query={q} />
}
