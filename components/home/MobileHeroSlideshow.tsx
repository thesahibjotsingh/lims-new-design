'use client'

// components/home/MobileHeroSlideshow.tsx
//
// The mobile hero's rotating photo — the same two slides as DesktopHero's
// HeroSlideshow (the arrival banner, then Dr. Shweta Godara's portrait and quote),
// crossfaded the same way, just stacked into mobile's single photo-then-text layout
// instead of the desktop split-column one. Kept as its own component rather than a
// mobile branch inside HeroSlideshow because the two only share timing and
// reduced-motion logic — DesktopHero's `actions`/`persistent` pinning has no mobile
// equivalent; the search bar and quick-action tiles live in MobileHero, entirely
// outside this section, unaffected by which slide is active.
//
// Text crossfade uses the CSS-grid stacking trick, not absolute positioning: both
// text blocks share the same `grid-area`, so the grid track sizes itself to whichever
// one is taller — including the one currently at opacity-0, since opacity doesn't
// remove anything from layout. That track height is then real, in-flow content inside
// the photo wrapper, so the wrapper's own height (`min-h-[56.25vw]`, a 16:9 floor, not
// a fixed ceiling) grows to fit it. A longer quote on a narrower phone makes the photo
// crop a little tighter, never clips text — there is no fixed-height box for it to
// spill out of.
//
// No prev/next arrow buttons here, unlike the desktop version. Both photos crop with
// their subject in the upper right — an arrow sized to be tappable on mobile has no
// spot in this frame that doesn't sit on a face. The dot toggle (top-left, clear of
// that subject) is manual control enough for two slides; reduced-motion still gets
// the auto-advance dropped entirely, same as desktop.

import { useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { ImageAsset } from '@/types'

const ROTATE_MS = 5000
// Matches HeroSlideshow's TRANSITION_MS — a hero banner swapping under someone's
// thumb should read as the same slow dissolve on mobile as it does on desktop.
const TRANSITION_MS = 1200

export function MobileHeroSlideshow({
  firstBanner,
  secondBanner,
  firstText,
  secondText,
}: {
  firstBanner: ImageAsset
  secondBanner: ImageAsset
  firstText: ReactNode
  secondText: ReactNode
}) {
  const [active, setActive] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const labelId = useId()

  function startTimer() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Reduced motion keeps the dots working but drops the auto-advance — same
    // reasoning as HeroSlideshow: the slides are content, not decoration.
    if (reduceMotion) return
    timerRef.current = setInterval(() => setActive((current) => (current === 0 ? 1 : 0)), ROTATE_MS)
  }

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  function goTo(index: number) {
    setActive(index)
    // A manual pick restarts the clock — without this, tapping to slide 2 right
    // before the timer fires flips straight back a moment later.
    if (timerRef.current) clearInterval(timerRef.current)
    startTimer()
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Home page highlights"
      className="relative w-full overflow-hidden bg-brand-teal"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={firstBanner.src}
        alt={firstBanner.alt}
        width={firstBanner.width}
        height={firstBanner.height}
        // The LCP element on the mobile home page: eager and high priority, never lazy.
        fetchPriority="high"
        decoding="async"
        aria-hidden="true"
        style={{ transitionDuration: `${TRANSITION_MS}ms` }}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity ease-out ${
          active === 0 ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={secondBanner.src}
        alt={secondBanner.alt}
        width={secondBanner.width}
        height={secondBanner.height}
        loading="eager"
        decoding="async"
        aria-hidden={active !== 1}
        style={{ transitionDuration: `${TRANSITION_MS}ms` }}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity ease-out ${
          active === 1 ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/*
        Two constant scrims, not crossfaded. Unlike HeroSlideshow's left-anchored
        gradient (which has to fade out under `secondSlideBg`'s own finished
        composition on desktop), these read fine as a fixed floor under either photo
        here. `absolute inset-0` on layers following two other `absolute inset-0`
        photos still fills the wrapper's full (now dynamic) height, growing with it.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-brand-dark-base/85 via-brand-dark-base/35 to-transparent"
      />
      {/*
        Left-anchored, same idea as HeroSlideshow's scrim on desktop: both photos crop
        their subject in the upper right (see the dot-placement comment below), so a
        second fade darkens the left safe area the text lives in without darkening her
        portrait. Combined with the text column's `max-w-[65%]` just below, this is
        what keeps the quote off the photo rather than just off her face by luck of
        line-wrapping.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-brand-dark-base/70 via-brand-dark-base/25 to-transparent"
      />

      {/*
        The one normal-flow child. `min-h-[56.25vw]` is the 16:9 floor — a width-based
        minimum, not a fixed aspect ratio — so short text (firstText) keeps the usual
        full-bleed photo proportions, `justify-end` pins whichever text is taller to
        the bottom, and if that text still needs more room than the floor leaves, this
        div (and so the photo behind it, via `absolute inset-0 h-full w-full`) simply
        grows taller rather than clipping anything.
      */}
      <div className="relative flex min-h-[56.25vw] flex-col justify-end px-5 pb-8">
        {/*
          Grid-stack crossfade: both text blocks sit in the same cell (`[grid-area:1/1]`
          on each), so the grid track's height is the taller of the two — opacity-0
          still counts, which is what lets the inactive slide reserve room rather than
          collapsing to nothing and letting the active one jump.

          `max-w-[65%]` goes on `secondText`'s cell only, not this container — it's
          the hard stop that keeps the (much longer) quote out of the doctor's
          portrait, which crops her in the upper right. `firstText` (the short
          headline) stays at the container's full width: it was already authored with
          its own `<br />` for a deliberate 2-line break at that measure, and capping
          the shared container would have squeezed it to 3 lines for no reason — the
          headline was never the thing running toward her face.
        */}
        {/* `self-end` on both: whichever text is shorter sits flush with the taller
            one's LAST line rather than its first, so the block's bottom edge — and so
            the floating search bar's overlap point right below it — never moves
            between slides. */}
        <div className="grid">
          <div
            aria-hidden={active !== 0}
            inert={active !== 0 ? true : undefined}
            style={{ transitionDuration: `${TRANSITION_MS}ms` }}
            className={`[grid-area:1/1] self-end transition-opacity ease-out ${
              active === 0 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {firstText}
          </div>
          <div
            aria-hidden={active !== 1}
            inert={active !== 1 ? true : undefined}
            style={{ transitionDuration: `${TRANSITION_MS}ms` }}
            className={`[grid-area:1/1] max-w-[65%] self-end transition-opacity ease-out ${
              active === 1 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {secondText}
          </div>
        </div>
      </div>

      <p id={labelId} className="sr-only" aria-live="polite">
        Slide {active + 1} of 2
      </p>

      {/* Two slides only, so this is a toggle rather than a generic dot rail. Top-left
          rather than centred or right — both photos crop with their subject in the
          upper right, so this corner is the one spot that never sits on a face.
          Padded well past its own 6px visual size — a bare 6px circle is not a real
          touch target — via negative margin so the hit area grows without the dot
          itself looking oversized. Expansion is asymmetric (more vertical than
          horizontal, `gap-3` between them) so the two buttons' hit areas grow toward
          open space instead of into each other — a symmetric expansion here would
          have the two overlap and make taps near the middle land on whichever button
          happens to be later in the DOM, not whichever the reader was aiming for. */}
      <div className="absolute left-3 top-3 z-10 flex gap-3">
        {[0, 1].map((index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={active === index}
            className="press -mx-1 -my-2 flex items-center justify-center px-1 py-2"
          >
            <span
              aria-hidden="true"
              className={`block h-1.5 rounded-full shadow-sm transition-all ${
                active === index ? 'w-5 bg-white' : 'w-1.5 bg-white/60'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
