'use client'

// components/search/reportMiss.ts
//
// Tells the site, anonymously, that a phrase found nothing or only a near miss, so the hospital can see
// what patients look for that the site does not answer (app/api/search-miss/route.ts keeps the count).
//
// PRIVACY, in the order it matters on a hospital site:
//   - only the phrase and the language leave the browser: no cookie, no identifier, no page address;
//   - once per phrase per page visit, never on every keystroke;
//   - not at all when the browser says Do Not Track;
//   - nothing that looks like a phone number, an ID or an e-mail address (the server refuses those too).

const sent = new Set<string>()

export function reportMiss(query: string, locale: string, mode: 'weak' | 'none'): void {
  try {
    if (typeof navigator === 'undefined') return
    if (navigator.doNotTrack === '1') return

    const phrase = query.toLowerCase().replace(/\s+/g, ' ').trim()
    if (phrase.length < 3 || phrase.length > 60) return
    if (phrase.includes('@') || /\d{6,}/.test(phrase.replace(/[\s-]/g, ''))) return

    const key = `${locale}:${phrase}`
    if (sent.has(key)) return
    sent.add(key)

    const body = JSON.stringify({ q: phrase, locale, mode })
    if (typeof navigator.sendBeacon === 'function') {
      navigator.sendBeacon('/api/search-miss', new Blob([body], { type: 'application/json' }))
    } else {
      void fetch('/api/search-miss', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {})
    }
  } catch {
    // Logging is never worth a broken search.
  }
}
