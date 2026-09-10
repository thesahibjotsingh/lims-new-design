// components/primitives/ServiceDetail.tsx
//
// The body of a service page, shared by all three category routes.
//
// It renders the name, the category, the alternative names, and the consultants filed
// under that slug. It does NOT render an overview, conditions treated, procedures
// offered, or facilities — those are clinical claims about what this hospital can do,
// and they come from LIMS or they do not exist. Where they are missing the page says
// so and offers the phone, which is a page a patient can act on.

import Link from 'next/link'
import { getCategory, serviceHref, servicesByCategory } from '@/lib/services'
import { getDoctorsByDepartment } from '@/lib/doctors'
import { DoctorCard } from '@/components/primitives/DoctorCard'
import { AwaitingContent, PageHeader, Section } from '@/components/primitives/PageShell'
import type { ClinicalService } from '@/lib/services'

export function ServiceDetail({ service }: { service: ClinicalService }) {
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
        intro={service.alsoKnownAs?.length ? `Also known as ${service.alsoKnownAs.join(', ')}.` : undefined}
      >
        <nav aria-label="Breadcrumb" className="mt-5">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-brand-dark-base/55">
            <li>
              <Link href="/" className="hover:text-brand-teal">
                Home
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
          <div className="space-y-8 lg:col-span-2">
            {doctors.length > 0 ? (
              <div>
                <h2 className="mb-4 font-serif text-2xl font-bold text-brand-dark-base">
                  Consultants in {service.name}
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
              <AwaitingContent what={`Consultants in ${service.name}`}>
                LIMS has not yet published the consultant list for this{' '}
                {service.category === 'clinical' ? 'department' : 'service'}. The
                hospital can tell you who is available and when.
              </AwaitingContent>
            )}

            <AwaitingContent what="About this service">
              An overview, the conditions treated and the procedures offered are
              published from information supplied by LIMS. Until the hospital provides
              them, this page does not describe what happens here rather than guess.
            </AwaitingContent>
          </div>

          <aside className="space-y-4">
            <h2 className="font-serif text-lg font-bold text-brand-dark-base">
              Other {category.name.toLowerCase()}
            </h2>
            <ul className="space-y-1">
              {siblings.map((sibling) => (
                <li key={sibling.slug}>
                  <Link
                    href={serviceHref(sibling)}
                    className="flex min-h-[44px] items-center rounded-lg px-3 text-sm text-brand-dark-base/75 transition-colors hover:bg-brand-mist hover:text-brand-teal"
                  >
                    {sibling.name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>
    </>
  )
}
