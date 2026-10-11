// components/page/VisitCard.tsx
//
// The "Visit us" card in the About hero: Street View of the building, the address, the two things
// a visitor does next (directions, copy the address) and a line saying who provides the picture.
//
// IT FITS THE EMPTY SPACE, IT DOES NOT MAKE THE HERO TALLER. On a wide screen the hero's text
// column is about 320px tall and the card is a little taller, so it carries `lg:-my-8`: it hangs
// 32px into the hero's own padding above and below, and the hero keeps the height it had. Keep the
// card under about 380px at lg, or the hero grows; the address is cut to two lines for that reason.
//
// STREET VIEW OPENS BY DEFAULT, like the Contact page (the hospital's decision of 2026-10-07, see
// components/contact/MapEmbed.tsx). The frame is `loading="lazy"`, so on a phone, where the card
// sits below the first screen, nothing is fetched from Google until the visitor scrolls near it.
// The note under the card says Google provides it and that it may set cookies. If the site gains a
// cookie-consent banner, this and MapEmbed are the two places to put behind it.
//
// The camera is wider than the Contact page's (lib/google-listing.ts, streetViewEmbedUrl): the
// frame is wide and short, and the default view would crop the top of the building and its sign.

import { CopyButton } from '@/components/contact/CopyButton'
import { ArrowUpRightIcon, RouteIcon } from '@/components/icons'

export function VisitCard({
  title,
  address,
  copyText,
  streetViewSrc,
  streetViewTitle,
  directionsHref,
  directionsLabel,
  mapsHref,
  mapsLabel,
  copyLabel,
  copiedLabel,
  failedLabel,
  note,
}: {
  title: string
  /** The address as shown: short enough for two lines, so the card stays under the height above. */
  address: string
  /** What "Copy address" puts on the clipboard: the whole postal address. */
  copyText: string
  streetViewSrc: string
  streetViewTitle: string
  directionsHref?: string
  directionsLabel: string
  mapsHref: string
  mapsLabel: string
  copyLabel: string
  copiedLabel: string
  failedLabel: string
  /** Who provides the picture, and the cookies. */
  note: string
}) {
  return (
    <section
      aria-label={title}
      className="w-full rounded-[20px] bg-white p-2.5 text-brand-dark-base shadow-glass lg:-my-8"
    >
      <div className="relative h-[190px] overflow-hidden rounded-[14px] bg-brand-ribbon lg:h-[196px]">
        <iframe
          src={streetViewSrc}
          title={streetViewTitle}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="px-1.5 pb-1 pt-3">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-serif text-xl font-bold tracking-tight">{title}</h2>
          <a
            href={mapsHref}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex min-h-[44px] items-center gap-1 text-[13px] font-semibold text-brand-teal hover:text-brand-teal-dark lg:-my-2"
          >
            {mapsLabel}
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        </div>
        <p className="line-clamp-2 text-[13px] leading-snug text-brand-dark-base/75">{address}</p>

        <div className="mt-3 flex gap-2.5">
          {directionsHref && (
            <a
              href={directionsHref}
              target="_blank"
              rel="noreferrer noopener"
              className="tap-target focus-ring-inverse flex-1 justify-center gap-2 rounded-full bg-brand-teal px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-teal-dark"
            >
              <RouteIcon className="h-[18px] w-[18px]" />
              {directionsLabel}
            </a>
          )}
          <CopyButton
            text={copyText}
            label={copyLabel}
            copiedLabel={copiedLabel}
            failedLabel={failedLabel}
            className="flex-1 justify-center px-4"
          />
        </div>

        <p className="mt-2 text-[11px] leading-snug text-brand-dark-base/60">{note}</p>
      </div>
    </section>
  )
}
