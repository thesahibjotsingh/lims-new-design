import type { Metadata } from 'next'
import Link from 'next/link'
import { AwaitingContent, PageHeader, Section } from '@/components/primitives/PageShell'
import { PhoneIcon } from '@/components/icons'
import { contact } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Insurance & billing',
  description: 'Insurance, cashless claims and billing at LIMS Hisar.',
}

/*
 * NOTE ON THE ROUTE: this static segment sits alongside app/patient-care/[slug]. Next
 * resolves static before dynamic, so /patient-care/insurance lands here and not on the
 * service page. No support service uses the slug "insurance", so nothing is shadowed.
 *
 * NO INSURER LIST HERE. Naming a TPA LIMS is not empanelled with sends a patient to
 * admission expecting a cashless claim that will be refused at the desk, which is a
 * bill they did not plan for. The list goes up when LIMS supplies it.
 */
export default function InsurancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Patient care"
        title="Insurance & billing"
        intro="Cashless claims, reimbursement and what to bring to the billing desk."
      />
      <Section>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AwaitingContent what="Empanelled insurers and TPAs">
              The list of insurers and third-party administrators LIMS accepts is not
              published here yet. Please confirm your cover with the hospital before
              admission &mdash; an insurer named on a website that turns out not to be
              empanelled becomes a bill at the desk.
            </AwaitingContent>
          </div>

          <aside className="rounded-2xl border border-brand-teal/10 bg-brand-mist/60 p-6">
            <h2 className="font-serif text-lg font-bold text-brand-dark-base">
              Ask the billing desk
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-dark-base/70">
              The hospital can confirm whether your policy is accepted and what a
              cashless claim needs.
            </p>
            <a
              href={`tel:${contact.secondary}`}
              className="tap-target focus-ring-inverse mt-3 gap-2 rounded-full bg-brand-teal px-5 text-xs font-semibold text-white hover:bg-brand-teal-dark"
            >
              <PhoneIcon className="h-4 w-4" />
              {contact.secondaryDisplay}
            </a>
            <Link
              href="/patient-care"
              className="tap-target mt-2 w-full rounded-full border border-brand-teal/25 px-5 text-xs font-semibold text-brand-teal hover:bg-white"
            >
              All patient services
            </Link>
          </aside>
        </div>
      </Section>
    </>
  )
}
