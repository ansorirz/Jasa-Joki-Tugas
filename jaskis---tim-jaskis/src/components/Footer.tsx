import React from 'react';
import { JaskisLogo } from './JaskisLogo';
import { Phone, Send, Instagram, Mail } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
  whatsappNumber?: string;
  telegramNumber?: string;
  instagramHandle?: string;
}

export const Footer: React.FC<FooterProps> = ({
  onNavClick,
  whatsappNumber = '083183372985',
  telegramNumber = '083183372985',
  instagramHandle = '@jaskis_official',
}) => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-12 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-100">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <JaskisLogo size="lg" />
            <p className="text-sm text-gray-500 max-w-sm font-normal leading-relaxed">
              Solusi Tugasmu, Waktumu Jadi Lebih Berarti.
              Layanan bantuan pengerjaan tugas akademik terpercaya dengan pengerjaan terstruktur, tepat waktu, dan garansi bebas plagiasi.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={`https://wa.me/62${whatsappNumber.replace(/^0/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors"
                title="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/jaskis_official"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href={`https://instagram.com/${instagramHandle.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Menu */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
              Menu Utama
            </h4>
            <ul className="space-y-2.5 text-sm">
              {['home', 'layanan', 'portofolio', 'testimoni', 'cek-pesanan', 'faq', 'kontak'].map((m) => (
                <li key={m}>
                  <button
                    onClick={() => onNavClick(m)}
                    className="hover:text-indigo-600 transition-colors capitalize text-left"
                  >
                    {m.replace('-', ' ')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Col */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
              Layanan
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li>Skripsi</li>
              <li>Proposal Penelitian</li>
              <li>Jurnal / SINTA</li>
              <li>Makalah Akademik</li>
              <li>Laporan PKL/Praktikum</li>
              <li>PPT Presentasi</li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
              Hubungi Kami
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-center gap-2.5 text-gray-700">
                <Phone className="w-4 h-4 text-indigo-600" />
                <span>{whatsappNumber}</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-700">
                <Send className="w-4 h-4 text-indigo-600" />
                <span>{telegramNumber}</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-700">
                <Instagram className="w-4 h-4 text-indigo-600" />
                <span>{instagramHandle}</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-700">
                <Mail className="w-4 h-4 text-indigo-600" />
                <span>official@jaskis.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 JASKIS – Tim Jaskis. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-gray-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-600 cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-gray-600 cursor-pointer">Revisi Guarantee</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
