import type { Variants } from "motion/react";
import { transitions } from "./config";

/**
 * Page level entrance & exit transitions
 * Requirement:
 * Enter: Opacity: 0 -> 1, Y: 12px -> 0, Duration: 0.45s, Easing: easeOut
 * Exit: Opacity: 1 -> 0, Y: 0 -> -8px, Duration: 0.2s, Easing: easeIn
 *
 * Note: the `exit` state is intentionally NOT wired up. In the App Router the
 * previous route segment is unmounted as soon as the new one commits, so
 * `<AnimatePresence>` in `template.tsx` can't keep it mounted long enough to
 * animate out without relying on private Next.js internals. React's
 * `<ViewTransition>` is the supported path for exits if they are needed later.
 */
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitions.pageEnter,
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: transitions.pageExit,
  },
};

/**
 * Reusable component animation variants
 */
export const fadeInVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

export const revealVariants: Variants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const staggerContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: transitions.stagger,
  },
};

/**
 * Dropdown menus / popovers: short fade with a 6px drop.
 * Use with <AnimatePresence> so the menu also animates out.
 */
export const dropdownVariants: Variants = {
  initial: { opacity: 0, y: -6 },
  animate: { opacity: 1, y: 0, transition: transitions.micro },
  exit: { opacity: 0, y: -4, transition: transitions.microExit },
};

/**
 * Inline status cards (selected file, validation error, panels swapping).
 */
export const statusCardVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: transitions.smooth },
  exit: { opacity: 0, y: -4, transition: transitions.microExit },
};

