import { productCategories } from "../data/products";
import type { CartItem } from "./whatsapp";

type Product = (typeof productCategories)[number];

export function addItemToCart(
  cart: CartItem[],
  product: Product | Partial<CartItem>,
  quantity: number = 1,
): CartItem[] {
  const prodId = (product as any).id as string;
  const existingItem = cart.find((item) => item.id === prodId);
  if (existingItem) {
    return cart.map((item) =>
      item.id === prodId
        ? { ...item, quantity: item.quantity + quantity }
        : item,
    );
  }
  const newItem: CartItem = {
    id: prodId,
    name: (product as any).name || "Item",
    price: (product as any).price || 0,
    quantity,
    imageUrl: (product as any).imageUrl || (product as any).image || undefined,
    description: (product as any).description,
  };
  return [...cart, newItem];
}

export function updateItemQuantity(
  cart: CartItem[],
  productId: string,
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
  productId: string,
): CartItem[] {
  return cart.filter((item) => item.id !== productId);
}

export function calculateCartTotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getCartItemCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}
