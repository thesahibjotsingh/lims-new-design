'use client'

// components/appointments/AppointmentForm.tsx
//
// The one genuinely stateful form on the site.
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
// The catalogue arrives as props from the server page. This component never imports
// lib/services or lib/doctors, so the 26-service list and the roster are not duplicated
// into the client bundle.

import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
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

const INPUT_BASE = 'min-h-[44px] w-full rounded-xl border bg-white px-3 text-sm transition-colors'

function inputClass(error: string | undefined): string {
  return [
    INPUT_BASE,
    error
      ? 'border-brand-emergency focus:border-brand-emergency'
      : 'border-brand-teal/20 focus:border-brand-teal/50',
  ].join(' ')
}

export function AppointmentForm({
  doctorOptions,
  serviceGroups,
  initialDoctorId = '',
  initialDepartmentSlug = '',
  fallbackPhone,
  fallbackPhoneDisplay,
}: {
  doctorOptions: Option[]
  serviceGroups: { label: string; options: Option[] }[]
  initialDoctorId?: string
  initialDepartmentSlug?: string
  fallbackPhone: string
  fallbackPhoneDisplay: string
}) {
  const t = useTranslations('appointmentForm')
  const tCommon = useTranslations('common')
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

  // The form is long, so on a phone the patient is at the bottom when a panel appears at
  // the top. Focusing it scrolls it into view and has a screen reader read it out.
  const showPanel = (element: HTMLElement | null) => element?.focus()

  if (status.kind === 'success') {
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

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
      {(status.kind === 'unavailable' || status.kind === 'error') && (
        <div
          ref={showPanel}
          tabIndex={-1}
          role="alert"
          className="status-panel rounded-2xl border border-brand-copper/30 bg-brand-copper/10 p-5 outline-none"
        >
          <h2 className="font-serif text-lg font-bold text-brand-dark-base">{t('callHeading')}</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-brand-dark-base/75">
            {status.kind === 'unavailable' ? t(status.message) : t('networkError')}
          </p>
          <a
            href={`tel:${phone}`}
            className="tap-target focus-ring-inverse mt-3 rounded-full bg-brand-teal px-6 text-sm font-semibold text-white hover:bg-brand-teal-dark"
          >
            {tCommon('call', { number: phoneDisplay })}
          </a>
        </div>
      )}

      {/* ---- new or existing ----------------------------------------------------------- */}
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="mb-2 text-sm font-semibold">{t('patientTypeLegend')}</legend>
        <div className="flex flex-wrap gap-2">
          <Pill
            name="patientType"
            value="new"
            checked={isNew}
            onChange={() => setPatientType('new')}
          >
            {t('patientNew')}
          </Pill>
          <Pill
            name="patientType"
            value="existing"
            checked={!isNew}
            onChange={() => setPatientType('existing')}
          >
            {t('patientExisting')}
          </Pill>
        </div>
        {!isNew && (
          <p className="mt-3 text-sm leading-relaxed text-brand-dark-base/70">
            {t('existingNote')}
          </p>
        )}
      </fieldset>

      {!isNew && (
        <TextField
          id="appt-uhid"
          name="uhid"
          label={t('uhid')}
          optional
          hint={t('uhidHint')}
          error={errorFor('uhid')}
          autoComplete="off"
        />
      )}

      {/* ---- the patient ----------------------------------------------------------------- */}
      <Section title={t('sectionPatient')}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[8rem_1fr]">
          <SelectField
            id="appt-title"
            name="title"
            label={t('title')}
            optional={!isNew}
            error={errorFor('title')}
            defaultValue=""
          >
            <option value="">{t('select')}</option>
            {TITLES.map((item) => (
              <option key={item.value} value={item.value}>
                {t(`titles.${item.key}`)}
              </option>
            ))}
          </SelectField>
          <TextField
            id="appt-name"
            name="name"
            label={t('name')}
            required
            autoComplete="name"
            error={errorFor('name')}
          />
        </div>

        <NewOnly active={isNew} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SelectField
            id="appt-sex"
            name="sex"
            label={t('sex')}
            error={errorFor('sex')}
            defaultValue=""
          >
            <option value="">{t('select')}</option>
            {SEX.map((item) => (
              <option key={item.value} value={item.value}>
                {t(`sexes.${item.key}`)}
              </option>
            ))}
          </SelectField>

          <div>
            <fieldset className="m-0 min-w-0 border-0 p-0">
              <legend className="mb-1.5 text-sm font-semibold">{t('ageLegend')}</legend>
              <div className="mb-2 flex gap-2">
                <Pill
                  name="ageMode"
                  value="age"
                  checked={ageMode === 'age'}
                  onChange={() => setAgeMode('age')}
                  small
                >
                  {t('ageOption')}
                </Pill>
                <Pill
                  name="ageMode"
                  value="dob"
                  checked={ageMode === 'dob'}
                  onChange={() => setAgeMode('dob')}
                  small
                >
                  {t('dobOption')}
                </Pill>
              </div>
            </fieldset>
            {ageMode === 'age' ? (
              <TextField
                id="appt-age"
                name="age"
                label={t('age')}
                hint={t('ageHint')}
                error={errorFor('age')}
                inputMode="numeric"
                autoComplete="off"
                maxLength={3}
                hideLabel
              />
            ) : (
              <TextField
                id="appt-dob"
                name="dob"
                label={t('dobOption')}
                type="date"
                max={today || undefined}
                autoComplete="bday"
                error={errorFor('dob')}
                hideLabel
              />
            )}
          </div>
        </NewOnly>
      </Section>

      {/* ---- guardian (new patients only) ----------------------------------------------------- */}
      <Section title={t('sectionGuardian')} hidden={!isNew}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[8rem_1fr]">
          <SelectField
            id="appt-guardian-title"
            name="guardianTitle"
            label={t('title')}
            optional
            error={errorFor('guardianTitle')}
            defaultValue=""
          >
            <option value="">{t('select')}</option>
            {TITLES.map((item) => (
              <option key={item.value} value={item.value}>
                {t(`titles.${item.key}`)}
              </option>
            ))}
          </SelectField>
          <TextField
            id="appt-guardian-name"
            name="guardianName"
            label={t('guardianName')}
            optional
            hint={t('guardianHint')}
            error={errorFor('guardianName')}
            autoComplete="off"
          />
        </div>
      </Section>

      {/* ---- contact ---------------------------------------------------------------------------------- */}
      <Section title={t('sectionContact')}>
        <div className="grid grid-cols-[6.5rem_1fr] gap-3 sm:gap-4">
          <TextField
            id="appt-isd"
            name="isd"
            label={t('isd')}
            defaultValue="+91"
            inputMode="tel"
            autoComplete="tel-country-code"
            error={errorFor('isd')}
          />
          <TextField
            id="appt-mobile"
            name="mobile"
            label={t('mobile')}
            type="tel"
            required
            // `inputMode` gives a phone keypad on mobile; `autoComplete` lets the browser
            // fill it. Both are the difference between a 20-second form and a 90-second
            // one on a phone.
            inputMode="tel"
            autoComplete="tel-national"
            hint={t('mobileHint')}
            error={errorFor('mobile')}
          />
        </div>
        <NewOnly active={isNew} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            id="appt-landline"
            name="landline"
            label={t('landline')}
            type="tel"
            optional
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
            inputMode="email"
            autoComplete="email"
            error={errorFor('email')}
          />
        </NewOnly>
      </Section>

      {/* ---- address (new patients only) --------------------------------------------------------------- */}
      <Section title={t('sectionAddress')} hidden={!isNew}>
        <TextField
          id="appt-address"
          name="address"
          label={t('address')}
          required
          autoComplete="street-address"
          error={errorFor('address')}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            id="appt-city"
            name="city"
            label={t('city')}
            optional
            autoComplete="address-level2"
            error={errorFor('city')}
          />
          <TextField
            id="appt-state"
            name="state"
            label={t('state')}
            optional
            autoComplete="address-level1"
            error={errorFor('state')}
          />
          <TextField
            id="appt-pincode"
            name="pincode"
            label={t('pincode')}
            optional
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={6}
            error={errorFor('pincode')}
          />
          <SelectField
            id="appt-nation"
            name="nation"
            label={t('nation')}
            defaultValue="INDIAN"
            error={errorFor('nation')}
          >
            {NATIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {t(`nations.${item.key}`)}
              </option>
            ))}
          </SelectField>
        </div>
      </Section>

      {/* ---- the visit ------------------------------------------------------------------------------------ */}
      <Section title={t('sectionVisit')}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          <TextField
            id="appt-date"
            name="preferredDate"
            label={t('preferredDate')}
            type="date"
            required
            min={today || undefined}
            hint={t('preferredDateHint')}
            error={errorFor('preferredDate')}
          />
          <SelectField
            id="appt-time"
            name="preferredTime"
            label={t('preferredTime')}
            optional
            defaultValue="any"
            error={errorFor('preferredTime')}
          >
            {TIME_WINDOWS.map((item) => (
              <option key={item.value} value={item.value}>
                {t(`times.${item.key}`)}
              </option>
            ))}
          </SelectField>
        </div>

        <div>
          <label htmlFor="appt-notes" className="mb-1.5 block text-sm font-semibold">
            {t('notes')}{' '}
            <span className="font-normal text-brand-dark-base/50">{t('optional')}</span>
          </label>
          <textarea
            id="appt-notes"
            name="notes"
            rows={3}
            maxLength={1000}
            aria-describedby="appt-notes-hint"
            className="w-full rounded-xl border border-brand-teal/20 bg-white px-3 py-2.5 text-sm transition-colors focus:border-brand-teal/50"
          />
          {/*
            No "describe your symptoms" prompt. This form is not a clinical intake and
            inviting health details into it puts sensitive personal data through a channel
            built for scheduling.
          */}
          <p id="appt-notes-hint" className="mt-1.5 text-xs text-brand-dark-base/55">
            {t('notesHint')}
          </p>
        </div>
      </Section>

      {/* ---- terms ------------------------------------------------------------------------------------------ */}
      <Section title={t('termsHeading')}>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-brand-dark-base/75">
          <li>{t('termArrive')}</li>
          <li>{t('termWaitlist')}</li>
        </ul>
        <div>
          <label className="flex min-h-[44px] cursor-pointer items-start gap-3 text-sm">
            <input
              type="checkbox"
              name="termsAccepted"
              aria-invalid={fieldErrors.termsAccepted ? true : undefined}
              aria-describedby={fieldErrors.termsAccepted ? 'appt-terms-error' : undefined}
              className="mt-0.5 h-5 w-5 shrink-0 rounded accent-brand-teal"
            />
            <span className="font-semibold">{t('accept')}</span>
          </label>
          {fieldErrors.termsAccepted && (
            <p id="appt-terms-error" className="mt-1.5 text-xs font-semibold text-brand-emergency">
              {errorFor('termsAccepted')}
            </p>
          )}
        </div>
      </Section>

      {hasErrors && (
        <p role="alert" className="text-sm font-semibold text-brand-emergency">
          {t('fixErrors')}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="tap-target focus-ring-inverse w-full rounded-xl bg-brand-copper px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-copper-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? t('submitting') : t('submit')}
      </button>

      <p aria-live="polite" className="sr-only">
        {submitting ? t('sendingAnnounce') : ''}
      </p>
    </form>
  )
}

/* -------------------------------------------------------------------------------------- */
/* Building blocks                                                                         */
/* -------------------------------------------------------------------------------------- */

function Section({
  title,
  hidden = false,
  children,
}: {
  title: string
  /** Hidden AND disabled, so its fields leave the submission but keep their values. */
  hidden?: boolean
  children: React.ReactNode
}) {
  return (
    <fieldset
      disabled={hidden}
      className={[
        'min-w-0 space-y-4 rounded-2xl border border-brand-teal/10 bg-white p-5 sm:p-6',
        hidden ? 'hidden' : '',
      ].join(' ')}
    >
      <legend className="px-2 font-serif text-lg font-bold text-brand-dark-base">{title}</legend>
      {children}
    </fieldset>
  )
}

/** A bare wrapper that switches a group of fields off (hidden + disabled) together. */
function NewOnly({
  active,
  className = '',
  children,
}: {
  active: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <fieldset
      disabled={!active}
      className={`m-0 min-w-0 border-0 p-0 ${active ? className : 'hidden'}`}
    >
      {children}
    </fieldset>
  )
}

function Pill({
  name,
  value,
  checked,
  onChange,
  small = false,
  children,
}: {
  name: string
  value: string
  checked: boolean
  onChange: () => void
  small?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        className={[
          'tap-target rounded-full border border-brand-teal/25 font-semibold text-brand-teal transition-colors',
          'peer-checked:border-brand-teal peer-checked:bg-brand-teal peer-checked:text-white',
          'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-copper',
          small ? 'px-4 text-xs' : 'px-5 text-sm',
        ].join(' ')}
      >
        {children}
      </span>
    </label>
  )
}

function FieldLabel({
  htmlFor,
  label,
  optional,
  hidden,
}: {
  htmlFor: string
  label: string
  optional?: boolean
  hidden?: boolean
}) {
  const t = useTranslations('appointmentForm')
  return (
    <label htmlFor={htmlFor} className={hidden ? 'sr-only' : 'mb-1.5 block text-sm font-semibold'}>
      {label}
      {optional && <span className="font-normal text-brand-dark-base/50"> {t('optional')}</span>}
    </label>
  )
}

function Message({ id, hint, error }: { id: string; hint?: string; error?: string }) {
  return (
    <>
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-brand-dark-base/55">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-semibold text-brand-emergency">
          {error}
        </p>
      )}
    </>
  )
}

function describedBy(id: string, hint?: string, error?: string): string | undefined {
  return [hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined
}

function TextField({
  id,
  name,
  label,
  hint,
  error,
  optional = false,
  required = false,
  hideLabel = false,
  type = 'text',
  ...rest
}: {
  id: string
  name: string
  label: string
  hint?: string
  error?: string
  optional?: boolean
  required?: boolean
  /** Visually hidden, still announced — for a field a visible legend already names. */
  hideLabel?: boolean
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'name'>) {
  return (
    <div>
      <FieldLabel htmlFor={id} label={label} optional={optional} hidden={hideLabel} />
      <input
        id={id}
        name={name}
        type={type}
        aria-required={required || undefined}
        // The error is wired to the input with aria-describedby and aria-invalid, so a
        // screen reader announces it on focus. A red border alone says nothing.
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={inputClass(error)}
        {...rest}
      />
      <Message id={id} hint={hint} error={error} />
    </div>
  )
}

function SelectField({
  id,
  name,
  label,
  error,
  optional = false,
  defaultValue,
  children,
}: {
  id: string
  name: string
  label: string
  error?: string
  optional?: boolean
  defaultValue?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} label={label} optional={optional} />
      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, undefined, error)}
        className={inputClass(error)}
      >
        {children}
      </select>
      <Message id={id} error={error} />
    </div>
  )
}
