import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/salonData';
import { GalleryItem } from '../types';
import { SafeImage } from '../components/SafeImage';
import { Lightbox } from '../components/Lightbox';
import { Eye, Sparkles } from 'lucide-react';

interface GalleryPageProps {
  onOpenBooking: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenBooking }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const filters = [
    { key: 'all', label: 'All Works' },
    { key: 'hair', label: 'Haircuts & Styling' },
    { key: 'colour', label: 'Artisan Colour' },
    { key: 'bridal', label: 'Bridal Atelier' },
    { key: 'skin', label: 'Skin & Treatments' },
    { key: 'interiors', label: 'Salon Architecture' },
  ];

  const filteredItems = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <div className="w-full pb-20">
      {/* Banner with Salon Parlour Interior Backdrop */}
      <section className="relative bg-gradient-to-b from-[#F4EFEA] via-[#FAF8F5] to-[#FAF8F5] text-[#241E1A] border-b border-[#E6DDD1] py-16 md:py-24 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <img
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1800&q=80"
            alt="Maison Élan Gallery Atmosphere"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C49A6C] font-semibold block">
            Visual Portfolio
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#241E1A] font-normal tracking-tight">
            The Maison Élan Gallery
          </h1>
          <p className="text-sm sm:text-base text-[#7D7368] max-w-xl mx-auto leading-relaxed">
            A curated lookbook of subtle balayage, architectural silhouettes, dewy bridal canvases, and our tranquil salon spaces.
          </p>
        </div>
      </section>

      {/* Main Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Category Filters */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 no-scrollbar">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`min-h-[44px] px-4 sm:px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.16em] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === f.key
                  ? 'bg-[#C49A6C] text-white shadow-sm shadow-[#C49A6C]/30'
                  : 'bg-white text-[#241E1A] hover:bg-[#F4EFEA] border border-[#E6DDD1]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="group relative cursor-pointer bg-white rounded-xl border border-[#E6DDD1] hover:border-[#C49A6C] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative overflow-hidden aspect-4/3">
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  fallbackTitle={item.title}
                  aspectRatioClass="aspect-4/3"
                  className="group-hover:scale-105 transition-transform duration-700"
                />

                {/* Hover overlay with expand button */}
                <div className="absolute inset-0 bg-[#241E1A]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/95 text-[#241E1A] flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye className="w-5 h-5 text-[#C49A6C]" />
                  </div>
                </div>

                <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase font-semibold bg-white/90 text-[#241E1A] px-2.5 py-1 rounded-sm backdrop-blur-xs border border-[#E6DDD1]">
                  {item.categoryLabel}
                </span>
              </div>

              <div className="p-5 text-left">
                <h3 className="font-editorial text-xl text-[#241E1A] font-medium group-hover:text-[#C49A6C] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#7D7368] mt-1.5 line-clamp-2">
                  {item.description}
                </p>
                <div className="mt-3 pt-3 border-t border-[#E6DDD1]/60 flex items-center justify-between text-xs text-[#C49A6C]">
                  <span className="font-medium text-[11px] uppercase tracking-wider">Click to expand</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Booking Prompt */}
        <div className="mt-16 p-8 rounded-2xl bg-[#F4EFEA] border border-[#E6DDD1] max-w-2xl mx-auto text-center space-y-3 shadow-sm">
          <h3 className="font-editorial text-2xl text-[#241E1A]">
            Inspired by a transformation?
          </h3>
          <p className="text-xs sm:text-sm text-[#7D7368] leading-relaxed">
            Bring any image reference to your consultation. Our stylists will tailor the silhouette and tone to suit your personal features.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenBooking}
              className="min-h-[46px] px-8 py-3 rounded-lg bg-[#C49A6C] hover:bg-[#B58957] active:bg-[#A57847] text-white text-xs uppercase tracking-[0.2em] font-semibold cursor-pointer transition-all shadow-md shadow-[#C49A6C]/25"
            >
              BOOK YOUR APPOINTMENT
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        item={activeLightboxItem}
        items={filteredItems}
        onClose={() => setActiveLightboxItem(null)}
        onNavigateItem={(item) => setActiveLightboxItem(item)}
      />
    </div>
  );
};
