
import React, { useRef, useEffect, useState } from 'react';
import { initBackground, destroy } from '../lib/bg';

export const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);


  useEffect(() => {
    if (canvasRef.current) {
      initBackground(canvasRef.current, {
        quality: {
          prefersReducedMotion: prefersReducedMotion
        }
      });
      return () => destroy();
    }
  }, [prefersReducedMotion]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0 bg-[#0B0E11]" 
      style={{ pointerEvents: 'none' }} 
    />
  );
};
