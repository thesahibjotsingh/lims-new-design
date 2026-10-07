'use client'

// components/layout/LanguageSwitcher.tsx
//
// The language control: one menu, two placements.
//
//   variant="sheet"     phone header. A globe button showing the current language's code (EN,
//                       HI, PA) that opens a panel with the three languages as big rows. The
//                       panel grows out of the bottom navigation pill and shrinks back into it,
//                       over a dimmed page.
//   variant="dropdown"  desktop header. The same button and the same rows. The panel grows
//                       out of the button itself, its top-right corner where the button was,
//                       and the page behind is left as it is (it closes when you click away,
//                       press Escape or scroll).
//
// Desktop used to have three round chips, A / अ / ਅ, with tooltips. They were replaced so the
// two screen sizes are one control that looks and behaves the same: nobody has to learn two.
//
// Both switch the CURRENT page's language, not back to home: next-intl's Link resolves
// "this same pathname, other locale" on its own, so a doctor's profile stays on that
// doctor's profile across the switch.
//
// Language names are the same in every interface language, on purpose: a Punjabi reader on
// the English page must find "ਪੰਜਾਬੀ", not "Punjabi". They come from messages/*.json
// (`languageSwitcher.en|hi|pa`), the English gloss under a name is a constant below.

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { CheckIcon, CloseIcon, GlobeIcon } from '@/components/icons'

/**
 * Carries the page's `?query` across a language switch.
 *
 * The links are built from the pathname alone, which is what lets every page stay
 * pre-built (reading the query string during render would make them all render on every
 * request, which is exactly the Cloudflare CPU problem the pre-built pages solved). The
 * query is read here instead, from the browser's own URL, at the moment of the click, so a
 * filtered doctor search (`/doctors?q=bansal`) is still filtered in the other language. With
 * no query, or on a new-tab click, the plain link does its job unchanged.
 */
function useSwitchLocale() {
  const router = useRouter()
  const pathname = usePathname()
  return function switchLocale(event: React.MouseEvent<HTMLAnchorElement>, locale: Locale) {
    const search = window.location.search
    const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
    if (!search || modified || event.button !== 0) return
    event.preventDefault()
    router.push(`${pathname}${search}`, { locale })
  }
}

/** First letter of each script: the face of the chip. */
const GLYPH: Record<Locale, string> = { en: 'A', hi: 'अ', pa: 'ਅ' }

/** The English name, shown as a gloss beside the native one. Same on every page. */
const ENGLISH_NAME: Record<Locale, string> = { en: 'English', hi: 'Hindi', pa: 'Punjabi' }

/** The phone button's label. ISO 639-1, upper-cased. */
const CODE: Record<Locale, string> = { en: 'EN', hi: 'HI', pa: 'PA' }

/*
 * THE PANEL GROWS OUT OF ITS TRIGGER (phone: the bottom pill; desktop: the button).
 *
 * Gate: opened a handful of times per visit, never from the keyboard, so it is allowed to
 * animate. Purpose: spatial consistency. The panel is a continuation of the bottom
 * navigation pill, not a separate sheet arriving from off-screen, so the motion has to
 * show that.
 *
 * How: the panel is laid out at its final size and position, bottom edge level with the
 * pill's, and revealed with `clip-path: inset(...)`. It starts clipped to exactly the pill's
 * rectangle (measured at open, with the pill's fully-round corners) and opens out to the
 * full panel. Because the panel is clipped rather than scaled, its text and corners are
 * never stretched, and the first frame is pixel-identical to the pill, so there is no jump.
 * Three Web Animations, all reversed together on close, so closing retraces the opening
 * and a tap mid-way turns round from wherever it has got to:
 *
 *   clip-path         360ms   ease-in-out      pill rectangle -> whole panel
 *   background-color  140ms   ease-in-out      clear -> white, from 40ms in, then held
 *                                              (endDelay), so on close it turns clear only
 *                                              at the very end
 *   content opacity   200ms   ease-in-out      starts 120ms in, so no text sits over the
 *                                              pill's own tabs while they are still visible
 *
 * THE CURVE IS SYMMETRIC ON PURPOSE. This is one on-screen shape morphing into another, so
 * the in-out curve (--ease-in-out, strong) is the right one, and because every animation is
 * played backwards on close, it must not be an ease-out: reversed, an ease-out is an ease-in,
 * and a close that hesitates before it moves feels like lag. (--ease-drawer was tried first;
 * it is so front-loaded that the panel was 90% open by 110ms and there was nothing left to
 * read as "growing out of the pill".)
 *
 * Close plays 1.35x faster than open (about 270ms): the user has decided, so get out of the
 * way. Reduced motion swaps the whole thing for a 150ms fade with no movement.
 *
 * DESKTOP is the same motion with a different origin. The panel is placed with its top-right
 * corner exactly on the button's, so the clip starts as the button's rectangle at the top
 * right of the panel and opens down and to the left. The panel's title row ends up where the
 * button was and its close button sits on the spot the button occupied, so the button reads
 * as turning into the panel's header.
 *
 * A SEPARATE SHADOW LAYER on desktop. A box-shadow on the clipped panel would be cut off by
 * the clip-path (it paints outside the box), so the shadow is its own element behind the
 * panel and fades in once the panel is most of the way open (and out first on close).
 * Fading it in with the background instead would show a full-size shadow around a panel
 * that is still only button-sized. The phone panel sits on a dimmed page and needs none.
 */
const EASE_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)' // --ease-in-out strong curve
const OPEN_MS = 360
const CLOSE_SPEEDUP = 1.35
const PANEL_RADIUS = 28
const PANEL_MAX_WIDTH = { sheet: 368, dropdown: 320 } as const // 23rem, 20rem
const BLEED = 3 // px the desktop panel overhangs its button, top and right
const SHADOW_DELAY = 250 // ms into the opening before the desktop shadow starts to arrive
const SHADOW_DURATION = OPEN_MS - SHADOW_DELAY
const SHADOW =
  'shadow-[0_22px_48px_-16px_rgba(11,20,22,0.42),0_6px_16px_-8px_rgba(11,20,22,0.22)]'

export function LanguageMenu({ variant = 'sheet' }: { variant?: 'sheet' | 'dropdown' }) {
  const active = useLocale() as Locale
  const pathname = usePathname()
  const switchLocale = useSwitchLocale()
  const t = useTranslations('languageSwitcher')

  // `open` is intent; `rendered` keeps the panel mounted while the close animation plays.
  const [open, setOpen] = useState(false)
  const [rendered, setRendered] = useState(false)
  // Where the panel sits and the rectangle it grows out of (the bottom pill on a phone, the
  // button on desktop), all measured at the moment of the tap.
  const [anchor, setAnchor] = useState<{
    left: number
    top: number
    width: number
    origin: DOMRect | null
  }>({ left: 8, top: 0, width: 0, origin: null })
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLButtonElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)
  const animationsRef = useRef<Animation[]>([])

  function openSheet() {
    const viewport = document.documentElement.clientWidth
    const margin = 8
    const width = Math.min(PANEL_MAX_WIDTH[variant], viewport - margin * 2)

    if (variant === 'dropdown') {
      // Top-right corner on the button's top-right corner, so the button sits inside the
      // panel's top-right and the clip can start from its whole rectangle. The panel
      // overhangs the button by BLEED on the top and right: the button's corner is rounder
      // than the panel's (22px against 28px), and with the edges flush a hairline of the
      // button's border would show past the panel's corner.
      const button = triggerRef.current?.getBoundingClientRect() ?? null
      const right = (button ? button.right : viewport - margin) + BLEED
      const left = Math.max(margin, Math.min(right - width, viewport - margin - width))
      setAnchor({ left, top: button ? button.top - BLEED : margin, width, origin: button })
    } else {
      const pillElement = document.querySelector<HTMLElement>('[data-bottom-pill]')
      let pill = pillElement ? pillElement.getBoundingClientRect() : null
      // The pill slides off the bottom while the page is read downwards (MobileBottomNav).
      // Measure where it WILL be, not where it is mid-slide, and bring it back for the panel
      // to grow out of: its wrapper's translateY is what to take off.
      if (pillElement && pill && pillElement.parentElement) {
        const shift = new DOMMatrixReadOnly(getComputedStyle(pillElement.parentElement).transform).m42
        if (shift) pill = new DOMRect(pill.left, pill.top - shift, pill.width, pill.height)
      }
      document.documentElement.removeAttribute('data-nav-hidden')
      // Centre the panel over the pill, but never let it stop short of the pill: the clip
      // has to start from the pill's WHOLE rectangle, and on narrow phones the pill runs right
      // up to the screen edge, so the left limit relaxes to the pill's own left.
      const centre = pill ? pill.left + pill.width / 2 : viewport / 2
      const minLeft = pill ? Math.min(margin, pill.left) : margin
      const left = Math.max(minLeft, Math.min(centre - width / 2, viewport - margin - width))
      setAnchor({ left, top: 0, width, origin: pill })
    }
    setOpen(true)
    setRendered(true)
  }

  const closeSheet = useCallback(({ returnFocus = true }: { returnFocus?: boolean } = {}) => {
    setOpen(false)
    if (returnFocus) triggerRef.current?.focus()
  }, [])

  // Opening: lay the panel out, measure it against the pill, start the three animations.
  // A layout effect, so the first frame is already the collapsed one and the expanded panel
  // never flashes.
  useLayoutEffect(() => {
    if (!open || !rendered) return
    const panel = panelRef.current
    const content = contentRef.current
    const backdrop = backdropRef.current
    if (!panel || !content || !backdrop) return

    animationsRef.current.forEach((animation) => animation.cancel())
    const animations: Animation[] = []
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    animations.push(
      backdrop.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 300,
        endDelay: OPEN_MS - 300,
        easing: 'ease-in-out',
        fill: 'both',
      }),
    )

    if (reduceMotion) {
      animations.push(
        panel.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 150,
          easing: 'ease',
          fill: 'both',
        }),
      )
    } else {
      const box = panel.getBoundingClientRect()
      const origin = anchor.origin
      // Inset of the origin's rectangle from each edge of the panel. No origin to read (the
      // pill is always there on phones and the button on desktop, but be safe): collapse to a
      // strip of the same shape at the panel's own edge.
      const top = origin ? Math.max(0, origin.top - box.top) : Math.max(0, box.height - 58)
      const bottom = origin ? Math.max(0, box.bottom - origin.bottom) : 0
      const left = origin ? Math.max(0, origin.left - box.left) : box.width * 0.1
      const right = origin ? Math.max(0, box.right - origin.right) : box.width * 0.1
      const originRadius = origin ? origin.height / 2 : 29
      const collapsed = `inset(${top}px ${right}px ${bottom}px ${left}px round ${originRadius}px)`
      const expanded = `inset(0px 0px 0px 0px round ${PANEL_RADIUS}px)`

      animations.push(
        panel.animate([{ clipPath: collapsed }, { clipPath: expanded }], {
          duration: OPEN_MS,
          easing: EASE_IN_OUT,
          fill: 'both',
        }),
        panel.animate(
          [{ backgroundColor: 'rgba(255, 255, 255, 0)' }, { backgroundColor: 'rgb(255, 255, 255)' }],
          {
            delay: 40,
            duration: 140,
            endDelay: OPEN_MS - 180,
            easing: 'ease-in-out',
            fill: 'both',
          },
        ),
      )
      const shadow = shadowRef.current
      if (shadow) {
        animations.push(
          shadow.animate([{ opacity: 0 }, { opacity: 1 }], {
            delay: SHADOW_DELAY,
            duration: SHADOW_DURATION,
            easing: 'ease-in-out',
            fill: 'both',
          }),
        )
      }
    }

    animations.push(
      content.animate([{ opacity: 0 }, { opacity: 1 }], {
        delay: 120,
        duration: 200,
        endDelay: OPEN_MS - 320,
        easing: 'ease-in-out',
        fill: 'both',
      }),
    )

    animationsRef.current = animations
    panel.querySelector<HTMLElement>('[aria-current="true"]')?.focus({ preventScroll: true })
    // `anchor` is set in the same batch as `open`, so it is current here; it is not a
    // dependency because changing it must never restart a running animation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, rendered])

  // Closing: play every animation backwards, from wherever it currently is, a little faster.
  // Unmount once the panel has finished shrinking back into the pill.
  useEffect(() => {
    if (open || !rendered) return
    const animations = animationsRef.current
    if (animations.length === 0) {
      setRendered(false)
      return
    }
    let remaining = animations.length
    animations.forEach((animation) => {
      animation.onfinish = () => {
        remaining -= 1
        if (remaining === 0) setRendered(false)
      }
      // Set the (negative) rate first, then play: play() reads the pending rate, so this
      // runs backwards from the current position whether the opening has finished or is
      // still in progress.
      animation.updatePlaybackRate(-CLOSE_SPEEDUP)
      animation.play()
    })
    // Backstop: never leave a transparent, scroll-locking panel mounted if a finish event
    // is somehow missed.
    const backstop = setTimeout(() => setRendered(false), OPEN_MS + 200)
    return () => clearTimeout(backstop)
  }, [open, rendered])

  useEffect(() => {
    return () => animationsRef.current.forEach((animation) => animation.cancel())
  }, [])

  // Phone: the page behind must not scroll while the panel is up.
  useEffect(() => {
    if (!rendered || variant !== 'sheet') return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [rendered, variant])

  // Desktop: the page is not locked (taking the scrollbar away would shift the whole header
  // sideways), so a panel pinned to the button's old position has to go as soon as the page
  // or the window moves.
  useEffect(() => {
    if (!open || variant !== 'dropdown') return
    const close = () => closeSheet({ returnFocus: false })
    window.addEventListener('scroll', close, { passive: true })
    window.addEventListener('resize', close)
    return () => {
      window.removeEventListener('scroll', close)
      window.removeEventListener('resize', close)
    }
  }, [open, variant, closeSheet])

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeSheet()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, closeSheet])

  // Keep Tab inside the panel while it is modal.
  function onPanelKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Tab') return
    const focusable = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button')
    if (!focusable || focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openSheet}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`${t('label')}: ${t(active)}`}
        className={[
          'tap-target press gap-1.5 rounded-full border border-brand-teal/35 px-3 text-sm font-bold text-brand-teal',
          variant === 'dropdown' && 'transition-colors hover:border-brand-teal/60 hover:bg-brand-mist',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <GlobeIcon className="h-[18px] w-[18px]" />
        {CODE[active]}
      </button>

      {rendered &&
        createPortal(
          // Portalled to <body>: nested inside MobileHeader's sticky, z-indexed stacking
          // context the panel would lose to MobileBottomNav, which paints into <body>. The
          // phone sheet is also hidden from `lg` up, where the desktop header has its own.
          <div className={variant === 'sheet' ? 'fixed inset-0 z-[60] lg:hidden' : 'fixed inset-0 z-[60]'}>
            <button
              ref={backdropRef}
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => closeSheet()}
              className={
                variant === 'sheet'
                  ? [
                      'absolute inset-0 h-full w-full cursor-default bg-brand-dark-base/60 backdrop-blur-sm',
                      '[@media(prefers-reduced-transparency:reduce)]:bg-brand-dark-base/90 [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none',
                    ].join(' ')
                  : // Desktop: a transparent catcher, so a click anywhere else closes the panel
                    // but the page is not dimmed or blurred.
                    'absolute inset-0 h-full w-full cursor-default'
              }
            />

            {/*
              The frame places the panel; the panel inside is the thing that is clipped.

              Phone: same bottom offset as the pill (MobileBottomNav:
              `pb-[env(safe-area-inset-bottom)]` plus `mb-4`), so the panel's bottom edge is
              level with the pill's and it grows upward from it. Left and width come from
              `anchor` (see openSheet), which keeps the panel centred over the pill and always
              wide enough to contain it.

              Desktop: `anchor.top` is the button's top, and the panel's right edge is the
              button's right edge (each BLEED px past it), so it grows down and to the left
              from the button.
            */}
            <div
              style={
                variant === 'sheet'
                  ? { left: anchor.left, width: anchor.width }
                  : { left: anchor.left, top: anchor.top, width: anchor.width }
              }
              className={
                variant === 'sheet'
                  ? 'absolute bottom-[calc(env(safe-area-inset-bottom)+1rem)]'
                  : 'absolute'
              }
            >
              {variant === 'dropdown' && (
                <div
                  ref={shadowRef}
                  aria-hidden="true"
                  style={{ borderRadius: PANEL_RADIUS }}
                  className={`pointer-events-none absolute inset-0 ${SHADOW}`}
                />
              )}
              <div
                ref={panelRef}
                onKeyDown={onPanelKeyDown}
                role="dialog"
                aria-modal="true"
                aria-label={t('label')}
                style={{ borderRadius: PANEL_RADIUS }}
                className="relative bg-white"
              >
                <div ref={contentRef} className={variant === 'sheet' ? 'p-3 pt-2' : 'p-3 pt-[3px]'}>
                  <div className="mb-1 flex items-center justify-between pl-3">
                    {/* The title is in all three languages, whichever one the page is in. */}
                    <h2 className="text-xs font-semibold tracking-wide text-brand-dark-base/65">
                      <span lang="en">Language</span> · <span lang="hi">भाषा</span> ·{' '}
                      <span lang="pa">ਭਾਸ਼ਾ</span>
                    </h2>
                    <button
                      type="button"
                      onClick={() => closeSheet()}
                      aria-label={t('close')}
                      className={[
                      'tap-target h-11 w-11 rounded-full text-brand-dark-base/55 hover:bg-brand-mist',
                      // Lands the X on the centre of the button this panel grew out of.
                      variant === 'dropdown' && 'mr-[3px]',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    >
                      <CloseIcon className="h-5 w-5" strokeWidth={2} />
                    </button>
                  </div>

                  <ul className="space-y-1">
                    {routing.locales.map((locale) => {
                      const isActive = locale === active
                      return (
                        <li key={locale}>
                          <Link
                            href={pathname}
                            locale={locale}
                            lang={locale}
                            aria-current={isActive ? 'true' : undefined}
                            onClick={(event) => {
                              closeSheet({ returnFocus: false })
                              switchLocale(event, locale)
                            }}
                            className={[
                              'press flex min-h-[56px] items-center gap-3 rounded-2xl px-3 transition-colors',
                              isActive ? 'bg-brand-mist' : 'hover:bg-brand-mist/60',
                            ].join(' ')}
                          >
                            <span
                              aria-hidden="true"
                              className={[
                                'grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg font-bold',
                                isActive ? 'bg-brand-teal text-white' : 'bg-brand-mist text-brand-teal',
                              ].join(' ')}
                            >
                              {GLYPH[locale]}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span
                                className={[
                                  'block text-lg font-semibold leading-tight',
                                  isActive ? 'text-brand-teal' : 'text-brand-dark-base',
                                ].join(' ')}
                              >
                                {t(locale)}
                              </span>
                              {locale !== 'en' && (
                                <span lang="en" className="block text-xs text-brand-dark-base/65">
                                  {ENGLISH_NAME[locale]}
                                </span>
                              )}
                            </span>
                            {isActive && <CheckIcon className="h-5 w-5 shrink-0 text-brand-teal" />}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
