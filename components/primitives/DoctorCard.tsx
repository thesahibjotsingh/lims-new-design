// components/primitives/DoctorCard.tsx
//
// A consultant card: photograph on top, then name, credentials, registration number and
// the two ways forward. One layout everywhere it appears (the home roster, the directory
// and the "other consultants" row on a profile), so a patient learns it once.
//
//   photo (3:2, department label on it)
//   name
//   credentials   degrees in copper, fellowships on a second line
//   --------------------------------------------------------------
//   Reg. no.                                           View profile ->
//   [ Request appointment ]
//
// EVERY FACT IS ALWAYS VISIBLE. Nothing waits for hover, which a phone cannot do, and a
// card that hides its credentials behind a hover asks the patients most likely to be on
// a phone to do something their device does not support.
//
// WHAT THIS DELIBERATELY DOES NOT RENDER, and must not be "improved" to render:
// star ratings, review counts, years of experience, or "next available" slots. LIMS has
// supplied none of those, and every one of them is a factual claim about a named,
// registered doctor. A 4.9 from no reviews is a fabricated rating on a real person's
// professional record; an invented "Today, 11:30 AM" sends a patient to a hospital for
// an appointment that does not exist.
//
// Medanta's cards also carry a "Specialization and expertise" tab. That arrives here the
// day LIMS supplies `specialisations`, not before: an empty tab is a promise the card
// cannot keep.
//
// CREDENTIALS. `qualifications` runs long in India (Dr Shweta's is five items), and one
// long copper paragraph made her card the tallest in the row. A doctor can therefore
// carry `cardCredentials` (lib/doctors.ts): a hand-written regrouping of the same
// string. Without it the full `qualifications` is shown, wrapped, never truncated.
//
// PORTRAITS are rendered, but only a real one. `doctor.portrait` must be a photograph of
// that consultant, supplied by LIMS. A doctor with none gets large initials, never a
// stock face. See rule 4 at the top of lib/doctors.ts.
//
// THE CROP. 3:2 at every width: head and shoulders, which is the part that identifies
// someone, without four tall portraits pushing the names and the buttons below the fold.
// Cropping a 4:5 source to 3:2 keeps roughly the middle half of the height, and the source
// photos are not framed consistently, so where that window sits is per photograph
// (`portrait.focusY` in lib/doctors.ts), not one shared `object-position`.

import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ArrowRightIcon, ShieldIcon } from '@/components/icons'
import { initials } from '@/components/doctor/DoctorAvatar'
import { registrationDisplay } from '@/lib/doctors'
import { translatedServiceName } from '@/lib/services-i18n'
import { plain } from '@/lib/text'
import type { Locale } from '@/i18n/routing'
import type { Doctor } from '@/types'

// Spelled out in full (not assembled from fragments) so Tailwind can see every class.
//
// On the dark home band the card lights up on hover: a teal-light ring and glow, plus a
// small lift. `has-[:focus-visible]` gives keyboard users the same highlight when they tab
// onto any link inside; a hover-only highlight would leave them out. The lift is
// motion-safe; the glow is not motion, so it stays under reduced motion.
//
// `md:` on all of it: below md the card sits in the home page's phone swipe rail, which
// clips horizontally so the next card reads as cut off (the whole affordance). That rail
// has no room for a ring plus a 48px glow, and real hover only exists on desktop anyway.
const ON_DARK =
  'shadow-lg ring-0 ring-brand-teal-light md:hover:shadow-[0_18px_48px_-8px_rgba(22,139,153,0.75)] md:hover:ring-2 md:motion-safe:hover:-translate-y-1 md:has-[:focus-visible]:shadow-[0_18px_48px_-8px_rgba(22,139,153,0.75)] md:has-[:focus-visible]:ring-2'
const ON_LIGHT =
  'border border-brand-teal/10 shadow-sm ring-0 ring-brand-teal/40 md:hover:shadow-lg md:motion-safe:hover:-translate-y-0.5 md:has-[:focus-visible]:ring-2'

export async function DoctorCard({
  doctor,
  onDark = false,
}: {
  doctor: Doctor
  /** The home roster sits on a dark band and gets the glow; everywhere else is light. */
  onDark?: boolean
}) {
  const t = await getTranslations('doctorCard')
  const locale = (await getLocale()) as Locale
  const portrait = doctor.portrait
  const department = translatedServiceName(doctor.departmentSlug, locale)

  const degrees = doctor.cardCredentials?.degrees ?? doctor.qualifications
  const fellowships = doctor.cardCredentials?.fellowships
  const designation = doctor.designation ? plain(doctor.designation) : undefined

  return (
    // `relative` is load-bearing: it is the containing block for any absolutely
    // positioned child. Without it those escape the phone swipe rail's overflow clipping
    // and give the whole page a horizontal scroll.
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white transition-[transform,box-shadow] duration-300 ease-out ${
        onDark ? ON_DARK : ON_LIGHT
      }`}
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-brand-mist">
        {portrait ? (
          // Plain <img>: next/image is unoptimised on Cloudflare Workers (see
          // next.config.mjs), so it would add a client component and a wrapper for
          // nothing. Portraits are pre-sized by scripts/build_assets.py.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: `50% ${portrait.focusY ?? 50}%` }}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid h-full w-full place-items-center font-serif text-5xl font-bold text-brand-teal/60"
          >
            {initials(doctor.name)}
          </span>
        )}

        {/*
          The department rides on the photo instead of taking a line of the body. Plain
          text, not a link: a 24px pill over a photograph is a poor tap target, and the
          department is one tap away on the profile.
        */}
        <span className="absolute bottom-2.5 left-2.5 max-w-[calc(100%-1.25rem)] truncate rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-brand-teal shadow-sm backdrop-blur-sm">
          {department}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-serif text-base font-bold leading-snug text-brand-dark-base">
            {/*
              THE WHOLE CARD IS ONE LINK. This is the card's main link, and its ::after
              stretches over the entire <article> (which is `relative`), so a click anywhere
              on the photo, the name or the credentials opens the profile. It is still a
              single real link: one tab stop, one name for a screen reader, no nested
              interactive element, and the text can still be read as the heading.
              The two controls in the footer sit ABOVE that overlay (`relative z-10`), so
              they still do their own thing. The name goes teal when the card is hovered
              (`group-hover`), not only the name, so the whole card reads as pressable.
            */}
            <Link
              href={`/doctors/${doctor.id}`}
              className="transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-brand-teal"
            >
              {doctor.name}
            </Link>
          </h3>

          {/* Post-nominals run long in India. Wrap them, never truncate them. */}
          {degrees && (
            <p className="mt-0.5 text-xs font-medium leading-snug text-brand-copper-ink">{degrees}</p>
          )}
          {fellowships && (
            <p className="mt-1 text-xs leading-snug text-brand-dark-base/70">
              <span className="font-semibold text-brand-dark-base/80">{t('fellowships')}:</span>{' '}
              {fellowships}
            </p>
          )}
          {designation && (
            // A designation is the only credential line for a doctor LIMS gave no degrees
            // for, and takes the copper treatment then; beside degrees it is the quiet line.
            <p
              className={`mt-1 text-xs leading-snug ${
                degrees ? 'text-brand-dark-base/70' : 'font-medium text-brand-copper-ink'
              }`}
            >
              {designation}
            </p>
          )}
        </div>

        {/* `mt-auto` keeps the button on one baseline across a row of uneven credentials. */}
        <div className="mt-auto space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-brand-teal/10 pt-3 text-xs">
            {doctor.registrationNumber && (
              // Shown because it is how a patient verifies a doctor against the council
              // register: a trust signal that costs nothing and cannot be faked.
              <span className="flex items-center gap-1.5 text-brand-dark-base/60">
                <ShieldIcon className="h-3.5 w-3.5 shrink-0 text-brand-teal" aria-hidden="true" />
                {t('reg')}
                <span className="font-semibold text-brand-dark-base/80">
                  {registrationDisplay(doctor.registrationNumber)}
                </span>
              </span>
            )}
            <Link
              href={`/doctors/${doctor.id}`}
              // Four identical "View profile" links are indistinguishable read out of
              // context, so the accessible name carries the doctor's name too: an
              // aria-label rather than a visually-hidden suffix, because splicing a
              // translated "View profile" with an English ": {name}" pattern doesn't hold
              // up across languages with different word order.
              aria-label={t('viewProfileForName', { name: doctor.name })}
              // `ml-auto` so a doctor with no registration number on file still has the
              // link at the right edge rather than alone on the left.
              className="press relative z-10 ml-auto inline-flex min-h-[24px] items-center gap-1 font-semibold text-brand-teal hover:underline"
            >
              <span aria-hidden="true">{t('viewProfile')}</span>
              <ArrowRightIcon aria-hidden="true" className="h-3 w-3" strokeWidth={2.25} />
            </Link>
          </div>

          <Link
            href={`/appointments?doctor=${doctor.id}`}
            aria-label={t('requestAppointmentForName', { name: doctor.name })}
            className="tap-target focus-ring-inverse relative z-10 w-full rounded-full bg-brand-teal px-4 text-xs font-semibold text-white transition-colors hover:bg-brand-teal-dark"
          >
            <span aria-hidden="true">{t('requestAppointment')}</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
