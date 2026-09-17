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
//
// Fully swipeable: a horizontal drag past SWIPE_THRESHOLD_PX on release calls goTo in
// the drag's direction, same as tapping a dot. Built on Pointer Events
// (onPointerDown/Up/Cancel), not TouchEvent — a touch-only listener never fires for a
// mouse or trackpad drag, which is exactly how this got tested and shipped looking
// "swipeable" while not actually responding to anything but a real finger. Pointer
// Events is the one API both fire through, so a drag works the same way whether it's
// tested with a mouse or used with a thumb.
//
// setPointerCapture on pointerdown is what makes the drag reliable once it starts:
// without it, a fast swipe that drifts outside this element's box before release
// stops delivering pointer events here entirely, and the gesture just never resolves.
// A press in progress pauses the timer (pointerdown) the same way desktop hover does
// — a finger resting on the photo mid-swipe is exactly the moment it must not
// auto-advance underneath it — and pointerup/pointercancel always resume it, whether
// or not the drag cleared the threshold.
//
// The photo transition is a slide, not a crossfade: each `<img>` sits at
// `translate-x-0` when active and off to one side — always the same side for a given
// slide, index 0 to the left, index 1 to the right — when it isn't. A blur crossfade
// was here first; it read as the photo going soft/out-of-focus rather than an
// intentional transition, which is a stranger effect on a face than on abstract
// content, and it didn't match how the reader actually triggers it (a swipe already
// has a direction — the photo should visibly follow it). Fixed sides rather than
// gesture-direction-aware ones: with exactly two slides there's no meaningful "which
// way is forward" to preserve on wraparound, so tracking swipe direction through
// state would add a dependency for no visible benefit over "slide 2 always lives to
// the right of slide 1." `overflow-hidden` on the wrapper is load-bearing here — it's
// what keeps the off-screen slide from widening the page.

import { useId, useRef } from 'react'
import type { PointerEvent, ReactNode } from 'react'
import { useCarouselRotation } from '@/components/primitives/useCarouselRotation'
import { CAROUSEL_TRANSITION_MS } from '@/lib/carousel'
import type { ImageAsset } from '@/types'

const TRANSITION_MS = CAROUSEL_TRANSITION_MS
// A flick and a deliberate drag both need to register; a scroll-intent brush across
// the photo should not. 48px sits above normal scroll jitter on a touchscreen and
// well below "most of a phone's width," so a short, confident swipe is enough.
const SWIPE_THRESHOLD_PX = 48

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
  const { active, goTo, goToRelative, pause, resume } = useCarouselRotation(2)
  const labelId = useId()
  const dragStartX = useRef<number | null>(null)

  function handlePointerDown(event: PointerEvent) {
    // Ignore a second finger, or a non-primary mouse button — one gesture at a time.
    if (!event.isPrimary) return
    dragStartX.current = event.clientX
    // pause() first, unconditionally: it must run even if capture below fails, or a
    // press that fails to capture would also fail to pause — two unrelated failures
    // for the price of one.
    pause()
    try {
      // Keeps every subsequent pointer event for this gesture routed to this element
      // even if the drag drifts outside its box before release — without this, a
      // fast swipe can end up delivering pointerup nowhere, and the gesture just
      // never resolves (no goToRelative, no resume, stuck paused until the next tap).
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      // Some browsers throw if the pointer already ended by the time this runs (a
      // very fast tap). The swipe still works without capture, just slightly less
      // robust to the gesture drifting outside the element first — not worth
      // failing the whole interaction over.
    }
  }

  function handlePointerUp(event: PointerEvent) {
    const startX = dragStartX.current
    dragStartX.current = null

    if (startX === null) {
      resume()
      return
    }

    const delta = event.clientX - startX
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) {
      // Not a real swipe (a tap, or scroll jitter) — goTo would restart the clock
      // for nothing, so this resumes it exactly where a pause left off instead.
      resume()
      return
    }

    // Dragged left (delta < 0) advances, same "next" direction as the auto-rotate;
    // dragged right goes back. goToRelative reads React's latest state directly
    // rather than a closed-over `active` — a drag that spans an auto-advance tick
    // would otherwise compute its target from the index active before that tick,
    // landing back on the slide already showing instead of the one swiped to.
    goToRelative(delta < 0 ? 1 : -1)
  }

  function handlePointerCancel() {
    // The browser aborted the gesture (an incoming scroll, an OS interruption) —
    // there is no reliable endpoint to measure a delta against, so this only
    // resumes the clock rather than guessing a direction.
    dragStartX.current = null
    resume()
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Home page highlights"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      className="relative w-full touch-pan-y overflow-hidden bg-brand-teal"
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
        // Moving on screen, not entering/exiting a static position — ease-in-out
        // (the strong custom curve, not Tailwind's built-in one) is the right family
        // here, same as HeroSlideshow's `-translate-y-2` text nudge would use if it
        // were animated rather than a static offset.
        //
        // motion-reduce: a 100%-width lateral slide is real, large-amplitude motion —
        // more of it than the opacity/blur crossfade it replaced, not less — so it
        // gets its own fallback rather than riding on the auto-advance timer's
        // existing reduced-motion gate (that only stops the *automatic* rotation; a
        // manual swipe or dot tap still transitions either way). Under reduced
        // motion this drops straight back to the plain opacity crossfade instead.
        className={`absolute inset-0 h-full w-full object-cover transition-transform ease-[var(--ease-in-out)] motion-reduce:translate-x-0 motion-reduce:transition-opacity ${
          active === 0
            ? 'translate-x-0 motion-reduce:opacity-100'
            : '-translate-x-full motion-reduce:opacity-0'
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
        className={`absolute inset-0 h-full w-full object-cover transition-transform ease-[var(--ease-in-out)] motion-reduce:translate-x-0 motion-reduce:transition-opacity ${
          active === 1
            ? 'translate-x-0 motion-reduce:opacity-100'
            : 'translate-x-full motion-reduce:opacity-0'
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

        `pb-11` rather than the photo-hero-standard `pb-8`: lifts the text block off
        the very bottom edge, closer to the middle of the negative space the scrim
        leaves, so it doesn't read as crammed against the seam where the search bar
        overlaps (`-mt-6` on that wrapper in MobileHero.tsx).
      */}
      <div className="relative flex min-h-[56.25vw] flex-col justify-end px-5 pb-11">
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
            // Stops the press from ever reaching the container's onPointerDown — a
            // tap here is a navigation, not the start of a drag, and letting it
            // through would call setPointerCapture on the container mid-tap, which
            // can swallow the button's own click.
            onPointerDown={(event) => event.stopPropagation()}
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
