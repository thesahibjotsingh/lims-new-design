// lib/site-config.ts
//
// Single source of truth for navigation, contact details and locations.
//
// Contact details below are REAL, transcribed from the official LIMS card:
//   Jindal Chowk, Hisar · 9254984121, 9254984122 · limshisar.com
//
// Which number serves which purpose is confirmed — see the note on `contact` below.
//
// CONFIRMED 2026-10-08 from the hospital's own WhatsApp Business profile (the one on 84121),
// which the user supplied: it is "Open 24 hours" on every day of the week, its description says
// "24×7 Emergency Care", it names a grievance officer, and it gives limshisar.com as the website.
// Those four are now used on the site (hours, the about text, the grievance officer, the domain).
// Still unconfirmed: whether there's a separate ambulance line, and OPD / pharmacy / lab hours.

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
  // This is the short factual line: the page <title>/<meta> description and the structured data.
  description:
    'Multi-speciality hospital at Jindal Chowk, Hisar, Haryana: 24×7 emergency care, ' +
    'surgery, orthopaedics, obstetrics and gynaecology, with diagnostics, imaging and ' +
    'pathology on the same campus.',
  /**
   * The hospital's own words about itself, from its WhatsApp Business profile (2026-10-08),
   * verbatim. They are LIMS's description of LIMS, not ours: "modern facilities" and
   * "trusted medical expertise" are claims the hospital makes. Shown on the About page, the home
   * page and wherever the hospital introduces itself.
   */
  about: {
    headline: 'Where Care Meets Excellence.',
    body:
      'Dedicated to providing compassionate, safe and patient-centered healthcare with trusted ' +
      'medical expertise and modern facilities. Our team is committed to delivering the right ' +
      'care, at the right time, with dignity and compassion.',
    highlights: ['24×7 Emergency Care', 'Specialist Services', 'Patient First'] as const,
    promise: 'Patient Care Is Our Promise',
  },
  url: 'https://limshisar.com',
  urlDisplay: 'limshisar.com',
} as const

/**
 * The hospital is open at all hours on all seven days (its Business profile says so for every
 * day). That is the HOSPITAL: a consultant's OPD timings, the pharmacy's and the lab's are not
 * supplied and are not claimed. Used for the structured data and the Contact page.
 */
export const openAllHours = true

/**
 * The grievance officer, as named on the hospital's WhatsApp Business profile (2026-10-08).
 * The numbers are the two published lines; no email address was given for the officer, so none is
 * shown. The name is transliterated for Hindi and Punjabi in lib/site-i18n.ts.
 */
export const grievanceOfficer = {
  name: 'Sunil Kumar',
} as const

/**
 * The two published LIMS numbers.
 *
 * Role assignment confirmed 2026-09-24: 84121 is the reception desk, 84122 is
 * answered in an emergency. (Previously reversed here — the card itself prints both
 * numbers with no labels, and the original guess used the conventional "first number
 * = emergency" split, which was wrong.) `primary` stays the name used everywhere in
 * the UI for the emergency line and `secondary` for the reception/appointments line;
 * only the digits underneath moved.
 *
 * Still unconfirmed: whether there is a separate ambulance number. The top tier has a
 * slot for one and currently renders without it rather than pointing at a guess.
 * (Round-the-clock cover IS confirmed now: see the note at the top of this file.)
 */
export const contact = {
  primary: '+919254984122',
  primaryDisplay: '+91 92549 84122',
  secondary: '+919254984121',
  secondaryDisplay: '+91 92549 84121',
  /**
   * The appointments line is also the hospital's WhatsApp Business number (confirmed from the
   * business profile, 2026-10-08), in the international form wa.me wants: no plus, no spaces.
   */
  whatsapp: '919254984121',
  /** TODO: dedicated ambulance line, if LIMS operates one. */
  ambulance: undefined as string | undefined,
  ambulanceDisplay: undefined as string | undefined,
} as const

/** A WhatsApp chat with the hospital, opened with `message` already typed in the box. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`
}

export const primaryLocation: Location = {
  id: 'hisar-main',
  name: 'LIMS Hisar',
  // The full postal address, supplied by the hospital 2026-10-07 and matching the one on its
  // Google Maps listing (which spells "Extension" as "Exyension"; that is Google's typo).
  // "Jindal Hospital" is the building name on that address and is kept because it is how the
  // address is written on the hospital's own listing.
  addressLines: [
    'Jindal Hospital',
    'Plot No. 6, Main Road',
    'Near Jindal Chowk - Raipur Road',
    'Dayanand Colony',
    'New Model Town Extension, Model Town',
  ],
  city: 'Hisar',
  state: 'Haryana',
  pincode: '125001',
  // The pin on the hospital's Google Maps listing.
  geo: { lat: 29.1336255, lng: 75.7462539 },
  phone: contact.primary,
  phoneDisplay: contact.primaryDisplay,
}

/**
 * The address in one line, in postal order: building, street, area, city, state, PIN.
 * For the Contact and About pages, the visitor page, the appointment page and the
 * structured data, where there is room.
 */
export function fullAddress(location: Location = primaryLocation): string {
  const region = [location.state, location.pincode].filter(Boolean).join(' ')
  return [...location.addressLines, location.city, region].join(', ')
}

/**
 * Where to find us in five words, for the hero eyebrow, the home page index and any other
 * tight spot. The full address above runs to a paragraph and does not fit beside a headline.
 */
export const shortAddress = 'Jindal Chowk, Hisar, Haryana'

/** Opens turn-by-turn directions to the building in Google Maps, from wherever the visitor is. */
export const directionsUrl = primaryLocation.geo
  ? `https://www.google.com/maps/dir/?api=1&destination=${primaryLocation.geo.lat}%2C${primaryLocation.geo.lng}`
  : undefined

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
  { label: 'Visitor information', href: '/patient-care/visitors' },
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
  // `icon` is the basename in public/actions/. Lowercase, because the source art had a
  // capital D in "locations-and-Directions" which resolves on Windows and 404s on the
  // Linux host this deploys to.
  { label: 'Book appointment', href: '/appointments', icon: 'book-an-appointment' },
  { label: 'Find a doctor', href: '/doctors', icon: 'find-a-doctor' },
  { label: 'Locations & directions', href: '/contact#locations', icon: 'locations-and-directions' },
]
