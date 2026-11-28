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
  const [editing, setEditing] = useState(false);
  const [tagReady, setTagReady] = useState(false);
  const isPrivateFlow = pathname.startsWith(`/${lang}/checkout/`) || pathname.startsWith(`/${lang}/newsletter/`);

  useEffect(() => {
    const saved = window.localStorage.getItem(consentKey);
    queueMicrotask(() =>
      setConsent(saved === "granted" || saved === "denied" ? saved : null),
    );
  }, []);

  useEffect(() => {
    if (consent === "granted" && tagReady && !isPrivateFlow) {
      window.gtag?.("event", "page_view", {
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [consent, isPrivateFlow, pathname, tagReady]);

  if (!measurementId || !/^G-[A-Z0-9]+$/.test(measurementId) || isPrivateFlow) return null;

  const choose = (value: "granted" | "denied") => {
    window.localStorage.setItem(consentKey, value);
    if (consent === "granted" && value === "denied") {
      Object.assign(window, { [`ga-disable-${measurementId}`]: true });
      window.location.reload();
      return;
    }
    setConsent(value);
    setEditing(false);
  };

  return (
    <>
      {consent === "granted" ? (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
          strategy="afterInteractive"
          onReady={() => {
            if (!window.gtag) {
              window.dataLayer ||= [];
              window.gtag = function gtag() {
                // Match the command format used by Google's gtag bootstrap.
                // eslint-disable-next-line prefer-rest-params
                window.dataLayer.push(arguments);
              };
              window.gtag("js", new Date());
              window.gtag("config", measurementId, { send_page_view: false, allow_google_signals: false });
            }
            setTagReady(true);
          }}
        />
      ) : null}

      {pathname === `/${lang}/datenschutz` && consent !== null && (
        <div className="mx-auto max-w-3xl px-5 pb-6">
          <button type="button" className="underline" onClick={() => setEditing(true)}>
            {lang === "de" ? "Analytics-Einstellungen ändern" : "Cambiar preferencias de analítica"}
          </button>
        </div>
      )}
      {consent === null || editing ? (
        <aside
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-xl"
          aria-label={lang === "de" ? "Analytics-Einwilligung" : "Consentimiento de analítica"}
        >
          <p className="text-[15px] leading-6 text-[var(--color-text)]">
            {lang === "de"
              ? "Dürfen wir mit Google Analytics messen, welche Seiten besucht werden und wie oft der Checkout gestartet wird?"
              : "¿Podemos usar Google Analytics para medir las visitas y el inicio del proceso de compra?"}
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
