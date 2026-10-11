'use client'

// components/search/reportFeedback.ts
//
// Tells the site, anonymously, that an answer on the results page was or was not helpful (see
// app/api/search-feedback/route.ts for what is kept, and for the distress searches that are never kept).
//
// PRIVACY: only the phrase, the language and Yes or No leave the browser. No cookie, no identifier, no page
// address. Once per phrase per visit. Nothing at all when the browser says Do Not Track. The page never offers the
// question for an emergency or a distress search, so those are never even asked.

const sent = new Set<string>()

export function reportFeedback(query: string, locale: string, helpful: boolean): void {
  try {
    if (typeof navigator === 'undefined') return
    if (navigator.doNotTrack === '1') return

    const phrase = query.toLowerCase().replace(/\s+/g, ' ').trim()
    if (phrase.length < 3 || phrase.length > 60) return
    if (phrase.includes('@') || /\d{6,}/.test(phrase.replace(/[\s-]/g, ''))) return

    const key = `${locale}:${phrase}`
    if (sent.has(key)) return
    sent.add(key)

    const body = JSON.stringify({ q: phrase, locale, helpful })
    if (typeof navigator.sendBeacon === 'function') {
      navigator.sendBeacon('/api/search-feedback', new Blob([body], { type: 'application/json' }))
    } else {
      void fetch('/api/search-feedback', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {})
    }
  } catch {
    // Feedback is never worth a broken page.
  }
}
