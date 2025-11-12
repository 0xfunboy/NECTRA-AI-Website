
import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { Introduction } from './components/Introduction';
import { HowItWorks } from './components/HowItWorks';
import { Ecosystem } from './components/Ecosystem';
import { Tokenomics } from './components/Tokenomics';
import { Roadmap } from './components/Roadmap';
import { triggerActivity } from './lib/bg';
import { InteractiveBackground } from './components/InteractiveBackground';

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
          triggerActivity();
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.content-section').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);


  return (
    <div className="relative min-h-screen w-full bg-[#0B0E11] text-[#F0B90B] font-sans overflow-x-hidden">
      <InteractiveBackground />
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4">
          <Hero />
          <Introduction />
          <Features />
          <HowItWorks />
          <Ecosystem />
          <Tokenomics />
          <Roadmap />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
