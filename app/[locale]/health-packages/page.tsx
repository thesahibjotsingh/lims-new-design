import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { AwaitingContent, PageHeader, Section } from '@/components/primitives/PageShell'
import { ServiceGrid } from '@/components/primitives/ServiceGrid'
import { getCategory, servicesByCategory } from '@/lib/services'

export const metadata: Metadata = {
  title: 'Health check packages',
  description: 'Health check packages at LIMS Hisar.',
}

const diagnostics = servicesByCategory('diagnostics')
const diagnosticsCategory = getCategory('diagnostics')

/*
 * Deliberately empty of content.
 *
 * A health package page is a price list, and an invented price on a hospital site is a
 * quote the hospital never gave. This route exists so the nav entry resolves; the
 * packages arrive when LIMS supplies them.
 */
export default async function HealthPackagesPage() {
  const t = await getTranslations('healthPackagesPage')
  return (
    <>
      <PageHeader
        banner="/banners/health-packages.webp"
        cinematic
        eyebrow={t('eyebrow')}
        title={t('title')}
        intro={t('intro')}
      />
      <Section>
        <AwaitingContent what={t('awaitingWhat')}>{t('awaitingBody')}</AwaitingContent>

        {/*
          Not filler. A package is usually a bundle of individual tests, and those
          individual tests already have real, published pages — this is a genuine
          next step for someone who landed here, not a placeholder standing in for
          the packages themselves.
        */}
        <div className="scroll-reveal mt-10">
          <h2 className="font-serif text-xl font-bold text-brand-dark-base">
            {t('bookableHeading')}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-dark-base/70">
            {t('bookableBody', { count: diagnostics.length })}
          </p>
          <div className="mt-5">
            <ServiceGrid services={diagnostics} mobileLimit={3} />
          </div>
          <Link
            href={diagnosticsCategory.basePath}
            className="tap-target mt-4 inline-flex rounded-full border border-brand-teal/20 px-5 text-sm font-semibold text-brand-teal transition-colors hover:bg-brand-mist"
          >
            {t('browseAllDiagnostics')}
          </Link>
        </div>
      </Section>
    </>
  )
}
