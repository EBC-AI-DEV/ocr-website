"use client";

import { motion, useReducedMotion } from "motion/react";
import { staggerContainerVariants } from "@/lib/motion/variants";
import { ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
  delayChildren = 0.05,
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const customVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={customVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

