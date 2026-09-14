'use client'

// components/layout/MobileHeader.tsx
//
// A compact header that continuously compacts as the reader scrolls — the badge
// scales down and the emergency label shrinks away, tracking scrollY 1:1 rather than
// snapping past a fixed threshold. That is what makes scrolling back up reverse it
// immediately, with no "let the animation finish first" moment: every frame just
// re-reads the live scroll position, so there is no fire-and-forget transition to a
// target that scrolling up would have to fight or wait out.
//
// Promoted from the "Collapsing" direction explored in the (now removed)
// app/prototypes/mobile-top-nav/ picker — see that history for the two directions not
// taken (a fixed-shape header with only a scroll-edge shadow, and a symmetric
// three-zone layout with the mark centred).
//
// 65px at rest is the budget, not a suggestion: on a 667pt viewport every point spent
// on chrome is a point taken from the hero, and the bottom navigation pill is already
// claiming space at the other end of the screen. Collapsing to 52px past 70px of
// scroll gives a little of that back on a long page, three things fit at 65px and no
// more — the lockup, the emergency call, and the menu — everything else lives in the
// drawer or the bottom pill.
//
// Client component (it was a server component before this): tracking live scroll
// position has no server-renderable equivalent. The beacon is still a CSS animation
// and the drawer is still its own client leaf.

import { useEffect, useState } from 'react'
import { BrandMark } from '@/components/layout/BrandMark'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { PhoneIcon } from '@/components/icons'
import { contact } from '@/lib/site-config'

/** Scroll distance, in px, over which the header goes from resting to fully collapsed. */
const COLLAPSE_RANGE = 70

export function MobileHeader() {
  const [scrollY, setScrollY] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduceMotion(media.matches)
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  // Reduced motion means no scroll-linked movement at all, not a gentler version of
  // it — continuous motion tied to the reader's own scrolling is exactly what that
  // setting exists to remove (WWDC 2018's "avoid full-viewport moving backgrounds"
  // extends to anything coupled to scroll). The header just stays at rest.
  useEffect(() => {
    if (reduceMotion) return
    let raf: number | null = null
    function onScroll() {
      if (raf !== null) return
      raf = requestAnimationFrame(() => {
        raf = null
        setScrollY(window.scrollY)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [reduceMotion])

  const progress = reduceMotion ? 0 : Math.min(Math.max(scrollY / COLLAPSE_RANGE, 0), 1)
  const height = 65 - progress * 13 // 65px -> 52px
  const badgeScale = 1 - progress * 0.18
  const labelMaxWidth = (1 - progress) * 84
  const labelOpacity = Math.max(1 - progress * 1.6, 0)

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between gap-2 bg-brand-teal px-4 lg:hidden"
      style={{ height: `${height}px` }}
    >
      {/*
        Transform-scale, not a smaller BrandMark size prop: `size="compact"` would
        swap in different fixed artwork dimensions at a fixed breakpoint, not track a
        continuous value, and `transform` is the one property here cheap enough to
        recompute on every scroll frame without triggering layout.
      */}
      <div style={{ transform: `scale(${badgeScale})`, transformOrigin: 'left center' }}>
        <BrandMark tone="badge" />
      </div>

      <div className="flex items-center gap-1">
        {/*
          The emergency beacon.

          The ring is aria-hidden decoration; the accessible name is on the link and
          says what the control does and which number it calls, because "Emergency" on
          its own does not tell a screen reader user whether this dials or navigates.
          Red is reserved for this control alone — a red used decoratively elsewhere is
          a red that stops meaning "emergency". The label's own shrink on scroll is
          purely visual (`aria-label` on the link carries the full sentence regardless
          of how little of "Emergency" is currently visible) and the icon plus the tap
          target never shrink below the 44px `.tap-target` floor.
        */}
        <a
          href={`tel:${contact.primary}`}
          aria-label={`Call the emergency line, ${contact.primaryDisplay}`}
          className="tap-target focus-ring-inverse relative gap-2 rounded-full bg-brand-emergency px-3.5 text-xs font-bold text-white shadow-sm"
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span
              aria-hidden="true"
              className="absolute inline-flex h-full w-full animate-beacon rounded-full bg-white"
            />
            <span
              aria-hidden="true"
              className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white"
            />
          </span>
          <PhoneIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span
            className="overflow-hidden whitespace-nowrap"
            style={{ maxWidth: `${labelMaxWidth}px`, opacity: labelOpacity }}
          >
            Emergency
          </span>
        </a>

        <MobileMenu />
      </div>

      {/*
        Materials cue, not a layout change: a soft edge shadow, opacity-only, fades in
        once there is real content sliding under the bar — the "scroll edge effect,
        not a hard divider" a translucent-reading toolbar wants, in place of the
        static `border-b` this header used before it started moving.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-full h-3 bg-gradient-to-b from-brand-dark-base/15 to-transparent"
        style={{ opacity: progress > 0.05 ? 1 : 0 }}
      />
    </header>
  )
}
