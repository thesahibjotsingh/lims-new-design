'use client'

// components/service/PhoneActionBar.tsx
//
// Call + Book (or Directions), floating above the bottom pill once the hero's own buttons have
// scrolled out of sight. It does the job the "Talk to us" notepad does on a wide screen: the two
// things a visitor to a department page most often needs stay one tap away however far down
// they have read. The pill below it slides off while the page is read downwards (see
// MobileBottomNav), and this bar follows it down, so reading gets the whole screen.
//
// IntersectionObserver on the hero's button row, not a scroll listener: the bar is "on" when that
// row is above the top of the viewport. Phones only; the notepad covers everything wider.

import { useEffect, useState } from 'react'
import { ActionButton, type PhoneAction } from '@/components/service/PhoneActions'

/** The id ServiceHero puts on its own row of buttons. */
export const HERO_ACTIONS_ID = 'hero-actions'
/** The id of the "Talk to us" list at the end of the page (PhoneTalkToUs). */
const TALK_ID = 'phone-talk'

export function PhoneActionBar({ actions, label }: { actions: PhoneAction[]; label: string }) {
  const [on, setOn] = useState(false)

  useEffect(() => {
    const row = document.getElementById(HERO_ACTIONS_ID)
    if (!row || typeof IntersectionObserver === 'undefined') return
    // Two reasons to be off: the hero's own buttons are still in view, or the page has reached
    // "Talk to us" (which lists the same numbers) and gone on past it into the footer.
    let pastHero = false
    let atTalk = false
    const apply = () => setOn(pastHero && !atTalk)
    const heroObserver = new IntersectionObserver(([entry]) => {
      pastHero = !entry.isIntersecting && entry.boundingClientRect.bottom < 0
      apply()
    })
    heroObserver.observe(row)

    const talk = document.getElementById(TALK_ID)
    const talkObserver = talk
      ? new IntersectionObserver(([entry]) => {
          atTalk = entry.isIntersecting || entry.boundingClientRect.top < 0
          apply()
        })
      : null
    if (talk) talkObserver?.observe(talk)
    return () => {
      heroObserver.disconnect()
      talkObserver?.disconnect()
    }
  }, [])

  if (actions.length === 0) return null

  return (
    <div
      role="group"
      aria-label={label}
      data-on={on}
      // Not focusable while it is off screen.
      inert={!on}
      className="phone-bar fixed inset-x-3 z-40 flex gap-2 rounded-[2rem] bg-white/80 p-2 shadow-[0_16px_34px_-14px_rgba(11,20,22,0.5),0_0_0_1px_rgba(11,20,22,0.06)] backdrop-blur-xl sm:hidden [@media(prefers-reduced-transparency:reduce)]:bg-white [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none"
    >
      {actions.map((action) => (
        <ActionButton key={action.kind} action={action} surface="onLight" />
      ))}
    </div>
  )
}
