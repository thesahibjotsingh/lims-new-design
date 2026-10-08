// components/home/ServiceRail.tsx
//
// One group of the catalogue as a swipe row, for the home page on a phone.
//
// WHY A ROW. The catalogue is 26 services in three groups (lib/services.ts says why the grouping is
// the navigation). As tiles they were a screen and a half of list on a phone; as a row they are the
// height of one card. Every card is a real link to the service's own page, and the last card goes to
// the group's index, so nothing is reachable only by swiping.
//
// It replaces DepartmentRails, which put the three groups behind a switch under one heading. The home
// page now follows the menu (Specialities, Services, Patient care are separate stops on the way
// down), so each group is its own section with its own heading, and there is nothing to switch.
//
// Server component: there is no state any more, so no JavaScript is shipped for it.

import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { ArrowRightIcon } from '@/components/icons'
import { ServiceIcon } from '@/components/primitives/ServiceIcon'
import {
  getCategory,
  serviceHref,
  servicesByCategory,
  type ServiceCategory,
} from '@/lib/services'
import { translatedServiceName } from '@/lib/services-i18n'

/** The menu's own label for each group, and the label on the last card. */
export const GROUP_KEYS = {
  clinical: { heading: 'specialities', all: 'allSpecialities' },
  diagnostics: { heading: 'services', all: 'allDiagnostics' },
  support: { heading: 'patientCare', all: 'allPatientServices' },
} as const

export async function ServiceRail({ categoryId }: { categoryId: ServiceCategory }) {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations('home')
  const tNav = await getTranslations('nav')
  const category = getCategory(categoryId)
  const services = servicesByCategory(categoryId)
  const keys = GROUP_KEYS[categoryId]
  const headingId = `home-${categoryId}`

  return (
    <section aria-labelledby={headingId}>
      <div className="flex items-baseline justify-between gap-3 px-5 pt-8">
        <h2
          id={headingId}
          className="font-serif text-[22px] font-bold leading-tight tracking-tight text-brand-dark-base"
        >
          {tNav(keys.heading)}
        </h2>
        <Link
          href={category.basePath}
          className="-my-2 shrink-0 py-2 text-[13px] font-semibold text-brand-teal"
        >
          {t('launcherSeeAll', { count: services.length })}
        </Link>
      </div>

      <ul className="mt-3 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-5 pb-1.5 [scroll-padding-left:1.25rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {services.map((service) => (
          <li key={service.slug} className="w-32 shrink-0 snap-start">
            <Link
              href={serviceHref(service)}
              className="press flex h-full min-h-[116px] flex-col justify-between gap-2.5 rounded-[18px] bg-white p-3 shadow-[0_0_0_1px_rgba(15,91,102,0.13),0_10px_20px_-16px_rgba(11,20,22,0.35)]"
            >
              <ServiceIcon slug={service.slug} size={46} />
              <span className="text-[13.5px] font-semibold leading-tight text-brand-dark-base">
                {translatedServiceName(service.slug, locale)}
              </span>
            </Link>
          </li>
        ))}
        <li className="w-32 shrink-0 snap-start">
          <Link
            href={category.basePath}
            className="press focus-ring-inverse flex h-full min-h-[116px] flex-col justify-center gap-2 rounded-[18px] bg-brand-teal p-3 text-[15px] font-semibold leading-tight text-white"
          >
            {tNav(keys.all)}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </li>
      </ul>
    </section>
  )
}
