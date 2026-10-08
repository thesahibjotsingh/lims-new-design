'use client'

// components/doctor/PortraitLightbox.tsx
//
// The doctor's portrait on her profile, as a button: tap it and the photo grows out of the
// portrait into a larger one over a dimmed page, and shrinks back into it on close. The same idea
// as the booking panel growing out of its button and the language menu out of its own: the larger
// thing is the small thing opening up, not a separate sheet arriving from nowhere.
//
// HOW IT MOVES. The photo is laid out at its final size and position, then animated from the
// portrait's rectangle (a translate and a uniform scale, since both are 4:5) to nothing, with its
// corner radius easing from the portrait's to the larger one's. The portrait itself is hidden
// while the photo is up, so it reads as one object moving. All of it is Web Animations, played
// backwards (a little faster) on close, so a tap mid-way turns round from wherever it has got to.
// Reduced motion swaps it for a 150ms fade.
//
// CLOSING. A tap anywhere, the close button, or Escape. Focus goes to the close button on open and
// back to the portrait on close; the page behind cannot scroll while the photo is up.
//
// The portrait is only a button when there is a real photograph. DoctorHero keeps the initials
// tile, which is not a photo to enlarge, for a doctor with none.

/* eslint-disable @next/next/no-img-element */
// Plain <img>, as everywhere on the site: the portraits are already display-sized WebP, and
// next/image needs a loader on this host (see components/layout/BrandMark.tsx).

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslations } from 'next-intl'
import { CloseIcon, ExpandIcon } from '@/components/icons'

const EASE_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)' // --ease-in-out
const OPEN_MS = 360
const CLOSE_SPEEDUP = 1.35
const PHOTO_RADIUS = 22
/** The photo's height is this times its width: the portraits are cropped 4:5. */
const ASPECT = 1.25

export function PortraitLightbox({
  src,
  alt,
  width,
  height,
  focusY = 50,
  name,
  department,
}: {
  src: string
  alt: string
  width: number
  height: number
  /** `object-position` y of the crop, as on the card (lib/doctors.ts portrait.focusY). */
  focusY?: number
  name: string
  department: string
}) {
  const t = useTranslations('doctorProfile')
  // `open` is intent; `rendered` keeps the overlay mounted while the close animation plays.
  const [open, setOpen] = useState(false)
  const [rendered, setRendered] = useState(false)
  const [photoWidth, setPhotoWidth] = useState(280)

  const triggerRef = useRef<HTMLButtonElement>(null)
  const thumbRef = useRef<HTMLImageElement>(null)
  const scrimRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const originRef = useRef<DOMRect | null>(null)
  const animationsRef = useRef<Animation[]>([])

  function openPhoto() {
    originRef.current = thumbRef.current?.getBoundingClientRect() ?? null
    // As large as the screen allows, leaving room for the caption, and never past 440px.
    const fit = Math.min(window.innerWidth - 32, 440, (window.innerHeight - 150) / ASPECT)
    setPhotoWidth(Math.max(160, fit))
    setOpen(true)
    setRendered(true)
  }

  const closePhoto = useCallback(() => setOpen(false), [])

  // Opening: the overlay is laid out, so measure the photo and start the animations. A layout
  // effect, so the first frame is already the portrait and the full-size photo never flashes.
  useLayoutEffect(() => {
    if (!open || !rendered) return
    const scrim = scrimRef.current
    const photo = photoRef.current
    const caption = captionRef.current
    if (!scrim || !photo || !caption) return

    animationsRef.current.forEach((animation) => animation.cancel())
    const animations: Animation[] = []
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const origin = originRef.current

    // Every animation runs to the same total length, so reversed they all end together.
    animations.push(
      scrim.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: reduceMotion ? 150 : OPEN_MS - 60,
        endDelay: reduceMotion ? 0 : 60,
        easing: 'ease-in-out',
        fill: 'both',
      }),
    )

    if (reduceMotion || !origin) {
      animations.push(
        photo.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 150, easing: 'ease', fill: 'both' }),
      )
    } else {
      const box = photo.getBoundingClientRect()
      const scale = origin.width / box.width
      const dx = origin.left + origin.width / 2 - (box.left + box.width / 2)
      const dy = origin.top + origin.height / 2 - (box.top + box.height / 2)
      const thumbRadius = thumbRef.current?.parentElement
        ? parseFloat(getComputedStyle(thumbRef.current.parentElement).borderTopLeftRadius) || 16
        : 16
      animations.push(
        photo.animate(
          [
            { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, borderRadius: `${thumbRadius / scale}px` },
            { transform: 'translate(0px, 0px) scale(1)', borderRadius: `${PHOTO_RADIUS}px` },
          ],
          { duration: OPEN_MS, easing: EASE_IN_OUT, fill: 'both' },
        ),
      )
    }

    animations.push(
      caption.animate([{ opacity: 0 }, { opacity: 1 }], {
        delay: reduceMotion ? 0 : 200,
        duration: reduceMotion ? 150 : 160,
        easing: 'ease-in-out',
        fill: 'both',
      }),
    )

    animationsRef.current = animations
    // The portrait is hidden while the photo is up, so it reads as one object that moved.
    if (thumbRef.current) thumbRef.current.style.visibility = 'hidden'
    closeRef.current?.focus({ preventScroll: true })
  }, [open, rendered])

  // Closing: play every animation backwards, a little faster, then put the portrait back.
  useEffect(() => {
    if (open || !rendered) return
    const animations = animationsRef.current
    const finish = () => {
      setRendered(false)
      if (thumbRef.current) thumbRef.current.style.visibility = ''
      triggerRef.current?.focus({ preventScroll: true })
    }
    if (animations.length === 0) {
      finish()
      return
    }
    let remaining = animations.length
    animations.forEach((animation) => {
      animation.onfinish = () => {
        remaining -= 1
        if (remaining === 0) finish()
      }
      animation.updatePlaybackRate(-CLOSE_SPEEDUP)
      animation.play()
    })
    // Never leave a dark overlay mounted if a finish event is somehow missed.
    const backstop = setTimeout(finish, OPEN_MS + 200)
    return () => clearTimeout(backstop)
  }, [open, rendered])

  useEffect(() => {
    return () => animationsRef.current.forEach((animation) => animation.cancel())
  }, [])

  // The page behind must not scroll while the photo is up. Taking the scrollbar away would
  // widen the page, so the same width is added as padding.
  useEffect(() => {
    if (!rendered) return
    const body = document.body
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`
    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
    }
  }, [rendered])

  // The photo is placed for this window size; if the window changes, close it.
  useEffect(() => {
    if (!open) return
    const close = () => closePhoto()
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [open, closePhoto])

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      closePhoto()
    } else if (event.key === 'Tab') {
      // The close button is the only control, so focus stays on it.
      event.preventDefault()
      closeRef.current?.focus()
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openPhoto}
        aria-haspopup="dialog"
        aria-label={t('portraitOpen', { name })}
        className="focus-ring-inverse group relative block h-full w-full cursor-zoom-in"
      >
        <img
          ref={thumbRef}
          src={src}
          alt=""
          width={width}
          height={height}
          decoding="async"
          fetchPriority="high"
          style={{ objectPosition: `50% ${focusY}%` }}
          className="h-full w-full object-cover"
        />
        {/*
          A quiet hint that this can be tapped: a small dark glass dot in the corner, not a bright
          badge. The cursor on desktop (zoom-in) and the button's label say the rest.
        */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1 right-1 grid h-5 w-5 place-items-center rounded-full bg-brand-dark-base/40 text-white/85 backdrop-blur-sm transition-colors group-hover:bg-brand-dark-base/60 group-hover:text-white"
        >
          <ExpandIcon className="h-3 w-3" strokeWidth={2.25} />
        </span>
      </button>

      {rendered &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={name}
            onKeyDown={onKeyDown}
            onClick={closePhoto}
            className="fixed inset-0 z-[90] flex cursor-zoom-out flex-col items-center justify-center gap-4 p-4"
          >
            <div
              ref={scrimRef}
              aria-hidden="true"
              className="absolute inset-0 bg-brand-dark-base/85 backdrop-blur-sm [@media(prefers-reduced-transparency:reduce)]:bg-brand-dark-base/95 [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none"
            />
            <button
              ref={closeRef}
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                closePhoto()
              }}
              aria-label={t('portraitClose')}
              className="tap-target press focus-ring-inverse absolute right-3 top-3 z-10 h-11 w-11 rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
            >
              <CloseIcon className="h-5 w-5" strokeWidth={2} />
            </button>
            <div
              ref={photoRef}
              style={{ width: photoWidth, height: photoWidth * ASPECT, borderRadius: PHOTO_RADIUS }}
              className="relative z-10 shrink-0 overflow-hidden bg-white/10 will-change-transform"
            >
              <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                style={{ objectPosition: `50% ${focusY}%` }}
                className="h-full w-full object-cover"
              />
            </div>
            <div ref={captionRef} className="relative z-10 text-center text-white">
              <p className="font-serif text-lg font-bold leading-tight">{name}</p>
              <p className="mt-1 text-xs text-white/70">
                {department} · {t('portraitHint')}
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
