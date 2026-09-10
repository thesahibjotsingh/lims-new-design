// components/primitives/ServiceGrid.tsx
//
// A grid of service tiles, used on the home page and on all three category indexes.
// Every href resolves through serviceHref(), so a service that moves category moves its
// tile and its URL together.

import Link from 'next/link'
import { serviceHref } from '@/lib/services'
import { ArrowRightIcon } from '@/components/icons'
import type { ClinicalService } from '@/lib/services'

export function ServiceGrid({ services }: { services: ClinicalService[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <li key={service.slug}>
          <Link
            href={serviceHref(service)}
            className="group flex min-h-[76px] items-center justify-between gap-3 rounded-2xl border border-brand-teal/10 bg-white p-4 shadow-sm transition-all hover:border-brand-teal/25 hover:shadow-md"
          >
            <span className="min-w-0">
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
      ))}
    </ul>
  )
}
