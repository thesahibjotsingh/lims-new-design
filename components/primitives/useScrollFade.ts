// components/primitives/useScrollFade.ts
//
// A soft fade at the ends of a row that scrolls sideways, so a card or pill is never sliced off by
// the edge of the screen with nothing to say "there is more". Every swipe row on the site uses it
// (through <FadeScroller>, or this hook where the row already has a ref).
//
// IT IS A MASK, NOT AN OVERLAY. The row's own content is made transparent towards each end, so
// whatever is behind it shows through: white on a white band, the pale mist on a mist one, teal in
// the hero. Nothing is painted over the cards, so there is no strip of the wrong colour to match,
// and it is right on a dark section as well as a light one.
//
// EACH END FADES ONLY WHILE THERE IS MORE TO SCROLL THAT WAY, and eases in over the first RAMP_PX
// of scrolling (it does not appear all at once the moment a finger moves). At rest only the right
// end fades: the first card starts a full margin in and needs none. At the last card only the
// left does, so the final card is shown whole.
//
// NO REACT STATE. The fade is written straight to the element's style on scroll: a re-render per
// scroll event would be work for nothing. The mask is removed entirely when neither end fades, and
// when the row is not scrolling (a wide screen where the same list wraps into a grid, with
// shadows that a mask would clip).
//
// The longer, per-row fade of the doctor roster slider (components/home/RosterSlider.tsx) is its
// own and is left as it is.

import { useCallback, useEffect, useRef, type RefObject } from 'react'

/** How far in from each end the fade runs. Subtle: about the width of a pill's rounded end. */
const FADE_PX = 28
/** The first this-many pixels of scrolling bring a fade in from nothing. */
const RAMP_PX = 24
const STEPS = [0, 0.25, 0.5, 0.75, 1]
const smooth = (t: number) => 3 * t * t - 2 * t * t * t

// `--fl` and `--fr` are how much of each fade is showing, 0 to 1. A stop's position is a fraction
// of the fade length, so at 0 every stop sits on the edge and that end is simply solid.
const MASK = `linear-gradient(to right, ${[
  ...STEPS.map(
    (t) => `rgb(0 0 0 / ${smooth(t).toFixed(3)}) calc(var(--fl) * ${(t * FADE_PX).toFixed(1)}px)`,
  ),
  ...[...STEPS]
    .reverse()
    .map(
      (t) =>
        `rgb(0 0 0 / ${smooth(t).toFixed(3)}) calc(100% - var(--fr) * ${(t * FADE_PX).toFixed(1)}px)`,
    ),
].join(', ')})`

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

/**
 * @param ref   the row's own ref, if it already has one (SectionNav); otherwise one is made.
 * @param watch anything that changes when the row's contents do (a count, a language), so the
 *              fade is worked out again.
 */
export function useScrollFade<T extends HTMLElement>(
  ref?: RefObject<T | null>,
  watch?: string | number,
) {
  const ownRef = useRef<T>(null)
  const target = ref ?? ownRef

  const update = useCallback(() => {
    const el = target.current
    if (!el) return
    const room = el.scrollWidth - el.clientWidth
    const left = room > 1 ? clamp01(el.scrollLeft / RAMP_PX) : 0
    const right = room > 1 ? clamp01((room - el.scrollLeft) / RAMP_PX) : 0
    if (left === 0 && right === 0) {
      el.style.removeProperty('mask-image')
      el.style.removeProperty('-webkit-mask-image')
      return
    }
    el.style.setProperty('--fl', left.toFixed(3))
    el.style.setProperty('--fr', right.toFixed(3))
    el.style.setProperty('mask-image', MASK)
    el.style.setProperty('-webkit-mask-image', MASK)
  }, [target])

  useEffect(() => {
    update()
    const el = target.current
    if (!el || typeof ResizeObserver === 'undefined') return
    // The row itself (the window changed) and each item in it (its contents changed size).
    const observer = new ResizeObserver(update)
    observer.observe(el)
    Array.from(el.children).forEach((child) => observer.observe(child))
    return () => observer.disconnect()
  }, [update, target, watch])

  return { ref: target, onScroll: update }
}
