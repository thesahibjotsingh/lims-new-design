'use client'

// components/layout/MobileHeader.tsx
//
// A compact header that continuously compacts as the reader scrolls — the badge
// scales down and the bar itself shortens, tracking scrollY 1:1 rather than
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
// scroll gives a little of that back on a long page, four things fit at 65px and no
// more — the lockup, the emergency call, the language button and the menu — everything
// else lives in the drawer or the bottom pill. To make room for the language button the
// emergency call is a red phone circle with no word beside it (it used to be a pill that
// said "Emergency"); its accessible name still says what it dials.
//
// Client component (it was a server component before this): tracking live scroll
// position has no server-renderable equivalent. The beacon is still a CSS animation
// and the drawer is still its own client leaf.

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { LanguageMenu } from '@/components/layout/LanguageSwitcher'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { PhoneIcon } from '@/components/icons'
import { contact } from '@/lib/site-config'
import { siteText } from '@/lib/site-i18n'

/** Scroll distance, in px, over which the header goes from resting to fully collapsed. */
const COLLAPSE_RANGE = 70

export function MobileHeader() {
  const tEmergency = useTranslations('emergency')
  const tA11y = useTranslations('a11y')
  const text = siteText(useLocale() as Locale)
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

  return (
    <header
      className={[
        'sticky top-0 z-50 flex items-center justify-between gap-2 px-4 lg:hidden',
        // A translucent material, not an opaque strip — page content actually
        // scrolls underneath this sticky bar, so it should read as a floating
        // layer over that content the way the bottom-nav pill already does,
        // rather than a fixed coloured band. Kept high-opacity (90%) rather than
        // matching the bottom pill's lighter 75%: this bar carries the emergency
        // control and the brand mark, which is exactly the "heavier material for
        // structural chrome" case the Apple-design skill's materials section
        // draws a line under. White, not teal — see the note on lims-header.webp
        // below for why this bar switched grounds entirely.
        'bg-white/90 backdrop-blur-xl',
        '[@media(prefers-reduced-transparency:reduce)]:bg-white [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none',
      ].join(' ')}
      style={{ height: `${height}px` }}
    >
      {/*
        Transform-scale, not a smaller image at a fixed breakpoint: `transform` is
        the one property here cheap enough to recompute on every scroll frame
        without triggering layout.

        lims-header.webp is the icon + "LIMS" wordmark, cropped from the full
        lockup with the institute-name subtitle removed — see the comment on it in
        scripts/build_assets.py. It carries its own colour and shading, unlike the
        old flat navy wordmark BrandMark's `tone="dark"` was built to avoid on a
        dark ground, which is what lets this header show the real lockup instead
        of falling back to the bare badge.
      */}
      <Link
        href="/"
        aria-label={tA11y('homeLink', { name: text.name, city: text.city })}
        className="press shrink-0 rounded-lg"
        style={{ transform: `scale(${badgeScale})`, transformOrigin: 'left center' }}
      >
        <img
          src="/brand/lims-header.webp"
          alt=""
          aria-hidden="true"
          width={640}
          height={238}
          className="block h-10 w-auto"
        />
      </Link>

      <div className="flex items-center gap-1.5">
        {/*
          The emergency call.

          The accessible name is on the link and says what the control does and which
          number it calls, because a bare phone icon does not tell a screen reader user
          whether this dials or navigates. Red is reserved for this control alone — a red
          used decoratively elsewhere is a red that stops meaning "emergency". The tap
          target is the 44px `.tap-target` floor.
        */}
        <a
          href={`tel:${contact.primary}`}
          aria-label={tEmergency('callLine', { number: contact.primaryDisplay })}
          className="tap-target focus-ring-inverse rounded-full bg-brand-emergency text-white shadow-sm"
        >
          <PhoneIcon className="h-5 w-5" aria-hidden="true" />
        </a>

        <LanguageMenu />

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
