import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageCircle,
  Search,
  Sparkles,
  X,
  PhoneCall,
  Clock,
  ShieldCheck,
  ChevronRight,
  Send
} from 'lucide-react';

export const FloatingWhatsAppBar: React.FC = () => {
  const { settings, generateWhatsAppLink, openOrderModalWithService, navigateTo, currentView } = useApp();
  const [showMobileBubble, setShowMobileBubble] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDesktopCard, setShowDesktopCard] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Do not show bottom dock in admin dashboard view to keep workspace clean
  if (currentView === 'admin-dashboard') {
    return null;
  }

  const defaultWaMessage = 'Halo Admin JASKIS, saya ingin berkonsultasi mengenai pengerjaan tugas akademik saya.';
  const waUrl = generateWhatsAppLink(settings.whatsappNumber || '083183372985', defaultWaMessage);

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. MOBILE BOTTOM FLOATING BAR (Sleek, Modern & High-Conversion for Phones) */}
      {/* ========================================================================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pb-3 pt-1 pointer-events-none">
        
        {/* Floating Mini Prompt Bubble on Mobile (Dismissible or Auto-shows on scroll) */}
        {showMobileBubble && isScrolled && (
          <div className="pointer-events-auto max-w-sm mx-auto mb-2 bg-slate-900/95 text-white p-3 rounded-2xl shadow-xl backdrop-blur-md border border-slate-800 flex items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <div className="relative w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                <MessageCircle className="w-4 h-4" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-900 ring-1 ring-emerald-300"></span>
              </div>
              <div className="truncate">
                <p className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                  <span>CS JASKIS Online</span>
                  <span className="text-[9px] text-slate-400 font-normal">• Respon &lt; 5 mnt</span>
                </p>
                <p className="text-[11px] text-slate-200 truncate font-medium">
                  Butuh bantuan tugas kilat? Konsultasi gratis sekarang!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[10px] flex items-center gap-1 shadow-sm transition-all"
              >
                <span>Chat</span>
                <ChevronRight className="w-3 h-3" />
              </a>
              <button
                type="button"
                onClick={() => setShowMobileBubble(false)}
                className="w-6 h-6 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 flex items-center justify-center transition-colors"
                title="Tutup"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Main Floating Glass Dock on Mobile */}
        <div className="pointer-events-auto max-w-md mx-auto bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl rounded-3xl p-1.5 sm:p-2 flex items-center justify-between gap-1.5 ring-1 ring-black/5">
          
          {/* Action 1: Cek Status Pesanan */}
          <button
            type="button"
            onClick={() => navigateTo('cek-pesanan')}
            className={`flex flex-col items-center justify-center py-1.5 px-2.5 rounded-2xl transition-all cursor-pointer ${
              currentView === 'cek-pesanan'
                ? 'bg-indigo-50 text-indigo-700 font-bold'
                : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100/70'
            }`}
          >
            <Search className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-semibold tracking-tight whitespace-nowrap">Cek Status</span>
          </button>

          {/* Action 2: PRIMARY WHATSAPP BUTTON (High-Impact & Eye-Catching) */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer group"
          >
            {/* Live Indicator Icon */}
            <div className="relative flex items-center justify-center">
              <MessageCircle className="w-5 h-5 fill-white/20 text-white group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
            </div>

            <div className="text-left leading-tight">
              <span className="text-xs font-black block tracking-wide">WhatsApp CS</span>
              <span className="text-[9px] text-emerald-100 font-medium block">Online 24 Jam</span>
            </div>
          </a>

          {/* Action 3: Pesan / Order Tugas Modal */}
          <button
            type="button"
            onClick={() => openOrderModalWithService()}
            className="flex flex-col items-center justify-center py-1.5 px-2.5 rounded-2xl text-slate-600 hover:text-blue-600 hover:bg-blue-50/70 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 mb-0.5 text-blue-600" />
            <span className="text-[10px] font-bold text-slate-700 tracking-tight whitespace-nowrap">Pesan Tugas</span>
          </button>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP FLOATING WHATSAPP BUTTON & INTERACTIVE POPUP (Sleek & Premium) */}
      {/* ========================================================================= */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        
        {/* Desktop Quick Chat Popup Window */}
        {showDesktopCard && (
          <div className="absolute bottom-16 right-0 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden mb-3 animate-fade-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-4 relative">
              <button
                type="button"
                onClick={() => setShowDesktopCard(false)}
                className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
                title="Tutup"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm leading-tight">Customer Service JASKIS</h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-100 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                    <span>Online • Respon Cepat</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-slate-50 text-xs space-y-3">
              <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm text-slate-700 leading-relaxed">
                <p className="font-bold text-slate-900 mb-1">Halo Kak! 👋</p>
                <p>Ada yang bisa tim JASKIS bantu untuk pengerjaan skripsi, jurnal, atau tugas kuliah kamu hari ini?</p>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold px-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Privasi aman 100% &amp; Bebas Plagiasi</span>
              </div>
            </div>

            {/* CTA in Popup */}
            <div className="p-3 bg-white border-t border-slate-100">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowDesktopCard(false)}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Mulai Chat WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* Desktop Sticky Floating WhatsApp Pill / Orb */}
        <div className="flex items-center gap-2">
          
          {/* Tooltip trigger pill */}
          <button
            type="button"
            onClick={() => setShowDesktopCard(prev => !prev)}
            className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-200/80 text-xs font-bold text-slate-700 hover:text-emerald-600 transition-all flex items-center gap-2 cursor-pointer hover:shadow-xl group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Konsultasi WA CS</span>
          </button>

          {/* WhatsApp Main Orb */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative p-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-full shadow-2xl shadow-emerald-500/40 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
            title="Chat WhatsApp CS 24 Jam"
          >
            <MessageCircle className="w-7 h-7 fill-white/20" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white"></span>
            </span>
          </a>
        </div>

      </div>
    </>
  );
};
