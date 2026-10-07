// lib/service-content.ts
//
// The longer, GENERAL content behind each service page: when to see a doctor, how a
// condition is usually diagnosed, how a test is prepared for, common questions, and which
// other services are related.
//
// WHAT THIS IS. Reference-level patient information of the kind found on any hospital
// site or public health service page. It describes the field, not the hospital.
//
// WHAT THIS IS NOT. Nothing here says what LIMS has, does, owns or offers. The only
// facts about LIMS are the ones LIMS itself supplied (the service list, the two phone
// numbers, "arrive 15 minutes early"), and those are added by the page, not written here.
// The same rule as lib/services.ts: a claim about THIS hospital comes from LIMS or it does
// not exist. Things only LIMS can confirm (equipment, highlights, timings, stories,
// accreditations) live in lib/review-slots.ts and show up only in review mode.
//
// DRAFT STATUS. This copy was written without a clinician. It is deliberately
// conservative (no numbers, no dosages, no success rates, no timings) and every section
// is labelled as draft in review mode. A LIMS doctor must read and sign off each page
// before the site goes live.
//
// STYLE. No em-dashes anywhere in this file, and answers stay short. English only for
// now: Hindi and Punjabi versions of medical copy need a reviewer, not a machine pass.

import { SERVICES, getService } from '@/lib/services'

export interface DiagnosisItem {
  name: string
  detail: string
  /** A LIMS test or scan that does this. Must be a real slug in lib/services.ts. */
  slug?: string
}

export interface Step {
  title: string
  body: string
}

export interface Faq {
  q: string
  a: string
}

export interface ServiceExtras {
  /** What this specialty generally covers (clinical pages). */
  areas?: string[]
  /** The emergency department has its own wording for "when to come". */
  emergencyDept?: boolean
  /**
   * Not booked ahead (emergency care, pharmacy, ambulance). The page drops the "request an
   * appointment" link, the "arrive 15 minutes early" step and the booking FAQ, which would
   * be wrong advice for these.
   */
  noAppointment?: boolean
  /** Reasons to book a consultation. */
  seeDoctorIf?: string[]
  /** Warning signs that mean emergency care, not an appointment. */
  emergencyIf?: string[]
  /** How this kind of problem is usually diagnosed. */
  diagnosedBy?: DiagnosisItem[]
  /** Prevention and self-care (clinical pages). */
  prevention?: string[]
  /** Before the test (diagnostics) or what to bring (support). */
  prepare?: string[]
  /** During the test (diagnostics). */
  during?: string[]
  /** After the test (diagnostics). */
  after?: string[]
  /** Safety notes (diagnostics). */
  safety?: string[]
  /** How it works, step by step (support services). */
  steps?: Step[]
  /** Ambulance: the "what to bring" list is really "keep this ready". */
  keepReady?: boolean
  /** Service-specific questions. Two shared ones (booking, what to bring) are added by the page. */
  faqs: Faq[]
  /** Other services worth reading next. */
  related: string[]
}

export const SERVICE_EXTRAS: Record<string, ServiceExtras> = {
  /* ------------------------------------------------------------------------------ */
  /* Clinical departments                                                           */
  /* ------------------------------------------------------------------------------ */

  'emergency-services': {
    emergencyDept: true,
    noAppointment: true,
    areas: [
      'Triage and first assessment',
      'Resuscitation and stabilisation',
      'Accident and trauma care',
      'Heart and breathing emergencies',
      'Poisoning and overdose',
      'Referral to the right specialty',
    ],
    seeDoctorIf: [
      'Chest pain, pressure or tightness',
      'Difficulty breathing or choking',
      'Sudden weakness, facial droop or slurred speech',
      'Heavy bleeding that does not stop',
      'A serious injury, head injury or suspected broken bone',
      'A seizure, fainting or sudden confusion',
      'Suspected poisoning or overdose',
    ],
    emergencyIf: [
      'The person is not responding normally or is struggling to breathe',
      'The person cannot be moved safely, for example after a fall or road accident',
      'You are not sure how serious it is. Call and ask rather than wait',
    ],
    diagnosedBy: [
      {
        name: 'Triage and vital signs',
        detail:
          'Pulse, blood pressure, oxygen level and temperature are checked first to decide how urgent the problem is.',
      },
      {
        name: 'Blood and urine tests',
        detail: 'Give quick information about infection, blood count, sugar, salts and organ function.',
        slug: 'pathology-microbiology',
      },
      {
        name: 'X-ray and CT scan',
        detail: 'Show broken bones and injuries inside the head, chest and abdomen.',
        slug: 'ct-scan-x-ray',
      },
      {
        name: 'Ultrasound',
        detail: 'A quick, painless scan that can show fluid or bleeding inside the body.',
        slug: 'ultrasound',
      },
      {
        name: 'Heart tests',
        detail: 'A heart ultrasound (echocardiogram) shows how well the heart is pumping.',
        slug: 'echocardiogram-tmt',
      },
    ],
    prevention: [
      'Save emergency numbers on every family phone',
      'Keep a note of your medicines and allergies in your phone or wallet',
      'Use seat belts, helmets and child safety seats',
      'Store medicines, cleaning products and pesticides out of children\'s reach',
    ],
    faqs: [
      {
        q: "Do I need an appointment for emergency care?",
        a: "No. Emergencies are seen without an appointment, and the most urgent cases are attended to first.",
      },
      {
        q: "What is India's national emergency number?",
        a: "112 is the single emergency number for police, fire and ambulance across India.",
      },
      {
        q: "What should I carry to the emergency department?",
        a: "Photo ID, any reports or prescriptions, a list of medicines and allergies, and a relative's phone number. Do not delay leaving to collect papers.",
      },
      {
        q: "Will I be admitted?",
        a: "After assessment the doctor explains whether you can go home with treatment or need to stay for monitoring or surgery.",
      },
    ],
    related: ['trauma-management', 'ambulance', 'general-medicine', 'ct-scan-x-ray'],
  },

  'general-medicine': {
    areas: [
      'Adult illness and infections',
      'Diabetes and thyroid conditions',
      'Blood pressure and heart risk',
      'Chest and breathing problems',
      'Fever and long-term fever',
      'Preventive check-ups',
    ],
    seeDoctorIf: [
      'A fever that lasts more than a few days or keeps returning',
      'Ongoing tiredness, weight change or loss of appetite without a clear reason',
      'A persistent cough, or breathlessness on effort',
      'Raised blood sugar or blood pressure readings',
      'Swelling of the feet, face or body',
      'A regular review of a long-term condition such as diabetes or high blood pressure',
    ],
    emergencyIf: [
      'Chest pain with sweating, breathlessness or pain spreading to the arm or jaw',
      'Sudden weakness on one side, slurred speech or facial droop',
      'High fever with confusion, a stiff neck or a rash that does not fade',
      'Fainting or severe difficulty breathing',
    ],
    diagnosedBy: [
      {
        name: 'History and examination',
        detail:
          'Your doctor asks about symptoms and checks pulse, blood pressure, heart, lungs and abdomen.',
      },
      {
        name: 'Blood and urine tests',
        detail: 'Check blood count, sugar, kidney and liver function, and signs of infection.',
        slug: 'pathology-microbiology',
      },
      {
        name: 'Chest X-ray',
        detail: 'Shows the lungs, heart outline and chest bones.',
        slug: 'ct-scan-x-ray',
      },
      {
        name: 'Abdominal ultrasound',
        detail: 'A painless scan of the liver, kidneys, gallbladder and other organs.',
        slug: 'ultrasound',
      },
      {
        name: 'Heart tests',
        detail: 'An echocardiogram or treadmill test can check how the heart works.',
        slug: 'echocardiogram-tmt',
      },
    ],
    prevention: [
      'Check your blood pressure and blood sugar regularly, especially after 30 or with a family history',
      'Stay active most days and limit salt, sugar and fried food',
      'Avoid tobacco and limit alcohol',
      'Keep vaccinations up to date as your doctor advises',
    ],
    faqs: [
      {
        q: "Do I need a referral to see a general physician?",
        a: "No. A general physician is usually the first point of contact and refers you to a specialist if needed.",
      },
      {
        q: "Is a fever always an infection?",
        a: "Not always. Fever shows that the body is reacting to something, often an infection but sometimes another cause. A doctor can decide whether tests are needed.",
      },
      {
        q: "Which reports should I bring?",
        a: "Bring earlier test results, discharge summaries and all current medicines, including supplements, so the doctor sees the full picture.",
      },
    ],
    related: ['pathology-microbiology', 'ultrasound', 'echocardiogram-tmt', 'dietetics-nutrition'],
  },

  'ortho-joint-replacement': {
    areas: [
      'Joint replacement (knee, hip, shoulder)',
      'Fractures and bone injury',
      'Sports and ligament injuries',
      'Arthritis care',
      'Hand, foot and ankle problems',
      'Bone and joint infection',
    ],
    seeDoctorIf: [
      'Joint pain that limits walking, stairs or sleep',
      'Swelling, stiffness, or a joint that locks or gives way',
      'Pain after a fall or sports injury that does not settle in a few days',
      'Trouble standing up from a chair or walking short distances because of knee or hip pain',
      'A limb or joint that looks out of shape',
      'Pain in the heel, shoulder or wrist that keeps returning',
    ],
    emergencyIf: [
      'A bone sticking through the skin, or an obviously deformed limb',
      'Heavy bleeding with an injury',
      'A cold, pale or numb limb after an injury',
      'Hip or leg pain after a fall in an older person who cannot put weight on the leg',
    ],
    diagnosedBy: [
      {
        name: 'Examination and movement tests',
        detail: 'The doctor checks range of movement, swelling, strength and stability.',
      },
      {
        name: 'X-ray',
        detail: 'Shows bones, joint spacing and fractures.',
        slug: 'ct-scan-x-ray',
      },
      {
        name: 'CT scan',
        detail: 'Gives a detailed view of complex fractures and joints.',
        slug: 'ct-scan-x-ray',
      },
      {
        name: 'Ultrasound',
        detail: 'Can show fluid, tendons and soft tissue around a joint.',
        slug: 'ultrasound',
      },
      {
        name: 'Other imaging and blood tests',
        detail: 'Used when more detail is needed, or to look for infection or inflammation.',
        slug: 'radiology-imaging',
      },
    ],
    prevention: [
      'Keep a healthy weight to reduce the load on knees and hips',
      'Strengthen the muscles around your joints with regular, gentle exercise',
      'Warm up before sport and wear proper footwear',
      'Make floors safer for older family members: remove loose rugs and add handrails',
      'Get enough calcium and vitamin D as your doctor advises',
    ],
    faqs: [
      {
        q: "Does knee pain always mean I need a replacement?",
        a: "No. Many people improve with exercise, weight management, medicines or injections. Replacement is usually considered when other treatment no longer controls pain or movement.",
      },
      {
        q: "How long is recovery after joint replacement?",
        a: "It varies by person and by joint. Your surgeon and physiotherapist explain a plan for walking, exercises and follow-up.",
      },
      {
        q: "Will I need physiotherapy?",
        a: "Most people do. Rehabilitation helps restore movement and strength and is planned around your surgery.",
      },
    ],
    related: ['spine-surgery', 'trauma-management', 'physiotherapy-rehabilitation', 'ct-scan-x-ray'],
  },

  'obstetrics-gynaecology': {
    areas: [
      'Antenatal care and pregnancy checks',
      'Labour and delivery',
      'Postnatal care',
      'Menstrual and hormonal problems',
      'Fertility concerns',
      'Gynaecological surgery, including laparoscopy',
      'Menopause care',
    ],
    seeDoctorIf: [
      'You think you may be pregnant, or are planning a pregnancy',
      'Missed, very heavy, very painful or irregular periods',
      'Pelvic pain, unusual discharge or bleeding between periods',
      'Difficulty conceiving after a year of trying',
      'Hot flushes, mood change or other symptoms around menopause',
    ],
    emergencyIf: [
      'Heavy bleeding in pregnancy, or bleeding with severe pain',
      'Reduced or no baby movements in later pregnancy',
      'Severe headache, vision changes or sudden swelling in pregnancy',
      'Waters breaking, or regular painful contractions before the due date',
      'Fainting or severe abdominal pain',
    ],
    diagnosedBy: [
      {
        name: 'History and examination',
        detail: 'Questions about periods, pregnancy history and symptoms, with a physical check.',
      },
      {
        name: 'Pregnancy and pelvic ultrasound',
        detail: "Checks the baby's growth and position, or looks at the uterus and ovaries.",
        slug: 'ultrasound',
      },
      {
        name: 'Colour Doppler',
        detail: 'Can assess blood flow to the baby and placenta when your doctor advises it.',
        slug: 'color-doppler',
      },
      {
        name: 'Blood and urine tests',
        detail: 'Check haemoglobin, blood group, sugar, thyroid and infections.',
        slug: 'pathology-microbiology',
      },
    ],
    prevention: [
      'Start antenatal check-ups as early in pregnancy as possible',
      'Take folic acid and other supplements only as your doctor advises',
      'Do not use tobacco or alcohol in pregnancy',
      'Keep vaccinations up to date as advised',
      'Attend cervical screening as your doctor recommends',
    ],
    faqs: [
      {
        q: "When should I first see a doctor in pregnancy?",
        a: "As soon as you know you are pregnant, or after a missed period with a positive test. Early check-ups help plan care for you and the baby.",
      },
      {
        q: "How often are antenatal visits?",
        a: "It depends on your health and stage of pregnancy. Your doctor sets a schedule and changes it if needed.",
      },
      {
        q: "Is ultrasound safe in pregnancy?",
        a: "Ultrasound uses sound waves, not radiation, and is widely used in pregnancy when medically advised.",
      },
    ],
    related: ['paediatrics-neonatology', 'ultrasound', 'color-doppler', 'dietetics-nutrition'],
  },

  'paediatrics-neonatology': {
    areas: [
      'Newborn and neonatal care',
      'Growth and development checks',
      'Childhood infections and fever',
      'Vaccination',
      'Breathing, allergy and asthma',
      'Nutrition and feeding problems',
    ],
    seeDoctorIf: [
      'A fever in a child that lasts more than a day or two',
      'Poor feeding, slow weight gain or slow development',
      'Cough, fast breathing or wheeze',
      'Vomiting or loose motions that do not settle',
      'A rash that is spreading or not improving',
      'You want to check vaccinations or growth',
    ],
    emergencyIf: [
      'A baby under three months with fever',
      'Fast or laboured breathing, or lips turning blue',
      'A child who is very drowsy, hard to wake or having a fit',
      'Signs of dehydration: no urine for many hours, dry mouth, sunken eyes',
      'Swallowing a medicine, chemical or battery',
    ],
    diagnosedBy: [
      {
        name: 'Growth and development check',
        detail: 'Height, weight and head size are plotted on growth charts, and milestones are reviewed.',
      },
      {
        name: 'Blood and urine tests',
        detail: 'Help find infection, anaemia and other causes of illness.',
        slug: 'pathology-microbiology',
      },
      {
        name: 'Chest X-ray',
        detail: 'Looks at the lungs when breathing problems or a long cough need explaining.',
        slug: 'ct-scan-x-ray',
      },
      {
        name: 'Ultrasound',
        detail: 'A painless scan that uses no radiation, used for the abdomen and other organs.',
        slug: 'ultrasound',
      },
      {
        name: 'Heart check',
        detail: 'An echocardiogram shows the structure and pumping of a child\'s heart.',
        slug: 'echocardiogram-tmt',
      },
    ],
    prevention: [
      'Follow the national immunisation schedule',
      'Breastfeed exclusively for the first six months unless your doctor advises otherwise',
      'Wash hands before feeding and after using the toilet',
      'Keep children away from smoke',
      'Give balanced, age-appropriate food',
    ],
    faqs: [
      {
        q: "When is a fever a concern in children?",
        a: "Any fever in a baby under three months needs urgent attention. In older children, see a doctor if fever lasts more than a couple of days, or if the child is drowsy, not drinking or breathing fast.",
      },
      {
        q: "What is neonatology?",
        a: "Neonatology is the care of newborn babies, especially those born early or with health problems in the first weeks of life.",
      },
      {
        q: "How do I know if my child's growth is normal?",
        a: "Doctors compare height and weight with growth charts for the child's age. The trend over time matters more than a single reading.",
      },
    ],
    related: ['obstetrics-gynaecology', 'dietetics-nutrition', 'ultrasound', 'pathology-microbiology'],
  },

  neurosurgery: {
    areas: [
      'Head and brain injury',
      'Brain and spinal tumours',
      'Hydrocephalus and shunts',
      'Brain bleeds related to stroke',
      'Spinal disc and nerve compression',
      'Peripheral nerve problems',
    ],
    seeDoctorIf: [
      'Headaches that are new, getting worse, or wake you from sleep',
      'Numbness, tingling or weakness in an arm or leg',
      'Back or neck pain that spreads down a limb',
      'Seizures, or blackouts without a clear cause',
      'New balance problems, vision change or memory change',
      'A head injury, even a minor one, followed by headache or vomiting',
    ],
    emergencyIf: [
      'A head injury followed by repeated vomiting, drowsiness or confusion',
      'A sudden, severe headache unlike any before',
      'Sudden weakness, numbness, slurred speech or loss of vision',
      'A seizure that lasts more than five minutes or does not stop',
      'Loss of control of bladder or bowel with back pain',
    ],
    diagnosedBy: [
      {
        name: 'Neurological examination',
        detail: 'Checks reflexes, strength, sensation, balance and coordination.',
      },
      {
        name: 'CT scan',
        detail: 'A quick scan to look for bleeding, fractures or swelling after injury.',
        slug: 'ct-scan-x-ray',
      },
      {
        name: 'MRI and other imaging',
        detail: 'Shows detail of the brain, spinal cord and nerves when your doctor advises it.',
        slug: 'radiology-imaging',
      },
      {
        name: 'Blood tests',
        detail: 'Look for infection, clotting problems and other causes.',
        slug: 'pathology-microbiology',
      },
    ],
    prevention: [
      'Wear a helmet on two-wheelers and a seat belt in cars',
      'Keep blood pressure and diabetes under control to lower stroke risk',
      'Lift with your knees and avoid sudden twisting to protect your back',
      'Make homes safer for older people to prevent falls',
    ],
    faqs: [
      {
        q: "Does neurosurgery always mean an operation?",
        a: "No. Many problems are managed with medicines, rest, physiotherapy or monitoring. Surgery is advised only when it is likely to help.",
      },
      {
        q: "What is the difference between a neurologist and a neurosurgeon?",
        a: "A neurologist diagnoses and treats nervous system conditions, mainly with medicines and therapy. A neurosurgeon operates on the brain, spine and nerves. They often work together.",
      },
      {
        q: "Is every headache a sign of a brain problem?",
        a: "No. Most headaches are not caused by serious disease. Headaches that are sudden, severe, new, or come with weakness or vomiting need prompt medical attention.",
      },
    ],
    related: ['spine-surgery', 'trauma-management', 'radiology-imaging', 'physiotherapy-rehabilitation'],
  },

  gastroenterology: {
    areas: [
      'Stomach and food pipe conditions',
      'Liver and gallbladder disease',
      'Pancreas problems',
      'Bowel and colon conditions',
      'Endoscopy and colonoscopy',
      'Nutrition and digestion problems',
    ],
    seeDoctorIf: [
      'Heartburn or acidity that keeps coming back',
      'Stomach pain, bloating or nausea that lasts',
      'Long-term constipation or loose motions',
      'Difficulty swallowing, or food getting stuck',
      'Yellow eyes or skin, or dark urine',
      'Blood in the stool, or unexplained weight loss',
    ],
    emergencyIf: [
      'Vomiting blood, or passing black, tarry stool',
      'Severe, constant abdominal pain, especially with fever or a hard belly',
      'Being unable to keep fluids down for a day or more',
      'Yellowing of the eyes with confusion or drowsiness',
    ],
    diagnosedBy: [
      {
        name: 'History and examination',
        detail: 'Questions about food, bowel habits and pain, with a check of the abdomen.',
      },
      {
        name: 'Endoscopy',
        detail: 'A thin flexible tube with a camera looks at the food pipe, stomach and upper intestine.',
        slug: 'endoscopy',
      },
      {
        name: 'Abdominal ultrasound',
        detail: 'Looks at the liver, gallbladder, pancreas and kidneys.',
        slug: 'ultrasound',
      },
      {
        name: 'Blood and stool tests',
        detail: 'Check liver function, blood count and infection.',
        slug: 'pathology-microbiology',
      },
      {
        name: 'CT scan',
        detail: 'Gives more detail when an ultrasound is not enough.',
        slug: 'ct-scan-x-ray',
      },
    ],
    prevention: [
      'Eat regular meals with plenty of fibre, fruit and vegetables',
      'Drink clean, safe water and wash hands before eating',
      'Avoid tobacco, and limit alcohol',
      'Take painkillers only as advised, as some can irritate the stomach',
      'Ask your doctor about hepatitis vaccination',
    ],
    faqs: [
      {
        q: "Is acidity always harmless?",
        a: "Occasional acidity is common. If it is frequent, wakes you at night, or comes with trouble swallowing, weight loss or vomiting, it needs a doctor's review.",
      },
      {
        q: "Does endoscopy hurt?",
        a: "It is usually done with the throat numbed or with sedation, so most people feel pressure or mild discomfort. Your doctor explains what to expect beforehand.",
      },
      {
        q: "How should I prepare for an endoscopy?",
        a: "You are usually asked not to eat or drink for several hours before. Follow the exact instructions you are given and mention any medicines or allergies.",
      },
    ],
    related: ['endoscopy', 'ultrasound', 'general-laparoscopic-surgery', 'dietetics-nutrition'],
  },

  urology: {
    areas: [
      'Kidney and ureter stones',
      'Prostate problems',
      'Urinary infections',
      'Urine flow problems and incontinence',
      'Kidney and bladder conditions',
      'Male reproductive health',
    ],
    seeDoctorIf: [
      'Pain in the side or lower back that comes in waves',
      'Burning, frequent or urgent urination',
      'Difficulty starting urine, or a weak flow',
      'Blood in the urine',
      'Waking several times at night to pass urine',
      'Pain or swelling in the testicles',
    ],
    emergencyIf: [
      'Being unable to pass urine at all',
      'Severe pain in the side with fever or vomiting',
      'Sudden severe pain or swelling in a testicle',
      'A lot of blood in the urine, or blood clots',
    ],
    diagnosedBy: [
      {
        name: 'History and examination',
        detail: 'Questions about urine, pain and past stones, with a physical check.',
      },
      {
        name: 'Urine tests',
        detail: 'Check for infection, blood and crystals.',
        slug: 'pathology-microbiology',
      },
      {
        name: 'Ultrasound',
        detail: 'Looks at the kidneys, bladder and prostate.',
        slug: 'ultrasound',
      },
      {
        name: 'X-ray and CT scan',
        detail: 'Show stones and blockage in the urinary tract.',
        slug: 'ct-scan-x-ray',
      },
      {
        name: 'Colour Doppler',
        detail: 'Checks blood flow when advised, for example in the testicles.',
        slug: 'color-doppler',
      },
    ],
    prevention: [
      'Drink enough water through the day, enough to keep urine pale yellow',
      'Do not hold urine for long periods',
      'If you have had stones, follow your doctor\'s advice on salt and diet',
      'Keep diabetes and blood pressure under control',
    ],
    faqs: [
      {
        q: "Do all kidney stones need surgery?",
        a: "No. Small stones may pass with fluids and medicines. Larger or blocking stones may need a procedure. A doctor decides after scans.",
      },
      {
        q: "Is blood in urine always serious?",
        a: "It always needs to be checked. Causes range from infection and stones to other conditions.",
      },
      {
        q: "Why do I wake several times at night to pass urine?",
        a: "Common causes include drinking late, diabetes, and prostate enlargement in men. A doctor can find out which applies.",
      },
    ],
    related: ['ultrasound', 'ct-scan-x-ray', 'pathology-microbiology', 'color-doppler'],
  },

  'spine-surgery': {
    areas: [
      'Slipped (herniated) disc',
      'Narrowing of the spinal canal',
      'Spinal deformity such as scoliosis',
      'Spinal injury and fractures',
      'Spinal infection and tumours',
      'Long-term back and neck pain',
    ],
    seeDoctorIf: [
      'Back or neck pain that lasts more than a few weeks',
      'Pain, tingling or numbness spreading to an arm or leg',
      'Leg weakness, or a foot that drags',
      'Pain that is worse at night or does not ease with rest',
      'A curve in the spine that is becoming more noticeable',
      'Pain after a fall or accident',
    ],
    emergencyIf: [
      'Loss of control of bladder or bowel',
      'Numbness around the groin or inner thighs',
      'Sudden weakness in both legs',
      'Back pain after a serious accident or fall from a height',
    ],
    diagnosedBy: [
      {
        name: 'Examination',
        detail: 'Checks posture, movement, strength and reflexes.',
      },
      {
        name: 'X-ray of the spine',
        detail: 'Shows alignment and bone changes.',
        slug: 'ct-scan-x-ray',
      },
      {
        name: 'CT scan',
        detail: 'Gives detail of the bones of the spine.',
        slug: 'ct-scan-x-ray',
      },
      {
        name: 'MRI',
        detail: 'Shows discs, the spinal cord and nerves in detail when your doctor advises it.',
        slug: 'radiology-imaging',
      },
      {
        name: 'Nerve tests',
        detail: 'May be advised when nerve damage is suspected.',
      },
    ],
    prevention: [
      'Keep your back strong with regular core and back exercises',
      'Sit with support and take short breaks from long periods of sitting',
      'Lift with your legs, not your back',
      'Keep a healthy weight',
      'Avoid smoking, which affects spinal discs',
    ],
    faqs: [
      {
        q: "Does back pain mean I need surgery?",
        a: "Most back pain improves with rest, medicines and exercise. Surgery is considered when there is nerve damage, severe pain that does not improve, or spinal instability.",
      },
      {
        q: "How long should I rest with back pain?",
        a: "Short rest is fine, but staying very still for long can slow recovery. Gentle movement, as advised by your doctor or physiotherapist, usually helps.",
      },
      {
        q: "Is keyhole spine surgery always possible?",
        a: "It suits some conditions and not others. The surgeon recommends the approach after examining you and reviewing scans.",
      },
    ],
    related: ['neurosurgery', 'ortho-joint-replacement', 'physiotherapy-rehabilitation', 'radiology-imaging'],
  },

  ophthalmology: {
    areas: [
      'Cataract',
      'Glaucoma',
      'Retina and diabetic eye disease',
      "Squint and children's eye care",
      'Dry eye and eye infection',
      'Glasses and refractive errors',
    ],
    seeDoctorIf: [
      'Blurred or cloudy vision',
      'Eye pain, redness or watering that does not settle',
      'Floaters, flashes, or a curtain over part of your vision',
      'Difficulty seeing at night or in bright light',
      'Frequent headaches with eye strain',
      'Your child holds things very close, squints or sits too near the television',
    ],
    emergencyIf: [
      'A sudden loss, or sharp drop, in vision',
      'A chemical splash in the eye (rinse with clean water first)',
      'An injury to the eye, or something stuck in it',
      'Severe eye pain with nausea, or halos around lights',
    ],
    diagnosedBy: [
      {
        name: 'Vision and eye pressure check',
        detail: 'Measures how clearly you see and the pressure inside the eye.',
      },
      {
        name: 'Slit lamp examination',
        detail: 'A microscope with a bright light shows the front of the eye and the lens.',
      },
      {
        name: 'Dilated retina examination',
        detail: 'Eye drops widen the pupil so the back of the eye can be seen.',
      },
      {
        name: 'Ultrasound of the eye',
        detail: 'Used when the back of the eye cannot be seen clearly.',
        slug: 'ultrasound',
      },
    ],
    prevention: [
      'Have regular eye check-ups, and more often if you have diabetes',
      'Wear sunglasses and protective eyewear where needed',
      'Take regular breaks from screens',
      'Do not rub your eyes or use eye drops without advice',
    ],
    faqs: [
      {
        q: "Who should have regular eye check-ups?",
        a: "Everyone benefits from periodic checks. People with diabetes, high blood pressure, a family history of eye disease, and anyone over 40 should be checked regularly.",
      },
      {
        q: "Is cataract surgery safe?",
        a: "Cataract surgery is one of the most commonly performed operations. Your surgeon explains the benefits and risks for you before deciding.",
      },
      {
        q: "Can children get glasses?",
        a: "Yes. Early checks matter because an untreated vision problem can affect learning and eye development.",
      },
    ],
    related: ['ent', 'paediatrics-neonatology', 'general-medicine', 'pharmacy'],
  },

  ent: {
    areas: [
      'Ear infections and hearing loss',
      'Nose and sinus problems',
      'Throat and voice disorders',
      'Tonsils and adenoids',
      'Dizziness and balance',
      'Snoring and sleep-related breathing problems',
      'Head and neck lumps',
    ],
    seeDoctorIf: [
      'Ear pain, discharge or reduced hearing',
      'A blocked nose or sinus symptoms lasting more than a few weeks',
      'A sore throat that keeps returning, or a hoarse voice for more than two weeks',
      'Dizziness or a spinning sensation',
      'Frequent nosebleeds',
      'Snoring with pauses in breathing',
      'A lump in the neck',
    ],
    emergencyIf: [
      'Difficulty breathing, or noisy breathing',
      'A nosebleed that does not stop after 15 minutes of firm pressure',
      'Something stuck in a child\'s nose, ear or throat',
      'Sudden hearing loss in one ear',
      'Swelling of the face or throat with trouble swallowing',
    ],
    diagnosedBy: [
      {
        name: 'Examination of ear, nose and throat',
        detail: 'Using a light, small mirror or a tiny camera.',
      },
      {
        name: 'Hearing tests',
        detail: 'Check how well each ear hears.',
      },
      {
        name: 'Endoscopic examination',
        detail: 'A thin scope shows parts of the nose and throat that cannot be seen otherwise.',
        slug: 'endoscopy',
      },
      {
        name: 'CT scan of the sinuses',
        detail: 'Gives detail of the sinuses and surrounding bone.',
        slug: 'ct-scan-x-ray',
      },
      {
        name: 'Ultrasound of the neck',
        detail: 'Looks at lumps in the neck.',
        slug: 'ultrasound',
      },
    ],
    prevention: [
      'Do not put cotton buds or sharp objects into the ear',
      'Keep ears dry after swimming or bathing',
      'Avoid very loud sound for long periods',
      'Seek treatment for a long-standing blocked nose or repeated throat infections',
      'Do not use nasal decongestant sprays for long without advice',
    ],
    faqs: [
      {
        q: "Is ear wax harmful?",
        a: "Wax protects the ear and usually clears by itself. Do not dig it out. See a doctor if the ear feels blocked or painful.",
      },
      {
        q: "Why do children get ear infections often?",
        a: "In children the ear tubes are shorter and flatter, so germs from colds travel more easily. Frequent infections should be checked.",
      },
      {
        q: "When are tonsils removed?",
        a: "Only when infections are very frequent or severe, or cause breathing problems. The doctor decides after examination.",
      },
    ],
    related: ['endoscopy', 'ct-scan-x-ray', 'paediatrics-neonatology', 'anaesthesia-pain-management'],
  },

  dentistry: {
    areas: [
      'Check-ups and cleaning',
      'Fillings and root canal treatment',
      'Gum disease',
      'Tooth removal and wisdom teeth',
      'Crowns, bridges and dentures',
      'Braces and tooth alignment',
      'Jaw and mouth surgery',
    ],
    seeDoctorIf: [
      'Toothache, or sensitivity to hot or cold',
      'Bleeding or swollen gums',
      'Bad breath that does not go away',
      'A broken, loose or missing tooth',
      'A mouth ulcer that does not heal in two weeks',
      'Jaw pain, clicking, or difficulty opening the mouth',
    ],
    emergencyIf: [
      'Swelling of the face or jaw with fever or trouble swallowing',
      'A tooth knocked out (keep it moist in milk and see a dentist quickly)',
      'Bleeding after a tooth removal that does not stop with pressure',
      'An injury to the jaw or face',
    ],
    diagnosedBy: [
      {
        name: 'Dental examination',
        detail: 'The dentist checks teeth, gums, bite and the lining of the mouth.',
      },
      {
        name: 'Dental X-rays',
        detail: 'Show tooth roots, bone and decay that cannot be seen from outside.',
        slug: 'ct-scan-x-ray',
      },
      {
        name: 'Gum and bite assessment',
        detail: 'Measures gum health and how the teeth meet.',
      },
      {
        name: 'Tissue tests',
        detail: 'A small sample from a persistent ulcer or lump is studied in the laboratory.',
        slug: 'pathology-microbiology',
      },
    ],
    prevention: [
      'Brush twice a day with fluoride toothpaste',
      'Clean between your teeth daily',
      'Limit sugary snacks and drinks',
      'See a dentist for a check-up at least once a year',
      'Avoid tobacco and betel quid, which raise the risk of mouth disease',
    ],
    faqs: [
      {
        q: "How often should I see a dentist?",
        a: "At least once a year, or more often if you have gum disease or other problems your dentist wants to monitor.",
      },
      {
        q: "Is root canal treatment painful?",
        a: "It is done under local anaesthesia, so it should not hurt during the procedure. Some tenderness afterwards is common and usually settles.",
      },
      {
        q: "At what age should a child first see a dentist?",
        a: "Usually by the first birthday or when the first tooth appears, so problems are caught early.",
      },
    ],
    related: ['ent', 'anaesthesia-pain-management', 'pharmacy', 'dietetics-nutrition'],
  },

  'anaesthesia-pain-management': {
    areas: [
      'Anaesthesia for surgery',
      'Spinal, epidural and nerve block anaesthesia',
      'Pain relief after surgery',
      'Long-term pain care',
      'Check-up before surgery',
      'Critical care support',
    ],
    seeDoctorIf: [
      'You are planning surgery and have a heart, lung, kidney or other long-term condition',
      'Pain that has lasted more than three months',
      'Back, neck or joint pain not controlled with regular medicines',
      'Nerve pain such as burning or shooting pain',
      'Pain after an operation that is not settling',
      'You are worried about anaesthesia for yourself or a family member',
    ],
    emergencyIf: [
      'Difficulty breathing or swelling of the face after taking a medicine',
      'Severe pain that appears suddenly with chest pain, weakness or fainting',
      'Pain with fever, redness or discharge after a procedure',
    ],
    diagnosedBy: [
      {
        name: 'Check-up before anaesthesia',
        detail: 'A review of your health, medicines, allergies and any earlier anaesthesia.',
      },
      {
        name: 'Blood tests',
        detail: 'Check blood count, sugar and kidney function before surgery.',
        slug: 'pathology-microbiology',
      },
      {
        name: 'Heart tests',
        detail: 'Used when needed to check that the heart is fit for surgery.',
        slug: 'echocardiogram-tmt',
      },
      {
        name: 'Chest X-ray',
        detail: 'Shows the lungs and heart outline.',
        slug: 'ct-scan-x-ray',
      },
      {
        name: 'Pain assessment',
        detail: 'Where it hurts, how it feels, and what makes it better or worse.',
      },
    ],
    prevention: [
      'Tell the team about every medicine and supplement you take before surgery',
      'Follow fasting instructions exactly',
      'Do not smoke before surgery',
      'Report allergies and any past problems with anaesthesia',
      'Take pain medicines only as prescribed',
    ],
    faqs: [
      {
        q: "Will I feel pain during surgery?",
        a: "No. The anaesthesia team uses medicines so you feel no pain, whether you are asleep or numb in one area.",
      },
      {
        q: "Why can't I eat or drink before surgery?",
        a: "An empty stomach lowers the risk of stomach contents entering the lungs during anaesthesia. Follow the timing you are given.",
      },
      {
        q: "Is long-term pain treated only with tablets?",
        a: "No. Plans can include exercise, physiotherapy, nerve blocks and other treatments, chosen for the cause of your pain.",
      },
    ],
    related: ['ortho-joint-replacement', 'spine-surgery', 'general-laparoscopic-surgery', 'physiotherapy-rehabilitation'],
  },

  'general-laparoscopic-surgery': {
    areas: [
      'Hernia repair',
      'Gallbladder surgery',
      'Appendix surgery',
      'Piles, fissure and fistula',
      'Abdominal and bowel surgery',
      'Keyhole (laparoscopic) procedures',
    ],
    seeDoctorIf: [
      'A lump or bulge in the groin or abdomen',
      'Pain in the upper right abdomen after meals',
      'Pain in the lower right abdomen with nausea or fever',
      'Pain, bleeding or swelling around the anus',
      'A lump in the neck or breast',
      'Long-standing digestive symptoms that need a surgical opinion',
    ],
    emergencyIf: [
      'Severe abdominal pain that does not ease',
      'A hernia that becomes hard and painful, or cannot be pushed back',
      'Vomiting with a swollen, tight abdomen',
      'A wound that is bleeding heavily',
    ],
    diagnosedBy: [
      {
        name: 'Examination',
        detail: 'The surgeon examines the abdomen, groin and any lump or swelling.',
      },
      {
        name: 'Abdominal ultrasound',
        detail: 'Shows gallstones, appendix inflammation, lumps and fluid.',
        slug: 'ultrasound',
      },
      {
        name: 'CT scan',
        detail: 'Gives detail when an ultrasound does not give the full picture.',
        slug: 'ct-scan-x-ray',
      },
      {
        name: 'Endoscopy',
        detail: 'Looks inside the digestive tract when advised.',
        slug: 'endoscopy',
      },
      {
        name: 'Blood tests',
        detail: 'Check for infection and prepare for surgery.',
        slug: 'pathology-microbiology',
      },
    ],
    prevention: [
      'Eat fibre and drink enough water to avoid constipation and straining',
      'Lift heavy things with good technique',
      'Keep a healthy weight to lower hernia and gallstone risk',
      'Do not ignore a lump, even if it is painless',
    ],
    faqs: [
      {
        q: "What is laparoscopic (keyhole) surgery?",
        a: "The surgeon operates through small cuts using a camera and thin instruments. It often means smaller scars and a quicker return to routine, but it does not suit every patient.",
      },
      {
        q: "Will a hernia go away by itself?",
        a: "No. A hernia does not heal on its own. A surgeon will advise on timing and the type of repair.",
      },
      {
        q: "Do gallstones always need surgery?",
        a: "Stones that cause no symptoms may only need watching. If they cause repeated pain or complications, surgery is usually advised.",
      },
    ],
    related: ['gastroenterology', 'ultrasound', 'endoscopy', 'anaesthesia-pain-management'],
  },

  'trauma-management': {
    areas: [
      'First aid and stabilisation',
      'Road accident injuries',
      'Fractures and dislocations',
      'Head, chest and abdominal injuries',
      'Wound care',
      'Rehabilitation after injury',
    ],
    seeDoctorIf: [
      'An injury with swelling, bruising or pain that does not improve in a few days',
      'A cut that may need stitches',
      'A fall followed by new pain in the head, neck or back',
      'A limb that cannot take weight',
      'Follow-up after an accident, even if you felt fine at first',
    ],
    emergencyIf: [
      'Heavy bleeding that does not stop with firm pressure',
      'A suspected neck or spine injury (do not move the person)',
      'Loss of consciousness, confusion or repeated vomiting after a blow to the head',
      'Chest or abdominal injury with breathing difficulty or severe pain',
      'A limb that looks deformed, or is cold, pale or numb',
    ],
    diagnosedBy: [
      {
        name: 'First assessment',
        detail: 'Airway, breathing, circulation and consciousness are checked in the first minutes.',
      },
      {
        name: 'X-ray',
        detail: 'Shows fractures and dislocations.',
        slug: 'ct-scan-x-ray',
      },
      {
        name: 'CT scan',
        detail: 'Gives detail of the head, chest, abdomen and complex fractures.',
        slug: 'ct-scan-x-ray',
      },
      {
        name: 'Ultrasound',
        detail: 'Quickly checks for internal bleeding or fluid.',
        slug: 'ultrasound',
      },
      {
        name: 'Blood tests',
        detail: 'Include blood group and cross-matching when blood may be needed.',
        slug: 'pathology-microbiology',
      },
    ],
    prevention: [
      'Wear a helmet and a seat belt, every time',
      'Never drink and drive',
      'Keep floors dry and well lit to prevent falls',
      'Use safety gear at work and during sport',
      'Learn basic first aid',
    ],
    faqs: [
      {
        q: "What should I do while waiting for help after an accident?",
        a: "Stay calm, move to safety only if there is danger, press firmly on any bleeding, and do not move someone with a suspected neck or spine injury. Call for emergency help.",
      },
      {
        q: "Should I pull out an object stuck in a wound?",
        a: "No. Leave it in place, support it with padding and get urgent medical help. Removing it can cause heavier bleeding.",
      },
      {
        q: "Do all injuries need an X-ray?",
        a: "No. The doctor decides after examination which injuries need imaging.",
      },
    ],
    related: ['emergency-services', 'ortho-joint-replacement', 'neurosurgery', 'ambulance'],
  },

  /* ------------------------------------------------------------------------------ */
  /* Diagnostics and imaging                                                        */
  /* ------------------------------------------------------------------------------ */

  endoscopy: {
    prepare: [
      'For an upper endoscopy you are usually asked not to eat or drink for several hours. Follow the exact timing you are given',
      'Tell the team about all your medicines, especially blood thinners and diabetes medicines',
      'Mention allergies, heart or lung conditions, and any past reaction to sedation',
      'Arrange for an adult to accompany you if sedation is planned',
      'Wear loose, comfortable clothes and leave jewellery at home',
    ],
    during: [
      'You lie on your side. Your throat may be numbed with a spray, or you may be given sedation.',
      'A thin, flexible tube with a light and camera is passed gently through the mouth. For other examinations it may go through the nose or rectum.',
      'The doctor looks at the lining on a screen. A tiny tissue sample (biopsy) may be taken, or a problem may be treated.',
      'You then rest while any sedation wears off.',
    ],
    after: [
      'Rest until any sedation has worn off, and do not drive that day',
      'A sore throat or mild bloating is common and usually settles',
      'Eat and drink again only when the team says it is safe',
      'Tell the doctor promptly about severe pain, vomiting, black stools or fever',
      'Biopsy samples are studied in the laboratory and your doctor discusses the result with you',
    ],
    safety: [
      'Serious problems are uncommon, but any procedure carries some risk, which your doctor explains first',
      'Tell the team if you may be pregnant or have difficulty swallowing',
      'Do not stop prescribed medicines unless you are told to',
    ],
    faqs: [
      {
        q: "Is endoscopy painful?",
        a: "Most people feel pressure or mild discomfort. The throat is numbed or sedation is used, and the team explains what to expect.",
      },
      {
        q: "Can I eat before an endoscopy?",
        a: "Usually not for several hours before an upper endoscopy. Follow the instructions you are given for your test.",
      },
      {
        q: "How soon will I get my results?",
        a: "Findings are often discussed after the examination. Tissue samples take longer, and your doctor will tell you when to expect the report.",
      },
    ],
    related: ['gastroenterology', 'general-laparoscopic-surgery', 'pathology-microbiology', 'ent'],
  },

  'radiology-imaging': {
    prepare: [
      "Bring the doctor's request and any earlier scans or reports for comparison",
      'Wear loose clothing without metal, or change into a gown if asked',
      'Remove jewellery, watches, hearing aids and other metal objects when advised',
      'Tell the staff if you are or may be pregnant, or have an implant, pacemaker or metal fragment in your body',
      'Some scans need fasting or a full bladder. Follow the instructions you are given for your test',
    ],
    during: [
      'A technologist explains the scan and positions you comfortably.',
      'You are asked to stay still for short periods, and sometimes to hold your breath briefly.',
      'Some scans use a contrast dye, given through a vein or by mouth, to show structures more clearly.',
      'Staff can see and hear you throughout and can speak to you through an intercom.',
    ],
    after: [
      'You can usually return to normal activity straight away unless you had sedation',
      'After a contrast scan, drink plenty of water unless advised otherwise',
      'Tell the staff if you notice itching, rash or swelling after contrast',
      'A radiologist studies the images and prepares a report for your doctor',
      'Keep your reports and images safely for future visits',
    ],
    safety: [
      'Scans that use radiation are advised only when the benefit outweighs the risk, with extra care in pregnancy and for children',
      'Tell staff about kidney problems, diabetes, asthma or allergies before contrast dye',
      'Some scans, such as MRI, use strong magnets, so metal implants and devices must be declared first',
    ],
    faqs: [
      {
        q: "What is the difference between X-ray, CT, MRI and ultrasound?",
        a: "X-ray and CT use small amounts of radiation to image bones and organs. MRI uses magnets and radio waves. Ultrasound uses sound waves. Your doctor chooses the one best suited to your problem.",
      },
      {
        q: "Is contrast dye safe?",
        a: "Most people have no problem. Mild reactions can happen and serious ones are rare. Staff ask about allergies and kidney health first.",
      },
      {
        q: "Why do I need to hold my breath?",
        a: "Breathing moves the body and can blur the images. Holding still for a few seconds gives clearer pictures.",
      },
    ],
    related: ['ct-scan-x-ray', 'ultrasound', 'color-doppler', 'echocardiogram-tmt'],
  },

  'ct-scan-x-ray': {
    prepare: [
      'Wear loose clothing without metal. You may be asked to change into a gown',
      'Remove jewellery, belts and other metal items from the area being imaged',
      'Tell the staff if you are or may be pregnant, before any X-ray or CT scan',
      'For a CT scan with contrast, follow any fasting advice you are given and mention allergies, asthma, kidney problems or diabetes',
      "Bring earlier scans and your doctor's request",
    ],
    during: [
      'For an X-ray, you stand, sit or lie in the position the technologist asks for and stay still for a moment while the picture is taken.',
      'For a CT scan, you lie on a table that slides through a large ring-shaped scanner.',
      'If contrast dye is used, it is given through a vein and you may feel warmth for a short time.',
      'You may be asked to hold your breath for a few seconds. Staff watch you throughout.',
    ],
    after: [
      'Most people return to normal activity straight away',
      'After contrast, drink plenty of water unless told otherwise',
      'Tell the staff about any rash, itching or swelling',
      'A radiologist studies the images and prepares a report for your doctor',
    ],
    safety: [
      'These tests use radiation, so they are advised when the information is needed for your care',
      'Pregnant women and children need extra care, so always tell the staff',
      'Avoid repeating scans unnecessarily. Bring earlier ones for comparison',
    ],
    faqs: [
      {
        q: "Is a CT scan more harmful than an X-ray?",
        a: "A CT scan uses more radiation than a single X-ray, which is why doctors advise it only when the added information matters.",
      },
      {
        q: "Do I need to fast for a CT scan?",
        a: "Only some CT scans need fasting, especially those with contrast dye. You are told what applies to yours.",
      },
      {
        q: "Can I have an X-ray if I am pregnant?",
        a: "Tell the staff first. Often the test can be delayed, changed or done with extra protection, depending on the need.",
      },
    ],
    related: ['radiology-imaging', 'ultrasound', 'trauma-management', 'ortho-joint-replacement'],
  },

  ultrasound: {
    prepare: [
      'For an abdominal scan you may be asked to avoid food for several hours. Follow the instructions for your scan',
      'For a pelvic or bladder scan you may need to drink water and not pass urine until after the scan',
      'Wear loose clothing that gives easy access to the area being scanned',
      "Bring your doctor's request and earlier reports",
      'Some scans need no preparation. The staff will tell you',
    ],
    during: [
      'You lie on a couch and a clear gel is applied to your skin.',
      'A handheld probe is moved gently over the area while images appear on a screen.',
      'Some examinations, such as of the pelvis, may use a probe inside the body. Staff explain this beforehand.',
      'The scan is painless and uses sound waves, not radiation.',
    ],
    after: [
      'The gel is wiped off and you can return to normal activity at once',
      'The images are studied and a report is prepared for your doctor',
      'Bring the report to your next consultation',
      'Ask your doctor whether the result needs another test',
    ],
    safety: [
      'Ultrasound uses sound waves and is widely used, including in pregnancy, when medically advised',
      'Tell the staff if you have a latex allergy, as some probe covers contain latex',
      'Under Indian law (the PC and PNDT Act) the sex of an unborn baby cannot be determined or disclosed',
    ],
    faqs: [
      {
        q: "Is ultrasound safe?",
        a: "Ultrasound uses sound waves, not radiation, and is considered safe when used for medical reasons.",
      },
      {
        q: "Why do I need a full bladder?",
        a: "Urine in the bladder acts as a window for the sound waves, so the organs behind it can be seen more clearly.",
      },
      {
        q: "Can ultrasound see everything?",
        a: "No. It is excellent for many organs, but it cannot see through gas or bone well. Your doctor may advise another test if needed.",
      },
    ],
    related: ['color-doppler', 'obstetrics-gynaecology', 'radiology-imaging', 'gastroenterology'],
  },

  'color-doppler': {
    prepare: [
      "Wear loose clothing and bring your doctor's request and earlier reports",
      'Preparation depends on the area being scanned. Abdominal scans may need fasting, so ask when you book',
      'If advised, avoid smoking and caffeine for a few hours before some blood vessel scans',
      'Tell the staff about any medicines you take for blood pressure or circulation',
    ],
    during: [
      'You lie comfortably on a couch and gel is applied to the skin.',
      'A probe is moved over the area. Colours on the screen show blood moving towards or away from the probe.',
      'You may be asked to breathe in, hold your breath or change position.',
      'The test is painless and uses sound waves.',
    ],
    after: [
      'You can return to normal activity straight away',
      'A report is prepared for your doctor',
      'Your doctor explains what the findings mean for your treatment',
    ],
    safety: [
      'Colour Doppler uses sound waves, not radiation',
      'Tell the staff about pregnancy, latex allergy or skin problems in the area to be scanned',
    ],
    faqs: [
      {
        q: "What does colour Doppler show that ordinary ultrasound does not?",
        a: "It shows the speed and direction of blood flow, which helps assess narrowed or blocked vessels and the blood supply to organs.",
      },
      {
        q: "Is it used in pregnancy?",
        a: "Yes, when a doctor advises it, to check blood flow to the baby and placenta.",
      },
      {
        q: "Does it hurt?",
        a: "No. You may feel gentle pressure from the probe.",
      },
    ],
    related: ['ultrasound', 'echocardiogram-tmt', 'obstetrics-gynaecology', 'urology'],
  },

  'echocardiogram-tmt': {
    prepare: [
      'Wear a two-piece or loose outfit so the chest is easy to reach',
      'For a treadmill test (TMT), wear comfortable shoes and clothes for walking, and avoid a heavy meal for a few hours before',
      'Bring a list of your medicines. Your doctor may ask you to stop some before a TMT. Do not stop any unless told to',
      'Avoid smoking and caffeine before a TMT',
      "Bring earlier ECGs, reports and your doctor's request",
    ],
    during: [
      'For an echocardiogram, sticky patches are placed on your chest and a probe with gel is moved over the chest to image the heart.',
      'For a TMT, patches are attached to the chest to record the heart, and you walk on a treadmill that gradually gets faster and steeper.',
      'Your blood pressure and heart rhythm are watched closely. Tell the team at once if you feel chest pain, dizziness or breathlessness.',
      'Staff stop the test if needed.',
    ],
    after: [
      'After an echocardiogram you can resume normal activity',
      'After a TMT, rest and sit until your breathing and pulse settle',
      'A report goes to your doctor, who explains the findings',
      'Do not stop or change heart medicines unless your doctor tells you to',
    ],
    safety: [
      'A TMT is supervised but does carry a small risk because it stresses the heart. Tell staff about chest pain, breathlessness or recent heart problems beforehand',
      'An echocardiogram uses sound waves and no radiation',
    ],
    faqs: [
      {
        q: "What is the difference between an echocardiogram and a TMT?",
        a: "An echocardiogram shows the heart's structure and pumping using ultrasound. A TMT records the heart's rhythm and response while you exercise.",
      },
      {
        q: "Will the TMT be painful?",
        a: "It feels like brisk walking uphill. Staff watch you throughout and can stop the test at any time.",
      },
      {
        q: "Can I take my regular medicines on the day?",
        a: "Ask your doctor in advance. Some medicines may need to be changed before a TMT. Never stop them on your own.",
      },
    ],
    related: ['general-medicine', 'color-doppler', 'emergency-services', 'dietetics-nutrition'],
  },

  'pathology-microbiology': {
    prepare: [
      'Some blood tests need fasting for several hours. You are told if yours does. Plain water is usually fine',
      "Carry your doctor's request and a list of your current medicines",
      'Follow instructions for collecting urine, stool or other samples exactly, using the container supplied',
      'Tell the staff if you take blood thinners, feel faint at the sight of needles, or have allergies',
    ],
    during: [
      'A trained staff member checks your details and the tests requested.',
      'For blood tests, the skin is cleaned, a needle takes a small sample and a cotton pad is pressed on the spot.',
      'Urine, stool and other samples are collected in labelled containers.',
      'Samples are sent to the laboratory for testing.',
    ],
    after: [
      'Press on the spot for a minute or two to prevent bruising',
      'Eat and drink normally after a fasting test',
      'Reports are issued for your doctor, and you can ask for a copy',
      'Keep earlier reports so your doctor can see changes over time',
      'Do not change medicines because of a report without asking your doctor',
    ],
    safety: [
      'Mild bruising at the needle site is common and fades',
      'Tell staff if you feel dizzy, and sit or lie down at once',
      'Check that your name and details are on the label before you hand over a sample',
    ],
    faqs: [
      {
        q: "Why do some tests need fasting?",
        a: "Food and drink can change results such as blood sugar and cholesterol. Fasting gives a reliable baseline.",
      },
      {
        q: "What is the difference between pathology and microbiology?",
        a: "Pathology studies blood, urine, tissue and body fluids to find disease. Microbiology looks for germs such as bacteria, viruses and fungi, and tests which medicines work against them.",
      },
      {
        q: "How should I collect a urine sample?",
        a: "Wash your hands, use the clean container supplied, and follow the instruction for a midstream sample if you are given one.",
      },
    ],
    related: ['general-medicine', 'ultrasound', 'urology', 'dietetics-nutrition'],
  },

  /* ------------------------------------------------------------------------------ */
  /* Patient support                                                                */
  /* ------------------------------------------------------------------------------ */

  'physiotherapy-rehabilitation': {
    safety: [
      'Tell the therapist at once about sharp or worsening pain, dizziness or breathlessness',
      'Do not push through pain that feels wrong. Mild soreness is common, sharp pain is not',
      'Do your home exercises as shown, no more and no less',
      'Tell your doctor about any new swelling, numbness or fever',
    ],
    steps: [
      {
        title: 'Assessment',
        body: 'The physiotherapist asks about your problem, checks movement, strength and balance, and agrees goals with you.',
      },
      {
        title: 'A plan made for you',
        body: 'Exercises, hands-on techniques or other methods are chosen to match your condition and daily needs.',
      },
      {
        title: 'Sessions and home exercises',
        body: 'You are shown exercises to practise between sessions. They matter as much as the sessions themselves.',
      },
      {
        title: 'Review',
        body: 'Progress is checked regularly and the plan is changed as you improve.',
      },
    ],
    prepare: [
      'Wear comfortable clothes that allow movement',
      "Bring your doctor's referral, scans and reports",
      'Tell the therapist about pain, medicines and any surgery',
      'Bring a family member if you need help walking or remembering instructions',
    ],
    faqs: [
      {
        q: "Do I need a doctor's referral?",
        a: "Often a doctor refers you after a diagnosis. If you are unsure, ask when you book.",
      },
      {
        q: "Will physiotherapy hurt?",
        a: "Some exercises can cause mild soreness. Tell the therapist if pain is sharp or getting worse so the plan can be adjusted.",
      },
      {
        q: "How many sessions will I need?",
        a: "It depends on your condition, how long you have had it and your goals. The therapist reviews this with you as you progress.",
      },
    ],
    related: ['ortho-joint-replacement', 'spine-surgery', 'neurosurgery', 'trauma-management'],
  },

  'dietetics-nutrition': {
    safety: [
      'Do not stop prescribed medicines because of a diet change',
      'Check with your doctor before major diet changes if you have diabetes or kidney disease, or are pregnant',
      'Be cautious with supplements and extreme diets',
      'Report dizziness, weakness or unexpected weight loss to your doctor',
    ],
    steps: [
      {
        title: 'Assessment',
        body: 'The dietitian reviews your health, weight, medical reports, eating habits and daily routine.',
      },
      {
        title: 'Goals',
        body: 'You agree realistic goals, such as better blood sugar control, weight change or recovery from illness.',
      },
      {
        title: 'A practical plan',
        body: 'Meals are planned around your food preferences, budget and family routine, not a standard chart.',
      },
      {
        title: 'Follow-up',
        body: 'Progress is reviewed and the plan adjusted as your needs change.',
      },
    ],
    prepare: [
      "Bring recent blood tests and your doctor's notes",
      'Note what you usually eat in a normal day, including snacks and drinks',
      'List your medicines and supplements',
      'Write down questions about foods you are unsure of',
    ],
    faqs: [
      {
        q: "Is a diet plan the same for everyone with diabetes?",
        a: "No. Plans differ by medicines, weight, activity and preferences, so personalised advice works better than a standard chart.",
      },
      {
        q: "Can I follow a diet plan and still eat traditional food?",
        a: "Often yes. A good plan adapts familiar foods and portions rather than replacing them.",
      },
      {
        q: "Is weight loss only about calories?",
        a: "Calories matter, but so do sleep, activity, stress, medical conditions and medicines. A dietitian looks at the whole picture.",
      },
    ],
    related: ['general-medicine', 'gastroenterology', 'paediatrics-neonatology', 'obstetrics-gynaecology'],
  },

  pharmacy: {
    noAppointment: true,
    safety: [
      'Take medicines exactly as prescribed, at the right time and for the full course',
      'Never share prescription medicines, even with someone who has the same symptoms',
      'Ask before combining medicines, herbal products or supplements',
      'Check expiry dates, and store medicines away from heat, damp and children',
    ],
    steps: [
      {
        title: 'Bring your prescription',
        body: 'A valid prescription from a doctor is needed for most medicines.',
      },
      {
        title: 'Check the details',
        body: 'The pharmacist checks the medicine name, strength and directions against the prescription.',
      },
      {
        title: 'Ask before you leave',
        body: 'Ask about timing, food, side effects and what to do if you miss a dose.',
      },
      {
        title: 'Store safely',
        body: 'Keep medicines away from heat, damp and children, and check expiry dates.',
      },
    ],
    prepare: [
      "Carry the doctor's prescription",
      'Carry a list of medicines you already take, including supplements',
      'Mention allergies and past reactions',
      'Bring old medicine strips if you are unsure of a name',
    ],
    faqs: [
      {
        q: "Can I ask for a cheaper alternative?",
        a: "Ask the pharmacist about generic options. Do not change a medicine without checking with your doctor.",
      },
      {
        q: "Why must I finish the full antibiotic course?",
        a: "Stopping early can leave bacteria alive and make the infection return or resist treatment. Complete it as prescribed.",
      },
      {
        q: "How do I dispose of expired medicines?",
        a: "Do not flush them or throw them in open waste. Ask the pharmacist about safe disposal.",
      },
    ],
    related: ['general-medicine', 'paediatrics-neonatology', 'dietetics-nutrition'],
  },

  ambulance: {
    noAppointment: true,
    keepReady: true,
    safety: [
      'Keep the entrance and the route to the patient clear, and send someone to guide the crew',
      'Do not move a person with a suspected neck or back injury unless there is immediate danger',
      'Keep medicines, ID and reports together in one place',
      'Stay on the line with the operator and follow the instructions you are given',
    ],
    steps: [
      {
        title: 'Call for help',
        body: 'Call the emergency number as early as possible and state the location clearly.',
      },
      {
        title: 'Give the key facts',
        body: 'Tell the operator what happened, how many people are affected, and whether the person is awake and breathing.',
      },
      {
        title: 'Keep the person safe',
        body: 'Follow instructions, do not move someone with a suspected neck or back injury, and keep the route clear.',
      },
      {
        title: 'On arrival',
        body: 'The crew assesses the patient and moves them to the hospital for further care.',
      },
    ],
    prepare: [
      'Your exact location and a nearby landmark',
      "The patient's name, age and medical conditions",
      'A list of medicines and allergies, if you have it',
      "A family member's phone number",
      'Photo ID and any reports in a folder, if time allows',
    ],
    faqs: [
      {
        q: "What should I do before the ambulance arrives?",
        a: "Keep the patient lying comfortably, loosen tight clothing, press on any bleeding, and do not give food or drink if they are drowsy.",
      },
      {
        q: "What is India's national emergency number?",
        a: "112 is the single emergency number for police, fire and ambulance across India.",
      },
      {
        q: "Should I wait for an ambulance or travel myself?",
        a: "If the patient is unconscious, struggling to breathe, bleeding heavily or may have a neck or spine injury, wait for trained help. For a stable patient a private vehicle may be faster. Ask the emergency operator if you are unsure.",
      },
    ],
    related: ['emergency-services', 'trauma-management', 'general-medicine'],
  },
}

export function getExtras(slug: string): ServiceExtras | undefined {
  return SERVICE_EXTRAS[slug]
}

/**
 * Fails the build if the content and the catalogue drift apart.
 *
 * Without this, adding a service to lib/services.ts would quietly give that page no extras,
 * and a typo in a `related` or `slug` link would render a dead tile. Same idea as
 * assertDoctorDepartments() in lib/doctors.ts.
 */
function assertContent(): void {
  const problems: string[] = []

  for (const service of SERVICES) {
    if (!SERVICE_EXTRAS[service.slug]) problems.push(`no extras for service "${service.slug}"`)
  }

  for (const [slug, extras] of Object.entries(SERVICE_EXTRAS)) {
    if (!getService(slug)) problems.push(`extras for unknown service "${slug}"`)
    for (const related of extras.related) {
      if (!getService(related)) problems.push(`${slug}: unknown related "${related}"`)
      if (related === slug) problems.push(`${slug}: lists itself as related`)
    }
    for (const item of extras.diagnosedBy ?? []) {
      if (item.slug && !getService(item.slug)) {
        problems.push(`${slug}: unknown diagnostic link "${item.slug}"`)
      }
    }
  }

  if (problems.length > 0) {
    throw new Error('lib/service-content.ts is out of step with lib/services.ts:\n  ' + problems.join('\n  '))
  }
}

assertContent()
