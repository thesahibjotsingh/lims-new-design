import type { Metadata } from 'next'
import { AwaitingContent, PageHeader, Section } from '@/components/primitives/PageShell'

export const metadata: Metadata = {
  title: 'Health library',
  description: 'Patient health information from LIMS Hisar.',
}

/*
 * Empty on purpose, and this one matters most.
 *
 * A health library is medical information. Generated or paraphrased health content
 * carries real risk of being wrong in a way a reader acts on, and it must be written or
 * signed off by a clinician. The route exists so the nav resolves; nothing goes on it
 * until LIMS supplies reviewed copy.
 */
export default function HealthLibraryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Patient information"
        title="Health library"
        intro="Clinically reviewed articles on conditions, procedures and recovery."
      />
      <Section>
        <AwaitingContent what="Articles">
          Health information is published only once a LIMS clinician has written or
          reviewed it. Nothing is published here yet. For advice about your own health,
          please speak to a doctor rather than relying on a web page.
        </AwaitingContent>
      </Section>
    </>
  )
}
