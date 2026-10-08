// components/contact/ContactNumbers.tsx
//
// The hospital's three ways in, as one quiet card of three rows: emergency, reception, WhatsApp.
//
// It replaces three full-width coloured pills (red, copper, green) that filled the Contact page's
// hero and shouted at the visitor from every side. One white card says the same thing once: a small
// round icon, what the line is for, and the number, with a hairline between rows. Every row is
// still a whole tap target (a `tel:` link, or the WhatsApp chat with its line already typed).
//
// THE COLOUR IS NOT DECORATION. Red is the emergency line and nothing else (reserved site-wide,
// see tailwind.config), so it appears on that row's icon and number only. The reception row is
// teal. WhatsApp keeps its own green on the icon so the row reads as "this opens WhatsApp", and
// that icon uses the darker green because it must hold 3:1 on its pale tint.
//
// Used on the Contact page (over the teal hero) and in the home page's Contact section (over
// white), so it carries its own white ground and soft shadow and works on both.

import { getTranslations } from 'next-intl/server'
import { PhoneIcon, WhatsAppIcon } from '@/components/icons'
import { contact, whatsappUrl } from '@/lib/site-config'

const ROW =
  'press flex min-h-[68px] items-center gap-3.5 px-4 py-2.5 transition-colors hover:bg-brand-mist active:bg-brand-mist sm:px-5'
const ICON = 'grid h-11 w-11 shrink-0 place-items-center rounded-full'
const LABEL = 'block text-[11px] font-bold uppercase tracking-[0.12em] text-brand-dark-base/65'
const NUMBER = 'block text-[1.375rem] font-bold leading-tight tabular-nums sm:text-2xl'

export async function ContactNumbers({ className = '' }: { className?: string }) {
  const t = await getTranslations('contactPage')
  const tCommon = await getTranslations('common')

  return (
    <ul
      className={`divide-y divide-brand-teal/10 overflow-hidden rounded-2xl bg-white shadow-glass ring-1 ring-brand-teal/10 ${className}`}
    >
      <li>
        <a href={`tel:${contact.primary}`} className={ROW}>
          <span aria-hidden="true" className={`${ICON} bg-brand-emergency/10 text-brand-emergency`}>
            <PhoneIcon className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className={LABEL}>{t('emergencyLabel')}</span>
            <span className={`${NUMBER} text-brand-emergency`}>{contact.primaryDisplay}</span>
          </span>
        </a>
      </li>
      <li>
        <a href={`tel:${contact.secondary}`} className={ROW}>
          <span aria-hidden="true" className={`${ICON} bg-brand-teal/10 text-brand-teal`}>
            <PhoneIcon className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className={LABEL}>{t('appointmentsLabel')}</span>
            <span className={`${NUMBER} text-brand-dark-base`}>{contact.secondaryDisplay}</span>
          </span>
        </a>
      </li>
      <li>
        <a
          href={whatsappUrl(tCommon('whatsappMessage'))}
          target="_blank"
          rel="noreferrer noopener"
          className={ROW}
        >
          <span
            aria-hidden="true"
            className={`${ICON} bg-brand-whatsapp/15 text-brand-whatsapp-hover`}
          >
            <WhatsAppIcon className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className={LABEL}>{tCommon('whatsappLabel')}</span>
            <span className={`${NUMBER} text-brand-dark-base`}>{contact.secondaryDisplay}</span>
          </span>
        </a>
      </li>
    </ul>
  )
}
