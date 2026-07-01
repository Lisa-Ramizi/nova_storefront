import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { CartProvider } from "@/hooks/useCart";
import { SearchProvider } from "@/hooks/useSearch";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NOVA",
  description: "NOVA storefront",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <SearchProvider>
          <CartProvider>
            <Header />
            <div className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-[var(--spacing-page-x)] py-[var(--spacing-page-y)]">
              {children}
            </div>
          </CartProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
