'use client'

// components/layout/FooterCollapse.tsx
//
// One footer column. From md up it is a heading over a list, as it always was. On a phone each
// column is a row that opens (the same device as the section rows on a department page, see
// components/service/Collapse.tsx), so the footer is three lines to scan instead of three
// screens of links the visitor has already passed on the way down.
//
// The list is rendered by the server and handed in as children; this only owns the open state.
// Two headings, one per breakpoint, so a screen reader never meets a "collapsed" button above a
// list that is in fact showing.

import { useState, type ReactNode } from 'react'
import { ChevronDownIcon } from '@/components/icons'

export function FooterCollapse({
  id,
  heading,
  children,
}: {
  id: string
  heading: string
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-t border-white/10 md:border-0">
      <h3 className="mb-3 hidden text-sm font-semibold text-white md:block">{heading}</h3>
      <h3 className="md:hidden">
        <button
          type="button"
          id={`${id}-row`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((value) => !value)}
          className="focus-ring-inverse flex min-h-[52px] w-full items-center justify-between gap-3 text-left text-sm font-semibold text-white"
        >
          {heading}
          <ChevronDownIcon
            className={[
              'h-[18px] w-[18px] shrink-0 text-white/50 transition-transform duration-[340ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none',
              open ? 'rotate-180' : '',
            ].join(' ')}
          />
        </button>
      </h3>
      <div id={`${id}-panel`} data-open={open} className="footer-panel">
        <div className="footer-inner">{children}</div>
      </div>
    </div>
  )
}
