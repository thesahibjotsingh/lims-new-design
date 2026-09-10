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

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { isActiveHref } from '@/lib/is-active'
import { CalendarIcon, GridIcon, HomeIcon, StethoscopeIcon } from '@/components/icons'

const TABS = [
  { label: 'Home', href: '/', Icon: HomeIcon },
  { label: 'Doctors', href: '/doctors', Icon: StethoscopeIcon },
  { label: 'Departments', href: '/specialities', Icon: GridIcon },
  { label: 'Book', href: '/appointments', Icon: CalendarIcon, accent: true },
] as const

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center pb-[env(safe-area-inset-bottom)] lg:hidden">
      <nav
        aria-label="Quick navigation"
        className="pointer-events-auto mx-4 mb-4 flex w-full max-w-md items-center justify-around rounded-full border border-white/40 bg-white/75 px-2 py-1.5 shadow-glass backdrop-blur-xl"
      >
        {TABS.map(({ label, href, Icon, ...rest }) => {
          const accent = 'accent' in rest && rest.accent
          const active = isActiveHref(pathname, href)

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={[
                'tap-target flex-col gap-0.5 rounded-2xl px-2 text-[10px] font-semibold transition-colors',
                accent
                  ? 'text-brand-copper'
                  : active
                    ? 'text-brand-teal'
                    : 'text-brand-dark-base/55',
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
              <span>{label}</span>
              {/*
                Active state is icon weight + colour + a dot, not colour alone.
                A colour-blind user gets the dot and the heavier stroke.
              */}
              {!accent && (
                <span
                  aria-hidden="true"
                  className={[
                    'h-1 w-1 rounded-full bg-brand-teal transition-opacity',
                    active ? 'opacity-100' : 'opacity-0',
                  ].join(' ')}
                />
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
