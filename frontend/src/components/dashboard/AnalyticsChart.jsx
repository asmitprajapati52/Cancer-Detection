import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useScan } from '../../context/ScanContext';

const AnalyticsChart = () => {
  const { scanHistory = [] } = useScan();

  // 1. Initial State: Starting baseline points jisse wave render ho
  const [liveData, setLiveData] = useState([
    { name: '', Scans: 4, Risk: 1 },
    { name: '', Scans: 3, Risk: 0 },
    { name: '', Scans: 5, Risk: 1 },
    { name: '', Scans: 2, Risk: 0 },
    { name: '', Scans: 6, Risk: 2 },
    { name: '', Scans: 4, Risk: 1 },
    { name: '', Scans: 7, Risk: 1 },
    { name: '', Scans: 5, Risk: 0 },
  ]);

  // 2. Continuous Flow Mechanism (ECG Loop)
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData((prevData) => {
        // Purane array ka pehla element hatao
        const truncatedData = prevData.slice(1);
        
        // Base counts check karo tumhari real history se
        const historyCount = scanHistory ? scanHistory.length : 0;
        const highRiskCount = scanHistory ? scanHistory.filter(s => s.disease?.toLowerCase().includes('melanoma')).length : 0;

        // Next wave point ke liye dynamic random curves generate karo (taaki wave flat na ho)
        const nextScans = Math.max(2, Math.floor(Math.random() * 5) + 3 + (historyCount % 3));
        const nextRisk = Math.max(0, Math.floor(Math.random() * 3) + (highRiskCount > 0 ? 1 : 0));

        // Naye point ko array ke end me push karo
        return [...truncatedData, { name: '', Scans: nextScans, Risk: nextRisk }];
      });
    }, 1000); // 👈 Har 1 second me wave automatic aage khiskege

    return () => clearInterval(interval);
  }, [scanHistory]);

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 sm:p-6 shadow-xl font-mono w-full h-[380px] flex flex-col justify-between overflow-hidden">
      
      {/* Chart Header */}
      <div className="border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold tracking-wider text-cyan-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            // REAL_TIME_TELEMETRY
          </h3>
          <div className="flex space-x-3 text-[10px]">
            <span className="flex items-center text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-1"></span> Scans
            </span>
            <span className="flex items-center text-rose-400">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1"></span> Risk
            </span>
          </div>
        </div>
        <p className="text-[10px] text-slate-500">Continuous matrix stream actively scrolling...</p>
      </div>

      {/* Main Chart Canvas */}
      <div className="w-full h-[240px] relative min-h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          {/* isAnimationActive={false} kiya h taki live shifting ke time wave jhatke na mare, balki smoothly move ho */}
          <AreaChart data={liveData} margin={{ top: 10, right: 5, left: -30, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.15} />
            <XAxis dataKey="name" stroke="#64748b" font-size={10} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={10} tickLine={false} domain={[0, 12]} />
            
            <Tooltip 
              contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontFamily: 'monospace', fontSize: '11px' }}
              itemStyle={{ color: '#f1f5f9' }}
            />

            {/* Total Scans Moving Stream */}
            <Area 
              type="monotone" 
              dataKey="Scans" 
              stroke="#06b6d4" 
              fillOpacity={0.08} 
              fill="url(#flowScans)" 
              strokeWidth={2}
              isAnimationActive={false} 
            />

            {/* Critical Risk Moving Stream */}
            <Area 
              type="monotone" 
              dataKey="Risk" 
              stroke="#f43f5e" 
              fillOpacity={0.08} 
              fill="url(#flowRisk)" 
              strokeWidth={2}
              isAnimationActive={false}
            />

            <defs>
              <linearGradient id="flowScans" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="flowRisk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default AnalyticsChart;