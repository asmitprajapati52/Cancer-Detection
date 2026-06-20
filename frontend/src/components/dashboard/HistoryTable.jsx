import React from 'react';
import { useScan } from '../../context/ScanContext'; // Path sahi check kar lena

const HistoryTable = () => {
  const { scanHistory } = useScan();

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-xl font-mono">
      {/* Table Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <h3 className="text-sm font-bold tracking-wider text-cyan-400">// RECENT_SCAN_LOGS</h3>
        <span className="text-[10px] bg-slate-950 text-slate-500 border border-slate-800 px-2 py-0.5 rounded">
          COUNT: {scanHistory.length}
        </span>
      </div>

      {/* Conditionally Render Empty State or Table */}
      {scanHistory.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-slate-800 rounded-xl bg-slate-950/30">
          <p className="text-xs text-slate-500 uppercase tracking-widest">No matrix logs found</p>
          <p className="text-[10px] text-slate-600 mt-1">Execute a neural scan to initialize history</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/60 text-slate-500 text-[11px] uppercase tracking-wider">
                <th className="pb-3 font-semibold">Scan ID</th>
                <th className="pb-3 font-semibold">Target Image</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Diagnosis</th>
                <th className="pb-3 font-semibold text-right">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-xs">
              {scanHistory.map((scan) => (
                <tr key={scan.id} className="hover:bg-slate-950/40 transition-colors group">
                  {/* Scan ID */}
                  <td className="py-3.5 text-slate-400 font-bold group-hover:text-cyan-400 transition-colors">
                    {scan.id.substring(0, 12)}...
                  </td>
                  
                  {/* Tiny Image Preview */}
                  <td className="py-3.5">
                    <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                      {scan.image ? (
                        <img src={scan.image} alt="Mole preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-700">NA</div>
                      )}
                    </div>
                  </td>
                  
                  {/* Date */}
                  <td className="py-3.5 text-slate-500">{scan.date}</td>
                  
                  {/* Disease Type */}
                  <td className="py-3.5 font-semibold text-rose-400 tracking-wide">
                    {scan.disease.split(' ')[0]} {/* Shorter text for clean table */}
                  </td>
                  
                  {/* Confidence */}
                  <td className="py-3.5 text-right font-black text-amber-400 tracking-tighter">
                    {scan.confidence}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoryTable;