'use client'

// components/contact/CopyButton.tsx
//
// Copies a piece of text (the address) so a visitor can paste it into a taxi app, a message or
// a map. The label changes to say it worked and the change is announced to a screen reader.
//
// If the browser refuses the clipboard (an insecure page, an old browser, a permission policy)
// the button says nothing happened rather than claiming success, because "copied" over an
// empty clipboard sends someone to the wrong place.

import { useState } from 'react'

export function CopyButton({
  text,
  label,
  copiedLabel,
  failedLabel,
}: {
  text: string
  label: string
  copiedLabel: string
  failedLabel: string
}) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setState('copied')
    } catch {
      setState('failed')
    }
    window.setTimeout(() => setState('idle'), 2500)
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="tap-target rounded-full border border-brand-teal/25 px-5 text-sm font-semibold text-brand-teal transition-colors hover:bg-brand-mist"
    >
      <span aria-live="polite">
        {state === 'copied' ? copiedLabel : state === 'failed' ? failedLabel : label}
      </span>
    </button>
  )
}
