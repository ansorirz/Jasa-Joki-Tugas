import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceCategory } from '../../types';
import { ExternalLink, Eye, ArrowRight, FolderCheck } from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const { portfolio, openOrderModalWithService } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [previewItem, setPreviewItem] = useState<any | null>(null);

  const categories = ['Semua', 'Skripsi', 'Jurnal / SINTA', 'Makalah', 'PPT', 'Proposal', 'Lainnya'];

  const filteredPortfolio = selectedCategory === 'Semua'
    ? portfolio
    : portfolio.filter(item => {
        if (selectedCategory === 'Jurnal / SINTA') {
          return item.category === 'Jurnal / SINTA' || item.category === 'Jurnal';
        }
        return item.category === selectedCategory;
      });

  return (
    <section id="portofolio" className="relative bg-white py-16 sm:py-20 border-t border-slate-200/90 overflow-hidden">
      {/* Pattern Matrix & Geometric Motifs */}
      <div className="absolute inset-0 bg-pattern-grid opacity-70 pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-3 font-poppins">
            <FolderCheck className="w-3.5 h-3.5" />
            <span>Portofolio Riset & Karya</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-montserrat">
            Hasil Pengerjaan Kami
          </h2>
          <p className="text-slate-600 text-base mt-2 font-normal font-roboto">
            Beberapa hasil proyek yang telah kami selesaikan untuk klien kami dengan jaminan kualitas tinggi.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10 font-poppins">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-purple-blue text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPortfolio.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Thumbnail Container */}
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback visual background
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPreviewItem(item)}
                    className="p-2.5 rounded-full bg-white text-slate-900 font-bold hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"
                    title="Lihat Detail"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/90 backdrop-blur-md text-indigo-700 shadow-sm font-poppins">
                  {item.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors font-poppins">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-2 font-normal font-roboto">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-semibold font-opensans">
                  <span>{item.clientUni || 'Mahasiswa'}</span>
                  <button
                    onClick={() => setPreviewItem(item)}
                    className="text-indigo-600 font-bold hover:underline flex items-center gap-1 cursor-pointer font-poppins"
                  >
                    <span>Detail</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {previewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-fade-in">
              <div className="relative h-56 bg-slate-100">
                <img
                  src={previewItem.coverImage}
                  alt={previewItem.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setPreviewItem(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/70 text-white flex items-center justify-center hover:bg-slate-900 transition-colors"
                >
                  ✕
                </button>
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white">
                  {previewItem.category}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {previewItem.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {previewItem.description}
                </p>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                  <p><strong className="text-slate-800">Klien:</strong> {previewItem.clientUni}</p>
                  <p><strong className="text-slate-800">Tanggal Pengerjaan:</strong> {previewItem.date}</p>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => {
                      const cat = previewItem.category as ServiceCategory;
                      setPreviewItem(null);
                      openOrderModalWithService(cat);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl text-center font-bold text-sm text-white bg-gradient-purple-blue hover:opacity-95 shadow-md cursor-pointer"
                  >
                    Pesan Layanan Serupa
                  </button>
                  <button
                    onClick={() => setPreviewItem(null)}
                    className="py-3 px-4 rounded-xl font-semibold text-sm border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
