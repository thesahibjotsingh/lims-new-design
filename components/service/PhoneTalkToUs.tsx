// components/service/PhoneTalkToUs.tsx
//
// "Talk to us" for a phone: the same numbers and the same address as the notepad in the hero
// (ContactCard), as a short list of rows at the end of the page. The notepad is hidden on a
// phone because it was most of a screen between the title and the first section; this puts the
// numbers where a reader who has finished the page is looking for them, and the floating bar
// (PhoneActionBar) covers everyone who wants to call before then.
//
// Rows, not a card: each is a whole tap target. Red stays on the emergency number alone.

import { getLocale, getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { ArrowUpRightIcon, PhoneIcon, PinIcon } from '@/components/icons'
import { contact, directionsUrl } from '@/lib/site-config'
import { siteText } from '@/lib/site-i18n'

export async function PhoneTalkToUs({
  emergencyFirst,
  hideFrom = 'sm',
}: {
  emergencyFirst: boolean
  /** The breakpoint where the wide layout's own contact card takes over. */
  hideFrom?: 'sm' | 'lg'
}) {
  const t = await getTranslations('serviceDetail')
  const tContact = await getTranslations('contactPage')
  const text = siteText((await getLocale()) as Locale)

  const rowClass =
    'flex min-h-[60px] items-center gap-3 border-t border-brand-teal/10 px-4 py-2 first:border-t-0 active:bg-brand-mist'
  const labelClass = 'block text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-dark-base/55'
  const numberClass = 'block text-[19px] font-bold tabular-nums'

  const emergency = (
    <a key="emergency" href={`tel:${contact.primary}`} className={rowClass}>
      <PhoneIcon className="h-5 w-5 shrink-0 text-brand-emergency" />
      <span>
        <span className={labelClass}>{tContact('emergencyLabel')}</span>
        <span className={`${numberClass} text-brand-emergency`}>{contact.primaryDisplay}</span>
      </span>
    </a>
  )
  const appointments = (
    <a key="appointments" href={`tel:${contact.secondary}`} className={rowClass}>
      <PhoneIcon className="h-5 w-5 shrink-0 text-brand-teal" />
      <span>
        <span className={labelClass}>{tContact('appointmentsLabel')}</span>
        <span className={`${numberClass} text-brand-dark-base`}>{contact.secondaryDisplay}</span>
      </span>
    </a>
  )
  const address = (
    <>
      <PinIcon className="h-5 w-5 shrink-0 text-brand-teal" />
      <span className="min-w-0 flex-1 text-sm leading-snug text-brand-dark-base/80">
        {text.locationName}, {text.shortAddress}
      </span>
    </>
  )

  return (
    <section
      id="phone-talk"
      aria-labelledby="phone-talk-heading"
      className={`bg-brand-mist px-4 pb-4 ${hideFrom === 'lg' ? 'lg:hidden' : 'sm:hidden'}`}
    >
      <h2
        id="phone-talk-heading"
        className="mx-1 mb-2 mt-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-dark-base/50"
      >
        {t('talkToUs')}
      </h2>
      <div className="overflow-hidden rounded-2xl bg-white shadow-row">
        {emergencyFirst ? [emergency, appointments] : [appointments, emergency]}
        {directionsUrl ? (
          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${tContact('getDirections')}: ${text.locationName}, ${text.shortAddress}`}
            className={rowClass}
          >
            {address}
            <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-brand-dark-base/40" />
          </a>
        ) : (
          <p className={rowClass}>{address}</p>
        )}
      </div>
    </section>
  )
}
