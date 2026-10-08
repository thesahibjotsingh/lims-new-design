// lib/search.ts
//
// The shapes the search boxes work with. The engine itself is in lib/search/ (see engine.ts for how a
// query is answered); this file is what the components import.
//
// Client-safe: nothing here imports the site's content. The content is turned into search documents on
// the server (lib/search/build-docs.ts) and reaches the browser as JSON.

import type { SearchHit, SearchKind } from '@/lib/search/types'

export type SuggestionKind = SearchKind

/** One row in a suggestion list: where it goes and how to describe it. */
export interface SearchSuggestion {
  label: string
  /** Disambiguates entries that read alike, and says where a section lives ("Gastroenterology › Conditions"). */
  detail?: string
  kind: SuggestionKind
  href: string
  /** A link the browser handles itself: a phone call, WhatsApp, Google Maps, another website. */
  external?: boolean
  /** The pinned emergency card. */
  emergency?: boolean
  /** Added because one of its sections matched, not because it matched itself. */
  inferred?: boolean
}

export function hitToSuggestion(hit: SearchHit): SearchSuggestion {
  return {
    label: hit.title,
    detail: hit.detail,
    kind: hit.kind,
    href: hit.href,
    external: hit.external,
    emergency: hit.emergency,
    inferred: hit.inferred,
  }
}
