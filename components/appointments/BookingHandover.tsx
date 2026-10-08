// components/appointments/BookingHandover.tsx
//
// What "Book an appointment" shows while this site cannot book into the hospital's own software.
//
// The hospital runs an online appointment page (lib/site-config.ts, `onlineBookingUrl`). It cannot
// be pre-filled from a link and is not embedded, so the honest version of "book from our site" is
// a handover: a button that opens that page in a new tab, and the phone and WhatsApp for anyone
// who cannot find their doctor there. Nothing a patient types on this site goes anywhere, so
// there is no form here to fail silently.
//
// TWO PLACES IT LIVES, ONE COMPONENT.
//   variant="overlay"  inside the floating panel BookingProvider opens from any booking link. It
//                      brings its own title bar and close button.
//   variant="page"     the /appointments page, for shared links and when the overlay's script has
//                      not run. A plain card; the page supplies the heading.
//
// It carries no state and no browser-only code, so the server page can render it directly.

import { useTranslations } from 'next-intl'
import { ArrowUpRightIcon, CloseIcon, WhatsAppIcon } from '@/components/icons'
import { AbhaCard } from '@/components/primitives/AbhaCard'

interface Option {
  value: string
  label: string
}

/**
 * The doctor or department the visitor came from ("Book with Dr X" links carry ?doctor= and
 * ?department=), as a label in their language. The hospital's page cannot be pre-filled, so this
 * is only a reminder of what to choose there. An unknown id gives nothing.
 */
export function findChoice(
  doctorOptions: Option[],
  serviceGroups: { options: Option[] }[],
  doctorId: string,
  departmentSlug: string,
): string {
  const doctor = doctorOptions.find((option) => option.value === doctorId)
  if (doctor) return doctor.label
  for (const group of serviceGroups) {
    const service = group.options.find((option) => option.value === departmentSlug)
    if (service) return service.label
  }
  return ''
}

export function BookingHandover({
  bookingUrl,
  abhaUrl,
  choice = '',
  phone,
  phoneDisplay,
  whatsappHref,
  emergencyPhone,
  emergencyPhoneDisplay,
  variant = 'page',
  onClose,
}: {
  bookingUrl: string
  /** Overlay only: the ABHA ID sign-up, as one compact line. The page shows the full card itself. */
  abhaUrl?: string
  /** See findChoice. */
  choice?: string
  phone: string
  phoneDisplay: string
  whatsappHref: string
  /** Overlay only: the "do not book online in an emergency" line. The page has its own card. */
  emergencyPhone?: string
  emergencyPhoneDisplay?: string
  variant?: 'page' | 'overlay'
  /** Overlay only: asks BookingProvider to close the panel. */
  onClose?: () => void
}) {
  const t = useTranslations('appointmentsPage')
  const tCommon = useTranslations('common')
  const overlay = variant === 'overlay'

  const body = (
    <div className="space-y-5">
      {choice && (
        <p className="rounded-2xl bg-white px-4 py-3 text-sm font-medium leading-snug text-brand-dark-base/80">
          {t('handoverChosen', { choice })}
        </p>
      )}

      <div>
        {/* A real link in a new tab. noopener so their page cannot reach back into this one. */}
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="tap-target press focus-ring-inverse w-full gap-2 rounded-full bg-brand-copper px-7 text-sm font-semibold text-white shadow-[0_8px_18px_-8px_rgba(194,110,78,0.75)] transition-colors hover:bg-brand-copper-hover"
        >
          {t('handoverButton')}
          <ArrowUpRightIcon className="h-4 w-4" strokeWidth={2} />
        </a>
        <p className="mt-2 text-center text-xs leading-snug text-brand-dark-base/60">
          {t('handoverOpens')}
        </p>
      </div>

      <div className="border-t border-brand-teal/10 pt-4">
        <p className="text-sm font-semibold leading-snug text-brand-dark-base">
          {t('handoverCantFind')}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href={`tel:${phone}`}
            className="tap-target focus-ring-inverse rounded-full bg-brand-teal px-6 text-sm font-semibold text-white hover:bg-brand-teal-dark"
          >
            {tCommon('call', { number: phoneDisplay })}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer noopener"
            className="tap-target focus-ring-inverse gap-2 rounded-full bg-brand-whatsapp px-5 text-sm font-semibold text-white hover:bg-brand-whatsapp-hover"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            {tCommon('whatsapp')}
          </a>
        </div>
      </div>

      {overlay && abhaUrl && <AbhaCard variant="row" href={abhaUrl} />}

      {overlay && emergencyPhone && (
        <a
          href={`tel:${emergencyPhone}`}
          className="block rounded-2xl bg-brand-emergency/5 p-4 text-sm font-semibold leading-snug text-brand-emergency"
        >
          {t('handoverEmergency', { number: emergencyPhoneDisplay ?? emergencyPhone })}
        </a>
      )}
    </div>
  )

  if (!overlay) {
    return <div className="max-w-xl rounded-3xl bg-brand-mist p-4 sm:p-6">{body}</div>
  }

  return (
    <div className="flex max-h-full min-h-0 flex-col">
      <header className="shrink-0 border-b border-brand-teal/10 bg-white/80 backdrop-blur-xl [@media(prefers-reduced-transparency:reduce)]:bg-white [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none">
        <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
          <h2
            id="booking-title"
            className="font-serif text-xl font-bold leading-tight tracking-tight lg:text-2xl"
          >
            {t('title')}
          </h2>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label={t('handoverClose')}
              className="tap-target press ml-auto h-11 w-11 shrink-0 rounded-full bg-brand-mist text-brand-dark-base/65 transition-colors hover:bg-brand-mist-subtle hover:text-brand-dark-base"
            >
              <CloseIcon className="h-5 w-5" strokeWidth={2} />
            </button>
          )}
        </div>
      </header>
      <div className="min-h-0 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6">{body}</div>
    </div>
  )
}
