// components/primitives/PageShell.tsx
//
// The header band and content wrapper every inner page uses. One component so the
// twenty-six service pages, the directory and the standing pages cannot drift apart in
// spacing, measure or heading level.

import Link from 'next/link'
import type { ReactNode } from 'react'

export function PageHeader({
  eyebrow,
  title,
  intro,
  icon,
  banner,
  children,
}: {
  eyebrow?: string
  title: string
  intro?: string
  /** Service artwork, shown beside the heading. Decorative — the title carries the name. */
  icon?: ReactNode
  /**
   * Path to a banner from public/banners/, e.g. "/banners/about.webp".
   *
   * Decorative, so it carries alt="" — the heading already says what the page is, and a
   * description of a stock hospital corridor read out before every page title is noise.
   * The art is 3:1 with its subject on the right and clear space on the left, and the
   * mist gradient below guarantees the heading stays legible even if a later banner
   * arrives without that clear space.
   */
  banner?: string
  children?: ReactNode
}) {
  return (
    <header className="relative isolate overflow-hidden border-b border-brand-teal/10 bg-brand-mist">
      {banner && (
        <>
          {/*
            HEIGHT-FIRST, NOT COVER. The art is 3:1 and this band renders at roughly 5:1
            on a wide screen, so stretching the image across the full width and cropping
            to fit throws away about 40% of its height — off the top it decapitates the
            subject, off the bottom it cuts them at the waist. There is no anchor that
            makes a 3:1 picture fill a 5:1 hole.

            So the image is sized to the band's HEIGHT (`h-full w-auto`) and pinned to
            the right. Nothing is cropped vertically. The strip of band left over on the
            left is brand-mist, which is what the empty left half of every one of these
            banners already is — the art was drawn with clear space there for the
            heading, so the seam falls inside a flat pale area and the gradient below
            finishes the blend.

            Nothing forces a minimum width. A `min-w` makes the picture stretch wider
            than its own ratio and the crop comes straight back — 55% cost 13% off the
            bottom at 1900px. The band's min-height grows at 2xl instead, which scales
            the picture up on a wide screen without ever cropping it.
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={banner}
            alt=""
            aria-hidden="true"
            width={1800}
            height={600}
            className="absolute inset-y-0 right-0 -z-10 h-full w-auto max-w-none object-cover object-[right_top]"
          />
          {/*
            Opaque mist on the left fading out to the right. This is what makes the
            heading readable rather than the art happening to be pale there — on a phone
            the crop lands much closer to the subject and the text would otherwise sit
            over a photograph.
          */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-mist via-brand-mist/90 to-brand-mist/20 sm:via-brand-mist/75 sm:to-transparent"
          />
        </>
      )}
      <div
        className={[
          'mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:py-14',
          banner ? 'flex min-h-[220px] flex-col justify-center lg:min-h-[300px] 2xl:min-h-[360px]' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="flex items-start gap-5">
          {icon && (
            <span className="mt-1 hidden shrink-0 rounded-2xl bg-white p-3 shadow-sm sm:block">
              {icon}
            </span>
          )}
          <div className="min-w-0">
            {eyebrow && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-copper">
                {eyebrow}
              </p>
            )}
            <h1 className="font-serif text-3xl font-bold tracking-tight text-brand-dark-base sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            {intro && (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-dark-base/70">
                {intro}
              </p>
            )}
          </div>
        </div>
        {children}
      </div>
    </header>
  )
}

export function Section({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:py-14 ${className}`}>
      {children}
    </section>
  )
}

/**
 * The panel shown where LIMS has not yet supplied content.
 *
 * This exists so a thin page reads as "we have not published this yet, here is who to
 * ask" instead of as filler. The alternative — plausible-sounding placeholder copy
 * about conditions treated and procedures offered — would be clinical claims the
 * hospital never made, which is the one thing a hospital site must not do.
 */
export function AwaitingContent({
  what,
  children,
}: {
  what: string
  children?: ReactNode
}) {
  return (
    <div className="rounded-2xl border border-dashed border-brand-teal/25 bg-brand-mist/60 p-6">
      <h2 className="font-serif text-lg font-bold text-brand-dark-base">{what}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-dark-base/70">
        {children ?? (
          <>
            This section is published from information supplied by LIMS and is not yet
            available. For anything urgent, please call the hospital directly.
          </>
        )}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href="/contact"
          className="tap-target rounded-full border border-brand-teal/25 px-5 text-xs font-semibold text-brand-teal hover:bg-white"
        >
          Contact LIMS
        </Link>
        <Link
          href="/appointments"
          className="tap-target focus-ring-inverse rounded-full bg-brand-teal px-5 text-xs font-semibold text-white hover:bg-brand-teal-dark"
        >
          Request an appointment
        </Link>
      </div>
    </div>
  )
}
