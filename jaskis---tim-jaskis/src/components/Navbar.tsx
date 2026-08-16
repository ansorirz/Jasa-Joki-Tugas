import React, { useState, useEffect } from 'react';
import { JaskisLogo } from './JaskisLogo';
import { Menu, X, Lock, Search } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAdminLogin: () => void;
  onOpenOrderSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAdminLogin,
  onOpenOrderSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'layanan', label: 'Layanan' },
    { id: 'portofolio', label: 'Portofolio' },
    { id: 'testimoni', label: 'Testimoni' },
    { id: 'cek-pesanan', label: 'Cek Pesanan' },
    { id: 'faq', label: 'FAQ' },
    { id: 'kontak', label: 'Kontak' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);

    if (id === 'cek-pesanan') {
      onOpenOrderSearch();
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
          : 'bg-white border-b border-gray-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="focus:outline-none text-left"
          >
            <JaskisLogo size="md" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50 font-semibold'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Login Admin */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={onOpenOrderSearch}
              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Cek Pesanan Quick Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenAdminLogin}
              className="gradient-bg text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-sm hover:shadow-indigo-200/50 hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Login Admin</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onOpenOrderSearch}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-indigo-50 text-indigo-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminLogin();
              }}
              className="w-full gradient-bg text-white py-3 rounded-xl font-semibold text-center flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Login Admin</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
