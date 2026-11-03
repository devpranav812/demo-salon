import React from 'react';
import { PageRoute } from '../types';
import { SALON_INFO } from '../data/salonData';
import { Phone, Mail, MapPin, Instagram, MessageCircle, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (page: PageRoute) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#EFE8DE] text-[#241E1A] border-t border-[#DFD5C7] pt-16 pb-28 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-14 border-b border-[#DFD5C7]">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <span className="font-editorial text-2xl sm:text-3xl tracking-[0.16em] font-semibold text-[#241E1A] block">
              MAISON ÉLAN
            </span>
            <p className="text-xs sm:text-sm text-[#756C63] leading-relaxed max-w-sm">
              A bespoke luxury unisex salon offering personalized hair styling, artisan color, skin therapies, and grooming experiences designed entirely around your individuality.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={SALON_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#DFD5C7] bg-white flex items-center justify-center text-[#5E554D] hover:text-[#C49A6C] hover:border-[#C49A6C] transition-colors shadow-2xs"
                aria-label="Visit Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SALON_INFO.whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#DFD5C7] bg-white flex items-center justify-center text-[#5E554D] hover:text-[#C49A6C] hover:border-[#C49A6C] transition-colors shadow-2xs"
                aria-label="Direct WhatsApp Message"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A47B4B] mb-5">
              Explore
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#5E554D]">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#241E1A] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#241E1A] transition-colors cursor-pointer"
                >
                  Services & Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#241E1A] transition-colors cursor-pointer"
                >
                  About the Atelier
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="hover:text-[#241E1A] transition-colors cursor-pointer"
                >
                  Visual Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#241E1A] transition-colors cursor-pointer"
                >
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A47B4B] mb-5">
              Signature Rituals
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#5E554D]">
              <li>
                <button
                  onClick={() => {
                    handleNav('services');
                    onOpenBooking('haircut-styling');
                  }}
                  className="hover:text-[#241E1A] transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Haircut & Styling</span>
                  <span className="text-xs text-[#A47B4B] font-mono group-hover:text-[#241E1A]">from ₹799</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleNav('services');
                    onOpenBooking('hair-colour');
                  }}
                  className="hover:text-[#241E1A] transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Artisan Hair Colour</span>
                  <span className="text-xs text-[#A47B4B] font-mono group-hover:text-[#241E1A]">from ₹1,999</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleNav('services');
                    onOpenBooking('hair-treatments');
                  }}
                  className="hover:text-[#241E1A] transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Restorative Hair Spa</span>
                  <span className="text-xs text-[#A47B4B] font-mono group-hover:text-[#241E1A]">from ₹1,499</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleNav('services');
                    onOpenBooking('facials-skincare');
                  }}
                  className="hover:text-[#241E1A] transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Facials & Skincare</span>
                  <span className="text-xs text-[#A47B4B] font-mono group-hover:text-[#241E1A]">from ₹999</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleNav('services');
                    onOpenBooking('bridal-makeup');
                  }}
                  className="hover:text-[#241E1A] transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Bridal Couture Makeup</span>
                  <span className="text-xs text-[#A47B4B] font-mono group-hover:text-[#241E1A]">from ₹4,999</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Atelier Details & Hours */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A47B4B]">
              Atelier Hours & Visit
            </h4>
            <div className="text-xs sm:text-sm text-[#241E1A] space-y-1.5">
              <p className="font-semibold">{SALON_INFO.hoursWeekday}</p>
              <p className="text-xs text-[#756C63]">{SALON_INFO.hoursWeekend}</p>
            </div>

            <div className="pt-2 space-y-2.5 text-xs sm:text-sm text-[#5E554D]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C49A6C] shrink-0 mt-0.5" />
                <span>{SALON_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C49A6C] shrink-0" />
                <a href={`tel:${SALON_INFO.phoneRaw}`} className="hover:text-[#241E1A] font-mono">
                  {SALON_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C49A6C] shrink-0" />
                <a href={`mailto:${SALON_INFO.email}`} className="hover:text-[#241E1A]">
                  {SALON_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Demo Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#756C63]">
          <div className="text-center md:text-left space-y-1.5">
            <p className="font-medium text-[#241E1A]">© {currentYear} MAISON ÉLAN. All rights reserved.</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#C49A6C]/40 rounded-none text-xs text-[#A47B4B] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C49A6C]" />
              <span className="font-semibold">This is a demo website, and generated by PRIS</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('contact')}
              className="hover:text-[#241E1A] transition-colors cursor-pointer"
            >
              Privacy & Salon Policy
            </button>
            <a
              href={SALON_INFO.whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#A47B4B] hover:text-[#C49A6C] font-semibold transition-colors"
            >
              <span>Instant WhatsApp Concierge ({SALON_INFO.phoneDisplay})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
