// components/primitives/CategoryIndex.tsx
//
// The index page for one of the three categories, shared by /specialities, /services
// and /patient-care.
//
// It also honours ?q= so the hero card's "a department" search has somewhere to land.
// Filtering matches `alsoKnownAs` as well as the name: someone who typed "Orthopedics"
// from their referral slip should find "Ortho & Joint Replacement".

import Link from 'next/link'
import { getCategory, servicesByCategory } from '@/lib/services'
import { ServiceGrid } from '@/components/primitives/ServiceGrid'
import { PageHeader, Section } from '@/components/primitives/PageShell'
import type { ServiceCategory } from '@/lib/services'

/**
 * Banner art per category index.
 *
 * Keyed by category id rather than passed in as a prop: all three of these pages are
 * this one component, and a prop would mean three call sites that can disagree about
 * which picture belongs to which page.
 */
const CATEGORY_BANNERS: Record<ServiceCategory, string> = {
  clinical: '/banners/specialities.webp',
  diagnostics: '/banners/diagnostics-and-imaging.webp',
  support: '/banners/patient-care.webp',
}

export function CategoryIndex({
  category,
  query,
}: {
  category: ServiceCategory
  query?: string
}) {
  const definition = getCategory(category)
  const all = servicesByCategory(category)
  const needle = query?.trim().toLowerCase() ?? ''

  const services = needle
    ? all.filter((service) =>
        [service.name, ...(service.alsoKnownAs ?? [])].some((label) =>
          label.toLowerCase().includes(needle),
        ),
      )
    : all

  return (
    <>
      <PageHeader
        eyebrow={`${all.length} ${all.length === 1 ? 'service' : 'services'}`}
        title={definition.pageTitle}
        intro={definition.blurb}
        banner={CATEGORY_BANNERS[category]}
      />

      <Section>
        {needle && (
          <p className="mb-5 text-sm text-brand-dark-base/70">
            {services.length === 0 ? (
              <>
                Nothing under {definition.pageTitle.toLowerCase()} matches{' '}
                <strong className="font-semibold text-brand-dark-base">{query}</strong>.
              </>
            ) : (
              <>
                {services.length} of {all.length} matching{' '}
                <strong className="font-semibold text-brand-dark-base">{query}</strong>.
              </>
            )}{' '}
            <Link href={definition.basePath} className="font-semibold text-brand-teal hover:underline">
              Clear the filter
            </Link>
          </p>
        )}

        {services.length > 0 ? (
          <ServiceGrid services={services} />
        ) : (
          /*
            "No results" has to offer a next step. A dead end on a hospital site is
            where someone gives up and calls nobody.
          */
          <div className="rounded-2xl border border-dashed border-brand-teal/25 bg-brand-mist/60 p-8 text-center">
            <p className="text-sm text-brand-dark-base/70">
              Try a broader term, or browse all {all.length}{' '}
              {definition.name.toLowerCase()}.
            </p>
            <Link
              href={definition.basePath}
              className="tap-target focus-ring-inverse mt-4 rounded-full bg-brand-teal px-6 text-sm font-semibold text-white hover:bg-brand-teal-dark"
            >
              Browse all
            </Link>
          </div>
        )}
      </Section>
    </>
  )
}
