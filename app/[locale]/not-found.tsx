import { Link } from '@/i18n/navigation'
import { PageHeader, Section } from '@/components/primitives/PageShell'
import { contact } from '@/lib/site-config'
import { SERVICE_CATEGORIES } from '@/lib/services'

/*
 * A 404 with somewhere to go — the locale-aware version of app/not-found.tsx.
 *
 * This is the 404 that actually fires for almost every real dead link: a
 * mistyped or stale URL under a valid locale segment (/doctors/old-slug,
 * /hi/services/old-slug). Root app/not-found.tsx only fires for a locale
 * segment next-intl can't resolve at all, which is why it can't share this
 * file — it has no locale in scope for the Link below to read.
 */
export default function LocaleNotFound() {
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
