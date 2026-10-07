'use client'

// components/appointments/BookingProvider.tsx
//
// The booking panel. Mounted once in the layout (via BookingHost), it opens from ANY "Book an
// appointment" link on the site: a rounded panel grows out of the button that was pressed,
// the page behind it blurs and dims, and the panel shrinks back into the same button when it
// closes. It is a floating panel with a margin around it, not a full-page cover, and the form
// inside is laid out to fit it without scrolling (see AppointmentForm).
//
// HOW A LINK BECOMES A SHEET. Nothing is wired per button. One capturing click listener on the
// document watches for a plain left click on an <a> that points at /appointments (any
// language, with or without ?doctor= / ?department=). It cancels the navigation and opens the
// sheet instead, pre-filled from that URL. So the header button, the phone nav's "Book" tab,
// hero buttons, doctor cards, footer links and anything added later all behave the same, and
// every one of them is still a real link: middle-click, "open in new tab", copy-address and a
// browser with no script at all land on the /appointments page, which shows the same form.
// On the /appointments page itself the links are left alone (the form is already there).
//
// THE MOTION (Apple's fluid-interface rules, WWDC 2018 "Designing Fluid Interfaces"):
//   - A SPRING, not a timed curve: critically damped (no bounce: nothing here carries a
//     flick), response 0.42s opening, 0.34s closing. Opening settles in about half a second.
//   - INTERRUPTIBLE. The value being animated is the sheet's openness (0..1), driven by our
//     own spring. Pressing Cancel mid-opening retargets the same spring from where it is,
//     keeping its velocity: no jump, no waiting for the opening to finish.
//   - ANCHORED. The sheet is clipped to the pressed button's exact rectangle at 0 and to the
//     panel's rectangle at 1 (`clip-path: inset(...)`, so its content is never stretched), and
//     closes back to the button's position as it is NOW (re-read at close, in case the window
//     was resized), so enter and exit follow the same path.
//   - THE PAGE BEHIND BLURS with the same value: 0 to 10px of backdrop blur and a dimming
//     scrim, both driven by the spring, so the background and the panel arrive together.
//     (Under "reduce transparency" it dims harder and does not blur.)
//   - The button itself is visible through the sheet's still-transparent background for the
//     first few frames, so the first frame is the button, untouched; the sheet's colour and
//     then its content arrive as it grows.
//   Reduced motion swaps all of it for a 160ms cross-fade.
//
// WHEN CLOSING COSTS SOMETHING. Once the patient has typed anything, Cancel, the X, Escape
// and a tap on the dimmed edge all ask "Discard this request?" first. An empty form, or one
// that has just been sent, closes straight away.
//
// The form is loaded on demand (React.lazy) and fetched in idle time after the page is up,
// or sooner on the first hover/touch of a booking link, so the sheet is not waiting on it.

import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslations } from 'next-intl'
import { usePathname } from '@/i18n/navigation'
import { CloseIcon } from '@/components/icons'
import { clamp01, createDriver, type Driver } from '@/lib/spring'
import type { BookingDoctorOption, BookingOption } from '@/lib/booking-options'

const loadForm = () => import('@/components/appointments/AppointmentForm')
const AppointmentForm = lazy(() =>
  loadForm().then((module) => ({ default: module.AppointmentForm })),
)

const OPEN_RESPONSE = 0.42 // seconds, spring response
const CLOSE_RESPONSE = 0.34
const MAX_ORIGIN_RADIUS = 28
const PANEL_RADIUS = 32 // 24 on a phone
const BACKDROP_BLUR = 10 // px at fully open
/** The sheet's tint (brand-mist), as rgb so its alpha can be driven by the spring. */
const SHEET_RGB = '242, 248, 248'


/* -------------------------------------------------------------------------------------- */
/* The provider                                                                            */
/* -------------------------------------------------------------------------------------- */

interface Origin {
  el: HTMLElement | null
  top: number
  left: number
  right: number
  bottom: number
  radius: number
}

function readOrigin(el: HTMLElement | null, fallback?: Origin): Origin {
  if (el && el.isConnected) {
    const r = el.getBoundingClientRect()
    if (r.width > 0 && r.height > 0) {
      return {
        el,
        top: r.top,
        left: r.left,
        right: r.right,
        bottom: r.bottom,
        radius: Math.min(r.height / 2, MAX_ORIGIN_RADIUS),
      }
    }
  }
  if (fallback) return fallback
  // No usable button (should not happen): grow from a small pill at the centre.
  const w = window.innerWidth
  const h = window.innerHeight
  return { el: null, top: h / 2 - 22, left: w / 2 - 60, right: w / 2 + 60, bottom: h / 2 + 22, radius: 22 }
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function visibleFocusable(root: HTMLElement | null): HTMLElement[] {
  if (!root) return []
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.getClientRects().length > 0,
  )
}

export function BookingProvider({
  doctorOptions,
  serviceGroups,
  fallbackPhone,
  fallbackPhoneDisplay,
  whatsappHref,
  emergencyPhone,
  emergencyPhoneDisplay,
}: {
  doctorOptions: BookingDoctorOption[]
  serviceGroups: { label: string; options: BookingOption[] }[]
  fallbackPhone: string
  fallbackPhoneDisplay: string
  whatsappHref: string
  emergencyPhone: string
  emergencyPhoneDisplay: string
}) {
  const t = useTranslations('appointmentForm')
  const tPage = useTranslations('appointmentsPage')
  const pathname = usePathname()

  // `open` is intent; `rendered` keeps the sheet mounted while it shrinks back into its button.
  const [open, setOpen] = useState(false)
  const [rendered, setRendered] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [launch, setLaunch] = useState({ key: 0, doctorId: '', departmentSlug: '' })

  const overlayRef = useRef<HTMLDivElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const scrimRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)
  const alertRef = useRef<HTMLDivElement>(null)

  const openRef = useRef(false)
  const dirtyRef = useRef(false)
  const originRef = useRef<Origin | null>(null)
  // The window and the panel it is growing to, measured when the sheet opens (and on resize).
  const geoRef = useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    radius: PANEL_RADIUS,
    blur: true,
  })
  const onPageRef = useRef(false)
  const releaseRef = useRef<(() => void) | null>(null)
  const reducedRef = useRef(false)

  // The data the click handler needs, kept current without re-binding the listener.
  const dataRef = useRef({ doctorOptions, serviceGroups })
  useEffect(() => {
    dataRef.current = { doctorOptions, serviceGroups }
  }, [doctorOptions, serviceGroups])
  useEffect(() => {
    onPageRef.current = pathname === '/appointments'
  }, [pathname])

  /* ---- applying the spring's value to the DOM (no React state: it runs every frame) ---- */
  const apply = useCallback((p: number) => {
    const sheet = sheetRef.current
    const origin = originRef.current
    if (!sheet || !origin) return
    const g = geoRef.current
    const k = clamp01(p)
    const mix = (from: number, to: number) => Math.max(0, from + (to - from) * k)
    // From the button's rectangle to the panel's, one inset per edge.
    sheet.style.clipPath =
      `inset(${mix(origin.top, g.top)}px ${mix(g.width - origin.right, g.width - g.right)}px ` +
      `${mix(g.height - origin.bottom, g.height - g.bottom)}px ${mix(origin.left, g.left)}px ` +
      `round ${mix(origin.radius, g.radius)}px)`
    sheet.style.backgroundColor = `rgba(${SHEET_RGB}, ${clamp01(p / 0.22)})`
    if (contentRef.current) contentRef.current.style.opacity = String(clamp01((p - 0.42) / 0.38))
    if (shadowRef.current) shadowRef.current.style.opacity = String(clamp01((p - 0.7) / 0.3))
    const scrim = scrimRef.current
    if (scrim) {
      scrim.style.opacity = String(k)
      const blur = g.blur
        ? `blur(${(k * BACKDROP_BLUR).toFixed(2)}px) saturate(${(1 + k * 0.15).toFixed(3)})`
        : ''
      scrim.style.backdropFilter = blur
      scrim.style.setProperty('-webkit-backdrop-filter', blur)
    }
  }, [])

  /** Where the panel is (it is centred and sized by CSS), and the window it sits in. */
  const measure = useCallback(() => {
    const sheet = sheetRef.current
    const panel = panelRef.current
    if (!sheet || !panel) return
    const box = sheet.getBoundingClientRect()
    const rect = panel.getBoundingClientRect()
    const radius = window.innerWidth < 640 ? 24 : PANEL_RADIUS
    geoRef.current = {
      width: box.width,
      height: box.height,
      top: rect.top - box.top,
      left: rect.left - box.left,
      right: rect.right - box.left,
      bottom: rect.bottom - box.top,
      radius,
      blur: !window.matchMedia('(prefers-reduced-transparency: reduce)').matches,
    }
    const shadow = shadowRef.current
    if (shadow) {
      shadow.style.left = `${rect.left}px`
      shadow.style.top = `${rect.top}px`
      shadow.style.width = `${rect.width}px`
      shadow.style.height = `${rect.height}px`
      shadow.style.borderRadius = `${radius}px`
    }
  }, [])

  const driverRef = useRef<Driver | null>(null)
  if (!driverRef.current) driverRef.current = createDriver((value) => apply(value))
  const driver = driverRef.current

  /* ---- locking the page behind the sheet ---- */
  const lock = useCallback(() => {
    if (releaseRef.current) return
    const body = document.body
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    // Taking the scrollbar away would widen the page by its width; pad by the same amount so
    // the header and everything else stay exactly where they are while the sheet grows.
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`
    // Everything else is inert: no focus, no clicks, and hidden from screen readers.
    const inerted: Element[] = []
    for (const child of Array.from(body.children)) {
      if (child === overlayRef.current || child.hasAttribute('inert')) continue
      // Streamed page data is not something a user can reach; leave it be.
      if (child.tagName === 'SCRIPT' || child.tagName === 'STYLE' || child.tagName === 'LINK') continue
      child.setAttribute('inert', '')
      inerted.push(child)
    }
    releaseRef.current = () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
      inerted.forEach((child) => child.removeAttribute('inert'))
      releaseRef.current = null
    }
  }, [])

  const finishClose = useCallback(() => {
    releaseRef.current?.()
    setRendered(false)
    setConfirming(false)
    const el = originRef.current?.el
    // After `inert` is gone, so the button can take focus again.
    requestAnimationFrame(() => {
      if (el && el.isConnected) el.focus({ preventScroll: true })
    })
  }, [])

  /* ---- opening and closing ---- */
  useLayoutEffect(() => {
    if (!rendered) return
    const sheet = sheetRef.current
    if (!sheet) return
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (open) {
      lock()
      measure()
      if (reducedRef.current) {
        // A cross-fade: the panel is simply there, in place, and fades in with its dimmed page.
        apply(1)
        sheet.style.transition = 'none'
        sheet.style.opacity = '0'
        void sheet.offsetWidth
        sheet.style.transition = 'opacity 160ms ease'
        sheet.style.opacity = '1'
      } else {
        if (driver.value() === 0) apply(0) // the first frame is the button, exactly
        driver.to(1, OPEN_RESPONSE)
      }
      sheet.focus({ preventScroll: true })
    } else if (reducedRef.current) {
      sheet.style.transition = 'opacity 160ms ease'
      sheet.style.opacity = '0'
      const timer = window.setTimeout(finishClose, 170)
      return () => window.clearTimeout(timer)
    } else {
      // Back to the button as it is now (the window may have been resized), via the same path.
      originRef.current = readOrigin(originRef.current?.el ?? null, originRef.current ?? undefined)
      measure()
      driver.to(0, CLOSE_RESPONSE, finishClose)
    }
  }, [open, rendered, apply, measure, driver, lock, finishClose])

  useEffect(() => {
    const spring = driver
    return () => {
      spring.jump(0)
      releaseRef.current?.()
    }
  }, [driver])

  // If the window changes size while the panel is open, re-fit it.
  useEffect(() => {
    if (!rendered) return
    function onResize() {
      measure()
      apply(driver.value())
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [rendered, measure, apply, driver])

  const openBooking = useCallback((trigger: HTMLElement | null, url?: URL) => {
    if (openRef.current) return
    const { doctorOptions: doctors, serviceGroups: groups } = dataRef.current

    // The same rules as the page: an unknown id in the link falls back to "no preference"
    // rather than pre-selecting something that does not exist.
    const doctorParam = url?.searchParams.get('doctor') ?? ''
    const departmentParam = url?.searchParams.get('department') ?? ''
    const doctor = doctors.find((option) => option.value === doctorParam)
    const departmentKnown = groups.some((group) =>
      group.options.some((option) => option.value === departmentParam),
    )

    originRef.current = readOrigin(trigger)
    dirtyRef.current = false
    openRef.current = true
    setConfirming(false)
    setLaunch((current) => ({
      key: current.key + 1,
      doctorId: doctor?.value ?? '',
      departmentSlug: departmentKnown ? departmentParam : (doctor?.departmentSlug ?? ''),
    }))
    setRendered(true)
    setOpen(true)
  }, [])

  const closeNow = useCallback(() => {
    if (!openRef.current) return
    openRef.current = false
    setConfirming(false)
    setOpen(false)
  }, [])

  const requestClose = useCallback(() => {
    if (!openRef.current) return
    if (dirtyRef.current) setConfirming(true)
    else closeNow()
  }, [closeNow])

  const onDirtyChange = useCallback((dirty: boolean) => {
    dirtyRef.current = dirty
  }, [])

  /* ---- every link to /appointments opens the sheet ---- */
  useEffect(() => {
    function bookingLink(event: MouseEvent | PointerEvent | TouchEvent): {
      anchor: HTMLAnchorElement
      url: URL
    } | null {
      const target = event.target as Element | null
      const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!anchor) return null
      if (anchor.target && anchor.target !== '_self') return null
      if (anchor.hasAttribute('download')) return null
      let url: URL
      try {
        url = new URL(anchor.href, window.location.href)
      } catch {
        return null
      }
      if (url.origin !== window.location.origin) return null
      const path = url.pathname.replace(/^\/(hi|pa)(?=\/|$)/, '').replace(/\/+$/, '')
      return path === '/appointments' ? { anchor, url } : null
    }

    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (onPageRef.current) return
      const link = bookingLink(event)
      if (!link) return
      event.preventDefault()
      event.stopPropagation()
      openBooking(link.anchor, link.url)
    }

    // Fetch the form the moment someone reaches for a booking link.
    function warm(event: Event) {
      if (bookingLink(event as MouseEvent)) void loadForm()
    }

    document.addEventListener('click', onClick, true)
    document.addEventListener('pointerover', warm, { passive: true })
    document.addEventListener('touchstart', warm, { passive: true })
    document.addEventListener('focusin', warm)

    // ...and otherwise as soon as the page is idle.
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => number })
      .requestIdleCallback
    const handle = idle ? idle(() => void loadForm()) : window.setTimeout(() => void loadForm(), 2500)

    return () => {
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('pointerover', warm)
      document.removeEventListener('touchstart', warm)
      document.removeEventListener('focusin', warm)
      if (!idle) window.clearTimeout(handle)
    }
  }, [openBooking])

  /* ---- keyboard: Escape, and Tab kept inside whichever layer is on top ---- */
  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        if (confirming) setConfirming(false)
        else requestClose()
        return
      }
      if (event.key !== 'Tab') return
      const root = confirming ? alertRef.current : sheetRef.current
      const items = visibleFocusable(root)
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (event.shiftKey && (active === first || active === root || !root?.contains(active))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (active === last || !root?.contains(active))) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, confirming, requestClose])

  if (!rendered) return null

  return createPortal(
    <div ref={overlayRef} className="fixed inset-0 z-[80]">
      {/* The blurred, dimmed page behind the panel. A tap on it is a request to close. */}
      <div
        ref={scrimRef}
        aria-hidden="true"
        data-booking-scrim=""
        onClick={requestClose}
        className="absolute inset-0 bg-brand-dark-base/35 [@media(prefers-reduced-transparency:reduce)]:bg-brand-dark-base/70"
        style={{ opacity: 0 }}
      />

      {/* The panel's shadow is its own layer: a shadow on the clipped panel would be cut off. */}
      <div
        ref={shadowRef}
        aria-hidden="true"
        className="pointer-events-none absolute shadow-[0_40px_90px_-24px_rgba(11,20,22,0.6),0_12px_28px_-12px_rgba(11,20,22,0.3)]"
        style={{ opacity: 0 }}
      />

      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        tabIndex={-1}
        className="absolute inset-0 flex items-center justify-center p-2 outline-none will-change-[clip-path] sm:p-4 lg:p-6"
        style={{ backgroundColor: `rgba(${SHEET_RGB}, 0)` }}
      >
        <div
          ref={panelRef}
          data-booking-panel=""
          className="h-full max-h-[760px] w-full max-w-[1180px]"
        >
          <div ref={contentRef} className="h-full" style={{ opacity: 0 }}>
            <Suspense
              fallback={
                <SheetSkeleton
                  title={tPage('title')}
                  closeLabel={t('close')}
                  loadingLabel={t('loadingForm')}
                  onClose={requestClose}
                />
              }
            >
              <AppointmentForm
                key={launch.key}
                variant="overlay"
                doctorOptions={doctorOptions}
                serviceGroups={serviceGroups}
                initialDoctorId={launch.doctorId}
                initialDepartmentSlug={launch.departmentSlug}
                fallbackPhone={fallbackPhone}
                fallbackPhoneDisplay={fallbackPhoneDisplay}
                whatsappHref={whatsappHref}
                emergencyPhone={emergencyPhone}
                emergencyPhoneDisplay={emergencyPhoneDisplay}
                onClose={requestClose}
                onDirtyChange={onDirtyChange}
              />
            </Suspense>
          </div>
        </div>
      </div>

      {confirming && (
        <div
          className="absolute inset-0 z-10 grid place-items-center bg-brand-dark-base/35 p-6"
          onClick={() => setConfirming(false)}
        >
          <div
            ref={alertRef}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="booking-discard-title"
            aria-describedby="booking-discard-body"
            onClick={(event) => event.stopPropagation()}
            className="booking-alert w-full max-w-sm rounded-3xl bg-white/90 p-6 text-center shadow-[0_30px_70px_-20px_rgba(11,20,22,0.55)] backdrop-blur-xl [@media(prefers-reduced-transparency:reduce)]:bg-white [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none"
          >
            <h3
              id="booking-discard-title"
              className="font-serif text-xl font-bold leading-tight tracking-tight"
            >
              {t('discardHeading')}
            </h3>
            <p
              id="booking-discard-body"
              className="mt-2 text-sm leading-relaxed text-brand-dark-base/70"
            >
              {t('discardBody')}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                autoFocus
                onClick={() => setConfirming(false)}
                className="tap-target press rounded-full bg-brand-teal px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-teal-dark"
              >
                {t('keepEditing')}
              </button>
              <button
                type="button"
                onClick={() => {
                  dirtyRef.current = false
                  closeNow()
                }}
                className="tap-target press rounded-full bg-brand-emergency/10 px-4 text-sm font-semibold text-brand-emergency transition-colors hover:bg-brand-emergency/15"
              >
                {t('discard')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body,
  )
}

/** What the sheet shows for the instant the form's code is still arriving. */
function SheetSkeleton({
  title,
  closeLabel,
  loadingLabel,
  onClose,
}: {
  title: string
  closeLabel: string
  loadingLabel: string
  onClose: () => void
}) {
  return (
    <div className="flex h-full min-h-0 flex-col" aria-busy="true">
      <header className="shrink-0 border-b border-brand-teal/10 bg-white/80">
        <div className="mx-auto flex w-full max-w-[1180px] items-center gap-5 px-4 py-3 sm:px-8">
          <h2 id="booking-title" className="font-serif text-xl font-bold tracking-tight lg:text-2xl">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="tap-target press ml-auto h-11 w-11 rounded-full bg-brand-mist text-brand-dark-base/65"
          >
            <CloseIcon className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </header>
      <div className="mx-auto grid w-full max-w-[1180px] flex-1 gap-5 px-4 py-6 sm:px-8 lg:grid-cols-2">
        <p className="sr-only" role="status">
          {loadingLabel}
        </p>
        {[0, 1].map((column) => (
          <div key={column} className="space-y-5" aria-hidden="true">
            {[0, 1, 2].slice(0, column === 0 ? 3 : 2).map((card) => (
              <div key={card} className="h-40 animate-pulse rounded-2xl bg-white/80" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
