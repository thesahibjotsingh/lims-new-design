'use client'

// components/layout/PrimaryNavBar.tsx
//
// The pale teal navigation ribbon. Client, because a dropdown has open/closed state and
// active-link styling needs the current pathname.
//
// This is the ONLY interactive part of the desktop header — the branding tier above it
// stays a server component. That is the boundary the platform is meant to hold: state
// lives in the leaf that needs it, not in a client wrapper around the whole chrome.

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { isActiveHref } from '@/lib/is-active'
import { ChevronDownIcon, HomeIcon, SearchIcon } from '@/components/icons'
import { TypewriterPlaceholder } from '@/components/search/TypewriterPlaceholder'
import { DOCTOR_SEARCH_PHRASES } from '@/components/search/searchPhrases'
import type { NavItem } from '@/types'

const DOCTOR_SEARCH_PLACEHOLDER = 'Name, speciality or department'

export function PrimaryNavBar({ items }: { items: NavItem[] }) {
  const pathname = usePathname()
  const [openLabel, setOpenLabel] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  // Hover-out should not slam the menu shut while the pointer crosses the gap between
  // the trigger and the panel below it.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Any navigation closes the menu. Without this the panel stays open over the new
    // page, because a client-side route change does not unmount this component.
    setOpenLabel(null)
  }, [pathname])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenLabel(null)
    }
    function onPointerDown(event: MouseEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpenLabel(null)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [])

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    },
    [],
  )

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenLabel(null), 180)
  }

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  return (
    // Deep teal, flowing straight into the hero below it with no seam. The pale ribbon
    // this replaced read as a separate strip between two coloured blocks; carrying the
    // brand teal all the way down makes the header and hero one mass.
    <div ref={navRef} className="bg-brand-teal">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-stretch gap-1 px-6"
        onMouseLeave={scheduleClose}
      >
        {/*
        Home, as an icon rather than a ninth word.

        Eight labels at 16px plus the condensed lockup already came to 1234px of a
        1280px window; a "Home" label is another ~60px and would wrap the row at lg.
        The house glyph is the one nav icon that needs no label to be understood, so it
        buys the entry back for 40px. `aria-label` carries the name for screen readers,
        and the active underline is the same one every other entry uses.

        Rendered here rather than added to primaryNav in site-config, because that array
        also drives the mobile drawer — and the mobile chrome already has Home in its
        bottom tab bar, where a second one would be a duplicate.
      */}
      <div className="relative flex items-stretch">
        <Link
          href="/"
          aria-label="Home"
          aria-current={isActiveHref(pathname, '/') ? 'page' : undefined}
          className="tap-target relative px-3 text-white/80 transition-colors hover:text-white"
        >
          <HomeIcon className="h-[18px] w-[18px]" />
          <span
            aria-hidden="true"
            className={[
              'absolute inset-x-2 bottom-0 h-[3px] rounded-t-full transition-opacity',
              isActiveHref(pathname, '/') ? 'bg-brand-copper opacity-100' : 'opacity-0',
            ].join(' ')}
          />
        </Link>
      </div>

      {items.map((item) => {
          const active = isActiveHref(pathname, item.href)
          const hasPanel = Boolean(item.children?.length) || Boolean(item.panel)
          const open = openLabel === item.label

          return (
            <div
              key={item.label}
              className="relative flex items-stretch"
              onMouseEnter={() => {
                cancelClose()
                if (hasPanel) setOpenLabel(item.label)
              }}
            >
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={[
                  'tap-target relative px-3 text-sm transition-colors',
                  active
                    ? 'font-bold text-white'
                    : 'font-medium text-white/80 hover:text-white',
                ].join(' ')}
              >
                {item.label}
                {/*
                  The active marker is an underline AND a weight change, never colour
                  alone — colour on its own fails WCAG 1.4.1, and white-on-teal has even
                  less room to signal state through hue than the old pale ribbon did.
                */}
                <span
                  aria-hidden="true"
                  className={[
                    'absolute inset-x-2 bottom-0 h-[3px] rounded-t-full transition-opacity',
                    active ? 'bg-brand-copper opacity-100' : 'opacity-0',
                  ].join(' ')}
                />
              </Link>

              {hasPanel && (
                <button
                  type="button"
                  // The label goes to the page; this chevron opens the menu. Two
                  // behaviours, two controls — one control that has to guess which you
                  // meant gets it wrong half the time.
                  onClick={() => setOpenLabel(open ? null : item.label)}
                  aria-expanded={open}
                  aria-haspopup="true"
                  aria-label={`${item.label} menu`}
                  className="tap-target -ml-2 w-8 min-w-0 text-white/65 transition-colors hover:text-white"
                >
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
                  />
                </button>
              )}

              {hasPanel && (
                <div
                  onMouseEnter={cancelClose}
                  // Stays mounted whenever this item has a panel at all; `open`
                  // alone now drives the fade/scale transition (mega-panel in
                  // globals.css) instead of a hard unmount, so it reads as
                  // unfolding out of the trigger link above it rather than
                  // popping into existence.
                  className={[
                    'mega-panel absolute left-0 top-full z-50 w-[320px] rounded-2xl border border-brand-teal/10 bg-white p-2 shadow-glass',
                    open ? '' : 'mega-panel-hidden',
                  ].join(' ')}
                >
                  {item.panel === 'doctor-search' ? (
                    <DoctorSearchPanel onDone={() => setOpenLabel(null)} />
                  ) : (
                    <ul className="max-h-[70vh] overflow-y-auto">
                      {item.children?.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="flex min-h-[44px] items-center rounded-lg px-3 text-sm text-brand-dark-base/85 transition-colors hover:bg-brand-mist hover:text-brand-teal-dark"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                      {item.overviewLabel && (
                        <li className="mt-1 border-t border-brand-teal/10 pt-1">
                          <Link
                            href={item.href}
                            className="flex min-h-[44px] items-center gap-2 rounded-lg px-3 text-sm font-semibold text-brand-teal transition-colors hover:bg-brand-mist"
                          >
                            {item.overviewLabel}
                            <span aria-hidden="true">&rarr;</span>
                          </Link>
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}

/**
 * The "Find a doctor" dropdown panel.
 *
 * A navigation to /doctors?q=, not a fetch. The directory page already filters
 * server-side from the same query string, so the result is a real, shareable,
 * back-button-able URL rather than state trapped inside this menu.
 */
function DoctorSearchPanel({ onDone }: { onDone: () => void }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  return (
    <form
      className="p-2"
      onSubmit={(event) => {
        event.preventDefault()
        const trimmed = query.trim()
        router.push(trimmed ? `/doctors?q=${encodeURIComponent(trimmed)}` : '/doctors')
        onDone()
      }}
    >
      <label
        htmlFor="nav-doctor-search"
        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-dark-base/60"
      >
        Search the consultant roster
      </label>
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-dark-base/40" />
        <input
          id="nav-doctor-search"
          type="search"
          value={query}
          autoComplete="off"
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={DOCTOR_SEARCH_PLACEHOLDER}
          className="min-h-[44px] w-full rounded-xl border border-brand-teal/15 bg-brand-mist/60 pl-9 pr-3 text-sm text-brand-dark-base placeholder:text-transparent focus:bg-white"
        />
        {query.length === 0 && (
          <TypewriterPlaceholder
            phrases={DOCTOR_SEARCH_PHRASES}
            idle={!focused && query.length === 0}
            staticText={DOCTOR_SEARCH_PLACEHOLDER}
            className="pointer-events-none absolute left-9 right-0 top-1/2 -translate-y-1/2 truncate pr-3 text-sm text-brand-dark-base/45"
          />
        )}
      </div>
      <button
        type="submit"
        className="tap-target focus-ring-inverse mt-2 w-full rounded-xl bg-brand-teal px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-teal-dark"
      >
        Search doctors
      </button>
    </form>
  )
}
