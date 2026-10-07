// components/home/MobileHero.tsx
//
// Full-bleed 16:9 photograph, the search bar floating over its lower edge, then three
// quick-action tiles.
//
// 16:9 is the ratio that leaves the search bar, the tiles AND the first row of the
// service grid above the fold on a 667pt viewport. A 4:3 hero pushes the tiles under
// the fold and the tiles are the whole point of this block.
//
// The photo itself now rotates between two slides — the arrival banner and
// Dr. Shweta Godara's portrait and quote — mirroring DesktopHero's second slide so
// the doctor's banner isn't a desktop-only thing. See MobileHeroSlideshow.tsx for the
// crossfade mechanics. The quote is trimmed to one sentence here: DesktopHero's full
// paragraph doesn't fit the mobile overlay's height without crowding the photo out.
//
// Server component. The client leaves are MobileHeroSlideshow (crossfade + rotation)
// and TypewriterSearchBar — the tiles are plain links, so they cost no JavaScript.

import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { MobileHeroSlideshow } from '@/components/home/MobileHeroSlideshow'
import { TypewriterSearchBar } from '@/components/home/TypewriterSearchBar'
import { heroBannerSecondary, heroImageMobile } from '@/lib/media'
import { getDoctor } from '@/lib/doctors'
import { mobileQuickActions } from '@/lib/site-config'
import { siteText } from '@/lib/site-i18n'

export async function MobileHero() {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations('home')
  const tNav = await getTranslations('nav')
  const tA11y = await getTranslations('a11y')
  const text = siteText(locale)
  const doctorName = getDoctor('shweta-godara', locale)?.name ?? 'Dr. Shweta Godara'
  // The tiles' labels are keyed by where they go, so they follow the language without the
  // English list in lib/site-config.ts having to know about it.
  const quickLabels: Record<string, string> = {
    '/appointments': t('bookAppointment'),
    '/doctors': t('findADoctor'),
    '/contact#locations': tNav('locationsDirections'),
  }
  return (
    <section className="lg:hidden">
      <div className="relative">
        <MobileHeroSlideshow
          firstBanner={{ ...heroImageMobile, alt: t('heroAlt') }}
          secondBanner={{ ...heroBannerSecondary, alt: tA11y('portraitOf', { name: doctorName }) }}
          firstText={
            <>
              <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight text-white">
                {t('heroTitleLine1')}
                <br />
                {t('heroTitleLine2')}
              </h1>
              <p className="mt-1.5 text-xs font-medium text-white/75">
                {text.shortAddress}
              </p>
            </>
          }
          secondText={
            <>
              {/*
                CONTENT NOTE: same quote as DesktopHero.tsx's secondSlideText, word
                for word — see the CONTENT NOTE there for how this used to be
                unconfirmed against lib/doctors.ts and now matches her qualifications
                (Fellowship in Advance Laparoscopic Pelvic Surgeries, Fellowship in
                Cosmetic Gynaecology), supplied 2026-09-17.

                Micro-type, not a shorter quote: MobileHeroSlideshow's photo wrapper
                has no fixed height (`min-h-[56.25vw]` is a floor, not a ceiling — see
                that file), so there is no clipping risk to trade length against. At
                this size the full paragraph still fits inside the 16:9 floor on every
                phone width tested (320-428px); it would only push the wrapper taller
                on something narrower.

                Weight is deliberately light (`font-normal`, `text-white/90`) against
                the name's `font-bold` below it — the quote is six lines at this size,
                and six bold lines reads as a slab blocking the portrait. One weight
                step of contrast is what lets "Dr. Shweta Godara" still read as the
                answer to "who said this", not just more text in the same block.
              */}
              <p className="text-[10px] font-normal leading-snug text-white/90">
                {t('quote')}
              </p>
              <p className="mt-2 font-serif text-sm font-bold leading-tight text-white">
                <Link href="/doctors/shweta-godara" className="transition-colors hover:text-white/80">
                  {doctorName}
                </Link>
              </p>
              <p className="text-[10px] font-medium leading-snug text-white/70">
                {t('doctorRole')}
              </p>
            </>
          }
        />

        {/* Floating search bar, straddling the photo's lower edge. */}
        <div className="relative -mt-6 px-4">
          <TypewriterSearchBar />
        </div>
      </div>

      {/* Three across. The tile is the tap target, not the icon inside it. */}
      <nav aria-label={tA11y('quickActions')} className="px-4 pt-4">
        <ul className="grid grid-cols-3 gap-2.5">
          {mobileQuickActions.map((action) => (
            <li key={action.href}>
              <Link
                href={action.href}
                className="press flex min-h-[96px] flex-col items-center justify-center gap-2 rounded-2xl border border-brand-teal/10 bg-brand-mist px-2 py-3 text-center active:bg-brand-mist-subtle"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/actions/${action.icon}.webp`}
                  alt=""
                  aria-hidden="true"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
                <span className="text-[11px] font-semibold leading-tight text-brand-dark-base">
                  {quickLabels[action.href] ?? action.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <p className="px-4 pt-5 text-sm leading-relaxed text-brand-dark-base/70">
        {text.description}
      </p>
    </section>
  )
}
