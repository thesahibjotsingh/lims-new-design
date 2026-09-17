'use client'

// components/home/HeroSlideshow.tsx
//
// Owns the hero <section> and the crossfade between two slides. DesktopHero hands it
// three pieces instead of one opaque blob of markup:
//
//   - firstBanner: the background photo behind `copy`, cross-dissolved against
//     `secondSlide` on a long, gentle opacity transition — no slide, no scale,
//     nothing that reads as a "carousel effect" fighting for attention on a hospital
//     home page.
//   - copy: the headline/description/buttons/stats column that sits over
//     `firstBanner`. Faded and made inert while `secondSlide` is showing, so its text
//     never doubles up with whatever the second slide is showing.
//   - secondSlide: the whole second slide, composed by the caller (own background
//     image, own text) rather than a single ImageAsset — this used to be a flat
//     picture with the quote baked into its pixels, which blurred at display size.
//     Live text doesn't have that problem, so the caller now builds it as real
//     markup and this component only handles fading it in and out.
//   - persistent: the search card. Unlike `copy` it isn't tied to either slide's
//     content, so it stays mounted and interactive across both rather than
//     disappearing every time the banner rotates.

import { useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowRightIcon } from '@/components/icons'
import type { ImageAsset } from '@/types'

const ROTATE_MS = 5000
// Long and linear-ish (ease-out) rather than the ~300ms snap used for hovers
// elsewhere on the site — a hero banner swapping under someone's eyes needs to read
// as a slow dissolve, not a cut, or it undercuts "subtle."
const TRANSITION_MS = 1200

export function HeroSlideshow({
  firstBanner,
  secondSlide,
  copy,
  persistent,
}: {
  firstBanner: ImageAsset
  secondSlide: ReactNode
  copy: ReactNode
  persistent: ReactNode
}) {
  const [active, setActive] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const labelId = useId()

  function startTimer() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Reduced motion keeps the arrows working but drops the auto-advance — the
    // slides are content, not decoration, so swapping one out on a timer nobody
    // asked for is exactly the motion that setting exists to opt out of.
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
    // A manual pick restarts the clock. Without this, clicking to slide 2 right
    // before the timer was about to fire flips straight back a moment later, which
    // reads as the click having done nothing.
    if (timerRef.current) clearInterval(timerRef.current)
    startTimer()
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Home page highlights"
      className="relative isolate hidden overflow-hidden bg-brand-teal text-white lg:block"
    >
      {/*
        Both slides stay mounted and cross-dissolve by opacity alone — no
        `hidden`/unmount, or the transition would be a hard cut instead of a fade.

        Stacking here is plain DOM order, not z-index: firstBanner+scrim (slide 0's
        background unit) paint first, secondSlide paints over them, and grid-content
        (below) paints over everything — which is also why grid-content stays on top
        with `persistent` visible no matter which slide is active.
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
        rather than staying constant — secondSlide has its own finished background
        (see its own comment in DesktopHero), and this dark-teal gradient sitting on
        top of it too would just muddy that.
        See the original comment on this hero: measured on firstBanner, white already
        reaches 8.2:1 over the left third unaided — this is insurance against the next
        photo, not the only thing making the headline legible.
      */}
      <div
        aria-hidden="true"
        style={{ transitionDuration: `${TRANSITION_MS}ms` }}
        className={`absolute inset-0 bg-gradient-to-r from-brand-teal-dark/80 via-brand-teal-dark/35 to-transparent transition-opacity ease-out ${
          active === 0 ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        aria-hidden={active !== 1}
        inert={active !== 1 ? true : undefined}
        style={{ transitionDuration: `${TRANSITION_MS}ms` }}
        className={`absolute inset-0 transition-opacity ease-out ${
          active === 1 ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {secondSlide}
      </div>

      {/*
        py-12, down from py-20. Eighty pixels of padding above the location pill read as
        a gap between the navigation and the hero rather than as breathing room, because
        the band behind it is one flat colour — there is nothing in that space for the
        padding to separate. The copy column sets the section's height on its own.
      */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-12 items-center gap-12 px-6 py-12 xl:py-14">
        <div
          aria-hidden={active !== 0}
          inert={active !== 0 ? true : undefined}
          style={{ transitionDuration: `${TRANSITION_MS}ms` }}
          className={`col-span-6 space-y-7 transition-opacity ease-out ${
            active === 0 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {copy}
        </div>

        {/*
          Bottom-aligned rather than centred: firstBanner's subject stands in the
          upper right of the frame, and a card centred in this column would sit across
          her face. Left-aligned at the start of its own column, which on a 6/6 split
          is the middle of the hero, and on the same baseline as the stats opposite it.
        */}
        <div className="col-span-6 flex justify-start self-end">{persistent}</div>
      </div>

      <p id={labelId} className="sr-only">
        Slide {active + 1} of 2
      </p>

      <button
        type="button"
        onClick={() => goTo(active === 0 ? 1 : 0)}
        aria-label="Previous slide"
        aria-describedby={labelId}
        className="press focus-ring-inverse absolute left-4 top-1/2 z-40 -translate-y-1/2 rounded-full bg-black/25 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
      >
        <ArrowRightIcon aria-hidden="true" className="h-4 w-4 rotate-180" strokeWidth={2.25} />
      </button>
      <button
        type="button"
        onClick={() => goTo(active === 0 ? 1 : 0)}
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
