"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import { easings } from "@/lib/motion/config";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * Scroll reveal (fade + 16px rise, once). Reduced motion handled globally by
 * <MotionProvider>: the rise is skipped, the fade remains.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration, delay, ease: easings.outExpo }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
