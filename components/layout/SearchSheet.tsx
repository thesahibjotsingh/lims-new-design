'use client'

// components/layout/SearchSheet.tsx
//
// The Search tab of the phone's bottom pill, and what it turns into.
//
// IT IS THE LEFT END OF THE PILL, AND THE PILL BECOMES THE SEARCH BAR, the way iPhone search does:
//   - tap Search and the other tabs slide away while the pill's left end grows to the right into the
//     search field, with a round close button appearing at the right;
//   - the field settles at the BOTTOM of the screen, just above the keyboard, and the results fill all
//     of the screen above it, so the thumb never covers what it is looking for;
//   - the page behind blurs and dims, and a tap on it closes the search;
//   - closing runs the same path back into the pill, from wherever the spring is, so a tap mid-opening
//     reverses without a jump.
//
// ONE SPRING DRIVES IT (lib/spring.ts, critically damped: no bounce, as nothing here was thrown). It is a
// number from 0 to 1. At 0 the field is exactly the pill's left end (same place, same height, same glass);
// at 1 it is the bar above the keyboard. Everything else (the results, the close button, the blur, the
// tabs sliding away) is that one number turned into a style, straight on the DOM, because it runs every
// frame and a React render per frame is not something to pay for. The tabs read it through the CSS
// variable --search-p on <html> (app/globals.css, .bottom-nav).
//
// REDUCED MOTION swaps all of it for a short cross-fade. REDUCED TRANSPARENCY drops the blur.
//
// THE BAR FOLLOWS THE KEYBOARD. It is placed from the VISUAL viewport, which is what shrinks when the
// on-screen keyboard comes up, and re-placed on every change of it. (A bar fixed to the bottom of the page
// would be behind the keys.) The field takes focus synchronously inside the tap that opens it: iOS Safari
// only raises the keyboard for a focus() call made in the same task as the tap, so it cannot wait for the
// animation or an effect. The search index, the suggestion list and the keyboard wiring are the ones the
// desktop hero card and the directory use (components/search/SearchSuggest).

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal, flushSync } from 'react-dom'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { CloseIcon, SearchIcon } from '@/components/icons'
import { ServiceIcon } from '@/components/primitives/ServiceIcon'
import {
  SuggestionList,
  useCloseOnOutside,
  useSearchSuggest,
} from '@/components/search/SearchSuggest'
import { VoiceButton } from '@/components/search/VoiceButton'
import { TypewriterPlaceholder } from '@/components/search/TypewriterPlaceholder'
import { searchPhrases } from '@/components/search/searchPhrases'
import { clamp01, createDriver, type Driver } from '@/lib/spring'
import { SERVICES, serviceHref } from '@/lib/services'
import { translatedServiceName } from '@/lib/services-i18n'

const OPEN_RESPONSE = 0.42
const CLOSE_RESPONSE = 0.34
const BACKDROP_BLUR = 10
/** The bar and its round close button, the gap between them, and the page margin. */
const BAR_HEIGHT = 52
const CLOSE_SIZE = 52
const GAP = 8
const MARGIN = 12
/** The results are never wider than this on a big phone or a tablet. */
const MAX_WIDTH = 640
/** What shows under an empty field when there is no search history yet. */
const POPULAR = SERVICES.slice(0, 6)

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), [tabindex]:not([tabindex="-1"])'

interface Box {
  left: number
  top: number
  width: number
  height: number
}

interface Geometry {
  /** Where the bar starts: the left end of the pill. */
  from: Box
  /** Where it ends: above the keyboard. */
  to: Box
  close: Box
  /** The results area: from the top of the screen to just above the bar. */
  results: { top: number; height: number }
  blur: boolean
}

/** env(safe-area-inset-*) cannot be read in script; an element that pads itself with it can. */
function readInsets(): { top: number; bottom: number } {
  const probe = document.createElement('div')
  probe.style.cssText =
    'position:fixed;left:0;top:0;visibility:hidden;pointer-events:none;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)'
  document.body.appendChild(probe)
  const style = getComputedStyle(probe)
  const insets = { top: parseFloat(style.paddingTop) || 0, bottom: parseFloat(style.paddingBottom) || 0 }
  probe.remove()
  return insets
}

export function SearchSheet() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale() as Locale
  const tSearch = useTranslations('search')
  const tA11y = useTranslations('a11y')
  const tNav = useTranslations('bottomNav')
  const placeholder = tSearch('drawerPlaceholder')

  const [query, setQuery] = useState('')
  // `open` is intent; `rendered` keeps the bar mounted while it shrinks back into the pill.
  const [open, setOpen] = useState(false)
  const [rendered, setRendered] = useState(false)

  const triggerRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const scrimRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLFormElement>(null)
  const barContentRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const fieldRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const openRef = useRef(false)
  const geoRef = useRef<Geometry | null>(null)
  const releaseRef = useRef<(() => void) | null>(null)
  const reducedRef = useRef(false)

  const {
    visible,
    setActive,
    setOpen: setSuggestOpen,
    choose,
    submit,
    prefetch,
    voice,
    inputProps,
    listProps,
  } = useSearchSuggest({ query, popular: false, onQueryChange: setQuery })

  // A tap outside the FIELD closes the suggestion list, not the search.
  useCloseOnOutside(
    fieldRef,
    useCallback(() => setSuggestOpen(false), [setSuggestOpen]),
  )

  /* ---- the spring's value, applied straight to the DOM ---- */
  const apply = useCallback((p: number) => {
    const g = geoRef.current
    if (!g) return
    const k = clamp01(p)
    const mix = (from: number, to: number) => from + (to - from) * k

    const bar = barRef.current
    if (bar) {
      bar.style.left = `${mix(g.from.left, g.to.left)}px`
      bar.style.top = `${mix(g.from.top, g.to.top)}px`
      bar.style.width = `${mix(g.from.width, g.to.width)}px`
      bar.style.height = `${mix(g.from.height, g.to.height)}px`
    }
    // The field's own contents arrive once it is wide enough to hold them.
    if (barContentRef.current) barContentRef.current.style.opacity = String(clamp01((k - 0.3) / 0.4))

    const close = closeRef.current
    if (close) {
      close.style.opacity = String(clamp01((k - 0.45) / 0.4))
      close.style.transform = `scale(${(0.6 + 0.4 * clamp01((k - 0.35) / 0.5)).toFixed(3)})`
      close.style.pointerEvents = k > 0.7 ? 'auto' : 'none'
    }

    const results = resultsRef.current
    if (results) {
      results.style.opacity = String(clamp01((k - 0.4) / 0.45))
      results.style.transform = `translateY(${((1 - k) * 14).toFixed(2)}px)`
    }

    const scrim = scrimRef.current
    if (scrim) {
      scrim.style.opacity = String(k)
      const blur = g.blur
        ? `blur(${(k * BACKDROP_BLUR).toFixed(2)}px) saturate(${(1 + k * 0.15).toFixed(3)})`
        : ''
      scrim.style.backdropFilter = blur
      scrim.style.setProperty('-webkit-backdrop-filter', blur)
    }

    // The tabs of the pill read this to slide away and fade (app/globals.css, .bottom-nav).
    document.documentElement.style.setProperty('--search-p', k.toFixed(3))
  }, [])

  /** Work out where everything goes, from the part of the screen that is showing. */
  const layout = useCallback(() => {
    const trigger = triggerRef.current
    const nav = trigger?.closest('nav') ?? null
    const vv = window.visualViewport
    const viewportHeight = vv?.height ?? window.innerHeight
    const offsetTop = vv?.offsetTop ?? 0
    const width = document.documentElement.clientWidth
    const keyboardOpen = window.innerHeight - viewportHeight > 120
    const insets = readInsets()

    // Where the pill's left end is now: the nav, as far right as the Search tab reaches.
    let from: Box
    if (trigger && nav && nav.isConnected) {
      const navRect = nav.getBoundingClientRect()
      const tabRect = trigger.getBoundingClientRect()
      from = {
        left: navRect.left,
        top: navRect.top,
        width: Math.max(tabRect.right - navRect.left + 6, 56),
        height: navRect.height,
      }
    } else {
      from = { left: MARGIN, top: window.innerHeight - 90, width: 72, height: 68 }
    }

    const content = Math.min(width - MARGIN * 2, MAX_WIDTH)
    const left = (width - content) / 2
    const bottomGap = keyboardOpen ? GAP : Math.max(MARGIN, insets.bottom)
    const barTop = offsetTop + viewportHeight - bottomGap - BAR_HEIGHT
    const to: Box = { left, top: barTop, width: content - CLOSE_SIZE - GAP, height: BAR_HEIGHT }
    const close: Box = { left: left + content - CLOSE_SIZE, top: barTop, width: CLOSE_SIZE, height: CLOSE_SIZE }
    const resultsTop = offsetTop + Math.max(MARGIN, insets.top)

    geoRef.current = {
      from,
      to,
      close,
      results: { top: resultsTop, height: Math.max(0, barTop - GAP - resultsTop) },
      blur: !window.matchMedia('(prefers-reduced-transparency: reduce)').matches,
    }

    const closeButton = closeRef.current
    if (closeButton) {
      closeButton.style.left = `${close.left}px`
      closeButton.style.top = `${close.top}px`
      closeButton.style.width = `${close.width}px`
      closeButton.style.height = `${close.height}px`
    }
    const results = resultsRef.current
    if (results) {
      results.style.top = `${geoRef.current.results.top}px`
      results.style.height = `${geoRef.current.results.height}px`
      results.style.left = `${left}px`
      results.style.width = `${content}px`
    }
  }, [])

  const driverRef = useRef<Driver | null>(null)
  if (!driverRef.current) driverRef.current = createDriver((value) => apply(value))
  const driver = driverRef.current

  /* ---- locking the page behind the search ---- */
  const lock = useCallback(() => {
    if (releaseRef.current) return
    const body = document.body
    const root = document.documentElement
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    const scrollbar = window.innerWidth - root.clientWidth
    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`
    root.setAttribute('data-search-open', 'true')
    const inerted: Element[] = []
    for (const child of Array.from(body.children)) {
      if (child === overlayRef.current || child.hasAttribute('inert')) continue
      // Streamed page data is not something a user can reach; leave it be.
      if (child.tagName === 'SCRIPT' || child.tagName === 'STYLE' || child.tagName === 'LINK') continue
      child.setAttribute('inert', '')
      inerted.push(child)
    }
    releaseRef.current = () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
      root.removeAttribute('data-search-open')
      root.style.removeProperty('--search-p')
      inerted.forEach((child) => child.removeAttribute('inert'))
      releaseRef.current = null
    }
  }, [])

  const finishClose = useCallback(() => {
    releaseRef.current?.()
    setRendered(false)
    setQuery('')
    // After `inert` is gone, so the tab can take focus again.
    requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }))
  }, [])

  /* ---- opening and closing ---- */
  useLayoutEffect(() => {
    if (!rendered) return
    const overlay = overlayRef.current
    if (!overlay) return
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (open) {
      lock()
      layout()
      if (reducedRef.current) {
        apply(1)
        overlay.style.transition = 'none'
        overlay.style.opacity = '0'
        void overlay.offsetWidth
        overlay.style.transition = 'opacity 160ms ease'
        overlay.style.opacity = '1'
      } else {
        if (driver.value() === 0) apply(0) // the first frame is the pill's own left end, exactly
        driver.to(1, OPEN_RESPONSE)
      }
    } else if (reducedRef.current) {
      overlay.style.transition = 'opacity 160ms ease'
      overlay.style.opacity = '0'
      const timer = window.setTimeout(finishClose, 170)
      return () => window.clearTimeout(timer)
    } else {
      // Back into the pill as it is now, along the same path.
      layout()
      driver.to(0, CLOSE_RESPONSE, finishClose)
    }
  }, [open, rendered, apply, layout, driver, lock, finishClose])

  useEffect(() => {
    const spring = driver
    return () => {
      spring.jump(0)
      releaseRef.current?.()
    }
  }, [driver])

  // The keyboard coming and going, or the window being resized: re-place and re-apply.
  useEffect(() => {
    if (!rendered) return
    const vv = window.visualViewport
    function refit() {
      layout()
      apply(driver.value())
    }
    window.addEventListener('resize', refit)
    vv?.addEventListener('resize', refit)
    vv?.addEventListener('scroll', refit)
    return () => {
      window.removeEventListener('resize', refit)
      vv?.removeEventListener('resize', refit)
      vv?.removeEventListener('scroll', refit)
    }
  }, [rendered, layout, apply, driver])

  const closeNow = useCallback(() => {
    if (!openRef.current) return
    openRef.current = false
    setSuggestOpen(false)
    setOpen(false)
  }, [setSuggestOpen])

  function openSearch() {
    if (openRef.current) return
    openRef.current = true
    // The index starts loading with the tap, before the first letter.
    prefetch()
    // Committed to the DOM right here, so the field exists and can take focus inside this tap.
    flushSync(() => {
      setRendered(true)
      setOpen(true)
    })
    inputRef.current?.focus({ preventScroll: true })
  }

  // Following a link from the results (or any navigation) closes it at once.
  useEffect(() => {
    if (!openRef.current) return
    openRef.current = false
    driver.jump(0)
    releaseRef.current?.()
    setSuggestOpen(false)
    setOpen(false)
    setRendered(false)
    setQuery('')
    // Only a change of page should close it, not the setters above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  /* ---- keyboard: Escape, and Tab kept inside the search ---- */
  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeNow()
        return
      }
      if (event.key !== 'Tab') return
      const root = overlayRef.current
      const items = root
        ? Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
            (el) => el.getClientRects().length > 0,
          )
        : []
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const current = document.activeElement
      if (event.shiftKey && (current === first || !root?.contains(current))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (current === last || !root?.contains(current))) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, closeNow])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    // Opens the results page for what was typed (see useSearchSuggest.submit).
    if (submit()) return
    const trimmed = query.trim()
    router.push(trimmed ? `/doctors?q=${encodeURIComponent(trimmed)}` : '/doctors')
    closeNow()
  }

  const showPopular = !visible && query.trim().length === 0

  return (
    <>
      {/*
        The first tab of the pill (components/layout/MobileBottomNav). It is laid out exactly like the others: the
        same icon box, the same label, the same reserved underline row, so the labels sit on one line.
      */}
      <button
        ref={triggerRef}
        type="button"
        onClick={openSearch}
        aria-label={tA11y('searchSite')}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="tap-target flex-col gap-1 rounded-2xl px-2.5 text-[11px] font-semibold text-brand-teal"
      >
        <span className="grid h-7 w-7 place-items-center">
          <SearchIcon className="h-6 w-6" strokeWidth={1.75} />
        </span>
        <span className="leading-none">{tNav('search')}</span>
        <span aria-hidden="true" className="h-0.5 w-6" />
      </button>

      {rendered &&
        createPortal(
          <div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label={tA11y('searchTitle')}
            tabIndex={-1}
            className="fixed inset-0 z-[80] outline-none lg:hidden"
          >
            <div
              ref={scrimRef}
              aria-hidden="true"
              onClick={closeNow}
              className="absolute inset-0 bg-brand-dark-base/35 [@media(prefers-reduced-transparency:reduce)]:bg-brand-dark-base/70"
              style={{ opacity: 0 }}
            />

            {/* The results fill the screen above the bar. */}
            <div
              ref={resultsRef}
              className="absolute flex flex-col overflow-y-auto overscroll-contain"
              style={{ opacity: 0 }}
              onClick={(event) => {
                // A tap on the empty part of the results area (not on a row) closes the search.
                if (event.target === event.currentTarget) closeNow()
              }}
            >
              {/* mt-auto sits the list right above the bar (nearest the thumb) and still scrolls when it is long. */}
              <div className="mt-auto">
                {visible && (
                  <SuggestionList
                    {...listProps}
                    choose={(index) => {
                      choose(index)
                      closeNow()
                    }}
                    variant="inline"
                  />
                )}
  
                {showPopular && (
                  <div className="rounded-2xl border border-brand-teal/15 bg-white/95 px-2 pb-2 pt-1 shadow-glass">
                    <p className="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-dark-base/50">
                      {tSearch('popularDepartments')}
                    </p>
                    <ul>
                      {POPULAR.map((service) => (
                        <li key={service.slug}>
                          <Link
                            href={serviceHref(service)}
                            onClick={closeNow}
                            className="flex min-h-[56px] items-center gap-3 rounded-2xl px-2 text-[15px] font-semibold text-brand-dark-base active:bg-brand-mist"
                          >
                            <ServiceIcon slug={service.slug} size={36} />
                            {translatedServiceName(service.slug, locale)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* The bar: at 0 it is the pill's left end, at 1 it sits above the keyboard. */}
            <form
              ref={barRef}
              onSubmit={handleSubmit}
              className="absolute overflow-hidden rounded-full border border-white/40 bg-white/80 shadow-glass backdrop-blur-xl [@media(prefers-reduced-transparency:reduce)]:bg-white/95 [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none"
            >
              <div ref={barContentRef} className="h-full" style={{ opacity: 0 }}>
                <div ref={fieldRef} className="relative h-full min-w-0">
                  <label htmlFor="phone-search-field" className="sr-only">
                    {placeholder}
                  </label>
                  <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-brand-teal" />
                  <input
                    {...inputProps}
                    ref={inputRef}
                    id="phone-search-field"
                    type="search"
                    enterKeyHint="search"
                    // The real placeholder stays the plain sentence for assistive tech; the overlay below owns
                    // every visible state.
                    placeholder={placeholder}
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value)
                      setSuggestOpen(true)
                      setActive(-1)
                    }}
                    // 16px, or iOS Safari zooms the page when the field is focused.
                    className="h-full w-full bg-transparent pl-11 pr-14 text-base text-brand-dark-base outline-none placeholder:text-transparent"
                  />
                  <VoiceButton
                    voice={voice}
                    className="absolute right-1.5 top-1/2 h-10 w-10 -translate-y-1/2"
                  />
                  {query.length === 0 && (
                    <TypewriterPlaceholder
                      phrases={searchPhrases(locale).general}
                      // The field is focused the moment the search opens, so gating the animation on focus would
                      // mean it never plays.
                      idle
                      staticText={placeholder}
                      className="pointer-events-none absolute left-11 right-3 top-1/2 -translate-y-1/2 truncate text-base text-brand-dark-base/45"
                    />
                  )}
                </div>
              </div>
            </form>

            <button
              ref={closeRef}
              type="button"
              onClick={closeNow}
              aria-label={tA11y('closeSearch')}
              className="press absolute grid place-items-center rounded-full border border-white/40 bg-white/80 text-brand-dark-base/70 shadow-glass backdrop-blur-xl [@media(prefers-reduced-transparency:reduce)]:bg-white/95 [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none"
              style={{ opacity: 0 }}
            >
              <CloseIcon className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>,
          document.body,
        )}
    </>
  )
}
