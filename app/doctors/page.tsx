import type { Metadata } from 'next'
import Link from 'next/link'
import { DOCTORS, searchDoctors } from '@/lib/doctors'
import { DoctorCard } from '@/components/primitives/DoctorCard'
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

  return (
    <>
      <PageHeader
        eyebrow="Consultant roster"
        title="Find a doctor"
        intro="Search by name, qualification, speciality or department."
      >
        <form
          action="/doctors"
          method="get"
          role="search"
          className="mt-6 flex max-w-lg flex-col gap-2 sm:flex-row"
        >
          <label htmlFor="doctor-search" className="sr-only">
            Search doctors by name, speciality or department
          </label>
          {/*
            A plain GET form. No JavaScript, so it works on a throttled connection and
            before hydration — which on a hospital directory is the difference between
            a page that works and a page that works eventually.
          */}
          <input
            id="doctor-search"
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Name, speciality or department"
            className="min-h-[44px] flex-1 rounded-xl border border-brand-teal/20 bg-white px-4 text-sm text-brand-dark-base placeholder:text-brand-dark-base/45"
          />
          <button
            type="submit"
            className="tap-target focus-ring-inverse rounded-xl bg-brand-teal px-6 text-sm font-semibold text-white hover:bg-brand-teal-dark"
          >
            Search
          </button>
        </form>
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
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <li key={doctor.id}>
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
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-brand-dark-base/70">
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
