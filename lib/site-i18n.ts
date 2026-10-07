// lib/site-i18n.ts
//
// The hospital's own name, tagline, description and address, in Hindi and Punjabi.
//
// lib/site-config.ts stays the canonical English record (structured data, the page <title>
// template and every `tel:` link read it). This is the lookup used wherever the same
// facts are SHOWN to a reader, so a Hindi page does not say "Jindal Hospital, Plot No. 6,
// Main Road" in Latin script in the middle of Devanagari text.
//
// What is translated and what is not. The words are written the way the address is written
// by hand in each script (the building and area names are transliterated, "Main Road" and
// "Near" are translated). The institute's short name "LIMS", the PIN code and every phone
// number stay in Latin digits and letters: that is how they are printed on the building and
// on the stationery, and how a visitor will match them.
//
// Unreviewed. Spellings of place names here are a best effort and should be confirmed by
// LIMS along with the doctor names in lib/doctors-i18n.ts.

import type { Locale } from '@/i18n/routing'
import type { Location } from '@/types'
import { primaryLocation, shortAddress, siteConfig } from '@/lib/site-config'

export interface SiteText {
  /** "Lifeline Institute of Medical Sciences" */
  name: string
  /** "Hisar" */
  city: string
  /** "LIMS Hisar" */
  locationName: string
  tagline: readonly [string, string, string]
  description: string
  /** "Jindal Chowk, Hisar, Haryana" */
  shortAddress: string
}

const TRANSLATED: Record<Exclude<Locale, 'en'>, SiteText> = {
  hi: {
    name: 'लाइफलाइन इंस्टीट्यूट ऑफ मेडिकल साइंसेज',
    city: 'हिसार',
    locationName: 'LIMS हिसार',
    tagline: ['करुणा', 'उत्कृष्टता', 'देखभाल'],
    description:
      'जिंदल चौक, हिसार, हरियाणा में मल्टी-स्पेशियलिटी अस्पताल: आपातकालीन देखभाल, सर्जरी, ' +
      'ऑर्थोपेडिक्स, प्रसूति एवं स्त्री रोग, और उसी परिसर में जांच, इमेजिंग व पैथोलॉजी।',
    shortAddress: 'जिंदल चौक, हिसार, हरियाणा',
  },
  pa: {
    name: 'ਲਾਈਫਲਾਈਨ ਇੰਸਟੀਚਿਊਟ ਆਫ਼ ਮੈਡੀਕਲ ਸਾਇੰਸਿਜ਼',
    city: 'ਹਿਸਾਰ',
    locationName: 'LIMS ਹਿਸਾਰ',
    tagline: ['ਹਮਦਰਦੀ', 'ਉੱਤਮਤਾ', 'ਦੇਖਭਾਲ'],
    description:
      'ਜਿੰਦਲ ਚੌਂਕ, ਹਿਸਾਰ, ਹਰਿਆਣਾ ਵਿੱਚ ਮਲਟੀ-ਸਪੈਸ਼ਲਿਟੀ ਹਸਪਤਾਲ: ਐਮਰਜੈਂਸੀ ਦੇਖਭਾਲ, ਸਰਜਰੀ, ' +
      'ਆਰਥੋਪੈਡਿਕਸ, ਪ੍ਰਸੂਤੀ ਅਤੇ ਇਸਤਰੀ ਰੋਗ, ਅਤੇ ਉਸੇ ਕੈਂਪਸ ਵਿੱਚ ਜਾਂਚ, ਇਮੇਜਿੰਗ ਅਤੇ ਪੈਥੋਲੋਜੀ।',
    shortAddress: 'ਜਿੰਦਲ ਚੌਂਕ, ਹਿਸਾਰ, ਹਰਿਆਣਾ',
  },
}

const ENGLISH: SiteText = {
  name: siteConfig.name,
  city: siteConfig.city,
  locationName: primaryLocation.name,
  tagline: siteConfig.tagline,
  description: siteConfig.description,
  shortAddress,
}

/** The hospital's name, tagline, description and short address in the given language. */
export function siteText(locale: Locale): SiteText {
  return locale === 'en' ? ENGLISH : TRANSLATED[locale]
}

const ADDRESS: Record<Exclude<Locale, 'en'>, { lines: string[]; city: string; state: string }> = {
  hi: {
    lines: [
      'जिंदल हॉस्पिटल',
      'प्लॉट नं. 6, मेन रोड',
      'जिंदल चौक के पास - रायपुर रोड',
      'दयानंद कॉलोनी',
      'न्यू मॉडल टाउन एक्सटेंशन, मॉडल टाउन',
    ],
    city: 'हिसार',
    state: 'हरियाणा',
  },
  pa: {
    lines: [
      'ਜਿੰਦਲ ਹਸਪਤਾਲ',
      'ਪਲਾਟ ਨੰ. 6, ਮੇਨ ਰੋਡ',
      'ਜਿੰਦਲ ਚੌਂਕ ਨੇੜੇ - ਰਾਏਪੁਰ ਰੋਡ',
      'ਦਯਾਨੰਦ ਕਲੋਨੀ',
      'ਨਿਊ ਮਾਡਲ ਟਾਊਨ ਐਕਸਟੈਂਸ਼ਨ, ਮਾਡਲ ਟਾਊਨ',
    ],
    city: 'ਹਿਸਾਰ',
    state: 'ਹਰਿਆਣਾ',
  },
}

/**
 * The hospital's location with the address lines, city and state in the given language.
 * Coordinates, phone numbers, the PIN code and the id are the same in every language, so
 * `fullAddress(localizedLocation(locale))` is a drop-in for `fullAddress()`.
 */
export function localizedLocation(locale: Locale): Location {
  if (locale === 'en') return primaryLocation
  const address = ADDRESS[locale]
  return {
    ...primaryLocation,
    name: TRANSLATED[locale].locationName,
    addressLines: address.lines,
    city: address.city,
    state: address.state,
  }
}
