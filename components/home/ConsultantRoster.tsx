// components/home/ConsultantRoster.tsx
//
// The named consultants LIMS has supplied. Four, at time of writing — and the section
// says four rather than padding the row out to a tidy six with invented people.

import Link from 'next/link'
import { DOCTORS } from '@/lib/doctors'
import { DoctorCard } from '@/components/primitives/DoctorCard'
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
          {/*
            Visible at every width again. It was desktop-only while RevealMore put a
            "View more" button under the cards; the rail has no such button, so this is
            now a phone's only route to the full roster.
          */}
          <Link
            href="/doctors"
            className="tap-target self-start rounded-full border border-brand-teal/20 px-5 text-sm font-semibold text-brand-teal transition-colors hover:bg-white md:self-auto"
          >
            View the full roster &rarr;
          </Link>
        </div>

        {/*
          A swipe rail on a phone, the same grid from md up — matching /doctors, so the
          roster behaves the same way in both places.

          This replaced a "three then View more" list. Reveal is the right pattern for
          the service tiles above, which are short rows where seeing all fifteen at once
          is the point. A consultant card is tall, carries a portrait, and is read one
          at a time; swiping suits that and costs no vertical space at all.

          Pure CSS scroll-snap, no library and no JS. The 78% card width is the whole
          affordance: the next card is visibly cut off at the right edge, which is what
          tells a thumb there is more to the right.
        */}
        <ul
          className="
            grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4
            max-md:-mx-5 max-md:flex max-md:snap-x max-md:snap-mandatory
            max-md:gap-4 max-md:overflow-x-auto max-md:scroll-px-5 max-md:px-5
            max-md:pb-2 max-md:[-webkit-overflow-scrolling:touch]
            max-md:[overscroll-behavior-x:contain]
            max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden
          "
        >
          {DOCTORS.map((doctor) => (
            <li
              key={doctor.id}
              className="max-md:w-[78%] max-md:shrink-0 max-md:snap-start"
            >
              <DoctorCard doctor={doctor} />
            </li>
          ))}
        </ul>

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
