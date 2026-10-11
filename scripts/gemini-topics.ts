// scripts/gemini-topics.ts
//
// The topics still to be given an overview, for scripts/gemini-descriptions.ts to draft. Each is only an id, a kind
// and the ways it is searched (the same shape as lib/search/descriptions/types.ts, without the text). Nothing a patient
// typed is in here: these are subjects, chosen from what the site's departments and tests already cover.
//
// Add a topic by adding a line. An id must not already be in lib/search/descriptions; a phrase must not already reach
// another overview (the eval checks both when a draft is promoted).

export interface Topic {
  id: string
  kind: 'symptom' | 'condition' | 'test'
  /** The subject as a short English name, for the model. */
  title: string
  phrases: string[]
}

export const TOPICS: Topic[] = [
  // Complaint searches that found no overview.
  { id: 'leg-cramps', kind: 'symptom', title: 'cramps in the legs', phrases: ['cramps in legs', 'leg cramps', 'muscle cramps in legs', 'calf cramps', 'night leg cramps'] },
  { id: 'broken-tooth', kind: 'symptom', title: 'a broken or chipped tooth', phrases: ['broken tooth', 'chipped tooth', 'cracked tooth', 'my tooth broke'] },
  { id: 'swelling-after-surgery', kind: 'symptom', title: 'swelling after an operation', phrases: ['swelling after surgery', 'swelling after operation', 'post surgery swelling', 'swelling after knee surgery'] },
  { id: 'spinal-surgery', kind: 'test', title: 'spine surgery (what it is and when it is considered)', phrases: ['spinal surgery', 'spine surgery', 'back surgery'] },
  { id: 'brain-tumour', kind: 'condition', title: 'brain tumour', phrases: ['brain tumor', 'brain tumour', 'tumour in brain', 'tumor in brain'] },

  // Nerves, spine and joints.
  { id: 'migraine', kind: 'condition', title: 'migraine', phrases: ['migraine', 'migraine headache', 'one sided headache'] },
  { id: 'vertigo', kind: 'symptom', title: 'vertigo, the room spinning', phrases: ['vertigo', 'room spinning', 'spinning sensation', 'everything is spinning'] },
  { id: 'cervical-spondylosis', kind: 'condition', title: 'cervical spondylosis (neck wear and tear)', phrases: ['cervical spondylosis', 'cervical spondylitis', 'cervical pain', 'spondylosis'] },
  { id: 'arthritis', kind: 'condition', title: 'arthritis', phrases: ['arthritis', 'joint arthritis', 'arthritis pain'] },
  { id: 'osteoarthritis', kind: 'condition', title: 'osteoarthritis (wear and tear of a joint)', phrases: ['osteoarthritis', 'knee osteoarthritis', 'wear and tear of joints'] },
  { id: 'gout', kind: 'condition', title: 'gout and high uric acid', phrases: ['gout', 'uric acid', 'high uric acid'] },
  { id: 'carpal-tunnel', kind: 'condition', title: 'carpal tunnel syndrome', phrases: ['carpal tunnel', 'carpal tunnel syndrome', 'tingling in fingers at night'] },
  { id: 'acl-injury', kind: 'condition', title: 'a torn knee ligament (ACL injury)', phrases: ['acl injury', 'acl tear', 'torn ligament knee', 'knee ligament injury'] },
  { id: 'paralysis', kind: 'condition', title: 'weakness or paralysis of an arm or leg', phrases: ['paralysis', 'weakness in arm or leg', 'weak leg', 'loss of movement in limb'] },

  // Fevers and infections.
  { id: 'dengue', kind: 'condition', title: 'dengue fever', phrases: ['dengue', 'dengue fever', 'dengue symptoms'] },
  { id: 'malaria', kind: 'condition', title: 'malaria', phrases: ['malaria', 'malaria fever'] },
  { id: 'typhoid', kind: 'condition', title: 'typhoid', phrases: ['typhoid', 'typhoid fever'] },
  { id: 'viral-fever', kind: 'condition', title: 'viral fever', phrases: ['viral fever', 'viral infection', 'flu', 'influenza'] },
  { id: 'chickenpox', kind: 'condition', title: 'chickenpox', phrases: ['chickenpox', 'chicken pox'] },

  // Stomach, liver and bowel.
  { id: 'acid-reflux', kind: 'condition', title: 'acid reflux (GERD)', phrases: ['acid reflux', 'gerd', 'reflux', 'burning in chest after eating'] },
  { id: 'irritable-bowel', kind: 'condition', title: 'irritable bowel syndrome', phrases: ['irritable bowel syndrome', 'ibs', 'irritable bowel'] },
  { id: 'liver-cirrhosis', kind: 'condition', title: 'cirrhosis of the liver', phrases: ['liver cirrhosis', 'cirrhosis', 'cirrhosis of liver'] },
  { id: 'worms', kind: 'condition', title: 'worms in the stomach', phrases: ['worms in stomach', 'stomach worms', 'intestinal worms', 'worm infection'] },

  // Ear, nose, throat and eye.
  { id: 'deviated-septum', kind: 'condition', title: 'a deviated nasal septum', phrases: ['deviated septum', 'deviated nasal septum', 'crooked nose inside'] },
  { id: 'nasal-polyps', kind: 'condition', title: 'nasal polyps', phrases: ['nasal polyps', 'polyps in nose'] },
  { id: 'glaucoma', kind: 'condition', title: 'glaucoma', phrases: ['glaucoma', 'high eye pressure', 'eye pressure'] },
  { id: 'diabetic-eye', kind: 'condition', title: 'eye problems caused by diabetes', phrases: ['diabetic eye', 'diabetic retinopathy', 'diabetes and eyes'] },

  // Teeth.
  { id: 'dentures', kind: 'test', title: 'dentures (false teeth)', phrases: ['dentures', 'false teeth', 'artificial teeth', 'tooth replacement'] },
  { id: 'braces', kind: 'test', title: 'braces for crooked teeth', phrases: ['braces', 'teeth braces', 'crooked teeth', 'teeth straightening'] },

  // Women's health and pregnancy.
  { id: 'morning-sickness', kind: 'symptom', title: 'nausea and vomiting in pregnancy', phrases: ['morning sickness', 'vomiting in pregnancy', 'nausea in pregnancy'] },
  { id: 'gestational-diabetes', kind: 'condition', title: 'diabetes in pregnancy', phrases: ['gestational diabetes', 'sugar in pregnancy', 'diabetes in pregnancy'] },
  { id: 'endometriosis', kind: 'condition', title: 'endometriosis', phrases: ['endometriosis'] },
  { id: 'uterine-prolapse', kind: 'condition', title: 'prolapse of the womb', phrases: ['uterine prolapse', 'prolapse', 'womb prolapse', 'uterus coming down'] },
  { id: 'vaginal-infection', kind: 'condition', title: 'vaginal infection', phrases: ['vaginal infection', 'vaginal itching', 'yeast infection'] },
  { id: 'pap-smear', kind: 'test', title: 'a Pap smear (cervical screening)', phrases: ['pap smear', 'pap test', 'cervical screening'] },
  { id: 'mammography', kind: 'test', title: 'a mammogram (breast screening)', phrases: ['mammography', 'mammogram', 'breast screening'] },

  // Men and the urinary system.
  { id: 'hydrocele', kind: 'condition', title: 'hydrocele (swelling around the testicle)', phrases: ['hydrocele', 'swelling in scrotum', 'scrotal swelling'] },
  { id: 'phimosis', kind: 'condition', title: 'a tight foreskin', phrases: ['phimosis', 'tight foreskin'] },

  // Children.
  { id: 'bedwetting', kind: 'symptom', title: 'bedwetting in children', phrases: ['bedwetting', 'bed wetting', 'child wets the bed'] },
  { id: 'diaper-rash', kind: 'condition', title: 'nappy rash', phrases: ['diaper rash', 'nappy rash', 'baby rash'] },
  { id: 'child-ear-pain', kind: 'symptom', title: 'ear pain in a child', phrases: ['child ear pain', 'baby ear pain', 'my child has ear pain'] },

  // Tests.
  { id: 'bone-density-test', kind: 'test', title: 'a bone density test (DEXA scan)', phrases: ['bone density test', 'dexa scan', 'bmd test', 'bone density'] },
  { id: 'lung-function-test', kind: 'test', title: 'a lung function test (spirometry)', phrases: ['lung function test', 'pft', 'spirometry', 'pulmonary function test'] },
  { id: 'eeg', kind: 'test', title: 'an EEG (brain wave test)', phrases: ['eeg', 'brain wave test', 'electroencephalogram'] },
  { id: 'nerve-conduction-test', kind: 'test', title: 'a nerve conduction test', phrases: ['nerve conduction test', 'ncv test', 'ncv'] },
  { id: 'cbc-test', kind: 'test', title: 'a complete blood count (CBC)', phrases: ['cbc', 'cbc test', 'complete blood count', 'full blood count', 'hemogram'] },
  { id: 'vitamin-tests', kind: 'test', title: 'vitamin D and vitamin B12 tests', phrases: ['vitamin d test', 'vitamin b12 test', 'vitamin d level', 'b12 level'] },
]
