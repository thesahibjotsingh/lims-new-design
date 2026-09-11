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

import { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SearchIcon } from '@/components/icons'
import {
  SuggestionList,
  useCloseOnOutside,
  useSearchSuggest,
} from '@/components/search/SearchSuggest'
import { useTypewriter } from '@/components/search/useTypewriter'

const PHRASES = [
  'Orthopaedics',
  'Dr. Shweta Godara',
  'Ultrasound',
  'Emergency services',
  'Physiotherapy',
]

const STATIC_PLACEHOLDER = 'Search doctors, departments or tests'

export function TypewriterSearchBar() {
  const rootRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  const {
    suggestions,
    visible,
    showingRecent,
    active,
    setActive,
    setOpen,
    choose,
    listId,
    inputProps,
  } =
    useSearchSuggest({ query })

  useCloseOnOutside(
    rootRef,
    useCallback(() => setOpen(false), [setOpen]),
  )

  // The timing, the reduced-motion gate and the cleanup live in the shared hook, so
  // this bar and the header search cannot drift apart.
  const idle = !focused && query.length === 0
  const typed = useTypewriter(PHRASES, idle)

  return (
    <div ref={rootRef} className="relative">
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
          {...inputProps}
          id="mobile-hero-search"
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
            setActive(-1)
          }}
          onFocus={() => {
            setFocused(true)
            inputProps.onFocus()
          }}
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

      {visible && (
        <SuggestionList
          suggestions={suggestions}
          active={active}
          setActive={setActive}
          choose={choose}
          listId={listId}
          showingRecent={showingRecent}
        />
      )}
    </div>
  )
}
