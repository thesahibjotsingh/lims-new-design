import type { Metadata } from 'next'
import { AwaitingContent, PageHeader, Section } from '@/components/primitives/PageShell'

export const metadata: Metadata = {
  title: 'Patient portal',
  // Not indexed: an unbuilt login page in search results is a phishing target and a
  // support call from every patient who finds it.
  robots: { index: false, follow: false },
}

export default function PortalPage() {
  return (
    <>
      <PageHeader
        eyebrow="Patient portal"
        title="Reports and records"
        intro="Access to diagnostic reports and visit records."
      />
      <Section>
        <AwaitingContent what="The portal is not live yet">
          Online access to reports is planned but not available. Reports are collected
          from the hospital or sent by the department that carried out the test.
        </AwaitingContent>
      </Section>
    </>
  )
}
