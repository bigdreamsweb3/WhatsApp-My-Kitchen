"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { Product } from "../lib/data/products";
import type { CartItem, CheckoutForm } from "../lib/utils/whatsapp";
import {
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  calculateCartTotal,
  getCartItemCount,
} from "../lib/utils/cart";
import {
  generateWhatsAppMessage,
  generateBuyNowMessage,
  openWhatsApp,
} from "../lib/utils/whatsapp";
import { CART_STORAGE_KEY } from "../lib/constants";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>({
    address: "",
    phone: "",
    notes: "",
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        // Ignore invalid JSON
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCart((prev) => addItemToCart(prev, product, quantity));
  }, []);

  const updateQuantity = useCallback(
    (productId: string, newQuantity: number) => {
      setCart((prev) => updateItemQuantity(prev, productId, newQuantity));
    },
    [],
  );

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => removeItemFromCart(prev, productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const total = useMemo(() => calculateCartTotal(cart), [cart]);
  const itemCount = useMemo(() => getCartItemCount(cart), [cart]);

  const handleCheckout = useCallback(() => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    if (!checkoutForm.address || !checkoutForm.phone) {
      alert("Please fill in delivery address and phone number");
      return;
    }
    const message = generateWhatsAppMessage(cart, total, checkoutForm);
    openWhatsApp(message);
  }, [cart, total, checkoutForm]);

  const buyNow = useCallback((product: Product) => {
    const message = generateBuyNowMessage(product);
    openWhatsApp(message);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const updateCheckoutField = useCallback(
    (field: keyof CheckoutForm, value: string) => {
      setCheckoutForm((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  return {
    cart,
    isCartOpen,
    checkoutForm,
    total,
    itemCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    handleCheckout,
    buyNow,
    openCart,
    closeCart,
    updateCheckoutField,
  };
}
