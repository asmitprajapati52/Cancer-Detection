import React from 'react';
import { useScan } from '../../context/ScanContext';

const QuickStats = () => {
  const { scanHistory } = useScan();

  // Filter high risk scans (e.g., Melanoma) for metrics
  const highRiskCount = scanHistory.filter(scan => 
    scan.disease.toLowerCase().includes('melanoma')
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono w-full">
      
      {/* Card 1: Total Scans */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-bl-full blur-xl"></div>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest">// TOTAL_SCANS</p>
        <div className="flex items-baseline space-x-2 mt-2">
          <span className="text-3xl font-black tracking-tight text-slate-100">{scanHistory.length}</span>
          <span className="text-[10px] text-emerald-400 font-bold">LOGGED</span>
        </div>
      </div>

      {/* Card 2: Risk Flag Matrix */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/5 rounded-bl-full blur-xl"></div>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest">// CRITICAL_FLAGS</p>
        <div className="flex items-baseline space-x-2 mt-2">
          <span className="text-3xl font-black tracking-tight text-rose-400">{highRiskCount}</span>
          <span className="text-[10px] text-rose-500/60 font-bold">ATTENTION</span>
        </div>
      </div>

      {/* Card 3: System Status */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-full blur-xl"></div>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest">// NETWORK_STATUS</p>
        <div className="flex items-baseline space-x-2 mt-2">
          <span className="text-lg font-black tracking-wider text-emerald-400">ONLINE</span>
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1 self-center"></div>
        </div>
      </div>

    </div>
  );
};

export default QuickStats;