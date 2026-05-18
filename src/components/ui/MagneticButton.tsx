"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticButton({ 
  children, 
  href,
  className = ""
}: { 
  children: React.ReactNode; 
  href: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Standard "Awwwards-style" buttery smooth spring config
  const springX = useSpring(x, { stiffness: 100, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 100, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    // Disable magnetic effect on touch devices to prevent jank
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate distance from center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    x.set(distanceX * 0.3); // Smooth pull strength
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center px-10 py-12 -mx-10 -my-12 z-20" // Vastly larger hit box to accommodate 0.3 pull strength sem vazar
    >
      <motion.a
        href={href}
        style={{ x: springX, y: springY }}
        className={`group relative flex items-center justify-center gap-3 overflow-hidden ${className}`}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        
        {/* Magnetic background flare */}
        <div className="absolute inset-0 z-0 bg-primary-hover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </motion.a>
    </div>
  );
}
