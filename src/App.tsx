import React, { useState } from 'react';
import { PageRoute } from './types';
import { CartProvider, useCart } from './context/CartContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { BookingModal } from './components/BookingModal';
import { CartDrawer } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

function SalonAppContent() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | undefined>(undefined);

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (serviceId?: string) => {
    setPreSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#29241F] selection:bg-[#B59A72]/20 selection:text-[#29241F] font-sans">
      {/* Minimal luxury announcement bar */}
      <AnnouncementBar />

      {/* Top Navigation conforming to Top Bar Contract */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Page Content */}
      <main className="flex-grow w-full">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        )}
        {currentPage === 'services' && (
          <ServicesPage onOpenBooking={handleOpenBooking} />
        )}
        {currentPage === 'about' && (
          <AboutPage onOpenBooking={() => handleOpenBooking()} />
        )}
        {currentPage === 'gallery' && (
          <GalleryPage onOpenBooking={() => handleOpenBooking()} />
        )}
        {currentPage === 'contact' && (
          <ContactPage onOpenBooking={() => handleOpenBooking()} />
        )}
      </main>

      {/* Editorial Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
      />

      {/* Mobile Sticky Booking Bar (<15% viewport height, touch target 48px) */}
      <MobileStickyBar onOpenBooking={() => handleOpenBooking()} />

      {/* Multi-Treatment Booking Cart Drawer */}
      <CartDrawer
        onProceedToBooking={() => handleOpenBooking()}
        onExploreMore={() => handleNavigate('services')}
      />

      {/* Interactive WhatsApp Booking Modal with Multi-Service support */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preSelectedServiceId={preSelectedServiceId}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <SalonAppContent />
    </CartProvider>
  );
}
