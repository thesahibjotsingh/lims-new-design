// lib/review.ts
//
// REVIEW MODE: the switch that shows the dashed "needs LIMS input" boxes on service pages.
//
// Those boxes mark everything a hospital page usually has but that only LIMS can confirm:
// highlights, equipment, OPD timings, patient stories, accreditations and so on. They exist
// so the pages can be walked through with LIMS staff section by section, noting what is
// real, what is missing and what should go.
//
// IT MUST NEVER REACH A PUBLIC VISITOR. A box that says "example: robotic surgery" is
// exactly the kind of unconfirmed claim this site refuses to make, so the default is OFF
// everywhere except a development server:
//
//   - `npm run dev`                      -> ON  (NODE_ENV is "development")
//   - any `next build` / deployed site   -> OFF (NODE_ENV is "production")
//   - a deliberate review deploy         -> ON  only if built with NEXT_PUBLIC_REVIEW_MODE=1
//
// Do not set NEXT_PUBLIC_REVIEW_MODE in the Cloudflare build settings for the real domain.

export const REVIEW_MODE: boolean =
  process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_REVIEW_MODE === '1'
