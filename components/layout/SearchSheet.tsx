'use client'

// components/layout/SearchSheet.tsx
//
// The floating search button beside the bottom pill, and the sheet it opens.
//
// Deliberately its OWN control, not a 5th tab inside MobileBottomNav's pill: search
// isn't a destination the way Home/Doctors/Departments/Book are, it's a tool you reach
// for from anywhere and then leave. Grouping it with the tabs would say it is a place;
// keeping it a separate floating circle — the same shape iOS uses for the same reason —
// says it is an action.
//
// The sheet reuses the exact search index and suggestion list the desktop hero card,
// the mobile hero bar and the drawer already use — a fourth copy of that logic here
// would be a fourth place for the three to drift apart from.

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal, flushSync } from 'react-dom'
import { useRouter } from 'next/navigation'
import { CloseIcon, SearchIcon } from '@/components/icons'
import {
  SuggestionList,
  useCloseOnOutside,
  useSearchSuggest,
} from '@/components/search/SearchSuggest'

export function SearchSheet() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Same three-state shape as MobileMenu's drawer, for the same reason: `open` is
  // intent, `rendered` keeps the sheet mounted for the exit transition, `entered`
  // is the visual position and lags `rendered` by one frame on the way in so the
  // browser has a "before" to transition from.
  const [open, setOpen] = useState(false)
  const [rendered, setRendered] = useState(false)
  const [entered, setEntered] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const {
    suggestions,
    visible,
    showingRecent,
    active,
    setActive,
    setOpen: setSuggestOpen,
    choose,
    listId,
    inputProps,
  } = useSearchSuggest({ query })

  useCloseOnOutside(
    rootRef,
    // Outside the search FIELD closes the suggestion list, not the sheet — the
    // sheet itself only closes via its own backdrop, its own close button, or
    // Escape. Reusing this hook for both would dismiss the sheet the instant a
    // suggestion row lost focus.
    useCallback(() => setSuggestOpen(false), [setSuggestOpen]),
  )

  function closeSheet() {
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    setRendered(true)
  }, [open])

  useEffect(() => {
    if (!rendered || !open) return
    const id = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(id)
  }, [rendered, open])

  useEffect(() => {
    if (open) return
    setEntered(false)
    if (!rendered) return
    closeTimerRef.current = setTimeout(() => setRendered(false), 500)
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [open, rendered])

  useEffect(() => {
    if (!rendered) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [rendered])

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeSheet()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Clears between visits so re-opening the sheet never shows the last person's
  // query on a shared device — the mobile hero bar and hero card both persist
  // theirs, but those live IN the page you were already reading; this one floats
  // above whatever page you're on, which makes a stale query feel like it leaked.
  useEffect(() => {
    if (open) return
    const id = setTimeout(() => setQuery(''), 500)
    return () => clearTimeout(id)
  }, [open])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const trimmed = query.trim()
    router.push(trimmed ? `/doctors?q=${encodeURIComponent(trimmed)}` : '/doctors')
    closeSheet()
  }

  function chooseAndClose(index: number) {
    choose(index)
    closeSheet()
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          // Mobile Safari (and most Android browsers) only raise the on-screen
          // keyboard for a `.focus()` call that happens synchronously inside the
          // same event handler as the tap that triggered it — not one deferred to
          // a later frame, a transition-end, or a plain useEffect, all of which run
          // after the browser has stopped treating this as "the" trusted gesture.
          // `flushSync` forces the mount to commit to the DOM right here, in this
          // call stack, so `inputRef.current` exists and the immediately-following
          // `.focus()` still counts as gesture-driven. The visual slide-in is
          // unaffected — `entered` still lags a frame behind for the transform to
          // animate from, this only moves the FOCUS call earlier, not the motion.
          flushSync(() => {
            setOpen(true)
            setRendered(true)
          })
          inputRef.current?.focus()
        }}
        aria-label="Search doctors, departments and pages"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="tap-target focus-ring-inverse pointer-events-auto grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/40 bg-brand-teal text-white shadow-glass"
      >
        <SearchIcon className="h-5 w-5" strokeWidth={2.25} />
      </button>

      {rendered &&
        createPortal(
          // Same stacking-context escape as MobileMenu, same reason: nested inside
          // MobileHeader's sticky+z-index stacking context, this would lose to
          // MobileBottomNav's own z-50 painted straight into <body>.
          <div className="fixed inset-0 z-[60] lg:hidden">
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={closeSheet}
              className={[
                'absolute inset-0 h-full w-full cursor-default bg-brand-dark-base/60 backdrop-blur-sm',
                '[@media(prefers-reduced-transparency:reduce)]:bg-brand-dark-base/90 [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none',
                'transition-opacity duration-500 ease-[var(--ease-out)]',
                entered ? 'opacity-100' : 'opacity-0',
              ].join(' ')}
            />

            <div
              onTransitionEnd={(event) => {
                if (event.target !== event.currentTarget) return
                if (!open) setRendered(false)
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Search"
              className={[
                // Capped and scrollable, not just auto-height: the suggestion list
                // below the field is position:absolute, so with no cap here it was
                // rendering past the bottom of the viewport — invisible the moment
                // you typed anything. `overflow-y-auto` on THIS box is what clips
                // and scrolls it back into reach instead.
                'absolute inset-x-0 bottom-0 max-h-[75vh] overflow-y-auto rounded-t-3xl border-t border-white/40 bg-white/90 p-5 shadow-glass backdrop-blur-xl',
                '[@media(prefers-reduced-transparency:reduce)]:bg-white/98 [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none',
                'pb-[max(1.25rem,env(safe-area-inset-bottom))]',
                'transition-transform duration-500 ease-[var(--ease-drawer)]',
                entered ? 'translate-y-0' : 'translate-y-full',
              ].join(' ')}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-brand-dark-base">
                  Search LIMS
                </h2>
                <button
                  type="button"
                  onClick={closeSheet}
                  aria-label="Close search"
                  className="tap-target -mr-2 h-9 w-9 rounded-full text-brand-dark-base/50 hover:bg-brand-mist"
                >
                  <CloseIcon className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div ref={rootRef} className="relative">
                  <label htmlFor="bottom-sheet-search" className="sr-only">
                    Search doctors, departments or pages
                  </label>
                  <div className="relative">
                    <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-dark-base/45" />
                    <input
                      {...inputProps}
                      ref={inputRef}
                      id="bottom-sheet-search"
                      type="search"
                      // A real page under a bottom sheet, not a floating card over a
                      // photo — nothing behind this field needs the placeholder to
                      // do double duty as a typewriter, so it stays a plain static
                      // hint like the drawer's own search field does.
                      placeholder="Search doctors, departments, pages"
                      value={query}
                      onChange={(event) => {
                        setQuery(event.target.value)
                        setSuggestOpen(true)
                        setActive(-1)
                      }}
                      // 16px, or iOS Safari zooms the whole sheet on focus.
                      className="min-h-[48px] w-full rounded-xl border border-brand-teal/15 bg-white pl-9 pr-3 text-base text-brand-dark-base shadow-sm outline-none placeholder:text-brand-dark-base/45 focus:border-brand-teal/40"
                    />
                  </div>

                  {visible && (
                    <SuggestionList
                      suggestions={suggestions}
                      active={active}
                      setActive={setActive}
                      choose={chooseAndClose}
                      listId={listId}
                      showingRecent={showingRecent}
                      variant="inline"
                    />
                  )}
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
