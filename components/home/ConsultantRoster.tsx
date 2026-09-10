// components/home/ConsultantRoster.tsx
//
// The named consultants LIMS has supplied. Four, at time of writing — and the section
// says four rather than padding the row out to a tidy six with invented people.

import Link from 'next/link'
import { DOCTORS } from '@/lib/doctors'
import { DoctorCard } from '@/components/primitives/DoctorCard'
import { RevealMore } from '@/components/primitives/RevealMore'
import { Section } from '@/components/primitives/PageShell'

export function ConsultantRoster() {
  return (
    <div className="border-t border-brand-teal/10 bg-brand-mist/60">
      <Section>
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-copper">
              Meet our consultants
            </p>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-dark-base sm:text-4xl">
              Doctors at LIMS
            </h2>
          </div>
          {/* Desktop only: on a phone RevealMore's button sits under the third card. */}
          <Link
            href="/doctors"
            className="tap-target hidden self-start rounded-full border border-brand-teal/20 px-5 text-sm font-semibold text-brand-teal transition-colors hover:bg-white md:inline-flex md:self-auto"
          >
            View the full roster &rarr;
          </Link>
        </div>

        {/*
          Three cards then a button, on a phone. A consultant card is tall — taller
          again once LIMS supplies portraits — and four of them stacked is most of a
          screen's scrolling spent on one section.
        */}
        <RevealMore
          limit={3}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
          moreLabel="View more consultants"
        >
          {DOCTORS.map((doctor) => (
            <li key={doctor.id}>
              <DoctorCard doctor={doctor} />
            </li>
          ))}
        </RevealMore>

        {/*
          Said plainly rather than hidden. A roster page that silently shows four
          consultants for a fifteen-department hospital reads as a broken page; one
          that says the rest are still being published reads as an honest one.
        */}
        <p className="mt-6 text-xs text-brand-dark-base/55">
          Consultant profiles are published as LIMS supplies them. For a department not
          listed here, please{' '}
          <Link href="/contact" className="font-semibold text-brand-teal hover:underline">
            contact the hospital
          </Link>
          .
        </p>
      </Section>
    </div>
  )
}
