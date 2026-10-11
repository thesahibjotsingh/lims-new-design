// lib/search/descriptions/types.ts
//
// A plain-language overview of a complaint, a condition or a test, shown inside the Quick guide on the
// results page ("What is ear pain? Where does it come from?"), the way a search engine's overview box does.
//
// WHAT IS IN ONE, AND WHAT NEVER IS. An entry says what the thing is and where it commonly comes from. It
// never names a medicine, a dose, a home remedy or a cure, never says "you have", never gives a number a
// patient could measure themselves against, and never replaces "when to see a doctor", which is quoted from the
// department's own page (lib/search/answers.ts). scripts/search-eval.ts checks the words it must not contain.
//
// WHO WROTE IT. A draft, written for the site and not yet reviewed by a LIMS doctor. Hindi and Punjabi are
// drafts of the English. None of it is shown outside review mode until its id is in REVIEWED
// (lib/search/descriptions/data.ts): a doctor's sign-off is what turns it on.

export interface DescriptionText {
  /** One or two sentences: what it is, and where it can come from. */
  about: string
  /** Three to six short lines: common reasons for a complaint, key points for a condition or a test. */
  points: string[]
}

export interface DescriptionEntry {
  id: string
  /** Decides the heading over the list: "Common reasons" for a symptom, "Key points" otherwise. */
  kind: 'symptom' | 'condition' | 'test'
  /** The ways it is searched, in English. Hindi and Punjabi spellings reach the same entry through lib/search/groups.ts. */
  phrases: readonly string[]
  en: DescriptionText
  hi: DescriptionText
  pa: DescriptionText
}

/** What the engine needs to find an entry: no text, so it can be matched without loading any. */
export type DescriptionTrigger = Pick<DescriptionEntry, 'id' | 'phrases'>
