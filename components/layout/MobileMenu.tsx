'use client'

// components/layout/MobileMenu.tsx
//
// The full navigation, in a drawer. The bottom pill carries the four routes a patient
// uses constantly; this carries the other twenty-two, because a bottom bar with eight
// items is a bottom bar with eight targets too small to hit.
//
// Sections are collapsible <details> rather than hand-rolled accordions: they open
// without JavaScript, they are keyboard operable for free, and the browser already
// exposes the expanded state to assistive technology.

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { usePathname } from '@/i18n/navigation'
import { CloseIcon, MenuIcon, SearchIcon } from '@/components/icons'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import {
  SuggestionList,
  useCloseOnOutside,
  useSearchSuggest,
} from '@/components/search/SearchSuggest'
import { TypewriterPlaceholder } from '@/components/search/TypewriterPlaceholder'
import { GENERAL_SEARCH_PHRASES } from '@/components/search/searchPhrases'
import { contact, primaryNav, siteConfig } from '@/lib/site-config'
import { translatedNavLabel, translatedOverviewLabel, slugFromHref } from '@/lib/nav-i18n'
import { translatedServiceName } from '@/lib/services-i18n'
import type { Locale } from '@/i18n/routing'

export function MobileMenu() {
  const pathname = usePathname()
  const locale = useLocale() as Locale
  const t = useTranslations('nav')
  const tMenu = useTranslations('menu')
  const tSearch = useTranslations('search')
  const searchPlaceholder = tSearch('drawerPlaceholder')
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  /*
   * Three states carry the panel through an animated open AND close, where `open`
   * alone only ever carried one:
   *
   *  - `open` is the intent — set the instant a trigger fires, and everything that
   *    already read it (aria-expanded, the Escape listener, the route-change
   *    effect below) keeps doing exactly that.
   *  - `rendered` is "in the DOM at all". Mounting flips it true immediately;
   *    unmounting waits for the exit transition, which `open` alone can't express —
   *    conditionally rendering straight off `open` is what gave the old version no
   *    exit animation, because the panel was gone the instant `open` went false.
   *  - `entered` is the visual position. It lags `rendered` by one animation frame
   *    on the way in — mounting already at the open transform gives the browser
   *    nothing to transition FROM — and drops immediately on the way out, which is
   *    what actually plays the slide-closed.
   */
  const [rendered, setRendered] = useState(false)
  const [entered, setEntered] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
    // Backstop for the case the transition never fires at all — closed again
    // before it ever finished opening, so no property actually changes. 500ms
    // matches the panel's own transition-duration; prefers-reduced-motion has
    // already collapsed that to near-zero globally by the time this fires.
    closeTimerRef.current = setTimeout(() => setRendered(false), 500)
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [open, rendered])

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
    searchRef,
    useCallback(() => setSuggestOpen(false), [setSuggestOpen]),
  )

  // Route change closes the drawer. A client-side navigation does not unmount this
  // component, so without it the panel stays open on top of the page you just opened.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (open) return
    setQuery('')
    setSuggestOpen(false)
  }, [open, setSuggestOpen])

  // Lock the page behind the drawer. Without this the body scrolls under an open
  // overlay on iOS, which reads as the page having jumped when you close it.
  //
  // Keyed on `rendered`, not `open`: releasing the lock the instant `open` goes
  // false would let the page scroll for the half-second the panel is still
  // visibly sliding shut over it.
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
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-label={tMenu('openLabel')}
        // Dark-on-white now, not white-on-teal — MobileHeader's bar is white, and
        // the standard copper focus ring already reads fine there, so this drops
        // `focus-ring-inverse` along with the colour.
        className="tap-target rounded-full text-brand-teal hover:bg-brand-mist"
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      {rendered &&
        createPortal(
          // Portalled to <body>, not left nested in MobileHeader. MobileHeader is
          // `sticky` with its own z-index, which makes it a stacking context — a
          // fixed child stays TRAPPED inside that context for paint order, no matter
          // how high its own z-index goes. MobileBottomNav renders straight into
          // <body>, later in the DOM, at the same z-50: same z-index, later DOM wins
          // the tie, so the pill painted over this drawer's bottom edge regardless of
          // this drawer's z-[60]. Escaping to <body> puts the drawer in the same
          // stacking context as the pill, where z-[60] actually wins.
          <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className={[
              'absolute inset-0 h-full w-full cursor-default bg-brand-dark-base/60 backdrop-blur-sm',
              // Reduced transparency: solid instead of see-through, no blur to compute.
              '[@media(prefers-reduced-transparency:reduce)]:bg-brand-dark-base/90 [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none',
              'transition-opacity duration-500 ease-[var(--ease-out)]',
              entered ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
          />

          <div
            // The panel is the one element whose transform actually moves, so its
            // transitionend is what tells us the exit has finished — the timer
            // above is only a backstop for the case where nothing changes at all.
            onTransitionEnd={(event) => {
              if (event.target !== event.currentTarget) return
              if (!open) setRendered(false)
            }}
            id="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            /*
              A long, shallow teal gradient rather than a flat fill.

              Two stops only, both inside the brand's own teal range (#0F5B66 to
              #0B3F47), running top to bottom over the full height of the panel. The
              range is deliberately narrow — a gradient with a wide spread reads as a
              graphic effect and starts banding on a cheap phone screen, where a shallow
              one just looks like depth. The darker end is at the bottom, under the
              emergency button, so the one red control on the panel sits on the deepest
              ground and gains contrast rather than losing it.
            */
            className={[
              'absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col bg-gradient-to-b from-brand-teal via-brand-teal to-brand-teal-dark shadow-2xl',
              // Percentage translate, not a pixel value: it moves the panel clear of
              // the viewport by its own width whatever that resolves to at max-w-sm.
              'transition-transform duration-500 ease-[var(--ease-drawer)]',
              entered ? 'translate-x-0' : 'translate-x-full',
            ].join(' ')}
          >
            {/*
              No white strip — the gradient runs unbroken from the top of the panel.

              That rules out the full colour lockup, whose dark navy letterforms
              disappear against teal, so this takes the round badge instead. The badge
              carries its own light disc and is the one mark in the set built to sit on
              a dark ground; the hospital's name is in the page title, the footer and
              this link's aria-label.
            */}
            <div className="flex h-[65px] shrink-0 items-center justify-between gap-3 px-4">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                aria-label={`${siteConfig.name}, ${siteConfig.city} — home`}
                className="focus-ring-inverse rounded-full"
              >
                <img
                  src="/brand/lims-badge.webp"
                  alt=""
                  aria-hidden="true"
                  width={142}
                  height={160}
                  className="block h-auto w-[40px] shrink-0"
                />
              </Link>
              {/*
                A ringed circle rather than a bare glyph. On the flat teal there is
                nothing behind the X to give it an edge, and a lone stroke at this size
                reads as decoration instead of a control — the ring is what says "button"
                and it doubles as the 44px target boundary.
              */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={tMenu('closeLabel')}
                className="tap-target focus-ring-inverse h-11 w-11 rounded-full border border-white/40 text-white/90 transition-colors hover:bg-white/10"
              >
                <CloseIcon className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>

            {/*
              Search, first thing in the drawer.

              Someone who opened the menu is looking for something specific; a field at
              the top answers that in one step where the list below answers it in three.
              It is the same index the header and hero search use.
            */}
            <div ref={searchRef} className="relative shrink-0 px-3 pb-1 pt-3">
              <label htmlFor="drawer-search" className="sr-only">
                {searchPlaceholder}
              </label>
              <div className="flex items-center rounded-xl bg-white/95 shadow-sm focus-within:bg-white">
                <SearchIcon
                  aria-hidden="true"
                  className="ml-3 h-[18px] w-[18px] shrink-0 text-brand-dark-base/40"
                  strokeWidth={2.4}
                />
                <div className="relative min-w-0 flex-1">
                  <input
                    {...inputProps}
                    id="drawer-search"
                    type="search"
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value)
                      setSuggestOpen(true)
                      setActive(-1)
                    }}
                    onFocus={() => {
                      setSearchFocused(true)
                      inputProps.onFocus()
                    }}
                    onBlur={() => setSearchFocused(false)}
                    // The real placeholder attribute stays the plain sentence, so
                    // assistive tech and a reduced-motion reader get a stable,
                    // meaningful hint — the overlay below owns every state of the
                    // visible hint, so this one stays transparent.
                    placeholder={searchPlaceholder}
                    // 16px, or iOS Safari zooms the whole drawer when this is focused.
                    className="min-h-[44px] w-full bg-transparent px-3 text-base text-brand-dark-base outline-none placeholder:text-transparent"
                  />
                  {query.length === 0 && (
                    <TypewriterPlaceholder
                      phrases={GENERAL_SEARCH_PHRASES}
                      idle={!searchFocused && query.length === 0}
                      staticText={searchPlaceholder}
                      className="pointer-events-none absolute left-3 right-0 top-1/2 -translate-y-1/2 truncate pr-3 text-base text-brand-dark-base/45"
                    />
                  )}
                </div>
              </div>

              {/*
                Mounted for as long as the drawer itself is (it unmounts with the
                whole drawer anyway on close) — `visible` alone drives the
                fade/scale transition now instead of a hard unmount, so opening the
                dropdown reads as unfolding from the field rather than popping in.
              */}
              <SuggestionList
                suggestions={suggestions}
                active={active}
                setActive={setActive}
                choose={choose}
                listId={listId}
                showingRecent={showingRecent}
                visible={visible}
                className="left-3 right-3"
              />
            </div>

            {/*
              Language, right under search — the other control someone opens
              this drawer for specifically, not buried at the foot of a list
              of unrelated department links.
            */}
            <div className="flex shrink-0 justify-center px-3 pb-2">
              <LanguageSwitcher variant="dark" />
            </div>

            <nav aria-label="All sections" className="flex-1 overflow-y-auto px-3 py-3">
              <ul className="space-y-1">
                {primaryNav.map((item) =>
                  item.children?.length ? (
                    <li key={item.label}>
                      <details className="group rounded-xl border border-white/15 bg-white/[0.07]">
                        {/*
                          `flex w-full` overrides .tap-target's own `inline-flex`
                          — a utility class placed here wins the cascade over a
                          components-layer one, same as the press-feedback fix in
                          globals.css. Without it the summary shrinks to fit
                          "Specialities ▾", leaving the right ~60% of this visibly
                          full-width card dead to touch: tappable card, untappable
                          card front.
                        */}
                        <summary className="tap-target focus-ring-inverse flex w-full cursor-pointer list-none px-4 text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">
                          <span className="flex w-full items-center justify-between">
                            {translatedNavLabel(item, t)}
                            <span
                              aria-hidden="true"
                              className="text-white/70 transition-transform group-open:rotate-180"
                            >
                              ▾
                            </span>
                          </span>
                        </summary>
                        <ul className="border-t border-white/15 px-2 py-1">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="flex min-h-[44px] items-center rounded-lg px-3 text-sm text-white/80 hover:bg-white/10"
                              >
                                {translatedServiceName(slugFromHref(child.href), locale)}
                              </Link>
                            </li>
                          ))}
                          {item.overviewLabel && (
                            <li>
                              <Link
                                href={item.href}
                                className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-semibold text-brand-copper hover:bg-white/10"
                              >
                                {translatedOverviewLabel(item, t)} &rarr;
                              </Link>
                            </li>
                          )}
                        </ul>
                      </details>
                    </li>
                  ) : (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="flex min-h-[44px] items-center rounded-xl border border-white/15 bg-white/[0.07] px-4 text-sm font-semibold text-white hover:bg-white/15"
                      >
                        {translatedNavLabel(item, t)}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            {/*
              `pb-[max(...)]` rather than plain p-3: the safe-area inset is what
              clears a gesture-bar phone's home indicator. Without it, this row sits
              exactly where that indicator lives — the one part of the screen a swipe
              lands on instead of a tap.
            */}
            <div className="shrink-0 space-y-2 border-t border-white/15 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <a
                href={`tel:${contact.primary}`}
                className="tap-target focus-ring-inverse w-full rounded-xl bg-brand-emergency px-4 text-sm font-bold text-white"
              >
                {tMenu('emergencyLine')} &middot; {contact.primaryDisplay}
              </a>
              <a
                href={`tel:${contact.secondary}`}
                className="tap-target w-full rounded-xl border border-white/30 px-4 text-sm font-semibold text-white"
              >
                {tMenu('appointmentsLine')} &middot; {contact.secondaryDisplay}
              </a>
            </div>
          </div>
        </div>,
          document.body,
        )}
    </>
  )
}
