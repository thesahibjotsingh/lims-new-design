// i18n/navigation.ts
//
// Locale-aware Link/router. `Link` and `useRouter` here behave exactly like
// next/link and next/navigation's, except they carry the current locale
// through automatically — so a component doesn't have to know or care
// whether it's rendering under /, /hi or /pa, and LanguageSwitcher can ask
// for "this same page, other locale" instead of hand-building a path.

import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
