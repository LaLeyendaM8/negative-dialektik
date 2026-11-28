"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { newsletter as de } from "@/app/content/de/newsletter";
import { newsletter as es } from "@/app/content/es/newsletter";
import { PageHero } from "../../../components/shared/page-hero";
import { confirmNewsletterAction, type ConfirmationState } from "./actions";

export function ConfirmationForm({ lang }: { lang: "de" | "es" }) {
  const copy = lang === "de" ? de : es;
  const [token, setToken] = useState<string | null>(null);
  const [state, action, pending] = useActionState<ConfirmationState, FormData>(
    confirmNewsletterAction.bind(null, lang),
    "ready",
  );

  useEffect(() => {
    // Read the fragment locally. It is never sent in a GET request or referrer.
    const fragment = window.location.hash.slice(1);
    queueMicrotask(() => {
      setToken(/^[A-Za-z0-9_-]{43}$/.test(fragment) ? fragment : "");
      if (fragment) window.history.replaceState(null, "", window.location.pathname);
    });
  }, []);

  const ready = state === "ready" && token !== "";
  const [title, lead] = ready
    ? [copy.confirmTitle, copy.confirmText]
    : state === "confirmed"
      ? [copy.successTitle, copy.successText]
      : state === "error"
        ? [copy.retryTitle, copy.retryText]
        : [copy.expiredTitle, copy.expiredText];

  return (
    <>
      <PageHero title={title} lead={lead} />
      {ready && (
        <form action={action}>
          <input type="hidden" name="token" value={token ?? ""} />
          <button type="submit" disabled={!token || pending}
            className="border border-[var(--color-text)] px-5 py-3 disabled:opacity-50">
            {copy.confirmButton}
          </button>
        </form>
      )}
      <Link href={`/${lang}/kontakt#newsletter`} className="mt-6 inline-block underline">{copy.back}</Link>
    </>
  );
}
