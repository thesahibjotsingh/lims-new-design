// components/primitives/ServiceIcon.tsx
//
// The line-art icon for one service.
//
// The file is named from the catalogue slug, and scripts/build_assets.py refuses to
// build if any service in lib/services.ts has no artwork — so a service can never
// reach this component without an icon behind it. That check is why this does not need
// a runtime fallback: a missing file is caught at build time, not rendered as a gap.
//
// Decorative by default. The service name is always rendered as text beside it, so
// announcing the icon too would make a screen reader read every tile twice.

/* eslint-disable @next/next/no-img-element */

export function ServiceIcon({
  slug,
  size = 44,
  className = '',
}: {
  slug: string
  size?: number
  className?: string
}) {
  return (
    <img
      src={`/services/${slug}.webp`}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={`shrink-0 object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  )
}
