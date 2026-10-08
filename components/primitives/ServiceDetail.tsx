// components/primitives/ServiceDetail.tsx
//
// The body of a service page, shared by all three category routes (specialities, services,
// patient care). One composition, three shapes:
//
//   clinical     overview, consultants, conditions, when to see a doctor, diagnosis,
//                treatments, your visit, prevention, questions, related
//   diagnostics  overview, what it shows, how it is done, before / during, after / safety,
//                questions, related
//   support      overview, who it helps, approaches, how it works, questions, related
//
// WHAT IS REAL AND WHAT IS NOT. Everything rendered to the public is either supplied by
// LIMS (the service list, the two phone numbers, the consultants, "arrive 15 minutes
// early") or general reference information that describes the field and never claims
// anything about this hospital (lib/service-content.ts, lib/services.ts). Sections only
// LIMS can confirm (highlights, equipment, timings, patient stories, accreditations) are
// the dashed review bands, and they render ONLY in review mode (lib/review.ts), so a
// public visitor never sees an unconfirmed claim. See lib/review-slots.ts.
//
// STRUCTURE. The page is built as a list of sections first and rendered second, so the
// sticky section nav and the page itself can never disagree about which sections exist,
// and the white / tinted alternation is applied in one place.

import { Fragment, type ReactNode } from 'react'
import { FadeScroller } from '@/components/primitives/FadeScroller'
import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PhoneIcon, ShieldIcon } from '@/components/icons'
import { ReviewBand, GROUP_TITLE } from '@/components/service/ReviewBand'
import { PhoneActionBar } from '@/components/service/PhoneActionBar'
import { buildPhoneActions } from '@/components/service/PhoneActions'
import { PhoneTalkToUs } from '@/components/service/PhoneTalkToUs'
import { SectionNav } from '@/components/service/SectionNav'
import { ServiceHero } from '@/components/service/ServiceHero'
import {
  Accordion,
  Band,
  BulletList,
  DiagnosisGrid,
  DoctorList,
  FaqGrid,
  RelatedGrid,
  SectionHeading,
  Stepper,
  TextColumns,
  type DiagnosisTile,
  type DoctorRowData,
  type RelatedCard,
  type Tone,
} from '@/components/service/blocks'
import { localizedExtras, localizedService } from '@/lib/content-i18n'
import { getDoctorsByDepartment, registrationDisplay } from '@/lib/doctors'
import { REVIEW_MODE } from '@/lib/review'
import { reviewSlotsFor, type SlotGroup } from '@/lib/review-slots'
import { getCategory, getService, serviceHref, servicesByCategory } from '@/lib/services'
import type { ClinicalService } from '@/lib/services'
import {
  translatedCategoryName,
  translatedCategoryTitle,
  translatedServiceName,
} from '@/lib/services-i18n'
import { contact } from '@/lib/site-config'
import { plain } from '@/lib/text'
import type { Locale } from '@/i18n/routing'

const CONDITIONS_HEADING_KEY = {
  clinical: 'conditionsHeadingClinical',
  diagnostics: 'conditionsHeadingDiagnostics',
  support: 'conditionsHeadingSupport',
} as const

const TREATMENTS_HEADING_KEY = {
  clinical: 'treatmentsHeadingClinical',
  diagnostics: 'treatmentsHeadingDiagnostics',
  support: 'treatmentsHeadingSupport',
} as const

// The section nav's own wording for the same two sections, per kind of page.
const CONDITIONS_NAV_KEY = { clinical: 'conditions', diagnostics: 'uses', support: 'helps' } as const
const TREATMENTS_NAV_KEY = {
  clinical: 'treatments',
  diagnostics: 'performed',
  support: 'approaches',
} as const

interface Section {
  id: string
  /** Key under `serviceDetail.nav`. Review bands have none and stay out of the nav. */
  navKey?: string
  review?: boolean
  render: (tone: Tone) => ReactNode
}

export async function ServiceDetail({ service: englishService }: { service: ClinicalService }) {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations('serviceDetail')
  const tCard = await getTranslations('doctorCard')

  // Overview, conditions, treatments and every list on the page in the reader's language
  // (lib/content-i18n). Anything not translated falls back to the English record.
  const service = localizedService(englishService, locale)
  const extras = localizedExtras(service.slug, locale)
  if (!extras) throw new Error(`No extras for service "${service.slug}" (lib/service-content.ts)`)

  const kind = service.category
  const category = getCategory(kind)
  const name = translatedServiceName(service.slug, locale)
  const categoryName = translatedCategoryName(kind, locale)
  const doctors = kind === 'clinical' ? getDoctorsByDepartment(service.slug, locale) : []
  const noAppointment = Boolean(extras.noAppointment)
  const slots = REVIEW_MODE ? reviewSlotsFor(service) : []
  const number = contact.secondaryDisplay

  const sections: Section[] = []
  // Below lg every section is a row that opens. The first real section after the overview
  // (the consultants on a department page, the first list elsewhere) starts open and the rest
  // start shut; the hero's own text stands in for the overview. See components/service/Collapse.
  let openId = ''
  const add = (id: string, navKey: string, render: (tone: Tone) => ReactNode) => {
    if (!openId && id !== 'overview') openId = id
    sections.push({ id, navKey, render })
  }
  const isOpen = (id: string) => id === openId
  // A panel inside a section: mist on a white band, white on a mist one; always mist below lg,
  // where the section itself is a white card.
  const panelTone = (tone: Tone) =>
    tone === 'white' ? 'bg-brand-mist' : 'bg-brand-mist lg:bg-white'
  const addReview = (group: SlotGroup) => {
    if (!REVIEW_MODE || !slots.some((slot) => slot.group === group)) return
    sections.push({
      id: `review-${group}`,
      review: true,
      render: () => <ReviewBand id={`review-${group}`} group={group} slots={slots} />,
    })
  }

  /* ---- overview --------------------------------------------------------------------- */

  add('overview', 'overview', (tone) => (
    // Below lg the hero already carries the overview (clamped, with Read more), so this band
    // survives there only to hold the "what it covers" chips, as a row of its own.
    <Band
      id="overview"
      tone={tone}
      title={extras.areas ? t('coversHeading', { name }) : undefined}
      phone={extras.areas ? 'row' : 'hidden'}
    >
      <div
        className={
          extras.areas
            ? 'grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16'
            : ''
        }
      >
        <div className="max-lg:hidden">
          <SectionHeading id="overview">{t('aboutHeading', { name })}</SectionHeading>
          <p className="max-w-2xl text-lg leading-relaxed text-brand-dark-base/80">
            {plain(service.overview ?? t('aboutServiceFallback'))}
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-brand-dark-base/60">
            {t('generalInfoNote')}
          </p>
        </div>

        {extras.areas && (
          <div className={`self-start rounded-2xl lg:p-8 ${panelTone(tone)} max-lg:bg-transparent`}>
            <h3 className="font-serif text-xl font-bold text-brand-dark-base max-lg:hidden">
              {t('coversHeading', { name })}
            </h3>
            <ul className="flex flex-wrap gap-2 lg:mt-4">
              {extras.areas.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-brand-teal/20 bg-brand-mist px-3.5 py-1.5 text-sm font-medium text-brand-dark-base/80 lg:bg-white lg:px-4 lg:py-2"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Band>
  ))

  /* ---- consultants (clinical) -------------------------------------------------------- */

  if (kind === 'clinical') {
    const rows: DoctorRowData[] = doctors.map((doctor) => ({
      id: doctor.id,
      name: doctor.name,
      qualifications: doctor.qualifications,
      designation: doctor.designation,
      registration: doctor.registrationNumber
        ? registrationDisplay(doctor.registrationNumber)
        : undefined,
      portrait: doctor.portrait
        ? { src: doctor.portrait.src, alt: doctor.portrait.alt, focusY: doctor.portrait.focusY }
        : undefined,
    }))

    add('doctors', 'consultants', (tone) => (
      <Band
        id="doctors"
        tone={tone}
        title={t('consultantsIn', { name })}
        count={rows.length > 0 ? rows.length : undefined}
        open={isOpen('doctors')}
      >
        <SectionHeading id="doctors">{t('consultantsIn', { name })}</SectionHeading>
        {rows.length > 0 ? (
          <DoctorList
            doctors={rows}
            regLabel={tCard('regNo')}
            viewProfile={tCard('viewProfile')}
            requestAppointment={tCard('requestAppointment')}
          />
        ) : (
          // One quiet line, not a boxed panel ahead of the content: the honest answer is
          // the same (no list yet, here is who to ask) without taking a screen.
          <p className="max-w-2xl text-base leading-relaxed text-brand-dark-base/70">
            {t('consultantsLine', {
              type: t(kind === 'clinical' ? 'departmentType' : 'serviceType'),
              number,
            })}
          </p>
        )}
      </Band>
    ))
  }

  addReview('top')

  /* ---- conditions / what it shows / who it helps ------------------------------------- */

  if (service.commonConditions?.length) {
    const items = service.commonConditions
    add('conditions', CONDITIONS_NAV_KEY[kind], (tone) => (
      <Band
        id="conditions"
        tone={tone}
        title={t(CONDITIONS_HEADING_KEY[kind], { name })}
        count={items.length}
        open={isOpen('conditions')}
      >
        <SectionHeading id="conditions">
          {t(CONDITIONS_HEADING_KEY[kind], { name })}
        </SectionHeading>
        <TextColumns items={items} />
      </Band>
    ))
  }

  /* ---- when to see a doctor (clinical) ----------------------------------------------- */

  if (kind === 'clinical' && (extras.seeDoctorIf || extras.emergencyIf)) {
    const emergencyDept = Boolean(extras.emergencyDept)
    add('when', 'when', (tone) => (
      <Band
        id="when"
        tone={tone}
        title={t(emergencyDept ? 'whenHeadingEmergency' : 'whenHeading')}
        count={(extras.seeDoctorIf?.length ?? 0) + (extras.emergencyIf?.length ?? 0)}
        open={isOpen('when')}
      >
        <SectionHeading id="when" draft>
          {t(emergencyDept ? 'whenHeadingEmergency' : 'whenHeading')}
        </SectionHeading>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {extras.seeDoctorIf && (
            <div className="rounded-2xl border border-brand-teal/10 bg-white p-4 shadow-sm max-lg:border-0 max-lg:bg-brand-mist max-lg:shadow-none sm:p-8">
              <h3 className="font-serif text-lg font-bold text-brand-dark-base sm:text-xl">
                {t(emergencyDept ? 'comeToEmergencyIf' : 'seeDoctorIf')}
              </h3>
              <div className="mt-5">
                <BulletList items={extras.seeDoctorIf} />
              </div>
            </div>
          )}
          {extras.emergencyIf && (
            <div className="rounded-2xl border border-brand-emergency/25 bg-brand-emergency/5 p-4 sm:p-8">
              <h3 className="font-serif text-lg font-bold text-brand-dark-base sm:text-xl">
                {t(emergencyDept ? 'emergencyIfEmergencyDept' : 'emergencyIf')}
              </h3>
              <div className="mt-5">
                <BulletList items={extras.emergencyIf} marker="red" />
              </div>
              <p className="mt-6 text-sm leading-relaxed text-brand-dark-base/70">
                {t('emergencyNote')}
              </p>
              <a
                href={`tel:${contact.primary}`}
                className="tap-target focus-ring-inverse mt-3 gap-2 rounded-full bg-brand-emergency px-6 text-base font-bold text-white hover:opacity-90"
              >
                <PhoneIcon className="h-4 w-4" />
                {t('emergencyCall', { number: contact.primaryDisplay })}
              </a>
            </div>
          )}
        </div>
      </Band>
    ))
  }

  /* ---- diagnosis (clinical) ----------------------------------------------------------- */

  if (kind === 'clinical' && extras.diagnosedBy?.length) {
    const tiles: DiagnosisTile[] = extras.diagnosedBy.map((item) => {
      const linked = item.slug ? getService(item.slug) : undefined
      return {
        name: item.name,
        detail: item.detail,
        link: linked
          ? {
              href: serviceHref(linked),
              label: t('seeService', { name: translatedServiceName(linked.slug, locale) }),
              note: t('listedAtLims'),
            }
          : undefined,
      }
    })
    add('diagnosis', 'diagnosis', (tone) => (
      <Band
        id="diagnosis"
        tone={tone}
        title={t('diagnosisHeading')}
        count={tiles.length}
        open={isOpen('diagnosis')}
      >
        <SectionHeading id="diagnosis" lead={t('diagnosisIntro')} draft>
          {t('diagnosisHeading')}
        </SectionHeading>
        <DiagnosisGrid tiles={tiles} />
      </Band>
    ))
  }

  /* ---- treatments / how it is done / approaches --------------------------------------- */

  if (service.commonTreatments?.length) {
    const items = service.commonTreatments
    add('treatments', TREATMENTS_NAV_KEY[kind], (tone) => (
      <Band
        id="treatments"
        tone={tone}
        title={t(TREATMENTS_HEADING_KEY[kind])}
        count={items.length}
        open={isOpen('treatments')}
      >
        <SectionHeading id="treatments">{t(TREATMENTS_HEADING_KEY[kind])}</SectionHeading>
        <Accordion items={items} />
      </Band>
    ))
  }

  addReview('middle')

  /* ---- your visit (clinical) / what to bring ------------------------------------------ */

  const bringItems = [
    t('bringId'),
    t('bringReports'),
    t('bringMedicines'),
    t('bringInsurance'),
  ]

  if (kind === 'clinical') {
    const steps = [
      { title: t('visitStepRequest'), body: t('visitStepRequestBody', { number }) },
      { title: t('visitStepArrive'), body: t('visitStepArriveBody') },
      { title: t('visitStepMeet'), body: t('visitStepMeetBody') },
      { title: t('visitStepTests'), body: t('visitStepTestsBody') },
      { title: t('visitStepPlan'), body: t('visitStepPlanBody') },
    ]
    add('visit', noAppointment ? 'bring' : 'visit', (tone) => (
      <Band
        id="visit"
        tone={tone}
        title={t(noAppointment ? 'bringHeading' : 'visitHeading')}
        count={noAppointment ? bringItems.length : steps.length}
        open={isOpen('visit')}
      >
        <SectionHeading id="visit">
          {t(noAppointment ? 'bringHeading' : 'visitHeading')}
        </SectionHeading>
        {!noAppointment && <Stepper steps={steps} />}
        <div
          className={`rounded-2xl p-4 sm:p-8 ${noAppointment ? '' : 'mt-6 lg:mt-10'} ${panelTone(tone)}`}
        >
          {!noAppointment && (
            <h3 className="font-serif text-lg font-bold text-brand-dark-base sm:text-xl">
              {t('bringHeading')}
            </h3>
          )}
          <div className={noAppointment ? '' : 'mt-3 lg:mt-4'}>
            <BulletList items={bringItems} />
          </div>
        </div>
      </Band>
    ))
  }

  /* ---- prevention (clinical) ----------------------------------------------------------- */

  if (kind === 'clinical' && extras.prevention?.length) {
    const prevention = extras.prevention
    const half = Math.ceil(prevention.length / 2)
    add('prevention', 'prevention', (tone) => (
      <Band
        id="prevention"
        tone={tone}
        title={t('preventionHeading')}
        count={prevention.length}
        open={isOpen('prevention')}
      >
        <SectionHeading id="prevention" draft>
          {t('preventionHeading')}
        </SectionHeading>
        <div className="grid grid-cols-1 gap-x-14 gap-y-3 md:grid-cols-2">
          <BulletList items={prevention.slice(0, half)} />
          <BulletList items={prevention.slice(half)} />
        </div>
      </Band>
    ))
  }

  /* ---- diagnostics: before / during, then after / safety ------------------------------- */

  if (kind === 'diagnostics') {
    if (extras.prepare || extras.during) {
      const during = (extras.during ?? []).map((body, index) => ({
        title: String(index + 1),
        body,
      }))
      add('prepare', 'prepare', (tone) => (
        <Band
          id="prepare"
          tone={tone}
          title={extras.prepare ? t('prepareHeading') : t('duringHeading')}
          open={isOpen('prepare')}
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
            {extras.prepare && (
              <div>
                <SectionHeading id="prepare" draft>
                  {t('prepareHeading')}
                </SectionHeading>
                <BulletList items={extras.prepare} />
              </div>
            )}
            {during.length > 0 && (
              <div>
                <h2
                  className={`mb-4 font-serif text-xl font-bold tracking-tight text-brand-dark-base lg:mb-8 lg:text-3xl ${extras.prepare ? '' : 'max-lg:hidden'}`}
                >
                  {t('duringHeading')}
                </h2>
                <ol className="space-y-5">
                  {during.map((step) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-teal font-serif text-base font-bold text-white">
                        {step.title}
                      </span>
                      <p className="pt-1 text-base leading-relaxed text-brand-dark-base/80">
                        {plain(step.body)}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </Band>
      ))
    }

    if (extras.after || extras.safety) {
      add('after', 'after', (tone) => (
        <Band
          id="after"
          tone={tone}
          title={extras.after ? t('afterHeading') : t('safetyHeading')}
          open={isOpen('after')}
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
            {extras.after && (
              <div>
                <SectionHeading id="after" draft>
                  {t('afterHeading')}
                </SectionHeading>
                <BulletList items={extras.after} />
              </div>
            )}
            {extras.safety && (
              <div className={`self-start rounded-2xl p-4 sm:p-8 ${panelTone(tone)}`}>
                <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-brand-dark-base sm:text-xl">
                  <ShieldIcon className="h-5 w-5 text-brand-teal" />
                  {t('safetyHeading')}
                </h3>
                <div className="mt-4">
                  <BulletList items={extras.safety} />
                </div>
              </div>
            )}
          </div>
        </Band>
      ))
    }
  }

  /* ---- support: how it works, and what to bring ----------------------------------------- */

  if (kind === 'support' && extras.steps) {
    const steps = extras.steps
    add('how', 'how', (tone) => (
      <Band
        id="how"
        tone={tone}
        title={t('howHeading')}
        count={steps.length}
        open={isOpen('how')}
      >
        <SectionHeading id="how">{t('howHeading')}</SectionHeading>
        <Stepper steps={steps} />
        {extras.prepare && (
          <div className={`mt-6 rounded-2xl p-4 sm:p-8 lg:mt-10 ${panelTone(tone)}`}>
            <h3 className="font-serif text-lg font-bold text-brand-dark-base sm:text-xl">
              {t(extras.keepReady ? 'keepReadyHeading' : 'bringHeading')}
            </h3>
            <div className="mt-4">
              <BulletList items={extras.prepare} />
            </div>
          </div>
        )}
      </Band>
    ))
  }

  if (kind === 'support' && extras.safety) {
    const safety = extras.safety
    add('safety', 'safety', (tone) => (
      <Band
        id="safety"
        tone={tone}
        title={t('safetyHeading')}
        count={safety.length}
        open={isOpen('safety')}
      >
        <SectionHeading id="safety" draft>
          {t('safetyHeading')}
        </SectionHeading>
        <div className={`rounded-2xl p-4 sm:p-8 ${panelTone(tone)}`}>
          <div className="grid grid-cols-1 gap-x-14 gap-y-3 md:grid-cols-2">
            <BulletList items={safety.slice(0, Math.ceil(safety.length / 2))} />
            <BulletList items={safety.slice(Math.ceil(safety.length / 2))} />
          </div>
        </div>
      </Band>
    ))
  }

  addReview('practical')
  addReview('trust')

  /* ---- questions ------------------------------------------------------------------------- */

  const faqs = [...extras.faqs]
  if (!noAppointment) {
    faqs.push({ q: t('faqBookQ'), a: t('faqBookA', { number }) })
    if (kind !== 'support') faqs.push({ q: t('faqBringQ'), a: t('faqBringA') })
  }
  add('faqs', 'faqs', (tone) => (
    <Band
      id="faqs"
      tone={tone}
      title={t('faqHeading')}
      count={faqs.length}
      open={isOpen('faqs')}
    >
      <SectionHeading id="faqs" draft>
        {t('faqHeading')}
      </SectionHeading>
      <FaqGrid items={faqs} />
    </Band>
  ))

  /* ---- related ------------------------------------------------------------------------------ */

  const related: RelatedCard[] = extras.related.flatMap((slug) => {
    const other = getService(slug)
    if (!other) return []
    return [
      {
        slug: other.slug,
        name: translatedServiceName(other.slug, locale),
        categoryName: translatedCategoryName(other.category, locale),
        href: serviceHref(other),
      },
    ]
  })
  const siblings = servicesByCategory(kind).filter((entry) => entry.slug !== service.slug)

  add('related', 'related', (tone) => (
    <Band id="related" tone={tone} title={t('relatedHeading')} phone="plain">
      <SectionHeading id="related" keepOnPhone>
        {t('relatedHeading')}
      </SectionHeading>
      <RelatedGrid cards={related} />

      <h3 className="mb-3 mt-8 font-serif text-lg font-bold text-brand-dark-base lg:mt-12">
        {t('otherIn', { category: categoryName.toLowerCase() })}
      </h3>
      {/* One swipe row on a phone: fifteen wrapped pills were a screen of their own. */}
      <FadeScroller as="ul" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
        {siblings.map((sibling) => (
          <li key={sibling.slug} className="shrink-0">
            <Link
              href={serviceHref(sibling)}
              className="tap-target rounded-full border border-brand-teal/20 bg-white px-4 text-sm text-brand-dark-base/80 transition-colors hover:border-brand-teal/40 hover:bg-brand-mist hover:text-brand-teal"
            >
              {translatedServiceName(sibling.slug, locale)}
            </Link>
          </li>
        ))}
      </FadeScroller>

      {/* The honest footnote: what this page does not say, and why. */}
      <p className="mt-8 max-w-2xl text-xs leading-relaxed text-brand-dark-base/55 lg:mt-12">
        {t('morePendingBody')}
      </p>
    </Band>
  ))

  /* ---- render ----------------------------------------------------------------------------------- */

  const navItems = sections
    .filter((section) => section.navKey)
    .map((section) => ({
      id: section.id,
      label: t(`nav.${section.navKey}`),
      // The overview is a row on a phone only where there are "what it covers" chips to hold.
      phoneHidden: section.id === 'overview' && !extras.areas,
    }))

  // Tone alternates over the real sections only. Review bands have their own look and do
  // not take a turn, so removing them (as production does) never changes the rhythm.
  let turn = 0
  const body = sections.map((section) => (
    <Fragment key={section.id}>
      {section.review ? section.render('white') : section.render(turn++ % 2 === 0 ? 'white' : 'mist')}
    </Fragment>
  ))

  const emergencyFirst = noAppointment && service.slug !== 'pharmacy'
  const phoneActions = buildPhoneActions({
    slug: service.slug,
    emergencyFirst,
    noAppointment,
    labels: {
      callEmergency: t('phoneCallEmergency'),
      call: t('phoneCall'),
      directions: t('phoneDirections'),
      book: t('phoneBook'),
      bookAria: t('requestFor', { name }),
    },
  })

  const reviewGroups = (['top', 'middle', 'practical', 'trust'] as SlotGroup[]).filter((group) =>
    slots.some((slot) => slot.group === group),
  )

  return (
    <>
      {REVIEW_MODE && (
        <div className="border-b-2 border-dashed border-amber-400 bg-amber-100 text-amber-950">
          <div className="mx-auto max-w-7xl px-5 py-3 text-sm sm:px-6">
            <strong>Review mode.</strong> This is a draft for walking through with LIMS staff. The
            dashed amber boxes need LIMS input and never appear on the public site. Generic
            sections are tagged as draft copy until a LIMS doctor has read them. Jump to:{' '}
            {reviewGroups.map((group, index) => (
              <Fragment key={group}>
                {index > 0 && ', '}
                <a href={`#review-${group}`} className="font-semibold underline">
                  {GROUP_TITLE[group].replace('Needs LIMS input: ', '')} (
                  {slots.filter((slot) => slot.group === group).length})
                </a>
              </Fragment>
            ))}
            .
          </div>
        </div>
      )}

      <ServiceHero
        service={service}
        name={name}
        categoryName={categoryName}
        categoryTitle={translatedCategoryTitle(kind, locale)}
        categoryHref={category.basePath}
        alsoKnownAs={
          service.alsoKnownAs?.length
            ? t('alsoKnownAs', { names: service.alsoKnownAs.join(', ') })
            : undefined
        }
        doctorCount={doctors.length}
        noAppointment={noAppointment}
        emergencyFirst={emergencyFirst}
        phoneActions={phoneActions}
        readMore={t('readMore')}
        readLess={t('readLess')}
      />

      <SectionNav items={navItems} label={t('navLabel')} />

      {/* Below lg the sections are white cards on this mist ground (see Band). */}
      <div className="max-lg:bg-brand-mist max-lg:py-2">{body}</div>

      <PhoneTalkToUs emergencyFirst={emergencyFirst} />
      <PhoneActionBar actions={phoneActions} label={t('talkToUs')} />
    </>
  )
}
