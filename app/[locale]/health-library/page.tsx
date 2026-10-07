import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { AwaitingContent, PageHeader, Section } from '@/components/primitives/PageShell'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pageMeta' })
  const tNav = await getTranslations({ locale, namespace: 'nav' })
  return { title: tNav('healthLibrary'), description: t('healthLibraryDescription') }
}

/*
 * Empty on purpose, and this one matters most.
 *
 * A health library is medical information. Generated or paraphrased health content
 * carries real risk of being wrong in a way a reader acts on, and it must be written or
 * signed off by a clinician. The route exists so the nav resolves; nothing goes on it
 * until LIMS supplies reviewed copy.
 */
export default async function HealthLibraryPage({ params }: { params: Promise<{ locale: string }> }) {
  // Static rendering needs the locale set here too, not only in the layout. See the note in
  // app/[locale]/layout.tsx.
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('healthLibraryPage')
  return (
    <>
      <PageHeader
        banner="/banners/health-library.webp"
        cinematic
        eyebrow={t('eyebrow')}
        title={t('title')}
        intro={t('intro')}
      />
      <Section>
        <AwaitingContent what={t('awaitingWhat')}>{t('awaitingBody')}</AwaitingContent>
      </Section>
    </>
  )
}
