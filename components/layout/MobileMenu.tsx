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
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CloseIcon, MenuIcon, SearchIcon } from '@/components/icons'
import {
  SuggestionList,
  useCloseOnOutside,
  useSearchSuggest,
} from '@/components/search/SearchSuggest'
import { contact, primaryNav, siteConfig } from '@/lib/site-config'

export function MobileMenu() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const searchRef = useRef<HTMLDivElement>(null)

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
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

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
        aria-label="Open navigation menu"
        className="tap-target focus-ring-inverse rounded-full text-white/90 hover:bg-white/10"
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-brand-dark-base/60 backdrop-blur-sm"
          />

          <div
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
            className="absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col bg-gradient-to-b from-brand-teal via-brand-teal to-brand-teal-dark shadow-2xl"
          >
            {/*
              White, so the actual lockup can be used instead of the hospital's name set
              as text. The artwork is dark navy and teal on transparent: on the teal
              panel it loses its letterforms entirely, which is the whole reason
              BrandMark has a separate badge for dark grounds. Giving the logo the one
              white strip in the drawer is what lets it be the real logo.
            */}
            <div className="flex h-[65px] shrink-0 items-center justify-between gap-3 bg-white px-4">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                aria-label={`${siteConfig.name}, ${siteConfig.city} — home`}
              >
                <img
                  src="/brand/lims-lockup.webp"
                  alt=""
                  aria-hidden="true"
                  width={640}
                  height={320}
                  className="block h-auto w-[150px] shrink-0"
                />
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
                className="tap-target focus-ring rounded-full text-brand-dark-base/70 hover:bg-brand-mist"
              >
                <CloseIcon className="h-6 w-6" />
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
                Search doctors, departments and pages
              </label>
              <div className="flex items-center rounded-xl bg-white/95 shadow-sm focus-within:bg-white">
                <SearchIcon
                  aria-hidden="true"
                  className="ml-3 h-[18px] w-[18px] shrink-0 text-brand-dark-base/40"
                  strokeWidth={2.4}
                />
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
                  placeholder="Search doctors, departments, pages"
                  // 16px, or iOS Safari zooms the whole drawer when this is focused.
                  className="min-h-[44px] min-w-0 flex-1 bg-transparent px-3 text-base text-brand-dark-base outline-none placeholder:text-brand-dark-base/45"
                />
              </div>

              {visible && (
                <SuggestionList
                  suggestions={suggestions}
                  active={active}
                  setActive={setActive}
                  choose={choose}
                  listId={listId}
                  showingRecent={showingRecent}
                  className="left-3 right-3"
                />
              )}
            </div>

            <nav aria-label="All sections" className="flex-1 overflow-y-auto px-3 py-3">
              <ul className="space-y-1">
                {primaryNav.map((item) =>
                  item.children?.length ? (
                    <li key={item.label}>
                      <details className="group rounded-xl border border-white/15 bg-white/[0.07]">
                        <summary className="tap-target focus-ring-inverse cursor-pointer list-none justify-between px-4 text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">
                          <span className="flex w-full items-center justify-between">
                            {item.label}
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
                                {child.label}
                              </Link>
                            </li>
                          ))}
                          {item.overviewLabel && (
                            <li>
                              <Link
                                href={item.href}
                                className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-semibold text-brand-copper hover:bg-white/10"
                              >
                                {item.overviewLabel} &rarr;
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
                        {item.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="shrink-0 space-y-2 border-t border-white/15 p-3">
              <a
                href={`tel:${contact.primary}`}
                className="tap-target focus-ring-inverse w-full rounded-xl bg-brand-emergency px-4 text-sm font-bold text-white"
              >
                Emergency &middot; {contact.primaryDisplay}
              </a>
              <a
                href={`tel:${contact.secondary}`}
                className="tap-target w-full rounded-xl border border-white/30 px-4 text-sm font-semibold text-white"
              >
                Appointments &middot; {contact.secondaryDisplay}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
