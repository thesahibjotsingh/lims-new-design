// lib/search/descriptions/data.ts
//
// All the overviews, in one list, and the list of those a LIMS doctor has signed off.
//
// LOADED ON DEMAND by the results page (a dynamic import), so the suggestion lists and the other pages do not
// carry the text. The engine only ever sees DescriptionTrigger (id and phrases), never the text.
//
// THE GATE. An overview is shown outside review mode only when its id is in REVIEWED. The list starts empty: the
// text is a draft until a doctor has read the English, and a Hindi and a Punjabi reader the other two. To sign one
// off, add its id here; to switch the whole feature off, leave this empty and drop REVIEW_MODE.

import type { DescriptionEntry } from '@/lib/search/descriptions/types'
import { SYMPTOMS_A } from '@/lib/search/descriptions/symptoms-a'
import { SYMPTOMS_B } from '@/lib/search/descriptions/symptoms-b'
import { SYMPTOMS_C } from '@/lib/search/descriptions/symptoms-c'
import { CONDITIONS_A } from '@/lib/search/descriptions/conditions-a'
import { CONDITIONS_B } from '@/lib/search/descriptions/conditions-b'
import { CONDITIONS_C } from '@/lib/search/descriptions/conditions-c'
import { TESTS_A } from '@/lib/search/descriptions/tests-a'
import { SYMPTOMS_D } from '@/lib/search/descriptions/symptoms-d'

export const DESCRIPTIONS: readonly DescriptionEntry[] = [...SYMPTOMS_A, ...SYMPTOMS_B, ...SYMPTOMS_C, ...CONDITIONS_A, ...CONDITIONS_B, ...CONDITIONS_C, ...TESTS_A, ...SYMPTOMS_D]

/** Ids a LIMS doctor has read and approved (English, Hindi and Punjabi). Empty until that has happened. */
export const REVIEWED: readonly string[] = []
