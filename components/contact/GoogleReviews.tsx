// components/contact/GoogleReviews.tsx
//
// Selected Google reviews, with the real rating beside them.
//
// THE THREE CONDITIONS this stays honest on (full reasoning in lib/reviews.ts):
//   1. The quotes are labelled as selected, in words a visitor reads, not in small print.
//   2. The true rating and count sit next to them, with the date they were read.
//   3. Every route out goes to the full set of reviews on Google.
// Take any one of those away and a hand-picked wall of praise stops being a fair summary of
// what patients say and starts being a misleading one.
//
// The quotes are rendered verbatim: line breaks are kept, nothing is trimmed, and the text is
// marked as English because that is what the reviewer wrote, whatever language the page is in.
// No reviewer photo is shown; only the name Google shows.

import { getLocale, getTranslations } from 'next-intl/server'
import { ArrowRightIcon } from '@/components/icons'
import { googleListing } from '@/lib/google-listing'
import type { SelectedReview } from '@/lib/reviews'

/** Five stars, filled to a fraction. The base row is grey; the top row is clipped to the rating. */
function Stars({ rating, className = '' }: { rating: number; className?: string }) {
  const width = `${Math.max(0, Math.min(5, rating)) * 20}%`
  return (
    <span
      role="img"
      aria-label={`${rating} / 5`}
      className={`relative inline-block whitespace-nowrap leading-none tracking-[0.12em] ${className}`}
    >
      <span aria-hidden="true" className="text-brand-dark-base/15">
        ★★★★★
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 overflow-hidden text-brand-copper"
        style={{ width }}
      >
        ★★★★★
      </span>
    </span>
  )
}

export async function GoogleReviews({
  reviews,
  preview = false,
}: {
  reviews: SelectedReview[]
  /** True when these are not approved: shown in review mode only, with a banner saying so. */
  preview?: boolean
}) {
  const t = await getTranslations('contactPage')
  const locale = await getLocale()
  const readOn = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(googleListing.readOn))

  return (
    <div>
      {preview && (
        <p className="mb-8 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50 p-4 text-sm text-amber-950">
          <strong>Preview, review mode only.</strong> These reviews have not been approved for the
          live site, so none of this section appears there. See the box below for what to decide.
        </p>
      )}

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14">
        <div className="lg:sticky lg:top-[200px] lg:self-start">
          <p className="font-serif text-6xl font-bold tabular-nums leading-none text-brand-dark-base">
            {googleListing.rating.toFixed(1)}
          </p>
          <Stars rating={googleListing.rating} className="mt-3 text-2xl" />
          <p className="mt-3 text-sm font-semibold text-brand-dark-base">
            {t('reviewsCount', { count: googleListing.reviewCount })}
          </p>
          <p className="mt-1 text-xs text-brand-dark-base/60">{t('reviewsAsOf', { date: readOn })}</p>

          {/* Condition 1 and 2 in plain words, beside the figure it qualifies. */}
          <p className="mt-5 text-sm leading-relaxed text-brand-dark-base/75">{t('reviewsHonesty')}</p>

          <a
            href={googleListing.placeUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="tap-target focus-ring-inverse mt-5 gap-2 rounded-full bg-brand-teal px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-teal-dark"
          >
            {t('reviewsReadAll', { count: googleListing.reviewCount })}
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {reviews.map((review) => (
            <li key={review.id} className="flex">
              <figure className="flex w-full flex-col rounded-2xl border border-brand-teal/10 bg-white p-6 shadow-sm">
                <Stars rating={review.rating} className="text-lg" />
                <blockquote
                  lang="en"
                  className="mt-3 flex-1 whitespace-pre-line text-base leading-relaxed text-brand-dark-base/85"
                >
                  {review.text}
                </blockquote>
                <figcaption className="mt-5 border-t border-brand-teal/10 pt-4 text-sm">
                  <span className="font-semibold text-brand-dark-base">{review.author}</span>
                  <span className="block text-xs text-brand-dark-base/55">
                    {t('reviewPosted', { when: review.posted })}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
