import React from 'react'
import HistoryTable from '../components/dashboard/HistoryTable';
import QuickStats from '../components/dashboard/QuickStats';
import AnalyticsChart from '../components/dashboard/AnalyticsChart';

const Dashboard = () => {
  return (
    // Pure body me w-full aur overflow-x-hidden lagaya h taki horizontal scrollbar na aaye
    <div className="space-y-6 sm:space-y-8 animate-fade-in font-mono p-4 sm:p-6 bg-slate-950 min-h-screen text-slate-100 w-full overflow-x-hidden relative">
      
      {/* Sci-Fi Background Glows (Optional: Beautiful subtle medical matrix effect) */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* 1. Header/Welcome Row */}
      <div className="border-b border-slate-800/60 pb-4 relative z-10">
        <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-400 mb-1 font-black animate-pulse">
          // SYSTEM_COMMAND_MATRIX
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
          Oncology Command Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Real-time AI diagnostic metrics and patient screening logs.
        </p>
      </div>

      {/* 2. Dynamic Stats Cards Grid */}
      <div className="w-full relative z-10">
        <QuickStats />
      </div>

      {/* 3. Bottom Row: Layout Matrix (Table + Chart Side-by-Side) */}
      {/* lg:grid-cols-3 lagaya hai aur items-stretch se dono dibbe barabar height ke ho jayenge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-stretch min-w-0 relative z-10">
        
        {/* Left Block: Recent Activity Log (Takes 2 Columns) */}
        <div className="lg:col-span-2 p-4 sm:p-6 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800/80 w-full overflow-hidden min-w-0 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-800 pb-4 mb-4 flex justify-between items-center">
              <h3 className="text-base sm:text-lg font-bold text-slate-200 tracking-wide">
                Recent Analysis Logs
              </h3>
              <span className="px-2 py-1 text-[10px] font-bold uppercase rounded bg-slate-800 text-emerald-400 border border-emerald-500/20">
                Live Feed
              </span>
            </div>
            
            {/* Real-time Dynamic History Table component */}
            <HistoryTable />
          </div>
        </div>

        {/* Right Block: Fixed Dimension handling container (Takes 1 Column) */}
        {/* min-w-0 aur w-full chart ko squeeze hone se rokega */}
        <div className="lg:col-span-1 w-full min-w-0">
          <AnalyticsChart />
        </div>

      </div>

    </div>
  )
}

export default Dashboard