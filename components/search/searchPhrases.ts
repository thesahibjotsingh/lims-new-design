// components/search/searchPhrases.ts
//
// The typed phrases for every typewriter placeholder on the site. One list per
// search SCOPE, not one per component — a general field and a doctor-only field
// answer different questions, but every general field cycles the exact same
// phrases as every other general field. That is what "the same typewriter
// effect" means structurally: one array, seven imports, not seven arrays that
// each started as a copy of the first and will each drift on the next edit.

/** Every general field: doctors, departments, tests, pages. */
export const GENERAL_SEARCH_PHRASES = [
  'Orthopaedics',
  'Dr. Shweta Godara',
  'Ultrasound',
  'Emergency services',
  'Physiotherapy',
  'health packages',
  'visiting hours',
]

/**
 * Doctor-only fields — the nav's "Find a doctor" panel, the consultant
 * directory's own search box, and the hero card's doctor mode. Real names from
 * the published roster, not invented ones: a placeholder that types a doctor
 * this search cannot find teaches the wrong thing.
 */
export const DOCTOR_SEARCH_PHRASES = [
  'Dr. Shweta Godara',
  'Dr. Harshal Godara',
  'Dr. Udit Choudhary',
]

/** The hero card's department mode. */
export const DEPARTMENT_SEARCH_PHRASES = [
  'Orthopaedics',
  'Obstetrics & Gynaecology',
  'Radiology & Imaging',
  'Physiotherapy',
]
