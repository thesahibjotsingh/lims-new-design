'use client'

// components/search/SearchSuggest.tsx
//
// The suggestion list that drops under a search input, and the keyboard wiring that
// goes with it. Shared, because the site has three search inputs — the desktop hero
// card, the mobile hero bar, and the consultant directory — and three copies of a
// combobox is three chances for them to disagree about what Enter does.
//
// The index it searches is lib/doctor-search.ts, built from the in-process catalogue.
// Around thirty entries, so there is no fetch, no debounce and no loading state: the
// list is recomputed synchronously while you type.
//
// The host form always keeps working on its own. Nothing here is required for a search
// to run — the input and its submit button do what they did before, and this only adds
// a faster route to a specific destination.

import { useEffect, useId, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SearchIcon } from '@/components/icons'
import { suggestSearch } from '@/lib/search'
import type { SearchSuggestion, SuggestionKind } from '@/lib/search'

/* -------------------------------------------------------------------------- */
/* Recent searches                                                             */
/* -------------------------------------------------------------------------- */

const RECENT_KEY = 'lims:recent-searches'
const RECENT_MAX = 4

/**
 * Reads the reader's recent picks.
 *
 * Every access is wrapped: localStorage throws outright in some privacy modes rather
 * than returning null, and a search box that crashes because history is unavailable is
 * a worse failure than one that simply has no history to show. It stays on the device —
 * nothing here is sent anywhere, which matters on a hospital site where what somebody
 * searched for is itself sensitive.
 */
function readRecent(): SearchSuggestion[] {
  try {
    const raw = window.localStorage.getItem(RECENT_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (item): item is SearchSuggestion =>
        !!item && typeof item.label === 'string' && typeof item.href === 'string',
    )
  } catch {
    return []
  }
}

export function rememberSearch(suggestion: SearchSuggestion): void {
  try {
    const next = [
      suggestion,
      ...readRecent().filter((item) => item.href !== suggestion.href),
    ].slice(0, RECENT_MAX)
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next))
  } catch {
    // No history is a fine outcome; never let it break the search.
  }
}

export function useSearchSuggest({
  query,
  kinds,
}: {
  query: string
  /** Narrows the list, e.g. the hero card's "A doctor" / "A department" toggle. */
  kinds?: SuggestionKind[]
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  // -1 is "nothing highlighted", which is NOT the same as "the first row is
  // highlighted". With nothing highlighted, Enter submits the form as an ordinary
  // search — what someone who typed a word we have no suggestion for expects.
  const [active, setActive] = useState(-1)
  const [recent, setRecent] = useState<SearchSuggestion[]>([])
  const listId = useId()

  // Read on mount, not during render: localStorage does not exist on the server, and
  // seeding state from it would make the first client render disagree with the HTML.
  useEffect(() => setRecent(readRecent()), [])

  // Filtering happens inside the matcher rather than after it, so a narrowed list is
  // still a full-length list rather than whatever survives from the top seven.
  const matches = useMemo(() => suggestSearch(query, { kinds }), [query, kinds])

  // With nothing typed, the list shows where this reader went last time. It is the one
  // moment a search box can be useful before it has been used.
  const showingRecent = query.trim().length < 2 && matches.length === 0
  const suggestions = showingRecent ? recent : matches

  const visible = open && suggestions.length > 0

  function choose(index: number) {
    const suggestion = suggestions[index]
    if (!suggestion) return
    rememberSearch(suggestion)
    setRecent(readRecent())
    setOpen(false)
    setActive(-1)
    router.push(suggestion.href)
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      setOpen(false)
      setActive(-1)
      return
    }
    if (!visible) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((current) => (current + 1) % suggestions.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((current) => (current <= 0 ? suggestions.length - 1 : current - 1))
    } else if (event.key === 'Enter' && active >= 0) {
      event.preventDefault()
      choose(active)
    }
  }

  /** Spread onto the <input> to make it an accessible combobox. */
  const inputProps = {
    role: 'combobox' as const,
    'aria-expanded': visible,
    'aria-controls': listId,
    'aria-autocomplete': 'list' as const,
    'aria-activedescendant':
      visible && active >= 0 ? `${listId}-option-${active}` : undefined,
    autoComplete: 'off',
    onKeyDown,
    onFocus: () => setOpen(true),
  }

  return {
    suggestions,
    visible,
    showingRecent,
    active,
    setActive,
    setOpen,
    choose,
    listId,
    inputProps,
  }
}

/**
 * Closes the list when a click lands outside `ref`.
 *
 * Deliberately not an onBlur on the input: blur fires before the click on a suggestion
 * resolves, so closing there would unmount the row out from under the pointer and the
 * tap would land on whatever moved up into its place.
 */
export function useCloseOnOutside(
  ref: React.RefObject<HTMLElement | null>,
  close: () => void,
) {
  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) close()
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [ref, close])
}

const KIND_LABEL: Record<SuggestionKind, string> = {
  doctor: 'Doctor',
  department: 'Department',
  page: 'Page',
}

export function SuggestionList({
  suggestions,
  active,
  setActive,
  choose,
  listId,
  showingRecent = false,
  className = '',
}: {
  suggestions: SearchSuggestion[]
  active: number
  setActive: (index: number) => void
  choose: (index: number) => void
  listId: string
  /** Labels the list as history rather than as matches for what was typed. */
  showingRecent?: boolean
  className?: string
}) {
  return (
    <ul
      id={listId}
      role="listbox"
      aria-label={showingRecent ? 'Recent searches' : 'Suggestions'}
      className={`absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-xl border border-brand-teal/15 bg-white py-1 text-left shadow-glass ${className}`}
    >
      {showingRecent && (
        <li
          role="presentation"
          className="px-4 pb-1 pt-1.5 text-[10px] font-semibold uppercase tracking-wider text-brand-dark-base/45"
        >
          Recent
        </li>
      )}
      {suggestions.map((suggestion, index) => (
        <li key={`${suggestion.kind}-${suggestion.href}`} role="presentation">
          <button
            type="button"
            id={`${listId}-option-${index}`}
            role="option"
            aria-selected={index === active}
            // Pointer-down, not click: a click fires after blur, and by then the list
            // would already be closing.
            onMouseDown={(event) => {
              event.preventDefault()
              choose(index)
            }}
            onMouseEnter={() => setActive(index)}
            className={[
              'flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors',
              index === active ? 'bg-brand-mist' : 'bg-white',
            ].join(' ')}
          >
            <SearchIcon className="h-4 w-4 shrink-0 text-brand-dark-base/35" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-brand-dark-base">
                {suggestion.label}
              </span>
              {suggestion.detail && (
                <span className="block truncate text-xs text-brand-dark-base/55">
                  {suggestion.detail}
                </span>
              )}
            </span>
            {/*
              Says where the row goes before it is clicked. The two kinds land on
              different pages, and a list that looks uniform but behaves two ways is
              only discovered by being surprised.
            */}
            <span className="shrink-0 rounded-full bg-brand-mist px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-teal">
              {KIND_LABEL[suggestion.kind]}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
