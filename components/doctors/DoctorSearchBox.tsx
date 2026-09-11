'use client'

// components/doctors/DoctorSearchBox.tsx
//
// The consultant directory's search field, with suggestions under it.
//
// THIS IS STILL THE PLAIN GET FORM. The <form action="/doctors" method="get"> and its
// submit button are unchanged, so the page works on a throttled connection, before
// hydration, and with JavaScript off — which on a hospital directory is the difference
// between a page that works and a page that works eventually. The suggestion list is
// layered on top; if the client code never runs, typing and pressing Search still finds
// consultants.
//
// The combobox behaviour lives in components/search/SearchSuggest.tsx, shared with the
// two hero search inputs.

import { useCallback, useRef, useState } from 'react'
import {
  SuggestionList,
  useCloseOnOutside,
  useSearchSuggest,
} from '@/components/search/SearchSuggest'

export function DoctorSearchBox({ defaultQuery = '' }: { defaultQuery?: string }) {
  const [query, setQuery] = useState(defaultQuery)
  const rootRef = useRef<HTMLDivElement>(null)

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

  return (
    <div ref={rootRef} className="relative mt-6 max-w-lg">
      <form
        action="/doctors"
        method="get"
        role="search"
        className="flex flex-col gap-2 sm:flex-row"
      >
        <label htmlFor="doctor-search" className="sr-only">
          Search doctors by name, speciality or department
        </label>
        <input
          {...inputProps}
          id="doctor-search"
          type="search"
          name="q"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
            setActive(-1)
          }}
          placeholder="Name, speciality or department"
          // 16px on mobile, or iOS Safari zooms the page on focus and never zooms back.
          className="min-h-[44px] flex-1 rounded-xl border border-brand-teal/20 bg-white px-4 text-sm text-brand-dark-base placeholder:text-brand-dark-base/45 max-md:text-base"
        />
        <button
          type="submit"
          // Copper, not teal. This box sits inside the banner header, which is now
          // brand teal — a teal button on a teal band is an invisible control.
          className="tap-target focus-ring-inverse rounded-xl bg-brand-copper px-6 text-sm font-semibold text-white hover:bg-brand-copper-hover"
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
          // Stops short of the Search button once the row goes horizontal at sm.
          className="sm:right-[7.5rem]"
        />
      )}
    </div>
  )
}
