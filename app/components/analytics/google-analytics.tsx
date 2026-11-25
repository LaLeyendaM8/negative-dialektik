"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const consentKey = "nd_analytics_consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics({ lang }: { lang: string }) {
  const measurementId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  const pathname = usePathname();
  const [consent, setConsent] = useState<"granted" | "denied" | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(consentKey);
    queueMicrotask(() =>
      setConsent(saved === "granted" || saved === "denied" ? saved : null),
    );
  }, []);

  useEffect(() => {
    if (consent === "granted" && window.gtag && measurementId) {
      window.gtag("config", measurementId, { page_path: pathname });
    }
  }, [consent, measurementId, pathname]);

  if (!measurementId) return null;

  const choose = (value: "granted" | "denied") => {
    window.localStorage.setItem(consentKey, value);
    setConsent(value);
  };

  return (
    <>
      {consent === "granted" ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}

      {consent === null ? (
        <aside
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-xl"
          aria-label={lang === "de" ? "Analytics-Einwilligung" : "Consentimiento de analítica"}
        >
          <p className="text-[15px] leading-6 text-[var(--color-text)]">
            {lang === "de"
              ? "Dürfen wir anonyme Nutzungsdaten mit Google Analytics erfassen, um die Website zu verbessern?"
              : "¿Podemos recopilar datos de uso anónimos con Google Analytics para mejorar el sitio web?"}
            {" "}
            <a href={`/${lang}/datenschutz`} className="underline underline-offset-4">
              {lang === "de" ? "Datenschutz" : "Privacidad"}
            </a>
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => choose("granted")}
              className="border border-[var(--color-text)] bg-[var(--color-text)] px-4 py-2 text-[13px] uppercase tracking-[0.08em] text-[var(--color-background)]"
            >
              {lang === "de" ? "Zustimmen" : "Aceptar"}
            </button>
            <button
              type="button"
              onClick={() => choose("denied")}
              className="border border-[var(--color-border)] px-4 py-2 text-[13px] uppercase tracking-[0.08em]"
            >
              {lang === "de" ? "Ablehnen" : "Rechazar"}
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
