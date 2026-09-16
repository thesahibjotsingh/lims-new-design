import type { Metadata } from 'next'
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
export default function HealthPackagesPage() {
  return (
    <>
      <PageHeader
        banner="/banners/health-packages.webp"
        cinematic
        eyebrow="Patient services"
        title="Health check packages"
        intro="Preventive health checks bundled as fixed packages."
      />
      <Section>
        <AwaitingContent what="Packages and prices">
          LIMS has not yet supplied the package list or its pricing. Rather than publish
          indicative prices the hospital never quoted, this page waits for the real ones
          &mdash; please call to ask what is available.
        </AwaitingContent>

        {/*
          Not filler. A package is usually a bundle of individual tests, and those
          individual tests already have real, published pages — this is a genuine
          next step for someone who landed here, not a placeholder standing in for
          the packages themselves.
        */}
        <div className="scroll-reveal mt-10">
          <h2 className="font-serif text-xl font-bold text-brand-dark-base">
            The tests themselves are already bookable
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-dark-base/70">
            While the bundled package list is still coming, {diagnostics.length}{' '}
            individual diagnostics and imaging services are already published — book
            one directly, or call to ask what a package would cover.
          </p>
          <div className="mt-5">
            <ServiceGrid services={diagnostics} mobileLimit={3} />
          </div>
          <Link
            href={diagnosticsCategory.basePath}
            className="tap-target mt-4 inline-flex rounded-full border border-brand-teal/20 px-5 text-sm font-semibold text-brand-teal transition-colors hover:bg-brand-mist"
          >
            Browse all diagnostics &rarr;
          </Link>
        </div>
      </Section>
    </>
  )
}
