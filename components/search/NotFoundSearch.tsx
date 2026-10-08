'use client'

// components/search/NotFoundSearch.tsx
//
// The search box on the "page not found" page. Someone who mistyped an address or followed a
// stale link was looking for something specific, so the quickest way out is to let them say
// what it was, in the same search the rest of the site uses (suggestions, Hindi and Punjabi in
// English letters, voice).
//
// Like the doctors page box, it is a plain GET form underneath: without JavaScript, Search
// opens the consultant directory with the typed words, which suggests departments when no
// doctor matches.

import { useCallback, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { SearchIcon } from '@/components/icons'
import {
  SuggestionList,
  useCloseOnOutside,
  useSearchSuggest,
} from '@/components/search/SearchSuggest'
import { VoiceButton } from '@/components/search/VoiceButton'

export function NotFoundSearch() {
  const t = useTranslations('notFound')
  const tSearch = useTranslations('search')
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)

  const { visible, setActive, setOpen, voice, inputProps, listProps } = useSearchSuggest({
    query,
    onQueryChange: setQuery,
  })

  useCloseOnOutside(
    rootRef,
    useCallback(() => setOpen(false), [setOpen]),
  )

  return (
    <div ref={rootRef} className="relative max-w-xl">
      <form action="/doctors" method="get" role="search" className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="notfound-search" className="sr-only">
          {t('searchLabel')}
        </label>
        <div className="relative flex-1">
          <SearchIcon
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-dark-base/40"
          />
          <input
            {...inputProps}
            id="notfound-search"
            type="search"
            name="q"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setOpen(true)
              setActive(-1)
            }}
            placeholder={tSearch('placeholder')}
            // 16px on a phone, or iOS Safari zooms the page on focus and never zooms back.
            className="min-h-[48px] w-full rounded-xl border border-brand-teal/25 bg-white py-2 pl-10 pr-12 text-sm text-brand-dark-base shadow-sm placeholder:text-brand-dark-base/45 max-md:text-base"
          />
          <VoiceButton voice={voice} className="absolute right-1.5 top-1/2 h-9 w-9 -translate-y-1/2" />
        </div>
        <button
          type="submit"
          className="tap-target focus-ring-inverse rounded-xl bg-brand-copper px-6 text-sm font-semibold text-white shadow-sm hover:bg-brand-copper-hover"
        >
          {tSearch('searchButton')}
        </button>
      </form>

      {visible && <SuggestionList {...listProps} className="sm:right-[7.5rem]" />}
    </div>
  )
}
