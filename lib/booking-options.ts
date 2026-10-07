// lib/booking-options.ts
//
// The department and doctor choices the appointment form offers, in the reader's language.
//
// Built on the SERVER and handed to the form as plain data, for two callers: the
// /appointments page and the BookingHost in the layout that feeds the full-screen booking
// overlay. One builder means the two can never offer different lists, and lib/services and
// lib/doctors stay out of the client bundle.

import type { Locale } from '@/i18n/routing'
import { getDoctors } from '@/lib/doctors'
import { SERVICE_CATEGORIES, servicesByCategory } from '@/lib/services'
import { translatedCategoryName, translatedServiceName } from '@/lib/services-i18n'

export interface BookingOption {
  value: string
  label: string
}

export interface BookingDoctorOption extends BookingOption {
  /** Pre-selects the department when this doctor is chosen from a "book with Dr X" link. */
  departmentSlug: string
}

export interface BookingOptions {
  doctorOptions: BookingDoctorOption[]
  serviceGroups: { label: string; options: BookingOption[] }[]
}

export function getBookingOptions(locale: Locale): BookingOptions {
  return {
    // The doctor's name in the reader's script, then the department in their language.
    doctorOptions: getDoctors(locale).map((doctor) => ({
      value: doctor.id,
      label: `${doctor.name}, ${translatedServiceName(doctor.departmentSlug, locale)}`,
      departmentSlug: doctor.departmentSlug,
    })),
    serviceGroups: SERVICE_CATEGORIES.map((category) => ({
      label: translatedCategoryName(category.id, locale),
      options: servicesByCategory(category.id).map((service) => ({
        value: service.slug,
        label: translatedServiceName(service.slug, locale),
      })),
    })),
  }
}
