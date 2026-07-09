import type { Metadata } from "next";
import { Noto_Serif, Inter } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/ds";
import { fetchLocations } from "@/lib/graphql/queries";
import type { Location } from "@/lib/types";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let locations: Location[] = [];
  try {
    locations = await fetchLocations();
  } catch {
    // GraphQL недоступен — Footer получит пустой массив
  }

  return (
    <html
      lang="ru"
      className={`${notoSerif.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <div style={{ flex: 1 }}>{children}</div>
        <Footer locations={locations} />
      </body>
    </html>
  );
}
