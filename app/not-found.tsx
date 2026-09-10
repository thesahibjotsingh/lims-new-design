import Link from 'next/link'
import { PageHeader, Section } from '@/components/primitives/PageShell'
import { contact } from '@/lib/site-config'
import { SERVICE_CATEGORIES } from '@/lib/services'

/*
 * A 404 with somewhere to go.
 *
 * Someone landing here was looking for a department, a doctor or a phone number, so the
 * page offers all three rather than an apology. The phone number matters most: a dead
 * end on a hospital site is where a patient stops looking for care.
 */
export default function NotFound() {
  return (
    <>
      <PageHeader
        eyebrow="404"
        title="We could not find that page"
        intro="The page may have moved, or the link may be out of date."
      />
      <Section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={category.basePath}
              className="flex min-h-[96px] flex-col justify-center rounded-2xl border border-brand-teal/10 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <span className="font-serif text-lg font-bold text-brand-dark-base">
                {category.pageTitle}
              </span>
              <span className="mt-1 text-xs text-brand-dark-base/60">{category.blurb}</span>
            </Link>
          ))}
          <Link
            href="/doctors"
            className="flex min-h-[96px] flex-col justify-center rounded-2xl border border-brand-teal/10 bg-white p-5 transition-shadow hover:shadow-md"
          >
            <span className="font-serif text-lg font-bold text-brand-dark-base">
              Find a doctor
            </span>
            <span className="mt-1 text-xs text-brand-dark-base/60">
              The consultant roster.
            </span>
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/"
            className="tap-target focus-ring-inverse rounded-full bg-brand-teal px-6 text-sm font-semibold text-white hover:bg-brand-teal-dark"
          >
            Back to home
          </Link>
          <a
            href={`tel:${contact.secondary}`}
            className="tap-target rounded-full border border-brand-teal/25 px-6 text-sm font-semibold text-brand-teal hover:bg-brand-mist"
          >
            Call {contact.secondaryDisplay}
          </a>
        </div>
      </Section>
    </>
  )
}
