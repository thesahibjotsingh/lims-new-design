'use client'

// components/layout/LanguageSwitcher.tsx
//
// Three-way segmented control, English / Hindi / Punjabi. Switches the
// CURRENT page's language, not back to home — next-intl's Link resolves
// "this same pathname, other locale" on its own, so a doctor's profile page
// stays on that doctor's profile page across the switch.
//
// Two tones for the two grounds it actually sits on: `light` for the white
// desktop header and mobile drawer's own white search field area, `dark`
// for the drawer's teal gradient. Same split BrandMark already draws for
// the same reason — one set of colours reads on white, a different set on
// brand teal, and there is no third colour that reads on both.

import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

export function LanguageSwitcher({
  variant = 'light',
}: {
  variant?: 'light' | 'dark'
}) {
  const active = useLocale()
  const pathname = usePathname()
  const t = useTranslations('languageSwitcher')

  return (
    <div
      role="group"
      aria-label={t('label')}
      className={[
        'inline-flex gap-0.5 rounded-full p-1',
        variant === 'dark' ? 'bg-white/10' : 'bg-brand-mist',
      ].join(' ')}
    >
      {routing.locales.map((locale) => {
        const isActive = locale === active
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            aria-current={isActive ? 'true' : undefined}
            className={[
              'press min-h-[32px] min-w-[44px] rounded-full px-2.5 text-xs font-semibold transition-colors',
              isActive
                ? variant === 'dark'
                  ? 'bg-white text-brand-teal'
                  : 'bg-white text-brand-teal shadow-sm'
                : variant === 'dark'
                  ? 'text-white/75 hover:text-white'
                  : 'text-brand-dark-base/60 hover:text-brand-teal',
            ].join(' ')}
          >
            {t(locale)}
          </Link>
        )
      })}
    </div>
  )
}
