import React, { useState } from 'react';
import { SERVICES } from '../data/salonData';
import { ServiceCategory } from '../types';
import { SafeImage } from '../components/SafeImage';
import { useCart } from '../context/CartContext';
import { Clock, Calendar, Info, Sparkles, Scissors, Sparkle, UserCheck, Heart, Plus, Check, ShoppingBag, ArrowRight } from 'lucide-react';

interface ServicesPageProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking }) => {
  const { cart, addToCart, removeFromCart, isInCart, setIsCartOpen, totalPrice, formattedDuration } = useCart();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');

  const categories: { key: ServiceCategory | 'all'; label: string; icon: React.ReactNode }[] = [
    { key: 'all', label: 'All Services', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { key: 'hair', label: 'Hair Care & Colour', icon: <Scissors className="w-3.5 h-3.5" /> },
    { key: 'skin', label: 'Skin & Aesthetics', icon: <Sparkle className="w-3.5 h-3.5" /> },
    { key: 'grooming', label: 'Grooming & Nails', icon: <UserCheck className="w-3.5 h-3.5" /> },
    { key: 'bridal', label: 'Bridal Atelier', icon: <Heart className="w-3.5 h-3.5" /> },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <div className="w-full pb-20">
      {/* Header Banner with Subtle Parlour Architecture Background */}
      <section className="relative bg-gradient-to-b from-[#F4EFEA] via-[#FAF8F5] to-[#FAF8F5] text-[#241E1A] border-b border-[#E6DDD1] py-16 md:py-24 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <img
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1800&q=80"
            alt="Maison Élan Parlour Interior"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C49A6C] font-semibold block">
            Menu of Rituals · Multi-Treatment Booking Available
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#241E1A] font-normal tracking-tight">
            Services & Pricing
          </h1>
          <p className="text-sm sm:text-base text-[#7D7368] max-w-xl mx-auto leading-relaxed">
            Customize your visit. Select multiple treatments across hair styling, color, skincare, and grooming, then confirm everything together directly through WhatsApp.
          </p>
        </div>
      </section>

      {/* Cart Summary Bar if Cart is Not Empty */}
      {cart.length > 0 && (
        <aside aria-label="Cart summary banner" className="bg-[#C49A6C] text-white py-3 px-4 sm:px-8 sticky top-20 z-30 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="font-semibold uppercase tracking-wider">
                Booking Cart Active ({cart.length} treatment{cart.length > 1 ? 's' : ''}):
              </span>
              <span className="font-mono font-bold text-white text-sm">₹{totalPrice.toLocaleString('en-IN')}</span>
              <span className="text-white/80">· Est. {formattedDuration}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="px-4 py-1.5 rounded-md bg-white text-[#241E1A] hover:bg-[#FAF8F5] uppercase tracking-wider font-semibold cursor-pointer transition-colors shadow-xs"
              >
                View Cart & Summary
              </button>
              <button
                onClick={() => onOpenBooking()}
                className="px-4 py-1.5 rounded-md bg-[#241E1A] text-white hover:bg-black uppercase tracking-wider font-semibold cursor-pointer transition-colors shadow-xs"
              >
                Proceed to Book All
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content & Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`min-h-[44px] px-4 sm:px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.16em] font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-[#C49A6C] text-white shadow-sm shadow-[#C49A6C]/30'
                  : 'bg-white text-[#241E1A] hover:bg-[#F4EFEA] border border-[#E6DDD1]'
              }`}
            >
              <span className={activeCategory === cat.key ? 'text-white' : 'text-[#C49A6C]'}>
                {cat.icon}
              </span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Services List / Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => {
            const alreadyInCart = isInCart(service.id);
            return (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-[#E6DDD1] hover:border-[#C49A6C] transition-all flex flex-col justify-between shadow-xs hover:shadow-md group overflow-hidden"
              >
                <div>
                  <div className="relative overflow-hidden aspect-16/10">
                    <SafeImage
                      src={service.image}
                      alt={service.name}
                      fallbackTitle={service.name}
                      aspectRatioClass="aspect-16/10"
                      className="group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase font-semibold bg-white/90 text-[#241E1A] px-2.5 py-1 rounded-sm backdrop-blur-xs border border-[#E6DDD1]/80">
                      {service.categoryLabel}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-[#7D7368] mb-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#C49A6C]" />
                        Est. {service.duration}
                      </span>
                      <span className="font-mono font-semibold text-base text-[#241E1A]">
                        ₹{service.startingPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <h3 className="font-editorial text-2xl text-[#241E1A] font-medium group-hover:text-[#C49A6C] transition-colors mt-2">
                      {service.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#7D7368] mt-2.5 leading-relaxed">
                      {service.fullDescription}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#E6DDD1]/60 mt-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#7D7368]">
                      Starting baseline
                    </span>
                    <span className="font-mono font-semibold text-[#C49A6C]">
                      ₹{service.startingPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {/* Add to Cart button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (alreadyInCart) {
                          removeFromCart(service.id);
                        } else {
                          addToCart(service);
                        }
                      }}
                      className={`min-h-[42px] px-3 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        alreadyInCart
                          ? 'bg-[#F4EFEA] text-[#C49A6C] border border-[#C49A6C]'
                          : 'bg-[#FAF8F5] hover:bg-white text-[#241E1A] border border-[#E6DDD1] hover:border-[#C49A6C]'
                      }`}
                    >
                      {alreadyInCart ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#C49A6C]" /> In Cart
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-[#C49A6C]" /> Add to Cart
                        </>
                      )}
                    </button>

                    {/* Book Now */}
                    <button
                      type="button"
                      onClick={() => onOpenBooking(service.id)}
                      className="min-h-[42px] px-3 py-2 rounded-lg bg-[#C49A6C] hover:bg-[#B58957] active:bg-[#A57847] text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-xs"
                    >
                      <Calendar className="w-3.5 h-3.5 text-white" />
                      <span>Book Now</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Disclaimer */}
        <div className="mt-14 p-5 rounded-xl bg-[#F4EFEA] border border-[#E6DDD1] max-w-3xl mx-auto flex items-start gap-3 text-xs text-[#241E1A]">
          <Info className="w-4 h-4 text-[#C49A6C] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold uppercase tracking-wider block text-[#241E1A]">
              Pricing & Consultation Policy
            </span>
            <p className="text-[#7D7368] mt-1 leading-relaxed">
              Final pricing may vary depending on hair length, density, personalized consultation, and individual service requirements. All pricing and duration estimations shown are demonstration representations for the Maison Élan portfolio showcase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
