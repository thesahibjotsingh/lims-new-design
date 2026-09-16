import type { Config } from 'tailwindcss'

/**
 * Medflow visual language, expressed as tokens.
 *
 * Every colour a component reaches for is named here. A component that writes
 * `bg-[#0F5B66]` inline is a colour that will not move when the palette does.
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#0F5B66',
          'teal-dark': '#0B3F47',
          'teal-light': '#168B99',
          copper: '#D68060',
          'copper-hover': '#C26E4E',
          /**
           * Copper for TEXT on light grounds. The brand copper measures 2.95:1 on white
           * and copper-hover 3.73:1, both under the 4.5:1 small text needs. This holds
           * 4.7:1 or better on white, mist, mist-subtle and ribbon. Fills, icons and
           * text on dark grounds keep `copper`.
           */
          'copper-ink': '#9C5236',
          cyan: '#168B99',
          'dark-base': '#0B1416',
          mist: '#F2F8F8',
          'mist-subtle': '#E8F3F4',
          /** The pale teal navigation ribbon under the white branding tier. */
          ribbon: '#DCEDEF',
          /** Emergency only. Never used decoratively — red must keep its meaning. */
          emergency: '#C62828',
        },
      },
      fontFamily: {
        // next/font sets --font-serif; Georgia carries the headings until it lands.
        serif: ['var(--font-serif)', 'Source Serif 4', 'Georgia', 'serif'],
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      animation: {
        // 180s, down from 28s — roughly six and a half times slower. A full pass of the
        // duplicated track takes three minutes, so at any glance the strip is barely
        // moving; it reads as a slow drift rather than as scrolling text.
        //
        // Speed is the whole accessibility question for a marquee. Continuous horizontal
        // motion in peripheral vision is a known vestibular trigger, and this sits on a
        // hospital home page where some visitors are already unwell. Paired with the
        // hover/focus pause in MarqueeRibbon and the reduced-motion cancel in
        // globals.css, the motion is slow, stoppable and switch-off-able.
        'marquee-slow': 'marquee 180s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        beacon: 'beacon 1.8s ease-out infinite',
        caret: 'caret 1s step-end infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        // The emergency beacon: a ring that expands and fades out of a solid dot.
        beacon: {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '70%': { transform: 'scale(2.4)', opacity: '0' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        caret: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      boxShadow: {
        // Tinted toward the brand teal rather than generic black — every surface this
        // sits under (the floating search card, the bottom-nav pill) already floats on
        // teal or on a photograph, so a teal-tinted shadow reads as the surface's own
        // cast shadow instead of a stock drop-shadow laid on top of it.
        glass: '0 20px 45px -20px rgba(15, 91, 102, 0.4)',
      },
    },
  },
  plugins: [],
}

export default config
