// components/primitives/ServiceGrid.tsx
//
// A grid of service tiles, used on the home page and on all three category indexes.
// Every href resolves through serviceHref(), so a service that moves category moves its
// tile and its URL together.

import Link from 'next/link'
import { serviceHref } from '@/lib/services'
import { ArrowRightIcon } from '@/components/icons'
import { ServiceIcon } from '@/components/primitives/ServiceIcon'
import { RevealMore } from '@/components/primitives/RevealMore'
import type { ClinicalService } from '@/lib/services'

const GRID_CLASSES = 'grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'

export function ServiceGrid({
  services,
  /**
   * Cap the phone-height of this grid at N tiles, rest behind a "View more" button.
   *
   * Off by default, and deliberately: on /specialities, /services and /patient-care the
   * grid IS the page, so collapsing it would hide the thing the visitor navigated to.
   * The home page passes 3, where the grid is a preview of a page that exists.
   */
  mobileLimit,
}: {
  services: ClinicalService[]
  mobileLimit?: number
}) {
  const tiles = services.map((service) => (
    <li key={service.slug}>
      <Link
        href={serviceHref(service)}
        className="group flex min-h-[76px] items-center gap-3.5 rounded-2xl border border-brand-teal/10 bg-white p-4 shadow-sm transition-all hover:border-brand-teal/25 hover:shadow-md"
      >
        <ServiceIcon slug={service.slug} size={44} />

        <span className="min-w-0 flex-1">
          <span className="block font-serif text-base font-bold leading-snug text-brand-dark-base group-hover:text-brand-teal">
            {service.name}
          </span>
          {/*
            `alsoKnownAs` is the wording a patient was given on a referral slip.
            Showing it here is how someone looking for "Orthopedics" finds the tile
            that reads "Ortho & Joint Replacement".
          */}
          {service.alsoKnownAs?.length ? (
            <span className="mt-0.5 block truncate text-xs text-brand-dark-base/50">
              Also: {service.alsoKnownAs.join(', ')}
            </span>
          ) : null}
        </span>
        <ArrowRightIcon
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-brand-copper transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </li>
  ))

  if (mobileLimit === undefined) {
    return <ul className={GRID_CLASSES}>{tiles}</ul>
  }

  return (
    <RevealMore limit={mobileLimit} className={GRID_CLASSES}>
      {tiles}
    </RevealMore>
  )
}
