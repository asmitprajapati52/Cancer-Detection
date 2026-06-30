import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  // States for inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 🚀 Hit Register API
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed!');
      }

      // ✅ Register successfully hote hi login page par redirect kar do
      navigate("/login");
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

      {/* Glassmorphic Register Card */}
      <div className="w-full max-w-md bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl shadow-2xl backdrop-blur-md relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500 animate-ping"></div>
            <span className="text-xs tracking-widest text-cyan-400 uppercase font-bold">Registration Portal</span>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-xs text-slate-500 mt-1">Join the Skin Cancer Detection Network</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-xl text-xs mb-4 text-center">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input 
              type="text" required value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Asmit Prajapati"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30 transition-all"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input 
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30 transition-all"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <input 
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30 transition-all"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold py-3 px-4 rounded-xl text-sm tracking-wider uppercase transition-all duration-200 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 active:scale-[0.98] cursor-pointer disabled:bg-cyan-800"
          >
            {loading ? 'Initializing Core Account...' : 'Register Agent'}
          </button>

          {/* Link to Login */}
          <p className="text-center text-xs text-slate-500 mt-4">
            Already have access?{' '}
            <Link to="/login" className="text-cyan-400 hover:underline">
              Sign In
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Register;