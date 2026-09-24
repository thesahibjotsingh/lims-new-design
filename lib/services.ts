// lib/services.ts
//
// The clinical services LIMS actively offers, as supplied by the hospital.
//
// This is the spine of the site's information architecture: the header nav, the home
// page grid, the footer, /centres, /centres/[slug] and the doctor roster all resolve
// against it. One list, one slug per service, so a rename is one edit.
//
// TWO THINGS HERE ARE MINE, NOT LIMS'S, AND NEED CONFIRMING:
//
//   1. `category`. LIMS supplied 26 items as a flat list. Presenting 26 undifferentiated
//      tiles asks a patient to tell "Neurosurgery" apart from "Color Doppler" on their
//      own, which they cannot — one is a department you are referred to, the other is a
//      test you are sent for. The three-way split below is an editorial judgement about
//      how patients navigate, not a statement about how LIMS is organised internally.
//
//   2. `name`. Names are verbatim as supplied, including the "Pediatrics" spelling,
//      which differs from the British spelling used elsewhere on the site. Parenthetical
//      alternatives were moved to `alsoKnownAs` so they can be searched in Phase 3
//      without cluttering a tile.
//
// Still NOT here, deliberately: conditions treated, procedures offered, facilities,
// equipment, "our team", anything with LIMS as the subject. Those are clinical claims
// about what THIS hospital can do, and they come from LIMS or they do not exist.
//
// `overview`, `commonConditions` and `commonTreatments` (added 2026-09-24) are the
// exception, and a narrow one: generic, textbook-style descriptions of what the
// specialty/test/service IS and what it generally involves, written with no
// institutional subject at all — never "LIMS offers," "our specialists," "we treat,"
// "our equipment." The same sentence you'd get from a medical reference work, not a
// claim about this hospital's capability. See ServiceDetail.tsx for how they render.
//
// `commonConditions` and `commonTreatments` are populated only where the framing
// holds up without strain — the 15 clinical departments, the 7 diagnostics/imaging
// entries (reframed as "what it can help evaluate" / "how it's typically done," since
// a test doesn't have conditions or treatments of its own), and the two support
// services where "conditions this generally helps with" makes sense
// (physiotherapy, dietetics). Pharmacy and Ambulance are left with `overview` alone —
// forcing a conditions/treatments list onto either reads as padding, not information.
//
// Still NOT here, deliberately, at any level: highlights, sub-specialties as offered
// capabilities, a leadership quote, "our team's approach," specific equipment, patient
// stories. All of that is a claim about what THIS hospital specifically has, does, or
// says — it comes from LIMS or it does not exist. ServiceDetail.tsx carries one
// honest, compact note about that rather than a row of six empty placeholder boxes.

export type ServiceCategory = 'clinical' | 'diagnostics' | 'support'

/** One named item with a short generic description — a condition, a treatment, a test. */
export interface ServiceListItem {
  name: string
  description: string
}

export interface ClinicalService {
  slug: string
  name: string
  category: ServiceCategory
  /** Alternative names, for search in Phase 3. Never rendered as the title. */
  alsoKnownAs?: string[]
  /**
   * Generic, non-institution-specific description of what this specialty, test or
   * service is — not a claim about what LIMS specifically offers, performs, or has.
   * See the file-level note above before writing one of these.
   */
  overview?: string
  /**
   * Conditions generally associated with this specialty (clinical), or what a test can
   * help evaluate (diagnostics), or situations this service generally helps with
   * (support). Generic and educational — not a claim about LIMS's caseload.
   */
  commonConditions?: ServiceListItem[]
  /**
   * Treatments or procedures generally used for this specialty (clinical), or how a
   * test is typically performed (diagnostics), or common approaches used (support).
   * Generic and educational — not a claim about what LIMS specifically performs.
   */
  commonTreatments?: ServiceListItem[]
}

export interface ServiceCategoryDefinition {
  id: ServiceCategory
  /** Section heading, used on /centres where all three appear together. */
  name: string
  /** The page's own <h1>, used on that category's index route. */
  pageTitle: string
  /** One line telling a patient what this group of services is for. */
  blurb: string
  /**
   * Route prefix. A category's index lives here and its services live beneath it,
   * so a URL always names the section the page is listed under.
   *
   * This is the single source of truth for that mapping. Both the nav and every
   * link on every page resolve through serviceHref(), so moving a service between
   * categories moves its URL with it and nothing is left pointing at the old one.
   */
  basePath: string
}

export const SERVICE_CATEGORIES: ServiceCategoryDefinition[] = [
  {
    id: 'clinical',
    name: 'Clinical departments',
    pageTitle: 'Specialities',
    blurb: 'Specialist teams you consult, are referred to, or are admitted under.',
    basePath: '/specialities',
  },
  {
    id: 'diagnostics',
    name: 'Diagnostics & imaging',
    pageTitle: 'Diagnostics & imaging',
    blurb: 'Tests and scans, usually on a referral from a doctor.',
    basePath: '/services',
  },
  {
    id: 'support',
    name: 'Patient support services',
    pageTitle: 'Patient care',
    blurb: 'Services that run alongside your treatment.',
    basePath: '/patient-care',
  },
]

export const SERVICES: ClinicalService[] = [
  // ---- Clinical departments -------------------------------------------------
  {
    slug: 'emergency-services',
    name: 'Emergency Services',
    category: 'clinical',
    overview:
      'Emergency medicine is the specialty concerned with the immediate recognition, ' +
      'diagnosis and treatment of acute illness and injury — conditions that need ' +
      'urgent attention, such as chest pain, breathing difficulty, major trauma, ' +
      'poisoning, severe infection or sudden loss of consciousness, where the first ' +
      'hour of care often shapes the outcome. An emergency department is organised to ' +
      'triage arrivals by severity, stabilise the most critical cases first, and hand ' +
      'off to the right specialty once someone is out of immediate danger.',
    commonConditions: [
      {
        name: 'Chest pain',
        description:
          'Can signal a heart attack or other cardiac event, and is treated as urgent until proven otherwise.',
      },
      {
        name: 'Severe breathing difficulty',
        description:
          'Sudden shortness of breath from causes such as asthma, pneumonia or a blocked airway.',
      },
      {
        name: 'Major trauma',
        description:
          'Serious injury from an accident, fall or violence, often affecting more than one part of the body.',
      },
      {
        name: 'Stroke symptoms',
        description:
          'Sudden weakness, slurred speech or facial drooping, where fast treatment limits lasting damage.',
      },
      {
        name: 'Severe allergic reaction',
        description:
          'A reaction that affects breathing or circulation, sometimes progressing to anaphylaxis.',
      },
    ],
    commonTreatments: [
      {
        name: 'Triage',
        description:
          'Sorting arriving patients by how urgently they need care, so the most critical are seen first.',
      },
      {
        name: 'Resuscitation',
        description:
          'Immediate life support, such as CPR or airway management, for someone whose breathing or heartbeat has stopped.',
      },
      {
        name: 'Wound stabilisation',
        description: 'Controlling bleeding and immobilising injuries before further treatment or transfer.',
      },
      {
        name: 'Emergency imaging',
        description: 'Rapid X-rays, CT scans or ultrasound to identify the cause of a critical symptom.',
      },
      {
        name: 'IV fluids and medication',
        description: 'Delivered directly into a vein for fast effect in a deteriorating patient.',
      },
    ],
  },
  {
    slug: 'general-medicine',
    name: 'General Medicine',
    category: 'clinical',
    overview:
      'General medicine, also called internal medicine, diagnoses and manages the ' +
      'full range of adult illness — from common infections, diabetes, high blood ' +
      'pressure and thyroid disorders to conditions affecting several organ systems ' +
      'at once. A general physician is usually the first specialist consulted for ' +
      "symptoms that don't obviously point to a single body part, coordinating " +
      'further referral once a diagnosis is clearer.',
    commonConditions: [
      {
        name: 'Diabetes',
        description:
          'A long-term condition where blood sugar levels are too high, requiring ongoing monitoring and management.',
      },
      {
        name: 'Hypertension',
        description:
          'Persistently high blood pressure that increases the risk of heart disease and stroke if untreated.',
      },
      {
        name: 'Thyroid disorders',
        description: 'Overactive or underactive thyroid function affecting metabolism, energy and weight.',
      },
      {
        name: 'Respiratory infections',
        description: 'Illnesses such as bronchitis or pneumonia affecting the lungs and airways.',
      },
      {
        name: 'Unexplained fatigue or weight loss',
        description: "Symptoms that don't point to one specific cause and need broader investigation.",
      },
    ],
    commonTreatments: [
      {
        name: 'Clinical assessment',
        description: 'A detailed history and examination to narrow down the likely cause of symptoms.',
      },
      {
        name: 'Blood and urine tests',
        description: 'Laboratory tests used to diagnose and monitor a wide range of conditions.',
      },
      {
        name: 'Medication management',
        description: 'Prescribing and adjusting medicines for chronic conditions such as diabetes or hypertension.',
      },
      {
        name: 'Referral to a specialist',
        description: 'Directing a patient to the right specialty once initial assessment points to one.',
      },
      {
        name: 'Follow-up monitoring',
        description: 'Regular review to track how a condition or its treatment is progressing.',
      },
    ],
  },
  {
    slug: 'ortho-joint-replacement',
    name: 'Ortho & Joint Replacement',
    category: 'clinical',
    alsoKnownAs: ['Orthopedics', 'Polytrauma'],
    overview:
      'Orthopaedics deals with the bones, joints, ligaments, tendons and muscles that ' +
      'make up the musculoskeletal system — covering fractures, arthritis, sports ' +
      'injuries, and spinal or joint deformities. Joint replacement is the surgical ' +
      'reconstruction of a joint, most often the hip or knee, that has worn down or ' +
      'been damaged beyond repair. Treatment more broadly ranges from casts, ' +
      'physiotherapy and pain management through to reconstructive surgery.',
    commonConditions: [
      {
        name: 'Osteoarthritis',
        description: 'Wear-and-tear damage to joint cartilage, commonly affecting the knees, hips and hands.',
      },
      {
        name: 'Fractures',
        description: 'Broken bones from injury, ranging from hairline cracks to complex breaks needing surgery.',
      },
      {
        name: 'Ligament and tendon injuries',
        description: 'Sprains, tears or ruptures, often from sports or sudden awkward movement.',
      },
      {
        name: 'Spinal and joint deformities',
        description:
          'Structural issues such as scoliosis or joint misalignment present from birth or developing over time.',
      },
      {
        name: 'Chronic joint pain',
        description: 'Ongoing pain from wear, inflammation or old injury that limits movement.',
      },
    ],
    commonTreatments: [
      {
        name: 'Physiotherapy',
        description: 'Guided exercise and movement therapy to restore strength and mobility.',
      },
      {
        name: 'Casting and splinting',
        description: 'Immobilising a fracture or injury while it heals.',
      },
      {
        name: 'Joint replacement surgery',
        description: 'Replacing a severely damaged joint, most often the hip or knee, with an artificial one.',
      },
      {
        name: 'Arthroscopy',
        description: 'Minimally invasive surgery using a small camera to diagnose and treat joint problems.',
      },
      {
        name: 'Pain management',
        description: 'Medication and other techniques to control pain during recovery.',
      },
    ],
  },
  {
    slug: 'obstetrics-gynaecology',
    name: 'Obstetrics & Gynaecology',
    category: 'clinical',
    alsoKnownAs: ['Obs and Gynae'],
    overview:
      'Obstetrics covers pregnancy, childbirth and the postnatal period — routine ' +
      'antenatal care through to delivery. Gynaecology covers the reproductive ' +
      "health of women more broadly, including menstrual disorders, fertility, " +
      'pelvic conditions and gynaecological surgery. Together the specialty spans a ' +
      "woman's reproductive health at every stage of life, not only pregnancy.",
    commonConditions: [
      {
        name: 'Pregnancy care',
        description: "Routine monitoring of a mother and baby's health through each stage of pregnancy.",
      },
      {
        name: 'Menstrual disorders',
        description: 'Irregular, heavy or painful periods that affect daily life.',
      },
      {
        name: 'Fertility difficulties',
        description: 'Trouble conceiving, which can have a range of underlying causes in either partner.',
      },
      {
        name: 'Fibroids and ovarian cysts',
        description:
          'Non-cancerous growths in or around the uterus or ovaries that can cause pain or bleeding.',
      },
      {
        name: 'Menopause-related symptoms',
        description: 'Hormonal changes causing symptoms such as hot flushes or mood changes.',
      },
    ],
    commonTreatments: [
      {
        name: 'Antenatal checkups',
        description: 'Regular appointments to monitor a pregnancy and catch complications early.',
      },
      {
        name: 'Delivery care',
        description: 'Medical support during labour and childbirth, vaginal or surgical.',
      },
      {
        name: 'Hormonal treatment',
        description: 'Medication to regulate cycles, manage menopause, or support fertility.',
      },
      {
        name: 'Gynaecological surgery',
        description: 'Procedures ranging from minor to major, often performed laparoscopically.',
      },
      {
        name: 'Postnatal care',
        description: 'Follow-up care for mother and baby in the weeks after delivery.',
      },
    ],
  },
  {
    slug: 'paediatrics-neonatology',
    name: 'Pediatrics & Neonatology',
    category: 'clinical',
    overview:
      'Paediatrics is the medical care of infants, children and adolescents — growth ' +
      'and development, vaccination, and the diagnosis and treatment of childhood ' +
      'illness. Neonatology is the paediatric subspecialty focused specifically on ' +
      'newborns, particularly those born premature, at low birth weight, or needing ' +
      'intensive care in their first weeks of life.',
    commonConditions: [
      {
        name: 'Common childhood infections',
        description: 'Illnesses such as ear infections, tonsillitis or chickenpox.',
      },
      {
        name: 'Growth and developmental concerns',
        description: 'Monitoring whether a child is growing and developing as expected for their age.',
      },
      {
        name: 'Premature birth',
        description: 'Babies born before term, who often need specialised monitoring and support.',
      },
      {
        name: 'Low birth weight',
        description: 'Newborns needing closer observation and sometimes intensive care.',
      },
      {
        name: 'Childhood asthma and allergies',
        description: 'Breathing or immune conditions that commonly first appear in childhood.',
      },
    ],
    commonTreatments: [
      {
        name: 'Vaccination',
        description: 'Scheduled immunisation to protect against preventable childhood diseases.',
      },
      {
        name: 'Growth monitoring',
        description: 'Regular checks of height, weight and developmental milestones.',
      },
      {
        name: 'Neonatal intensive care',
        description: 'Specialised care for newborns who need extra support after birth.',
      },
      {
        name: 'Paediatric medication dosing',
        description: "Treatment adjusted carefully for a child's age and weight.",
      },
      {
        name: 'Parental guidance',
        description: 'Advice for parents on feeding, illness and when to seek further care.',
      },
    ],
  },
  {
    slug: 'neurosurgery',
    name: 'Neurosurgery',
    category: 'clinical',
    overview:
      'Neurosurgery is the surgical treatment of disorders affecting the brain, ' +
      'spinal cord, spinal column and peripheral nerves — including head injury, ' +
      'brain and spinal tumours, bleeds related to stroke, hydrocephalus, and ' +
      'structural spinal conditions that press on nerves. It works closely with ' +
      'neurology, which manages many of the same conditions through non-surgical ' +
      'treatment.',
    commonConditions: [
      {
        name: 'Head injury',
        description: 'Trauma to the skull or brain, ranging from mild concussion to severe injury.',
      },
      {
        name: 'Brain and spinal tumours',
        description: 'Abnormal growths that can press on brain or spinal tissue.',
      },
      {
        name: 'Hydrocephalus',
        description: 'A build-up of fluid in the brain that increases pressure inside the skull.',
      },
      {
        name: 'Herniated disc with nerve compression',
        description: 'A spinal disc pressing on a nerve, causing pain or weakness.',
      },
      {
        name: 'Stroke-related bleeding',
        description: 'Bleeding in or around the brain that needs urgent surgical assessment.',
      },
    ],
    commonTreatments: [
      {
        name: 'Neurological examination',
        description: 'Assessing reflexes, movement and sensation to locate a nervous system problem.',
      },
      {
        name: 'Brain and spinal imaging',
        description: 'CT or MRI scans used to see the structure of the brain and spine in detail.',
      },
      {
        name: 'Craniotomy',
        description: 'Surgery that opens part of the skull to access and treat the brain.',
      },
      {
        name: 'Spinal decompression surgery',
        description: 'Relieving pressure on a compressed nerve or the spinal cord.',
      },
      {
        name: 'Shunt placement',
        description:
          'A surgically implanted device to drain excess fluid and relieve pressure in hydrocephalus.',
      },
    ],
  },
  {
    slug: 'gastroenterology',
    name: 'Gastroenterology',
    category: 'clinical',
    overview:
      'Gastroenterology deals with the digestive system — the oesophagus, stomach, ' +
      'intestines, liver, pancreas and gallbladder. It covers conditions such as acid ' +
      'reflux, ulcers, irritable bowel syndrome, liver disease and gastrointestinal ' +
      'bleeding, diagnosed and often treated using endoscopic procedures that examine ' +
      'the digestive tract directly.',
    commonConditions: [
      {
        name: 'Acid reflux (GERD)',
        description: 'Stomach acid flowing back into the oesophagus, causing heartburn and regurgitation.',
      },
      {
        name: 'Peptic ulcers',
        description: 'Sores in the stomach or upper intestine lining, often causing pain after eating.',
      },
      {
        name: 'Irritable bowel syndrome',
        description: 'A long-term condition causing abdominal pain, bloating and altered bowel habits.',
      },
      {
        name: 'Liver disease',
        description: 'Conditions such as fatty liver or hepatitis that affect liver function over time.',
      },
      {
        name: 'Gastrointestinal bleeding',
        description: 'Bleeding anywhere along the digestive tract, ranging from minor to serious.',
      },
    ],
    commonTreatments: [
      {
        name: 'Endoscopy',
        description: 'Examining the digestive tract directly using a thin camera, often the first diagnostic step.',
      },
      {
        name: 'Medication management',
        description: 'Drugs to reduce acid, treat infection or control inflammation in the digestive tract.',
      },
      {
        name: 'Dietary modification',
        description: 'Adjusting diet to manage conditions such as IBS or acid reflux.',
      },
      {
        name: 'Liver function monitoring',
        description: 'Blood tests and imaging to track how well the liver is working.',
      },
      {
        name: 'Colonoscopy',
        description: 'Examining the large intestine to investigate bleeding, pain or screen for abnormalities.',
      },
    ],
  },
  {
    slug: 'urology',
    name: 'Urology',
    category: 'clinical',
    overview:
      'Urology covers the urinary tract in both sexes and the male reproductive ' +
      'system — the kidneys, bladder, ureters, urethra and prostate. It treats ' +
      'conditions including kidney stones, urinary infections, prostate enlargement, ' +
      'and cancers of the urinary tract, using a combination of medication, ' +
      'minimally invasive procedures and surgery.',
    commonConditions: [
      {
        name: 'Kidney stones',
        description: 'Hard mineral deposits that form in the kidney and can cause severe pain as they pass.',
      },
      {
        name: 'Urinary tract infections',
        description: 'Bacterial infections affecting the bladder, urethra or kidneys.',
      },
      {
        name: 'Prostate enlargement',
        description:
          'A non-cancerous increase in prostate size that can affect urination, common with age.',
      },
      {
        name: 'Urinary incontinence',
        description: 'Loss of bladder control, with a range of underlying causes.',
      },
      {
        name: 'Urological cancers',
        description: 'Cancers affecting the kidney, bladder, prostate or related organs.',
      },
    ],
    commonTreatments: [
      {
        name: 'Urine and blood tests',
        description: 'Laboratory tests used to detect infection, stones or other urinary problems.',
      },
      {
        name: 'Lithotripsy',
        description: 'A non-surgical technique that uses shock waves to break up kidney stones.',
      },
      {
        name: 'Cystoscopy',
        description: 'Examining the inside of the bladder and urethra using a thin camera.',
      },
      {
        name: 'Medication for prostate symptoms',
        description: 'Drugs used to ease urination difficulties from prostate enlargement.',
      },
      {
        name: 'Urological surgery',
        description: 'Procedures ranging from minimally invasive to major, depending on the condition.',
      },
    ],
  },
  {
    slug: 'spine-surgery',
    name: 'Spine Surgery',
    category: 'clinical',
    overview:
      'Spine surgery addresses structural problems of the spinal column — herniated ' +
      'discs, spinal stenosis, vertebral fractures, deformities such as scoliosis, ' +
      "and instability that presses on the spinal cord or nerve roots. It's typically " +
      "considered after non-surgical treatment, such as physiotherapy or pain " +
      "management, hasn't resolved symptoms, or where there's a risk of nerve damage.",
    commonConditions: [
      {
        name: 'Herniated disc',
        description: 'A spinal disc that has slipped or bulged, often pressing on a nearby nerve.',
      },
      {
        name: 'Spinal stenosis',
        description: 'Narrowing of the spinal canal that can compress the spinal cord or nerves.',
      },
      {
        name: 'Vertebral fractures',
        description: 'Broken bones in the spine, from injury or conditions that weaken bone.',
      },
      {
        name: 'Scoliosis',
        description: 'An abnormal sideways curve of the spine, which can be present from birth or develop later.',
      },
      {
        name: 'Spinal instability',
        description: 'Excess movement between vertebrae that can cause pain or nerve irritation.',
      },
    ],
    commonTreatments: [
      {
        name: 'Spinal imaging',
        description: 'X-ray, CT or MRI scans to assess the structure and alignment of the spine.',
      },
      {
        name: 'Physiotherapy and pain management',
        description: 'Non-surgical treatment tried first for many spinal conditions.',
      },
      {
        name: 'Spinal decompression surgery',
        description: 'Relieving pressure on a compressed nerve or the spinal cord.',
      },
      {
        name: 'Spinal fusion',
        description: 'Surgically joining two or more vertebrae to stabilise the spine.',
      },
      {
        name: 'Bracing',
        description: 'External support to limit movement and aid healing or correct alignment.',
      },
    ],
  },
  {
    slug: 'ophthalmology',
    name: 'Ophthalmology',
    category: 'clinical',
    overview:
      'Ophthalmology deals with the eyes and vision — from routine eye examinations ' +
      'and corrective lenses to the diagnosis and treatment of conditions such as ' +
      'cataracts, glaucoma, diabetic eye disease and retinal disorders. Treatment ' +
      'ranges from prescribed lenses and medication to surgical procedures such as ' +
      'cataract removal.',
    commonConditions: [
      {
        name: 'Cataracts',
        description: "Clouding of the eye's natural lens that blurs vision, common with age.",
      },
      {
        name: 'Glaucoma',
        description:
          'A condition where pressure inside the eye damages the optic nerve, often without early symptoms.',
      },
      {
        name: 'Diabetic eye disease',
        description: "Damage to the retina's blood vessels caused by long-term diabetes.",
      },
      {
        name: 'Retinal disorders',
        description: 'Conditions affecting the light-sensitive layer at the back of the eye.',
      },
      {
        name: 'Refractive errors',
        description: 'Short-sightedness, long-sightedness or astigmatism corrected with lenses.',
      },
    ],
    commonTreatments: [
      {
        name: 'Eye examination',
        description: "A routine check of vision, eye pressure and the structures of the eye.",
      },
      {
        name: 'Prescription lenses',
        description: 'Glasses or contact lenses to correct refractive errors.',
      },
      {
        name: 'Cataract surgery',
        description: 'Removing the clouded lens and replacing it with an artificial one.',
      },
      {
        name: 'Laser treatment',
        description: 'Used for certain retinal conditions and some forms of glaucoma.',
      },
      {
        name: 'Eye pressure monitoring',
        description: 'Regular checks to detect and manage glaucoma before it damages vision.',
      },
    ],
  },
  {
    slug: 'ent',
    name: 'ENT',
    category: 'clinical',
    alsoKnownAs: ['Ear Nose Throat'],
    overview:
      'Otolaryngology, commonly known as ENT, covers the ear, nose and throat along ' +
      'with related structures of the head and neck. It treats hearing loss, sinus ' +
      'and throat infections, balance disorders, voice and swallowing problems, and ' +
      'obstructive sleep conditions, using a mix of medical treatment and surgery.',
    commonConditions: [
      {
        name: 'Sinus infections',
        description: 'Inflammation of the sinuses causing congestion, pressure and pain.',
      },
      {
        name: 'Hearing loss',
        description: 'A partial or complete reduction in hearing, from many possible causes.',
      },
      {
        name: 'Tonsillitis',
        description: 'Inflammation of the tonsils, often from infection, common in children.',
      },
      {
        name: 'Balance disorders',
        description: 'Conditions affecting the inner ear that cause dizziness or vertigo.',
      },
      {
        name: 'Voice and swallowing problems',
        description: 'Difficulty speaking or swallowing, sometimes linked to the throat or vocal cords.',
      },
    ],
    commonTreatments: [
      {
        name: 'Ear, nose and throat examination',
        description: 'A direct examination, often using a scope, to identify the cause of symptoms.',
      },
      {
        name: 'Hearing tests',
        description: 'Assessing the type and extent of hearing loss.',
      },
      {
        name: 'Medication for infection',
        description: 'Antibiotics or other treatment for sinus, ear or throat infections.',
      },
      {
        name: 'Tonsillectomy',
        description: 'Surgical removal of the tonsils when infections are frequent or severe.',
      },
      {
        name: 'Sleep study',
        description: 'Used to diagnose obstructive sleep conditions such as sleep apnoea.',
      },
    ],
  },
  {
    slug: 'dentistry',
    name: 'Dentistry',
    category: 'clinical',
    alsoKnownAs: ['Dental', 'Oromaxillary Surgery'],
    overview:
      'Dentistry covers the diagnosis, treatment and prevention of conditions ' +
      'affecting the teeth, gums and mouth — from routine check-ups, fillings and ' +
      'root canal treatment to gum disease and tooth extraction. Oromaxillofacial ' +
      'surgery, a related surgical specialty, addresses more complex conditions of ' +
      'the jaw and facial structures.',
    commonConditions: [
      {
        name: 'Tooth decay',
        description: "Damage to a tooth's structure caused by acid-producing bacteria.",
      },
      {
        name: 'Gum disease',
        description: 'Inflammation and infection of the gums, ranging from mild to severe.',
      },
      {
        name: 'Impacted or damaged teeth',
        description: 'Teeth that fail to emerge properly or are broken or badly decayed.',
      },
      {
        name: 'Jaw misalignment',
        description: 'Issues with how the upper and lower jaw meet, affecting bite and appearance.',
      },
      {
        name: 'Oral infections',
        description: 'Infections of the teeth, gums or surrounding tissue.',
      },
    ],
    commonTreatments: [
      {
        name: 'Dental examination and X-rays',
        description: 'Checking for decay, gum disease and other problems, often not visible to the eye.',
      },
      {
        name: 'Fillings',
        description: 'Repairing a tooth damaged by decay.',
      },
      {
        name: 'Root canal treatment',
        description: 'Removing infected tissue from inside a tooth to save it from extraction.',
      },
      {
        name: 'Tooth extraction',
        description: "Removing a tooth that's too damaged or problematic to save.",
      },
      {
        name: 'Corrective jaw surgery',
        description: 'Surgical correction of significant jaw or bite misalignment.',
      },
    ],
  },
  {
    slug: 'anaesthesia-pain-management',
    name: 'Anaesthesia & Pain Management',
    category: 'clinical',
    overview:
      'Anaesthesia is responsible for keeping patients pain-free and safely ' +
      'unconscious or numbed during surgery, and for monitoring vital functions ' +
      'throughout a procedure. Pain management, often practised alongside it, ' +
      'focuses on diagnosing and treating chronic or difficult-to-control pain using ' +
      'medication, nerve blocks and other targeted techniques.',
    commonConditions: [
      {
        name: 'Chronic back or joint pain',
        description: 'Ongoing pain lasting months or years, often resistant to simple painkillers.',
      },
      {
        name: 'Nerve pain',
        description: 'Pain caused by damaged or irritated nerves, often described as burning or shooting.',
      },
      {
        name: 'Post-surgical pain',
        description: 'Pain following an operation, managed during recovery.',
      },
      {
        name: 'Cancer-related pain',
        description: 'Pain arising from cancer itself or its treatment.',
      },
      {
        name: 'Pain requiring surgical anaesthesia',
        description: "Any condition where a procedure needs the patient pain-free and safely monitored.",
      },
    ],
    commonTreatments: [
      {
        name: 'General anaesthesia',
        description: 'Inducing full unconsciousness for surgery, with continuous monitoring throughout.',
      },
      {
        name: 'Regional and local anaesthesia',
        description: 'Numbing a specific area or region of the body while the patient stays awake.',
      },
      {
        name: 'Nerve blocks',
        description: 'Targeted injections that interrupt pain signals from a specific nerve or area.',
      },
      {
        name: 'Pain medication management',
        description: 'Prescribing and adjusting medication to control acute or chronic pain.',
      },
      {
        name: 'Post-operative monitoring',
        description: 'Tracking vital signs and pain levels as anaesthesia wears off after surgery.',
      },
    ],
  },
  {
    slug: 'general-laparoscopic-surgery',
    name: 'General & Laparoscopic Surgery',
    category: 'clinical',
    alsoKnownAs: ['Gen. Surgery'],
    overview:
      'General surgery covers a broad range of procedures on the abdomen and its ' +
      'organs, along with hernias, the thyroid, and soft tissue conditions. ' +
      "Laparoscopic, or 'keyhole', surgery is a technique used across many of these " +
      'procedures — operating through small incisions with a camera and instruments ' +
      'rather than a single large cut, typically meaning less pain and a faster ' +
      'recovery than open surgery.',
    commonConditions: [
      {
        name: 'Hernias',
        description: 'A weakness in the abdominal wall that allows tissue to push through, causing a bulge.',
      },
      {
        name: 'Gallstones',
        description: 'Hardened deposits in the gallbladder that can cause pain or blockage.',
      },
      {
        name: 'Appendicitis',
        description: 'Inflammation of the appendix, usually needing urgent surgical removal.',
      },
      {
        name: 'Thyroid nodules',
        description: 'Lumps in the thyroid gland that sometimes need to be removed.',
      },
      {
        name: 'Abdominal masses',
        description: 'Lumps or growths in the abdomen that need surgical investigation or removal.',
      },
    ],
    commonTreatments: [
      {
        name: "Laparoscopic ('keyhole') surgery",
        description: 'Operating through small incisions with a camera and instruments.',
      },
      {
        name: 'Open surgery',
        description: "A traditional single-incision approach, used when keyhole surgery isn't suitable.",
      },
      {
        name: 'Hernia repair',
        description: 'Surgically closing the weakness in the abdominal wall, often reinforced with mesh.',
      },
      {
        name: 'Gallbladder removal',
        description: 'Surgically removing a gallbladder affected by gallstones.',
      },
      {
        name: 'Pre-surgical assessment',
        description: "Evaluating a patient's fitness for surgery and anaesthesia beforehand.",
      },
    ],
  },
  {
    slug: 'trauma-management',
    name: 'Trauma Management',
    category: 'clinical',
    overview:
      'Trauma management is the coordinated care of patients with serious physical ' +
      'injury, usually from accidents, falls or violence, where several body systems ' +
      'may be affected at once. It brings together emergency medicine, surgery, ' +
      'orthopaedics and critical care to stabilise a patient rapidly and treat ' +
      'injuries in the order that matters most to survival and recovery.',
    commonConditions: [
      {
        name: 'Multiple traumatic injuries',
        description: 'Injuries affecting more than one part of the body at once, often from accidents.',
      },
      {
        name: 'Internal bleeding',
        description: "Bleeding inside the body that isn't visible from outside but can be life-threatening.",
      },
      {
        name: 'Fractures from major trauma',
        description: 'Broken bones, sometimes complex, resulting from serious accidents or falls.',
      },
      {
        name: 'Head and spinal trauma',
        description: 'Injury to the brain or spine that needs urgent assessment to prevent lasting damage.',
      },
      {
        name: 'Shock',
        description:
          "A dangerous drop in blood flow to the body's organs, often following severe injury or blood loss.",
      },
    ],
    commonTreatments: [
      {
        name: 'Rapid trauma assessment',
        description: 'A structured, fast examination to identify life-threatening injuries first.',
      },
      {
        name: 'Emergency surgery',
        description: 'Urgent operations to control bleeding or repair critical injuries.',
      },
      {
        name: 'Blood transfusion',
        description: 'Replacing lost blood to stabilise a patient in shock.',
      },
      {
        name: 'Fracture stabilisation',
        description: 'Immobilising broken bones to prevent further injury before definitive treatment.',
      },
      {
        name: 'Coordinated multi-specialty care',
        description: 'Bringing together emergency medicine, surgery and critical care for complex trauma.',
      },
    ],
  },

  // ---- Diagnostics & imaging ------------------------------------------------
  {
    slug: 'endoscopy',
    name: 'Endoscopy',
    category: 'diagnostics',
    overview:
      'Endoscopy examines the inside of the body using a thin, flexible tube with a ' +
      "camera and light, most often passed through the mouth or another natural " +
      'opening. It investigates symptoms such as persistent indigestion, bleeding or ' +
      'swallowing difficulty, and can take tissue samples or treat some conditions ' +
      'directly during the same procedure.',
    commonConditions: [
      {
        name: 'Persistent indigestion',
        description: "Ongoing discomfort that doesn't respond to simple treatment, worth investigating directly.",
      },
      {
        name: 'Unexplained bleeding',
        description: 'Blood in stool or vomit, which endoscopy can often help locate the source of.',
      },
      {
        name: 'Swallowing difficulty',
        description: 'Trouble swallowing that may point to a blockage or narrowing in the oesophagus.',
      },
      {
        name: 'Suspected ulcers',
        description: 'Sores in the stomach or intestine lining that are best confirmed by direct examination.',
      },
    ],
    commonTreatments: [
      {
        name: 'Sedation',
        description: 'Most endoscopies are done with light sedation to keep the patient comfortable.',
      },
      {
        name: 'Passing the scope',
        description: 'A thin, flexible tube with a camera is guided through the mouth or another natural opening.',
      },
      {
        name: 'Tissue sampling',
        description: 'Small samples (biopsies) can be taken during the procedure for laboratory testing.',
      },
      {
        name: 'Recovery monitoring',
        description: 'A short recovery period is typical while sedation wears off.',
      },
    ],
  },
  {
    slug: 'radiology-imaging',
    name: 'Radiology & Imaging',
    category: 'diagnostics',
    overview:
      'Radiology and imaging use techniques such as X-ray, ultrasound, CT and MRI to ' +
      'produce pictures of the inside of the body without surgery. These images help ' +
      'diagnose a wide range of conditions — fractures, tumours, internal bleeding ' +
      'and organ abnormalities among them — and are often the first step in working ' +
      "out what's wrong before treatment is planned.",
    commonConditions: [
      {
        name: 'Suspected fractures',
        description: 'Bone injuries that imaging can confirm and show the extent of.',
      },
      {
        name: 'Internal injuries',
        description: 'Damage to organs or tissue not visible from outside the body.',
      },
      {
        name: 'Tumours',
        description: 'Abnormal growths that imaging can help locate and characterise.',
      },
      {
        name: 'Unexplained pain',
        description: 'Persistent pain where imaging helps identify or rule out a structural cause.',
      },
    ],
    commonTreatments: [
      {
        name: 'Choosing the right technique',
        description: 'X-ray, ultrasound, CT or MRI, selected based on what needs to be seen.',
      },
      {
        name: 'Contrast agents',
        description: 'Sometimes used to make certain tissues or blood vessels show up more clearly.',
      },
      {
        name: 'Image interpretation',
        description: 'A radiologist reviews the images to identify and describe any abnormality.',
      },
      {
        name: 'Follow-up imaging',
        description: 'Sometimes repeated over time to track how a condition changes.',
      },
    ],
  },
  {
    slug: 'ct-scan-x-ray',
    name: 'CT Scan / X-Ray',
    category: 'diagnostics',
    overview:
      'An X-ray uses a small dose of radiation to produce a quick image of bones and ' +
      'some soft tissues, commonly used to check for fractures, infections or chest ' +
      'conditions. A CT (computed tomography) scan combines many X-ray images taken ' +
      'from different angles into detailed cross-sectional pictures, giving a much ' +
      "closer look at organs, blood vessels and tissue than a plain X-ray can show.",
    commonConditions: [
      {
        name: 'Fractures',
        description: 'Broken bones, which X-ray usually confirms quickly.',
      },
      {
        name: 'Chest conditions',
        description: 'Infections such as pneumonia, or other lung abnormalities.',
      },
      {
        name: 'Internal bleeding or injury',
        description: 'Often assessed more thoroughly with CT than X-ray alone.',
      },
      {
        name: 'Blood vessel abnormalities',
        description: 'CT angiography can show blockages or abnormalities in blood vessels.',
      },
    ],
    commonTreatments: [
      {
        name: 'Positioning',
        description: 'The patient is positioned so the area of interest is clearly captured.',
      },
      {
        name: 'Brief exposure',
        description: 'X-rays take moments; CT scans take longer as the machine captures multiple angles.',
      },
      {
        name: 'Contrast dye',
        description: 'Sometimes given orally or by injection to improve the clarity of certain images.',
      },
      {
        name: 'Radiation safety',
        description: 'Both use ionising radiation, kept to the lowest dose needed for a clear image.',
      },
    ],
  },
  {
    slug: 'ultrasound',
    name: 'Ultrasound',
    category: 'diagnostics',
    alsoKnownAs: ['USG'],
    overview:
      'Ultrasound, also called sonography or USG, uses high-frequency sound waves to ' +
      "create real-time images of organs, tissues and blood flow without radiation. " +
      "It's widely used in pregnancy to monitor a baby's development, and elsewhere " +
      'in the body to examine the abdomen, pelvis, thyroid and other soft tissue for ' +
      'cysts, stones, blockages and other abnormalities.',
    commonConditions: [
      {
        name: 'Pregnancy monitoring',
        description: "Tracking a baby's growth and development throughout pregnancy.",
      },
      {
        name: 'Abdominal or pelvic pain',
        description: 'Investigating the cause of pain in organs such as the liver, gallbladder or ovaries.',
      },
      {
        name: 'Thyroid nodules',
        description: 'Lumps in the thyroid gland assessed for size and characteristics.',
      },
      {
        name: 'Suspected gallstones',
        description: 'Ultrasound is often the first test used to look for stones in the gallbladder.',
      },
    ],
    commonTreatments: [
      {
        name: 'Gel application',
        description: 'A gel helps the ultrasound probe make good contact with the skin.',
      },
      {
        name: 'Real-time imaging',
        description: 'Sound waves create a live image, useful for watching movement such as a heartbeat.',
      },
      {
        name: 'No radiation',
        description: 'Ultrasound uses sound waves, not radiation, making it safe for repeated use in pregnancy.',
      },
      {
        name: 'Quick, non-invasive procedure',
        description: 'Typically takes a short time with no recovery needed afterwards.',
      },
    ],
  },
  {
    slug: 'color-doppler',
    name: 'Color Doppler',
    category: 'diagnostics',
    overview:
      'Color Doppler is a form of ultrasound that shows the direction and speed of ' +
      "blood flow through vessels, displayed in colour over the standard image. It's " +
      'used to detect blockages, clots, narrowing or abnormal flow in arteries and ' +
      'veins, and is commonly used to assess blood flow to the heart, brain, limbs ' +
      'and, in pregnancy, the placenta.',
    commonConditions: [
      {
        name: 'Suspected blood clots',
        description: 'Doppler can show blockages or abnormal flow caused by a clot.',
      },
      {
        name: 'Narrowed arteries',
        description: 'Reduced blood flow from artery narrowing, often linked to plaque buildup.',
      },
      {
        name: 'Varicose veins',
        description: 'Assessing abnormal, enlarged veins and how blood is flowing through them.',
      },
      {
        name: 'Reduced circulation in limbs',
        description: 'Investigating poor blood flow that causes pain or slow healing.',
      },
    ],
    commonTreatments: [
      {
        name: 'Colour-coded imaging',
        description: 'Blood flow direction and speed are displayed in colour over a standard ultrasound image.',
      },
      {
        name: 'Probe placement',
        description: 'The probe is moved over the area of interest, such as the neck, limbs or abdomen.',
      },
      {
        name: 'No radiation or injections',
        description: 'A non-invasive scan using sound waves alone.',
      },
      {
        name: 'Combined with standard ultrasound',
        description: 'Often performed alongside a regular ultrasound scan for full context.',
      },
    ],
  },
  {
    slug: 'echocardiogram-tmt',
    name: 'Echocardiogram / TMT',
    category: 'diagnostics',
    overview:
      "An echocardiogram is an ultrasound scan of the heart that shows its chambers, " +
      "valves and how well it's pumping, without radiation. A TMT (treadmill test), " +
      "also called a stress test, monitors the heart's electrical activity and " +
      'response while walking on a treadmill at increasing intensity, used to check ' +
      'heart performance under exertion and help diagnose coronary artery disease.',
    commonConditions: [
      {
        name: 'Suspected heart valve problems',
        description: "Assessing how well the heart's valves are opening and closing.",
      },
      {
        name: 'Reduced heart pumping function',
        description: 'Checking how effectively the heart is pumping blood.',
      },
      {
        name: 'Chest pain on exertion',
        description: 'TMT helps assess whether physical activity triggers reduced blood flow to the heart.',
      },
      {
        name: 'Suspected coronary artery disease',
        description: 'Narrowed heart arteries that TMT can help identify through an exercise response.',
      },
    ],
    commonTreatments: [
      {
        name: 'Echocardiogram scanning',
        description: 'An ultrasound probe placed on the chest images the heart in real time.',
      },
      {
        name: 'Treadmill stress testing',
        description: 'Walking on a treadmill at increasing intensity while heart activity is monitored.',
      },
      {
        name: 'ECG monitoring',
        description: "Electrical activity of the heart is recorded throughout a TMT.",
      },
      {
        name: 'Results review',
        description: 'A cardiologist interprets the results to assess heart function and risk.',
      },
    ],
  },
  {
    slug: 'pathology-microbiology',
    name: 'Pathology & Microbiology',
    category: 'diagnostics',
    overview:
      'Pathology examines blood, tissue and other body samples in a laboratory to ' +
      'diagnose disease, monitor existing conditions, and guide treatment decisions ' +
      '— from routine blood counts to biopsy analysis. Microbiology identifies the ' +
      'bacteria, viruses, fungi or parasites responsible for an infection and, where ' +
      'relevant, which antibiotics are likely to work against them.',
    commonConditions: [
      {
        name: 'Routine health screening',
        description: 'Blood counts and panels used to check general health markers.',
      },
      {
        name: 'Suspected infection',
        description: 'Identifying the specific organism responsible for an infection.',
      },
      {
        name: 'Abnormal biopsy findings',
        description: 'Tissue samples examined under a microscope to diagnose disease.',
      },
      {
        name: 'Unexplained blood abnormalities',
        description: 'Investigating unusual results from a blood test.',
      },
    ],
    commonTreatments: [
      {
        name: 'Sample collection',
        description: 'Blood, urine, tissue or other samples collected for laboratory analysis.',
      },
      {
        name: 'Microscopic examination',
        description: 'Samples examined under a microscope to identify abnormal cells or organisms.',
      },
      {
        name: 'Culture testing',
        description: 'Growing a sample in the lab to identify bacteria, fungi or other organisms.',
      },
      {
        name: 'Reporting to the treating doctor',
        description: 'Results are sent to the doctor who ordered the test to guide treatment.',
      },
    ],
  },

  // ---- Patient support ------------------------------------------------------
  {
    slug: 'physiotherapy-rehabilitation',
    name: 'Physiotherapy & Rehabilitation',
    category: 'support',
    overview:
      'Physiotherapy uses movement, exercise, manual therapy and other physical ' +
      'techniques to restore function, reduce pain and improve mobility after ' +
      'injury, surgery or illness. Rehabilitation is the broader, often longer-term ' +
      'process of helping someone regain independence and quality of life, which ' +
      'may combine physiotherapy with other supportive therapies depending on the ' +
      'condition.',
    commonConditions: [
      {
        name: 'Recovery after surgery',
        description: 'Regaining strength and movement following an operation.',
      },
      {
        name: 'Sports injuries',
        description: 'Sprains, strains and other injuries from physical activity.',
      },
      {
        name: 'Stroke recovery',
        description: 'Rebuilding movement, strength and coordination after a stroke.',
      },
      {
        name: 'Chronic back or joint pain',
        description: 'Long-term pain that benefits from targeted movement and exercise.',
      },
      {
        name: 'Reduced mobility with age',
        description: 'Helping maintain strength, balance and independence.',
      },
    ],
    commonTreatments: [
      {
        name: 'Exercise therapy',
        description: 'Structured movement and strengthening exercises tailored to the individual.',
      },
      {
        name: 'Manual therapy',
        description: 'Hands-on techniques to improve joint and soft tissue movement.',
      },
      {
        name: 'Electrotherapy',
        description: 'Techniques such as ultrasound or electrical stimulation to aid healing or reduce pain.',
      },
      {
        name: 'Gait and balance training',
        description: 'Helping someone walk more safely and confidently.',
      },
      {
        name: 'Home exercise programmes',
        description: 'Exercises prescribed to continue progress between sessions.',
      },
    ],
  },
  {
    slug: 'dietetics-nutrition',
    name: 'Dietetics & Nutrition',
    category: 'support',
    overview:
      "Dietetics and nutrition involve assessing a person's dietary needs and " +
      'creating tailored eating plans to manage conditions such as diabetes, heart ' +
      'disease, kidney disease or malnutrition, and to support recovery after ' +
      'illness or surgery. A dietitian translates nutritional science into ' +
      "practical, achievable food choices for an individual's circumstances.",
    commonConditions: [
      {
        name: 'Diabetes',
        description: 'Managing blood sugar through tailored eating plans.',
      },
      {
        name: 'Obesity',
        description: 'Structured dietary support as part of a weight management plan.',
      },
      {
        name: 'Kidney disease',
        description: 'Diet adjusted to reduce strain on the kidneys.',
      },
      {
        name: 'Malnutrition',
        description: 'Addressing inadequate nutrition, whether from illness, age or other causes.',
      },
      {
        name: 'Recovery after illness or surgery',
        description: 'Nutrition tailored to support healing and regain strength.',
      },
    ],
    commonTreatments: [
      {
        name: 'Nutritional assessment',
        description: "Reviewing a person's diet, health history and specific needs.",
      },
      {
        name: 'Personalised meal planning',
        description: "Practical, achievable eating plans suited to an individual's condition and lifestyle.",
      },
      {
        name: 'Ongoing dietary counselling',
        description: 'Regular follow-up to adjust plans as needs change.',
      },
      {
        name: 'Education on food choices',
        description: 'Helping patients understand which foods help or worsen their condition.',
      },
      {
        name: 'Coordination with the treating doctor',
        description: 'Working alongside medical treatment rather than in place of it.',
      },
    ],
  },
  {
    slug: 'pharmacy',
    name: 'Pharmacy',
    category: 'support',
    overview:
      'A hospital pharmacy dispenses medicines prescribed by doctors, checks for ' +
      'interactions and correct dosing, and advises patients on how to take their ' +
      "medication safely. It's usually the last step before a prescribed treatment " +
      'actually reaches the patient, whether during a hospital stay or on discharge.',
  },
  {
    slug: 'ambulance',
    name: 'Ambulance',
    category: 'support',
    overview:
      'Ambulance services provide emergency transport and initial medical care for ' +
      'patients who need to reach a hospital quickly or who require monitoring and ' +
      'treatment while in transit. Crews are typically trained to stabilise common ' +
      'emergencies — such as breathing difficulty, chest pain or serious injury — ' +
      'before and during the journey to definitive care.',
  },
]

export function getService(slug: string): ClinicalService | undefined {
  return SERVICES.find((service) => service.slug === slug)
}

export function getCategory(id: ServiceCategory): ServiceCategoryDefinition {
  const category = SERVICE_CATEGORIES.find((entry) => entry.id === id)
  // Unreachable while ServiceCategory and SERVICE_CATEGORIES agree, and the throw is
  // what makes that a compile-and-run guarantee rather than an undefined at render.
  if (!category) throw new Error(`lib/services.ts: no definition for category "${id}"`)
  return category
}

/**
 * Canonical URL for a service.
 *
 * Every link to a service goes through here — nav, home grid, /centres, doctor
 * profiles. Nothing hard-codes a path, so recategorising a service in SERVICES moves
 * its URL and every link to it in one edit. The old hand-written hrefs are exactly how
 * "Specialities" and "Services" both ended up pointing at /centres.
 */
export function serviceHref(service: ClinicalService): string {
  return `${getCategory(service.category).basePath}/${service.slug}`
}

/** Same, from a slug. Returns undefined for a slug that is not on the list. */
export function serviceHrefBySlug(slug: string): string | undefined {
  const service = getService(slug)
  return service ? serviceHref(service) : undefined
}

export function servicesByCategory(category: ServiceCategory): ClinicalService[] {
  return SERVICES.filter((service) => service.category === category)
}

/** Display name for a slug; falls back to the slug so nothing ever renders blank. */
export function serviceName(slug: string): string {
  return getService(slug)?.name ?? slug.replace(/-/g, ' ')
}
