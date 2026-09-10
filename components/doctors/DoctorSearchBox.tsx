'use client'

// components/doctors/DoctorSearchBox.tsx
//
// The consultant search field, with a suggestion list under it.
//
// THIS IS STILL THE PLAIN GET FORM. The <form action="/doctors" method="get"> and its
// submit button are unchanged and do the same thing they always did, so the page works
// on a throttled connection, before hydration, and with JavaScript off — which on a
// hospital directory is the difference between a page that works and a page that works
// eventually. The suggestion list is an enhancement layered on top: if the client code
// never runs, typing and pressing Search still finds consultants.
//
// The index is built in lib/doctor-search.ts from the same in-process catalogue the
// server renders from. Thirty-odd entries, so there is no fetch, no debounce and no
// loading state to design — the list is recomputed synchronously as you type.

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SearchIcon } from '@/components/icons'
import { suggestSearch } from '@/lib/doctor-search'

export function DoctorSearchBox({ defaultQuery = '' }: { defaultQuery?: string }) {
  const router = useRouter()
  const [query, setQuery] = useState(defaultQuery)
  const [open, setOpen] = useState(false)
  // -1 means "nothing highlighted", which is not the same as "the first row is
  // highlighted": on Enter with nothing highlighted the form submits as a search, which
  // is what someone who typed a word we have no suggestion for expects.
  const [active, setActive] = useState(-1)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  const suggestions = useMemo(() => suggestSearch(query), [query])
  const visible = open && suggestions.length > 0

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  function choose(index: number) {
    const suggestion = suggestions[index]
    if (!suggestion) return
    setOpen(false)
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
      // Only intercept Enter when a row is actually highlighted. Otherwise the form
      // submits normally and the reader gets the full result page.
      event.preventDefault()
      choose(active)
    }
  }

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
          id="doctor-search"
          type="search"
          name="q"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
            setActive(-1)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Name, speciality or department"
          autoComplete="off"
          role="combobox"
          aria-expanded={visible}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            visible && active >= 0 ? `${listId}-option-${active}` : undefined
          }
          className="min-h-[44px] flex-1 rounded-xl border border-brand-teal/20 bg-white px-4 text-sm text-brand-dark-base placeholder:text-brand-dark-base/45 max-md:text-base"
        />
        <button
          type="submit"
          className="tap-target focus-ring-inverse rounded-xl bg-brand-teal px-6 text-sm font-semibold text-white hover:bg-brand-teal-dark"
        >
          Search
        </button>
      </form>

      {visible && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Suggestions"
          // Above the page but below the header's dropdowns, and positioned against the
          // input rather than the form so it does not jump when the button wraps onto
          // its own line on a phone.
          className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-xl border border-brand-teal/15 bg-white py-1 shadow-glass sm:right-[7.5rem]"
        >
          {suggestions.map((suggestion, index) => (
            <li key={`${suggestion.kind}-${suggestion.href}`} role="presentation">
              <button
                type="button"
                id={`${listId}-option-${index}`}
                role="option"
                aria-selected={index === active}
                // Pointer-down rather than click: a click fires after blur, and blur
                // would have already closed the list out from under the pointer.
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
                  the kind of thing people only notice by being surprised.
                */}
                <span className="shrink-0 rounded-full bg-brand-mist px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-teal">
                  {suggestion.kind === 'doctor' ? 'Doctor' : 'Department'}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
