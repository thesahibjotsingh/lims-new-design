// lib/doctors-i18n.ts
//
// The consultants' names, designations and credentials in Hindi and Punjabi script.
//
// lib/doctors.ts stays the canonical English record. A doctor is found by the English `id`,
// verified by a registration number that is stored and shown exactly as issued, and these
// translations never touch either of those. What changes is how the NAME and the DESCRIPTIVE
// parts of the credentials are written, so a patient who reads only Hindi or Punjabi can
// read who the doctor is.
//
// RULES (the same ones lib/doctors.ts is held to):
//   - Nothing here adds a fact. Every line below is a rewriting of a string already in
//     lib/doctors.ts. No new qualification, no new post, no invented spelling of a degree.
//   - Degree abbreviations (MBBS, MS, DNB, M.S.) stay in Latin letters. They are how the
//     credential is printed on the certificate and on the council register.
//   - Registration numbers are not here at all. See registrationDisplay() in lib/doctors.ts.
//
// UNREVIEWED. Names are transliterated by ear and by convention, and Indian names have more
// than one accepted spelling in each script. LIMS (and each doctor) should confirm how they
// write their own name in Devanagari and Gurmukhi before launch; correcting one is an edit to
// this file and nothing else.

import type { Locale } from '@/i18n/routing'
import type { Doctor } from '@/types'

interface DoctorText {
  name: string
  designation?: string
  qualifications?: string
  /** The fellowships line of the short card form. The degrees line is kept as-is. */
  cardFellowships?: string
}

type TranslatedLocale = Exclude<Locale, 'en'>

const TEXT: Record<string, Record<TranslatedLocale, DoctorText>> = {
  'udit-choudhary': {
    hi: {
      name: 'डॉ. उदित चौधरी',
      designation: 'कंसल्टेंट — इमरजेंसी मेडिसिन एवं क्रिटिकल केयर',
    },
    pa: {
      name: 'ਡਾ. ਉਦਿਤ ਚੌਧਰੀ',
      designation: 'ਕੰਸਲਟੈਂਟ — ਐਮਰਜੈਂਸੀ ਮੈਡੀਸਨ ਅਤੇ ਕ੍ਰਿਟੀਕਲ ਕੇਅਰ',
    },
  },
  'shweta-godara': {
    hi: {
      name: 'डॉ. श्वेता गोदारा',
      qualifications:
        'MBBS, MS (एसएमएस मेडिकल कॉलेज, जयपुर), DNB प्रसूति एवं स्त्री रोग, ' +
        'एडवांस्ड लेप्रोस्कोपिक पेल्विक सर्जरी में फ़ेलोशिप, कॉस्मेटिक गाइनेकोलॉजी में फ़ेलोशिप',
      cardFellowships: 'लेप्रोस्कोपिक पेल्विक सर्जरी, कॉस्मेटिक गाइनेकोलॉजी',
    },
    pa: {
      name: 'ਡਾ. ਸ਼ਵੇਤਾ ਗੋਦਾਰਾ',
      qualifications:
        'MBBS, MS (ਐਸਐਮਐਸ ਮੈਡੀਕਲ ਕਾਲਜ, ਜੈਪੁਰ), DNB ਪ੍ਰਸੂਤੀ ਅਤੇ ਇਸਤਰੀ ਰੋਗ, ' +
        'ਐਡਵਾਂਸਡ ਲੈਪਰੋਸਕੋਪਿਕ ਪੇਲਵਿਕ ਸਰਜਰੀ ਵਿੱਚ ਫ਼ੈਲੋਸ਼ਿਪ, ਕਾਸਮੈਟਿਕ ਗਾਇਨੀਕੋਲੋਜੀ ਵਿੱਚ ਫ਼ੈਲੋਸ਼ਿਪ',
      cardFellowships: 'ਲੈਪਰੋਸਕੋਪਿਕ ਪੇਲਵਿਕ ਸਰਜਰੀ, ਕਾਸਮੈਟਿਕ ਗਾਇਨੀਕੋਲੋਜੀ',
    },
  },
  'vikash-raj': {
    hi: { name: 'डॉ. विकास राज', qualifications: 'MS, जनरल सर्जरी' },
    pa: { name: 'ਡਾ. ਵਿਕਾਸ ਰਾਜ', qualifications: 'MS, ਜਨਰਲ ਸਰਜਰੀ' },
  },
  'harshal-godara': {
    hi: { name: 'डॉ. हर्षल गोदारा', qualifications: 'M.S. (ऑर्थोपेडिक)' },
    pa: { name: 'ਡਾ. ਹਰਸ਼ਲ ਗੋਦਾਰਾ', qualifications: 'M.S. (ਆਰਥੋਪੈਡਿਕ)' },
  },
  'nirmala-goyat': {
    hi: { name: 'डॉ. निर्मला गोयत' },
    pa: { name: 'ਡਾ. ਨਿਰਮਲਾ ਗੋਇਤ' },
  },
}

const PORTRAIT_ALT: Record<TranslatedLocale, (name: string) => string> = {
  hi: (name) => `${name} का चित्र`,
  pa: (name) => `${name} ਦੀ ਤਸਵੀਰ`,
}

/**
 * The doctor with name, designation, qualifications, the card's fellowships line and the
 * portrait's alt text in the given language. Anything not translated above (a field the
 * doctor does not have, or a doctor not listed) stays as the English record has it, so a
 * doctor added to lib/doctors.ts without an entry here still renders, in English, rather
 * than blank.
 */
export function localizeDoctor(doctor: Doctor, locale: Locale): Doctor {
  if (locale === 'en') return doctor
  const text = TEXT[doctor.id]?.[locale]
  if (!text) return doctor

  return {
    ...doctor,
    name: text.name,
    designation: text.designation ?? doctor.designation,
    qualifications: text.qualifications ?? doctor.qualifications,
    cardCredentials:
      doctor.cardCredentials && text.cardFellowships
        ? { ...doctor.cardCredentials, fellowships: text.cardFellowships }
        : doctor.cardCredentials,
    portrait: doctor.portrait
      ? { ...doctor.portrait, alt: PORTRAIT_ALT[locale](text.name) }
      : doctor.portrait,
  }
}

/** A doctor's name in the given language, falling back to English. */
export function localizedDoctorName(doctor: Doctor, locale: Locale): string {
  return localizeDoctor(doctor, locale).name
}
