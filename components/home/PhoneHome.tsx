// components/home/PhoneHome.tsx
//
// The home page below lg (a phone, and a tablet held upright): a launcher, not a gallery.
//
// WHAT CHANGED. The page used to open on a photograph with a search card floating over it, three
// shortcut tiles, then a list of twenty-six services, the consultant roster and a map of the
// rest of the site: six and a half screens, forty-one images. People arrive with one of four
// errands (book, an emergency, find a doctor, get there), so those four are the first thing on
// the page, large, with the emergency number printed on its tile. Browsing comes after that in
// swipe rows, one for the departments and one for the consultants, each the height of a card.
//
// NO PHOTOGRAPH. The hero photo was stock (lib/media.ts says so) and cost a request and a screen
// of height on the device least able to spare either. The wide layout keeps its hero (DesktopHero).
//
// Server component; the client leaves are the search field and the department rails.

import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import {
  CalendarIcon,
  PhoneIcon,
  PinIcon,
  RouteIcon,
  StethoscopeIcon,
  WhatsAppIcon,
} from '@/components/icons'
import { DepartmentRails, type RailCategory } from '@/components/home/DepartmentRails'
import { TypewriterSearchBar } from '@/components/home/TypewriterSearchBar'
import { DoctorRailCard } from '@/components/doctor/DoctorRailCard'
import { PhoneTalkToUs } from '@/components/service/PhoneTalkToUs'
import { getDoctors } from '@/lib/doctors'
import { SERVICES, getCategory, serviceHref, servicesByCategory } from '@/lib/services'
import { translatedServiceName } from '@/lib/services-i18n'
import { contact, directionsUrl, whatsappUrl } from '@/lib/site-config'
import { siteText } from '@/lib/site-i18n'

const GROUPS = [
  { id: 'clinical', segment: 'launcherSegSpecialities', all: 'allSpecialities' },
  { id: 'diagnostics', segment: 'launcherSegDiagnostics', all: 'allDiagnostics' },
  { id: 'support', segment: 'launcherSegCare', all: 'allPatientServices' },
] as const

const TILE =
  'press flex min-h-[94px] flex-col justify-between rounded-[20px] p-3.5 text-[15px] font-bold leading-tight'

export async function PhoneHome() {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations('home')
  const tNav = await getTranslations('nav')
  const tCommon = await getTranslations('common')
  const text = siteText(locale)
  const doctors = getDoctors(locale)

  const categories: RailCategory[] = GROUPS.map((group) => {
    const services = servicesByCategory(group.id)
    return {
      id: group.id,
      label: t(group.segment),
      basePath: getCategory(group.id).basePath,
      seeAll: t('launcherSeeAll', { count: services.length }),
      allLabel: tNav(group.all),
      items: services.map((service) => ({
        slug: service.slug,
        name: translatedServiceName(service.slug, locale),
        href: serviceHref(service),
      })),
    }
  })

  return (
    <section className="lg:hidden">
      <div className="mx-auto max-w-2xl">
        <div className="px-5 pt-4">
          <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-teal">
            <PinIcon className="h-[15px] w-[15px]" />
            {text.shortAddress}
          </p>
          <h1 className="mt-2 text-balance font-serif text-[1.95rem] font-bold leading-[1.08] tracking-tight text-brand-dark-base">
            {t('heroTitleLine1')} {t('heroTitleLine2')}
          </h1>
          {/* The hospital's own three promises, from its Business profile. */}
          <p className="mt-1.5 text-[14.5px] font-medium leading-snug text-brand-dark-base/65">
            {text.about.highlights.join(' · ')}
          </p>
        </div>

        <div className="px-5 pt-3.5">
          <TypewriterSearchBar />
        </div>

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
            <a href={`tel:${contact.primary}`} className={`${TILE} h-full bg-brand-emergency text-white`}>
              <PhoneIcon className="h-6 w-6" />
              <span>
                {t('launcherEmergency')}
                <small className="mt-0.5 block text-xs font-medium tabular-nums opacity-90">
                  {contact.primaryDisplay}
                </small>
              </span>
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

        {/*
          WhatsApp, as its own row under the four errands, in WhatsApp's own green. It was a green chip on
          the corner of the Book tile, which read as a stray badge; a row says what it is. The label is
          18px bold because white on this green is 3.1:1, which is enough for large text and not for
          small, so there is no smaller text on it (the number is in Talk to us, further down).
        */}
        <div className="px-5 pt-2.5">
          <a
            href={whatsappUrl(tCommon('whatsappMessage'))}
            target="_blank"
            rel="noreferrer noopener"
            className="press focus-ring-inverse flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl bg-brand-whatsapp px-4 text-lg font-bold text-white shadow-[0_10px_20px_-12px_rgba(23,143,71,0.9)] transition-colors hover:bg-brand-whatsapp-hover"
          >
            <WhatsAppIcon className="h-6 w-6 shrink-0" />
            <span className="min-w-0 truncate">{tCommon('whatsappLabel')}</span>
          </a>
        </div>

        <DepartmentRails
          title={t('launcherDepartments')}
          kindLabel={t('launcherKind')}
          categories={categories}
        />

        <section aria-labelledby="home-consultants">
          <div className="flex items-baseline justify-between gap-3 px-5 pt-7">
            <h2
              id="home-consultants"
              className="font-serif text-[22px] font-bold leading-tight tracking-tight text-brand-dark-base"
            >
              {t('doctorsAtLims')}
            </h2>
            <Link
              href="/doctors"
              className="-my-2 shrink-0 py-2 text-[13px] font-semibold text-brand-teal"
            >
              {t('launcherAllDoctors')}
            </Link>
          </div>
          <ul className="mt-3 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-5 pb-1.5 [scroll-padding-left:1.25rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {doctors.map((doctor) => (
              <li key={doctor.id} className="w-[8.5rem] shrink-0 snap-start">
                <DoctorRailCard doctor={doctor} locale={locale} />
              </li>
            ))}
          </ul>
        </section>

        {/* Three numbers from the catalogue, in a line. */}
        <ul className="mx-5 mt-7 flex gap-1.5 rounded-[18px] bg-brand-mist px-4 py-3.5 text-center shadow-[inset_0_0_0_1px_rgba(15,91,102,0.13)]">
          {[
            { value: servicesByCategory('clinical').length, label: t('statClinical') },
            { value: servicesByCategory('diagnostics').length, label: t('statDiagnostics') },
            { value: SERVICES.length, label: t('statServices') },
          ].map((stat) => (
            <li key={stat.label} className="min-w-0 flex-1">
              <span className="block font-serif text-2xl font-bold leading-tight text-brand-teal">
                {stat.value}
              </span>
              <span className="block text-xs leading-snug text-brand-dark-base/65">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-2">
        <PhoneTalkToUs emergencyFirst hideFrom="lg" />
      </div>
    </section>
  )
}
