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
 * The hero's second slide — background photo only.
 *
 * The quote and her name used to be baked into this image as pixels (a Canva export);
 * that text blurred at display size and was invisible to a screen reader except
 * through alt text. Both are now live HTML in DesktopHero's `secondSlide`, so this
 * asset only needs to identify who's in the photo, the same as any other doctor
 * portrait — see the `alt` convention on `portrait` in lib/doctors.ts.
 */
export const heroBannerSecondary: ImageAsset = {
  src: '/hero-banner-2.webp',
  alt: 'Portrait of Dr. Shweta Godara',
  width: 1915,
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
