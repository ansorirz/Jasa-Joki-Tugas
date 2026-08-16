import React, { useState, useEffect } from 'react';
import { Users, CheckCircle2, Award, Layers } from 'lucide-react';

interface StatsBannerProps {
  totalClients?: number;
  totalProjects?: number;
  satisfactionRate?: number;
  serviceTypesCount?: number;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({
  totalClients = 500,
  totalProjects = 700,
  satisfactionRate = 98,
  serviceTypesCount = 50,
}) => {
  const [counts, setCounts] = useState({
    clients: 0,
    projects: 0,
    satisfaction: 0,
    services: 0,
  });

  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        clients: Math.min(Math.floor(totalClients * progress), totalClients),
        projects: Math.min(Math.floor(totalProjects * progress), totalProjects),
        satisfaction: Math.min(Math.floor(satisfactionRate * progress), satisfactionRate),
        services: Math.min(Math.floor(serviceTypesCount * progress), serviceTypesCount),
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [totalClients, totalProjects, satisfactionRate, serviceTypesCount]);

  const stats = [
    {
      icon: Users,
      value: `${counts.clients}+`,
      label: 'Klien Dibantu',
    },
    {
      icon: CheckCircle2,
      value: `${counts.projects}+`,
      label: 'Proyek Diselesaikan',
    },
    {
      icon: Award,
      value: `${counts.satisfaction}%`,
      label: 'Kepuasan Klien',
    },
    {
      icon: Layers,
      value: `${counts.services}+`,
      label: 'Jenis Kebutuhan',
    },
  ];

  return (
    <section className="py-12 gradient-bg text-white relative overflow-hidden shadow-lg">
      {/* Abstract light circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center space-y-2 group">
                <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:scale-110 transition-transform shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-none">
                  {item.value}
                </p>
                <p className="text-xs sm:text-sm font-medium text-indigo-100">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
