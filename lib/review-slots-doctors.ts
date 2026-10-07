// lib/review-slots-doctors.ts
//
// THE "NEEDS LIMS INPUT" CHECKLIST for consultants. Review mode only (lib/review.ts), never
// shown to a public visitor. Same idea as lib/review-slots.ts, for the doctor pages.
//
// A large hospital's doctor page (Medanta, Fortis and Max were surveyed) carries: a
// photograph, three highlights and a biography, specialisation and expertise, education,
// positions held, awards, memberships, publications, OPD timings, languages, years of
// experience, and sometimes a video and patient stories. Each one is a claim about a
// named, registered person, so each one comes from LIMS or it does not exist (see the
// rules at the top of lib/doctors.ts).
//
// A field that IS supplied in lib/doctors.ts gets no slot, so a consultant's checklist
// shrinks as the profile fills in. Examples show the SHAPE of the content, never a fact.
//
// No em-dashes in this file: the strings are shown on screen.

import { DOCTORS } from '@/lib/doctors'
import type { ReviewSlot } from '@/lib/review-slots'
import type { Doctor } from '@/types'

function slot(
  id: string,
  title: string,
  what: string,
  example: string[],
  ask: string[],
  kind: ReviewSlot['kind'] = 'list',
): ReviewSlot {
  return { id, group: 'top', kind, title, what, example, ask }
}

/** The checklist for ONE consultant's profile page. */
export function doctorReviewSlots(doctor: Doctor): ReviewSlot[] {
  const name = doctor.name
  const slots: ReviewSlot[] = [
    slot(
      'photo',
      'Photograph',
      'The portrait on the card and the profile. It must be a photograph of THIS consultant.',
      ['A recent, front-facing professional photograph', 'A plain or neutral background'],
      [
        `Is the current photograph of ${name} a real one, supplied by the consultant?`,
        'Written consent to publish it',
        'At least 800 pixels wide',
      ],
    ),
  ]

  // The facts a card is built on. Each is asked for only while it is missing, so a doctor
  // with everything on file gets no box (Dr Shweta lacks only a designation, Dr Nirmala
  // lacks all three).
  const missingCredentials = [
    !doctor.qualifications && 'qualifications',
    !doctor.registrationNumber && 'registration',
    !doctor.designation && 'designation',
  ].filter(Boolean)
  if (missingCredentials.length > 0) {
    const ask: string[] = []
    if (!doctor.qualifications) {
      ask.push(`Degrees and fellowships of ${name}, exactly as they should be printed`)
    }
    if (!doctor.registrationNumber) {
      ask.push(
        `Medical council registration number of ${name}, exactly as issued. Patients check it against the council register`,
      )
    }
    if (!doctor.designation) {
      ask.push('Designation, such as Consultant or Senior Consultant, only if LIMS confirms it')
    }
    slots.push(
      slot(
        'credentials',
        'Credentials and registration',
        'The lines under the name on the card: qualifications, registration number and designation.',
        [
          'Degrees and fellowships, in the order they should appear (format only)',
          'Council prefix and number (format only)',
        ],
        ask,
      ),
    )
  }

  if (!doctor.about) {
    slots.push(
      slot(
        'about',
        'About this consultant',
        "Three short highlights and a short biography, in the consultant's own words.",
        [
          'Training, and where it was done',
          'Main areas of clinical work',
          'Years in practice and any leadership role',
        ],
        [
          `Three highlights about ${name}: only facts the consultant is happy to publish`,
          'A biography of 100 to 150 words',
          'Written approval from the consultant before publishing',
        ],
        'tiles',
      ),
    )
  }
  if (!doctor.specialisations?.length) {
    slots.push(
      slot(
        'expertise',
        'Specialisation and expertise',
        'The conditions and procedures this consultant focuses on, shown as tiles.',
        ['Conditions treated', 'Procedures performed', 'Sub-speciality interests'],
        ['A list of the conditions and procedures, in plain language'],
      ),
    )
  }
  if (!doctor.education?.length) {
    slots.push(
      slot(
        'education',
        'Education and training',
        'Degrees, institutions and years, newest first.',
        ['Degree, institution and year (format only)'],
        [
          'Each degree and fellowship, with institution and year',
          'The qualifications line is already supplied. Is it complete?',
        ],
      ),
    )
  }
  if (!doctor.positionsHeld?.length) {
    slots.push(
      slot(
        'experience',
        'Experience and positions held',
        'Earlier posts and responsibilities.',
        ['Post, hospital and years (format only)'],
        ['Previous posts with hospital and years', 'Current administrative roles, if any'],
      ),
    )
  }
  if (!doctor.awards?.length) {
    slots.push(
      slot(
        'awards',
        'Awards and recognition',
        'A timeline of awards and honours, shown as year and title.',
        ['Year and title of each award (format only)'],
        ['Awards and honours, with year', 'Only ones the consultant can document'],
      ),
    )
  }
  if (!doctor.memberships?.length) {
    slots.push(
      slot(
        'memberships',
        'Memberships and fellowships',
        'Professional bodies the consultant belongs to.',
        ['Society or college, and type of membership (format only)'],
        ['Professional memberships and fellowships'],
      ),
    )
  }
  if (!doctor.publications?.length) {
    slots.push(
      slot(
        'publications',
        'Publications and articles',
        'Papers, chapters or patient articles written by the consultant.',
        ['Title, journal or site, and year (format only)'],
        ['Publications worth listing', 'Patient-education articles the consultant wrote or reviewed'],
      ),
    )
  }
  if (!doctor.opdSchedule?.length) {
    slots.push(
      slot(
        'opd',
        'OPD days and timings',
        'When this consultant sees patients. The most searched fact on any doctor page.',
        ['Days and session times (format only)', 'Appointment only, or walk-in as well'],
        ['OPD days and times', 'Walk-in allowed, or appointment only?', 'Leave and holiday arrangements'],
      ),
    )
  }
  if (!doctor.languages?.length) {
    slots.push(
      slot(
        'languages',
        'Languages spoken',
        'Patients choose a doctor partly by language.',
        ['English, Hindi, Punjabi (example only)'],
        [`Languages ${name} is comfortable consulting in`],
      ),
    )
  }
  if (typeof doctor.experienceYears !== 'number') {
    slots.push(
      slot(
        'experience-years',
        'Years of experience',
        'A single figure shown beside the name.',
        ['A number of years, only if the consultant confirms it'],
        ['Years in practice, counted from registration'],
      ),
    )
  }
  slots.push(
    slot(
      'video-stories',
      'Video introduction and patient stories',
      'Large hospital pages often carry a short video and consented patient quotes.',
      ['A short video, if the consultant is willing', 'A consented patient quote (format only)'],
      ['Is a video available?', 'Written patient consent for any story or quote'],
    ),
  )

  return slots
}

/** What the consultant directory still needs from LIMS. */
export function directoryReviewSlots(): ReviewSlot[] {
  // Doctors listed without a qualifications line or a registration number, named so LIMS
  // staff can fill them in one pass. Recomputed, so the list shrinks as the data arrives.
  const incomplete = DOCTORS.flatMap((doctor) => {
    const missing = [
      !doctor.qualifications && 'qualifications',
      !doctor.registrationNumber && 'registration number',
    ].filter(Boolean)
    return missing.length > 0 ? [`${doctor.name}: ${missing.join(' and ')}`] : []
  })

  return [
    slot(
      'roster',
      'Who else should be listed',
      `${DOCTORS.length} consultants are published. A hospital this size lists every consultant, by department.`,
      ['Name, designation, department, qualifications and registration number'],
      [
        'The full list of consultants LIMS wants published',
        'Which ones are visiting or part-time',
        ...(incomplete.length > 0 ? [`Still missing for a listed doctor: ${incomplete.join('; ')}`] : []),
      ],
    ),
    slot(
      'roster-photos',
      'Photographs for every consultant',
      'Two of the current portraits are placeholders and must be replaced with real photographs.',
      ['One recent photograph per consultant, framed the same way where possible'],
      ['A photograph of each consultant', 'Written consent to publish each one'],
    ),
    slot(
      'roster-filters',
      'Locations and filters',
      'Multi-site hospitals filter by location. LIMS has one address, so only the department filter is shown.',
      [
        'Filter by department (live)',
        'Filter by OPD day (needs timings)',
        'Filter by language (needs languages)',
      ],
      ['Does LIMS have more than one location or clinic?', 'Which filters would patients actually use?'],
    ),
  ]
}
