// lib/carousel.ts
//
// The one place every auto-advancing carousel on the site reads its timing from —
// HeroSlideshow and MobileHeroSlideshow today, and anything added after them. A
// carousel that hardcodes its own interval is a carousel that silently drifts out of
// sync with this number the next time someone tunes it here.

/** How long a slide stays up before auto-advancing. */
export const CAROUSEL_ROTATE_MS = 7500

/** Crossfade duration between slides — long and gentle, not a snap-cut. */
export const CAROUSEL_TRANSITION_MS = 1200
