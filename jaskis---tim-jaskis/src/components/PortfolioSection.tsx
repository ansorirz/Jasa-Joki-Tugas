import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import { ExternalLink, X, Calendar, Building2, CheckCircle } from 'lucide-react';

interface PortfolioSectionProps {
  portfolios: PortfolioItem[];
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ portfolios }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

  const categories = ['Semua', 'Skripsi', 'Jurnal', 'Makalah', 'PPT', 'Proposal', 'Lainnya'];

  const filteredItems =
    selectedCategory === 'Semua'
      ? portfolios
      : portfolios.filter((item) => item.category === selectedCategory);

  return (
    <section id="portofolio" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Portofolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">
            Hasil Pengerjaan Kami
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            Beberapa hasil proyek yang telah kami selesaikan untuk klien kami.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'gradient-bg text-white shadow-md shadow-indigo-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="bg-white rounded-2xl border border-gray-100 card-shadow overflow-hidden hover:border-indigo-200 hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-indigo-600 border border-indigo-100">
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 font-normal">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Footer info */}
              <div className="px-4 pb-4 pt-2 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                <span>{item.dateCompleted}</span>
                <span className="text-indigo-600 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Detail <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 card-shadow relative overflow-hidden">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-5">
              <img
                src={activeModalItem.thumbnailUrl}
                alt={activeModalItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {activeModalItem.category}
              </span>
              <h3 className="text-xl font-bold text-gray-900 leading-snug">
                {activeModalItem.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {activeModalItem.description}
              </p>

              <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-indigo-500" />
                  <span>Klien / Kampus: <strong>{activeModalItem.university || 'Rahasia (Privasi Klien)'}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  <span>Waktu Selesai: <strong>{activeModalItem.dateCompleted}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Status: <strong>Telah Disetujui & Bebas Plagiasi</strong></span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="w-full gradient-bg text-white py-3 rounded-xl font-semibold text-sm shadow-md"
                >
                  Tutup Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
