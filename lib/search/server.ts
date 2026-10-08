// lib/search/server.ts
//
// The search engine on the server, for pages that need an answer while they render: the doctor
// directory's "did you mean" when a search finds no doctor. The browser does not import this (it would
// pull the whole site's content into the bundle); it fetches the documents as JSON instead.

import type { Locale } from '@/i18n/routing'
import { hitToSuggestion } from '@/lib/search'
import type { SearchSuggestion } from '@/lib/search'
import { buildSearchDocs } from '@/lib/search/build-docs'
import { createEngine } from '@/lib/search/engine'
import type { SearchEngine } from '@/lib/search/engine'
import type { SearchKind } from '@/lib/search/types'

const engines: Partial<Record<Locale, SearchEngine>> = {}

/**
 * One engine per language, built the first time it is asked for and kept for the life of the server.
 * Whole pages only (see buildSearchDocs): a small index, cheap to build on a Worker.
 */
export function serverEngine(locale: Locale): SearchEngine {
  return (engines[locale] ??= createEngine(buildSearchDocs(locale, { sections: false })))
}

/** Whole pages only: a "did you mean" row is somewhere to go, not a line inside a page. */
const PAGE_KINDS: readonly SearchKind[] = ['doctor', 'department', 'test', 'page', 'info']

/**
 * "Did you mean ...?" for a query that matched no consultant: the departments, tests, doctors and pages
 * the same words do match. It is a list of things to choose from, never a substitution, and a string
 * that matches nothing, or only loosely, gets nothing (a confident wrong answer on a hospital site is
 * worse than none).
 */
export function didYouMean(query: string, limit = 3, locale: Locale = 'en'): SearchSuggestion[] {
  const result = serverEngine(locale).search(query, { limit, kinds: PAGE_KINDS })
  // Only a confident answer: a near miss on a directory page is how someone ends up reading about the
  // wrong speciality.
  if (result.mode !== 'match') return []
  return result.hits.slice(0, limit).map(hitToSuggestion)
}
