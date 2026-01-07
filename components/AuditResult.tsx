
import React from 'react';
import { AuditResult as AuditResultType } from '../types';

interface AuditResultProps {
  result: AuditResultType;
  onFix: () => void;
  isFixing: boolean;
  fixedCode: string | null;
}

const AuditResult: React.FC<AuditResultProps> = ({ result, onFix, isFixing, fixedCode }) => {
  const isMatch = result.status === 'VERIFIED MATCH';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500 pb-20">
      {/* Verdict Card */}
      <div className={`relative p-8 rounded-xl border-2 overflow-hidden ${isMatch ? 'border-green-500/50 bg-green-500/5 shadow-[0_0_30px_rgba(34,197,94,0.15)]' : 'border-red-500/50 bg-red-500/5 shadow-[0_0_30px_rgba(239,68,68,0.15)]'}`}>
        {/* Background Decal */}
        <div className={`absolute top-0 right-0 p-4 opacity-10 select-none pointer-events-none transform translate-x-4 -translate-y-4`}>
           <svg className="w-48 h-48" viewBox="0 0 24 24" fill="currentColor">
              {isMatch ? (
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              ) : (
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              )}
           </svg>
        </div>

        <div className="relative z-10 flex flex-col items-start gap-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
               <div className={`p-2 rounded-full ${isMatch ? 'bg-green-500 text-black' : 'bg-red-500 text-black'}`}>
                  {isMatch ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  )}
               </div>
               <div>
                 <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Analysis_Verdict</span>
                 <h2 className={`text-3xl font-black uppercase tracking-tighter ${isMatch ? 'text-green-500' : 'text-red-500'}`}>
                   {result.status}
                 </h2>
               </div>
            </div>

            {!isMatch && !fixedCode && (
              <button 
                onClick={onFix}
                disabled={isFixing}
                className="bg-red-500 hover:bg-red-400 text-black font-bold py-2 px-4 rounded font-mono text-xs uppercase tracking-widest shadow-[0_0_10px_rgba(239,68,68,0.3)] transition-all flex items-center gap-2"
              >
                {isFixing ? (
                  <>
                    <svg className="animate-spin h-3 w-3 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    FIXING...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Fix this Code
                  </>
                )}
              </button>
            )}
          </div>
          
          <div className="mt-4 p-4 rounded bg-black/40 border border-white/5 backdrop-blur-sm w-full">
            <p className="text-zinc-200 text-lg font-medium leading-relaxed italic">
              "{result.summary}"
            </p>
          </div>
        </div>
      </div>

      {/* Analysis Console Sections */}
      <div className="grid grid-cols-1 gap-4">
        {fixedCode && (
          <div className="bg-zinc-950 border border-green-500/30 rounded-lg p-6 animate-in slide-in-from-top-4 duration-500 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
            <h3 className="text-[10px] font-mono text-green-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,1)]"></span>
              Corrected_Source_Reality (Fixed)
            </h3>
            <div className="bg-black/90 rounded border border-zinc-800 p-4 font-mono text-xs text-green-400 leading-relaxed overflow-x-auto relative group">
              <pre className="whitespace-pre-wrap">{fixedCode}</pre>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[8px] bg-green-500/20 text-green-500 px-2 py-1 rounded">V_STABLE</span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-6 hover:border-zinc-700 transition-colors">
          <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/50"></span>
            Technical_Log_Analysis
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed font-mono">
            {result.analysis}
          </p>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-6 hover:border-zinc-700 transition-colors">
          <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></span>
            Evidence_Source_Ref
          </h3>
          <div className="bg-black/80 rounded border border-zinc-800 p-4 font-mono text-xs text-green-500/70 leading-relaxed overflow-x-auto">
            {result.proof}
          </div>
        </div>

        <div className={`p-6 rounded-lg border-l-4 ${isMatch ? 'bg-zinc-950 border-green-500' : 'bg-red-950/10 border-red-500'}`}>
          <h3 className={`text-[10px] font-mono uppercase tracking-widest mb-2 ${isMatch ? 'text-green-500' : 'text-red-500'}`}>
            Threat_Assessment_Matrix
          </h3>
          <p className="text-zinc-300 text-sm leading-relaxed">
            {result.riskAssessment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuditResult;
