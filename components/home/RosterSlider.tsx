'use client'

// components/home/RosterSlider.tsx
//
// The home page's row of consultant cards, as a manual slider.
//
// WHY A SLIDER. A fixed four-across grid leaves one card alone on a second row at five
// consultants and grows a row for every four more. The home page is a showcase; the full
// roster is one tap away at /doctors. A slider keeps this band one row tall however many
// consultants LIMS adds.
//
// WHY MANUAL, NEVER AUTOMATIC. A patient reading credentials needs the row to hold still.
// Something that slides by itself moves a card away mid-sentence, needs a pause control to
// meet WCAG 2.2.2, and gains nothing here.
//
// HOW IT WORKS. It is plain browser scrolling: a horizontal overflow row with scroll-snap,
// which is also what gives a phone its swipe and a trackpad its two-finger slide, with no
// animation library. The only JavaScript is the two arrow buttons (desktop and tablet; a
// phone swipes) and the measurement behind the arrows and the soft edges. With JavaScript
// off the row still scrolls.
//
// THE PEEK. Cards are a fixed width, a little under a quarter of the page, so the next card
// is visibly cut off at the right edge. That cut-off is what says "there is more", and it
// is why no dots or counter are needed.
//
// THE SOFT EDGE. A scroll container ends in a hard vertical line, and a card sliced by it
// reads as a rendering fault. Two layers soften it, both driven by how far the row has
// scrolled rather than switching on and off:
//
//   1. The row itself is masked with an eased (smoothstep) ramp from solid to transparent
//      over the last 8rem. The card does not get a tint laid over it; it simply fades out
//      into the band, so there is no colour to mismatch and no seam to see. Easing matters:
//      a straight linear ramp has a visible start and end, an eased one has neither.
//   2. A light backdrop blur strip, masked with the same ramp, over the same 8rem. Whatever
//      is left of the card at the very edge goes soft instead of crisp.
//
// "Driven by scroll" means the left fade is 0 at the start of the row and grows to full over
// the first 8rem of scrolling, and the right fade shrinks to 0 over the last 8rem. Switching
// the left fade on at the first pixel scrolled would visibly dim the first card at once.
// The two amounts live in CSS custom properties (--fl, --fr, 0 to 1) set straight on the
// element from the scroll listener, not in React state, because they change every frame of a
// scroll and a re-render per frame is exactly what that would cost.
//
// Below md the row runs to the screen edge, where a cut is natural, so both are off there.
// `prefers-reduced-transparency` drops the blur and keeps the fade.
//
// THE GLOW. Hovering a card on the dark band lights it with a ring and a glow, and lifts
// it. A scroll container clips anything outside its box, so the row is padded out into the
// page gutter (and up and down) by exactly the margin it takes back, leaving room for the
// effect without moving the layout.

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowRightIcon } from '@/components/icons'

/** Length of each soft edge, in px and in rem. Keep the two in step. */
const FADE_PX = 128
const FADE_REM = 8

// Eight steps of a smoothstep curve, 3t^2 - 2t^3, are plenty: the browser interpolates
// linearly between them, and at this size the result is indistinguishable from the curve.
const STEPS = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1]
const smooth = (t: number) => 3 * t * t - 2 * t * t * t

// Opaque for the middle of the row, eased to transparent at each end. A stop's position is a
// fraction of the fade length, so when --fl or --fr is 0 every stop collapses onto the edge
// and the mask is simply solid.
const ROW_MASK = `linear-gradient(to right, ${[
  ...STEPS.map((t) => `rgb(0 0 0 / ${smooth(t).toFixed(3)}) calc(var(--fl) * ${(t * FADE_REM).toFixed(3)}rem)`),
  ...STEPS.map(
    (t) =>
      `rgb(0 0 0 / ${(1 - smooth(t)).toFixed(3)}) calc(100% - var(--fr) * ${((1 - t) * FADE_REM).toFixed(3)}rem)`,
  ),
].join(', ')})`

// The blur strips: nothing on the inner side, full blur at the edge. The gradient runs
// towards the edge it belongs to, so it starts transparent on the inner side either way.
const rampTo = (edge: 'left' | 'right') =>
  `linear-gradient(to ${edge}, ${STEPS.map(
    (t) => `rgb(0 0 0 / ${smooth(t).toFixed(3)}) ${(t * 100).toFixed(1)}%`,
  ).join(', ')})`

const BLUR =
  'pointer-events-none absolute inset-y-0 z-[5] hidden w-32 backdrop-blur-[5px] md:block [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none'

const BUTTON =
  'absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-brand-teal shadow-lg ring-1 ring-black/5 transition-colors hover:bg-brand-mist md:grid'

export function RosterSlider({
  children,
  prevLabel,
  nextLabel,
}: {
  /** The <li> cards. Each sets its own width and `snap-start`. */
  children: ReactNode
  prevLabel: string
  nextLabel: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  // Both start false so nothing flashes in before the row has been measured, and so a row
  // whose cards all fit never shows an arrow at all.
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const measure = useCallback(() => {
    const list = listRef.current
    const wrap = wrapRef.current
    if (!list || !wrap) return
    const max = list.scrollWidth - list.clientWidth
    const prev = list.scrollLeft > 4
    const next = list.scrollLeft < max - 4
    setCanPrev(prev)
    setCanNext(next)

    // How much of each soft edge to show, 0 to 1. Set on the element, not in state: see the
    // note at the top of the file.
    const wide = window.matchMedia('(min-width: 768px)').matches
    const left = wide ? Math.min(list.scrollLeft / FADE_PX, 1) : 0
    const right = wide ? Math.min(Math.max(max - list.scrollLeft, 0) / FADE_PX, 1) : 0
    wrap.style.setProperty('--fl', left.toFixed(3))
    wrap.style.setProperty('--fr', right.toFixed(3))

    // A button that disappears under the keyboard's focus would drop focus to the page.
    // Hand it to the arrow that still works instead.
    if (!next && document.activeElement === nextRef.current) prevRef.current?.focus()
    if (!prev && document.activeElement === prevRef.current) nextRef.current?.focus()
  }, [])

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    measure()
    list.addEventListener('scroll', measure, { passive: true })
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => {
      list.removeEventListener('scroll', measure)
      observer.disconnect()
    }
  }, [measure])

  function slide(direction: 1 | -1) {
    const list = listRef.current
    const card = list?.querySelector('li')
    if (!list || !card) return
    // One card at a time: its width plus the gap between cards.
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    list.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: reduce ? 'auto' : 'smooth',
    })
  }

  return (
    // The defaults are what the server renders: no left fade (the row starts at its left
    // edge) and a right fade from md up (there are more cards than fit). The first
    // measurement replaces both with the real values.
    <div ref={wrapRef} className="relative [--fl:0] [--fr:0] md:[--fr:1]">
      <div
        aria-hidden="true"
        className={`${BLUR} -left-5 sm:-left-6`}
        style={{
          opacity: 'var(--fl)',
          WebkitMaskImage: rampTo('left'),
          maskImage: rampTo('left'),
        }}
      />
      <div
        aria-hidden="true"
        className={`${BLUR} -right-5 sm:-right-6`}
        style={{
          opacity: 'var(--fr)',
          WebkitMaskImage: rampTo('right'),
          maskImage: rampTo('right'),
        }}
      />

      <button
        ref={prevRef}
        type="button"
        aria-label={prevLabel}
        onClick={() => slide(-1)}
        tabIndex={canPrev ? 0 : -1}
        aria-hidden={!canPrev}
        className={`${BUTTON} -left-[1.375rem] ${canPrev ? '' : 'pointer-events-none opacity-0'}`}
      >
        <ArrowRightIcon className="h-5 w-5 rotate-180" strokeWidth={2.25} aria-hidden="true" />
      </button>
      <button
        ref={nextRef}
        type="button"
        aria-label={nextLabel}
        onClick={() => slide(1)}
        tabIndex={canNext ? 0 : -1}
        aria-hidden={!canNext}
        className={`${BUTTON} -right-[1.375rem] ${canNext ? '' : 'pointer-events-none opacity-0'}`}
      >
        <ArrowRightIcon className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
      </button>

      <ul
        ref={listRef}
        style={{ WebkitMaskImage: ROW_MASK, maskImage: ROW_MASK }}
        className="
          -mx-5 -my-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 py-6
          [overscroll-behavior-x:contain] [scrollbar-width:none] [-webkit-overflow-scrolling:touch]
          sm:-mx-6 sm:scroll-px-6 sm:px-6 md:gap-5 [&::-webkit-scrollbar]:hidden
        "
      >
        {children}
      </ul>
    </div>
  )
}
