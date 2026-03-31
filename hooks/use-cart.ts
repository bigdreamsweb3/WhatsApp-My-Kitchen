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
  replaceItemInCart,
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
  const [hasPendingCheckout, setHasPendingCheckout] = useState(false);

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

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const resetPendingCheckout = useCallback(() => {
    setHasPendingCheckout(false);
  }, []);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCart((prev) => addItemToCart(prev, product, quantity));
    resetPendingCheckout();
  }, [resetPendingCheckout]);

  const replaceCartItem = useCallback(
    (itemId: string, product: Product, quantity: number) => {
      setCart((prev) => replaceItemInCart(prev, itemId, product, quantity));
      resetPendingCheckout();
    },
    [resetPendingCheckout],
  );

  const updateQuantity = useCallback(
    (productId: string, newQuantity: number) => {
      setCart((prev) => updateItemQuantity(prev, productId, newQuantity));
      resetPendingCheckout();
    },
    [resetPendingCheckout],
  );

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => removeItemFromCart(prev, productId));
    resetPendingCheckout();
  }, [resetPendingCheckout]);

  const clearCart = useCallback(() => {
    setCart([]);
    setHasPendingCheckout(false);
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
    const openedWindow = openWhatsApp(message);

    if (!openedWindow) {
      alert("We could not open WhatsApp. Please allow pop-ups and try again.");
      return;
    }

    setHasPendingCheckout(true);
  }, [cart, total, checkoutForm]);

  const confirmCheckoutSent = useCallback(() => {
    setCart([]);
    setCheckoutForm({ address: "", phone: "", notes: "" });
    setHasPendingCheckout(false);
  }, []);

  const buyNow = useCallback((product: Product) => {
    const message = generateBuyNowMessage(product);
    openWhatsApp(message);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const updateCheckoutField = useCallback(
    (field: keyof CheckoutForm, value: string) => {
      setCheckoutForm((prev) => ({ ...prev, [field]: value }));
      resetPendingCheckout();
    },
    [resetPendingCheckout],
  );

  return {
    cart,
    isCartOpen,
    checkoutForm,
    total,
    itemCount,
    hasPendingCheckout,
    addToCart,
    replaceCartItem,
    updateQuantity,
    removeFromCart,
    clearCart,
    handleCheckout,
    confirmCheckoutSent,
    buyNow,
    openCart,
    closeCart,
    updateCheckoutField,
  };
}
