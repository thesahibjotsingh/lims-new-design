'use client'

// components/home/TypewriterSearchBar.tsx
//
// The floating search bar under the mobile hero photo, with a placeholder that types
// itself through a rotating list of real things a patient searches for.
//
// Two rules this obeys:
//
//  1. The animation is a PLACEHOLDER, never a value. A moving `value` would be text the
//     user did not type sitting in a field they are about to type into, and it would
//     submit if they hit Go. The moment the field is focused or has any content, the
//     animation stops and gets out of the way.
//
//  2. `prefers-reduced-motion` kills it outright — this is text moving in the reader's
//     field of view, which is the exact thing that setting exists to stop. It falls
//     back to a plain static placeholder, and the CSS media query in globals.css cannot
//     do that job because this animation is driven by a timer, not by CSS.

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SearchIcon } from '@/components/icons'

const PHRASES = [
  'Orthopaedics',
  'Dr. Shweta Godara',
  'Ultrasound',
  'Emergency services',
  'Physiotherapy',
]

const STATIC_PLACEHOLDER = 'Search doctors, departments or tests'

const TYPE_MS = 70
const ERASE_MS = 35
const HOLD_MS = 1400

export function TypewriterSearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [typed, setTyped] = useState('')
  const [animate, setAnimate] = useState(false)

  // Start disabled and enable only after the media query is read on the client. The
  // server cannot know the preference, and defaulting to "animate" would flash motion
  // at a reduced-motion user for one frame before the effect corrected it.
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setAnimate(!media.matches)
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  const phraseIndex = useRef(0)
  const charIndex = useRef(0)
  const erasing = useRef(false)

  const idle = animate && !focused && query.length === 0

  useEffect(() => {
    if (!idle) {
      setTyped('')
      phraseIndex.current = 0
      charIndex.current = 0
      erasing.current = false
      return
    }

    let timer: ReturnType<typeof setTimeout>

    function step() {
      const phrase = PHRASES[phraseIndex.current] ?? ''

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
        phraseIndex.current = (phraseIndex.current + 1) % PHRASES.length
      }
      timer = setTimeout(step, ERASE_MS)
    }

    timer = setTimeout(step, TYPE_MS)
    return () => clearTimeout(timer)
  }, [idle])

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault()
        const trimmed = query.trim()
        router.push(trimmed ? `/doctors?q=${encodeURIComponent(trimmed)}` : '/doctors')
      }}
      className="flex items-center gap-2 rounded-2xl border border-white/40 bg-white/85 p-2 shadow-glass backdrop-blur-xl"
    >
      <label htmlFor="mobile-hero-search" className="sr-only">
        {STATIC_PLACEHOLDER}
      </label>

      <div className="relative flex-1">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-dark-base/45" />
        <input
          id="mobile-hero-search"
          type="search"
          value={query}
          autoComplete="off"
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          // The real placeholder attribute stays the plain sentence, so assistive tech
          // and a reduced-motion user get a stable, meaningful hint.
          placeholder={STATIC_PLACEHOLDER}
          className={[
            'min-h-[44px] w-full rounded-xl bg-transparent pl-9 pr-2 text-sm text-brand-dark-base',
            // Hide the native placeholder only while the animated one is showing.
            idle ? 'placeholder:text-transparent' : 'placeholder:text-brand-dark-base/45',
          ].join(' ')}
        />

        {idle && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-9 top-1/2 -translate-y-1/2 truncate text-sm text-brand-dark-base/45"
          >
            {typed}
            <span className="ml-px inline-block animate-caret font-normal">|</span>
          </span>
        )}
      </div>

      <button
        type="submit"
        className="tap-target focus-ring-inverse shrink-0 rounded-xl bg-brand-teal px-4 text-sm font-semibold text-white"
      >
        Search
      </button>
    </form>
  )
}
