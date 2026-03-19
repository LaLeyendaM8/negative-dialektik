import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { SiteFooter } from "../components/layout/site-footer";
import { SiteHeader } from "../components/layout/site-header";
import { getContent } from "@/lib/getContent";
import "../globals.css";

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
  icons: {
    icon: "/logo/favicon.svg",
  },
  description:
    "Negative Dialektik ist ein Institut für deutsche Philosophie. Verlag, Akademie und Stiftung bilden eine gemeinsame editorische und institutionelle Struktur.",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const { navigation, footerContent, uiText } = getContent(params.lang);

  return (
    <html lang={params.lang}>
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased bg-[var(--color-background)] text-[var(--color-text)]`}
      >
        <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
          <SiteHeader
            lang={params.lang}
            navigation={navigation}
            uiText={uiText}
          />
          {children}
          <SiteFooter
            lang={params.lang}
            links={footerContent.links}
            brand={footerContent.brand}
            rights={footerContent.rights}
          />
        </div>
      </body>
    </html>
  );
}