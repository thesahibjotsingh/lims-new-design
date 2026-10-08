'use client'

// components/layout/AbhaPrompt.tsx
//
// The first-visit pop-up that points a new visitor at the government's ABHA ID sign-up (see
// components/primitives/AbhaCard.tsx for what the site does and does not say about ABHA).
//
// A CARD IN THE CORNER, NOT A MODAL. This is a hospital site: someone may arrive in a hurry for a
// phone number. So nothing is dimmed, the page behind stays usable and the header's emergency
// number stays reachable. Focus is never moved to it, and Escape or "Not now" puts it away. On a
// phone it floats above the bottom bar; from sm up it sits bottom right.
//
// ONCE PER TAB, AND "NOT NOW" IS ONLY "NOT NOW". It appears once each time the site is opened in a
// tab (a new tab, or the site opened again after closing it), and not again while that tab keeps
// browsing, so moving between pages or reloading never brings it back. If the visitor taps "Not
// now" or the close button, or ignores it, it is back the next time they open the site. It stops
// for good only when they tap "Create ABHA ID". There is no time limit and no cap on how often it
// returns: an earlier version waited 6 hours between showings and stopped after 3, and the
// hospital wanted it on every visit.
//
// What is remembered: that it was shown in THIS tab (sessionStorage, which a new tab does not
// share), and that the visitor took it up (localStorage, which lasts).
//
// Rules that exist to avoid nagging:
//   - It waits 3s after the page loads, so it never competes with the first paint.
//   - It waits for the tab to be visible (a link opened in a background tab is not "seen").
//   - It holds back while a sheet is open (booking, menu, search) or the visitor is typing in a
//     field, and tries again a few times, then gives up WITHOUT marking the tab, so it can still
//     show on the next page.
//   - If the tab cannot remember (sessionStorage blocked) it does not show at all: it could not
//     tell that it had already shown, and a pop-up on every page is worse than none.
//
// TO LOOK AT IT AGAIN in a tab where it has already shown, or after tapping "Create ABHA ID",
// open any page with ?abha=1. That ignores what is remembered and does not change it.
//
// Motion is in globals.css (.abha-popup): rises and fades in, leaves faster, fade only under
// "reduce motion".

import { useCallback, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowUpRightIcon, CloseIcon } from '@/components/icons'

/** sessionStorage: it has been shown in this tab. A new tab starts without it. */
const TAB_KEY = 'lims:abha-prompt-this-tab'
/** localStorage: the visitor tapped "Create ABHA ID", so never show it again. */
const DONE_KEY = 'lims:abha-prompt-done'
const DELAY_MS = 3000
const RETRY_MS = 3000
const MAX_TRIES = 6
const LEAVE_MS = 200

type Phase = 'hidden' | 'shown' | 'leaving'

/** Whether this tab may still be shown it. Throws if sessionStorage is unavailable. */
function mayShow(): boolean {
  if (window.sessionStorage.getItem(TAB_KEY) !== null) return false
  try {
    if (window.localStorage.getItem(DONE_KEY) !== null) return false
  } catch {
    // Cannot read "taken up": show it. Worst case it is offered again to someone who did.
  }
  return true
}

/** True while the visitor is in the middle of typing somewhere. */
function isTyping(): boolean {
  const el = document.activeElement as HTMLElement | null
  if (!el) return false
  const tag = el.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable
}

export function AbhaPrompt({ href }: { href: string }) {
  const t = useTranslations('abha')
  const [phase, setPhase] = useState<Phase>('hidden')

  useEffect(() => {
    const force = new URLSearchParams(window.location.search).get('abha') === '1'

    if (!force) {
      try {
        if (!mayShow()) return
      } catch {
        return // this tab cannot remember: do not show it
      }
    }

    let timer = 0
    let tries = 0
    let cancelled = false

    const attempt = () => {
      if (cancelled) return
      if (document.visibilityState !== 'visible') {
        document.addEventListener('visibilitychange', onVisible, { once: true })
        return
      }
      if (document.querySelector('[aria-modal="true"]') || isTyping()) {
        if (++tries < MAX_TRIES) timer = window.setTimeout(attempt, RETRY_MS)
        return
      }
      if (!force) {
        try {
          window.sessionStorage.setItem(TAB_KEY, '1')
        } catch {
          return
        }
      }
      setPhase('shown')
    }

    const onVisible = () => {
      timer = window.setTimeout(attempt, DELAY_MS)
    }

    timer = window.setTimeout(attempt, DELAY_MS)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  /** Puts it away. It is NOT a refusal: nothing is recorded, so it is back on the next visit. */
  const dismiss = useCallback(() => {
    setPhase('leaving')
    window.setTimeout(() => setPhase('hidden'), LEAVE_MS)
  }, [])

  /** They went to the sign-up: never ask again. (?abha=1 previews change nothing.) */
  const takeUp = useCallback(() => {
    if (new URLSearchParams(window.location.search).get('abha') !== '1') {
      try {
        window.localStorage.setItem(DONE_KEY, '1')
      } catch {
        // Nothing to record it in, so it may be offered again.
      }
    }
    dismiss()
  }, [dismiss])

  if (phase === 'hidden') return null

  return (
    <div
      role="region"
      aria-labelledby="abha-popup-title"
      data-leaving={phase === 'leaving' ? '' : undefined}
      onKeyDown={(event) => {
        if (event.key === 'Escape') dismiss()
      }}
      className="abha-popup fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom,0px)+6.25rem)] z-[55] mx-auto max-w-[26rem] origin-bottom overflow-hidden rounded-3xl border border-brand-teal/10 bg-white shadow-[0_30px_70px_-20px_rgba(11,20,22,0.5),0_10px_24px_-12px_rgba(11,20,22,0.25)] sm:left-auto sm:right-6 sm:mx-0 sm:w-[22.5rem] sm:origin-bottom-right lg:bottom-6"
    >
      <div aria-hidden="true">
        <PromptArt />
      </div>

      <button
        type="button"
        onClick={dismiss}
        aria-label={t('close')}
        className="tap-target press absolute right-2.5 top-2.5 h-10 w-10 rounded-full bg-white/90 text-brand-dark-base/65 shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-brand-dark-base"
      >
        <CloseIcon className="h-[18px] w-[18px]" strokeWidth={2} />
      </button>

      <div className="px-4 pb-4 pt-3.5 sm:px-5 sm:pb-5 sm:pt-4">
        <h2
          id="abha-popup-title"
          className="font-serif text-lg font-bold leading-tight tracking-tight text-brand-dark-base sm:text-xl"
        >
          {t('heading')}
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-brand-dark-base/70">{t('body')}</p>

        <div className="mt-4 flex items-center gap-2">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={takeUp}
            className="tap-target press focus-ring-inverse flex-1 gap-2 rounded-full bg-brand-teal px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-teal-dark sm:flex-none"
          >
            {t('button')}
            <ArrowUpRightIcon className="h-4 w-4" strokeWidth={2} />
            <span className="sr-only"> {t('opensNewTab')}</span>
          </a>
          <button
            type="button"
            onClick={dismiss}
            className="tap-target press rounded-full px-4 text-sm font-semibold text-brand-dark-base/60 transition-colors hover:bg-brand-mist hover:text-brand-dark-base"
          >
            {t('notNow')}
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * A health-ID card, drawn for this site: a teal card with a name line, a masked 14-digit number
 * and a copper tick. It is deliberately NOT the government's emblem or the portal's logo; the
 * link goes to the real portal, and this only says "an ID card". Shown at every screen size,
 * 100px tall on a phone and 120px from sm up. `slice` keeps the band full width and trims a few
 * pixels top and bottom, which the card sits well inside.
 */
function PromptArt() {
  return (
    <svg
      viewBox="0 0 360 120"
      preserveAspectRatio="xMidYMid slice"
      className="block h-[6.25rem] w-full sm:h-[7.5rem]"
      role="presentation"
    >
      <defs>
        <linearGradient id="abha-art-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E7F3F4" />
          <stop offset="1" stopColor="#CFE6E9" />
        </linearGradient>
        <linearGradient id="abha-art-card" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14707D" />
          <stop offset="1" stopColor="#0B3F47" />
        </linearGradient>
      </defs>
      <rect width="360" height="120" fill="url(#abha-art-bg)" />
      <circle cx="318" cy="18" r="46" fill="#FFFFFF" opacity="0.45" />
      <circle cx="40" cy="108" r="38" fill="#FFFFFF" opacity="0.35" />
      <g transform="rotate(-4 180 62)">
        <rect x="88" y="22" width="184" height="88" rx="12" fill="#0B1416" opacity="0.12" transform="translate(0 6)" />
        <rect x="88" y="22" width="184" height="88" rx="12" fill="url(#abha-art-card)" />
        <circle cx="116" cy="50" r="12" fill="#FFFFFF" opacity="0.92" />
        <path d="M116 46.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm-7 15c1.2-3.2 4-4.6 7-4.6s5.8 1.4 7 4.6" fill="#0F5B66" />
        <rect x="138" y="40" width="74" height="7" rx="3.5" fill="#FFFFFF" opacity="0.9" />
        <rect x="138" y="54" width="48" height="6" rx="3" fill="#FFFFFF" opacity="0.45" />
        <text
          x="104"
          y="92"
          fill="#FFFFFF"
          opacity="0.92"
          fontSize="13"
          fontWeight="600"
          letterSpacing="1.6"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
        >
          XX-XXXX-XXXX-XXXX
        </text>
        <circle cx="252" cy="32" r="15" fill="#C26E4E" />
        <circle cx="252" cy="32" r="15" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
        <path d="M245.5 32.4l4.2 4.2 7.2-8.2" fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}
