import React from 'react';

const StepCard: React.FC<{ num: string; title: string; description: string; icon: React.ReactNode;}> = ({ num, title, description, icon }) => (
    <div className="relative pl-16">
        <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#F0B90B] text-black font-bold text-xl shadow-[0_0_20px_#F0B90B88]">
            {num}
        </div>
        <div className="absolute left-6 top-12 w-px h-full bg-yellow-400/30"></div>
        <div className="flex items-center mb-3">
            <div className="text-[#F0B90B] mr-4">{icon}</div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-yellow-200/70 text-lg">{description}</p>
    </div>
);


const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const ArchiveIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8v13H3V8"/><path d="M1 3h22v5H1z"/><path d="M10 12h4"/></svg>);
const SendIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>);

export const HowItWorks: React.FC = () => {
  return (
    <section id="process" className="py-20 md:py-32 content-section">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
                The Flow of <span className="text-[#F0B90B]">Liquidity</span>
            </h2>
            <p className="mt-4 text-lg text-yellow-200/80 max-w-3xl mx-auto">
                Nectra operates in a continuous three-phase cycle, mirroring the meticulous process of a beehive to ensure optimal capital allocation.
            </p>
        </div>
        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-16">
            <StepCard 
                num="01"
                title="Collection (Nectar Gathering)"
                description="Nectra's AI constantly scans the BNB Chain, identifying underutilized assets and idle liquidity pools to draw from."
                icon={<SearchIcon />}
            />
            <StepCard 
                num="02"
                title="Concentration (Hive Storage)"
                description="The collected liquidity is concentrated into Nectra's secure, high-efficiency vaults, creating deep liquidity reserves."
                icon={<ArchiveIcon />}
            />
             <StepCard 
                num="03"
                title="Release (Strategic Deployment)"
                description="Liquidity is intelligently routed in real-time to protocols, DEXs, and lending platforms with the highest demand and yield."
                icon={<SendIcon />}
            />
        </div>
    </section>
  );
};
