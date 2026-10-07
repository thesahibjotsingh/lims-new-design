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
    title: translatedCategoryTitle('support', locale as Locale),
    description: translatedCategoryBlurb('support', locale as Locale),
  }
}

export default async function PatientCarePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  return <CategoryIndex category="support" query={q} />
}
