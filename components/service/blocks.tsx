// components/service/blocks.tsx
//
// The building blocks of a service page. All presentational: they take already-translated
// strings and already-resolved links, so none of them reads a catalogue or a message file.
// That keeps the page composition in ServiceDetail.tsx the one place that knows what goes
// where.
//
// LAYOUT FAMILIES. Each section type uses a different arrangement on purpose (text
// columns, dual panel, tile grid, accordion, stepper, rows, Q&A columns, cards). A page
// that repeats one card grid ten times reads as a template; these read as a document.
//
// CORNER RADIUS RULE for this file: cards and panels are rounded-2xl, controls and pills
// are full, and nothing else is rounded differently.

import { Link } from '@/i18n/navigation'
import { ArrowRightIcon, ChevronDownIcon } from '@/components/icons'
import { DoctorAvatar } from '@/components/doctor/DoctorAvatar'
import { ServiceIcon } from '@/components/primitives/ServiceIcon'
import { REVIEW_MODE } from '@/lib/review'
import { plain } from '@/lib/text'
import type { ReactNode } from 'react'

export type Tone = 'white' | 'mist'

/** One full-width section. `id` is the anchor the section nav links to. */
export function Band({ id, tone, children }: { id: string; tone: Tone; children: ReactNode }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      // The offset keeps an anchored heading clear of the site header and the section nav.
      className={`scroll-mt-40 lg:scroll-mt-[190px] ${tone === 'mist' ? 'bg-brand-mist' : 'bg-white'}`}
    >
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:py-16">{children}</div>
    </section>
  )
}

export function SectionHeading({
  id,
  children,
  lead,
  draft = false,
}: {
  id: string
  children: ReactNode
  lead?: string
  /** Marks generic copy that still needs a clinician. Visible in review mode only. */
  draft?: boolean
}) {
  return (
    <div className="mb-8 max-w-3xl">
      <h2
        id={`${id}-heading`}
        className="text-balance font-serif text-3xl font-bold tracking-tight text-brand-dark-base"
      >
        {children}
      </h2>
      {lead && (
        <p className="mt-3 text-base leading-relaxed text-brand-dark-base/70">{plain(lead)}</p>
      )}
      {REVIEW_MODE && draft && (
        <p className="mt-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
          Draft copy, clinician review pending
        </p>
      )}
    </div>
  )
}

/** A short list with a square marker. Used for checklists and warning signs. */
export function BulletList({
  items,
  marker = 'teal',
}: {
  items: string[]
  marker?: 'teal' | 'red'
}) {
  const markerClass = marker === 'red' ? 'before:bg-brand-emergency' : 'before:bg-brand-teal'
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className={`relative pl-6 text-base leading-relaxed text-brand-dark-base/80 before:absolute before:left-0 before:top-[0.6em] before:h-2 before:w-2 before:rounded-sm before:content-[''] ${markerClass}`}
        >
          {plain(item)}
        </li>
      ))}
    </ul>
  )
}

/** Name and description pairs in two text columns, each under a thin rule. */
export function TextColumns({ items }: { items: { name: string; description: string }[] }) {
  return (
    <ul className="grid grid-cols-1 gap-x-12 gap-y-7 md:grid-cols-2">
      {items.map((item) => (
        <li key={item.name} className="border-t-2 border-brand-teal/15 pt-4">
          <h3 className="font-serif text-lg font-bold text-brand-dark-base">{plain(item.name)}</h3>
          <p className="mt-1.5 text-base leading-relaxed text-brand-dark-base/75">
            {plain(item.description)}
          </p>
        </li>
      ))}
    </ul>
  )
}

/** Native <details> list: works without JavaScript and is keyboard and screen-reader friendly. */
export function Accordion({
  items,
}: {
  items: { name: string; description: string }[]
}) {
  return (
    <div className="divide-y divide-brand-teal/10 overflow-hidden rounded-2xl border border-brand-teal/10 bg-white">
      {items.map((item, index) => (
        <details key={item.name} open={index === 0} className="group">
          <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-brand-dark-base marker:hidden hover:bg-brand-mist/60 sm:px-6 [&::-webkit-details-marker]:hidden">
            <span>{plain(item.name)}</span>
            <ChevronDownIcon className="h-5 w-5 shrink-0 text-brand-teal transition-transform group-open:rotate-180" />
          </summary>
          <p className="px-5 pb-6 text-base leading-relaxed text-brand-dark-base/75 sm:px-6">
            {plain(item.description)}
          </p>
        </details>
      ))}
    </div>
  )
}

/** Numbered steps in a row on a wide screen, stacked on a phone. */
export function Stepper({ steps }: { steps: { title: string; body: string }[] }) {
  const columns = steps.length >= 5 ? 'lg:grid-cols-5' : steps.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
  return (
    <ol className={`grid grid-cols-1 gap-8 sm:grid-cols-2 ${columns}`}>
      {steps.map((step, index) => (
        <li key={step.title} className="border-t-2 border-brand-teal/20 pt-5">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-teal font-serif text-lg font-bold text-white">
            {index + 1}
          </span>
          <h3 className="mt-4 font-serif text-lg font-bold leading-snug text-brand-dark-base">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-brand-dark-base/70">{plain(step.body)}</p>
        </li>
      ))}
    </ol>
  )
}

export interface DiagnosisTile {
  name: string
  detail: string
  link?: { href: string; label: string; note: string }
}

/**
 * Tiles for how something is diagnosed, linking to the LIMS test where there is one.
 *
 * The grid is shaped to the tile count so no row ends with empty cells: three or six fill
 * a three-column grid, four sit in one row of four, and five become three over two (the
 * bottom two are wider). It needs no config because the count is the only thing that varies.
 */
export function DiagnosisGrid({ tiles }: { tiles: DiagnosisTile[] }) {
  const count = tiles.length
  const gridClass =
    count === 4
      ? 'sm:grid-cols-2 lg:grid-cols-4'
      : count === 5
        ? 'sm:grid-cols-2 lg:grid-cols-6'
        : 'sm:grid-cols-2 lg:grid-cols-3'
  const spanClass = (index: number): string => {
    if (count !== 5) return ''
    // Two columns each for the first three, three each for the last two.
    return index < 3 ? 'lg:col-span-2' : 'lg:col-span-3'
  }

  return (
    <ul className={`grid grid-cols-1 gap-4 ${gridClass}`}>
      {tiles.map((tile, index) => (
        <li
          key={tile.name}
          className={`flex flex-col rounded-2xl border border-brand-teal/10 bg-white p-6 shadow-sm ${spanClass(index)}`}
        >
          <h3 className="font-serif text-lg font-bold leading-snug text-brand-dark-base">
            {tile.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-brand-dark-base/70">{plain(tile.detail)}</p>
          {tile.link && (
            <div className="mt-auto pt-5">
              <p className="text-xs text-brand-dark-base/55">{tile.link.note}</p>
              <Link
                href={tile.link.href}
                className="mt-1 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-brand-teal underline-offset-4 hover:underline"
              >
                {tile.link.label}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export interface DoctorRowData {
  id: string
  name: string
  qualifications?: string
  designation?: string
  registration?: string
  portrait?: { src: string; alt: string; focusY?: number }
}

/** A consultant as one compact row, with that doctor's own request button. */
export function DoctorList({
  doctors,
  regLabel,
  viewProfile,
  requestAppointment,
}: {
  doctors: DoctorRowData[]
  regLabel: string
  viewProfile: string
  requestAppointment: string
}) {
  return (
    <ul className="space-y-4">
      {doctors.map((doctor) => (
        <li
          key={doctor.id}
          className="flex flex-col gap-4 rounded-2xl border border-brand-teal/10 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
        >
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <DoctorAvatar name={doctor.name} portrait={doctor.portrait} size={80} />
            <div className="min-w-0">
              <h3 className="font-serif text-lg font-bold leading-snug text-brand-dark-base">
                <Link href={`/doctors/${doctor.id}`} className="hover:text-brand-teal">
                  {doctor.name}
                </Link>
              </h3>
              {doctor.qualifications && (
                <p className="text-sm font-medium leading-snug text-brand-copper-ink">
                  {doctor.qualifications}
                </p>
              )}
              {doctor.designation && (
                <p className="text-sm leading-snug text-brand-dark-base/70">
                  {plain(doctor.designation)}
                </p>
              )}
              {doctor.registration && (
                <p className="mt-0.5 text-xs text-brand-dark-base/55">
                  {regLabel} {doctor.registration}
                </p>
              )}
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Link
              href={`/doctors/${doctor.id}`}
              className="tap-target rounded-full border border-brand-teal/25 px-5 text-sm font-semibold text-brand-teal hover:bg-brand-mist"
            >
              {viewProfile}
            </Link>
            <Link
              href={`/appointments?doctor=${doctor.id}`}
              className="tap-target focus-ring-inverse rounded-full bg-brand-teal px-5 text-sm font-semibold text-white hover:bg-brand-teal-dark"
            >
              {requestAppointment}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  )
}

/** Questions and answers in two columns. Plain text, so it is easy to scan and to index. */
export function FaqGrid({ items }: { items: { q: string; a: string }[] }) {
  return (
    <dl className="grid grid-cols-1 gap-x-14 gap-y-9 lg:grid-cols-2">
      {items.map((item) => (
        <div key={item.q}>
          <dt className="font-serif text-lg font-bold leading-snug text-brand-dark-base">
            {plain(item.q)}
          </dt>
          <dd className="mt-2 text-base leading-relaxed text-brand-dark-base/75">{plain(item.a)}</dd>
        </div>
      ))}
    </dl>
  )
}

export interface RelatedCard {
  slug: string
  name: string
  categoryName: string
  href: string
}

/** Other services worth reading next, each with its own icon. */
export function RelatedGrid({ cards }: { cards: RelatedCard[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <li key={card.slug}>
          <Link
            href={card.href}
            className="press group flex h-full items-center gap-4 rounded-2xl border border-brand-teal/10 bg-white p-4 shadow-sm transition-colors hover:border-brand-teal/30"
          >
            <ServiceIcon slug={card.slug} size={44} />
            <span className="min-w-0 flex-1">
              <span className="block font-semibold leading-snug text-brand-dark-base group-hover:text-brand-teal">
                {card.name}
              </span>
              <span className="block text-xs text-brand-dark-base/55">{card.categoryName}</span>
            </span>
            <ArrowRightIcon className="h-4 w-4 shrink-0 text-brand-teal" />
          </Link>
        </li>
      ))}
    </ul>
  )
}
