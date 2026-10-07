// lib/content-i18n/types.ts
//
// The shape of the Hindi and Punjabi versions of the department-page content.
//
// The English source stays where it is: overviews, conditions and treatments in
// lib/services.ts, everything else in lib/service-content.ts. A translation file here
// mirrors that data BY SLUG and BY POSITION. The nth condition in Hindi is the nth
// condition in English, so the arrays must be the same length as the English ones, and the
// resolver in ./index.ts falls back to the English for any field whose length does not
// match rather than render a misaligned list. scripts/check-content-i18n.mjs (run it after
// editing any of these files) reports every mismatch.
//
// What is NOT here, on purpose, because it is not language: slugs, the `slug` links from a
// diagnosis item to a test, `related`, and the flags (emergencyDept, noAppointment,
// keepReady). Those come from the English record, always.

import type { Faq, Step } from '@/lib/service-content'
import type { ServiceListItem } from '@/lib/services'

/** Overview, conditions and treatments for one service (the part that lives in lib/services.ts). */
export interface ServiceTextTranslation {
  overview?: string
  commonConditions?: ServiceListItem[]
  commonTreatments?: ServiceListItem[]
}

/** The part that lives in lib/service-content.ts. */
export interface ExtrasTranslation {
  areas?: string[]
  seeDoctorIf?: string[]
  emergencyIf?: string[]
  /** `slug` is taken from the English item at the same position. */
  diagnosedBy?: { name: string; detail: string }[]
  prevention?: string[]
  prepare?: string[]
  during?: string[]
  after?: string[]
  safety?: string[]
  steps?: Step[]
  faqs?: Faq[]
}

export type ServiceTextTable = Record<string, ServiceTextTranslation>
export type ExtrasTable = Record<string, ExtrasTranslation>
