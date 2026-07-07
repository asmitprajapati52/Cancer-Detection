import React, { useState, useRef } from 'react';

const ImageUploader = ({ onImageSelect }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file));
      onImageSelect(file);
    } else {
      alert("Please upload a valid image file (PNG/JPG)!");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div 
      onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}
      className={`w-full border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 backdrop-blur-sm relative group cursor-pointer
        ${dragActive ? 'border-emerald-400 bg-emerald-950/10' : 'border-slate-800 bg-slate-900/20 hover:border-slate-700'}`}
      onClick={() => fileInputRef.current.click()}
    >
      <input 
        ref={fileInputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
      />

      {preview ? (
        <div className="space-y-4">
          <img src={preview} alt="Skin Matrix Preview" className="max-h-64 mx-auto rounded-xl border border-slate-800 shadow-xl object-cover" />
          <p className="text-xs text-slate-500 font-mono group-hover:text-emerald-400 transition-colors">
            Click or drag another image to re-upload matrix layer
          </p>
        </div>
      ) : (
        <div className="space-y-4 font-mono py-6">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:border-emerald-500/40 transition-colors">
            <svg className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-300">Drag & Drop Skin Pathology Image</p>
            <p className="text-xs text-slate-500 mt-1">Supports JPEG, PNG, WEBP metrics</p>
          </div>
          <button type="button" className="text-xs bg-slate-950 border border-slate-800 text-slate-400 px-4 py-2 rounded-xl group-hover:border-emerald-500 group-hover:text-emerald-400 transition-all">
            Browse Matrix File
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;