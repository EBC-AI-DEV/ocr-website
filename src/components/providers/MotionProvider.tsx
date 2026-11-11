"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Global Motion settings.
 *
 * `reducedMotion="user"` makes every Motion animation honour the OS
 * "reduce motion" setting: transform animations (x, y, scale, rotate) are
 * skipped and only opacity/colour fades remain. Because the decision happens
 * inside Motion rather than by swapping element trees, the server and client
 * render identical markup and hydration stays consistent.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
