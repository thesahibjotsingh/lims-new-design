import type { Metadata } from 'next'
import { CategoryIndex } from '@/components/primitives/CategoryIndex'
import { getCategory } from '@/lib/services'

export const metadata: Metadata = {
  title: getCategory('support').pageTitle,
  description: getCategory('support').blurb,
}

export default async function PatientCarePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  return <CategoryIndex category="support" query={q} />
}
