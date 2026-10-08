// components/doctor/DoctorHero.tsx
//
// The top of a consultant's profile: a real portrait, who they are, and how to reach the
// hospital.
//
// Composed after Medanta and Fortis profiles (large portrait, name and role, department
// link, qualifications, locations, a booking panel beside it). The one difference is the
// booking panel. Theirs is a live date picker over a real schedule. LIMS has published no
// timetable, so a date picker here would be an invented availability. This is the shared
// "Talk to us" card instead (both phone numbers), with a link under the chips that opens the
// request form with this consultant already chosen.
//
// Every chip below is a field LIMS supplied. A missing field is a missing chip, never a
// placeholder (lib/doctors.ts, rules 1 and 4).
//
// ON A PHONE (below sm) it is a short layout: a back link, the portrait small beside the name,
// department and registration number, the qualifications one per line (a doctor with only the
// one-line string gets it cut to three lines with Read more), the quote, the chips, and one row of
// buttons (Book with this consultant, WhatsApp, Call). The notepad is left out, as on the
// department pages, and PhoneTalkToUs carries its numbers at the end of the page. The grid below is
// the one grid at every width: on a phone the text column is `display: contents`, so its parts
// become grid items and can sit beside the portrait or under it.

import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ArrowRightIcon, CalendarIcon, ChevronLeftIcon, ShieldIcon } from '@/components/icons'
import { initials } from '@/components/doctor/DoctorAvatar'
import { PortraitLightbox } from '@/components/doctor/PortraitLightbox'
import { QuoteReveal } from '@/components/doctor/QuoteReveal'
import { ClampedText } from '@/components/service/ClampedText'
import { ContactCard } from '@/components/service/ContactCard'
import { HERO_ACTIONS_ID } from '@/components/service/PhoneActionBar'
import { ActionButton, type PhoneAction } from '@/components/service/PhoneActions'
import { registrationDisplay } from '@/lib/doctors'
import { firstSentence, plain } from '@/lib/text'
import type { Doctor } from '@/types'

export async function DoctorHero({
  doctor,
  departmentName,
  departmentHref,
  phoneActions,
  readMore,
  readLess,
}: {
  doctor: Doctor
  departmentName: string
  departmentHref?: string
  /** The buttons a phone gets in place of the notepad. */
  phoneActions: PhoneAction[]
  readMore: string
  readLess: string
}) {
  const t = await getTranslations('doctorProfile')
  const tCard = await getTranslations('doctorCard')
  const tCommon = await getTranslations('common')
  const tNav = await getTranslations('nav')
  const tService = await getTranslations('serviceDetail')
  const tA11y = await getTranslations('a11y')
  const portrait = doctor.portrait

  // The quote: its first sentence shows, "Read more" reveals the rest (QuoteReveal).
  const quoteFull = doctor.quote ? plain(doctor.quote) : ''
  const quoteLead = doctor.quote ? firstSentence(doctor.quote) : ''
  const quoteRest = quoteFull.startsWith(quoteLead) ? quoteFull.slice(quoteLead.length).trim() : ''

  const chipClass =
    'rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white sm:px-4 sm:py-2 sm:text-sm'

  return (
    <header className="teal-hero teal-curve text-white">
      <div className="mx-auto max-w-7xl px-5 pb-5 pt-1 sm:px-6 sm:py-8 lg:py-12">
        <Link
          href="/doctors"
          className="focus-ring-inverse -ml-1 inline-flex min-h-[44px] items-center gap-0.5 rounded-md pr-2 text-[13px] text-white/80 sm:hidden"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          {tNav('findADoctor')}
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
              <Link href="/doctors" className="hover:text-white">
                {tNav('findADoctor')}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-white">
              {doctor.name}
            </li>
          </ol>
        </nav>

        {/*
          ON A DESKTOP (lg) the grid is three columns over two rows, all lined up at the top: the
          portrait, the text and the "Talk to us" notepad in the first row, and the three buttons in
          one line in the second, under the portrait and the text. The portrait is 16rem wide at lg
          and 25rem (400 x 500) from xl. That is about as tall as her name, qualifications and the
          WHOLE quote together: from xl the quote has no "Read more" (QuoteReveal), so the row is the
          same height whatever is tapped and nothing moves.
        */}
        <div className="mt-1 grid grid-cols-[6rem_minmax(0,1fr)] gap-x-4 sm:mt-6 sm:grid-cols-1 sm:gap-8 lg:grid-cols-[16rem_minmax(0,1fr)_21rem] lg:items-start lg:gap-x-10 lg:gap-y-7 xl:grid-cols-[25rem_minmax(0,1fr)_21rem]">
          {/* A real portrait or the initials, never a stand-in face. */}
          <div className="w-full sm:w-56 lg:col-start-1 lg:row-start-1 lg:w-full">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-white/10 shadow-lg ring-1 ring-white/25 sm:rounded-3xl">
              {portrait ? (
                // A real photograph is a button: tap it and it opens larger (PortraitLightbox).
                <PortraitLightbox
                  src={portrait.src}
                  alt={portrait.alt}
                  width={portrait.width}
                  height={portrait.height}
                  focusY={portrait.focusY ?? 50}
                  name={doctor.name}
                  department={departmentName}
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="grid h-full w-full place-items-center font-serif text-4xl font-bold text-white/80 sm:text-7xl"
                >
                  {initials(doctor.name)}
                </span>
              )}
            </div>
          </div>

          {/* `contents` below sm: its children join the grid above instead of forming a column. */}
          <div className="contents min-w-0 sm:block lg:col-start-2 lg:row-start-1">
            <div className="min-w-0 self-center sm:self-auto">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75 sm:text-xs">
                {departmentName}
              </p>
              <h1 className="mt-1 text-balance font-serif sm:mt-2.5 text-[1.75rem] font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
                {doctor.name}
              </h1>
              {doctor.designation && (
                <p className="mt-1.5 text-sm text-white/90 sm:mt-2 sm:text-lg">
                  {plain(doctor.designation)}
                </p>
              )}
              {/* On a phone the registration number sits under her name, beside the portrait. */}
              {doctor.registrationNumber && (
                <p className={`mt-2.5 inline-flex items-center gap-1.5 sm:hidden ${chipClass}`}>
                  <ShieldIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {tCard('regNo')} {registrationDisplay(doctor.registrationNumber)}
                </p>
              )}
            </div>

            {/*
              Qualifications. When the doctor's credentials are on file one by one (Doctor.education)
              they are listed one per line, in full, as she wrote them: a fellowship is a line of its
              own, not the tail of a long sentence, so none of it hides behind "Read more". A doctor
              with only the one-line string (Doctor.qualifications) keeps that, cut to three lines on
              a phone. The same entries are in the page's Education and training section.
            */}
            {doctor.education?.length ? (
              <ul
                aria-label={t('educationHeading')}
                className="col-span-2 mt-4 max-w-xl space-y-1 sm:col-span-1 sm:mt-5 sm:space-y-1.5"
              >
                {doctor.education.map((entry) => (
                  <li
                    key={entry.title}
                    className="flex items-start gap-2.5 text-[15px] leading-snug text-white/90 sm:text-base"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-copper"
                    />
                    <span>
                      {entry.title}
                      {entry.institution ? ` · ${entry.institution}` : ''}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              doctor.qualifications && (
                <>
                  <p className="mt-4 hidden max-w-xl text-base leading-relaxed text-white/85 sm:block">
                    {plain(doctor.qualifications)}
                  </p>
                  <ClampedText
                    className="col-span-2 mt-4 sm:hidden"
                    readMore={readMore}
                    readLess={readLess}
                  >
                    {plain(doctor.qualifications)}
                  </ClampedText>
                </>
              )
            )}

            {/*
              The doctor's own words, only when LIMS has supplied a quote (Doctor.quote). A soft panel
              on the teal, the quote mark in copper (the brand copper is for icons and fills on a dark
              ground), the words in the site's serif. The first sentence shows and "Read more" opens
              the rest, so the panel stays short beside the portrait on a phone. It sits above the
              chips so it is in the first screen.
            */}
            {doctor.quote && (
              <figure className="col-span-2 mt-4 rounded-2xl bg-white/10 px-3.5 py-3 sm:col-span-1 sm:mt-5 sm:max-w-xl sm:px-4 sm:py-3.5">
                {/* Both quotation marks are drawn by QuoteReveal, so they are always the same size. */}
                <QuoteReveal
                  lead={quoteLead}
                  rest={quoteRest}
                  readMore={readMore}
                  readLess={readLess}
                />
              </figure>
            )}

          </div>

          {/*
            The buttons: the department, the registration number and booking. On a phone they join
            the grid above (`contents`); on a tablet they stack under the text; on a desktop they
            are one row under the portrait, the text and the notepad (the full width, so a narrow laptop
            keeps all three on one line).
          */}
          <div className="contents sm:block lg:col-span-3 lg:col-start-1 lg:row-start-2 lg:flex lg:flex-wrap lg:items-center lg:gap-3">
            <ul className="col-span-2 mt-3 flex flex-wrap gap-1.5 sm:col-span-1 sm:mt-0 sm:gap-2 lg:gap-3">
              {departmentHref && (
                <li>
                  <Link
                    href={departmentHref}
                    className="tap-target gap-1.5 rounded-full bg-white px-4 text-sm font-semibold text-brand-teal hover:bg-brand-mist"
                  >
                    {departmentName}
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </li>
              )}
              {doctor.registrationNumber && (
                <li className={`hidden items-center gap-1.5 sm:flex ${chipClass}`}>
                  <ShieldIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {tCard('regNo')} {registrationDisplay(doctor.registrationNumber)}
                </li>
              )}
              {typeof doctor.experienceYears === 'number' && (
                <li className={chipClass}>{t('yearsChip', { years: doctor.experienceYears })}</li>
              )}
              {doctor.languages?.length ? (
                <li className={chipClass}>
                  {t('languagesChip', { languages: doctor.languages.join(', ') })}
                </li>
              ) : null}
            </ul>

            {/*
              The booking link sits here, not in the "Talk to us" card, so the card is the same
              height on every page. The accessible name still says which consultant the form
              opens with. A phone has the button row below instead.
            */}
            <Link
              href={`/appointments?doctor=${doctor.id}`}
              aria-label={t('requestWith', { name: doctor.name })}
              className="tap-target mt-6 hidden gap-2 rounded-full bg-brand-copper px-6 text-sm font-semibold text-white shadow-[0_10px_20px_-12px_rgba(194,110,78,0.9)] transition-colors hover:bg-brand-copper/90 sm:inline-flex lg:mt-0"
            >
              <CalendarIcon className="h-[18px] w-[18px]" aria-hidden="true" />
              {tCommon('requestAnAppointment')}
            </Link>

            {phoneActions.length > 0 && (
              <div id={HERO_ACTIONS_ID} className="col-span-2 mt-4 flex gap-2.5 sm:hidden">
                {phoneActions.map((action) => (
                  <ActionButton
                    key={action.kind}
                    action={action}
                    surface="onDark"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="hidden sm:block lg:col-start-3 lg:row-start-1 lg:mt-3">
            <ContactCard heading={tService('talkToUs')} tag={doctor.name} />
          </div>
        </div>
      </div>
    </header>
  )
}
