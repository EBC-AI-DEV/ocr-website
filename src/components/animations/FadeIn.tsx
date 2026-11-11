"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import { easings } from "@/lib/motion/config";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

/** Opacity-only fade. Reduced motion handled globally by <MotionProvider>. */
export function FadeIn({ children, delay = 0, duration = 0.4, className = "" }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay, ease: easings.out }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
