import React, { useEffect } from 'react';
import { GalleryItem } from '../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface LightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigateItem: (item: GalleryItem) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  item,
  items,
  onClose,
  onNavigateItem,
}) => {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [item, items]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onNavigateItem(items[currentIndex - 1]);
    } else {
      onNavigateItem(items[items.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      onNavigateItem(items[currentIndex + 1]);
    } else {
      onNavigateItem(items[0]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#211E1A]/90 backdrop-blur-md p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery Image Viewer"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-3 min-h-[44px] min-w-[44px] text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center transition-colors cursor-pointer"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-3 sm:left-6 z-50 p-3 min-h-[44px] min-w-[44px] text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center transition-colors cursor-pointer"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-3 sm:right-6 z-50 p-3 min-h-[44px] min-w-[44px] text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center transition-colors cursor-pointer"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content Container */}
      <div
        className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-h-[72vh] overflow-hidden rounded-xs border border-white/10 shadow-2xl flex items-center justify-center bg-black/60">
          <SafeImage
            src={item.image}
            alt={item.title}
            fallbackTitle={item.title}
            aspectRatioClass="aspect-auto max-h-[70vh] w-auto max-w-full"
            className="object-contain"
          />
        </div>

        {/* Caption & Metadata */}
        <div className="mt-4 text-center text-[#F7F5F0] max-w-lg">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#B59A72] mb-1">
            <span>{item.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{currentIndex + 1} of {items.length}</span>
          </div>
          <h3 className="font-editorial text-xl sm:text-2xl text-white font-medium">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#EAE5DC]/70 mt-1">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};
