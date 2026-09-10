// components/primitives/PageShell.tsx
//
// The header band and content wrapper every inner page uses. One component so the
// twenty-six service pages, the directory and the standing pages cannot drift apart in
// spacing, measure or heading level.

import Link from 'next/link'
import type { ReactNode } from 'react'

export function PageHeader({
  eyebrow,
  title,
  intro,
  icon,
  children,
}: {
  eyebrow?: string
  title: string
  intro?: string
  /** Service artwork, shown beside the heading. Decorative — the title carries the name. */
  icon?: ReactNode
  children?: ReactNode
}) {
  return (
    <header className="border-b border-brand-teal/10 bg-brand-mist">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:py-14">
        <div className="flex items-start gap-5">
          {icon && (
            <span className="mt-1 hidden shrink-0 rounded-2xl bg-white p-3 shadow-sm sm:block">
              {icon}
            </span>
          )}
          <div className="min-w-0">
            {eyebrow && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-copper">
                {eyebrow}
              </p>
            )}
            <h1 className="font-serif text-3xl font-bold tracking-tight text-brand-dark-base sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            {intro && (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-dark-base/70">
                {intro}
              </p>
            )}
          </div>
        </div>
        {children}
      </div>
    </header>
  )
}

export function Section({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:py-14 ${className}`}>
      {children}
    </section>
  )
}

/**
 * The panel shown where LIMS has not yet supplied content.
 *
 * This exists so a thin page reads as "we have not published this yet, here is who to
 * ask" instead of as filler. The alternative — plausible-sounding placeholder copy
 * about conditions treated and procedures offered — would be clinical claims the
 * hospital never made, which is the one thing a hospital site must not do.
 */
export function AwaitingContent({
  what,
  children,
}: {
  what: string
  children?: ReactNode
}) {
  return (
    <div className="rounded-2xl border border-dashed border-brand-teal/25 bg-brand-mist/60 p-6">
      <h2 className="font-serif text-lg font-bold text-brand-dark-base">{what}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-dark-base/70">
        {children ?? (
          <>
            This section is published from information supplied by LIMS and is not yet
            available. For anything urgent, please call the hospital directly.
          </>
        )}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href="/contact"
          className="tap-target rounded-full border border-brand-teal/25 px-5 text-xs font-semibold text-brand-teal hover:bg-white"
        >
          Contact LIMS
        </Link>
        <Link
          href="/appointments"
          className="tap-target focus-ring-inverse rounded-full bg-brand-teal px-5 text-xs font-semibold text-white hover:bg-brand-teal-dark"
        >
          Request an appointment
        </Link>
      </div>
    </div>
  )
}
