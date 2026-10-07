// components/page/InfoHero.tsx
//
// The teal hero for the information pages (Contact, About). The same family as the consultant
// hero and the service hero: a breadcrumb, an eyebrow, the title, an intro, a row of actions
// and, on a wide screen, an aside card to the right. Built once so those pages read as one
// site, and so none of them invents its own idea of how high a hero is.
//
// It takes already-translated strings and already-built actions/aside, so it reads no
// message file and knows nothing about either page.

import type { CSSProperties, ReactNode } from 'react'
import { Link } from '@/i18n/navigation'

export function InfoHero({
  homeLabel,
  current,
  eyebrow,
  title,
  intro,
  actions,
  aside,
  asideWidth = '24rem',
  alignAside = 'end',
}: {
  homeLabel: string
  /** The breadcrumb's last item, usually the page name. */
  current: string
  eyebrow: string
  title: string
  intro: string
  /** A row of buttons under the intro. */
  actions?: ReactNode
  /** A card at the right on a wide screen, below the actions on a phone. */
  aside?: ReactNode
  /** Width of the aside column on a wide screen. Any CSS length. */
  asideWidth?: string
  /** Where the aside sits against the text: level with its bottom, or centred on it. */
  alignAside?: 'end' | 'center'
}) {
  return (
    <header className="bg-gradient-to-r from-brand-teal-dark to-brand-teal text-white">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-12">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-white/75">
            <li>
              <Link href="/" className="hover:text-white">
                {homeLabel}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-white">
              {current}
            </li>
          </ol>
        </nav>

        <div
          // The column width is a custom property so a caller can set any length without a
          // class per width (Tailwind cannot see a class built at run time).
          style={{ '--aside-w': asideWidth } as CSSProperties}
          className={`mt-6 grid grid-cols-1 gap-8 lg:gap-12 ${
            alignAside === 'center' ? 'lg:items-center' : 'lg:items-end'
          } ${aside ? 'lg:grid-cols-[minmax(0,1fr)_var(--aside-w)]' : ''}`}
        >
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
              {eyebrow}
            </p>
            <h1 className="mt-1 text-balance font-serif text-4xl font-bold tracking-tight lg:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/90">{intro}</p>
            {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {aside}
        </div>
      </div>
    </header>
  )
}
