// components/primitives/PageShell.tsx
//
// The header band and content wrapper every inner page uses. One component so the
// twenty-six service pages, the directory and the standing pages cannot drift apart in
// spacing, measure or heading level.

import Link from 'next/link'
import { HeroIntro } from '@/components/primitives/HeroIntro'
import type { ReactNode } from 'react'

export function PageHeader({
  eyebrow,
  title,
  intro,
  icon,
  banner,
  cinematic = false,
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
   * description of a hospital corridor read out before every page title is noise.
   *
   * PASSING ONE FLIPS THE WHOLE BAND DARK. The art is deep teal on its left side, so a
   * banner page sets the header to brand-teal with white type; without a banner the
   * band stays pale mist with dark type. That is why this is one prop and not two —
   * a banner on a mist background would show a hard teal edge where the art begins.
   */
  banner?: string
  /**
   * Shrinks the banner to a slim strip holding the eyebrow and title so the content
   * slides up — after a pause, or as soon as the reader scrolls down — and keeps it
   * shrunk for the rest of the visit. Desktop only; see HeroIntro.
   *
   * Requires `banner`: without art there is nothing to shrink.
   */
  cinematic?: boolean
  children?: ReactNode
}) {
  const cinematicBanner = Boolean(banner && cinematic)
  return (
    <header
      className={[
        // `isolate` is load-bearing, not decoration. It makes this header a stacking
        // context, which is the only reason the banner's `-z-10` wrapper paints ABOVE
        // the header's own background instead of behind it. Drop it and the art still
        // loads, still lays out, and measures correctly in every geometric test — and
        // is completely invisible, because an opaque background is painted over it.
        //
        // `group/banner` is what HeroIntro's `data-collapsed` hooks into.
        'group/banner relative isolate',
        banner
          ? // No bottom border: the band is teal and the section under it is white, so
            // the colour change is the edge. A rule there only reads as a seam.
            'bg-brand-teal text-white'
          : 'border-b border-brand-teal/10 bg-brand-mist',
      ].join(' ')}
    >
      {/*
        The banner gets its OWN clipping wrapper and the header does not clip.

        The image is wider than the band and hangs off the left edge, so something has
        to clip it — but `overflow-hidden` on the header itself also clips anything a
        page puts INSIDE the header, and the consultant directory puts a search box
        there whose suggestion list drops below the band. That list was being cut off at
        the header's edge, which read as a broken dropdown. Same trap, and the same fix,
        as the decorative blur field in DesktopHero.
      */}
      {banner && (
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          {/*
            HEIGHT-FIRST, NOT COVER. The art is 3:1 and this band renders at roughly 5:1
            on a wide screen, so stretching the image across the full width and cropping
            to fit throws away about 40% of its height — off the top it decapitates the
            subject, off the bottom it cuts them at the waist. There is no anchor that
            makes a 3:1 picture fill a 5:1 hole.

            When the banner collapses, the height is pinned to what it was at full size
            (`--banner-h`, set by HeroIntro) and the picture stays centred, so the slim
            strip crops a window through the art rather than shrinking it.

            So the image is sized to the band's HEIGHT (`h-full w-auto`) and pinned to
            the right. Nothing is cropped vertically. The strip of band left over on the
            left is brand-teal, which is what the empty left side of every one of these
            banners already is — the art is drawn with a flat teal panel there for the
            heading. Sampled across all eight it sits at about #015C6C against the
            token's #0F5B66, so the join is invisible and the gradient finishes it.

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
            className="absolute right-0 top-1/2 h-full w-auto max-w-none -translate-y-1/2 object-cover object-[right_top] group-data-[collapsed]/banner:h-[var(--banner-h)]"
          />
          {/*
            Opaque teal on the left fading out to the right. This is what makes the
            heading readable rather than the art happening to be flat there — on a phone
            the crop lands much closer to the subject and white text would otherwise sit
            over a brightly lit photograph.
          */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-brand-teal via-brand-teal/90 to-brand-teal/20 sm:via-brand-teal/75 sm:to-transparent"
          />
        </div>
      )}
      <div
        className={[
          'mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:py-14',
          banner ? 'flex min-h-[220px] flex-col justify-center lg:min-h-[300px] 2xl:min-h-[360px]' : '',
          // The collapsed strip. Transitions are declared only in the collapsed state so
          // the band animates shut but snaps open when HeroIntro resets it.
          cinematicBanner
            ? 'group-data-[collapsed]/banner:min-h-[7rem] group-data-[collapsed]/banner:py-5 group-data-[collapsed]/banner:transition-[min-height,padding] group-data-[collapsed]/banner:duration-700 group-data-[collapsed]/banner:ease-[cubic-bezier(0.22,1,0.36,1)]'
            : '',
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
              /*
                White at 75% on a banner rather than the copper used on mist. Copper on
                brand teal measures about 3.3:1, under the 4.5:1 this text needs at this
                size, and an eyebrow that says which section you are in is not decoration
                to be left half-legible.
              */
              <p
                className={[
                  'mb-2 text-xs font-semibold uppercase tracking-[0.14em]',
                  banner ? 'text-white/75' : 'text-brand-copper-ink',
                ].join(' ')}
              >
                {eyebrow}
              </p>
            )}
            <h1
              className={[
                'text-balance font-serif text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl',
                banner ? 'text-white' : 'text-brand-dark-base',
              ].join(' ')}
            >
              {title}
            </h1>
            {intro && (
              // Rows 1fr → 0fr is what lets the intro fold away smoothly on collapse; a
              // height transition cannot animate to or from `auto`.
              <div className="grid grid-rows-[1fr] group-data-[collapsed]/banner:grid-rows-[0fr] group-data-[collapsed]/banner:opacity-0 group-data-[collapsed]/banner:transition-[grid-template-rows,opacity] group-data-[collapsed]/banner:duration-700 group-data-[collapsed]/banner:ease-[cubic-bezier(0.22,1,0.36,1)]">
                <div className="min-h-0 overflow-hidden">
                  <p
                    className={[
                      'mt-4 max-w-2xl text-base leading-relaxed',
                      banner ? 'text-white/80' : 'text-brand-dark-base/70',
                    ].join(' ')}
                  >
                    {intro}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        {children}

        {cinematicBanner && <HeroIntro />}
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
  icon,
}: {
  what: string
  children?: ReactNode
  /**
   * Optional — every existing call site renders exactly as before without it. Apple's
   * own empty states (Mail's "No Messages", Photos' "No Photos") anchor the same shape
   * of message with a large glyph rather than text alone; this is that anchor, for the
   * pages where a specific one actually fits the content that's missing.
   */
  icon?: ReactNode
}) {
  return (
    <div className="scroll-reveal rounded-2xl border border-dashed border-brand-teal/25 bg-brand-mist/60 p-6">
      {icon && (
        <span
          aria-hidden="true"
          className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-white text-brand-teal shadow-sm"
        >
          {icon}
        </span>
      )}
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
