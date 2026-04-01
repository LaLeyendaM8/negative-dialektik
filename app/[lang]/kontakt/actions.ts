"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

  if (!name || !email || !message) {
    return {
      status: "error",
      message: "Bitte alle Felder ausfuellen.",
    };
  }

  try {
    await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "Negative Dialektik <onboarding@resend.dev>",
      to: process.env.CONTACT_RECEIVER_EMAIL || "info@negative-dialektik.com",
      subject: `Kontaktformular: ${name}`,
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
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return {
      status: "error",
      message: "Bitte eine E-Mail-Adresse eingeben.",
    };
  }

  try {
    await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "Negative Dialektik <onboarding@resend.dev>",
      to: process.env.CONTACT_RECEIVER_EMAIL || "info@negative-dialektik.com",
      subject: "Neue Newsletter-Anmeldung",
      text: `Neue Newsletter-Anmeldung: ${email}`,
    });

    return {
      status: "success",
      message: "Vielen Dank. Die Anmeldung wurde erfolgreich uebermittelt.",
    };
  } catch {
    return {
      status: "error",
      message:
        "Die Anmeldung konnte im Moment nicht versendet werden. Bitte versuchen Sie es erneut.",
    };
  }
}
