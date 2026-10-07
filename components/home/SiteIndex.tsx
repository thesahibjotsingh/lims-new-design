// components/home/SiteIndex.tsx
//
// The rest of the navigation, on the home page.
//
// Four of the seven primary nav entries already have a home-page section of their own:
// Specialities, Services and Patient care are the three groups in ServiceArchitecture,
// and Find a doctor is ConsultantRoster. This section carries the remaining three so the
// home page reaches every destination in the header without duplicating those three
// grids underneath themselves.
//
// EVERY DESCRIPTION HERE IS THE `intro` LINE FROM THE PAGE IT POINTS AT, verbatim, or a
// value out of lib/site-config.ts. Nothing is written fresh for this section: a summary
// invented at the link is a second, drifting version of a page's own promise, and for
// the health library it would be a claim about clinical content that does not exist yet.
//
// `status` says so out loud where a page is still waiting on LIMS. A tile that reads
// like a live section and lands on a placeholder wastes the visitor's tap; one that
// says "not published yet" lets them skip it and call instead.

import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { siteText } from '@/lib/site-i18n'
import { ArrowRightIcon } from '@/components/icons'
import { RevealMore } from '@/components/primitives/RevealMore'
import { Section } from '@/components/primitives/PageShell'
import { contact } from '@/lib/site-config'

interface Destination {
  label: string
  href: string
  description: string
  /** Shown as a pill when the page behind this link has no content yet. */
  status?: string
}

export async function SiteIndex() {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations('home')
  const tNav = await getTranslations('nav')
  const text = siteText(locale)

  const DESTINATIONS: Destination[] = [
    {
      label: tNav('healthLibrary'),
      href: '/health-library',
      description: t('healthLibraryDesc'),
      status: t('awaitingReview'),
    },
    {
      label: tNav('aboutLims'),
      href: '/about',
      description: text.description,
    },
    {
      label: tNav('contactUs'),
      href: '/contact',
      description: t('contactDesc', {
        address: text.shortAddress,
        number: contact.primaryDisplay,
      }),
    },
  ]

  return (
    // Mist band — see ServiceArchitecture.
    <div className="bg-brand-mist">
      <Section>
        <div className="scroll-reveal mb-8 max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-copper-ink">
            {t('everythingElse')}
          </p>
          <h2 className="text-balance font-serif text-3xl font-bold tracking-tight text-brand-dark-base sm:text-4xl">
            {t('restOfSite')}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-brand-dark-base/70">
            {t('restOfSiteIntro')}
          </p>
        </div>

        <RevealMore
          limit={3}
          className="grid grid-cols-1 gap-3 sm:grid-cols-3"
          moreLabel={t('viewMoreSections')}
        >
          {DESTINATIONS.map((destination) => (
            <li key={destination.href}>
              <Link
                href={destination.href}
                className="press group flex h-full flex-col gap-2 rounded-2xl border border-brand-teal/10 bg-white p-5 shadow-sm transition-all hover:border-brand-teal/25 hover:shadow-md"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="font-serif text-base font-bold leading-snug text-brand-dark-base group-hover:text-brand-teal">
                    {destination.label}
                  </span>
                  <ArrowRightIcon
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 shrink-0 text-brand-copper transition-transform group-hover:translate-x-0.5"
                  />
                </span>

                <span className="text-sm leading-relaxed text-brand-dark-base/65">
                  {destination.description}
                </span>

                {destination.status && (
                  <span className="mt-auto inline-flex w-fit rounded-full bg-brand-mist px-2.5 py-1 text-[11px] font-semibold text-brand-dark-base/55">
                    {destination.status}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </RevealMore>
      </Section>
    </div>
  )
}
