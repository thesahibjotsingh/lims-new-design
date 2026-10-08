// components/home/HomeSections.tsx
//
// The home page below its hero, in the order of the menu: Specialities, Find a doctor, Services,
// Patient care, Health library, About LIMS, Contact us. (The hero is DesktopHero / PhoneHome.)
//
// WHY THE ORDER. The header lists those seven; the home page used to run them in a different order
// (the three service groups together, then the doctors, then a strip of "the rest of the site"), so
// scrolling down did not match the menu. Now scrolling the page is walking down the menu.
//
// ONE ORDER, TWO WEIGHTS. On a phone each stop is a short preview (a swipe row and a "See all"
// link) so the page stays calm; from lg up the same stop is a fuller section (the full grid, the
// roster, the About text with its numbers, the address with a map). Those are different markup, not
// one markup stretched, so each service group renders both and CSS shows one: the hidden one stays
// in the HTML and costs no image requests (every image in it is lazy).
//
// THE BANDS ALTERNATE per width (white / mist, with one dark band on the wide layout for the
// doctors) so each section's edge shows without a rule between them, and the white cards lift off
// the mist. The phone and the wide layout have their own sequence, which is why every section takes
// a tone for each.
//
// THE HEALTH LIBRARY HAS NO PAGE YET (it is waiting for clinician-reviewed text). It keeps its place
// in the order as a plain "Coming soon" card that does not link to an empty page.

import type { ReactNode } from 'react'
import { FadeScroller } from '@/components/primitives/FadeScroller'
import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { ArrowRightIcon, DocumentIcon, PinIcon } from '@/components/icons'
import { ContactNumbers } from '@/components/contact/ContactNumbers'
import { MapEmbed } from '@/components/contact/MapEmbed'
import { DoctorRailCard } from '@/components/doctor/DoctorRailCard'
import { ConsultantRoster } from '@/components/home/ConsultantRoster'
import { GROUP_KEYS, ServiceRail } from '@/components/home/ServiceRail'
import { ServiceGrid } from '@/components/primitives/ServiceGrid'
import { getDoctors } from '@/lib/doctors'
import { embedUrls } from '@/lib/google-listing'
import {
  getCategory,
  SERVICES,
  servicesByCategory,
  type ServiceCategory,
} from '@/lib/services'
import { translatedCategoryBlurb } from '@/lib/services-i18n'
import { directionsUrl, fullAddress } from '@/lib/site-config'
import { localizedLocation, siteText } from '@/lib/site-i18n'

type Tone = 'white' | 'mist'
const TONE: Record<Tone, string> = { white: 'bg-white', mist: 'bg-brand-mist' }

const OUTLINE_LINK =
  'tap-target gap-2 rounded-full border border-brand-teal/25 px-5 text-sm font-semibold text-brand-teal transition-colors hover:bg-white'
const EYEBROW = 'text-xs font-semibold uppercase tracking-[0.14em] text-brand-copper-ink'
const WIDE_HEADING =
  'text-balance font-serif text-3xl font-bold tracking-tight text-brand-dark-base sm:text-4xl'

/** Specialities, Services or Patient care: a swipe row on a phone, the full grid from lg up. */
export async function ServiceGroupSection({
  categoryId,
  phoneTone,
  desktopTone,
  children,
}: {
  categoryId: ServiceCategory
  phoneTone: Tone
  desktopTone: Tone
  /** Extra content under the row / grid. */
  children?: ReactNode
}) {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations('home')
  const tNav = await getTranslations('nav')
  const category = getCategory(categoryId)
  const services = servicesByCategory(categoryId)
  const headingId = `home-${categoryId}-wide`

  return (
    <>
      <div className={`pb-8 lg:hidden ${TONE[phoneTone]}`}>
        <ServiceRail categoryId={categoryId} />
        {children ? <div className="px-5 pt-3">{children}</div> : null}
      </div>

      <section
        aria-labelledby={headingId}
        className={`hidden lg:block ${TONE[desktopTone]}`}
      >
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="scroll-reveal mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 id={headingId} className={WIDE_HEADING}>
                {tNav(GROUP_KEYS[categoryId].heading)}{' '}
                <span className="font-sans text-base font-medium text-brand-dark-base/45">
                  ({services.length})
                </span>
              </h2>
              <p className="mt-3 text-base leading-relaxed text-brand-dark-base/70">
                {translatedCategoryBlurb(categoryId, locale)}
              </p>
            </div>
            <Link href={category.basePath} className={OUTLINE_LINK}>
              {t('viewAll')} &rarr;
            </Link>
          </div>
          <ServiceGrid services={services} />
          {children ? <div className="mt-6">{children}</div> : null}
        </div>
      </section>
    </>
  )
}

/** Find a doctor: a row of cards on a phone, the full roster slider from lg up. */
export async function DoctorsSection() {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations('home')
  const doctors = getDoctors(locale)

  return (
    <>
      <section aria-labelledby="home-consultants" className="bg-white pb-8 lg:hidden">
        <div className="flex items-baseline justify-between gap-3 px-5 pt-8">
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
        <FadeScroller as="ul" className="mt-3 flex snap-x snap-mandatory gap-2.5 overflow-x-auto overflow-y-hidden overscroll-x-contain px-5 pb-1.5 [scroll-padding-left:1.25rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {doctors.map((doctor) => (
            <li key={doctor.id} className="w-[8.5rem] shrink-0 snap-start">
              <DoctorRailCard doctor={doctor} locale={locale} />
            </li>
          ))}
        </FadeScroller>
      </section>
      <div className="hidden lg:block">
        <ConsultantRoster />
      </div>
    </>
  )
}

/** A page that does not exist yet, said plainly. Not a link: there is nothing to open. */
async function ComingSoonCard({
  icon,
  title,
  body,
}: {
  icon: ReactNode
  title: string
  body: string
}) {
  const t = await getTranslations('home')
  return (
    <div className="flex items-start gap-3.5 rounded-2xl border border-dashed border-brand-teal/30 bg-white p-4 sm:items-center sm:p-5">
      <span
        aria-hidden="true"
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-mist text-brand-teal"
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span className="font-serif text-base font-bold text-brand-dark-base">{title}</span>
          <span className="rounded-full bg-brand-mist px-2.5 py-1 text-[11px] font-semibold text-brand-dark-base/65">
            {t('comingSoon')}
          </span>
        </span>
        <span className="mt-0.5 block text-sm leading-snug text-brand-dark-base/70">{body}</span>
      </span>
    </div>
  )
}

export async function HealthLibrarySection() {
  const tNav = await getTranslations('nav')
  const tHome = await getTranslations('home')
  return (
    <section
      id="home-health-library"
      aria-labelledby="home-health-library-heading"
      className="bg-brand-mist lg:bg-white"
    >
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-14">
        <h2
          id="home-health-library-heading"
          className="font-serif text-[22px] font-bold leading-tight tracking-tight text-brand-dark-base lg:text-4xl"
        >
          {tNav('healthLibrary')}
        </h2>
        <div className="mt-3 lg:mt-6">
          <ComingSoonCard
            icon={<DocumentIcon className="h-5 w-5" />}
            title={tNav('healthLibrary')}
            body={tHome('healthLibraryDesc')}
          />
        </div>
      </div>
    </section>
  )
}

export async function AboutSection() {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations('home')
  const tNav = await getTranslations('nav')
  const text = siteText(locale)

  // Counts out of the catalogue, not claims: they cannot drift from it (see DesktopHero).
  const stats = [
    { value: servicesByCategory('clinical').length, label: t('statClinical') },
    { value: servicesByCategory('diagnostics').length, label: t('statDiagnostics') },
    { value: SERVICES.length, label: t('statServices') },
  ]

  return (
    <section
      id="home-about"
      aria-labelledby="home-about-heading"
      className="bg-white lg:bg-brand-mist"
    >
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:py-14">
        <div>
          <p className={EYEBROW}>{tNav('aboutLims')}</p>
          <h2
            id="home-about-heading"
            className="mt-2 text-balance font-serif text-[22px] font-bold leading-tight tracking-tight text-brand-dark-base lg:text-4xl"
          >
            {text.about.headline}
          </h2>
          {/* Four lines on a phone; the whole paragraph from lg up. /about has the rest. */}
          <p className="mt-3 line-clamp-4 text-[15px] leading-relaxed text-brand-dark-base/75 lg:line-clamp-none lg:text-lg">
            {text.about.body}
          </p>
          {/* The hospital's own three promises, from its Business profile. */}
          <ul className="mt-4 flex flex-wrap gap-2">
            {text.about.highlights.map((highlight) => (
              <li
                key={highlight}
                className="rounded-full bg-brand-mist px-3.5 py-1.5 text-[13px] font-semibold text-brand-teal ring-1 ring-brand-teal/15 lg:bg-white"
              >
                {highlight}
              </li>
            ))}
          </ul>
          <Link href="/about" className={`${OUTLINE_LINK} mt-5 inline-flex min-h-[48px]`}>
            {tNav('aboutLims')}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <dl className="grid grid-cols-3 gap-2.5 lg:gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-brand-mist p-3.5 text-center lg:bg-white lg:p-6 lg:shadow-sm"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-serif text-2xl font-bold leading-tight text-brand-teal lg:text-5xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-xs leading-snug text-brand-dark-base/65 lg:text-sm">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export async function ContactSection() {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations('contactPage')
  const tNav = await getTranslations('nav')
  const location = localizedLocation(locale)

  return (
    <section
      id="home-contact"
      aria-labelledby="home-contact-heading"
      className="bg-brand-mist lg:bg-white"
    >
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-6 lg:grid-cols-[26rem_minmax(0,1fr)] lg:gap-10 lg:py-14">
        <div>
          <p className={EYEBROW}>{tNav('contactUs')}</p>
          <h2
            id="home-contact-heading"
            className="mt-2 font-serif text-[22px] font-bold leading-tight tracking-tight text-brand-dark-base lg:text-4xl"
          >
            {t('title')}
          </h2>

          <ContactNumbers className="mt-5" />

          <address className="mt-5 flex items-start gap-3 not-italic">
            <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
            <span className="text-[15px] leading-snug text-brand-dark-base/80">
              <strong className="block font-serif text-base font-bold text-brand-dark-base">
                {location.name}
              </strong>
              {fullAddress(location)}
            </span>
          </address>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {directionsUrl && (
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="tap-target focus-ring-inverse min-h-[48px] rounded-full bg-brand-teal px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-teal-dark"
              >
                {t('getDirections')}
              </a>
            )}
            <Link href="/contact" className={`${OUTLINE_LINK} min-h-[48px]`}>
              {tNav('allContactDetails')}
            </Link>
          </div>
        </div>

        {/*
          The map is for the wide layout: a phone has Get directions, which opens the real Maps
          app, and an embedded map there is a lot of page for no gain. It starts closed here
          (the Contact page opens Street View by default, a choice the hospital made for that
          page), so the home page asks Google for nothing until the visitor taps.
        */}
        <div className="hidden lg:block">
          <MapEmbed
            initialMode="none"
            mapSrc={embedUrls.map}
            streetViewSrc={embedUrls.streetView}
            labels={{
              heading: t('mapHeading'),
              showMap: t('showMap'),
              showStreetView: t('showStreetView'),
              privacyNote: t('mapPrivacy'),
              close: t('closeMap'),
              mapTitle: t('mapTitle'),
              streetViewTitle: t('streetViewTitle'),
              streetViewNote: t('streetViewNote'),
            }}
          />
        </div>
      </div>
    </section>
  )
}
