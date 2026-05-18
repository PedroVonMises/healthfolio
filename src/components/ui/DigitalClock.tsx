"use client";

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function DigitalClock() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Vitória, ES (America/Sao_Paulo)
      const formatted = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
      }).format(now);
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return <div className="w-16 h-4" />; // Placeholder to avoid layout shift

  return (
    <div className="flex items-center gap-1.5 px-2 py-1 bg-black/20 rounded-md font-mono text-xs font-medium tracking-wider shrink-0">
      <Clock className="w-3.5 h-3.5 opacity-70" />
      <span>{time}</span>
      <span className="relative flex h-2 w-2 ml-1">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
    </div>
  );
}
