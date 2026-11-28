import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export function newsletterToken() {
  return randomBytes(32).toString("base64url");
}

export function isNewsletterToken(token: unknown): token is string {
  return typeof token === "string" && /^[A-Za-z0-9_-]{43}$/.test(token);
}

export function hashNewsletterToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function newsletterBucket(ip: string, secret: string) {
  return createHmac("sha256", secret).update(ip).digest("hex");
}

export function normalizeNewsletterEmail(value: unknown) {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@,<>;]+@[^\s@,<>;.]+(?:\.[^\s@,<>;.]+)+$/.test(email)) return null;
  return email;
}

export function matchesNewsletterSecret(value: string | null, secret: string) {
  if (secret.length < 32 || value === null || value.length > 512) return false;
  return timingSafeEqual(
    Buffer.from(hashNewsletterToken(value), "hex"),
    Buffer.from(hashNewsletterToken(secret), "hex"),
  );
}
