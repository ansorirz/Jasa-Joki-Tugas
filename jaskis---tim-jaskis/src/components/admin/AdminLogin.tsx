import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { Lock, User, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, settings, navigateTo } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = loginAdmin(username, password);
    if (!success) {
      setErrorMsg('Username atau password yang Anda masukkan salah.');
    }
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-1/4 left-10 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl relative z-10 animate-fade-in">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
            Login Admin Dashboard
          </h2>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            Masuk untuk mengakses sistem administrasi JASKIS.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2.5 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Username Admin
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username (default: admin)"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 text-slate-900 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password (default: admin123)"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 text-slate-900 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
              />
              <span>Ingat saya</span>
            </label>

            <button
              type="button"
              onClick={() => alert(`Kredensial login default:\nUsername: ${settings.adminUsername}\nPassword: ${settings.adminPasswordHash}`)}
              className="text-indigo-600 hover:underline font-semibold"
            >
              Lupa Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-purple-blue hover:opacity-95 shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>Masuk ke Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400 font-mono">
            Demo Credentials: <span className="text-slate-600 font-bold">{settings.adminUsername}</span> / <span className="text-slate-600 font-bold">{settings.adminPasswordHash}</span>
          </p>
          <button
            onClick={() => navigateTo('home')}
            className="mt-3 text-xs font-semibold text-slate-500 hover:text-indigo-600 cursor-pointer"
          >
            ← Kembali ke Beranda
          </button>
        </div>

      </div>
    </div>
  );
};
