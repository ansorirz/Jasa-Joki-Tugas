import React from 'react';
import { useApp } from '../../context/AppContext';
import { Headphones, MessageSquareText, Laptop, FileText, ArrowRight } from 'lucide-react';

export const CtaSection: React.FC = () => {
  const { openOrderModalWithService, settings } = useApp();

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-purple-blue p-8 sm:p-12 lg:p-16 text-white overflow-hidden shadow-xl">
          {/* Background Decorative Icons */}
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <Laptop className="absolute top-6 right-12 w-20 h-20 text-white/10 pointer-events-none hidden sm:block" />
          <Headphones className="absolute bottom-6 left-8 w-16 h-16 text-white/10 pointer-events-none hidden sm:block" />
          <FileText className="absolute top-12 left-1/3 w-12 h-12 text-white/10 pointer-events-none hidden md:block" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold border border-white/20">
              <MessageSquareText className="w-4 h-4" />
              <span>Respon Cepat 24 Jam</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {settings.ctaHeadline || 'Punya Tugas? Mari Konsultasikan.'}
            </h2>

            <p className="text-indigo-100 text-sm sm:text-lg font-medium leading-relaxed">
              {settings.ctaSubheadline || 'Tim profesional kami siap membantu penyelesaian tugas akademikmu dengan cepat, rapi, dan terjamin aman.'}
            </p>

            <div className="pt-2 flex justify-center">
              <button
                onClick={() => openOrderModalWithService()}
                className="px-8 py-4 rounded-2xl text-base font-extrabold text-indigo-700 bg-white hover:bg-indigo-50 transition-all shadow-lg shadow-black/10 flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>Konsultasi Sekarang</span>
                <ArrowRight className="w-5 h-5 text-indigo-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
