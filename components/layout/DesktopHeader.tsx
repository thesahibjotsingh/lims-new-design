// components/layout/DesktopHeader.tsx
//
// Two tiers, sticky as one unit:
//
//   1. A white branding tier — the lockup, the two published phone lines, and the
//      appointment CTA. White rather than teal so the emergency number is the highest
//      contrast thing on the page, which is the one piece of this header that has to
//      work for someone reading it in a hurry.
//   2. A pale teal navigation ribbon carrying the eight primary sections.
//
// Server component. The only interactivity — the dropdowns and the doctor search — is
// pushed into PrimaryNavBar, so none of this markup ships as JavaScript.

import Link from 'next/link'
import { BrandMark } from '@/components/layout/BrandMark'
import { PrimaryNavBar } from '@/components/layout/PrimaryNavBar'
import { CalendarIcon, PhoneIcon, PinIcon } from '@/components/icons'
import { contact, primaryLocation, primaryNav } from '@/lib/site-config'

export function DesktopHeader() {
  return (
    <header className="sticky top-0 z-50 hidden w-full lg:block">
      {/* Tier 1 — branding, contact, appointment CTA */}
      <div className="border-b border-brand-teal/10 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-3">
          <BrandMark />

          <div className="flex items-center gap-6">
            <p className="hidden items-center gap-2 text-xs text-brand-dark-base/60 xl:flex">
              <PinIcon className="h-4 w-4 shrink-0 text-brand-teal" />
              {primaryLocation.addressLines.join(', ')}, {primaryLocation.city}
            </p>

            {/*
              Both numbers, both labelled. Which line answers which call is still an
              assumption — see the note in lib/site-config.ts. The labels are the part
              to correct once LIMS confirms; the numbers themselves are verbatim.
            */}
            <div className="flex items-center gap-5">
              <ContactLine
                label="Emergency"
                href={`tel:${contact.primary}`}
                display={contact.primaryDisplay}
                emphasis
              />
              <ContactLine
                label="Appointments"
                href={`tel:${contact.secondary}`}
                display={contact.secondaryDisplay}
              />
            </div>

            <Link
              href="/appointments"
              className="tap-target focus-ring-inverse gap-2 rounded-full bg-brand-copper px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-copper-hover"
            >
              <CalendarIcon className="h-4 w-4" />
              Book Appointment
            </Link>
          </div>
        </div>
      </div>

      {/* Tier 2 — the navigation ribbon */}
      <PrimaryNavBar items={primaryNav} />
    </header>
  )
}

function ContactLine({
  label,
  href,
  display,
  emphasis = false,
}: {
  label: string
  href: string
  display: string
  emphasis?: boolean
}) {
  return (
    <a href={href} className="group flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className={[
          'grid h-9 w-9 place-items-center rounded-full transition-colors',
          emphasis
            ? 'bg-brand-emergency/10 text-brand-emergency group-hover:bg-brand-emergency/15'
            : 'bg-brand-mist text-brand-teal group-hover:bg-brand-mist-subtle',
        ].join(' ')}
      >
        <PhoneIcon className="h-4 w-4" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-dark-base/50">
          {label}
        </span>
        <span
          className={[
            'text-sm font-semibold tabular-nums',
            emphasis ? 'text-brand-emergency' : 'text-brand-dark-base',
          ].join(' ')}
        >
          {display}
        </span>
      </span>
    </a>
  )
}
