import React from 'react';

const TokenomicCard: React.FC<{ title: string; description: string; icon: React.ReactNode;}> = ({ title, description, icon }) => (
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

const PieChartIcon: React.FC<{}> = () => (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>);
const UtilityIcon: React.FC<{}> = () => (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.12l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2.12l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>);
const PercentIcon: React.FC<{}> = () => (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>);

export const Tokenomics: React.FC = () => {
  return (
    <section id="tokenomics" className="py-20 md:py-32 content-section">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
                NECTRA <span className="text-[#F0B90B]">Tokenomics</span>
            </h2>
            <p className="mt-4 text-lg text-yellow-200/80 max-w-3xl mx-auto">
                The NECTRA token is the lifeblood of the hive, designed for utility, governance, and value accrual.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TokenomicCard 
                title="Token Distribution"
                description="A balanced allocation ensures community alignment and long-term project health. Key allocations include liquidity provision, ecosystem development, and community rewards."
                icon={<PieChartIcon />}
            />
            <TokenomicCard 
                title="Core Utility"
                description="The NECTRA token is the primary medium for interacting with the AI core, paying for prioritized liquidity routing, and participating in governance decisions."
                icon={<UtilityIcon />}
            />
            <TokenomicCard 
                title="Staking & Yield"
                description="Stake NECTRA to secure the network and earn a share of the protocol's revenue. Stakers receive rewards from liquidity routing fees, creating a sustainable yield."
                icon={<PercentIcon />}
            />
        </div>
    </section>
  );
};