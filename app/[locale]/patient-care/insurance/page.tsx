import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
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
export default async function InsurancePage() {
  const t = await getTranslations('insurancePage')
  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />
      <Section>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AwaitingContent what={t('awaitingWhat')}>{t('awaitingBody')}</AwaitingContent>
          </div>

          <aside className="rounded-2xl border border-brand-teal/10 bg-brand-mist/60 p-6">
            <h2 className="font-serif text-lg font-bold text-brand-dark-base">
              {t('askBillingHeading')}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-dark-base/70">
              {t('askBillingBody')}
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
              {t('allPatientServices')}
            </Link>
          </aside>
        </div>
      </Section>
    </>
  )
}
