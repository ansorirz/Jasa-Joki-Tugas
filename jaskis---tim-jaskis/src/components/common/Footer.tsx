import React from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';
import { Phone, Instagram, Send, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, settings, services, openOrderModalWithService } = useApp();

  return (
    <footer className="relative bg-slate-50/90 border-t border-slate-200/90 text-slate-600 pt-16 pb-12 overflow-hidden">
      {/* Pattern Matrix */}
      <div className="absolute inset-0 bg-pattern-grid-slate opacity-40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-sm text-slate-600 font-normal max-w-sm mt-3 leading-relaxed font-lato">
              Solusi Tugasmu, Waktumu Jadi Lebih Berarti.
            </p>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed font-roboto">
              Layanan bantuan pengerjaan tugas akademik dengan proses profesional, komunikasi transparan, dan jaminan keamanan kerahasiaan data 100%.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/62${settings.whatsappNumber.slice(1)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
                title="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`https://t.me/${settings.telegramNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center hover:bg-sky-600 hover:text-white transition-colors"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href={`https://instagram.com/${settings.instagramHandle.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-4 font-montserrat">
              Menu Utama
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('layanan')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Layanan Kami
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('portofolio')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Portofolio Hasil
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('testimoni')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Testimoni Klien
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('cek-pesanan')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Cek Status Pesanan
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('faq')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Pertanyaan FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-4 font-montserrat">
              Layanan Akademik
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              {services.slice(0, 6).map(srv => (
                <li key={srv.id}>
                  <button
                    onClick={() => {
                      navigateTo('layanan');
                    }}
                    className="hover:text-indigo-600 transition-colors text-left"
                  >
                    {srv.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Security Guarantee */}
          <div>
            <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-4">
              Hubungi Kami
            </h4>
            <div className="space-y-3 text-sm font-medium">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-900 font-semibold">{settings.whatsappNumber}</p>
                  <p className="text-xs text-slate-500">Fast Response (24/7)</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Instagram className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-900 font-semibold">{settings.instagramHandle}</p>
                  <p className="text-xs text-slate-500">Instagram Official</p>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-xl bg-indigo-50/80 border border-indigo-100 flex items-start gap-2 text-xs text-indigo-900">
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>Privasi data & identitas pemesan terenkripsi dan dijamin rahasia.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 JASKIS – Tim Jaskis. All Rights Reserved.</p>
          <div className="flex items-center space-x-6 font-medium">
            <button onClick={() => navigateTo('faq')} className="hover:text-indigo-600">
              Privacy Policy
            </button>
            <button onClick={() => navigateTo('faq')} className="hover:text-indigo-600">
              Terms & Conditions
            </button>
            <button onClick={() => navigateTo('admin-login')} className="hover:text-indigo-600">
              Portal Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
