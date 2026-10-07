import { NextResponse } from 'next/server'
import { todayInIndia, validateAppointment } from '@/lib/appointment'
import { getDoctor } from '@/lib/doctors'
import { getService } from '@/lib/services'
import { contact } from '@/lib/site-config'

/*
 * Appointment requests.
 *
 * THE RULE THIS ENDPOINT EXISTS TO ENFORCE: never tell a patient their request was
 * received unless it actually went somewhere.
 *
 * A form that posts to an unconfigured backend and renders "Thank you, we'll be in
 * touch" is worse than no form at all — the patient stops trying, and nobody at the
 * hospital ever learns they wanted an appointment. So when no delivery channel is
 * configured this returns 503 with `configured: false`, and the UI shows the phone
 * number instead of a success message.
 *
 * THE ONLY DELIVERY CHANNEL IS A WEBHOOK. There used to be an APPOINTMENT_NOTIFY_EMAIL
 * variable here too, but nothing ever sent an email: setting it made this route skip the
 * webhook, return `ok: true`, and show a patient "Request received" for a request that
 * went nowhere — the exact failure this file exists to prevent. It was removed rather
 * than left half-built. Add an email path only together with the code that sends one.
 *
 * The fields mirror the hospital software's own online-appointment form — see
 * lib/appointment.ts for the mapping and for how this differs from a booking.
 *
 * `nodejs` runtime, not edge: a later delivery path (SMTP, or a call into the hospital
 * system) may need TCP sockets the edge runtime does not have.
 */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const LOCALES = ['en', 'hi', 'pa'] as const

/** Where a submitted request is delivered. Unset in development, and that is fine. */
function deliveryTarget(): string | undefined {
  return process.env.APPOINTMENT_WEBHOOK_URL || undefined
}

export async function POST(request: Request) {
  let body: Record<string, unknown>

  try {
    const parsed: unknown = await request.json()
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      throw new Error('not an object')
    }
    body = parsed as Record<string, unknown>
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Could not read the request.' },
      { status: 400 },
    )
  }

  const result = validateAppointment(body, todayInIndia())

  // Resolve against the catalogue rather than trusting the posted strings, so a
  // hand-crafted request cannot put arbitrary text into a staff-facing notification.
  // An id that is not in the catalogue is rejected, not silently dropped: the patient
  // would otherwise believe they had asked for a doctor the hospital never heard of.
  const fieldErrors = result.ok ? {} : { ...result.fieldErrors }
  const requestedDoctor = result.ok ? result.value.doctorId : String(body.doctorId ?? '').trim()
  const requestedService = result.ok
    ? result.value.departmentSlug
    : String(body.departmentSlug ?? '').trim()

  const doctor = requestedDoctor ? getDoctor(requestedDoctor) : undefined
  const service = requestedService ? getService(requestedService) : undefined
  if (requestedDoctor && !doctor) Object.assign(fieldErrors, { doctorId: 'invalidChoice' })
  if (requestedService && !service) {
    Object.assign(fieldErrors, { departmentSlug: 'invalidChoice' })
  }

  if (!result.ok || Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ ok: false, fieldErrors }, { status: 422 })
  }

  const target = deliveryTarget()

  if (!target) {
    /*
     * 503 and an explicit `configured: false`, not a 200.
     *
     * The response carries the phone number so the client has something useful to show
     * without hard-coding it in two places. Nothing about the patient is logged here —
     * a name, phone number and address in a server log is exactly the kind of quiet PHI
     * leak that is invisible until an audit.
     */
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        message:
          'Online appointment requests are not connected yet. Please call the hospital.',
        phone: contact.secondary,
        phoneDisplay: contact.secondaryDisplay,
      },
      { status: 503 },
    )
  }

  const value = result.value
  const posted = typeof body.locale === 'string' ? body.locale : ''
  const preferredLanguage = LOCALES.find((locale) => locale === posted) ?? 'en'
  // A doctor implies a department; fill it so reception always sees both.
  const department = service ?? (doctor ? getService(doctor.departmentSlug) : undefined)

  try {
    const response = await fetch(target, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...value,
        departmentSlug: department?.slug ?? null,
        departmentName: department?.name ?? null,
        doctorName: doctor?.name ?? null,
        preferredLanguage,
        source: 'limshisar.com',
        receivedAt: new Date().toISOString(),
      }),
    })

    if (!response.ok) throw new Error(`Delivery responded ${response.status}`)

    return NextResponse.json({ ok: true, configured: true })
  } catch {
    /*
     * Delivery failed. Again: do not report success. The error deliberately carries no
     * detail from the exception — an upstream error string can contain the webhook URL
     * and its credentials, and this response goes to the browser.
     */
    return NextResponse.json(
      {
        ok: false,
        configured: true,
        message: 'We could not submit your request just now. Please call the hospital.',
        phone: contact.secondary,
        phoneDisplay: contact.secondaryDisplay,
      },
      { status: 502 },
    )
  }
}
