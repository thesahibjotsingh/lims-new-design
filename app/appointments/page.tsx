import type { Metadata } from 'next'
import { AppointmentForm } from '@/components/appointments/AppointmentForm'
import { PageHeader, Section } from '@/components/primitives/PageShell'
import { DOCTORS, getDoctor } from '@/lib/doctors'
import { SERVICE_CATEGORIES, getService, serviceName, servicesByCategory } from '@/lib/services'
import { contact, primaryLocation } from '@/lib/site-config'
import { PhoneIcon, PinIcon } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Request an appointment',
  description:
    'Request an appointment at LIMS Hisar. The hospital calls you back to confirm a time.',
}

/*
 * Server page, client form.
 *
 * The catalogue and the roster are read here and passed down as plain option lists, so
 * lib/services and lib/doctors never enter the client bundle. The form is the only
 * client code on the route.
 *
 * ?doctor= and ?department= are validated against the real data before being used as
 * defaults — an unknown id in the URL falls back to "no preference" rather than
 * pre-selecting something that does not exist.
 */
export default async function AppointmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ doctor?: string | string[]; department?: string | string[] }>
}) {
  const params = await searchParams

  const doctorParam = Array.isArray(params.doctor) ? params.doctor[0] : params.doctor
  const departmentParam = Array.isArray(params.department)
    ? params.department[0]
    : params.department

  const preselectedDoctor = doctorParam ? getDoctor(doctorParam) : undefined
  const preselectedService = departmentParam ? getService(departmentParam) : undefined

  const doctorOptions = DOCTORS.map((doctor) => ({
    value: doctor.id,
    label: `${doctor.name} — ${serviceName(doctor.departmentSlug)}`,
  }))

  const serviceGroups = SERVICE_CATEGORIES.map((category) => ({
    label: category.name,
    options: servicesByCategory(category.id).map((service) => ({
      value: service.slug,
      label: service.name,
    })),
  }))

  return (
    <>
      <PageHeader
        eyebrow="Appointments"
        title="Request an appointment"
        intro={
          preselectedDoctor
            ? `Requesting time with ${preselectedDoctor.name}. The hospital will call you back to confirm.`
            : 'Send a request and the hospital will call you back to confirm a time. For anything urgent, please call instead.'
        }
      />

      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <AppointmentForm
              doctorOptions={doctorOptions}
              serviceGroups={serviceGroups}
              initialDoctorId={preselectedDoctor?.id ?? ''}
              initialDepartmentSlug={
                preselectedService?.slug ?? preselectedDoctor?.departmentSlug ?? ''
              }
              fallbackPhone={contact.secondary}
              fallbackPhoneDisplay={contact.secondaryDisplay}
            />
          </div>

          <aside className="space-y-5 lg:col-span-2">
            <div className="rounded-2xl border border-brand-emergency/20 bg-brand-emergency/5 p-6">
              <h2 className="font-serif text-lg font-bold text-brand-dark-base">
                In an emergency, do not use this form
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-dark-base/75">
                This is a callback request and nobody is watching it in real time. If
                someone needs care now, call the hospital directly or go to the
                emergency department.
              </p>
              <a
                href={`tel:${contact.primary}`}
                className="tap-target focus-ring-inverse mt-3 gap-2 rounded-full bg-brand-emergency px-6 text-sm font-bold text-white"
              >
                <PhoneIcon className="h-4 w-4" />
                {contact.primaryDisplay}
              </a>
            </div>

            <div className="rounded-2xl border border-brand-teal/10 bg-brand-mist/60 p-6">
              <h2 className="font-serif text-lg font-bold text-brand-dark-base">
                Where to come
              </h2>
              <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-brand-dark-base/75">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                <span>
                  {primaryLocation.name}
                  <br />
                  {primaryLocation.addressLines.join(', ')}
                  <br />
                  {primaryLocation.city}, {primaryLocation.state}
                </span>
              </p>
              <a
                href={`tel:${contact.secondary}`}
                className="tap-target mt-3 gap-2 rounded-full border border-brand-teal/25 px-5 text-xs font-semibold text-brand-teal hover:bg-white"
              >
                <PhoneIcon className="h-4 w-4" />
                Appointments: {contact.secondaryDisplay}
              </a>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
