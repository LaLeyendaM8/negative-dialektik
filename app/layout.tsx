import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { SiteFooter } from "./components/layout/site-footer";
import { SiteHeader } from "./components/layout/site-header";
import { footerLinks } from "./content/site/footer";
import { navigation } from "./content/site/navigation";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Negative Dialektik",
  description:
    "Negative Dialektik ist ein Institut für deutsche Philosophie. Verlag, Akademie und Stiftung verbinden editorische Arbeit, Lehre und kulturelle Vermittlung im spanischsprachigen Raum.",
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