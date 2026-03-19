import { productCategories, type Product } from "../data/products";

import {
  BRAND_NAME,
  WHATSAPP_BASE_URL,
  SITE_URL,
  PAYMENT_ACCOUNT,
} from "../constants";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  description?: string;
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
  const lines: string[] = [];
  lines.push(`Hello ${BRAND_NAME}!`);
  lines.push("");
  lines.push("🛒 Order:");

  const findByName = (name: string): Product | undefined => {
    for (const cat of productCategories) {
      for (const p of cat.products) {
        if (p.name === name.trim()) return p;
      }
    }
    return undefined;
  };

  cart.forEach((item) => {
    lines.push(`- ${item.name}`);
    lines.push(`  Quantity: ${item.quantity}`);

    if (item.description) {
      const parts = item.description.split(" | ");
      parts.forEach((part) => {
        const p = part.trim();
        if (p.startsWith("Dip:")) {
          const free = p.replace(/^Dip:\s*/i, "");
          lines.push(`  Free Dip: ${free}`);
        } else if (p.startsWith("Extra Dips:")) {
          const list = p.replace(/^Extra Dips:\s*/i, "").split(",");
          lines.push(`  Extra Dips:`);
          list.forEach((name) => {
            const prod = findByName(name);
            const price = prod ? `₦${prod.price.toLocaleString()}` : "";
            lines.push(`    • ${name.trim()} ${price}`);
          });
        } else if (p.startsWith("Drinks:")) {
          const list = p.replace(/^Drinks:\s*/i, "").split(",");
          lines.push(`  Drinks:`);
          list.forEach((entry) => {
            const m = entry.trim().match(/(.+?) x(\d+)$/);
            if (m) {
              const name = m[1].trim();
              const qty = parseInt(m[2], 10) || 1;
              const prod = findByName(name);
              const price = prod ? prod.price * qty : 0;
              lines.push(`    • ${name} ×${qty} – ₦${price.toLocaleString()}`);
            } else {
              const name = entry.trim();
              const prod = findByName(name);
              const price = prod ? prod.price : 0;
              lines.push(`    • ${name} – ₦${price.toLocaleString()}`);
            }
          });
        } else {
          lines.push(`  ${p}`);
        }
      });
    }

    lines.push(
      `  Item total: ₦${(item.price * item.quantity).toLocaleString()}`,
    );
    lines.push("");
  });

  lines.push(`*Total: ₦${total.toLocaleString()}*`);
  lines.push("");

  if (form.address) {
    lines.push(`📍 Delivery Address:`);
    lines.push(form.address);
    lines.push("");
  }

  if (form.phone) {
    lines.push(`📱 Phone Number:`);
    lines.push(form.phone);
    lines.push("");
  }

  if (form.notes) {
    lines.push(`📝 Notes:`);
    lines.push(form.notes);
    lines.push("");
  }

  lines.push(`*Payment:*`);
  lines.push(
    `Please pay the exact amount to ${PAYMENT_ACCOUNT.bankName} ${PAYMENT_ACCOUNT.accountNumber} (${PAYMENT_ACCOUNT.accountName}).`,
  );
  lines.push("");
  lines.push(`Complete payment here: ${payLink}`);

  const message = lines.join("\n");
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
