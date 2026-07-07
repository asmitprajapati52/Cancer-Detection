import React from 'react';

const Loader = ({ message = "Verifying Neural Logs..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 font-mono">
      <div className="relative w-16 h-16">
        {/* Outer Cyber Matrix Ring */}
        <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full"></div>
        {/* Spinning Tech Ring */}
        <div className="absolute inset-0 border-4 border-t-emerald-500 border-r-transparent rounded-full animate-spin"></div>
        {/* Inner Core Ping */}
        <div className="absolute inset-3 bg-cyan-500/10 rounded-full flex items-center justify-center animate-pulse">
          <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase animate-pulse">
          {message}
        </span>
        <span className="text-[10px] text-slate-500 mt-1">Analyzing Model Tensors...</span>
      </div>
    </div>
  );
};

export default Loader;