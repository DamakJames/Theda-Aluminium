"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem('pathfinder_cart')) || [];
      setCart(savedCart);
      
      const savedWishlist = JSON.parse(localStorage.getItem('pathfinder_wishlist')) || [];
      setWishlist(savedWishlist);
    } catch (e) {
      console.error("Error loading state", e);
    }
  }, []);

  // Save to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pathfinder_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('pathfinder_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (productId) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId, change) => {
    setCart((prev) => {
      return prev.map(item => {
        if (item.id === productId) {
          const newQ = item.quantity + change;
          return newQ > 0 ? { ...item, quantity: newQ } : item;
        }
        return item;
      });
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter(item => item.id !== productId));
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.id);
      if (product) {
        return total + (product.price * item.quantity);
      }
      return total;
    }, 0);
  };
  
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      wishlist,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      updateQuantity,
      removeFromCart,
      toggleWishlist,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
