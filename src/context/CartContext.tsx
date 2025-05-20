'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  title: string;
  img: string;
  price: number;
  discount?: number;
  quantity: number;
  category: string[];
  attribute?: string[]; 
  selectedAttribute: string | null;  // NEW: Selected Attribute Field
  salePrice: number; // Ensure salePrice is always defined
  store:string

}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  incrementQuantity: (id: string, selectedAttribute: string | null) => void;
  decrementQuantity: (id: string, selectedAttribute: string | null) => void;
  removeFromCart: (id: string, selectedAttribute: string | null) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = typeof window !== "undefined" ? localStorage.getItem('cartItems') : "[]";
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(cartItem => 
        cartItem.id === item.id && cartItem.selectedAttribute === item.selectedAttribute
      );
  
      // Calculate Sale Price only if discount exists
      const calculatedSalePrice = item.discount
      ? Math.max(item.price - item.discount, 0) // Ensure it doesn't go negative
      : item.price; // Default to the original price if no discount
  
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        return [{ ...item, salePrice: calculatedSalePrice, quantity: 1 }, ...prevItems];
      }
    });
  };
  

  const incrementQuantity = (id: string, selectedAttribute: string | null) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.selectedAttribute === selectedAttribute 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };

  const decrementQuantity = (id: string, selectedAttribute: string | null) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.selectedAttribute === selectedAttribute
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  const removeFromCart = (id: string, selectedAttribute: string | null) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id || item.selectedAttribute !== selectedAttribute));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
