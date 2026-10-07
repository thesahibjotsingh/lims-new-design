// components/doctor/ProfileBlocks.tsx
//
// Blocks specific to a consultant's profile. The generic ones (bands, headings, bullet
// lists, steppers, Q&A) live in components/service/blocks.tsx and are shared with the
// department pages.
//
// Each block takes already-formatted strings. Whether a block appears at all is decided by
// the page: a section renders only when LIMS supplied the data for it.

import { plain } from '@/lib/text'

/** Specialisation and expertise: one tile per area, like Medanta's expertise grid. */
export function TileGrid({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-2xl border border-brand-teal/10 bg-white p-5 text-base font-semibold leading-snug text-brand-dark-base shadow-sm"
        >
          {plain(item)}
        </li>
      ))}
    </ul>
  )
}

export interface TimelineEntry {
  /** The year, or period. Shown first so a scan down the page reads as a history. */
  when?: string
  title: string
  detail?: string
}

/** Years down the left, what happened on the right. For awards, training and posts held. */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="max-w-3xl space-y-6 border-l-2 border-brand-teal/20 pl-6">
      {entries.map((entry) => (
        <li
          key={`${entry.when ?? ''}-${entry.title}`}
          className="relative before:absolute before:-left-[1.9rem] before:top-[0.55rem] before:h-2.5 before:w-2.5 before:rounded-sm before:bg-brand-teal before:content-['']"
        >
          {entry.when && (
            <p className="text-sm font-semibold tabular-nums text-brand-copper-ink">{entry.when}</p>
          )}
          <p className="font-serif text-lg font-bold leading-snug text-brand-dark-base">
            {plain(entry.title)}
          </p>
          {entry.detail && (
            <p className="mt-0.5 text-base leading-relaxed text-brand-dark-base/70">
              {plain(entry.detail)}
            </p>
          )}
        </li>
      ))}
    </ol>
  )
}

export interface OpdRow {
  day: string
  time: string
  where: string
  note?: string
}

/** OPD days and timings, one row per session. Only ever built from supplied sessions. */
export function OpdList({ rows }: { rows: OpdRow[] }) {
  return (
    <ul className="grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
      {rows.map((row) => (
        <li
          key={`${row.day}-${row.time}`}
          className="rounded-2xl border border-brand-teal/10 bg-white p-4 shadow-sm"
        >
          <p className="font-serif text-lg font-bold text-brand-dark-base">{row.day}</p>
          <p className="mt-0.5 text-base font-semibold tabular-nums text-brand-teal">{row.time}</p>
          <p className="mt-1 text-sm text-brand-dark-base/70">
            {row.where}
            {row.note ? `. ${row.note}` : ''}
          </p>
        </li>
      ))}
    </ul>
  )
}
