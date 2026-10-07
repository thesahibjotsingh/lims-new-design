import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { AwaitingContent, PageHeader, Section } from '@/components/primitives/PageShell'
import { DocumentIcon } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Patient portal',
  // Not indexed: an unbuilt login page in search results is a phishing target and a
  // support call from every patient who finds it.
  robots: { index: false, follow: false },
}

export default async function PortalPage({ params }: { params: Promise<{ locale: string }> }) {
  // Static rendering needs the locale set here too, not only in the layout. See the note in
  // app/[locale]/layout.tsx.
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      <PageHeader
        eyebrow="Patient portal"
        title="Reports and records"
        intro="Access to diagnostic reports and visit records."
      />
      <Section>
        <AwaitingContent
          what="The portal is not live yet"
          icon={<DocumentIcon className="h-6 w-6" />}
        >
          Online access to reports is planned but not available. Reports are collected
          from the hospital or sent by the department that carried out the test.
        </AwaitingContent>
      </Section>
    </>
  )
}
