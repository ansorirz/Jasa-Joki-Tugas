import React, { useState } from 'react';
import { Search, PackageCheck } from 'lucide-react';

interface OrderSearchSectionProps {
  onSearchOrder: (orderId: string) => void;
}

export const OrderSearchSection: React.FC<OrderSearchSectionProps> = ({ onSearchOrder }) => {
  const [searchId, setSearchId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      onSearchOrder(searchId.trim());
    }
  };

  return (
    <section id="cek-pesanan" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/80 border border-indigo-100 rounded-3xl p-8 sm:p-12 soft-shadow text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200 mb-4">
            <PackageCheck className="w-7 h-7" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Cek Status Pesanan
          </h2>
          <p className="text-gray-500 text-sm mt-1.5 max-w-md mx-auto">
            Masukkan ID pesanan untuk melihat status dan perkembangan tugas terbaru secara real-time.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Contoh: JKS-2026-000125"
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="gradient-bg text-white px-7 py-3.5 rounded-xl font-semibold text-sm shadow-md hover:shadow-indigo-300 hover:opacity-95 transition-all cursor-pointer whitespace-nowrap"
            >
              Cek Sekarang
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400">
            <span>Contoh ID Demo:</span>
            <button
              onClick={() => {
                setSearchId('JKS-2026-000125');
                onSearchOrder('JKS-2026-000125');
              }}
              className="text-indigo-600 hover:underline font-medium bg-indigo-50/80 px-2 py-0.5 rounded border border-indigo-100"
            >
              JKS-2026-000125 (Sedang Dikerjakan 65%)
            </button>
            <button
              onClick={() => {
                setSearchId('JKS-2026-000122');
                onSearchOrder('JKS-2026-000122');
              }}
              className="text-emerald-600 hover:underline font-medium bg-emerald-50/80 px-2 py-0.5 rounded border border-emerald-100"
            >
              JKS-2026-000122 (Selesai 100%)
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
