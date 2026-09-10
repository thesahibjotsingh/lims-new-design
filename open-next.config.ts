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

import { defineCloudflareConfig } from '@opennextjs/cloudflare'

export default defineCloudflareConfig({
  // No incremental cache binding. Every page here is either fully static or rendered
  // per request from an in-process catalogue — there is no ISR to persist, so adding a
  // KV or R2 cache would be a binding to provision and pay for that nothing reads.
  //
  // If Phase 3 introduces a CMS with revalidation, add the R2 incremental cache here.
})
