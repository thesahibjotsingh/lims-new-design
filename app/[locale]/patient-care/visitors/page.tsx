import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { AwaitingContent, PageHeader, Section } from '@/components/primitives/PageShell'
import { PhoneIcon, PinIcon } from '@/components/icons'
import { contact, fullAddress } from '@/lib/site-config'
import { localizedLocation } from '@/lib/site-i18n'
import type { Locale } from '@/i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pageMeta' })
  const tNav = await getTranslations({ locale, namespace: 'nav' })
  return { title: tNav('visitorInformation'), description: t('visitorsDescription') }
}

export default async function VisitorsPage({ params }: { params: Promise<{ locale: string }> }) {
  // Static rendering needs the locale set here too, not only in the layout. See the note in
  // app/[locale]/layout.tsx.
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('visitorsPage')
  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />
      <Section>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/*
              Visiting hours are the single most-searched fact on a hospital site and
              the easiest to get wrong. A guessed window sends a family across town to a
              locked ward, so nothing is stated until LIMS confirms it.
            */}
            <AwaitingContent what={t('awaitingWhat')}>{t('awaitingBody')}</AwaitingContent>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-brand-teal/10 bg-brand-mist/60 p-6">
              <h2 className="font-serif text-lg font-bold text-brand-dark-base">
                {t('whereToCome')}
              </h2>
              <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-brand-dark-base/75">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                <span>
                  {fullAddress(localizedLocation(locale as Locale))}
                </span>
              </p>
              <a
                href={`tel:${contact.secondary}`}
                className="tap-target focus-ring-inverse mt-3 gap-2 rounded-full bg-brand-teal px-5 text-xs font-semibold text-white hover:bg-brand-teal-dark"
              >
                <PhoneIcon className="h-4 w-4" />
                {contact.secondaryDisplay}
              </a>
              <Link
                href="/contact"
                className="tap-target mt-2 w-full rounded-full border border-brand-teal/25 px-5 text-xs font-semibold text-brand-teal hover:bg-white"
              >
                {t('directions')}
              </Link>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
