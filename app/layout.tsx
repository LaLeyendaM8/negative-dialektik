import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { SiteFooter } from "./components/layout/site-footer";
import { SiteHeader } from "./components/layout/site-header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
});

const navigation = [
  { label: "Start", href: "/" },
  { label: "Verlag", href: "/verlag" },
  { label: "Katalog", href: "/katalog" },
  { label: "Autoren", href: "/autoren" },
  { label: "Texte", href: "/texte" },
  { label: "Akademie", href: "/akademie" },
  { label: "Stiftung", href: "/stiftung" },
  { label: "Kontakt", href: "/kontakt" },
];

const footerLinks = [
  { label: "Verlag", href: "/verlag" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];

export const metadata: Metadata = {
  title: "Negative Dialektik",
  description:
    "Negative Dialektik veröffentlicht, übersetzt und vermittelt zentrale Texte der deutschen Philosophie, Kritischen Theorie und Sozialtheorie im spanischsprachigen Raum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased bg-[var(--color-background)] text-[var(--color-text)]`}
      >
        <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
          <SiteHeader navigation={navigation} />
          {children}
          <SiteFooter links={footerLinks} />
        </div>
      </body>
    </html>
  );
}