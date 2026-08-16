import React from 'react';
import { Service } from '../types';
import {
  GraduationCap,
  FileText,
  BookOpen,
  FileCheck,
  ClipboardList,
  PenTool,
  Presentation,
  Image as ImageIcon,
  ArrowRight,
  ShieldCheck,
  Award,
  Lock,
  Sparkles,
  Star,
} from 'lucide-react';

interface ServicesSectionProps {
  services: Service[];
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectService,
}) => {
  // Map icon names to Lucide icon components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return GraduationCap;
      case 'FileText':
        return FileText;
      case 'BookOpen':
        return BookOpen;
      case 'FileCheck':
        return FileCheck;
      case 'ClipboardList':
        return ClipboardList;
      case 'PenTool':
        return PenTool;
      case 'Presentation':
        return Presentation;
      case 'Image':
        return ImageIcon;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Award':
        return Award;
      case 'Lock':
        return Lock;
      case 'Sparkles':
        return Sparkles;
      case 'Star':
        return Star;
      default:
        return FileText;
    }
  };

  return (
    <section id="layanan" className="py-16 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Solusi Akademik
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">
              Layanan Kami
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-1 max-w-xl">
              Berbagai layanan akademik untuk membantu menyelesaikan tugasmu dengan mudah.
            </p>
          </div>

          <button
            onClick={() => onSelectService('Umum')}
            className="gradient-bg text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-sm hover:shadow-indigo-200 hover:opacity-95 transition-all self-start md:self-auto flex items-center gap-2 cursor-pointer"
          >
            <span>Lihat Semua Layanan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item) => {
            const Icon = getIconComponent(item.iconName);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 card-shadow hover:border-indigo-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Popular Badge */}
                {item.popular && (
                  <div className="absolute top-4 right-4 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-indigo-100">
                    Populer
                  </div>
                )}

                <div>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5 group-hover:bg-gradient-to-tr group-hover:from-indigo-600 group-hover:to-blue-500 group-hover:text-white transition-all duration-300">
                    <Icon className="w-7 h-7 stroke-[1.75]" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Button */}
                <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400">
                    {item.startingPrice}
                  </span>
                  <button
                    onClick={() => onSelectService(item.title)}
                    className="bg-indigo-50 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-500 text-indigo-600 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Tanya Harga</span>
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
