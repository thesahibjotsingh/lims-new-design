import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DOCTORS, getDoctor, registrationDisplay } from '@/lib/doctors'
import { serviceHrefBySlug, serviceName } from '@/lib/services'
import { AwaitingContent, PageHeader, Section } from '@/components/primitives/PageShell'
import { ShieldIcon } from '@/components/icons'
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

  const departmentHref = serviceHrefBySlug(doctor.departmentSlug)
  const department = serviceName(doctor.departmentSlug)

  return (
    <>
      <PageHeader eyebrow={department} title={doctor.name}>
        <div className="mt-4 space-y-1.5">
          {doctor.qualifications && (
            <p className="text-base font-medium text-brand-copper">{doctor.qualifications}</p>
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
            Request an appointment
          </Link>
          <a
            href={`tel:${contact.secondary}`}
            className="tap-target rounded-full border border-brand-teal/25 px-6 text-sm font-semibold text-brand-teal hover:bg-white"
          >
            Call {contact.secondaryDisplay}
          </a>
        </div>
      </PageHeader>

      <Section>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {doctor.about ? (
              <div>
                <h2 className="mb-3 font-serif text-2xl font-bold text-brand-dark-base">
                  About
                </h2>
                <p className="max-w-2xl leading-relaxed text-brand-dark-base/75">
                  {doctor.about}
                </p>
              </div>
            ) : (
              <AwaitingContent what="About this consultant">
                A biography, specialisations and OPD timings are published from
                information supplied by LIMS. Rather than describe this doctor&rsquo;s
                practice without that, the page leaves it out and gives you the
                hospital&rsquo;s number.
              </AwaitingContent>
            )}
          </div>

          <aside className="space-y-4 rounded-2xl border border-brand-teal/10 bg-brand-mist/50 p-6">
            <h2 className="font-serif text-lg font-bold text-brand-dark-base">Details</h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-brand-dark-base/50">
                  Department
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

              {doctor.registrationNumber && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-brand-dark-base/50">
                    Medical council registration
                  </dt>
                  <dd className="mt-0.5 flex items-center gap-2 font-semibold text-brand-dark-base/80">
                    <ShieldIcon className="h-4 w-4 shrink-0 text-brand-teal" />
                    {registrationDisplay(doctor.registrationNumber)}
                  </dd>
                </div>
              )}

              {typeof doctor.experienceYears === 'number' && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-brand-dark-base/50">
                    Experience
                  </dt>
                  <dd className="mt-0.5">{doctor.experienceYears} years</dd>
                </div>
              )}

              {doctor.languages?.length ? (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-brand-dark-base/50">
                    Languages
                  </dt>
                  <dd className="mt-0.5">{doctor.languages.join(', ')}</dd>
                </div>
              ) : null}
            </dl>
          </aside>
        </div>
      </Section>
    </>
  )
}
