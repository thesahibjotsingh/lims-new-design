'use client'

// components/primitives/RevealMore.tsx
//
// Shows the first `limit` items on a phone and hides the rest behind one button.
// Above the `md` breakpoint every item is visible and the button is not rendered at
// all — a laptop has the room, and a "view more" on a screen with nothing to reveal is
// a control that does nothing.
//
// WHY THE HIDDEN ITEMS STAY IN THE DOM: they are hidden with `display:none`, not sliced
// out of the array. That keeps three things true that slicing would break —
//   1. the markup is identical on the server and the client, so there is no hydration
//      mismatch and no flash of three tiles becoming fifteen;
//   2. a crawler and a screen reader in browse mode still see the whole list, so a
//      department is never invisible to search purely because it sorted fourteenth;
//   3. expanding costs no fetch and no re-render of the children.
// The cost is the hidden markup's weight, which for text-and-icon tiles is a few KB.
//
// Children must be elements that accept a className (they are cloned with one). In
// practice that means <li>, which is what every caller passes.

import { Children, cloneElement, isValidElement, useId, useState } from 'react'
import type { CSSProperties, ReactElement, ReactNode } from 'react'

export function RevealMore({
  children,
  limit = 3,
  className,
  moreLabel = 'View more',
  lessLabel = 'Show less',
}: {
  children: ReactNode
  /** How many items stay visible on a phone before the button. */
  limit?: number
  /** Classes for the <ul>. The list markup lives here so callers keep their grid. */
  className?: string
  moreLabel?: string
  lessLabel?: string
}) {
  const [expanded, setExpanded] = useState(false)
  const listId = useId()

  const items = Children.toArray(children).filter(isValidElement) as ReactElement<{
    className?: string
    style?: CSSProperties
  }>[]
  const hiddenCount = items.length - limit

  return (
    <>
      <ul id={listId} className={className}>
        {items.map((item, index) => {
          if (index < limit) return item
          // Cloned unconditionally past `limit`, not just while collapsed: the
          // element needs to carry `.reveal-item` in BOTH states so the class swap
          // on expand/collapse is a transition, not a remount — cloning only the
          // hidden branch (as before) would recreate the item on every toggle and
          // lose the fade.
          return cloneElement(item, {
            key: item.key ?? index,
            className: [
              item.props.className,
              'reveal-item',
              expanded ? '' : 'reveal-item-hidden',
            ]
              .filter(Boolean)
              .join(' '),
            // Staggered by position among the revealed items, capped so a long list
            // doesn't drag the fade out — the button's own label already told the
            // reader how many are coming, this is just enough offset to read as a
            // reveal instead of a teleport.
            style: { transitionDelay: `${Math.min((index - limit) * 40, 200)}ms` },
          })
        })}
      </ul>

      {hiddenCount > 0 && (
        <div className="mt-4 flex justify-center md:hidden">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            aria-controls={listId}
            className="tap-target rounded-full border border-brand-teal/20 bg-white px-5 text-sm font-semibold text-brand-teal transition-colors hover:bg-brand-mist"
          >
            {expanded ? lessLabel : `${moreLabel} (${hiddenCount})`}
          </button>
        </div>
      )}
    </>
  )
}
