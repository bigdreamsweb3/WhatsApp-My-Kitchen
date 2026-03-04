import type { Metadata } from 'next';
// import { GeistSans, GeistMono } from 'next/font/google';
import {
  Pacifico,
  Inter,
  Baloo_2,
  Poppins,
} from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

// const geistSans = GeistSans({
//   subsets: ['latin'],
//   variable: '--font-geist-sans',
//   display: 'swap',
// });

// const geistMono = GeistMono({
//   subsets: ['latin'],
//   variable: '--font-geist-mono',
//   display: 'swap',
// });

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-logo-hero',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-button-menu',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Kay's Turks | Fresh Turkey, Chicken & Fries in Lagos",
  description:
    "Order fresh crispy chicken, turkey, loaded fries and more from Kay's Turks. Fast delivery in Lagos, Nigeria. Order via WhatsApp!",
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`

        ${pacifico.variable}
        ${inter.variable}
        ${baloo.variable}
        ${poppins.variable}
      `}
    >
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}