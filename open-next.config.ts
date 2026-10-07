// open-next.config.ts
//
// Adapter config for running this Next.js app on Cloudflare Workers.
//
// WHY OPENNEXT AND NOT next-on-pages: @cloudflare/next-on-pages caps its peer range at
// Next 15.5.2 and was last published in September 2025. This project is on 15.5.25, so
// that adapter cannot support it — which is the likely root of the earlier build-loop
// and lockfile commits in this repo's history.
//
// The practical consequence is a good one: OpenNext runs the app with `nodejs_compat`,
// so route handlers keep the Node.js runtime. Nothing here has to be rewritten for the
// edge, and app/api/appointments/route.ts can still move to SMTP in Phase 2.
//
// THE PAGE CACHE (added 2026-10-07, after Cloudflare error 1102 "Worker exceeded resource
// limits" on the live site).
//
// This used to be the adapter's default, `dummy`: no cache at all. Next then has nowhere to
// read its pre-built pages from, so every "static" page (most of the site, built once by
// `next build`) was re-rendered from scratch on every request. Measured on the live Worker:
// about 100 ms of CPU per page, median 88 ms, against the 10 ms the Free plan allows. Most
// requests squeaked through; a cold start or a heavy page did not, and returned 1102.
//
// `staticAssetsIncrementalCache` reads the pre-built pages out of the Worker's static
// assets instead, so a static page is a file read, not a render. It is read-only, which is
// exactly what this site needs: it has no revalidation (no ISR, no CMS yet), so there is
// nothing to write back. Pages that really are dynamic (the doctor search with ?q=, the
// appointment form, the API route) are not cached and still render per request.
//
// IT NEEDS A SECOND STEP. The pre-built pages are copied into the assets folder by
// `opennextjs-cloudflare populateCache`, which the adapter runs only inside its own
// `deploy` command. This project deploys with `build` then plain `wrangler deploy`, so
// wrangler.jsonc runs that step itself, just before upload (see its `build.command`).
// Without that step the cache is empty and the site is exactly as slow as before, which is
// harmless but pointless.
//
// If Phase 3 introduces a CMS with revalidation, switch this to the R2 incremental cache.

import { defineCloudflareConfig } from '@opennextjs/cloudflare'
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache'

export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
})
