// lib/google-listing.ts
//
// What we know about the hospital's Google Maps listing, read from the listing itself on
// 2026-10-07. Nothing here is invented; every value was on the page.
//
// THE NAME DIFFERS. Google lists the place as "Life Line Hospital", not LIMS. The owner
// replies to reviews on it, so the hospital manages it, and the address and pin match. Do
// not "fix" the name in a link: the place is found by its id, not its title.
//
// THE RATING IS A SNAPSHOT. `rating` and `reviewCount` change every time someone reviews,
// and a website cannot read them live without a paid API. They are shown with the date they
// were read (`readOn`), so a visitor is told how fresh the figure is, and they are the full
// picture next to the handful of quotes chosen in lib/reviews.ts. Re-read them before launch
// and after any large change; an out-of-date star count on a hospital page is a claim.
//
// THE PHONE AND SITE ON THE LISTING ARE NOT OURS. It shows 089500 11000 and
// lifelinehisar.com; the hospital confirmed (2026-10-07) that the published numbers on this
// site are the right ones, so those two values are deliberately not copied here.

import { primaryLocation } from '@/lib/site-config'

/** Google's own id for the place. Stable, unlike a title or an address. */
const CID = '15887528500291526880'

export const googleListing = {
  nameOnGoogle: 'Life Line Hospital',
  /** Opens the place in Google Maps (web and the app). */
  placeUrl: `https://maps.google.com/?cid=${CID}`,
  rating: 3.3,
  reviewCount: 102,
  /** ISO date the rating and count above were read from the listing. */
  readOn: '2026-10-07',
} as const

/**
 * The nearest Street View panorama to the building, about ten metres from the pin, on the
 * road the building faces. `heading` points the camera from the panorama towards the pin
 * (calculated from the two coordinates), so the visitor opens on the building and not on
 * an arbitrary direction.
 */
export const streetView = {
  panoId: '8m2XhrspglYa5v3JRq3daQ',
  lat: 29.1336942,
  lng: 75.7461012,
  heading: 117,
  // Tilted up 10 degrees and a little wider than Google's default (0.78; lower is wider).
  // Compared side by side on 2026-10-07: the default cropped the top of the building and its
  // sign; a 12 degree tilt showed the whole building with sky above it; zooming out to 0.4
  // showed it small among the street. This sits between the last two, so the building and
  // its LIFELINE HOSPITAL sign are whole in a landscape frame and still readable in a phone's.
  pitch: 10,
  zoom: 0.6,
} as const

const geo = primaryLocation.geo ?? { lat: 29.1336255, lng: 75.7462539 }

/**
 * Keyless Google embeds. Both are iframe sources and are only ever loaded after the visitor
 * asks for them (components/contact/MapEmbed.tsx): an embed sets third-party cookies the
 * moment it loads, which is not something to do before anyone has agreed to it.
 */
export const embedUrls = {
  map: `https://maps.google.com/maps?q=${geo.lat},${geo.lng}&hl=en&z=17&output=embed`,
  streetView:
    `https://www.google.com/maps/embed?pb=!4v1!6m8!1m7!1s${streetView.panoId}` +
    `!2m2!1d${streetView.lat}!2d${streetView.lng}!3f${streetView.heading}!4f${streetView.pitch}!5f${streetView.zoom}`,
} as const
