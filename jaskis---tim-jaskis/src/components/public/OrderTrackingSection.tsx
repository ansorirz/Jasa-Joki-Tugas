import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, ArrowRight, ShieldCheck } from 'lucide-react';

export const OrderTrackingSection: React.FC = () => {
  const { navigateTo } = useApp();
  const [orderInput, setOrderInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderInput.trim()) return;
    navigateTo('cek-pesanan', orderInput.trim());
  };

  return (
    <section id="cek-pesanan" className="bg-slate-50 py-16 sm:py-20 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold mb-3">
          <ShieldCheck className="w-4 h-4" />
          <span>Real-time Tracking</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Cek Status Pesanan
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
          Masukkan ID pesanan Anda untuk melihat progress pengerjaan terbaru.
        </p>

        <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto">
          <div className="bg-white p-2 sm:p-2.5 rounded-2xl border border-slate-200 shadow-lg shadow-indigo-500/5 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1 flex items-center px-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={orderInput}
                onChange={e => setOrderInput(e.target.value)}
                placeholder="Contoh: JKS-2026-000125"
                className="w-full py-2 pl-3 pr-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-mono"
              />
            </div>
            <button
              type="submit"
              className="py-3 px-6 rounded-xl font-bold text-sm text-white bg-gradient-purple-blue hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Cek Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400 font-medium">
          <span>Contoh ID: <button onClick={() => navigateTo('cek-pesanan', 'JKS-2026-000125')} className="text-indigo-600 font-mono hover:underline">JKS-2026-000125</button></span>
        </div>
      </div>
    </section>
  );
};
