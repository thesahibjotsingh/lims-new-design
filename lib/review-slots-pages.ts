// lib/review-slots-pages.ts
//
// THE "NEEDS LIMS INPUT" CHECKLISTS for the Contact and About pages. Review mode only
// (lib/review.ts), never shown to a public visitor. Same idea as lib/review-slots.ts and
// lib/review-slots-doctors.ts.
//
// Large hospital sites (Medanta, Fortis, Max, Sir Ganga Ram were surveyed) give these two pages
// a lot of weight: Contact carries hours, parking, the entrance, an ambulance line and a
// feedback route, and About carries a history, leadership, bed and theatre counts,
// accreditation and a photo tour. Each of those is a claim only the hospital can make, so each
// is a box here and an absent section on the live site until LIMS supplies it.
//
// Groups are used only to place a box in the right band of the page; the heading of each band
// is set by the page.
//
// No em-dashes in this file: the strings are shown on screen.

import { REVIEW_CANDIDATES, SELECTED_REVIEWS } from '@/lib/reviews'
import { googleListing } from '@/lib/google-listing'
import type { ReviewSlot } from '@/lib/review-slots'

function slot(
  id: string,
  group: ReviewSlot['group'],
  title: string,
  what: string,
  example: string[],
  ask: string[],
  kind: ReviewSlot['kind'] = 'list',
): ReviewSlot {
  return { id, group, kind, title, what, example, ask }
}

export function contactReviewSlots(): ReviewSlot[] {
  const candidateLines = REVIEW_CANDIDATES.map(
    (review) => `${review.author}, ${review.rating} stars, ${review.posted}: ${review.note}`,
  )

  return [
    slot(
      'hours',
      'practical',
      'Opening hours',
      'Large hospitals list emergency, OPD, pharmacy and lab collection hours separately.',
      ['Emergency: hours (format only)', 'OPD: days and hours', 'Pharmacy: hours', 'Lab sample collection: hours'],
      [
        'OPD and reception hours, and holiday arrangements (the hospital as a whole is shown as open 24 hours, every day, from its own Business profile)',
        'Whether the emergency line and the reception line are both answered at night',
      ],
    ),
    slot(
      'ambulance',
      'practical',
      'Ambulance line',
      'A dedicated number for an ambulance, shown beside the emergency number.',
      ['An ambulance phone number (format only)', 'Service area, if limited'],
      ['Does LIMS run its own ambulance, and on what number?', 'Is it the same as the emergency line?'],
    ),
    slot(
      'getting-here',
      'practical',
      'Getting here',
      'Directions a person can follow when they are worried and in a hurry.',
      [
        'Landmark and distance from the bus stand and railway station (format only)',
        'Which road to turn off, and which side the entrance is on',
        'Auto and taxi stands nearby',
      ],
      [
        'How do people usually find the hospital? Which landmark do they use?',
        'Distance and time from the bus stand and the railway station',
        'Is the entrance easy to miss from Main Road?',
      ],
    ),
    slot(
      'parking',
      'practical',
      'Parking and entrances',
      'Where to leave a car or two-wheeler, and which door to use for what.',
      ['Parking: where, how many, free or paid (format only)', 'Emergency entrance and main entrance', 'Wheelchair access and lifts'],
      [
        'Is there parking, and is it free?',
        'Where is the emergency entrance, compared with the main entrance?',
        'Step-free access and wheelchair availability',
      ],
    ),
    slot(
      'contacts',
      'practical',
      'Email, WhatsApp and feedback',
      'Other ways to reach the hospital, and a route for feedback and complaints.',
      ['An official email address (format only)', 'A WhatsApp number for appointments, if used', 'Who handles feedback and complaints'],
      [
        'An official email address for enquiries',
        'Is there a WhatsApp number? Who answers it, and when?',
        'Who should a patient write to with feedback or a complaint?',
      ],
    ),
    slot(
      'reviews',
      'top',
      'Which Google reviews to show',
      'The section shows a few positive reviews, labelled as selected, with the true rating beside them. It stays off the live site until at least one is chosen.',
      [
        'Three to six short, positive reviews, quoted exactly',
        `The real rating shown beside them (${googleListing.rating} from ${googleListing.reviewCount} reviews on ${googleListing.readOn})`,
        'A link to read all of them on Google',
      ],
      [
        `${SELECTED_REVIEWS.length} reviews are approved so far. The cards below are a preview of three, in review mode only. Pick the ones LIMS is happy to show`,
        'Avoid reviews that name a doctor or describe a condition. Medical advertising rules are strict about patient testimonials, so ask LIMS or its adviser whether testimonials are allowed at all',
        'The Google listing is named "Life Line Hospital". Confirm it is the hospital\'s own listing (the owner replies to reviews) and whether it should be renamed to match LIMS',
        'Every good review read so far praises a doctor who is not on our consultant list: Dr. Meenakshi (also spelt Minakshi) Bansal, Dr. Lalit Mohan Bansal, Dr. Anupam Nagpal. Should they be added to the roster? If their reviews are shown, patients will ask for them',
        ...candidateLines.map((line) => `Read: ${line}`),
      ],
    ),
  ]
}

export function aboutReviewSlots(): ReviewSlot[] {
  return [
    slot(
      'story',
      'top',
      'The hospital\'s story',
      'A short history in the hospital\'s own words: when it began, who started it and what has changed.',
      ['Year founded (format only)', 'A short timeline of milestones, newest last', 'Why the hospital was started'],
      [
        'When was the hospital founded, and by whom?',
        'Key milestones: new departments, new buildings, firsts for Hisar',
        'The building address reads "Jindal Hospital" and Google lists "Life Line Hospital". How do those relate to LIMS? Patients will notice the different names',
      ],
      'tiles',
    ),
    slot(
      'numbers',
      'top',
      'The hospital in numbers',
      'Bed, ICU and theatre counts, shown as large figures. The most scanned part of an About page.',
      ['Number of beds', 'ICU and NICU beds', 'Operation theatres', 'Consultants and nurses'],
      [
        'Total beds, ICU beds and operation theatres',
        'Only figures LIMS can stand behind and will keep current',
        'Number of consultants, if LIMS wants it shown',
      ],
      'tiles',
    ),
    slot(
      'values',
      'middle',
      'What Compassion, Excellence and Care mean here',
      'The three words on LIMS stationery, each with one honest sentence behind it.',
      ['Compassion: one sentence', 'Excellence: one sentence', 'Care: one sentence'],
      ['One sentence for each word, written or approved by LIMS', 'Anything the hospital promises patients, such as response times'],
      'tiles',
    ),
    slot(
      'facilities',
      'middle',
      'Facilities and equipment',
      'What is on the campus beyond the departments: wards, ICU, theatres, labs, pharmacy, canteen.',
      ['Wards and room categories', 'ICU, NICU and HDU', 'Operation theatres', 'In-house pharmacy and laboratory'],
      [
        'Room categories (general ward, semi-private, private) and whether they can be listed',
        'Major equipment LIMS wants named',
        'Canteen, prayer room, waiting areas and other facilities for families',
      ],
    ),
    slot(
      'media',
      'middle',
      'Photographs and a tour',
      'A few real photographs of the building, reception and wards. Stock photos of other hospitals are not used.',
      ['Exterior', 'Reception', 'A ward', 'A theatre or ICU, if privacy allows'],
      [
        'Real photographs of the building and facilities, with permission from anyone visible',
        'Is a short video or a 360 tour wanted later? An indoor tour is a paid shoot',
      ],
    ),
    slot(
      'leadership',
      'trust',
      'Leadership and message',
      'Names, photographs and a short message from the people who run the hospital.',
      ['Name, role and photograph of each leader', 'A message of about 100 words'],
      [
        'Who should be named: chairman, managing director, medical director?',
        'A photograph and a short message, with their written approval',
      ],
    ),
    slot(
      'accreditations',
      'trust',
      'Accreditation and registrations',
      'NABH and other accreditation, clinical establishment registration and government scheme empanelment.',
      ['Accreditation body and status (format only)', 'Registration number', 'Schemes the hospital is empanelled under'],
      [
        'Any accreditation LIMS holds or has applied for, with the certificate',
        'Clinical establishment registration number',
        'Government schemes and insurers LIMS accepts, if it wants them shown',
      ],
    ),
    slot(
      'awards',
      'trust',
      'Awards and community work',
      'Recognition and health camps, shown as a short list with years.',
      ['Year and title of each award (format only)', 'Camps and outreach, with dates'],
      ['Awards worth listing, with the year', 'Health camps or community programmes LIMS wants shown'],
    ),
  ]
}
