# WhatsApp My Kitchen — Next.js Home-Cooked Food Ordering Web-app

A responsive Next.js + Tailwind template for a simple virtual kitchen / online food store. Customers browse your menu and send orders directly via WhatsApp (no payment gateway or complex app required). Perfect for home cooks, mama puts, or small food businesses.

This project was originally built for Kay's Turks — a small online food store selling turkey, chicken, fries, and sides. This project demonstrates a lightweight online ordering flow that uses WhatsApp for checkout (no payment gateway required). It includes a styled hero, floating food images, product cards, and a WhatsApp checkout integration.

## Features

- Modern Next.js App Router (16+)
- Tailwind CSS with custom theme variables (OKLCH colors in `app/globals.css`)
- Animated hero section with floating food images
- Product cards, cart (local storage), and simple checkout
- WhatsApp message generator for easy ordering
- Responsive, mobile-first UI with accessibility basics
- Optional custom local font support (`/public/fonts/`)

## Who is this for?

Home cooks, small mama puts, or anyone selling homemade food who wants a clean online menu + WhatsApp-only checkout. No need for Paystack, Flutterwave, etc. — customers just message you!

## Quick start (clone + run)

Requirements: Node.js (v18+ recommended) and `pnpm` or `npm`.

1. Clone the repo:

```bash
git clone https://github.com/bigdreamsweb3/whatsapp-my-kitchen.git
cd whatsapp-my-kitchen
```

2. Install dependencies (pnpm recommended):

```bash
pnpm install
# or
npm install
```

3. Start the dev server:

```bash
pnpm dev
# or
npm run dev
```

Open http://localhost:3000

## Customize for your store

- Update `lib/constants.ts` with your WhatsApp number, brand name, and contact links.
- Edit `lib/data/products.ts` to add or update products, prices, images and descriptions.
- Replace images in `public/hero/` and `public/` with your assets (hero background, product images, logo).
- Theme colors are set in `app/globals.css` using CSS variables — change `--primary`, `--accent`, etc. for brand colors.

## WhatsApp checkout flow

This project sends the order summary to WhatsApp rather than processing card payments:

1. Cart and checkout form collect items, totals, address, phone, and notes.
2. `lib/utils/whatsapp.ts` builds a formatted message and opens `https://wa.me/<NUMBER>?text=<encoded message>` in a new tab.
3. The store operator receives the order on WhatsApp and can confirm or arrange payment/delivery.

### WhatsApp payment confirmation (how this app handles payments)

This template does not upload or store payment screenshots. Instead it helps customers notify the store operator via WhatsApp that payment was made:

- After completing payment to the bank account shown on the payment page, the customer clicks **I paid — confirm**.
- The page prompts for an optional payer name and phone, then opens WhatsApp with a pre-filled confirmation message that includes the order reference, amount, payer name and phone.
- Because web browsers cannot attach local files automatically to a WhatsApp web link, the customer must attach the payment screenshot manually inside WhatsApp when they send the message. The message asks the operator to request the screenshot if they need it.

Why this approach?

- Simpler and privacy-respecting: no server-side proof storage is used.
- Works reliably across mobile devices where WhatsApp is installed — the message opens WhatsApp ready for the user to send.

Limitations and tips

- Desktop browsers cannot programmatically attach files to WhatsApp links; users must add screenshots manually in WhatsApp Web.
- If you want automatic uploads, integrate object storage (S3) or a server upload endpoint — but that stores user files and requires extra security and privacy handling.
- Make the operator's WhatsApp number obvious and include instructions in the payment confirmation text so they know how to request and verify screenshots.

To configure the number, update `lib/constants.ts`:

```ts
export const WHATSAPP_NUMBER = "2349037334349";
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
```

Notes:

- Ensure the WhatsApp number is in international format without plus signs or zero-padding (e.g. `234XXXXXXXXXX`).
- Keep messages short and include address and contact details for delivery.

## Deployment

Build and start for production:

```bash
pnpm build
pnpm start
# or using npm
npm run build
npm start
```

Deploy on Vercel (recommended): connect the repository to Vercel and set environment variables if needed.

## File highlights

- `app/` — pages and top-level layout
- `components/` — UI pieces (hero, product cards, header, cart)
- `components/sections/menu-section.tsx` — product grid
- `lib/data/products.ts` — sample product data
- `lib/utils/whatsapp.ts` — message generation and open function
- `app/globals.css` — theme variables and font setup

### License & Notes

MIT License – feel free to fork and customize.
Originally built as a template for a food spot; now rebranded for home kitchens.
Replace all images/copy before going live. Check font licenses if using custom ones.

Happy cooking & selling! If you need help with:

- Custom WhatsApp quick replies/catalog setup
- Adding more menu sections
- Better images or logo tweaks

Just reach out. 🍲📱
"#WhatsApp-My-Kitchen" 

Built with ❤️ by Agbaka Matthew Daniel Ugonna (Big Dreams Web3)
