import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServiceDetail } from '@/components/primitives/ServiceDetail'
import type { Locale } from '@/i18n/routing'
import { getService, servicesByCategory } from '@/lib/services'
import { translatedServiceName } from '@/lib/services-i18n'

/**
 * Resolve a slug, but only if it belongs to THIS category.
 *
 * Without the category check, /services/neurosurgery would render a clinical department
 * under a diagnostics URL: two live URLs for one page, a breadcrumb that lies
 * about where you are, and duplicate content for the crawler. serviceHref() only ever
 * emits the canonical one, so anything else is a typed or stale URL and 404 is correct.
 */
function resolve(slug: string) {
  const service = getService(slug)
  return service?.category === 'diagnostics' ? service : undefined
}

export function generateStaticParams() {
  return servicesByCategory('diagnostics').map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const service = resolve(slug)
  if (!service) return {}
  return { title: translatedServiceName(service.slug, locale as Locale) }
}

export default async function DiagnosticPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = resolve(slug)
  if (!service) notFound()
  return <ServiceDetail service={service} />
}
