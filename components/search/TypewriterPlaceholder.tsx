'use client'

// components/search/TypewriterPlaceholder.tsx
//
// The typed-text overlay itself — the phrase, the blinking caret, and the
// static fallback — shared by every search field that types itself, so "the
// same effect" is one component instead of the same seven-line JSX block
// pasted into seven files, each one a chance for the caret markup or the
// fallback logic to quietly diverge from the others.
//
// This renders the OVERLAY only, not the input under it. Every caller still
// owns its own positioning (icon padding differs per field) and its own
// always-transparent-placeholder input, exactly as before — pass the
// positioning classes in.

import type { ReactNode } from 'react'
import { useTypewriter } from './useTypewriter'

export function TypewriterPlaceholder({
  phrases,
  idle,
  prefix,
  staticText,
  fallback,
  className,
}: {
  phrases: string[]
  idle: boolean
  /** Fixed lead-in text that never types or erases, e.g. "Search for ". */
  prefix?: string
  /** Shown before the first phrase has typed anything, and whenever motion is off. */
  staticText?: string
  /**
   * Full control over the same slot `staticText` fills, for a field that wants
   * something other than a plain string there — the hero card shows nothing at
   * all here normally (it has no native `placeholder`, relying on its `sr-only`
   * label instead) and only a fallback sentence under `motion-reduce:`. Takes
   * priority over `staticText` when both are given.
   */
  fallback?: ReactNode
  /** Positions this overlay against the real (transparent-placeholder) input. */
  className: string
}) {
  const typed = useTypewriter(phrases, idle)

  return (
    <span aria-hidden="true" className={className}>
      {typed.length > 0 ? (
        <>
          {prefix}
          {typed}
          <span className="ml-px inline-block animate-caret font-normal">|</span>
        </>
      ) : (
        (fallback ?? staticText)
      )}
    </span>
  )
}
