// middleware.ts
//
// Reads/writes the locale prefix on every real page request — redirects
// /hi/doctors correctly, keeps / as English, remembers a switched locale
// across visits. The matcher is what keeps this off API routes, the Next.js
// internals, and every static asset (anything with a file extension), none
// of which have a language.

import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
