// lib/site-config.ts
//
// Single source of truth for navigation, contact details and locations.
//
// Contact details below are REAL, transcribed from the official LIMS card:
//   Jindal Chowk, Hisar · 9254984121, 9254984122 · www.limshisar.com
//
// What is still an assumption is which number serves which purpose — the card lists
// both numbers without roles. See the note on `contact` before launch.

import { getCategory, serviceHref, servicesByCategory } from '@/lib/services'
import type { Location, NavItem } from '@/types'

export const siteConfig = {
  name: 'Lifeline Institute of Medical Sciences',
  shortName: 'LIMS',
  city: 'Hisar',
  /** The official tagline, as printed on LIMS stationery. */
  tagline: ['Compassion', 'Excellence', 'Care'] as const,
  // Names only services on LIMS's own list. Advertising a department LIMS does not run
  // is not a copy problem — it is a patient arriving for a department that is not there.
  description:
    'Multi-speciality hospital at Jindal Chowk, Hisar, Haryana — emergency care, ' +
    'surgery, orthopaedics, obstetrics and gynaecology, with diagnostics, imaging and ' +
    'pathology on the same campus.',
  url: 'https://www.limshisar.com',
  urlDisplay: 'www.limshisar.com',
} as const

/**
 * The two published LIMS numbers.
 *
 * >>> ROLE ASSIGNMENT IS AN ASSUMPTION — CONFIRM WITH LIMS BEFORE LAUNCH <<<
 *
 * The card prints both numbers with no labels. `primary` is surfaced in the top tier
 * as the emergency line and `secondary` as the appointments line, because that is the
 * conventional split and someone in distress needs *a* number above the fold. But if
 * either line is in fact a reception desk that closes at night, the top bar is telling
 * a patient to call a phone nobody answers — a safety problem, not a copy problem.
 *
 * Three things to confirm with LIMS:
 *   1. Which of the two numbers is answered in an emergency.
 *   2. Whether either line is genuinely 24x7 (no "24x7" claim is made anywhere in the
 *      UI until this is confirmed).
 *   3. Whether there is a separate ambulance number. The top tier has a slot for one
 *      and currently renders without it rather than pointing at a guess.
 */
export const contact = {
  primary: '+919254984121',
  primaryDisplay: '+91 92549 84121',
  secondary: '+919254984122',
  secondaryDisplay: '+91 92549 84122',
  /** TODO: dedicated ambulance line, if LIMS operates one. */
  ambulance: undefined as string | undefined,
  ambulanceDisplay: undefined as string | undefined,
} as const

export const primaryLocation: Location = {
  id: 'hisar-main',
  name: 'LIMS Hisar',
  addressLines: ['Jindal Chowk'],
  city: 'Hisar',
  state: 'Haryana',
  // pincode deliberately omitted — not on the official card, and inventing one puts a
  // wrong postal code into the site's structured data.
  phone: contact.primary,
  phoneDisplay: contact.primaryDisplay,
}

/**
 * Primary navigation — eight items on the teal ribbon tier.
 *
 * THREE SECTIONS, THREE DESTINATIONS. Specialities, Services and Patient care each own
 * a route prefix, and every href below is derived from lib/services.ts rather than
 * written by hand. The categories decide the split, so a service moving between them
 * moves its nav entry and its URL together and neither can be left behind.
 *
 * An entry with `children` renders as a dropdown; without, as a plain link.
 * `overviewLabel` is set only where the parent `href` resolves to a page that exists.
 */
export const primaryNav: NavItem[] = [
  {
    label: 'Specialities',
    href: getCategory('clinical').basePath,
    overviewLabel: 'All specialities',
    children: servicesByCategory('clinical').map((service) => ({
      label: service.name,
      href: serviceHref(service),
    })),
  },
  // The label still goes straight to the directory; the chevron opens a search field.
  { label: 'Find a doctor', href: '/doctors', panel: 'doctor-search' },
  {
    label: 'Services',
    href: getCategory('diagnostics').basePath,
    overviewLabel: 'All diagnostics & imaging',
    children: servicesByCategory('diagnostics').map((service) => ({
      label: service.name,
      href: serviceHref(service),
    })),
  },
  { label: 'Health packages', href: '/health-packages' },
  {
    label: 'Patient care',
    href: getCategory('support').basePath,
    overviewLabel: 'All patient services',
    children: servicesByCategory('support').map((service) => ({
      label: service.name,
      href: serviceHref(service),
    })),
  },
  { label: 'Health library', href: '/health-library' },
  { label: 'About LIMS', href: '/about' },
  {
    label: 'Contact Us',
    href: '/contact',
    overviewLabel: 'All contact details',
    children: [
      { label: 'Locations & directions', href: '/contact#locations' },
      { label: 'Book an appointment', href: '/appointments' },
      { label: 'Insurance & billing', href: '/patient-care/insurance' },
      { label: 'Visitor information', href: '/patient-care/visitors' },
    ],
  },
]

/**
 * Clinical departments, in LIMS's own order, derived from lib/services.ts.
 *
 * Building it from the service catalogue means a nav entry cannot exist without a
 * page behind it.
 */
export const clinicalNav: NavItem[] = servicesByCategory('clinical').map((service) => ({
  label: service.name,
  href: serviceHref(service),
}))

/**
 * Footer slice. Fifteen departments is a wall in a footer column, so it shows the first
 * eight and links out. The cap is a layout decision — nothing is hidden, /specialities
 * has every department.
 */
export const centresNav: NavItem[] = clinicalNav.slice(0, 8)

export const diagnosticsNav: NavItem[] = servicesByCategory('diagnostics').map(
  (service) => ({ label: service.name, href: serviceHref(service) }),
)

export const supportNav: NavItem[] = servicesByCategory('support').map((service) => ({
  label: service.name,
  href: serviceHref(service),
}))

export const patientServicesNav: NavItem[] = [
  { label: 'Book an appointment', href: '/appointments' },
  { label: 'Health check packages', href: '/health-packages' },
  { label: 'Visitor information', href: '/patient-care/visitors' },
  { label: 'Insurance & billing', href: '/patient-care/insurance' },
  { label: 'Locations & directions', href: '/contact#locations' },
  { label: 'Patient portal', href: '/portal' },
]

/**
 * The three-across tile row under the mobile hero.
 *
 * Three is the count the layout is built for — a fourth tile drops to a second row and
 * pushes the service grid below the fold on a 667pt viewport. Each tile is a whole
 * link, so the tap target is the tile, not the icon inside it.
 */
export const mobileQuickActions = [
  { label: 'Book appointment', href: '/appointments', icon: 'calendar' as const },
  { label: 'Find a doctor', href: '/doctors', icon: 'stethoscope' as const },
  { label: 'Departments', href: '/specialities', icon: 'building' as const },
]
