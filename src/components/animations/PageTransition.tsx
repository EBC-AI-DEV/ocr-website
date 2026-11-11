"use client";

import { motion, useReducedMotion } from "motion/react";
import { pageVariants } from "@/lib/motion/variants";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

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

