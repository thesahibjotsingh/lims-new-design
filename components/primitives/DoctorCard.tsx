// components/primitives/DoctorCard.tsx
//
// A consultant card.
//
// WHAT THIS DELIBERATELY DOES NOT RENDER, and must not be "improved" to render:
// star ratings, review counts, years of experience, "next available" slots, or a
// portrait. LIMS has supplied none of those, and every one of them is a factual claim
// about a named, registered doctor. A 4.9 from no reviews is a fabricated rating on a
// real person's professional record; an invented "Today, 11:30 AM" sends a patient to
// a hospital for an appointment that does not exist.
//
// So the card is built to look finished with only what is real — name, qualifications,
// designation, department, registration number. Optional fields render as absent
// sections, never as placeholders. See the rules at the top of lib/doctors.ts.

import Link from 'next/link'
import { registrationDisplay } from '@/lib/doctors'
import { serviceHrefBySlug, serviceName } from '@/lib/services'
import { ArrowRightIcon, ShieldIcon } from '@/components/icons'
import type { Doctor } from '@/types'

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const departmentHref = serviceHrefBySlug(doctor.departmentSlug)

  return (
    <article className="group flex h-full flex-col justify-between gap-5 rounded-2xl border border-brand-teal/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          {/*
            Monogram, not a stock portrait. A stock photograph captioned with a real
            doctor's name is an invented likeness of that person.
          */}
          <span
            aria-hidden="true"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-mist font-serif text-lg font-bold text-brand-teal"
          >
            {initials(doctor.name)}
          </span>

          <div className="min-w-0">
            <h3 className="font-serif text-lg font-bold leading-snug text-brand-dark-base">
              <Link
                href={`/doctors/${doctor.id}`}
                className="transition-colors hover:text-brand-teal"
              >
                {doctor.name}
              </Link>
            </h3>

            {/* Post-nominals run long in India — wrap them, never truncate them. */}
            {doctor.qualifications && (
              <p className="mt-0.5 text-xs font-medium text-brand-copper">
                {doctor.qualifications}
              </p>
            )}
            {doctor.designation && (
              <p className="mt-1 text-sm leading-snug text-brand-dark-base/70">
                {doctor.designation}
              </p>
            )}
          </div>
        </div>

        <p className="text-xs text-brand-dark-base/55">
          {departmentHref ? (
            <Link
              href={departmentHref}
              className="font-semibold text-brand-teal hover:underline"
            >
              {serviceName(doctor.departmentSlug)}
            </Link>
          ) : (
            serviceName(doctor.departmentSlug)
          )}
        </p>
      </div>

      <div className="space-y-3 border-t border-brand-teal/10 pt-4">
        {doctor.registrationNumber && (
          <p className="flex items-center gap-2 text-xs text-brand-dark-base/55">
            <ShieldIcon className="h-4 w-4 shrink-0 text-brand-teal" />
            {/*
              Shown because it is how a patient verifies a doctor against the council
              register — a trust signal that costs nothing and cannot be faked.
            */}
            <span>
              Reg. no.{' '}
              <span className="font-semibold text-brand-dark-base/75">
                {registrationDisplay(doctor.registrationNumber)}
              </span>
            </span>
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <Link
            href={`/doctors/${doctor.id}`}
            className="tap-target rounded-full border border-brand-teal/20 px-4 text-xs font-semibold text-brand-teal transition-colors hover:bg-brand-mist"
          >
            View profile
          </Link>
          <Link
            href={`/appointments?doctor=${doctor.id}`}
            className="tap-target focus-ring-inverse gap-1.5 rounded-full bg-brand-teal px-4 text-xs font-semibold text-white transition-colors hover:bg-brand-teal-dark"
          >
            Request appointment
            <ArrowRightIcon className="h-3.5 w-3.5" strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </article>
  )
}

/** "Dr. Shweta Godara" -> "SG". Salutations are dropped; they are not initials. */
function initials(name: string): string {
  return name
    .replace(/^(Dr|Prof|Mr|Ms|Mrs)\.?\s+/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}
