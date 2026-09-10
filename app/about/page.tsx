import type { Metadata } from 'next'
import { AwaitingContent, PageHeader, Section } from '@/components/primitives/PageShell'
import { SERVICES, servicesByCategory } from '@/lib/services'
import { primaryLocation, siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'About LIMS',
  description: siteConfig.description,
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        banner="/banners/about.webp"
        eyebrow="About"
        title={siteConfig.name}
        intro={siteConfig.description}
      />

      <Section>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/*
              Everything on this page is either a count derived from the catalogue or a
              detail from the official LIMS card. No founding year, no bed count, no
              accreditation, no "state of the art" — those are claims the hospital makes,
              not claims a website makes on its behalf.
            */}
            <AwaitingContent what="The hospital's own account">
              A history, leadership, accreditation and facility details are published
              from information supplied by LIMS. Until the hospital provides them, this
              page states only what is on its published record.
            </AwaitingContent>

            <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat value={servicesByCategory('clinical').length} label="Clinical departments" />
              <Stat value={servicesByCategory('diagnostics').length} label="Diagnostics & imaging" />
              <Stat value={servicesByCategory('support').length} label="Support services" />
              <Stat value={SERVICES.length} label="Services in total" />
            </dl>
          </div>

          <aside className="rounded-2xl border border-brand-teal/10 bg-brand-mist/60 p-6">
            <h2 className="font-serif text-lg font-bold text-brand-dark-base">
              On the record
            </h2>
            <dl className="mt-3 space-y-3 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-brand-dark-base/50">
                  Address
                </dt>
                <dd className="mt-0.5 text-brand-dark-base/80">
                  {primaryLocation.addressLines.join(', ')}, {primaryLocation.city},{' '}
                  {primaryLocation.state}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-brand-dark-base/50">
                  Tagline
                </dt>
                <dd className="mt-0.5 text-brand-dark-base/80">
                  {siteConfig.tagline.join(' · ')}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </Section>
    </>
  )
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-2xl border border-brand-teal/10 bg-white p-4">
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="block font-serif text-3xl font-bold text-brand-teal">{value}</span>
        <span className="mt-1 block text-xs font-medium text-brand-dark-base/60">{label}</span>
      </dd>
    </div>
  )
}
