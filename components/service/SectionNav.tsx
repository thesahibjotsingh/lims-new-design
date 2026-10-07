'use client'

// components/service/SectionNav.tsx
//
// The row of anchor links under the hero of a service page, with the section currently on
// screen highlighted.
//
// WHY IT EXISTS. These pages are long on purpose, and a long page with no map is a wall.
// Large hospital sites use the same device (a sticky row of section tabs). Every link is a
// plain in-page anchor, so it works with JavaScript off; the highlight is the only thing
// this component adds.
//
// MOTION. There is none to reduce: the highlight is a colour change, and the jump itself
// is the browser's own anchor scroll (smooth scrolling is set once on <html> and is
// already switched off by prefers-reduced-motion in globals.css).
//
// IntersectionObserver rather than a scroll listener, so it costs nothing per frame.

import { useEffect, useState } from 'react'

export interface SectionNavItem {
  id: string
  label: string
}

export function SectionNav({ items, label }: { items: SectionNavItem[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id ?? '')
  const key = items.map((item) => item.id).join('|')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const targets = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Several sections can intersect at once; the topmost one is "where you are".
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      // A thin band near the top third of the viewport, so a section becomes "current"
      // when its heading reaches the reader's eye line, not when its last pixel appears.
      { rootMargin: '-25% 0px -65% 0px' },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [key])

  return (
    <nav
      aria-label={label}
      // Sticky from lg up, under the two-tier site header (about 121px tall). On a phone
      // the site header collapses as you scroll, so a second sticky bar would fight it:
      // there the row simply scrolls with the page.
      className="z-30 border-b border-brand-teal/10 bg-white/95 backdrop-blur lg:sticky lg:top-[121px]"
    >
      <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-3 sm:px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const current = item.id === active
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={current ? 'location' : undefined}
                className={[
                  'flex min-h-[48px] items-center border-b-2 px-3 text-sm font-semibold transition-colors',
                  current
                    ? 'border-brand-copper text-brand-teal'
                    : 'border-transparent text-brand-dark-base/65 hover:text-brand-teal',
                ].join(' ')}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
