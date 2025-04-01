"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header"
import { CartProvider } from "@/app/context/CartContext";
import Footer from "./components/Footer";
import { CurrencyProvider } from "@/app/context/CurrencyContext";
import { FavoriteProvider } from "@/app/context/FavoriteContext";
import "@/i18n";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="dark:bg-gray-900 dark:text-white transition-all duration-300 ease-in-out">
        <FavoriteProvider>
          <CurrencyProvider>
            <CartProvider>
              <Header />
              {children}
            </CartProvider>
            <Footer />
          </CurrencyProvider>
        </FavoriteProvider>
      </body>
    </html>
  );
}
