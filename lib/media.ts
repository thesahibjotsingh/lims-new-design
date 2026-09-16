// lib/media.ts
//
// Photography used in the marketing surfaces (hero, section headers).
//
// These are STOCK IMAGES, not LIMS's own wards, theatres or staff. That is fine for a
// design build and NOT fine at launch: a hospital site showing someone else's operating
// theatre as its own is a straightforward misrepresentation. Swap `src` for LIMS's own
// photography before this goes live — the alt text below describes the *intended*
// subject, so it stays accurate once the real photograph replaces the placeholder.
//
// No stock photograph is ever captioned with a named LIMS doctor. A stock portrait
// labelled "Dr Shweta Godara" is an invented likeness of a real person.

import type { ImageAsset } from '@/types'

/**
 * The home hero's full-bleed background.
 *
 * Composed with its subject on the right and a flat teal field across the left two
 * thirds, so the headline sits on colour rather than on a photograph. Decorative: the
 * <h1> says what the page is, and "a doctor with folded arms" read out before it would
 * be noise. Built by scripts/build_assets.py — 1.4 MB of PNG becomes 33 KB of WebP.
 */
export const heroBanner: ImageAsset = {
  src: '/hero-banner.webp',
  alt: '',
  width: 1916,
  height: 821,
}

/**
 * The hero's second slide — a quote card built in Canva, text baked into the pixels
 * rather than live HTML.
 *
 * That means alt text is the ONLY way a screen reader learns what this slide says, so
 * it can't be empty like `heroBanner` above. It is deliberately narrower than what the
 * image actually shows, though: the card's own copy credits "Senior Consultant" and
 * lists Laparoscopic Surgery and Aesthetic & Cosmetic Gynaecology, neither of which
 * lib/doctors.ts has on record for her (MS, Obstetrics & Gynaecology, no designation
 * on file). This alt text repeats only what her verified record supports — get the
 * card itself corrected or the designation confirmed before this alt text (or the
 * image) claims more.
 */
export const heroBannerSecondary: ImageAsset = {
  src: '/hero-banner-2.webp',
  alt: "Dr. Shweta Godara, Obstetrics & Gynaecology consultant at LIMS: “Every woman deserves compassionate, evidence-based care through every stage of life.”",
  width: 1916,
  height: 821,
}

export const heroImage: ImageAsset = {
  src: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1400&q=80',
  alt: 'Clinical team conferring in a hospital corridor',
  width: 1400,
  height: 1050,
}

export const heroImageMobile: ImageAsset = {
  src: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=900&q=80',
  alt: 'Clinical team conferring in a hospital corridor',
  width: 900,
  height: 506,
}
