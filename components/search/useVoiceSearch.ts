'use client'

// components/search/useVoiceSearch.ts
//
// Search by speaking, using the browser's own speech recognition (the Web Speech API). Nothing is
// installed and nothing is sent by this site: the browser handles the microphone, and in Chrome and
// Safari it sends the audio to the browser maker's recogniser, which is why the button only listens
// when it is pressed and shows that it is listening.
//
// It speaks the page's language: English as spoken in India, Hindi, or Punjabi. Support varies by
// browser and phone (recent Chrome and Android: yes; Safari: English and Hindi, patchier for Punjabi;
// Firefox: none), so the button is simply absent where the browser has no recogniser.
//
// WHY THIS IS MORE THAN start() AND onresult
//
// The first press almost always works. The second is where phones and some browsers go wrong: the
// previous session is still letting go of the microphone, the new recogniser reports that it has
// started but never receives any sound, and the page sits on "Listening" while nothing is heard.
// So this hook does not take "start() did not throw" to mean "listening":
//
//   - "Listening" is shown only once the browser reports that audio is flowing (audiostart, or the
//     first sound or result). Until then the box says the microphone is getting ready.
//   - Every press builds a new recogniser, and the old one is dropped first: its handlers are removed,
//     so a late event from a finished session cannot overwrite the new one.
//   - A new session waits a moment after the last one ended, so the microphone has been released.
//   - If audio never starts within a few seconds, or the session ends without ever having started it,
//     the recogniser is thrown away and one fresh attempt is made before the reader is told it failed.
//   - Only one search box on the page listens at a time (the header, the hero and the phone sheet each
//     have their own button).
//
// iPHONE AND iPAD: NOT OFFERED. Two screen recordings (9 Oct 2026) showed the same thing every time. The
// first session works. Every later one reports "start" and "audiostart" and then delivers nothing for as
// long as it is left open: no sound, no result, no error, no end. The phone's own microphone was fine (the
// screen recording kept hearing the reader); it is WebKit's speech capture that stays deaf after its first
// session. Keeping one recogniser and resetting the audio session did not change it, and Chrome on iPhone
// uses the same engine. So on iPhone and iPad this button is not shown, and the search box says to use the
// microphone on the phone's own keyboard instead, which is a system feature and always works.
//
// Anywhere else, a session that is "listening" but hears no sound at all for 8 seconds is stopped and the
// reader is told, with the same keyboard-microphone hint on phones.
//
// Add ?voicedebug=1 to any address to see, on screen, what the browser reports at each step. That is
// how a device that still misbehaves can be diagnosed without a computer attached.

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Locale } from '@/i18n/routing'

interface RecognitionAlternative {
  transcript: string
}
interface RecognitionResult {
  isFinal: boolean
  0: RecognitionAlternative
}
interface RecognitionEvent {
  results: ArrayLike<RecognitionResult>
}
interface RecognitionErrorEvent {
  error: string
}
interface Recognition {
  lang: string
  interimResults: boolean
  continuous: boolean
  maxAlternatives: number
  onstart: (() => void) | null
  onaudiostart: (() => void) | null
  onsoundstart: (() => void) | null
  onspeechstart: (() => void) | null
  onaudioend: (() => void) | null
  onsoundend: (() => void) | null
  onspeechend: (() => void) | null
  onnomatch: (() => void) | null
  onresult: ((event: RecognitionEvent) => void) | null
  onerror: ((event: RecognitionErrorEvent) => void) | null
  onend: (() => void) | null
  start(): void
  stop(): void
  abort(): void
}
type RecognitionConstructor = new () => Recognition

const LANGUAGE: Record<Locale, string> = { en: 'en-IN', hi: 'hi-IN', pa: 'pa-IN' }

/** Quiet time after one session ends before the next may start, so the microphone is released. */
const GAP_MS = 250
/** How long to wait for audio to start flowing before the recogniser is judged dead. */
const READY_MS = 4000
/** After stop(), how long to wait for the browser to finish before giving up on it. */
const STOP_MS = 2000
/** "Listening" but no sound at all for this long: the microphone is not delivering anything. */
const DEAF_MS = 8000

export type VoiceError = 'denied' | 'silent' | 'failed' | null

export interface Voice {
  /** The browser can listen. When false, show no button. */
  supported: boolean
  /** A session is open (starting or listening). Drives the button. */
  listening: boolean
  /** Audio is actually flowing: the reader can speak now. */
  ready: boolean
  /** A phone's own keyboard microphone is the better route: this device's attempt came back empty. */
  hint: boolean
  /** iPhone and iPad: speech capture goes deaf after one use, so the keyboard microphone is the way. */
  keyboardOnly: boolean
  error: VoiceError
  toggle: () => void
  stop: () => void
}

function constructorFor(): RecognitionConstructor | undefined {
  if (typeof window === 'undefined') return undefined
  const scope = window as unknown as {
    SpeechRecognition?: RecognitionConstructor
    webkitSpeechRecognition?: RecognitionConstructor
  }
  return scope.SpeechRecognition ?? scope.webkitSpeechRecognition
}

function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

/** Every search box has its own hook; this lets one silence the others before it listens. */
const halts = new Set<() => void>()

/** On-screen log, only when the address has ?voicedebug. */
function trace(message: string): void {
  if (typeof window === 'undefined' || !/[?&]voicedebug\b/.test(window.location.search)) return
  console.debug('[voice]', message)
  let box = document.getElementById('voice-debug')
  if (!box) {
    box = document.createElement('pre')
    box.id = 'voice-debug'
    box.style.cssText =
      'position:fixed;left:0;right:0;bottom:0;z-index:2147483647;margin:0;padding:6px 8px;max-height:34vh;' +
      'overflow:hidden;background:rgba(0,0,0,.88);color:#9f9;font:11px/1.35 monospace;pointer-events:none;' +
      'white-space:pre-wrap'
    document.body.appendChild(box)
  }
  const stamp = new Date().toISOString().slice(14, 23)
  box.textContent = `${box.textContent ?? ''}\n${stamp} ${message}`.split('\n').slice(-16).join('\n')
}

/**
 * `onTranscript` is called with what has been heard so far (interim) and again with the final text.
 * The caller puts it in the search field.
 */
export function useVoiceSearch(
  locale: Locale,
  onTranscript: (text: string, final: boolean) => void,
): Voice {
  const [supported, setSupported] = useState(false)
  const [phase, setPhase] = useState<'idle' | 'starting' | 'listening'>('idle')
  const [error, setError] = useState<VoiceError>(null)
  /** Sessions in a row that produced nothing. Reset by one that did. */
  const [empty, setEmpty] = useState(0)
  const [touch, setTouch] = useState(false)
  const [keyboardOnly, setKeyboardOnly] = useState(false)

  const recognition = useRef<Recognition | null>(null)
  const callback = useRef(onTranscript)
  const localeRef = useRef(locale)
  const launchRef = useRef<(retried: boolean) => void>(() => {})
  const haltRef = useRef<() => void>(() => {})
  /** Bumped whenever a recogniser is dropped, so a stale one cannot touch the page. */
  const session = useRef(0)
  const lastEnd = useRef(0)
  const cancelled = useRef(false)
  const alive = useRef(true)
  const timers = useRef<{ ready?: number; start?: number; force?: number; deaf?: number }>({})

  useEffect(() => {
    callback.current = onTranscript
  }, [onTranscript])
  useEffect(() => {
    localeRef.current = locale
  }, [locale])

  const clearTimers = useCallback(() => {
    const t = timers.current
    window.clearTimeout(t.ready)
    window.clearTimeout(t.start)
    window.clearTimeout(t.force)
    window.clearTimeout(t.deaf)
    timers.current = {}
  }, [])

  /** Drops the current recogniser and detaches it, so nothing it reports later reaches the page. */
  const discard = useCallback(() => {
    const old = recognition.current
    recognition.current = null
    session.current += 1
    if (!old) return
    old.onstart = null
    old.onaudiostart = null
    old.onsoundstart = null
    old.onspeechstart = null
    old.onaudioend = null
    old.onsoundend = null
    old.onspeechend = null
    old.onnomatch = null
    old.onresult = null
    old.onerror = null
    old.onend = null
    try {
      old.abort()
    } catch {
      // Already finished.
    }
  }, [])

  const launch = useCallback(
    (retried: boolean) => {
      const Ctor = constructorFor()
      if (!Ctor || !alive.current) return

      for (const other of halts) if (other !== haltRef.current) other()
      clearTimers()
      discard()
      cancelled.current = false

      const id = session.current
      const live = () => session.current === id && alive.current
      const next = new Ctor()
      if (id <= 1 || retried) trace(`env ${navigator.userAgent.slice(0, 80)}`)
      next.lang = LANGUAGE[localeRef.current]
      next.interimResults = true
      next.continuous = false
      next.maxAlternatives = 1

      let audio = false
      let sound = false
      let heard = false
      let errored = false

      /** This session ended with nothing for the reader. */
      const wasEmpty = () => setEmpty((count) => count + 1)

      const flowing = (why: string) => {
        if (!live() || audio) return
        audio = true
        window.clearTimeout(timers.current.ready)
        setPhase('listening')
        trace(`#${id} ready (${why})`)
        // Listening, but is anything arriving? On an iPhone's second session the answer was no.
        window.clearTimeout(timers.current.deaf)
        timers.current.deaf = window.setTimeout(() => {
          if (!live() || sound) return
          trace(`#${id} no sound at all for ${DEAF_MS / 1000} s, stopping`)
          discard()
          setPhase('idle')
          setError('silent')
          wasEmpty()
        }, DEAF_MS)
      }
      const heardSound = (what: string) => {
        if (!live()) return
        if (!sound) trace(`#${id} ${what}`)
        sound = true
        window.clearTimeout(timers.current.deaf)
        flowing(what)
      }

      next.onstart = () => {
        if (live()) trace(`#${id} start`)
      }
      next.onaudiostart = () => flowing('audiostart')
      next.onsoundstart = () => heardSound('soundstart')
      next.onspeechstart = () => heardSound('speechstart')
      next.onaudioend = () => live() && trace(`#${id} audioend`)
      next.onsoundend = () => live() && trace(`#${id} soundend`)
      next.onspeechend = () => live() && trace(`#${id} speechend`)
      next.onnomatch = () => live() && trace(`#${id} nomatch`)
      next.onresult = (event) => {
        if (!live()) return
        heardSound('result')
        let spoken = ''
        let final = false
        for (let i = 0; i < event.results.length; i += 1) {
          spoken += event.results[i][0].transcript
          if (event.results[i].isFinal) final = true
        }
        trace(`#${id} heard "${spoken.trim()}"${final ? ' (final)' : ''}`)
        if (spoken.trim()) {
          heard = true
          callback.current(spoken.trim(), final)
        }
      }
      next.onerror = (event) => {
        if (!live()) return
        trace(`#${id} error ${event.error}`)
        if (event.error === 'aborted') return
        errored = true
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') setError('denied')
        else if (event.error === 'no-speech') setError('silent')
        else setError('failed')
      }
      next.onend = () => {
        if (!live()) return
        trace(`#${id} end${audio ? '' : ' (no audio ever started)'}`)
        lastEnd.current = Date.now()
        window.clearTimeout(timers.current.ready)
        window.clearTimeout(timers.current.force)
        window.clearTimeout(timers.current.deaf)
        recognition.current = null
        // The ghost session: it started, never heard a thing, and ended without saying why. Try once more
        // with a brand-new recogniser before telling the reader it did not work.
        if (!cancelled.current && !audio && !errored && !heard && !retried) {
          setPhase('starting')
          timers.current.start = window.setTimeout(() => launchRef.current(true), GAP_MS)
          return
        }
        setPhase('idle')
        if (heard) setEmpty(0)
        else if (!cancelled.current) wasEmpty()
        // A reader who pressed stop themselves is not told that nothing was heard.
        if (!heard && !errored && !cancelled.current) setError(audio ? 'silent' : 'failed')
      }

      recognition.current = next
      setError(null)
      setPhase('starting')

      timers.current.ready = window.setTimeout(() => {
        if (!live() || audio) return
        trace(`#${id} no audio after ${READY_MS / 1000} s, dropping it`)
        discard()
        if (!retried) {
          timers.current.start = window.setTimeout(() => launchRef.current(true), GAP_MS)
        } else {
          setPhase('idle')
          setError('failed')
          wasEmpty()
        }
      }, READY_MS)

      try {
        next.start()
        trace(`#${id} start() called${retried ? ' (second attempt)' : ''} lang=${next.lang}`)
      } catch (failure) {
        trace(`#${id} start() threw ${String(failure)}`)
        clearTimers()
        discard()
        setPhase('idle')
        setError('failed')
      }
    },
    [clearTimers, discard],
  )

  useEffect(() => {
    launchRef.current = launch
  }, [launch])

  const stop = useCallback(() => {
    const current = recognition.current
    window.clearTimeout(timers.current.start)
    cancelled.current = true
    if (!current) {
      setPhase('idle')
      return
    }
    window.clearTimeout(timers.current.ready)
    try {
      current.stop()
    } catch {
      // Already finished.
    }
    // stop() asks the browser to finish with what it has heard. If the end never arrives, do not
    // leave the button on "listening".
    window.clearTimeout(timers.current.force)
    timers.current.force = window.setTimeout(() => {
      if (recognition.current === current) {
        trace('stop() never ended, dropping it')
        discard()
        setPhase('idle')
      }
    }, STOP_MS)
  }, [discard])

  const start = useCallback(() => {
    clearTimers()
    setError(null)
    const wait = Math.max(0, GAP_MS - (Date.now() - lastEnd.current))
    // Straight away whenever possible: some phones only allow the microphone to open inside the tap.
    if (wait === 0) {
      launchRef.current(false)
      return
    }
    setPhase('starting')
    timers.current.start = window.setTimeout(() => launchRef.current(false), wait)
  }, [clearTimers])

  // Decided after mount: the server does not know what the browser can do, and the first client
  // render must match it.
  useEffect(() => {
    alive.current = true
    const available = constructorFor() !== undefined
    const phoneOs = isIOS()
    setSupported(available && !phoneOs)
    setKeyboardOnly(available && phoneOs)
    setTouch(window.matchMedia('(pointer: coarse)').matches)
    const halt = () => {
      cancelled.current = true
      clearTimers()
      discard()
      if (alive.current) setPhase('idle')
    }
    haltRef.current = halt
    halts.add(halt)
    // A hidden tab must not keep the microphone.
    const onVisibility = () => {
      if (document.hidden) halt()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      alive.current = false
      halts.delete(halt)
      document.removeEventListener('visibilitychange', onVisibility)
      clearTimers()
      discard()
    }
  }, [clearTimers, discard])

  const toggle = useCallback(() => {
    if (phase !== 'idle') stop()
    else start()
  }, [phase, start, stop])

  return {
    supported,
    listening: phase !== 'idle',
    ready: phase === 'listening',
    hint: touch && empty >= 1 && error !== null,
    keyboardOnly,
    error,
    toggle,
    stop,
  }
}
