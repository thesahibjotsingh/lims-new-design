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

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CloseIcon, MenuIcon } from '@/components/icons'
import { contact, primaryNav, siteConfig } from '@/lib/site-config'

export function MobileMenu() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Route change closes the drawer. A client-side navigation does not unmount this
  // component, so without it the panel stays open on top of the page you just opened.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

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
            className="absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col bg-white shadow-2xl"
          >
            <div className="flex h-[65px] shrink-0 items-center justify-between border-b border-brand-teal/10 bg-brand-teal px-4">
              <span className="font-serif text-lg font-bold text-white">
                {siteConfig.shortName} {siteConfig.city}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
                className="tap-target focus-ring-inverse rounded-full text-white/90 hover:bg-white/10"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>

            <nav aria-label="All sections" className="flex-1 overflow-y-auto px-3 py-3">
              <ul className="space-y-1">
                {primaryNav.map((item) =>
                  item.children?.length ? (
                    <li key={item.label}>
                      <details className="group rounded-xl border border-brand-teal/10">
                        <summary className="tap-target focus-ring cursor-pointer list-none justify-between px-4 text-sm font-semibold text-brand-dark-base [&::-webkit-details-marker]:hidden">
                          <span className="flex w-full items-center justify-between">
                            {item.label}
                            <span
                              aria-hidden="true"
                              className="text-brand-teal transition-transform group-open:rotate-180"
                            >
                              ▾
                            </span>
                          </span>
                        </summary>
                        <ul className="border-t border-brand-teal/10 px-2 py-1">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="flex min-h-[44px] items-center rounded-lg px-3 text-sm text-brand-dark-base/80 hover:bg-brand-mist"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                          {item.overviewLabel && (
                            <li>
                              <Link
                                href={item.href}
                                className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-semibold text-brand-teal hover:bg-brand-mist"
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
                        className="flex min-h-[44px] items-center rounded-xl border border-brand-teal/10 px-4 text-sm font-semibold text-brand-dark-base hover:bg-brand-mist"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="shrink-0 space-y-2 border-t border-brand-teal/10 p-3">
              <a
                href={`tel:${contact.primary}`}
                className="tap-target focus-ring-inverse w-full rounded-xl bg-brand-emergency px-4 text-sm font-bold text-white"
              >
                Emergency &middot; {contact.primaryDisplay}
              </a>
              <a
                href={`tel:${contact.secondary}`}
                className="tap-target w-full rounded-xl border border-brand-teal/20 px-4 text-sm font-semibold text-brand-teal"
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
