import type { Metadata } from "next";
import { Noto_Serif, Inter } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  weight: ["300", "400"],
  subsets: ["latin", "cyrillic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "ChaiShopper — азиатские чайные",
  description:
    "Сеть азиатских чайных ресторанов ChaiShopper: меню, чайные церемонии, бронирование столов.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${notoSerif.variable} ${inter.variable} h-full antialiased`}
    >
      {/* Navbar/Footer добавляются в Sprint 2 */}
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
