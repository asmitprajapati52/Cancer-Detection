import React, { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom'; // 🚀 Link import kar liya hai
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { Login: loginContext } = useAuth(); 
  const navigate = useNavigate();

  // Inputs ke liye states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed!');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      loginContext(data.user);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-mono">
      {/* Dynamic Background Blur Effect */}
      <div className="absolute w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl top-1/4 left-1/4 animate-pulse"></div>
      <div className="absolute w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl bottom-1/4 right-1/4 animate-pulse"></div>

      {/* Glassmorphic Login Card */}
      <div className="w-full max-w-md bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl shadow-2xl backdrop-blur-md relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
            <span className="text-xs tracking-widest text-emerald-400 uppercase font-bold">Secure Portal</span>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-xs text-slate-500 mt-1">Enter credentials to access Skin Cancer Detection</p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-xl text-xs mb-4 text-center">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/30 transition-all"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/30 transition-all"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 px-4 rounded-xl text-sm tracking-wider uppercase transition-all duration-200 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 active:scale-[0.98] cursor-pointer disabled:bg-emerald-800"
          >
            {loading ? 'Verifying Neural Logs...' : 'Access Terminal'}
          </button>

        </form>

        {/* 🎯 Teri Create Account Link yahan set ho gayi hai card ke andar */}
        <p className="text-center text-xs text-slate-500 mt-6">
          New here? <Link to="/register" className="text-emerald-400 hover:underline">Create Account</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;