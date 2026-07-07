import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { site } from "@/lib/site";

import { WelcomePopup } from "@/components/WelcomePopup";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "María Puñales",
    template: "%s | María Puñales",
  },
  description:
    "Sitio oficial de María Puñales. Trío de rock de Montevideo, Uruguay.",
  icons: {
    icon: site.logo.fullWordmark,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        {children}
        <WelcomePopup />
      </body>
    </html>
  );
}
