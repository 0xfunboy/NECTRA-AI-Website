import React from 'react';

const EcoCard: React.FC<{ title: string; description: string; icon: React.ReactNode;}> = ({ title, description, icon }) => (
    <div className="bg-black/20 border border-yellow-400/20 rounded-xl p-8 backdrop-blur-sm
                     hover:border-yellow-400/50 hover:bg-yellow-400/10 transition-all duration-300
                     transform hover:-translate-y-2 group relative overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 text-yellow-400/5 opacity-50 group-hover:opacity-10 transition-opacity duration-500" style={{fontSize: '15rem', zIndex: -1}}>
           <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
        </div>
        <div className="relative">
            <div className="flex items-center justify-center w-16 h-16 bg-[#F0B90B]/10 border border-yellow-400/30 rounded-lg text-[#F0B90B] mb-6
              transition-all duration-300 group-hover:bg-[#F0B90B]/20 group-hover:shadow-[0_0_20px_#F0B90B33]">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
            <p className="text-yellow-200/70 text-lg">{description}</p>
        </div>
    </div>
);

const BrainIcon: React.FC<{}> = () => (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15A2.5 2.5 0 0 1 9.5 22h-3A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2h3z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15A2.5 2.5 0 0 0 14.5 22h3A2.5 2.5 0 0 0 20 19.5v-15A2.5 2.5 0 0 0 17.5 2h-3z"/><path d="M9 12h6"/></svg>);
const VaultIcon: React.FC<{}> = () => (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"/><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M2 20h20"/><path d="M17 6V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2"/></svg>);
const RouteIcon: React.FC<{}> = () => (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M18 9a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3z"/></svg>);
const LinkIcon: React.FC<{}> = () => (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/></svg>);

export const Ecosystem: React.FC = () => {
  return (
    <section id="ecosystem" className="py-20 md:py-32 content-section">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
                Inside the <span className="text-[#F0B90B]">NECTRA Hive</span>
            </h2>
            <p className="mt-4 text-lg text-yellow-200/80 max-w-3xl mx-auto">
                The Nectra ecosystem is composed of several core components working in perfect synergy.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <EcoCard 
                title="NECTRA AI Core"
                description="The decentralized brain of the operation. It analyzes network-wide data to make predictive decisions on liquidity allocation."
                icon={<BrainIcon />}
            />
            <EcoCard 
                title="Liquidity Vaults"
                description="Fortified, smart contract-based vaults where liquidity is aggregated and protected before deployment."
                icon={<VaultIcon />}
            />
            <EcoCard 
                title="Routing Engine"
                description="A multi-pathway engine that executes the AI's directives, moving capital across BNB Chain with precision and speed."
                icon={<RouteIcon />}
            />
            <EcoCard 
                title="BNB Chain Integration"
                description="Deep, native hooks into BNB Chain's infrastructure, allowing for real-time data access and execution priority."
                icon={<LinkIcon />}
            />
        </div>
    </section>
  );
};
