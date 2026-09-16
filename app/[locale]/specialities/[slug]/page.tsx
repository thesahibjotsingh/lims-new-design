import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServiceDetail } from '@/components/primitives/ServiceDetail'
import { getService, servicesByCategory } from '@/lib/services'

/**
 * Resolve a slug, but only if it belongs to THIS category.
 *
 * Without the category check, /specialities/ultrasound would render the diagnostics
 * service under a specialities URL: two live URLs for one page, a breadcrumb that lies
 * about where you are, and duplicate content for the crawler. serviceHref() only ever
 * emits the canonical one, so anything else is a typed or stale URL and 404 is correct.
 */
function resolve(slug: string) {
  const service = getService(slug)
  return service?.category === 'clinical' ? service : undefined
}

export function generateStaticParams() {
  return servicesByCategory('clinical').map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = resolve(slug)
  if (!service) return {}
  return { title: service.name }
}

export default async function SpecialityPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = resolve(slug)
  if (!service) notFound()
  return <ServiceDetail service={service} />
}
