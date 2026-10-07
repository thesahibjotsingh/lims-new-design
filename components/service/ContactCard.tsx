// components/service/ContactCard.tsx
//
// The white "Talk to us" card at the right of a hero. Shared by the department pages and
// the consultant profiles, so the two read as one site and the numbers can never drift.
//
// It is the one place on a page that carries a booking link. The site header already has
// a global "Book an appointment", so the page does not add a second filled button: the
// link here is a quiet text link whose only job is to open the form with THIS department
// or THIS consultant already chosen.

import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ArrowRightIcon, PhoneIcon, PinIcon } from '@/components/icons'
import { contact, primaryLocation, shortAddress } from '@/lib/site-config'

export async function ContactCard({
  heading,
  requestHref,
  requestLabel,
  emergencyFirst = false,
}: {
  heading: string
  /** Omit both for services that are not booked ahead (emergency, ambulance, pharmacy). */
  requestHref?: string
  requestLabel?: string
  /** Lead with the emergency number instead of the appointments one. */
  emergencyFirst?: boolean
}) {
  const tContact = await getTranslations('contactPage')

  const emergencyRow = (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-brand-dark-base/50">
        {tContact('emergencyLabel')}
      </dt>
      <dd className="mt-0.5">
        <a
          href={`tel:${contact.primary}`}
          className="flex min-h-[44px] items-center gap-2 text-lg font-semibold tabular-nums text-brand-emergency hover:underline"
        >
          <PhoneIcon className="h-4 w-4" />
          {contact.primaryDisplay}
        </a>
      </dd>
    </div>
  )
  const appointmentsRow = (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-brand-dark-base/50">
        {tContact('appointmentsLabel')}
      </dt>
      <dd className="mt-0.5">
        <a
          href={`tel:${contact.secondary}`}
          className="flex min-h-[44px] items-center gap-2 text-lg font-semibold tabular-nums text-brand-teal hover:underline"
        >
          <PhoneIcon className="h-4 w-4" />
          {contact.secondaryDisplay}
        </a>
      </dd>
    </div>
  )

  return (
    <aside className="rounded-2xl bg-white p-6 text-brand-dark-base shadow-lg">
      <h2 className="font-serif text-xl font-bold">{heading}</h2>

      {requestHref && requestLabel && (
        <Link
          href={requestHref}
          className="mt-3 flex min-h-[44px] items-center gap-2 text-sm font-semibold text-brand-teal underline-offset-4 hover:underline"
        >
          {requestLabel}
          <ArrowRightIcon className="h-4 w-4 shrink-0" />
        </Link>
      )}

      <dl className="mt-3 space-y-2 border-t border-brand-teal/10 pt-3">
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

      <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-brand-dark-base/70">
        <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
        <span>
          {primaryLocation.name}, {shortAddress}
        </span>
      </p>
    </aside>
  )
}
