// scripts/search-eval.ts
//
// Measures the site search against questions a patient would actually type. Run it after changing
// anything in lib/search/ (the vocabulary in groups.ts, the topics, the ranking in engine.ts):
//
//   npx tsx scripts/search-eval.ts            all cases, failures listed
//   npx tsx scripts/search-eval.ts -v         every case, with what came back
//   npx tsx scripts/search-eval.ts stomach    only cases whose query contains "stomach"
//
// A case PASSES when one of the things it expects is among the first N results. Expectations are
// ids: "svc:<department slug>" (a department; a section of that department's page counts too),
// "doc:<doctor id>", "action:call", "page:contact", and so on. A case written with `none: true`
// expects nothing relevant to exist, and passes when the engine still returns somewhere to go.
//
// This file is a safety net for the vocabulary, not a clinical reference: the expectations say
// "this word should reach this page", never "this word means this condition".

import { buildSearchDocs } from '@/lib/search/build-docs'
import { createEngine } from '@/lib/search/engine'
import type { SearchEngine } from '@/lib/search/engine'
import type { SearchHit } from '@/lib/search/types'

type Locale = 'en' | 'hi' | 'pa'

interface Case {
  q: string
  /** Any of these among the first `top` results is a pass. */
  expect?: string[]
  /** No relevant page exists: pass when the engine returns somewhere to go. */
  none?: boolean
  /** The emergency card must be first. */
  emergency?: boolean
  locale?: Locale
  top?: number
}

const GAS = 'svc:gastroenterology'
const GEN = 'svc:general-medicine'
const SURG = 'svc:general-laparoscopic-surgery'
const ORTHO = 'svc:ortho-joint-replacement'
const SPINE = 'svc:spine-surgery'
const NEURO = 'svc:neurosurgery'
const URO = 'svc:urology'
const OBG = 'svc:obstetrics-gynaecology'
const PED = 'svc:paediatrics-neonatology'
const EYE = 'svc:ophthalmology'
const ENT = 'svc:ent'
const DENT = 'svc:dentistry'
const ANAES = 'svc:anaesthesia-pain-management'
const TRAUMA = 'svc:trauma-management'
const ER = 'svc:emergency-services'
const XRAY = 'svc:ct-scan-x-ray'
const USG = 'svc:ultrasound'
const DOPP = 'svc:color-doppler'
const ECHO = 'svc:echocardiogram-tmt'
const LAB = 'svc:pathology-microbiology'
const ENDO = 'svc:endoscopy'
const RAD = 'svc:radiology-imaging'
const PHYSIO = 'svc:physiotherapy-rehabilitation'
const DIET = 'svc:dietetics-nutrition'
const PHARM = 'svc:pharmacy'
const AMB = 'svc:ambulance'

const CASES: Case[] = [
  /* ------------------------------------------------------------- digestive, English */
  { q: 'stomach', expect: [GAS] },
  { q: 'stomach pain', expect: [GAS] },
  { q: 'tummy ache', expect: [GAS] },
  { q: 'belly pain', expect: [GAS, SURG] },
  { q: 'abdominal pain', expect: [GAS, SURG] },
  { q: 'acidity', expect: [GAS] },
  { q: 'heartburn', expect: [GAS] },
  { q: 'gas problem', expect: [GAS] },
  { q: 'bloating', expect: [GAS] },
  { q: 'indigestion', expect: [GAS] },
  { q: 'constipation', expect: [GAS] },
  { q: 'loose motions', expect: [GAS, GEN, PED] },
  { q: 'diarrhea', expect: [GAS, GEN, PED] },
  { q: 'vomiting', expect: [GAS, GEN, PED] },
  { q: 'liver', expect: [GAS] },
  { q: 'fatty liver', expect: [GAS] },
  { q: 'jaundice', expect: [GAS] },
  { q: 'stomach ulcer', expect: [GAS] },
  { q: 'colonoscopy', expect: [GAS, ENDO] },
  { q: 'endoscopy', expect: [ENDO] },
  { q: 'piles', expect: [SURG] },
  { q: 'hernia', expect: [SURG] },
  { q: 'appendix', expect: [SURG] },
  { q: 'gallstone', expect: [SURG] },
  { q: 'gall bladder', expect: [SURG] },
  { q: 'fissure', expect: [SURG] },
  { q: 'laparoscopic surgery', expect: [SURG] },
  { q: 'keyhole surgery', expect: [SURG] },
  { q: 'stomach doctor', expect: [GAS] },

  /* ------------------------------------------------ heart, fever, general, English */
  { q: 'heart', expect: [ECHO, GEN] },
  { q: 'heart problem', expect: [ECHO, GEN] },
  { q: 'heart checkup', expect: [ECHO] },
  { q: 'chest pain', emergency: true, expect: [ER] },
  { q: 'heart attack', emergency: true, expect: [ER] },
  { q: 'ecg', expect: [ECHO] },
  { q: 'echo', expect: [ECHO] },
  { q: 'tmt test', expect: [ECHO] },
  { q: 'blood pressure', expect: [GEN] },
  { q: 'bp', expect: [GEN] },
  { q: 'hypertension', expect: [GEN] },
  { q: 'cholesterol', expect: [GEN, LAB] },
  { q: 'fever', expect: [GEN, PED] },
  { q: 'cold and cough', expect: [GEN, PED] },
  { q: 'cough', expect: [GEN, PED] },
  { q: 'flu', expect: [GEN] },
  { q: 'typhoid', expect: [GEN, LAB] },
  { q: 'dengue', expect: [GEN, LAB] },
  { q: 'malaria', expect: [GEN, LAB] },
  { q: 'diabetes', expect: [GEN, DIET] },
  { q: 'sugar', expect: [GEN, DIET, LAB] },
  { q: 'thyroid', expect: [GEN, LAB, SURG] },
  { q: 'weakness', expect: [GEN] },
  { q: 'asthma', expect: [GEN, PED] },
  { q: 'body checkup', expect: [GEN, 'info:prices'] },
  { q: 'full body checkup', expect: [GEN, 'info:prices', LAB] },
  { q: 'physician', expect: [GEN] },

  /* ------------------------------------------------------------- bones and spine */
  { q: 'bone', expect: [ORTHO] },
  { q: 'bone doctor', expect: [ORTHO, 'doc:harshal-godara'] },
  { q: 'fracture', expect: [ORTHO, TRAUMA] },
  { q: 'broken bone', expect: [ORTHO, TRAUMA] },
  { q: 'knee pain', expect: [ORTHO, PHYSIO] },
  { q: 'knee replacement', expect: [ORTHO] },
  { q: 'hip replacement', expect: [ORTHO] },
  { q: 'joint pain', expect: [ORTHO, PHYSIO] },
  { q: 'arthritis', expect: [ORTHO] },
  { q: 'shoulder pain', expect: [ORTHO, PHYSIO] },
  { q: 'heel pain', expect: [ORTHO] },
  { q: 'sports injury', expect: [ORTHO, PHYSIO] },
  { q: 'back pain', expect: [SPINE, ORTHO, PHYSIO] },
  { q: 'slip disc', expect: [SPINE, NEURO] },
  { q: 'sciatica', expect: [SPINE, NEURO] },
  { q: 'neck pain', expect: [SPINE, ORTHO, PHYSIO] },
  { q: 'spine surgeon', expect: [SPINE] },
  { q: 'orthopedic', expect: [ORTHO, 'doc:harshal-godara'] },
  { q: 'orthopaedic surgeon', expect: [ORTHO, 'doc:harshal-godara'] },

  /* ------------------------------------------------------------------- brain, nerves */
  { q: 'headache', expect: [NEURO] },
  { q: 'migraine', expect: [NEURO] },
  { q: 'brain tumor', expect: [NEURO] },
  { q: 'brain tumour', expect: [NEURO] },
  { q: 'head injury', expect: [NEURO, TRAUMA, ER] },
  { q: 'stroke', emergency: true, expect: [ER] },
  { q: 'paralysis', emergency: true, expect: [ER] },
  { q: 'fits', emergency: true, expect: [ER] },
  { q: 'epilepsy', expect: [NEURO, ER] },
  { q: 'numbness', expect: [NEURO, SPINE] },
  { q: 'neurosurgeon', expect: [NEURO] },

  /* ---------------------------------------------------------------------- kidney, urine */
  { q: 'kidney stone', expect: [URO] },
  { q: 'urine infection', expect: [URO] },
  { q: 'burning urination', expect: [URO] },
  { q: 'prostate', expect: [URO] },
  { q: 'blood in urine', expect: [URO] },
  { q: 'urine problem', expect: [URO] },
  { q: 'kidney', expect: [URO] },
  { q: 'urologist', expect: [URO] },

  /* ----------------------------------------------------------- women and pregnancy */
  { q: 'pregnancy', expect: [OBG] },
  { q: 'pregnant', expect: [OBG] },
  { q: 'delivery', expect: [OBG] },
  { q: 'normal delivery', expect: [OBG] },
  { q: 'c section', expect: [OBG] },
  { q: 'periods', expect: [OBG] },
  { q: 'irregular periods', expect: [OBG] },
  { q: 'pcos', expect: [OBG] },
  { q: 'infertility', expect: [OBG] },
  { q: 'ivf', expect: [OBG] },
  { q: 'menopause', expect: [OBG] },
  { q: 'white discharge', expect: [OBG] },
  { q: 'fibroid', expect: [OBG] },
  { q: 'ovarian cyst', expect: [OBG] },
  { q: 'lady doctor', expect: [OBG, 'doc:shweta-godara'] },
  { q: 'women doctor', expect: [OBG, 'doc:shweta-godara'] },
  { q: 'gynecologist', expect: [OBG, 'doc:shweta-godara'] },
  { q: 'gynaecologist', expect: [OBG, 'doc:shweta-godara'] },
  { q: 'gynae', expect: [OBG, 'doc:shweta-godara'] },
  { q: 'baby scan', expect: [USG, OBG] },
  { q: 'pregnancy scan', expect: [USG, OBG] },
  { q: 'miscarriage', expect: [OBG] },
  { q: 'laparoscopic surgery women', expect: [OBG, SURG] },

  /* -------------------------------------------------------------------- children */
  { q: 'child fever', expect: [PED] },
  { q: 'baby', expect: [PED] },
  { q: 'newborn', expect: [PED] },
  { q: 'vaccination', expect: [PED] },
  { q: 'child doctor', expect: [PED] },
  { q: 'pediatrician', expect: [PED] },
  { q: 'kids doctor', expect: [PED] },
  { q: 'nicu', expect: [PED] },
  { q: 'baby not eating', expect: [PED] },
  { q: 'child growth', expect: [PED] },

  /* ------------------------------------------------------------- eye, ear, nose, teeth */
  { q: 'eye', expect: [EYE] },
  { q: 'cataract', expect: [EYE] },
  { q: 'glasses', expect: [EYE] },
  { q: 'eye pain', expect: [EYE] },
  { q: 'vision problem', expect: [EYE] },
  { q: 'eye doctor', expect: [EYE] },
  { q: 'glaucoma', expect: [EYE] },
  { q: 'red eye', expect: [EYE] },
  { q: 'ear pain', expect: [ENT] },
  { q: 'hearing loss', expect: [ENT] },
  { q: 'sinus', expect: [ENT] },
  { q: 'nose bleed', expect: [ENT] },
  { q: 'tonsils', expect: [ENT] },
  { q: 'sore throat', expect: [ENT] },
  { q: 'snoring', expect: [ENT] },
  { q: 'vertigo', expect: [ENT, NEURO] },
  { q: 'ent doctor', expect: [ENT, 'doc:nirmala-goyat'] },
  { q: 'tooth', expect: [DENT] },
  { q: 'toothache', expect: [DENT] },
  { q: 'root canal', expect: [DENT] },
  { q: 'braces', expect: [DENT] },
  { q: 'dentist', expect: [DENT] },
  { q: 'bleeding gums', expect: [DENT] },
  { q: 'wisdom tooth', expect: [DENT] },
  { q: 'cavity', expect: [DENT] },

  /* ---------------------------------------------------- pain, accidents, emergencies */
  { q: 'anesthesia', expect: [ANAES] },
  { q: 'epidural', expect: [ANAES] },
  { q: 'pain relief', expect: [ANAES] },
  { q: 'pain clinic', expect: [ANAES] },
  { q: 'nerve block', expect: [ANAES] },
  { q: 'chronic pain', expect: [ANAES] },
  { q: 'accident', emergency: true, expect: [ER, TRAUMA] },
  { q: 'road accident', emergency: true, expect: [ER, TRAUMA] },
  { q: 'burns', expect: [ER, TRAUMA] },
  { q: 'snake bite', emergency: true, expect: [ER] },
  { q: 'poisoning', emergency: true, expect: [ER] },
  { q: 'unconscious', emergency: true, expect: [ER] },
  { q: 'emergency', expect: [ER, 'action:emergency'] },
  { q: 'trauma', expect: [TRAUMA, ER] },
  { q: 'wound', expect: [TRAUMA, ER] },

  /* ----------------------------------------------------------------- tests and scans */
  { q: 'x ray', expect: [XRAY] },
  { q: 'xray', expect: [XRAY] },
  { q: 'chest x ray', expect: [XRAY] },
  { q: 'ct scan', expect: [XRAY, RAD] },
  { q: 'mri', expect: [RAD, XRAY] },
  { q: 'ultrasound', expect: [USG] },
  { q: 'usg', expect: [USG] },
  { q: 'sonography', expect: [USG] },
  { q: 'doppler', expect: [DOPP] },
  { q: 'varicose veins', expect: [DOPP] },
  { q: 'blood test', expect: [LAB] },
  { q: 'urine test', expect: [LAB] },
  { q: 'culture test', expect: [LAB] },
  { q: 'biopsy', expect: [LAB] },
  { q: 'lab', expect: [LAB] },
  { q: 'pathology', expect: [LAB] },
  { q: 'radiology', expect: [RAD] },
  { q: 'scan', expect: [RAD, XRAY, USG] },
  { q: 'fasting', expect: [LAB, USG, ENDO, XRAY] },
  { q: 'how to prepare for ultrasound', expect: [USG] },

  /* --------------------------------------------------------------- support services */
  { q: 'physiotherapy', expect: [PHYSIO] },
  { q: 'physio', expect: [PHYSIO] },
  { q: 'exercise', expect: [PHYSIO] },
  { q: 'rehab', expect: [PHYSIO] },
  { q: 'diet', expect: [DIET] },
  { q: 'diet plan', expect: [DIET] },
  { q: 'weight loss', expect: [DIET] },
  { q: 'nutritionist', expect: [DIET] },
  { q: 'pharmacy', expect: [PHARM] },
  { q: 'medicines', expect: [PHARM] },
  { q: 'medical store', expect: [PHARM] },
  { q: 'ambulance', expect: [AMB, 'action:emergency'] },

  /* ---------------------------------------------------------------------- doctors */
  { q: 'shweta', expect: ['doc:shweta-godara'] },
  { q: 'dr shweta', expect: ['doc:shweta-godara'] },
  { q: 'godara', expect: ['doc:shweta-godara', 'doc:harshal-godara'] },
  { q: 'harshal', expect: ['doc:harshal-godara'] },
  { q: 'vikash raj', expect: ['doc:vikash-raj'] },
  { q: 'nirmala', expect: ['doc:nirmala-goyat'] },
  { q: 'goyat', expect: ['doc:nirmala-goyat'] },
  { q: 'udit', expect: ['doc:udit-choudhary'] },
  { q: 'choudhary', expect: ['doc:udit-choudhary'] },
  { q: 'emergency doctor', expect: ['doc:udit-choudhary', ER] },
  { q: 'surgeon', expect: ['doc:vikash-raj', SURG] },
  { q: 'sunday doctor', expect: ['doc:shweta-godara'] },
  { q: 'doctor who speaks punjabi', expect: ['doc:shweta-godara'] },
  { q: 'dr sweta', expect: ['doc:shweta-godara'] },
  { q: 'dr vikas raj', expect: ['doc:vikash-raj'] },
  { q: 'dr nirmla goyat', expect: ['doc:nirmala-goyat'] },

  /* --------------------------------------------------------------- hospital information */
  { q: 'phone number', expect: ['action:call', 'page:contact'] },
  { q: 'contact', expect: ['page:contact', 'action:call'] },
  { q: 'address', expect: ['action:directions', 'page:contact'] },
  { q: 'directions', expect: ['action:directions'] },
  { q: 'location', expect: ['action:directions', 'page:contact'] },
  { q: 'how to reach', expect: ['action:directions'] },
  { q: 'timings', expect: ['info:timings', 'page:visitors'] },
  { q: 'opening hours', expect: ['info:timings'] },
  { q: 'visiting hours', expect: ['page:visitors'] },
  { q: 'opd timing', expect: ['info:timings', 'page:appointments', 'page:doctors'] },
  { q: 'appointment', expect: ['page:appointments'] },
  { q: 'book', expect: ['page:appointments'] },
  { q: 'booking', expect: ['page:appointments'] },
  { q: 'whatsapp', expect: ['action:whatsapp'] },
  { q: 'abha', expect: ['action:abha'] },
  { q: 'abha card', expect: ['action:abha'] },
  { q: 'insurance', expect: ['info:insurance'] },
  { q: 'cashless', expect: ['info:insurance'] },
  { q: 'ayushman', expect: ['info:insurance', 'action:abha'] },
  { q: 'price', expect: ['info:prices'] },
  { q: 'cost', expect: ['info:prices'] },
  { q: 'fees', expect: ['info:prices'] },
  { q: 'health package', expect: ['info:prices'] },
  { q: 'emergency number', expect: ['action:emergency'] },
  { q: 'ambulance number', expect: [AMB, 'action:emergency'] },
  { q: 'helpline', expect: ['action:call', 'action:emergency'] },
  { q: '24 hours', expect: ['info:timings', 'action:emergency'] },
  { q: 'health library', expect: ['page:health-library'] },
  { q: 'about', expect: ['page:about'] },
  { q: 'departments', expect: ['page:specialities'] },

  /* ----------------------------------------------------------------- misspellings */
  { q: 'neurosergery', expect: [NEURO] },
  { q: 'gastro entrology', expect: [GAS] },
  { q: 'gastroenterolgy', expect: [GAS] },
  { q: 'opthalmology', expect: [EYE] },
  { q: 'gynaecolgy', expect: [OBG] },
  { q: 'orthopeadic', expect: [ORTHO] },
  { q: 'pediatricks', expect: [PED] },
  { q: 'dentisty', expect: [DENT] },
  { q: 'ambulence', expect: [AMB] },
  { q: 'physiotheraphy', expect: [PHYSIO] },
  { q: 'laproscopic', expect: [SURG] },
  { q: 'ultrasond', expect: [USG] },
  { q: 'cardilogy', expect: [ECHO, GEN] },
  { q: 'diabeties', expect: [GEN, DIET] },
  { q: 'pregnent', expect: [OBG] },
  { q: 'kidny stone', expect: [URO] },
  { q: 'eye sight', expect: [EYE] },
  { q: 'stomac pain', expect: [GAS] },
  { q: 'knee paine', expect: [ORTHO] },

  /* ----------------------------------------------------- Hindi in English letters */
  { q: 'pet dard', expect: [GAS] },
  { q: 'pet me dard', expect: [GAS] },
  { q: 'pait dard', expect: [GAS] },
  { q: 'pet', expect: [GAS] },
  { q: 'bukhar', expect: [GEN, PED] },
  { q: 'bukhaar', expect: [GEN, PED] },
  { q: 'khansi', expect: [GEN, PED] },
  { q: 'zukam', expect: [GEN, PED, ENT] },
  { q: 'sir dard', expect: [NEURO] },
  { q: 'sar dard', expect: [NEURO] },
  { q: 'dant dard', expect: [DENT] },
  { q: 'dant', expect: [DENT] },
  { q: 'daant ka doctor', expect: [DENT] },
  { q: 'aankh dard', expect: [EYE] },
  { q: 'aankh', expect: [EYE] },
  { q: 'kaan dard', expect: [ENT] },
  { q: 'kaan', expect: [ENT] },
  { q: 'naak', expect: [ENT] },
  { q: 'gala kharab', expect: [ENT] },
  { q: 'chhati me dard', emergency: true, expect: [ER] },
  { q: 'seene me dard', emergency: true, expect: [ER] },
  { q: 'dil ka doctor', expect: [ECHO, GEN] },
  { q: 'dil', expect: [ECHO, GEN] },
  { q: 'haddi ka doctor', expect: [ORTHO] },
  { q: 'haddi', expect: [ORTHO] },
  { q: 'bacchon ka doctor', expect: [PED] },
  { q: 'bachcha', expect: [PED] },
  { q: 'auraton ka doctor', expect: [OBG, 'doc:shweta-godara'] },
  { q: 'mahila doctor', expect: [OBG, 'doc:shweta-godara'] },
  { q: 'pathri', expect: [URO, SURG] },
  { q: 'peshab me jalan', expect: [URO] },
  { q: 'peshab', expect: [URO] },
  { q: 'sugar ki bimari', expect: [GEN, DIET] },
  { q: 'kamar dard', expect: [SPINE, ORTHO, PHYSIO] },
  { q: 'ghutne me dard', expect: [ORTHO, PHYSIO] },
  { q: 'ghutna', expect: [ORTHO] },
  { q: 'garbh', expect: [OBG] },
  { q: 'garbhavastha', expect: [OBG] },
  { q: 'mahwari', expect: [OBG] },
  { q: 'bawasir', expect: [SURG] },
  { q: 'piliya', expect: [GAS] },
  { q: 'motiyabind', expect: [EYE] },
  { q: 'chashma', expect: [EYE] },
  { q: 'dawai', expect: [PHARM] },
  { q: 'dast', expect: [GAS, GEN, PED] },
  { q: 'ulti', expect: [GAS, GEN, PED] },
  { q: 'kabz', expect: [GAS] },
  { q: 'chakkar', expect: [ENT, NEURO, GEN] },
  { q: 'kamzori', expect: [GEN] },
  { q: 'motapa', expect: [DIET, GEN] },
  { q: 'teeka', expect: [PED] },
  { q: 'lakwa', expect: [ER, NEURO] },
  { q: 'daura', expect: [NEURO, ER] },
  { q: 'phone number kya hai', expect: ['action:call', 'page:contact'] },
  { q: 'pata', expect: ['action:directions', 'page:contact'] },
  { q: 'appointment kaise le', expect: ['page:appointments'] },

  /* ----------------------------------------------------------------- Hindi script */
  { q: 'पेट दर्द', locale: 'hi', expect: [GAS] },
  { q: 'पेट', locale: 'hi', expect: [GAS] },
  { q: 'बुखार', locale: 'hi', expect: [GEN, PED] },
  { q: 'खांसी', locale: 'hi', expect: [GEN, PED] },
  { q: 'सिर दर्द', locale: 'hi', expect: [NEURO] },
  { q: 'दांत दर्द', locale: 'hi', expect: [DENT] },
  { q: 'दांत', locale: 'hi', expect: [DENT] },
  { q: 'आँख', locale: 'hi', expect: [EYE] },
  { q: 'कान', locale: 'hi', expect: [ENT] },
  { q: 'दिल', locale: 'hi', expect: [ECHO, GEN] },
  { q: 'हड्डी', locale: 'hi', expect: [ORTHO] },
  { q: 'घुटने में दर्द', locale: 'hi', expect: [ORTHO, PHYSIO] },
  { q: 'कमर दर्द', locale: 'hi', expect: [SPINE, ORTHO, PHYSIO] },
  { q: 'पथरी', locale: 'hi', expect: [URO, SURG] },
  { q: 'पेशाब', locale: 'hi', expect: [URO] },
  { q: 'गर्भावस्था', locale: 'hi', expect: [OBG] },
  { q: 'बच्चों का डॉक्टर', locale: 'hi', expect: [PED] },
  { q: 'महिला डॉक्टर', locale: 'hi', expect: [OBG, 'doc:shweta-godara'] },
  { q: 'पीलिया', locale: 'hi', expect: [GAS] },
  { q: 'बवासीर', locale: 'hi', expect: [SURG] },
  { q: 'मोतियाबिंद', locale: 'hi', expect: [EYE] },
  { q: 'दवा', locale: 'hi', expect: [PHARM] },
  { q: 'एम्बुलेंस', locale: 'hi', expect: [AMB, 'action:emergency'] },
  { q: 'अपॉइंटमेंट', locale: 'hi', expect: ['page:appointments'] },
  { q: 'फोन नंबर', locale: 'hi', expect: ['action:call', 'page:contact'] },
  { q: 'पता', locale: 'hi', expect: ['action:directions', 'page:contact'] },
  { q: 'दिल का दौरा', locale: 'hi', emergency: true, expect: [ER] },
  { q: 'सीने में दर्द', locale: 'hi', emergency: true, expect: [ER] },
  { q: 'शुगर', locale: 'hi', expect: [GEN, DIET] },
  { q: 'गैस', locale: 'hi', expect: [GAS] },
  { q: 'डॉक्टर श्वेता', locale: 'hi', expect: ['doc:shweta-godara'] },
  { q: 'आभा कार्ड', locale: 'hi', expect: ['action:abha'] },
  { q: 'bukhar', locale: 'hi', expect: [GEN, PED] },
  { q: 'pet dard', locale: 'hi', expect: [GAS] },
  { q: 'stomach', locale: 'hi', expect: [GAS] },
  { q: 'knee pain', locale: 'hi', expect: [ORTHO, PHYSIO] },

  /* --------------------------------------------------------------- Punjabi script */
  { q: 'ਪੇਟ ਦਰਦ', locale: 'pa', expect: [GAS] },
  { q: 'ਪੇਟ', locale: 'pa', expect: [GAS] },
  { q: 'ਬੁਖ਼ਾਰ', locale: 'pa', expect: [GEN, PED] },
  { q: 'ਖੰਘ', locale: 'pa', expect: [GEN, PED] },
  { q: 'ਸਿਰ ਦਰਦ', locale: 'pa', expect: [NEURO] },
  { q: 'ਦੰਦ ਦਾ ਦਰਦ', locale: 'pa', expect: [DENT] },
  { q: 'ਦੰਦ', locale: 'pa', expect: [DENT] },
  { q: 'ਅੱਖ', locale: 'pa', expect: [EYE] },
  { q: 'ਕੰਨ', locale: 'pa', expect: [ENT] },
  { q: 'ਦਿਲ', locale: 'pa', expect: [ECHO, GEN] },
  { q: 'ਹੱਡੀ', locale: 'pa', expect: [ORTHO] },
  { q: 'ਗੋਡੇ ਦਾ ਦਰਦ', locale: 'pa', expect: [ORTHO, PHYSIO] },
  { q: 'ਕਮਰ ਦਰਦ', locale: 'pa', expect: [SPINE, ORTHO, PHYSIO] },
  { q: 'ਪੱਥਰੀ', locale: 'pa', expect: [URO, SURG] },
  { q: 'ਪਿਸ਼ਾਬ', locale: 'pa', expect: [URO] },
  { q: 'ਗਰਭ', locale: 'pa', expect: [OBG] },
  { q: 'ਬੱਚਿਆਂ ਦਾ ਡਾਕਟਰ', locale: 'pa', expect: [PED] },
  { q: 'ਔਰਤਾਂ ਦਾ ਡਾਕਟਰ', locale: 'pa', expect: [OBG, 'doc:shweta-godara'] },
  { q: 'ਪੀਲੀਆ', locale: 'pa', expect: [GAS] },
  { q: 'ਬਵਾਸੀਰ', locale: 'pa', expect: [SURG] },
  { q: 'ਮੋਤੀਆ', locale: 'pa', expect: [EYE] },
  { q: 'ਦਵਾਈ', locale: 'pa', expect: [PHARM] },
  { q: 'ਐਂਬੂਲੈਂਸ', locale: 'pa', expect: [AMB, 'action:emergency'] },
  { q: 'ਮੁਲਾਕਾਤ', locale: 'pa', expect: ['page:appointments'] },
  { q: 'ਫ਼ੋਨ ਨੰਬਰ', locale: 'pa', expect: ['action:call', 'page:contact'] },
  { q: 'ਪਤਾ', locale: 'pa', expect: ['action:directions', 'page:contact'] },
  { q: 'ਦਿਲ ਦਾ ਦੌਰਾ', locale: 'pa', emergency: true, expect: [ER] },
  { q: 'ਸ਼ੂਗਰ', locale: 'pa', expect: [GEN, DIET] },
  { q: 'ਡਾਕਟਰ ਸ਼ਵੇਤਾ', locale: 'pa', expect: ['doc:shweta-godara'] },
  { q: 'ਆਭਾ ਕਾਰਡ', locale: 'pa', expect: ['action:abha'] },
  { q: 'bukhar', locale: 'pa', expect: [GEN, PED] },
  { q: 'pet dard', locale: 'pa', expect: [GAS] },
  { q: 'stomach', locale: 'pa', expect: [GAS] },

  /* ----------------------------------------------- nothing relevant exists: never empty */
  { q: 'skin rash', none: true },
  { q: 'cancer treatment', none: true },
  { q: 'xyzzy', none: true },
  { q: 'asdfgh', none: true },
  { q: 'parking', none: true },
  { q: 'mental health counselling', none: true },
  { q: 'hair fall', none: true },
]

/* ------------------------------------------------------------------ the runner */

const verbose = process.argv.includes('-v')
const filter = process.argv.slice(2).find((arg) => !arg.startsWith('-'))

const engines: Partial<Record<Locale, SearchEngine>> = {}
function engineFor(locale: Locale): SearchEngine {
  return (engines[locale] ??= createEngine(buildSearchDocs(locale)))
}

function reaches(expected: string, hit: SearchHit): boolean {
  if (hit.id === expected) return true
  // The pinned emergency card stands for Emergency Services and for the emergency call.
  if (hit.emergency && (expected === 'svc:emergency-services' || expected === 'action:emergency')) return true
  if (expected.startsWith('svc:') && hit.parent === expected.slice(4)) return true
  return false
}

let passed = 0
let failed = 0
const failures: string[] = []
const started = performance.now()
let slowest = 0

for (const test of CASES) {
  if (filter && !test.q.includes(filter)) continue
  const locale = test.locale ?? 'en'
  const engine = engineFor(locale)
  const t0 = performance.now()
  const result = engine.search(test.q, { limit: 8 })
  slowest = Math.max(slowest, performance.now() - t0)
  const top = test.top ?? 5

  let ok: boolean
  let note = ''
  if (test.none) {
    ok = result.hits.length > 0
    note = ok ? '' : 'returned nothing'
  } else {
    const first = result.hits.slice(0, top)
    const found = first.findIndex((hit) => (test.expect ?? []).some((e) => reaches(e, hit)))
    ok = found >= 0
    if (ok && test.emergency) {
      ok = result.emergency && result.hits[0]?.emergency === true
      note = ok ? '' : 'emergency card not first'
    } else if (!ok) {
      note = `expected ${test.expect?.join(' | ')}`
    }
  }

  if (ok) passed += 1
  else failed += 1
  if (!ok || verbose) {
    const line =
      `${ok ? 'ok  ' : 'FAIL'} [${locale}] ${test.q}  ${note}\n` +
      result.hits
        .slice(0, 6)
        .map((hit) => `        ${hit.kind.padEnd(10)} ${hit.title.slice(0, 48).padEnd(48)} ${(hit.detail ?? '').slice(0, 36)}${hit.inferred ? '  (inferred)' : ''}`)
        .join('\n')
    if (ok) console.log(line)
    else failures.push(line)
  }
}

for (const line of failures) console.log(line)
console.log(
  `\n${passed} passed, ${failed} failed, of ${passed + failed} cases.` +
    `  ${(performance.now() - started).toFixed(0)} ms in all, slowest query ${slowest.toFixed(1)} ms.`,
)
if (failed > 0) process.exitCode = 1
