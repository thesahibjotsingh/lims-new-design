// components/home/ServiceArchitecture.tsx
//
// The three-way split, rendered from the catalogue.
//
// LIMS supplied 26 items as one flat list. Twenty-six undifferentiated tiles asks a
// patient to tell "Neurosurgery" apart from "Color Doppler" unaided, which they cannot —
// one is a department you are referred to, the other is a test you are sent for. The
// grouping is the navigation. See the note at the top of lib/services.ts.

import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { translatedCategoryBlurb, translatedCategoryName } from '@/lib/services-i18n'
import { SERVICE_CATEGORIES, SERVICES, servicesByCategory } from '@/lib/services'
import { ServiceGrid } from '@/components/primitives/ServiceGrid'
import { Section } from '@/components/primitives/PageShell'

export async function ServiceArchitecture() {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations('home')
  return (
    // Tinted band: below the marquee the home page runs mist, dark teal, mist, so each
    // section's edge shows and the white tiles lift off the ground instead of
    // dissolving into it. The colour change is the edge — no rule between bands.
    <div className="bg-brand-mist">
      <Section>
        <div className="scroll-reveal mb-8 max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-copper-ink">
            {t('whatLimsOffers')}
          </p>
          <h2 className="text-balance font-serif text-3xl font-bold tracking-tight text-brand-dark-base sm:text-4xl">
            {t('servicesHeading', { count: SERVICES.length })}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-brand-dark-base/70">
            {t('servicesIntro')}
          </p>
        </div>

        <div className="space-y-10">
          {SERVICE_CATEGORIES.map((category) => {
            const services = servicesByCategory(category.id)
            return (
              <div key={category.id}>
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-brand-dark-base">
                      {translatedCategoryName(category.id, locale)}{' '}
                      <span className="font-sans text-sm font-medium text-brand-dark-base/45">
                        ({services.length})
                      </span>
                    </h3>
                    <p className="mt-1 text-sm text-brand-dark-base/60">
                      {translatedCategoryBlurb(category.id, locale)}
                    </p>
                  </div>
                  {/*
                    Hidden on a phone, where RevealMore puts its own control directly
                    under the third tile. Two "see the rest" affordances a thumb-width
                    apart, one expanding in place and one navigating away, is a choice
                    nobody wants to make mid-scroll.
                  */}
                  <Link
                    href={category.basePath}
                    className="tap-target hidden rounded-full border border-brand-teal/20 px-4 text-xs font-semibold text-brand-teal transition-colors hover:bg-white md:inline-flex"
                  >
                    {t('viewAll')} &rarr;
                  </Link>
                </div>
                <ServiceGrid services={services} mobileLimit={3} />
              </div>
            )
          })}
        </div>
      </Section>
    </div>
  )
}
