// components/service/ContactCard.tsx
//
// The "Talk to us" card at the right of a hero, drawn as a notepad: white paper, copper
// spiral rings, faint ruled lines, a second sheet peeking out behind, and a sticky note that
// says which page you are on. Shared by the department pages and the consultant profiles, so
// the two read as one site and the numbers can never drift.
//
// WHY A STICKY NOTE. The card sits on every department and every doctor page, and a hospital
// website's pages are close to identical in layout. The note ("For: Cardiology", "For: Dr.
// Vikash Raj") is the one thing on the card that is specific to the page, and it lets the
// booking link say a plain "Request an appointment" instead of repeating the name. The full
// wording is kept as the link's accessible name (`requestAriaLabel`), so a screen reader still
// hears which department or consultant the form will open with.
//
// It is the one place on a page that carries a booking link. The site header already has
// a global "Book an appointment", so the page does not add a second filled button: the
// link here is a quiet text link whose only job is to open the form with THIS department
// or THIS consultant already chosen.
//
// The paper is decoration and is hidden from assistive tech (rings, back sheet, tape). The
// colours are tokens: the note is `brand-sticky` on `brand-sticky-ink` (about 7:1), red stays
// reserved for the emergency number.

import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ArrowRightIcon, PhoneIcon, PinIcon } from '@/components/icons'
import { contact, primaryLocation, shortAddress } from '@/lib/site-config'

const RINGS = 10

export async function ContactCard({
  heading,
  tag,
  requestHref,
  requestLabel,
  requestAriaLabel,
  emergencyFirst = false,
}: {
  heading: string
  /** The page this card is on: the department name or the consultant's name. */
  tag?: string
  /** Omit both for services that are not booked ahead (emergency, ambulance, pharmacy). */
  requestHref?: string
  requestLabel?: string
  /** The full wording, naming the department or consultant, for assistive tech. */
  requestAriaLabel?: string
  /** Lead with the emergency number instead of the appointments one. */
  emergencyFirst?: boolean
}) {
  const tContact = await getTranslations('contactPage')

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
          note and lifts the line, and a page with no booking link no longer sits 4px lower
          than one with it. Only a name that wraps to three lines grows the row.
        */}
        <div className="flex min-h-10 items-start justify-between gap-3">
          <h2 className="font-serif text-2xl font-bold leading-tight">{heading}</h2>

          {tag && (
            // The negative right margin cancels the sheet's 1.5rem side padding and then hangs the
            // note 0.75rem (1rem from `sm`) past the paper's edge, like a note stuck on the corner.
            // The note is taller than the one-line heading, so it is also lifted 0.5rem (toward the
            // rings) and its bottom margin lets its lower edge lie over the first ruled line.
            // Without both, a page with no booking link (emergency, pharmacy) had a ~45px empty
            // patch under the heading. The overlap is capped at what clears the first label below
            // (the dl's top margin plus the row's padding), so it never sits on text.
            <p className="relative -mb-5 -mr-9 -mt-2 min-h-[4.25rem] w-36 shrink-0 rotate-3 break-words rounded-[2px] bg-brand-sticky px-2.5 pb-2 pt-1.5 text-sm font-medium leading-snug text-brand-sticky-ink shadow-sm sm:-mr-10">
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

        {requestHref && requestLabel && (
          <div className={`mt-2 ${rowClass}`}>
            <Link
              href={requestHref}
              aria-label={requestAriaLabel}
              className="flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-brand-teal underline-offset-4 hover:underline"
            >
              {requestLabel}
              <ArrowRightIcon className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        )}

        {/*
          With no booking link the ruled line starts at the same 0.5rem as it does under the link
          row, and the first number row takes the extra 0.25rem as padding, so the note keeps the
          same clearance above the first label without moving the line.
        */}
        <dl
          className={
            requestHref && requestLabel ? '' : 'mt-2 [&>div:first-child]:pt-3.5'
          }
        >
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
            {primaryLocation.name}, {shortAddress}
          </span>
        </p>
      </div>
    </aside>
  )
}
