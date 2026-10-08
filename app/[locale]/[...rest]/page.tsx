// app/[locale]/[...rest]/page.tsx
//
// Catches every address that matches no real page (/nope, /hi/old-page, /fr/anything) and
// hands it to the site's own "page not found" (app/[locale]/not-found.tsx).
//
// Why this file has to exist: the language lives in the first URL segment, and the layout that
// loads the stylesheet, header and footer sits under that segment. A URL that matches nothing
// under it never reaches that layout, so Next.js shows the bare root 404: no styling, no header,
// no phone number. With this catch-all the same URL does match a route, whose only job is to
// say "not found" from inside the real layout, in the visitor's language, with a 404 status.

import { notFound } from 'next/navigation'

export default function UnknownAddress(): never {
  notFound()
}
