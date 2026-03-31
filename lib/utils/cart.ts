import type { Product } from "../data/products";
import type { CartItem } from "./whatsapp";

export function addItemToCart(
  cart: CartItem[],
  product: Product | Partial<CartItem>,
  quantity: number = 1,
): CartItem[] {
  const productId = (product as CartItem).id;
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    return cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: item.quantity + quantity }
        : item,
    );
  }

  const newItem: CartItem = {
    id: productId,
    name: (product as CartItem).name || "Item",
    price: (product as CartItem).price || 0,
    quantity,
    imageUrl:
      (product as CartItem).imageUrl || (product as { image?: string }).image,
    description: (product as CartItem).description,
    baseProductId: (product as CartItem).baseProductId,
    customization: (product as CartItem).customization,
  };

  return [...cart, newItem];
}

export function replaceItemInCart(
  cart: CartItem[],
  oldItemId: string,
  product: Product | Partial<CartItem>,
  quantity: number,
): CartItem[] {
  const cartWithoutOldItem = cart.filter((item) => item.id !== oldItemId);
  return addItemToCart(cartWithoutOldItem, product, quantity);
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
