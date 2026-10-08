// lib/health-articles.ts
//
// The Health library's articles. EMPTY TODAY, and that is correct: the hospital has not supplied any
// (the Health library page says so). Every article added here is picked up by the site search
// automatically (lib/search/build-docs.ts), in the language it is written in, so nothing else needs
// touching when the first one arrives. The article page itself still has to be built.
//
// An article is a claim in the hospital's voice, so each one comes from LIMS, reviewed by a doctor.

export interface HealthArticle {
  /** URL segment: /health-library/<slug>. */
  slug: string
  /** The language it is written in. */
  language: 'en' | 'hi' | 'pa'
  title: string
  /** One or two sentences, shown under the title in search results. */
  summary: string
  /** The whole article as plain text, for search. */
  body: string
  /** Department slugs (lib/services.ts) this article belongs to, so searching a department can reach it. */
  departments?: string[]
}

export const HEALTH_ARTICLES: HealthArticle[] = []
