// components/service/PhoneActions.tsx
//
// The two buttons a phone gets on a service page: what to do first, and where to go. The same
// two buttons appear twice, once in the hero (ServiceHero) and once in a floating bar that takes
// over when the hero has scrolled away (PhoneActionBar), so the choice of WHICH two lives here
// and both read it.
//
//   Emergency Services, Ambulance   Call emergency  +  Directions   (no appointments are taken)
//   Pharmacy                        Call            +  Directions   (a visit, not a booking)
//   everything else                 Book appointment  +  Call
//
// Always two buttons, matching pills. There was a round green WhatsApp button between them; it was
// a third shape and a third colour in a row of two, and it looked out of place, so it is gone from
// the inner pages. WhatsApp is still one tap away from the menu, the phone home page, the Contact
// page and the desktop header.
//
// This module has no 'use client' on purpose: the hero is a server component and the bar is a
// client one, and both import the button from here.

import { Link } from '@/i18n/navigation'
import { CalendarIcon, PhoneIcon, RouteIcon } from '@/components/icons'
import { contact, directionsUrl } from '@/lib/site-config'

export interface PhoneAction {
  kind: 'emergency' | 'book' | 'call' | 'directions'
  href: string
  label: string
  /** The first button is wider and filled; the second is an outline. */
  primary: boolean
  /** Opens outside the site (a map), in a new tab. */
  external?: boolean
  /** The accessible name where it must say more than the label (which department a booking is for). */
  ariaLabel?: string
}

export interface PhoneActionLabels {
  callEmergency: string
  call: string
  directions: string
  book: string
  /** "Request an appointment: {name}" for this department. */
  bookAria: string
}

export function buildPhoneActions({
  slug,
  bookHref,
  emergencyFirst,
  noAppointment,
  labels,
}: {
  slug: string
  /** Where Book goes if not the department's own form (a consultant's profile books with that doctor). */
  bookHref?: string
  /** Emergency and ambulance: lead with the emergency number. */
  emergencyFirst: boolean
  /** Emergency, ambulance and pharmacy are not booked ahead. */
  noAppointment: boolean
  labels: PhoneActionLabels
}): PhoneAction[] {
  const directions: PhoneAction | null = directionsUrl
    ? { kind: 'directions', href: directionsUrl, label: labels.directions, primary: false, external: true }
    : null

  if (emergencyFirst) {
    return [
      { kind: 'emergency', href: `tel:${contact.primary}`, label: labels.callEmergency, primary: true },
      ...(directions ? [directions] : []),
    ]
  }
  if (noAppointment) {
    return [
      { kind: 'call', href: `tel:${contact.secondary}`, label: labels.call, primary: true },
      ...(directions ? [directions] : []),
    ]
  }
  return [
    {
      kind: 'book',
      href: bookHref ?? `/appointments?department=${slug}`,
      label: labels.book,
      primary: true,
      ariaLabel: labels.bookAria,
    },
    { kind: 'call', href: `tel:${contact.secondary}`, label: labels.call, primary: false },
  ]
}

const ICON = {
  emergency: PhoneIcon,
  call: PhoneIcon,
  book: CalendarIcon,
  directions: RouteIcon,
} as const

/**
 * `onDark` is the hero (white outline on teal); `onLight` is the floating bar (teal outline on
 * frosted white). Only the quiet button and the filled call change between the two.
 */
export function ActionButton({
  action,
  surface,
}: {
  action: PhoneAction
  surface: 'onDark' | 'onLight'
}) {
  const Icon = ICON[action.kind]
  const tone =
    action.kind === 'emergency'
      ? 'bg-brand-emergency text-white shadow-[0_10px_20px_-10px_rgba(198,40,40,0.8)]'
      : action.kind === 'book'
        ? 'bg-brand-copper text-white shadow-[0_10px_20px_-12px_rgba(194,110,78,0.9)]'
        : action.primary
          ? surface === 'onDark'
            ? 'bg-white text-brand-teal'
            : 'bg-brand-teal text-white'
          : surface === 'onDark'
            ? 'border-[1.5px] border-white/55 text-white'
            : 'border-[1.5px] border-brand-teal/30 bg-white text-brand-teal'
  const className = [
    'press focus-ring-inverse inline-flex h-12 min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 text-[15px] font-bold max-[359px]:gap-1.5 max-[359px]:px-2.5 max-[359px]:text-sm',
    action.primary ? 'flex-[1.6]' : 'flex-1',
    tone,
  ].join(' ')
  const content = (
    <>
      {/* On the narrowest phones the label needs the room more than the icon does. */}
      <Icon className="h-[18px] w-[18px] shrink-0 max-[339px]:hidden" />
      <span className="truncate">{action.label}</span>
    </>
  )

  if (action.href.startsWith('/')) {
    return (
      <Link href={action.href} aria-label={action.ariaLabel} className={className}>
        {content}
      </Link>
    )
  }
  return (
    <a
      href={action.href}
      className={className}
      {...(action.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      {content}
    </a>
  )
}
