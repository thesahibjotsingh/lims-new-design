'use client'

// components/contact/MapEmbed.tsx
//
// The map and Street View, with Street View open by default.
//
// WHY STREET VIEW FIRST. The hospital sits on a main road beside a busy chowk, and "which
// building" is the question a visitor in a hurry actually has. Street View answers it, opening
// already turned to face the building (lib/google-listing.ts), so it is what the page shows.
//
// THE PRIVACY TRADE-OFF, DECIDED ON PURPOSE. This used to load only when a visitor tapped for
// it, because a Google embed sets third-party cookies the moment it loads and is the heaviest
// thing on the page. The hospital chose (2026-10-07) to open Street View by default instead,
// for the sake of the first impression of the place. What keeps that honest:
//   - the iframe is `loading="lazy"`, so the browser fetches it only when it is near the
//     viewport, not while the page is still loading;
//   - the card says plainly, under the picture, that it is provided by Google and may set
//     cookies (the `streetViewNote` message);
//   - "Close" removes it again and leaves the placeholder, which explains the same thing.
// If the site later gains a cookie-consent banner, this is the component to put behind it:
// start `mode` at 'none' until consent is given.
//
// SIZE. The body has a floor of 420px on a phone and 520px from sm up, enough for the whole
// building and its sign to show (a shorter frame cropped the top of it), and it grows to fill
// the row when the address card beside it is taller. The card is `h-full` so the grid can make
// the two the same height.
//
// ACCESSIBILITY. Every control is a real button with `aria-pressed` where it toggles, the
// iframe has a title, and "Close" returns to the placeholder and removes the iframe.

import { useState } from 'react'
import { PinIcon } from '@/components/icons'

type Mode = 'none' | 'map' | 'street'

export function MapEmbed({
  mapSrc,
  streetViewSrc,
  labels,
}: {
  mapSrc: string
  streetViewSrc: string
  labels: {
    heading: string
    showMap: string
    showStreetView: string
    privacyNote: string
    close: string
    mapTitle: string
    streetViewTitle: string
    /** Shown under either view: who provides it, the cookies, and that it may be dated. */
    streetViewNote: string
  }
}) {
  const [mode, setMode] = useState<Mode>('street')

  const pill = (value: Exclude<Mode, 'none'>, label: string) => (
    <button
      type="button"
      aria-pressed={mode === value}
      onClick={() => setMode(value)}
      className={`tap-target rounded-full px-5 text-sm font-semibold transition-colors ${
        mode === value
          ? 'bg-brand-teal text-white'
          : 'border border-brand-teal/25 bg-white text-brand-teal hover:bg-brand-mist'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-brand-teal/10 bg-brand-mist">
      {mode !== 'none' && (
        <div className="flex flex-wrap items-center gap-2 border-b border-brand-teal/10 bg-white p-3">
          <h3 className="mr-auto pl-1 text-sm font-semibold text-brand-dark-base">
            {labels.heading}
          </h3>
          {pill('street', labels.showStreetView)}
          {pill('map', labels.showMap)}
          <button
            type="button"
            onClick={() => setMode('none')}
            className="tap-target rounded-full px-4 text-sm font-semibold text-brand-dark-base/70 hover:text-brand-dark-base"
          >
            {labels.close}
          </button>
        </div>
      )}

      <div className="relative min-h-[420px] w-full flex-1 sm:min-h-[520px]">
        {mode === 'none' ? (
          // The placeholder, shown after "Close". A faint street-grid pattern and a pin, so
          // the card reads as a map that has not been loaded rather than as an empty box.
          <div
            className="absolute inset-0 grid place-items-center p-6 text-center"
            style={{
              backgroundImage:
                'linear-gradient(rgba(15,91,102,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(15,91,102,0.07) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          >
            <div className="max-w-sm">
              <span
                aria-hidden="true"
                className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-brand-teal shadow-md"
              >
                <PinIcon className="h-7 w-7" />
              </span>
              <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setMode('street')}
                  className="tap-target focus-ring-inverse rounded-full bg-brand-teal px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-teal-dark"
                >
                  {labels.showStreetView}
                </button>
                <button
                  type="button"
                  onClick={() => setMode('map')}
                  className="tap-target rounded-full border border-brand-teal/25 bg-white px-6 text-sm font-semibold text-brand-teal transition-colors hover:bg-brand-mist"
                >
                  {labels.showMap}
                </button>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-brand-dark-base/65">
                {labels.privacyNote}
              </p>
            </div>
          </div>
        ) : (
          <iframe
            key={mode}
            src={mode === 'map' ? mapSrc : streetViewSrc}
            title={mode === 'map' ? labels.mapTitle : labels.streetViewTitle}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </div>

      {mode !== 'none' && (
        <p className="border-t border-brand-teal/10 bg-white px-4 py-3 text-xs leading-relaxed text-brand-dark-base/60">
          {labels.streetViewNote}
        </p>
      )}
    </div>
  )
}
