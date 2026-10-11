// lib/search/direct.ts
//
// DIRECT ANSWERS to the everyday questions: when the best result for a search is one of the hospital's practical
// entries (its phone number, where it is, opening hours, booking, the emergency number), the results page answers
// in a sentence and offers the action, instead of only listing the page that has it.
//
// EVERY FACT HERE IS ONE THE SITE ALREADY STATES (lib/site-config.ts and the practical entries in pages.ts). Where
// the hospital has not published an answer (prices, insurance, visiting hours), the answer says so and gives the
// phone number, exactly as those entries do. Nothing is guessed. The sentences are in messages/*.json
// (searchPage.direct*); this file only says WHICH sentence goes with WHICH entry and what the buttons are.

import { contact, directionsUrl, primaryLocation, whatsappUrl } from '@/lib/site-config'
import type { SearchHit } from '@/lib/search/types'

export type DirectText =
  | 'directTimings'
  | 'directEmergency'
  | 'directPhone'
  | 'directBooking'
  | 'directPrices'
  | 'directInsurance'
  | 'directWhatsappText'
  | 'directAddress'

export type DirectLabel = 'directDirections' | 'directCall' | 'directBook' | 'directWhatsapp' | 'directDoctors'

export interface DirectAction {
  label: DirectLabel
  href: string
  external?: boolean
  /** The number a call button shows. */
  number?: string
}

export interface DirectAnswer {
  text: DirectText
  /** What the sentence needs filled in. */
  params: { number?: string; address?: string }
  actions: DirectAction[]
}

const address = [...primaryLocation.addressLines, primaryLocation.city, `${primaryLocation.state} ${primaryLocation.pincode}`].join(', ')

const callGeneral: DirectAction = { label: 'directCall', href: `tel:${contact.secondary}`, external: true, number: contact.secondaryDisplay }
const callEmergency: DirectAction = { label: 'directCall', href: `tel:${contact.primary}`, external: true, number: contact.primaryDisplay }
const whatsapp: DirectAction = { label: 'directWhatsapp', href: whatsappUrl(''), external: true }

/** The answer that goes with each practical entry of pages.ts. */
const BY_ID: Record<string, DirectAnswer> = {
  'info:timings': {
    text: 'directTimings',
    params: {},
    actions: [{ label: 'directDoctors', href: '/doctors' }, callGeneral],
  },
  'action:emergency': { text: 'directEmergency', params: { number: contact.primaryDisplay }, actions: [callEmergency] },
  'action:call': { text: 'directPhone', params: { number: contact.secondaryDisplay }, actions: [callGeneral, whatsapp] },
  'action:whatsapp': { text: 'directWhatsappText', params: { number: contact.secondaryDisplay }, actions: [whatsapp] },
  'page:appointments': {
    text: 'directBooking',
    params: { number: contact.secondaryDisplay },
    actions: [{ label: 'directBook', href: '/appointments' }, callGeneral],
  },
  'action:directions': {
    text: 'directAddress',
    params: { address },
    actions: [{ label: 'directDirections', href: directionsUrl ?? '/contact', external: Boolean(directionsUrl) }, callGeneral],
  },
  'page:contact': {
    text: 'directAddress',
    params: { address },
    actions: [{ label: 'directDirections', href: directionsUrl ?? '/contact', external: Boolean(directionsUrl) }, callGeneral],
  },
  'info:prices': { text: 'directPrices', params: { number: contact.secondaryDisplay }, actions: [callGeneral] },
  'info:insurance': { text: 'directInsurance', params: { number: contact.secondaryDisplay }, actions: [callGeneral] },
}

interface Situation {
  mode: 'match' | 'weak' | 'none'
  emergency: boolean
  distress?: boolean
}

/**
 * The direct answer for a search, or null. Only when the search found what it was asked for (not a near miss) and
 * the first result is one of the practical entries; never for an emergency (the red card is the answer) or distress.
 */
export function pickDirect(hits: SearchHit[], result: Situation | null): DirectAnswer | null {
  if (!result || result.mode !== 'match' || result.emergency || result.distress) return null
  const top = hits[0]
  if (!top || (top.coverage ?? 0) < 0.999 || !top.strong) return null
  return BY_ID[top.id] ?? null
}
