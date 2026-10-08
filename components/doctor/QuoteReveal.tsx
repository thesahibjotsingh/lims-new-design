'use client'

// components/doctor/QuoteReveal.tsx
//
// A doctor's quote on her profile: the first sentence, then "Read more" for the rest of her
// words. The rest is in the page either way (hidden, not left out), and the button appears only
// when there is a rest, so a one-sentence quote gets no control that does nothing.
//
// ON A WIDE SCREEN (xl, 1280px and up) there is no "Read more": the whole quote is showing, and the
// button is hidden. The hero is a grid there (portrait, text, notepad, with the three buttons in a
// row beneath), and a quote that opened on a tap would push the buttons down and leave a gap under
// the photo. With the whole quote always in place nothing moves; the portrait is sized to match
// (DoctorHero). Below xl, a phone's or a tablet's column, it is the first sentence plus Read more.
//
// Split by sentence, not clipped by line count: how many lines the first sentence takes changes
// with the screen, and a line clamp would cut it, or show half of the second sentence, on some of
// them. DoctorHero works out `lead` and `rest` on the server.
//
// THE QUOTATION MARKS. Both are drawn here, the same size and the same copper, one before the first
// word and one after the LAST word that is showing. Closed, the closing mark follows the first
// sentence, so what is on screen is a complete quotation; open, it follows the end of her words.
// Both are decorative: the <blockquote> already says it is a quotation.

import { useId, useState } from 'react'

/**
 * The marks are set in a font whose curly quotes read as 66 and 99, as on the doctor's own card.
 * The site's heading font draws them as slanted wedges, which look like stray strokes at this
 * size. Georgia where it exists; any other serif has the same shapes.
 */
const MARK_FONT = { fontFamily: 'Georgia, "Times New Roman", serif' }

function Mark({ children, className = '' }: { children: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      style={MARK_FONT}
      className={`select-none align-[-0.28em] text-[1.45em] font-bold not-italic leading-[0] text-brand-copper ${className}`}
    >
      {children}
    </span>
  )
}

export function QuoteReveal({
  lead,
  rest,
  readMore,
  readLess,
}: {
  /** The first sentence. */
  lead: string
  /** Everything after it; empty when the quote is one sentence. */
  rest: string
  readMore: string
  readLess: string
}) {
  const [open, setOpen] = useState(false)
  const id = useId()

  return (
    <div className="min-w-0 flex-1">
      <blockquote
        id={id}
        className="font-serif text-[15px] italic leading-snug text-white sm:text-lg sm:leading-snug"
      >
        <Mark className="mr-1">{'\u201C'}</Mark>
        {lead}
        {/* From xl the rest is always showing (see the header comment), whatever `open` says. */}
        {rest && (
          <span hidden={!open} className="xl:inline">
            {' '}
            {rest}
          </span>
        )}
        <Mark className="ml-0.5">{'\u201D'}</Mark>
      </blockquote>
      {rest && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((value) => !value)}
          className="focus-ring-inverse -mx-1 mt-0.5 min-h-[40px] rounded-md px-1 text-[13px] font-semibold text-brand-sticky xl:hidden"
        >
          {open ? readLess : readMore}
        </button>
      )}
    </div>
  )
}
