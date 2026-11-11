"use client";

import { motion } from "motion/react";
import { pageVariants } from "@/lib/motion/variants";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Route entrance: fade in + slide up (opacity 0 → 1, y 12px → 0, 0.45s easeOut).
 *
 * Reduced motion is handled by <MotionProvider> (`reducedMotion="user"`):
 * the slide is skipped and only the fade remains. We deliberately always
 * render `motion.div` so server and client markup match during hydration.
 */
export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
