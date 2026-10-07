// components/service/ServiceHero.tsx
//
// The top of a service page: what it is, in one sentence, and how to reach the hospital.
//
// Composition follows the larger hospital sites surveyed (Medanta puts an enquiry form
// beside the title, Fortis and Max put the actions in the banner): the title and summary
// on the left, a "Talk to us" card on the right. The card is the one place on the page
// that carries a booking link, so the page does not repeat the header's global button.
//
// It states only what the data supports. The chips are COUNTS of what the page explains
// (conditions, treatments, consultants listed), never claims about capability.

import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ContactCard } from '@/components/service/ContactCard'
import { ServiceIcon } from '@/components/primitives/ServiceIcon'
import { firstSentence } from '@/lib/text'
import type { ClinicalService } from '@/lib/services'

export async function ServiceHero({
  service,
  name,
  categoryName,
  categoryTitle,
  categoryHref,
  alsoKnownAs,
  doctorCount,
  noAppointment,
  emergencyFirst,
}: {
  service: ClinicalService
  name: string
  categoryName: string
  categoryTitle: string
  categoryHref: string
  alsoKnownAs?: string
  doctorCount: number
  /** Emergency, ambulance and pharmacy are not booked ahead. */
  noAppointment: boolean
  /** Lead the contact card with the emergency number. */
  emergencyFirst: boolean
}) {
  const t = await getTranslations('serviceDetail')
  const tCommon = await getTranslations('common')
  const category = service.category

  const conditionsKey = {
    clinical: 'statConditionsClinical',
    diagnostics: 'statConditionsDiagnostics',
    support: 'statConditionsSupport',
  }[category]
  const treatmentsKey = {
    clinical: 'statTreatmentsClinical',
    diagnostics: 'statTreatmentsDiagnostics',
    support: 'statTreatmentsSupport',
  }[category]

  const chips: string[] = []
  if (service.commonConditions?.length) {
    chips.push(t(conditionsKey, { count: service.commonConditions.length }))
  }
  if (service.commonTreatments?.length) {
    chips.push(t(treatmentsKey, { count: service.commonTreatments.length }))
  }
  if (category === 'clinical' && doctorCount > 0) {
    chips.push(t('statConsultants', { count: doctorCount }))
  }

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
              <Link href={categoryHref} className="hover:text-white">
                {categoryTitle}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-white">
              {name}
            </li>
          </ol>
        </nav>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:gap-12">
          <div>
            <div className="flex items-center gap-4">
              <span className="hidden shrink-0 rounded-2xl bg-white p-3 shadow-sm sm:block">
                <ServiceIcon slug={service.slug} size={56} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
                  {categoryName}
                </p>
                <h1 className="mt-1 text-balance font-serif text-4xl font-bold tracking-tight lg:text-5xl">
                  {name}
                </h1>
              </div>
            </div>

            {service.overview && (
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90">
                {firstSentence(service.overview)}
              </p>
            )}
            {alsoKnownAs && <p className="mt-2 text-sm text-white/75">{alsoKnownAs}</p>}

            {chips.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <ContactCard
            heading={t('talkToUs')}
            tag={name}
            requestHref={noAppointment ? undefined : `/appointments?department=${service.slug}`}
            requestLabel={noAppointment ? undefined : tCommon('requestAnAppointment')}
            requestAriaLabel={noAppointment ? undefined : t('requestFor', { name })}
            emergencyFirst={emergencyFirst}
          />
        </div>
      </div>
    </header>
  )
}
