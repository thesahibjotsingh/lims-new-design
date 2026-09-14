'use client'

// components/primitives/HeroIntro.tsx
//
// The opening on inner pages: the banner shows at full size, then after a pause it
// shrinks to a slim strip that keeps the eyebrow and title, and the content slides up
// under it. The page itself never scrolls — the banner changes height and the document
// flow does the rest.
//
// This component only flips `data-collapsed` on the banner. Everything visual — the
// heights, the fade on the intro, the timing — lives in PageShell as
// `group-data-[collapsed]/banner:` classes, so the look stays next to the markup it
// changes.
//
// Moving the page under someone who did not ask for it is a documented nausea trigger,
// and on a hospital site some visitors are already unwell. So it is built to lose
// gracefully:
//
//  1. THE READER WINS. Any sign of a real person before the pause ends — a wheel tick, a
//     key, a tap, a pointer down, a scroll of their own — cancels it for this visit.
//     Someone who started reading, or reached for the emergency number, is never moved.
//  2. `prefers-reduced-motion` skips it. The banner simply stays full size.
//  3. Desktop only. Below 1024px the banner is already compact.
//  4. Never when the page loads already scrolled — a reload partway down, or an anchor.

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

/** How long the banner holds at full size before it shrinks. */
const HOLD_MS = 3000

/** Desktop only. Matches the `lg` breakpoint. */
const DESKTOP = '(min-width: 1024px)'

export function HeroIntro() {
  const pathname = usePathname()
  const markerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const banner = markerRef.current?.closest('header')
    if (!banner) return

    if (!window.matchMedia(DESKTOP).matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.scrollY > 4) return

    const startedAt = window.scrollY

    // Direct evidence of a person: each of these requires a hand on a device.
    const intentEvents: [keyof WindowEventMap, AddEventListenerOptions][] = [
      ['wheel', { passive: true }],
      ['touchstart', { passive: true }],
      ['pointerdown', { passive: true }],
      ['keydown', {}],
    ]

    function cancel() {
      clearTimeout(timer)
      detach()
    }

    /*
     * `scroll` only counts when the page actually moved.
     *
     * The browser fires a scroll event of its own during load — restoring a position,
     * settling layout — with no user involved and the position unchanged at zero.
     * Treating that as intent cancelled the intro on every load.
     */
    function onScroll() {
      if (Math.abs(window.scrollY - startedAt) > 4) cancel()
    }

    function attach() {
      for (const [name, options] of intentEvents) {
        window.addEventListener(name, cancel, options)
      }
      window.addEventListener('scroll', onScroll, { passive: true })
    }
    function detach() {
      for (const [name] of intentEvents) window.removeEventListener(name, cancel)
      window.removeEventListener('scroll', onScroll)
    }

    // Listeners go on after the timer exists: `cancel` clears it, and no event can
    // dispatch before this synchronous effect finishes, so the order is safe.
    const timer = setTimeout(() => {
      detach()
      // Pin the artwork at the height it has now. The image is sized to the band's
      // height, so without this it would shrink with the band — a small picture in a
      // slim strip — instead of staying put and being cropped to a window onto it.
      banner.style.setProperty('--banner-h', `${banner.offsetHeight}px`)
      banner.setAttribute('data-collapsed', '')
    }, HOLD_MS)

    attach()

    return () => {
      clearTimeout(timer)
      detach()
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
