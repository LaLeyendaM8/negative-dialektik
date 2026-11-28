import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "../../../components/shared/page-shell";
import { isSupportedLanguage } from "@/lib/site";
import { ConfirmationForm } from "./confirmation-form";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default async function NewsletterConfirmPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLanguage(lang)) notFound();
  return <PageShell><ConfirmationForm lang={lang} /></PageShell>;
}
