// components/layout/BrandMark.tsx
//
// The LIMS lockup. One component so the mark, the name and the tagline can never
// disagree between the desktop header, the mobile header and the footer.
//
// TWO MARKS, BY BACKGROUND — this is not a style preference.
//
// The logo's wordmark and the institute line are dark navy. On the white desktop
// branding tier that reads perfectly, so `tone="light"` uses the full colour mark. On
// the teal mobile header and the near-black footer that same artwork loses its
// letterforms into the background, so `tone="dark"` uses the round badge — which
// carries its own light disc — beside white text set in the page's own typeface.
//
// Plain <img> rather than next/image: these are already display-sized WebP, so there
// is nothing for an optimiser to improve, and it keeps the header working on hosts
// where the Next image endpoint needs a loader (Cloudflare Pages among them).

/* eslint-disable @next/next/no-img-element */

import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

export function BrandMark({
  size = 'default',
  tone = 'light',
}: {
  size?: 'default' | 'compact'
  /**
   * `light` = the logo on a white ground.
   * `dark`  = badge + white text on teal/black.
   * `badge` = the round badge on its own, no words. For the 65px mobile header, where
   *           the artwork is the identity and the name is already in the drawer, the
   *           footer and every page title. The link's aria-label still speaks the full
   *           hospital name, so a screen reader loses nothing.
   */
  tone?: 'light' | 'dark' | 'badge'
}) {
  const compact = size === 'compact'
  const badgeOnly = tone === 'badge'
  // Both sit on teal or near-black, so both take the badge artwork — the colour wordmark
  // loses its letterforms there. See the note at the top of this file.
  const onDark = tone === 'dark' || badgeOnly

  return (
    <Link
      href="/"
      // The aria-label names the link, so every child below is decorative — that is why
      // the marks carry alt="" and the visible wordmark is not announced twice.
      className={`group flex items-center rounded-lg ${badgeOnly ? '' : 'pr-2'} ${onDark ? 'gap-2.5' : 'gap-4'}`}
      aria-label={`${siteConfig.name}, ${siteConfig.city} — home`}
    >
      {onDark ? (
        <>
          {/*
            Width is set, height is auto. The badge is trimmed to its own content box so
            it is not square (roughly 0.89:1) — forcing equal width and height here would
            squash the mark.
          */}
          <img
            src="/brand/lims-badge.webp"
            alt=""
            aria-hidden="true"
            width={badgeOnly ? 46 : compact ? 38 : 44}
            height={badgeOnly ? 52 : compact ? 43 : 50}
            className={`block h-auto shrink-0 transition-transform group-hover:scale-105 ${
              badgeOnly ? 'w-[46px]' : compact ? 'w-[38px]' : 'w-[44px]'
            }`}
          />
          {!badgeOnly && (
          <span className="flex flex-col leading-none">
            <span
              className={[
                'font-serif font-bold tracking-tight text-white',
                compact ? 'text-lg' : 'text-2xl',
              ].join(' ')}
            >
              {siteConfig.shortName} {siteConfig.city}
            </span>
            {/*
              Hidden under 480px. The lockup, the emergency button and the menu all have
              to fit inside a 65px bar, and below that width the tagline wraps to two
              lines and pushes the whole row out of shape. It is decorative here — the
              desktop header and the footer both carry it in full.
            */}
            <span className="mt-1 hidden whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.14em] text-white/70 min-[480px]:block">
              {siteConfig.tagline.join(' · ')}
            </span>
          </span>
          )}
        </>
      ) : (
        <>
          <img
            src="/brand/lims-mark.webp"
            alt=""
            aria-hidden="true"
            width={compact ? 112 : 150}
            height={compact ? 55 : 74}
            // `block` matters: as an inline image it sits on the text baseline and adds
            // a few pixels of descender space under the bar, which is part of what made
            // the white tier taller than the mockup's.
            className="block h-auto w-[112px] shrink-0 transition-transform group-hover:scale-[1.03] lg:w-[150px]"
          />
          {/*
            Institute name and tagline sit BESIDE the mark, not under it. Stacking them
            pushed the white bar to ~130px and left a visible gap above the navigation;
            set side by side the bar collapses to the height of the mark itself.

            Live text rather than the baked-in lockup artwork: it stays crisp at any
            zoom, is selectable, and is read properly by a screen reader.
          */}
          <span className="hidden flex-col leading-tight xl:flex">
            <span className="text-[13px] font-bold uppercase tracking-[0.06em] text-brand-dark-base">
              {siteConfig.name}, {siteConfig.city}
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-copper">
              {siteConfig.tagline.join(' · ')}
            </span>
          </span>
        </>
      )}
    </Link>
  )
}
