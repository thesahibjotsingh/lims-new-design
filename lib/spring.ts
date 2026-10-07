// lib/spring.ts
//
// The spring behind the two panels that grow out of the control that opened them: the booking
// form (components/appointments/BookingProvider) and the phone search (components/layout/
// SearchSheet). Kept in one place so they open and close with exactly the same feel.
//
// The value it drives is a single number, 0 (closed) to 1 (open), and the caller turns that
// number into whatever it likes (a clip-path, an opacity, a blur) in `apply`, straight on the
// DOM, because it runs every frame and a React render per frame is not something to pay for.

export interface Driver {
  /** Aim at 0 (closed) or 1 (open). Keeps the current value AND velocity, so it can be called mid-flight. */
  to(target: 0 | 1, response: number, onRest?: () => void): void
  /** Stop and sit exactly at `value`. */
  jump(value: number): void
  value(): number
}

export const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

/**
 * A critically damped spring on one number. Apple's two parameters rather than mass,
 * stiffness and damping: `response` is the period of the undamped oscillation in seconds
 * (stiffness = (2π / response)²) and the damping ratio is fixed at 1 (no overshoot).
 * Integrated in 1/240s steps so it stays stable whatever the frame rate.
 */
export function createDriver(apply: (value: number) => void): Driver {
  let x = 0
  let v = 0
  let target = 0
  let response = 0.42
  let frame = 0
  let last = 0
  let onRest: (() => void) | undefined

  function tick(now: number) {
    let remaining = Math.min((now - last) / 1000, 1 / 20)
    last = now
    const stiffness = ((2 * Math.PI) / response) ** 2
    const damping = 2 * Math.sqrt(stiffness)
    while (remaining > 0) {
      const step = Math.min(1 / 240, remaining)
      v += (-stiffness * (x - target) - damping * v) * step
      x += v * step
      remaining -= step
    }
    // Rest as soon as the remaining movement is under a pixel or so: the long tail of a
    // critically damped spring is invisible, and the page stays locked until it ends.
    if (Math.abs(x - target) < 0.003 && Math.abs(v) < 0.05) {
      x = target
      v = 0
      frame = 0
      apply(x)
      const done = onRest
      onRest = undefined
      done?.()
      return
    }
    apply(x)
    frame = requestAnimationFrame(tick)
  }

  return {
    to(next, nextResponse, done) {
      target = next
      response = nextResponse
      onRest = done
      if (!frame) {
        last = performance.now()
        frame = requestAnimationFrame(tick)
      }
    },
    jump(value) {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      onRest = undefined
      x = value
      v = 0
      target = value
      apply(value)
    },
    value: () => x,
  }
}
