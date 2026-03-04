import type { Product } from "../data/products";
import type { CartItem } from "./whatsapp";

export function addItemToCart(
  cart: CartItem[],
  product: Product,
  quantity: number = 1,
): CartItem[] {
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    return cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item,
    );
  }
  return [...cart, { ...product, quantity }];
}

export function updateItemQuantity(
  cart: CartItem[],
  productId: number,
  newQuantity: number,
): CartItem[] {
  if (newQuantity <= 0) {
    return removeItemFromCart(cart, productId);
  }
  return cart.map((item) =>
    item.id === productId ? { ...item, quantity: newQuantity } : item,
  );
}

export function removeItemFromCart(
  cart: CartItem[],
  productId: number,
): CartItem[] {
  return cart.filter((item) => item.id !== productId);
}

export function calculateCartTotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getCartItemCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}
