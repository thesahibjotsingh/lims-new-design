import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import { DOCTORS, getDoctor, registrationDisplay } from '@/lib/doctors'
import { serviceHrefBySlug, serviceName } from '@/lib/services'
import { AwaitingContent, PageHeader, Section } from '@/components/primitives/PageShell'
import { initials } from '@/components/primitives/DoctorCard'
import { PhoneIcon, ShieldIcon } from '@/components/icons'
import { contact } from '@/lib/site-config'

export function generateStaticParams() {
  return DOCTORS.map((doctor) => ({ id: doctor.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const doctor = getDoctor(id)
  if (!doctor) return {}
  return {
    title: doctor.name,
    description: [doctor.qualifications, doctor.designation, serviceName(doctor.departmentSlug)]
      .filter(Boolean)
      .join(' · '),
  }
}

/*
 * A profile built to look finished on four fields.
 *
 * Everything optional in the Doctor type renders as an absent section, never as a
 * placeholder or a guess: no invented biography, no invented OPD timings, no invented
 * years of experience, no stock portrait captioned with this person's name. See the
 * rules at the top of lib/doctors.ts — on a named, registered doctor those are not
 * filler, they are false statements about a real person's credentials.
 */
export default async function DoctorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const doctor = getDoctor(id)
  if (!doctor) notFound()

  const t = await getTranslations('doctorProfile')
  const tCommon = await getTranslations('common')
  const tCard = await getTranslations('doctorCard')
  const tEmergency = await getTranslations('emergency')
  const departmentHref = serviceHrefBySlug(doctor.departmentSlug)
  const department = serviceName(doctor.departmentSlug)

  return (
    <>
      <PageHeader eyebrow={department} title={doctor.name}>
        <div className="mt-4 space-y-1.5">
          {doctor.qualifications && (
            <p className="text-base font-medium text-brand-copper-ink">{doctor.qualifications}</p>
          )}
          {doctor.designation && (
            <p className="text-base text-brand-dark-base/75">{doctor.designation}</p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href={`/appointments?doctor=${doctor.id}`}
            className="tap-target focus-ring-inverse rounded-full bg-brand-teal px-6 text-sm font-semibold text-white hover:bg-brand-teal-dark"
          >
            {tCommon('requestAnAppointment')}
          </Link>
          <a
            href={`tel:${contact.secondary}`}
            className="tap-target rounded-full border border-brand-teal/25 px-6 text-sm font-semibold text-brand-teal hover:bg-white"
          >
            {tCommon('call', { number: contact.secondaryDisplay })}
          </a>
        </div>
      </PageHeader>

      <Section>
        {/*
          The identity strip. A photograph, finally — the profile page was the one
          surface on the site that named a consultant without ever showing them.
          Real photo when LIMS has supplied one, the same honest monogram DoctorCard
          falls back to otherwise; see rule 4 at the top of lib/doctors.ts. The
          registration number and years of experience move up here from the Details
          panel below — the two facts worth a glance before reading anything else —
          rather than existing twice on the page.
        */}
        <div className="scroll-reveal mb-8 flex items-center gap-4 rounded-2xl border border-brand-teal/10 bg-white p-4 shadow-sm">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-brand-mist sm:h-20 sm:w-20">
            {doctor.portrait ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={doctor.portrait.src}
                alt={doctor.portrait.alt}
                width={doctor.portrait.width}
                height={doctor.portrait.height}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <span
                aria-hidden="true"
                className="grid h-full w-full place-items-center font-serif text-xl font-bold text-brand-teal/60 sm:text-2xl"
              >
                {initials(doctor.name)}
              </span>
            )}
          </div>
          <div className="flex flex-1 flex-wrap items-center gap-x-5 gap-y-1.5 text-sm">
            {doctor.registrationNumber && (
              <span className="flex items-center gap-1.5 text-brand-dark-base/70">
                <ShieldIcon className="h-4 w-4 shrink-0 text-brand-teal" aria-hidden="true" />
                {tCard('regNo')}{' '}
                <span className="font-semibold text-brand-dark-base">
                  {registrationDisplay(doctor.registrationNumber)}
                </span>
              </span>
            )}
            {typeof doctor.experienceYears === 'number' && (
              <span className="text-brand-dark-base/70">
                {t.rich('yearsExperience', {
                  years: doctor.experienceYears,
                  b: (chunks) => <span className="font-semibold text-brand-dark-base">{chunks}</span>,
                })}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="scroll-reveal space-y-6 lg:col-span-2">
            {doctor.about ? (
              <div>
                <h2 className="mb-3 font-serif text-2xl font-bold text-brand-dark-base">
                  {t('about')}
                </h2>
                <p className="max-w-2xl leading-relaxed text-brand-dark-base/75">
                  {doctor.about}
                </p>
              </div>
            ) : (
              <AwaitingContent what={t('aboutThisConsultant')}>{t('aboutFallback')}</AwaitingContent>
            )}
          </div>

          <aside className="scroll-reveal space-y-4 rounded-2xl border border-brand-teal/10 bg-brand-mist/50 p-6">
            <h2 className="font-serif text-lg font-bold text-brand-dark-base">{t('details')}</h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-brand-dark-base/50">
                  {t('department')}
                </dt>
                <dd className="mt-0.5">
                  {departmentHref ? (
                    <Link
                      href={departmentHref}
                      className="font-semibold text-brand-teal hover:underline"
                    >
                      {department}
                    </Link>
                  ) : (
                    department
                  )}
                </dd>
              </div>

              {/*
                Registration and years of experience live in the identity strip
                above now, not here — see that block's comment. Department and
                languages are what's left worth a dedicated line.
              */}

              {doctor.languages?.length ? (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-brand-dark-base/50">
                    {t('languages')}
                  </dt>
                  <dd className="mt-0.5">{doctor.languages.join(', ')}</dd>
                </div>
              ) : null}
            </dl>
          </aside>
        </div>

        {/*
          Not "24x7" — see the note on `contact` in lib/site-config.ts. The two
          published numbers' hours are an unconfirmed assumption, so nothing on
          this site claims round-the-clock cover until LIMS confirms it.
        */}
        <div className="scroll-reveal mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-brand-mist p-5">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-brand-emergency shadow-sm"
            >
              <PhoneIcon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-brand-dark-base">
                {t('urgentCareHeading')}
              </p>
              <p className="text-xs text-brand-dark-base/60">{t('urgentCareBody')}</p>
            </div>
          </div>
          <a
            href={`tel:${contact.primary}`}
            aria-label={tEmergency('callLine', { number: contact.primaryDisplay })}
            className="tap-target focus-ring-inverse shrink-0 rounded-full bg-brand-emergency px-5 text-xs font-bold text-white hover:bg-brand-emergency/90"
          >
            {tCommon('call', { number: contact.primaryDisplay })}
          </a>
        </div>
      </Section>
    </>
  )
}
