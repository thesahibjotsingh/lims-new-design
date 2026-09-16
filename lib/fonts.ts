// lib/fonts.ts
//
// The heading webfont — one per script, so each language actually gets serif
// letterforms instead of a silent fallback.
//
// Source Serif 4 (Latin) has no Devanagari or Gurmukhi glyphs, and neither
// does the CSS fallback chain (Georgia, generic serif) on most platforms —
// so English keeps Source Serif 4, and Hindi/Punjabi each get a Noto Serif
// sibling instead of inheriting a font that would silently fall through to
// the browser's own default. All three are exposed under the SAME
// `--font-serif` variable name; app/[locale]/layout.tsx picks which export's
// `.variable` to apply based on the resolved locale, so nothing downstream
// (tailwind.config.ts's `font-serif` utility, every component using it) has
// to know a language switch happened.
//
// Each is its own font, not one conditionally-parameterised call — next/font
// resolves the Google Fonts subset at build time from a static call site, so
// this can't be a runtime `Font({ subsets: [byLocale] })` branch.
//
// `display: 'swap'` throughout: a patient on slow 4G sees fallback text
// immediately rather than a blank page while the webfont downloads. Only the
// ACTIVE locale's font is ever fetched — next/font only preloads what's
// actually applied via className in the rendered tree for that request, so
// declaring three fonts here does not triple the payload of any one page.

import {
  Noto_Serif_Devanagari,
  Noto_Serif_Gurmukhi,
  Source_Serif_4,
} from 'next/font/google'

export const serifEn = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700'],
  variable: '--font-serif',
})

export const serifHi = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  display: 'swap',
  weight: ['400', '600', '700'],
  variable: '--font-serif',
})

export const serifPa = Noto_Serif_Gurmukhi({
  subsets: ['gurmukhi'],
  display: 'swap',
  weight: ['400', '600', '700'],
  variable: '--font-serif',
})
