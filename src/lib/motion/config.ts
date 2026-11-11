/**
 * Motion configuration presets for EBC OCR.
 * Follows premium, subtle, and responsive animation guidelines.
 */

export const transitions = {
  pageEnter: {
    duration: 0.45,
    ease: [0.25, 1, 0.5, 1], // refined easeOut
  },
  pageExit: {
    duration: 0.2,
    ease: [0.4, 0, 1, 1], // easeIn
  },
  smooth: {
    duration: 0.35,
    ease: [0.16, 1, 0.3, 1],
  },
  stagger: {
    staggerChildren: 0.08,
    delayChildren: 0.05,
  },
} as const;

