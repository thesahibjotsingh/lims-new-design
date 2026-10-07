'use client'

// components/service/ClampedText.tsx
//
// The overview in a phone hero: three lines, then "Read more". The full text is in the page
// either way (it is only clipped, not left out), and the button appears only when there is
// something clipped, so a short overview does not get a control that does nothing.

import { useEffect, useRef, useState, type ReactNode } from 'react'

export function ClampedText({
  children,
  note,
  readMore,
  readLess,
  className = '',
}: {
  children: string
  /** A smaller line that follows the text once it is open (the "general information" caveat). */
  note?: ReactNode
  readMore: string
  readLess: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  // True until measured, so the server render and the first client render agree.
  const [clipped, setClipped] = useState(true)
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const measure = () => {
      if (open) return
      setClipped(element.scrollHeight > element.clientHeight + 1)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [open, children])

  return (
    <div className={className}>
      <p
        ref={ref}
        id="hero-overview"
        className={[
          'text-[15px] leading-relaxed text-white/90',
          open ? '' : 'line-clamp-3',
        ].join(' ')}
      >
        {children}
      </p>
      {open && note && <p className="mt-2 text-xs leading-relaxed text-white/70">{note}</p>}
      {(clipped || open) && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls="hero-overview"
          onClick={() => setOpen((value) => !value)}
          className="focus-ring-inverse -mx-1 mt-0.5 min-h-[40px] rounded-md px-1 text-[13px] font-semibold text-brand-sticky"
        >
          {open ? readLess : readMore}
        </button>
      )}
    </div>
  )
}
