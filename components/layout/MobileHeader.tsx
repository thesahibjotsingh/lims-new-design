// components/layout/MobileHeader.tsx
//
// A 65px compact header. That height is the budget, not a suggestion: on a 667pt
// viewport every point spent on chrome is a point taken from the hero, and the bottom
// navigation pill is already claiming space at the other end of the screen.
//
// Three things fit at this height and no more — the lockup, the emergency call, and
// the menu. Everything else lives in the drawer or the bottom pill.
//
// Server component. The beacon is a CSS animation and the drawer is its own client leaf.

import { BrandMark } from '@/components/layout/BrandMark'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { PhoneIcon } from '@/components/icons'
import { contact } from '@/lib/site-config'

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-[65px] items-center justify-between gap-2 border-b border-white/10 bg-brand-teal px-4 shadow-md lg:hidden">
      <BrandMark size="compact" tone="dark" />

      <div className="flex items-center gap-1">
        {/*
          The emergency beacon.

          The ring is aria-hidden decoration; the accessible name is on the link and
          says what the control does and which number it calls, because "Emergency" on
          its own does not tell a screen reader user whether this dials or navigates.
          Red is reserved for this control alone — a red used decoratively elsewhere is
          a red that stops meaning "emergency".
        */}
        <a
          href={`tel:${contact.primary}`}
          aria-label={`Call the emergency line, ${contact.primaryDisplay}`}
          className="tap-target focus-ring-inverse relative gap-2 rounded-full bg-brand-emergency px-3.5 text-xs font-bold text-white shadow-sm"
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span
              aria-hidden="true"
              className="absolute inline-flex h-full w-full animate-beacon rounded-full bg-white"
            />
            <span
              aria-hidden="true"
              className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white"
            />
          </span>
          <PhoneIcon className="h-3.5 w-3.5" aria-hidden="true" />
          Emergency
        </a>

        <MobileMenu />
      </div>
    </header>
  )
}
