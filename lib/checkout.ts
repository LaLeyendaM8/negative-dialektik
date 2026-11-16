import { createHash, randomUUID, timingSafeEqual } from "crypto";
import { getBookBySlug } from "@/lib/getCatalog";
import { isSupportedLanguage } from "@/lib/site";

export type WompiCheckoutSession = {
  reference: string;
  url: string;
};

function getWompiConfig() {
  const publicKey = process.env.WOMPI_PUBLIC_KEY;
  const integritySecret = process.env.WOMPI_INTEGRITY_SECRET;

  if (!publicKey || !integritySecret) {
    return null;
  }

  return {
    publicKey,
    integritySecret,
  };
}

function getBaseUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (configuredUrl) {
    try {
      const url = new URL(configuredUrl);
      if (process.env.NODE_ENV === "production" && url.protocol !== "https:") {
        return null;
      }
      return url.origin;
    } catch {
      return null;
    }
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    return `https://${vercelUrl.replace(/\/$/, "")}`;
  }

  return null;
}

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function parseCatalogPriceToPesos(price: string | undefined) {
  if (!price) {
    return null;
  }

  const digits = price.replace(/[^\d]/g, "");
  const pesos = digits ? Number(digits) : null;

  return pesos && Number.isFinite(pesos) ? pesos : null;
}

export function isBookCheckoutEnabled(lang: string, slug: string) {
  const book = getBookBySlug(lang, slug);

  if (!book) {
    return { enabled: false as const };
  }

  const enabled =
    Boolean(book.checkoutEnabled) &&
    Boolean(book.price) &&
    Boolean(book.currency) &&
    book.stockStatus !== "nicht-verfuegbar";

  return {
    enabled,
    book,
  };
}

export function createWompiReference(lang: string, slug: string) {
  const safeLang = lang === "de" ? "de" : "es";
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const timestamp = Date.now().toString(36);
  const suffix = randomUUID().replace(/-/g, "").slice(0, 10);

  return `nd_${safeLang}_${safeSlug}_${timestamp}_${suffix}`;
}

export function parseWompiReference(reference: string | undefined) {
  if (!reference) {
    return null;
  }

  const match = reference.match(
    /^nd_(de|es)_([a-z0-9-]+)_([a-z0-9]+)_([a-f0-9]{10})$/,
  );
  if (!match) {
    return null;
  }

  const [, lang, slug] = match;
  if (!isSupportedLanguage(lang)) {
    return null;
  }

  return { lang, slug };
}

export function validateWompiTransaction(params: {
  reference?: string;
  amountInCents?: number;
  currency?: string;
}) {
  const parsedReference = parseWompiReference(params.reference);
  if (!parsedReference) {
    return { valid: false as const, reason: "invalid_reference" as const };
  }

  const checkout = isBookCheckoutEnabled(
    parsedReference.lang,
    parsedReference.slug,
  );
  if (!checkout.enabled || !checkout.book?.price || !checkout.book.currency) {
    return { valid: false as const, reason: "checkout_disabled" as const };
  }

  const expectedPesos = parseCatalogPriceToPesos(checkout.book.price);
  if (!expectedPesos) {
    return { valid: false as const, reason: "invalid_catalog_price" as const };
  }

  const expectedAmountInCents = expectedPesos * 100;
  const expectedCurrency = checkout.book.currency.toUpperCase();
  if (
    !Number.isSafeInteger(params.amountInCents) ||
    params.amountInCents !== expectedAmountInCents
  ) {
    return { valid: false as const, reason: "amount_mismatch" as const };
  }

  if (params.currency?.toUpperCase() !== expectedCurrency) {
    return { valid: false as const, reason: "currency_mismatch" as const };
  }

  return {
    valid: true as const,
    reference: parsedReference,
    book: checkout.book,
    expectedAmountInCents,
    expectedCurrency,
  };
}

export async function createCheckoutSession(params: {
  lang: string;
  slug: string;
}): Promise<WompiCheckoutSession> {
  const wompiConfig = getWompiConfig();
  const baseUrl = getBaseUrl();

  if (!wompiConfig || !baseUrl) {
    throw new Error("Wompi or site configuration is missing.");
  }

  const result = isBookCheckoutEnabled(params.lang, params.slug);

  if (!result.enabled || !result.book?.price || !result.book?.currency) {
    throw new Error("Checkout is not enabled for this book.");
  }

  const pesos = parseCatalogPriceToPesos(result.book.price);
  if (!pesos) {
    throw new Error("Invalid unit price for checkout.");
  }

  const amountInCents = pesos * 100;
  const currency = result.book.currency.toUpperCase();
  const reference = createWompiReference(params.lang, result.book.slug);
  const integritySignature = sha256(
    `${reference}${amountInCents}${currency}${wompiConfig.integritySecret}`,
  );
  const redirectUrl = new URL(`/${params.lang}/checkout/success`, baseUrl);
  redirectUrl.searchParams.set("slug", result.book.slug);
  redirectUrl.searchParams.set("reference", reference);

  const checkoutUrl = new URL("https://checkout.wompi.co/p/");
  checkoutUrl.searchParams.set("public-key", wompiConfig.publicKey);
  checkoutUrl.searchParams.set("currency", currency);
  checkoutUrl.searchParams.set("amount-in-cents", String(amountInCents));
  checkoutUrl.searchParams.set("reference", reference);
  checkoutUrl.searchParams.set("signature:integrity", integritySignature);
  checkoutUrl.searchParams.set("redirect-url", redirectUrl.toString());
  checkoutUrl.searchParams.set("collect-shipping", "true");

  return {
    reference,
    url: checkoutUrl.toString(),
  };
}

export function verifyWompiEventSignature(body: unknown) {
  const eventSecret = process.env.WOMPI_EVENTS_SECRET;

  if (!eventSecret) {
    return process.env.NODE_ENV !== "production";
  }

  const payload = body as {
    signature?: {
      checksum?: string;
      properties?: string[];
    };
    timestamp?: string | number;
    data?: unknown;
  };
  const checksum = payload.signature?.checksum;
  const properties = payload.signature?.properties;
  const timestamp = payload.timestamp;

  if (!checksum || !properties?.length || !timestamp) {
    return false;
  }

  const values = properties.map((property) =>
    getWompiSignaturePropertyValue(payload, property),
  );
  const expected = sha256(`${values.join("")}${timestamp}${eventSecret}`);

  const expectedBuffer = Buffer.from(expected, "hex");
  const checksumBuffer = Buffer.from(checksum, "hex");

  return (
    expectedBuffer.length === checksumBuffer.length &&
    timingSafeEqual(expectedBuffer, checksumBuffer)
  );
}

function getWompiSignaturePropertyValue(
  payload: { data?: unknown } & Record<string, unknown>,
  property: string,
) {
  const fromRoot = getNestedValue(payload, property);
  if (fromRoot !== undefined && fromRoot !== null) {
    return String(fromRoot);
  }

  const fromData = getNestedValue(payload.data, property);
  if (fromData !== undefined && fromData !== null) {
    return String(fromData);
  }

  return "";
}

function getNestedValue(source: unknown, path: string) {
  return path.split(".").reduce<unknown>((current, key) => {
    if (!current || typeof current !== "object") {
      return undefined;
    }

    return (current as Record<string, unknown>)[key];
  }, source);
}
