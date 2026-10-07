// lib/appointment.ts
//
// The appointment request contract, shared by the form (instant feedback in the browser)
// and app/api/appointments/route.ts (the check that actually counts — never trust the
// client). It imports nothing from the catalogue on purpose: lib/services and
// lib/doctors would be dragged into the client bundle, and the route resolves those two
// ids against the real data itself.
//
// WHERE THE FIELDS COME FROM. They mirror the LIMS hospital software's own online
// appointment page (the ASP.NET form at ap26.acsonnet.com, "Online Appointment for
// Consultation"), field for field, so a later hand-over to that system — an API, a
// pre-filled link, or a scripted submit — is a rename, not a redesign:
//
//   New / Existing patient (+ UHID)   title, name, guardian title + name
//   sex, age or date of birth         ISD code, mobile, landline, email
//   address, city, state, pincode     nation
//   speciality, consultant            appointment date, available time
//   "I accept" terms
//
// WHAT IS DIFFERENT, ON PURPOSE. Their form books a slot: it needs a consultant's
// schedule behind it. Ours is a REQUEST that reception confirms by phone, so speciality
// and doctor are optional ("not sure" is a legitimate answer), and "available time" is
// a time of day, not a slot. Their "Reprint appointment" button is not here — it needs
// their records. Nothing below claims an appointment exists; the success message says so.
//
// An existing patient is already on file at the hospital, so for them only the name and
// a phone number are required — their record supplies the rest.

export const PATIENT_TYPES = ['new', 'existing'] as const
export type PatientType = (typeof PATIENT_TYPES)[number]

/** `value` is what the hospital system stores; `key` is the message key for the label. */
export const TITLES = [
  { value: 'Mr.', key: 'mr' },
  { value: 'Mrs.', key: 'mrs' },
  { value: 'Ms.', key: 'ms' },
  { value: 'Master', key: 'master' },
] as const
export type Title = (typeof TITLES)[number]['value']

export const SEX = [
  { value: 'M', key: 'male' },
  { value: 'F', key: 'female' },
] as const
export type Sex = (typeof SEX)[number]['value']

export const AGE_MODES = ['age', 'dob'] as const
export type AgeMode = (typeof AGE_MODES)[number]

export const NATIONS = [
  { value: 'INDIAN', key: 'indian' },
  { value: 'OTHER', key: 'other' },
] as const
export type Nation = (typeof NATIONS)[number]['value']

/** Deliberately no clock ranges: LIMS has not published OPD hours, so none are implied. */
export const TIME_WINDOWS = [
  { value: 'any', key: 'any' },
  { value: 'morning', key: 'morning' },
  { value: 'afternoon', key: 'afternoon' },
  { value: 'evening', key: 'evening' },
] as const
export type TimeWindow = (typeof TIME_WINDOWS)[number]['value']

/** How far ahead a patient may ask for. */
export const MAX_DAYS_AHEAD = 90

export type ErrorCode =
  | 'required'
  | 'tooShort'
  | 'tooLong'
  | 'invalidChoice'
  | 'invalidIsd'
  | 'invalidMobile'
  | 'invalidLandline'
  | 'invalidEmail'
  | 'invalidAge'
  | 'invalidDob'
  | 'invalidPincode'
  | 'invalidUhid'
  | 'invalidDate'
  | 'pastDate'
  | 'tooFar'
  | 'mustAccept'

export type FieldErrors = Record<string, ErrorCode>

/** A validated, normalised request — the shape delivered to the hospital. */
export interface AppointmentRequest {
  patientType: PatientType
  /** Existing patients only, and only if they know it. */
  uhid: string | null
  title: Title | null
  name: string
  sex: Sex | null
  /** Whole years. Set when the patient gave an age. */
  age: number | null
  /** YYYY-MM-DD. Set when the patient gave a date of birth. */
  dob: string | null
  guardianTitle: Title | null
  guardianName: string | null
  /** Digits only, no "+": "91". */
  isd: string
  /** Digits only, national number: "9254984122". */
  mobile: string
  landline: string | null
  email: string | null
  address: string | null
  city: string | null
  state: string | null
  pincode: string | null
  nation: Nation
  departmentSlug: string | null
  doctorId: string | null
  /** YYYY-MM-DD. */
  preferredDate: string
  preferredTime: TimeWindow
  notes: string | null
  termsAccepted: true
}

export type ValidationResult =
  | { ok: true; value: AppointmentRequest }
  | { ok: false; fieldErrors: FieldErrors }

/** Today's date in India (IST, UTC+5:30) as YYYY-MM-DD. Works in the browser and the Worker. */
export function todayInIndia(): string {
  return new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 10)
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

/** A real calendar date, not just something shaped like one ("2026-02-31"). */
function isRealDate(value: string): boolean {
  if (!DATE_RE.test(value)) return false
  const [y, m, d] = value.split('-').map(Number)
  const date = new Date(Date.UTC(y, m - 1, d))
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d
}

function addDays(date: string, days: number): string {
  const [y, m, d] = date.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10)
}

function oneOf<T extends string>(
  list: readonly { value: T }[],
  value: string,
): T | undefined {
  return list.find((item) => item.value === value)?.value
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Validate a raw request body (or form values) against the contract.
 *
 * `today` is a parameter, not read from the clock in here, so the same rules can be
 * tested and so the browser and the server each state which "today" they mean.
 */
export function validateAppointment(
  input: Record<string, unknown>,
  today: string,
): ValidationResult {
  const errors: FieldErrors = {}
  const text = (key: string): string =>
    typeof input[key] === 'string' ? (input[key] as string).trim() : ''

  // ---- who is asking --------------------------------------------------------------

  let patientType: PatientType = 'new'
  const patientTypeRaw = text('patientType')
  if (patientTypeRaw) {
    const match = PATIENT_TYPES.find((type) => type === patientTypeRaw)
    if (match) patientType = match
    else errors.patientType = 'invalidChoice'
  }
  const isNew = patientType === 'new'

  let uhid: string | null = null
  if (!isNew) {
    const raw = text('uhid')
    if (raw) {
      if (/^[A-Za-z0-9/\-\s]{1,30}$/.test(raw)) uhid = raw
      else errors.uhid = 'invalidUhid'
    }
  }

  // ---- the patient ------------------------------------------------------------------

  const name = text('name')
  if (!name) errors.name = 'required'
  else if (name.length < 2) errors.name = 'tooShort'
  else if (name.length > 100) errors.name = 'tooLong'

  let title: Title | null = null
  const titleRaw = text('title')
  if (titleRaw) {
    title = oneOf(TITLES, titleRaw) ?? null
    if (!title) errors.title = 'invalidChoice'
  } else if (isNew) {
    errors.title = 'required'
  }

  let sex: Sex | null = null
  const sexRaw = text('sex')
  if (sexRaw) {
    sex = oneOf(SEX, sexRaw) ?? null
    if (!sex) errors.sex = 'invalidChoice'
  } else if (isNew) {
    errors.sex = 'required'
  }

  // Age in whole years, or a date of birth — whichever the patient chose. Required for a
  // new patient (the hospital record needs one); an existing patient's is on file.
  let age: number | null = null
  let dob: string | null = null
  const ageMode = text('ageMode') === 'dob' ? 'dob' : 'age'
  if (ageMode === 'dob') {
    const raw = text('dob')
    if (raw) {
      const oldest = addDays(today, -120 * 366)
      if (!isRealDate(raw) || raw > today || raw < oldest) errors.dob = 'invalidDob'
      else dob = raw
    } else if (isNew) {
      errors.dob = 'required'
    }
  } else {
    const raw = text('age')
    if (raw) {
      const years = /^\d{1,3}$/.test(raw) ? Number(raw) : NaN
      if (years >= 1 && years <= 120) age = years
      else errors.age = 'invalidAge'
    } else if (isNew) {
      errors.age = 'required'
    }
  }

  let guardianName: string | null = text('guardianName') || null
  let guardianTitle: Title | null = null
  if (guardianName && guardianName.length > 100) errors.guardianName = 'tooLong'
  if (guardianName) {
    const raw = text('guardianTitle')
    if (raw) {
      guardianTitle = oneOf(TITLES, raw) ?? null
      if (!guardianTitle) errors.guardianTitle = 'invalidChoice'
    }
  } else {
    guardianName = null
  }

  // ---- how to reach them --------------------------------------------------------------

  const isd = text('isd').replace(/\D/g, '') || '91'
  if (!/^\d{1,4}$/.test(isd)) errors.isd = 'invalidIsd'

  let mobile = text('mobile').replace(/\D/g, '')
  if (isd === '91') {
    // Forgive "+91 …" typed into the number box and a trunk-prefix 0.
    if (mobile.length === 12 && mobile.startsWith('91')) mobile = mobile.slice(2)
    else if (mobile.length === 11 && mobile.startsWith('0')) mobile = mobile.slice(1)
  }
  if (!mobile) errors.mobile = 'required'
  else if (isd === '91' ? mobile.length !== 10 : mobile.length < 6 || mobile.length > 15) {
    // Deliberately only a length check for India. A rule strict enough to be "correct"
    // rejects numbers that work, and a false reject here is a patient who cannot ask.
    errors.mobile = 'invalidMobile'
  }

  let landline: string | null = null
  const landlineRaw = text('landline').replace(/[^\d]/g, '')
  if (text('landline')) {
    if (landlineRaw.length >= 6 && landlineRaw.length <= 15) landline = landlineRaw
    else errors.landline = 'invalidLandline'
  }

  let email: string | null = null
  const emailRaw = text('email')
  if (emailRaw) {
    if (emailRaw.length <= 120 && EMAIL_RE.test(emailRaw)) email = emailRaw
    else errors.email = 'invalidEmail'
  }

  // ---- where they live --------------------------------------------------------------

  const address = text('address')
  if (!address && isNew) errors.address = 'required'
  else if (address && address.length < 3) errors.address = 'tooShort'
  else if (address.length > 300) errors.address = 'tooLong'

  const city = text('city').slice(0, 60) || null
  const state = text('state').slice(0, 60) || null

  let pincode: string | null = null
  const pincodeRaw = text('pincode')
  if (pincodeRaw) {
    if (/^\d{6}$/.test(pincodeRaw)) pincode = pincodeRaw
    else errors.pincode = 'invalidPincode'
  }

  let nation: Nation = 'INDIAN'
  const nationRaw = text('nation')
  if (nationRaw) {
    const match = oneOf(NATIONS, nationRaw)
    if (match) nation = match
    else errors.nation = 'invalidChoice'
  }

  // ---- the visit ------------------------------------------------------------------------

  const departmentSlug = text('departmentSlug').slice(0, 80) || null
  const doctorId = text('doctorId').slice(0, 80) || null

  const preferredDate = text('preferredDate')
  if (!preferredDate) errors.preferredDate = 'required'
  else if (!isRealDate(preferredDate)) errors.preferredDate = 'invalidDate'
  else if (preferredDate < today) errors.preferredDate = 'pastDate'
  else if (preferredDate > addDays(today, MAX_DAYS_AHEAD)) errors.preferredDate = 'tooFar'

  let preferredTime: TimeWindow = 'any'
  const timeRaw = text('preferredTime')
  if (timeRaw) {
    const match = oneOf(TIME_WINDOWS, timeRaw)
    if (match) preferredTime = match
    else errors.preferredTime = 'invalidChoice'
  }

  const notes = text('notes').slice(0, 1000) || null

  // ---- consent ----------------------------------------------------------------------------

  const accepted =
    input.termsAccepted === true || input.termsAccepted === 'on' || input.termsAccepted === 'true'
  if (!accepted) errors.termsAccepted = 'mustAccept'

  if (Object.keys(errors).length > 0) return { ok: false, fieldErrors: errors }

  return {
    ok: true,
    value: {
      patientType,
      uhid,
      title,
      name,
      sex,
      age,
      dob,
      guardianTitle,
      guardianName,
      isd,
      mobile,
      landline,
      email,
      address: address || null,
      city,
      state,
      pincode,
      nation,
      departmentSlug,
      doctorId,
      preferredDate,
      preferredTime,
      notes,
      termsAccepted: true,
    },
  }
}
