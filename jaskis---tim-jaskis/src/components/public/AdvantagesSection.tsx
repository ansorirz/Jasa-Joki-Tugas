import React from 'react';
import { ShieldCheck, Award, CheckCircle, Lock } from 'lucide-react';

export const AdvantagesSection: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Aman & Terpercaya',
      description: 'Data dan privasi terjamin aman 100%.'
    },
    {
      icon: Award,
      title: 'Pengerjaan Profesional',
      description: 'Dikerjakan oleh tim ahli berpengalaman.'
    },
    {
      icon: CheckCircle,
      title: 'Hasil Berkualitas',
      description: 'Mengutamakan kualitas dan ketepatan brief.'
    },
    {
      icon: Lock,
      title: 'Privasi Terjaga',
      description: 'Informasi pelanggan dirahasiakan sepenuhnya.'
    }
  ];

  return (
    <section className="relative bg-slate-50/70 py-12 border-y border-slate-200/80 overflow-hidden">
      {/* Pattern Matrix */}
      <div className="absolute inset-0 bg-pattern-dots-slate opacity-40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50/80 text-blue-600 flex items-center justify-center shrink-0 border border-indigo-100/60">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
