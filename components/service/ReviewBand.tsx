// components/service/ReviewBand.tsx
//
// REVIEW MODE ONLY. Renders nothing in a production build (lib/review.ts), so none of the
// text below can reach a public visitor.
//
// A band of dashed boxes, one per section a hospital page usually has but only LIMS can
// confirm. Each says what the section is, shows the SHAPE of its content as an example,
// and lists the questions to ask LIMS staff. The example is a prompt for the conversation,
// not copy to publish.
//
// Deliberately styled unlike the real site (amber, dashed): it must be impossible to
// mistake a review box for finished content in a screenshot or a demo.

import { REVIEW_MODE } from '@/lib/review'
import type { ReviewSlot, SlotGroup } from '@/lib/review-slots'

export const GROUP_TITLE: Record<SlotGroup, string> = {
  top: 'Needs LIMS input: at a glance',
  middle: 'Needs LIMS input: what is actually done here',
  practical: 'Needs LIMS input: practical details for patients',
  trust: 'Needs LIMS input: trust and credentials',
}

function Example({ slot }: { slot: ReviewSlot }) {
  if (slot.example.length === 0) return null

  if (slot.kind === 'tiles') {
    return (
      <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {slot.example.map((line, index) => (
          <li
            key={line}
            className="rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-3 text-sm leading-snug"
          >
            <span className="font-bold text-amber-800">{index + 1}. </span>
            {line}
          </li>
        ))}
      </ul>
    )
  }

  if (slot.kind === 'checklist') {
    return (
      <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
        {slot.example.map((line) => (
          <li key={line} className="flex items-start gap-2 text-sm leading-snug">
            <span
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-2 border-amber-600 bg-white"
            />
            {line}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-snug">
      {slot.example.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  )
}

export function ReviewBand({
  id,
  group,
  slots,
  title,
}: {
  id: string
  group: SlotGroup
  slots: ReviewSlot[]
  /** Overrides the default heading for the group, e.g. for a consultant's own page. */
  title?: string
}) {
  if (!REVIEW_MODE) return null
  const mine = slots.filter((slot) => slot.group === group)
  if (mine.length === 0) return null
  const heading = title ?? GROUP_TITLE[group]

  return (
    <section
      id={id}
      aria-label={heading}
      className="scroll-mt-40 border-y-2 border-dashed border-amber-400 bg-amber-50 text-amber-950 lg:scroll-mt-[190px]"
    >
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
        <h2 className="font-serif text-2xl font-bold">{heading}</h2>
        <p className="mt-1 text-sm text-amber-900">
          Review mode only. Not shown on the public site. For each box: is it real, is it
          different, or should it be deleted?
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {mine.map((slot) => (
            <article
              key={slot.id}
              className="rounded-2xl border-2 border-dashed border-amber-400 bg-white p-5"
            >
              <h3 className="font-serif text-lg font-bold">{slot.title}</h3>
              <p className="mt-1 text-sm text-amber-900">{slot.what}</p>

              {slot.example.length > 0 && (
                <>
                  <p className="mt-4 text-xs font-bold uppercase tracking-wide text-amber-800">
                    {slot.kind === 'checklist'
                      ? 'General treatments listed on this page'
                      : 'Example of the shape, not confirmed'}
                  </p>
                  <Example slot={slot} />
                </>
              )}

              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-amber-800">
                Ask LIMS
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-snug">
                {slot.ask.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
