"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Atom, Triangle, Code2, Wind, Server, Database, Zap, Layers, TestTube, Frame } from 'lucide-react';

const technologies = [
  { name: "React", icon: Atom },
  { name: "Next.js", icon: Triangle },
  { name: "TypeScript", icon: Code2 },
  { name: "Tailwind CSS", icon: Wind },
  { name: "Framer Motion", icon: Frame },
  { name: "Node.js", icon: Server },
  { name: "PostgreSQL", icon: Database },
  { name: "Supabase", icon: Zap },
  { name: "Prisma", icon: Layers },
  { name: "Playwright", icon: TestTube }
];

import { StaggerList, StaggerItem } from "@/components/ui/StaggerList";

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse position relative to the center of the element
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize to -0.5 to 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="flex items-center gap-3 px-6 py-4 rounded-xl bg-surface border border-border shadow-md hover:shadow-primary/20 transition-shadow cursor-default"
    >
      {/* 3D translated content */}
      <div style={{ transform: "translateZ(30px)" }} className="flex items-center gap-3">
        {children}
      </div>
    </motion.div>
  );
}

export default function TechStack() {
  return (
    <div className="relative py-12 overflow-hidden bg-surface-2 border-y border-border">
      {/* Gradients to fade out edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface-2 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface-2 to-transparent z-10 pointer-events-none" />
      
      {/* Container with display flex and gap instead of justify-around to fix overlap */}
      <StaggerList className="flex w-max animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused] gap-8 pl-8">
        {/* We render the array twice for the seamless infinite loop */}
        {[...technologies, ...technologies].map((tech, i) => {
          const Icon = tech.icon;
          return (
            <StaggerItem key={`${tech.name}-${i}`} className="flex items-center shrink-0 [perspective:1000px]">
              <TiltCard>
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Icon strokeWidth={1.5} className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold font-display tracking-widest uppercase text-text-muted">
                  {tech.name}
                </span>
              </TiltCard>
            </StaggerItem>
          );
        })}
      </StaggerList>
    </div>
  );
}
