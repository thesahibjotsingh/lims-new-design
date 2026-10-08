'use client'

// components/primitives/FadeScroller.tsx
//
// A row that scrolls sideways, with the soft end fade from useScrollFade. It stands in for the
// plain <ul> or <div> a swipe row used to be, so server pages can use it as they are:
//
//   <FadeScroller as="ul" className="-mx-4 flex gap-2 overflow-x-auto px-4 ...">
//     <li>...</li>
//   </FadeScroller>
//
// It adds nothing else: the classes, the children and any attribute (`aria-label`, `id`) pass
// through to the element unchanged.

import type { HTMLAttributes, RefObject } from 'react'
import { useScrollFade } from '@/components/primitives/useScrollFade'

export function FadeScroller({
  as = 'div',
  children,
  ...rest
}: HTMLAttributes<HTMLElement> & { as?: 'div' | 'ul' }) {
  const { ref, onScroll } = useScrollFade<HTMLElement>()
  // The element is a div or a ul; both are plain boxes here, and one tag name keeps the types simple.
  const Tag = as as 'div'
  return (
    <Tag {...rest} ref={ref as RefObject<HTMLDivElement>} onScroll={onScroll}>
      {children}
    </Tag>
  )
}
