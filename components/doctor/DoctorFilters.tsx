// components/doctor/DoctorFilters.tsx
//
// The department filter on the consultant directory: a row of links, one per department
// that has at least one published consultant.
//
// Medanta filters by location pills and a speciality dropdown. LIMS has one address, so
// only the department filter applies. They are plain links to /doctors?department=...,
// not client state: the filtered page is a URL you can share, the back button works, and
// it needs no JavaScript.
//
// Only departments with a consultant get a pill. A pill that leads to "no doctors" is a
// dead end, and the full department list is one section down ("Browse by speciality").

import { Link } from '@/i18n/navigation'

export interface FilterOption {
  slug: string
  label: string
  count: number
}

export function DoctorFilters({
  label,
  allLabel,
  total,
  options,
  active,
  query,
}: {
  label: string
  allLabel: string
  total: number
  options: FilterOption[]
  active?: string
  query: string
}) {
  const suffix = (department?: string): string => {
    const params = new URLSearchParams()
    if (department) params.set('department', department)
    if (query) params.set('q', query)
    const text = params.toString()
    return text ? `?${text}` : ''
  }

  const pill = (isActive: boolean): string =>
    [
      'tap-target whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors',
      isActive
        ? 'border-brand-teal bg-brand-teal text-white'
        : 'border-brand-teal/25 bg-white text-brand-teal hover:bg-brand-mist',
    ].join(' ')

  return (
    <nav aria-label={label}>
      {/* One swipe row on a phone (four rows of pills was a screen), wrapped pills from sm up. */}
      <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
        <li className="shrink-0">
          <Link
            href={`/doctors${suffix()}`}
            aria-current={active ? undefined : 'true'}
            className={pill(!active)}
          >
            {allLabel} ({total})
          </Link>
        </li>
        {options.map((option) => (
          <li key={option.slug} className="shrink-0">
            <Link
              href={`/doctors${suffix(option.slug)}`}
              aria-current={active === option.slug ? 'true' : undefined}
              className={pill(active === option.slug)}
            >
              {option.label} ({option.count})
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
