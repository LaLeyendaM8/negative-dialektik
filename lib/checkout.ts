import { getBookBySlug } from "@/lib/getCatalog";

type MercadoPagoPreferenceResponse = {
  id: string;
  init_point?: string;
  sandbox_init_point?: string;
};

function getMercadoPagoAccessToken() {
  return process.env.MERCADO_PAGO_ACCESS_TOKEN;
}

function getBaseUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    return `https://${vercelUrl.replace(/\/$/, "")}`;
  }

  return null;
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

export async function createCheckoutSession(params: {
  lang: string;
  slug: string;
}) {
  const mercadoPagoAccessToken = getMercadoPagoAccessToken();
  const baseUrl = getBaseUrl();

  if (!mercadoPagoAccessToken || !baseUrl) {
    throw new Error("Mercado Pago or site configuration is missing.");
  }

  const result = isBookCheckoutEnabled(params.lang, params.slug);

  if (!result.enabled || !result.book?.price || !result.book?.currency) {
    throw new Error("Checkout is not enabled for this book.");
  }

  const successUrl = `${baseUrl}/${params.lang}/checkout/success`;
  const cancelUrl = `${baseUrl}/${params.lang}/checkout/cancel?slug=${encodeURIComponent(result.book.slug)}`;
  const webhookSecret = process.env.MERCADO_PAGO_WEBHOOK_SECRET || "";
  const notificationUrl =
    `${baseUrl}/api/mercadopago/webhook` +
    (webhookSecret ? `?secret=${encodeURIComponent(webhookSecret)}` : "");
  const normalizedPrice = Number(
    String(result.book.price).replace(/[^0-9,.-]/g, "").replace(",", "."),
  );
  const unitPrice = Number.isFinite(normalizedPrice) ? normalizedPrice : null;

  if (!unitPrice) {
    throw new Error("Invalid unit price for checkout.");
  }

  const payload = {
    items: [
      {
        title: result.book.title,
        quantity: 1,
        currency_id: result.book.currency.toUpperCase(),
        unit_price: unitPrice,
      },
    ],
    back_urls: {
      success: successUrl,
      failure: cancelUrl,
      pending: cancelUrl,
    },
    auto_return: "approved",
    external_reference: `${params.lang}:${result.book.slug}`,
    notification_url: notificationUrl,
  };

  const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${mercadoPagoAccessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Mercado Pago preference creation failed: ${errorBody}`);
  }

  const data = (await response.json()) as MercadoPagoPreferenceResponse;
  const checkoutUrl = data.init_point || data.sandbox_init_point;

  if (!checkoutUrl) {
    throw new Error("Mercado Pago did not return a checkout URL.");
  }

  return {
    url: checkoutUrl,
  };
}

export async function retrieveMercadoPagoPayment(paymentId: string | number) {
  const mercadoPagoAccessToken = getMercadoPagoAccessToken();

  if (!mercadoPagoAccessToken) {
    throw new Error("Mercado Pago configuration missing.");
  }

  const response = await fetch(
    `https://api.mercadopago.com/v1/payments/${paymentId}`,
    {
      headers: {
        Authorization: `Bearer ${mercadoPagoAccessToken}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Mercado Pago payment retrieval failed: ${errorBody}`);
  }

  return (await response.json()) as Record<string, unknown>;
}
