'use client'

// components/contact/MapEmbed.tsx
//
// The map and Street View, loaded on request.
//
// WHY ON REQUEST. A Google Maps iframe sets third-party cookies the moment it loads, before the
// visitor has agreed to anything, and it is heavy: it would be the slowest thing on the page
// for the sake of one visitor in twenty. So the page shows a placeholder card with two plain
// buttons, and the iframe is created only when one is pressed. Nothing connects to Google
// until then, and the card says so. (This is the same reasoning that kept the old Contact page
// to a link; this keeps the map and adds Street View without giving that up.)
//
// WHY STREET VIEW. The hospital sits on a main road beside a busy chowk, and "which building"
// is the question a visitor in a hurry actually has. Street View answers it, opening already
// turned to face the building (lib/google-listing.ts).
//
// ACCESSIBILITY. Both buttons are real buttons with `aria-pressed`, the iframe has a title,
// and "Close" returns to the placeholder and removes the iframe again, so a visitor who opened
// it by accident can take it back. The placeholder is not decoration: it carries the same
// directions link a visitor without a mouse would need.

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
    streetViewNote: string
  }
}) {
  const [mode, setMode] = useState<Mode>('none')

  const tab = (value: Exclude<Mode, 'none'>, label: string) => (
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
    <div className="overflow-hidden rounded-2xl border border-brand-teal/10 bg-white shadow-sm">
      <div className="flex flex-wrap items-center gap-2 border-b border-brand-teal/10 p-3 sm:p-4">
        <h3 className="mr-auto font-serif text-lg font-bold text-brand-dark-base">
          {labels.heading}
        </h3>
        {tab('map', labels.showMap)}
        {tab('street', labels.showStreetView)}
        {mode !== 'none' && (
          <button
            type="button"
            onClick={() => setMode('none')}
            className="tap-target rounded-full px-4 text-sm font-semibold text-brand-dark-base/70 hover:text-brand-dark-base"
          >
            {labels.close}
          </button>
        )}
      </div>

      <div className="relative aspect-[4/3] w-full bg-brand-mist sm:aspect-[16/10]">
        {mode === 'none' ? (
          // The placeholder. A faint street-grid pattern and a pin, so the card reads as a map
          // that has not been loaded yet rather than as an empty box.
          <div
            className="absolute inset-0 grid place-items-center p-6 text-center"
            style={{
              backgroundImage:
                'linear-gradient(rgba(14,116,129,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(14,116,129,0.07) 1px, transparent 1px)',
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
              <p className="mt-4 text-sm leading-relaxed text-brand-dark-base/70">
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

      {mode === 'street' && (
        <p className="border-t border-brand-teal/10 px-4 py-3 text-xs text-brand-dark-base/60">
          {labels.streetViewNote}
        </p>
      )}
    </div>
  )
}
