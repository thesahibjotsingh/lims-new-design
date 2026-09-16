// lib/services-i18n.ts
//
// Hindi/Punjabi department and category names, kept separate from
// lib/services.ts on purpose — that file is the canonical English catalogue
// that slugs, hrefs and structured data all key off, and every existing
// consumer destructures `{ slug, name, category }` from it. Reshaping `name`
// into a per-locale object would break all of them for one feature. Instead
// this is a lookup BY slug, consulted only where a translated label is
// wanted, and it falls back to the English canonical name for anything not
// translated yet — which for department/service names should be nothing,
// since Phase 1 translates the full catalogue, but the fallback keeps a
// slug added later from rendering blank instead of in English.
//
// Best-effort translation, not verified by LIMS — see the note in the
// trilingual plan. Unlike doctor names/registration numbers/qualifications
// (lib/doctors.ts, deliberately left English — proper nouns and
// standardised abbreviations, not descriptive copy), department names ARE
// descriptive terms patients actually search for in their own language, so
// they get translated.

import type { Locale } from '@/i18n/routing'
import type { ServiceCategory } from '@/lib/services'
import { getCategory, getService } from '@/lib/services'

const SERVICE_NAMES: Record<string, Partial<Record<Locale, string>>> = {
  'emergency-services': { hi: 'आपातकालीन सेवाएं', pa: 'ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ' },
  'general-medicine': { hi: 'जनरल मेडिसिन', pa: 'ਜਨਰਲ ਮੈਡੀਸਨ' },
  'ortho-joint-replacement': {
    hi: 'ऑर्थो एवं ज्वाइंट रिप्लेसमेंट',
    pa: 'ਆਰਥੋ ਅਤੇ ਜੋੜ ਬਦਲਣਾ',
  },
  'obstetrics-gynaecology': {
    hi: 'प्रसूति एवं स्त्री रोग',
    pa: 'ਪ੍ਰਸੂਤੀ ਅਤੇ ਇਸਤਰੀ ਰੋਗ',
  },
  'paediatrics-neonatology': {
    hi: 'बाल रोग एवं नवजात शिशु देखभाल',
    pa: 'ਬਾਲ ਰੋਗ ਅਤੇ ਨਵਜੰਮੇ ਬੱਚਿਆਂ ਦੀ ਦੇਖਭਾਲ',
  },
  neurosurgery: { hi: 'न्यूरोसर्जरी', pa: 'ਨਿਊਰੋਸਰਜਰੀ' },
  gastroenterology: { hi: 'गैस्ट्रोएंटेरोलॉजी', pa: 'ਗੈਸਟਰੋਐਂਟਰੌਲੋਜੀ' },
  urology: { hi: 'यूरोलॉजी', pa: 'ਯੂਰੋਲੋਜੀ' },
  'spine-surgery': { hi: 'स्पाइन सर्जरी', pa: 'ਸਪਾਈਨ ਸਰਜਰੀ' },
  ophthalmology: { hi: 'नेत्र रोग (ऑप्थल्मोलॉजी)', pa: 'ਅੱਖਾਂ ਦੇ ਰੋਗ' },
  ent: { hi: 'ईएनटी (कान, नाक, गला)', pa: 'ENT (ਕੰਨ, ਨੱਕ, ਗਲਾ)' },
  dentistry: { hi: 'दंत चिकित्सा', pa: 'ਦੰਦਾਂ ਦਾ ਇਲਾਜ' },
  'anaesthesia-pain-management': {
    hi: 'एनेस्थीसिया एवं दर्द प्रबंधन',
    pa: 'ਅਨੱਸਥੀਸੀਆ ਅਤੇ ਦਰਦ ਪ੍ਰਬੰਧਨ',
  },
  'general-laparoscopic-surgery': {
    hi: 'जनरल एवं लेप्रोस्कोपिक सर्जरी',
    pa: 'ਜਨਰਲ ਅਤੇ ਲੈਪਰੋਸਕੋਪਿਕ ਸਰਜਰੀ',
  },
  'trauma-management': { hi: 'ट्रॉमा प्रबंधन', pa: 'ਟਰਾਮਾ ਪ੍ਰਬੰਧਨ' },
  endoscopy: { hi: 'एंडोस्कोपी', pa: 'ਐਂਡੋਸਕੋਪੀ' },
  'radiology-imaging': { hi: 'रेडियोलॉजी एवं इमेजिंग', pa: 'ਰੇਡੀਓਲੋਜੀ ਅਤੇ ਇਮੇਜਿੰਗ' },
  'ct-scan-x-ray': { hi: 'सीटी स्कैन / एक्स-रे', pa: 'ਸੀਟੀ ਸਕੈਨ / ਐਕਸ-ਰੇ' },
  ultrasound: { hi: 'अल्ट्रासाउंड', pa: 'ਅਲਟਰਾਸਾਊਂਡ' },
  'color-doppler': { hi: 'कलर डॉपलर', pa: 'ਕਲਰ ਡੌਪਲਰ' },
  'echocardiogram-tmt': {
    hi: 'इकोकार्डियोग्राम / टीएमटी',
    pa: 'ਇਕੋਕਾਰਡੀਓਗ੍ਰਾਮ / ਟੀਐਮਟੀ',
  },
  'pathology-microbiology': {
    hi: 'पैथोलॉजी एवं माइक्रोबायोलॉजी',
    pa: 'ਪੈਥੋਲੋਜੀ ਅਤੇ ਮਾਈਕਰੋਬਾਇਓਲੋਜੀ',
  },
  'physiotherapy-rehabilitation': {
    hi: 'फिजियोथेरेपी एवं पुनर्वास',
    pa: 'ਫਿਜ਼ੀਓਥੈਰੇਪੀ ਅਤੇ ਮੁੜ-ਵਸੇਬਾ',
  },
  'dietetics-nutrition': { hi: 'आहार एवं पोषण', pa: 'ਖੁਰਾਕ ਅਤੇ ਪੋਸ਼ਣ' },
  pharmacy: { hi: 'फार्मेसी', pa: 'ਫਾਰਮੇਸੀ' },
  ambulance: { hi: 'एम्बुलेंस', pa: 'ਐਂਬੂਲੈਂਸ' },
}

const CATEGORY_TITLES: Record<ServiceCategory, Partial<Record<Locale, string>>> = {
  clinical: { hi: 'विशेषज्ञताएं', pa: 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ' },
  diagnostics: { hi: 'डायग्नोस्टिक्स एवं इमेजिंग', pa: 'ਡਾਇਗਨੌਸਟਿਕਸ ਅਤੇ ਇਮੇਜਿੰਗ' },
  support: { hi: 'रोगी देखभाल', pa: 'ਮਰੀਜ਼ ਦੇਖਭਾਲ' },
}

// `name` (used by the Footer's grouping heading and /centres) rather than
// `pageTitle` (the category's own page H1, translatedCategoryTitle above) —
// the two differ for `clinical` and `support`, see the note on this field
// in lib/services.ts.
const CATEGORY_NAMES: Record<ServiceCategory, Partial<Record<Locale, string>>> = {
  clinical: { hi: 'क्लिनिकल विभाग', pa: 'ਕਲੀਨਿਕਲ ਵਿਭਾਗ' },
  diagnostics: { hi: 'डायग्नोस्टिक्स एवं इमेजिंग', pa: 'ਡਾਇਗਨੌਸਟਿਕਸ ਅਤੇ ਇਮੇਜਿੰਗ' },
  support: { hi: 'रोगी सहायता सेवाएं', pa: 'ਮਰੀਜ਼ ਸਹਾਇਤਾ ਸੇਵਾਵਾਂ' },
}

const CATEGORY_BLURBS: Record<ServiceCategory, Partial<Record<Locale, string>>> = {
  clinical: {
    hi: 'विशेषज्ञ टीमें जिनसे आप परामर्श लेते हैं, जिनके लिए आपको रेफर किया जाता है, या जिनके अंतर्गत आप भर्ती होते हैं।',
    pa: 'ਮਾਹਿਰ ਟੀਮਾਂ ਜਿਨ੍ਹਾਂ ਨਾਲ ਤੁਸੀਂ ਸਲਾਹ ਕਰਦੇ ਹੋ, ਜਿਨ੍ਹਾਂ ਲਈ ਤੁਹਾਨੂੰ ਭੇਜਿਆ ਜਾਂਦਾ ਹੈ, ਜਾਂ ਜਿਨ੍ਹਾਂ ਅਧੀਨ ਤੁਸੀਂ ਦਾਖਲ ਹੁੰਦੇ ਹੋ।',
  },
  diagnostics: {
    hi: 'जांच और स्कैन, आमतौर पर डॉक्टर के रेफरल पर।',
    pa: "ਟੈਸਟ ਅਤੇ ਸਕੈਨ, ਆਮ ਤੌਰ 'ਤੇ ਡਾਕਟਰ ਦੇ ਰੈਫਰਲ 'ਤੇ।",
  },
  support: {
    hi: 'वे सेवाएं जो आपके उपचार के साथ-साथ चलती हैं।',
    pa: 'ਉਹ ਸੇਵਾਵਾਂ ਜੋ ਤੁਹਾਡੇ ਇਲਾਜ ਦੇ ਨਾਲ-ਨਾਲ ਚੱਲਦੀਆਂ ਹਨ।',
  },
}

/** Translated service name for a slug, falling back to the English canonical name. */
export function translatedServiceName(slug: string, locale: Locale): string {
  if (locale === 'en') return getService(slug)?.name ?? slug
  return SERVICE_NAMES[slug]?.[locale] ?? getService(slug)?.name ?? slug
}

/** Translated category page title (what SERVICE_CATEGORIES calls `pageTitle`). */
export function translatedCategoryTitle(category: ServiceCategory, locale: Locale): string {
  if (locale === 'en') return getCategory(category).pageTitle
  return CATEGORY_TITLES[category]?.[locale] ?? getCategory(category).pageTitle
}

/** Translated one-line category blurb. */
export function translatedCategoryBlurb(category: ServiceCategory, locale: Locale): string {
  if (locale === 'en') return getCategory(category).blurb
  return CATEGORY_BLURBS[category]?.[locale] ?? getCategory(category).blurb
}

/** Translated category `name` (the grouping heading, not the page's own H1). */
export function translatedCategoryName(category: ServiceCategory, locale: Locale): string {
  if (locale === 'en') return getCategory(category).name
  return CATEGORY_NAMES[category]?.[locale] ?? getCategory(category).name
}
