import React from 'react';
import { PageRoute } from '../types';
import { SERVICES, GALLERY_ITEMS, TESTIMONIALS, INSTAGRAM_TILES, SALON_INFO } from '../data/salonData';
import { SafeImage } from '../components/SafeImage';
import { useCart } from '../context/CartContext';
import {
  Calendar,
  ArrowRight,
  Clock,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Coffee,
  Star,
  Instagram,
  ChevronDown,
  ShoppingBag,
  Plus,
  Check
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenBooking }) => {
  const { cart, addToCart, removeFromCart, isInCart, setIsCartOpen } = useCart();
  const featuredServices = SERVICES.filter((s) => s.isFeatured).slice(0, 6);
  const previewGallery = GALLERY_ITEMS.slice(0, 4);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* C. HERO SECTION WITH BRIGHT, SUNLIT LUXURY SALON PARLOUR BACKGROUND */}
      <section className="relative w-full pt-12 pb-20 md:pt-16 md:pb-28 lg:pt-24 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FAF8F5] text-[#241E1A] border-b border-[#E6DDD1]">
        {/* Full Bleed Sunlit Parlour Background with Luminous Scrim */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=2000&q=85"
            alt="Maison Élan Salon Atmosphere and Styling Architecture"
            className="w-full h-full object-cover object-center opacity-25 scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/92 to-[#FAF8F5]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-white/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Editorial Content */}
            <div className="lg:col-span-7 space-y-6 lg:space-y-8 text-left">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white/90 border border-[#C49A6C]/40 text-xs uppercase tracking-[0.25em] text-[#A47B4B] font-semibold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#C49A6C]" />
                <span>Haute Coiffure & Aesthetics Atelier</span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#241E1A] font-normal leading-[1.08] tracking-tight text-balance">
                Beauty, crafted <br className="hidden sm:inline" />
                <span className="italic font-normal text-[#C49A6C]">around you.</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-[#756C63] leading-relaxed max-w-xl font-normal">
                Discover a more personal approach to hair, beauty and self-care. Thoughtful details, expert hands and bespoke multi-ritual experiences designed around you.
              </p>

              {/* CTAs with Cart Awareness */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  onClick={() => onOpenBooking()}
                  className="min-h-[50px] px-8 py-3.5 bg-[#C49A6C] hover:bg-[#B58957] text-white text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2.5 cursor-pointer transition-all active:scale-[0.98] shadow-md border border-[#C49A6C]"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>BOOK YOUR VISIT</span>
                </button>

                {cart.length > 0 ? (
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="min-h-[50px] px-6 py-3.5 bg-white hover:bg-[#F4EFEA] text-[#241E1A] text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all border border-[#C49A6C]/40 shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#C49A6C]" />
                    <span>VIEW CART ({cart.length})</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onNavigate('services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="min-h-[50px] px-7 py-3.5 bg-white hover:bg-[#F4EFEA] text-[#241E1A] text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all border border-[#E6DDD1] shadow-xs"
                  >
                    <span>EXPLORE ALL SERVICES</span>
                    <ArrowRight className="w-4 h-4 text-[#C49A6C]" />
                  </button>
                )}
              </div>

              {/* Quick Trust Strip */}
              <div className="pt-6 border-t border-[#E6DDD1] grid grid-cols-3 gap-4 text-xs text-[#756C63]">
                <div>
                  <span className="block font-editorial text-xl sm:text-2xl text-[#241E1A] font-medium">100%</span>
                  <span className="text-[11px] uppercase tracking-wider text-[#A47B4B]">Customized Rituals</span>
                </div>
                <div>
                  <span className="block font-editorial text-xl sm:text-2xl text-[#241E1A] font-medium">Multi-Service</span>
                  <span className="text-[11px] uppercase tracking-wider text-[#A47B4B]">Book Together</span>
                </div>
                <div>
                  <span className="block font-editorial text-xl sm:text-2xl text-[#241E1A] font-medium">7 Days</span>
                  <span className="text-[11px] uppercase tracking-wider text-[#A47B4B]">9:30 AM – 8:30 PM</span>
                </div>
              </div>
            </div>

            {/* Right: Dominant Editorial Visual with Parlour Styling Focus */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Gold outer accent frame */}
                <div className="absolute -inset-3 border border-[#C49A6C]/40 pointer-events-none hidden sm:block" />
                
                <div className="relative overflow-hidden shadow-xl bg-white border border-[#E6DDD1]">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80"
                    alt="Maison Élan Parlour Salon Styling Experience"
                    fallbackTitle="Maison Élan Salon Atmosphere"
                    aspectRatioClass="aspect-4/3 sm:aspect-5/4 lg:aspect-4/3"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Floating Atelier Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 text-[#241E1A] border border-[#C49A6C]/30 shadow-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#A47B4B] font-semibold">
                        Rue Royale Atelier
                      </span>
                      <span className="text-xs text-[#C49A6C] font-mono font-semibold">Unisex Salon</span>
                    </div>
                    <p className="text-xs text-[#756C63] mt-1">
                      "Personal consultation before every cut, tone, or restorative scalp massage."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle scroll indicator */}
          <div className="hidden md:flex justify-center pt-12">
            <a
              href="#brand-intro"
              className="text-xs tracking-[0.2em] uppercase text-[#756C63] hover:text-[#241E1A] flex flex-col items-center gap-1 transition-colors"
            >
              <span>Scroll to explore</span>
              <ChevronDown className="w-4 h-4 text-[#C49A6C] animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      {/* D. BRAND INTRODUCTION */}
      <section id="brand-intro" className="w-full py-16 md:py-24 bg-[#EAE5DC]/40 border-b border-[#EAE5DC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B59A72] font-semibold">
            Our Philosophy
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#29241F] font-normal tracking-tight text-balance">
            More than a salon. <br className="hidden sm:inline" />
            <span className="italic">A moment for yourself.</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#82796F] max-w-2xl mx-auto leading-relaxed">
            At Maison Élan, beauty is personal. Every appointment begins with understanding your style, your preferences and the little details that make you, you.
          </p>
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className="w-12 h-[1px] bg-[#B59A72]/60" />
            <span className="font-editorial text-sm tracking-[0.2em] text-[#29241F] font-semibold">
              MAISON ÉLAN · EST. 2026
            </span>
            <span className="w-12 h-[1px] bg-[#B59A72]/60" />
          </div>
        </div>
      </section>

      {/* E. FEATURED SERVICES (WITH ADD-TO-CART & MULTI-SERVICE SUPPORT) */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#EAE5DC]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B59A72] font-semibold block mb-2">
                Curated Rituals · Add Multiple to Cart
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#29241F] font-normal">
                Featured Services
              </h2>
            </div>

            <div className="flex items-center gap-4">
              {cart.length > 0 && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#29241F] text-white text-xs uppercase tracking-wider font-semibold cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#B59A72]" />
                  <span>Cart: {cart.length} item{cart.length > 1 ? 's' : ''}</span>
                </button>
              )}
              <button
                onClick={() => {
                  onNavigate('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#29241F] hover:text-[#B59A72] transition-colors self-start md:self-auto cursor-pointer"
              >
                <span>VIEW ALL SERVICES</span>
                <ArrowRight className="w-4 h-4 text-[#B59A72]" />
              </button>
            </div>
          </div>

          {/* 6 Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredServices.map((service) => {
              const alreadyInCart = isInCart(service.id);
              return (
                <div
                  key={service.id}
                  className="group bg-white border border-[#EAE5DC] hover:border-[#B59A72] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs"
                >
                  <div>
                    {/* Service Image */}
                    <div className="relative overflow-hidden aspect-16/10">
                      <SafeImage
                        src={service.image}
                        alt={service.name}
                        fallbackTitle={service.name}
                        aspectRatioClass="aspect-16/10"
                        className="group-hover:scale-105 transition-transform duration-700"
                      />
                      {service.tag && (
                        <span className="absolute top-3 right-3 text-[10px] tracking-wider uppercase font-semibold bg-[#29241F]/80 text-[#F7F5F0] px-2.5 py-1 backdrop-blur-xs">
                          {service.tag}
                        </span>
                      )}
                    </div>

                    {/* Body Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between text-xs text-[#82796F] mb-1.5">
                        <span className="uppercase tracking-wider font-medium">
                          {service.categoryLabel}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#B59A72]" />
                          {service.duration}
                        </span>
                      </div>

                      <h3 className="font-editorial text-2xl text-[#29241F] font-medium group-hover:text-[#B59A72] transition-colors">
                        {service.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#82796F] mt-2 line-clamp-2 leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Footer with Starting Price & Add to Cart / Book Actions */}
                  <div className="p-6 pt-0 border-t border-[#EAE5DC]/60 mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider text-[#82796F]">
                        Starting price
                      </span>
                      <span className="font-mono text-base font-semibold text-[#29241F]">
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
                            : 'bg-white hover:bg-[#F4EFEA] text-[#241E1A] border border-[#E6DDD1] hover:border-[#C49A6C]'
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

                      {/* Direct Book button */}
                      <button
                        type="button"
                        onClick={() => onOpenBooking(service.id)}
                        className="min-h-[42px] px-3 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold text-white bg-[#C49A6C] hover:bg-[#B58957] active:bg-[#A57847] transition-all cursor-pointer text-center shadow-xs"
                      >
                        Book Ritual
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom All Services CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={() => {
                onNavigate('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="min-h-[48px] px-8 py-3.5 rounded-lg bg-[#C49A6C] hover:bg-[#B58957] active:bg-[#A57847] text-white text-xs uppercase tracking-[0.2em] font-semibold inline-flex items-center gap-2 cursor-pointer transition-all shadow-md shadow-[#C49A6C]/25"
            >
              <span>VIEW ALL SERVICES</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* F. SIGNATURE EXPERIENCE */}
      <section className="w-full py-16 md:py-24 bg-[#EAE5DC]/50 border-b border-[#EAE5DC] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Visual Left */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative overflow-hidden shadow-lg border border-[#B59A72]/30">
                <SafeImage
                  src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=80"
                  alt="Maison Élan Salon Interior Architecture"
                  fallbackTitle="Maison Élan Interior Architecture"
                  aspectRatioClass="aspect-4/3"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content Right */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B59A72] font-semibold">
                The Maison Élan Difference
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#29241F] font-normal leading-tight">
                Your style. <br />
                <span className="italic">Our expertise.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#82796F] leading-relaxed">
                Step into a serene architectural sanctuary away from city noise. We combine classical European technique with contemporary aesthetic vision to create results that feel authentically yours.
              </p>

              {/* 3 Benefits */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/90 border border-[#E6DDD1] shadow-2xs">
                  <div className="w-10 h-10 rounded-lg bg-[#F4EFEA] border border-[#C49A6C]/30 text-[#C49A6C] flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-lg text-[#241E1A] font-semibold">
                      Personalized Consultations
                    </h3>
                    <p className="text-xs text-[#7D7368] mt-1 leading-relaxed">
                      We dedicate unhurried time before every wash or cut to analyze your facial symmetry, hair texture, and daily styling routine.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/90 border border-[#E6DDD1] shadow-2xs">
                  <div className="w-10 h-10 rounded-lg bg-[#F4EFEA] border border-[#C49A6C]/30 text-[#C49A6C] flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-lg text-[#241E1A] font-semibold">
                      Experienced Beauty Professionals
                    </h3>
                    <p className="text-xs text-[#7D7368] mt-1 leading-relaxed">
                      Our artisans bring international salon experience, continuously trained in modern freehand balayage, precision scissor geometry, and advanced phytotherapy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/90 border border-[#E6DDD1] shadow-2xs">
                  <div className="w-10 h-10 rounded-lg bg-[#F4EFEA] border border-[#C49A6C]/30 text-[#C49A6C] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-lg text-[#241E1A] font-semibold">
                      Attention to Every Detail
                    </h3>
                    <p className="text-xs text-[#7D7368] mt-1 leading-relaxed">
                      From fresh espresso and acoustic serenity to sterilized instruments and customized home care advice, nothing is overlooked.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* G. GALLERY PREVIEW */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#EAE5DC]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B59A72] font-semibold block mb-2">
                Portfolio Showcase
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#29241F] font-normal">
                Gallery Preview
              </h2>
            </div>
            <button
              onClick={() => {
                onNavigate('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#29241F] hover:text-[#B59A72] transition-colors self-start md:self-auto cursor-pointer"
            >
              <span>EXPLORE OUR GALLERY</span>
              <ArrowRight className="w-4 h-4 text-[#B59A72]" />
            </button>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onNavigate('gallery');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative cursor-pointer overflow-hidden border border-[#EAE5DC] shadow-xs"
              >
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  fallbackTitle={item.title}
                  aspectRatioClass="aspect-3/4"
                  className="group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#211E1A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase tracking-wider text-[#B59A72]">
                    {item.categoryLabel}
                  </span>
                  <h4 className="font-editorial text-lg text-white font-medium">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => {
                onNavigate('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 border border-[#29241F]/40 hover:border-[#29241F] text-[#29241F] text-xs uppercase tracking-[0.2em] font-semibold cursor-pointer transition-colors"
            >
              EXPLORE OUR GALLERY
            </button>
          </div>
        </div>
      </section>

      {/* H. WHY CHOOSE US */}
      <section className="w-full py-16 md:py-24 bg-[#EAE5DC]/30 border-b border-[#EAE5DC] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B59A72] font-semibold block mb-2">
              The Standard
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#29241F] font-normal">
              The details make the difference.
            </h2>
            <p className="text-xs sm:text-sm text-[#82796F] mt-3">
              We reject assembly-line salon culture in favor of quiet luxury and intentional care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white border border-[#EAE5DC] text-left">
              <span className="font-editorial text-3xl text-[#B59A72] font-semibold block mb-3">01</span>
              <h3 className="font-editorial text-xl text-[#29241F] font-medium mb-2">
                Personalized Attention
              </h3>
              <p className="text-xs sm:text-sm text-[#82796F] leading-relaxed">
                We never double-book your chair. Your stylist's focused energy belongs entirely to you throughout the reservation.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#EAE5DC] text-left">
              <span className="font-editorial text-3xl text-[#B59A72] font-semibold block mb-3">02</span>
              <h3 className="font-editorial text-xl text-[#29241F] font-medium mb-2">
                Experienced Professionals
              </h3>
              <p className="text-xs sm:text-sm text-[#82796F] leading-relaxed">
                Our master stylists each hold over a decade of dedicated craftsmanship in bespoke color, scissor architecture, and skin therapy.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#EAE5DC] text-left">
              <span className="font-editorial text-3xl text-[#B59A72] font-semibold block mb-3">03</span>
              <h3 className="font-editorial text-xl text-[#29241F] font-medium mb-2">
                Premium Products
              </h3>
              <p className="text-xs sm:text-sm text-[#82796F] leading-relaxed">
                Strictly formulated with ammonia-free pigments, botanical scalp balms, and ethical active ingredients that respect biological balance.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#EAE5DC] text-left">
              <span className="font-editorial text-3xl text-[#B59A72] font-semibold block mb-3">04</span>
              <h3 className="font-editorial text-xl text-[#29241F] font-medium mb-2">
                Relaxing Atmosphere
              </h3>
              <p className="text-xs sm:text-sm text-[#82796F] leading-relaxed">
                Warm limewash, soft natural linen, acoustic tranquility, and ceremonial tea service designed to rejuvenate your senses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* I. TESTIMONIALS */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#EAE5DC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B59A72] font-semibold block mb-2">
              Guest Reflections
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#29241F] font-normal">
              Words From Our Atelier Guests
            </h2>
            <p className="text-xs text-[#82796F] mt-2 italic">
              (Curated demonstration feedback showcasing client experience standards)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white p-6 sm:p-8 border border-[#EAE5DC] shadow-xs flex flex-col justify-between text-left"
              >
                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-[#B59A72] mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="font-editorial text-base sm:text-lg text-[#29241F] italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#EAE5DC] flex items-center justify-between text-xs">
                  <div>
                    <h3 className="font-semibold text-[#29241F]">{t.clientName}</h3>
                    <span className="text-[#82796F]">{t.role}</span>
                  </div>
                  <span className="text-[11px] text-[#B59A72] font-medium bg-[#F7F5F0] px-2 py-1 border border-[#EAE5DC]">
                    {t.service}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* J. INSTAGRAM SECTION */}
      <section className="w-full py-16 md:py-24 bg-[#EAE5DC]/20 border-b border-[#EAE5DC] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B59A72] font-semibold block mb-2">
              Daily Visual Diary
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#29241F] font-normal">
              A little inspiration, daily.
            </h2>
            <p className="text-xs sm:text-sm text-[#82796F] mt-2">
              Follow along as our stylists and colourists capture transformations in real-time.
            </p>
          </div>

          {/* 6 Image Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {INSTAGRAM_TILES.map((tile) => (
              <a
                key={tile.id}
                href={SALON_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden aspect-square border border-[#EAE5DC] bg-[#EAE5DC]"
              >
                <SafeImage
                  src={tile.image}
                  alt={`Maison Élan Instagram showcase ${tile.tag}`}
                  fallbackTitle={tile.tag}
                  aspectRatioClass="aspect-square"
                  className="group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#211E1A]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center text-white">
                  <Instagram className="w-5 h-5 text-[#B59A72] mb-1" />
                  <span className="text-[10px] tracking-wider font-mono">{tile.tag}</span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href={SALON_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[46px] px-8 py-3 border border-[#29241F]/40 hover:border-[#29241F] text-[#29241F] text-xs uppercase tracking-[0.2em] font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#B59A72]" />
              <span>FOLLOW OUR INSTAGRAM</span>
            </a>
          </div>
        </div>
      </section>

      {/* K. FINAL CTA SECTION (Luminous Warm Salon Suite) */}
      <section className="relative w-full py-20 md:py-28 bg-[#F4EFEA] text-[#241E1A] px-4 sm:px-6 lg:px-8 border-t border-[#E6DDD1] overflow-hidden">
        {/* Subtle parlour backdrop with soft luminous overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <img
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1800&q=80"
            alt="Maison Élan Interior Suite"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F4EFEA] via-[#F4EFEA]/80 to-transparent" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#A47B4B] font-semibold block">
            Reserve Your Visit
          </span>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#241E1A] font-normal tracking-tight text-balance">
            Ready for your next look?
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#756C63] max-w-xl mx-auto leading-relaxed">
            Your next favourite salon experience is just an appointment away. Choose multiple rituals and confirm your booking directly on WhatsApp.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto min-h-[50px] px-9 py-4 bg-[#C49A6C] hover:bg-[#B58957] text-white text-xs uppercase tracking-[0.22em] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-[0.98] border border-[#C49A6C]"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>BOOK YOUR APPOINTMENT</span>
            </button>

            <a
              href={`tel:${SALON_INFO.phoneRaw}`}
              className="w-full sm:w-auto min-h-[50px] px-8 py-4 bg-white border border-[#E6DDD1] hover:border-[#C49A6C] text-[#241E1A] text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2 transition-colors shadow-2xs"
            >
              <span>CALL CONCIERGE (999999)</span>
            </a>
          </div>

          <p className="text-[11px] text-[#756C63] pt-4">
            14 Rue Royale / Lavelle Boulevard · Open Monday – Sunday 9:30 AM – 8:30 PM
          </p>
        </div>
      </section>
    </div>
  );
};
