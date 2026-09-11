// components/home/DesktopHero.tsx
//
// The asymmetric hero: a 7/5 split, copy left, photography right, with the glass search
// card straddling the seam between them.
//
// The glow is painted as radial gradients, NOT as blurred circles behind an
// `overflow-hidden` wrapper. A blurred circle parked at the section's top-right corner
// has to be clipped there or it paints a halo down the page — and clipping a soft glow
// cuts it off along a dead-straight line, which is visible against flat teal as a seam
// running along the top edge. A radial gradient fades to transparent on its own, so
// there is nothing to clip and no seam. Do not reintroduce blur-3xl circles here.
//
// The section still must not clip: the search card deliberately hangs past the seam
// between the two columns, and `overflow-hidden` on the section would cut it in half.
//
// Server component. The one interactive part is HeroSearchCard, a client leaf.

import Link from 'next/link'
import { HeroSearchCard } from '@/components/home/HeroSearchCard'
import { ArrowRightIcon, PhoneIcon } from '@/components/icons'
import { heroBanner } from '@/lib/media'
import { contact, primaryLocation, siteConfig } from '@/lib/site-config'
import { SERVICES, servicesByCategory } from '@/lib/services'

export function DesktopHero() {
  return (
    <section className="relative isolate hidden overflow-hidden bg-brand-teal text-white lg:block">
      {/*
        The banner covers the whole section, not a card inside it.

        `bg-brand-teal` underneath is not redundant: the art is 2.33:1 and a tall
        viewport crops its sides, so the base colour is what the edges fall back to
        while the image decodes and wherever the cover crop cannot reach.

        Plain <img> rather than next/image, per next.config.mjs — image optimisation is
        off because Cloudflare Workers cannot run sharp, so next/image would add a
        wrapper and buy nothing over a WebP that build_assets.py already sized.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={heroBanner.src}
        alt={heroBanner.alt}
        width={heroBanner.width}
        height={heroBanner.height}
        // The LCP element on the home page: eager and high priority, never lazy.
        fetchPriority="high"
        decoding="async"
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[75%_center]"
      />

      {/*
        A scrim anchored to the left, where the copy sits.

        Measured on this art, white already reaches 8.2:1 over the left third and
        4.89:1 mid-frame, so it passes unaided. The scrim is insurance against the next
        banner: art gets swapped without anyone re-checking contrast, and a headline
        that silently drops to 3:1 on a hospital home page is not a failure anyone
        notices until it matters.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-teal-dark/80 via-brand-teal-dark/35 to-transparent"
      />
      {/*
        py-12, down from py-20. Eighty pixels of padding above the location pill read as
        a gap between the navigation and the hero rather than as breathing room, because
        the band behind it is one flat colour — there is nothing in that space for the
        padding to separate. The copy column sets the section's height on its own.
      */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-12 items-center gap-12 px-6 py-12 xl:py-14">
        {/* Copy column */}
        <div className="col-span-7 space-y-7">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-white/90">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-400" />
            {primaryLocation.addressLines.join(', ')}, {primaryLocation.city},{' '}
            {primaryLocation.state}
          </p>

          <h1 className="font-serif text-5xl font-bold leading-[1.1] tracking-tight xl:text-6xl">
            World class care,
            <br />
            close to home.
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-white/80">
            {siteConfig.description}
          </p>

          {/* Dual action buttons — book, or call. */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/appointments"
              className="tap-target gap-2 rounded-full bg-white px-8 text-sm font-semibold text-brand-teal shadow-lg transition-colors hover:bg-brand-mist"
            >
              Book an appointment
              <ArrowRightIcon className="h-4 w-4" strokeWidth={2.25} />
            </Link>
            <a
              href={`tel:${contact.primary}`}
              className="tap-target gap-2 rounded-full border border-white/40 px-8 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <PhoneIcon className="h-4 w-4" />
              Emergency: {contact.primaryDisplay}
            </a>
          </div>

          {/*
            Counts, not claims. Every number here is `SERVICES.length` and friends —
            it cannot drift from the catalogue, and it says nothing about outcomes,
            satisfaction or volumes that LIMS has not published.
          */}
          <dl className="flex gap-8 border-t border-white/15 pt-6">
            <HeroStat value={servicesByCategory('clinical').length} label="Clinical departments" />
            <HeroStat
              value={servicesByCategory('diagnostics').length}
              label="Diagnostics & imaging"
            />
            <HeroStat value={SERVICES.length} label="Services on one campus" />
          </dl>
        </div>

        {/*
          The search card, where the photo card used to be.

          Bottom-aligned rather than centred: the banner's subject stands in the upper
          right of the frame, and a card centred in this column would sit across her
          face. Dropping it to the foot of the column leaves the portrait clear and puts
          the control on the same baseline as the statistics opposite it.
        */}
        {/*
          Left-aligned in its column and pulled in further at xl, which lands the card
          near the middle of the hero rather than against the right gutter. Two reasons:
          it closes the empty channel that opened between the copy and the card, and it
          keeps the panel off the portrait's face as the viewport widens and the crop
          brings her further left.
        */}
        <div className="col-span-5 flex justify-start self-end xl:-ml-12">
          <HeroSearchCard />
        </div>
      </div>
    </section>
  )
}

function HeroStat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="block font-serif text-3xl font-bold text-white">{value}</span>
        <span className="text-xs font-medium text-white/65">{label}</span>
      </dd>
    </div>
  )
}
