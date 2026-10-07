// lib/reviews.ts
//
// THE REVIEWS SHOWN ON THE SITE. Hand-picked, public Google reviews, quoted word for word.
//
// HOW THIS IS ALLOWED TO STAY HONEST. The hospital chose to show positive reviews only. That
// is a normal thing for a hospital site to do, and it stays honest on three conditions that
// the Contact page enforces and this file must keep:
//   1. They are labelled as SELECTED reviews, never as "what patients say" in general.
//   2. The true rating and review count (lib/google-listing.ts) are shown beside them.
//   3. Every one links to the full set on Google, where the rest can be read.
//
// RULES FOR AN ENTRY.
//   - The text is copied exactly, spelling and all. Never tidy, shorten or "improve" it: an
//     edited review is a quote the reviewer did not write. If it is too long, choose another.
//   - The author is shown as Google shows it. No photo is stored or shown: it is the
//     reviewer's personal data and nothing here needs it.
//   - Do not select a review that names a doctor. A patient praising a named doctor on a
//     hospital's own site is an advertisement for that doctor, which medical-council rules
//     restrict, and it can name someone who is not on the consultant list.
//   - Do not select one that describes a patient's condition or treatment in detail.
//   - `posted` is Google's own relative date ("10 months ago") as read on `readOn`, so it
//     goes stale. Re-read before launch; a six-year-old review shown as recent is misleading.
//
// A review a reviewer later deletes on Google would otherwise live on here for ever, so
// re-check this list whenever the rating is re-read.
//
// While the list is empty the whole section stays off the public site (it would be a bare
// star rating with no quotes, which is not what was asked for). In review mode a box says
// what is missing.

export interface SelectedReview {
  /** Anything unique; used as the React key. */
  id: string
  /** As Google shows it. */
  author: string
  /** Whole stars, 1 to 5. */
  rating: number
  /** The review, verbatim. */
  text: string
  /** Google's relative date when it was read. */
  posted: string
}

/** APPROVED for the live site. Empty until the hospital has agreed to a set (see above). */
export const SELECTED_REVIEWS: SelectedReview[] = []

/**
 * NOT APPROVED. Shown in review mode only, so the section can be judged on a real page while
 * the hospital decides what may go live. Never rendered in a production build. Exact text,
 * copied from the listing on 2026-10-07 (the first two from the page itself, the third from a
 * screenshot of it).
 */
export const REVIEW_PREVIEW: SelectedReview[] = [
  {
    id: 'preview-akshay-kantia',
    author: 'Akshay Kantia',
    rating: 5,
    text: "We had opted Dr. Meenakshi Bansal for my wife's pregnancy after a lot of research as well as recommendations. Glad, we did. Dr. Meenakshi really makes up for the name of the hospital as well as herself. Staff has also been very supportive, caring and disciplined. I would have given 10 stars if it were up to me.",
    posted: '10 months ago',
  },
  {
    id: 'preview-pardeep-sheoran',
    author: 'Pardeep Sheoran',
    rating: 5,
    text: 'Dr lalit mohan bansal is a good doctor\nBest hospital in hisar',
    posted: 'a year ago',
  },
  {
    id: 'preview-agarwal-movers',
    author: 'Agarwal Movers',
    rating: 5,
    text: 'Nice hospital in hisar . I visited in Oct 2020 very good workers',
    posted: '6 years ago',
  },
]

/**
 * Every review read from the listing on 2026-10-07, and what is wrong or right about each,
 * so the next person to open this file does not rediscover them. Review mode lists these for
 * whoever is choosing. Add more as the listing is read; move one into SELECTED_REVIEWS only
 * after the hospital has agreed to it.
 *
 * The pattern worth knowing: all eight good reviews read so far praise a named doctor, and
 * none of those doctors is on the consultant list (lib/doctors.ts). That is a roster gap to
 * raise with LIMS as much as a reviews question.
 */
export const REVIEW_CANDIDATES: { author: string; rating: number; posted: string; note: string }[] = [
  {
    author: 'Akshay Kantia',
    rating: 5,
    posted: '10 months ago',
    note: 'Praises the staff and names Dr. Meenakshi Bansal (not on the consultant list). Mentions a wife\'s pregnancy.',
  },
  {
    author: 'Ranu',
    rating: 5,
    posted: '10 months ago',
    note: 'Thanks Dr. Meenakshi Bansal and describes a pregnancy with complications. Names a doctor and a condition.',
  },
  {
    author: 'reena kaswan',
    rating: 5,
    posted: '3 years ago',
    note: 'Very long, names Dr. Minakshi Bansal (same doctor, different spelling) and describes a pregnancy at length.',
  },
  {
    author: 'Vikas Kumar',
    rating: 5,
    posted: '8 years ago',
    note: 'Names Dr. Minakshi Bansal and a member of staff. Eight years old, so from the Life Line Hospital days.',
  },
  {
    author: 'Pardeep Sheoran',
    rating: 5,
    posted: 'a year ago',
    note: 'Two short lines: names Dr. Lalit Mohan Bansal (not on the consultant list), then "Best hospital in hisar".',
  },
  {
    author: 'Anisha garg',
    rating: 5,
    posted: '3 years ago',
    note: 'Thanks "Meenakshi mam and her staff". Full of emoji and the text is cut off on Google, so it cannot be quoted in full.',
  },
  {
    author: 'garima chawla',
    rating: 5,
    posted: '6 years ago',
    note: 'Praises Dr. Anupam Nagpal for dental care (not on the consultant list).',
  },
  {
    author: 'Agarwal Movers',
    rating: 5,
    posted: '6 years ago',
    note: 'The only one with no doctor named: "Nice hospital in hisar ... very good workers". Six years old. Its photos show the Lifeline Institute of Medical Sciences patient-rights board, which ties the listing to this hospital.',
  },
]
