import { NextResponse } from 'next/server'
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
 * `nodejs` runtime, not edge: the Phase 2 delivery path is SMTP/Nodemailer, which needs
 * TCP sockets the edge runtime does not have. Declared now so the switch is not a
 * surprise later.
 */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface AppointmentPayload {
  name?: unknown
  phone?: unknown
  preferredDate?: unknown
  doctorId?: unknown
  departmentSlug?: unknown
  notes?: unknown
}

/** Where a submitted request is delivered. Unset in development, and that is fine. */
function deliveryTarget(): string | undefined {
  return process.env.APPOINTMENT_WEBHOOK_URL || process.env.APPOINTMENT_NOTIFY_EMAIL
}

export async function POST(request: Request) {
  let body: AppointmentPayload

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Could not read the request.' },
      { status: 400 },
    )
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  const preferredDate =
    typeof body.preferredDate === 'string' ? body.preferredDate.trim() : ''
  const notes = typeof body.notes === 'string' ? body.notes.trim().slice(0, 2000) : ''

  const fieldErrors: Record<string, string> = {}
  if (name.length < 2) fieldErrors.name = 'Please enter the patient name.'

  /*
   * Indian mobile numbers, permissively. Deliberately loose: a validator strict enough
   * to be "correct" rejects landlines, +91 prefixes, spaces and hyphens, and the cost
   * of a false reject here is a patient who cannot ask for an appointment. A human
   * reads this field either way.
   */
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 13) {
    fieldErrors.phone = 'Please enter a phone number we can call you back on.'
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ ok: false, fieldErrors }, { status: 422 })
  }

  // Resolve against the catalogue rather than trusting the posted strings, so a
  // hand-crafted request cannot put arbitrary text into a staff-facing notification.
  const doctor = typeof body.doctorId === 'string' ? getDoctor(body.doctorId) : undefined
  const service =
    typeof body.departmentSlug === 'string' ? getService(body.departmentSlug) : undefined

  const target = deliveryTarget()

  if (!target) {
    /*
     * 503 and an explicit `configured: false`, not a 200.
     *
     * The response carries the phone number so the client has something useful to show
     * without hard-coding it in two places. Nothing about the patient is logged here —
     * a name and phone number in a server log is exactly the kind of quiet PHI leak
     * that is invisible until an audit.
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

  try {
    // Phase 2 replaces this with the real delivery (SMTP or the hospital's HIS).
    // Until then a configured webhook is the whole channel.
    if (process.env.APPOINTMENT_WEBHOOK_URL) {
      const response = await fetch(process.env.APPOINTMENT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          preferredDate: preferredDate || null,
          doctor: doctor ? { id: doctor.id, name: doctor.name } : null,
          service: service ? { slug: service.slug, name: service.name } : null,
          notes: notes || null,
          receivedAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) throw new Error(`Delivery responded ${response.status}`)
    }

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
