import React from 'react';
import { ArrowRight, MessageSquare, CheckCircle2, Star, Clock, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onOrderNow: () => void;
  onExploreServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOrderNow,
  onExploreServices,
}) => {
  return (
    <section id="home" className="relative pt-8 pb-16 md:pt-14 md:pb-24 bg-white overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-indigo-50/60 rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-10 left-0 -z-10 w-80 h-80 bg-blue-50/60 rounded-full blur-3xl opacity-60 pointer-events-none" />

      {/* Background Decorative Dot Pattern */}
      <div
        className="absolute top-12 right-1/3 -z-10 w-48 h-48 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#6366F1 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
              <span>#1 Solusi Tugas Akademik</span>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                JASKIS
              </h1>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text leading-snug">
                Solusi Tugasmu, <br className="hidden sm:inline" />
                Waktumu Jadi Lebih Berarti
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Layanan bantuan pengerjaan tugas akademik dengan proses profesional, komunikasi mudah, dan hasil yang dikerjakan secara terstruktur.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOrderNow}
                className="w-full sm:w-auto gradient-bg text-white px-8 py-3.5 rounded-xl font-semibold text-base shadow-lg shadow-indigo-200/60 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Pesan Sekarang</span>
              </button>

              <button
                onClick={onExploreServices}
                className="w-full sm:w-auto bg-white border border-gray-200 hover:border-indigo-300 text-gray-700 hover:text-indigo-600 px-7 py-3.5 rounded-xl font-semibold text-base hover:bg-indigo-50/50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Lihat Layanan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Small Trust Signals */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Garansi Bebas Plagiasi
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Revisi Gratis
              </span>
            </div>

          </div>

          {/* Right Visual Laptop Workspace & Floating Stat Cards */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* Main Laptop Mockup Frame */}
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="relative bg-gray-900 p-2 sm:p-3 rounded-2xl shadow-2xl border border-gray-800">
                {/* Laptop Camera dot */}
                <div className="flex justify-center mb-1.5">
                  <div className="w-2 h-2 rounded-full bg-gray-700" />
                </div>
                
                {/* Laptop Screen Content */}
                <div className="bg-slate-900 rounded-lg overflow-hidden border border-gray-800 aspect-[16/10] relative flex flex-col justify-center items-center p-6 text-center text-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-blue-950/80" />
                  
                  <div className="relative z-10 space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-600/30 border border-indigo-400/40 p-3 flex items-center justify-center shadow-inner">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                        <path d="M 58 26 L 74 26 L 74 42 L 58 42 L 58 54 L 42 54 L 42 38 L 58 38 Z" />
                        <path d="M 58 42 L 58 66 C 58 72 52 76 44 76 C 36 76 28 70 28 62 C 28 54 36 48 46 48 L 46 60 C 42 60 38 62 38 64 C 38 68 44 68 Z" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold tracking-tight text-white">JASKIS WORKSPACE</h3>
                      <p className="text-xs text-indigo-200">Sistem Bantuan Tugas Akademik Terstruktur</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-medium border border-emerald-500/30">
                        ● System Active & Ready
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Laptop Base */}
              <div className="w-[110%] -ml-[5%] h-3 sm:h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-b-2xl shadow-xl border-t border-gray-600" />
              <div className="w-16 sm:w-20 h-1 bg-gray-500 mx-auto rounded-b-md" />
            </div>

            {/* Floating Stat Card 1: +100 Proyek Dibantu (Top Right) */}
            <div className="absolute -top-4 right-0 sm:right-4 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl soft-shadow border border-indigo-50/80 flex items-center gap-3 animate-bounce-slow">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-indigo-600 leading-none">+100</p>
                <p className="text-xs font-semibold text-gray-600 mt-0.5">Proyek Dibantu</p>
              </div>
            </div>

            {/* Floating Stat Card 2: 98% Klien Puas (Middle Right/Right Bottom) */}
            <div className="absolute top-1/2 -right-2 sm:right-0 transform -translate-y-1/2 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl soft-shadow border border-blue-50/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0 font-bold">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-blue-600 leading-none">98%</p>
                <p className="text-xs font-semibold text-gray-600 mt-0.5">Klien Puas</p>
              </div>
            </div>

            {/* Floating Stat Card 3: 24/7 Respon Admin (Bottom Right/Left) */}
            <div className="absolute -bottom-4 right-8 sm:right-12 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl soft-shadow border border-indigo-50/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-indigo-600 leading-none">24/7</p>
                <p className="text-xs font-semibold text-gray-600 mt-0.5">Respon Admin</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
