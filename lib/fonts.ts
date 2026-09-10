// lib/fonts.ts
//
// One webfont, two weights — the whole typography budget.
//
// Source Serif 4 carries the headings; body text uses the platform system stack, which
// costs zero bytes and renders in the reader's own familiar UI face. `display: 'swap'`
// prevents FOIT: on a slow 4G connection a patient sees fallback text immediately
// rather than a blank page while the webfont downloads.
//
// NOTE: adding the `devanagari` subset roughly doubles font payload. Only add it when
// Hindi content actually ships, and re-measure the budget when you do.

import { Source_Serif_4 } from 'next/font/google'

export const serif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700'],
  variable: '--font-serif',
})

export const fontVariables = serif.variable
