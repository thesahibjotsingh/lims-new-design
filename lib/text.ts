// lib/text.ts
//
// Small helpers for text that arrives from data files.

/**
 * Turns a spaced em or en dash into a comma.
 *
 * Several supplied strings (service overviews, doctor designations) use " — " as a
 * parenthetical break. Set in a sentence it reads as a typographic crutch, so it is
 * rendered as a comma instead. Only SPACED dashes are touched: "2018–2026" and
 * "Reg. No." style ranges and labels are left alone.
 */
export function plain(text: string): string {
  return text.replace(/\s+[—–]\s+/g, ', ')
}

/** The first sentence of a paragraph, for a one-line summary. */
export function firstSentence(text: string): string {
  const match = text.match(/^.*?[.!?](?=\s|$)/)
  return plain(match ? match[0] : text)
}
