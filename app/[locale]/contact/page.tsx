import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { CopyButton } from '@/components/contact/CopyButton'
import { GoogleReviews } from '@/components/contact/GoogleReviews'
import { MapEmbed } from '@/components/contact/MapEmbed'
import { PhoneIcon, PinIcon, WhatsAppIcon } from '@/components/icons'
import { InfoHero } from '@/components/page/InfoHero'
import { ReviewBand } from '@/components/service/ReviewBand'
import { Band, SectionHeading } from '@/components/service/blocks'
import { embedUrls, googleListing } from '@/lib/google-listing'
import { REVIEW_MODE } from '@/lib/review'
import { contactReviewSlots } from '@/lib/review-slots-pages'
import { REVIEW_PREVIEW, SELECTED_REVIEWS } from '@/lib/reviews'
import { contact, directionsUrl, fullAddress, whatsappUrl } from '@/lib/site-config'
import { localizedLocation, siteText } from '@/lib/site-i18n'
import type { Locale } from '@/i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pageMeta' })
  const text = siteText(locale as Locale)
  return {
    title: t('contactTitle'),
    description: t('contactDescription', {
      name: text.name,
      city: text.city,
      address: fullAddress(localizedLocation(locale as Locale)),
    }),
  }
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
export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  // Static rendering needs the locale set here too, not only in the layout. See the note in
  // app/[locale]/layout.tsx.
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('contactPage')
  const tCommon = await getTranslations('common')
  const tNav = await getTranslations('nav')
  const location = localizedLocation(locale as Locale)
  const text = siteText(locale as Locale)

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
        // The aside's numbers and the address card below already say all of this on a phone.
        actionsOnPhone={false}
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
          <div className="flex flex-col gap-3 sm:gap-4">
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
              className="press flex min-h-[68px] w-full items-center gap-3 rounded-full bg-brand-emergency py-2 pl-3 pr-5 text-white shadow-md transition-[filter,box-shadow] hover:brightness-95 hover:shadow-lg sm:min-h-[78px] sm:gap-4 sm:py-2.5 sm:pr-8"
            >
              <span
                aria-hidden="true"
                className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-white/20 sm:h-[52px] sm:w-[52px]"
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
              className="press flex min-h-[68px] w-full items-center gap-3 rounded-full bg-brand-copper py-2 pl-3 pr-5 text-white shadow-md transition-colors hover:bg-brand-copper-hover hover:shadow-lg sm:min-h-[78px] sm:gap-4 sm:py-2.5 sm:pr-8"
            >
              <span
                aria-hidden="true"
                className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-white/20 sm:h-[52px] sm:w-[52px]"
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

            {/*
              The same reception number on WhatsApp: the hospital's WhatsApp Business account is on
              it. The chat opens with a line already typed. WhatsApp's own green, with white on it
              at 3.1:1 (bold and large, like the copper pill above).
            */}
            <a
              href={whatsappUrl(tCommon('whatsappMessage'))}
              target="_blank"
              rel="noreferrer noopener"
              className="press flex min-h-[68px] w-full items-center gap-3 rounded-full bg-brand-whatsapp py-2 pl-3 pr-5 text-white shadow-md transition-colors hover:bg-brand-whatsapp-hover hover:shadow-lg sm:min-h-[78px] sm:gap-4 sm:py-2.5 sm:pr-8"
            >
              <span
                aria-hidden="true"
                className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-white/20 sm:h-[52px] sm:w-[52px]"
              >
                <WhatsAppIcon className="h-6 w-6" />
              </span>
              <span className="block">
                <span className="block text-xs font-bold uppercase tracking-[0.14em]">
                  {tCommon('whatsappLabel')}
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
            <div className="flex flex-col rounded-2xl border border-brand-teal/15 bg-white p-5 sm:p-9">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-brand-teal">
                <PinIcon className="h-5 w-5" />
                {t('addressLabel')}
              </p>
              <address className="mt-3 text-base not-italic leading-7 text-brand-dark-base/85 sm:mt-5 sm:text-lg sm:leading-8">
                <strong className="mb-1 block font-serif text-xl font-bold text-brand-dark-base sm:text-2xl">
                  {location.name}
                </strong>
                {/* One paragraph on a phone; the address as the hospital prints it, a line each, from sm up. */}
                <span className="block sm:hidden">{fullAddress(location)}</span>
                <span className="hidden sm:block">
                  {location.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <span className="block">
                    {location.city}, {location.state} {location.pincode}
                  </span>
                </span>
              </address>

              <div className="mt-auto grid grid-cols-2 gap-2.5 pt-5 sm:grid-cols-1 sm:gap-3 sm:pt-8">
                {directionsUrl && (
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="tap-target focus-ring-inverse col-span-2 min-h-[52px] w-full justify-center rounded-full bg-brand-teal px-6 text-base font-semibold text-white transition-colors hover:bg-brand-teal-dark sm:col-span-1"
                  >
                    {t('getDirections')}
                  </a>
                )}
                <a
                  href={googleListing.placeUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`${outlineLink} min-h-[52px] w-full justify-center px-3 text-center text-sm sm:px-5 sm:text-base`}
                >
                  {t('openInMaps')}
                </a>
                <CopyButton
                  text={fullAddress(location)}
                  label={t('copyAddress')}
                  copiedLabel={t('addressCopied')}
                  failedLabel={t('addressCopyFailed')}
                  className="min-h-[52px] w-full justify-center px-3 text-sm sm:px-5 sm:text-base"
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

      {/* Hours and visiting: one sentence and a link, not a section. */}
      <div className="mx-auto max-w-7xl px-5 pb-5 pt-7 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-brand-mist px-5 py-4">
          <p className="text-sm leading-relaxed text-brand-dark-base/80">{t('hoursNote')}</p>
          <Link href="/patient-care/visitors" className={`${outlineLink} bg-white`}>
            {tNav('visitorInformation')}
          </Link>
        </div>
      </div>

      {/*
        The grievance officer, as the hospital's own Business profile names them (name and the two
        published lines; no email address was supplied, so none is shown).
      */}
      <section
        aria-labelledby="grievance-heading"
        className="mx-auto max-w-7xl px-5 pb-12 sm:px-6"
      >
        <div className="flex flex-col gap-4 rounded-2xl border border-brand-teal/15 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="max-w-xl">
            <h2 id="grievance-heading" className="font-serif text-lg font-bold text-brand-dark-base">
              {t('grievanceHeading')}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-brand-dark-base/70">
              {t('grievanceBody')}
            </p>
            <p className="mt-3 text-base font-semibold text-brand-dark-base">{text.officerName}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={`tel:${contact.secondary}`}
              className={`${outlineLink} gap-2 tabular-nums`}
            >
              <PhoneIcon className="h-4 w-4" />
              {t('grievanceMobile')} {contact.secondaryDisplay}
            </a>
            <a
              href={`tel:${contact.primary}`}
              className={`${outlineLink} gap-2 tabular-nums`}
            >
              <PhoneIcon className="h-4 w-4" />
              {t('grievanceLandline')} {contact.primaryDisplay}
            </a>
          </div>
        </div>
      </section>

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
