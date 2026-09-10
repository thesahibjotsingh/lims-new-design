'use client'

// components/appointments/AppointmentForm.tsx
//
// The one genuinely stateful form on the site.
//
// It is built around a rule the API route also enforces: never show a patient a success
// message unless the request actually went somewhere. When the endpoint reports that no
// delivery channel is configured — which is its state in development and will be its
// state on the first deploy — this renders the hospital's phone number as the next
// step, not a thank-you.
//
// The catalogue arrives as props from the server page. This component never imports
// lib/services or lib/doctors, so the 26-service list and the roster are not duplicated
// into the client bundle.

import { useState } from 'react'
import Link from 'next/link'

interface Option {
  value: string
  label: string
}

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'unavailable'; message: string; phone: string; phoneDisplay: string }
  | { kind: 'error'; message: string }

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
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus({ kind: 'submitting' })
    setFieldErrors({})

    const data = new FormData(event.currentTarget)
    const payload = {
      name: data.get('name'),
      phone: data.get('phone'),
      preferredDate: data.get('preferredDate'),
      doctorId: data.get('doctorId'),
      departmentSlug: data.get('departmentSlug'),
      notes: data.get('notes'),
    }

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
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
        setFieldErrors(result.fieldErrors as Record<string, string>)
        setStatus({ kind: 'idle' })
        return
      }

      // 503 (nothing configured) and 502 (delivery failed) both land here: from the
      // patient's side they are the same situation — this did not go through, call
      // instead — and the phone number is the useful half of the answer.
      setStatus({
        kind: 'unavailable',
        message:
          typeof result?.message === 'string'
            ? result.message
            : 'We could not submit your request just now.',
        phone: typeof result?.phone === 'string' ? result.phone : fallbackPhone,
        phoneDisplay:
          typeof result?.phoneDisplay === 'string'
            ? result.phoneDisplay
            : fallbackPhoneDisplay,
      })
    } catch {
      setStatus({
        kind: 'error',
        // A plain string, not JSX — an HTML entity here would render literally.
        message:
          'We could not reach the booking service. Please check your connection, or call us.',
      })
    }
  }

  if (status.kind === 'success') {
    return (
      <div
        role="status"
        className="rounded-2xl border border-emerald-600/20 bg-emerald-50 p-6"
      >
        <h2 className="font-serif text-xl font-bold text-emerald-900">
          Request received
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-emerald-900/80">
          The hospital will call you back on the number you gave to confirm a time. This
          is a request, not a confirmed appointment &mdash; please do not travel until
          LIMS has confirmed.
        </p>
        <Link
          href="/"
          className="tap-target mt-4 rounded-full border border-emerald-700/25 px-5 text-xs font-semibold text-emerald-900 hover:bg-white"
        >
          Back to home
        </Link>
      </div>
    )
  }

  const submitting = status.kind === 'submitting'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {(status.kind === 'unavailable' || status.kind === 'error') && (
        <div
          role="alert"
          className="rounded-2xl border border-brand-copper/30 bg-brand-copper/10 p-5"
        >
          <h2 className="font-serif text-lg font-bold text-brand-dark-base">
            Please call the hospital
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-brand-dark-base/75">
            {status.message}
          </p>
          <a
            href={`tel:${status.kind === 'unavailable' ? status.phone : fallbackPhone}`}
            className="tap-target focus-ring-inverse mt-3 rounded-full bg-brand-teal px-6 text-sm font-semibold text-white hover:bg-brand-teal-dark"
          >
            Call{' '}
            {status.kind === 'unavailable' ? status.phoneDisplay : fallbackPhoneDisplay}
          </a>
        </div>
      )}

      <Field
        id="appt-name"
        name="name"
        label="Patient name"
        autoComplete="name"
        required
        error={fieldErrors.name}
      />

      <Field
        id="appt-phone"
        name="phone"
        label="Phone number"
        type="tel"
        // `inputMode` gives a phone keypad on mobile; `autoComplete="tel"` lets the
        // browser fill it. Both are the difference between a 20-second form and a
        // 90-second one on a phone.
        inputMode="tel"
        autoComplete="tel"
        required
        hint="The hospital will call this number to confirm."
        error={fieldErrors.phone}
      />

      <Field
        id="appt-date"
        name="preferredDate"
        label="Preferred date"
        type="date"
        optional
        hint="A preference, not a booking."
      />

      <div>
        <label htmlFor="appt-doctor" className="mb-1.5 block text-sm font-semibold">
          Doctor <span className="font-normal text-brand-dark-base/50">(optional)</span>
        </label>
        <select
          id="appt-doctor"
          name="doctorId"
          defaultValue={initialDoctorId}
          className="min-h-[44px] w-full rounded-xl border border-brand-teal/20 bg-white px-3 text-sm"
        >
          <option value="">No preference</option>
          {doctorOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="appt-department" className="mb-1.5 block text-sm font-semibold">
          Department or service{' '}
          <span className="font-normal text-brand-dark-base/50">(optional)</span>
        </label>
        <select
          id="appt-department"
          name="departmentSlug"
          defaultValue={initialDepartmentSlug}
          className="min-h-[44px] w-full rounded-xl border border-brand-teal/20 bg-white px-3 text-sm"
        >
          <option value="">Not sure / general</option>
          {serviceGroups.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="appt-notes" className="mb-1.5 block text-sm font-semibold">
          Anything the hospital should know{' '}
          <span className="font-normal text-brand-dark-base/50">(optional)</span>
        </label>
        <textarea
          id="appt-notes"
          name="notes"
          rows={3}
          maxLength={2000}
          className="w-full rounded-xl border border-brand-teal/20 bg-white px-3 py-2.5 text-sm"
        />
        {/*
          No "describe your symptoms" prompt. This form is not a clinical intake and
          inviting health details into it puts sensitive personal data through a channel
          built for scheduling.
        */}
        <p className="mt-1.5 text-xs text-brand-dark-base/55">
          Please do not include medical details here &mdash; this is a scheduling
          request, not a consultation.
        </p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="tap-target focus-ring-inverse w-full rounded-xl bg-brand-copper px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-copper-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? 'Sending…' : 'Request appointment'}
      </button>

      <p aria-live="polite" className="sr-only">
        {submitting ? 'Sending your request' : ''}
      </p>
    </form>
  )
}

function Field({
  id,
  name,
  label,
  type = 'text',
  hint,
  error,
  optional = false,
  ...rest
}: {
  id: string
  name: string
  label: string
  type?: string
  hint?: string
  error?: string
  optional?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}{' '}
        {optional && <span className="font-normal text-brand-dark-base/50">(optional)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        // The error is wired to the input with aria-describedby and aria-invalid, so a
        // screen reader announces it on focus. A red border alone says nothing.
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        className={[
          'min-h-[44px] w-full rounded-xl border bg-white px-3 text-sm',
          error ? 'border-brand-emergency' : 'border-brand-teal/20',
        ].join(' ')}
        {...rest}
      />
      {hint && (
        <p id={hintId} className="mt-1.5 text-xs text-brand-dark-base/55">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs font-semibold text-brand-emergency">
          {error}
        </p>
      )}
    </div>
  )
}
