
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-6 border-b border-zinc-800 bg-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="text-zinc-500 font-mono mr-2">$</span>
            <h1 className="text-xl font-bold tracking-tight text-white font-mono flex items-center">
              AuditGuard_V1
              <span className="cursor-blink"></span>
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 ml-4">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
            <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest animate-pulse">System_Active</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[9px] font-mono text-zinc-500 uppercase">Latency: 24ms</span>
            <span className="text-[9px] font-mono text-zinc-500 uppercase">Uptime: 99.9%</span>
          </div>
          <div className="w-8 h-8 rounded border border-zinc-800 flex items-center justify-center text-zinc-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
