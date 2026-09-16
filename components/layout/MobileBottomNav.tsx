'use client'

// components/layout/MobileBottomNav.tsx
//
// The frosted "liquid glass" pill. Four destinations, floated above the content in the
// thumb zone rather than pinned flush to the bottom edge — the bottom 12pt of a modern
// phone belongs to the home indicator, and a control there gets swiped instead of tapped.
//
// `pb-[env(safe-area-inset-bottom)]` on the wrapper is what keeps it clear of that
// indicator on a notched device. The layout reserves matching space at the foot of
// <main>, so the pill never covers the last paragraph of a page.

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { usePathname } from '@/i18n/navigation'
import { isActiveHref } from '@/lib/is-active'
import { CalendarIcon, GridIcon, HomeIcon, StethoscopeIcon } from '@/components/icons'
import { SearchSheet } from '@/components/layout/SearchSheet'

// `labelKey` into messages/*.json's `bottomNav` namespace, not the literal
// label — this array is module scope, outside the component, so it can't
// call the translation hook itself.
const TABS = [
  { labelKey: 'home', href: '/', Icon: HomeIcon },
  { labelKey: 'doctors', href: '/doctors', Icon: StethoscopeIcon },
  { labelKey: 'departments', href: '/specialities', Icon: GridIcon },
  { labelKey: 'book', href: '/appointments', Icon: CalendarIcon, accent: true },
] as const

export function MobileBottomNav() {
  const pathname = usePathname()
  const t = useTranslations('bottomNav')

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center gap-2.5 pb-[env(safe-area-inset-bottom)] lg:hidden">
      {/*
        Search floats as its OWN circle beside the pill, not a fifth slot inside it —
        see SearchSheet's own comment for why. Sized to match the pill's own height
        (h-12, the same 48px `.tap-target` floor everything else on this bar uses) so
        the two read as one family of controls despite being visually separate, the
        way Apple's own search-beside-tabs pattern keeps both at one height.

        The pill's own max-width comes down from max-w-md to max-w-[19rem] to leave
        room for the circle beside it without either one crowding a 375px phone.
      */}
      <nav
        aria-label="Quick navigation"
        className="pointer-events-auto mb-4 flex w-full max-w-[19rem] items-center justify-around rounded-full border border-white/40 bg-white/75 px-2 py-1.5 shadow-glass backdrop-blur-xl [@media(prefers-reduced-transparency:reduce)]:bg-white/95 [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none"
      >
        {TABS.map(({ labelKey, href, Icon, ...rest }) => {
          const accent = 'accent' in rest && rest.accent
          const active = isActiveHref(pathname, href)

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={[
                'tap-target flex-col gap-0.5 rounded-2xl px-2 text-[10px] font-semibold transition-colors',
                // Teal is the resting state now, copper marks where you are — the
                // same relationship Book's always-copper badge already set up, so
                // landing on a plain tab reads as "this is now the emphasised one"
                // rather than introducing a second, unrelated meaning for copper.
                accent || active ? 'text-brand-copper-ink' : 'text-brand-teal',
              ].join(' ')}
            >
              {accent ? (
                <span
                  aria-hidden="true"
                  className="grid h-6 w-6 place-items-center rounded-full bg-brand-copper text-white shadow-sm"
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
                </span>
              ) : (
                <Icon className="h-5 w-5" strokeWidth={active ? 2.25 : 1.75} />
              )}
              <span>{t(labelKey)}</span>
              {/*
                Active state is icon weight + colour + an underline, not colour
                alone. A colour-blind user gets the underline and the heavier
                stroke. Copper, not teal — it marks the same "selected" the label
                and icon just switched to, rather than adding a third colour.
              */}
              {!accent && (
                <span
                  aria-hidden="true"
                  className={[
                    'h-0.5 w-5 rounded-full bg-brand-copper transition-opacity',
                    active ? 'opacity-100' : 'opacity-0',
                  ].join(' ')}
                />
              )}
            </Link>
          )
        })}
      </nav>

      <div className="mb-4">
        <SearchSheet />
      </div>
    </div>
  )
}
