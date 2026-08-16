import React from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceCategory } from '../../types';
import {
  GraduationCap,
  FileText,
  BookOpen,
  FileCheck,
  ClipboardList,
  PenTool,
  Presentation,
  Image,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { services, openOrderModalWithService, navigateTo } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return GraduationCap;
      case 'FileText': return FileText;
      case 'BookOpen': return BookOpen;
      case 'FileCheck': return FileCheck;
      case 'ClipboardList': return ClipboardList;
      case 'PenTool': return PenTool;
      case 'Presentation': return Presentation;
      case 'Image': return Image;
      default: return FileText;
    }
  };

  return (
    <section id="layanan" className="relative bg-slate-50/90 py-16 sm:py-20 border-t border-slate-200/90 overflow-hidden">
      {/* Pattern & Texture */}
      <div className="absolute inset-0 bg-pattern-grid-slate opacity-40 pointer-events-none" />
      <div className="absolute -top-32 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold mb-3 font-poppins">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pilihan Lengkap</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-montserrat">
              Layanan Kami
            </h2>
            <p className="text-slate-600 text-base mt-2 max-w-xl font-normal font-roboto">
              Berbagai layanan akademik untuk membantu menyelesaikan tugasmu dengan mudah.
            </p>
          </div>

          <button
            onClick={() => navigateTo('layanan')}
            className="px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/20 flex items-center gap-2 shrink-0 self-start md:self-auto cursor-pointer font-poppins"
          >
            <span>Lihat Semua Layanan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Column Desktop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(service => {
            const IconComponent = getIcon(service.iconName);
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:bg-gradient-purple-blue group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors font-poppins">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal mb-4 font-roboto">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-2">
                  <span className="text-xs font-semibold text-slate-400 font-opensans">
                    {service.priceRange}
                  </span>

                  <button
                    onClick={() => openOrderModalWithService(service.category as ServiceCategory)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer font-poppins"
                  >
                    Tanya Harga
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
