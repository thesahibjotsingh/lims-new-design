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
import { FadeScroller } from '@/components/primitives/FadeScroller'
import { ArrowRightIcon, ChevronDownIcon } from '@/components/icons'
import { DoctorAvatar } from '@/components/doctor/DoctorAvatar'
import { Collapse } from '@/components/service/Collapse'
import { ServiceIcon } from '@/components/primitives/ServiceIcon'
import { REVIEW_MODE } from '@/lib/review'
import { plain } from '@/lib/text'
import type { ReactNode } from 'react'

export type Tone = 'white' | 'mist'

/**
 * One full-width section. `id` is the anchor the section nav links to.
 *
 * From lg up it is a band of the page. Below lg (a phone or a tablet) a band with a `title` is
 * a white card holding a row that opens (see Collapse); that is what turns a twenty-screen page
 * into one that fits a few. What the row says, and whether it starts open, come from the page
 * that composes the sections:
 *
 *   title    the row's label. Without one the band is not collapsible at any width.
 *   count    the number on the row
 *   open     starts open below lg
 *   phone    'plain' leaves the band open with no card (the related-services rail),
 *            'hidden' drops it below lg because the hero already says the same thing
 */
export function Band({
  id,
  tone,
  children,
  title,
  count,
  open = false,
  phone = 'row',
}: {
  id: string
  tone: Tone
  children: ReactNode
  title?: string
  count?: number
  open?: boolean
  phone?: 'row' | 'plain' | 'hidden'
}) {
  const collapsible = Boolean(title) && phone === 'row'
  const inner = (
    <div
      className={[
        'mx-auto max-w-7xl lg:px-6 lg:py-16',
        collapsible ? 'px-4 pb-4' : 'px-4 py-6 sm:px-6',
      ].join(' ')}
    >
      {children}
    </div>
  )
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      // The offset keeps an anchored heading clear of the site header and the section nav.
      className={[
        'scroll-mt-28 lg:scroll-mt-[190px]',
        // Below lg every band sits on the mist ground, as a card of its own.
        'max-lg:bg-brand-mist',
        collapsible ? 'max-lg:px-4 max-lg:py-[5px]' : '',
        phone === 'hidden' ? 'max-lg:hidden' : '',
        tone === 'mist' ? 'lg:bg-brand-mist' : 'lg:bg-white',
      ].join(' ')}
    >
      {collapsible ? (
        <div className="max-lg:overflow-hidden max-lg:rounded-2xl max-lg:bg-white max-lg:shadow-row">
          <Collapse id={id} title={title as string} count={count} defaultOpen={open}>
            {inner}
          </Collapse>
        </div>
      ) : (
        inner
      )}
    </section>
  )
}

export function SectionHeading({
  id,
  children,
  lead,
  draft = false,
  keepOnPhone = false,
}: {
  id: string
  children: ReactNode
  lead?: string
  /** Marks generic copy that still needs a clinician. Visible in review mode only. */
  draft?: boolean
  /**
   * Keep the heading below lg. Collapsible sections drop it there, because the row above
   * them already carries the title; a band that is not a row needs it.
   */
  keepOnPhone?: boolean
}) {
  const showLead = Boolean(lead) || (REVIEW_MODE && draft)
  return (
    <div
      className={[
        'max-w-3xl lg:mb-8',
        keepOnPhone ? 'mb-3' : showLead ? 'mb-4' : 'max-lg:hidden',
      ].join(' ')}
    >
      <h2
        id={`${id}-heading`}
        className={[
          'text-balance font-serif font-bold tracking-tight text-brand-dark-base',
          keepOnPhone ? 'text-xl lg:text-3xl' : 'max-lg:hidden lg:text-3xl',
        ].join(' ')}
      >
        {children}
      </h2>
      {lead && (
        <p className="text-base leading-relaxed text-brand-dark-base/70 lg:mt-3">{plain(lead)}</p>
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
          className={`relative pl-6 text-[15px] leading-relaxed text-brand-dark-base/80 before:absolute lg:text-base before:left-0 before:top-[0.6em] before:h-2 before:w-2 before:rounded-sm before:content-[''] ${markerClass}`}
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
    <ul className="grid grid-cols-1 gap-x-12 gap-y-3 md:grid-cols-2 md:gap-y-7">
      {items.map((item) => (
        // A hairline list on a phone (the section is already a card), the ruled columns from md up.
        <li
          key={item.name}
          className="border-t border-brand-teal/10 pt-3 first:border-t-0 first:pt-0 md:border-t-2 md:border-brand-teal/15 md:pt-4 md:first:border-t-2 md:first:pt-4"
        >
          <h3 className="font-sans text-[15px] font-semibold text-brand-dark-base md:font-serif md:text-lg md:font-bold">
            {plain(item.name)}
          </h3>
          <p className="mt-0.5 text-sm leading-relaxed text-brand-dark-base/70 md:mt-1.5 md:text-base md:text-brand-dark-base/75">
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
    <div className="divide-y divide-brand-teal/10 overflow-hidden rounded-2xl border border-brand-teal/10 bg-white max-lg:rounded-none max-lg:border-0">
      {items.map((item, index) => (
        <details key={item.name} open={index === 0} className="group">
          <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-4 py-3 text-[15px] font-semibold text-brand-dark-base marker:hidden hover:bg-brand-mist/60 max-lg:px-0 lg:min-h-[60px] lg:px-6 lg:py-4 lg:text-base [&::-webkit-details-marker]:hidden">
            <span>{plain(item.name)}</span>
            <ChevronDownIcon className="h-5 w-5 shrink-0 text-brand-teal transition-transform group-open:rotate-180" />
          </summary>
          <p className="pb-4 text-sm leading-relaxed text-brand-dark-base/70 lg:px-6 lg:pb-6 lg:text-base lg:text-brand-dark-base/75">
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
    <ol className={`grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 ${columns}`}>
      {steps.map((step, index) => (
        // On a phone the number sits beside the text; from sm up it heads a ruled column.
        <li key={step.title} className="flex gap-3 sm:block sm:border-t-2 sm:border-brand-teal/20 sm:pt-5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-teal font-serif text-base font-bold text-white sm:h-10 sm:w-10 sm:text-lg">
            {index + 1}
          </span>
          <div className="min-w-0">
            <h3 className="font-sans text-[15px] font-semibold leading-snug text-brand-dark-base sm:mt-4 sm:font-serif sm:text-lg sm:font-bold">
              {step.title}
            </h3>
            <p className="mt-0.5 text-sm leading-relaxed text-brand-dark-base/70 sm:mt-2">
              {plain(step.body)}
            </p>
          </div>
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
    <ul className={`grid grid-cols-1 gap-3 sm:gap-4 ${gridClass}`}>
      {tiles.map((tile, index) => (
        <li
          key={tile.name}
          className={`flex flex-col rounded-2xl border border-brand-teal/10 bg-white p-4 shadow-sm max-lg:border-0 max-lg:bg-brand-mist max-lg:shadow-none sm:p-6 ${spanClass(index)}`}
        >
          <h3 className="font-serif text-base font-bold leading-snug text-brand-dark-base sm:text-lg">
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
    <ul className="space-y-3 lg:space-y-4">
      {doctors.map((doctor) => (
        <li
          key={doctor.id}
          className="flex flex-col gap-3 rounded-2xl border border-brand-teal/10 bg-white p-4 shadow-sm max-lg:border-0 max-lg:bg-brand-mist max-lg:shadow-none sm:flex-row sm:items-center sm:gap-4"
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
          <div className="flex shrink-0 flex-wrap gap-2 max-sm:[&>a]:flex-1">
            <Link
              href={`/doctors/${doctor.id}`}
              className="tap-target rounded-full border border-brand-teal/25 px-5 text-sm font-semibold text-brand-teal hover:bg-brand-mist max-lg:bg-white"
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
    <dl className="grid grid-cols-1 gap-x-14 gap-y-4 lg:grid-cols-2 lg:gap-y-9">
      {items.map((item) => (
        <div key={item.q} className="border-t border-brand-teal/10 pt-4 first:border-t-0 first:pt-0 lg:border-t-0 lg:pt-0">
          <dt className="font-sans text-[15px] font-semibold leading-snug text-brand-dark-base lg:font-serif lg:text-lg lg:font-bold">
            {plain(item.q)}
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-brand-dark-base/70 lg:mt-2 lg:text-base lg:text-brand-dark-base/75">
            {plain(item.a)}
          </dd>
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
    // A swipe row on a phone (a peek of the next card says there is more), the grid from sm up.
    <FadeScroller as="ul" className="-mx-4 flex snap-x gap-2.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
      {cards.map((card) => (
        <li key={card.slug} className="w-[72%] shrink-0 snap-start sm:w-auto">
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
    </FadeScroller>
  )
}
