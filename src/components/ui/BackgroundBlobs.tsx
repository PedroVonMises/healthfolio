import React from 'react';

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none w-full h-full">
      {/* Top right blob */}
      <div 
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl opacity-50 dark:opacity-20 animate-[spin_30s_linear_infinite]"
        style={{ animationDirection: 'reverse' }}
      />
      {/* Bottom left blob */}
      <div 
        className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl opacity-40 dark:opacity-20 animate-[spin_40s_linear_infinite]" 
      />
      {/* Center blob */}
      <div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] rounded-[100%] bg-surface-2/50 blur-[100px] opacity-60 dark:opacity-20" 
      />
      {/* Grid pattern overlay for texture */}
      <div 
        className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5 dark:opacity-[0.02]"
      />
    </div>
  );
}
