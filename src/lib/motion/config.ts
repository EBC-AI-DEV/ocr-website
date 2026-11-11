/**
 * Motion configuration presets for EBC OCR.
 * Follows premium, subtle, and responsive animation guidelines.
 */

export const easings = {
  /** Refined ease-out used for page entrances. */
  out: [0.25, 1, 0.5, 1],
  /** Expressive ease-out for reveals and panels. */
  outExpo: [0.16, 1, 0.3, 1],
  /** Ease-in for elements leaving the screen. */
  in: [0.4, 0, 1, 1],
} as const;

export const transitions = {
  pageEnter: {
    duration: 0.45,
    ease: easings.out, // refined easeOut
  },
  pageExit: {
    duration: 0.2,
    ease: easings.in, // easeIn
  },
  smooth: {
    duration: 0.35,
    ease: easings.outExpo,
  },
  /** Short UI feedback: dropdowns, inline status cards. */
  micro: {
    duration: 0.18,
    ease: easings.outExpo,
  },
  microExit: {
    duration: 0.12,
    ease: easings.in,
  },
  stagger: {
    staggerChildren: 0.08,
    delayChildren: 0.05,
  },
} as const;
