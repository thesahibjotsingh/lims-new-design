'use client'

// components/home/HeroSearchCard.tsx
//
// The overlapping glassmorphism search card. Three fields — what you need, which
// department, and whether you want a doctor or a test — resolving to a real URL.
//
// It NAVIGATES rather than fetching. /doctors and /specialities both already filter
// server-side from the query string, so a search produces a shareable, bookmarkable,
// back-button-able URL, and this component ships no data-fetching code at all.
//
// Glass caveat: `backdrop-blur` over photography is a contrast hazard. The card sits on
// a `bg-brand-dark-base/45` floor rather than pure translucency, so the label text
// clears 4.5:1 no matter which part of the photograph ends up behind it.

import { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SearchIcon } from '@/components/icons'
import {
  SuggestionList,
  useCloseOnOutside,
  useSearchSuggest,
} from '@/components/search/SearchSuggest'
import { useTypewriter } from '@/components/search/useTypewriter'
import type { SuggestionKind } from '@/lib/search'

/**
 * The placeholder types itself, and what it types follows the toggle above it.
 *
 * "A doctor" cycles real consultants; "A department" cycles real departments. The
 * animation is therefore an answer to the question the toggle just asked, rather than
 * decoration — someone who switched to Departments sees, without reading a word of
 * help text, that this field takes department names.
 *
 * Every phrase resolves to a real page. A placeholder that suggests something the
 * search cannot find teaches the wrong vocabulary.
 */
const DOCTOR_PHRASES = [
  'Dr. Shweta Godara',
  'Dr. Harshal Godara',
  'Dr. Udit Choudhary',
]

/**
 * Stable arrays, defined once at module scope.
 *
 * Building these inline would hand the suggestion hook a new array identity on every
 * render, which defeats the memo around the matcher and re-runs the whole index scan
 * for every keystroke that did not change anything.
 */
const DOCTOR_KINDS = ['doctor'] as const
const DEPARTMENT_KINDS = ['department'] as const

const DEPARTMENT_PHRASES = [
  'Orthopaedics',
  'Obstetrics & Gynaecology',
  'Radiology & Imaging',
  'Physiotherapy',
]
import { SERVICE_CATEGORIES, serviceHref, servicesByCategory } from '@/lib/services'

type Target = 'doctors' | 'departments'

export function HeroSearchCard() {
  const router = useRouter()
  const [target, setTarget] = useState<Target>('doctors')
  const [query, setQuery] = useState('')
  // Holds the service's full href, not its slug. The three categories live under three
  // different route prefixes, so a slug alone cannot say where it goes — resolving it
  // here through serviceHref() is what keeps a diagnostics pick out of /specialities.
  const [departmentHref, setDepartmentHref] = useState('')
  const [focused, setFocused] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  // The toggle is a filter, not a hint: "A doctor" offers consultants only and
  // "A department" offers departments only, so the list can never answer with something
  // the reader has just said they are not looking for.
  const kinds = target === 'doctors' ? DOCTOR_KINDS : DEPARTMENT_KINDS

  const {
    suggestions,
    visible,
    showingRecent,
    active,
    setActive,
    setOpen,
    choose,
    listId,
    inputProps,
  } = useSearchSuggest({ query, kinds: kinds as unknown as SuggestionKind[] })

  useCloseOnOutside(
    rootRef,
    useCallback(() => setOpen(false), [setOpen]),
  )

  // Stops the moment the field is focused or has content — the animation is a
  // placeholder, never a value, so it must never be mistaken for text already typed.
  const typed = useTypewriter(
    target === 'doctors' ? DOCTOR_PHRASES : DEPARTMENT_PHRASES,
    !focused && query.length === 0,
  )

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    // A department is a place, so picking one wins over free text — sending someone who
    // chose "Urology" to a text search for "back pain" is the wrong destination.
    if (departmentHref) {
      router.push(departmentHref)
      return
    }

    const trimmed = query.trim()
    const base = target === 'doctors' ? '/doctors' : '/specialities'
    router.push(trimmed ? `${base}?q=${encodeURIComponent(trimmed)}` : base)
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="hero-search-heading"
      className="w-full max-w-sm space-y-3 rounded-2xl border border-white/25 bg-brand-dark-base/45 p-5 text-left shadow-glass backdrop-blur-xl"
    >
      <h2 id="hero-search-heading" className="text-sm font-semibold text-white">
        Find care at LIMS
      </h2>

      {/* Target toggle — a radiogroup, not two buttons, so arrow keys work. */}
      <fieldset>
        <legend className="sr-only">What are you looking for?</legend>
        <div className="flex gap-1 rounded-xl bg-white/10 p-1">
          {(
            [
              ['doctors', 'A doctor'],
              ['departments', 'A department'],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={[
                'tap-target flex-1 cursor-pointer rounded-lg text-xs font-semibold transition-colors',
                target === value
                  ? 'bg-white text-brand-teal'
                  : 'text-white/75 hover:bg-white/10',
              ].join(' ')}
            >
              <input
                type="radio"
                name="hero-target"
                value={value}
                checked={target === value}
                onChange={() => setTarget(value)}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div ref={rootRef} className="relative">
        <label htmlFor="hero-query" className="sr-only">
          Condition, speciality or doctor name
        </label>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-dark-base/45" />
          <input
            {...inputProps}
            id="hero-query"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setOpen(true)
              setActive(-1)
            }}
            onFocus={() => {
              setFocused(true)
              inputProps.onFocus()
            }}
            onBlur={() => setFocused(false)}
            // The attribute keeps a plain, stable sentence for assistive tech and for
            // anyone with reduced motion; the animated line is painted over it below.
            placeholder="Condition, speciality or doctor"
            className={[
              'min-h-[44px] w-full rounded-xl bg-white/95 pl-9 pr-3 text-sm text-brand-dark-base shadow-inner focus:bg-white',
              typed.length > 0
                ? 'placeholder:text-transparent'
                : 'placeholder:text-brand-dark-base/45',
            ].join(' ')}
          />

          {typed.length > 0 && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-9 top-1/2 -translate-y-1/2 truncate pr-3 text-sm text-brand-dark-base/45"
            >
              {typed}
              <span className="ml-px inline-block animate-caret font-normal">|</span>
            </span>
          )}
        </div>

        {visible && (
          <SuggestionList
            suggestions={suggestions}
            active={active}
            setActive={setActive}
            choose={choose}
            listId={listId}
            showingRecent={showingRecent}
          />
        )}
      </div>

      <div>
        <label htmlFor="hero-department" className="sr-only">
          Go straight to a department
        </label>
        <select
          id="hero-department"
          value={departmentHref}
          onChange={(event) => setDepartmentHref(event.target.value)}
          className="min-h-[44px] w-full rounded-xl bg-white/95 px-3 text-sm text-brand-dark-base shadow-inner focus:bg-white"
        >
          <option value="">Or go straight to a service…</option>
          {SERVICE_CATEGORIES.map((category) => (
            <optgroup key={category.id} label={category.name}>
              {servicesByCategory(category.id).map((service) => (
                <option key={service.slug} value={serviceHref(service)}>
                  {service.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="tap-target focus-ring-inverse w-full gap-2 rounded-xl bg-brand-copper px-6 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-brand-copper-hover"
      >
        <SearchIcon className="h-4 w-4" strokeWidth={2.25} />
        Search
      </button>
    </form>
  )
}
