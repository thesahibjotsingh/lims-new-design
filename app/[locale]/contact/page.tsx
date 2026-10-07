import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { CopyButton } from '@/components/contact/CopyButton'
import { GoogleReviews } from '@/components/contact/GoogleReviews'
import { MapEmbed } from '@/components/contact/MapEmbed'
import { PhoneIcon, PinIcon } from '@/components/icons'
import { InfoHero } from '@/components/page/InfoHero'
import { ReviewBand } from '@/components/service/ReviewBand'
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
 * THE CONTACT PAGE, kept to about one screen.
 *
 * It used to be five full sections (who to call, where we are, hours, reviews, book again) and
 * ran long: the phone numbers sat below the fold on a laptop, the cards were twice as tall as
 * their content, the hours section held one sentence, and "request an appointment" appeared
 * four times. It is now:
 *
 *   hero    the two phone numbers as solid colour cards on its right, so the numbers are the
 *           first thing seen and the empty half of the hero is used;
 *   find    the address, directions and the map and Street View on request;
 *   a strip for hours and visitor information, which are one sentence and a link;
 *   reviews only once some are approved (lib/reviews.ts).
 *
 * THE COLOURS ARE NOT DECORATION. Red is the emergency number and nothing else (it is
 * reserved for that across the site, see tailwind.config). Copper is the site's colour for
 * "act now" (the header's appointment button), used here for the reception line, which is
 * where appointments are made. White text on the red passes AA; white on copper would not
 * (2.95:1), so the copper card carries dark text.
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
        asideWidth="26rem"
        alignAside="center"
        actions={
          <>
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
        aside={
          <div className="flex flex-col gap-4">
            {/*
              Two pills, built like the header's "Book an appointment" button: fully rounded,
              the same `bg-brand-copper` and white text, the same hover. The label and the
              number are both inside the pill, so a pill reads as one thing: what it is, then
              the number.

              White on the copper is 2.95:1, which is below the 4.5:1 small text needs, so the
              small label is set bold and tracked out to carry as well as it can, and the
              number is large. The header button has the same pairing. Red carries white at
              5.6:1. If the label ever needs to pass strictly, the fix is the darker
              `bg-brand-copper-hover` (3.7:1) or dark text on the copper (6.2:1), not a bigger
              label.
            */}
            <a
              href={`tel:${contact.primary}`}
              className="press flex min-h-[78px] w-full items-center gap-4 rounded-full bg-brand-emergency py-2.5 pl-3 pr-8 text-white shadow-md transition-[filter,box-shadow] hover:brightness-95 hover:shadow-lg"
            >
              <span
                aria-hidden="true"
                className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full bg-white/20"
              >
                <PhoneIcon className="h-6 w-6" />
              </span>
              <span className="block">
                <span className="block text-xs font-bold uppercase tracking-[0.14em]">
                  {t('emergencyLabel')}
                </span>
                <span className="block text-[1.375rem] font-bold leading-tight tabular-nums max-[359px]:text-lg min-[360px]:whitespace-nowrap min-[400px]:text-2xl sm:text-[1.75rem]">
                  {contact.primaryDisplay}
                </span>
              </span>
            </a>

            <a
              href={`tel:${contact.secondary}`}
              className="press flex min-h-[78px] w-full items-center gap-4 rounded-full bg-brand-copper py-2.5 pl-3 pr-8 text-white shadow-md transition-colors hover:bg-brand-copper-hover hover:shadow-lg"
            >
              <span
                aria-hidden="true"
                className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full bg-white/20"
              >
                <PhoneIcon className="h-6 w-6" />
              </span>
              <span className="block">
                <span className="block text-xs font-bold uppercase tracking-[0.14em]">
                  {t('appointmentsLabel')}
                </span>
                <span className="block text-[1.375rem] font-bold leading-tight tabular-nums max-[359px]:text-lg min-[360px]:whitespace-nowrap min-[400px]:text-2xl sm:text-[1.75rem]">
                  {contact.secondaryDisplay}
                </span>
              </span>
            </a>
          </div>
        }
      />

      {/*
        `id="locations"` is load-bearing: the "Locations & directions" links in the menu, the
        footer and the mobile quick actions all point at /contact#locations. The heading is
        screen-reader only because the address card is its own label.
      */}
      <section id="locations" aria-labelledby="locations-heading" className="scroll-mt-36">
        <div className="mx-auto max-w-7xl px-5 pt-9 sm:px-6">
          <h2 id="locations-heading" className="sr-only">
            {t('findHeading')}
          </h2>

          {/*
            The address card and the map card are the same height: the grid stretches both to
            the taller (the map), and the address card spreads its content to fill it, with
            the three actions pinned along the bottom edge. Stacked on a phone each is its
            natural height.
          */}
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[26rem_minmax(0,1fr)] lg:items-stretch">
            <div className="flex flex-col rounded-2xl border border-brand-teal/15 bg-white p-7 sm:p-9">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-brand-teal">
                <PinIcon className="h-5 w-5" />
                {t('addressLabel')}
              </p>
              <address className="mt-5 text-lg not-italic leading-8 text-brand-dark-base/85">
                <strong className="mb-1 block font-serif text-2xl font-bold text-brand-dark-base">
                  {primaryLocation.name}
                </strong>
                {primaryLocation.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <span className="block">
                  {primaryLocation.city}, {primaryLocation.state} {primaryLocation.pincode}
                </span>
              </address>

              <div className="mt-auto grid grid-cols-1 gap-3 pt-8">
                {directionsUrl && (
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="tap-target focus-ring-inverse min-h-[52px] w-full justify-center rounded-full bg-brand-teal px-6 text-base font-semibold text-white transition-colors hover:bg-brand-teal-dark"
                  >
                    {t('getDirections')}
                  </a>
                )}
                <a
                  href={googleListing.placeUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`${outlineLink} min-h-[52px] w-full justify-center text-base`}
                >
                  {t('openInMaps')}
                </a>
                <CopyButton
                  text={fullAddress()}
                  label={t('copyAddress')}
                  copiedLabel={t('addressCopied')}
                  failedLabel={t('addressCopyFailed')}
                  className="min-h-[52px] w-full justify-center text-base"
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
        </div>
      </section>

      {/* Hours and visiting: one honest sentence and a link, not a section. */}
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-7 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-brand-mist px-5 py-4">
          <p className="text-sm leading-relaxed text-brand-dark-base/80">{t('noHoursNote')}</p>
          <Link href="/patient-care/visitors" className={`${outlineLink} bg-white`}>
            {tNav('visitorInformation')}
          </Link>
        </div>
      </div>

      <ReviewBand
        id="review-contact-practical"
        group="practical"
        slots={slots}
        title="Needs LIMS input: getting here and practical details"
      />

      {/* ---- reviews: only once approved (live), or as a preview in review mode ------------ */}
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
    </>
  )
}
