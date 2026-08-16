import React from 'react';
import { useApp } from '../../context/AppContext';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useApp();

  return (
    <section id="testimoni" className="relative bg-slate-50/80 py-16 sm:py-20 border-t border-slate-200/90 overflow-hidden">
      {/* Pattern Matrix */}
      <div className="absolute inset-0 bg-pattern-diagonal opacity-50 pointer-events-none" />
      <div className="absolute -top-24 left-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold mb-3 font-poppins">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privasi Terjaga 100%</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-montserrat">
            Dipercaya oleh Mahasiswa dari Berbagai Kampus
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 font-normal font-roboto">
            Data pelanggan ditampilkan secara terbatas untuk menjaga privasi.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-indigo-100 group-hover:text-indigo-200 transition-colors pointer-events-none" />

              <div>
                {/* Header Profile */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-11 h-11 rounded-full ${item.avatarColor} text-white font-extrabold flex items-center justify-center text-sm shadow-sm shrink-0 font-montserrat`}
                  >
                    {item.maskedName[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm font-poppins">
                      {item.maskedName}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium font-opensans">
                      {item.university}
                    </p>
                  </div>
                </div>

                {/* Stars Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < item.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-slate-200 text-slate-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Review Content */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal italic font-lato">
                  "{item.content}"
                </p>
              </div>

              {/* Service Tag */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between font-poppins">
                <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  {item.serviceName}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold font-opensans">Verified Client</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
