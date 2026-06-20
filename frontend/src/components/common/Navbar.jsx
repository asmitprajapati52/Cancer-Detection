import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, Logout } = useAuth();

  return (
    <nav className="w-full bg-slate-900 border-b border-slate-800 text-slate-100 px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-40">
      
      {/* Left Side: Brand Name linked to Dashboard */}
      <Link to="/dashboard" className="flex items-center gap-2 group cursor-pointer">
        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
        <span className="text-lg font-bold tracking-wider bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-sans group-hover:opacity-90 transition-opacity">
          Skin Cancer Detection
        </span>
      </Link>

      {/* Right Side: Only User Status & Action */}  
      <div className="flex items-center gap-4 text-sm">
        
        {/* Bell Icon for future notifications (Just for a premium look) */}
        <button className="text-slate-400 hover:text-emerald-400 p-2 rounded-lg hover:bg-slate-800 transition-all cursor-pointer mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
        </button>

        {/* Auth Logic */}
        {user ? (
          <div className="flex items-center gap-4 bg-slate-800/60 px-4 py-2 rounded-xl border border-slate-700/50">
            <span className="text-slate-300 font-medium">
              Welcome, <strong className="text-emerald-400 font-semibold">{user.name}</strong>
            </span>
            <button 
              onClick={Logout} 
              className="bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-red-500/20 transition-all duration-200 cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link 
            to="/login"
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs tracking-wider uppercase transition-all duration-200 shadow-lg shadow-emerald-500/10 cursor-pointer"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
 
export default Navbar;