import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../types/Product';

export type CartItem = { product: Product; quantity: number };

type ContextType = {
  cartItems: CartItem[];
  addToCart: (p: Product) => void;
  updateQuantity: (id: string, inc: number) => void;
  removeFromCart: (id: string) => void;
};

const CartContext = createContext<ContextType | undefined>(undefined);

const CART_KEY = 'cart_items';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  useEffect(() => {
    AsyncStorage.getItem(CART_KEY).then(json => {
      if (json) setCartItems(JSON.parse(json));
    });
  }, []);
  useEffect(() => {
    AsyncStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product: Product) {
    setCartItems(items => {
      const idx = items.findIndex(i => i.product.id === product.id);
      if (idx >= 0) {
        const next = [...items];
        next[idx].quantity += 1;
        return next;
      }
      return [{ product, quantity: 1 }, ...items];
    });
  }
  function updateQuantity(id: string, inc: number) {
    setCartItems(items => {
      return items.map(i =>
        i.product.id === id
          ? { ...i, quantity: Math.max(1, i.quantity + inc) }
          : i
      );
    });
  }
  function removeFromCart(id: string) {
    setCartItems(items => items.filter(i => i.product.id !== id));
  }
  const value = { cartItems, addToCart, updateQuantity, removeFromCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('Cart context must be used inside provider!');
  return ctx;
}
