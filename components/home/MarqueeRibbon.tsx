// components/home/MarqueeRibbon.tsx
//
// The scrolling service ribbon. Its content is the catalogue, not a hand-written list —
// a marquee advertising a service LIMS does not run is the same bug as a nav link to a
// page that does not exist, just harder to notice.
//
// Accessibility: the visible strip is aria-hidden and duplicated for the seamless loop,
// so a screen reader is not read 52 items twice. The same list is exposed once, static,
// to assistive technology. `prefers-reduced-motion` stops the scroll globally via
// globals.css, and the strip stays readable because it is duplicated, not offset.

import { SERVICES } from '@/lib/services'

export function MarqueeRibbon() {
  const names = SERVICES.map((service) => service.name)

  return (
    <div className="w-full overflow-hidden border-y border-brand-teal/10 bg-white py-5">
      <h2 className="sr-only">Services available at LIMS Hisar</h2>
      <ul className="sr-only">
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <div
        aria-hidden="true"
        className="flex w-max animate-marquee-slow whitespace-nowrap [mask-image:linear-gradient(to_right,transparent_0%,white_8%,white_92%,transparent_100%)]"
      >
        {[...names, ...names].map((name, index) => (
          <span
            key={`${name}-${index}`}
            className="mx-7 flex items-center font-serif text-lg tracking-wide text-brand-dark-base"
          >
            <span className="mr-6 text-base font-bold text-brand-copper">✦</span>
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}
