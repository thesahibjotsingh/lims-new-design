// components/doctor/DoctorHero.tsx
//
// The top of a consultant's profile: a real portrait, who they are, and how to reach the
// hospital.
//
// Composed after Medanta and Fortis profiles (large portrait, name and role, department
// link, qualifications, locations, a booking panel beside it). The one difference is the
// booking panel. Theirs is a live date picker over a real schedule. LIMS has published no
// timetable, so a date picker here would be an invented availability. This is the shared
// "Talk to us" card instead: both phone numbers and a link that opens the request form
// with this consultant already chosen.
//
// Every chip below is a field LIMS supplied. A missing field is a missing chip, never a
// placeholder (lib/doctors.ts, rules 1 and 4).

import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ArrowRightIcon, ShieldIcon } from '@/components/icons'
import { initials } from '@/components/doctor/DoctorAvatar'
import { ContactCard } from '@/components/service/ContactCard'
import { registrationDisplay } from '@/lib/doctors'
import { plain } from '@/lib/text'
import type { Doctor } from '@/types'

export async function DoctorHero({
  doctor,
  departmentName,
  departmentHref,
}: {
  doctor: Doctor
  departmentName: string
  departmentHref?: string
}) {
  const t = await getTranslations('doctorProfile')
  const tCard = await getTranslations('doctorCard')
  const tCommon = await getTranslations('common')
  const tNav = await getTranslations('nav')
  const tService = await getTranslations('serviceDetail')
  const portrait = doctor.portrait

  const chipClass = 'rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white'

  return (
    <header className="bg-gradient-to-r from-brand-teal-dark to-brand-teal text-white">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-12">
        <nav aria-label="Breadcrumb">
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

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[15rem_minmax(0,1fr)_22rem] lg:items-end lg:gap-10">
          {/* A real portrait or the initials, never a stand-in face. */}
          <div className="w-44 sm:w-56 lg:w-full">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/25 shadow-lg">
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
                  className="grid h-full w-full place-items-center font-serif text-7xl font-bold text-white/80"
                >
                  {initials(doctor.name)}
                </span>
              )}
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
              {departmentName}
            </p>
            <h1 className="mt-1 text-balance font-serif text-4xl font-bold tracking-tight lg:text-5xl">
              {doctor.name}
            </h1>
            {doctor.designation && (
              <p className="mt-2 text-lg text-white/90">{plain(doctor.designation)}</p>
            )}
            {doctor.qualifications && (
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85">
                {plain(doctor.qualifications)}
              </p>
            )}

            <ul className="mt-6 flex flex-wrap gap-2">
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
          </div>

          <ContactCard
            heading={tService('talkToUs')}
            tag={doctor.name}
            requestHref={`/appointments?doctor=${doctor.id}`}
            requestLabel={tCommon('requestAnAppointment')}
            requestAriaLabel={t('requestWith', { name: doctor.name })}
          />
        </div>
      </div>
    </header>
  )
}
