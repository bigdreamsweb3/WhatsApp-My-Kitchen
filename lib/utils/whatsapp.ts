import {
  type Product,
  type ProductCustomization,
  productCategories,
} from "../data/products";

import {
  BRAND_NAME,
  PAYMENT_ACCOUNT,
  SITE_URL,
  WHATSAPP_BASE_URL,
} from "../constants";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  description?: string;
  baseProductId?: string;
  customization?: ProductCustomization;
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
  lines.push("Order:");

  const findByName = (name: string): Product | undefined => {
    for (const category of productCategories) {
      for (const product of category.products) {
        if (product.name === name.trim()) return product;
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
        const section = part.trim();

        if (section.startsWith("Dip:")) {
          lines.push(`  Free Dip: ${section.replace(/^Dip:\s*/i, "")}`);
          return;
        }

        if (section.startsWith("Extra Dips:")) {
          const list = section.replace(/^Extra Dips:\s*/i, "").split(",");
          lines.push("  Extra Dips:");

          list.forEach((name) => {
            const product = findByName(name);
            const price = product ? ` \u20A6${product.price.toLocaleString()}` : "";
            lines.push(`    - ${name.trim()}${price}`);
          });
          return;
        }

        if (section.startsWith("Drinks:")) {
          const list = section.replace(/^Drinks:\s*/i, "").split(",");
          lines.push("  Drinks:");

          list.forEach((entry) => {
            const match = entry.trim().match(/(.+?) x(\d+)$/);

            if (match) {
              const name = match[1].trim();
              const quantity = parseInt(match[2], 10) || 1;
              const product = findByName(name);
              const price = product ? product.price * quantity : 0;
              lines.push(
                `    - ${name} x${quantity} - \u20A6${price.toLocaleString()}`,
              );
              return;
            }

            const name = entry.trim();
            const product = findByName(name);
            const price = product ? product.price : 0;
            lines.push(`    - ${name} - \u20A6${price.toLocaleString()}`);
          });
          return;
        }

        lines.push(`  ${section}`);
      });
    }

    lines.push(`  Item total: \u20A6${(item.price * item.quantity).toLocaleString()}`);
    lines.push("");
  });

  lines.push(`*Total: \u20A6${total.toLocaleString()}*`);
  lines.push("");

  if (form.address) {
    lines.push("Delivery Address:");
    lines.push(form.address);
    lines.push("");
  }

  if (form.phone) {
    lines.push("Phone Number:");
    lines.push(form.phone);
    lines.push("");
  }

  if (form.notes) {
    lines.push("Notes:");
    lines.push(form.notes);
    lines.push("");
  }

  lines.push("*Payment:*");
  lines.push(
    `Please pay the exact amount to ${PAYMENT_ACCOUNT.bankName} ${PAYMENT_ACCOUNT.accountNumber} (${PAYMENT_ACCOUNT.accountName}).`,
  );
  lines.push("");
  lines.push(`Complete payment here: ${payLink}`);

  return encodeURIComponent(lines.join("\n"));
}

export function generateBuyNowMessage(product: Product): string {
  const ref = `ord_${Date.now()}`;
  const payLink = `${SITE_URL}/pay?amount=${encodeURIComponent(
    product.price.toString(),
  )}&ref=${encodeURIComponent(ref)}`;
  let message =
    `Hello ${BRAND_NAME}!:\n\n` +
    ` *Order:*\n- ${product.name} x1 - \u20A6${product.price.toLocaleString()}\n\n` +
    `*Total: \u20A6${product.price.toLocaleString()}*\n\n`;

  message += `Payment: ${PAYMENT_ACCOUNT.bankName} ${PAYMENT_ACCOUNT.accountNumber} (${PAYMENT_ACCOUNT.accountName})\n`;
  message += `Complete payment here: ${payLink}`;
  return encodeURIComponent(message);
}

export function openWhatsApp(message: string) {
  return window.open(`${WHATSAPP_BASE_URL}?text=${message}`, "_blank");
}
