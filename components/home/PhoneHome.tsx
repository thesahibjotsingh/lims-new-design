// components/home/PhoneHome.tsx
//
// The top of the home page below lg (a phone, and a tablet held upright): a calm teal welcome, then
// the four errands. Everything under it (Specialities, Find a doctor, Services, Patient care, Health
// library, About, Contact) is components/home/HomeSections.tsx, in the order of the menu.
//
// THE TEAL. This used to be white all the way down, so the phone home page had none of the teal the
// wide layout opens with. The greeting and the search now sit on the same teal as the wide hero and
// the information-page heroes (InfoHero): the shared texture and rounded lower edge from
// globals.css (.teal-hero, .teal-curve), and the tiles come after it on white.
//
// FOUR ERRANDS, NOT FIVE COLOURS. People arrive to book, to message, to find a doctor or to get
// here, so those four are the first thing under the greeting, each a whole tap target. The
// emergency number is not a tile any more: it is the red phone in the header on every page (and the
// first row of the Contact section), so a tile for it only repeated it. WhatsApp took its place and
// the separate green bar under the grid went.
//
// NO PHOTOGRAPH. The hero photo was stock (lib/media.ts says so) and cost a request and a screen of
// height on the device least able to spare either. The wide layout keeps its hero (DesktopHero).
//
// Server component; the client leaf is the search field.

import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { CalendarIcon, PinIcon, RouteIcon, StethoscopeIcon, WhatsAppIcon } from '@/components/icons'
import { TypewriterSearchBar } from '@/components/home/TypewriterSearchBar'
import { getDoctors } from '@/lib/doctors'
import { directionsUrl, whatsappUrl } from '@/lib/site-config'
import { siteText } from '@/lib/site-i18n'

const TILE =
  'press flex min-h-[94px] flex-col justify-between rounded-[20px] p-3.5 text-[15px] font-bold leading-tight'

export async function PhoneHome() {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations('home')
  const tCommon = await getTranslations('common')
  const text = siteText(locale)
  const doctors = getDoctors(locale)

  return (
    <section className="lg:hidden">
      <div className="teal-hero teal-curve text-white [--teal-dir:to_bottom_right]">
        <div className="mx-auto max-w-2xl px-5 pb-6 pt-5">
          <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-white/85">
            <PinIcon className="h-[15px] w-[15px]" />
            {text.shortAddress}
          </p>
          <h1 className="mt-2 text-balance font-serif text-[1.95rem] font-bold leading-[1.08] tracking-tight">
            {t('heroTitleLine1')} {t('heroTitleLine2')}
          </h1>
          {/* The hospital's own three promises, from its Business profile. */}
          <p className="mt-1.5 text-[14.5px] font-medium leading-snug text-white/80">
            {text.about.highlights.join(' · ')}
          </p>
          <div className="mt-4">
            <TypewriterSearchBar />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl">
        {/* The four errands. Each tile is the whole tap target. */}
        <ul className="grid grid-cols-2 gap-2.5 px-5 pt-4">
          <li>
            <Link href="/appointments" className={`${TILE} h-full bg-brand-copper text-white`}>
              <CalendarIcon className="h-6 w-6" />
              <span>
                {t('bookAppointment')}
                <small className="mt-0.5 block text-xs font-medium opacity-90">
                  {t('launcherBookHint')}
                </small>
              </span>
            </Link>
          </li>
          <li>
            {/*
              WhatsApp's own green. White on it is 3.1:1, which is enough for a bold 15px label and
              not for small text, so unlike its neighbours this tile has no small hint line under
              the label.
            */}
            <a
              href={whatsappUrl(tCommon('whatsappMessage'))}
              target="_blank"
              rel="noreferrer noopener"
              className={`${TILE} h-full bg-brand-whatsapp text-white hover:bg-brand-whatsapp-hover`}
            >
              <WhatsAppIcon className="h-6 w-6" />
              <span>{tCommon('whatsappLabel')}</span>
            </a>
          </li>
          <li>
            <Link href="/doctors" className={`${TILE} h-full bg-brand-teal text-white`}>
              <StethoscopeIcon className="h-6 w-6" />
              <span>
                {t('findADoctor')}
                <small className="mt-0.5 block text-xs font-medium tabular-nums opacity-90">
                  {t('launcherDoctorsHint', { count: doctors.length })}
                </small>
              </span>
            </Link>
          </li>
          <li>
            {directionsUrl ? (
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={`${TILE} h-full bg-brand-mist text-brand-teal shadow-[inset_0_0_0_1px_rgba(15,91,102,0.15)]`}
              >
                <RouteIcon className="h-6 w-6" />
                <span>
                  {t('launcherDirections')}
                  <small className="mt-0.5 block text-xs font-medium opacity-80">
                    {t('launcherDirectionsHint')}
                  </small>
                </span>
              </a>
            ) : (
              <Link
                href="/contact#locations"
                className={`${TILE} h-full bg-brand-mist text-brand-teal shadow-[inset_0_0_0_1px_rgba(15,91,102,0.15)]`}
              >
                <RouteIcon className="h-6 w-6" />
                <span>{t('launcherDirections')}</span>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </section>
  )
}
