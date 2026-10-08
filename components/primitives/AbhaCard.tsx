// components/primitives/AbhaCard.tsx
//
// A pointer to the government's ABHA ID sign-up (lib/site-config.ts, `abhaUrl`), asked for by the
// hospital's contact so that patients are encouraged to create one.
//
// It only POINTS. The ID is created on the National Health Authority's own site, in a new tab,
// and nothing about it passes through this one. The wording sticks to what that portal says about
// itself: a 14-digit health ID from the Government of India. It does not call the ID free or
// optional and does not say what LIMS does with it, because the portal's page says neither and
// LIMS has not said either.
//
// TWO SHAPES.
//   variant="card"  a card with a short explanation and a button, for pages (home, /appointments).
//   variant="row"   one tappable line, for inside the booking panel where room is short.
//
// No state and no browser-only code, so a server page can render it directly.

import { useTranslations } from 'next-intl'
import { ArrowUpRightIcon, ShieldIcon } from '@/components/icons'

export function AbhaCard({
  href,
  variant = 'card',
  headingAs: Heading = 'h3',
  className = '',
}: {
  href: string
  variant?: 'card' | 'row'
  /** The heading level that keeps the page's outline in order. */
  headingAs?: 'h2' | 'h3'
  className?: string
}) {
  const t = useTranslations('abha')

  const newTab = <span className="sr-only"> {t('opensNewTab')}</span>

  if (variant === 'row') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`press flex min-h-[48px] items-center gap-3 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold leading-snug text-brand-teal transition-colors hover:bg-brand-mist ${className}`}
      >
        <ShieldIcon className="h-5 w-5 shrink-0" />
        <span className="flex-1">{t('rowLabel')}</span>
        <ArrowUpRightIcon className="h-4 w-4 shrink-0" strokeWidth={2} />
        {newTab}
      </a>
    )
  }

  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border border-brand-teal/15 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6 ${className}`}
    >
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-mist text-brand-teal"
        >
          <ShieldIcon className="h-6 w-6" />
        </span>
        <div>
          <Heading className="font-serif text-lg font-bold leading-tight text-brand-dark-base">
            {t('heading')}
          </Heading>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-brand-dark-base/70">
            {t('body')}
          </p>
        </div>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="tap-target press focus-ring-inverse shrink-0 gap-2 rounded-full bg-brand-teal px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-teal-dark"
      >
        {t('button')}
        <ArrowUpRightIcon className="h-4 w-4" strokeWidth={2} />
        {newTab}
      </a>
    </div>
  )
}
