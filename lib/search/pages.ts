// lib/search/pages.ts
//
// The non-medical things a visitor searches for: the hospital's phone number, where it is, how to
// book, the emergency number, the ABHA ID, visiting hours, prices. Each is one search entry that goes
// to a page, a phone call, a map or a chat.
//
// Everything stated here is something the site already states elsewhere (lib/site-config.ts and the
// Contact page). Where the hospital has not published an answer (visiting hours, prices, insurance), the
// entry says so and points to the phone number instead of guessing, exactly as the pages do.
//
// UNREVIEWED: the Hindi and Punjabi wording, like the pages it mirrors.

import type { Locale } from '@/i18n/routing'
import { abhaUrl, contact, directionsUrl, openAllHours, whatsappUrl } from '@/lib/site-config'
import type { SearchDoc } from '@/lib/search/types'

type Local = { title: string; detail: string }

interface Entry {
  id: string
  kind: SearchDoc['kind']
  href: string
  external?: boolean
  keys: string
  en: Local
  hi: Local
  pa: Local
  role?: SearchDoc['role']
  fallback?: number
  pop?: number
  boost?: number
}

function entries(whatsappMessage: string): Entry[] {
  const call = contact.secondaryDisplay
  const emergency = contact.primaryDisplay
  return [
    {
      id: 'action:emergency',
      kind: 'action',
      href: `tel:${contact.primary}`,
      external: true,
      role: 'emergency',
      fallback: 6,
      pop: 2,
      boost: 1.3,
      keys:
        'emergency call emergency number emergency helpline ambulance casualty urgent accident critical 24x7 ' +
        'help now save life ' + contact.primaryDisplay.replace(/\D/g, ''),
      en: { title: `Emergency: call ${emergency}`, detail: 'Emergency Services, 24 hours' },
      hi: { title: `आपातकाल: ${emergency} पर कॉल करें`, detail: 'इमरजेंसी सेवाएं, 24 घंटे' },
      pa: { title: `ਐਮਰਜੈਂਸੀ: ${emergency} ’ਤੇ ਕਾਲ ਕਰੋ`, detail: 'ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ, 24 ਘੰਟੇ' },
    },
    {
      id: 'action:call',
      kind: 'action',
      href: `tel:${contact.secondary}`,
      external: true,
      fallback: 1,
      keys:
        'call phone number contact number helpline mobile telephone landline reception enquiry inquiry ' +
        'appointment number booking number talk to someone speak reports report medical reports lab report ' +
        'test report discharge summary records medical records file copy ' + contact.secondaryDisplay.replace(/\D/g, ''),
      en: { title: `Call the hospital: ${call}`, detail: 'Appointments and enquiries' },
      hi: { title: `अस्पताल को कॉल करें: ${call}`, detail: 'अपॉइंटमेंट और पूछताछ' },
      pa: { title: `ਹਸਪਤਾਲ ਨੂੰ ਕਾਲ ਕਰੋ: ${call}`, detail: 'ਅਪਾਇੰਟਮੈਂਟ ਅਤੇ ਪੁੱਛਗਿੱਛ' },
    },
    {
      id: 'page:appointments',
      kind: 'page',
      href: '/appointments',
      fallback: 2,
      pop: 1,
      keys:
        'book booking appointment appointments opd slot consultation consult visit register registration token ' +
        'meet see tomorrow today next week change reschedule postpone modify time',
      en: { title: 'Book an appointment', detail: 'Choose a doctor and book online' },
      hi: { title: 'अपॉइंटमेंट बुक करें', detail: 'डॉक्टर चुनें और ऑनलाइन बुक करें' },
      pa: { title: 'ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ', detail: 'ਡਾਕਟਰ ਚੁਣੋ ਅਤੇ ਆਨਲਾਈਨ ਬੁੱਕ ਕਰੋ' },
    },
    {
      id: 'page:doctors',
      kind: 'page',
      href: '/doctors',
      fallback: 4,
      pop: 3,
      keys:
        'doctor doctors consultant consultants physician specialist roster directory find a doctor which doctor ' +
        'list of doctors all doctors doctor list doctors list available availability senior team meet',
      en: { title: 'Find a doctor', detail: 'The consultants and their departments' },
      hi: { title: 'डॉक्टर खोजें', detail: 'परामर्शदाता और उनके विभाग' },
      pa: { title: 'ਡਾਕਟਰ ਲੱਭੋ', detail: 'ਸਲਾਹਕਾਰ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਵਿਭਾਗ' },
    },
    {
      id: 'action:directions',
      kind: 'action',
      href: directionsUrl ?? '/contact',
      external: Boolean(directionsUrl),
      pop: 4,
      keys:
        'directions direction map route how to reach how to come where is location address navigate google maps ' +
        'jindal chowk hisar haryana near me way',
      en: { title: 'Get directions', detail: 'Open Google Maps to LIMS Hisar, Jindal Chowk' },
      hi: { title: 'दिशा-निर्देश पाएं', detail: 'LIMS हिसार, जिंदल चौक के लिए Google Maps खोलें' },
      pa: { title: 'ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼ ਲਓ', detail: 'LIMS ਹਿਸਾਰ, ਜਿੰਦਲ ਚੌਕ ਲਈ Google Maps ਖੋਲ੍ਹੋ' },
    },
    {
      id: 'action:whatsapp',
      kind: 'action',
      href: whatsappUrl(whatsappMessage),
      external: true,
      keys: 'whatsapp chat message msg text write to us send message talk online',
      en: { title: 'Chat on WhatsApp', detail: `Message the hospital on ${call}` },
      hi: { title: 'WhatsApp पर चैट करें', detail: `${call} पर अस्पताल को संदेश भेजें` },
      pa: { title: 'WhatsApp ’ਤੇ ਚੈਟ ਕਰੋ', detail: `${call} ’ਤੇ ਹਸਪਤਾਲ ਨੂੰ ਸੁਨੇਹਾ ਭੇਜੋ` },
    },
    {
      id: 'page:contact',
      kind: 'page',
      href: '/contact',
      keys: 'contact contact us phone number address location email reach enquiry reception helpline parking park vehicle',
      en: { title: 'Contact LIMS', detail: 'Phone numbers, address and directions' },
      hi: { title: 'LIMS से संपर्क करें', detail: 'फ़ोन नंबर, पता और दिशा-निर्देश' },
      pa: { title: 'LIMS ਨਾਲ ਸੰਪਰਕ ਕਰੋ', detail: 'ਫ਼ੋਨ ਨੰਬਰ, ਪਤਾ ਅਤੇ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼' },
    },
    {
      id: 'info:timings',
      kind: 'info',
      href: '/contact',
      keys:
        'hospital timing hospital timings opening hours open closed hours of operation what time sunday holiday ' +
        'night 24 hours 24x7 round the clock when baje khulta kab',
      en: {
        title: 'Hospital timings',
        detail: openAllHours
          ? 'Open 24 hours. OPD days and timings are on each doctor’s page'
          : 'OPD days and timings are on each doctor’s page',
      },
      hi: {
        title: 'अस्पताल का समय',
        detail: openAllHours
          ? '24 घंटे खुला। ओपीडी के दिन और समय हर डॉक्टर के पेज पर हैं'
          : 'ओपीडी के दिन और समय हर डॉक्टर के पेज पर हैं',
      },
      pa: {
        title: 'ਹਸਪਤਾਲ ਦਾ ਸਮਾਂ',
        detail: openAllHours
          ? '24 ਘੰਟੇ ਖੁੱਲ੍ਹਾ। ਓਪੀਡੀ ਦੇ ਦਿਨ ਅਤੇ ਸਮਾਂ ਹਰ ਡਾਕਟਰ ਦੇ ਪੰਨੇ ’ਤੇ ਹਨ'
          : 'ਓਪੀਡੀ ਦੇ ਦਿਨ ਅਤੇ ਸਮਾਂ ਹਰ ਡਾਕਟਰ ਦੇ ਪੰਨੇ ’ਤੇ ਹਨ',
      },
    },
    {
      id: 'page:visitors',
      kind: 'page',
      href: '/patient-care/visitors',
      keys:
        'visitor visitors visiting hours visiting time visit patient attendant attendants pass visiting pass ward ' +
        'room icu visiting admission admitted discharge',
      en: { title: 'Visitor information', detail: 'Visiting hours and ward policy' },
      hi: { title: 'आगंतुक जानकारी', detail: 'मिलने का समय और वार्ड नीति' },
      pa: { title: 'ਮੁਲਾਕਾਤੀ ਜਾਣਕਾਰੀ', detail: 'ਮਿਲਣ ਦਾ ਸਮਾਂ ਅਤੇ ਵਾਰਡ ਨੀਤੀ' },
    },
    {
      id: 'info:prices',
      kind: 'info',
      href: '/contact',
      keys:
        'price prices cost charges fee fees rate rates how much billing bill payment pay discount free ' +
        'doctor fee doctor visit fee consultation fee consultation charges opd fee opd charges visit charges',
      en: { title: 'Prices and billing', detail: 'Not published online: please call the hospital' },
      hi: { title: 'शुल्क और बिलिंग', detail: 'ऑनलाइन उपलब्ध नहीं: कृपया अस्पताल को कॉल करें' },
      pa: { title: 'ਫੀਸ ਅਤੇ ਬਿਲਿੰਗ', detail: 'ਆਨਲਾਈਨ ਉਪਲਬਧ ਨਹੀਂ: ਕਿਰਪਾ ਕਰਕੇ ਹਸਪਤਾਲ ਨੂੰ ਕਾਲ ਕਰੋ' },
    },
    {
      id: 'info:insurance',
      kind: 'info',
      href: '/contact',
      keys:
        'insurance mediclaim cashless tpa cghs ayushman ayushman bharat pmjay health card esi esic policy claim ' +
        'reimbursement',
      en: { title: 'Insurance and cashless treatment', detail: 'Ask the hospital what is accepted' },
      hi: { title: 'बीमा और कैशलेस इलाज', detail: 'अस्पताल से पूछें कि क्या स्वीकार है' },
      pa: { title: 'ਬੀਮਾ ਅਤੇ ਕੈਸ਼ਲੈੱਸ ਇਲਾਜ', detail: 'ਹਸਪਤਾਲ ਤੋਂ ਪੁੱਛੋ ਕੀ ਮਨਜ਼ੂਰ ਹੈ' },
    },
    {
      id: 'action:abha',
      kind: 'action',
      href: abhaUrl,
      external: true,
      keys:
        'abha abha id abha card abha number health id health account abdm digital health id ayushman bharat ' +
        'health account create abha',
      en: { title: 'Create your ABHA ID', detail: 'On the government’s own ABHA website' },
      hi: { title: 'अपना ABHA ID बनाएं', detail: 'सरकार की अपनी ABHA वेबसाइट पर' },
      pa: { title: 'ਆਪਣੀ ABHA ID ਬਣਾਓ', detail: 'ਸਰਕਾਰ ਦੀ ਆਪਣੀ ABHA ਵੈੱਬਸਾਈਟ ’ਤੇ' },
    },
    {
      id: 'page:specialities',
      kind: 'page',
      href: '/specialities',
      fallback: 5,
      keys:
        'specialities specialties departments department clinical departments all departments which department ' +
        'specialist doctor specialist doctors specialists',
      en: { title: 'All departments', detail: 'The specialities and clinical departments' },
      hi: { title: 'सभी विभाग', detail: 'विशेषज्ञताएं और क्लिनिकल विभाग' },
      pa: { title: 'ਸਾਰੇ ਵਿਭਾਗ', detail: 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਅਤੇ ਕਲੀਨਿਕਲ ਵਿਭਾਗ' },
    },
    {
      id: 'page:diagnostics',
      kind: 'page',
      href: '/services',
      keys: 'tests scans diagnostics diagnostic imaging lab laboratory radiology investigations all tests',
      en: { title: 'Tests and scans', detail: 'Diagnostics and imaging' },
      hi: { title: 'जांच और स्कैन', detail: 'डायग्नोस्टिक्स और इमेजिंग' },
      pa: { title: 'ਜਾਂਚ ਅਤੇ ਸਕੈਨ', detail: 'ਡਾਇਗਨੌਸਟਿਕਸ ਅਤੇ ਇਮੇਜਿੰਗ' },
    },
    {
      id: 'page:patient-care',
      kind: 'page',
      href: '/patient-care',
      keys: 'patient care support services physiotherapy dietetics pharmacy ambulance services alongside treatment',
      en: { title: 'Patient care', detail: 'Services alongside treatment' },
      hi: { title: 'रोगी देखभाल', detail: 'उपचार के साथ चलने वाली सेवाएं' },
      pa: { title: 'ਮਰੀਜ਼ ਦੇਖਭਾਲ', detail: 'ਇਲਾਜ ਦੇ ਨਾਲ ਚੱਲਣ ਵਾਲੀਆਂ ਸੇਵਾਵਾਂ' },
    },
    {
      id: 'page:health-library',
      kind: 'page',
      href: '/health-library',
      keys: 'health library article articles information advice tips reading guide learn blog',
      en: { title: 'Health library', detail: 'Clinically reviewed articles' },
      hi: { title: 'स्वास्थ्य पुस्तकालय', detail: 'चिकित्सकीय रूप से समीक्षित लेख' },
      pa: { title: 'ਸਿਹਤ ਲਾਇਬ੍ਰੇਰੀ', detail: 'ਡਾਕਟਰੀ ਤੌਰ ’ਤੇ ਪਰਖੇ ਹੋਏ ਲੇਖ' },
    },
    {
      id: 'page:about',
      kind: 'page',
      href: '/about',
      keys: 'about hospital lims lifeline institute of medical sciences about us who we are history team hisar',
      en: { title: 'About LIMS', detail: 'The hospital' },
      hi: { title: 'LIMS के बारे में', detail: 'अस्पताल' },
      pa: { title: 'LIMS ਬਾਰੇ', detail: 'ਹਸਪਤਾਲ' },
    },
  ]
}

export function pageDocs(locale: Locale, whatsappMessage: string): SearchDoc[] {
  return entries(whatsappMessage).map((entry) => {
    const text = entry[locale]
    return {
      id: entry.id,
      kind: entry.kind,
      title: text.title,
      detail: text.detail,
      href: entry.href,
      external: entry.external,
      // The English title and detail are matched on every language's page, so "directions" works on
      // the Hindi site and "निर्देश" works on the English one.
      keys: `${entry.keys} ${entry.en.title} ${entry.en.detail}`,
      role: entry.role,
      fallback: entry.fallback,
      pop: entry.pop,
      boost: entry.boost,
    }
  })
}
