
import React, { useState, useEffect } from 'react';

export const Hero: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => {
      // Limit the effect to the viewport height to avoid excessive movement
      if (window.pageYOffset < window.innerHeight) {
        setOffsetY(window.pageYOffset);
      }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const baseStyle: React.CSSProperties = {
    transition: 'transform 0.1s linear',
    willChange: 'transform',
  };

  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-center text-center relative overflow-hidden">
      <div className="relative z-10 p-4">
         <h1 
          className="
            text-6xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tighter
            animate-fadeInUp
          "
          style={{ ...baseStyle, transform: `translateY(${offsetY * 0.3}px)` }}
        >
          <span className="
            bg-clip-text text-transparent 
            bg-gradient-to-r from-[#f0b90b] to-[#f3d179]
            drop-shadow-[0_0_15px_#F0B90B]
          ">
            NECTRA
          </span>
        </h1>
        <p 
          className="
            mt-4 text-2xl md:text-4xl font-bold text-white tracking-tight
            animate-fadeInUp
          "
          style={{ animationDelay: '0.2s', animationFillMode: 'backwards', ...baseStyle, transform: `translateY(${offsetY * 0.2}px)` }}
        >
          Liquidity in Motion
        </p>
        <p 
          className="
            mt-6 text-lg md:text-xl text-yellow-200/80 max-w-2xl
            animate-fadeInUp
          "
           style={{ animationDelay: '0.4s', animationFillMode: 'backwards', ...baseStyle, transform: `translateY(${offsetY * 0.15}px)` }}
        >
          The AI-driven guardian of the BNB hive, routing liquidity with unparalleled network efficiency.
        </p>
        <div 
          className="
            mt-10
            animate-fadeInUp
          "
           style={{ animationDelay: '0.6s', animationFillMode: 'backwards', ...baseStyle, transform: `translateY(${offsetY * 0.1}px)` }}
        >
          <a href="#about" className="
            bg-[#F0B90B] text-black font-bold py-4 px-10 rounded-lg text-lg
            transition-all duration-300 ease-in-out
            hover:bg-white hover:shadow-[0_0_25px_#F0B90B]
            focus:outline-none focus:ring-4 focus:ring-yellow-400/50
            transform hover:scale-105
          ">
            Discover the Hive
          </a>
        </div>
      </div>
    </section>
  );
};
