'use client'

// components/search/HelpfulBar.tsx
//
// "Was this helpful?" with Yes and No, under the Quick guide. One tap, anonymous (see reportFeedback.ts). A No
// says sorry and gives the phone number, because the next thing a visitor needs is a person, not another box.

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { reportFeedback } from '@/components/search/reportFeedback'
import { contact } from '@/lib/site-config'

export function HelpfulBar({ query, locale }: { query: string; locale: string }) {
  const t = useTranslations('searchPage')
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null)

  // A new search asks again.
  useEffect(() => {
    setAnswer(null)
  }, [query])

  const choose = (helpful: boolean) => {
    reportFeedback(query, locale, helpful)
    setAnswer(helpful ? 'yes' : 'no')
  }

  if (answer === 'yes') {
    return (
      <p role="status" className="mt-3 text-sm text-brand-dark-base/70">
        {t('helpfulThanks')}
      </p>
    )
  }
  if (answer === 'no') {
    return (
      <p role="status" className="mt-3 text-sm text-brand-dark-base/80">
        {t('helpfulNoHelp', { number: contact.secondaryDisplay })}
      </p>
    )
  }
  const button =
    'tap-target rounded-full border border-brand-teal/25 bg-white px-4 text-sm font-semibold text-brand-teal-dark transition-colors hover:bg-brand-mist active:bg-brand-mist'
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className="text-sm text-brand-dark-base/70">{t('helpfulQuestion')}</span>
      <button type="button" onClick={() => choose(true)} className={button}>
        {t('helpfulYes')}
      </button>
      <button type="button" onClick={() => choose(false)} className={button}>
        {t('helpfulNo')}
      </button>
    </div>
  )
}
