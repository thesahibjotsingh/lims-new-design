// lib/search/guide.ts
//
// What decides whether the results page may say "X is usually looked at by <department>".
//
// WHY THIS IS SEPARATE FROM THE KEYWORD LISTS. topics.ts is for FINDING pages: it lists every word that
// might lead to a department, including incidental ones ("cancer pain" is under Anaesthesia & Pain
// Management because pain management is also used for cancer pain). That is right for a result list and
// wrong for a sentence, because "cancer is usually looked at by Anaesthesia" is false. So a sentence
// that names a department is allowed only on the short, deliberate lists below: the plain everyday word
// that sends a patient to that department first. Everything else still finds pages; it just does not
// get a sentence. When in doubt a word is left OUT: a missing sentence costs nothing, a wrong one does.
//
// THE RULE (engine.ts, SearchEngine.guide):
//   1. every word of the question that carries meaning must be one of the department's PRIMARY words
//      (or a synonym of one, through lib/search/groups.ts), apart from QUALIFIERS such as "pain" or
//      "doctor";
//   2. the question must not be about a subject this site has no department for (NOT_LISTED);
//   3. it is never used for an emergency or for distress, or for a close match rather than a match.
//
// This file claims nothing about what LIMS treats. NOT_LISTED says only what the SITE lists. Unreviewed:
// a LIMS doctor should read it with the department pages.

/** Words that point to one department as the usual first stop, by department slug (lib/services.ts). */
/**
 * Words that point to a department ONLY together with one of its PRIMARY words: "fever" alone is General
 * Medicine, but "child fever" is Paediatrics. A question is covered when every meaningful word is a primary
 * or a with-word, and at least one is a primary word.
 */
export const PRIMARY_WITH: Record<string, string> = {
  'paediatrics-neonatology': 'fever cough cold vomiting diarrhea diarrhoea rash jaundice growth feeding allergy',
}

export const PRIMARY: Record<string, string> = {
  'general-medicine':
    'fever cold cough flu viral typhoid malaria dengue diabetes diabetic sugar bp hypertension thyroid ' +
    'cholesterol weakness fatigue tiredness anemia anaemia asthma checkup',
  'ortho-joint-replacement':
    'bone bones joint joints knee knees hip shoulder elbow wrist ankle heel fracture sprain arthritis ' +
    'ligament plaster arthroscopy osteoporosis replacement orthopedic orthopaedic orthopedics orthopaedics ' +
    'ortho',
  'obstetrics-gynaecology':
    'pregnancy pregnant antenatal prenatal postnatal delivery labour miscarriage period periods menstrual ' +
    'pcos pcod ovary ovarian fibroid uterus womb hysterectomy infertility ivf conceive menopause ' +
    'gynecologist gynaecologist gynecology gynaecology obstetrician obstetrics contraception ladies lady ' +
    'women',
  'paediatrics-neonatology':
    'child children kid kids baby babies infant newborn toddler pediatrician paediatrician pediatric ' +
    'paediatric paediatrics pediatrics neonatologist neonatal vaccination vaccine vaccines immunization ' +
    'nicu premature',
  neurosurgery: 'brain neurosurgeon neurosurgery hydrocephalus',
  gastroenterology:
    'stomach acidity acid reflux heartburn indigestion bloating constipation diarrhea diarrhoea ulcer liver ' +
    'hepatitis jaundice gastritis ibs colon bowel pancreas gastroenterologist gastroenterology gastro ' +
    'vomiting nausea',
  urology:
    'kidney kidneys urine urinary uti prostate bladder urologist urology urination incontinence testicle ' +
    'vasectomy stone stones',
  'spine-surgery':
    'spine spinal back backache neck disc sciatica spondylosis cervical lumbar scoliosis slipped slip',
  ophthalmology:
    'eye eyes vision eyesight cataract glaucoma retina squint glasses spectacles myopia conjunctivitis lasik ' +
    'ophthalmologist ophthalmology',
  ent: 'ear ears nose throat ent hearing deafness tinnitus sinus sinusitis tonsil tonsils tonsillitis adenoid nosebleed snoring',
  dentistry:
    'tooth teeth dental dentist dentistry toothache cavity cavities gum gums braces denture dentures scaling ' +
    'wisdom rct',
  'anaesthesia-pain-management': 'anaesthesia anesthesia anaesthetist anesthetist epidural sedation',
  'general-laparoscopic-surgery':
    'hernia appendix appendicitis piles hemorrhoids haemorrhoids fissure fistula gallstone gallstones ' +
    'gallbladder laparoscopy laparoscopic keyhole abscess lipoma goitre',
  'trauma-management': 'trauma polytrauma',
}

/**
 * Words that describe a complaint without saying where it is. They are not asked to be covered:
 * "stomach pain" needs "stomach" to be a gastroenterology word and does not need "pain" to be one.
 * Words that name a THING (test, scan, report, price, timing) are deliberately NOT here: a question
 * about those is not a question about which department.
 */
export const QUALIFIERS = new Set([
  'pain', 'ache', 'aches', 'achy', 'hurt', 'hurts', 'hurting', 'problem', 'problems', 'issue', 'issues',
  'trouble', 'treatment', 'treat', 'doctor', 'doctors', 'specialist', 'consultant', 'consultation',
  'clinic', 'symptom', 'symptoms', 'severe', 'bad', 'chronic', 'sudden', 'mild', 'sharp', 'constant',
  'recurring', 'frequent', 'since', 'day', 'days', 'week', 'weeks', 'morning', 'night', 'always',
  'lot', 'much', 'little', 'bit', 'some', 'something', 'wife', 'husband', 'father',
  'mother', 'mom', 'dad', 'papa', 'mummy', 'brother', 'sister', 'grandfather', 'grandmother', 'patient',
  'person', 'people', 'someone', 'one', 'who', 'about', 'need', 'help', 'info', 'information',
  'cannot', 'cant', 'unable', 'dont', 'didnt', 'doesnt', 'isnt', 'wasnt', 'werent', 'arent', 'hasnt', 'hadnt', 'havent',
  'couldnt', 'wouldnt', 'shouldnt', 'wont', 'aint',
])

/**
 * Words that name a THING a patient wants (a test, a scan, a report), not a complaint. A question that
 * contains one is about that thing, so the Quick guide does not say which department "usually" sees it.
 */
export const THINGS = new Set([
  'test', 'tests', 'testing', 'scan', 'scans', 'report', 'reports', 'profile', 'panel', 'xray', 'ultrasound',
  'sonography', 'mri', 'ct', 'ecg', 'echo', 'tmt', 'hba1c', 'cbc', 'lft', 'kft', 'tsh', 'biopsy', 'culture',
  'sample', 'price', 'prices', 'cost', 'fee', 'fees', 'charges', 'timing', 'timings', 'insurance',
  'ambulance', 'pharmacy', 'chemist', 'medicine', 'medicines', 'medical', 'store', 'shop', 'dawai', 'dawa',
  'diet', 'dietitian', 'physiotherapy', 'physio',
])

/**
 * Subjects the SITE lists no department for. A question about one of these gets "this site does not list
 * a <subject> department" and the phone number, never a department chosen by a word that happens to
 * appear somewhere. `words` are anchors: any one of them in the question makes it a question about the
 * subject. `unless` words cancel it ("yellow skin" is jaundice, not a skin question).
 *
 * The subject label is translated (messages searchPage.subjects.<key>).
 */
export interface NotListed {
  key: string
  words: string[]
  /** All of these together also count (for two-word subjects such as "kidney failure"). */
  pairs?: [string, string][]
  unless?: string[]
}

export const NOT_LISTED: NotListed[] = [
  {
    key: 'cancer',
    words: ['cancer', 'cancers', 'oncology', 'oncologist', 'chemotherapy', 'chemo', 'radiotherapy', 'carcinoma', 'leukemia', 'leukaemia', 'lymphoma', 'malignancy', 'malignant', 'kainsar', 'cansar', 'कैंसर', 'ਕੈਂਸਰ'],
  },
  {
    key: 'skin',
    words: ['skin', 'dermatology', 'dermatologist', 'eczema', 'psoriasis', 'acne', 'pimple', 'pimples', 'dandruff', 'baldness', 'hairfall', 'itching', 'itchy', 'wart', 'warts', 'ringworm', 'vitiligo', 'leprosy', 'twacha', 'tvacha', 'chamdi', 'khujli', 'daane', 'त्वचा', 'चमड़ी', 'खुजली', 'ਚਮੜੀ', 'ਖੁਜਲੀ'],
    pairs: [['hair', 'fall'], ['hair', 'loss'], ['hair', 'transplant'], ['fungal', 'infection']],
    unless: ['yellow', 'jaundice', 'yellowish'],
  },
  {
    key: 'mental',
    words: ['psychiatrist', 'psychiatry', 'psychologist', 'psychology', 'depression', 'depressed', 'anxiety', 'panic', 'ocd', 'phobia', 'bipolar', 'schizophrenia', 'addiction', 'deaddiction', 'dementia', 'autism', 'adhd', 'manorog', 'अवसाद', 'डिप्रेशन', 'चिंता', 'ਡਿਪਰੈਸ਼ਨ', 'ਚਿੰਤਾ'],
    pairs: [['mental', 'health'], ['mental', 'illness'], ['alcohol', 'problem']],
  },
  {
    key: 'heart',
    words: ['cardiology', 'cardiologist', 'cardiac', 'angioplasty', 'bypass', 'stent', 'pacemaker'],
    pairs: [['heart', 'doctor'], ['heart', 'specialist'], ['heart', 'surgery'], ['heart', 'problem'], ['heart', 'disease'], ['heart', 'blockage'], ['heart', 'patient']],
    // A heart TEST is something the site does list (the echocardiogram and the treadmill test).
    unless: ['checkup', 'test', 'tests', 'echo', 'ecg', 'tmt', 'scan', 'report', 'screening'],
  },
  {
    key: 'dialysis',
    words: ['dialysis', 'nephrology', 'nephrologist'],
    pairs: [['kidney', 'failure'], ['kidney', 'transplant'], ['kidney', 'disease'], ['organ', 'transplant']],
  },
  {
    key: 'lung',
    words: ['pulmonologist', 'pulmonology', 'tuberculosis', 'copd'],
    pairs: [['lung', 'doctor'], ['lung', 'disease'], ['lung', 'problem'], ['lungs', 'problem']],
  },
  {
    key: 'plastic',
    words: ['plastic', 'cosmetic', 'liposuction', 'rhinoplasty', 'botox'],
  },
  {
    key: 'alternative',
    words: ['ayurveda', 'ayurvedic', 'homeopathy', 'homoeopathy', 'unani', 'naturopathy', 'yoga', 'acupuncture'],
  },
  {
    key: 'hormone',
    words: ['endocrinology', 'endocrinologist'],
  },
  {
    // Not a department but the same rule: this site gives no advice on tablets, doses or home remedies,
    // and a question for one is not answered by naming a department as if it were the cure.
    key: 'advice',
    words: [
      'tablet', 'tablets', 'capsule', 'capsules', 'syrup', 'antibiotic', 'antibiotics', 'painkiller', 'painkillers',
      'dose', 'dosage', 'gharelu', 'upay', 'upaay', 'nuskha', 'nuskhe', 'remedy', 'remedies', 'paracetamol',
      'ibuprofen', 'crocin', 'dolo', 'azithromycin', 'amoxicillin', 'goli', 'घरेलू', 'उपाय', 'नुस्खे', 'नुस्खा',
      'गोली', 'ਗੋਲੀ', 'ਘਰੇਲੂ', 'ਨੁਸਖ਼ਾ',
    ],
    pairs: [
      ['dawai', 'dard'], ['dawa', 'dard'], ['dawai', 'bukhar'], ['dawa', 'bukhar'], ['dawai', 'khansi'],
      ['medicine', 'pain'], ['medicine', 'fever'], ['medicine', 'cough'], ['medicine', 'headache'],
      ['दवा', 'दर्द'], ['दवाई', 'दर्द'], ['दवा', 'बुखार'], ['दवाई', 'बुखार'], ['ਦਵਾਈ', 'ਦਰਦ'], ['ਦਵਾਈ', 'ਬੁਖਾਰ'],
    ],
  },
  {
    key: 'rheumatology',
    words: ['rheumatology', 'rheumatologist'],
  },
]
