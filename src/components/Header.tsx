import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { SALON_INFO } from '../data/salonData';
import { Menu, X, Calendar, Phone, ArrowUpRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
}) => {
  const { cart, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navItems: { label: string; page: PageRoute }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'About', page: 'about' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F5F0]/95 backdrop-blur-md shadow-xs border-b border-[#EAE5DC]'
            : 'bg-[#F7F5F0] border-b border-[#EAE5DC]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 md:gap-8 h-20">
            {/* Zone 1: Single text element wordmark */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A72] rounded-sm shrink-0"
              aria-label="Maison Élan - Return to homepage"
            >
              <span className="font-editorial text-2xl sm:text-3xl tracking-[0.18em] font-semibold text-[#29241F] group-hover:text-[#B59A72] transition-colors whitespace-nowrap">
                MAISON ÉLAN
              </span>
            </button>

            {/* Zone 2: Clean 4–5 single-line navigation links */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-xs uppercase tracking-[0.2em] font-medium text-[#82796F]">
              {navItems.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => handleNavClick(item.page)}
                    className={`relative py-1 cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-[#29241F] ${
                      isActive ? 'text-[#29241F] font-semibold' : ''
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B59A72]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Cart Button & Primary Action */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative inline-flex items-center gap-2 px-3.5 py-2.5 text-xs tracking-wider uppercase font-semibold text-[#241E1A] bg-white border border-[#E6DDD1] hover:border-[#C49A6C] cursor-pointer transition-all shadow-xs group"
                aria-label={`Open Booking Cart with ${cart.length} treatments`}
              >
                <ShoppingBag className="w-4 h-4 text-[#C49A6C] group-hover:scale-110 transition-transform" />
                <span>Cart</span>
                {cart.length > 0 ? (
                  <span className="ml-1 bg-[#C49A6C] text-white text-[10px] font-mono px-1.5 py-0.5 font-bold">
                    {cart.length}
                  </span>
                ) : null}
              </button>

              <button
                onClick={() => onOpenBooking()}
                className="inline-flex items-center justify-center px-5 py-2.5 text-xs tracking-[0.18em] uppercase font-semibold text-white bg-[#C49A6C] hover:bg-[#B58957] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shadow-sm border border-[#C49A6C]"
              >
                <Calendar className="w-3.5 h-3.5 mr-2 text-white" />
                BOOK AN APPOINTMENT
              </button>
            </div>

            {/* Mobile Header Buttons */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#241E1A] border border-[#E6DDD1] bg-white active:bg-[#F4EFEA]"
                aria-label="View booking cart"
              >
                <ShoppingBag className="w-5 h-5 text-[#C49A6C]" />
                {cart.length > 0 && (
                  <span className="absolute top-1 right-1 bg-[#C49A6C] text-white text-[9px] font-mono w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => onOpenBooking()}
                className="px-3.5 py-2 text-[11px] tracking-wider uppercase font-semibold text-white bg-[#C49A6C] active:bg-[#B58957] transition-colors"
                aria-label="Book visit"
              >
                Book
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#241E1A] hover:text-[#C49A6C] active:bg-[#F4EFEA] focus-visible:ring-2 focus-visible:ring-[#C49A6C] transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden bg-[#241E1A]/40 backdrop-blur-xs transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#FAF8F5] border-l border-[#E6DDD1] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#E6DDD1]">
                <span className="font-editorial text-2xl tracking-[0.16em] font-semibold text-[#241E1A]">
                  MAISON ÉLAN
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#241E1A] hover:text-[#C49A6C]"
                  aria-label="Close navigation"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="py-8 flex flex-col gap-6">
                {navItems.map((item) => {
                  const isActive = currentPage === item.page;
                  return (
                    <button
                      key={item.page}
                      onClick={() => handleNavClick(item.page)}
                      className={`text-left font-editorial text-2xl tracking-wider transition-colors flex items-center justify-between py-2 border-b border-[#E6DDD1]/60 ${
                        isActive ? 'text-[#C49A6C] font-semibold' : 'text-[#241E1A]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-40 text-[#C49A6C]" />
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#E6DDD1] space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full min-h-[48px] py-3.5 px-4 text-xs tracking-[0.2em] uppercase font-semibold text-white bg-[#C49A6C] hover:bg-[#B58957] flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4 text-white" />
                BOOK AN APPOINTMENT
              </button>

              <a
                href={`tel:${SALON_INFO.phoneRaw}`}
                className="w-full min-h-[44px] py-3 px-4 text-xs tracking-wider uppercase font-medium text-[#241E1A] bg-white border border-[#E6DDD1] hover:border-[#C49A6C] flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#C49A6C]" />
                CALL {SALON_INFO.phoneDisplay}
              </a>

              <p className="text-[11px] text-center text-[#756C63] tracking-wide pt-2">
                14 Rue Royale / Lavelle Boulevard
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
