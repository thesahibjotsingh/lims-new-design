// components/layout/BrandMark.tsx
//
// The LIMS lockup. One component so the mark, the name and the tagline can never
// disagree between the desktop header, the mobile header and the footer.

import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

export function BrandMark({
  size = 'default',
  tone = 'light',
}: {
  size?: 'default' | 'compact'
  /** `light` = dark ink on a white ground. `dark` = white ink on teal. */
  tone?: 'light' | 'dark'
}) {
  const compact = size === 'compact'
  const onDark = tone === 'dark'

  return (
    <Link
      href="/"
      className="group flex items-center gap-3 rounded-lg py-1 pr-2"
      aria-label={`${siteConfig.name}, ${siteConfig.city} — home`}
    >
      <span
        aria-hidden="true"
        className={[
          'grid place-items-center rounded-full font-serif font-bold shadow-inner transition-transform group-hover:scale-105',
          compact ? 'h-9 w-9 text-base' : 'h-11 w-11 text-xl',
          onDark
            ? 'bg-white/15 text-white ring-1 ring-white/25'
            : 'bg-brand-teal text-white ring-1 ring-brand-teal-dark/20',
        ].join(' ')}
      >
        ✚
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={[
            'font-serif font-bold tracking-tight',
            compact ? 'text-lg' : 'text-2xl',
            onDark ? 'text-white' : 'text-brand-dark-base',
          ].join(' ')}
        >
          {siteConfig.shortName}
          {compact ? ` ${siteConfig.city}` : ''}
        </span>
        <span
          className={[
            'mt-1 text-[10px] font-semibold uppercase tracking-[0.14em]',
            onDark ? 'text-white/70' : 'text-brand-copper',
          ].join(' ')}
        >
          {siteConfig.tagline.join(' · ')}
        </span>
      </span>
    </Link>
  )
}
