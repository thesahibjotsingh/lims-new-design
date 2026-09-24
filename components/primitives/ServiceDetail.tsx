// components/primitives/ServiceDetail.tsx
//
// The body of a service page, shared by all three category routes.
//
// It renders the name, the category, the alternative names, the consultants filed
// under that slug, and — when set — `service.overview`, `service.commonConditions`
// and `service.commonTreatments`: generic, non-institution-specific descriptions of
// what the specialty/test/service is, what it generally involves, and how it's
// generally addressed. It does NOT render facilities, equipment, "our team," or
// anything else with LIMS as the subject — those are clinical claims about what THIS
// hospital can do, and they come from LIMS or they do not exist. Where `overview` is
// missing (a service added without one yet) the page falls back to AwaitingContent
// and offers the phone instead of guessing — same pattern as `doctor.about` on the
// profile page.
//
// `conditionsHeadingKey` / `treatmentsHeadingKey`: the same two lists read
// differently depending on what the page is about — "conditions associated with"
// makes sense for a clinical department, reads oddly for a diagnostic test (which
// gets "what it can help evaluate" instead), and differently again for a support
// service. Three heading variants per list, picked by `service.category`, rather
// than one generic heading stretched to cover all three.

import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getCategory, serviceHref, servicesByCategory } from '@/lib/services'
import { getDoctorsByDepartment } from '@/lib/doctors'
import { DoctorCard } from '@/components/primitives/DoctorCard'
import { ServiceIcon } from '@/components/primitives/ServiceIcon'
import { AwaitingContent, PageHeader, Section } from '@/components/primitives/PageShell'
import type { ClinicalService, ServiceListItem } from '@/lib/services'

const CONDITIONS_HEADING_KEY = {
  clinical: 'conditionsHeadingClinical',
  diagnostics: 'conditionsHeadingDiagnostics',
  support: 'conditionsHeadingSupport',
} as const

const TREATMENTS_HEADING_KEY = {
  clinical: 'treatmentsHeadingClinical',
  diagnostics: 'treatmentsHeadingDiagnostics',
  support: 'treatmentsHeadingSupport',
} as const

function ServiceListSection({ heading, items }: { heading: string; items: ServiceListItem[] }) {
  return (
    <div>
      <h2 className="mb-4 font-serif text-2xl font-bold text-brand-dark-base">{heading}</h2>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item.name}
            className="rounded-xl border border-brand-teal/10 bg-white p-4 shadow-sm"
          >
            <p className="font-semibold text-brand-dark-base">{item.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-brand-dark-base/70">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function ServiceDetail({ service }: { service: ClinicalService }) {
  const t = await getTranslations('serviceDetail')
  const tCommon = await getTranslations('common')
  const category = getCategory(service.category)
  const doctors = getDoctorsByDepartment(service.slug)
  const siblings = servicesByCategory(service.category).filter(
    (entry) => entry.slug !== service.slug,
  )

  return (
    <>
      <PageHeader
        eyebrow={category.name}
        title={service.name}
        intro={
          service.alsoKnownAs?.length
            ? t('alsoKnownAs', { names: service.alsoKnownAs.join(', ') })
            : undefined
        }
        icon={<ServiceIcon slug={service.slug} size={72} />}
      >
        <nav aria-label="Breadcrumb" className="mt-5">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-brand-dark-base/55">
            <li>
              <Link href="/" className="hover:text-brand-teal">
                {tCommon('home')}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={category.basePath} className="hover:text-brand-teal">
                {category.pageTitle}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-brand-dark-base/75">
              {service.name}
            </li>
          </ol>
        </nav>
      </PageHeader>

      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="scroll-reveal space-y-8 lg:col-span-2">
            {doctors.length > 0 ? (
              <div>
                <h2 className="mb-4 font-serif text-2xl font-bold text-brand-dark-base">
                  {t('consultantsIn', { name: service.name })}
                </h2>
                <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {doctors.map((doctor) => (
                    <li key={doctor.id}>
                      <DoctorCard doctor={doctor} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <AwaitingContent what={t('consultantsIn', { name: service.name })}>
                {t('consultantsNotPublished', {
                  type: service.category === 'clinical' ? t('departmentType') : t('serviceType'),
                })}
              </AwaitingContent>
            )}

            {service.overview ? (
              <div>
                <h2 className="mb-3 font-serif text-2xl font-bold text-brand-dark-base">
                  {t('aboutThisService')}
                </h2>
                <p className="max-w-2xl leading-relaxed text-brand-dark-base/75">
                  {service.overview}
                </p>
              </div>
            ) : (
              <AwaitingContent what={t('aboutThisService')}>
                {t('aboutServiceFallback')}
              </AwaitingContent>
            )}

            {service.commonConditions?.length ? (
              <ServiceListSection
                heading={t(CONDITIONS_HEADING_KEY[service.category], { name: service.name })}
                items={service.commonConditions}
              />
            ) : null}

            {service.commonTreatments?.length ? (
              <ServiceListSection
                heading={t(TREATMENTS_HEADING_KEY[service.category])}
                items={service.commonTreatments}
              />
            ) : null}
          </div>

          <aside className="scroll-reveal space-y-4">
            <h2 className="font-serif text-lg font-bold text-brand-dark-base">
              {t('otherIn', { category: category.name.toLowerCase() })}
            </h2>
            <ul className="space-y-1">
              {siblings.map((sibling) => (
                <li key={sibling.slug}>
                  <Link
                    href={serviceHref(sibling)}
                    className="flex min-h-[44px] items-center rounded-lg px-3 text-sm text-brand-dark-base/75 transition-colors hover:bg-brand-mist hover:text-brand-teal active:bg-brand-mist active:text-brand-teal"
                  >
                    {sibling.name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/*
          One honest, compact note, not six empty "not yet available" boxes stacked
          for highlights/sub-specialties/leadership quote/team approach/technology/
          patient stories — those are all specific claims about LIMS that don't exist
          here to render in the first place (see the file-level note in
          lib/services.ts). AwaitingContent's heavier pattern (icon, CTAs) is right
          for a single missing section; repeated six times it would be the page
          apologising to the reader more than informing them.
        */}
        <div className="scroll-reveal mt-10 rounded-2xl border border-dashed border-brand-teal/25 bg-brand-mist/60 p-6">
          <h2 className="font-serif text-lg font-bold text-brand-dark-base">
            {t('morePendingHeading')}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-dark-base/70">
            {t('morePendingBody')}
          </p>
        </div>
      </Section>
    </>
  )
}
