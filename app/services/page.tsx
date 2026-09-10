import type { Metadata } from 'next'
import { CategoryIndex } from '@/components/primitives/CategoryIndex'
import { getCategory } from '@/lib/services'

export const metadata: Metadata = {
  title: getCategory('diagnostics').pageTitle,
  description: getCategory('diagnostics').blurb,
}

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  return <CategoryIndex category="diagnostics" query={q} />
}
