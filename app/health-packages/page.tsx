import type { Metadata } from 'next'
import { AwaitingContent, PageHeader, Section } from '@/components/primitives/PageShell'

export const metadata: Metadata = {
  title: 'Health check packages',
  description: 'Health check packages at LIMS Hisar.',
}

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
      </Section>
    </>
  )
}
