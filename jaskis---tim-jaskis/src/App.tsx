import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Public Sections & Pages
import { HeroSection } from './components/public/HeroSection';
import { AdvantagesSection } from './components/public/AdvantagesSection';
import { SocialMediaSection } from './components/public/SocialMediaSection';
import { ServicesSection } from './components/public/ServicesSection';
import { PortfolioSection } from './components/public/PortfolioSection';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { StatsBanner } from './components/public/StatsBanner';
import { HowItWorksSection } from './components/public/HowItWorksSection';
import { CtaSection } from './components/public/CtaSection';
import { OrderTrackingSection } from './components/public/OrderTrackingSection';
import { OrderTrackingPage } from './components/public/OrderTrackingPage';
import { FaqSection } from './components/public/FaqSection';
import { ContactSection } from './components/public/ContactSection';
import { OrderModal } from './components/public/OrderModal';
import { FloatingWhatsAppBar } from './components/common/FloatingWhatsAppBar';

// Admin Components
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainContent: React.FC = () => {
  const { currentView, isAdminLoggedIn } = useApp();

  // Admin Views Handling
  if (currentView === 'admin-dashboard') {
    if (!isAdminLoggedIn) {
      return <AdminLogin />;
    }
    return <AdminDashboard />;
  }

  if (currentView === 'admin-login') {
    if (isAdminLoggedIn) {
      return <AdminDashboard />;
    }
    return <AdminLogin />;
  }

  // Public Page View Handler
  const renderPublicView = () => {
    switch (currentView) {
      case 'layanan':
        return (
          <div className="pt-6">
            <ServicesSection />
            <CtaSection />
          </div>
        );

      case 'portofolio':
        return (
          <div className="pt-6">
            <PortfolioSection />
            <TestimonialsSection />
            <CtaSection />
          </div>
        );

      case 'cek-pesanan':
        return <OrderTrackingPage />;

      case 'faq':
        return (
          <div className="pt-6">
            <FaqSection />
            <CtaSection />
          </div>
        );

      case 'kontak':
        return (
          <div className="pt-6">
            <ContactSection />
            <FaqSection />
          </div>
        );

      case 'home':
      default:
        return (
          <>
            <HeroSection />
            <AdvantagesSection />
            <SocialMediaSection />
            <ServicesSection />
            <PortfolioSection />
            <TestimonialsSection />
            <StatsBanner />
            <HowItWorksSection />
            <OrderTrackingSection />
            <CtaSection />
            <FaqSection />
            <ContactSection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      
      <Navbar />

      <main className="flex-1 pb-20 md:pb-0">
        {renderPublicView()}
      </main>

      <Footer />

      {/* Floating Modern Mobile Bottom Action Bar & Desktop WhatsApp Widget */}
      <FloatingWhatsAppBar />

      {/* Order Popup Modal */}
      <OrderModal />
      
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
