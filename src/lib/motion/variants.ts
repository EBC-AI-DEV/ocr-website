import type { Variants } from "motion/react";
import { transitions } from "./config";

/**
 * Page level entrance & exit transitions
 * Requirement:
 * Enter: Opacity: 0 -> 1, Y: 12px -> 0, Duration: 0.45s, Easing: easeOut
 * Exit: Opacity: 1 -> 0, Y: 0 -> -8px, Duration: 0.2s, Easing: easeIn
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

