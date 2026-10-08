'use client'

// components/search/useSearchEngine.ts
//
// Loads the site search for the reader's language, once, and shares it between every search box on
// the page. The documents are a static JSON file (app/api/search-index/[locale]/route.ts); the index
// is built from them in the browser (lib/search/engine.ts). Nothing is fetched until a search box is
// focused or its button pressed, so a visitor who never searches never downloads it, and a visitor who
// does has it loaded before the first letter is typed.

import { useCallback, useEffect, useState } from 'react'
import type { Locale } from '@/i18n/routing'
import type { SearchEngine } from '@/lib/search/engine'
import type { SearchDoc } from '@/lib/search/types'

export type EngineStatus = 'idle' | 'loading' | 'ready' | 'error'

const ready = new Map<Locale, SearchEngine>()
const pending = new Map<Locale, Promise<SearchEngine>>()

/** Fetches the documents and builds the index. Safe to call any number of times: it runs once. */
export function loadSearchEngine(locale: Locale): Promise<SearchEngine> {
  const done = ready.get(locale)
  if (done) return Promise.resolve(done)

  let request = pending.get(locale)
  if (!request) {
    // The engine (and the vocabulary that comes with it, which is most of its size) is its own chunk,
    // downloaded here alongside the documents and not with every page of the site.
    request = Promise.all([
      import('@/lib/search/engine'),
      fetch(`/api/search-index/${locale}`).then((response) => {
        if (!response.ok) throw new Error(`search index ${response.status}`)
        return response.json() as Promise<SearchDoc[]>
      }),
    ])
      // Yield once before the index is built, so the page can paint the "Searching" row first.
      .then(
        ([{ createEngine }, docs]) =>
          new Promise<SearchEngine>((resolve, reject) => {
            window.setTimeout(() => {
              try {
                const engine = createEngine(docs)
                ready.set(locale, engine)
                pending.delete(locale)
                resolve(engine)
              } catch (error) {
                // Without this the promise never settles, and the box says "Searching" forever.
                reject(error)
              }
            }, 0)
          }),
      )
      .catch((error: unknown) => {
        pending.delete(locale)
        console.error('Site search could not start', error)
        throw error
      })
    pending.set(locale, request)
  }
  return request
}

/** Starts loading without waiting for the result; for a button that is about to open a search. */
export function prefetchSearch(locale: Locale): void {
  loadSearchEngine(locale).catch(() => {
    // The box reports its own failure when it is actually used.
  })
}

export function useSearchEngine(locale: Locale) {
  const [engine, setEngine] = useState<SearchEngine | null>(null)
  const [status, setStatus] = useState<EngineStatus>('idle')

  // Another search box (or the same one, earlier) may already have loaded it.
  useEffect(() => {
    const existing = ready.get(locale)
    if (existing) {
      setEngine(existing)
      setStatus('ready')
    } else {
      setEngine(null)
      setStatus('idle')
    }
  }, [locale])

  const ensure = useCallback(() => {
    const existing = ready.get(locale)
    if (existing) {
      setEngine(existing)
      setStatus('ready')
      return
    }
    setStatus('loading')
    loadSearchEngine(locale)
      .then((loaded) => {
        setEngine(loaded)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [locale])

  return { engine, status, ensure }
}
