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
// `overview` (added 2026-09-24) is the one exception, and it is a narrow one: a
// generic, textbook-style description of what the specialty/test/service IS, written
// with no institutional subject at all — never "LIMS offers," "our specialists," "we
// perform." It's the same sentence you'd get from a medical reference work, not a
// claim about this hospital's capability. See ServiceDetail.tsx for how it renders.

export type ServiceCategory = 'clinical' | 'diagnostics' | 'support'

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
