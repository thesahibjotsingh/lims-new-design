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
// Server component. The interactive parts are HeroSearchCard and HeroSlideshow, both
// client leaves — HeroSlideshow owns the <section>, the two background photos and the
// crossfade between them; this component only supplies the copy column and the search
// card as props, so it never needs rotation state of its own.

import { Link } from '@/i18n/navigation'
import { HeroSearchCard } from '@/components/home/HeroSearchCard'
import { HeroSlideshow } from '@/components/home/HeroSlideshow'
import { ArrowRightIcon, PhoneIcon } from '@/components/icons'
import { heroBanner, heroBannerSecondary } from '@/lib/media'
import { contact, primaryLocation, siteConfig } from '@/lib/site-config'
import { SERVICES, servicesByCategory } from '@/lib/services'

export function DesktopHero() {
  return (
    <HeroSlideshow
      firstBanner={heroBanner}
      persistent={<HeroSearchCard />}
      secondSlide={
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroBannerSecondary.src}
            alt={heroBannerSecondary.alt}
            width={heroBannerSecondary.width}
            height={heroBannerSecondary.height}
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/*
            Live text over a plain photo, not a second baked-pixel export — the
            Canva quote card this replaced blurred at display size, and its copy was
            unreadable to a screen reader except through alt text. This wraps at the
            container's own width instead of a fixed image crop, so it stays crisp at
            any size and any zoom.

            CONTENT NOTE: this quote and "Senior Consultant" credit her with
            Laparoscopic Surgery and Aesthetic & Cosmetic Gynaecology. Neither is on
            her record in lib/doctors.ts (MS, Obstetrics & Gynaecology; no designation
            on file) — reproduced here because that's what was asked for, but get it
            confirmed with her or the hospital. It's a real credential claim about a
            named, registered doctor now, not a graphic in a design tool.
          */}
          <div className="relative mx-auto flex h-full max-w-7xl items-start px-6 py-12 xl:py-14">
            <div className="max-w-2xl space-y-5">
              <p className="font-serif text-4xl leading-none text-brand-copper" aria-hidden="true">
                &ldquo;
              </p>
              <p className="-mt-6 text-lg font-bold leading-snug">
                Every woman deserves compassionate, evidence-based care through every
                stage of life. Our department is committed to providing personalised
                care in Obstetrics and Gynaecology, advanced Laparoscopic Surgery, and
                safe, ethical Aesthetic &amp; Cosmetic Gynaecology &mdash; with dignity,
                privacy, and patient wellbeing at the heart of every decision.
              </p>
              <div>
                <p className="font-serif text-2xl font-bold">Dr. Shweta Godara</p>
                <p className="mt-1 text-white/90">
                  Senior Consultant &ndash; Obstetrics &amp; Gynaecology
                </p>
              </div>

              {/* Same CTAs as slide 1's copy, so booking or calling isn't only available half the time. */}
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

              <dl className="flex flex-wrap gap-x-8 gap-y-4 border-t border-white/15 pt-6">
                <HeroStat value={servicesByCategory('clinical').length} label="Clinical departments" />
                <HeroStat
                  value={servicesByCategory('diagnostics').length}
                  label="Diagnostics & imaging"
                />
                <HeroStat value={SERVICES.length} label="Services on one campus" />
              </dl>
            </div>
          </div>
        </>
      }
      copy={
        <>
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
          {/*
            Wraps rather than overflowing. The column is narrower than it was, and three
            stats on one line is a layout that works until a label gets longer or the
            catalogue count goes from one digit to two.
          */}
          <dl className="flex flex-wrap gap-x-8 gap-y-4 border-t border-white/15 pt-6">
            <HeroStat value={servicesByCategory('clinical').length} label="Clinical departments" />
            <HeroStat
              value={servicesByCategory('diagnostics').length}
              label="Diagnostics & imaging"
            />
            <HeroStat value={SERVICES.length} label="Services on one campus" />
          </dl>
        </>
      }
    />
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
