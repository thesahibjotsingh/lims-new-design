// scripts/search-cases-grid.ts
//
// More cases, made by crossing lists:
//   - every part of the body with every kind of complaint (the departments each may honestly lead to);
//   - the same in Hindi and Punjabi in English letters;
//   - every subject the site has NO department for, in many words (the guide must say so, never name one);
//   - every consultant's name, written the ways people write it;
//   - the pages and services, asked the ways people ask.
//
// Same rules as every other case (scripts/search-eval.ts), including the Quick-guide rule: a sentence may
// name one of the departments listed here, or nothing, never another.

/* ------------------------------------------------------------------ parts of the body x complaints */

/** [words for the part, departments it may honestly lead to] */
const PARTS: [string[], string][] = [
  [['knee', 'knees'], 'ORTHO PHYSIO TRAUMA'],
  [['hip'], 'ORTHO TRAUMA PHYSIO'],
  [['shoulder'], 'ORTHO PHYSIO'],
  [['elbow'], 'ORTHO PHYSIO'],
  [['wrist'], 'ORTHO'],
  [['ankle'], 'ORTHO TRAUMA PHYSIO'],
  [['heel'], 'ORTHO PHYSIO'],
  [['foot'], 'ORTHO'],
  [['finger'], 'ORTHO TRAUMA'],
  [['neck'], 'SPINE ORTHO PHYSIO'],
  [['back'], 'SPINE ORTHO PHYSIO'],
  [['spine'], 'SPINE ORTHO NEURO'],
  [['joint', 'joints'], 'ORTHO GEN'],
  [['bone', 'bones'], 'ORTHO TRAUMA'],
  [['ear', 'ears'], 'ENT'],
  [['eye', 'eyes'], 'EYE'],
  [['nose'], 'ENT'],
  [['throat'], 'ENT GEN'],
  [['tooth', 'teeth'], 'DENT'],
  [['gum', 'gums'], 'DENT'],
  [['stomach'], 'GAS GEN SURG'],
  [['liver'], 'GAS GEN'],
  [['kidney', 'kidneys'], 'URO GEN'],
  [['bladder'], 'URO'],
  [['prostate'], 'URO'],
  [['pregnancy'], 'OBG USG'],
  [['periods'], 'OBG'],
  [['baby', 'newborn'], 'PED'],
  [['child'], 'PED'],
]
const COMPLAINTS: [string, string][] = [
  ['pain', ''],
  ['swelling', ''],
  ['injury', 'TRAUMA ER'],
  ['stiffness', 'PHYSIO'],
  ['infection', 'GEN'],
  ['problem', 'GEN'],
  ['treatment', 'GEN'],
]
/** These are not parts that "swell", "stiffen" or are "injured": only the plain complaints are crossed. */
const PLAIN_ONLY = new Set(['pregnancy', 'periods', 'baby', 'newborn', 'child', 'prostate', 'bladder'])
const PLAIN_COMPLAINTS = new Set(['pain', 'problem', 'treatment', 'infection'])

function body(): string[] {
  const out: string[] = []
  for (const [words, depts] of PARTS) {
    for (const word of words) {
      for (const [complaint, extra] of COMPLAINTS) {
        if (PLAIN_ONLY.has(word) && !PLAIN_COMPLAINTS.has(complaint)) continue
        out.push(`${word} ${complaint} => ${depts} ${extra}`.trim())
      }
      out.push(`${word} doctor => ${depts}`)
      out.push(`${word} specialist => ${depts}`)
    }
  }
  return out
}

/* ------------------------------------------------------------------ Hindi and Punjabi in English letters */
const ROMAN_PARTS: [string[], string][] = [
  [['ghutna', 'ghutne'], 'ORTHO PHYSIO'],
  [['kandha', 'kandhe'], 'ORTHO PHYSIO'],
  [['kamar'], 'SPINE ORTHO PHYSIO'],
  [['gardan'], 'SPINE ORTHO PHYSIO'],
  [['peeth'], 'SPINE ORTHO'],
  [['kaan'], 'ENT'],
  [['aankh', 'akh'], 'EYE'],
  [['naak'], 'ENT'],
  [['gala', 'gale'], 'ENT GEN'],
  [['dant', 'daant', 'dand'], 'DENT'],
  [['pet'], 'GAS GEN SURG'],
  [['gurda', 'gurde'], 'URO GEN'],
  [['jigar'], 'GAS'],
  [['bachcha', 'bacha'], 'PED'],
]
const ROMAN_COMPLAINTS = ['dard', 'me dard', 'sujan', 'ki problem', 'ka ilaj']
function roman(): string[] {
  const out: string[] = []
  for (const [words, depts] of ROMAN_PARTS) {
    for (const word of words) for (const complaint of ROMAN_COMPLAINTS) out.push(`${word} ${complaint} => ${depts}`)
  }
  return out
}

/* ------------------------------------------------------------------ subjects the site has no department for */
const NOT_LISTED_WORDS: string[] = [
  // cancer
  'cancer', 'cancer treatment', 'breast cancer', 'lung cancer', 'blood cancer', 'oncology', 'oncologist', 'chemotherapy', 'radiotherapy', 'cancer doctor', 'cancer specialist', 'cancer hospital', 'tumour cancer', 'kainsar', 'cancer ka ilaj',
  // skin
  'skin doctor', 'skin specialist', 'dermatologist', 'dermatology', 'skin allergy', 'skin rash', 'skin infection', 'eczema', 'psoriasis', 'acne', 'pimples', 'hair fall', 'hair loss', 'dandruff', 'itching', 'itchy skin', 'fungal infection', 'ringworm', 'vitiligo', 'twacha rog', 'chamdi ka doctor', 'khujli',
  // mental health
  'depression', 'anxiety', 'psychiatrist', 'psychologist', 'mental health', 'mental illness', 'panic attack', 'ocd', 'bipolar', 'schizophrenia', 'addiction', 'alcohol problem', 'autism', 'adhd', 'dementia', 'manorog',
  // heart
  'cardiologist', 'cardiology', 'heart doctor', 'heart specialist', 'heart problem', 'heart disease', 'heart surgery', 'angioplasty', 'bypass surgery', 'pacemaker', 'heart blockage',
  // kidney failure and dialysis
  'dialysis', 'nephrologist', 'nephrology', 'kidney failure', 'kidney transplant', 'kidney disease',
  // lung
  'pulmonologist', 'pulmonology', 'tuberculosis', 'lung doctor', 'lung disease', 'lung problem', 'copd',
  // plastic, alternative, hormones, joints
  'plastic surgery', 'cosmetic surgery', 'liposuction', 'rhinoplasty', 'ayurveda', 'ayurvedic doctor', 'homeopathy', 'unani', 'naturopathy', 'yoga', 'acupuncture', 'endocrinologist', 'endocrinology', 'rheumatologist', 'rheumatology',
]
/** The slips people actually make, of the subjects the site has no department for. */
const NOT_LISTED_SLIPS: string[] = ['camcer', 'cancar', 'canser', 'dermatolgist', 'cardiolgist', 'cardiologst', 'psychiatrst', 'depresion', 'oncologst']
const NOT_FRAMES: ((q: string) => string)[] = [
  (q) => q,
  (q) => `i need ${q}`,
  (q) => `${q} in hisar`,
  (q) => `best hospital for ${q}`,
  (q) => `${q} near me`,
  (q) => `${q}?`,
  (q) => q.toUpperCase(),
  (q) => `  ${q}  `,
]
function notListed(): string[] {
  const out: string[] = []
  for (const word of [...NOT_LISTED_WORDS, ...NOT_LISTED_SLIPS]) for (const frame of NOT_FRAMES) out.push(`${frame(word)} => none G:notlisted`)
  return out
}

/* ------------------------------------------------------------------ consultants' names */
const DOCTORS: [string, string[]][] = [
  ['doc:shweta-godara', ['shweta godara', 'shweta', 'sweta godara', 'shweta godra', 'shwetha godara', 'godara shweta', 'shweta madam']],
  ['doc:harshal-godara', ['harshal godara', 'harshal', 'harshal godra', 'harshal godhara', 'godara harshal']],
  ['doc:vikash-raj', ['vikash raj', 'vikas raj', 'vikash', 'vikash rai', 'raj vikash']],
  ['doc:udit-choudhary', ['udit choudhary', 'udit chaudhary', 'udit', 'udit choudhry', 'choudhary udit']],
  ['doc:nirmala-goyat', ['nirmala goyat', 'nirmala', 'nirmala goyal', 'nirmala goyet', 'goyat nirmala']],
]
function doctors(): string[] {
  const out: string[] = []
  for (const [id, names] of DOCTORS) {
    for (const name of names) {
      for (const frame of [(q: string) => q, (q: string) => `dr ${q}`, (q: string) => `doctor ${q}`, (q: string) => `dr. ${q}`, (q: string) => `${q} hisar`, (q: string) => `${q} appointment`, (q: string) => q.toUpperCase(), (q: string) => `${q} ka number`]) {
        out.push(`${frame(name)} => ${id} page:doctors`)
      }
    }
  }
  return out
}

/* ------------------------------------------------------------------ pages and services, asked in many ways */
const PAGES: [string, string][] = [
  ['appointment', 'APPT'], ['book appointment', 'APPT'], ['online booking', 'APPT'], ['opd booking', 'APPT'], ['token', 'APPT'],
  ['timing', 'TIMES'], ['timings', 'TIMES'], ['opening hours', 'TIMES'], ['opd timing', 'TIMES'], ['hospital timing', 'TIMES'],
  ['address', 'DIR CONTACT'], ['location', 'DIR CONTACT'], ['directions', 'DIR'], ['map', 'DIR'], ['how to reach', 'DIR CONTACT'],
  ['phone number', 'CALL CONTACT'], ['contact', 'CALL CONTACT'], ['contact number', 'CALL CONTACT'], ['helpline number', 'CALL EMERG'],
  ['whatsapp', 'WA'], ['whatsapp number', 'WA'], ['chat', 'WA'],
  ['fees', 'PRICES'], ['price', 'PRICES'], ['charges', 'PRICES'], ['consultation fee', 'PRICES'], ['cost', 'PRICES'],
  ['insurance', 'INS'], ['cashless', 'INS'], ['mediclaim', 'INS'], ['tpa', 'INS'], ['ayushman card', 'INS ABHA'],
  ['abha', 'ABHA'], ['abha card', 'ABHA'], ['health id', 'ABHA'],
  ['visiting hours', 'VISIT TIMES'], ['visitor pass', 'VISIT'], ['attendant', 'VISIT'],
  ['emergency number', 'EMERG ER'], ['ambulance', 'AMB EMERG'], ['ambulance number', 'AMB EMERG'],
  ['pharmacy', 'PHARM'], ['medical store', 'PHARM'], ['chemist', 'PHARM'],
  ['physiotherapy', 'PHYSIO'], ['physio', 'PHYSIO'], ['rehabilitation', 'PHYSIO'],
  ['diet plan', 'DIET'], ['dietitian', 'DIET'], ['nutritionist', 'DIET'],
  ['blood test', 'LAB'], ['lab test', 'LAB'], ['pathology', 'LAB'], ['urine test', 'LAB'], ['sugar test', 'LAB'],
  ['x ray', 'XRAY'], ['xray', 'XRAY'], ['ct scan', 'XRAY RAD'], ['mri', 'RAD XRAY'], ['ultrasound', 'USG'], ['sonography', 'USG'],
  ['doppler', 'DOPP'], ['echo', 'ECHO'], ['ecg', 'ECHO'], ['tmt', 'ECHO'], ['endoscopy', 'ENDO'], ['colonoscopy', 'ENDO'],
  ['find a doctor', 'DOCS'], ['list of doctors', 'DOCS'], ['departments', 'SPECS'], ['all departments', 'SPECS'],
  ['health library', 'LIB'], ['about hospital', 'ABOUT'], ['about lims', 'ABOUT'],
]
const PAGE_FRAMES: ((q: string) => string)[] = [
  (q) => q,
  (q) => `${q} please`,
  (q) => `i want ${q}`,
  (q) => `tell me ${q}`,
  (q) => `${q} of hospital`,
  (q) => `${q} lims hisar`,
  (q) => `${q} chahiye`,
  (q) => q.toUpperCase(),
  (q) => `${q}?`,
]
function pages(): string[] {
  const out: string[] = []
  for (const [query, expect] of PAGES) for (const frame of PAGE_FRAMES) out.push(`${frame(query)} => ${expect}`)
  return out
}

export const BODY_SEEDS: readonly string[] = body()
export const ROMAN_SEEDS: readonly string[] = roman()
export const GRID: readonly string[] = [...BODY_SEEDS, ...ROMAN_SEEDS, ...notListed(), ...doctors(), ...pages()]
