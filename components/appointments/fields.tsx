'use client'

// components/appointments/fields.tsx
//
// The building blocks of the appointment form: grouped cards of compact rows, a calendar and
// a dropdown menu drawn in the site's own style.
//
// THE ROW. Each field is one row of the kind the hospital's own booking screen uses (a label
// on the left, the field on the right, one line high), set as an inset grouped list the way
// iOS Settings sets one: white rows in a rounded card, hairlines between them, a faint tint
// and an inset ring on the row you are in. A row is 44px, so a whole request fits one screen.
//
// THE CALENDAR AND THE MENUS are drawn here, not left to the browser. Chrome's own date
// popup and select menu are grey system controls that look nothing like the rest of the site
// and cannot be styled. On a device with a mouse the form uses the custom ones. On a phone or
// tablet (no hover, a coarse pointer) it uses the native <input type="date"> and <select>,
// which there are the platform's own wheel and sheet pickers and are better than anything
// drawn in a web page. Either way the values go into the form in the same shape.
//
// Both popovers are rendered into the booking sheet (or the page, outside it), positioned
// from the field they belong to, flipped above it when there is no room below, kept inside the
// booking panel, and closed by Escape, a click elsewhere, or scrolling.

import {
  Children,
  Fragment,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import { createPortal } from 'react-dom'
import { useLocale, useTranslations } from 'next-intl'
import { CalendarIcon, CheckIcon, ChevronDownIcon } from '@/components/icons'
import { todayInIndia } from '@/lib/appointment'

/* -------------------------------------------------------------------------------------- */
/* Pointer type                                                                            */
/* -------------------------------------------------------------------------------------- */

const FINE_POINTER = '(hover: hover) and (pointer: fine)'

function subscribeFine(callback: () => void) {
  const query = window.matchMedia(FINE_POINTER)
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}

/** True on a device with a mouse or trackpad. False while rendering on the server. */
function useFinePointer(): boolean {
  return useSyncExternalStore(
    subscribeFine,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  )
}

/* -------------------------------------------------------------------------------------- */
/* Layout: group, row, cell                                                                */
/* -------------------------------------------------------------------------------------- */

/**
 * A titled card of rows, with small grey notes under it (the way an iOS list has a footer).
 * `hidden` also disables the fieldset, so its fields leave the submission but keep what was
 * typed.
 */
export function Group({
  title,
  hidden = false,
  notes,
  children,
}: {
  title: string
  hidden?: boolean
  /** Short notes under the card. Each `id` is what a field's aria-describedby points at. */
  notes?: { id: string; text: string }[]
  children: React.ReactNode
}) {
  return (
    <fieldset
      disabled={hidden}
      className={['m-0 min-w-0 border-0 p-0', hidden ? 'hidden' : ''].join(' ')}
    >
      <legend className="mb-1.5 px-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-dark-base/55">
        {title}
      </legend>
      <div className="divide-y divide-brand-teal/10 overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(11,20,22,0.05),0_10px_26px_-14px_rgba(11,20,22,0.16)]">
        {children}
      </div>
      {notes?.map((note) => (
        <p
          key={note.id}
          id={note.id}
          className="px-3 pt-1.5 text-[11px] leading-snug text-brand-dark-base/55"
        >
          {note.text}
        </p>
      ))}
    </fieldset>
  )
}

/** Two cells side by side from `sm` up (a hairline between them), stacked on a phone. */
export function PairRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 divide-y divide-brand-teal/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
      {children}
    </div>
  )
}

/** A bare wrapper that switches a group of rows off (hidden + disabled) together. */
export function NewOnly({
  active,
  children,
}: {
  active: boolean
  children: React.ReactNode
}) {
  return (
    <fieldset disabled={!active} className={`m-0 min-w-0 border-0 p-0 ${active ? '' : 'hidden'}`}>
      {children}
    </fieldset>
  )
}

/**
 * One row: the label, then the control. The whole row lights up when you are in it. An error
 * turns the row red and says why underneath, indented to line up with the control.
 */
export function Cell({
  id,
  label,
  required = false,
  error,
  half = false,
  hideLabel = false,
  labelSlot,
  top = false,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  /** One of a pair: a narrower label column. */
  half?: boolean
  /** Align to the top of the row (a box taller than one line, like the notes). */
  top?: boolean
  /** Name it for assistive tech only (its meaning is clear from the row). */
  hideLabel?: boolean
  /** Something other than the label text in the label column (the Age | DOB switch). */
  labelSlot?: React.ReactNode
  children: React.ReactNode
}) {
  const labelWidth = half ? 'w-[6.25rem] sm:w-[4.75rem]' : 'w-[6.25rem] sm:w-[6.75rem]'
  return (
    <div
      className={[
        'group/cell relative flex min-w-0 flex-col px-3.5 transition-[background-color,box-shadow] duration-150',
        'focus-within:bg-brand-teal/[0.05] focus-within:shadow-[inset_0_0_0_2px_rgba(15,91,102,0.26)]',
        error ? 'bg-brand-emergency/[0.04] shadow-[inset_0_0_0_2px_rgba(198,40,40,0.4)]' : '',
      ].join(' ')}
    >
      <div className={`flex min-h-[44px] gap-2.5 ${top ? 'items-start' : 'items-center'}`}>
        {labelSlot ? (
          <div className="shrink-0">{labelSlot}</div>
        ) : (
          <label
            htmlFor={id}
            className={[
              'shrink-0 text-[13px] font-medium leading-tight transition-colors',
              error
                ? 'text-brand-emergency'
                : 'text-brand-dark-base/65 group-focus-within/cell:text-brand-teal',
              top ? 'pt-3.5' : '',
              hideLabel ? 'sr-only' : labelWidth,
            ].join(' ')}
          >
            {label}
            {required && (
              <span aria-hidden="true" className="text-brand-copper-ink">
                {' '}
                *
              </span>
            )}
          </label>
        )}
        <div className={`flex min-w-0 flex-1 gap-2 ${top ? 'items-start' : 'items-center'}`}>
          {children}
        </div>
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className={`pb-2 text-xs font-semibold text-brand-emergency ${hideLabel ? '' : half ? 'sm:pl-[5.25rem]' : 'sm:pl-[7.25rem]'} pl-[6.75rem]`}
        >
          {error}
        </p>
      )}
    </div>
  )
}

function describedBy(id: string, hintId?: string, error?: string): string | undefined {
  return [hintId ?? '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined
}

/** Bare field: no box of its own, the row is the box. */
const CONTROL =
  'min-h-[44px] w-full min-w-0 bg-transparent text-[15px] text-brand-dark-base outline-none placeholder:text-brand-dark-base/35 focus-visible:outline-none'

/* -------------------------------------------------------------------------------------- */
/* Text                                                                                    */
/* -------------------------------------------------------------------------------------- */

export function TextField({
  id,
  name,
  label,
  hintId,
  error,
  optional = false,
  half = false,
  hideLabel = false,
  type = 'text',
  ...rest
}: {
  id: string
  name: string
  label: string
  /** The id of the note under the group that explains this field. */
  hintId?: string
  error?: string
  optional?: boolean
  half?: boolean
  hideLabel?: boolean
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'name'>) {
  return (
    <Cell id={id} label={label} required={!optional} error={error} half={half} hideLabel={hideLabel}>
      <input
        id={id}
        name={name}
        type={type}
        aria-required={!optional || undefined}
        // The error is wired to the input with aria-describedby and aria-invalid, so a
        // screen reader announces it on focus. A red row alone says nothing.
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hintId, error)}
        className={CONTROL}
        {...rest}
      />
    </Cell>
  )
}

/* -------------------------------------------------------------------------------------- */
/* Popover                                                                                 */
/* -------------------------------------------------------------------------------------- */

/**
 * A floating panel anchored to a field. Placed under it, or over it when the bottom is
 * short of room, and kept inside the booking panel (or the window, on the page). The first
 * paint is already in place: it is measured in a layout effect, before the browser draws.
 */
function Popover({
  id,
  anchor,
  onClose,
  matchWidth = false,
  minWidth = 0,
  role,
  label,
  className = '',
  children,
}: {
  id?: string
  anchor: HTMLElement
  /** `refocus` is true when the trigger should get focus back (Escape, a choice made). */
  onClose: (refocus?: boolean) => void
  matchWidth?: boolean
  minWidth?: number
  role: 'dialog' | 'listbox'
  label: string
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [place, setPlace] = useState<{ top: number; left: number; origin: string } | null>(null)
  const host = (anchor.closest('[role="dialog"]') as HTMLElement | null) ?? document.body

  useLayoutEffect(() => {
    const pop = ref.current
    if (!pop) return
    const a = anchor.getBoundingClientRect()
    const panel = anchor.closest('[data-booking-panel]')
    const b = panel
      ? panel.getBoundingClientRect()
      : { top: 0, left: 0, right: window.innerWidth, bottom: window.innerHeight }
    const margin = 8

    pop.style.width = matchWidth || minWidth ? `${Math.max(matchWidth ? a.width : 0, minWidth)}px` : ''
    const { width, height } = pop.getBoundingClientRect()

    let top = a.bottom + 6
    let above = false
    if (top + height > b.bottom - margin) {
      const over = a.top - 6 - height
      if (over >= b.top + margin) {
        top = over
        above = true
      } else {
        top = Math.max(b.top + margin, b.bottom - margin - height)
      }
    }
    const left = Math.max(b.left + margin, Math.min(a.left, b.right - margin - width))
    setPlace({
      top,
      left,
      origin: `${Math.min(Math.max(a.left + Math.min(a.width, 48) - left, 0), width)}px ${above ? '100%' : '0'}`,
    })
  }, [anchor, matchWidth, minWidth])

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node
      if (ref.current?.contains(target) || anchor.contains(target)) return
      onClose()
      // A tap on the dimmed edge only dismisses this popover; it must not also close the
      // whole booking sheet behind it.
      if ((target as Element).closest?.('[data-booking-scrim]')) {
        const swallow = (click: Event) => {
          click.stopPropagation()
          click.preventDefault()
        }
        document.addEventListener('click', swallow, { capture: true, once: true })
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      // Closes THIS popover only: the sheet's own Escape handler must not see it.
      event.stopImmediatePropagation()
      event.preventDefault()
      onClose(true)
    }
    function onScroll(event: Event) {
      if (ref.current && event.target instanceof Node && ref.current.contains(event.target)) return
      onClose()
    }
    const onResize = () => onClose()
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('keydown', onKeyDown, true)
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('keydown', onKeyDown, true)
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onResize)
    }
  }, [anchor, onClose])

  return createPortal(
    <div
      ref={ref}
      id={id}
      role={role}
      aria-label={label}
      aria-modal={role === 'dialog' ? false : undefined}
      className={[
        'popover-in fixed z-[90] rounded-2xl bg-white/90 shadow-[0_28px_64px_-20px_rgba(11,20,22,0.5),0_0_0_1px_rgba(11,20,22,0.06)] backdrop-blur-xl',
        '[@media(prefers-reduced-transparency:reduce)]:bg-white [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none',
        className,
      ].join(' ')}
      style={{
        top: place?.top ?? 0,
        left: place?.left ?? 0,
        // Not `visibility: hidden`: that cannot take focus, and the list and calendar focus
        // themselves the moment they open, before this has been measured.
        opacity: place ? undefined : 0,
        pointerEvents: place ? undefined : 'none',
        transformOrigin: place?.origin,
      }}
    >
      {children}
    </div>,
    host,
  )
}

/* -------------------------------------------------------------------------------------- */
/* Dropdown menu                                                                           */
/* -------------------------------------------------------------------------------------- */

type MenuItem =
  | { kind: 'group'; label: string }
  | { kind: 'option'; value: string; label: string }

/** Reads <option> / <optgroup> children (the same markup the native select takes). */
function readOptions(children: React.ReactNode): MenuItem[] {
  const items: MenuItem[] = []
  const text = (node: React.ReactNode) =>
    Children.toArray(node)
      .map((part) => (typeof part === 'string' || typeof part === 'number' ? String(part) : ''))
      .join('')
  Children.toArray(children).forEach((child) => {
    if (!isValidElement(child)) return
    const props = child.props as { value?: string; label?: string; children?: React.ReactNode }
    if (child.type === Fragment) {
      readOptions(props.children).forEach((item) => items.push(item))
    } else if (child.type === 'optgroup') {
      items.push({ kind: 'group', label: props.label ?? '' })
      readOptions(props.children).forEach((item) => items.push(item))
    } else if (child.type === 'option') {
      items.push({ kind: 'option', value: String(props.value ?? ''), label: text(props.children) })
    }
  })
  return items
}

export function SelectControl({
  id,
  name,
  defaultValue = '',
  invalid,
  describedByIds,
  required,
  compact = false,
  ariaLabel,
  children,
}: {
  id: string
  name: string
  defaultValue?: string
  invalid?: boolean
  describedByIds?: string
  required?: boolean
  /** A narrow control for the title (Mr., Mrs.) beside a name. */
  compact?: boolean
  /** The name for a control whose row label belongs to a neighbour (the title beside a name). */
  ariaLabel?: string
  children: React.ReactNode
}) {
  const fine = useFinePointer()
  if (!fine) {
    return (
      <div className={`relative ${compact ? 'w-[4.25rem] shrink-0' : 'w-full'} min-w-0`}>
        <select
          id={id}
          name={name}
          defaultValue={defaultValue}
          aria-invalid={invalid ? true : undefined}
          aria-describedby={describedByIds}
          aria-required={required || undefined}
          aria-label={ariaLabel}
          className={`${CONTROL} appearance-none pr-6`}
        >
          {children}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-dark-base/45" />
      </div>
    )
  }
  return (
    <MenuSelect
      id={id}
      name={name}
      defaultValue={defaultValue}
      invalid={invalid}
      describedByIds={describedByIds}
      required={required}
      compact={compact}
      ariaLabel={ariaLabel}
    >
      {children}
    </MenuSelect>
  )
}

function MenuSelect({
  id,
  name,
  defaultValue,
  invalid,
  describedByIds,
  required,
  compact,
  ariaLabel,
  children,
}: {
  id: string
  name: string
  defaultValue: string
  invalid?: boolean
  describedByIds?: string
  required?: boolean
  compact: boolean
  ariaLabel?: string
  children: React.ReactNode
}) {
  const items = readOptions(children)
  const options = items.filter((item): item is Extract<MenuItem, { kind: 'option' }> => item.kind === 'option')
  const [value, setValue] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const hiddenRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const typed = useRef({ text: '', at: 0 })
  const reported = useRef(value)

  const selected = options.find((option) => option.value === value)
  const empty = value === ''

  // Tell the form something changed (it listens for input events to know it is dirty). Compared
  // with the last value reported rather than "skip the first run", which React's development
  // double-run of effects would defeat.
  useEffect(() => {
    if (reported.current === value) return
    reported.current = value
    hiddenRef.current?.dispatchEvent(new Event('input', { bubbles: true }))
  }, [value])

  function openMenu() {
    setActive(Math.max(0, options.findIndex((option) => option.value === value)))
    setOpen(true)
  }
  const close = (refocus = false) => {
    setOpen(false)
    if (refocus) triggerRef.current?.focus()
  }
  function choose(option: { value: string }) {
    setValue(option.value)
    close(true)
  }

  // The list takes focus when it opens, and keeps the active row in view.
  useEffect(() => {
    if (!open) return
    listRef.current?.focus({ preventScroll: true })
  }, [open])
  useEffect(() => {
    if (!open) return
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [open, active])

  function onListKeyDown(event: React.KeyboardEvent) {
    const last = options.length - 1
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setActive((current) => Math.min(last, current + 1))
        break
      case 'ArrowUp':
        event.preventDefault()
        setActive((current) => Math.max(0, current - 1))
        break
      case 'Home':
        event.preventDefault()
        setActive(0)
        break
      case 'End':
        event.preventDefault()
        setActive(last)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (options[active]) choose(options[active])
        break
      case 'Tab':
        close()
        break
      default: {
        if (event.key.length !== 1 || event.metaKey || event.ctrlKey || event.altKey) return
        const now = Date.now()
        const buffer = now - typed.current.at > 700 ? event.key : typed.current.text + event.key
        typed.current = { text: buffer, at: now }
        const match = options.findIndex((option) =>
          option.label.toLowerCase().startsWith(buffer.toLowerCase()),
        )
        if (match >= 0) setActive(match)
      }
    }
  }

  let optionIndex = -1
  return (
    <div className={compact ? 'w-[4.5rem] shrink-0' : 'min-w-0 flex-1'}>
      <input ref={hiddenRef} type="hidden" name={name} value={value} />
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? `${id}-list` : undefined}
        aria-invalid={invalid ? true : undefined}
        aria-describedby={describedByIds}
        aria-required={required || undefined}
        aria-label={ariaLabel}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={(event) => {
          if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
            event.preventDefault()
            openMenu()
          }
        }}
        className={`${CONTROL} flex items-center justify-between gap-1.5 text-left`}
      >
        <span className={`truncate ${empty ? 'text-brand-dark-base/40' : ''}`}>
          {selected?.label ?? ''}
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 text-brand-dark-base/45 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && triggerRef.current && (
        <Popover
          anchor={triggerRef.current}
          onClose={close}
          matchWidth
          minWidth={compact ? 150 : 220}
          role="listbox"
          label={selected?.label ?? ''}
          className="p-1.5"
        >
          <div
            ref={listRef}
            id={`${id}-list`}
            role="listbox"
            tabIndex={-1}
            aria-activedescendant={`${id}-opt-${active}`}
            onKeyDown={onListKeyDown}
            className="max-h-[min(20rem,50dvh)] overflow-y-auto overscroll-contain outline-none"
          >
            {items.map((item, position) => {
              if (item.kind === 'group') {
                return (
                  <div
                    key={`g-${position}`}
                    role="presentation"
                    className="px-3 pb-1 pt-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-dark-base/45"
                  >
                    {item.label}
                  </div>
                )
              }
              optionIndex += 1
              const index = optionIndex
              const isSelected = item.value === value
              return (
                <div
                  key={`${item.value}-${position}`}
                  id={`${id}-opt-${index}`}
                  data-index={index}
                  role="option"
                  aria-selected={isSelected}
                  onPointerMove={() => setActive(index)}
                  onClick={() => choose(item)}
                  className={[
                    'flex min-h-[36px] cursor-default items-center justify-between gap-3 rounded-lg px-3 py-1.5 text-sm leading-snug transition-colors',
                    index === active ? 'bg-brand-teal/10' : '',
                    isSelected ? 'font-semibold text-brand-teal' : 'text-brand-dark-base',
                  ].join(' ')}
                >
                  <span>{item.label}</span>
                  {isSelected && <CheckIcon className="h-4 w-4 shrink-0" strokeWidth={2.4} />}
                </div>
              )
            })}
          </div>
        </Popover>
      )}
    </div>
  )
}

/** A row with a dropdown in it. */
export function SelectField({
  id,
  name,
  label,
  error,
  optional = false,
  half = false,
  defaultValue = '',
  hintId,
  children,
}: {
  id: string
  name: string
  label: string
  error?: string
  optional?: boolean
  half?: boolean
  defaultValue?: string
  hintId?: string
  children: React.ReactNode
}) {
  return (
    <Cell id={id} label={label} required={!optional} error={error} half={half}>
      <SelectControl
        id={id}
        name={name}
        defaultValue={defaultValue}
        invalid={!!error}
        describedByIds={describedBy(id, hintId, error)}
        required={!optional}
      >
        {children}
      </SelectControl>
    </Cell>
  )
}

/* -------------------------------------------------------------------------------------- */
/* Calendar                                                                                */
/* -------------------------------------------------------------------------------------- */

const pad = (n: number) => String(n).padStart(2, '0')
const toISO = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`
function parseISO(value: string) {
  const [y, m, d] = value.split('-').map(Number)
  return { y, m: m - 1, d }
}
const daysIn = (y: number, m: number) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate()
/** 0 = Monday. */
const firstWeekday = (y: number, m: number) => (new Date(Date.UTC(y, m, 1)).getUTCDay() + 6) % 7
function shiftDays(value: string, days: number) {
  const { y, m, d } = parseISO(value)
  const t = new Date(Date.UTC(y, m, d + days))
  return toISO(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate())
}
function shiftMonths(value: string, months: number) {
  const { y, m, d } = parseISO(value)
  const total = y * 12 + m + months
  const ny = Math.floor(total / 12)
  const nm = ((total % 12) + 12) % 12
  return toISO(ny, nm, Math.min(d, daysIn(ny, nm)))
}
const clamp = (value: string, min: string, max: string) => (value < min ? min : value > max ? max : value)

const LOCALE_TAG: Record<string, string> = { en: 'en-IN', hi: 'hi-IN', pa: 'pa-IN' }

function useFormatters() {
  const locale = useLocale()
  const tag = LOCALE_TAG[locale] ?? 'en-IN'
  return useMemo(() => {
    const utc = (options: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat(tag, { timeZone: 'UTC', ...options })
    const at = (y: number, m: number, d = 1) => new Date(Date.UTC(y, m, d))
    return {
      full: (iso: string) => {
        const { y, m, d } = parseISO(iso)
        return utc({ day: 'numeric', month: 'short', year: 'numeric' }).format(at(y, m, d))
      },
      long: (iso: string) => {
        const { y, m, d } = parseISO(iso)
        return utc({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(at(y, m, d))
      },
      monthYear: (y: number, m: number) => utc({ month: 'long', year: 'numeric' }).format(at(y, m)),
      monthShort: (y: number, m: number) => utc({ month: 'short' }).format(at(y, m)),
      // 2024-01-01 was a Monday.
      weekday: (index: number) =>
        utc({ weekday: locale === 'en' ? 'narrow' : 'short' }).format(at(2024, 0, 1 + index)),
      year: (y: number) => utc({ year: 'numeric' }).format(at(y, 0)),
    }
  }, [tag, locale])
}

type CalendarView = 'days' | 'months' | 'years'

function Calendar({
  value,
  min,
  max,
  showToday,
  onSelect,
}: {
  value: string
  min: string
  max: string
  showToday: boolean
  onSelect: (iso: string) => void
}) {
  const t = useTranslations('appointmentForm')
  const f = useFormatters()
  const today = todayInIndia()
  const start = value || clamp(today, min, max)

  const [view, setView] = useState<CalendarView>('days')
  const [cursor, setCursor] = useState(() => {
    const { y, m } = parseISO(start)
    return { y, m }
  })
  const [focusISO, setFocusISO] = useState(start)
  const [direction, setDirection] = useState<1 | -1>(1)
  const gridRef = useRef<HTMLDivElement>(null)
  const wantFocus = useRef(true)

  const minY = parseISO(min).y
  const maxY = parseISO(max).y
  const monthFirst = toISO(cursor.y, cursor.m, 1)
  const monthLast = toISO(cursor.y, cursor.m, daysIn(cursor.y, cursor.m))
  const canPrev = view === 'days' ? monthFirst > min : view === 'months' ? cursor.y > minY : cursor.y - 12 >= minY - 11
  const canNext = view === 'days' ? monthLast < max : view === 'months' ? cursor.y < maxY : cursor.y + 12 <= maxY

  function step(by: 1 | -1) {
    // Focus stays on the arrow that was pressed; only the arrow keys move it into the days.
    wantFocus.current = false
    setDirection(by)
    if (view === 'days') {
      const next = shiftMonths(monthFirst, by)
      const { y, m } = parseISO(next)
      setCursor({ y, m })
      setFocusISO(clamp(shiftMonths(focusISO, by), min, max))
    } else if (view === 'months') {
      setCursor((c) => ({ ...c, y: c.y + by }))
    } else {
      setCursor((c) => ({ ...c, y: c.y + by * 12 }))
    }
  }

  // Keep real keyboard focus on the day the arrow keys moved to.
  useEffect(() => {
    if (view !== 'days' || !wantFocus.current) return
    gridRef.current?.querySelector<HTMLElement>(`[data-iso="${focusISO}"]`)?.focus({ preventScroll: true })
  }, [focusISO, cursor, view])

  function onGridKeyDown(event: React.KeyboardEvent) {
    const moves: Record<string, (from: string) => string> = {
      ArrowLeft: (from) => shiftDays(from, -1),
      ArrowRight: (from) => shiftDays(from, 1),
      ArrowUp: (from) => shiftDays(from, -7),
      ArrowDown: (from) => shiftDays(from, 7),
      Home: (from) => shiftDays(from, -firstWeekdayOf(from)),
      End: (from) => shiftDays(from, 6 - firstWeekdayOf(from)),
      PageUp: (from) => shiftMonths(from, event.shiftKey ? -12 : -1),
      PageDown: (from) => shiftMonths(from, event.shiftKey ? 12 : 1),
    }
    const move = moves[event.key]
    if (!move) return
    event.preventDefault()
    const next = clamp(move(focusISO), min, max)
    const { y, m } = parseISO(next)
    if (y !== cursor.y || m !== cursor.m) setDirection(next > focusISO ? 1 : -1)
    wantFocus.current = true
    setCursor({ y, m })
    setFocusISO(next)
  }
  function firstWeekdayOf(iso: string) {
    const { y, m, d } = parseISO(iso)
    return (new Date(Date.UTC(y, m, d)).getUTCDay() + 6) % 7
  }

  const heading =
    view === 'days' ? f.monthYear(cursor.y, cursor.m) : view === 'months' ? f.year(cursor.y) : `${f.year(cursor.y - (cursor.y % 12))} – ${f.year(cursor.y - (cursor.y % 12) + 11)}`
  const decadeStart = cursor.y - (cursor.y % 12)

  const arrow = (by: 1 | -1, enabled: boolean, label: string) => (
    <button
      type="button"
      onClick={() => step(by)}
      disabled={!enabled}
      aria-label={label}
      className="press grid h-8 w-8 place-items-center rounded-full text-brand-teal transition-colors hover:bg-brand-teal/10 disabled:pointer-events-none disabled:text-brand-dark-base/20"
    >
      <ChevronDownIcon className={`h-4 w-4 ${by === -1 ? 'rotate-90' : '-rotate-90'}`} strokeWidth={2.4} />
    </button>
  )

  return (
    <div className="w-[17.5rem] select-none p-3 sm:w-[19rem]">
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setView(view === 'days' ? 'months' : view === 'months' ? 'years' : 'days')}
          aria-label={t('chooseMonthYear')}
          className="press flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[15px] font-semibold tracking-tight transition-colors hover:bg-brand-teal/10"
        >
          {heading}
          <ChevronDownIcon
            className={`h-3.5 w-3.5 text-brand-teal transition-transform duration-200 ${view === 'days' ? '' : 'rotate-180'}`}
            strokeWidth={2.6}
          />
        </button>
        <div className="flex items-center gap-0.5">
          {arrow(-1, canPrev, view === 'days' ? t('prevMonth') : view === 'months' ? t('prevYear') : t('prevYears'))}
          {arrow(1, canNext, view === 'days' ? t('nextMonth') : view === 'months' ? t('nextYear') : t('nextYears'))}
        </div>
      </div>

      <div className="min-h-[15.75rem]">
        {view === 'days' && (
          <div role="grid" aria-label={f.monthYear(cursor.y, cursor.m)}>
            <div className="mb-1 grid grid-cols-7 text-center text-[11px] font-semibold uppercase text-brand-dark-base/45" role="row">
              {Array.from({ length: 7 }, (_, index) => (
                <span key={index} role="columnheader" className="py-1">
                  {f.weekday(index)}
                </span>
              ))}
            </div>
            <div
              ref={gridRef}
              key={`${cursor.y}-${cursor.m}`}
              onKeyDown={onGridKeyDown}
              className={direction === 1 ? 'cal-slide-next grid grid-cols-7' : 'cal-slide-prev grid grid-cols-7'}
            >
              {Array.from({ length: firstWeekday(cursor.y, cursor.m) }, (_, index) => (
                <span key={`b${index}`} />
              ))}
              {Array.from({ length: daysIn(cursor.y, cursor.m) }, (_, index) => {
                const iso = toISO(cursor.y, cursor.m, index + 1)
                const disabled = iso < min || iso > max
                const isSelected = iso === value
                const isToday = iso === today
                return (
                  <button
                    key={iso}
                    type="button"
                    data-iso={iso}
                    role="gridcell"
                    disabled={disabled}
                    tabIndex={iso === focusISO ? 0 : -1}
                    aria-selected={isSelected}
                    aria-current={isToday ? 'date' : undefined}
                    aria-label={f.long(iso)}
                    onClick={() => onSelect(iso)}
                    onFocus={() => {
                      wantFocus.current = true
                      setFocusISO(iso)
                    }}
                    className={[
                      'mx-auto grid h-10 w-10 place-items-center rounded-full text-[15px] tabular-nums transition-[background-color,transform,color] duration-150 active:scale-90',
                      disabled ? 'pointer-events-none text-brand-dark-base/20' : '',
                      isSelected
                        ? 'bg-brand-teal font-semibold text-white shadow-[0_8px_16px_-8px_rgba(15,91,102,0.8)]'
                        : isToday
                          ? 'font-bold text-brand-teal ring-1 ring-inset ring-brand-teal/35 hover:bg-brand-teal/10'
                          : 'hover:bg-brand-teal/10',
                    ].join(' ')}
                  >
                    {index + 1}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {view === 'months' && (
          <div key={`m${cursor.y}`} className="cal-zoom grid grid-cols-3 gap-1.5 pt-1">
            {Array.from({ length: 12 }, (_, month) => {
              const first = toISO(cursor.y, month, 1)
              const last = toISO(cursor.y, month, daysIn(cursor.y, month))
              const disabled = last < min || first > max
              const current = cursor.m === month
              return (
                <button
                  key={month}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    setCursor({ y: cursor.y, m: month })
                    setFocusISO(clamp(toISO(cursor.y, month, Math.min(parseISO(focusISO).d, daysIn(cursor.y, month))), min, max))
                    setView('days')
                  }}
                  className={[
                    'press h-[3.25rem] rounded-2xl text-[15px] font-medium capitalize transition-colors',
                    disabled ? 'pointer-events-none text-brand-dark-base/20' : 'hover:bg-brand-teal/10',
                    current ? 'bg-brand-teal font-semibold text-white hover:bg-brand-teal' : '',
                  ].join(' ')}
                >
                  {f.monthShort(cursor.y, month)}
                </button>
              )
            })}
          </div>
        )}

        {view === 'years' && (
          <div key={`y${decadeStart}`} className="cal-zoom grid grid-cols-3 gap-1.5 pt-1">
            {Array.from({ length: 12 }, (_, index) => {
              const year = decadeStart + index
              const disabled = year < minY || year > maxY
              const current = year === cursor.y
              return (
                <button
                  key={year}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    setCursor((c) => ({ ...c, y: year }))
                    setView('months')
                  }}
                  className={[
                    'press h-[3.25rem] rounded-2xl text-[15px] font-medium tabular-nums transition-colors',
                    disabled ? 'pointer-events-none text-brand-dark-base/20' : 'hover:bg-brand-teal/10',
                    current ? 'bg-brand-teal font-semibold text-white hover:bg-brand-teal' : '',
                  ].join(' ')}
                >
                  {f.year(year)}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {showToday && (
        <div className="mt-1 flex justify-end border-t border-brand-teal/10 pt-2">
          <button
            type="button"
            disabled={today < min || today > max}
            onClick={() => onSelect(today)}
            className="press rounded-full px-3 py-1.5 text-sm font-semibold text-brand-teal transition-colors hover:bg-brand-teal/10 disabled:opacity-40"
          >
            {t('today')}
          </button>
        </div>
      )}
    </div>
  )
}

export function DateControl({
  id,
  name,
  min,
  max,
  showToday = false,
  invalid,
  describedByIds,
  required,
}: {
  id: string
  name: string
  min: string
  max: string
  showToday?: boolean
  invalid?: boolean
  describedByIds?: string
  required?: boolean
}) {
  const t = useTranslations('appointmentForm')
  const f = useFormatters()
  const fine = useFinePointer()
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const hiddenRef = useRef<HTMLInputElement>(null)
  const reported = useRef(value)

  useEffect(() => {
    if (reported.current === value) return
    reported.current = value
    hiddenRef.current?.dispatchEvent(new Event('input', { bubbles: true }))
  }, [value])

  if (!fine) {
    // A phone or tablet: the platform's own date wheel is the better control there.
    return (
      <input
        id={id}
        name={name}
        type="date"
        min={min}
        max={max}
        aria-invalid={invalid ? true : undefined}
        aria-describedby={describedByIds}
        aria-required={required || undefined}
        className={CONTROL}
      />
    )
  }

  const close = (refocus = false) => {
    setOpen(false)
    if (refocus) triggerRef.current?.focus()
  }

  return (
    <div className="min-w-0 flex-1">
      <input ref={hiddenRef} type="hidden" name={name} value={value} />
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="dialog"
        aria-controls={`${id}-calendar`}
        aria-expanded={open}
        aria-invalid={invalid ? true : undefined}
        aria-describedby={describedByIds}
        aria-required={required || undefined}
        onClick={() => setOpen((current) => !current)}
        className={`${CONTROL} flex items-center justify-between gap-2 text-left`}
      >
        <span className={`truncate ${value ? '' : 'text-brand-dark-base/40'}`}>
          {value ? f.full(value) : t('selectDate')}
        </span>
        <CalendarIcon className="h-4 w-4 shrink-0 text-brand-teal" />
      </button>

      {open && triggerRef.current && (
        <Popover
          id={`${id}-calendar`}
          anchor={triggerRef.current}
          onClose={close}
          role="dialog"
          label={t('calendarLabel')}
        >
          <Calendar
            value={value}
            min={min}
            max={max}
            showToday={showToday}
            onSelect={(iso) => {
              setValue(iso)
              close(true)
            }}
          />
        </Popover>
      )}
    </div>
  )
}

/** A row with a date in it. */
export function DateField({
  id,
  name,
  label,
  error,
  optional = false,
  half = false,
  hideLabel = false,
  min,
  max,
  showToday,
  hintId,
}: {
  id: string
  name: string
  label: string
  error?: string
  optional?: boolean
  half?: boolean
  hideLabel?: boolean
  min: string
  max: string
  showToday?: boolean
  hintId?: string
}) {
  return (
    <Cell id={id} label={label} required={!optional} error={error} half={half} hideLabel={hideLabel}>
      <DateControl
        id={id}
        name={name}
        min={min}
        max={max}
        showToday={showToday}
        invalid={!!error}
        describedByIds={describedBy(id, hintId, error)}
        required={!optional}
      />
    </Cell>
  )
}

/* -------------------------------------------------------------------------------------- */
/* Segmented control and checkbox                                                          */
/* -------------------------------------------------------------------------------------- */

/**
 * A segmented control: two radio inputs under a sliding thumb (the iOS pattern), so the choice
 * is one glance and one tap, and the thumb travels instead of the selection blinking. They are
 * real radios, so the keyboard, the form submission and screen readers all behave.
 */
export function Segmented({
  label,
  labelledBy,
  name,
  value,
  onChange,
  options,
  small = false,
  block = false,
}: {
  label: string
  labelledBy?: string
  name: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  small?: boolean
  /** Fill the width it is given (the phone's title bar). */
  block?: boolean
}) {
  const index = Math.max(0, options.findIndex((option) => option.value === value))
  return (
    <div
      role="radiogroup"
      aria-label={labelledBy ? undefined : label}
      aria-labelledby={labelledBy}
      className={[
        'relative grid grid-cols-2 rounded-full bg-brand-mist',
        small ? 'p-0.5' : 'p-1',
        block ? 'w-full lg:inline-grid lg:w-auto' : 'inline-grid',
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className={[
          'segmented-thumb absolute rounded-full bg-white shadow-[0_1px_3px_rgba(11,20,22,0.18)]',
          small ? 'inset-y-0.5 left-0.5 w-[calc(50%-2px)]' : 'inset-y-1 left-1 w-[calc(50%-4px)]',
        ].join(' ')}
        style={{ transform: index === 0 ? 'translateX(0)' : 'translateX(100%)' }}
      />
      {options.map((option) => (
        <label key={option.value} className="relative z-10 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="peer sr-only"
          />
          <span
            className={[
              'tap-target press flex w-full items-center justify-center whitespace-nowrap rounded-full text-center font-semibold text-brand-dark-base/60 transition-colors',
              'peer-checked:text-brand-teal',
              'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-copper',
              small ? '!min-h-[28px] !min-w-0 px-2.5 text-[11px]' : '!min-h-[36px] px-5 text-sm',
            ].join(' ')}
          >
            {option.label}
          </span>
        </label>
      ))}
    </div>
  )
}

/** A round checkbox in the iOS style: an empty ring that fills with a tick. */
export function RoundCheckbox({
  name,
  invalid,
  describedByIds,
  children,
}: {
  name: string
  invalid?: boolean
  describedByIds?: string
  children: React.ReactNode
}) {
  return (
    <label className="flex min-h-[44px] cursor-pointer items-start gap-3 py-2.5 text-sm">
      <span className="relative mt-px grid h-6 w-6 shrink-0 place-items-center">
        <input
          type="checkbox"
          name={name}
          aria-invalid={invalid ? true : undefined}
          aria-describedby={describedByIds}
          className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-full border-2 border-brand-teal/35 bg-white transition-colors checked:border-brand-teal checked:bg-brand-teal aria-[invalid=true]:border-brand-emergency"
        />
        <CheckIcon
          strokeWidth={3}
          className="pointer-events-none relative h-3.5 w-3.5 scale-50 text-white opacity-0 transition-[opacity,transform] duration-200 peer-checked:scale-100 peer-checked:opacity-100"
        />
      </span>
      <span className="font-semibold leading-snug">{children}</span>
    </label>
  )
}
