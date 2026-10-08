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
  onresult: ((event: RecognitionEvent) => void) | null
  onerror: ((event: RecognitionErrorEvent) => void) | null
  onend: (() => void) | null
  start(): void
  stop(): void
  abort(): void
}
type RecognitionConstructor = new () => Recognition

const LANGUAGE: Record<Locale, string> = { en: 'en-IN', hi: 'hi-IN', pa: 'pa-IN' }

export type VoiceError = 'denied' | 'silent' | 'failed' | null

export interface Voice {
  /** The browser can listen. When false, show no button. */
  supported: boolean
  listening: boolean
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

/**
 * `onTranscript` is called with what has been heard so far (interim) and again with the final text.
 * The caller puts it in the search field.
 */
export function useVoiceSearch(
  locale: Locale,
  onTranscript: (text: string, final: boolean) => void,
): Voice {
  const [supported, setSupported] = useState(false)
  const [listening, setListening] = useState(false)
  const [error, setError] = useState<VoiceError>(null)
  const recognition = useRef<Recognition | null>(null)
  const callback = useRef(onTranscript)

  useEffect(() => {
    callback.current = onTranscript
  }, [onTranscript])

  // Decided after mount: the server does not know what the browser can do, and the first client
  // render must match it.
  useEffect(() => {
    setSupported(constructorFor() !== undefined)
    return () => recognition.current?.abort()
  }, [])

  const stop = useCallback(() => {
    recognition.current?.stop()
  }, [])

  const start = useCallback(() => {
    const Ctor = constructorFor()
    if (!Ctor) return
    recognition.current?.abort()

    const next = new Ctor()
    next.lang = LANGUAGE[locale]
    next.interimResults = true
    next.continuous = false
    next.maxAlternatives = 1

    let heard = false
    next.onresult = (event) => {
      let text = ''
      let final = false
      for (let i = 0; i < event.results.length; i += 1) {
        text += event.results[i][0].transcript
        if (event.results[i].isFinal) final = true
      }
      if (text.trim()) {
        heard = true
        callback.current(text.trim(), final)
      }
    }
    next.onerror = (event) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') setError('denied')
      else if (event.error === 'no-speech') setError('silent')
      else if (event.error !== 'aborted') setError('failed')
    }
    next.onend = () => {
      setListening(false)
      if (!heard) setError((current) => current ?? 'silent')
      if (recognition.current === next) recognition.current = null
    }

    recognition.current = next
    setError(null)
    try {
      next.start()
      setListening(true)
    } catch {
      setListening(false)
      setError('failed')
    }
  }, [locale])

  const toggle = useCallback(() => {
    if (listening) stop()
    else start()
  }, [listening, start, stop])

  return { supported, listening, error, toggle, stop }
}
