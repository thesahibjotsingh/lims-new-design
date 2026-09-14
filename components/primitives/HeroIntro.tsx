'use client'

// components/primitives/HeroIntro.tsx
//
// The opening on inner pages: the banner shows at full size, then shrinks to a slim
// strip that keeps the eyebrow and title while the content slides up under it. It
// shrinks after a pause OR as soon as the reader scrolls down, whichever comes first,
// and stays shrunk for the rest of the visit to that page — scrolling back up does not
// grow it again. The page itself is never scrolled for them.
//
// This component only flips `data-collapsed` on the banner. Everything visual — the
// heights, the fade on the intro, the timing — lives in PageShell as
// `group-data-[collapsed]/banner:` classes, so the look stays next to the markup it
// changes.
//
// Guards:
//
//  1. A CLICK OR A KEY STOPS THE TIMER, NOT THE SCROLL RULE. Someone who has clicked
//     into the doctor search box, or reached for the emergency number, is not shifted
//     on a timer while they do it. If they then scroll down, the banner shrinks as it
//     would for anyone.
//  2. `prefers-reduced-motion` skips it. The banner simply stays full size.
//  3. Desktop only. Below 1024px the banner is already compact.

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

/** How long the banner holds at full size before it shrinks on its own. */
const HOLD_MS = 3000

/** Desktop only. Matches the `lg` breakpoint. */
const DESKTOP = '(min-width: 1024px)'

/**
 * How far down the page has to move to count as the reader scrolling.
 *
 * The browser fires scroll events of its own during load — restoring a position,
 * settling layout — with the position unchanged, so any event at all is not evidence.
 */
const SCROLL_THRESHOLD = 4

export function HeroIntro() {
  const pathname = usePathname()
  const markerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const found = markerRef.current?.closest('header')
    if (!found) return
    // Re-bound as non-null: TypeScript does not carry the check above into the function
    // declarations below, because they are hoisted above it.
    const banner: HTMLElement = found

    if (!window.matchMedia(DESKTOP).matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const startedAt = window.scrollY

    function collapse() {
      stopListening()
      if (banner.hasAttribute('data-collapsed')) return
      // Pin the artwork at the height it has now. The image is sized to the band's
      // height, so without this it would shrink with the band — a small picture in a
      // slim strip — instead of staying put and being cropped to a window onto it.
      banner.style.setProperty('--banner-h', `${banner.offsetHeight}px`)
      banner.setAttribute('data-collapsed', '')
    }

    // Guard 1: a hand on the page cancels the timer only. The scroll listener stays.
    function stopTimer() {
      clearTimeout(timer)
      window.removeEventListener('pointerdown', stopTimer)
      window.removeEventListener('keydown', stopTimer)
    }

    /*
     * Downward only, measured from where the page was when the effect ran. If the
     * collapse lands while the reader is partway down, the height it gives up comes off
     * above the viewport and the browser's scroll anchoring keeps their place.
     */
    function onScroll() {
      if (window.scrollY - startedAt > SCROLL_THRESHOLD) collapse()
    }

    function stopListening() {
      stopTimer()
      window.removeEventListener('scroll', onScroll)
    }

    // No event can dispatch before this synchronous effect finishes, so the listeners'
    // references to `timer` never see it uninitialised.
    const timer = setTimeout(collapse, HOLD_MS)
    window.addEventListener('pointerdown', stopTimer, { passive: true })
    window.addEventListener('keydown', stopTimer)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      stopListening()
      // The transition classes only exist while collapsed, so this snaps back rather
      // than animating open if the same header is reused by the next page.
      banner.removeAttribute('data-collapsed')
      banner.style.removeProperty('--banner-h')
    }
  }, [pathname])

  // Renders nothing visible. It exists to give the effect a DOM anchor inside the
  // banner, so the component does not have to guess at a selector for it.
  return <span ref={markerRef} aria-hidden="true" className="hidden" />
}
