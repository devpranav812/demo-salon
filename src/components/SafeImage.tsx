import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackTitle?: string;
  className?: string;
  aspectRatioClass?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackTitle,
  className = '',
  aspectRatioClass = 'aspect-4/3',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError) {
    return (
      <div
        className={`relative w-full ${aspectRatioClass} bg-[#EAE5DC] flex flex-col items-center justify-center p-6 text-center border border-[#B59A72]/20 overflow-hidden ${className}`}
        role="img"
        aria-label={alt}
      >
        {/* Subtle geometric luxury pattern in background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="luxPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="#B59A72" />
                <path d="M 0 20 L 40 20 M 20 0 L 20 40" stroke="#B59A72" strokeWidth="0.5" strokeDasharray="2,6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#luxPattern)" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border border-[#B59A72]/40 flex items-center justify-center mb-2 bg-[#F7F5F0]/80">
            <span className="font-editorial text-lg text-[#B59A72] italic font-semibold">MÉ</span>
          </div>
          <span className="text-xs uppercase tracking-widest text-[#82796F] font-medium">Maison Élan</span>
          {fallbackTitle && (
            <p className="font-editorial text-[#29241F] text-sm mt-1 max-w-[200px] truncate">{fallbackTitle}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${aspectRatioClass} ${className} bg-[#EAE5DC]`}>
      {!isLoaded && (
        <div className="absolute inset-0 luxury-shimmer animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
