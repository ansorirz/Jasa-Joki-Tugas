import React, { useState } from 'react';
import { JaskisLogo } from './JaskisLogo';
import { Lock, User, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  adminCredentials: { username: string; password: string };
  onLoginSuccess: () => void;
  onBackToHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  adminCredentials,
  onLoginSuccess,
  onBackToHome,
}) => {
  const [username, setUsername] = useState(adminCredentials.username);
  const [password, setPassword] = useState(adminCredentials.password);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [forgotModal, setForgotModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      username.trim() === adminCredentials.username &&
      password === adminCredentials.password
    ) {
      setErrorMsg('');
      onLoginSuccess();
    } else {
      setErrorMsg('Username atau password yang Anda masukkan salah.');
    }
  };

  const handleDemoFill = () => {
    setUsername(adminCredentials.username);
    setPassword(adminCredentials.password);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Abstract purple-blue blobs in background */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />

      {/* Top Back Home Button */}
      <button
        onClick={onBackToHome}
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-semibold text-gray-600 bg-white hover:bg-gray-50 border border-gray-200 px-3.5 py-2 rounded-xl shadow-sm transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Website</span>
      </button>

      {/* Login Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full card-shadow border border-gray-100 relative z-10 space-y-6">
        
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <JaskisLogo size="lg" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Login Admin
          </h1>
          <p className="text-xs text-gray-500">
            Masuk untuk mengakses dashboard administrasi JASKIS.
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-semibold flex items-center gap-2 border border-red-100">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email/Username Input */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Email / Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@jaskis.com"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-indigo-500 font-medium"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-indigo-500 font-medium"
              />
            </div>
          </div>

          {/* Checkbox & Forgot password */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              onClick={() => setForgotModal(true)}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Lupa Password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full gradient-bg text-white py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-indigo-300 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer pt-3"
          >
            <KeyRound className="w-4 h-4" />
            <span>Login Dashboard</span>
          </button>
        </form>

        {/* Demo Quick Fill Helper */}
        <div className="pt-4 border-t border-gray-100 text-center space-y-2">
          <p className="text-[11px] text-gray-400">Demo Mode Active:</p>
          <button
            onClick={handleDemoFill}
            className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-2 rounded-xl text-xs font-bold transition-colors border border-indigo-100"
          >
            Isi Kredensial Demo ({adminCredentials.username})
          </button>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {forgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 card-shadow">
            <h3 className="text-lg font-bold text-gray-900">Reset Password Admin</h3>
            <p className="text-xs text-gray-500">
              Silakan hubungi Super Admin/Sistem Administrator JASKIS untuk pemulihan akun.
            </p>
            <div className="bg-amber-50 p-3 rounded-xl text-xs text-amber-700 border border-amber-200">
              Kredensial Aktif: <strong>{adminCredentials.username}</strong>
            </div>
            <button
              onClick={() => setForgotModal(false)}
              className="w-full gradient-bg text-white py-2.5 rounded-xl font-semibold text-xs"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
