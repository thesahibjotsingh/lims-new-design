// lib/search/build-docs.ts
//
// Turns the site's content into search documents, one list per language. SERVER ONLY: it imports
// every department's text and the doctors' records, which must never reach the browser bundle. The
// browser fetches the result as JSON (app/api/search-index/[locale]/route.ts); the doctor directory's
// "did you mean" uses it in-process.
//
// WHAT BECOMES A DOCUMENT, per language:
//   - every department, test and patient service (title, aliases, the topics in topics.ts, overview)
//   - every condition, treatment, "when to see a doctor" line, diagnostic step, preparation line,
//     safety note, prevention tip, step and FAQ on those pages, each linking to its own section
//   - every consultant (name, qualifications, department, what a patient calls that doctor,
//     languages, OPD days, areas of treatment)
//   - the hospital information in pages.ts (phone, directions, booking, ABHA, prices, visiting)
//   - every article in the Health library (none yet)
//
// In Hindi and Punjabi the SHOWN text is the translation; the English title is added as hidden
// keywords, so a patient can type either on either site.

import type { Locale } from '@/i18n/routing'
import { localizedExtras, localizedService } from '@/lib/content-i18n'
import { DOCTORS } from '@/lib/doctors'
import { localizeDoctor } from '@/lib/doctors-i18n'
import { HEALTH_ARTICLES } from '@/lib/health-articles'
import { pageDocs } from '@/lib/search/pages'
import { ROLE_WORDS, TOPICS } from '@/lib/search/topics'
import type { SearchDoc } from '@/lib/search/types'
import { getExtras } from '@/lib/service-content'
import { SERVICES, serviceHref } from '@/lib/services'
import type { ClinicalService } from '@/lib/services'
import { translatedServiceName } from '@/lib/services-i18n'
import en from '@/messages/en.json'
import hi from '@/messages/hi.json'
import pa from '@/messages/pa.json'

const MESSAGES = { en, hi, pa } as const

type Section =
  | 'conditions'
  | 'treatments'
  | 'faq'
  | 'when'
  | 'diagnosis'
  | 'prepare'
  | 'after'
  | 'safety'
  | 'prevention'
  | 'how'

const SECTION_LABEL: Record<Locale, Record<Section, string>> = {
  en: {
    conditions: 'Conditions',
    treatments: 'Treatments',
    faq: 'Questions',
    when: 'When to see a doctor',
    diagnosis: 'How it is diagnosed',
    prepare: 'Preparing',
    after: 'Afterwards',
    safety: 'Safety',
    prevention: 'Prevention',
    how: 'How it works',
  },
  hi: {
    conditions: 'स्थितियां',
    treatments: 'उपचार',
    faq: 'प्रश्न',
    when: 'डॉक्टर को कब दिखाएं',
    diagnosis: 'जांच कैसे होती है',
    prepare: 'तैयारी',
    after: 'बाद में',
    safety: 'सुरक्षा',
    prevention: 'रोकथाम',
    how: 'यह कैसे काम करता है',
  },
  pa: {
    conditions: 'ਸਥਿਤੀਆਂ',
    treatments: 'ਇਲਾਜ',
    faq: 'ਸਵਾਲ',
    when: 'ਡਾਕਟਰ ਨੂੰ ਕਦੋਂ ਦਿਖਾਉਣਾ ਹੈ',
    diagnosis: 'ਜਾਂਚ ਕਿਵੇਂ ਹੁੰਦੀ ਹੈ',
    prepare: 'ਤਿਆਰੀ',
    after: 'ਬਾਅਦ ਵਿੱਚ',
    safety: 'ਸੁਰੱਖਿਆ',
    prevention: 'ਰੋਕਥਾਮ',
    how: 'ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ',
  },
}

/** The order of "popular searches": the departments patients most often come for. */
const POPULAR_DEPARTMENTS: Record<string, number> = {
  'obstetrics-gynaecology': 5,
  'paediatrics-neonatology': 6,
  'ortho-joint-replacement': 7,
  'general-medicine': 8,
}

const FALLBACK_DEPARTMENT: Record<string, number> = { 'general-medicine': 3 }

/** The first sentence, trimmed to a length a result row can hold. */
function lead(text: string | undefined, max = 110): string | undefined {
  if (!text) return undefined
  const first = text.split(/(?<=[.।])\s/)[0] ?? text
  if (first.length <= max) return first
  return `${first.slice(0, max - 1).trimEnd()}…`
}

function join(parts: (string | undefined)[]): string {
  return parts.filter((part): part is string => Boolean(part)).join(' ')
}

function departmentKind(service: ClinicalService): SearchDoc['kind'] {
  return service.category === 'diagnostics' ? 'test' : 'department'
}

function serviceDocs(locale: Locale, sections: boolean): SearchDoc[] {
  const docs: SearchDoc[] = []

  for (const english of SERVICES) {
    const service = localizedService(english, locale)
    const extras = localizedExtras(english.slug, locale)
    const englishExtras = getExtras(english.slug)
    const href = serviceHref(english)
    const name = translatedServiceName(english.slug, locale)
    const place = (section: Section) => `${name} › ${SECTION_LABEL[locale][section]}`
    const slug = english.slug
    const english_ = locale !== 'en'

    docs.push({
      id: `svc:${slug}`,
      kind: departmentKind(english),
      title: name,
      detail: lead(service.overview),
      href,
      keys: join([
        english.name,
        ...(english.alsoKnownAs ?? []),
        TOPICS[slug],
        english_ ? name : undefined,
      ]),
      text: join([
        service.overview,
        ...(extras?.areas ?? []),
        english_ ? english.overview : undefined,
      ]),
      boost: 1,
      pop: POPULAR_DEPARTMENTS[slug],
      fallback: FALLBACK_DEPARTMENT[slug],
    })

    if (!sections) continue

    const add = (
      kind: SearchDoc['kind'],
      section: Section,
      id: string,
      title: string,
      text: string | undefined,
      englishTitle: string | undefined,
    ) => {
      docs.push({
        id: `${id}:${slug}`,
        kind,
        title,
        detail: place(section),
        href: `${href}#${SECTION_ANCHOR[section]}`,
        keys: english_ && englishTitle && englishTitle !== title ? englishTitle : undefined,
        text,
        parent: slug,
      })
    }

    ;(service.commonConditions ?? []).forEach((item, index) => {
      add('condition', 'conditions', `cond${index}`, item.name, item.description, english.commonConditions?.[index]?.name)
    })
    ;(service.commonTreatments ?? []).forEach((item, index) => {
      add('treatment', 'treatments', `treat${index}`, item.name, item.description, english.commonTreatments?.[index]?.name)
    })
    ;(extras?.seeDoctorIf ?? []).forEach((line, index) => {
      add('condition', 'when', `when${index}`, line, undefined, englishExtras?.seeDoctorIf?.[index])
    })
    ;(extras?.diagnosedBy ?? []).forEach((item, index) => {
      add('test', 'diagnosis', `diag${index}`, item.name, item.detail, englishExtras?.diagnosedBy?.[index]?.name)
    })
    ;(extras?.prepare ?? []).forEach((line, index) => {
      add('faq', 'prepare', `prep${index}`, line, undefined, englishExtras?.prepare?.[index])
    })
    ;(extras?.after ?? []).forEach((line, index) => {
      add('faq', 'after', `after${index}`, line, undefined, englishExtras?.after?.[index])
    })
    ;(extras?.safety ?? []).forEach((line, index) => {
      add('faq', 'safety', `safe${index}`, line, undefined, englishExtras?.safety?.[index])
    })
    ;(extras?.prevention ?? []).forEach((line, index) => {
      add('faq', 'prevention', `prev${index}`, line, undefined, englishExtras?.prevention?.[index])
    })
    ;(extras?.steps ?? []).forEach((step, index) => {
      add('faq', 'how', `step${index}`, step.title, step.body, englishExtras?.steps?.[index]?.title)
    })
    ;(extras?.faqs ?? []).forEach((faq, index) => {
      add('faq', 'faq', `faq${index}`, faq.q, faq.a, englishExtras?.faqs?.[index]?.q)
    })
  }
  return docs
}

/** The id each section has on a department page (components/primitives/ServiceDetail.tsx). */
const SECTION_ANCHOR: Record<Section, string> = {
  conditions: 'conditions',
  treatments: 'treatments',
  faq: 'faqs',
  when: 'when',
  diagnosis: 'diagnosis',
  prepare: 'prepare',
  after: 'after',
  safety: 'safety',
  prevention: 'prevention',
  how: 'how',
}

function weekday(locale: string, index: number): string {
  // 1 January 2024 was a Monday.
  return new Intl.DateTimeFormat(locale, { weekday: 'long', timeZone: 'UTC' }).format(
    new Date(Date.UTC(2024, 0, 1 + index)),
  )
}

const WEEKDAY_INDEX: Record<string, number> = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
  saturday: 5,
  sunday: 6,
}

function doctorDocs(locale: Locale): SearchDoc[] {
  return DOCTORS.map((english) => {
    const doctor = localizeDoctor(english, locale)
    const department = translatedServiceName(english.departmentSlug, locale)
    const englishDepartment = SERVICES.find((s) => s.slug === english.departmentSlug)?.name
    const days = new Set<string>()
    for (const session of english.opdSchedule ?? []) {
      const index = WEEKDAY_INDEX[session.day]
      days.add(weekday('en', index))
      if (locale !== 'en') days.add(weekday(locale, index))
    }
    return {
      id: `doc:${english.id}`,
      kind: 'doctor' as const,
      title: doctor.name,
      detail: [doctor.qualifications ?? doctor.designation, department].filter(Boolean).join(' · '),
      href: `/doctors/${english.id}`,
      keys: join([
        english.name,
        englishDepartment,
        department,
        ROLE_WORDS[english.departmentSlug],
        'doctor consultant physician',
        ...(english.languages ?? []),
        ...(doctor.languages ?? []),
        ...days,
      ]),
      text: join([
        doctor.designation,
        doctor.qualifications,
        english.qualifications,
        ...(doctor.specialisations ?? []),
        ...(english.specialisations ?? []),
        ...(doctor.education ?? []).map((entry) => `${entry.title} ${entry.institution ?? ''}`),
      ]),
      boost: 1.1,
    }
  })
}

function articleDocs(locale: Locale): SearchDoc[] {
  return HEALTH_ARTICLES.filter((article) => article.language === locale).map((article) => ({
    id: `article:${article.slug}`,
    kind: 'info' as const,
    title: article.title,
    detail: article.summary,
    href: `/health-library/${article.slug}`,
    text: article.body,
    keys: join((article.departments ?? []).map((slug) => TOPICS[slug])),
  }))
}

/**
 * Every search document for one language.
 *
 * `sections: false` leaves out the lines inside department pages (conditions, treatments, questions)
 * and keeps whole pages only. The browser always gets the full set; the server uses the small set for
 * the doctor directory's "did you mean", because it runs on a Worker with little CPU to spare and only
 * needs places to send someone, not lines to quote.
 */
export function buildSearchDocs(locale: Locale, options: { sections?: boolean } = {}): SearchDoc[] {
  const whatsappMessage = MESSAGES[locale].common.whatsappMessage
  return [
    ...pageDocs(locale, whatsappMessage),
    ...serviceDocs(locale, options.sections ?? true),
    ...doctorDocs(locale),
    ...articleDocs(locale),
  ]
}
