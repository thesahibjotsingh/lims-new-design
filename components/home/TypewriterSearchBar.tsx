'use client'

// components/home/TypewriterSearchBar.tsx
//
// The search field of the phone home page: one slim pill with a placeholder that types
// itself through a rotating list of real things a patient searches for, and a row of chips
// under it. The chips are the reader's own recent searches when they have any (the same
// on-device `lims:recent-searches` history the shared suggestion dropdown already keeps, see
// SearchSuggest.tsx's readRecent()), or a set of popular departments for a first-time visitor
// with no history yet.
//
// It was a card with the chips ABOVE the field and a caption above those, floating over the
// hero photograph. The photograph is gone from phones (the home page is a launcher now, see
// PhoneHome) and the card was most of a screen by itself, so it is the field and the chips
// and nothing else. The direction itself, chips that give a head start, comes from the
// "RecentFirst" prototype (app/prototypes/mobile-search-bar/ round 2).
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
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { SearchIcon } from '@/components/icons'
import {
  SuggestionList,
  clearRecent,
  onRecentChange,
  readRecent,
  useCloseOnOutside,
  useSearchSuggest,
} from '@/components/search/SearchSuggest'
import { VoiceButton } from '@/components/search/VoiceButton'
import { TypewriterPlaceholder } from '@/components/search/TypewriterPlaceholder'
import { useScrollFade } from '@/components/primitives/useScrollFade'
import { searchPhrases } from '@/components/search/searchPhrases'
import type { Locale } from '@/i18n/routing'
import { SERVICES } from '@/lib/services'
import { translatedServiceName } from '@/lib/services-i18n'
import type { SearchSuggestion } from '@/lib/search'

// Real catalogue entries, not invented chip labels. First six rather than all 26 —
// enough to show the row scrolls without turning it into the services index. Shown
// only when the reader has no recent-search history yet.
const POPULAR_CHIPS = SERVICES.slice(0, 6)

export function TypewriterSearchBar() {
  const locale = useLocale() as Locale
  const t = useTranslations('search')
  const tSuggest = useTranslations('searchSuggest')
  const STATIC_PLACEHOLDER = t('placeholder')
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [recentChips, setRecentChips] = useState<SearchSuggestion[]>([])

  // Read on mount, not during render: localStorage doesn't exist on the server, and
  // seeding state from it would make the first client render disagree with the HTML.
  useEffect(() => {
    setRecentChips(readRecent())
    // Cleared from any search bar: the chips go back to the popular departments.
    return onRecentChange(() => setRecentChips(readRecent()))
  }, [])

  const { visible, setActive, setOpen, choose, submit, voice, inputProps, listProps } =
    useSearchSuggest({ query, popular: false, onQueryChange: setQuery })

  useCloseOnOutside(
    rootRef,
    useCallback(() => setOpen(false), [setOpen]),
  )

  // The timing, the reduced-motion gate and the cleanup live in the shared hook, so
  // this bar and every other typewriter field on the site cannot drift apart.
  const idle = !focused && query.length === 0

  const showingHistory = recentChips.length > 0
  // Normalized once, here, rather than branching per-chip in the JSX: recent chips
  // are SearchSuggestion ({label, href}) and popular chips are ClinicalService
  // ({name, slug}) — two real, different shapes from two different parts of the
  // catalogue, not one glossed over as the other.
  const displayedChips = showingHistory
    ? recentChips.map((chip) => ({ key: chip.href, label: chip.label }))
    : POPULAR_CHIPS.map((service) => ({
        key: service.slug,
        label: translatedServiceName(service.slug, locale),
      }))

  // The chip row scrolls sideways; its ends fade into the hero (see useScrollFade). The teal behind
  // the row shows through, so the white chips dissolve into it rather than stopping at an edge.
  const chipRow = useScrollFade<HTMLDivElement>(undefined, `${displayedChips.length}:${locale}`)

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
    <div ref={rootRef} className="relative">
      {/*
        One slim pill, as wide as the page, with the chips under it. It used to be a card (chips
        above the field, a caption above the chips), which was most of a screen on its own. The
        input is 16px: anything smaller and iOS Safari zooms the page when it is focused.
      */}
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault()
          // Opens the results page for what was typed (see useSearchSuggest.submit).
          if (submit()) return
          const trimmed = query.trim()
          router.push(trimmed ? `/doctors?q=${encodeURIComponent(trimmed)}` : '/doctors')
        }}
        className="flex h-[52px] items-center gap-2 rounded-full bg-brand-mist pl-4 pr-1.5 shadow-[inset_0_0_0_1px_rgba(15,91,102,0.13)] focus-within:shadow-[inset_0_0_0_2px_rgba(15,91,102,0.45)]"
      >
        <label htmlFor="mobile-hero-search" className="sr-only">
          {STATIC_PLACEHOLDER}
        </label>

        <SearchIcon className="h-[18px] w-[18px] shrink-0 text-brand-dark-base/50" />
        <div className="relative min-w-0 flex-1">
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
            className="min-h-[44px] w-full bg-transparent pr-2 text-base text-brand-dark-base outline-none placeholder:text-transparent"
          />

          {query.length === 0 && (
            <TypewriterPlaceholder
              phrases={searchPhrases(locale).general}
              idle={idle}
              staticText={STATIC_PLACEHOLDER}
              className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 truncate pr-2 text-base text-brand-dark-base/50"
            />
          )}
        </div>

        <VoiceButton voice={voice} className="h-10 w-10" />

        <button
          type="submit"
          className="tap-target focus-ring-inverse h-10 shrink-0 rounded-full bg-brand-teal px-4 text-sm font-bold text-white"
        >
          {t('searchButton')}
        </button>
      </form>

      {visible && (
        <SuggestionList
          {...listProps}
          choose={handleChoose}
          variant="inline"
        />
      )}

      <div
        ref={chipRow.ref}
        role="group"
        aria-label={showingHistory ? t('recentSearchesShort') : t('popularDepartments')}
        onScroll={chipRow.onScroll}
        className="-mx-5 -mb-0.5 mt-1.5 flex gap-2 overflow-x-auto overflow-y-hidden overscroll-x-contain px-5 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {displayedChips.map((chip) => (
          <button
            key={chip.key}
            type="button"
            onClick={() => pickChip(chip.label)}
            className="relative h-9 shrink-0 whitespace-nowrap rounded-full border border-brand-teal/15 bg-white px-3.5 text-[13px] font-semibold text-brand-teal transition-colors before:absolute before:inset-x-0 before:-inset-y-1 before:content-[''] active:bg-brand-mist"
          >
            {chip.label}
          </button>
        ))}
        {/*
          Only while the row is the reader's own history. The bar sits on the teal hero, so this is
          an outline chip in white: it reads as an action, not as one more thing to search for.
        */}
        {showingHistory && (
          <button
            type="button"
            onClick={clearRecent}
            aria-label={tSuggest('clearRecentAria')}
            className="relative h-9 shrink-0 whitespace-nowrap rounded-full border border-white/40 px-3.5 text-[13px] font-semibold text-white transition-colors before:absolute before:inset-x-0 before:-inset-y-1 before:content-[''] active:bg-white/15"
          >
            {tSuggest('clearRecent')}
          </button>
        )}
      </div>
    </div>
  )
}
