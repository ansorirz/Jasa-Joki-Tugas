import React from 'react';
import { Testimonial } from '../types';
import { Star, ShieldAlert } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section id="testimoni" className="py-16 bg-slate-50/60 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Testimoni Klien
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">
            Dipercaya oleh Mahasiswa dari Berbagai Kampus
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-2 flex items-center justify-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-indigo-500" />
            <span>Data pelanggan ditampilkan secara terbatas untuk menjaga privasi.</span>
          </p>
        </div>

        {/* 4 Card Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item) => {
            const initialLetter = item.clientName.charAt(0);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 card-shadow hover:border-indigo-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Avatar & Name */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div
                      className={`w-11 h-11 rounded-full ${
                        item.avatarBg || 'bg-indigo-100 text-indigo-700'
                      } font-extrabold text-base flex items-center justify-center shrink-0 shadow-inner`}
                    >
                      {initialLetter}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 leading-tight">
                        {item.clientName}
                      </h3>
                      <p className="text-xs font-medium text-gray-500 mt-0.5">
                        {item.university}
                      </p>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400 stroke-none"
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic">
                    "{item.comment}"
                  </p>
                </div>

                {/* Service Tag */}
                <div className="pt-4 mt-4 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                  <span>Layanan:</span>
                  <span className="font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                    {item.service}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
