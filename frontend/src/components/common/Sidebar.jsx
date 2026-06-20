import React from 'react'
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'AI Scan', path: '/scanmole', icon: '📷' },
  ];

  return (
    <div 
      className={`min-h-screen bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-all duration-300 ease-in-out overflow-hidden z-40
        ${isOpen ? 'w-64' : 'w-0 border-r-0'}`}
    >
      {/* Wrapper to hold content and avoid text shrinking */}
      <div className="min-w-[256px]">
        {/* Branding/Logo Section */}
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold tracking-wider text-emerald-400 uppercase font-mono">
            🛡️ DermaScan AI
          </h2>
        </div>
        
        {/* Navigation Links Loop */}
        <div className="flex flex-col gap-2 p-4">
          {menuItems.map((item, index) => {
            return (
              <Link 
                to={item.path} 
                key={index}
                className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/60 hover:text-emerald-400 transition-all duration-200 font-medium"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm tracking-wide">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40 min-w-[256px]">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xs text-emerald-400 font-bold">
            AI
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-200">Oncology Panel</span>
            <span className="text-[10px] text-slate-500 font-mono">v1.0.0-active</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;