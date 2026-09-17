'use client'

// components/primitives/useCarouselRotation.ts
//
// Shared auto-advance state for every carousel on the site — active index, the
// rotation timer, manual navigation, and pause/resume for hover and touch. Built so
// HeroSlideshow and MobileHeroSlideshow (and anything added after them) cannot drift
// apart on timing or on reduced-motion/pause behaviour the way two hand-rolled
// setInterval loops inevitably would.
//
// Timing comes from lib/carousel.ts, not a parameter — the interval is site-wide by
// design, not something each caller tunes for itself.
//
// Three rules this obeys, and callers get for free:
//
//  1. `prefers-reduced-motion` stops the auto-advance outright. Manual navigation
//     (goTo) still works and still transitions — reduced motion means no motion
//     nobody asked for, not "no carousel."
//  2. `pause()` / `resume()` are for hover and touch: the reader's cursor or finger on
//     the carousel is a request to stop moving it under them, honoured immediately.
//  3. A manual `goTo` always restarts the clock from zero — without this, picking a
//     slide right before the timer was about to fire flips straight back a moment
//     later, which reads as the pick having done nothing.
//
// `goToRelative` exists alongside `goTo` for exactly one reason: a caller computing
// "next" or "previous" from the `active` this hook returned earlier in the same
// render can be holding a stale value by the time the gesture resolves — a swipe
// that spans an auto-advance tick is the real case that surfaced this, where a drag
// beginning right as the timer fires closes over the pre-tick `active` and lands back
// on the slide already showing, silently. `goToRelative` sidesteps that by computing
// the target from React's own latest state inside the setState updater, never from a
// value a caller captured earlier.

import { useCallback, useEffect, useRef, useState } from 'react'
import { CAROUSEL_ROTATE_MS } from '@/lib/carousel'

export function useCarouselRotation(slideCount: number) {
  const [active, setActive] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  // A ref, not state: pause/resume must be readable inside `start` without putting
  // "paused" on the dependency list that would tear the timer down and rebuild it.
  const pausedRef = useRef(false)

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    clear()
    if (pausedRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    timerRef.current = setInterval(() => {
      setActive((current) => (current + 1) % slideCount)
    }, CAROUSEL_ROTATE_MS)
  }, [clear, slideCount])

  useEffect(() => {
    start()
    return clear
  }, [start, clear])

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % slideCount) + slideCount) % slideCount)
      start()
    },
    [start, slideCount],
  )

  // For "next"/"previous" gestures (a swipe, an arrow click) where the caller does not
  // — and must not — already know the current index. See the file comment above for
  // why this can't just be `goTo(active + direction)` at the call site.
  const goToRelative = useCallback(
    (direction: 1 | -1) => {
      setActive((current) => ((current + direction) % slideCount + slideCount) % slideCount)
      start()
    },
    [start, slideCount],
  )

  const pause = useCallback(() => {
    pausedRef.current = true
    clear()
  }, [clear])

  const resume = useCallback(() => {
    pausedRef.current = false
    start()
  }, [start])

  return { active, goTo, goToRelative, pause, resume }
}
