// components/home/ServiceArchitecture.tsx
//
// The three-way split, rendered from the catalogue.
//
// LIMS supplied 26 items as one flat list. Twenty-six undifferentiated tiles asks a
// patient to tell "Neurosurgery" apart from "Color Doppler" unaided, which they cannot —
// one is a department you are referred to, the other is a test you are sent for. The
// grouping is the navigation. See the note at the top of lib/services.ts.

import Link from 'next/link'
import { SERVICE_CATEGORIES, SERVICES, servicesByCategory } from '@/lib/services'
import { ServiceGrid } from '@/components/primitives/ServiceGrid'
import { Section } from '@/components/primitives/PageShell'

export function ServiceArchitecture() {
  return (
    <Section className="bg-white">
      <div className="mb-8 max-w-2xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-copper">
          What LIMS offers
        </p>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-dark-base sm:text-4xl">
          {SERVICES.length} services on one campus
        </h2>
        <p className="mt-3 text-base leading-relaxed text-brand-dark-base/70">
          Grouped by how you get to them: departments you consult or are admitted under,
          tests and scans you are referred for, and the services that run alongside your
          treatment.
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
                    {category.name}{' '}
                    <span className="font-sans text-sm font-medium text-brand-dark-base/45">
                      ({services.length})
                    </span>
                  </h3>
                  <p className="mt-1 text-sm text-brand-dark-base/60">{category.blurb}</p>
                </div>
                {/*
                  Hidden on a phone, where RevealMore puts its own control directly
                  under the third tile. Two "see the rest" affordances a thumb-width
                  apart, one expanding in place and one navigating away, is a choice
                  nobody wants to make mid-scroll.
                */}
                <Link
                  href={category.basePath}
                  className="tap-target hidden rounded-full border border-brand-teal/20 px-4 text-xs font-semibold text-brand-teal transition-colors hover:bg-brand-mist md:inline-flex"
                >
                  View all &rarr;
                </Link>
              </div>
              <ServiceGrid services={services} mobileLimit={3} />
            </div>
          )
        })}
      </div>
    </Section>
  )
}
