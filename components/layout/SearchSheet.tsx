'use client'

// components/layout/SearchSheet.tsx
//
// The Search tab of the phone's bottom pill, and the panel it opens.
//
// It lives IN the pill now (before it was a separate floating circle beside it, and before that a
// button in the header, which was already full). It is still a tool and not a place: it does not
// navigate, it opens a panel, and the tab is the only one in the pill that does.
//
// THE PANEL GROWS OUT OF THE SEARCH ICON, the way the booking form grows out of its button
// (components/appointments/BookingProvider.tsx, which has the long version of this note):
//   - one critically damped spring (lib/spring.ts) drives a number from 0 to 1; at 0 the panel is
//     clipped to a small circle exactly over the icon, at 1 to the panel's own rectangle, so the
//     content is revealed rather than stretched;
//   - the page behind blurs and dims with the same number, and a tap on it closes the panel;
//   - closing runs the same path back into the icon, from wherever the spring is, so a tap mid-
//     opening reverses without a jump;
//   - reduced motion swaps all of it for a short cross-fade.
//
// THE PANEL IS AS TALL AS THE SCREEN THAT IS LEFT. It is sized to the VISUAL viewport, which is
// what shrinks when the on-screen keyboard comes up, so the field stays at the top and the
// suggestions below it are never behind the keys. (A panel that rose from the bottom, as the old
// sheet did, was exactly where the keyboard goes.) Its height is set directly on the element on
// every visualViewport change, and the clip is re-measured with it.
//
// The field takes focus synchronously inside the tap that opens the panel: iOS Safari only raises
// the keyboard for a focus() call made in the same task as the tap, so it cannot wait for the
// animation or an effect. The search index, the suggestion list and the keyboard wiring are the
// ones the desktop hero card and the directory use (components/search/SearchSuggest).

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
const PANEL_RADIUS = 28
const BACKDROP_BLUR = 10
/** The icon's circle is the icon plus this much on every side. */
const ICON_PAD = 7
/** What shows under an empty field when there is no search history yet. */
const POPULAR = SERVICES.slice(0, 6)

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), [tabindex]:not([tabindex="-1"])'

interface Origin {
  top: number
  left: number
  right: number
  bottom: number
  radius: number
}

function readOrigin(el: HTMLElement | null, fallback?: Origin): Origin {
  if (el && el.isConnected) {
    const r = el.getBoundingClientRect()
    if (r.width > 0 && r.height > 0) {
      const size = Math.max(r.width, r.height) + ICON_PAD * 2
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      return {
        top: cy - size / 2,
        left: cx - size / 2,
        right: cx + size / 2,
        bottom: cy + size / 2,
        radius: size / 2,
      }
    }
  }
  if (fallback) return fallback
  const w = window.innerWidth
  const h = window.innerHeight
  return { top: h - 70, left: w / 2 - 18, right: w / 2 + 18, bottom: h - 34, radius: 18 }
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
  // `open` is intent; `rendered` keeps the panel mounted while it shrinks back into the icon.
  const [open, setOpen] = useState(false)
  const [rendered, setRendered] = useState(false)

  const triggerRef = useRef<HTMLButtonElement>(null)
  const iconRef = useRef<HTMLSpanElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const scrimRef = useRef<HTMLDivElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)
  const fieldRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const openRef = useRef(false)
  const originRef = useRef<Origin | null>(null)
  const geoRef = useRef({ width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0, blur: true })
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

  // A tap outside the FIELD closes the suggestion list, not the panel.
  useCloseOnOutside(
    fieldRef,
    useCallback(() => setSuggestOpen(false), [setSuggestOpen]),
  )

  /* ---- the spring's value, applied straight to the DOM ---- */
  const apply = useCallback((p: number) => {
    const sheet = sheetRef.current
    const origin = originRef.current
    if (!sheet || !origin) return
    const g = geoRef.current
    const k = clamp01(p)
    const mix = (from: number, to: number) => Math.max(0, from + (to - from) * k)
    sheet.style.clipPath =
      `inset(${mix(origin.top, g.top)}px ${mix(g.width - origin.right, g.width - g.right)}px ` +
      `${mix(g.height - origin.bottom, g.height - g.bottom)}px ${mix(origin.left, g.left)}px ` +
      `round ${mix(origin.radius, PANEL_RADIUS)}px)`
    sheet.style.backgroundColor = `rgba(255, 255, 255, ${clamp01(p / 0.22)})`
    if (contentRef.current) contentRef.current.style.opacity = String(clamp01((p - 0.38) / 0.38))
    if (shadowRef.current) shadowRef.current.style.opacity = String(clamp01((p - 0.7) / 0.3))
    const scrim = scrimRef.current
    if (scrim) {
      scrim.style.opacity = String(k)
      const blur = g.blur
        ? `blur(${(k * BACKDROP_BLUR).toFixed(2)}px) saturate(${(1 + k * 0.15).toFixed(3)})`
        : ''
      scrim.style.backdropFilter = blur
      scrim.style.setProperty('-webkit-backdrop-filter', blur)
    }
  }, [])

  /** Fit the panel to the part of the screen that is showing, then measure it. */
  const layout = useCallback(() => {
    const sheet = sheetRef.current
    const panel = panelRef.current
    if (!sheet || !panel) return
    const vv = window.visualViewport
    const viewport = vv?.height ?? window.innerHeight
    const offset = vv?.offsetTop ?? 0
    // The top inset keeps clear of a notch; env() cannot be read in script, so it stays in CSS.
    const top = 'max(0.5rem, env(safe-area-inset-top))'
    panel.style.top = `calc(${offset}px + ${top})`
    panel.style.height = `calc(${viewport}px - ${top} - 0.5rem)`

    const box = sheet.getBoundingClientRect()
    const rect = panel.getBoundingClientRect()
    geoRef.current = {
      width: box.width,
      height: box.height,
      top: rect.top - box.top,
      left: rect.left - box.left,
      right: rect.right - box.left,
      bottom: rect.bottom - box.top,
      blur: !window.matchMedia('(prefers-reduced-transparency: reduce)').matches,
    }
    const shadow = shadowRef.current
    if (shadow) {
      shadow.style.left = `${rect.left}px`
      shadow.style.top = `${rect.top}px`
      shadow.style.width = `${rect.width}px`
      shadow.style.height = `${rect.height}px`
      shadow.style.borderRadius = `${PANEL_RADIUS}px`
    }
  }, [])

  const driverRef = useRef<Driver | null>(null)
  if (!driverRef.current) driverRef.current = createDriver((value) => apply(value))
  const driver = driverRef.current

  /* ---- locking the page behind the panel ---- */
  const lock = useCallback(() => {
    if (releaseRef.current) return
    const body = document.body
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`
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
    const sheet = sheetRef.current
    if (!sheet) return
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (open) {
      lock()
      layout()
      if (reducedRef.current) {
        apply(1)
        sheet.style.transition = 'none'
        sheet.style.opacity = '0'
        void sheet.offsetWidth
        sheet.style.transition = 'opacity 160ms ease'
        sheet.style.opacity = '1'
      } else {
        if (driver.value() === 0) apply(0) // the first frame is the icon, exactly
        driver.to(1, OPEN_RESPONSE)
      }
    } else if (reducedRef.current) {
      sheet.style.transition = 'opacity 160ms ease'
      sheet.style.opacity = '0'
      const timer = window.setTimeout(finishClose, 170)
      return () => window.clearTimeout(timer)
    } else {
      // Back into the icon as it is now, along the same path.
      originRef.current = readOrigin(iconRef.current, originRef.current ?? undefined)
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

  // The keyboard coming and going, or the window being resized: re-fit and re-measure.
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
    originRef.current = readOrigin(iconRef.current)
    // Committed to the DOM right here, so the field exists and can take focus inside this tap.
    flushSync(() => {
      setRendered(true)
      setOpen(true)
    })
    inputRef.current?.focus({ preventScroll: true })
  }

  // Following a link from the panel (or any navigation) closes it at once.
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

  /* ---- keyboard: Escape, and Tab kept inside the panel ---- */
  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeNow()
        return
      }
      if (event.key !== 'Tab') return
      const root = sheetRef.current
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
    // The best answer, or the list left open to choose from (see useSearchSuggest.submit).
    if (submit()) return
    const trimmed = query.trim()
    router.push(trimmed ? `/doctors?q=${encodeURIComponent(trimmed)}` : '/doctors')
    closeNow()
  }

  const showPopular = !visible && query.trim().length === 0

  return (
    <>
      {/* Laid out like the other tabs in the pill (components/layout/MobileBottomNav). */}
      <button
        ref={triggerRef}
        type="button"
        onClick={openSearch}
        aria-label={tA11y('searchSite')}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="tap-target flex-col gap-1 rounded-2xl px-2.5 text-[11px] font-semibold text-brand-teal"
      >
        <span ref={iconRef} className="grid h-6 w-6 place-items-center">
          <SearchIcon className="h-6 w-6" strokeWidth={1.75} />
        </span>
        <span>{tNav('search')}</span>
        {/* The same height as the active underline the other tabs reserve. */}
        <span aria-hidden="true" className="h-0.5 w-6" />
      </button>

      {rendered &&
        createPortal(
          <div ref={overlayRef} className="fixed inset-0 z-[80] lg:hidden">
            <div
              ref={scrimRef}
              aria-hidden="true"
              onClick={closeNow}
              className="absolute inset-0 bg-brand-dark-base/35 [@media(prefers-reduced-transparency:reduce)]:bg-brand-dark-base/70"
              style={{ opacity: 0 }}
            />

            {/* The panel's shadow is its own layer: a shadow on the clipped panel would be cut off. */}
            <div
              ref={shadowRef}
              aria-hidden="true"
              className="pointer-events-none absolute shadow-[0_40px_90px_-24px_rgba(11,20,22,0.6),0_12px_28px_-12px_rgba(11,20,22,0.3)]"
              style={{ opacity: 0 }}
            />

            <div
              ref={sheetRef}
              role="dialog"
              aria-modal="true"
              aria-label={tA11y('searchTitle')}
              tabIndex={-1}
              className="absolute inset-0 outline-none will-change-[clip-path]"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
            >
              <div
                ref={panelRef}
                className="absolute inset-x-2 mx-auto max-h-[44rem] max-w-[40rem]"
              >
                <div ref={contentRef} className="flex h-full min-h-0 flex-col" style={{ opacity: 0 }}>
                  <form onSubmit={handleSubmit} className="shrink-0 px-3 pb-2 pt-3">
                    <div ref={fieldRef} className="flex items-center gap-2">
                      <label htmlFor="phone-search-field" className="sr-only">
                        {placeholder}
                      </label>
                      <div className="relative min-w-0 flex-1">
                        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-brand-dark-base/50" />
                        <input
                          {...inputProps}
                          ref={inputRef}
                          id="phone-search-field"
                          type="search"
                          enterKeyHint="search"
                          // The real placeholder stays the plain sentence for assistive tech; the
                          // overlay below owns every visible state.
                          placeholder={placeholder}
                          value={query}
                          onChange={(event) => {
                            setQuery(event.target.value)
                            setSuggestOpen(true)
                            setActive(-1)
                          }}
                          // 16px, or iOS Safari zooms the page when the field is focused.
                          className="h-[52px] w-full rounded-full bg-brand-mist pl-11 pr-14 text-base text-brand-dark-base shadow-[inset_0_0_0_1px_rgba(15,91,102,0.13)] outline-none placeholder:text-transparent focus:shadow-[inset_0_0_0_2px_rgba(15,91,102,0.45)]"
                        />
                        <VoiceButton
                          voice={voice}
                          className="absolute right-1.5 top-1/2 h-10 w-10 -translate-y-1/2"
                        />
                        {query.length === 0 && (
                          <TypewriterPlaceholder
                            phrases={searchPhrases(locale).general}
                            // The field is focused the moment the panel opens, so gating the
                            // animation on focus would mean it never plays.
                            idle
                            staticText={placeholder}
                            className="pointer-events-none absolute left-11 right-3 top-1/2 -translate-y-1/2 truncate text-base text-brand-dark-base/45"
                          />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={closeNow}
                        aria-label={tA11y('closeSearch')}
                        className="tap-target press h-[52px] w-[52px] shrink-0 rounded-full bg-brand-mist text-brand-dark-base/65"
                      >
                        <CloseIcon className="h-5 w-5" strokeWidth={2} />
                      </button>
                    </div>
                  </form>

                  <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-3">
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
                      <>
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
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
