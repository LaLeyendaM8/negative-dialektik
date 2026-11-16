import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { SiteFooter } from "../components/layout/site-footer";
import { SiteHeader } from "../components/layout/site-header";
import { getContent } from "@/lib/getContent";
import {
  getLocalizedAlternates,
  getSiteUrl,
  isSupportedLanguage,
} from "@/lib/site";
import "../globals.css";
import { GoogleAnalytics } from "../components/analytics/google-analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
});

const descriptions = {
  de: "Negative Dialektik ist ein Institut für deutsche Philosophie. Verlag, Akademie und Stiftung bilden eine gemeinsame editorische und institutionelle Struktur.",
  es: "Negative Dialektik es un instituto de filosofía alemana. Editorial, academia y fundación forman una estructura editorial e institucional común.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = isSupportedLanguage(langParam) ? langParam : "es";

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: "Negative Dialektik",
      template: "%s | Negative Dialektik",
    },
    description: descriptions[lang],
    alternates: getLocalizedAlternates(lang),
    icons: { icon: "/logo/favicon.svg" },
    openGraph: {
      type: "website",
      siteName: "Negative Dialektik",
      locale: lang === "de" ? "de_DE" : "es_CO",
      alternateLocale: lang === "de" ? ["es_CO"] : ["de_DE"],
      title: "Negative Dialektik",
      description: descriptions[lang],
      url: `/${lang}`,
    },
    twitter: {
      card: "summary",
      title: "Negative Dialektik",
      description: descriptions[lang],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { navigation, footerContent, uiText } = getContent(lang);

  return (
    <html lang={lang}>
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased bg-[var(--color-background)] text-[var(--color-text)]`}
      >
        <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
          <SiteHeader lang={lang} navigation={navigation} uiText={uiText} />
          {children}
          <SiteFooter
            lang={lang}
            links={footerContent.links}
            brand={footerContent.brand}
            rights={footerContent.rights}
          />
          <GoogleAnalytics lang={lang} />
        </div>
      </body>
    </html>
  );
}
