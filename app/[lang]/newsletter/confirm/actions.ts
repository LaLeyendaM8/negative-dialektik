"use server";

import { confirmNewsletter } from "@/lib/newsletter";
import { isNewsletterToken } from "@/lib/newsletter-token";
import { isSupportedLanguage } from "@/lib/site";

export type ConfirmationState = "ready" | "confirmed" | "invalid" | "error";

export async function confirmNewsletterAction(
  lang: string, _previous: ConfirmationState, data: FormData,
): Promise<ConfirmationState> {
  const token = data.get("token");
  if (!isSupportedLanguage(lang) || !isNewsletterToken(token)) return "invalid";
  try {
    return await confirmNewsletter(token, lang) ? "confirmed" : "invalid";
  } catch {
    console.error("Newsletter confirmation could not be processed");
    return "error";
  }
}
