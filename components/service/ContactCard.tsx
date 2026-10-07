// components/service/ContactCard.tsx
//
// The "Talk to us" card at the right of a hero, drawn as a notepad: white paper, copper
// spiral rings, faint ruled lines, a second sheet peeking out behind, and a sticky note that
// says which page you are on. Shared by the department pages and the consultant profiles, so
// the two read as one site and the numbers can never drift.
//
// ONE SHAPE, EVERYWHERE. Every card has exactly the same rows (heading and note, the two
// numbers, the address), so it is the same height on every page, and the sticky note is the
// same size and in the same place. It used to carry a "Request an appointment" row on pages
// that can be booked, which made those cards about 75px taller than the emergency one and left
// a blank band above the title in their heroes. That link now lives in the hero's left column
// (ServiceHero, DoctorHero), where it matches the Contact page's hero.
//
// WHY A STICKY NOTE. A hospital website's pages are close to identical in layout. The note
// ("For: Cardiology", "For: Dr. Vikash Raj") is the one thing on the card that is specific to
// the page.
//
// The paper is decoration and is hidden from assistive tech (rings, back sheet, tape). The
// colours are tokens: the note is `brand-sticky` on `brand-sticky-ink` (about 7:1), red stays
// reserved for the emergency number.

import { getLocale, getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { PhoneIcon, PinIcon } from '@/components/icons'
import { contact } from '@/lib/site-config'
import { siteText } from '@/lib/site-i18n'

const RINGS = 10

export async function ContactCard({
  heading,
  tag,
  emergencyFirst = false,
}: {
  heading: string
  /** The page this card is on: the department name or the consultant's name. */
  tag?: string
  /** Lead with the emergency number instead of the appointments one. */
  emergencyFirst?: boolean
}) {
  const tContact = await getTranslations('contactPage')
  const text = siteText((await getLocale()) as Locale)

  const rowClass = 'border-t border-brand-teal/20 py-2.5'
  const labelClass =
    'text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-dark-base/65'
  const numberClass =
    'flex min-h-[44px] items-center gap-2 text-2xl font-bold tabular-nums hover:underline max-[359px]:text-xl'

  const emergencyRow = (
    <div className={rowClass}>
      <dt className={labelClass}>{tContact('emergencyLabel')}</dt>
      <dd>
        <a href={`tel:${contact.primary}`} className={`${numberClass} text-brand-emergency`}>
          <PhoneIcon className="h-5 w-5 shrink-0" />
          {contact.primaryDisplay}
        </a>
      </dd>
    </div>
  )
  const appointmentsRow = (
    <div className={rowClass}>
      <dt className={labelClass}>{tContact('appointmentsLabel')}</dt>
      <dd>
        <a href={`tel:${contact.secondary}`} className={`${numberClass} text-brand-teal`}>
          <PhoneIcon className="h-5 w-5 shrink-0" />
          {contact.secondaryDisplay}
        </a>
      </dd>
    </div>
  )

  return (
    <aside className="relative">
      {/* The next sheet of the pad, showing below and to the right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-2 translate-y-2.5 rounded-xl bg-white/55"
      />

      <div className="relative rounded-xl bg-white px-6 pb-4 pt-9 text-brand-dark-base shadow-lg">
        {/* Spiral binding: a hole in the paper with a copper ring passing through it. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-6 top-0 flex justify-between"
        >
          {Array.from({ length: RINGS }, (_, index) => (
            <span key={index} className="relative h-0 w-2">
              <span className="absolute left-0 top-[10px] h-2 w-2 rounded-full bg-brand-teal-dark" />
              <span className="absolute left-px top-[-10px] h-[25px] w-1.5 rounded-full bg-brand-copper" />
            </span>
          ))}
        </div>

        {/*
          The heading row has a floor of 2.5rem and the note a floor of 4.25rem, so the first
          ruled line sits at the same height, and the note crosses it by the same amount, on
          every page: a one-line name ("Pharmacy", "Dr. Shweta Godara") no longer shrinks the
          note and lifts the line.
        */}
        <div className="flex min-h-10 items-start justify-between gap-1">
          {/*
            22px, so the longest translation ("ਸਾਡੇ ਨਾਲ ਗੱਲ ਕਰੋ", 168px) fits on one line beside the
            note (180px of room at the card's 22rem width). At 24px it wrapped, and every Punjabi
            card came out 20px taller than the English and Hindi ones. Under 400px the card is
            narrower, so it drops to 18px (138px for the Punjabi) for the same reason.
          */}
          <h2 className="font-serif text-[1.375rem] font-bold leading-tight max-[399px]:text-lg">
            {heading}
          </h2>

          {tag && (
            // The negative right margin cancels the sheet's 1.5rem side padding and then hangs the
            // note 1rem past the paper's edge, like a note stuck on the corner. That is inside the
            // page's 1.25rem gutter, so it never adds a sideways scroll, even rotated.
            // The note is taller than the one-line heading, so it is also lifted 0.5rem (toward the
            // rings) and its bottom margin lets its lower edge lie over the first ruled line.
            // Without both there was a ~45px empty patch under the heading. The overlap is capped
            // at what clears the first label below (the dl's top margin plus the row's padding),
            // so it never sits on text.
            //
            // 10rem wide, so the longest department name ("General & Laparoscopic Surgery")
            // breaks as "General &" / "Laparoscopic Surgery" (136px of text in 140px) instead of
            // onto a third line, which made that one note 19px taller than every other.
            <p className="relative -mb-5 -mr-10 -mt-2 min-h-[4.25rem] w-40 shrink-0 rotate-3 break-words rounded-[2px] bg-brand-sticky px-2.5 pb-2 pt-1.5 text-sm font-medium leading-snug text-brand-sticky-ink shadow-sm">
              {/* A strip of masking tape holding the note to the page. */}
              <span
                aria-hidden="true"
                className="absolute -top-1.5 left-1/2 h-3 w-9 -translate-x-1/2 -rotate-[4deg] bg-brand-sticky-ink/15"
              />
              <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-sticky-ink/85">
                {tContact('noteFor')}
              </span>
              {tag}
            </p>
          )}
        </div>

        {/*
          The first number row takes 0.25rem of extra top padding so the note keeps the same
          clearance above the first label while the ruled line stays where it is.
        */}
        <dl className="mt-2 [&>div:first-child]:pt-3.5">
          {emergencyFirst ? (
            <>
              {emergencyRow}
              {appointmentsRow}
            </>
          ) : (
            <>
              {appointmentsRow}
              {emergencyRow}
            </>
          )}
        </dl>

        <p className="flex items-start gap-2 border-t border-brand-teal/20 pt-2.5 text-sm leading-relaxed text-brand-dark-base/75">
          <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
          <span>
            {text.locationName}, {text.shortAddress}
          </span>
        </p>
      </div>
    </aside>
  )
}
