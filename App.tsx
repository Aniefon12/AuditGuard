
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import CodeInput from './components/CodeInput';
import AuditResult from './components/AuditResult';
import { performAudit, fixCode } from './services/geminiService';
import { AuditResult as AuditResultType } from './types';

const App: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [claim, setClaim] = useState<string>('');
  const [result, setResult] = useState<AuditResultType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFixing, setIsFixing] = useState<boolean>(false);
  const [fixedCode, setFixedCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAudit = useCallback(async () => {
    if (!code || !claim) return;

    setIsLoading(true);
    setError(null);
    setResult(null);
    setFixedCode(null);

    try {
      const auditResult = await performAudit(code, claim);
      setResult(auditResult);
    } catch (err: any) {
      setError(err.message || 'Verification engine experienced a kernel panic.');
    } finally {
      setIsLoading(false);
    }
  }, [code, claim]);

  const handleFix = useCallback(async () => {
    if (!code || !claim) return;
    
    setIsFixing(true);
    setError(null);
    
    try {
      const correction = await fixCode(code, claim);
      setFixedCode(correction);
    } catch (err: any) {
      setError(err.message || 'Fix generation module failed.');
    } finally {
      setIsFixing(false);
    }
  }, [code, claim]);

  const loadSafeExample = () => {
    setCode(`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SecureVault {
    address public owner;
    uint256 public secretData;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function updateSecret(uint256 _newData) external onlyOwner {
        secretData = _newData;
    }
}`);
    setClaim("Only the contract owner is permitted to update the secret data variable.");
    setResult(null);
    setFixedCode(null);
  };

  const loadVulnerableExample = () => {
    setCode(`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableVault {
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    function drain() external {
        // VULNERABILITY: Anyone can call this function!
        payable(msg.sender).transfer(address(this).balance);
    }
    
    receive() external payable {}
}`);
    setClaim("This vault is secure. Only the initial deployer (owner) can trigger the drain function to retrieve funds.");
    setResult(null);
    setFixedCode(null);
  };

  const resetAll = () => {
    setCode('');
    setClaim('');
    setResult(null);
    setFixedCode(null);
    setError(null);
  };

  return (
    <div className="min-h-screen terminal-bg pb-20 selection:bg-green-500/20 selection:text-green-200">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Input Zone */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quick Test Examples Section */}
            <div className="bg-zinc-950/50 border border-zinc-900 rounded-xl p-6 shadow-lg">
              <h2 className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] mb-4">Quick_Test_Examples</h2>
              <div className="flex gap-3">
                <button 
                  onClick={loadSafeExample}
                  className="flex-1 text-[10px] font-mono text-green-500/70 hover:text-green-500 transition-all border border-green-500/20 hover:border-green-500/50 px-3 py-2 rounded bg-green-500/5 uppercase"
                >
                  [Load_Safe_Contract]
                </button>
                <button 
                  onClick={loadVulnerableExample}
                  className="flex-1 text-[10px] font-mono text-red-500/70 hover:text-red-500 transition-all border border-red-500/20 hover:border-red-500/50 px-3 py-2 rounded bg-red-500/5 uppercase"
                >
                  [Load_Vulnerable_Contract]
                </button>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-8 shadow-2xl relative overflow-hidden">
               {/* Terminal Accent Line */}
               <div className="absolute top-0 left-0 w-full h-1 bg-green-500/20"></div>
               
               <h2 className="text-xs font-mono text-zinc-600 uppercase tracking-[0.3em] mb-8 flex items-center justify-between">
                  <span>Input_Zone</span>
                  <button onClick={resetAll} className="text-[9px] lowercase opacity-50 hover:opacity-100 hover:text-red-400 transition-all">#reset_buffer</button>
               </h2>
               
               <CodeInput 
                 code={code}
                 setCode={setCode}
                 claim={claim}
                 setClaim={setClaim}
                 onAudit={handleAudit}
                 onLoadSample={loadVulnerableExample}
                 isLoading={isLoading}
               />

               {error && (
                 <div className="mt-6 p-4 bg-red-950/20 border border-red-500/30 rounded text-red-400 text-[10px] font-mono animate-pulse">
                   [!] FATAL_ERROR: {error}
                 </div>
               )}
            </div>

            <div className="bg-black border border-zinc-900 rounded p-4 font-mono text-[10px] text-zinc-600 space-y-2">
               <p className="flex items-center gap-2">
                 <span className="text-green-500">>></span> SYSTEM: Initializing semantic verification...
               </p>
               <p className="flex items-center gap-2">
                 <span className="text-green-500">>></span> ENGINE: Gemini-3-Pro Node connected.
               </p>
               <p className="flex items-center gap-2">
                 <span className="text-green-500">>></span> MODE: Logic_Logic_Mismatch_Detection_Active.
               </p>
            </div>
          </div>

          {/* Right Column: Analysis Console */}
          <div className="lg:col-span-7 h-full min-h-[600px]">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center p-12 bg-zinc-950/30 border border-zinc-900 border-dashed rounded-2xl relative">
                <div className="absolute inset-0 bg-green-500/5 animate-pulse"></div>
                <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                  <div className="absolute inset-0 border border-green-500/10 rounded-full animate-ping"></div>
                  <div className="w-16 h-16 border-4 border-transparent border-t-green-500 rounded-full animate-spin"></div>
                </div>
                <div className="text-center space-y-4 relative z-10 font-mono">
                  <p className="text-green-500 text-lg uppercase tracking-[0.4em] font-bold">DEEP SCANNING</p>
                  <p className="text-zinc-600 text-[11px] uppercase tracking-widest max-w-xs mx-auto">
                    Tracing symbolic execution paths and comparing functional assertions against claim primitives...
                  </p>
                </div>
              </div>
            ) : result ? (
              <AuditResult 
                result={result} 
                onFix={handleFix} 
                isFixing={isFixing} 
                fixedCode={fixedCode} 
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 bg-zinc-950/30 border border-zinc-900 border-dashed rounded-2xl text-center group hover:border-green-500/20 transition-all duration-700">
                <div className="w-20 h-20 bg-zinc-900/50 rounded-full flex items-center justify-center mb-8 text-zinc-700 group-hover:text-green-500/50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-zinc-500 font-mono text-xs uppercase tracking-[0.4em] mb-4">Awaiting_Data_Packet</h3>
                <p className="text-zinc-700 text-xs font-mono max-w-sm leading-relaxed">
                  Console idle. Provide code buffer and intent string to activate semantic verification engine.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Grid Pattern Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-[-1]" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>
    </div>
  );
};

export default App;
