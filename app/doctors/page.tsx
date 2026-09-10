import type { Metadata } from 'next'
import Link from 'next/link'
import { DOCTORS, searchDoctors } from '@/lib/doctors'
import { DoctorCard } from '@/components/primitives/DoctorCard'
import { DoctorSearchBox } from '@/components/doctors/DoctorSearchBox'
import { didYouMean } from '@/lib/doctor-search'
import { PageHeader, Section } from '@/components/primitives/PageShell'
import { contact } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Find a doctor',
  description:
    'The consultant roster at LIMS Hisar, searchable by name, speciality or department.',
}

/*
 * The directory, filtered server-side from ?q=.
 *
 * Every search surface on the site — the nav dropdown, the desktop hero card, the
 * mobile typewriter bar — lands here with a query string rather than holding results
 * in its own state. One filtering implementation, one URL you can share, and the back
 * button works.
 *
 * `searchParams` is a Promise in Next 15. A `q` arriving as string[] (from a
 * hand-edited ?q=a&q=b) is normalised rather than crashing the page: this route has to
 * survive whatever ends up in the address bar.
 */
export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>
}) {
  const params = await searchParams
  const raw = Array.isArray(params.q) ? params.q[0] : params.q
  const query = (raw ?? '').trim()
  const doctors = searchDoctors(query)
  // Only computed when there is nothing to show, so the happy path pays nothing.
  const alternatives = doctors.length === 0 && query ? didYouMean(query) : []

  return (
    <>
      <PageHeader
        banner="/banners/find-a-doctor.webp"
        eyebrow="Consultant roster"
        title="Find a doctor"
        intro="Search by name, qualification, speciality or department."
      >
        <DoctorSearchBox defaultQuery={query} />
      </PageHeader>

      <Section>
        <p className="mb-5 text-sm text-brand-dark-base/65">
          {query ? (
            <>
              {doctors.length} of {DOCTORS.length}{' '}
              {DOCTORS.length === 1 ? 'consultant' : 'consultants'} matching{' '}
              <strong className="font-semibold text-brand-dark-base">{query}</strong>.{' '}
              <Link href="/doctors" className="font-semibold text-brand-teal hover:underline">
                Clear
              </Link>
            </>
          ) : (
            <>
              {DOCTORS.length} named{' '}
              {DOCTORS.length === 1 ? 'consultant' : 'consultants'}. Profiles are
              published as LIMS supplies them.
            </>
          )}
        </p>

        {doctors.length > 0 ? (
          /*
            A swipe rail on a phone, the same grid as before from md up.

            Pure CSS scroll-snap — no carousel library, no JS, no hydration. The cards
            are already in the DOM in order, so this is the same markup with a different
            overflow behaviour, and it still works before hydration and with JS off.

            Discoverability is the card width: at 78% the next one is visibly cut off at
            the right edge, which is what tells a thumb there is more to the right. A
            full-width card would look like a stack that had simply stopped scrolling.

            `-mx-5 px-5` bleeds the rail to both screen edges while keeping the first
            card aligned to the page gutter, and `scroll-px-5` makes the snap land on
            that same line rather than flush against the glass.
          */
          <ul
            className="
              grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3
              max-md:-mx-5 max-md:flex max-md:snap-x max-md:snap-mandatory
              max-md:gap-4 max-md:overflow-x-auto max-md:scroll-px-5 max-md:px-5
              max-md:pb-2 max-md:[-webkit-overflow-scrolling:touch]
              max-md:[overscroll-behavior-x:contain]
              max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden
            "
          >
            {doctors.map((doctor) => (
              <li key={doctor.id} className="max-md:w-[78%] max-md:shrink-0 max-md:snap-start">
                <DoctorCard doctor={doctor} />
              </li>
            ))}
          </ul>
        ) : (
          /*
            An empty result offers the phone. "No doctors found" with no next step is
            where a patient looking for care stops looking.
          */
          <div className="rounded-2xl border border-dashed border-brand-teal/25 bg-brand-mist/60 p-8">
            <h2 className="font-serif text-xl font-bold text-brand-dark-base">
              No consultant on the published roster matches &ldquo;{query}&rdquo;
            </h2>
            {/*
              "Did you mean" before the apology. A misspelling is the likeliest reason a
              real speciality returns nothing, and offering the correction first turns a
              dead end into one tap. It is a QUESTION, never a substitution — the roster
              is not silently re-searched on the reader's behalf, because a hospital
              directory that quietly answers a different question than the one asked is
              how someone ends up reading about the wrong speciality.
            */}
            {alternatives.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold text-brand-dark-base">
                  Did you mean:
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {alternatives.map((suggestion) => (
                    <li key={`${suggestion.kind}-${suggestion.href}`}>
                      <Link
                        href={suggestion.href}
                        className="tap-target rounded-full border border-brand-teal/25 bg-white px-4 text-xs font-semibold text-brand-teal hover:bg-brand-mist"
                      >
                        {suggestion.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-brand-dark-base/70">
              Not every LIMS consultant has been published here yet. The hospital can
              tell you who covers this speciality and when they are available.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/doctors"
                className="tap-target rounded-full border border-brand-teal/25 px-5 text-xs font-semibold text-brand-teal hover:bg-white"
              >
                See all consultants
              </Link>
              <a
                href={`tel:${contact.secondary}`}
                className="tap-target focus-ring-inverse rounded-full bg-brand-teal px-5 text-xs font-semibold text-white hover:bg-brand-teal-dark"
              >
                Call {contact.secondaryDisplay}
              </a>
            </div>
          </div>
        )}
      </Section>
    </>
  )
}
