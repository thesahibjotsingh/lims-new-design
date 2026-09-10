# Deploying to Cloudflare

## Which adapter, and why

This app runs on **Cloudflare Workers** (with static assets) via
[`@opennextjs/cloudflare`](https://www.npmjs.com/package/@opennextjs/cloudflare), not on
Cloudflare Pages via `@cloudflare/next-on-pages`.

That is not a preference. `@cloudflare/next-on-pages` declares a peer range of
`>=14.3.0 && <=15.5.2` and was last published in September 2025. This project runs
**Next 15.5.25**, which is outside that range, so the older adapter cannot build it.
`@opennextjs/cloudflare` supports `>=15.5.24 <16`.

The useful side effect: OpenNext runs the app with `nodejs_compat`, so route handlers
keep the **Node.js runtime**. Nothing had to be rewritten for the edge, and
`app/api/appointments/route.ts` can still move to SMTP delivery in Phase 2.

## If the build fails with "Invalid alias name"

Symptom, on any OS including Cloudflare's own Linux builders:

```
X [ERROR] Invalid alias name: "next/dist/compiled/node-fetch"
X [ERROR] Invalid alias name: "next/dist/compiled/edge-runtime"
   ... and ~13 more
```

**Cause: a stale `@cloudflare/next-on-pages` in the dependency tree.** It pins
`esbuild@0.15.18` (2022), which predates esbuild's `alias` feature entirely — that
landed in 0.16.0. OpenNext's bundler resolves the old copy and every alias is rejected.

```
+-- @cloudflare/next-on-pages@1.13.16
| `-- esbuild@0.15.18          <-- too old to understand aliases
+-- @opennextjs/cloudflare@1.20.6
| `-- @opennextjs/aws@4.1.4
|   `-- esbuild@0.25.4         <-- the one that should win
```

Fix:

```bash
npm uninstall @cloudflare/next-on-pages
rm -rf node_modules .next .open-next package-lock.json
npm install
npm ls esbuild --all      # confirm no 0.15.x remains
```

OpenNext prints a warning on Windows that it "is not fully compatible with Windows" and
suggests WSL. That warning is unrelated to this failure and is a red herring here —
`npm run cf:build` completes on Windows once the old esbuild is gone.

## Cloudflare setup (once)

Dashboard → **Workers & Pages** → **Create** → **Import a repository**.

| Setting | Value |
| --- | --- |
| Repository | `thesahibjotsingh/lims-new-design` |
| Branch | `main` |
| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |

Node version comes from `.node-version` in this repo.

> This creates a **Worker**, not a Pages project. It will not appear under the Pages
> projects on this account. Workers-with-assets is Cloudflare's current path for Next.js.

## Environment

Appointment submissions are delivered to whatever `APPOINTMENT_WEBHOOK_URL` (or
`APPOINTMENT_NOTIFY_EMAIL`) points at. Neither is set by default, and that is a safe
state: the endpoint returns `503 { configured: false }` and the form shows the
hospital's phone number instead of falsely reporting success.

Set it as a **secret**, never in `wrangler.jsonc` — that file is committed to a public
repository:

```bash
npx wrangler secret put APPOINTMENT_WEBHOOK_URL
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Next dev server |
| `npm run build` | Plain `next build` |
| `npm run cf:build` | OpenNext Worker build (Linux/WSL only) |
| `npm run cf:preview` | Build, then run the Worker locally in workerd |
| `npm run cf:deploy` | Build, then deploy to Cloudflare |

> **Do not point `build` at the OpenNext CLI.** OpenNext invokes `npm run build`
> internally, so doing that makes the script call itself forever. That is what the
> "Fix recursive build loop script" commit in this repo's history was about.

## Assets

`public/` is committed and served straight from Cloudflare's edge. It is *generated* —
run `python scripts/build_assets.py` after changing anything in `assets-source/`. That
script names every output from the slugs in `lib/services.ts` and fails if a service has
no artwork, so a renamed service cannot silently ship a broken image.

`next/image` optimisation is disabled (`unoptimized: true` in `next.config.mjs`) because
Cloudflare Workers cannot run sharp. The two hero images are the only `next/image` users
and their source URLs already carry sizing parameters, so nothing is lost.
