// components/home/MobileHero.tsx
//
// Full-bleed 16:9 photograph, the search bar floating over its lower edge, then three
// quick-action tiles.
//
// 16:9 is the ratio that leaves the search bar, the tiles AND the first row of the
// service grid above the fold on a 667pt viewport. A 4:3 hero pushes the tiles under
// the fold and the tiles are the whole point of this block.
//
// Server component. The two client leaves are the search bar and nothing else — the
// tiles are plain links, so they cost no JavaScript.

import Image from 'next/image'
import Link from 'next/link'
import { TypewriterSearchBar } from '@/components/home/TypewriterSearchBar'
import { heroImageMobile } from '@/lib/media'
import { mobileQuickActions, primaryLocation, siteConfig } from '@/lib/site-config'

export function MobileHero() {
  return (
    <section className="lg:hidden">
      <div className="relative">
        <div className="relative aspect-video w-full bg-brand-teal">
          <Image
            src={heroImageMobile.src}
            alt={heroImageMobile.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/*
            The scrim is what makes the overlaid copy legible regardless of which part
            of the photograph sits behind it. Text over an unscrimmed photo passes
            contrast on the designer's crop and fails on everyone else's.
          */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-brand-dark-base/85 via-brand-dark-base/35 to-transparent"
          />

          <div className="absolute inset-x-0 bottom-0 px-4 pb-9">
            <h1 className="font-serif text-3xl font-bold leading-tight text-white">
              World class care,
              <br />
              close to home.
            </h1>
            <p className="mt-1.5 text-xs font-medium text-white/75">
              {primaryLocation.addressLines.join(', ')}, {primaryLocation.city}
            </p>
          </div>
        </div>

        {/* Floating search bar, straddling the photo's lower edge. */}
        <div className="relative -mt-6 px-4">
          <TypewriterSearchBar />
        </div>
      </div>

      {/* Three across. The tile is the tap target, not the icon inside it. */}
      <nav aria-label="Quick actions" className="px-4 pt-4">
        <ul className="grid grid-cols-3 gap-2.5">
          {mobileQuickActions.map((action) => (
            <li key={action.href}>
              <Link
                href={action.href}
                className="flex min-h-[96px] flex-col items-center justify-center gap-2 rounded-2xl border border-brand-teal/10 bg-brand-mist px-2 py-3 text-center transition-colors active:bg-brand-mist-subtle"
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
                  {action.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <p className="px-4 pt-5 text-sm leading-relaxed text-brand-dark-base/70">
        {siteConfig.description}
      </p>
    </section>
  )
}
