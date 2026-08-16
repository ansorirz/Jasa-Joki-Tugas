import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, CheckCircle2, MessageSquare, Clock, Star, Check } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { navigateTo, openOrderModalWithService, settings } = useApp();

  const siteName = settings?.siteName || 'JASKIS';
  const siteTagline = settings?.siteTagline || 'Solusi Tugasmu, Waktumu Jadi Lebih Berarti';
  const siteDescription = settings?.siteDescription || 'Layanan bantuan pengerjaan tugas akademik dengan proses profesional, komunikasi mudah, dan hasil yang dikerjakan secara terstruktur.';

  return (
    <section className="relative bg-mesh-hero pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden border-b border-slate-200/70">
      {/* Decorative Background Motif Layers */}
      <div className="absolute inset-0 bg-pattern-grid pointer-events-none opacity-80" />
      <div className="absolute inset-0 bg-pattern-dots pointer-events-none opacity-40" />

      {/* Atmospheric Ambient Glows & Motif Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 left-1/3 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Geometric Constellation SVG Watermark */}
      <svg
        className="absolute top-8 right-12 w-80 h-80 text-indigo-500/10 pointer-events-none hidden lg:block"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <circle cx="100" cy="100" r="80" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="50" />
        <circle cx="100" cy="100" r="20" />
        <line x1="20" y1="100" x2="180" y2="100" strokeDasharray="2 2" />
        <line x1="100" y1="20" x2="100" y2="180" strokeDasharray="2 2" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-100/80 text-indigo-600 text-xs sm:text-sm font-bold font-poppins">
              <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>#1 Solusi Tugas Akademik</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-black text-slate-900 tracking-tight leading-none font-montserrat">
                {siteName}
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-blue-600 leading-[1.18] tracking-tight font-montserrat">
                {siteTagline}
              </h2>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl font-roboto">
              {siteDescription}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4 font-poppins">
              <button
                onClick={() => openOrderModalWithService()}
                className="px-7 py-3.5 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 fill-white/20" />
                <span>Pesan Sekarang</span>
              </button>

              <button
                onClick={() => navigateTo('layanan')}
                className="px-6 py-3.5 rounded-xl text-base font-bold text-slate-800 bg-white border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Lihat Layanan</span>
                <ArrowRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            {/* Guarantees */}
            <div className="pt-4 flex items-center gap-6 text-xs sm:text-sm text-slate-600 font-semibold font-lato">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Garansi Bebas Plagiasi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Revisi Gratis</span>
              </div>
            </div>
          </div>

          {/* Right Column: Graphic Laptop */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Laptop Shell */}
              <div className="rounded-3xl bg-slate-900 p-3 sm:p-4 shadow-2xl border border-slate-800 relative z-10">
                {/* Camera dot */}
                <div className="w-2 h-2 rounded-full bg-slate-700 mx-auto mb-3" />
                
                {/* Laptop Screen Content */}
                <div className="rounded-2xl bg-[#0d111d] p-8 text-center text-white min-h-[280px] flex flex-col items-center justify-center space-y-4 border border-slate-800">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/90 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <MessageSquare className="w-6 h-6 fill-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold tracking-wider text-white uppercase">
                      JASKIS WORKSPACE
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-medium">
                      Sistem Bantuan Tugas Akademik Terstruktur
                    </p>
                  </div>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      System Active & Ready
                    </span>
                  </div>
                </div>
              </div>
              {/* Laptop Base Stand */}
              <div className="h-3 w-[110%] -ml-[5%] bg-slate-800 rounded-b-2xl shadow-md" />

              {/* Floating Card 1: Top Right (+100 Proyek Dibantu) */}
              <div className="absolute -top-6 -right-2 sm:-right-6 bg-white px-4 py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-20">
                <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-blue-700 font-mono leading-none">+100</p>
                  <p className="text-[11px] font-bold text-slate-500 mt-0.5">Proyek Dibantu</p>
                </div>
              </div>

              {/* Floating Card 2: Middle Right (98% Klien Puas) */}
              <div className="absolute top-1/2 -right-4 sm:-right-8 -translate-y-1/2 bg-white px-4 py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-20">
                <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 border border-amber-100">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-blue-700 font-mono leading-none">98%</p>
                  <p className="text-[11px] font-bold text-slate-500 mt-0.5">Klien Puas</p>
                </div>
              </div>

              {/* Floating Card 3: Bottom Right (24/7 Respon Admin) */}
              <div className="absolute -bottom-6 right-2 sm:right-4 bg-white px-4 py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-20">
                <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-indigo-900 font-mono leading-none">24/7</p>
                  <p className="text-[11px] font-bold text-slate-500 mt-0.5">Respon Admin</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
