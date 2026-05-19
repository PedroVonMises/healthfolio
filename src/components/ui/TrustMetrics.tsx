"use client";

import React, { useRef, useEffect } from "react";
import {
  useMotionValue,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import { StaggerContainer } from "./FadeIn";
import FadeIn from "./FadeIn";

/* ------------------------------------------------------------------ */
/* Animated Counter — counts from 0 → target when scrolled into view  */
/* ------------------------------------------------------------------ */

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
}

function AnimatedCounter({ value, prefix = "", suffix = "" }: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const [display, setDisplay] = React.useState(0);

  useEffect(() => {
    // Subscribe to rounded values
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return unsubscribe;
  }, [rounded]);

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionVal, value, {
        duration: 1.5,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, value, motionVal]);

  return (
    <span ref={ref} data-testid="animated-counter">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Metrics data                                                        */
/* ------------------------------------------------------------------ */

const metrics = [
  { label: "Aumento na Conversão", value: 30, prefix: "+", suffix: "%" },
  { label: "Redução de No-show", value: 25, prefix: "-", suffix: "%" },
  { label: "Adequação LGPD", value: 100, prefix: "", suffix: "%" },
  { label: "Satisfação do Paciente", value: 98, prefix: "", suffix: "%" },
];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function TrustMetrics() {
  return (
    <StaggerContainer
      className="mt-16 sm:mt-24 w-full flex flex-wrap justify-center gap-8 sm:gap-16 opacity-80"
      staggerDelay={0.12}
    >
      {metrics.map((metric) => (
        <FadeIn key={metric.label}>
          <div className="flex flex-col items-center group cursor-default">
            <span className="text-3xl sm:text-4xl font-display font-bold text-primary group-hover:scale-110 transition-transform duration-300">
              <AnimatedCounter
                value={metric.value}
                prefix={metric.prefix}
                suffix={metric.suffix}
              />
            </span>
            <span className="mt-1 text-xs sm:text-sm font-medium text-text-muted uppercase tracking-wider">
              {metric.label}
            </span>
          </div>
        </FadeIn>
      ))}
    </StaggerContainer>
  );
}
