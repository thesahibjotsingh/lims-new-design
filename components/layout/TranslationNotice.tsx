'use client'

// components/layout/TranslationNotice.tsx
//
// The honesty banner for Hindi/Punjabi. Same reasoning as AwaitingContent
// elsewhere on the site: a machine translation presented as if reviewed is
// a false claim about the hospital's own content, so this says plainly that
// it hasn't been checked yet and gives the reader a way back to the
// language the clinical content is actually correct in.
//
// Dismissible for the session (sessionStorage, not localStorage) — a
// reminder that reappears on every single page of a visit stops being read
// and starts being noise, but it should come back on the next visit rather
// than being silenced forever from one tap.

import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { CloseIcon } from '@/components/icons'

const DISMISS_KEY = 'lims:translation-notice-dismissed'

export function TranslationNotice() {
  const locale = useLocale()
  const pathname = usePathname()
  const t = useTranslations('meta')
  const [dismissed, setDismissed] = useState(true)

  // Read after mount only: sessionStorage doesn't exist on the server, and
  // seeding this from it would make the first client render disagree with
  // the server-rendered HTML (a hydration mismatch), the same rule every
  // other on-device-storage read on this site already follows.
  useEffect(() => {
    if (locale === 'en') return
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === '1')
    } catch {
      setDismissed(false)
    }
  }, [locale])

  if (locale === 'en' || dismissed) return null

  return (
    <div
      role="note"
      className="bg-brand-copper/10 px-4 py-2.5 text-xs text-brand-dark-base sm:px-6"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3">
        <p className="flex-1 leading-relaxed">
          {t('translationNotice')}{' '}
          <Link href={pathname} locale="en" className="font-semibold underline underline-offset-2">
            {t('viewInEnglish')}
          </Link>
        </p>
        <button
          type="button"
          aria-label={t('dismiss')}
          onClick={() => {
            try {
              sessionStorage.setItem(DISMISS_KEY, '1')
            } catch {
              // No storage available — the banner just reappears on the next
              // page, which is a worse UX than a crash-free no-op, not a bug.
            }
            setDismissed(true)
          }}
          className="press shrink-0 rounded-full p-1 text-brand-dark-base/50 hover:text-brand-dark-base"
        >
          <CloseIcon className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
