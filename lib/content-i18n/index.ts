// lib/content-i18n/index.ts
//
// Resolvers: the English service record or extras, with the reader's language laid over it
// wherever a translation exists and lines up with the English.
//
// A translation that is missing, or whose list is a different length from the English one,
// is IGNORED and the English shows. That is deliberate. A list that quietly pairs the wrong
// description with a condition is worse than a list left in English, and an English line on
// a Hindi page is something the page's own "auto-translated" notice already accounts for.
// scripts/check-content-i18n.mjs reports every such case so none survives to launch.
//
// UNREVIEWED MEDICAL COPY. Everything behind these tables was written without a clinician,
// like the English it mirrors (see the DRAFT STATUS note in lib/service-content.ts), and is
// a translation of that draft, not a second source. A Hindi- or Punjabi-speaking LIMS doctor
// should read each page before launch.

import type { Locale } from '@/i18n/routing'
import { getExtras } from '@/lib/service-content'
import type { ServiceExtras } from '@/lib/service-content'
import type { ClinicalService } from '@/lib/services'
import type { ExtrasTable, ExtrasTranslation, ServiceTextTable } from '@/lib/content-i18n/types'
import { SERVICE_TEXT_HI } from '@/lib/content-i18n/services.hi'
import { SERVICE_TEXT_PA } from '@/lib/content-i18n/services.pa'
import { EXTRAS_HI } from '@/lib/content-i18n/extras.hi'
import { EXTRAS_PA } from '@/lib/content-i18n/extras.pa'

const SERVICE_TEXT: Record<Exclude<Locale, 'en'>, ServiceTextTable> = {
  hi: SERVICE_TEXT_HI,
  pa: SERVICE_TEXT_PA,
}

const EXTRAS: Record<Exclude<Locale, 'en'>, ExtrasTable> = {
  hi: EXTRAS_HI,
  pa: EXTRAS_PA,
}

/** The translated array when it lines up with the English one, otherwise the English. */
function aligned<T>(english: T[] | undefined, translated: T[] | undefined): T[] | undefined {
  if (!english) return english
  return translated && translated.length === english.length ? translated : english
}

/** The service with its overview, conditions and treatments in the given language. */
export function localizedService(service: ClinicalService, locale: Locale): ClinicalService {
  if (locale === 'en') return service
  const text = SERVICE_TEXT[locale][service.slug]
  if (!text) return service
  return {
    ...service,
    overview: text.overview ?? service.overview,
    commonConditions: aligned(service.commonConditions, text.commonConditions),
    commonTreatments: aligned(service.commonTreatments, text.commonTreatments),
  }
}

/** The service's extras (see lib/service-content.ts) in the given language. */
export function localizedExtras(slug: string, locale: Locale): ServiceExtras | undefined {
  const base = getExtras(slug)
  if (!base || locale === 'en') return base
  const text: ExtrasTranslation | undefined = EXTRAS[locale][slug]
  if (!text) return base

  const diagnosedBy =
    base.diagnosedBy && text.diagnosedBy && text.diagnosedBy.length === base.diagnosedBy.length
      ? base.diagnosedBy.map((item, index) => ({ ...item, ...text.diagnosedBy![index] }))
      : base.diagnosedBy

  return {
    ...base,
    areas: aligned(base.areas, text.areas),
    seeDoctorIf: aligned(base.seeDoctorIf, text.seeDoctorIf),
    emergencyIf: aligned(base.emergencyIf, text.emergencyIf),
    diagnosedBy,
    prevention: aligned(base.prevention, text.prevention),
    prepare: aligned(base.prepare, text.prepare),
    during: aligned(base.during, text.during),
    after: aligned(base.after, text.after),
    safety: aligned(base.safety, text.safety),
    steps: aligned(base.steps, text.steps),
    faqs: aligned(base.faqs, text.faqs) ?? base.faqs,
  }
}
