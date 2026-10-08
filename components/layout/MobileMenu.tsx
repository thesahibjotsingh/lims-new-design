'use client'

// components/layout/MobileMenu.tsx
//
// The full navigation on a phone: a curved teal drawer that grows out of the hamburger.
//
// The rows are the header's own menu (`primaryNav`), so a page cannot be in the header and
// missing here. A section with a short list under it is a link (the label, to the section's own
// page: all the specialities, all the services...) and an arrow button (aria-expanded) that
// unfolds the list: two controls, because a <details> summary can only toggle.
//
// THE LOOK. The same teal as the page heroes (`.teal-hero`, globals.css: the gradient and the
// faint texture), darkest at the bottom, under the contact buttons. The texture is kept to the top of
// the panel and the rows are solid, so nothing shows through them (they read as matte, not glass).
// Each row has its section's icon. The drawer is a floating panel with a margin and curved corners all round, the way the
// booking sheet is, rather than a slab to the screen's edge.
//
// THE CONTACT BLOCK. Emergency is red and nothing else is (red is reserved for it site-wide).
// Appointments is copper, the site's "act now" colour (the header's Book button is the same
// copper with white text). WhatsApp is WhatsApp's own green, on the one control that opens it; the
// deeper `whatsapp-hover` shade is used at rest because white on the lighter one is only 3.1:1.
//
// IT GROWS OUT OF THE HAMBURGER, the way the booking form grows out of its button (see
// components/appointments/BookingProvider, which has the reasoning for all of this). One critically
// damped spring (lib/spring.ts) drives the drawer's openness from 0 to 1, and that number is turned
// into the clip-path (the hamburger's own rectangle at 0, the drawer's rectangle at 1: clipped, not
// scaled, so its text and corners are never stretched), the drawer's colour, its content's opacity,
// and the dimming and blurring of the page behind. The sheet that is clipped is the whole window and
// the drawer sits inside it, so the hamburger is always inside the sheet's box whatever the phone's
// safe areas are. Closing aims the same spring back at the button's position as it is NOW, and a tap
// mid-way turns it round from wherever it has got to (it is interruptible). Reduced motion swaps all
// of it for a 160ms cross-fade.

/* eslint-disable @next/next/no-img-element */

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
  type SVGProps,
} from 'react'
import { createPortal } from 'react-dom'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { usePathname } from '@/i18n/navigation'
import {
  BuildingIcon,
  ChevronDownIcon,
  CloseIcon,
  DocumentIcon,
  FlaskIcon,
  HeartIcon,
  MenuIcon,
  PhoneIcon,
  PinIcon,
  PulseIcon,
  SearchIcon,
  StethoscopeIcon,
  WhatsAppIcon,
} from '@/components/icons'
import {
  SuggestionList,
  useCloseOnOutside,
  useSearchSuggest,
} from '@/components/search/SearchSuggest'
import { VoiceButton } from '@/components/search/VoiceButton'
import { TypewriterPlaceholder } from '@/components/search/TypewriterPlaceholder'
import { searchPhrases } from '@/components/search/searchPhrases'
import { contact, primaryNav, whatsappUrl } from '@/lib/site-config'
import { clamp01, createDriver, type Driver } from '@/lib/spring'
import { siteText } from '@/lib/site-i18n'
import { translatedChildLabel, translatedNavLabel, translatedOverviewLabel } from '@/lib/nav-i18n'
import type { Locale } from '@/i18n/routing'

type RowIcon = ComponentType<SVGProps<SVGSVGElement>>

/** One icon per section, by the section's page. */
const ROW_ICONS: Record<string, RowIcon> = {
  '/specialities': PulseIcon,
  '/doctors': StethoscopeIcon,
  '/services': FlaskIcon,
  '/patient-care': HeartIcon,
  '/health-library': DocumentIcon,
  '/about': BuildingIcon,
  '/contact': PinIcon,
}

const DRAWER_RADIUS = 28
/** The same spring as the booking sheet: response in seconds, no bounce. */
const OPEN_RESPONSE = 0.42
const CLOSE_RESPONSE = 0.34
const BACKDROP_BLUR = 8 // px at fully open

/** A valid element id for a section's unfolded list (nav labels have spaces). */
const sectionId = (href: string) => `mobile-menu-${href.replace(/[^a-z]/gi, '') || 'home'}`

interface Origin {
  top: number
  left: number
  right: number
  bottom: number
  radius: number
}

/** Where the hamburger is now, for the drawer to grow from and shrink back into. */
function readOrigin(el: HTMLElement | null, fallback?: Origin | null): Origin {
  if (el && el.isConnected) {
    const r = el.getBoundingClientRect()
    if (r.width > 0 && r.height > 0) {
      return { top: r.top, left: r.left, right: r.right, bottom: r.bottom, radius: r.height / 2 }
    }
  }
  if (fallback) return fallback
  // No usable button (should not happen): grow from a small circle at the top right.
  const w = window.innerWidth
  return { top: 10, left: w - 54, right: w - 10, bottom: 54, radius: 22 }
}

// Solid rows (`teal-raised`), not a see-through white wash: a wash let the texture and its line
// show through the rows, which read as glass.
const ROW_CLASS = 'rounded-xl border border-white/10 bg-brand-teal-raised transition-colors'
const LABEL_CLASS =
  'tap-target focus-ring-inverse min-h-[52px] flex-1 justify-start gap-3 px-3 text-[15px] font-semibold text-white hover:bg-white/10'

export function MobileMenu() {
  const pathname = usePathname()
  const locale = useLocale() as Locale
  const t = useTranslations('nav')
  const tMenu = useTranslations('menu')
  const tCommon = useTranslations('common')
  const tSearch = useTranslations('search')
  const tA11y = useTranslations('a11y')
  const text = siteText(locale)
  const searchPlaceholder = tSearch('drawerPlaceholder')
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  // Which sections have their short list unfolded, by nav label. Cleared when the menu closes.
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [searchFocused, setSearchFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  /*
   * `open` is the intent, set the instant the button is pressed; `rendered` keeps the drawer in the
   * DOM while it shrinks back into the button (conditionally rendering straight off `open` is
   * what gave the first version no exit animation). The spring itself runs on the DOM, not in
   * React state: it moves every frame, and a render per frame is not something to pay for.
   */
  const [rendered, setRendered] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const scrimRef = useRef<HTMLButtonElement>(null)
  const originRef = useRef<Origin | null>(null)
  // The window and the drawer inside it, measured when the menu opens (and on resize).
  const geoRef = useRef({ width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0, blur: true })

  /** Applies the spring's value (0 closed, 1 open) to the DOM. */
  const apply = useCallback((p: number) => {
    const sheet = sheetRef.current
    const origin = originRef.current
    if (!sheet || !origin) return
    const g = geoRef.current
    const k = clamp01(p)
    const mix = (from: number, to: number) => Math.max(0, from + (to - from) * k)
    // From the hamburger's rectangle to the drawer's, one inset per edge.
    sheet.style.clipPath =
      `inset(${mix(origin.top, g.top)}px ${mix(g.width - origin.right, g.width - g.right)}px ` +
      `${mix(g.height - origin.bottom, g.height - g.bottom)}px ${mix(origin.left, g.left)}px ` +
      `round ${mix(origin.radius, DRAWER_RADIUS)}px)`
    // Clear at first, so the first frame is the hamburger, untouched; the teal arrives, then content.
    if (bgRef.current) bgRef.current.style.opacity = String(clamp01(k / 0.22))
    if (contentRef.current) contentRef.current.style.opacity = String(clamp01((k - 0.42) / 0.38))
    const scrim = scrimRef.current
    if (scrim) {
      scrim.style.opacity = String(k)
      const blur = g.blur ? `blur(${(k * BACKDROP_BLUR).toFixed(2)}px)` : ''
      scrim.style.backdropFilter = blur
      scrim.style.setProperty('-webkit-backdrop-filter', blur)
    }
  }, [])

  const measure = useCallback(() => {
    const sheet = sheetRef.current
    const panel = panelRef.current
    if (!sheet || !panel) return
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
  }, [])

  const driverRef = useRef<Driver | null>(null)
  if (!driverRef.current) driverRef.current = createDriver((value) => apply(value))
  const driver = driverRef.current

  const finishClose = useCallback(() => {
    setRendered(false)
  }, [])

  const openMenu = useCallback(() => {
    originRef.current = readOrigin(triggerRef.current)
    setRendered(true)
    setOpen(true)
  }, [])

  useLayoutEffect(() => {
    if (!rendered) return
    const sheet = sheetRef.current
    if (!sheet) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (open) {
      measure()
      if (reduced) {
        // A cross-fade: the drawer is simply there, in place, with its dimmed page.
        apply(1)
        sheet.style.transition = 'none'
        sheet.style.opacity = '0'
        void sheet.offsetWidth
        sheet.style.transition = 'opacity 160ms ease'
        sheet.style.opacity = '1'
      } else {
        if (driver.value() === 0) apply(0) // the first frame is the button, exactly
        driver.to(1, OPEN_RESPONSE)
      }
    } else if (reduced) {
      sheet.style.transition = 'opacity 160ms ease'
      sheet.style.opacity = '0'
      const timer = window.setTimeout(finishClose, 170)
      return () => window.clearTimeout(timer)
    } else {
      // Back into the button as it is now (the window may have been resized), via the same path.
      originRef.current = readOrigin(triggerRef.current, originRef.current)
      measure()
      driver.to(0, CLOSE_RESPONSE, finishClose)
    }
  }, [open, rendered, apply, measure, driver, finishClose])

  useEffect(() => {
    const spring = driver
    return () => spring.jump(0)
  }, [driver])

  // If the window changes size while the menu is open, re-fit it.
  useEffect(() => {
    if (!rendered) return
    function onResize() {
      measure()
      apply(driver.value())
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [rendered, measure, apply, driver])

  const {
    visible,
    setActive,
    setOpen: setSuggestOpen,
    submit,
    voice,
    inputProps,
    listProps,
  } = useSearchSuggest({ query, onQueryChange: setQuery })

  useCloseOnOutside(
    searchRef,
    useCallback(() => setSuggestOpen(false), [setSuggestOpen]),
  )

  // Route change closes the menu. A client-side navigation does not unmount this
  // component, so without it the drawer stays open on top of the page you just opened.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (open) return
    setQuery('')
    setExpanded({})
    setSuggestOpen(false)
  }, [open, setSuggestOpen])

  // Lock the page behind the menu. Without this the body scrolls under an open
  // overlay on iOS, which reads as the page having jumped when you close it.
  //
  // Keyed on `rendered`, not `open`: releasing the lock the instant `open` goes
  // false would let the page scroll for the moment the drawer is still shrinking
  // back into the button.
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

  /** The icon in its round tile, at the left of a row. */
  function rowIcon(href: string) {
    const Icon = ROW_ICONS[href]
    return (
      <span
        aria-hidden="true"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15"
      >
        {Icon && <Icon className="h-5 w-5" />}
      </span>
    )
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openMenu}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-label={tMenu('openLabel')}
        // Dark-on-white, like the bar it sits in; the standard copper focus ring already reads
        // fine there.
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
          // the tie, so the pill painted over this menu regardless of this menu's
          // z-[60]. Escaping to <body> puts it in the same stacking context as the
          // pill, where z-[60] actually wins.
          <div className="fixed inset-0 z-[60] lg:hidden">
            <button
              ref={scrimRef}
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => setOpen(false)}
              // Opacity and blur are driven by the spring (`apply`), so the page and the drawer
              // arrive together. Under reduced transparency it dims harder and does not blur.
              className="absolute inset-0 h-full w-full cursor-default bg-brand-dark-base/55 [@media(prefers-reduced-transparency:reduce)]:bg-brand-dark-base/90"
              style={{ opacity: 0 }}
            />

            {/* The whole window, clipped to the drawer (clipped-out areas take no taps). */}
            <div
              ref={sheetRef}
              id="mobile-menu-panel"
              role="dialog"
              aria-modal="true"
              aria-label={tA11y('navigation')}
              className="absolute inset-0 will-change-[clip-path]"
            >
              <div
                ref={panelRef}
                className="absolute bottom-[max(0.5rem,env(safe-area-inset-bottom))] right-2 top-[max(0.5rem,env(safe-area-inset-top))] w-[88%] max-w-sm"
              >
                {/* The teal, as its own layer, so it can fade in under the content. */}
                <div
                  ref={bgRef}
                  aria-hidden="true"
                  className="teal-hero absolute inset-0 rounded-[28px] [--teal-dir:to_top]"
                  // The texture only at the top, behind the logo, the close button and the search;
                  // it fades out before the rows, which are solid and would cover it anyway.
                  style={
                    {
                      opacity: 0,
                      '--teal-fade':
                        'radial-gradient(ellipse 80% 17% at 100% 0%, #000 0%, #000 45%, transparent 100%)',
                    } as React.CSSProperties
                  }
                />

                <div
                  ref={contentRef}
                  className="relative flex h-full flex-col"
                  style={{ opacity: 0 }}
                >
                  {/*
                    The round badge rather than the full lockup: the lockup's navy letterforms
                    disappear against teal, and the badge carries its own light disc.
                  */}
                  <div className="flex h-[65px] shrink-0 items-center justify-between gap-3 px-4">
                    <Link
                      href="/"
                      onClick={() => setOpen(false)}
                      aria-label={tA11y('homeLink', { name: text.name, city: text.city })}
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
                      A ringed circle rather than a bare glyph: on the flat teal there is nothing
                      behind the X to give it an edge, and the ring is what says "button" and
                      doubles as the 44px target boundary.
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
                    Search, first thing in the menu: someone who opened it is looking for something
                    specific, and a field at the top answers that in one step. It is the same index
                    the header and hero search use.
                  */}
                  <div ref={searchRef} className="relative shrink-0 px-3 pb-1 pt-2">
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
                          onKeyDown={(event) => {
                            inputProps.onKeyDown(event)
                            // Enter with nothing highlighted: the best answer, or the list left open.
                            if (event.key === 'Enter' && !event.defaultPrevented) {
                              event.preventDefault()
                              submit()
                            }
                          }}
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
                          // 16px, or iOS Safari zooms the whole menu when this is focused.
                          className="min-h-[44px] w-full bg-transparent px-3 text-base text-brand-dark-base outline-none placeholder:text-transparent"
                        />
                        {query.length === 0 && (
                          <TypewriterPlaceholder
                            phrases={searchPhrases(locale).general}
                            idle={!searchFocused && query.length === 0}
                            staticText={searchPlaceholder}
                            className="pointer-events-none absolute left-3 right-0 top-1/2 -translate-y-1/2 truncate pr-3 text-base text-brand-dark-base/45"
                          />
                        )}
                      </div>
                      <VoiceButton voice={voice} className="mr-1 h-10 w-10" />
                    </div>

                    {/*
                      Mounted for as long as the menu itself is — `visible` alone drives the
                      fade/scale transition, so opening the dropdown reads as unfolding from the
                      field rather than popping in.
                    */}
                    <SuggestionList
                      {...listProps}
                      visible={visible}
                      className="left-3 right-3"
                    />
                  </div>

                  {/*
                    No language row here: the language button lives in the phone header itself
                    (LanguageMenu), so it is one tap away without opening this menu.
                  */}

                  <nav
                    aria-label={tA11y('allSections')}
                    className="min-h-0 flex-1 overflow-y-auto px-3 py-2"
                  >
                    <ul className="space-y-1.5">
                      {primaryNav.map((item) =>
                        item.children?.length ? (
                          <li key={item.label}>
                            {/*
                              TWO TARGETS IN ONE CARD, like the desktop bar: the label goes to the
                              section's own page and the arrow at the right opens the short list
                              under it.
                            */}
                            <div className={ROW_CLASS}>
                              <div className="flex items-stretch">
                                {/* `justify-start` overrides .tap-target's centring, so the label sits at the left. */}
                                <Link
                                  href={item.href}
                                  onClick={() => setOpen(false)}
                                  className={`${LABEL_CLASS} rounded-l-xl`}
                                >
                                  {rowIcon(item.href)}
                                  {translatedNavLabel(item, t)}
                                </Link>
                                <button
                                  type="button"
                                  aria-expanded={Boolean(expanded[item.label])}
                                  aria-controls={sectionId(item.href)}
                                  aria-label={tA11y('menuFor', { label: translatedNavLabel(item, t) })}
                                  onClick={() =>
                                    setExpanded((current) => ({
                                      ...current,
                                      [item.label]: !current[item.label],
                                    }))
                                  }
                                  className="tap-target focus-ring-inverse w-14 shrink-0 rounded-r-xl border-l border-white/15 text-white/70 hover:bg-white/10"
                                >
                                  <ChevronDownIcon
                                    aria-hidden="true"
                                    className={`h-[18px] w-[18px] transition-transform ${
                                      expanded[item.label] ? 'rotate-180' : ''
                                    }`}
                                  />
                                </button>
                              </div>
                              {expanded[item.label] && (
                                <ul
                                  id={sectionId(item.href)}
                                  className="border-t border-white/15 px-2 py-1"
                                >
                                  {item.children.map((child) => (
                                    <li key={child.href}>
                                      <Link
                                        href={child.href}
                                        onClick={() => setOpen(false)}
                                        className="flex min-h-[44px] items-center rounded-lg px-3 text-sm text-white/80 hover:bg-white/10"
                                      >
                                        {translatedChildLabel(child, t, locale)}
                                      </Link>
                                    </li>
                                  ))}
                                  {item.overviewLabel && (
                                    <li>
                                      <Link
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-semibold text-brand-copper hover:bg-white/10"
                                      >
                                        {translatedOverviewLabel(item, t)} &rarr;
                                      </Link>
                                    </li>
                                  )}
                                </ul>
                              )}
                            </div>
                          </li>
                        ) : (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className={`${ROW_CLASS} ${LABEL_CLASS} flex w-full rounded-xl`}
                            >
                              {rowIcon(item.href)}
                              {translatedNavLabel(item, t)}
                            </Link>
                          </li>
                        ),
                      )}
                    </ul>
                  </nav>

                  {/*
                    `pb-[max(...)]` is not needed here: the drawer already stops short of the screen's
                    bottom edge by the safe-area inset, so nothing sits on the home indicator.
                  */}
                  <div className="shrink-0 space-y-2 border-t border-white/15 p-3">
                    <a
                      href={`tel:${contact.primary}`}
                      className="tap-target focus-ring-inverse min-h-[48px] w-full gap-2.5 rounded-xl bg-brand-emergency px-4 text-sm font-bold text-white"
                    >
                      <PhoneIcon className="h-[18px] w-[18px] shrink-0" />
                      {tMenu('emergencyLine')} &middot; {contact.primaryDisplay}
                    </a>
                    {/* Appointments and WhatsApp share a row under the emergency line. */}
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`tel:${contact.secondary}`}
                        aria-label={`${tMenu('appointmentsLine')}: ${contact.secondaryDisplay}`}
                        className="tap-target focus-ring-inverse min-h-[48px] gap-2 rounded-xl bg-brand-copper px-3 text-sm font-bold text-white transition-colors hover:bg-brand-copper-hover"
                      >
                        <PhoneIcon className="h-[18px] w-[18px] shrink-0" />
                        <span className="truncate">{tMenu('appointmentsLine')}</span>
                      </a>
                      <a
                        href={whatsappUrl(tCommon('whatsappMessage'))}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="tap-target focus-ring-inverse min-h-[48px] gap-2 rounded-xl bg-brand-whatsapp-hover px-3 text-sm font-bold text-white transition-[filter] hover:brightness-95"
                      >
                        <WhatsAppIcon className="h-5 w-5 shrink-0" />
                        <span className="truncate">{tCommon('whatsapp')}</span>
                      </a>
                    </div>
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
