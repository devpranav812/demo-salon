import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { SafeImage } from './SafeImage';
import { X, Trash2, Clock, Calendar, ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  onProceedToBooking: () => void;
  onExploreMore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onProceedToBooking,
  onExploreMore,
}) => {
  const {
    cart,
    removeFromCart,
    clearCart,
    totalPrice,
    formattedDuration,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#241E1A]/40 backdrop-blur-xs transition-opacity flex justify-end"
      onClick={() => setIsCartOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Your Atelier Booking Selection"
    >
      <div
        className="relative w-full max-w-md bg-[#FAF8F5] border-l border-[#E6DDD1] shadow-2xl flex flex-col justify-between h-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="bg-[#F4EFEA] text-[#241E1A] p-5 sm:p-6 flex items-center justify-between border-b border-[#E6DDD1]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-[#C49A6C]/40 flex items-center justify-center text-[#C49A6C] shadow-2xs">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#A47B4B] font-semibold block">
                Your Atelier Selection
              </span>
              <h2 className="font-editorial text-xl sm:text-2xl text-[#241E1A]">
                Booking Cart ({cart.length})
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 min-h-[44px] min-w-[44px] text-[#756C63] hover:text-[#241E1A] flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#EAE5DC] flex items-center justify-center text-[#82796F]">
                <Sparkles className="w-7 h-7 text-[#B59A72]" />
              </div>
              <h3 className="font-editorial text-2xl text-[#29241F]">
                Your selection is empty
              </h3>
              <p className="text-xs sm:text-sm text-[#82796F] max-w-xs mx-auto leading-relaxed">
                Add multiple treatments like Haircut, Balayage, Hair Spa, or Skincare to customize your complete salon day.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onExploreMore();
                  }}
                  className="px-6 py-3 bg-[#29241F] text-[#F7F5F0] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#211E1A] transition-colors"
                >
                  Browse Menu of Rituals
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between pb-2 border-b border-[#EAE5DC] text-xs text-[#82796F]">
                <span>Selected Treatments</span>
                <button
                  onClick={clearCart}
                  className="text-xs text-[#82796F] hover:text-red-700 underline cursor-pointer"
                >
                  Clear all
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-white border border-[#EAE5DC] hover:border-[#B59A72]/40 transition-all flex items-center gap-3.5 shadow-xs"
                  >
                    <div className="w-16 h-16 shrink-0 overflow-hidden border border-[#EAE5DC]">
                      <SafeImage
                        src={item.image}
                        alt={item.name}
                        fallbackTitle={item.name}
                        aspectRatioClass="aspect-square"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-wider text-[#82796F]">
                          {item.categoryLabel}
                        </span>
                        <span className="font-mono text-xs font-semibold text-[#B59A72]">
                          ₹{item.startingPrice.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <h4 className="font-editorial text-base text-[#29241F] font-semibold truncate">
                        {item.name}
                      </h4>

                      <div className="flex items-center justify-between mt-1 text-[11px] text-[#82796F]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#B59A72]" /> {item.duration}
                        </span>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#82796F] hover:text-red-700 p-1 flex items-center gap-1 cursor-pointer transition-colors"
                          aria-label={`Remove ${item.name} from booking cart`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add More Treatments Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onExploreMore();
                }}
                className="w-full py-2.5 text-xs uppercase tracking-wider text-[#29241F] border border-dashed border-[#29241F]/30 hover:border-[#B59A72] hover:bg-white text-center font-medium transition-colors"
              >
                + Add Another Treatment
              </button>
            </>
          )}
        </div>

        {/* Drawer Footer / Checkout Strip */}
        {cart.length > 0 && (
          <div className="bg-[#EAE5DC]/80 p-5 sm:p-6 border-t border-[#B59A72]/30 space-y-4">
            {/* Summary */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#82796F]">
                <span>Total Treatments:</span>
                <span className="font-semibold text-[#29241F]">{cart.length} rituals</span>
              </div>
              <div className="flex items-center justify-between text-[#82796F]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#B59A72]" /> Total Estimated Time:
                </span>
                <span className="font-semibold text-[#29241F]">{formattedDuration}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#B59A72]/20 text-sm">
                <span className="font-semibold text-[#29241F]">Estimated Starting Total:</span>
                <span className="font-mono text-lg font-bold text-[#29241F]">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Book via WhatsApp Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                onProceedToBooking();
              }}
              className="w-full min-h-[48px] py-3.5 px-4 bg-[#C49A6C] hover:bg-[#B58957] text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:scale-[0.99] border border-[#C49A6C]"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>PROCEED TO BOOKING ({cart.length})</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <p className="text-[10px] text-center text-[#82796F]">
              Review your slot and confirm your customized visit directly via WhatsApp.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
