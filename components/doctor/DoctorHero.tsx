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
// ON A PHONE (below sm) it is a short layout: a back link, the portrait small beside the name and
// department, the qualifications cut to three lines with Read more, the chips, and one row of
// buttons (Book with this consultant, WhatsApp, Call). The notepad is left out, as on the
// department pages, and PhoneTalkToUs carries its numbers at the end of the page. The grid below is
// the one grid at every width: on a phone the text column is `display: contents`, so its parts
// become grid items and can sit beside the portrait or under it.

import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ArrowRightIcon, ChevronLeftIcon, ShieldIcon } from '@/components/icons'
import { initials } from '@/components/doctor/DoctorAvatar'
import { ClampedText } from '@/components/service/ClampedText'
import { ContactCard } from '@/components/service/ContactCard'
import { HERO_ACTIONS_ID } from '@/components/service/PhoneActionBar'
import { ActionButton, type PhoneAction } from '@/components/service/PhoneActions'
import { registrationDisplay } from '@/lib/doctors'
import { plain } from '@/lib/text'
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

  const chipClass =
    'rounded-full bg-white/12 px-3 py-1.5 text-xs font-semibold text-white sm:px-4 sm:py-2 sm:text-sm'

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

        <div className="mt-1 grid grid-cols-[6rem_minmax(0,1fr)] gap-x-4 sm:mt-6 sm:grid-cols-1 sm:gap-8 lg:grid-cols-[15rem_minmax(0,1fr)_22rem] lg:items-end lg:gap-10">
          {/* A real portrait or the initials, never a stand-in face. */}
          <div className="w-full sm:w-56 lg:w-full">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-white/10 shadow-lg ring-1 ring-white/25 sm:rounded-3xl">
              {portrait ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={portrait.src}
                  alt={portrait.alt}
                  width={portrait.width}
                  height={portrait.height}
                  decoding="async"
                  fetchPriority="high"
                  style={{ objectPosition: `50% ${portrait.focusY ?? 50}%` }}
                  className="h-full w-full object-cover"
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
          <div className="contents min-w-0 sm:block">
            <div className="min-w-0 self-center sm:self-auto">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75 sm:text-xs">
                {departmentName}
              </p>
              <h1 className="mt-1 text-balance font-serif text-[1.75rem] font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
                {doctor.name}
              </h1>
              {doctor.designation && (
                <p className="mt-1.5 text-sm text-white/90 sm:mt-2 sm:text-lg">
                  {plain(doctor.designation)}
                </p>
              )}
            </div>

            {doctor.qualifications && (
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
            )}

            <ul className="col-span-2 mt-3 flex flex-wrap gap-1.5 sm:col-span-1 sm:mt-6 sm:gap-2">
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
                <li className={`flex items-center gap-1.5 ${chipClass}`}>
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
              className="tap-target mt-6 hidden rounded-full border border-white/40 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:inline-flex"
            >
              {tCommon('requestAnAppointment')}
            </Link>

            {phoneActions.length > 0 && (
              <div id={HERO_ACTIONS_ID} className="col-span-2 mt-4 flex gap-2.5 sm:hidden">
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
            <ContactCard heading={tService('talkToUs')} tag={doctor.name} />
          </div>
        </div>
      </div>
    </header>
  )
}
