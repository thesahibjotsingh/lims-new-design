// components/doctor/DoctorAvatar.tsx
//
// A consultant's round portrait, used on the cards, the department page rows and anywhere a
// small face is wanted. The big hero portrait on a profile page is its own thing.
//
// WHY A CIRCLE. Medanta, Fortis and most large hospital directories crop portraits to a
// circle, and it solves a real problem here: supplied photographs have different
// backgrounds, framings and lighting, and a circle trims them to one consistent
// head-and-shoulders window instead of leaving a row of mismatched rectangles.
//
// THE CROP. Each photo is cropped with `portrait.focusY` (lib/doctors.ts): the vertical
// anchor measured against where that photograph's hairline actually sits. One shared
// value cannot suit every photo, so it lives in the data.
//
// NO STOCK FACES. A consultant with no supplied photograph gets initials, never a
// stand-in face. A stock portrait beside a real, registered doctor's name is an invented
// likeness of that person. See rule 4 at the top of lib/doctors.ts.

/* eslint-disable @next/next/no-img-element */

export function initials(name: string): string {
  return name
    .replace(/^Dr\.?\s+/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function DoctorAvatar({
  name,
  portrait,
  size = 96,
  className = '',
}: {
  name: string
  portrait?: { src: string; alt: string; focusY?: number }
  /** Pixels. Width and height are set inline so the layout never shifts as it loads. */
  size?: number
  className?: string
}) {
  if (portrait) {
    return (
      <img
        src={portrait.src}
        alt={portrait.alt}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        style={{
          width: size,
          height: size,
          objectPosition: `50% ${portrait.focusY ?? 50}%`,
        }}
        className={`shrink-0 rounded-full bg-brand-mist object-cover ring-4 ring-brand-mist ${className}`}
      />
    )
  }

  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.34) }}
      className={`grid shrink-0 place-items-center rounded-full bg-brand-mist font-serif font-bold text-brand-teal ring-4 ring-brand-mist/60 ${className}`}
    >
      {initials(name)}
    </span>
  )
}
