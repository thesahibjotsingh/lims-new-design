// components/service/ServiceHero.tsx
//
// The top of a service page: what it is, in one sentence, and how to reach the hospital.
//
// Composition follows the larger hospital sites surveyed (Medanta puts an enquiry form
// beside the title, Fortis and Max put the actions in the banner): the title and summary
// on the left, a "Talk to us" card on the right. The page's one booking link sits under the
// chips on the left, as a quiet outline pill: the site header already has a filled global
// "Book an appointment", so this one only opens the form with THIS department chosen.
//
// It states only what the data supports. The chips are COUNTS of what the page explains
// (conditions, treatments, consultants listed), never claims about capability. Each count links to
// the section it counts.
//
// ON A PHONE (below sm) the hero is a different, much shorter layout: a back link instead of the
// breadcrumb, the overview cut to three lines with Read more, the counts on one line, and two
// buttons (PhoneActions). The notepad is left out there: it was most of a screen between the
// title and the first section, and PhoneTalkToUs carries its numbers at the end of the page.
// Everything the wide layout shows is still in the page's HTML.

import { Fragment } from 'react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ChevronLeftIcon } from '@/components/icons'
import { ClampedText } from '@/components/service/ClampedText'
import { ContactCard } from '@/components/service/ContactCard'
import { HERO_ACTIONS_ID } from '@/components/service/PhoneActionBar'
import { ActionButton, type PhoneAction } from '@/components/service/PhoneActions'
import { ServiceIcon } from '@/components/primitives/ServiceIcon'
import { firstSentence, plain } from '@/lib/text'
import type { ClinicalService } from '@/lib/services'

/**
 * A count in the hero ("5 conditions"). With an `href` it is a link to the section it counts, so a
 * reader can go straight to it; the ids are the ones ServiceDetail gives those sections, and each
 * fact is only added where its section exists.
 */
interface HeroFact {
  text: string
  href?: string
}

export async function ServiceHero({
  service,
  name,
  categoryName,
  categoryTitle,
  categoryHref,
  alsoKnownAs,
  doctorCount,
  noAppointment,
  emergencyFirst,
  phoneActions,
  readMore,
  readLess,
}: {
  service: ClinicalService
  name: string
  categoryName: string
  categoryTitle: string
  categoryHref: string
  alsoKnownAs?: string
  doctorCount: number
  /** Emergency, ambulance and pharmacy are not booked ahead. */
  noAppointment: boolean
  /** Lead the contact card with the emergency number. */
  emergencyFirst: boolean
  /** The two buttons a phone gets in place of the notepad. */
  phoneActions: PhoneAction[]
  readMore: string
  readLess: string
}) {
  const t = await getTranslations('serviceDetail')
  const tCommon = await getTranslations('common')
  const tA11y = await getTranslations('a11y')
  const category = service.category

  const conditionsKey = {
    clinical: 'statConditionsClinical',
    diagnostics: 'statConditionsDiagnostics',
    support: 'statConditionsSupport',
  }[category]
  const treatmentsKey = {
    clinical: 'statTreatmentsClinical',
    diagnostics: 'statTreatmentsDiagnostics',
    support: 'statTreatmentsSupport',
  }[category]

  const factConditionsKey = {
    clinical: 'factConditionsClinical',
    diagnostics: 'factConditionsDiagnostics',
    support: 'factConditionsSupport',
  }[category]
  const factTreatmentsKey = {
    clinical: 'factTreatmentsClinical',
    diagnostics: 'factTreatmentsDiagnostics',
    support: 'factTreatmentsSupport',
  }[category]

  const chips: HeroFact[] = []
  // The same counts, shorter, for the one-line version on a phone.
  const facts: HeroFact[] = []
  // The emergency department is open at all hours (the hospital's own Business profile says so),
  // and it is the first thing someone on this page needs to know.
  if (service.slug === 'emergency-services') {
    chips.push({ text: t('open247') })
    facts.push({ text: t('open247') })
  }
  if (service.commonConditions?.length) {
    chips.push({
      text: t(conditionsKey, { count: service.commonConditions.length }),
      href: '#conditions',
    })
    facts.push({
      text: t(factConditionsKey, { count: service.commonConditions.length }),
      href: '#conditions',
    })
  }
  if (service.commonTreatments?.length) {
    chips.push({
      text: t(treatmentsKey, { count: service.commonTreatments.length }),
      href: '#treatments',
    })
    facts.push({
      text: t(factTreatmentsKey, { count: service.commonTreatments.length }),
      href: '#treatments',
    })
  }
  if (category === 'clinical' && doctorCount > 0) {
    chips.push({ text: t('statConsultants', { count: doctorCount }), href: '#doctors' })
    facts.push({ text: t('factConsultants', { count: doctorCount }), href: '#doctors' })
  }

  return (
    <header
      id="service-hero"
      className="teal-hero teal-curve text-white"
    >
      <div className="mx-auto max-w-7xl px-5 pb-5 pt-1 sm:px-6 sm:py-8 lg:py-12">
        {/* A phone gets one line back to the list; the breadcrumb is for wider screens. */}
        <Link
          href={categoryHref}
          className="focus-ring-inverse -ml-1 inline-flex min-h-[44px] items-center gap-0.5 rounded-md pr-2 text-[13px] text-white/80 sm:hidden"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          {categoryTitle}
        </Link>
        <nav aria-label={tA11y('breadcrumb')} className="hidden sm:block">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-white/75">
            <li>
              <Link href="/" className="hover:text-white">
                {tCommon('home')}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={categoryHref} className="hover:text-white">
                {categoryTitle}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-white">
              {name}
            </li>
          </ol>
        </nav>

        <div className="mt-1 grid grid-cols-1 gap-8 sm:mt-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:gap-12">
          <div>
            <div className="flex items-center gap-4">
              <span className="hidden shrink-0 rounded-2xl bg-white p-3 shadow-sm sm:block">
                <ServiceIcon slug={service.slug} size={56} />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75 sm:text-xs">
                  {categoryName}
                </p>
                <h1 className="mt-1 text-balance font-serif text-[2rem] font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
                  {name}
                </h1>
              </div>
            </div>

            {service.overview && (
              <>
                <p className="mt-5 hidden max-w-2xl text-lg leading-relaxed text-white/90 sm:block">
                  {firstSentence(service.overview)}
                </p>
                {/* The whole overview on a phone, clipped to three lines. */}
                <ClampedText
                  className="mt-3 sm:hidden"
                  note={t('generalInfoNote')}
                  readMore={readMore}
                  readLess={readLess}
                >
                  {plain(service.overview)}
                </ClampedText>
              </>
            )}
            {alsoKnownAs && <p className="mt-2 text-sm text-white/75">{alsoKnownAs}</p>}

            {/*
              The counts are links to their sections but look like the plain text they were: no
              underline, no colour change. On a phone those sections are rows that open; Collapse
              opens the one a #link points at, and the section's scroll margin keeps it clear of
              the header and the chip row. The hit area is padded out past the 12.5px text, as the
              section chips' is.
            */}
            {facts.length > 0 && (
              <p className="mt-1 text-[12.5px] text-white/75 sm:hidden">
                {facts.map((fact, index) => (
                  <Fragment key={fact.text}>
                    {index > 0 && ' · '}
                    {fact.href ? (
                      <a
                        href={fact.href}
                        className="focus-ring-inverse relative rounded-sm before:absolute before:-inset-x-1 before:-inset-y-3 before:content-['']"
                      >
                        {fact.text}
                      </a>
                    ) : (
                      fact.text
                    )}
                  </Fragment>
                ))}
              </p>
            )}
            {chips.length > 0 && (
              <ul className="mt-6 hidden flex-wrap gap-2 sm:flex">
                {chips.map((chip) => (
                  <li key={chip.text}>
                    {chip.href ? (
                      <a
                        href={chip.href}
                        className="focus-ring-inverse block rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white"
                      >
                        {chip.text}
                      </a>
                    ) : (
                      <span className="block rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white">
                        {chip.text}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {/*
              The booking link. It sits here, not in the "Talk to us" card, so the card is the
              same height on every page; styled like the Contact and About heroes' secondary
              action. The accessible name still says which department the form opens with.
            */}
            {!noAppointment && (
              <Link
                href={`/appointments?department=${service.slug}`}
                aria-label={t('requestFor', { name })}
                className="tap-target mt-6 hidden rounded-full border border-white/40 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:inline-flex"
              >
                {tCommon('requestAnAppointment')}
              </Link>
            )}

            {/* Phone: the two things to do first. PhoneActionBar takes over when this scrolls away. */}
            {phoneActions.length > 0 && (
              <div id={HERO_ACTIONS_ID} className="mt-4 flex gap-2.5 sm:hidden">
                {phoneActions.map((action) => (
                  <ActionButton
                    key={action.kind}
                    action={action}
                    surface="onDark"
                    dense={phoneActions.length > 2}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="hidden sm:block">
            <ContactCard heading={t('talkToUs')} tag={name} emergencyFirst={emergencyFirst} />
          </div>
        </div>
      </div>
    </header>
  )
}
