"use client";

import { motion, type Variants } from "motion/react";
import { ReactNode, useMemo } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}

/** Staggers children that use `initial`/`animate` variants. */
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
  delayChildren = 0.05,
}: StaggerContainerProps) {
  const variants = useMemo<Variants>(
    () => ({
      initial: {},
      animate: {
        transition: { staggerChildren: staggerDelay, delayChildren },
      },
    }),
    [staggerDelay, delayChildren]
  );

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
