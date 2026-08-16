import React from 'react';
import { AdvantageItem } from '../types';
import { ShieldCheck, Award, CheckCircle, Lock, Sparkles, Star, Clock, GraduationCap, FileText, BookOpen, FileCheck, ClipboardList, PenTool, Presentation, Image as ImageIcon } from 'lucide-react';

interface AdvantagesSectionProps {
  advantages: AdvantageItem[];
}

export const AdvantagesSection: React.FC<AdvantagesSectionProps> = ({ advantages }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck': return ShieldCheck;
      case 'Award': return Award;
      case 'CheckCircle': return CheckCircle;
      case 'Lock': return Lock;
      case 'Sparkles': return Sparkles;
      case 'Star': return Star;
      case 'Clock': return Clock;
      case 'GraduationCap': return GraduationCap;
      case 'FileText': return FileText;
      case 'BookOpen': return BookOpen;
      case 'FileCheck': return FileCheck;
      case 'ClipboardList': return ClipboardList;
      case 'PenTool': return PenTool;
      case 'Presentation': return Presentation;
      case 'Image': return ImageIcon;
      default: return ShieldCheck;
    }
  };

  return (
    <section className="py-8 bg-slate-50/60 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {advantages.map((item) => {
            const Icon = getIcon(item.iconName);
            return (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-gray-100 card-shadow hover:border-indigo-200 hover:shadow-md transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-normal mt-0.5">
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
