'use client'

// components/home/TypewriterSearchBar.tsx
//
// The floating search card under the mobile hero photo. Above the field, a row of
// chips: the reader's own recent searches when they have any (the same on-device
// `lims:recent-searches` history the shared suggestion dropdown already keeps — see
// SearchSuggest.tsx's readRecent()), or a set of popular departments for a first-time
// visitor with no history yet. Then the field itself, with a placeholder that types
// itself through a rotating list of real things a patient searches for.
//
// Promoted from the "RecentFirst" direction explored in
// app/prototypes/mobile-search-bar/ round 2 (Categorized and IconGrid were the two
// not taken — a Clinical/Diagnostics/Support tab switcher above the chips, and real
// per-service icons instead of text pills). Round 1's winner, "Guided" — chips above
// the field at all, instead of a flush toolbar or a collapsed pill — is what both
// rounds built on.
//
// Four rules this obeys:
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
//
//  3. A chip is a head start, not a second search mechanism — tapping one fills the
//     field and runs the exact same suggestion match typing it would, so it can never
//     answer with something the field itself couldn't find.
//
//  4. Recent-search history stays on-device. readRecent() only ever reads
//     localStorage; nothing here sends a search anywhere, which matters on a hospital
//     site where what somebody searched for is itself sensitive.

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SearchIcon } from '@/components/icons'
import {
  SuggestionList,
  readRecent,
  useCloseOnOutside,
  useSearchSuggest,
} from '@/components/search/SearchSuggest'
import { useTypewriter } from '@/components/search/useTypewriter'
import { SERVICES } from '@/lib/services'
import type { SearchSuggestion } from '@/lib/search'

const PHRASES = [
  'Orthopaedics',
  'Dr. Shweta Godara',
  'Ultrasound',
  'Emergency services',
  'Physiotherapy',
]

const STATIC_PLACEHOLDER = 'Search doctors, departments or tests'

// Real catalogue entries, not invented chip labels. First six rather than all 26 —
// enough to show the row scrolls without turning it into the services index. Shown
// only when the reader has no recent-search history yet.
const POPULAR_CHIPS = SERVICES.slice(0, 6)

export function TypewriterSearchBar() {
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [recentChips, setRecentChips] = useState<SearchSuggestion[]>([])

  // Read on mount, not during render: localStorage doesn't exist on the server, and
  // seeding state from it would make the first client render disagree with the HTML.
  useEffect(() => setRecentChips(readRecent()), [])

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
  } = useSearchSuggest({ query })

  useCloseOnOutside(
    rootRef,
    useCallback(() => setOpen(false), [setOpen]),
  )

  // The timing, the reduced-motion gate and the cleanup live in the shared hook, so
  // this bar and the header search cannot drift apart.
  const idle = !focused && query.length === 0
  const typed = useTypewriter(PHRASES, idle)

  const showingHistory = recentChips.length > 0
  // Normalized once, here, rather than branching per-chip in the JSX: recent chips
  // are SearchSuggestion ({label, href}) and popular chips are ClinicalService
  // ({name, slug}) — two real, different shapes from two different parts of the
  // catalogue, not one glossed over as the other.
  const displayedChips = showingHistory
    ? recentChips.map((chip) => ({ key: chip.href, label: chip.label }))
    : POPULAR_CHIPS.map((service) => ({ key: service.slug, label: service.name }))

  function handleChoose(index: number) {
    choose(index)
    // `choose` already called rememberSearch internally, so this re-read picks up
    // whatever it just wrote — the chip row reflects the new pick immediately rather
    // than waiting for the next mount.
    setRecentChips(readRecent())
  }

  function pickChip(name: string) {
    setQuery(name)
    setOpen(true)
    setActive(-1)
    inputRef.current?.focus()
  }

  return (
    <div
      ref={rootRef}
      className="relative space-y-2.5 rounded-2xl border border-white/40 bg-white/85 p-3 shadow-glass backdrop-blur-xl [@media(prefers-reduced-transparency:reduce)]:bg-white/95 [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none"
    >
      <div>
        <p className="mb-1.5 px-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-dark-base/45">
          {showingHistory ? 'Based on your recent searches' : 'Popular departments'}
        </p>
        <div
          role="group"
          aria-label={showingHistory ? 'Recent searches' : 'Popular departments'}
          className="flex gap-1.5 overflow-x-auto pb-0.5 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {displayedChips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => pickChip(chip.label)}
              className="tap-target shrink-0 whitespace-nowrap rounded-full border border-brand-teal/20 bg-white px-3 text-xs font-semibold text-brand-teal transition-colors hover:bg-brand-mist"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault()
          const trimmed = query.trim()
          router.push(trimmed ? `/doctors?q=${encodeURIComponent(trimmed)}` : '/doctors')
        }}
        className="flex items-center gap-2 rounded-xl bg-white p-1.5 shadow-inner"
      >
        <label htmlFor="mobile-hero-search" className="sr-only">
          {STATIC_PLACEHOLDER}
        </label>

        <SearchIcon className="ml-2 h-4 w-4 shrink-0 text-brand-dark-base/45" />
        <div className="relative flex-1">
          <input
            {...inputProps}
            ref={inputRef}
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
            // Always transparent: the overlay below owns every state of this hint, so
            // there is no swap between the two and no flash of the plain sentence before
            // the first typed character arrives.
            className="min-h-[44px] w-full bg-transparent pr-2 text-sm text-brand-dark-base placeholder:text-transparent"
          />

          {query.length === 0 && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 truncate pr-2 text-sm text-brand-dark-base/45"
            >
              {typed.length > 0 ? (
                <>
                  {typed}
                  <span className="ml-px inline-block animate-caret font-normal">|</span>
                </>
              ) : (
                STATIC_PLACEHOLDER
              )}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="tap-target focus-ring-inverse shrink-0 rounded-lg bg-brand-teal px-4 text-xs font-semibold text-white"
        >
          Search
        </button>
      </form>

      {visible && (
        <SuggestionList
          suggestions={suggestions}
          active={active}
          setActive={setActive}
          choose={handleChoose}
          listId={listId}
          showingRecent={showingRecent}
          variant="inline"
        />
      )}
    </div>
  )
}
