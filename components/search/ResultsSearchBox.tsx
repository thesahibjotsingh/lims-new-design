'use client'

// components/search/ResultsSearchBox.tsx
//
// The search field of the results page (components/search/SearchResults.tsx) and of the "page not
// found" page, with suggestions under it like every other search box on the site. Pressing Search or
// Enter opens the results page for what was typed; choosing a suggestion opens that page directly.
//
// Underneath it is a plain GET form to /search, so the address is right even before the page's scripts
// have run.
//
//   band    on the teal strip at the top of the results page: a white pill, Search inside it.
//   plain   on a white page (the 404): the same pill with an outline, so it shows against white.

import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { SearchIcon } from '@/components/icons'
import {
  SuggestionList,
  useCloseOnOutside,
  useSearchSuggest,
} from '@/components/search/SearchSuggest'
import { VoiceButton } from '@/components/search/VoiceButton'

export function ResultsSearchBox({
  initial = '',
  variant = 'band',
  placeholder,
  id = 'results-search',
}: {
  initial?: string
  variant?: 'band' | 'plain'
  placeholder?: string
  id?: string
}) {
  const t = useTranslations('searchPage')
  const tSearch = useTranslations('search')
  const [query, setQuery] = useState(initial)
  const rootRef = useRef<HTMLDivElement>(null)

  // A new search from elsewhere on the page (a corrected spelling, "search instead for") changes the
  // address; the field follows it.
  useEffect(() => {
    setQuery(initial)
  }, [initial])

  const { visible, setActive, setOpen, voice, inputProps, listProps, submit } = useSearchSuggest({
    query,
    onQueryChange: setQuery,
  })

  useCloseOnOutside(
    rootRef,
    useCallback(() => setOpen(false), [setOpen]),
  )

  return (
    <div ref={rootRef} className="relative">
      <form
        action="/search"
        method="get"
        role="search"
        onSubmit={(event) => {
          event.preventDefault()
          submit()
        }}
      >
        <label htmlFor={id} className="sr-only">
          {t('searchLabel')}
        </label>
        <div
          className={[
            'flex min-h-[48px] items-center rounded-full bg-white pl-4 pr-1',
            variant === 'band'
              ? 'shadow-[0_0_0_3px_rgba(255,255,255,0.25)]'
              : 'border border-brand-teal/25 shadow-sm',
          ].join(' ')}
        >
          <SearchIcon aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-dark-base/45" />
          <input
            {...inputProps}
            id={id}
            type="search"
            name="q"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setOpen(true)
              setActive(-1)
            }}
            placeholder={placeholder ?? tSearch('placeholder')}
            // 16px on a phone, or iOS Safari zooms the page on focus and never zooms back.
            className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-base text-brand-dark-base outline-none placeholder:text-brand-dark-base/45"
          />
          <VoiceButton voice={voice} className="mr-1 h-10 w-10" />
          <button
            type="submit"
            className="tap-target focus-ring-inverse rounded-full bg-brand-teal px-5 text-sm font-semibold text-white hover:bg-brand-teal-dark"
          >
            {tSearch('searchButton')}
          </button>
        </div>
      </form>

      {visible && <SuggestionList {...listProps} />}
    </div>
  )
}
