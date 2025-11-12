import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
    return (
        <div 
            className="bg-black/20 border border-yellow-400/20 rounded-xl p-8 backdrop-blur-sm
                     hover:border-yellow-400/50 hover:bg-yellow-400/10 transition-all duration-300
                     transform hover:-translate-y-2 group"
        >
            <div className="flex items-center justify-center w-16 h-16 bg-[#F0B90B]/10 border border-yellow-400/30 rounded-lg text-[#F0B90B] mb-6
              transition-all duration-300 group-hover:bg-[#F0B90B]/20 group-hover:shadow-[0_0_20px_#F0B90B33]">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
            <p className="text-yellow-200/70 text-lg">{description}</p>
        </div>
    );
};

const HiveIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 8 12 12.9l8.73-4.9"/><path d="M12 22.08V13"/><path d="m5 10-2.5 1.45"/><path d="m19 10 2.5 1.45"/></svg>
);
const ZapIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);
const DropletsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.48-2.26-1.3-3.05C8.83 8.37 7.5 7.5 6 7.5c-1.5 0-2.83.87-3.7 1.7C1.48 9.99 1 11.09 1 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.94"/></svg>
);

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 md:py-32 content-section">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
                Core <span className="text-[#F0B90B]">Directives</span>
            </h2>
            <p className="mt-4 text-lg text-yellow-200/80 max-w-3xl mx-auto">
                Nectra is programmed with three fundamental principles to ensure the health and growth of the BNB hive.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
                icon={<HiveIcon />}
                title="Guardian of the Hive"
                description="Nectra oversees the BNB ecosystem, ensuring stability and growth by intelligently managing network resources."
            />
            <FeatureCard 
                icon={<ZapIcon />}
                title="Network Efficiency"
                description="Leveraging hexagonal logic to create the most efficient pathways for data and value transfer across the chain."
            />
            <FeatureCard
                icon={<DropletsIcon />}
                title="Liquidity Routing"
                description="Dynamically concentrates and releases liquidity where it's needed most, maximizing capital efficiency."
            />
        </div>
    </section>
  );
};