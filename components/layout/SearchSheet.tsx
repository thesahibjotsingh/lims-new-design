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
import { TypewriterPlaceholder } from '@/components/search/TypewriterPlaceholder'
import { GENERAL_SEARCH_PHRASES } from '@/components/search/searchPhrases'

const SEARCH_PLACEHOLDER = 'Search doctors, departments, pages'

/**
 * Progressive resistance for the one direction a drag on this handle shouldn't just
 * move the sheet 1:1 — pulling UP past the sheet's own resting position. A hard clamp
 * there reads as hitting a wall; this reads as there being something (barely) more to
 * pull against, the same soft boundary a real scroll view gives you.
 */
function rubberband(overshoot: number, dimension: number, constant = 0.55): number {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot))
}

export function SearchSheet() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  /*
   * Pull-down-to-dismiss on the grabber handle.
   *
   * `dragY` is the panel's live offset in px below its resting (open) position — 0
   * at rest, positive while being dragged down, briefly larger than the viewport
   * while following through on a release that dismisses. It is applied as an inline
   * `transform`, not a Tailwind class, because it has to track the pointer at
   * arbitrary pixel values every frame, not jump between two fixed states.
   *
   * `dragging` kills the CSS transition while the pointer is down — direct
   * manipulation has to be 1:1 with zero lag, and a transition here would make the
   * sheet visibly chase the finger instead of sitting glued to it (see the
   * Apple-design skill's "Direct manipulation" and "Response" sections). The
   * transition comes back the instant the pointer lifts, so the settle (snap back
   * or follow through and close) is still animated.
   */
  const [dragY, setDragY] = useState(0)
  const [dragging, setDragging] = useState(false)
  // `startY` is fixed for the whole gesture — every live position reads against it.
  // `history` is a SEPARATE, deliberately short rolling window used only to compute
  // velocity at release; capping it matters there (an old sample from a pause at the
  // start of a long drag would otherwise understate how fast the release itself was)
  // but must never feed the position math, which needs the true, unmoving origin.
  const dragRef = useRef<{ startY: number; history: { y: number; t: number }[] } | null>(
    null,
  )
  const panelRef = useRef<HTMLDivElement>(null)

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

  function onHandlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    // Best-effort: capture is what keeps pointermove reporting once the finger
    // drifts off this ~40px handle, which a real drag of any size will do
    // immediately. Some engines throw here for pointer ids they don't recognise
    // as an active session — without the pointer captured the gesture degrades
    // to "only tracks while directly over the handle" rather than failing.
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      // Fall through — see above.
    }
    dragRef.current = { startY: event.clientY, history: [{ y: event.clientY, t: performance.now() }] }
    setDragging(true)
  }

  function onHandlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    if (!drag) return
    const raw = event.clientY - drag.startY
    const height = panelRef.current?.getBoundingClientRect().height ?? window.innerHeight
    // Free 1:1 downward (toward dismiss); rubber-banded if they pull the other way.
    setDragY(raw >= 0 ? raw : -rubberband(-raw, height))

    drag.history.push({ y: event.clientY, t: performance.now() })
    if (drag.history.length > 6) drag.history.shift()
  }

  function onHandlePointerEnd(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    dragRef.current = null
    setDragging(false)
    if (!drag) return

    const first = drag.history[0]
    const last = drag.history[drag.history.length - 1]
    const dt = (last.t - first.t) / 1000
    // Ignore the timing noise from a near-instant sample pair rather than let it
    // produce a spurious four-digit velocity.
    const velocity = dt > 0.005 ? (last.y - first.y) / dt : 0 // px/s, +down

    const height = panelRef.current?.getBoundingClientRect().height ?? window.innerHeight
    // Distance and velocity are independent, either one enough on its own — nearly
    // half the sheet dragged down commits regardless of how slowly it got there, and
    // a real downward flick commits from only a few px in. (An earlier version of
    // this blended velocity into the distance check via Apple's own momentum-
    // projection formula; testing it showed even a slow, 40px, clearly-not-trying-
    // to-dismiss drag already projected past the threshold — that formula is tuned
    // for flicks on a scrolling list, where velocities run to the hundreds of px/s,
    // not for a deliberate small nudge on a modal's grabber.)
    const dismiss = dragY > 0 && (dragY > height * 0.45 || velocity > 600)

    if (dismiss) {
      // Keep following through from wherever the pointer left off, instead of
      // snapping back to the resting position first and only then animating shut —
      // that snap-first is exactly the "jump to the target value" the Apple-design
      // skill calls out. `entered` will flip false on the next render, but dragY
      // already being non-zero is what the transform below reads from now on, so
      // there is nothing for that flip to visibly change.
      setDragY(window.innerHeight + 40)
      closeSheet()
    } else {
      setDragY(0)
    }

    try {
      event.currentTarget.releasePointerCapture(event.pointerId)
    } catch {
      // Never had it, or the browser already released it on its own — either way
      // there is nothing left to release.
    }
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
              ref={panelRef}
              onTransitionEnd={(event) => {
                if (event.target !== event.currentTarget) return
                if (!open) setRendered(false)
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Search"
              style={{
                // dragY carries every state now — resting open (0), resting closed
                // (offscreen), and everything in between while a drag is live — see
                // the comment on the dragY declaration above for why this can't stay
                // a Tailwind translate-y-0/translate-y-full class pair.
                transform: `translateY(${dragging || dragY !== 0 ? dragY : entered ? 0 : window.innerHeight + 40}px)`,
                transition: dragging ? 'none' : 'transform 500ms var(--ease-drawer)',
              }}
              className={[
                // Capped and scrollable, not just auto-height: the suggestion list
                // below the field is position:absolute, so with no cap here it was
                // rendering past the bottom of the viewport — invisible the moment
                // you typed anything. `overflow-y-auto` on THIS box is what clips
                // and scrolls it back into reach instead.
                'absolute inset-x-0 bottom-0 max-h-[75vh] overflow-y-auto rounded-t-3xl border-t border-white/40 bg-white/90 p-5 pt-2 shadow-glass backdrop-blur-xl',
                '[@media(prefers-reduced-transparency:reduce)]:bg-white/98 [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none',
                'pb-[max(1.25rem,env(safe-area-inset-bottom))]',
              ].join(' ')}
            >
              {/*
                The grabber. Purely a drag handle and a visual "this can be pulled
                down" cue — aria-hidden because the sheet stays fully dismissible
                without it, via the close button below and Escape. touch-none is
                load-bearing: without it, a touch starting here is ambiguous between
                "drag the sheet" and "scroll the page", and iOS resolves that
                ambiguity by scrolling, not by handing the gesture to this handler.
              */}
              <div
                aria-hidden="true"
                onPointerDown={onHandlePointerDown}
                onPointerMove={onHandlePointerMove}
                onPointerUp={onHandlePointerEnd}
                onPointerCancel={onHandlePointerEnd}
                className="-mx-5 -mt-2 mb-2 flex touch-none select-none justify-center px-5 pb-3 pt-3 [cursor:grab] active:[cursor:grabbing]"
              >
                <span className="h-1.5 w-10 rounded-full bg-brand-dark-base/20" />
              </div>

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
                      // The real placeholder attribute stays the plain sentence, so
                      // assistive tech and a reduced-motion reader get a stable,
                      // meaningful hint — the overlay below owns every visible state.
                      placeholder={SEARCH_PLACEHOLDER}
                      value={query}
                      onChange={(event) => {
                        setQuery(event.target.value)
                        setSuggestOpen(true)
                        setActive(-1)
                      }}
                      // 16px, or iOS Safari zooms the whole sheet on focus.
                      className="min-h-[48px] w-full rounded-xl border border-brand-teal/15 bg-white pl-9 pr-3 text-base text-brand-dark-base shadow-sm outline-none placeholder:text-transparent focus:border-brand-teal/40"
                    />
                    {query.length === 0 && (
                      <TypewriterPlaceholder
                        phrases={GENERAL_SEARCH_PHRASES}
                        // No `focused` gate here unlike the other search fields — this
                        // one auto-focuses the instant the sheet opens (see the
                        // trigger button's onClick), so gating on focus would mean it
                        // never gets a chance to animate at all. Query content is
                        // still what stops it, same as everywhere else.
                        idle={query.length === 0}
                        staticText={SEARCH_PLACEHOLDER}
                        className="pointer-events-none absolute left-9 right-0 top-1/2 -translate-y-1/2 truncate pr-3 text-base text-brand-dark-base/45"
                      />
                    )}
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
