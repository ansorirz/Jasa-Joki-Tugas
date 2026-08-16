import React from 'react';
import { MessageSquare, FileUp, Cpu, CheckCheck } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Konsultasi',
      description: 'Hubungi kami melalui WhatsApp / Telegram untuk diskusi awal.',
      icon: MessageSquare
    },
    {
      num: '02',
      title: 'Kirim Detail',
      description: 'Kirim jenis tugas, deadline, dan ketentuan/brief dosen.',
      icon: FileUp
    },
    {
      num: '03',
      title: 'Proses',
      description: 'Tim ahli kami mengerjakan tugas secara terstruktur.',
      icon: Cpu
    },
    {
      num: '04',
      title: 'Review',
      description: 'Hasil dikirim dan bisa direvisi sesuai kesepakatan awal.',
      icon: CheckCheck
    }
  ];

  return (
    <section className="relative bg-white py-16 sm:py-20 border-t border-slate-200/90 overflow-hidden">
      {/* Pattern Matrix & Geometric Grid */}
      <div className="absolute inset-0 bg-pattern-dots opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-pattern-isometric opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-montserrat">
            Cara Kerja JASKIS
          </h2>
          <p className="text-slate-600 text-base mt-2 font-normal font-roboto">
            Proses mudah, cepat, dan transparan dari awal hingga tuntas.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-indigo-100 -translate-y-6 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-purple-blue text-white font-black text-lg flex items-center justify-center mb-4 shadow-md shadow-indigo-500/20 group-hover:scale-110 transition-transform font-montserrat">
                    {step.num}
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 font-poppins">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal font-roboto">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
