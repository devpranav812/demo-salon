import React from 'react';
import { Calendar, Phone, ShoppingBag } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { useCart } from '../context/CartContext';

interface MobileStickyBarProps {
  onOpenBooking: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenBooking }) => {
  const { cart, setIsCartOpen } = useCart();

  return (
    <aside
      aria-label="Quick mobile booking"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#E6DDD1] px-3.5 py-2.5 shadow-[0_-4px_25px_rgba(196,154,108,0.15)]"
      style={{ maxHeight: '68px' }}
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <a
          href={`tel:${SALON_INFO.phoneRaw}`}
          className="flex items-center justify-center min-h-[46px] min-w-[46px] rounded-lg border border-[#E6DDD1] bg-white text-[#241E1A] hover:bg-[#F4EFEA] active:scale-95 transition-all shadow-xs"
          aria-label="Direct call salon concierge at 999999"
        >
          <Phone className="w-4 h-4 text-[#C49A6C]" />
        </a>

        {/* Mobile Cart Trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex items-center justify-center min-h-[46px] min-w-[48px] rounded-lg border border-[#C49A6C]/40 bg-white text-[#241E1A] hover:bg-[#F4EFEA] active:scale-95 transition-all shadow-xs"
          aria-label={`View booking cart (${cart.length} items)`}
        >
          <ShoppingBag className="w-4 h-4 text-[#C49A6C]" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#C49A6C] text-white text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-xs">
              {cart.length}
            </span>
          )}
        </button>

        <button
          onClick={onOpenBooking}
          className="flex-1 min-h-[46px] px-3 rounded-lg bg-[#C49A6C] hover:bg-[#B58957] active:bg-[#A57847] text-white active:scale-[0.99] flex items-center justify-center gap-1.5 text-xs uppercase tracking-[0.14em] font-semibold transition-all shadow-sm shadow-[#C49A6C]/25"
        >
          <Calendar className="w-3.5 h-3.5 text-white" />
          <span>{cart.length > 0 ? `BOOK VISIT (${cart.length})` : 'BOOK APPOINTMENT'}</span>
        </button>
      </div>
    </aside>
  );
};
