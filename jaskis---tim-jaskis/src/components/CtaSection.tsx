import React from 'react';
import { Headset, MessageSquare, Laptop, FileCheck, Sparkles } from 'lucide-react';

interface CtaSectionProps {
  onConsultation: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onConsultation }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gradient-bg rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl shadow-indigo-200/50">
          
          {/* Decorative background shapes */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Konsultasi Gratis & Fast Response</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Punya Tugas? Mari Konsultasikan.
              </h2>

              <p className="text-indigo-100 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-normal">
                Tim kami siap memberikan penyelesaian tugas akademikmu secara terstruktur, rapi, dan tepat waktu.
              </p>

              <div className="pt-2">
                <button
                  onClick={onConsultation}
                  className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-3.5 rounded-xl font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all inline-flex items-center gap-2.5 cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 text-indigo-600" />
                  <span>Konsultasi Sekarang</span>
                </button>
              </div>
            </div>

            {/* Right Graphic Illustrations (Headset, Laptop, Chat) */}
            <div className="lg:col-span-4 flex justify-center items-center">
              <div className="relative w-56 h-56 flex items-center justify-center">
                
                {/* Central Circle */}
                <div className="w-36 h-36 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                  <Headset className="w-20 h-20 text-white animate-pulse" />
                </div>

                {/* Orbiting Icon 1 (Laptop) */}
                <div className="absolute top-0 right-2 w-12 h-12 rounded-2xl bg-white text-indigo-600 flex items-center justify-center shadow-lg border border-indigo-100">
                  <Laptop className="w-6 h-6" />
                </div>

                {/* Orbiting Icon 2 (Chat Bubble) */}
                <div className="absolute bottom-2 right-4 w-12 h-12 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-lg border border-blue-100">
                  <MessageSquare className="w-6 h-6" />
                </div>

                {/* Orbiting Icon 3 (Document) */}
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-12 h-12 rounded-2xl bg-white text-emerald-600 flex items-center justify-center shadow-lg border border-emerald-100">
                  <FileCheck className="w-6 h-6" />
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
