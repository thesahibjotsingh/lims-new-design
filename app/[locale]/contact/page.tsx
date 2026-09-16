import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHeader, Section } from '@/components/primitives/PageShell'
import { PhoneIcon, PinIcon } from '@/components/icons'
import { contact, primaryLocation, siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact details and location for ${siteConfig.name}, ${siteConfig.city}.`,
}

export default async function ContactPage() {
  const t = await getTranslations('contactPage')
  const tCommon = await getTranslations('common')
  return (
    <>
      <PageHeader
        banner="/banners/contact.webp"
        cinematic
        eyebrow={t('eyebrow')}
        title={t('title')}
        intro={t('intro')}
      />

      <Section>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="scroll-reveal space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-dark-base">
              {t('phoneHeading')}
            </h2>

            {/*
              Both numbers, both labelled with the role assumed in lib/site-config.ts.
              That assumption is flagged there and is the thing to confirm with LIMS
              before launch — the numbers themselves are verbatim from the official card.
            */}
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${contact.primary}`}
                  className="press flex min-h-[44px] items-center gap-3 rounded-2xl border border-brand-teal/10 bg-white p-4 hover:shadow-md"
                >
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-emergency/10 text-brand-emergency"
                  >
                    <PhoneIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-brand-dark-base/50">
                      {t('emergencyLabel')}
                    </span>
                    <span className="block text-lg font-semibold tabular-nums text-brand-dark-base">
                      {contact.primaryDisplay}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.secondary}`}
                  className="press flex min-h-[44px] items-center gap-3 rounded-2xl border border-brand-teal/10 bg-white p-4 hover:shadow-md"
                >
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-mist text-brand-teal"
                  >
                    <PhoneIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-brand-dark-base/50">
                      {t('appointmentsLabel')}
                    </span>
                    <span className="block text-lg font-semibold tabular-nums text-brand-dark-base">
                      {contact.secondaryDisplay}
                    </span>
                  </span>
                </a>
              </li>
            </ul>

            <p className="text-xs leading-relaxed text-brand-dark-base/55">
              {t('noHoursNote')}
            </p>
          </div>

          <div id="locations" className="scroll-reveal scroll-mt-32 space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-dark-base">
              {t('locationHeading')}
            </h2>
            <div className="rounded-2xl border border-brand-teal/10 bg-white p-6">
              <p className="flex items-start gap-3">
                <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
                <span className="text-base leading-relaxed text-brand-dark-base/80">
                  <strong className="block font-semibold text-brand-dark-base">
                    {primaryLocation.name}
                  </strong>
                  {primaryLocation.addressLines.join(', ')}
                  <br />
                  {primaryLocation.city}, {primaryLocation.state}
                </span>
              </p>
              {/*
                No embedded map. A Google Maps iframe sets third-party cookies on load,
                before the visitor has agreed to anything — a DPDP problem and a
                performance one. A link opens the same map on demand.
              */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${primaryLocation.name}, ${primaryLocation.addressLines.join(', ')}, ${primaryLocation.city}, ${primaryLocation.state}`,
                )}`}
                target="_blank"
                rel="noreferrer noopener"
                className="tap-target mt-4 rounded-full border border-brand-teal/25 px-5 text-xs font-semibold text-brand-teal hover:bg-brand-mist"
              >
                {t('openInMaps')}
              </a>
            </div>

            <div className="rounded-2xl border border-brand-teal/10 bg-brand-mist/60 p-6">
              <h3 className="font-serif text-lg font-bold text-brand-dark-base">
                {t('bookingHeading')}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-dark-base/70">
                {t('bookingBody')}
              </p>
              <Link
                href="/appointments"
                className="tap-target focus-ring-inverse mt-3 rounded-full bg-brand-teal px-6 text-sm font-semibold text-white hover:bg-brand-teal-dark"
              >
                {tCommon('requestAnAppointment')}
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
