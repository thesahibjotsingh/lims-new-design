import type { Metadata, Viewport } from 'next'
import { DesktopHeader } from '@/components/layout/DesktopHeader'
import { MobileHeader } from '@/components/layout/MobileHeader'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { Footer } from '@/components/layout/Footer'
import { fontVariables } from '@/lib/fonts'
import { primaryLocation, siteConfig } from '@/lib/site-config'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.shortName} ${siteConfig.city} | ${siteConfig.name}`,
    template: `%s | ${siteConfig.shortName} ${siteConfig.city}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    siteName: `${siteConfig.name}, ${siteConfig.city}`,
    description: siteConfig.description,
  },
}

export const viewport: Viewport = {
  themeColor: '#0F5B66',
  // `maximumScale` is deliberately not set. Capping zoom is a WCAG 1.4.4 failure and
  // the one accessibility setting a patient with low vision most needs on a phone.
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${fontVariables} scroll-smooth`}>
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
