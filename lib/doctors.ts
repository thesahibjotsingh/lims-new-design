// lib/doctors.ts
//
// The LIMS consultant roster. REAL PEOPLE, REAL REGISTRATION NUMBERS.
//
// Rules for this file, in order of importance:
//
//  1. Never add a field LIMS has not supplied. No invented years of experience, no
//     invented OPD timings, no invented biography, no invented languages. A missing
//     field renders as a missing section — the UI is built for that. A guessed field
//     renders as a fact about a named doctor's credentials, which is a real harm and,
//     for a registration number or a qualification, arguably a legal one.
//
//  2. Registration numbers are stored verbatim as issued, including the council
//     prefix. They are the field a patient uses to verify a doctor against the
//     council register, so a "tidied" number is a broken number.
//
//  3. `departmentSlug` must resolve against lib/services.ts. A doctor filed under a
//     slug that does not exist there disappears from the department page silently,
//     which is why assertDoctorDepartments() below runs at module load.
//
//  4. `portrait` must end up holding a photograph OF THAT CONSULTANT and nothing else.
//     A stock face captioned with a real, registered doctor's name is an invented
//     likeness of that person, and rule 1 covers it as squarely as an invented
//     qualification would be.
//
//     harshal-godara and shweta-godara are REAL PHOTOGRAPHS of those two consultants,
//     supplied 2026-09-16 — 1086x1448 sources under assets-source/doctors/, well above
//     the 640x800 floor build_portraits() warns below.
//
//     udit-choudhary and vikash-raj ARE STILL STOCK PLACEHOLDERS AND MUST NOT SHIP.
//     Known problems, so nobody rediscovers them:
//       - vikash-raj      is a photograph of a woman.
//       - udit-choudhary  and vikash-raj were upscaled from sources far below the card
//                         size, so both look soft.
//
//     Pipeline: assets-source/doctors/dr-<id>.png -> public/doctors/<id>.webp, written
//     by scripts/build_assets.py as a 4:5 crop at 800x1000. Drop the real photographs
//     in under the same names and re-run the script — but DO re-measure `focusY` below
//     for the new file; it won't carry over.
//
//  5. `portrait.focusY` is the vertical object-position (0-100, 0 = top of the 4:5
//     image) that keeps the consultant's hair in frame when DoctorCard crops this
//     source down to its 3:2 card — see the crop comment in
//     components/primitives/DoctorCard.tsx for why one shared value can't work for
//     every photo. Every source here has the subject framed at a different height (one
//     has the hairline touching the very top edge, another has visible ceiling above
//     the head down to 17% of the frame), so this has to be measured per photograph,
//     not guessed: open the file, find the pixel row the hairline sits at as a percentage
//     of the image height, and set focusY a few points above it so a sliver of headroom
//     survives the crop. Left unset, it defaults to 50 (centred) — safe for a photo
//     nobody has checked yet, but check it before shipping one.
//
// Phase 3 moves this behind the CMS or HIS loader. The shape stays the same.

import { getService, serviceName } from '@/lib/services'
import type { Doctor } from '@/types'

export const DOCTORS: Doctor[] = [
  {
    id: 'udit-choudhary',
    name: 'Dr. Udit Choudhary',
    // Supplied as "Consultant, Dept. of Emergency Medicine & Critical Care". LIMS's
    // service list names the department "Emergency Services"; the fuller wording is
    // kept here as the designation rather than discarded.
    designation: 'Consultant — Emergency Medicine & Critical Care',
    departmentSlug: 'emergency-services',
    registrationNumber: 'RMC: 48421',
    // PLACEHOLDER - see rule 4. Upscaled from 363x493; soft.
    portrait: {
      src: '/doctors/udit-choudhary.webp',
      alt: 'Portrait of Dr. Udit Choudhary',
      width: 800,
      height: 1000,
      // Hairline sits at the very top edge of this crop (0%) — see the focusY note
      // below DOCTORS.
      focusY: 0,
    },
  },
  {
    id: 'shweta-godara',
    name: 'Dr. Shweta Godara',
    // Full qualifications supplied by LIMS 2026-09-17, superseding the earlier
    // "MS (Obs & Gyane)" placeholder. This is also what resolves the credential
    // gap the hero's quote used to flag — see the CONTENT NOTE in
    // components/home/DesktopHero.tsx and MobileHero.tsx.
    qualifications:
      'MBBS, MS (SMS Medical College Jaipur), DNB Obstetrics & Gynaecology, Fellowship in Advance Laparoscopic Pelvic Surgeries, Fellowship in Cosmetic Gynaecology',
    departmentSlug: 'obstetrics-gynaecology',
    registrationNumber: 'HN-31657',
    // Real photograph, supplied 2026-09-16.
    portrait: {
      src: '/doctors/shweta-godara.webp',
      alt: 'Portrait of Dr. Shweta Godara',
      width: 800,
      height: 1000,
      focusY: 30,
    },
  },
  {
    id: 'vikash-raj',
    name: 'Dr. Vikash Raj',
    qualifications: 'MS, General Surgery',
    departmentSlug: 'general-laparoscopic-surgery',
    registrationNumber: 'UPMC Reg. No. 123298',
    // PLACEHOLDER - see rule 4. Photograph is of a woman; upscaled from 280x360.
    portrait: {
      src: '/doctors/vikash-raj.webp',
      alt: 'Portrait of Dr. Vikash Raj',
      width: 800,
      height: 1000,
      focusY: 18,
    },
  },
  {
    id: 'harshal-godara',
    name: 'Dr. Harshal Godara',
    qualifications: 'M.S. (Orthopedic)',
    departmentSlug: 'ortho-joint-replacement',
    registrationNumber: 'HN-31573',
    // Real photograph, supplied 2026-09-16.
    portrait: {
      src: '/doctors/harshal-godara.webp',
      alt: 'Portrait of Dr. Harshal Godara',
      width: 800,
      height: 1000,
      focusY: 12,
    },
  },
]

/**
 * Fails the build if a doctor is filed under a service slug that does not exist.
 *
 * Without this, renaming a slug in lib/services.ts drops that doctor off the department
 * page and out of the directory grouping with no error anywhere — the page just renders
 * one card short. On a roster this small that is easy to miss and hard to notice later.
 */
function assertDoctorDepartments(): void {
  const orphans = DOCTORS.filter((doctor) => !getService(doctor.departmentSlug))
  if (orphans.length > 0) {
    throw new Error(
      'lib/doctors.ts: unknown departmentSlug for ' +
        orphans.map((doctor) => `${doctor.name} (${doctor.departmentSlug})`).join(', ') +
        '. Every departmentSlug must exist in lib/services.ts.',
    )
  }
}

assertDoctorDepartments()

export function getDoctor(id: string): Doctor | undefined {
  return DOCTORS.find((doctor) => doctor.id === id)
}

export function getDoctorsByDepartment(slug: string): Doctor[] {
  return DOCTORS.filter((doctor) => doctor.departmentSlug === slug)
}

/**
 * Free-text search over the roster.
 *
 * Matches on every field a patient might actually type: the name, the
 * qualifications, the designation, and the DEPARTMENT NAME — someone searching
 * "ortho" is looking for Dr Harshal Godara even though that word appears nowhere
 * on his record, and a search that cannot make that jump feels broken.
 *
 * Deliberately not fuzzy. On a roster this size a typo tolerance would match
 * everything, and matching the wrong consultant is worse than matching none:
 * "no results" is a state a patient can act on, a wrong doctor is not.
 *
 * An empty or whitespace-only query returns the whole roster rather than nothing,
 * so ?q= reads as "no filter" instead of "no doctors".
 */
export function searchDoctors(query: string): Doctor[] {
  const needle = query.trim().toLowerCase()
  if (!needle) return DOCTORS

  return DOCTORS.filter((doctor) =>
    [
      doctor.name,
      doctor.qualifications,
      doctor.designation,
      serviceName(doctor.departmentSlug),
    ]
      .filter(Boolean)
      .some((field) => (field as string).toLowerCase().includes(needle)),
  )
}

/** Service slugs that currently have at least one named consultant. */
export function departmentsWithDoctors(): string[] {
  return Array.from(new Set(DOCTORS.map((doctor) => doctor.departmentSlug)))
}

/**
 * Display form of a registration number.
 *
 * The stored value is verbatim as issued, because that is what a patient matches
 * against the council register. But LIMS supplies them inconsistently — "RMC: 48421"
 * carries a colon, "UPMC Reg. No. 123298" carries its own label — and rendering a
 * "Reg. no." label in front of that produces "Reg. no. UPMC Reg. No. 123298".
 *
 * This strips only the redundant label and separating punctuation. It never touches the
 * council prefix or the digits, so the rendered string still matches the register.
 */
export function registrationDisplay(value: string): string {
  return value
    .replace(/\s*Reg(?:istration)?\.?\s*No\.?\s*/i, ' ')
    .replace(/\s*:\s*/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}
