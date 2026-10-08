'use client'

// components/search/VoiceButton.tsx
//
// The microphone beside a search field. Pressing it listens (the browser asks for the microphone the
// first time), and what is heard is typed into the field, so the results appear exactly as if it had
// been typed. It renders nothing where the browser cannot listen (see useVoiceSearch).
//
// Mouse-down is held back from the input, so pressing the button does not take focus from the field
// (which would close the list); the click does the work.

import { useTranslations } from 'next-intl'
import { MicIcon } from '@/components/icons'
import type { Voice } from '@/components/search/useVoiceSearch'

export function VoiceButton({
  voice,
  className = '',
  tone = 'light',
}: {
  voice: Voice & { available: boolean }
  className?: string
  /** 'light' sits on a white or pale field; 'dark' on a dark glass one. */
  tone?: 'light' | 'dark'
}) {
  const t = useTranslations('searchSuggest')
  if (!voice.available) return null

  const idle =
    tone === 'dark'
      ? 'text-brand-dark-base/60 hover:bg-brand-mist hover:text-brand-teal'
      : 'text-brand-teal hover:bg-brand-mist'

  // The ring that pulses while listening is positioned against the button, so the button must itself be
  // positioned: `relative` unless the host places it (`absolute ...`). Both at once is a conflict
  // Tailwind resolves by stylesheet order, not by what was meant.
  const placed = /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className)

  return (
    <button
      type="button"
      onMouseDown={(event) => event.preventDefault()}
      onClick={voice.toggle}
      aria-pressed={voice.listening}
      aria-label={voice.listening ? t('voiceStop') : t('voiceStart')}
      title={voice.listening ? t('voiceStop') : t('voiceStart')}
      className={[
        placed ? '' : 'relative',
        'grid shrink-0 place-items-center rounded-full transition-colors',
        voice.listening ? 'bg-brand-emergency text-white' : idle,
        className,
      ].join(' ')}
    >
      {voice.listening && (
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-ping rounded-full bg-brand-emergency/40 motion-reduce:hidden"
        />
      )}
      <MicIcon className="relative h-[18px] w-[18px]" strokeWidth={2} />
    </button>
  )
}
