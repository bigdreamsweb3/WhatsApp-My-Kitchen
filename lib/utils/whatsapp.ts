import type { Product, productCategories } from "../data/products";

import {
  BRAND_NAME,
  WHATSAPP_BASE_URL,
  SITE_URL,
  PAYMENT_ACCOUNT,
} from "../constants";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string; // Add this property to match Product interface
};

export interface CheckoutForm {
  address: string;
  phone: string;
  notes: string;
}

export function generateWhatsAppMessage(
  cart: CartItem[],
  total: number,
  form: CheckoutForm,
): string {
  const ref = `ord_${Date.now()}`;
  const payLink = `${SITE_URL}/pay?amount=${encodeURIComponent(
    total.toString(),
  )}&ref=${encodeURIComponent(ref)}`;

  let message = `Hello ${BRAND_NAME}!:\n\n`;
  message += "\u{1F6D2} *Order Summary:*\n";

  cart.forEach((item) => {
    message += `- ${item.name} x${item.quantity} \u2013 \u20A6${(item.price * item.quantity).toLocaleString()}\n`;
  });

  message += `\n*Total: \u20A6${total.toLocaleString()}*\n\n`;

  if (form.address) {
    message += `\u{1F4CD} *Delivery Address:*\n${form.address}\n\n`;
  }

  if (form.phone) {
    message += `\u{1F4F1} *Phone Number:*\n${form.phone}\n\n`;
  }

  if (form.notes) {
    message += `\u{1F4DD} *Notes:*\n${form.notes}\n`;
  }

  // Append payment details & link for customer to complete payment on site
  message += `\n*Payment:*\nPlease pay the exact amount to ${PAYMENT_ACCOUNT.bankName} ${PAYMENT_ACCOUNT.accountNumber} (${PAYMENT_ACCOUNT.accountName}).\n`;
  message += `\nComplete payment here: ${payLink}\n`;

  return encodeURIComponent(message);
}

export function generateBuyNowMessage(product: Product): string {
  const ref = `ord_${Date.now()}`;
  const payLink = `${SITE_URL}/pay?amount=${encodeURIComponent(
    product.price.toString(),
  )}&ref=${encodeURIComponent(ref)}`;
  let message = `Hello ${BRAND_NAME}!:\n\n *Order:*\n- ${product.name} x1 \u2013 \u20A6${product.price.toLocaleString()}\n\n*Total: \u20A6${product.price.toLocaleString()}*\n\n`;
  message += `Payment: ${PAYMENT_ACCOUNT.bankName} ${PAYMENT_ACCOUNT.accountNumber} (${PAYMENT_ACCOUNT.accountName})\n`;
  message += `Complete payment here: ${payLink}`;
  return encodeURIComponent(message);
}

export function openWhatsApp(message: string) {
  window.open(`${WHATSAPP_BASE_URL}?text=${message}`, "_blank");
}
