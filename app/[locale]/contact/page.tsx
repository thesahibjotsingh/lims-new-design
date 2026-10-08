import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ContactNumbers } from '@/components/contact/ContactNumbers'
import { CopyButton } from '@/components/contact/CopyButton'
import { GoogleReviews } from '@/components/contact/GoogleReviews'
import { MapEmbed } from '@/components/contact/MapEmbed'
import { ArrowRightIcon, CalendarIcon, PinIcon } from '@/components/icons'
import { InfoHero } from '@/components/page/InfoHero'
import { ReviewBand } from '@/components/service/ReviewBand'
import { Band, SectionHeading } from '@/components/service/blocks'
import { embedUrls, googleListing } from '@/lib/google-listing'
import { REVIEW_MODE } from '@/lib/review'
import { contactReviewSlots } from '@/lib/review-slots-pages'
import { REVIEW_PREVIEW, SELECTED_REVIEWS } from '@/lib/reviews'
import { directionsUrl, fullAddress } from '@/lib/site-config'
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
 * THE CONTACT PAGE, in the order the hospital asked for:
 *
 *   1. Contact us              the hero, with the three numbers as one quiet card (ContactNumbers)
 *   2. Locations & directions  the address, directions, and the map / Street View (#locations)
 *   3. Book an appointment     a short card whose one button opens the booking form (#book)
 *   4. Visitor information     hours, and the way to the visitors page (#visit)
 *   then reviews, only once some are approved (lib/reviews.ts).
 *
 * The numbers used to be three full-width coloured pills (red, copper, green). They were the
 * loudest thing on the page and made it look like a row of ads, so they are one white card now.
 * Red is still the emergency number and nothing else (reserved site-wide, see tailwind.config).
 *
 * Nothing on it is a claim LIMS has not made. Parking, an ambulance line and an email address
 * are absent until supplied; review mode lists each as a box to ask about.
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
        // One quiet card of three rows rather than three coloured pills. See ContactNumbers.
        aside={<ContactNumbers />}
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

      {/*
        BOOK AN APPOINTMENT. A short card with one button, not the form: the form opens from the
        button (the same booking sheet every other "Request an appointment" opens), so it exists
        in one place. Copper because copper is the site's "act now" colour.
      */}
      <section id="book" aria-labelledby="book-heading" className="scroll-mt-36">
        <div className="mx-auto max-w-7xl px-5 pt-7 sm:px-6">
          <div className="flex flex-col gap-5 rounded-2xl bg-brand-mist p-5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-copper text-white"
              >
                <CalendarIcon className="h-6 w-6" />
              </span>
              <div>
                <h2
                  id="book-heading"
                  className="font-serif text-xl font-bold text-brand-dark-base sm:text-2xl"
                >
                  {tNav('bookAppointment')}
                </h2>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-brand-dark-base/75 sm:text-base">
                  {t('bookBody')}
                </p>
              </div>
            </div>
            <Link
              href="/appointments"
              className="tap-target focus-ring-inverse min-h-[52px] shrink-0 justify-center rounded-full bg-brand-copper px-7 text-base font-semibold text-white transition-colors hover:bg-brand-copper-hover"
            >
              {tCommon('requestAnAppointment')}
            </Link>
          </div>
        </div>
      </section>

      {/* VISITOR INFORMATION: the whole card is the link to the visitors page. */}
      <section id="visit" aria-labelledby="visit-heading" className="scroll-mt-36">
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-7 sm:px-6">
          <Link
            href="/patient-care/visitors"
            className="press group flex items-center justify-between gap-4 rounded-2xl border border-brand-teal/15 bg-white p-5 transition-colors hover:border-brand-teal/30 hover:bg-brand-mist sm:p-8"
          >
            <span className="block">
              <h2
                id="visit-heading"
                className="font-serif text-xl font-bold text-brand-dark-base group-hover:text-brand-teal sm:text-2xl"
              >
                {tNav('visitorInformation')}
              </h2>
              <span className="mt-1 block max-w-2xl text-sm leading-relaxed text-brand-dark-base/75 sm:text-base">
                {t('hoursNote')}
              </span>
            </span>
            <ArrowRightIcon
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-brand-copper transition-transform group-hover:translate-x-0.5"
            />
          </Link>
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
