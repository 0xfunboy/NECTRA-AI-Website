import React from 'react';

// An icon for completed, in-progress, and upcoming items.
const CheckCircleIcon: React.FC = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>);
const ClockIcon: React.FC = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);
const TargetIcon: React.FC = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>);

interface RoadmapItemProps {
    phase: string;
    title: string;
    description: string;
    status: 'Completed' | 'In Progress' | 'Planned';
    isLast?: boolean;
}

const statusConfig = {
    'Completed': { icon: <CheckCircleIcon />, color: 'text-green-400', borderColor: 'border-green-400/50' },
    'In Progress': { icon: <ClockIcon />, color: 'text-[#F0B90B]', borderColor: 'border-[#F0B90B]/50' },
    'Planned': { icon: <TargetIcon />, color: 'text-yellow-200/60', borderColor: 'border-yellow-200/30' },
};

const RoadmapItem: React.FC<RoadmapItemProps> = ({ phase, title, description, status, isLast }) => {
    const config = statusConfig[status];
    return (
        <div className="relative pl-20">
            {/* Timeline hexagon and line */}
            <div className={`absolute left-0 top-1 flex items-center justify-center w-12 h-14 ${config.color}`}>
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 drop-shadow-[0_0_8px_currentColor]">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                </svg>
                <div className="absolute">
                    {config.icon}
                </div>
            </div>
            {!isLast && <div className="absolute left-[23px] top-14 w-px h-full bg-yellow-400/30"></div>}
            
            {/* Content */}
            <div className={`border ${config.borderColor} rounded-lg p-6 bg-black/20 backdrop-blur-sm transform transition duration-300 hover:scale-105 hover:border-yellow-400/50 hover:shadow-[0_0_20px_#F0B90B22]`}>
                <p className={`font-bold ${config.color} mb-1`}>{phase} - {status}</p>
                <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                <p className="text-yellow-200/70 text-lg">{description}</p>
            </div>
        </div>
    );
};

export const Roadmap: React.FC = () => {
    const roadmapData: RoadmapItemProps[] = [
        {
            phase: "Phase 1: Foundation",
            title: "Core Protocol Launch",
            description: "Successful deployment of the NECTRA smart contracts, token generation event, and the activation of AI Core v1.0 for basic liquidity monitoring.",
            status: "Completed",
        },
        {
            phase: "Phase 2: Growth",
            title: "Ecosystem Integration & Staking",
            description: "Forge key partnerships with BNB Chain DEXs. Launch the NECTRA staking module, allowing token holders to earn protocol revenue.",
            status: "In Progress",
        },
        {
            phase: "Phase 3: Intelligence",
            title: "Predictive AI & Governance",
            description: "Upgrade to AI Core v2.0 with predictive liquidity analysis. Deploy the NECTRA DAO governance framework for community proposals.",
            status: "Planned",
        },
        {
            phase: "Phase 4: Expansion",
            title: "Cross-Chain Liquidity Routing",
            description: "Extend NECTRA's AI capabilities beyond BNB Chain, enabling intelligent liquidity routing across multiple blockchain networks.",
            status: "Planned",
        },
    ];

    return (
        <section id="roadmap" className="py-20 md:py-32 content-section">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    Project <span className="text-[#F0B90B]">Roadmap</span>
                </h2>
                <p className="mt-4 text-lg text-yellow-200/80 max-w-3xl mx-auto">
                    Our strategic journey to revolutionize liquidity management on the BNB Chain and beyond.
                </p>
            </div>
            <div className="max-w-4xl mx-auto grid grid-cols-1 gap-16">
                {roadmapData.map((item, index) => (
                    <RoadmapItem 
                        key={item.phase} 
                        {...item} 
                        isLast={index === roadmapData.length - 1} 
                    />
                ))}
            </div>
        </section>
    );
};
