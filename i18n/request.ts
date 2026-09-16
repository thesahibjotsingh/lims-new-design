// i18n/request.ts
//
// Resolves which locale a request is for and loads that locale's message
// dictionary. `hasLocale` is what turns an unrecognised segment (or none)
// into the default rather than a crash — the middleware already guarantees
// a valid locale reaches here in practice, but this is the one place that
// guarantee would matter if it were ever wrong.

import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
