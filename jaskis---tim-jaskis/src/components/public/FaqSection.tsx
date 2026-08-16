import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { faqs, settings, generateWhatsAppLink } = useApp();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative bg-white py-16 sm:py-20 border-t border-slate-200/90 overflow-hidden">
      {/* Pattern Matrix */}
      <div className="absolute inset-0 bg-pattern-grid opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-3 font-poppins">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Pertanyaan Umum</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-montserrat">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base mt-2 font-normal font-roboto">
            Temukan jawaban untuk pertanyaan yang paling sering diajukan seputar layanan JASKIS.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map(item => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer font-poppins"
                >
                  <span className="text-base sm:text-lg leading-snug">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-indigo-600 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 font-normal font-roboto animate-fade-in">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-10 p-6 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-bold text-slate-900 text-base">Punya Pertanyaan Lain?</h4>
            <p className="text-xs text-slate-600 mt-0.5">Tim customer service kami siap membantu Anda 24 jam sehari.</p>
          </div>
          <a
            href={generateWhatsAppLink(settings.whatsappNumber, 'Halo Admin JASKIS, saya ingin bertanya lebih lanjut mengenai layanan.')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center gap-2 shrink-0 shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            <span>Tanya Admin Langsung</span>
          </a>
        </div>
      </div>
    </section>
  );
};
