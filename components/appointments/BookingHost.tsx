// components/appointments/BookingHost.tsx
//
// Server side of the booking overlay: reads the catalogue and the roster for the current
// language, the two phone numbers and the hospital's online booking address, and hands them to
// the client BookingProvider that mounted once in the layout. Renders nothing visible itself.

import { getLocale, getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { BookingProvider } from '@/components/appointments/BookingProvider'
import { getBookingOptions } from '@/lib/booking-options'
import { contact, onlineBookingUrl, whatsappUrl } from '@/lib/site-config'

export async function BookingHost() {
  const locale = (await getLocale()) as Locale
  const { doctorOptions, serviceGroups } = getBookingOptions(locale)
  const tCommon = await getTranslations('common')

  return (
    <BookingProvider
      doctorOptions={doctorOptions}
      serviceGroups={serviceGroups}
      bookingUrl={onlineBookingUrl}
      fallbackPhone={contact.secondary}
      fallbackPhoneDisplay={contact.secondaryDisplay}
      whatsappHref={whatsappUrl(tCommon('whatsappMessage'))}
      emergencyPhone={contact.primary}
      emergencyPhoneDisplay={contact.primaryDisplay}
    />
  )
}
