'use client'

// components/appointments/AppointmentForm.tsx
//
// The one genuinely stateful form on the site.
//
// NOT MOUNTED AT THE MOMENT. "Book an appointment" is a handover to the hospital software's own
// page (components/appointments/BookingHandover.tsx) because nothing yet carries this form's data
// into that software: /api/appointments has no delivery channel connected, so submitting only ever
// showed "please call". Kept, with lib/appointment.ts, fields.tsx and the API route, for the day
// the vendor offers an API or a pre-fill link.
//
// ITS FIELDS ARE THE HOSPITAL SOFTWARE'S OWN. They follow the online-appointment page of
// the system LIMS runs (new or existing patient, title, name, guardian, sex, age or date
// of birth, ISD code and mobile, landline, email, address, city, state, PIN, nationality,
// speciality, consultant, date, terms), so handing requests to that system later is a
// rename, not a redesign. lib/appointment.ts holds the contract, the rules and the
// reasons this is a REQUEST rather than a booking.
//
// An existing patient is already on file, so choosing "existing" hides everything the
// hospital record already holds and asks only for a name and a phone number. Hidden
// fields are disabled, not removed: a disabled field is left out of the submission but
// keeps what the patient typed, so flipping new/existing by accident loses nothing.
//
// It is built around a rule the API route also enforces: never show a patient a success
// message unless the request actually went somewhere. When the endpoint reports that no
// delivery channel is configured — its state in development, and on a first deploy —
// this renders the hospital's phone number as the next step, not a thank-you.
//
// The catalogue arrives as props from the server (the page, or the layout's
// BookingProvider). This component never imports lib/services or lib/doctors, so the
// 26-service list and the roster are not duplicated into the client bundle.
//
// TWO PLACES IT LIVES, ONE FORM.
//   variant="overlay"  inside the floating panel BookingProvider opens from any "Book an
//                      appointment" button. It brings its own title bar and action bar, and the
//                      fields are compact one-line rows in two columns, so a desktop screen
//                      shows the whole request at once with nothing to scroll (the hospital's
//                      own booking screen does the same).
//   variant="page"     the /appointments page, for shared links and for when the overlay's
//                      script has not run. The same rows, inline.
//
// The two columns are by topic, not by length: the patient and how to reach them on the
// left, the visit and the terms on the right. On a phone they stack in that order.
//
// The rows, the calendar and the dropdown menus live in ./fields.tsx.

import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { CheckIcon, CloseIcon, WhatsAppIcon } from '@/components/icons'
import {
  Cell,
  DateControl,
  DateField,
  Group,
  NewOnly,
  PairRow,
  RoundCheckbox,
  Segmented,
  SelectControl,
  SelectField,
  TextField,
} from '@/components/appointments/fields'
import {
  MAX_DAYS_AHEAD,
  NATIONS,
  SEX,
  TIME_WINDOWS,
  TITLES,
  todayInIndia,
  validateAppointment,
  type AgeMode,
  type FieldErrors,
  type PatientType,
} from '@/lib/appointment'

interface Option {
  value: string
  label: string
}

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | {
      kind: 'unavailable'
      message: 'notConfigured' | 'deliveryFailed'
      phone: string
      phoneDisplay: string
    }
  | { kind: 'error' }

export function AppointmentForm({
  doctorOptions,
  serviceGroups,
  initialDoctorId = '',
  initialDepartmentSlug = '',
  fallbackPhone,
  fallbackPhoneDisplay,
  whatsappHref,
  emergencyPhone,
  emergencyPhoneDisplay,
  variant = 'page',
  onClose,
  onDirtyChange,
}: {
  doctorOptions: Option[]
  serviceGroups: { label: string; options: Option[] }[]
  initialDoctorId?: string
  initialDepartmentSlug?: string
  fallbackPhone: string
  fallbackPhoneDisplay: string
  /** A WhatsApp chat with the hospital, offered beside the phone number when a request cannot be sent. */
  whatsappHref?: string
  /** The emergency line, for the "do not use this form" note in the overlay's action bar. */
  emergencyPhone?: string
  emergencyPhoneDisplay?: string
  variant?: 'page' | 'overlay'
  /** Overlay only: asks BookingProvider to close (it confirms first if the form is dirty). */
  onClose?: () => void
  /** Overlay only: told once, the first time the patient types anything. */
  onDirtyChange?: (dirty: boolean) => void
}) {
  const t = useTranslations('appointmentForm')
  const tCommon = useTranslations('common')
  const tPage = useTranslations('appointmentsPage')
  const overlay = variant === 'overlay'
  const dirtyReported = useRef(false)
  const locale = useLocale()
  const formRef = useRef<HTMLFormElement>(null)

  const [patientType, setPatientType] = useState<PatientType>('new')
  const [ageMode, setAgeMode] = useState<AgeMode>('age')
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  // Read after mount: the page is rendered ahead of time, and a date baked in at build
  // would be yesterday's by the time a patient opens it.
  const [today, setToday] = useState('')
  useEffect(() => setToday(todayInIndia()), [])

  const isNew = patientType === 'new'

  const errorFor = (name: string): string | undefined => {
    const code = fieldErrors[name]
    return code ? t(`errors.${code}`, { days: MAX_DAYS_AHEAD }) : undefined
  }

  function focusFirstError() {
    // After the re-render that paints the errors, so the invalid field exists to focus.
    requestAnimationFrame(() => {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
    })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Disabled (hidden) fields are not in FormData, so an existing patient's request
    // never carries whatever was typed into the new-patient fields.
    const data = new FormData(event.currentTarget)
    const values: Record<string, unknown> = {}
    data.forEach((value, key) => {
      if (typeof value === 'string') values[key] = value
    })
    values.termsAccepted = data.get('termsAccepted') === 'on'

    // Same rules as the server, run first so a typo costs no round trip. The server
    // runs them again regardless — this is a courtesy, not a gate.
    const checked = validateAppointment(values, todayInIndia())
    if (!checked.ok) {
      setFieldErrors(checked.fieldErrors)
      setStatus({ kind: 'idle' })
      focusFirstError()
      return
    }

    setFieldErrors({})
    setStatus({ kind: 'submitting' })

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...values, locale }),
      })

      // A non-JSON body here means something in front of the app answered instead of
      // the route — a proxy error page, a maintenance page. Treat it as a failure
      // rather than letting the .json() throw land in the generic catch as a "network"
      // problem, which would be the wrong thing to tell the patient.
      const result = await response.json().catch(() => null)

      if (response.ok && result?.ok) {
        setStatus({ kind: 'success' })
        return
      }

      if (response.status === 422 && result?.fieldErrors) {
        setFieldErrors(result.fieldErrors as FieldErrors)
        setStatus({ kind: 'idle' })
        focusFirstError()
        return
      }

      // 503 (nothing configured) and 502 (delivery failed) both land here: from the
      // patient's side they are the same situation — this did not go through, call
      // instead — and the phone number is the useful half of the answer.
      setStatus({
        kind: 'unavailable',
        message: response.status === 503 ? 'notConfigured' : 'deliveryFailed',
        phone: typeof result?.phone === 'string' ? result.phone : fallbackPhone,
        phoneDisplay:
          typeof result?.phoneDisplay === 'string' ? result.phoneDisplay : fallbackPhoneDisplay,
      })
    } catch {
      setStatus({ kind: 'error' })
    }
  }

  // Told once, the first time the patient types: the overlay then asks before discarding.
  function markDirty(event: React.FormEvent<HTMLFormElement>) {
    if (dirtyReported.current || !onDirtyChange) return
    const name = (event.target as HTMLInputElement).name
    if (name === 'patientType' || name === 'ageMode') return
    dirtyReported.current = true
    onDirtyChange(true)
  }

  // A sent request has nothing left to lose: closing must not ask.
  useEffect(() => {
    if (status.kind === 'success') onDirtyChange?.(false)
  }, [status.kind, onDirtyChange])

  // On a phone the patient is at the bottom of a long form when a panel appears at the top.
  // Focusing it scrolls it into view and has a screen reader read it out.
  const showPanel = (element: HTMLElement | null) => element?.focus()

  // The calendar's limits. Until the page has read today's date (after mount) the range is
  // left wide; the real limits are in place before anyone can open a calendar.
  const dateLimits = {
    preferredMin: today || '1900-01-01',
    preferredMax: today ? isoPlusDays(today, MAX_DAYS_AHEAD) : '2100-12-31',
    dobMin: today ? `${Number(today.slice(0, 4)) - 121}${today.slice(4)}` : '1900-01-01',
    dobMax: today || '2100-12-31',
  }

  const closeButton = overlay && onClose && (
    <button
      type="button"
      onClick={onClose}
      aria-label={t('close')}
      className="tap-target press h-11 w-11 shrink-0 rounded-full bg-brand-mist text-brand-dark-base/65 transition-colors hover:bg-brand-mist-subtle hover:text-brand-dark-base"
    >
      <CloseIcon className="h-5 w-5" strokeWidth={2} />
    </button>
  )

  const titleBar = (children?: React.ReactNode) => (
    <header className="shrink-0 border-b border-brand-teal/10 bg-white/80 backdrop-blur-xl [@media(prefers-reduced-transparency:reduce)]:bg-white [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none">
      <div className="flex w-full flex-wrap items-center gap-x-5 gap-y-3 px-4 py-3 sm:px-6">
        <div className="flex items-baseline gap-3">
          <h2
            id="booking-title"
            className="font-serif text-xl font-bold leading-tight tracking-tight lg:text-2xl"
          >
            {tPage('title')}
          </h2>
          <span className="hidden text-xs text-brand-dark-base/50 sm:inline">{t('requiredNote')}</span>
        </div>
        {children}
        <span className="order-2 ml-auto lg:order-3">{closeButton}</span>
      </div>
    </header>
  )

  if (status.kind === 'success') {
    if (overlay) {
      return (
        <div className="flex h-full min-h-0 flex-col">
          {titleBar()}
          <div
            ref={showPanel}
            tabIndex={-1}
            role="status"
            className="status-panel grid min-h-0 flex-1 place-items-center overflow-y-auto px-6 py-10 text-center outline-none"
          >
            <div className="max-w-md">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-600 text-white shadow-[0_12px_28px_-10px_rgba(5,150,105,0.6)]">
                <CheckIcon className="booking-check h-8 w-8" strokeWidth={2.5} />
              </span>
              <h2 className="mt-5 font-serif text-2xl font-bold tracking-tight">
                {t('successHeading')}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-dark-base/70">
                {t('successBody')}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="tap-target press focus-ring-inverse mt-6 rounded-full bg-brand-teal px-8 text-sm font-semibold text-white transition-colors hover:bg-brand-teal-dark"
              >
                {t('done')}
              </button>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div
        ref={showPanel}
        tabIndex={-1}
        role="status"
        className="status-panel rounded-2xl border border-emerald-600/20 bg-emerald-50 p-6 outline-none"
      >
        <h2 className="font-serif text-xl font-bold text-emerald-900">{t('successHeading')}</h2>
        <p className="mt-2 text-sm leading-relaxed text-emerald-900/80">{t('successBody')}</p>
        <Link
          href="/"
          className="tap-target mt-4 rounded-full border border-emerald-700/25 px-5 text-xs font-semibold text-emerald-900 hover:bg-white"
        >
          {t('backHome')}
        </Link>
      </div>
    )
  }

  const submitting = status.kind === 'submitting'
  const phone = status.kind === 'unavailable' ? status.phone : fallbackPhone
  const phoneDisplay = status.kind === 'unavailable' ? status.phoneDisplay : fallbackPhoneDisplay
  const hasErrors = Object.keys(fieldErrors).length > 0

  const segmented = (
    <Segmented
      label={t('newExistingLabel')}
      name="patientType"
      value={patientType}
      onChange={(value) => setPatientType(value as PatientType)}
      options={[
        { value: 'new', label: t('patientNew') },
        { value: 'existing', label: t('patientExisting') },
      ]}
      block={overlay}
    />
  )

  const submitButton = (
    <button
      type="submit"
      disabled={submitting}
      className="tap-target press focus-ring-inverse rounded-full bg-brand-copper px-7 text-sm font-semibold text-white shadow-[0_8px_18px_-8px_rgba(194,110,78,0.75)] transition-colors hover:bg-brand-copper-hover disabled:cursor-not-allowed disabled:opacity-60"
    >
      {submitting ? t('submitting') : t('submit')}
    </button>
  )

  const titleOptions = (
    <>
      <option value="">{t('select')}</option>
      {TITLES.map((item) => (
        <option key={item.value} value={item.value}>
          {t(`titles.${item.key}`)}
        </option>
      ))}
    </>
  )

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onInput={markDirty}
      noValidate
      className={overlay ? 'flex h-full min-h-0 flex-col' : 'space-y-5'}
    >
      {overlay && titleBar(<div className="order-3 w-full lg:order-2 lg:w-auto">{segmented}</div>)}

      <div className={overlay ? 'min-h-0 flex-1 overflow-y-auto overscroll-contain' : undefined}>
        <div
          className={
            overlay
              ? 'w-full space-y-4 px-4 py-4 sm:px-6'
              : 'space-y-5 rounded-3xl bg-brand-mist p-4 sm:p-6'
          }
        >
          {(status.kind === 'unavailable' || status.kind === 'error') && (
            <div
              ref={showPanel}
              tabIndex={-1}
              role="alert"
              className="status-panel rounded-2xl border border-brand-copper/30 bg-brand-copper/10 p-5 outline-none"
            >
              <h2 className="font-serif text-lg font-bold text-brand-dark-base">
                {t('callHeading')}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-brand-dark-base/75">
                {status.kind === 'unavailable' ? t(status.message) : t('networkError')}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={`tel:${phone}`}
                  className="tap-target focus-ring-inverse rounded-full bg-brand-teal px-6 text-sm font-semibold text-white hover:bg-brand-teal-dark"
                >
                  {tCommon('call', { number: phoneDisplay })}
                </a>
                {whatsappHref && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="tap-target focus-ring-inverse gap-2 rounded-full bg-brand-whatsapp px-5 text-sm font-semibold text-white hover:bg-brand-whatsapp-hover"
                  >
                    <WhatsAppIcon className="h-[18px] w-[18px]" />
                    {tCommon('whatsapp')}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* ---- new or existing (in the overlay it lives in the title bar) ------------------- */}
          {!overlay && (
            <div>
              <p className="mb-2 text-sm font-semibold">
                {t('patientTypeLegend')}{' '}
                <span className="font-normal text-brand-dark-base/50">{t('requiredNote')}</span>
              </p>
              {segmented}
            </div>
          )}

          <div className="grid gap-4 lg:grid-cols-2 lg:items-start lg:gap-5">
            {/* ======== left: the patient and how to reach them ======== */}
            <div className="min-w-0 space-y-4">
              <Group
                title={t('sectionPatient')}
                notes={[
                  ...(!isNew ? [{ id: 'appt-existing-note', text: t('existingNote') }] : []),
                  ...(isNew && ageMode === 'age' ? [{ id: 'appt-age-hint', text: t('ageHint') }] : []),
                ]}
              >
                {!isNew && (
                  <TextField
                    id="appt-uhid"
                    name="uhid"
                    label={t('uhid')}
                    optional
                    hintId="appt-uhid-hint"
                    error={errorFor('uhid')}
                    autoComplete="off"
                  />
                )}
                <Cell
                  id="appt-name"
                  label={t('name')}
                  required
                  error={errorFor('name') ?? errorFor('title')}
                >
                  <SelectControl
                    id="appt-title"
                    name="title"
                    compact
                    ariaLabel={t('title')}
                    invalid={!!errorFor('title')}
                    required={isNew}
                  >
                    {titleOptions}
                  </SelectControl>
                  <span aria-hidden="true" className="h-5 w-px shrink-0 bg-brand-teal/15" />
                  <input
                    id="appt-name"
                    name="name"
                    type="text"
                    aria-required="true"
                    aria-invalid={errorFor('name') ? true : undefined}
                    aria-describedby={errorFor('name') ? 'appt-name-error' : undefined}
                    autoComplete="name"
                    className={FIELD}
                  />
                </Cell>

                <NewOnly active={isNew}>
                  <PairRow>
                    <SelectField
                      id="appt-sex"
                      name="sex"
                      label={t('sex')}
                      half
                      error={errorFor('sex')}
                    >
                      <option value="">{t('select')}</option>
                      {SEX.map((item) => (
                        <option key={item.value} value={item.value}>
                          {t(`sexes.${item.key}`)}
                        </option>
                      ))}
                    </SelectField>

                    <Cell
                      id={ageMode === 'age' ? 'appt-age' : 'appt-dob'}
                      label={ageMode === 'age' ? t('age') : t('dobOption')}
                      required
                      error={errorFor(ageMode === 'age' ? 'age' : 'dob')}
                      labelSlot={
                        <Segmented
                          label={t('ageLegend')}
                          name="ageMode"
                          value={ageMode}
                          onChange={(value) => setAgeMode(value as AgeMode)}
                          options={[
                            { value: 'age', label: t('ageOption') },
                            { value: 'dob', label: t('dobShort') },
                          ]}
                          small
                        />
                      }
                    >
                      {ageMode === 'age' ? (
                        <input
                          id="appt-age"
                          name="age"
                          type="text"
                          inputMode="numeric"
                          autoComplete="off"
                          maxLength={3}
                          placeholder={t('age')}
                          aria-required="true"
                          aria-invalid={errorFor('age') ? true : undefined}
                          aria-describedby={
                            ['appt-age-hint', errorFor('age') ? 'appt-age-error' : '']
                              .filter(Boolean)
                              .join(' ')
                          }
                          className={FIELD}
                        />
                      ) : (
                        <DateControl
                          id="appt-dob"
                          name="dob"
                          min={dateLimits.dobMin}
                          max={dateLimits.dobMax}
                          invalid={!!errorFor('dob')}
                          describedByIds={errorFor('dob') ? 'appt-dob-error' : undefined}
                          required
                        />
                      )}
                    </Cell>
                  </PairRow>
                </NewOnly>
              </Group>

              <Group
                title={t('sectionContact')}
                notes={[{ id: 'appt-mobile-hint', text: t('mobileHint') }]}
              >
                <Cell
                  id="appt-mobile"
                  label={t('mobile')}
                  required
                  error={errorFor('mobile') ?? errorFor('isd')}
                >
                  <input
                    id="appt-isd"
                    name="isd"
                    type="text"
                    defaultValue="+91"
                    inputMode="tel"
                    autoComplete="tel-country-code"
                    aria-label={t('isd')}
                    aria-invalid={errorFor('isd') ? true : undefined}
                    className={`${FIELD} !w-[3.25rem] shrink-0 text-center text-brand-dark-base/70`}
                  />
                  <span aria-hidden="true" className="h-5 w-px shrink-0 bg-brand-teal/15" />
                  <input
                    id="appt-mobile"
                    name="mobile"
                    type="tel"
                    // `inputMode` gives a phone keypad on mobile; `autoComplete` lets the browser
                    // fill it. Both are the difference between a 20-second form and a 90-second
                    // one on a phone.
                    inputMode="tel"
                    autoComplete="tel-national"
                    aria-required="true"
                    aria-invalid={errorFor('mobile') ? true : undefined}
                    aria-describedby={['appt-mobile-hint', errorFor('mobile') ? 'appt-mobile-error' : '']
                      .filter(Boolean)
                      .join(' ')}
                    className={FIELD}
                  />
                </Cell>
                <NewOnly active={isNew}>
                  <PairRow>
                    <TextField
                      id="appt-landline"
                      name="landline"
                      label={t('landline')}
                      type="tel"
                      optional
                      half
                      inputMode="tel"
                      autoComplete="off"
                      error={errorFor('landline')}
                    />
                    <TextField
                      id="appt-email"
                      name="email"
                      label={t('email')}
                      type="email"
                      optional
                      half
                      inputMode="email"
                      autoComplete="email"
                      error={errorFor('email')}
                    />
                  </PairRow>
                </NewOnly>
              </Group>

              <Group title={t('sectionAddress')} hidden={!isNew}>
                <TextField
                  id="appt-address"
                  name="address"
                  label={t('address')}
                  autoComplete="street-address"
                  error={errorFor('address')}
                />
                <PairRow>
                  <TextField
                    id="appt-city"
                    name="city"
                    label={t('city')}
                    optional
                    half
                    autoComplete="address-level2"
                    error={errorFor('city')}
                  />
                  <TextField
                    id="appt-state"
                    name="state"
                    label={t('state')}
                    optional
                    half
                    autoComplete="address-level1"
                    error={errorFor('state')}
                  />
                </PairRow>
                <PairRow>
                  <TextField
                    id="appt-pincode"
                    name="pincode"
                    label={t('pincode')}
                    optional
                    half
                    inputMode="numeric"
                    autoComplete="postal-code"
                    maxLength={6}
                    error={errorFor('pincode')}
                  />
                  <SelectField
                    id="appt-nation"
                    name="nation"
                    label={t('nation')}
                    optional
                    half
                    defaultValue="INDIAN"
                    error={errorFor('nation')}
                  >
                    {NATIONS.map((item) => (
                      <option key={item.value} value={item.value}>
                        {t(`nations.${item.key}`)}
                      </option>
                    ))}
                  </SelectField>
                </PairRow>
              </Group>
            </div>

            {/* ======== right: the visit and the terms ======== */}
            <div className="min-w-0 space-y-4">
              <Group
                title={t('sectionGuardian')}
                hidden={!isNew}
                notes={[{ id: 'appt-guardian-hint', text: t('guardianHint') }]}
              >
                <Cell
                  id="appt-guardian-name"
                  label={t('guardianName')}
                  required={false}
                  error={errorFor('guardianName') ?? errorFor('guardianTitle')}
                >
                  <SelectControl
                    id="appt-guardian-title"
                    name="guardianTitle"
                    compact
                    ariaLabel={t('title')}
                    invalid={!!errorFor('guardianTitle')}
                  >
                    {titleOptions}
                  </SelectControl>
                  <span aria-hidden="true" className="h-5 w-px shrink-0 bg-brand-teal/15" />
                  <input
                    id="appt-guardian-name"
                    name="guardianName"
                    type="text"
                    autoComplete="off"
                    aria-invalid={errorFor('guardianName') ? true : undefined}
                    aria-describedby={['appt-guardian-hint', errorFor('guardianName') ? 'appt-guardian-name-error' : '']
                      .filter(Boolean)
                      .join(' ')}
                    className={FIELD}
                  />
                </Cell>
              </Group>

              <Group
                title={t('sectionVisit')}
                notes={[
                  { id: 'appt-date-hint', text: t('preferredDateHint') },
                  { id: 'appt-notes-hint', text: t('notesHint') },
                ]}
              >
                <SelectField
                  id="appt-department"
                  name="departmentSlug"
                  label={t('department')}
                  optional
                  defaultValue={initialDepartmentSlug}
                  error={errorFor('departmentSlug')}
                >
                  <option value="">{t('departmentNone')}</option>
                  {serviceGroups.map((group) => (
                    <optgroup key={group.label} label={group.label}>
                      {group.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </SelectField>
                <SelectField
                  id="appt-doctor"
                  name="doctorId"
                  label={t('doctor')}
                  optional
                  defaultValue={initialDoctorId}
                  error={errorFor('doctorId')}
                >
                  <option value="">{t('doctorNone')}</option>
                  {doctorOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </SelectField>
                <PairRow>
                  <DateField
                    id="appt-date"
                    name="preferredDate"
                    label={t('preferredDate')}
                    half
                    min={dateLimits.preferredMin}
                    max={dateLimits.preferredMax}
                    showToday
                    hintId="appt-date-hint"
                    error={errorFor('preferredDate')}
                  />
                  <SelectField
                    id="appt-time"
                    name="preferredTime"
                    label={t('preferredTime')}
                    optional
                    half
                    defaultValue="any"
                    error={errorFor('preferredTime')}
                  >
                    {TIME_WINDOWS.map((item) => (
                      <option key={item.value} value={item.value}>
                        {t(`times.${item.key}`)}
                      </option>
                    ))}
                  </SelectField>
                </PairRow>
                <Cell id="appt-notes" label={t('notes')} top>
                  <textarea
                    id="appt-notes"
                    name="notes"
                    rows={2}
                    maxLength={1000}
                    aria-describedby="appt-notes-hint"
                    className="my-2 min-h-[3.75rem] w-full min-w-0 resize-none rounded-xl bg-brand-mist px-3 py-2.5 text-[15px] leading-snug text-brand-dark-base outline-none transition-[background-color,box-shadow] focus:bg-white focus:shadow-[0_0_0_2px_rgba(15,91,102,0.3)] focus-visible:outline-none"
                  />
                </Cell>
              </Group>

              <Group title={t('termsHeading')}>
                <div className="px-4 pb-0.5 pt-3">
                  <ul className="list-disc space-y-1 pl-4 text-[13px] leading-relaxed text-brand-dark-base/70">
                    <li>{t('termArrive')}</li>
                    <li>{t('termWaitlist')}</li>
                  </ul>
                </div>
                <div className="px-4">
                  <RoundCheckbox
                    name="termsAccepted"
                    invalid={!!fieldErrors.termsAccepted}
                    describedByIds={fieldErrors.termsAccepted ? 'appt-terms-error' : undefined}
                  >
                    {t('accept')}
                  </RoundCheckbox>
                  {fieldErrors.termsAccepted && (
                    <p id="appt-terms-error" className="pb-2.5 text-xs font-semibold text-brand-emergency">
                      {errorFor('termsAccepted')}
                    </p>
                  )}
                </div>
              </Group>

              {!overlay && (
                <>
                  {hasErrors && (
                    <p role="alert" className="text-sm font-semibold text-brand-emergency">
                      {t('fixErrors')}
                    </p>
                  )}
                  {submitButton}
                </>
              )}
            </div>
          </div>

          {/* A phone has no room for the action bar's emergency note, so it sits at the end. */}
          {overlay && emergencyPhone && (
            <a
              href={`tel:${emergencyPhone}`}
              className="block rounded-2xl bg-brand-emergency/5 p-4 text-sm font-semibold leading-snug text-brand-emergency sm:hidden"
            >
              {t('emergencyLine', { number: emergencyPhoneDisplay ?? emergencyPhone })}
            </a>
          )}
        </div>
      </div>

      {overlay && (
        <footer className="shrink-0 border-t border-brand-teal/10 bg-white/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl [@media(prefers-reduced-transparency:reduce)]:bg-white [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none">
          <div className="flex w-full items-center gap-3 px-4 py-3 sm:px-6">
            <div className="min-w-0 flex-1 text-xs leading-snug">
              {hasErrors ? (
                <p role="alert" className="font-semibold text-brand-emergency">
                  {t('fixErrors')}
                </p>
              ) : (
                emergencyPhone && (
                  <a
                    href={`tel:${emergencyPhone}`}
                    className="hidden text-brand-dark-base/65 transition-colors hover:text-brand-emergency sm:block"
                  >
                    {t('emergencyLine', { number: emergencyPhoneDisplay ?? emergencyPhone })}
                  </a>
                )
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="tap-target press rounded-full px-5 text-sm font-semibold text-brand-teal transition-colors hover:bg-brand-mist"
            >
              {t('cancel')}
            </button>
            {submitButton}
          </div>
        </footer>
      )}

      <p aria-live="polite" className="sr-only">
        {submitting ? t('sendingAnnounce') : ''}
      </p>
    </form>
  )
}

/** The bare input of a hand-built row (the row is the box; see fields.tsx). */
const FIELD =
  'min-h-[44px] w-full min-w-0 bg-transparent text-[15px] text-brand-dark-base outline-none placeholder:text-brand-dark-base/35 focus-visible:outline-none'

/** `value` (YYYY-MM-DD) plus a number of days, in UTC so the time zone cannot move it. */
function isoPlusDays(value: string, days: number): string {
  const [y, m, d] = value.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10)
}
