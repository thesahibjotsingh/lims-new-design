// lib/nav-i18n.ts
//
// Maps a primaryNav entry's href to its messages/*.json key under `nav`, so
// MobileMenu, PrimaryNavBar and Footer — the three consumers of
// lib/site-config.ts's primaryNav — can all resolve the same translated
// label from the same lookup instead of three components each guessing at
// a mapping and drifting apart. Keyed by href rather than by array index or
// label text: hrefs are the one thing on a NavItem guaranteed stable and
// unique (see serviceHref()'s own reasoning), where a label could be
// retyped and an index shifts the moment an entry is added.
//
// A missing entry is not an error — see translatedNavLabel below — so this
// only needs a key for the items messages/*.json actually has a `nav.*`
// translation for.

import type { NavItem } from '@/types'

export const NAV_KEY_BY_HREF: Record<string, string> = {
  '/specialities': 'specialities',
  '/doctors': 'findADoctor',
  '/services': 'services',
  '/health-packages': 'healthPackages',
  '/patient-care': 'patientCare',
  '/health-library': 'healthLibrary',
  '/about': 'aboutLims',
  '/contact': 'contactUs',
  // lib/site-config.ts's patientServicesNav — the footer's fourth column,
  // not part of primaryNav, but the same href-keyed lookup works for it.
  '/appointments': 'bookAppointment',
  '/patient-care/visitors': 'visitorInformation',
  '/patient-care/insurance': 'insuranceBilling',
  '/contact#locations': 'locationsDirections',
  '/portal': 'patientPortal',
}

export const OVERVIEW_KEY_BY_HREF: Record<string, string> = {
  '/specialities': 'allSpecialities',
  '/services': 'allDiagnostics',
  '/patient-care': 'allPatientServices',
}

/**
 * A NavItem's translated label, falling back to its real English label when
 * there's no `nav.*` key for it yet — never a blank, and never a crash on a
 * nav entry this file hasn't been told about.
 */
export function translatedNavLabel(item: NavItem, t: (key: string) => string): string {
  const key = NAV_KEY_BY_HREF[item.href]
  return key ? t(key) : item.label
}

export function translatedOverviewLabel(
  item: NavItem,
  t: (key: string) => string,
): string | undefined {
  if (!item.overviewLabel) return undefined
  const key = OVERVIEW_KEY_BY_HREF[item.href]
  return key ? t(key) : item.overviewLabel
}

/**
 * A dropdown child's slug, recovered from its href rather than stored
 * separately — primaryNav's children are built by site-config.ts as
 * `serviceHref(service)`, always `${basePath}/${slug}`, so the last path
 * segment IS the slug by construction.
 */
export function slugFromHref(href: string): string {
  return href.split('/').filter(Boolean).pop() ?? ''
}
