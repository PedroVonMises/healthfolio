"use client";

import React, { useState, useRef, useEffect } from 'react';
import { GripVertical } from 'lucide-react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Antes (Processo Manual)",
  afterLabel = "Depois (Digitalizado)"
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = React.useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  useEffect(() => {
    const handleMoveEvent = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      handleMove(clientX);
    };
    
    const handleDragEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMoveEvent);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleMoveEvent);
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMoveEvent);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleMoveEvent);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleMove]);

  return (
    <div 
      className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden cursor-ew-resize select-none bg-surface-2 border border-border shadow-lg"
      ref={containerRef}
      role="slider"
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Comparador Antes e Depois"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* Imagem "Antes" (Fundo) */}
      <div className="absolute inset-0 w-full h-full bg-surface-offset flex items-center justify-center p-8">
        {beforeImage ? (
          <Image src={beforeImage} alt="Antes" fill sizes="(max-width: 768px) 100vw, 80vw" className="object-cover opacity-60 grayscale" />
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-bg rounded shadow-sm mx-auto mb-4 border border-border flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <p className="font-mono text-sm text-text-muted">Planilhas confusas e dados dispersos</p>
          </div>
        )}
      </div>

      {/* Imagem "Depois" (Sobreposta com Clip-Path) */}
      <div 
        className="absolute inset-0 w-full h-full bg-surface flex items-center justify-center p-8 border-l border-primary/50"
        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
      >
        {afterImage ? (
          <Image src={afterImage} alt="Depois" fill sizes="(max-width: 768px) 100vw, 80vw" className="object-cover" />
        ) : (
          <div className="text-center w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-bg to-primary-highlight/20 relative">
            <div className="w-64 h-32 bg-bg rounded-lg shadow-md border border-border p-4 flex flex-col gap-2">
              <div className="h-4 w-1/2 bg-surface-offset rounded" />
              <div className="flex-1 flex gap-2">
                <div className="w-1/3 bg-primary/20 rounded" />
                <div className="w-2/3 bg-primary/10 rounded" />
              </div>
            </div>
            <p className="font-display font-bold text-primary mt-6 text-xl">Dashboard Automatizado</p>
          </div>
        )}
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize z-20"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full shadow-md flex items-center justify-center text-white">
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-0">
        <span className="px-3 py-1 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold rounded-full shadow-sm">
          {beforeLabel}
        </span>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rounded-full shadow-sm">
          {afterLabel}
        </span>
      </div>
    </div>
  );
}
