import type { Metadata } from 'next'
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ArrowRightIcon, PinIcon } from '@/components/icons'
import { InfoHero } from '@/components/page/InfoHero'
import { ReviewBand } from '@/components/service/ReviewBand'
import { SectionNav } from '@/components/service/SectionNav'
import { Band, DoctorList, RelatedGrid, SectionHeading } from '@/components/service/blocks'
import { DOCTORS, registrationDisplay } from '@/lib/doctors'
import { googleListing } from '@/lib/google-listing'
import { REVIEW_MODE } from '@/lib/review'
import { aboutReviewSlots } from '@/lib/review-slots-pages'
import { serviceHref, servicesByCategory } from '@/lib/services'
import { translatedServiceName } from '@/lib/services-i18n'
import { contact, fullAddress, primaryLocation, siteConfig } from '@/lib/site-config'
import type { Locale } from '@/i18n/routing'

export const metadata: Metadata = {
  title: 'About LIMS',
  description: siteConfig.description,
}

/*
 * THE ABOUT PAGE.
 *
 * Everything shown is either a count derived from the catalogue, a list the site already holds
 * (departments, consultants), or a detail from the hospital's own stationery and listing. No
 * founding year, bed count, accreditation, leadership or "state of the art": those are claims
 * the hospital makes, not claims a website makes on its behalf. Each missing one is a dashed
 * box in review mode, so a walk-through with LIMS staff can fill them in, and an absent
 * section on the public site until then.
 *
 * It is a page a patient reads to decide whether to trust the place, so it leads with what is
 * checkable (where it is, what departments exist, which doctors, how to reach them) rather
 * than with adjectives.
 */
export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  // Static rendering needs the locale set here too, not only in the layout. See the note in
  // app/[locale]/layout.tsx.
  const { locale: routeLocale } = await params
  setRequestLocale(routeLocale)
  const t = await getTranslations('aboutPage')
  const tCommon = await getTranslations('common')
  const tNav = await getTranslations('nav')
  const tContact = await getTranslations('contactPage')
  const tCard = await getTranslations('doctorCard')
  const locale = (await getLocale()) as Locale

  const slots = REVIEW_MODE ? aboutReviewSlots() : []

  const clinical = servicesByCategory('clinical')
  const diagnostics = servicesByCategory('diagnostics')
  const support = servicesByCategory('support')

  const stats = [
    { value: clinical.length, label: t('statsClinical') },
    { value: diagnostics.length, label: t('statsDiagnostics') },
    { value: support.length, label: t('statsSupport') },
    { value: DOCTORS.length, label: t('statsConsultants') },
  ]

  const departmentCards = clinical.map((service) => ({
    slug: service.slug,
    name: translatedServiceName(service.slug, locale),
    categoryName: '',
    href: serviceHref(service),
  }))

  const doctorRows = DOCTORS.map((doctor) => ({
    id: doctor.id,
    name: doctor.name,
    // The short card form where one exists, so a long list of fellowships does not turn a
    // one-line row into a paragraph. The profile page has the full string.
    qualifications: doctor.cardCredentials?.degrees ?? doctor.qualifications,
    designation: doctor.designation,
    registration: doctor.registrationNumber ? registrationDisplay(doctor.registrationNumber) : undefined,
    portrait: doctor.portrait,
  }))

  const navItems = [
    { id: 'overview', label: t('nav.overview') },
    { id: 'departments', label: t('nav.departments') },
    { id: 'doctors', label: t('nav.doctors') },
    { id: 'values', label: t('nav.values') },
    { id: 'find', label: t('nav.find') },
  ]

  return (
    <>
      {REVIEW_MODE && slots.length > 0 && (
        <div className="border-b-2 border-dashed border-amber-400 bg-amber-100 text-amber-950">
          <div className="mx-auto max-w-7xl px-5 py-3 text-sm sm:px-6">
            <strong>Review mode.</strong> {slots.length} things on this page need LIMS input before
            it reads like the About page of a large hospital.{' '}
            <a href="#review-about-story" className="font-semibold underline">
              Jump to the list
            </a>
            . None of this appears on the public site.
          </div>
        </div>
      )}

      <InfoHero
        homeLabel={tCommon('home')}
        current={tNav('aboutLims')}
        eyebrow={t('eyebrow')}
        title={siteConfig.name}
        intro={siteConfig.description}
        actions={
          <>
            <Link
              href="/doctors"
              className="tap-target rounded-full bg-white px-6 text-sm font-semibold text-brand-teal transition-colors hover:bg-brand-mist"
            >
              {tNav('findADoctor')}
            </Link>
            <Link
              href="/contact"
              className="tap-target rounded-full border border-white/40 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {tNav('contactUs')}
            </Link>
          </>
        }
      />
      <SectionNav items={navItems} label={t('navLabel')} />

      {/* ---- at a glance ------------------------------------------------------------------- */}
      <Band id="overview" tone="white">
        <SectionHeading id="overview">{t('overviewHeading')}</SectionHeading>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-14">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="border-t-2 border-brand-teal/20 pt-4">
                <dd className="font-serif text-5xl font-bold tabular-nums text-brand-teal">
                  {stat.value}
                </dd>
                <dt className="mt-2 text-sm font-medium leading-snug text-brand-dark-base/70">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>

          <aside className="rounded-2xl border border-brand-teal/10 bg-brand-mist/60 p-6">
            <h3 className="font-serif text-lg font-bold text-brand-dark-base">{t('recordHeading')}</h3>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-brand-dark-base/50">
                  {t('labelAddress')}
                </dt>
                <dd className="mt-1 leading-relaxed text-brand-dark-base/80">{fullAddress()}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-brand-dark-base/50">
                  {t('labelPhone')}
                </dt>
                <dd className="mt-1 space-y-0.5 text-brand-dark-base/80">
                  <a href={`tel:${contact.secondary}`} className="block tabular-nums hover:underline">
                    {tContact('appointmentsLabel')}: {contact.secondaryDisplay}
                  </a>
                  <a href={`tel:${contact.primary}`} className="block tabular-nums hover:underline">
                    {tContact('emergencyLabel')}: {contact.primaryDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-brand-dark-base/50">
                  {t('labelTagline')}
                </dt>
                <dd className="mt-1 text-brand-dark-base/80">{siteConfig.tagline.join(' · ')}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </Band>

      <ReviewBand
        id="review-about-story"
        group="top"
        slots={slots}
        title="Needs LIMS input: the story and the numbers"
      />

      {/* ---- departments ------------------------------------------------------------------- */}
      <Band id="departments" tone="mist">
        <SectionHeading id="departments" lead={t('departmentsLead', { count: clinical.length })}>
          {t('departmentsHeading')}
        </SectionHeading>
        <RelatedGrid cards={departmentCards} />

        <div className="mt-14">
          <h3 className="font-serif text-2xl font-bold text-brand-dark-base">{t('diagnosticsHeading')}</h3>
          <p className="mt-2 max-w-2xl text-base text-brand-dark-base/70">{t('diagnosticsLead')}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {diagnostics.map((service) => (
              <li key={service.slug}>
                <Link
                  href={serviceHref(service)}
                  className="tap-target rounded-full border border-brand-teal/20 bg-white px-4 text-sm text-brand-dark-base/80 transition-colors hover:border-brand-teal/40 hover:text-brand-teal"
                >
                  {translatedServiceName(service.slug, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Band>

      {/* ---- consultants ------------------------------------------------------------------- */}
      <Band id="doctors" tone="white">
        <SectionHeading id="doctors" lead={t('doctorsLead', { count: DOCTORS.length })}>
          {t('doctorsHeading')}
        </SectionHeading>
        <DoctorList
          doctors={doctorRows}
          regLabel={tCard('regNo')}
          viewProfile={tCard('viewProfile')}
          requestAppointment={tCard('requestAppointment')}
        />
        <Link
          href="/doctors"
          className="tap-target mt-6 gap-2 rounded-full border border-brand-teal/25 px-6 text-sm font-semibold text-brand-teal transition-colors hover:bg-brand-mist"
        >
          {t('doctorsCta')}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </Band>

      <ReviewBand
        id="review-about-middle"
        group="middle"
        slots={slots}
        title="Needs LIMS input: values, facilities and photographs"
      />

      {/* ---- the three words --------------------------------------------------------------- */}
      <section
        id="values"
        aria-labelledby="values-heading"
        className="scroll-mt-40 bg-brand-teal-dark text-white lg:scroll-mt-[190px]"
      >
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
            {t('valuesLead')}
          </p>
          <h2 id="values-heading" className="sr-only">
            {t('valuesHeading')}
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {siteConfig.tagline.map((word, index) => (
              <li key={word} className="border-t border-white/25 pt-5">
                <span className="text-sm font-semibold tabular-nums text-white/60">0{index + 1}</span>
                <span className="mt-2 block font-serif text-4xl font-bold tracking-tight sm:text-5xl">
                  {word}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ReviewBand
        id="review-about-trust"
        group="trust"
        slots={slots}
        title="Needs LIMS input: leadership, accreditation and awards"
      />

      {/* ---- visit us ---------------------------------------------------------------------- */}
      <Band id="find" tone="mist">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-2xl">
            <h2
              id="find-heading"
              className="text-balance font-serif text-3xl font-bold tracking-tight text-brand-dark-base"
            >
              {t('findHeading')}
            </h2>
            <p className="mt-3 flex items-start gap-2 text-base leading-relaxed text-brand-dark-base/80">
              <PinIcon className="mt-1 h-4 w-4 shrink-0 text-brand-teal" />
              <span>{fullAddress(primaryLocation)}</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-brand-dark-base/65">{t('findBody')}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="tap-target focus-ring-inverse gap-2 rounded-full bg-brand-teal px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-teal-dark"
            >
              {t('findCta')}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a
              href={googleListing.placeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="tap-target rounded-full border border-brand-teal/25 px-6 text-sm font-semibold text-brand-teal transition-colors hover:bg-white"
            >
              {tContact('openInMaps')}
            </a>
          </div>
        </div>
      </Band>
    </>
  )
}
