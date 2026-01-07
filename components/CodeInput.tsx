
import React from 'react';

interface CodeInputProps {
  code: string;
  setCode: (val: string) => void;
  claim: string;
  setClaim: (val: string) => void;
  onAudit: () => void;
  onLoadSample: () => void;
  isLoading: boolean;
}

const CodeInput: React.FC<CodeInputProps> = ({ code, setCode, claim, setClaim, onAudit, onLoadSample, isLoading }) => {
  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex-1 space-y-4">
        {/* Code Input Card */}
        <div className="flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-2 px-1">
            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              INPUT://Source_Reality
            </label>
            <button 
              onClick={onLoadSample}
              className="text-[9px] font-mono text-green-500/40 hover:text-green-500 transition-colors uppercase border border-green-500/10 px-2 py-0.5 rounded"
            >
              [Load_Sample_Buffer]
            </button>
          </div>
          <div className="flex-1 relative cyber-glow-green overflow-hidden rounded-lg border border-zinc-800 transition-all duration-300">
            <div className="absolute top-0 left-0 w-8 h-full bg-zinc-900/50 border-r border-zinc-800 flex flex-col items-center pt-4 text-[9px] font-mono text-zinc-600 select-none">
              {Array.from({length: 20}).map((_, i) => <div key={i} className="leading-6">{i+1}</div>)}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full h-full bg-black pl-10 pr-4 py-4 font-mono text-sm text-green-500/90 focus:outline-none transition-all resize-none placeholder-zinc-800 leading-6"
              placeholder="// Paste Solidity source code here..."
            />
          </div>
        </div>

        {/* Claim Input Card */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-1">
            INPUT://User_Intent
          </label>
          <div className="cyber-glow-green rounded-lg border border-zinc-800 bg-black transition-all duration-300">
            <textarea
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              className="w-full h-24 bg-transparent px-4 py-3 font-mono text-sm text-zinc-300 focus:outline-none transition-all resize-none placeholder-zinc-800"
              placeholder="State the expected outcome (e.g., 'Only the owner can withdraw')..."
            />
          </div>
        </div>
      </div>

      <button
        onClick={onAudit}
        disabled={isLoading || !code || !claim}
        className="w-full bg-green-500 hover:bg-green-400 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-black font-black py-5 rounded-lg uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_35px_rgba(34,197,94,0.5)] flex items-center justify-center gap-3 active:scale-[0.98] group"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="animate-pulse">Analyzing_Sequence...</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            LAUNCH AUDIT SEQUENCE
          </>
        )}
      </button>
    </div>
  );
};

export default CodeInput;
