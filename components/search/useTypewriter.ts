'use client'

// components/search/useTypewriter.ts
//
// The typing placeholder, shared by the mobile hero search bar and the header search.
// Extracted so the two cannot drift: they are the same effect on the same site, and two
// copies of a timer loop is two sets of cleanup to get right.
//
// Two rules this obeys, and callers must keep:
//
//  1. The animation is a PLACEHOLDER, never a value. A moving `value` would be text the
//     reader did not type sitting in a field they are about to type into, and it would
//     submit if they pressed Enter. Callers pass `enabled: false` the moment the field
//     is focused or has content.
//
//  2. `prefers-reduced-motion` kills it outright — this is text moving in the reader's
//     field of view, which is the exact thing that setting exists to stop. The CSS
//     media query in globals.css cannot do this job, because the animation is driven by
//     a timer rather than by CSS. It falls back to a static placeholder.

import { useEffect, useRef, useState } from 'react'

const TYPE_MS = 70
const ERASE_MS = 35
const HOLD_MS = 1400

export function useTypewriter(phrases: string[], enabled: boolean): string {
  const [typed, setTyped] = useState('')
  const [motionAllowed, setMotionAllowed] = useState(false)

  // Start disabled and enable only after the media query is read on the client. The
  // server cannot know the preference, and defaulting to "animate" would flash motion at
  // a reduced-motion reader for one frame before the effect corrected it.
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setMotionAllowed(!media.matches)
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  const phraseIndex = useRef(0)
  const charIndex = useRef(0)
  const erasing = useRef(false)

  const running = motionAllowed && enabled

  useEffect(() => {
    if (!running) {
      setTyped('')
      phraseIndex.current = 0
      charIndex.current = 0
      erasing.current = false
      return
    }

    let timer: ReturnType<typeof setTimeout>

    function step() {
      const phrase = phrases[phraseIndex.current] ?? ''

      if (!erasing.current) {
        charIndex.current += 1
        setTyped(phrase.slice(0, charIndex.current))
        if (charIndex.current >= phrase.length) {
          erasing.current = true
          timer = setTimeout(step, HOLD_MS)
          return
        }
        timer = setTimeout(step, TYPE_MS)
        return
      }

      charIndex.current -= 1
      setTyped(phrase.slice(0, charIndex.current))
      if (charIndex.current <= 0) {
        erasing.current = false
        phraseIndex.current = (phraseIndex.current + 1) % phrases.length
      }
      timer = setTimeout(step, ERASE_MS)
    }

    timer = setTimeout(step, TYPE_MS)
    return () => clearTimeout(timer)
    // `phrases` is a module-level constant at both call sites, so it is stable; listing
    // it here would only matter if a caller built the array inline, which would restart
    // the animation on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  return typed
}
