// components/doctor/DoctorRailCard.tsx
//
// A consultant as a small card for a swipe row on a phone: portrait, name, department. The home
// page's consultants row and the "other consultants" row on a profile both use it, so a patient
// meets the same card in both. The full card (DoctorCard: credentials, registration number, a
// request button) is for the directory, where there is room, and it is one tap away from here:
// the whole card is the link to the profile.
//
// Like DoctorCard it shows a photograph only if there is a real one; with none the card shows the
// name and department on mist, never a stock face.

import { Link } from '@/i18n/navigation'
import { translatedServiceName } from '@/lib/services-i18n'
import type { Locale } from '@/i18n/routing'
import type { Doctor } from '@/types'

export function DoctorRailCard({
  doctor,
  locale,
  credentials = false,
}: {
  doctor: Doctor
  locale: Locale
  /** Add the degrees under the department: the directory shows them, the swipe rows do not. */
  credentials?: boolean
}) {
  const portrait = doctor.portrait
  const degrees = doctor.cardCredentials?.degrees ?? doctor.qualifications
  return (
    <Link
      href={`/doctors/${doctor.id}`}
      className="press block h-full overflow-hidden rounded-[18px] bg-white shadow-[0_0_0_1px_rgba(15,91,102,0.13),0_10px_20px_-16px_rgba(11,20,22,0.35)]"
    >
      <span className="block aspect-[34/33] w-full bg-brand-mist">
        {portrait && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={portrait.src}
            alt=""
            aria-hidden="true"
            width={portrait.width}
            height={portrait.height}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: `50% ${portrait.focusY ?? 20}%` }}
            className="h-full w-full object-cover"
          />
        )}
      </span>
      <span className="block px-3 pb-3 pt-2.5">
        <span className="block text-[13.5px] font-semibold leading-tight text-brand-dark-base">
          {doctor.name}
        </span>
        <span className="mt-0.5 block text-xs leading-snug text-brand-dark-base/60">
          {translatedServiceName(doctor.departmentSlug, locale)}
        </span>
        {credentials && degrees && (
          <span className="mt-1 line-clamp-2 block text-[11px] font-medium leading-snug text-brand-copper-ink">
            {degrees}
          </span>
        )}
      </span>
    </Link>
  )
}
