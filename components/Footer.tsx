import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="py-12 border-t border-yellow-400/10 mt-20 bg-black/10">
            <div className="container mx-auto px-4 text-center text-yellow-200/60">
                <div className="flex justify-center items-center mb-4">
                     <svg className="w-8 h-8 text-[#F0B90B] mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  > <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path> </svg>
                    <span className="text-2xl font-bold tracking-wider text-white">NECTRA</span>
                </div>
                <p className="font-bold text-lg text-yellow-300/80 mb-4 tracking-widest">
                    @NectraAI · @NectraBNB
                </p>
                <div className="text-base">
                    <p>&copy; {new Date().getFullYear()} NECTRA. All rights reserved.</p>
                    <p className="mt-1 text-sm">Built on the BNB Chain Hive.</p>
                </div>
            </div>
        </footer>
    );
};