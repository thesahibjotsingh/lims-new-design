import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ChevronLeftIcon } from '@/components/icons'
import { DoctorFilters } from '@/components/doctor/DoctorFilters'
import { DoctorRailCard } from '@/components/doctor/DoctorRailCard'
import { DoctorSearchBox } from '@/components/doctors/DoctorSearchBox'
import { DoctorCard } from '@/components/primitives/DoctorCard'
import { ReviewBand } from '@/components/service/ReviewBand'
import { Band, SectionHeading } from '@/components/service/blocks'
import {
  DOCTORS,
  departmentsWithDoctors,
  getDoctorsByDepartment,
  searchDoctors,
} from '@/lib/doctors'
import { REVIEW_MODE } from '@/lib/review'
import { directoryReviewSlots } from '@/lib/review-slots-doctors'
import { didYouMean } from '@/lib/search'
import { serviceHref, servicesByCategory } from '@/lib/services'
import { translatedServiceName } from '@/lib/services-i18n'
import { contact } from '@/lib/site-config'
import type { Locale } from '@/i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pageMeta' })
  const tNav = await getTranslations({ locale, namespace: 'nav' })
  return { title: tNav('findADoctor'), description: t('doctorsDescription') }
}

/*
 * The directory, filtered server-side from ?q= and ?department=.
 *
 * Every search surface on the site (the nav dropdown, the desktop hero card, the mobile
 * typewriter bar) lands here with a query string rather than holding results in its own
 * state. One filtering implementation, one URL you can share, and the back button works.
 * The department pills use the same mechanism, so a filtered view is just another URL.
 *
 * `searchParams` is a Promise in Next 15. A value arriving as string[] (from a
 * hand-edited ?q=a&q=b) is normalised rather than crashing the page: this route has to
 * survive whatever ends up in the address bar.
 */
export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[]; department?: string | string[] }>
}) {
  const t = await getTranslations('doctorsPage')
  const tCommon = await getTranslations('common')
  const tNav = await getTranslations('nav')
  const tA11y = await getTranslations('a11y')
  const locale = (await getLocale()) as Locale

  const params = await searchParams
  const first = (value: string | string[] | undefined) =>
    (Array.isArray(value) ? value[0] : value) ?? ''
  const query = first(params.q).trim()

  // Only a department that has a published consultant is a valid filter; anything else in
  // the address bar is ignored rather than producing an empty page.
  const withDoctors = departmentsWithDoctors()
  const requested = first(params.department).trim()
  const department = withDoctors.includes(requested) ? requested : undefined

  const matches = searchDoctors(query, locale)
  const doctors = department
    ? matches.filter((doctor) => doctor.departmentSlug === department)
    : matches
  // Only computed when there is nothing to show, so the happy path pays nothing.
  const alternatives = doctors.length === 0 && query ? didYouMean(query, 3, locale) : []

  const options = withDoctors.map((slug) => ({
    slug,
    label: translatedServiceName(slug, locale),
    count: getDoctorsByDepartment(slug).length,
  }))
  const departmentName = department ? translatedServiceName(department, locale) : ''
  const slots = REVIEW_MODE ? directoryReviewSlots() : []

  return (
    <>
      {REVIEW_MODE && (
        <div className="border-b-2 border-dashed border-amber-400 bg-amber-100 text-amber-950">
          <div className="mx-auto max-w-7xl px-5 py-3 text-sm sm:px-6">
            <strong>Review mode.</strong> The directory is waiting on {slots.length} things from
            LIMS (below the roster). They never appear on the public site.{' '}
            <a href="#review-directory" className="font-semibold underline">
              Jump to the list
            </a>
            .
          </div>
        </div>
      )}

      <header className="teal-hero teal-curve text-white">
        <div className="mx-auto max-w-7xl px-5 pb-5 pt-1 sm:px-6 sm:py-8 lg:py-12">
          <Link
            href="/"
            className="focus-ring-inverse -ml-1 inline-flex min-h-[44px] items-center gap-0.5 rounded-md pr-2 text-[13px] text-white/80 sm:hidden"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            {tCommon('home')}
          </Link>
          <nav aria-label={tA11y('breadcrumb')} className="hidden sm:block">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-white/75">
              <li>
                <Link href="/" className="hover:text-white">
                  {tCommon('home')}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-white">
                {tNav('findADoctor')}
              </li>
            </ol>
          </nav>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75 sm:mt-6 sm:text-xs">
            {t('eyebrow')}
          </p>
          <h1 className="mt-1 text-balance font-serif text-[2rem] font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-2 max-w-2xl text-base text-white/90 sm:mt-3 sm:text-lg">{t('intro')}</p>
          <DoctorSearchBox defaultQuery={query} />
        </div>
      </header>

      <Band id="roster" tone="white">
        <h2 id="roster-heading" className="sr-only">
          {t('title')}
        </h2>

        <DoctorFilters
          label={t('filterLabel')}
          allLabel={t('filterAll')}
          total={DOCTORS.length}
          options={options}
          active={department}
          query={query}
        />

        <p className="mb-4 mt-4 text-sm text-brand-dark-base/65 sm:mb-6 sm:mt-6">
          {query ? (
            <>
              {t('matchingCount', { count: doctors.length, total: DOCTORS.length })}{' '}
              <strong className="font-semibold text-brand-dark-base">{query}</strong>.{' '}
              <Link href="/doctors" className="font-semibold text-brand-teal hover:underline">
                {t('clear')}
              </Link>
            </>
          ) : department ? (
            t('inDepartment', { count: doctors.length, department: departmentName })
          ) : (
            t('namedCount', { count: DOCTORS.length })
          )}
        </p>

        {doctors.length > 0 ? (
          <>
            {/*
              A phone gets small cards, two across: photo, name, department, degrees. The full card
              (registration number, two buttons) is a screen tall on its own, and a directory has
              to show everyone at once, which a swipe row cannot. The whole small card is the link
              to the profile, where the booking button is. From sm up, the full cards as before.
            */}
            <ul className="grid grid-cols-2 gap-3 sm:hidden">
              {doctors.map((doctor) => (
                <li key={doctor.id}>
                  <DoctorRailCard doctor={doctor} locale={locale} credentials />
                </li>
              ))}
            </ul>
            <ul className="hidden grid-cols-2 gap-5 sm:grid lg:grid-cols-4">
              {doctors.map((doctor) => (
                <li key={doctor.id}>
                  <DoctorCard doctor={doctor} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          /*
            An empty result offers the phone. "No doctors found" with no next step is
            where a patient looking for care stops looking.
          */
          <div className="rounded-2xl border border-dashed border-brand-teal/25 bg-brand-mist/60 p-8">
            <h2 className="font-serif text-xl font-bold text-brand-dark-base">
              {t('noMatch', { query })}
            </h2>
            {/*
              "Did you mean" before the apology. A misspelling is the likeliest reason a
              real speciality returns nothing, and offering the correction first turns a
              dead end into one tap. It is a QUESTION, never a substitution: the roster is
              not silently re-searched on the reader's behalf, because a hospital directory
              that quietly answers a different question than the one asked is how someone
              ends up reading about the wrong speciality.
            */}
            {alternatives.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold text-brand-dark-base">{t('didYouMean')}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {alternatives.map((suggestion) => (
                    <li key={`${suggestion.kind}-${suggestion.href}`}>
                      <Link
                        href={suggestion.href}
                        className="tap-target rounded-full border border-brand-teal/25 bg-white px-4 text-xs font-semibold text-brand-teal hover:bg-brand-mist"
                      >
                        {suggestion.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-brand-dark-base/70">
              {t('notPublishedYet')}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/doctors"
                className="tap-target rounded-full border border-brand-teal/25 px-5 text-xs font-semibold text-brand-teal hover:bg-white"
              >
                {t('seeAll')}
              </Link>
              <a
                href={`tel:${contact.secondary}`}
                className="tap-target focus-ring-inverse rounded-full bg-brand-teal px-5 text-xs font-semibold text-white hover:bg-brand-teal-dark"
              >
                {tCommon('call', { number: contact.secondaryDisplay })}
              </a>
            </div>
          </div>
        )}
      </Band>

      <ReviewBand
        id="review-directory"
        group="top"
        slots={slots}
        title="Needs LIMS input: the consultant roster"
      />

      <Band id="browse" tone="mist">
        <SectionHeading id="browse" lead={t('browseLead')}>
          {t('browseHeading')}
        </SectionHeading>
        <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
          {servicesByCategory('clinical').map((service) => {
            const count = getDoctorsByDepartment(service.slug).length
            return (
              <li key={service.slug} className="shrink-0">
                <Link
                  href={serviceHref(service)}
                  className="tap-target rounded-full border border-brand-teal/20 bg-white px-4 text-sm text-brand-dark-base/80 transition-colors hover:border-brand-teal/40 hover:text-brand-teal"
                >
                  {translatedServiceName(service.slug, locale)}
                  {count > 0 && (
                    <span className="ml-1.5 font-semibold text-brand-teal">({count})</span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
        <p className="mt-8 max-w-2xl text-xs leading-relaxed text-brand-dark-base/55">
          {t('notPublishedYet')}
        </p>
      </Band>
    </>
  )
}
