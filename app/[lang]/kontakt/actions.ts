"use server";

import { Resend } from "resend";
import { storeNewsletterSubscription } from "@/lib/newsletter";

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
  const subject = String(formData.get("subject") ?? "").trim();

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
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const language = formData.get("language") === "es" ? "es" : "de";

  if (!email) {
    return {
      status: "error",
      message:
        language === "es"
          ? "Ingrese un correo electronico."
          : "Bitte eine E-Mail-Adresse eingeben.",
    };
  }

  const result = await storeNewsletterSubscription({ email, language });

  if (result.status === "created") {
    try {
      await resend.emails.send({
        from:
          process.env.RESEND_FROM_EMAIL ||
          "Negative Dialektik <onboarding@resend.dev>",
        to: process.env.CONTACT_RECEIVER_EMAIL || "info@negative-dialektik.com",
        subject:
          language === "es"
            ? "Nueva suscripcion al boletin"
            : "Neue Newsletter-Anmeldung",
        text: `Neue Newsletter-Anmeldung: ${email}\nSprache: ${language}`,
      });
    } catch {
      // Keep the subscription success even if the internal notification mail fails.
    }

    return {
      status: "success",
      message:
        language === "es"
          ? "Gracias. Su correo ha sido registrado para el boletin."
          : "Vielen Dank. Ihre E-Mail wurde fuer den Newsletter gespeichert.",
    };
  }

  if (result.status === "exists") {
    return {
      status: "success",
      message:
        language === "es"
          ? "Este correo ya esta registrado en la lista."
          : "Diese E-Mail-Adresse ist bereits in der Liste eingetragen.",
    };
  }

  if (result.status === "not_configured") {
    return {
      status: "error",
      message:
        language === "es"
          ? "La base de datos del boletin aun no esta configurada."
          : "Die Newsletter-Datenbank ist noch nicht konfiguriert.",
    };
  }

  return {
    status: "error",
    message:
      language === "es"
        ? "La suscripcion no pudo guardarse en este momento. Intente nuevamente."
        : "Die Anmeldung konnte im Moment nicht gespeichert werden. Bitte versuchen Sie es erneut.",
  };
}
