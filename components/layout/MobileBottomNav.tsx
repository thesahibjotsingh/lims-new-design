'use client'

// components/layout/MobileBottomNav.tsx
//
// The frosted "liquid glass" pill. Four destinations and a Search tab, floated above the content
// in the thumb zone rather than pinned flush to the bottom edge — the bottom 12pt of a modern
// phone belongs to the home indicator, and a control there gets swiped instead of tapped.
//
// IT GETS OUT OF THE WAY. Reading downwards slides the pill off the bottom of the screen and
// the first scroll back up (or a tap on any control inside it, or keyboard focus) brings it
// back, so the page gets the whole screen while it is being read. The state is one attribute,
// data-nav-hidden on <html>, so the action bar above the pill (PhoneActionBar) and the language
// sheet that opens out of it can follow without a shared store.
//
// SEARCH IS A TAB, NOT A LINK. It sits between Departments and Book (Book stays last, under the
// right thumb) and opens a panel that grows out of its icon (SearchSheet). Five slots is the
// most this pill holds at 390px without the labels touching.
//
// `pb-[env(safe-area-inset-bottom)]` on the wrapper is what keeps it clear of that
// indicator on a notched device. The layout reserves matching space at the foot of
// <main>, so the pill never covers the last paragraph of a page.

import { Fragment, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { usePathname } from '@/i18n/navigation'
import { isActiveHref } from '@/lib/is-active'
import { CalendarIcon, GridIcon, HomeIcon, StethoscopeIcon } from '@/components/icons'
import { SearchSheet } from '@/components/layout/SearchSheet'

// `labelKey` into messages/*.json's `bottomNav` namespace, not the literal
// label — this array is module scope, outside the component, so it can't
// call the translation hook itself.
const TABS = [
  { labelKey: 'home', href: '/', Icon: HomeIcon },
  { labelKey: 'doctors', href: '/doctors', Icon: StethoscopeIcon },
  { labelKey: 'departments', href: '/specialities', Icon: GridIcon },
  { labelKey: 'book', href: '/appointments', Icon: CalendarIcon, accent: true },
] as const

/** Pixels of travel before a change of direction counts; below this a jittery thumb is ignored. */
const SCROLL_SLACK = 8
/** Within this distance of the top the pill is always shown. */
const ALWAYS_SHOWN_ABOVE = 80

export function MobileBottomNav() {
  const pathname = usePathname()
  const t = useTranslations('bottomNav')
  const tA11y = useTranslations('a11y')

  useEffect(() => {
    const root = document.documentElement
    let anchor = window.scrollY
    let frame: number | null = null

    function settle() {
      frame = null
      const y = window.scrollY
      if (y < ALWAYS_SHOWN_ABOVE) {
        root.removeAttribute('data-nav-hidden')
        anchor = y
      } else if (y > anchor + SCROLL_SLACK) {
        root.setAttribute('data-nav-hidden', 'true')
        anchor = y
      } else if (y < anchor - SCROLL_SLACK) {
        root.removeAttribute('data-nav-hidden')
        anchor = y
      }
    }
    function onScroll() {
      if (frame === null) frame = requestAnimationFrame(settle)
    }

    root.removeAttribute('data-nav-hidden')
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame !== null) cancelAnimationFrame(frame)
      root.removeAttribute('data-nav-hidden')
    }
    // A new page starts with the pill showing.
  }, [pathname])

  return (
    <div
      onFocusCapture={() => document.documentElement.removeAttribute('data-nav-hidden')}
      className="bottom-nav pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      {/*
        `data-bottom-pill` is how LanguageMenu finds this pill: its panel opens out of this
        exact rectangle and closes back into it.
      */}
      <nav
        data-bottom-pill=""
        aria-label={tA11y('quickNav')}
        className="pointer-events-auto mb-4 flex w-full max-w-[21rem] items-center justify-around rounded-full border border-white/40 bg-white/75 px-2 py-1.5 shadow-glass backdrop-blur-xl [@media(prefers-reduced-transparency:reduce)]:bg-white/95 [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none"
      >
        {TABS.map(({ labelKey, href, Icon, ...rest }) => {
          const accent = 'accent' in rest && rest.accent
          const active = isActiveHref(pathname, href)

          return (
            <Fragment key={href}>
              {/* Search takes the slot just before Book. */}
              {accent && <SearchSheet />}
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={[
                  'tap-target flex-col gap-0.5 rounded-2xl px-2 text-[10px] font-semibold transition-colors',
                  // Teal is the resting state now, copper marks where you are — the
                  // same relationship Book's always-copper badge already set up, so
                  // landing on a plain tab reads as "this is now the emphasised one"
                  // rather than introducing a second, unrelated meaning for copper.
                  accent || active ? 'text-brand-copper-ink' : 'text-brand-teal',
                ].join(' ')}
              >
                {accent ? (
                  <span
                    aria-hidden="true"
                    className="grid h-6 w-6 place-items-center rounded-full bg-brand-copper text-white shadow-sm"
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
                  </span>
                ) : (
                  <Icon className="h-5 w-5" strokeWidth={active ? 2.25 : 1.75} />
                )}
                <span>{t(labelKey)}</span>
                {/*
                  Active state is icon weight + colour + an underline, not colour
                  alone. A colour-blind user gets the underline and the heavier
                  stroke. Copper, not teal — it marks the same "selected" the label
                  and icon just switched to, rather than adding a third colour.
                */}
                {!accent && (
                  <span
                    aria-hidden="true"
                    className={[
                      'h-0.5 w-5 rounded-full bg-brand-copper transition-opacity',
                      active ? 'opacity-100' : 'opacity-0',
                    ].join(' ')}
                  />
                )}
              </Link>
            </Fragment>
          )
        })}
      </nav>
    </div>
  )
}
