"use server";

import { Resend } from "resend";
import { headers } from "next/headers";
import { isIP } from "node:net";
import { newsletterCopy, requestNewsletter } from "@/lib/newsletter";
import { normalizeNewsletterEmail } from "@/lib/newsletter-token";

export type FormActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContactForm(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();

  if (!name || !email || !message) {
    return {
      status: "error",
      message: "Bitte alle Felder ausfuellen.",
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "Negative Dialektik <onboarding@resend.dev>",
      to: process.env.CONTACT_RECEIVER_EMAIL || "info@negative-dialektik.com",
      subject: subject || `Kontaktformular: ${name}`,
      replyTo: email,
      text: `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
    });

    return {
      status: "success",
      message: "Vielen Dank. Ihre Nachricht wurde erfolgreich uebermittelt.",
    };
  } catch {
    return {
      status: "error",
      message:
        "Die Nachricht konnte im Moment nicht versendet werden. Bitte versuchen Sie es erneut.",
    };
  }
}

export async function subscribeNewsletter(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const language = formData.get("language") === "de" ? "de" : "es";
  const copy = newsletterCopy[language];
  const accepted = { status: "success", message: copy.accepted } as const;
  if (formData.get("company_website")) return accepted;
  const email = normalizeNewsletterEmail(formData.get("email"));
  if (!email || formData.get("newsletter_consent") !== "yes") {
    return { status: "error", message: copy.invalid };
  }

  const requestHeaders = await headers();
  const edgeIp = requestHeaders.get("x-vercel-forwarded-for")?.trim() ?? "";
  const ip = process.env.VERCEL === "1" && isIP(edgeIp) ? edgeIp : "unknown";
  try {
    await requestNewsletter(email, language, ip);
    return accepted;
  } catch {
    console.error("Newsletter signup could not be processed");
    return { status: "error", message: copy.error };
  }
}
