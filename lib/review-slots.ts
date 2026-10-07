// lib/review-slots.ts
//
// THE "NEEDS LIMS INPUT" CHECKLIST, per kind of page. Shown only in review mode
// (lib/review.ts), never to a public visitor.
//
// Each slot is a section that hospital pages usually have (Medanta, Max, Fortis, Sir Ganga
// Ram and others were surveyed) but that only LIMS can confirm. Together they make a
// department or test page as long and full as a large hospital's, so a walk-through with
// LIMS staff can mark every one as: real and supply it, real but different, or not
// something LIMS has (delete it).
//
//   `what`     - what the section is on other hospital sites.
//   `example`  - the SHAPE of the content, to prompt the conversation. It is illustrative.
//                It must never be copied onto the live site without LIMS confirming it.
//   `ask`      - the questions to put to LIMS staff.
//
// Where an example sounds like a claim ("diagnostics on the same campus"), it is either
// something LIMS itself has said (the site description does say diagnostics, imaging and
// pathology are on the same campus) or it is labelled as an example in the box.
//
// No em-dashes in this file: the strings are shown on screen.

import type { ClinicalService, ServiceCategory } from '@/lib/services'

export type SlotGroup = 'top' | 'middle' | 'practical' | 'trust'
export type SlotKind = 'tiles' | 'checklist' | 'list'

export interface ReviewSlot {
  id: string
  group: SlotGroup
  kind: SlotKind
  title: string
  what: string
  example: string[]
  ask: string[]
}

interface Template extends Omit<ReviewSlot, 'example'> {
  /** `{name}` is replaced with the service name. */
  example: string[]
}

const CLINICAL: Template[] = [
  {
    id: 'highlights',
    group: 'top',
    kind: 'tiles',
    title: 'Highlights of the department',
    what: 'A row of numbered highlights near the top of a speciality page, answering "why choose us".',
    example: [
      'Consultant-led care for {name} conditions',
      'Diagnostics and imaging on the same campus',
      'Emergency support linked to the department',
      'Treatment options explained before any procedure',
      'Rehabilitation and follow-up support',
      'Help with insurance and cashless admission',
    ],
    ask: [
      'Which of these can LIMS honestly say about this department?',
      'What does LIMS want to say that is not listed here?',
      'Any figures LIMS is happy to publish (cases a year, years of experience)? Only real numbers.',
    ],
  },
  {
    id: 'message',
    group: 'top',
    kind: 'list',
    title: 'Message from the head of department',
    what: 'A short message, usually with a photo or video, from the senior doctor of the department.',
    example: ['"We take time to explain every option, so patients and families can decide with confidence." (example wording only)'],
    ask: [
      'Who heads this department?',
      "A message of up to 60 words, in the doctor's own words",
      'A photo, and written consent to publish both',
    ],
  },
  {
    id: 'team',
    group: 'top',
    kind: 'list',
    title: 'The wider team',
    what: 'The people who work with the consultants: nursing, anaesthesia, technicians, therapists.',
    example: ['Nursing and ward staff', 'Anaesthesia team', 'Technicians and technologists', 'Physiotherapists and dietitians'],
    ask: ['Which of these work with this department?', 'Does anyone else have a profile to publish?'],
  },
  {
    id: 'procedures',
    group: 'middle',
    kind: 'checklist',
    title: 'Which treatments are done at LIMS',
    what: 'The treatments and procedures listed above are GENERAL information. This marks which ones LIMS actually performs.',
    example: [],
    ask: [
      'Tick the ones LIMS performs here',
      'Strike any LIMS does not perform, so the page never implies it',
      'Add anything LIMS does that is missing',
    ],
  },
  {
    id: 'technology',
    group: 'middle',
    kind: 'list',
    title: 'Equipment and technology',
    what: 'The main machines and systems the department uses, usually with a photo.',
    example: [
      'Name of the equipment and what it is used for',
      'Whether it is new or recently upgraded',
      'A photo, if LIMS agrees',
    ],
    ask: [
      'List the main equipment by name, not marketing phrases',
      'Anything LIMS does NOT have, so it is never implied',
    ],
  },
  {
    id: 'facilities',
    group: 'middle',
    kind: 'list',
    title: 'Facilities for this department',
    what: 'OPD rooms, day-care beds, operation theatres, ICU or HDU access.',
    example: ['OPD rooms', 'Operation theatres used', 'ICU or high-dependency beds available', 'Private and shared rooms'],
    ask: ['Which of these does this department use?', 'Real counts, only if LIMS wants them published'],
  },
  {
    id: 'timings',
    group: 'practical',
    kind: 'list',
    title: 'OPD days and timings',
    what: 'When the department sees patients, per consultant. One of the most searched facts on any hospital site.',
    example: ['Days of the week and session times for each consultant (format only)', 'Appointment only, or walk-in as well'],
    ask: [
      'OPD days and times for each consultant',
      'Walk-in allowed, or appointment only?',
      'Public holidays and emergency cover',
    ],
  },
  {
    id: 'contact',
    group: 'practical',
    kind: 'list',
    title: 'Department contact',
    what: 'A direct number, email or WhatsApp for this department, beyond the two hospital lines.',
    example: ['A direct phone line', 'A department email', 'A WhatsApp number'],
    ask: ['Does the department have its own contact?', 'Who answers, and when?'],
  },
  {
    id: 'insurance',
    group: 'practical',
    kind: 'list',
    title: 'Insurance, TPA and cashless',
    what: 'Which insurers and schemes are accepted for this department.',
    example: ['Empanelled insurers and TPAs', 'Government schemes accepted', 'Who helps with claim paperwork'],
    ask: [
      'Which insurers and TPAs are empanelled?',
      'Which schemes are accepted (for example Ayushman Bharat, CGHS, ECHS, ESI)?',
      'Who helps patients with claims?',
    ],
  },
  {
    id: 'second-opinion',
    group: 'practical',
    kind: 'list',
    title: 'Second opinion and video consultation',
    what: 'Large hospitals offer remote consultations and second opinions. This asks whether LIMS does.',
    example: ['Second opinion on reports and scans', 'Video consultation with a consultant'],
    ask: ['Does LIMS offer either?', 'Who arranges them, and how does a patient ask?'],
  },
  {
    id: 'stories',
    group: 'trust',
    kind: 'list',
    title: 'Patient stories',
    what: 'Short, consented stories or quotes from patients treated in the department.',
    example: ['A short quote with first name and year of treatment (format only)'],
    ask: [
      'Written consent from the patient for any story, photo or video',
      'First name only unless the patient agrees otherwise',
      'Real experiences only. No promises of outcome',
    ],
  },
  {
    id: 'awards',
    group: 'trust',
    kind: 'list',
    title: 'Accreditations, awards and research',
    what: 'Quality marks and recognition that build trust on a hospital site.',
    example: ['Accreditations held, with certificate numbers', 'Awards and recognition', 'Publications or research'],
    ask: [
      'Which accreditations does LIMS hold (for example NABH, NABL)?',
      'Certificate numbers and validity dates',
      'Awards, publications or research worth listing',
    ],
  },
]

const DIAGNOSTICS: Template[] = [
  {
    id: 'technology',
    group: 'top',
    kind: 'list',
    title: 'The machine and its technology',
    what: 'The equipment used for this test, usually with a photo and what makes it suitable.',
    example: ['Type and make of the machine', 'What it can image or measure', 'A photo, if LIMS agrees'],
    ask: ['Name and type of the equipment', 'Anything LIMS does NOT offer under this heading, so it is never implied'],
  },
  {
    id: 'booking',
    group: 'practical',
    kind: 'list',
    title: 'How to book this test',
    what: 'Whether a doctor referral is needed, whether walk-ins are allowed, and how to book.',
    example: ['Referral needed, or walk-in', 'Appointment by phone or form', 'Home sample collection (pathology)'],
    ask: ['Referral required?', 'Walk-in allowed?', 'Is home sample collection offered, and in which areas?'],
  },
  {
    id: 'timings',
    group: 'practical',
    kind: 'list',
    title: 'Timings',
    what: 'Opening hours of the department or laboratory, including emergency and night cover.',
    example: ['Days and hours (format only)', 'Emergency and after-hours availability'],
    ask: ['Days and hours', 'Is emergency testing available at night, and for which tests?'],
  },
  {
    id: 'reports',
    group: 'practical',
    kind: 'list',
    title: 'Reports and turnaround',
    what: 'How long reports take and how patients receive them.',
    example: ['Usual time for a report', 'Collect in person, or receive by phone or email', 'Urgent report arrangements'],
    ask: ['Usual turnaround for each type of report', 'How are reports delivered?', 'Is online access planned?'],
  },
  {
    id: 'pricing',
    group: 'practical',
    kind: 'list',
    title: 'Charges',
    what: 'Whether prices are shown. Many hospitals publish a rate list, others say "call for rates".',
    example: ['A rate list, or "call for rates"'],
    ask: ['Does LIMS want to publish prices?', 'If not, which number should patients call?'],
  },
  {
    id: 'staff',
    group: 'trust',
    kind: 'list',
    title: 'Who performs and reports',
    what: 'The radiologists, pathologists, sonologists or technologists responsible.',
    example: ['Names and qualifications of the reporting doctors', 'Technologist team'],
    ask: ['Who reports on this test?', 'Qualifications and registration numbers, as for consultants'],
  },
  {
    id: 'accreditation',
    group: 'trust',
    kind: 'list',
    title: 'Quality and accreditation',
    what: 'Laboratory or imaging accreditation and quality checks.',
    example: ['Laboratory accreditation, with certificate number', 'Quality control and safety practices'],
    ask: ['Which accreditations apply (for example NABL)?', 'Certificate number and validity'],
  },
]

const SUPPORT: Template[] = [
  {
    id: 'timings',
    group: 'practical',
    kind: 'list',
    title: 'Timings and availability',
    what: 'When the service is available, and whether it runs round the clock.',
    example: ['Days and hours (format only)', 'Whether it is available at night and on holidays'],
    ask: ['Days and hours', 'Is it available 24 hours? Only say so if LIMS confirms it'],
  },
  {
    id: 'contact',
    group: 'practical',
    kind: 'list',
    title: 'Contact for this service',
    what: 'A direct number or desk for this service.',
    example: ['A direct phone line', 'Location of the desk inside the hospital'],
    ask: ['Does the service have its own number?', 'Where is it located in the building?'],
  },
  {
    id: 'charges',
    group: 'practical',
    kind: 'list',
    title: 'Charges and insurance',
    what: 'Whether the service is chargeable and whether insurance covers it.',
    example: ['Charges, or "call for rates"', 'Whether insurance applies'],
    ask: ['Does LIMS want to publish charges?', 'Is it covered under any scheme or insurer?'],
  },
  {
    id: 'staff',
    group: 'trust',
    kind: 'list',
    title: 'The team',
    what: 'The therapists, dietitians, pharmacists or crew who provide the service.',
    example: ['Names and qualifications', 'Registration numbers where applicable'],
    ask: ['Who works in this service?', 'Qualifications and registration details'],
  },
  {
    id: 'coverage',
    group: 'trust',
    kind: 'list',
    title: 'Coverage and facilities',
    what: 'What the service covers, for example the area an ambulance serves, or the range of a pharmacy.',
    example: ['Area covered, or what is stocked (format only)', 'Equipment carried or facilities available'],
    ask: ['What can LIMS say about coverage and equipment, honestly?', 'Anything that must not be implied'],
  },
]

const TEMPLATES: Record<ServiceCategory, Template[]> = {
  clinical: CLINICAL,
  diagnostics: DIAGNOSTICS,
  support: SUPPORT,
}

/** The checklist for a service, with its name filled in and treatments pulled from its data. */
export function reviewSlotsFor(service: ClinicalService): ReviewSlot[] {
  return TEMPLATES[service.category].map((template) => ({
    ...template,
    example:
      template.id === 'procedures'
        ? (service.commonTreatments ?? []).map((item) => item.name)
        : template.example.map((line) => line.replaceAll('{name}', service.name)),
  }))
}
