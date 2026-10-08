import { Fragment, type ReactNode } from 'react'
import { FadeScroller } from '@/components/primitives/FadeScroller'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PhoneIcon } from '@/components/icons'
import { DoctorHero } from '@/components/doctor/DoctorHero'
import { OpdList, TileGrid, Timeline } from '@/components/doctor/ProfileBlocks'
import { DoctorRailCard } from '@/components/doctor/DoctorRailCard'
import { DoctorCard } from '@/components/primitives/DoctorCard'
import { PhoneActionBar } from '@/components/service/PhoneActionBar'
import { buildPhoneActions } from '@/components/service/PhoneActions'
import { PhoneTalkToUs } from '@/components/service/PhoneTalkToUs'
import { ReviewBand } from '@/components/service/ReviewBand'
import { SectionNav } from '@/components/service/SectionNav'
import {
  Band,
  BulletList,
  FaqGrid,
  SectionHeading,
  Stepper,
  type Tone,
} from '@/components/service/blocks'
import { DOCTORS, getDoctor, getDoctors, registrationDisplay } from '@/lib/doctors'
import { REVIEW_MODE } from '@/lib/review'
import { doctorReviewSlots } from '@/lib/review-slots-doctors'
import { serviceHrefBySlug } from '@/lib/services'
import { translatedServiceName } from '@/lib/services-i18n'
import { contact } from '@/lib/site-config'
import { localizedLocation } from '@/lib/site-i18n'
import { plain } from '@/lib/text'
import type { Locale } from '@/i18n/routing'
import type { Weekday } from '@/types'

export function generateStaticParams() {
  return DOCTORS.map((doctor) => ({ id: doctor.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}): Promise<Metadata> {
  const { locale, id } = await params
  const doctor = getDoctor(id, locale as Locale)
  if (!doctor) return {}
  return {
    title: doctor.name,
    description: [
      doctor.qualifications,
      doctor.designation,
      translatedServiceName(doctor.departmentSlug, locale as Locale),
    ]
      .filter((part): part is string => Boolean(part))
      .map((part) => plain(part))
      .join(', '),
  }
}

const WEEKDAY_INDEX: Record<Weekday, number> = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
  saturday: 5,
  sunday: 6,
}

/** "09:30" as the visitor's locale writes a time. UTC throughout so no time zone shifts it. */
function formatTime(locale: string, clock: string): string {
  const [hours, minutes] = clock.split(':').map(Number)
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(2024, 0, 1, hours, minutes)))
}

function weekdayName(locale: string, day: Weekday): string {
  // 1 January 2024 was a Monday, so the index is the day offset from it.
  return new Intl.DateTimeFormat(locale, { weekday: 'long', timeZone: 'UTC' }).format(
    new Date(Date.UTC(2024, 0, 1 + WEEKDAY_INDEX[day])),
  )
}

interface Section {
  id: string
  navKey?: string
  review?: boolean
  render: (tone: Tone) => ReactNode
}

/*
 * A profile built to look finished on whatever LIMS has actually supplied.
 *
 * Everything optional in the Doctor type renders as an absent section, never as a
 * placeholder or a guess: no invented biography, no invented OPD timings, no invented
 * years of experience, no stock portrait captioned with this person's name. See the rules
 * at the top of lib/doctors.ts. On a named, registered doctor those are not filler, they
 * are false statements about a real person's credentials.
 *
 * In review mode (lib/review.ts) each missing piece shows as a dashed "needs LIMS input"
 * box instead, so a walk-through with LIMS staff can fill the profile in section by
 * section. Those boxes never reach a public visitor.
 */
export default async function DoctorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const locale = (await getLocale()) as Locale
  const doctor = getDoctor(id, locale)
  if (!doctor) notFound()

  const t = await getTranslations('doctorProfile')
  const tService = await getTranslations('serviceDetail')
  const tCommon = await getTranslations('common')
  const tEmergency = await getTranslations('emergency')

  const name = doctor.name
  const number = contact.secondaryDisplay
  const departmentName = translatedServiceName(doctor.departmentSlug, locale)
  const departmentHref = serviceHrefBySlug(doctor.departmentSlug)
  const colleagues = getDoctors(locale).filter((other) => other.id !== doctor.id)
  const slots = REVIEW_MODE ? doctorReviewSlots(doctor) : []

  const phoneActions = buildPhoneActions({
    slug: doctor.departmentSlug,
    bookHref: `/appointments?doctor=${doctor.id}`,
    emergencyFirst: false,
    noAppointment: false,
    labels: {
      callEmergency: '',
      call: tService('phoneCall'),
      directions: tService('phoneDirections'),
      book: tService('phoneBook'),
      bookAria: t('requestWith', { name }),
    },
  })

  const sections: Section[] = []
  // Below lg every section is a row that opens (components/service/Collapse). The first one
  // starts open, so the page does not open on a column of closed rows.
  let openId = ''
  const add = (id: string, navKey: string, render: (tone: Tone) => ReactNode) => {
    if (!openId) openId = id
    sections.push({ id, navKey, render })
  }
  const isOpen = (id: string) => id === openId

  /* ---- sections that exist only when LIMS supplied the data ------------------------- */

  if (doctor.about) {
    const paragraphs = doctor.about.split(/\n{2,}/)
    add('about', 'about', (tone) => (
      <Band
        id="about"
        tone={tone}
        title={t('aboutHeading', { name })}
        open={isOpen('about')}
      >
        <SectionHeading id="about">{t('aboutHeading', { name })}</SectionHeading>
        <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-brand-dark-base/80">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{plain(paragraph)}</p>
          ))}
        </div>
      </Band>
    ))
  }

  if (doctor.specialisations?.length) {
    const items = doctor.specialisations
    add('expertise', 'expertise', (tone) => (
      <Band
        id="expertise"
        tone={tone}
        title={t('expertiseHeading')}
        count={items.length}
        open={isOpen('expertise')}
      >
        <SectionHeading id="expertise">{t('expertiseHeading')}</SectionHeading>
        <TileGrid items={items} />
      </Band>
    ))
  }

  if (doctor.education?.length) {
    const entries = doctor.education.map((entry) => ({
      when: entry.period,
      title: entry.title,
      detail: entry.institution,
    }))
    add('education', 'education', (tone) => (
      <Band
        id="education"
        tone={tone}
        title={t('educationHeading')}
        count={entries.length}
        open={isOpen('education')}
      >
        <SectionHeading id="education">{t('educationHeading')}</SectionHeading>
        <Timeline entries={entries} />
      </Band>
    ))
  }

  if (doctor.positionsHeld?.length) {
    const entries = doctor.positionsHeld.map((entry) => ({
      when: entry.period,
      title: entry.title,
      detail: entry.institution,
    }))
    add('experience', 'experience', (tone) => (
      <Band
        id="experience"
        tone={tone}
        title={t('experienceHeading')}
        count={entries.length}
        open={isOpen('experience')}
      >
        <SectionHeading id="experience">{t('experienceHeading')}</SectionHeading>
        <Timeline entries={entries} />
      </Band>
    ))
  }

  if (doctor.awards?.length) {
    const entries = doctor.awards.map((award) => ({ when: award.year, title: award.title }))
    add('milestones', 'milestones', (tone) => (
      <Band
        id="milestones"
        tone={tone}
        title={t('milestonesHeading')}
        count={entries.length}
        open={isOpen('milestones')}
      >
        <SectionHeading id="milestones">{t('milestonesHeading')}</SectionHeading>
        <Timeline entries={entries} />
      </Band>
    ))
  }

  if (doctor.memberships?.length) {
    const half = Math.ceil(doctor.memberships.length / 2)
    const memberships = doctor.memberships
    add('memberships', 'memberships', (tone) => (
      <Band
        id="memberships"
        tone={tone}
        title={t('membershipsHeading')}
        count={memberships.length}
        open={isOpen('memberships')}
      >
        <SectionHeading id="memberships">{t('membershipsHeading')}</SectionHeading>
        <div className="grid grid-cols-1 gap-x-14 gap-y-3 md:grid-cols-2">
          <BulletList items={memberships.slice(0, half)} />
          <BulletList items={memberships.slice(half)} />
        </div>
      </Band>
    ))
  }

  if (doctor.publications?.length) {
    const publications = doctor.publications
    add('publications', 'publications', (tone) => (
      <Band
        id="publications"
        tone={tone}
        title={t('publicationsHeading')}
        count={publications.length}
        open={isOpen('publications')}
      >
        <SectionHeading id="publications">{t('publicationsHeading')}</SectionHeading>
        <div className="max-w-3xl">
          <BulletList items={publications} />
        </div>
      </Band>
    ))
  }

  if (doctor.opdSchedule?.length) {
    const rows = doctor.opdSchedule.map((session) => ({
      day: weekdayName(locale, session.day),
      time: `${formatTime(locale, session.startTime)} - ${formatTime(locale, session.endTime)}`,
      where:
        session.locationId === localizedLocation(locale).id
          ? localizedLocation(locale).name
          : session.locationId,
      note: session.note,
    }))
    add('opd', 'opd', (tone) => (
      <Band
        id="opd"
        tone={tone}
        title={t('opdHeading')}
        count={rows.length}
        open={isOpen('opd')}
      >
        <SectionHeading id="opd" lead={t('opdNote')}>
          {t('opdHeading')}
        </SectionHeading>
        <OpdList rows={rows} />
      </Band>
    ))
  }

  // Review mode only: one dashed band listing everything still missing for this person.
  if (REVIEW_MODE && slots.length > 0) {
    sections.push({
      id: 'review-doctor',
      review: true,
      render: () => (
        <ReviewBand
          id="review-doctor"
          group="top"
          slots={slots}
          title={`Needs LIMS input: about ${name}`}
        />
      ),
    })
  }

  /* ---- always real: how to book, questions, colleagues ------------------------------- */

  const steps = [
    { title: tService('visitStepRequest'), body: tService('visitStepRequestBody', { number }) },
    { title: tService('visitStepArrive'), body: tService('visitStepArriveBody') },
    { title: tService('visitStepMeet'), body: tService('visitStepMeetBody') },
  ]
  add('visit', 'visit', (tone) => (
    <Band
      id="visit"
      tone={tone}
      title={t('bookHeading', { name })}
      count={steps.length}
      open={isOpen('visit')}
    >
      <SectionHeading id="visit">{t('bookHeading', { name })}</SectionHeading>
      {!doctor.about && (
        // The honest note, small and plain, instead of a boxed "awaiting content" panel
        // ahead of the booking steps: a biography, expertise and timings appear here once
        // LIMS supplies them.
        <p className="-mt-3 mb-8 max-w-2xl text-sm leading-relaxed text-brand-dark-base/60">
          {t('aboutFallback')}
        </p>
      )}
      <Stepper steps={steps} />
    </Band>
  ))

  const faqs = [
    { q: t('faqBookQ', { name }), a: t('faqBookA', { name, number }) },
    ...(doctor.registrationNumber
      ? [
          {
            q: t('faqVerifyQ', { name }),
            a: t('faqVerifyA', { registration: registrationDisplay(doctor.registrationNumber) }),
          },
        ]
      : []),
    { q: tService('faqBringQ'), a: tService('faqBringA') },
  ]
  add('faqs', 'faqs', (tone) => (
    <Band
      id="faqs"
      tone={tone}
      title={tService('faqHeading')}
      count={faqs.length}
      open={isOpen('faqs')}
    >
      <SectionHeading id="faqs">{tService('faqHeading')}</SectionHeading>
      <FaqGrid items={faqs} />
    </Band>
  ))

  add('colleagues', 'colleagues', (tone) => (
    <Band id="colleagues" tone={tone} title={t('colleaguesHeading')} phone="plain">
      <SectionHeading id="colleagues" keepOnPhone>
        {t('colleaguesHeading')}
      </SectionHeading>
      {colleagues.length > 0 && (
        <>
          <ul className="hidden grid-cols-1 gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {colleagues.slice(0, 3).map((other) => (
              <li key={other.id}>
                <DoctorCard doctor={other} />
              </li>
            ))}
          </ul>
          {/* The same people, as small cards in a swipe row, for a phone. */}
          <FadeScroller as="ul" className="-mx-4 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 pb-1.5 [scroll-padding-left:1rem] [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden">
            {colleagues.map((other) => (
              <li key={other.id} className="w-[8.5rem] shrink-0 snap-start">
                <DoctorRailCard doctor={other} locale={locale} />
              </li>
            ))}
          </FadeScroller>
        </>
      )}
      <div className="mt-5 flex flex-wrap gap-3 sm:mt-8">
        <Link
          href="/doctors"
          className="tap-target rounded-full border border-brand-teal/25 px-6 text-sm font-semibold text-brand-teal hover:bg-brand-mist"
        >
          {t('viewAll')}
        </Link>
        {departmentHref && (
          <Link
            href={departmentHref}
            className="tap-target rounded-full border border-brand-teal/25 px-6 text-sm font-semibold text-brand-teal hover:bg-brand-mist"
          >
            {t('moreAbout', { department: departmentName })}
          </Link>
        )}
      </div>

      {/*
        The emergency line goes straight to the hospital, which is open at all hours (confirmed from
        its Business profile, see lib/site-config.ts). A consultant's own OPD timings are not
        claimed here: none have been supplied.
      */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-4 sm:mt-12 sm:bg-brand-mist sm:p-6">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-brand-emergency shadow-sm"
          >
            <PhoneIcon className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-brand-dark-base">{t('urgentCareHeading')}</p>
            <p className="text-xs text-brand-dark-base/60">{t('urgentCareBody')}</p>
          </div>
        </div>
        <a
          href={`tel:${contact.primary}`}
          aria-label={tEmergency('callLine', { number: contact.primaryDisplay })}
          className="tap-target focus-ring-inverse shrink-0 rounded-full bg-brand-emergency px-5 text-sm font-bold text-white hover:bg-brand-emergency/90"
        >
          {tCommon('call', { number: contact.primaryDisplay })}
        </a>
      </div>
    </Band>
  ))

  /* ---- render ------------------------------------------------------------------------------ */

  const navItems = sections
    .filter((section) => section.navKey)
    .map((section) => ({ id: section.id, label: t(`nav.${section.navKey}`) }))

  let turn = 0
  const body = sections.map((section) => (
    <Fragment key={section.id}>
      {section.review ? section.render('white') : section.render(turn++ % 2 === 0 ? 'white' : 'mist')}
    </Fragment>
  ))

  return (
    <>
      {REVIEW_MODE && slots.length > 0 && (
        <div className="border-b-2 border-dashed border-amber-400 bg-amber-100 text-amber-950">
          <div className="mx-auto max-w-7xl px-5 py-3 text-sm sm:px-6">
            <strong>Review mode.</strong> {slots.length} things on this profile need LIMS input
            before it looks like the doctor pages of a large hospital.{' '}
            <a href="#review-doctor" className="font-semibold underline">
              Jump to the list
            </a>
            . None of this appears on the public site.
          </div>
        </div>
      )}

      <DoctorHero
        doctor={doctor}
        departmentName={departmentName}
        departmentHref={departmentHref}
        phoneActions={phoneActions}
        readMore={tService('readMore')}
        readLess={tService('readLess')}
      />
      <SectionNav items={navItems} label={tService('navLabel')} />
      {/* Below lg the sections are white cards on this mist ground (see Band). */}
      <div className="max-lg:bg-brand-mist max-lg:py-2">{body}</div>
      <PhoneTalkToUs emergencyFirst={false} />
      <PhoneActionBar actions={phoneActions} label={tService('talkToUs')} />
    </>
  )
}
