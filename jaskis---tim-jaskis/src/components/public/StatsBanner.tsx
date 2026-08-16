import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, CheckCircle2, ThumbsUp, Layers } from 'lucide-react';

export const StatsBanner: React.FC = () => {
  const { settings, liveStats } = useApp();

  const stats = [
    {
      value: liveStats.totalClients || settings.statsActiveClients || '500+',
      label: 'Klien Dibantu',
      icon: Users
    },
    {
      value: liveStats.completedProjects || settings.statsCompletedCount || '700+',
      label: 'Proyek Diselesaikan',
      icon: CheckCircle2
    },
    {
      value: liveStats.satisfactionRate || settings.statsSatisfactionRate || '98%',
      label: 'Kepuasan Klien',
      icon: ThumbsUp
    },
    {
      value: liveStats.responseTime || settings.statsResponseTime || '< 10 Mnt',
      label: 'Respon Cepat',
      icon: Layers
    }
  ];

  return (
    <section className="bg-gradient-purple-blue py-12 sm:py-16 text-white shadow-lg relative overflow-hidden">
      {/* Pattern Matrix & Geometric Motifs */}
      <div className="absolute inset-0 bg-pattern-grid-white opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-pattern-dots-white opacity-15 pointer-events-none" />

      {/* Decorative Blur Circles */}
      <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/15">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className={`pt-6 sm:pt-0 ${idx !== 0 ? 'sm:pl-6' : ''}`}>
                <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-montserrat drop-shadow-sm">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-indigo-100 mt-1 uppercase tracking-wider font-poppins">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
