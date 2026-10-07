// lib/carousel.ts
//
// The one place every auto-advancing carousel on the site reads its timing from:
// HeroSlideshow and MobileHeroSlideshow today, and anything added after them. A
// carousel that hardcodes its own interval is a carousel that silently drifts out of
// sync with this number the next time someone tunes it here.

import type { CSSProperties } from 'react'

/** How long a slide stays up before auto-advancing. */
export const CAROUSEL_ROTATE_MS = 7500

/**
 * How long the photo takes to change. Long and gentle, never a snap-cut: the soft edge
 * of the mobile slide and the dissolve of the desktop one both need time to be seen as a
 * melt and not as a flicker. Set to 1.8s on 2026-10-07 (was 1.2s) after the edge between
 * the two photos read as too hard.
 */
export const CAROUSEL_TRANSITION_MS = 1800

/*
 * THE TEXT TAKES TURNS WITH THE PHOTO. The old and new text used to fade on the same clock,
 * so for a moment the new quote sat over the old photo and the old headline showed through
 * the new slide. Now the leaving text goes first, the photo changes while there is no text
 * to compete with it, and the arriving text comes in when the photo has mostly settled:
 *
 *   0ms        500ms             1000ms           1700ms 1800ms
 *   old text out ----|  (no text)  |---- new text in ----|
 *   |============== photo changes over the whole 1800ms ==============|
 */
export const CAROUSEL_TEXT_OUT_MS = 500
export const CAROUSEL_TEXT_IN_DELAY_MS = 1000
export const CAROUSEL_TEXT_IN_MS = 700

/**
 * The transition for one slide's text block, for `style`. Pass whether the block is the
 * active slide's. The active block fades IN after a delay; the inactive one fades OUT at
 * once and quickly. Opacity is set by the caller's class; this only supplies the timing,
 * because the timing depends on the direction of the change and a class cannot say that.
 */
export function carouselTextTransition(isActive: boolean): CSSProperties {
  return isActive
    ? {
        transitionProperty: 'opacity',
        transitionDuration: `${CAROUSEL_TEXT_IN_MS}ms`,
        transitionDelay: `${CAROUSEL_TEXT_IN_DELAY_MS}ms`,
        transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
      }
    : {
        transitionProperty: 'opacity',
        transitionDuration: `${CAROUSEL_TEXT_OUT_MS}ms`,
        transitionDelay: '0ms',
        transitionTimingFunction: 'ease-in',
      }
}
