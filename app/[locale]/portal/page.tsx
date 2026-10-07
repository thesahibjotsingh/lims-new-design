import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { AwaitingContent, PageHeader, Section } from '@/components/primitives/PageShell'
import { DocumentIcon } from '@/components/icons'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const tNav = await getTranslations({ locale, namespace: 'nav' })
  return {
    title: tNav('patientPortal'),
    // Not indexed: an unbuilt login page in search results is a phishing target and a
    // support call from every patient who finds it.
    robots: { index: false, follow: false },
  }
}

export default async function PortalPage({ params }: { params: Promise<{ locale: string }> }) {
  // Static rendering needs the locale set here too, not only in the layout. See the note in
  // app/[locale]/layout.tsx.
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('portalPage')
  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />
      <Section>
        <AwaitingContent what={t('awaitingWhat')} icon={<DocumentIcon className="h-6 w-6" />}>
          {t('awaitingBody')}
        </AwaitingContent>
      </Section>
    </>
  )
}
