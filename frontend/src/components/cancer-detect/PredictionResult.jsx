import React from 'react';

const PredictionResult = ({ result, onReset }) => {
  const { prediction, confidence, createdAt } = result;

  // Simple conditional styling based on risks flags
  const isHighRisk = prediction.toLowerCase().includes('melanoma') || prediction.toLowerCase().includes('carcinoma');

  return (
    <div className="w-full bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl shadow-2xl backdrop-blur-md font-mono space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Analysis Neural Logs</h3>
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${isHighRisk ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
          {isHighRisk ? 'Attention Required' : 'Logs Stable'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/60">
          <span className="text-[10px] uppercase text-slate-500 tracking-wider">Detected Pathology</span>
          <p className="text-base font-bold text-slate-200 mt-1">{prediction}</p>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/60">
          <span className="text-[10px] uppercase text-slate-500 tracking-wider">Model Confidence Metric</span>
          <p className="text-base font-bold text-emerald-400 mt-1">{Number(confidence).toFixed(2)}%</p>
        </div>
      </div>

      <div className="text-[10px] text-slate-600 flex justify-between items-center">
        <span>Timestamp: {createdAt ? new Date(createdAt).toLocaleString() : new Date().toLocaleString()}</span>
        <button 
          onClick={onReset}
          className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors uppercase font-bold tracking-wider cursor-pointer"
        >
          Clear Node Logs
        </button>
      </div>
    </div>
  );
};

export default PredictionResult;