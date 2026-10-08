// components/service/PhoneTalkToUs.tsx
//
// "Talk to us" for a phone: one card at the end of the page with the ways to reach the hospital, as
// the site's own buttons. The notepad in the hero (ContactCard) is hidden on a phone because it was
// most of a screen between the title and the first section; this puts the contact options where a
// reader who has finished the page is looking for them, and the floating bar (PhoneActionBar)
// covers everyone who wants to call before then.
//
// WHAT IS IN IT, AND WHAT IS NOT. Call the appointments line, WhatsApp (the same line, which is the
// hospital's WhatsApp Business number), the address with directions. The EMERGENCY number is not
// here on a page about an appointment: the red phone button in the header is on every page and the
// "Need urgent care instead?" card sits above this block where it applies, so the number was
// appearing twice in one screen. On a page that has no appointments to make (the emergency
// department, the ambulance: `emergencyFirst`) it is the first and the red button, because there
// it is the thing the reader came for.
//
// It was a list of rows with two 19px phone numbers, which read as a spec sheet and was louder than
// the page around it. Buttons are the site's vocabulary for "do this now".

import { getLocale, getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { ArrowUpRightIcon, PhoneIcon, PinIcon, WhatsAppIcon } from '@/components/icons'
import { contact, directionsUrl, whatsappUrl } from '@/lib/site-config'
import { siteText } from '@/lib/site-i18n'

// White on the WhatsApp green is 3.1:1, which is enough for a bold label this size and not for
// small text (see the note on `whatsapp` in tailwind.config.ts).
const PILL =
  'tap-target press focus-ring-inverse w-full gap-2 rounded-full px-6 text-[15px] font-bold text-white transition-colors'

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
  const tCommon = await getTranslations('common')
  const text = siteText((await getLocale()) as Locale)

  const address = (
    <>
      <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
      <span className="min-w-0 flex-1 text-[13px] leading-snug text-brand-dark-base/75">
        {text.locationName}, {text.shortAddress}
      </span>
    </>
  )

  return (
    <section
      id="phone-talk"
      aria-labelledby="phone-talk-heading"
      className={`bg-brand-mist px-4 pb-4 pt-4 ${hideFrom === 'lg' ? 'lg:hidden' : 'sm:hidden'}`}
    >
      <div className="rounded-[20px] bg-white p-[18px] shadow-row">
        <h2
          id="phone-talk-heading"
          className="font-serif text-xl font-bold leading-tight tracking-tight text-brand-dark-base"
        >
          {t('talkToUs')}
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-brand-dark-base/70">{t('talkLead')}</p>

        <div className="mt-3.5 space-y-2">
          {emergencyFirst && (
            <a
              href={`tel:${contact.primary}`}
              className={`${PILL} bg-brand-emergency hover:brightness-95`}
            >
              <PhoneIcon className="h-[18px] w-[18px]" />
              {tContact('emergencyLabel')} {contact.primaryDisplay}
            </a>
          )}
          <a
            href={`tel:${contact.secondary}`}
            className={`${PILL} bg-brand-teal hover:bg-brand-teal-dark`}
          >
            <PhoneIcon className="h-[18px] w-[18px]" />
            {tCommon('call', { number: contact.secondaryDisplay })}
          </a>
          <a
            href={whatsappUrl(tCommon('whatsappMessage'))}
            target="_blank"
            rel="noreferrer noopener"
            className={`${PILL} bg-brand-whatsapp hover:bg-brand-whatsapp-hover`}
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            {tCommon('whatsapp')}
          </a>
        </div>

        <div className="mt-4 border-t border-brand-teal/10 pt-3">
          {directionsUrl ? (
            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${tContact('getDirections')}: ${text.locationName}, ${text.shortAddress}`}
              className="flex min-h-[44px] items-start gap-2.5 py-1"
            >
              {address}
              <span className="inline-flex shrink-0 items-center gap-1 text-[13px] font-semibold text-brand-teal">
                {tContact('getDirections')}
                <ArrowUpRightIcon className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
            </a>
          ) : (
            <p className="flex min-h-[44px] items-start gap-2.5 py-1">{address}</p>
          )}
        </div>
      </div>
    </section>
  )
}
