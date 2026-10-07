// components/search/searchPhrases.ts
//
// The typed phrases for every typewriter placeholder on the site. One list per
// search SCOPE, not one per component — a general field and a doctor-only field
// answer different questions, but every general field cycles the exact same
// phrases as every other general field. That is what "the same typewriter
// effect" means structurally: one array, seven imports, not seven arrays that
// each started as a copy of the first and will each drift on the next edit.
//
// One set per language, so a Hindi page types Hindi examples. Each phrase is still a real
// thing the search can find (see lib/search.ts, which matches in all three scripts).

import type { Locale } from '@/i18n/routing'

interface SearchPhrases {
  /** Every general field: doctors, departments, tests, pages. */
  general: string[]
  /**
   * Doctor-only fields — the nav's "Find a doctor" panel, the consultant
   * directory's own search box, and the hero card's doctor mode. Real names from
   * the published roster, not invented ones: a placeholder that types a doctor
   * this search cannot find teaches the wrong thing.
   */
  doctor: string[]
  /** The hero card's department mode. */
  department: string[]
}

const PHRASES: Record<Locale, SearchPhrases> = {
  en: {
    general: [
      'Orthopaedics',
      'Dr. Shweta Godara',
      'Ultrasound',
      'Emergency services',
      'Physiotherapy',
      'visiting hours',
    ],
    doctor: ['Dr. Shweta Godara', 'Dr. Harshal Godara', 'Dr. Udit Choudhary'],
    department: [
      'Orthopaedics',
      'Obstetrics & Gynaecology',
      'Radiology & Imaging',
      'Physiotherapy',
    ],
  },
  hi: {
    general: [
      'ऑर्थोपेडिक्स',
      'डॉ. श्वेता गोदारा',
      'अल्ट्रासाउंड',
      'इमरजेंसी सेवाएं',
      'फिजियोथेरेपी',
      'मिलने का समय',
    ],
    doctor: ['डॉ. श्वेता गोदारा', 'डॉ. हर्षल गोदारा', 'डॉ. उदित चौधरी'],
    department: [
      'ऑर्थोपेडिक्स',
      'प्रसूति एवं स्त्री रोग',
      'रेडियोलॉजी एवं इमेजिंग',
      'फिजियोथेरेपी',
    ],
  },
  pa: {
    general: [
      'ਆਰਥੋਪੈਡਿਕਸ',
      'ਡਾ. ਸ਼ਵੇਤਾ ਗੋਦਾਰਾ',
      'ਅਲਟਰਾਸਾਊਂਡ',
      'ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ',
      'ਫਿਜ਼ੀਓਥੈਰੇਪੀ',
      'ਮਿਲਣ ਦਾ ਸਮਾਂ',
    ],
    doctor: ['ਡਾ. ਸ਼ਵੇਤਾ ਗੋਦਾਰਾ', 'ਡਾ. ਹਰਸ਼ਲ ਗੋਦਾਰਾ', 'ਡਾ. ਉਦਿਤ ਚੌਧਰੀ'],
    department: [
      'ਆਰਥੋਪੈਡਿਕਸ',
      'ਪ੍ਰਸੂਤੀ ਅਤੇ ਇਸਤਰੀ ਰੋਗ',
      'ਰੇਡੀਓਲੋਜੀ ਅਤੇ ਇਮੇਜਿੰਗ',
      'ਫਿਜ਼ੀਓਥੈਰੇਪੀ',
    ],
  },
}

export function searchPhrases(locale: Locale): SearchPhrases {
  return PHRASES[locale]
}
