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

import Image from 'next/image'
import Link from 'next/link'
import { HeroSearchCard } from '@/components/home/HeroSearchCard'
import { ArrowRightIcon, PhoneIcon } from '@/components/icons'
import { heroImage } from '@/lib/media'
import { contact, primaryLocation, siteConfig } from '@/lib/site-config'
import { SERVICES, servicesByCategory } from '@/lib/services'

export function DesktopHero() {
  return (
    <section className="relative hidden bg-gradient-to-b from-brand-teal via-brand-teal to-brand-teal-dark text-white lg:block">
      {/*
        Decorative light. Both stops end at `transparent`, so the glow dies out inside
        the section and needs no clipping — see the note at the top of this file.
        brand-cyan is #168B99 and brand-copper is #D68060; they are written as rgba here
        because a gradient stop needs an alpha channel, which a Tailwind colour token
        cannot supply inside a background-image.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            'radial-gradient(58rem 34rem at 96% -6%, rgba(22, 139, 153, 0.38), rgba(22, 139, 153, 0) 68%)',
            'radial-gradient(42rem 30rem at 6% 104%, rgba(214, 128, 96, 0.16), rgba(214, 128, 96, 0) 70%)',
          ].join(', '),
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-12 items-center gap-12 px-6 py-20">
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

        {/* Photography column */}
        <div className="col-span-5">
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 0px, 40vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-brand-dark-base/55 via-transparent to-transparent"
              />
            </div>

            {/* The card straddles the seam. Nothing clips it. */}
            <div className="absolute -left-24 bottom-8 z-20">
              <HeroSearchCard />
            </div>
          </div>
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
