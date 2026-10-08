import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { PageHeader, Section } from '@/components/primitives/PageShell'
import { ResultsSearchBox } from '@/components/search/ResultsSearchBox'
import { PhoneIcon } from '@/components/icons'
import { contact } from '@/lib/site-config'
import { SERVICE_CATEGORIES } from '@/lib/services'
import { translatedCategoryBlurb, translatedCategoryTitle } from '@/lib/services-i18n'

/*
 * The site's "page not found".
 *
 * Someone arriving here was looking for something specific (a department, a doctor, a phone
 * number), so the page does not apologise and stop. It lets them say what they wanted (the same
 * search as the rest of the site), shows the four places most people are headed, and keeps both
 * phone lines and the booking button one tap away. On a hospital site a dead end is where a
 * patient stops looking for care.
 *
 * Every address that matches no real page ends up here, in the visitor's own language, because
 * app/[locale]/[...rest]/page.tsx sends unknown addresses to notFound(). A dead link inside a
 * real section (/doctors/old-slug) arrives the same way.
 */
export default async function LocaleNotFound() {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations('notFound')
  const tNav = await getTranslations('nav')
  const tCommon = await getTranslations('common')

  const tile =
    'flex min-h-[96px] flex-col justify-center rounded-2xl border border-brand-teal/10 bg-white p-5 transition-shadow hover:shadow-md'

  return (
    <>
      <PageHeader eyebrow="404" title={t('title')} intro={t('intro')} />
      <Section>
        <h2 className="font-serif text-xl font-bold tracking-tight text-brand-dark-base">
          {t('searchHeading')}
        </h2>
        <p className="mb-4 mt-1 text-sm text-brand-dark-base/65">{t('searchHelp')}</p>
        <div className="max-w-xl">
          <ResultsSearchBox variant="plain" id="notfound-search" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_CATEGORIES.map((category) => (
            <Link key={category.id} href={category.basePath} className={tile}>
              <span className="font-serif text-lg font-bold text-brand-dark-base">
                {translatedCategoryTitle(category.id, locale)}
              </span>
              <span className="mt-1 text-xs text-brand-dark-base/60">
                {translatedCategoryBlurb(category.id, locale)}
              </span>
            </Link>
          ))}
          <Link href="/doctors" className={tile}>
            <span className="font-serif text-lg font-bold text-brand-dark-base">
              {tNav('findADoctor')}
            </span>
            <span className="mt-1 text-xs text-brand-dark-base/60">{t('rosterLine')}</span>
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            href="/"
            className="tap-target focus-ring-inverse rounded-full bg-brand-teal px-6 text-sm font-semibold text-white hover:bg-brand-teal-dark"
          >
            {t('backHome')}
          </Link>
          <Link
            href="/appointments"
            className="tap-target focus-ring-inverse rounded-full bg-brand-copper px-6 text-sm font-semibold text-white hover:bg-brand-copper-hover"
          >
            {tCommon('requestAnAppointment')}
          </Link>
          <a
            href={`tel:${contact.secondary}`}
            className="tap-target rounded-full border border-brand-teal/25 px-6 text-sm font-semibold text-brand-teal hover:bg-brand-mist"
          >
            {tCommon('call', { number: contact.secondaryDisplay })}
          </a>
        </div>

        <p className="mt-6 flex items-center gap-2 text-sm text-brand-dark-base/70">
          <PhoneIcon aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-emergency" />
          <a
            href={`tel:${contact.primary}`}
            className="font-semibold text-brand-emergency underline-offset-2 hover:underline"
          >
            {t('emergency', { number: contact.primaryDisplay })}
          </a>
        </p>
      </Section>
    </>
  )
}
