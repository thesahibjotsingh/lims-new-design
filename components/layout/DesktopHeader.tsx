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
import { CalendarIcon, PinIcon } from '@/components/icons'
import { contact, primaryLocation, primaryNav } from '@/lib/site-config'

export function DesktopHeader() {
  return (
    <header className="sticky top-0 z-50 hidden w-full lg:block">
      {/* Tier 1 — branding, contact, appointment CTA */}
      {/*
        No bottom border: the deep teal navigation directly below supplies the edge, and
        a rule between white and teal only reads as a seam. py-2.5 sits the bar tight to
        the mark's own height so the navigation starts immediately beneath it.
      */}
      <div className="bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-2.5">
          <BrandMark />

          <div className="flex items-center gap-6">
            <p className="hidden items-center gap-2 text-xs text-brand-dark-base/60 xl:flex">
              <PinIcon className="h-4 w-4 shrink-0 text-brand-teal" />
              {primaryLocation.addressLines.join(', ')}, {primaryLocation.city}
            </p>

            {/*
              Emergency only in the header. The appointments line is not dropped from
              the site — it is on /contact, in the footer, and on every "call us"
              fallback — but one number above the fold reads faster than two, and this
              is the one that matters when someone is reading in a hurry.

              Which line actually answers an emergency is still an assumption. See the
              note in lib/site-config.ts; the label is the part to correct once LIMS
              confirms, the number itself is verbatim.
            */}
            <ContactLine
              label="Emergency"
              href={`tel:${contact.primary}`}
              display={contact.primaryDisplay}
            />

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

/**
 * The emergency line.
 *
 * A solid red disc, not a tinted one — this is the single control on the page someone
 * reads under stress, and it has to be the thing the eye lands on first. Red is spent
 * here and nowhere else on the header, so it keeps its meaning.
 */
function ContactLine({
  label,
  href,
  display,
}: {
  label: string
  href: string
  display: string
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3"
      aria-label={`Call the ${label.toLowerCase()} line, ${display}`}
    >
      {/*
        The siren artwork is a finished red disc in its own right, so it is placed
        directly — wrapping it in another coloured circle would double the disc.
        Decorative: the link's aria-label already says what this dials.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/beacon.webp"
        alt=""
        aria-hidden="true"
        width={44}
        height={44}
        className="block h-11 w-11 shrink-0 transition-transform group-hover:scale-105"
      />
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-dark-base/50">
          {label}
        </span>
        <span className="text-base font-bold tabular-nums text-brand-emergency">
          {display}
        </span>
      </span>
    </a>
  )
}
