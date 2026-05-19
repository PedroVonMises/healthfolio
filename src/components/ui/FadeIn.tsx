"use client";

import React from "react";
import { motion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  fullWidth?: boolean;
  className?: string;
}

const directions = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

const itemVariants = (direction: FadeInProps["direction"] = "up", delay = 0) => ({
  hidden: {
    opacity: 0,
    ...directions[direction],
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
    },
  },
});

/**
 * Fade-in animation wrapper.
 *
 * - **Inside a `<StaggerContainer>`**: participates in stagger automatically
 *   (delay is controlled by the parent's `staggerChildren`).
 * - **Standalone**: uses `whileInView` to trigger on scroll into viewport.
 *   Pass an optional `delay` to offset the entrance.
 */
export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  fullWidth = false,
  className = "",
}: FadeInProps) {
  return (
    <motion.div
      variants={itemVariants(direction, delay)}
      // Standalone fallback — ignored when inside a StaggerContainer
      // because the parent already sets initial/whileInView on itself
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={`${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

/**
 * Wraps children in a `motion.div` that orchestrates staggered
 * entrance animations via `staggerChildren`.
 *
 * Each direct `<FadeIn>` child automatically participates.
 */
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
