import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ServiceItem } from '../types';

interface CartContextType {
  cart: ServiceItem[];
  addToCart: (service: ServiceItem) => void;
  removeFromCart: (serviceId: string) => void;
  clearCart: () => void;
  isInCart: (serviceId: string) => boolean;
  totalPrice: number;
  totalDurationMinutes: number;
  formattedDuration: string;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  lastAddedService: ServiceItem | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper to parse duration like "45 mins", "120 mins", "180 mins"
function parseMinutes(durationStr: string): number {
  const match = durationStr.match(/\d+/);
  return match ? parseInt(match[0], 10) : 45;
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem('maison_elan_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedService, setLastAddedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('maison_elan_cart', JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  const addToCart = (service: ServiceItem) => {
    setCart((prev) => {
      if (prev.some((s) => s.id === service.id)) {
        return prev; // already in cart
      }
      return [...prev, service];
    });
    setLastAddedService(service);
    setIsCartOpen(true);
  };

  const removeFromCart = (serviceId: string) => {
    setCart((prev) => prev.filter((s) => s.id !== serviceId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (serviceId: string) => {
    return cart.some((s) => s.id === serviceId);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.startingPrice, 0);

  const totalDurationMinutes = cart.reduce((sum, item) => sum + parseMinutes(item.duration), 0);

  const formattedDuration = (() => {
    if (totalDurationMinutes === 0) return '0 mins';
    const hours = Math.floor(totalDurationMinutes / 60);
    const mins = totalDurationMinutes % 60;
    if (hours > 0 && mins > 0) return `${hours} hr ${mins} mins`;
    if (hours > 0) return `${hours} hr${hours > 1 ? 's' : ''}`;
    return `${mins} mins`;
  })();

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        totalPrice,
        totalDurationMinutes,
        formattedDuration,
        isCartOpen,
        setIsCartOpen,
        lastAddedService,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
