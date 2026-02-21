import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { CartProvider } from "./context/CartContext";
import Nav from "./home/components/Nav";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "קואופרטיב קניות",
   description: "קניות משותפות",
   icons: {
    icon: "/favicon.svg",
  },
};











export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
        
          {children}
        </CartProvider>




      </body>
    </html>
  );
}
