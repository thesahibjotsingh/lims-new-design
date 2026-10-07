'use client'

// components/service/Collapse.tsx
//
// A service-page section as a row that opens, on a phone and a tablet. From lg up this is
// just its children: no row, no panel, nothing hidden.
//
// WHY. A department page is twenty-odd screens on a phone because every section is open at
// once, and the first heading is most of a screen down. Rows with a count on them ("Conditions
// we treat 5") let a reader see the whole shape of the page in one screen and open only what
// they came for. Nothing is removed: the content is in the page, in the same order, for search
// engines and for anyone who prints it.
//
// THE ROW IS THE HEADING. The visible title lives in an <h2> that wraps the <button>, which is
// the accordion pattern the ARIA Authoring Practices describe, so a screen reader still gets a
// heading to navigate by. The section's own heading (blocks.tsx, SectionHeading) is hidden
// below lg so the title is not read twice.
//
// OPENING FROM A LINK. A chip in the section nav, or a link from elsewhere with #id on the end,
// opens the section it points at. The browser's own anchor scroll then lands on the row, which
// does not move when the panel grows below it.
//
// MOTION. The panel animates grid-template-rows 0fr -> 1fr (see `.collapse-panel` in
// globals.css), which a height transition cannot do for `auto`. Reduced motion turns it off.

import { useEffect, useState, type ReactNode } from 'react'
import { ChevronDownIcon } from '@/components/icons'

export function Collapse({
  id,
  title,
  count,
  defaultOpen = false,
  children,
}: {
  /** The section's id; the panel and the row derive theirs from it. */
  id: string
  title: string
  /** How many things are inside, shown on the row. Left off where counting means nothing. */
  count?: number
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  useEffect(() => {
    const target = `#${id}`
    const openIfTargeted = () => {
      if (window.location.hash === target) setOpen(true)
    }
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="#"]')
      if (link && link.getAttribute('href') === target) setOpen(true)
    }
    openIfTargeted()
    window.addEventListener('hashchange', openIfTargeted)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('hashchange', openIfTargeted)
      document.removeEventListener('click', onClick)
    }
  }, [id])

  return (
    <>
      <h2 className="lg:hidden">
        <button
          type="button"
          id={`${id}-row`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((value) => !value)}
          className="flex min-h-[58px] w-full items-center gap-2.5 px-4 text-left font-sans text-base font-semibold text-brand-dark-base transition-colors active:bg-brand-mist focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-teal"
        >
          <span className="min-w-0 flex-1 text-balance">{title}</span>
          {count !== undefined && (
            <span className="rounded-full bg-brand-teal/10 px-2.5 py-0.5 text-[13px] font-semibold tabular-nums text-brand-teal">
              {count}
            </span>
          )}
          <ChevronDownIcon
            className={[
              'h-[18px] w-[18px] shrink-0 text-brand-dark-base/40 transition-transform duration-[340ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none',
              open ? 'rotate-180' : '',
            ].join(' ')}
          />
        </button>
      </h2>
      <div id={`${id}-panel`} data-open={open} className="collapse-panel">
        <div className="collapse-inner">{children}</div>
      </div>
    </>
  )
}
