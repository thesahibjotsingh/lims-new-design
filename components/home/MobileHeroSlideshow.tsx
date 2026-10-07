'use client'

// components/home/MobileHeroSlideshow.tsx
//
// The mobile hero's rotating photo: the same two slides as DesktopHero's HeroSlideshow (the
// arrival banner, then Dr. Shweta Godara's portrait and quote), stacked into mobile's single
// photo-then-text layout instead of the desktop split-column one. Kept as its own component
// rather than a mobile branch inside HeroSlideshow because the two only share timing and
// reduced-motion logic. DesktopHero's `actions`/`persistent` pinning has no mobile
// equivalent; the search bar and quick-action tiles live in MobileHero, entirely outside this
// section, unaffected by which slide is active.
//
// THE PHOTO CHANGE: A SOFT-EDGED SWEEP.
//
// The new photo is swept in from the side with a FEATHERED edge, over the old one, which
// stays put underneath. Both photos keep exactly the full-bleed crop they always had; what
// moves is a gradient mask on the incoming one. In the band the mask covers, the two photos
// are blended, so there is no straight line anywhere on screen.
//
// Why not the earlier version, which slid two full-width photos against each other: where
// two rectangles meet, there is a perfectly straight vertical edge, and it crossed the whole
// screen for the length of the slide. No easing fixes that, because the problem is the shape
// of the seam, not its speed. And why not feather the photos' own edges: that needs picture
// content beyond the edge of the screen, which the full-bleed crops do not have, so it would
// have meant re-cropping both photos.
//
// How the mask is built:
//   - The incoming photo's layer carries a mask image: a ramp of FEATHER_CQW from clear to
//     solid (eased, so the ramp has no visible start or end), then solid.
//   - Moving the mask with `mask-position` moves the ramp across the screen. At rest it sits
//     fully off to the side, so the photo is solid; hidden, it sits fully off the OTHER side,
//     so the photo is invisible. The transition is just between those two positions.
//   - Slide 1 enters from the right, slide 0 from the left (fixed sides, as before: with two
//     slides there is no meaningful "forward" to track, so slide 2 always lives to the right
//     of slide 1). The mask for slide 0 is the mirror image.
//   - Lengths are in `cqw` (1% of the carousel's width), not px or vw, so they follow the
//     carousel and not the window. The root declares itself a size container to allow that.
//
// The outgoing photo has to stay visible until the incoming one covers it, then get out of
// the way for the next time. A layer that just became inactive therefore keeps its "rest"
// mask for TRANSITION_MS and only then snaps to "hidden" (a zero-length transition with a
// delay), by which point it is fully covered and the snap cannot be seen. The active layer is
// always on top (z-index 2), so it is the one that gets swept in either way round.
//
// Because the outgoing photo is only "parked" for that long, a second change inside
// TRANSITION_MS would bring the parked photo back on top at full strength: a pop. So
// navigation is ignored for that window. It is 1.8 seconds against a 7.5 second rotation, so
// the only way to hit it is to tap or swipe again straight away, which is not a loss.
//
// THE TEXT takes turns with the photo (lib/carousel.ts): the leaving text fades first, the
// photo changes with no text competing with it, and the arriving text fades in last. Two
// blocks of text are never on screen at once.
//
// REDUCED MOTION. A sweep is large motion, and the auto-advance gate (useCarouselRotation)
// only stops the automatic rotation, not a manual swipe or tap. So under reduced motion the
// layers do a plain opacity crossfade instead of the sweep.
//
// Text crossfade uses the CSS-grid stacking trick, not absolute positioning: both text
// blocks share the same `grid-area`, so the grid track sizes itself to whichever one is
// taller, including the one currently at opacity-0, since opacity doesn't remove anything
// from layout. That track height is then real, in-flow content inside the photo wrapper, so
// the wrapper's own height (`min-h-[56.25vw]`, a 16:9 floor, not a fixed ceiling) grows to
// fit it. A longer quote on a narrower phone makes the photo crop a little tighter, never
// clips text: there is no fixed-height box for it to spill out of.
//
// No prev/next arrow buttons here, unlike the desktop version. Both photos crop with their
// subject in the upper right, so an arrow sized to be tappable has no spot in this frame that
// doesn't sit on a face. The dot toggle (top-left, clear of that subject) is manual control
// enough for two slides.
//
// Fully swipeable: a horizontal drag past SWIPE_THRESHOLD_PX on release calls goTo in the
// drag's direction, same as tapping a dot. Built on Pointer Events (onPointerDown/Up/Cancel),
// not TouchEvent: a touch-only listener never fires for a mouse or trackpad drag, which is
// exactly how this once shipped looking "swipeable" while not responding to anything but a
// real finger. setPointerCapture on pointerdown is what makes the drag reliable once it
// starts: without it, a fast swipe that drifts outside this element's box before release
// stops delivering pointer events here entirely. A press in progress pauses the timer the
// same way desktop hover does, and pointerup/pointercancel always resume it.

import { useEffect, useId, useRef, useSyncExternalStore } from 'react'
import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import { useCarouselRotation } from '@/components/primitives/useCarouselRotation'
import { CAROUSEL_TRANSITION_MS, carouselTextTransition } from '@/lib/carousel'
import type { ImageAsset } from '@/types'

const TRANSITION_MS = CAROUSEL_TRANSITION_MS
// A flick and a deliberate drag both need to register; a scroll-intent brush across the
// photo should not. 48px sits above normal scroll jitter on a touchscreen and well below
// "most of a phone's width," so a short, confident swipe is enough.
const SWIPE_THRESHOLD_PX = 48

/** Width of the soft band, as a share of the carousel's width. Wider is softer. */
const FEATHER_CQW = 40
/** A gentle, symmetric curve: slow to start, slow to settle, so the swept edge never "arrives". */
const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)'

// Eight steps of a smoothstep curve (3t^2 - 2t^3) are plenty: the browser interpolates
// linearly between them, and at this size the result is indistinguishable from the curve.
const STEPS = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1]
const smooth = (t: number) => 3 * t * t - 2 * t * t * t
const RAMP = `${STEPS.map(
  (t) => `rgb(0 0 0 / ${smooth(t).toFixed(3)}) ${(t * FEATHER_CQW).toFixed(2)}cqw`,
).join(', ')}, black ${FEATHER_CQW}cqw`

// The mask image is the ramp plus enough solid to cover the carousel with the ramp fully off
// to one side: a carousel's width plus a feather at each end.
const MASK_SIZE = `calc(100cqw + ${FEATHER_CQW * 2}cqw) 100%`

const MASKS = [
  {
    // Slide 0 enters from the left, so the solid part is on the left and the ramp trails on
    // the right: the gradient runs "to left", clear at its right end.
    image: `linear-gradient(to left, ${RAMP})`,
    rest: `-${FEATHER_CQW}cqw 0`,
    hidden: `-${100 + FEATHER_CQW * 2}cqw 0`,
  },
  {
    // Slide 1 enters from the right: clear at the left end, solid beyond the ramp.
    image: `linear-gradient(to right, ${RAMP})`,
    rest: `-${FEATHER_CQW}cqw 0`,
    hidden: '100cqw 0',
  },
] as const

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)')
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

function layerStyle(index: 0 | 1, isActive: boolean, reducedMotion: boolean): CSSProperties {
  const zIndex = isActive ? 2 : 1

  if (reducedMotion) {
    return {
      zIndex,
      opacity: isActive ? 1 : 0,
      transition: `opacity ${TRANSITION_MS}ms ease-in-out`,
    }
  }

  const mask = MASKS[index]
  const position = isActive ? mask.rest : mask.hidden
  return {
    zIndex,
    WebkitMaskImage: mask.image,
    maskImage: mask.image,
    WebkitMaskSize: MASK_SIZE,
    maskSize: MASK_SIZE,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: position,
    maskPosition: position,
    transitionProperty: '-webkit-mask-position, mask-position',
    // Entering: sweep in over the full duration. Leaving: stay put until the other photo has
    // covered this one, then snap to hidden, unseen (see the header comment).
    transitionDuration: isActive ? `${TRANSITION_MS}ms` : '0ms',
    transitionDelay: isActive ? '0ms' : `${TRANSITION_MS}ms`,
    transitionTimingFunction: EASE,
  }
}

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
  const tA11y = useTranslations('a11y')
  const labelId = useId()
  const dragStartX = useRef<number | null>(null)
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  )

  // When the slide last changed, by any route (timer, swipe or dot), so navigation can be
  // ignored while the outgoing photo is still parked underneath. Not set on mount.
  const shownActive = useRef(active)
  const changedAt = useRef(Number.NEGATIVE_INFINITY)
  useEffect(() => {
    if (shownActive.current !== active) {
      shownActive.current = active
      changedAt.current = performance.now()
    }
  }, [active])
  const isSettled = () => performance.now() - changedAt.current >= TRANSITION_MS

  function handlePointerDown(event: PointerEvent) {
    // Ignore a second finger, or a non-primary mouse button: one gesture at a time.
    if (!event.isPrimary) return
    dragStartX.current = event.clientX
    // pause() first, unconditionally: it must run even if capture below fails, or a press
    // that fails to capture would also fail to pause: two unrelated failures for the price
    // of one.
    pause()
    try {
      // Keeps every subsequent pointer event for this gesture routed to this element even if
      // the drag drifts outside its box before release.
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      // Some browsers throw if the pointer already ended by the time this runs (a very fast
      // tap). The swipe still works without capture, just slightly less robust to the
      // gesture drifting outside the element first.
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
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX || !isSettled()) {
      // Not a real swipe (a tap, or scroll jitter), or the last change is still settling:
      // goTo would restart the clock for nothing, so this resumes it where a pause left off.
      resume()
      return
    }

    // Dragged left (delta < 0) advances, same "next" direction as the auto-rotate; dragged
    // right goes back. goToRelative reads React's latest state directly rather than a
    // closed-over `active`: a drag that spans an auto-advance tick would otherwise compute
    // its target from the index active before that tick.
    goToRelative(delta < 0 ? 1 : -1)
  }

  function handlePointerCancel() {
    // The browser aborted the gesture (an incoming scroll, an OS interruption): there is no
    // reliable endpoint to measure a delta against, so this only resumes the clock.
    dragStartX.current = null
    resume()
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={tA11y('highlights')}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      // `container-type` is what makes `cqw` mean "1% of this carousel" for the masks below.
      className="relative w-full touch-pan-y overflow-hidden bg-brand-teal [container-type:inline-size]"
    >
      <div aria-hidden="true" className="absolute inset-0" style={layerStyle(0, active === 0, reducedMotion)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={firstBanner.src}
          alt={firstBanner.alt}
          width={firstBanner.width}
          height={firstBanner.height}
          // The LCP element on the mobile home page: eager and high priority, never lazy.
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0" style={layerStyle(1, active === 1, reducedMotion)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={secondBanner.src}
          alt={secondBanner.alt}
          width={secondBanner.width}
          height={secondBanner.height}
          loading="eager"
          decoding="async"
          aria-hidden={active !== 1}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/*
        Two constant scrims, not changed per slide. Unlike HeroSlideshow's left-anchored
        gradient, these read fine as a fixed floor under either photo here. z-[3] puts them
        above both photo layers (which are z 1 and 2) without being part of the sweep.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[3] bg-gradient-to-t from-brand-dark-base/85 via-brand-dark-base/35 to-transparent"
      />
      {/*
        Left-anchored, same idea as HeroSlideshow's scrim on desktop: both photos crop their
        subject in the upper right (see the dot-placement comment below), so a second fade
        darkens the left safe area the text lives in without darkening her portrait. Combined
        with the text column's `max-w-[65%]` just below, this is what keeps the quote off the
        photo rather than just off her face by luck of line-wrapping.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[3] bg-gradient-to-r from-brand-dark-base/70 via-brand-dark-base/25 to-transparent"
      />

      {/*
        The one normal-flow child. `min-h-[56.25vw]` is the 16:9 floor (a width-based minimum,
        not a fixed aspect ratio), so short text (firstText) keeps the usual full-bleed photo
        proportions, `justify-end` pins whichever text is taller to the bottom, and if that
        text still needs more room than the floor leaves, this div (and so the photo behind
        it, via `absolute inset-0`) simply grows taller rather than clipping anything.

        `pb-11` rather than the photo-hero-standard `pb-8`: lifts the text block off the very
        bottom edge, closer to the middle of the negative space the scrim leaves, so it
        doesn't read as crammed against the seam where the search bar overlaps (`-mt-6` on
        that wrapper in MobileHero.tsx).
      */}
      <div className="relative z-[4] flex min-h-[56.25vw] flex-col justify-end px-5 pb-11">
        {/*
          Both text blocks sit in the same grid cell, so the track's height is the taller of
          the two (opacity-0 still counts), which lets the inactive slide reserve room rather
          than collapsing and letting the active one jump.

          `max-w-[65%]` goes on `secondText`'s cell only, not this container: it is the hard
          stop that keeps the (much longer) quote out of the doctor's portrait, which crops
          her in the upper right. `firstText` (the short headline) stays at the container's
          full width: it was authored with its own `<br />` for a deliberate 2-line break at
          that measure.
        */}
        {/* `self-end` on both: whichever text is shorter sits flush with the taller one's
            LAST line rather than its first, so the block's bottom edge, and so the floating
            search bar's overlap point right below it, never moves between slides. */}
        <div className="grid">
          <div
            aria-hidden={active !== 0}
            inert={active !== 0 ? true : undefined}
            style={carouselTextTransition(active === 0)}
            className={`[grid-area:1/1] self-end ${active === 0 ? 'opacity-100' : 'opacity-0'}`}
          >
            {firstText}
          </div>
          <div
            aria-hidden={active !== 1}
            inert={active !== 1 ? true : undefined}
            style={carouselTextTransition(active === 1)}
            className={`[grid-area:1/1] max-w-[65%] self-end ${active === 1 ? 'opacity-100' : 'opacity-0'}`}
          >
            {secondText}
          </div>
        </div>
      </div>

      <p id={labelId} className="sr-only" aria-live="polite">
        {tA11y('slideOf', { n: active + 1, total: 2 })}
      </p>

      {/* Two slides only, so this is a toggle rather than a generic dot rail. Top-left rather
          than centred or right: both photos crop with their subject in the upper right, so
          this corner is the one spot that never sits on a face. Padded well past its own 6px
          visual size (a bare 6px circle is not a real touch target) via negative margin so
          the hit area grows without the dot itself looking oversized. Expansion is
          asymmetric (more vertical than horizontal, `gap-3` between them) so the two
          buttons' hit areas grow toward open space instead of into each other. */}
      <div className="absolute left-3 top-3 z-10 flex gap-3">
        {[0, 1].map((index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              if (index !== active && !isSettled()) return
              goTo(index)
            }}
            // Stops the press from ever reaching the container's onPointerDown: a tap here is
            // a navigation, not the start of a drag, and letting it through would call
            // setPointerCapture on the container mid-tap, which can swallow the button's own
            // click.
            onPointerDown={(event) => event.stopPropagation()}
            aria-label={tA11y('goToSlide', { n: index + 1 })}
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
