import React from 'react';

const HexagonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
  </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
);

const TelegramIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7z"/></svg>
)

const DiscordIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.36981C18.7815 3.73701 17.1452 3.29215 15.4559 3.0309C15.2253 3.4933 14.9452 4.12979 14.7351 4.63668C12.4842 4.39843 10.2543 4.39843 8.01438 4.63668C7.79429 4.12979 7.51415 3.4933 7.28358 3.0309C5.59429 3.29215 3.958 3.73701 2.4225 4.36981C0.485275 8.18803 0.170625 11.8319 0.814375 15.3411C2.68063 16.6558 4.58063 17.5008 6.41906 18.068C6.97406 17.4831 7.45906 16.8282 7.84406 16.1035C7.38906 15.8933 6.94406 15.6321 6.51906 15.3411C6.44906 15.2711 6.37906 15.2012 6.30906 15.1312C4.94906 14.0416 3.90906 12.4845 3.42406 10.6892C3.51906 10.5992 3.60406 10.5093 3.69906 10.4193C6.31844 12.3364 9.64844 12.9213 12.6334 12.7514C12.0291 14.1912 11.1041 15.8911 11.1041 15.8911C11.1041 15.8911 12.1834 15.2912 12.8734 14.8013C12.8734 14.8013 12.9034 14.7713 12.9334 14.7513C15.4241 14.0366 17.5141 12.5595 18.9141 10.4293C18.9991 10.5193 19.0841 10.6092 19.1791 10.6992C18.6941 12.4845 17.6541 14.0416 16.2941 15.1312C16.2241 15.2012 16.1541 15.2711 16.0841 15.3411C15.6591 15.6321 15.2141 15.8933 14.7591 16.1035C15.1441 16.8282 15.6291 17.4831 16.1841 18.068C18.0225 17.5008 19.9225 16.6558 21.7888 15.3411C22.5441 11.3919 22.0991 7.88803 20.317 4.36981ZM7.76906 13.6214C6.88906 13.6214 6.17906 12.8415 6.17906 11.8516C6.17906 10.8617 6.88906 10.0818 7.76906 10.0818C8.64906 10.0818 9.35906 10.8617 9.35906 11.8516C9.35906 12.8415 8.64906 13.6214 7.76906 13.6214ZM14.9691 13.6214C14.0891 13.6214 13.3791 12.8415 13.3791 11.8516C13.3791 10.8617 14.0891 10.0818 14.9691 10.0818C15.8491 10.0818 16.5591 10.8617 16.5591 11.8516C16.5591 12.8415 15.8491 13.6214 14.9691 13.6214Z"/>
    </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#0B0E11]/80 backdrop-blur-lg border-b border-yellow-400/10">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center h-20">
          <a href="#" className="flex items-center space-x-3 cursor-pointer">
            <HexagonIcon className="w-8 h-8 text-[#F0B90B] drop-shadow-[0_0_5px_#F0B90B]" />
            <span className="text-2xl font-bold tracking-wider text-white">NECTRA</span>
          </a>
          <div className="hidden md:flex items-center space-x-8 text-lg font-medium">
            <a href="#about" className="text-white hover:text-[#F0B90B] transition-colors duration-300">About</a>
            <a href="#features" className="text-white hover:text-[#F0B90B] transition-colors duration-300">Features</a>
            <a href="#ecosystem" className="text-white hover:text-[#F0B90B] transition-colors duration-300">Ecosystem</a>
            <a href="#tokenomics" className="text-white hover:text-[#F0B90B] transition-colors duration-300">Tokenomics</a>
            <a href="#roadmap" className="text-white hover:text-[#F0B90B] transition-colors duration-300">Roadmap</a>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-white hover:text-[#F0B90B] transition-colors duration-300 drop-shadow-[0_0_3px_#F0B90B] hover:drop-shadow-[0_0_8px_#F0B90B]">
              <XIcon className="w-6 h-6" />
            </a>
            <a href="#" className="text-white hover:text-[#F0B90B] transition-colors duration-300 drop-shadow-[0_0_3px_#F0B90B] hover:drop-shadow-[0_0_8px_#F0B90B]">
              <TelegramIcon className="w-6 h-6" />
            </a>
            <a href="#" className="text-white hover:text-[#F0B90B] transition-colors duration-300 drop-shadow-[0_0_3px_#F0B90B] hover:drop-shadow-[0_0_8px_#F0B90B]">
              <DiscordIcon className="w-6 h-6" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};