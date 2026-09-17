'use client'

// components/home/HeroSlideshow.tsx
//
// Owns the hero <section>, fixed at h-[600px] xl:h-[640px] rather than sized by
// whichever slide's text is longest. That fixed height is what makes the pinned
// pieces below possible: `actions` and `persistent` are each a single absolutely
// positioned instance — not per-slide, not re-rendered on rotation — so there is
// nothing for them to jump between. Only `copy`/`secondSlideText` cross-dissolve.
//
//   - firstBanner: the background photo behind `copy`, cross-dissolved against
//     `secondSlide` on a long, gentle opacity transition — no slide, no scale,
//     nothing that reads as a "carousel effect" fighting for attention on a
//     hospital home page.
//   - copy / secondSlideText: headline+description vs. quote+name — text only, no
//     buttons or stats. Both cross-dissolve into the same slot, which is the
//     flexible region above `actions` (a flex column, not a hardcoded height).
//     Both are vertically CENTRED within it, with the same small upward nudge —
//     one shared alignment strategy for both slides, not "copy top-aligns,
//     secondSlideText centres." Top-aligning copy used to leave a growing dead
//     zone below the description at the xl breakpoint (640px section, description
//     capped at max-w-xl): centring both spends that same leftover space evenly
//     above and below instead of dumping it all beneath the text.
//   - secondSlideBg: the second slide's own background photo (see the comment on
//     `heroBannerSecondary` in lib/media.ts for why this is a plain photo now, not
//     a flat export with the quote baked into its pixels).
//   - actions: the Book/Emergency buttons and the stats row. Identical on both
//     slides, so it was never really "slide content" — one instance, sitting in
//     its own natural-height row at the bottom of the flex column, never tied to
//     `active`. Verified pixel-static across slides (getBoundingClientRect
//     before/after a slide change returns identical rects at every breakpoint
//     tested) — it was never re-rendered per slide, so there was nothing to pin
//     more firmly than "render it once."
//   - persistent: the search card. Same idea, pinned in the right column.

import { useId } from 'react'
import type { ReactNode } from 'react'
import { ArrowRightIcon } from '@/components/icons'
import { useCarouselRotation } from '@/components/primitives/useCarouselRotation'
import { CAROUSEL_TRANSITION_MS } from '@/lib/carousel'
import type { ImageAsset } from '@/types'

const TRANSITION_MS = CAROUSEL_TRANSITION_MS

export function HeroSlideshow({
  firstBanner,
  secondSlideBg,
  copy,
  secondSlideText,
  actions,
  persistent,
}: {
  firstBanner: ImageAsset
  secondSlideBg: ImageAsset
  copy: ReactNode
  secondSlideText: ReactNode
  actions: ReactNode
  persistent: ReactNode
}) {
  const { active, goTo, goToRelative, pause, resume } = useCarouselRotation(2)
  const labelId = useId()

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Home page highlights"
      onMouseEnter={pause}
      onMouseLeave={resume}
      className="relative isolate hidden h-[600px] overflow-hidden bg-brand-teal text-white lg:block xl:h-[640px]"
    >
      {/*
        Stacking here is plain DOM order, not z-index: firstBanner+scrim (slide 0's
        background unit) paint first, secondSlideBg paints over them, and the
        content layer (below) paints over everything.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={firstBanner.src}
        alt={firstBanner.alt}
        width={firstBanner.width}
        height={firstBanner.height}
        // The LCP element on the home page: eager and high priority, never lazy.
        fetchPriority="high"
        decoding="async"
        aria-hidden="true"
        style={{ transitionDuration: `${TRANSITION_MS}ms` }}
        className={`absolute inset-0 h-full w-full object-cover object-[75%_center] transition-opacity ease-out ${
          active === 0 ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/*
        A scrim anchored to the left, where the copy sits. Fades with firstBanner
        rather than staying constant — secondSlideBg has its own finished
        background, and this dark-teal gradient sitting on top of it too would
        just muddy that.
        See the original comment on this hero: measured on firstBanner, white
        already reaches 8.2:1 over the left third unaided — this is insurance
        against the next photo, not the only thing making the headline legible.
      */}
      <div
        aria-hidden="true"
        style={{ transitionDuration: `${TRANSITION_MS}ms` }}
        className={`absolute inset-0 bg-gradient-to-r from-brand-teal-dark/80 via-brand-teal-dark/35 to-transparent transition-opacity ease-out ${
          active === 0 ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={secondSlideBg.src}
        alt={secondSlideBg.alt}
        width={secondSlideBg.width}
        height={secondSlideBg.height}
        loading="eager"
        decoding="async"
        aria-hidden={active !== 1}
        style={{ transitionDuration: `${TRANSITION_MS}ms` }}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity ease-out ${
          active === 1 ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="relative mx-auto grid h-full max-w-7xl grid-cols-12 gap-12 px-6">
        {/*
          Left column: a flex column, not absolute-positioned-everything. The
          text crossfade lives in the flexible region (flex-1) above `actions`,
          which sits in its own natural-height row — so `secondSlideText` can
          centre itself against exactly the room `actions` leaves, computed by
          the browser, not guessed as a pixel offset.
        */}
        <div className="relative col-span-6 flex h-full flex-col">
          <div className="relative flex-1">
            <div
              aria-hidden={active !== 0}
              inert={active !== 0 ? true : undefined}
              style={{ transitionDuration: `${TRANSITION_MS}ms` }}
              // -translate-y-2: see the identical comment on secondSlideText below —
              // both slides share this exact wrapper now, so they share the nudge too.
              className={`absolute inset-0 flex -translate-y-2 flex-col justify-center space-y-7 transition-opacity ease-out ${
                active === 0 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {copy}
            </div>
            <div
              aria-hidden={active !== 1}
              inert={active !== 1 ? true : undefined}
              style={{ transitionDuration: `${TRANSITION_MS}ms` }}
              // -translate-y-2 nudges the centred block up slightly — true centre
              // read as a bit low under the actions row. 8px keeps it inside the
              // ~15px of slack the lg-only breakpoint (1024–1279px) has above it.
              className={`absolute inset-0 flex -translate-y-2 flex-col justify-center space-y-5 transition-opacity ease-out ${
                active === 1 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {secondSlideText}
            </div>
          </div>

          {/* Identical on both slides — one instance, never re-rendered on rotation. */}
          <div className="pb-12 xl:pb-14">{actions}</div>
        </div>

        {/*
          Right column: the search card, pinned at the same bottom offset as
          `actions` so the two sit on one baseline — bottom-aligned rather than
          centred because firstBanner's subject stands in the upper right of the
          frame, and a card centred in this column would sit across her face.
        */}
        <div className="relative col-span-6">
          <div className="absolute bottom-12 left-0 xl:bottom-14">{persistent}</div>
        </div>
      </div>

      <p id={labelId} className="sr-only">
        Slide {active + 1} of 2
      </p>

      <button
        type="button"
        onClick={() => goToRelative(-1)}
        aria-label="Previous slide"
        aria-describedby={labelId}
        className="press focus-ring-inverse absolute left-4 top-1/2 z-40 -translate-y-1/2 rounded-full bg-black/25 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
      >
        <ArrowRightIcon aria-hidden="true" className="h-4 w-4 rotate-180" strokeWidth={2.25} />
      </button>
      <button
        type="button"
        onClick={() => goToRelative(1)}
        aria-label="Next slide"
        aria-describedby={labelId}
        className="press focus-ring-inverse absolute right-4 top-1/2 z-40 -translate-y-1/2 rounded-full bg-black/25 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
      >
        <ArrowRightIcon aria-hidden="true" className="h-4 w-4" strokeWidth={2.25} />
      </button>

      {/* Two slides only, so this is a toggle rather than a generic dot rail. */}
      <div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-2">
        {[0, 1].map((index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={active === index}
            className={`press h-2 rounded-full transition-all ${
              active === index ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
