'use client'

// components/layout/HeaderSearch.tsx
//
// The search in the white branding tier. A 44px icon at rest that grows leftward into a
// full field, and the site-wide suggestion list underneath it.
//
// WHY IT GROWS LEFTWARD AND NOT RIGHTWARD: the emergency number and the appointment
// button sit to its right, and they are the two things on this header that must never
// move. So the element that reserves space in the flex row is a fixed 44px box, and the
// field itself is absolutely positioned inside it against the RIGHT edge. Growing the
// width then extends it to the left, over the empty gutter between the lockup and the
// emergency line, and nothing in the row reflows. Animating a width inside the flex row
// instead would shove the emergency number sideways every time someone clicked search.
//
// `width` is not a compositor-friendly property and a transform would be cheaper — but
// a scaled field scales its own text and its border radius with it, which reads as a
// zoom rather than as a field opening. Forty frames of width on a 44px-tall element,
// once per interaction, is a cost worth paying for the right motion. Reduced motion is
// handled globally in globals.css, which flattens the duration to nothing.

import { useCallback, useEffect, useRef, useState } from 'react'
import { CloseIcon, SearchIcon } from '@/components/icons'
import {
  SuggestionList,
  useCloseOnOutside,
  useSearchSuggest,
} from '@/components/search/SearchSuggest'
import { useTypewriter } from '@/components/search/useTypewriter'

/**
 * "Search for " is fixed and the rest types itself.
 *
 * The fixed half is what makes the moving half readable: the eye settles on a stable
 * left edge and only the last word changes, instead of the whole line reflowing. Every
 * phrase is a real destination on this site — a department, a named consultant, a test,
 * a page — so the animation doubles as a list of what the box can actually find.
 */
const SEARCH_PREFIX = 'Search for '

const PHRASES = [
  'Orthopaedics',
  'Dr. Shweta Godara',
  'Ultrasound',
  'health packages',
  'visiting hours',
  'Physiotherapy',
]

/** Shown to assistive tech and whenever motion is off. Stable, and says the same thing. */
const STATIC_PLACEHOLDER = 'Search doctors, departments and pages'

export function HeaderSearch() {
  const [expanded, setExpanded] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

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

  // Only while the field is open, empty and unfocused-by-typing. A placeholder that
  // keeps animating under a caret is the thing rule 1 in useTypewriter forbids.
  const typed = useTypewriter(PHRASES, expanded && query.length === 0)

  const collapse = useCallback(() => {
    setExpanded(false)
    setOpen(false)
    setQuery('')
  }, [setOpen])

  useCloseOnOutside(rootRef, collapse)

  // Focus follows the expansion, and only the expansion. Focusing on every render would
  // steal the caret back from anyone who tabbed away mid-animation.
  useEffect(() => {
    if (expanded) inputRef.current?.focus()
  }, [expanded])

  return (
    <div
      ref={rootRef}
      // Fixed 44px in the row. The field overflows this box to the left when open, which
      // is exactly why the rest of the header never shifts.
      className="relative h-11 w-11"
    >
      <div
        className={[
          'absolute right-0 top-0 flex h-11 items-center rounded-full',
          'transition-[width,background-color,border-color,box-shadow] duration-300 ease-out',
          expanded
            ? 'w-[20rem] border border-brand-teal/20 bg-white shadow-sm xl:w-[24rem]'
            : 'w-11 border border-transparent bg-transparent',
        ].join(' ')}
      >
        <label htmlFor="header-search" className="sr-only">
          Search doctors, departments and pages
        </label>
        <input
          {...inputProps}
          ref={inputRef}
          id="header-search"
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
            setActive(-1)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              // Escape closes the whole control, not just the list, and hands focus back
              // to the button that opened it — otherwise the caret is left inside a
              // field that is 44px wide and has no visible text.
              collapse()
              triggerRef.current?.focus()
              return
            }
            inputProps.onKeyDown(event)
          }}
          // The real placeholder attribute stays a plain sentence, so a screen reader
          // and a reduced-motion reader get something stable and meaningful. The
          // animated line is painted over it below.
          placeholder={STATIC_PLACEHOLDER}
          // Untabbable and unreadable while collapsed: a 0-opacity input still takes
          // focus and is still announced, which would put a hidden field in the middle
          // of the header's tab order.
          tabIndex={expanded ? 0 : -1}
          aria-hidden={!expanded}
          className={[
            'min-w-0 flex-1 bg-transparent pl-5 text-sm text-brand-dark-base outline-none',
            'transition-opacity duration-200',
            // Hide the native placeholder only while the animated one is showing, or
            // the two sit on top of each other.
            typed.length > 0
              ? 'placeholder:text-transparent'
              : 'placeholder:text-brand-dark-base/45',
            expanded ? 'opacity-100' : 'pointer-events-none opacity-0',
          ].join(' ')}
        />

        {expanded && typed.length > 0 && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 truncate pr-14 text-sm text-brand-dark-base/45"
          >
            {SEARCH_PREFIX}
            {typed}
            <span className="ml-px inline-block animate-caret font-normal">|</span>
          </span>
        )}

        <button
          ref={triggerRef}
          type="button"
          onClick={() => {
            if (expanded) {
              collapse()
              return
            }
            setExpanded(true)
            setOpen(true)
          }}
          aria-expanded={expanded}
          aria-label={expanded ? 'Close search' : 'Search doctors, departments and pages'}
          // Stays pinned at the right edge at both widths, so the icon is the fixed
          // point the field appears to grow out of.
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-brand-teal transition-colors hover:bg-brand-mist"
        >
          {/*
            Heavier stroke than the icon set's 1.75 default and a couple of pixels
            larger. At rest this glyph is the entire control — there is no label beside
            it to carry the weight, so it has to hold its own against the emergency
            beacon and the copper button sitting next to it.
          */}
          {expanded ? (
            <CloseIcon className="h-[18px] w-[18px]" strokeWidth={2.25} />
          ) : (
            <SearchIcon className="h-[23px] w-[23px]" strokeWidth={2.9} />
          )}
        </button>
      </div>

      {expanded && visible && (
        <SuggestionList
          suggestions={suggestions}
          active={active}
          setActive={setActive}
          choose={choose}
          listId={listId}
          showingRecent={showingRecent}
          // Anchored to the same right edge as the field, and given the field's width
          // rather than the 44px box's, or it would be a sliver under the icon.
          className="left-auto w-[20rem] xl:w-[24rem]"
        />
      )}
    </div>
  )
}
