'use client'

// components/home/DepartmentRails.tsx
//
// The home page's "Departments" on a phone: one swipe row of the catalogue with a three-way
// switch above it (specialities, diagnostics, patient care).
//
// WHY. The catalogue is 26 services in three groups. As tiles they were a screen and a half
// of list on a phone; as one swipe row they are the height of one card, and the switch keeps the
// grouping that the whole site is organised by (lib/services.ts says why the grouping is the
// navigation). Every card is a real link to the service's own page, and the last card of each
// group goes to that group's index, so nothing is reachable only by swiping.
//
// The server (PhoneHome) does the translating and hands this finished strings, so it carries no
// message catalogue to the browser. The switch is a pair of pressed-state buttons, the way the
// booking form's patient-type switch is, with a thumb that slides between them.

import { useEffect, useRef, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { ArrowRightIcon } from '@/components/icons'
import { ServiceIcon } from '@/components/primitives/ServiceIcon'

export interface RailCategory {
  id: string
  /** The switch label, e.g. "Specialities". */
  label: string
  /** Where the group's own index page is. */
  basePath: string
  /** "See all 15" */
  seeAll: string
  /** "All specialities", on the last card. */
  allLabel: string
  items: { slug: string; name: string; href: string }[]
}

export function DepartmentRails({
  title,
  kindLabel,
  categories,
}: {
  title: string
  kindLabel: string
  categories: RailCategory[]
}) {
  const [index, setIndex] = useState(0)
  const railRef = useRef<HTMLUListElement>(null)
  const category = categories[index]

  // A new group starts at its first card.
  useEffect(() => {
    railRef.current?.scrollTo({ left: 0 })
  }, [index])

  return (
    <section aria-labelledby="home-departments">
      <div className="flex items-baseline justify-between gap-3 px-5 pt-7">
        <h2
          id="home-departments"
          className="font-serif text-[22px] font-bold leading-tight tracking-tight text-brand-dark-base"
        >
          {title}
        </h2>
        <Link
          href={category.basePath}
          className="-my-2 shrink-0 py-2 text-[13px] font-semibold text-brand-teal"
        >
          {category.seeAll}
        </Link>
      </div>

      <div
        role="group"
        aria-label={kindLabel}
        className="relative mx-5 mt-3 grid grid-cols-3 rounded-full bg-brand-mist p-[3px]"
      >
        <span
          aria-hidden="true"
          className="absolute bottom-[3px] left-[3px] top-[3px] w-[calc((100%-6px)/3)] rounded-full bg-white shadow-[0_1px_3px_rgba(11,20,22,0.18)] transition-transform duration-[340ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(${index * 100}%)` }}
        />
        {categories.map((entry, position) => (
          <button
            key={entry.id}
            type="button"
            aria-pressed={position === index}
            onClick={() => setIndex(position)}
            className={[
              'relative z-10 h-10 min-w-0 truncate rounded-full px-1 text-[12.5px] font-semibold transition-colors',
              position === index ? 'text-brand-teal' : 'text-brand-dark-base/60',
            ].join(' ')}
          >
            {entry.label}{' '}
            <span className="tabular-nums opacity-70">{entry.items.length}</span>
          </button>
        ))}
      </div>

      <ul
        ref={railRef}
        key={category.id}
        className="mt-3 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-5 pb-1.5 [scroll-padding-left:1.25rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {category.items.map((item, position) => (
          <li
            key={item.slug}
            className="rail-in w-32 shrink-0 snap-start"
            style={{ animationDelay: `${position * 30}ms` }}
          >
            <Link
              href={item.href}
              className="press flex h-full min-h-[116px] flex-col justify-between gap-2.5 rounded-[18px] bg-white p-3 shadow-[0_0_0_1px_rgba(15,91,102,0.13),0_10px_20px_-16px_rgba(11,20,22,0.35)]"
            >
              <ServiceIcon slug={item.slug} size={46} />
              <span className="text-[13.5px] font-semibold leading-tight text-brand-dark-base">
                {item.name}
              </span>
            </Link>
          </li>
        ))}
        <li
          className="rail-in w-32 shrink-0 snap-start"
          style={{ animationDelay: `${category.items.length * 30}ms` }}
        >
          <Link
            href={category.basePath}
            className="press focus-ring-inverse flex h-full min-h-[116px] flex-col justify-center gap-2 rounded-[18px] bg-brand-teal p-3 text-[15px] font-semibold leading-tight text-white"
          >
            {category.allLabel}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </li>
      </ul>
    </section>
  )
}
