"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    throw new Error("Bitte alle Felder ausfüllen.");
  }

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "Negative Dialektik <onboarding@resend.dev>",
    to: process.env.CONTACT_RECEIVER_EMAIL || "info@negative-dialektik.com",
    subject: `Kontaktformular: ${name}`,
    replyTo: email,
    text: `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
  });
}

export async function subscribeNewsletter(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    throw new Error("Bitte eine E-Mail-Adresse eingeben.");
  }

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "Negative Dialektik <onboarding@resend.dev>",
    to: process.env.CONTACT_RECEIVER_EMAIL || "info@negative-dialektik.com",
    subject: "Neue Newsletter-Anmeldung",
    text: `Neue Newsletter-Anmeldung: ${email}`,
  });
}