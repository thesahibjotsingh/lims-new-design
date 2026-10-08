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
// ON A PHONE the sections are rows that open (Collapse), and this row becomes chips that stay
// stuck under the site header. Tapping a chip opens its section (Collapse listens for the
// click) and the browser's anchor scroll takes you to it, so a reader can go straight to
// "Treatments" without opening, or scrolling past, anything else. The chip for the section in
// view is kept in view as the page moves.
//
// MOTION. There is none to reduce: the highlight is a colour change, and the jump itself
// is the browser's own anchor scroll (smooth scrolling is set once on <html> and is
// already switched off by prefers-reduced-motion in globals.css).
//
// IntersectionObserver rather than a scroll listener, so it costs nothing per frame.

import { useEffect, useRef, useState } from 'react'
import { useScrollFade } from '@/components/primitives/useScrollFade'

export interface SectionNavItem {
  id: string
  label: string
  /** The section is not shown on a phone (the hero says the same thing), so neither is its chip. */
  phoneHidden?: boolean
}

export function SectionNav({ items, label }: { items: SectionNavItem[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id ?? '')
  const listRef = useRef<HTMLUListElement>(null)
  const fade = useScrollFade(listRef)
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

  // Keep the current chip inside the strip. Scrolls the strip itself, never the page.
  useEffect(() => {
    const list = listRef.current
    const current = list?.querySelector<HTMLElement>('[aria-current="location"]')
    if (!list || !current || list.scrollWidth <= list.clientWidth) return
    list.scrollTo({
      left: current.offsetLeft - (list.clientWidth - current.offsetWidth) / 2,
      behavior: 'smooth',
    })
  }, [active])

  return (
    <nav
      aria-label={label}
      // Sticky under the site header: the two-tier one from lg up (about 121px tall), and on a
      // phone the compact bar, which has shrunk to 52px by the time this row reaches it.
      className="sticky top-[52px] z-40 border-b border-brand-teal/10 bg-white/95 backdrop-blur lg:top-[121px] lg:z-30"
    >
      <ul
        ref={listRef}
        onScroll={fade.onScroll}
        className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2.5 sm:px-5 lg:gap-1 lg:px-3 lg:py-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => {
          const current = item.id === active
          return (
            <li key={item.id} className={item.phoneHidden ? 'shrink-0 max-lg:hidden' : 'shrink-0'}>
              <a
                href={`#${item.id}`}
                aria-current={current ? 'location' : undefined}
                onClick={() => setActive(item.id)}
                className={[
                  // A pill on a phone (its hit area is padded to 44px), an underlined tab from lg up.
                  'relative flex items-center text-[13px] font-semibold transition-colors before:absolute before:inset-x-0 before:-inset-y-1.5 before:content-[""]',
                  'min-h-[34px] rounded-full px-3.5',
                  'lg:min-h-[48px] lg:rounded-none lg:border-b-2 lg:px-3 lg:text-sm lg:before:hidden',
                  current
                    ? 'bg-brand-teal text-white lg:border-brand-copper lg:bg-transparent lg:text-brand-teal'
                    : 'bg-brand-mist text-brand-teal lg:border-transparent lg:bg-transparent lg:text-brand-dark-base/65 lg:hover:text-brand-teal',
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
