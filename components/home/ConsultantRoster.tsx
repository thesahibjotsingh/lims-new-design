// components/home/ConsultantRoster.tsx
//
// The named consultants LIMS has supplied. Five, at time of writing, and the section
// shows exactly those rather than padding the row out to a tidy eight with invented people.

import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { DOCTORS } from '@/lib/doctors'
import { RosterSlider } from '@/components/home/RosterSlider'
import { DoctorCard } from '@/components/primitives/DoctorCard'
import { Section } from '@/components/primitives/PageShell'

export async function ConsultantRoster() {
  const t = await getTranslations('doctorCard')
  return (
    // The dark band between the two mist ones — see ServiceArchitecture. Dark so the
    // white panels on the portrait cards read as floating rather than as more page.
    <div className="bg-brand-teal-dark">
      <Section>
        <div className="scroll-reveal mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            {/*
              White at 75%, not copper: copper on teal-dark measures 3.9:1, under the
              4.5:1 this size of text needs. Same call as the banner eyebrows in PageShell.
            */}
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
              Meet our consultants
            </p>
            <h2 className="text-balance font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
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
            className="tap-target self-start rounded-full bg-white px-5 text-sm font-semibold text-brand-teal transition-colors hover:bg-brand-mist md:self-auto"
          >
            View the full roster &rarr;
          </Link>
        </div>

        {/*
          One row that slides, at every width: a swipe on a phone, arrow buttons (and a
          trackpad) from md up. See RosterSlider for why it is manual and why it stays one
          row however many consultants are added. /doctors is the full grid.

          The card widths live here, not in the slider: 78% on a phone so the next card is
          cut off at the right edge (that cut-off is what tells a thumb there is more), and
          a fixed 16.25rem (260px) from md up. In the 1232px content column that is four
          cards plus about 136px of the fifth, which is deliberate: the slider fades the last
          8rem of the row, and a wider peek lets that fade be gentle without reaching back
          into the fourth card, which should stay fully crisp. Widening the cards shrinks
          the peek, so change this and the slider's fade length together.
        */}
        <RosterSlider prevLabel={t('scrollPrev')} nextLabel={t('scrollNext')}>
          {DOCTORS.map((doctor) => (
            <li key={doctor.id} className="w-[78%] shrink-0 snap-start md:w-[16.25rem]">
              <DoctorCard doctor={doctor} onDark />
            </li>
          ))}
        </RosterSlider>

        {/*
          Said plainly rather than hidden. A roster page that silently shows a handful
          of consultants for a fifteen-department hospital reads as a broken page; one
          that says the rest are still being published reads as an honest one.
        */}
        <p className="mt-6 text-xs text-white/70">
          Consultant profiles are published as LIMS supplies them. For a department not
          listed here, please{' '}
          <Link
            href="/contact"
            className="font-semibold text-white underline underline-offset-2 hover:no-underline"
          >
            contact the hospital
          </Link>
          .
        </p>
      </Section>
    </div>
  )
}
