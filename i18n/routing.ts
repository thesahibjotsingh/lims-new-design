// i18n/routing.ts
//
// The one place the site's three locales are declared. Everything else —
// middleware.ts, the locale-aware Link/router in i18n/navigation.ts, the
// message loader in i18n/request.ts — reads from this, so a fourth language
// is a one-line change here rather than a hunt through the app.

import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'hi', 'pa'],
  defaultLocale: 'en',
  // English stays unprefixed (/doctors) — the site's existing URLs keep
  // working unchanged. Hindi and Punjabi get a real, indexable prefix
  // (/hi/doctors, /pa/doctors).
  localePrefix: 'as-needed',
  // No Accept-Language guessing: a visitor lands on the English page unless
  // they explicitly switch, same as most Indian hospital/government sites.
  // Silently redirecting someone to Hindi because their phone's region is
  // set to India, even though they read English, is the wrong default here.
  localeDetection: false,
})

export type Locale = (typeof routing.locales)[number]
