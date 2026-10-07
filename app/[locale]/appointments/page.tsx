import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import { AppointmentForm } from '@/components/appointments/AppointmentForm'
import { PageHeader, Section } from '@/components/primitives/PageShell'
import { getBookingOptions } from '@/lib/booking-options'
import { getDoctor } from '@/lib/doctors'
import { getService } from '@/lib/services'
import { contact, fullAddress, whatsappUrl } from '@/lib/site-config'
import { localizedLocation } from '@/lib/site-i18n'
import { PhoneIcon, PinIcon, WhatsAppIcon } from '@/components/icons'
import type { Locale } from '@/i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'appointmentsPage' })
  return { title: t('metaTitle'), description: t('metaDescription') }
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
  const locale = (await getLocale()) as Locale
  const t = await getTranslations('appointmentsPage')
  const tCommon = await getTranslations('common')

  const doctorParam = Array.isArray(params.doctor) ? params.doctor[0] : params.doctor
  const departmentParam = Array.isArray(params.department)
    ? params.department[0]
    : params.department

  const preselectedDoctor = doctorParam ? getDoctor(doctorParam, locale) : undefined
  const location = localizedLocation(locale)
  const preselectedService = departmentParam ? getService(departmentParam) : undefined

  const { doctorOptions, serviceGroups } = getBookingOptions(locale)

  return (
    <>
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        intro={
          preselectedDoctor
            ? t('introDoctor', { name: preselectedDoctor.name })
            : t('intro')
        }
      />

      <Section>
        <AppointmentForm
          doctorOptions={doctorOptions}
          serviceGroups={serviceGroups}
          initialDoctorId={preselectedDoctor?.id ?? ''}
          initialDepartmentSlug={preselectedService?.slug ?? preselectedDoctor?.departmentSlug ?? ''}
          fallbackPhone={contact.secondary}
          fallbackPhoneDisplay={contact.secondaryDisplay}
          whatsappHref={whatsappUrl(tCommon('whatsappMessage'))}
        />

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          <div className="scroll-reveal rounded-2xl border border-brand-emergency/20 bg-brand-emergency/5 p-6">
            <h2 className="font-serif text-lg font-bold text-brand-dark-base">
              {t('emergencyHeading')}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-dark-base/75">
              {t('emergencyBody')}
            </p>
            <a
              href={`tel:${contact.primary}`}
              className="tap-target focus-ring-inverse mt-3 gap-2 rounded-full bg-brand-emergency px-6 text-sm font-bold text-white"
            >
              <PhoneIcon className="h-4 w-4" />
              {contact.primaryDisplay}
            </a>
          </div>

          <div className="scroll-reveal rounded-2xl border border-brand-teal/10 bg-brand-mist/60 p-6">
            <h2 className="font-serif text-lg font-bold text-brand-dark-base">
              {t('whereHeading')}
            </h2>
            <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-brand-dark-base/75">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
              <span>
                {location.name}
                <br />
                {fullAddress(location)}
              </span>
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={`tel:${contact.secondary}`}
                className="tap-target gap-2 rounded-full border border-brand-teal/25 px-5 text-xs font-semibold text-brand-teal hover:bg-white"
              >
                <PhoneIcon className="h-4 w-4" />
                {t('appointmentsPhone', { number: contact.secondaryDisplay })}
              </a>
              <a
                href={whatsappUrl(tCommon('whatsappMessage'))}
                target="_blank"
                rel="noreferrer noopener"
                className="tap-target focus-ring-inverse gap-2 rounded-full bg-brand-whatsapp px-5 text-xs font-semibold text-white hover:bg-brand-whatsapp-hover"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {tCommon('whatsapp')}
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
