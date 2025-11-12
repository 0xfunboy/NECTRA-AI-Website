import React from 'react';

const StatCard: React.FC<{ title: string; description: string; }> = ({ title, description }) => (
    <div className="border border-yellow-400/20 p-6 rounded-lg bg-black/20 text-left transform transition duration-300 hover:scale-105 hover:border-yellow-400/50 hover:shadow-[0_0_20px_#F0B90B22]">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-yellow-200/70">{description}</p>
    </div>
);

export const Introduction: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 text-center content-section">
      <h2 className="text-4xl md:text-5xl font-bold text-white">
        An AI Guardian for <span className="text-[#F0B90B]">BNB Chain</span>
      </h2>
      <p className="mt-6 text-lg text-yellow-200/80 max-w-4xl mx-auto">
        NECTRA is a decentralized, AI-driven liquidity guardian built on the BNB Chain. Born from the logic of the hive, it is designed to optimize and route liquidity with unparalleled efficiency, transforming the entire ecosystem into a dynamic, interconnected network of capital flow. Our mission is to make liquidity work smarter, not harder.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
        <StatCard 
            title="Deep Integration" 
            description="Natively built on BNB Chain to leverage its speed, low costs, and vast ecosystem from day one."
        />
        <StatCard 
            title="AI-Powered Efficiency" 
            description="Utilizes advanced algorithms to predict liquidity needs and preemptively route assets for maximum yield."
        />
        <StatCard 
            title="Maximized Capital Yield" 
            description="Ensures that liquidity is never idle, constantly seeking the best returns across the network."
        />
      </div>
    </section>
  );
};
