// components/primitives/CategoryIndex.tsx
//
// The index page for one of the three categories, shared by /specialities, /services
// and /patient-care.
//
// It also honours ?q= so the hero card's "a department" search has somewhere to land.
// Filtering matches `alsoKnownAs` as well as the name: someone who typed "Orthopedics"
// from their referral slip should find "Ortho & Joint Replacement".

import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
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

export async function CategoryIndex({
  category,
  query,
}: {
  category: ServiceCategory
  query?: string
}) {
  const t = await getTranslations('categoryIndex')
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
        eyebrow={t('serviceCount', { count: all.length })}
        title={definition.pageTitle}
        intro={definition.blurb}
        banner={CATEGORY_BANNERS[category]}
        cinematic
      />

      <Section>
        {needle && (
          <p className="scroll-reveal mb-5 text-sm text-brand-dark-base/70">
            {services.length === 0
              ? t.rich('noMatch', {
                  title: definition.pageTitle.toLowerCase(),
                  query: query ?? '',
                  b: (chunks) => <strong className="font-semibold text-brand-dark-base">{chunks}</strong>,
                })
              : t.rich('matchingCount', {
                  count: services.length,
                  total: all.length,
                  query: query ?? '',
                  b: (chunks) => <strong className="font-semibold text-brand-dark-base">{chunks}</strong>,
                })}{' '}
            <Link href={definition.basePath} className="font-semibold text-brand-teal hover:underline">
              {t('clearFilter')}
            </Link>
          </p>
        )}

        {services.length > 0 ? (
          <div className="scroll-reveal">
            <ServiceGrid services={services} />
          </div>
        ) : (
          /*
            "No results" has to offer a next step. A dead end on a hospital site is
            where someone gives up and calls nobody.
          */
          <div className="rounded-2xl border border-dashed border-brand-teal/25 bg-brand-mist/60 p-8 text-center">
            <p className="text-sm text-brand-dark-base/70">
              {t('browseAllFallback', { count: all.length, name: definition.name.toLowerCase() })}
            </p>
            <Link
              href={definition.basePath}
              className="tap-target focus-ring-inverse mt-4 rounded-full bg-brand-teal px-6 text-sm font-semibold text-white hover:bg-brand-teal-dark"
            >
              {t('browseAll')}
            </Link>
          </div>
        )}
      </Section>
    </>
  )
}
