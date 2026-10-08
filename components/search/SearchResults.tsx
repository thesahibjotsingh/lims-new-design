'use client'

// components/search/SearchResults.tsx
//
// The results page, laid out like an answer rather than a list: the search (with its spelling put right
// when it needed it), tabs with counts, a short "quick guide" that names the department a patient is
// usually seen in, then who can help, tests, common reasons, questions, doctors and pages. On a wide
// screen the pages sit in a side card.
//
// EVERYTHING IS WORKED OUT IN THE BROWSER from the same index as the suggestion lists (see
// useSearchEngine.ts); the page itself is static. Nothing is sent anywhere, except that a phrase that
// found nothing is counted anonymously, as in the suggestion lists (reportMiss.ts).
//
// THE QUICK GUIDE IS A SENTENCE BUILT FROM THE TOP RESULT, NOT WRITTEN BY A MODEL. "X is usually looked
// at by <department>" is the same generality as the department pages' own "common conditions" lists, and
// the department's own first sentence follows it. It says where to go, never what is wrong. Its wording,
// and the Hindi and Punjabi versions, are unreviewed and need a LIMS doctor.

import { useEffect, useMemo, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { ArrowRightIcon, ArrowUpRightIcon, PhoneIcon, SparkleIcon } from '@/components/icons'
import { hitToSuggestion } from '@/lib/search'
import type { SearchHit, SearchKind } from '@/lib/search/types'
import { Highlight, iconFor, rememberSearch } from '@/components/search/SearchSuggest'
import { ResultsSearchBox } from '@/components/search/ResultsSearchBox'
import { reportMiss } from '@/components/search/reportMiss'
import { useSearchEngine } from '@/components/search/useSearchEngine'
import { contact } from '@/lib/site-config'

type Group = 'departments' | 'tests' | 'conditions' | 'questions' | 'doctors' | 'pages'
type View = 'guide' | 'list' | Group

const GROUP_KINDS: Record<Group, SearchKind[]> = {
  departments: ['department'],
  tests: ['test'],
  conditions: ['condition', 'treatment'],
  questions: ['faq'],
  doctors: ['doctor'],
  pages: ['page', 'info', 'action'],
}
const GROUPS: Group[] = ['departments', 'tests', 'conditions', 'questions', 'doctors', 'pages']
const GROUP_LABEL: Record<Group, string> = {
  departments: 'tabDepartments',
  tests: 'tabTests',
  conditions: 'tabConditions',
  questions: 'tabQuestions',
  doctors: 'tabDoctors',
  pages: 'tabPages',
}

const squash = (text: string) => text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '')

/* -------------------------------------------------------------------------- */
/* Pieces                                                                      */
/* -------------------------------------------------------------------------- */

/** One result: its icon, its title (the matched words bold), where it sits, and where it goes. */
function Row({
  hit,
  terms,
  kindLabel,
  bordered = true,
}: {
  hit: SearchHit
  terms: string[]
  kindLabel?: string
  bordered?: boolean
}) {
  const Icon = iconFor(hitToSuggestion(hit))
  const remember = () => rememberSearch(hitToSuggestion(hit))
  const inner = (
    <>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-mist text-brand-teal">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold leading-snug text-brand-dark-base">
          <Highlight text={hit.title} terms={terms} />
        </span>
        {hit.detail && <span className="mt-0.5 block text-[13px] leading-snug text-brand-dark-base/60">{hit.detail}</span>}
      </span>
      {kindLabel ? (
        <span className="mt-0.5 shrink-0 rounded-md bg-brand-mist px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-teal">
          {kindLabel}
        </span>
      ) : hit.external ? (
        <ArrowUpRightIcon className="h-4 w-4 shrink-0 self-center text-brand-dark-base/40" />
      ) : (
        <ArrowRightIcon className="h-4 w-4 shrink-0 self-center text-brand-dark-base/40" />
      )}
    </>
  )
  const className = [
    'flex items-start gap-3 py-3 transition-colors hover:bg-brand-mist/50',
    bordered ? 'border-b border-brand-teal/10' : '',
  ].join(' ')
  if (hit.external) {
    const tel = hit.href.startsWith('tel:')
    return (
      <a
        href={hit.href}
        onClick={remember}
        {...(tel ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
        className={className}
      >
        {inner}
      </a>
    )
  }
  return (
    <Link href={hit.href} onClick={remember} className={className}>
      {inner}
    </Link>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 mt-7 text-[11px] font-bold uppercase tracking-[0.09em] text-brand-dark-base/55">
      {children}
    </h2>
  )
}

function DeptCard({ hit, terms }: { hit: SearchHit; terms: string[] }) {
  const Icon = iconFor(hitToSuggestion(hit))
  return (
    <Link
      href={hit.href}
      onClick={() => rememberSearch(hitToSuggestion(hit))}
      className="flex items-center gap-3 rounded-2xl border border-brand-teal/15 bg-white p-3 transition-shadow hover:shadow-md"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-mist text-brand-teal">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block font-semibold leading-snug text-brand-dark-base">
          <Highlight text={hit.title} terms={terms} />
        </span>
        {hit.detail && (
          <span className="mt-0.5 line-clamp-2 block text-[13px] leading-snug text-brand-dark-base/60">{hit.detail}</span>
        )}
      </span>
    </Link>
  )
}

/** Conditions and questions as a short list: the title, and where on the site it lives. */
function ReasonList({ hits }: { hits: SearchHit[] }) {
  return (
    <ul className="space-y-2">
      {hits.map((hit) => (
        <li key={hit.id} className="flex gap-2.5 text-[15px] leading-snug">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-copper" />
          <Link
            href={hit.href}
            onClick={() => rememberSearch(hitToSuggestion(hit))}
            className="min-w-0 hover:underline"
          >
            <span className="font-semibold text-brand-dark-base">{hit.title}</span>
            {hit.detail && <span className="text-brand-dark-base/55"> · {hit.detail}</span>}
          </Link>
        </li>
      ))}
    </ul>
  )
}

/* -------------------------------------------------------------------------- */
/* The page                                                                    */
/* -------------------------------------------------------------------------- */

export function SearchResults() {
  const params = useSearchParams()
  const original = (params.get('q') ?? '').replace(/\s+/g, ' ').trim().slice(0, 120)
  const exact = params.get('exact') === '1'
  const locale = useLocale() as Locale
  const t = useTranslations('searchPage')
  const tk = useTranslations('searchSuggest')
  const { engine, status, ensure } = useSearchEngine(locale)
  const [view, setView] = useState<View>('guide')

  useEffect(() => {
    ensure()
  }, [ensure])
  useEffect(() => {
    setView('guide')
  }, [original])

  // "neurosergery" is searched as "neurosurgery", and says so, with a way back to what was typed.
  const corrected = useMemo(
    () => (engine && original && !exact ? engine.correct(original) : null),
    [engine, original, exact],
  )
  const query = corrected ?? original

  const result = useMemo(
    () => (engine && query ? engine.search(query, { limit: 40 }) : null),
    [engine, query],
  )

  // A phrase that found nothing, or only a near miss, is counted anonymously (once per visit).
  useEffect(() => {
    if (!result || result.mode === 'match' || result.distress) return
    reportMiss(original, locale, result.mode === 'none' ? 'none' : 'weak')
  }, [result, original, locale])

  const kindLabel: Record<SearchKind, string> = {
    doctor: tk('kindDoctor'),
    department: tk('kindDepartment'),
    page: tk('kindPage'),
    condition: tk('kindCondition'),
    treatment: tk('kindTreatment'),
    test: tk('kindTest'),
    faq: tk('kindFaq'),
    info: tk('kindInfo'),
    action: tk('kindAction'),
  }

  const hits = result?.hits ?? []
  const card = hits.find((hit) => hit.emergency)
  // For an emergency the departments are left out: the red card above is the answer, and a department
  // picked by word-matching ("chest pain" reaching Gastroenterology) would only mislead.
  const rest = hits.filter((hit) => !hit.emergency && !(result?.emergency && hit.kind === 'department'))
  const terms = result?.terms ?? []
  const byGroup = (group: Group) => rest.filter((hit) => GROUP_KINDS[group].includes(hit.kind))
  const counts = Object.fromEntries(GROUPS.map((group) => [group, byGroup(group).length])) as Record<Group, number>
  const showing = result && result.mode !== 'none' ? rest : []

  /* ---- the quick guide: one sentence from the top result ---- */
  const top = showing[0]
  const dept: SearchHit | undefined = !top
    ? undefined
    : top.kind === 'department'
      ? top
      : top.parent
        ? rest.find((hit) => hit.id === `svc:${top.parent}`)
        : undefined
  const named = dept && (squash(dept.title).includes(squash(query)) || squash(query).includes(squash(dept.title)))
  const start =
    dept && !['svc:general-medicine', 'svc:emergency-services'].includes(dept.id) && !named && result?.mode === 'match'

  const bold = (chunks: React.ReactNode) => (
    <b className="rounded bg-brand-teal/15 px-1 font-bold text-brand-dark-base">{chunks}</b>
  )
  const guideBody = () => {
    if (!result || !query) return null
    // An emergency gets the red banner and nothing that names a department as if it were the answer.
    if (result.distress || result.emergency) return null
    if (result.mode === 'none') return <p>{t('guideNone', { query })}</p>
    if (result.mode === 'weak') return <p>{t('guideWeak', { query })}</p>
    if (dept) {
      return (
        <>
          <p>
            {named ? (
              bold(dept.title)
            ) : (
              t.rich('guideDept', { query, dept: dept.title, b: bold })
            )}
          </p>
          {dept.detail && <p className="mt-2 text-sm text-brand-dark-base/70">{dept.detail}</p>}
        </>
      )
    }
    if (top?.kind === 'test') {
      return (
        <>
          <p>{t.rich('guideTest', { title: top.title, b: bold })}</p>
          {top.detail && <p className="mt-2 text-sm text-brand-dark-base/70">{top.detail}</p>}
        </>
      )
    }
    if (top?.kind === 'doctor') {
      return (
        <>
          <p>{t.rich('guideDoctor', { title: top.title, b: bold })}</p>
          {top.detail && <p className="mt-2 text-sm text-brand-dark-base/70">{top.detail}</p>}
        </>
      )
    }
    if (top) {
      return (
        <>
          <p>{bold(top.title)}</p>
          {top.detail && <p className="mt-2 text-sm text-brand-dark-base/70">{top.detail}</p>}
        </>
      )
    }
    return null
  }

  const tabs = (tone: 'dark' | 'light', className: string) => {
    if (!result || showing.length === 0) return null
    const entries: { key: View; label: string; count?: number }[] = [
      { key: 'guide', label: t('tabAll'), count: showing.length },
      ...GROUPS.filter((group) => counts[group] > 0).map((group) => ({
        key: group as View,
        label: t(GROUP_LABEL[group]),
        count: counts[group],
      })),
    ]
    return (
      <div role="tablist" className={`${className} gap-1.5 overflow-x-auto`}>
        {entries.map((entry) => {
          const on = view === entry.key || (entry.key === 'guide' && view === 'list')
          return (
            <button
              key={entry.key}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setView(entry.key)}
              className={[
                'shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors',
                tone === 'dark'
                  ? on
                    ? 'bg-white text-brand-teal-dark'
                    : 'text-white/80 hover:bg-white/10'
                  : on
                    ? 'bg-brand-teal text-white'
                    : 'border border-brand-teal/20 bg-white text-brand-teal-dark',
              ].join(' ')}
            >
              {entry.label}
              <span className="ml-1 font-medium opacity-65">{entry.count}</span>
            </button>
          )
        })}
      </div>
    )
  }

  /* ---- the body ---- */
  let body: React.ReactNode
  if (!original) {
    const popular = engine?.popular(8) ?? []
    body = (
      <div>
        <p className="text-[15px] text-brand-dark-base/70">{t('emptyPrompt')}</p>
        {popular.length > 0 && (
          <>
            <SectionTitle>{t('popular')}</SectionTitle>
            <div>
              {popular.map((hit) => (
                <Row key={hit.id} hit={hit} terms={[]} kindLabel={kindLabel[hit.kind]} />
              ))}
            </div>
          </>
        )}
      </div>
    )
  } else if (status === 'error') {
    body = <p className="text-[15px]">{t('unavailable', { number: contact.secondaryDisplay })}</p>
  } else if (!result) {
    body = <p className="text-[15px] text-brand-dark-base/60">{t('loading')}</p>
  } else if (view !== 'guide') {
    const list = view === 'list' ? showing : byGroup(view)
    body = (
      <div>
        <h2 className="mb-1 font-serif text-xl font-bold text-brand-dark-base">
          {view === 'list' ? t('listTitle', { count: showing.length }) : t(GROUP_LABEL[view])}
        </h2>
        {list.map((hit) => (
          <Row key={hit.id} hit={hit} terms={terms} kindLabel={kindLabel[hit.kind]} />
        ))}
      </div>
    )
  } else {
    const depts = byGroup('departments').slice(0, 4)
    const tests = byGroup('tests').slice(0, 4)
    const reasons = byGroup('conditions').slice(0, 6)
    const questions = byGroup('questions').slice(0, 4)
    const doctors = byGroup('doctors').slice(0, 4)
    const pages = byGroup('pages').slice(0, 6)
    const guide = guideBody()
    body = (
      <div>
        {corrected && (
          <p className="mb-4 text-[15px] text-brand-dark-base/80">
            {t.rich('showingFor', { query: corrected, b: (c) => <b className="text-brand-dark-base">{c}</b> })}
            <br />
            <span className="text-sm text-brand-dark-base/60">
              {t.rich('searchInstead', {
                query: original,
                a: (c) => (
                  <Link
                    href={`/search?q=${encodeURIComponent(original)}&exact=1`}
                    className="font-semibold text-brand-teal hover:underline"
                  >
                    {c}
                  </Link>
                ),
              })}
            </span>
          </p>
        )}

        {(result.emergency || result.distress) && card && (
          <a
            href={card.href}
            className="mb-4 flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-brand-emergency ring-1 ring-red-200"
          >
            <PhoneIcon className="h-5 w-5 shrink-0" />
            <span className="text-[15px] font-semibold">
              {t.rich(result.distress ? 'guideDistress' : 'guideEmergency', {
                number: contact.primaryDisplay,
                b: (c) => <b>{c}</b>,
              })}
            </span>
          </a>
        )}

        {guide && (
          <div className="rounded-2xl border-l-4 border-brand-copper bg-brand-mist p-4 lg:p-5">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-teal">
              <SparkleIcon className="h-4 w-4" />
              {t('guideLabel')}
            </p>
            <div className="text-[15px] leading-relaxed text-brand-dark-base lg:text-base">{guide}</div>
            {start && (
              <p className="mt-2 text-sm text-brand-dark-base/80">
                {t.rich('guideStart', {
                  name: t('generalMedicine'),
                  gp: (chunks) => (
                    <Link href="/specialities/general-medicine" className="font-semibold text-brand-teal hover:underline">
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            )}
            <p className="mt-3 text-xs text-brand-dark-base/50">{t('guideNote')}</p>
          </div>
        )}

        {result.mode !== 'none' && depts.length > 0 && (
          <>
            <SectionTitle>{t('sectionDepartments')}</SectionTitle>
            <div className="grid gap-3 sm:grid-cols-2">
              {depts.map((hit) => (
                <DeptCard key={hit.id} hit={hit} terms={terms} />
              ))}
            </div>
          </>
        )}
        {result.mode !== 'none' && tests.length > 0 && (
          <>
            <SectionTitle>{t('sectionTests')}</SectionTitle>
            {tests.map((hit) => (
              <Row key={hit.id} hit={hit} terms={terms} />
            ))}
          </>
        )}
        {result.mode !== 'none' && reasons.length > 0 && (
          <>
            <SectionTitle>{t('sectionReasons')}</SectionTitle>
            <ReasonList hits={reasons} />
          </>
        )}
        {result.mode !== 'none' && questions.length > 0 && (
          <>
            <SectionTitle>{t('sectionQuestions')}</SectionTitle>
            <ReasonList hits={questions} />
          </>
        )}
        {doctors.length > 0 && (
          <>
            <SectionTitle>{t('sectionDoctors')}</SectionTitle>
            {doctors.map((hit) => (
              <Row key={hit.id} hit={hit} terms={terms} />
            ))}
          </>
        )}
        {pages.length > 0 && (
          <>
            <SectionTitle>{t('sectionPages')}</SectionTitle>
            {pages.map((hit) => (
              <Row key={hit.id} hit={hit} terms={terms} />
            ))}
          </>
        )}

        <a
          href={`tel:${contact.primary}`}
          className="mt-8 flex items-center gap-2.5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-brand-emergency"
        >
          <PhoneIcon className="h-4 w-4 shrink-0" />
          {t('emergencyLine', { number: contact.primaryDisplay })}
        </a>
      </div>
    )
  }

  return (
    <>
      <section className="bg-gradient-to-r from-brand-teal-dark to-brand-teal text-white">
        <div className="mx-auto max-w-7xl px-4 pb-3 pt-3 sm:px-6 lg:pb-4 lg:pt-5">
          <div className="lg:max-w-[42rem]">
            <ResultsSearchBox key={original} initial={original} variant="band" />
          </div>
          {tabs('dark', 'mt-3 hidden lg:flex')}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-10 lg:py-8">
        <div className="min-w-0">
          {tabs('light', 'mb-4 flex lg:hidden')}
          {body}
        </div>

        <aside className="mt-8 space-y-4 lg:mt-0">
          {view === 'guide' && showing.length > 0 && (
            <div className="hidden rounded-2xl border border-brand-teal/15 bg-white p-4 lg:block">
              <h2 className="mb-1 font-serif text-lg font-bold text-brand-teal-dark">{t('sidebarTitle')}</h2>
              {showing.slice(0, 4).map((hit, index, list) => (
                <Row key={hit.id} hit={hit} terms={[]} bordered={index < list.length - 1} />
              ))}
              {showing.length > 4 && (
                <button
                  type="button"
                  onClick={() => setView('list')}
                  className="mt-3 w-full rounded-full border border-brand-teal/25 py-2.5 text-sm font-semibold text-brand-teal hover:bg-brand-mist"
                >
                  {t('showAll', { count: showing.length })}
                </button>
              )}
            </div>
          )}
          {original && (
            <div className="rounded-2xl border border-brand-teal/15 bg-white p-3">
              <ResultsSearchBox id="results-ask" variant="plain" placeholder={t('askTitle')} />
            </div>
          )}
        </aside>
      </div>
    </>
  )
}
