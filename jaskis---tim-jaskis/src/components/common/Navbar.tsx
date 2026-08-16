import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';
import { Menu, X, Shield, Search, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentView, navigateTo, openOrderModalWithService, isAdminLoggedIn, settings } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'layanan', label: 'Layanan' },
    { id: 'portofolio', label: 'Portofolio' },
    { id: 'testimoni', label: 'Testimoni' },
    { id: 'cek-pesanan', label: 'Cek Pesanan' },
    { id: 'faq', label: 'FAQ' },
    { id: 'kontak', label: 'Kontak' }
  ];

  const handleNavClick = (viewId: string) => {
    navigateTo(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {settings?.promoBannerActive && settings?.promoBannerText && (
        <div className="bg-gradient-purple-blue text-white text-[11px] sm:text-xs font-bold py-2 px-4 text-center tracking-wide flex items-center justify-center gap-2 border-b border-indigo-400/20 shadow-inner font-poppins">
          <span>{settings.promoBannerText}</span>
        </div>
      )}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 bg-white ${
          isScrolled
            ? 'shadow-sm border-b border-slate-100 py-3'
            : 'border-b border-slate-100 py-4'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center focus:outline-none group text-left"
          >
            <Logo size="md" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 font-poppins">
            {navLinks.map(link => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50/80 font-bold'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons Right */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => handleNavClick('layanan')}
              className="p-2.5 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-all cursor-pointer"
              title="Cari Layanan"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => handleNavClick(isAdminLoggedIn ? 'admin-dashboard' : 'admin-login')}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Shield className="w-4 h-4" />
              <span>{isAdminLoggedIn ? 'Dashboard Admin' : 'Login Admin'}</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => openOrderModalWithService()}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-purple-blue"
            >
              Pesan
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 animate-fade-in shadow-xl">
          <div className="flex flex-col space-y-1.5 mb-4">
            {navLinks.map(link => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-4 py-2.5 rounded-xl text-left text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openOrderModalWithService();
              }}
              className="w-full py-2.5 px-4 rounded-xl text-center font-semibold text-sm text-white bg-gradient-purple-blue shadow-md"
            >
              Pesan Sekarang
            </button>
            <button
              onClick={() => handleNavClick(isAdminLoggedIn ? 'admin-dashboard' : 'admin-login')}
              className="w-full py-2.5 px-4 rounded-xl text-center font-semibold text-sm border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-indigo-600" />
              <span>{isAdminLoggedIn ? 'Dashboard Admin' : 'Login Admin'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  </>
  );
};
