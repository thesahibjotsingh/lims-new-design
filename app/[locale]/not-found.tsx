import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { PageHeader, Section } from '@/components/primitives/PageShell'
import { contact } from '@/lib/site-config'
import { SERVICE_CATEGORIES } from '@/lib/services'
import { translatedCategoryBlurb, translatedCategoryTitle } from '@/lib/services-i18n'

/*
 * A 404 with somewhere to go — the locale-aware version of app/not-found.tsx.
 *
 * This is the 404 that actually fires for almost every real dead link: a
 * mistyped or stale URL under a valid locale segment (/doctors/old-slug,
 * /hi/services/old-slug). Root app/not-found.tsx only fires for a locale
 * segment next-intl can't resolve at all, which is why it can't share this
 * file — it has no locale in scope for the Link below to read.
 */
export default async function LocaleNotFound() {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations('notFound')
  const tNav = await getTranslations('nav')
  const tCommon = await getTranslations('common')
  return (
    <>
      <PageHeader eyebrow="404" title={t('title')} intro={t('intro')} />
      <Section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={category.basePath}
              className="flex min-h-[96px] flex-col justify-center rounded-2xl border border-brand-teal/10 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <span className="font-serif text-lg font-bold text-brand-dark-base">
                {translatedCategoryTitle(category.id, locale)}
              </span>
              <span className="mt-1 text-xs text-brand-dark-base/60">
                {translatedCategoryBlurb(category.id, locale)}
              </span>
            </Link>
          ))}
          <Link
            href="/doctors"
            className="flex min-h-[96px] flex-col justify-center rounded-2xl border border-brand-teal/10 bg-white p-5 transition-shadow hover:shadow-md"
          >
            <span className="font-serif text-lg font-bold text-brand-dark-base">
              {tNav('findADoctor')}
            </span>
            <span className="mt-1 text-xs text-brand-dark-base/60">{t('rosterLine')}</span>
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/"
            className="tap-target focus-ring-inverse rounded-full bg-brand-teal px-6 text-sm font-semibold text-white hover:bg-brand-teal-dark"
          >
            {t('backHome')}
          </Link>
          <a
            href={`tel:${contact.secondary}`}
            className="tap-target rounded-full border border-brand-teal/25 px-6 text-sm font-semibold text-brand-teal hover:bg-brand-mist"
          >
            {tCommon('call', { number: contact.secondaryDisplay })}
          </a>
        </div>
      </Section>
    </>
  )
}
