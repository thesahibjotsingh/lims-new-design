// components/layout/Footer.tsx
//
// Every column here is derived from lib/services.ts through lib/site-config.ts. A
// hand-written footer link list is how a site ends up with a department in the footer
// that was renamed six months ago and now 404s.

import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import {
  centresNav,
  contact,
  diagnosticsNav,
  patientServicesNav,
  siteConfig,
  whatsappUrl,
} from '@/lib/site-config'
import { localizedLocation, siteText } from '@/lib/site-i18n'
import { getCategory, servicesByCategory } from '@/lib/services'
import { translatedCategoryName, translatedServiceName } from '@/lib/services-i18n'
import { translatedNavLabel, slugFromHref } from '@/lib/nav-i18n'
import { PhoneIcon, PinIcon, WhatsAppIcon } from '@/components/icons'
import { FooterCollapse } from '@/components/layout/FooterCollapse'
import type { Locale } from '@/i18n/routing'
import type { NavItem } from '@/types'

export async function Footer() {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations('nav')
  const tFooter = await getTranslations('footer')
  const tCommon = await getTranslations('common')
  const text = siteText(locale)
  const location = localizedLocation(locale)

  return (
    <footer className="border-t border-white/10 bg-brand-dark-base text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-8 md:py-14">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-4">
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-white">
              {siteConfig.shortName} {text.city}
            </h2>
            <p className="text-xs leading-relaxed text-white/55">{text.name}</p>

            <p className="flex items-start gap-2 text-xs leading-relaxed text-white/60">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-copper" />
              <span>
                {location.addressLines.join(', ')}
                <br />
                {location.city}, {location.state}
              </span>
            </p>

            <div className="space-y-1">
              <a
                href={`tel:${contact.primary}`}
                className="flex min-h-[44px] items-center gap-2 text-xs font-semibold text-white/80 hover:text-white"
              >
                <PhoneIcon className="h-4 w-4 text-brand-copper" />
                {contact.primaryDisplay}
              </a>
              <a
                href={`tel:${contact.secondary}`}
                className="flex min-h-[44px] items-center gap-2 text-xs font-semibold text-white/80 hover:text-white"
              >
                <PhoneIcon className="h-4 w-4 text-brand-copper" />
                {contact.secondaryDisplay}
              </a>
              <a
                href={whatsappUrl(tCommon('whatsappMessage'))}
                target="_blank"
                rel="noreferrer noopener"
                className="flex min-h-[44px] items-center gap-2 text-xs font-semibold text-white/80 hover:text-white"
              >
                <WhatsAppIcon className="h-4 w-4 text-brand-whatsapp" />
                {tCommon('whatsappLabel')}
              </a>
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-copper">
              {text.tagline.join(' · ')}
            </p>
            <p className="text-xs font-medium text-white/60">{tFooter('openAllDay')}</p>
          </div>

          <FooterColumn
            id="footer-clinical"
            heading={translatedCategoryName('clinical', locale)}
            items={centresNav}
            moreHref={getCategory('clinical').basePath}
            moreLabel={tFooter('allDepartments', {
              count: servicesByCategory('clinical').length,
            })}
            locale={locale}
          />
          <FooterColumn
            id="footer-diagnostics"
            heading={translatedCategoryName('diagnostics', locale)}
            items={diagnosticsNav}
            locale={locale}
          />
          <FooterColumn
            id="footer-patient"
            heading={tFooter('patientServices')}
            items={patientServicesNav}
            locale={locale}
            navT={t}
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between md:mt-12">
          <div className="space-y-1">
            <p>
              &copy; {new Date().getFullYear()} {text.name}, {text.city}.
            </p>
            <p>
              {tFooter('grievanceLine', { name: text.officerName })}{' '}
              <a
                href={`tel:${contact.secondary}`}
                className="font-medium tabular-nums text-white/60 hover:text-white"
              >
                {contact.secondaryDisplay}
              </a>
            </p>
          </div>
          <p>
            {/*
              No accreditation badges: that is an assertion LIMS has to make, and none has been
              supplied. (Open 24 hours IS supplied, from its Business profile; see the line above
              the copyright and lib/site-config.ts.)
            */}
            <a
              href={siteConfig.url}
              className="font-medium text-white/60 hover:text-white"
              rel="noreferrer"
            >
              {siteConfig.urlDisplay}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

/**
 * `navT`, when passed, means "these items are plain NavItems (no catalogue
 * slug behind them) — resolve labels via lib/nav-i18n.ts's href map" (the
 * patientServicesNav column). Without it, items are treated as real
 * services and resolved via translatedServiceName from their slug
 * (centresNav/diagnosticsNav) — the two are different data sources dressed
 * as the same NavItem shape, so they need different resolvers, not one
 * that guesses which it got.
 */
function FooterColumn({
  id,
  heading,
  items,
  moreHref,
  moreLabel,
  locale,
  navT,
}: {
  id: string
  heading: string
  items: NavItem[]
  moreHref?: string
  moreLabel?: string
  locale: Locale
  navT?: (key: string) => string
}) {
  return (
    <FooterCollapse id={id} heading={heading}>
      <ul className="space-y-1 pb-3 text-xs md:pb-0">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex min-h-[44px] items-center text-white/55 transition-colors hover:text-brand-copper"
            >
              {navT ? translatedNavLabel(item, navT) : translatedServiceName(slugFromHref(item.href), locale)}
            </Link>
          </li>
        ))}
        {moreHref && moreLabel && (
          <li>
            <Link
              href={moreHref}
              className="flex min-h-[44px] items-center font-semibold text-brand-copper hover:text-white"
            >
              {moreLabel} &rarr;
            </Link>
          </li>
        )}
      </ul>
    </FooterCollapse>
  )
}
