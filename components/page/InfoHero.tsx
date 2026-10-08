// components/page/InfoHero.tsx
//
// The teal hero for the information pages (Contact, About). The same family as the consultant
// hero and the service hero: a breadcrumb, an eyebrow, the title, an intro, a row of actions
// and, on a wide screen, an aside card to the right. Built once so those pages read as one
// site, and so none of them invents its own idea of how high a hero is.
//
// It takes already-translated strings and already-built actions/aside, so it knows nothing
// about either page. The strings it supplies itself are the breadcrumb's accessible name and the
// "Read more" control.
//
// ON A PHONE (below sm) the breadcrumb becomes one back link, the intro is cut to three lines with
// Read more, and the spacing tightens, so the page's own content starts on the first screen. A
// page whose aside already says what the actions say (Contact) can leave the actions off a phone.

import type { CSSProperties, ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ChevronLeftIcon } from '@/components/icons'
import { ClampedText } from '@/components/service/ClampedText'

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
  actionsOnPhone = true,
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
  /** False where the aside already carries the same actions and a phone does not need both. */
  actionsOnPhone?: boolean
}) {
  const tA11y = useTranslations('a11y')
  const tDetail = useTranslations('serviceDetail')
  const tCommon = useTranslations('common')
  return (
    <header className="teal-hero teal-curve text-white">
      <div className="mx-auto max-w-7xl px-5 pb-5 pt-1 sm:px-6 sm:py-8 lg:py-12">
        <Link
          href="/"
          className="focus-ring-inverse -ml-1 inline-flex min-h-[44px] items-center gap-0.5 rounded-md pr-2 text-[13px] text-white/80 sm:hidden"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          {tCommon('home')}
        </Link>
        <nav aria-label={tA11y('breadcrumb')} className="hidden sm:block">
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
          className={`mt-1 grid grid-cols-1 gap-6 sm:mt-6 sm:gap-8 lg:gap-12 ${
            alignAside === 'center' ? 'lg:items-center' : 'lg:items-end'
          } ${aside ? 'lg:grid-cols-[minmax(0,1fr)_var(--aside-w)]' : ''}`}
        >
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75 sm:text-xs">
              {eyebrow}
            </p>
            <h1 className="mt-1 text-balance font-serif text-[2rem] font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-4 hidden max-w-2xl text-lg leading-relaxed text-white/90 sm:block">
              {intro}
            </p>
            <ClampedText
              className="mt-3 sm:hidden"
              readMore={tDetail('readMore')}
              readLess={tDetail('readLess')}
            >
              {intro}
            </ClampedText>
            {actions && (
              <div
                className={`mt-4 flex-wrap gap-2.5 sm:mt-6 sm:flex sm:gap-3 ${
                  actionsOnPhone ? 'flex' : 'hidden'
                }`}
              >
                {actions}
              </div>
            )}
          </div>
          {aside}
        </div>
      </div>
    </header>
  )
}
