import type { Metadata } from 'next'
import { CategoryIndex } from '@/components/primitives/CategoryIndex'
import { getCategory } from '@/lib/services'

export const metadata: Metadata = {
  title: getCategory('clinical').pageTitle,
  description: getCategory('clinical').blurb,
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
