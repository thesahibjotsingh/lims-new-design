import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { CopyButton } from '@/components/contact/CopyButton'
import { GoogleReviews } from '@/components/contact/GoogleReviews'
import { MapEmbed } from '@/components/contact/MapEmbed'
import { ArrowRightIcon, CalendarIcon, PhoneIcon, PinIcon } from '@/components/icons'
import { InfoHero } from '@/components/page/InfoHero'
import { ReviewBand } from '@/components/service/ReviewBand'
import { SectionNav } from '@/components/service/SectionNav'
import { Band, SectionHeading } from '@/components/service/blocks'
import { embedUrls, googleListing } from '@/lib/google-listing'
import { REVIEW_MODE } from '@/lib/review'
import { contactReviewSlots } from '@/lib/review-slots-pages'
import { REVIEW_PREVIEW, SELECTED_REVIEWS } from '@/lib/reviews'
import { contact, directionsUrl, fullAddress, primaryLocation, siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Phone numbers, address and directions for ${siteConfig.name}, ${siteConfig.city}. ${fullAddress()}.`,
}

/*
 * THE CONTACT PAGE, in the order a worried visitor needs it:
 *   1. who to call (two numbers, plus the online request for people who would rather not),
 *   2. where we are (full address, directions, the map and Street View on request),
 *   3. hours (honest about what is not yet confirmed),
 *   4. what patients say (only once reviews are approved, see lib/reviews.ts),
 *   5. a last way to book.
 *
 * Nothing on it is a claim LIMS has not made. Hours, parking, an ambulance line and an email
 * address are absent until supplied; review mode lists each as a box to ask about.
 */
export default async function ContactPage() {
  const t = await getTranslations('contactPage')
  const tCommon = await getTranslations('common')
  const tNav = await getTranslations('nav')

  const slots = REVIEW_MODE ? contactReviewSlots() : []

  // Approved reviews show on the live site. While none are approved, review mode shows a
  // preview so the section can be judged; a production build shows nothing at all.
  const reviewsApproved = SELECTED_REVIEWS.length > 0
  const reviews = reviewsApproved ? SELECTED_REVIEWS : REVIEW_MODE ? REVIEW_PREVIEW : []
  const showReviews = reviews.length > 0

  const navItems = [
    { id: 'reach', label: t('nav.reach') },
    { id: 'find', label: t('nav.find') },
    { id: 'hours', label: t('nav.hours') },
    ...(showReviews ? [{ id: 'reviews', label: t('nav.reviews') }] : []),
    { id: 'book', label: t('nav.book') },
  ]

  const outlineLink =
    'tap-target rounded-full border border-brand-teal/25 px-5 text-sm font-semibold text-brand-teal transition-colors hover:bg-brand-mist'

  return (
    <>
      {REVIEW_MODE && slots.length > 0 && (
        <div className="border-b-2 border-dashed border-amber-400 bg-amber-100 text-amber-950">
          <div className="mx-auto max-w-7xl px-5 py-3 text-sm sm:px-6">
            <strong>Review mode.</strong> {slots.length} things on this page need LIMS input before
            it looks like the contact page of a large hospital.{' '}
            <a href="#review-contact-practical" className="font-semibold underline">
              Jump to the list
            </a>
            . None of this appears on the public site.
          </div>
        </div>
      )}

      <InfoHero
        homeLabel={tCommon('home')}
        current={tNav('contactUs')}
        eyebrow={t('eyebrow')}
        title={t('title')}
        intro={t('intro')}
        actions={
          <>
            <a
              href={`tel:${contact.primary}`}
              className="tap-target focus-ring-inverse gap-2 rounded-full bg-brand-emergency px-6 text-sm font-bold text-white transition-colors hover:bg-brand-emergency/90"
            >
              <PhoneIcon className="h-4 w-4" />
              {t('heroEmergency', { number: contact.primaryDisplay })}
            </a>
            {directionsUrl && (
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="tap-target rounded-full bg-white px-6 text-sm font-semibold text-brand-teal transition-colors hover:bg-brand-mist"
              >
                {t('getDirections')}
              </a>
            )}
            <Link
              href="/appointments"
              className="tap-target rounded-full border border-white/40 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {tCommon('requestAnAppointment')}
            </Link>
          </>
        }
      />
      <SectionNav items={navItems} label={t('navLabel')} />

      {/* ---- who to call ------------------------------------------------------------------- */}
      <Band id="reach" tone="white">
        <SectionHeading id="reach" lead={t('reachLead')}>
          {t('reachHeading')}
        </SectionHeading>

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <li>
            <a
              href={`tel:${contact.primary}`}
              className="press group flex h-full flex-col rounded-2xl border border-brand-emergency/20 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span
                aria-hidden="true"
                className="grid h-12 w-12 place-items-center rounded-full bg-brand-emergency/10 text-brand-emergency"
              >
                <PhoneIcon className="h-6 w-6" />
              </span>
              <span className="mt-5 text-xs font-semibold uppercase tracking-wider text-brand-emergency">
                {t('emergencyLabel')}
              </span>
              <span className="mt-1 text-2xl font-bold tabular-nums text-brand-dark-base">
                {contact.primaryDisplay}
              </span>
              <span className="mt-2 text-sm leading-relaxed text-brand-dark-base/70">
                {t('emergencyHint')}
              </span>
            </a>
          </li>
          <li>
            <a
              href={`tel:${contact.secondary}`}
              className="press group flex h-full flex-col rounded-2xl border border-brand-teal/15 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span
                aria-hidden="true"
                className="grid h-12 w-12 place-items-center rounded-full bg-brand-mist text-brand-teal"
              >
                <PhoneIcon className="h-6 w-6" />
              </span>
              <span className="mt-5 text-xs font-semibold uppercase tracking-wider text-brand-teal">
                {t('appointmentsLabel')}
              </span>
              <span className="mt-1 text-2xl font-bold tabular-nums text-brand-dark-base">
                {contact.secondaryDisplay}
              </span>
              <span className="mt-2 text-sm leading-relaxed text-brand-dark-base/70">
                {t('appointmentsHint')}
              </span>
            </a>
          </li>
          <li>
            <Link
              href="/appointments"
              className="press group flex h-full flex-col rounded-2xl border border-brand-teal/15 bg-brand-mist/70 p-6 transition-shadow hover:shadow-md"
            >
              <span
                aria-hidden="true"
                className="grid h-12 w-12 place-items-center rounded-full bg-white text-brand-teal"
              >
                <CalendarIcon className="h-6 w-6" />
              </span>
              <span className="mt-5 text-xs font-semibold uppercase tracking-wider text-brand-teal">
                {t('bookingHeading')}
              </span>
              <span className="mt-1 text-2xl font-bold text-brand-dark-base">
                {tCommon('requestAnAppointment')}
              </span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-brand-dark-base/70">
                {t('bookingBody')}
              </span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal">
                {tCommon('requestAnAppointment')}
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        </ul>
      </Band>

      {/* ---- where we are ------------------------------------------------------------------ */}
      <Band id="find" tone="mist">
        <SectionHeading id="find" lead={t('findLead')}>
          {t('findHeading')}
        </SectionHeading>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[22rem_minmax(0,1fr)] lg:items-start">
          <div className="rounded-2xl border border-brand-teal/10 bg-white p-6 shadow-sm">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-dark-base/50">
              <PinIcon className="h-4 w-4 text-brand-teal" />
              {t('addressLabel')}
            </p>
            <address className="mt-3 text-base not-italic leading-relaxed text-brand-dark-base/85">
              <strong className="block font-semibold text-brand-dark-base">{primaryLocation.name}</strong>
              {primaryLocation.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="block">
                {primaryLocation.city}, {primaryLocation.state} {primaryLocation.pincode}
              </span>
            </address>

            <div className="mt-5 flex flex-wrap gap-2">
              {directionsUrl && (
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="tap-target focus-ring-inverse rounded-full bg-brand-teal px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-teal-dark"
                >
                  {t('getDirections')}
                </a>
              )}
              <a
                href={googleListing.placeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={outlineLink}
              >
                {t('openInMaps')}
              </a>
              <CopyButton
                text={fullAddress()}
                label={t('copyAddress')}
                copiedLabel={t('addressCopied')}
                failedLabel={t('addressCopyFailed')}
              />
            </div>
          </div>

          <MapEmbed
            mapSrc={embedUrls.map}
            streetViewSrc={embedUrls.streetView}
            labels={{
              heading: t('mapHeading'),
              showMap: t('showMap'),
              showStreetView: t('showStreetView'),
              privacyNote: t('mapPrivacy'),
              close: t('closeMap'),
              mapTitle: t('mapTitle'),
              streetViewTitle: t('streetViewTitle'),
              streetViewNote: t('streetViewNote'),
            }}
          />
        </div>
      </Band>

      <ReviewBand
        id="review-contact-practical"
        group="practical"
        slots={slots}
        title="Needs LIMS input: getting here and practical details"
      />

      {/* ---- hours ------------------------------------------------------------------------- */}
      <Band id="hours" tone="white">
        <SectionHeading id="hours" lead={t('noHoursNote')}>
          {t('hoursHeading')}
        </SectionHeading>
        <div className="flex flex-wrap gap-3">
          <Link href="/patient-care/visitors" className={outlineLink}>
            {tNav('visitorInformation')}
          </Link>
          <a href={`tel:${contact.secondary}`} className={outlineLink}>
            {tCommon('call', { number: contact.secondaryDisplay })}
          </a>
        </div>
      </Band>

      {/* ---- reviews ----------------------------------------------------------------------- */}
      {showReviews && (
        <Band id="reviews" tone="mist">
          <SectionHeading id="reviews" lead={t('reviewsLead')}>
            {t('reviewsHeading')}
          </SectionHeading>
          <GoogleReviews reviews={reviews} preview={!reviewsApproved} />
        </Band>
      )}
      <ReviewBand
        id="review-contact-reviews"
        group="top"
        slots={slots}
        title="Needs LIMS input: which reviews to show"
      />

      {/* ---- last chance to book ----------------------------------------------------------- */}
      <Band id="book" tone={showReviews ? 'white' : 'mist'}>
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-r from-brand-teal-dark to-brand-teal p-8 text-white sm:p-10 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2
              id="book-heading"
              className="text-balance font-serif text-3xl font-bold tracking-tight"
            >
              {t('bookingHeading')}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/90">{t('bookingBody')}</p>
          </div>
          <Link
            href="/appointments"
            className="tap-target shrink-0 gap-2 rounded-full bg-white px-7 text-sm font-semibold text-brand-teal transition-colors hover:bg-brand-mist"
          >
            {tCommon('requestAnAppointment')}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </Band>
    </>
  )
}
