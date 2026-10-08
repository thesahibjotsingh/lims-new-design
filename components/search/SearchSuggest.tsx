'use client'

// components/search/SearchSuggest.tsx
//
// The suggestion list that drops under every search input on the site, and the keyboard wiring that
// goes with it. Shared, because the site has six search inputs (the desktop header, the desktop hero
// card, the phone home bar, the phone search sheet, the phone menu and the doctor directory), and six
// copies of a combobox is six chances for them to disagree about what Enter does.
//
// WHAT IT SEARCHES. The whole site: every department, condition, treatment and question on the
// department pages, every consultant, and the hospital's own information (lib/search/engine.ts).
// The index is loaded the first time any box is focused (useSearchEngine), so the first keystroke
// already has it. It understands everyday words ("stomach", "tummy ache"), Hindi and Punjabi in their
// own script or typed in English letters ("pet dard"), spelling mistakes, and emergencies.
//
// IT NEVER ENDS EMPTY. A search that finds something shows it. A near miss is labelled as one. A
// search that finds nothing shows where to go from here (call, book, the general doctor). A phrase that
// finds nothing, or only a near miss, is counted anonymously (reportMiss) so the hospital can add it.
//
// The host form always keeps working on its own. Nothing here is required for a search to run: the
// input and its submit button do what they did before when the index is not there, and this only adds
// a faster route to a specific destination.

import { Fragment, useEffect, useId, useMemo, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import {
  ArrowUpRightIcon,
  CalendarIcon,
  DocumentIcon,
  FlaskIcon,
  GridIcon,
  PhoneIcon,
  PinIcon,
  PulseIcon,
  RouteIcon,
  SearchIcon,
  ShieldIcon,
  StethoscopeIcon,
  WhatsAppIcon,
} from '@/components/icons'
import { reportMiss } from '@/components/search/reportMiss'
import { useSearchEngine } from '@/components/search/useSearchEngine'
import { useVoiceSearch } from '@/components/search/useVoiceSearch'
import type { Voice } from '@/components/search/useVoiceSearch'
import { hitToSuggestion } from '@/lib/search'
import type { SearchSuggestion, SuggestionKind } from '@/lib/search'
import type { SearchMode } from '@/lib/search/types'

/* -------------------------------------------------------------------------- */
/* Recent searches                                                             */
/* -------------------------------------------------------------------------- */

const RECENT_KEY = 'lims:recent-searches'
const RECENT_MAX = 4
/** How many rows one search shows, and how many an empty box shows (recent first, then popular). */
const RESULT_LIMIT = 9
const IDLE_LIMIT = 6

/**
 * Reads the reader's recent picks.
 *
 * Every access is wrapped: localStorage throws outright in some privacy modes rather
 * than returning null, and a search box that crashes because history is unavailable is
 * a worse failure than one that simply has no history to show. It stays on the device —
 * nothing here is sent anywhere, which matters on a hospital site where what somebody
 * searched for is itself sensitive.
 */
export function readRecent(): SearchSuggestion[] {
  try {
    const raw = window.localStorage.getItem(RECENT_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (item): item is SearchSuggestion =>
        !!item && typeof item.label === 'string' && typeof item.href === 'string',
    )
  } catch {
    return []
  }
}

/** Fired on `window` when the history is cleared, so every search bar on the page can drop it. */
const RECENT_EVENT = 'lims:recent-searches-changed'

/**
 * Forgets the reader's recent picks, from this device only (nothing was ever sent anywhere), and
 * tells every mounted search bar, so the dropdown in the header, the bar in the hero and the phone's
 * search sheet all empty together rather than each holding its own stale copy.
 */
export function clearRecent(): void {
  try {
    window.localStorage.removeItem(RECENT_KEY)
  } catch {
    // Nothing stored, or storage unavailable: either way there is nothing left to show.
  }
  window.dispatchEvent(new Event(RECENT_EVENT))
}

/** Calls back whenever the history changes elsewhere (cleared from another bar, or another tab). */
export function onRecentChange(callback: () => void): () => void {
  window.addEventListener(RECENT_EVENT, callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener(RECENT_EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}

export function rememberSearch(suggestion: SearchSuggestion): void {
  // A phone call or a map is not a place to come back to, and a number does not belong in a history.
  if (suggestion.external) return
  try {
    const entry: SearchSuggestion = {
      label: suggestion.label,
      detail: suggestion.detail,
      kind: suggestion.kind,
      href: suggestion.href,
    }
    const next = [entry, ...readRecent().filter((item) => item.href !== suggestion.href)].slice(
      0,
      RECENT_MAX,
    )
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next))
  } catch {
    // No history is a fine outcome; never let it break the search.
  }
}

/* -------------------------------------------------------------------------- */
/* The hook                                                                    */
/* -------------------------------------------------------------------------- */

export type SuggestionItem = SearchSuggestion & { section?: 'recent' | 'popular' }

export function useSearchSuggest({
  query,
  kinds,
  popular = true,
  onQueryChange,
}: {
  query: string
  /** Narrows the list, e.g. the hero card's "A doctor" / "A department" toggle. */
  kinds?: readonly SuggestionKind[]
  /** Offer popular searches under the recent ones when the box is empty. Off where the host has its own. */
  popular?: boolean
  /** Lets the microphone put what it heard into the host's field. Without it there is no voice button. */
  onQueryChange?: (query: string) => void
}) {
  const router = useRouter()
  const locale = useLocale() as Locale
  const [open, setOpen] = useState(false)
  // -1 is "nothing highlighted", which is NOT the same as "the first row is highlighted". With
  // nothing highlighted, Enter takes the best answer (see submit) or leaves the list open.
  const [active, setActive] = useState(-1)
  const [recent, setRecent] = useState<SearchSuggestion[]>([])
  const listId = useId()
  const { engine, status, ensure } = useSearchEngine(locale)

  const voice = useVoiceSearch(locale, (text) => {
    onQueryChange?.(text)
    setOpen(true)
    setActive(-1)
    ensure()
  })

  // Read on mount, not during render: localStorage does not exist on the server, and
  // seeding state from it would make the first client render disagree with the HTML.
  useEffect(() => {
    setRecent(readRecent())
    // Cleared from any search bar: drop it here too, and un-highlight a row that is gone.
    return onRecentChange(() => {
      setRecent(readRecent())
      setActive(-1)
    })
  }, [])

  const trimmed = query.trim()
  const searching = trimmed.length >= 2

  // Typing is the surest sign the index is wanted, whichever way the field got focus (a tap, a
  // button that focuses it for you, the microphone, a chip that fills it in).
  useEffect(() => {
    if (searching && !engine && status === 'idle') ensure()
  }, [searching, engine, status, ensure])

  const result = useMemo(
    () => (searching && engine ? engine.search(trimmed, { kinds, limit: RESULT_LIMIT }) : null),
    [engine, searching, trimmed, kinds],
  )

  // With nothing typed, the list shows where this reader went last time and then what most people
  // look for. It is the one moment a search box can be useful before it has been used.
  //
  // History obeys `kinds` as well. Without this the hero card, set to "A doctor", would answer an
  // empty field with whatever was last visited — a department or a page — and quietly contradict the
  // toggle the reader just set.
  const idleItems = useMemo<SuggestionItem[]>(() => {
    if (searching) return []
    const items: SuggestionItem[] = (kinds ? recent.filter((item) => kinds.includes(item.kind)) : recent).map(
      (item) => ({ ...item, section: 'recent' as const }),
    )
    if (popular && engine) {
      const seen = new Set(items.map((item) => item.href))
      for (const hit of engine.popular(IDLE_LIMIT, kinds)) {
        if (items.length >= IDLE_LIMIT) break
        const suggestion = hitToSuggestion(hit)
        if (!seen.has(suggestion.href)) items.push({ ...suggestion, section: 'popular' })
      }
    }
    return items
  }, [searching, recent, kinds, popular, engine])

  const suggestions: SuggestionItem[] = searching
    ? (result?.hits ?? []).map((hit) => hitToSuggestion(hit))
    : idleItems
  const loading = searching && !engine && status !== 'error'
  const unavailable = searching && !engine && status === 'error'
  const mode: SearchMode | null = result?.mode ?? null
  const emergency = result?.emergency ?? false
  const terms = result?.terms ?? []
  const showingRecent = !searching && idleItems.some((item) => item.section === 'recent')
  const voiceNote = voice.listening || voice.error !== null

  const visible = open && (suggestions.length > 0 || loading || unavailable || voiceNote)

  // A phrase that found nothing, or only a near miss, is counted (anonymously, once per visit) so the
  // hospital can see what patients look for that the site does not answer. Not while a toggle
  // narrows the list: "stomach" under "A doctor" is not a gap in the site.
  useEffect(() => {
    if (!result || !searching || kinds || result.mode === 'match') return
    const timer = window.setTimeout(() => reportMiss(trimmed, locale, result.mode === 'none' ? 'none' : 'weak'), 1500)
    return () => window.clearTimeout(timer)
  }, [result, searching, kinds, trimmed, locale])

  function choose(index: number) {
    const suggestion = suggestions[index]
    if (!suggestion) return
    rememberSearch(suggestion)
    setRecent(readRecent())
    setOpen(false)
    setActive(-1)
    voice.stop()
    if (suggestion.external) {
      if (suggestion.href.startsWith('tel:')) window.location.href = suggestion.href
      else window.open(suggestion.href, '_blank', 'noopener,noreferrer')
      return
    }
    router.push(suggestion.href)
  }

  /**
   * Enter or the Search button, with nothing highlighted. Takes the best answer when there is a
   * confident one that is a place on this site. Otherwise (a near miss, a phone call, an emergency)
   * leaves the list open so the reader chooses, instead of sending them somewhere on a guess.
   * Returns false when it did nothing (no index yet, or nothing typed), so the host can fall back to
   * what it did before.
   */
  function submit(): boolean {
    if (!searching || !engine) return false
    setOpen(true)
    const first = suggestions[0]
    if (!first || emergency || first.external || mode !== 'match') {
      setActive(-1)
      return true
    }
    choose(0)
    return true
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      setOpen(false)
      setActive(-1)
      voice.stop()
      return
    }
    if (!visible || suggestions.length === 0) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((current) => (current + 1) % suggestions.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((current) => (current <= 0 ? suggestions.length - 1 : current - 1))
    } else if (event.key === 'Enter' && active >= 0) {
      event.preventDefault()
      choose(active)
    }
  }

  /** Spread onto the <input> to make it an accessible combobox. */
  const inputProps = {
    role: 'combobox' as const,
    'aria-expanded': visible,
    'aria-controls': listId,
    'aria-autocomplete': 'list' as const,
    'aria-activedescendant':
      visible && active >= 0 ? `${listId}-option-${active}` : undefined,
    autoComplete: 'off',
    enterKeyHint: 'search' as const,
    onKeyDown,
    onFocus: () => {
      setOpen(true)
      ensure()
    },
  }

  const available = voice.supported && onQueryChange !== undefined
  const voiceState: Voice & { available: boolean } = { ...voice, available }

  /** Everything SuggestionList needs, so a host passes one object. */
  const listProps = {
    suggestions,
    active,
    setActive,
    choose,
    listId,
    mode,
    terms,
    loading,
    unavailable,
    voice: voiceState,
  }

  return {
    suggestions,
    visible,
    showingRecent,
    mode,
    emergency,
    loading,
    active,
    setActive,
    setOpen,
    choose,
    submit,
    prefetch: ensure,
    voice: voiceState,
    listId,
    inputProps,
    listProps,
  }
}

/**
 * Closes the list when a click lands outside `ref`.
 *
 * Deliberately not an onBlur on the input: blur fires before the click on a suggestion
 * resolves, so closing there would unmount the row out from under the pointer and the
 * tap would land on whatever moved up into its place.
 */
export function useCloseOnOutside(
  ref: React.RefObject<HTMLElement | null>,
  close: () => void,
) {
  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) close()
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [ref, close])
}

/* -------------------------------------------------------------------------- */
/* The list                                                                    */
/* -------------------------------------------------------------------------- */

/** The row's icon, from where it goes: the kind of page, or the kind of thing it does. */
function iconFor(suggestion: SearchSuggestion): React.ComponentType<React.SVGProps<SVGSVGElement>> {
  const { href, kind } = suggestion
  if (href.startsWith('tel:')) return PhoneIcon
  if (href.includes('wa.me')) return WhatsAppIcon
  if (href.includes('google.com/maps') || href.includes('maps.')) return RouteIcon
  if (href.includes('abdm.gov.in')) return ShieldIcon
  if (href.startsWith('/appointments')) return CalendarIcon
  if (kind === 'doctor') return StethoscopeIcon
  if (kind === 'department') return GridIcon
  if (kind === 'test') return FlaskIcon
  if (kind === 'condition') return PulseIcon
  if (kind === 'faq' || kind === 'info') return DocumentIcon
  if (kind === 'treatment') return PinIcon
  return SearchIcon
}

/** The words of the query, bold where they appear in a title. Plain text for anything not matched. */
function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (terms.length === 0) return <>{text}</>
  const lower = text.toLowerCase()
  const ranges: [number, number][] = []
  for (const term of terms) {
    let from = 0
    for (;;) {
      const at = lower.indexOf(term, from)
      if (at < 0) break
      ranges.push([at, at + term.length])
      from = at + term.length
    }
  }
  if (ranges.length === 0) return <>{text}</>
  ranges.sort((a, b) => a[0] - b[0] || b[1] - a[1])
  const merged: [number, number][] = []
  for (const range of ranges) {
    const last = merged[merged.length - 1]
    if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1])
    else merged.push([...range])
  }
  const parts: React.ReactNode[] = []
  let cursor = 0
  merged.forEach(([start, end], index) => {
    if (start > cursor) parts.push(text.slice(cursor, start))
    parts.push(
      <mark key={index} className="bg-transparent font-extrabold text-brand-teal">
        {text.slice(start, end)}
      </mark>,
    )
    cursor = end
  })
  if (cursor < text.length) parts.push(text.slice(cursor))
  return <>{parts}</>
}

export function SuggestionList({
  suggestions,
  active,
  setActive,
  choose,
  listId,
  mode = null,
  terms = [],
  loading = false,
  unavailable = false,
  voice,
  className = '',
  variant = 'floating',
  visible = true,
}: {
  suggestions: SuggestionItem[]
  active: number
  setActive: (index: number) => void
  choose: (index: number) => void
  listId: string
  /** match: plain results. weak: say they are the closest. none: say nothing matched and where to go. */
  mode?: SearchMode | null
  /** The words of the query, to highlight in titles. */
  terms?: string[]
  /** The index is still on its way. */
  loading?: boolean
  unavailable?: boolean
  voice?: Voice & { available: boolean }
  className?: string
  /**
   * 'floating' (default): absolutely positioned below the field, overlaying
   * whatever sits underneath — right for the desktop hero card, the mobile hero
   * bar and the drawer, all of which have real content below the field that must
   * not be shoved down every keystroke.
   *
   * 'inline': a normal-flow block that grows the field's own container instead of
   * overlaying it. Made for SearchSheet, whose sheet is anchored to the bottom of
   * the viewport with a short field near the bottom edge — a floating list there
   * renders mostly below the visible screen, not overlaying content so much as
   * disappearing past it. Not a Tailwind class swap on the shared base string:
   * `absolute` and `static` are the same specificity, so whichever one Tailwind's
   * own stylesheet happens to emit later wins regardless of prop order — the two
   * variants need genuinely different base classes, not one overridden by another.
   */
  variant?: 'floating' | 'inline'
  /**
   * 'floating' only. Callers keep this component mounted at all times now and
   * toggle this instead of conditionally rendering it — the entrance/exit
   * transition needs the element to still be there for the frame it animates out,
   * which a React unmount doesn't give it. Ignored for 'inline', which callers
   * still mount conditionally: it grows the container it sits in rather than
   * floating over content, so there's nothing for it to teleport past.
   */
  visible?: boolean
}) {
  const t = useTranslations('searchSuggest')
  const kindLabel: Record<SuggestionKind, string> = {
    doctor: t('kindDoctor'),
    department: t('kindDepartment'),
    page: t('kindPage'),
    condition: t('kindCondition'),
    treatment: t('kindTreatment'),
    test: t('kindTest'),
    faq: t('kindFaq'),
    info: t('kindInfo'),
    action: t('kindAction'),
  }

  const hasRecent = suggestions.some((item) => item.section === 'recent')
  const label = (
    mode === 'none'
      ? t('none')
      : mode === 'weak'
        ? t('closest')
        : hasRecent
          ? t('recentSearchesAria')
          : t('suggestionsAria')
  )

  const heading = (text: string, withClear = false) => (
    <li role="presentation" className="flex items-center justify-between gap-3 px-4 pb-1 pt-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-dark-base/45">
        {text}
      </span>
      {/*
        Clears the history on this device. Mouse-down is held back from the input, so the
        field keeps its focus and the list stays up while it empties; the click does the
        work (and is what a keyboard's Enter or Space fires). The padding is the target: the
        word is 11px, the button around it is not.
      */}
      {withClear && (
        <button
          type="button"
          aria-label={t('clearRecentAria')}
          onMouseDown={(event) => event.preventDefault()}
          onClick={clearRecent}
          className="-my-1.5 rounded-md px-2 py-2 text-[11px] font-semibold uppercase tracking-wider text-brand-teal transition-colors hover:bg-brand-mist active:bg-brand-mist"
        >
          {t('clearRecent')}
        </button>
      )}
    </li>
  )

  let lastSection: string | undefined

  return (
    <ul
      id={listId}
      role="listbox"
      aria-label={label}
      className={[
        variant === 'floating'
          ? 'suggestion-list-floating absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 max-h-[min(30rem,70vh)] overflow-y-auto overscroll-contain'
          : 'relative mt-2 overflow-hidden',
        'rounded-xl border border-brand-teal/15 bg-white py-1 text-left shadow-glass',
        variant === 'floating' && !visible ? 'suggestion-list-hidden' : '',
        className,
      ].join(' ')}
    >
      {voice?.listening && (
        <li
          role="status"
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-brand-emergency"
        >
          <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-emergency/60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-emergency" />
          </span>
          {voice.ready ? t('voiceListening') : t('voiceStarting')}
        </li>
      )}
      {!voice?.listening && voice?.error && (
        <li role="status" className="px-4 py-2.5 text-sm text-brand-dark-base/70">
          {voice.error === 'denied'
            ? t('voiceDenied')
            : voice.error === 'silent'
              ? t('voiceNoSpeech')
              : t('voiceFailed')}
          {voice.hint && voice.error !== 'denied' && (
            <span className="mt-1 block text-xs text-brand-dark-base/60">{t('voiceKeyboardHint')}</span>
          )}
        </li>
      )}

      {loading && (
        <li role="status" className="flex items-center gap-2 px-4 py-3 text-sm text-brand-dark-base/60">
          <span
            aria-hidden="true"
            className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-brand-teal/25 border-t-brand-teal"
          />
          {t('searching')}
        </li>
      )}
      {unavailable && (
        <li role="status" className="px-4 py-3 text-sm text-brand-dark-base/70">
          {t('unavailable')}
        </li>
      )}

      {(mode === 'weak' || mode === 'none') && heading(label)}

      {suggestions.map((suggestion, index) => {
        const sectionHeading =
          suggestion.section && suggestion.section !== lastSection
            ? heading(
                suggestion.section === 'recent' ? t('recent') : t('popular'),
                suggestion.section === 'recent',
              )
            : null
        lastSection = suggestion.section
        const Icon = iconFor(suggestion)
        const emergencyRow = suggestion.emergency === true
        return (
          <Fragment key={`${suggestion.kind}-${suggestion.href}-${index}`}>
            {sectionHeading}
            <li role="presentation">
              <button
                type="button"
                id={`${listId}-option-${index}`}
                role="option"
                aria-selected={index === active}
                // Pointer-down, not click: a click fires after blur, and by then the list
                // would already be closing.
                onMouseDown={(event) => {
                  event.preventDefault()
                  choose(index)
                }}
                onMouseEnter={() => setActive(index)}
                className={[
                  'flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors active:bg-brand-mist',
                  emergencyRow
                    ? 'border-l-4 border-brand-emergency bg-red-50 hover:bg-red-100'
                    : index === active
                      ? 'bg-brand-mist'
                      : 'bg-white',
                  suggestion.inferred ? 'pl-4' : '',
                ].join(' ')}
              >
                <Icon
                  className={[
                    'h-4 w-4 shrink-0',
                    emergencyRow ? 'text-brand-emergency' : 'text-brand-teal/60',
                  ].join(' ')}
                />
                <span className="min-w-0 flex-1">
                  <span
                    className={[
                      'block truncate text-sm font-semibold',
                      emergencyRow ? 'text-brand-emergency' : 'text-brand-dark-base',
                    ].join(' ')}
                  >
                    {suggestion.section ? suggestion.label : <Highlight text={suggestion.label} terms={terms} />}
                  </span>
                  {suggestion.detail && (
                    <span className="block truncate text-xs text-brand-dark-base/55">
                      {suggestion.detail}
                    </span>
                  )}
                </span>
                {/*
                  Says where the row goes before it is clicked. The kinds land in different places
                  (a page, a section of a page, a phone call, another website), and a list that
                  looks uniform but behaves several ways is only discovered by being surprised.
                */}
                {suggestion.external ? (
                  <ArrowUpRightIcon
                    className={[
                      'h-4 w-4 shrink-0',
                      emergencyRow ? 'text-brand-emergency' : 'text-brand-teal/60',
                    ].join(' ')}
                  />
                ) : (
                  <span className="shrink-0 rounded-full bg-brand-mist px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-teal">
                    {kindLabel[suggestion.kind]}
                  </span>
                )}
              </button>
            </li>
          </Fragment>
        )
      })}
    </ul>
  )
}
