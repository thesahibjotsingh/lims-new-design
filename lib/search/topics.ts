// lib/search/topics.ts
//
// The words a patient might use for a department, which the department's own page does not
// use: lay names for a condition, a body part, a complaint, a procedure, the name of the doctor
// who treats it ("bone doctor", "lady doctor"). They are added to the department's search entry
// (never shown) so a search for "tummy ache" or "piles" reaches the right page even though the page
// says "gastroenterology" and "haemorrhoids".
//
// THIS IS KEYWORDS, NOT A CLAIM. Each list is the textbook set of things the specialty is
// generally associated with, the same level of generality as the "common conditions" already on
// every department page (lib/services.ts). It never says what LIMS specifically offers; a search
// result is a pointer to a page, and the page says what is and is not published.
//
// UNREVIEWED. Written without a clinician, like the page copy. A LIMS doctor should read this file
// with the department pages and strike anything that does not belong.
//
// English only, on purpose: lib/search/groups.ts ties the Hindi, Punjabi and English-letter
// spellings to these words.

export const TOPICS: Record<string, string> = {
  'emergency-services':
    'emergency casualty urgent accident road accident trauma serious critical collapse unconscious fainting ' +
    'seizure fits convulsion stroke paralysis heart attack chest pain breathing difficulty breathless choking ' +
    'poisoning overdose snake bite dog bite burns severe bleeding fall injury head injury first aid ' +
    'resuscitation ER 24x7 night casualty ward emergency doctor',

  'general-medicine':
    'physician general doctor general physician medicine fever cold cough flu viral infection typhoid malaria ' +
    'dengue diabetes sugar blood pressure BP hypertension thyroid cholesterol weakness fatigue tiredness ' +
    'weight loss body pain headache dizziness giddiness vomiting nausea loose motions diarrhea anemia asthma ' +
    'breathlessness swelling checkup health check medical checkup elderly senior citizen family doctor',

  'ortho-joint-replacement':
    'bone bones joint joints knee hip shoulder elbow wrist ankle foot heel fracture broken bone plaster cast ' +
    'dislocation sprain ligament tendon tear ACL meniscus arthritis arthroscopy knee replacement hip ' +
    'replacement joint replacement TKR THR osteoporosis sports injury frozen shoulder tennis elbow heel pain ' +
    'plantar fasciitis gout stiffness knee pain joint pain orthopedic orthopaedic orthopedics orthopaedics ' +
    'ortho surgeon bone doctor bone specialist joint doctor',

  'obstetrics-gynaecology':
    'pregnancy pregnant antenatal prenatal postnatal delivery normal delivery c section cesarean labour pain ' +
    'miscarriage abortion MTP periods menstrual irregular periods heavy bleeding PCOS PCOD ovary ovarian cyst ' +
    'fibroid uterus womb hysterectomy infertility IVF conceive white discharge vaginal infection pelvic pain ' +
    'menopause hot flushes family planning contraception ultrasound in pregnancy gynecologist gynaecologist ' +
    'gynecology obstetrician lady doctor ladies doctor women doctor female doctor women health',

  'paediatrics-neonatology':
    'child children kid kids baby babies infant newborn toddler fever in child cough cold child vomiting loose ' +
    'motions child vaccination vaccine immunization growth development milestone weight gain feeding ' +
    'breastfeeding jaundice newborn premature NICU incubator asthma allergy rash worms pediatrician ' +
    'paediatrician child specialist child doctor baby doctor children doctor',

  neurosurgery:
    'brain head nerve nerves spine headache migraine head injury brain tumor brain tumour hydrocephalus shunt ' +
    'stroke bleed paralysis seizure fits epilepsy numbness tingling weakness slipped disc sciatica back pain ' +
    'neck pain nerve compression carpal tunnel memory loss dizziness neurosurgeon neurologist brain surgeon ' +
    'brain doctor neuro',

  gastroenterology:
    'stomach abdomen belly tummy digestion digestive acidity acid reflux heartburn GERD gastritis gas bloating ' +
    'indigestion ulcer peptic ulcer constipation diarrhea loose motions vomiting nausea liver fatty liver ' +
    'hepatitis jaundice cirrhosis gallbladder gallstone pancreas pancreatitis intestine bowel colon IBS ' +
    'irritable bowel blood in stool melena endoscopy colonoscopy swallowing difficulty food pipe oesophagus ' +
    'esophagus worms gastroenterologist gastro stomach doctor liver doctor stomach pain',

  urology:
    'kidney stone stones renal colic urine urinary UTI urine infection burning urination frequent urination ' +
    'blood in urine prostate prostrate bladder incontinence retention weak flow testicle testis scrotum ' +
    'hydrocele phimosis circumcision erectile male infertility vasectomy lithotripsy cystoscopy kidney ' +
    'urologist kidney doctor',

  'spine-surgery':
    'spine back neck backache back pain neck pain slip disc slipped disc herniated disc sciatica spondylosis ' +
    'cervical lumbar stenosis scoliosis kyphosis spine fracture vertebra fusion decompression numbness leg pain ' +
    'spine surgeon spine doctor',

  ophthalmology:
    'eye eyes vision cataract glaucoma retina diabetic retinopathy squint lazy eye glasses spectacles power ' +
    'refractive error myopia hypermetropia astigmatism dry eye red eye watering conjunctivitis pink eye stye ' +
    'floaters night blindness color blindness lasik eye drops eye infection eye checkup eye doctor ' +
    'ophthalmologist optician',

  ent:
    'ear nose throat hearing loss deafness ear pain ear discharge ear wax tinnitus sinus sinusitis blocked nose ' +
    'runny nose allergy rhinitis nosebleed epistaxis tonsil tonsillitis adenoid sore throat hoarse voice ' +
    'swallowing snoring sleep apnea vertigo dizziness balance neck lump ENT doctor ENT specialist ' +
    'otolaryngologist',

  dentistry:
    'dental tooth teeth toothache cavity decay filling root canal RCT extraction wisdom tooth gum gums ' +
    'bleeding gums bad breath braces aligners crown cap bridge denture dentures implant scaling cleaning ' +
    'whitening jaw oral mouth ulcer mouth sore dentist dental surgeon oral surgeon child dentist',

  'anaesthesia-pain-management':
    'anaesthesia anesthesia anaesthetist anesthetist spinal epidural nerve block general anaesthesia local ' +
    'anaesthesia sedation pre anaesthetic checkup PAC pain management chronic pain back pain nerve pain ' +
    'neuralgia post operative pain cancer pain pain clinic pain relief injection for pain',

  'general-laparoscopic-surgery':
    'surgery general surgeon laparoscopic keyhole hernia gallstone gallbladder appendix appendicitis piles ' +
    'hemorrhoids fissure fistula anal bleeding in motion lump breast lump thyroid nodule goitre abscess boil ' +
    'cyst lipoma varicose veins hydrocele circumcision abdominal pain right side operation general surgery ' +
    'laparoscopy',

  'trauma-management':
    'trauma accident road accident fall injury fracture polytrauma bleeding wound cut stitches burn head injury ' +
    'chest injury abdominal injury dislocation first aid shock multiple injuries',

  endoscopy:
    'endoscopy gastroscopy upper GI scopy colonoscopy camera test food pipe stomach scope swallowing ' +
    'difficulty ulcer bleeding indigestion biopsy',

  'radiology-imaging':
    'radiology imaging scan x-ray CT MRI ultrasound doppler mammography bone density DEXA scan report ' +
    'imaging centre which scan',

  'ct-scan-x-ray':
    'x-ray xray x ray CT scan CT head CT chest CT abdomen contrast fracture check chest x-ray bone x-ray scan ' +
    'radiograph',

  ultrasound:
    'ultrasound sonography USG scan pregnancy scan baby scan abdomen scan pelvic scan kidney scan thyroid scan ' +
    'gallbladder scan liver scan anomaly scan growth scan',

  'color-doppler':
    'doppler colour doppler color doppler vein artery blood flow clot DVT varicose veins leg swelling carotid ' +
    'fetal doppler circulation',

  'echocardiogram-tmt':
    'echo echocardiogram 2D echo ECG heart test heart scan TMT treadmill stress test cardiac chest pain heart ' +
    'valve heart pumping heart attack check heart checkup palpitations breathlessness cardiology ' +
    'cardiologist heart doctor',

  'pathology-microbiology':
    'blood test urine test stool test sputum culture lab laboratory pathology microbiology CBC blood sugar ' +
    'fasting sugar HbA1c lipid profile cholesterol thyroid test TSH liver function LFT kidney function KFT ' +
    'widal dengue test malaria test typhoid test urine culture biopsy report sample collection pap smear ' +
    'pregnancy test hemoglobin platelet count',

  'physiotherapy-rehabilitation':
    'physiotherapy physio rehabilitation rehab exercise therapy back pain neck pain knee pain frozen shoulder ' +
    'stroke recovery paralysis recovery post surgery recovery sports injury electrotherapy traction massage ' +
    'mobility balance training walking training',

  'dietetics-nutrition':
    'diet dietitian dietician nutritionist nutrition diet plan diet chart weight loss weight gain obesity ' +
    'diabetes diet kidney diet heart diet pregnancy diet child nutrition malnutrition food healthy eating ' +
    'calories',

  pharmacy:
    'pharmacy chemist medical store medicines tablets syrup injection prescription generic medicine medicine ' +
    'shop drug store',

  ambulance:
    'ambulance emergency transport patient pick up stretcher oxygen road accident referral transfer home pickup ' +
    'hospital transfer',
}

/**
 * What a patient calls the doctor of each department. Added to the consultants' own entries, so
 * "gynecologist", "lady doctor" or "bone doctor" finds the person, not only the department.
 */
export const ROLE_WORDS: Record<string, string> = {
  'emergency-services': 'emergency physician emergency doctor casualty doctor',
  'general-medicine': 'physician general physician medicine doctor family doctor',
  'ortho-joint-replacement': 'orthopedic surgeon orthopaedic orthopedist bone doctor joint doctor ortho',
  'obstetrics-gynaecology': 'gynecologist gynaecologist obstetrician lady doctor ladies doctor women doctor',
  'paediatrics-neonatology': 'pediatrician paediatrician child specialist child doctor baby doctor neonatologist',
  neurosurgery: 'neurosurgeon brain surgeon brain doctor',
  gastroenterology: 'gastroenterologist stomach doctor liver doctor',
  urology: 'urologist kidney doctor',
  'spine-surgery': 'spine surgeon spine doctor orthopedic',
  ophthalmology: 'ophthalmologist eye doctor eye surgeon',
  ent: 'ENT specialist ENT doctor otolaryngologist ear nose throat doctor',
  dentistry: 'dentist dental surgeon tooth doctor',
  'anaesthesia-pain-management': 'anaesthetist anesthetist anesthesiologist',
  'general-laparoscopic-surgery': 'general surgeon laparoscopic surgeon surgeon',
  'trauma-management': 'trauma surgeon',
}

/**
 * Words added with the 1,000-case test set: what patients typed that the lists above did not reach.
 * Merged into TOPICS below, so the rest of the code sees one list. Same status as the rest: keywords,
 * not claims, and unreviewed.
 */
const MORE_TOPICS: Record<string, string> = {
  gastroenterology:
    'black stool tarry stool burning in chest chest burning after eating loss of appetite poor appetite not eating ' +
    'no appetite gallbladder gallstones',
  'ortho-joint-replacement':
    'cramps leg cramps muscle cramps fell down fallen sprain twisted ankle swollen arm swollen hand',
  'trauma-management': 'fell down fall fallen cut deep cut wound stitches',
  ophthalmology: 'cannot see clearly unable to see poor eyesight weak eyesight blurry hazy vision',
  'obstetrics-gynaecology': 'baby kicks fetal movement baby movement foetal movements bleeding in pregnancy',
  'general-medicine':
    'irregular heartbeat heartbeat heart rate arrhythmia allergy allergies allergic hives insomnia sleeplessness ' +
    'cannot sleep trouble sleeping sleep problem loss of appetite poor appetite not eating wound not healing',
  'echocardiogram-tmt': 'irregular heartbeat heart rate arrhythmia',
  'general-laparoscopic-surgery':
    'swelling after surgery post operative wound not healing non healing wound dressing stitches gallstones ' +
    'gallbladder surgeon general surgeon',
  ent: 'enteh hearing loss cannot hear',
  neurosurgery: 'memory loss forgetfulness',
  'paediatrics-neonatology': 'child not eating baby not eating poor feeding refuses food',
  'pathology-microbiology': 'vitamin vitamin d vitamin b12 b12 blood group blood grouping hemoglobin hb',
  pharmacy: '24 hour 24x7 round the clock open night medicine shop',
}
for (const [slug, words] of Object.entries(MORE_TOPICS)) TOPICS[slug] = `${TOPICS[slug] ?? ''} ${words}`.trim()
