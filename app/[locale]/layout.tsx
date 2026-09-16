import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { DesktopHeader } from '@/components/layout/DesktopHeader'
import { MobileHeader } from '@/components/layout/MobileHeader'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { Footer } from '@/components/layout/Footer'
import { TranslationNotice } from '@/components/layout/TranslationNotice'
import { serifEn, serifHi, serifPa } from '@/lib/fonts'
import { primaryLocation, siteConfig } from '@/lib/site-config'
import { routing, type Locale } from '@/i18n/routing'
import '../globals.css'

// One export per locale, chosen below — see the comment in lib/fonts.ts for
// why this can't be a single conditional next/font call.
const HEADING_FONTS: Record<Locale, { variable: string }> = {
  en: serifEn,
  hi: serifHi,
  pa: serifPa,
}

const OPEN_GRAPH_LOCALES: Record<Locale, string> = {
  en: 'en_IN',
  hi: 'hi_IN',
  pa: 'pa_IN',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}

  // hreflang alternates. `undefined` (the default locale, unprefixed) is
  // handled by next-intl's own path resolution the same way every other
  // locale is, so this doesn't special-case English.
  const languages = Object.fromEntries(
    routing.locales.map((loc) => [loc, loc === routing.defaultLocale ? '/' : `/${loc}`]),
  )

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.shortName} ${siteConfig.city} | ${siteConfig.name}`,
      template: `%s | ${siteConfig.shortName} ${siteConfig.city}`,
    },
    description: siteConfig.description,
    alternates: { languages },
    icons: {
      icon: [
        { url: '/icons/favicon-16.png', sizes: '16x16', type: 'image/png' },
        { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icons/favicon-48.png', sizes: '48x48', type: 'image/png' },
        { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
      shortcut: ['/favicon.ico'],
    },
    openGraph: {
      type: 'website',
      locale: OPEN_GRAPH_LOCALES[locale as Locale],
      url: siteConfig.url,
      siteName: `${siteConfig.name}, ${siteConfig.city}`,
      description: siteConfig.description,
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#0F5B66',
  // `maximumScale` is deliberately not set. Capping zoom is a WCAG 1.4.4 failure and
  // the one accessibility setting a patient with low vision most needs on a phone.
  width: 'device-width',
  initialScale: 1,
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  // Static rendering for this request — without it every page under
  // app/[locale]/ falls back to dynamic rendering, since Next has no other
  // way to know the locale segment is safe to render at build time.
  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`${HEADING_FONTS[locale as Locale].variable} scroll-smooth`}
    >
      <body className="bg-white font-sans text-brand-dark-base antialiased selection:bg-brand-copper/20">
        {/*
          Skip link. The desktop header carries eight nav items plus two dropdowns —
          without this a keyboard user tabs through all of them on every page.
        */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-teal focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>

        <NextIntlClientProvider messages={messages}>
          <TranslationNotice />
          <DesktopHeader />
          <MobileHeader />

          {/*
            `pb-28` on mobile is the space the floating bottom pill occupies. Without it
            the pill sits on top of the last element of every page.
          */}
          <main id="main" className="min-h-screen pb-28 lg:pb-0">
            {children}
          </main>

          <Footer />
          <MobileBottomNav />
        </NextIntlClientProvider>

        {/*
          Structured data. Only fields the hospital has actually published — no
          openingHours, no aggregateRating, no medical specialty claims. Google will
          happily index an invented rating, and then it is on the search results page.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Hospital',
              name: siteConfig.name,
              alternateName: `${siteConfig.shortName} ${siteConfig.city}`,
              url: siteConfig.url,
              telephone: primaryLocation.phone,
              address: {
                '@type': 'PostalAddress',
                streetAddress: primaryLocation.addressLines.join(', '),
                addressLocality: primaryLocation.city,
                addressRegion: primaryLocation.state,
                addressCountry: 'IN',
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
