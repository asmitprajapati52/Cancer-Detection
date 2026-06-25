import React, { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ScanMole from './pages/ScanMole';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import { AuthProvider } from './context/AuthContext';
import { ScanProvider } from './context/ScanContext';
import ProtectedRoute from './ProtectedRoute';

const AppLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-mono overflow-x-hidden relative">
      {/* Sidebar (Ab iske andar koi absolute button nahi hai) */}
      <Sidebar isOpen={isSidebarOpen} />
      
      {/* Master Toggle Button (Ab yeh hamesha visible rahega aur sidebar ke sath hilega) */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{ left: isSidebarOpen ? '244px' : '12px' }}
        className="fixed top-6 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 hover:border-emerald-400 flex items-center justify-center text-xs text-slate-400 hover:text-emerald-400 transition-all duration-300 z-50 shadow-lg font-sans font-bold cursor-pointer"
      >
        {isSidebarOpen ? '‹' : '›'}
      </button>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>    
      <ScanProvider>
        <div>
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard' replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <AppLayout><Dashboard /></AppLayout>
          </ProtectedRoute>
          }/>
        <Route path='/scanmole' element={
          <ProtectedRoute>
            <AppLayout><ScanMole /></AppLayout>
          </ProtectedRoute>
          }/>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </div>
      </ScanProvider>   
    </AuthProvider>
  )
}

export default App;