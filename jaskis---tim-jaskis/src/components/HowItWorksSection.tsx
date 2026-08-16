import React from 'react';
import { MessageSquare, FileInput, Cpu, CheckCheck } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Konsultasi',
      description: 'Hubungi kami melalui WhatsApp / Telegram.',
      icon: MessageSquare,
    },
    {
      number: '02',
      title: 'Kirim Detail',
      description: 'Kirim jenis tugas, deadline, dan ketentuan.',
      icon: FileInput,
    },
    {
      number: '03',
      title: 'Proses',
      description: 'Tim kami mengerjakan sesuai brief.',
      icon: Cpu,
    },
    {
      number: '04',
      title: 'Review',
      description: 'Hasil dikirim dan bisa direvisi sesuai kesepakatan.',
      icon: CheckCheck,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Alur Pengerjaan
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">
            Cara Kerja JASKIS
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            Proses mudah, cepat, dan transparan.
          </p>
        </div>

        {/* Horizontal Process Line */}
        <div className="relative">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-indigo-100 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center group bg-white p-6 rounded-2xl border border-gray-100 card-shadow hover:border-indigo-200 transition-all"
                >
                  {/* Number Circle Badge */}
                  <div className="relative mb-5">
                    <div className="w-16 h-16 rounded-full gradient-bg text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                      {step.number}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">
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
