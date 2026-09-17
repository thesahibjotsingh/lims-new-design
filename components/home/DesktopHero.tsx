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
// Server component. The interactive parts are HeroSearchCard and HeroSlideshow, both
// client leaves — HeroSlideshow owns the <section>, the fixed height, and the
// crossfade between the two slides' text and backgrounds. This component only
// supplies content: two text blocks, one shared actions block (buttons + stats,
// identical on both slides so it's pinned rather than duplicated), and the search
// card.

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
      secondSlideBg={heroBannerSecondary}
      persistent={<HeroSearchCard />}
      copy={
        <>
          <p className="inline-flex items-center gap-2 text-xs font-semibold text-white/90">
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
        </>
      }
      secondSlideText={
        <>
          {/*
            CONTENT NOTE: this quote and "Senior Consultant" credit her with
            Laparoscopic Surgery and Cosmetic Gynaecology. That used to be
            unconfirmed against lib/doctors.ts — it now matches her qualifications
            there (Fellowship in Advance Laparoscopic Pelvic Surgeries, Fellowship
            in Cosmetic Gynaecology), supplied 2026-09-17. Leaving this note in
            place rather than deleting it: it's the record of why the two used to
            disagree, for whoever touches this next.
          */}
          {/*
            Sized up only from xl: the text column narrows below the xl
            breakpoint (1024&ndash;1279px), where this paragraph already sits
            close to the pinned actions row below it. Bumping the base size
            would push it into overlap there; xl: is where the spare room
            actually is.
          */}
          <p className="text-lg font-bold leading-snug xl:text-2xl xl:leading-tight">
            &ldquo;Every woman deserves compassionate, evidence-based care
            through every stage of life. Our department is committed to
            providing personalised care in Obstetrics and Gynaecology,
            advanced Laparoscopic Surgery, and safe, ethical Aesthetic
            &amp; Cosmetic Gynaecology, with dignity, privacy, and patient
            wellbeing at the heart of every decision.&rdquo;
          </p>
          <div>
            <p className="font-serif text-2xl font-bold">
              <Link href="/doctors/shweta-godara" className="transition-colors hover:text-brand-mist">
                Dr. Shweta Godara
              </Link>
            </p>
            <p className="mt-1 text-white/90">
              Senior Consultant &ndash; Obstetrics &amp; Gynaecology
            </p>
          </div>
        </>
      }
      actions={
        <div className="space-y-6">
          {/* Dual action buttons — book, or call. Identical on both slides. */}
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
          <dl className="flex flex-wrap gap-x-8 gap-y-4 border-t border-white/15 pt-6">
            <HeroStat value={servicesByCategory('clinical').length} label="Clinical departments" />
            <HeroStat
              value={servicesByCategory('diagnostics').length}
              label="Diagnostics & imaging"
            />
            <HeroStat value={SERVICES.length} label="Services on one campus" />
          </dl>
        </div>
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
