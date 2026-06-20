import React, { useState } from 'react'
import { useScan } from '../context/ScanContext';

const ScanMole = () => {
  const {saveScanResult}=useScan();
  


  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const startAnalysis = () => {
    setLoading(true);
    setTimeout(() => {

     const scanData={
        id:`SCAN_${Date.now()}`, // history ke liye
        date: new Date().toLocaleDateString(), //TOday date
        disease: "Melanoma (Sample Detection)",
        confidence: "87.5%",
        image: preview
      };

      setResult(scanData);
      saveScanResult(scanData);
    }, 3000);
  };

  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setLoading(false);
    setResult(null);
  };

  return (
    // MAIN CONTAINER: Tech-Grid Pattern Background
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-6 font-mono relative overflow-hidden selection:bg-cyan-500/30" >
      
      {/* Sci-Fi Background Elements (Decorative Tech Lines) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* HEADER WITH TECH BORDERS */}
      <div className="text-center mb-10 z-10">
        <div className="text-xs uppercase tracking-[0.3em] text-cyan-400 mb-2 font-black animate-pulse">// BIOMETRIC DIAGNOSTIC SYSTEM</div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
          DERMA_SCAN AI
        </h1>
      </div>

      {/* MAIN FRAME WORKSPACE */}
      <div className="w-full max-w-md z-10">
        
        {/* CONDITION 1: SCANNING MODE (The Moving Laser Effect) */}
        {loading && (
          <div className="bg-slate-900/60 backdrop-blur-md border border-cyan-500/40 p-8 rounded-2xl text-center shadow-[0_0_30px_rgba(34,211,238,0.15)] relative overflow-hidden group">
            
            {/* Visual Scan Box */}
            <div className="w-64 h-64 mx-auto relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center mb-6">
              {preview && <img src={preview} alt="Scanning Source" className="w-full h-full object-cover opacity-60" />}
              
              {/* MOVING NEON LASER LINE */}
              <div className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_12px_#22d3ee] animate-[bounce_2s_infinite]"></div>
              
              {/* Corner Tech Brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400"></div>
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400"></div>
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400"></div>
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400"></div>
            </div>

            <div className="space-y-2">
              <p className="text-cyan-400 font-bold tracking-widest text-sm animate-pulse">SYSTEM STATUS: SCANNING_ACTIVE</p>
              <p className="text-xs text-slate-400">Analyzing epidermal layers for cellular mutation matrix...</p>
            </div>
          </div>
        )}

        {/* CONDITION 2: UPLOAD & PREVIEW PANEL */}
        {!loading && !result && (
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl shadow-xl">
            
            {!preview ? (
              // Empty State Custom Dropzone
              <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 bg-slate-950/50 p-10 rounded-xl text-center cursor-pointer transition-all duration-300 relative group overflow-hidden">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="absolute inset-0 opacity-0 cursor-pointer z-20"
                />
                <div className="space-y-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300 text-slate-500 group-hover:text-cyan-400">📷</div>
                  <div>
                    <p className="text-sm font-bold text-slate-300 group-hover:text-slate-100 transition-colors">INITIALIZE SCAN SOURCE</p>
                    <p className="text-xs text-slate-500 mt-1">Click or drag mole image file</p>
                  </div>
                </div>
              </div>
            ) : (
              // Source Image Loaded State
              <div className="flex flex-col items-center">
                <div className="w-64 h-64 relative rounded-xl overflow-hidden border-2 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.1)] mb-6">
                  <img src={preview} alt="Selected Mole" className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2 bg-slate-950/80 text-[10px] px-2 py-0.5 rounded border border-slate-800 text-emerald-400">SOURCE_READY</div>
                </div>
                
                <button 
                  onClick={startAnalysis}
                  className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-slate-950 font-black py-3.5 px-6 rounded-xl tracking-wider uppercase transition-all duration-300 active:scale-[0.98] shadow-lg shadow-cyan-500/10"
                >
                  Execute Neural Scan
                </button>
              </div>
            )}
          </div>
        )}

        {/* CONDITION 3: SCIFI REPORT CARD */}
        {result && (
          <div className="bg-slate-900/80 backdrop-blur-md border border-emerald-500/30 p-8 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.1)] relative">
            
            {/* Header Matrix Plate */}
            <div className="border-b border-slate-800 pb-4 mb-6 text-center">
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded font-bold uppercase tracking-widest">DIAGNOSIS_COMPLETE</span>
              <h2 className="text-lg font-black text-slate-200 mt-3 tracking-tight">AI BIOMETRIC DATA REPORT</h2>
            </div>
            
            {/* Metrics Breakdown */}
            <div className="space-y-5 mb-8">
              <div className="bg-slate-950/60 border border-slate-800/60 p-4 rounded-xl">
                <p className="text-slate-500 text-[11px] uppercase tracking-wider mb-1">Target Classification</p>
                <p className="text-lg font-bold text-rose-400 tracking-wide">{result.disease}</p>
              </div>
              
              <div className="bg-slate-950/60 border border-slate-800/60 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-[11px] uppercase tracking-wider mb-1">Confidence Score</p>
                  <p className="text-3xl font-black text-amber-400 tracking-tighter">{result.confidence}</p>
                </div>
                {/* Visual Circle Graph Ring Placeholder */}
                <div className="w-14 h-14 rounded-full border-4 border-slate-800 border-t-amber-400 flex items-center justify-center text-[10px] text-amber-400 font-bold animate-[spin_3s_linear_infinite]">AI</div>
              </div>
            </div>

            {/* Reset Button */}
            <button 
              onClick={handleReset}
              className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 font-bold py-3 px-6 rounded-xl transition-all duration-200 text-xs tracking-widest uppercase"
            >
              🔄 Terminate Session / New Scan
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ScanMole