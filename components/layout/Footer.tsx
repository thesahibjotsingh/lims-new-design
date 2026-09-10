// components/layout/Footer.tsx
//
// Every column here is derived from lib/services.ts through lib/site-config.ts. A
// hand-written footer link list is how a site ends up with a department in the footer
// that was renamed six months ago and now 404s.

import Link from 'next/link'
import {
  centresNav,
  contact,
  diagnosticsNav,
  patientServicesNav,
  primaryLocation,
  siteConfig,
} from '@/lib/site-config'
import { getCategory } from '@/lib/services'
import { PhoneIcon, PinIcon } from '@/components/icons'
import type { NavItem } from '@/types'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-dark-base text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-white">
              {siteConfig.shortName} {siteConfig.city}
            </h2>
            <p className="text-xs leading-relaxed text-white/55">{siteConfig.name}</p>

            <p className="flex items-start gap-2 text-xs leading-relaxed text-white/60">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-copper" />
              <span>
                {primaryLocation.addressLines.join(', ')}
                <br />
                {primaryLocation.city}, {primaryLocation.state}
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
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-copper">
              {siteConfig.tagline.join(' · ')}
            </p>
          </div>

          <FooterColumn
            heading={getCategory('clinical').name}
            items={centresNav}
            moreHref={getCategory('clinical').basePath}
            moreLabel="All 15 departments"
          />
          <FooterColumn
            heading={getCategory('diagnostics').name}
            items={diagnosticsNav}
          />
          <FooterColumn heading="Patient services" items={patientServicesNav} />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}, {siteConfig.city}.
          </p>
          <p>
            {/*
              No accreditation badges and no "24x7" claim anywhere on this page. Both
              are assertions LIMS has to make; the site does not get to make them on
              their behalf. See the open questions in lib/site-config.ts.
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

function FooterColumn({
  heading,
  items,
  moreHref,
  moreLabel,
}: {
  heading: string
  items: NavItem[]
  moreHref?: string
  moreLabel?: string
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-white">{heading}</h3>
      <ul className="space-y-1 text-xs">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex min-h-[44px] items-center text-white/55 transition-colors hover:text-brand-copper"
            >
              {item.label}
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
    </div>
  )
}
