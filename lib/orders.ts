import { Resend } from "resend";

type CreateOrderInput = {
  paymentProvider: string;
  providerReference: string;
  providerTransactionId?: string | null;
  customerEmail?: string | null;
  customerName?: string | null;
  amountTotal?: number | null;
  currency?: string | null;
  paymentStatus: string;
  paymentMethodType?: string | null;
  shippingAddress?: Record<string, unknown> | null;
  providerPayload?: unknown;
  lang: string;
  bookSlug: string;
  bookTitle: string;
  unitPrice?: number | null;
};

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return { url, serviceRoleKey };
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

function formatAmount(amountInCents?: number | null, currency?: string | null) {
  if (typeof amountInCents !== "number" || !currency) {
    return "-";
  }

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amountInCents / 100);
}

function formatShippingAddress(address?: Record<string, unknown> | null) {
  if (!address) {
    return "-";
  }

  return Object.entries(address)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join("\n");
}

async function insertOrder(input: CreateOrderInput) {
  const config = getSupabaseConfig();

  if (!config) {
    return null;
  }

  const orderPayload = {
    payment_provider: input.paymentProvider,
    provider_reference: input.providerReference,
    provider_transaction_id: input.providerTransactionId ?? null,
    customer_email: input.customerEmail ?? null,
    customer_name: input.customerName ?? null,
    amount_total: input.amountTotal ?? null,
    currency: input.currency ?? null,
    payment_status: input.paymentStatus,
    payment_method_type: input.paymentMethodType ?? null,
    shipping_address: input.shippingAddress ?? null,
    provider_payload: input.providerPayload ?? null,
    order_status: "paid",
    locale: input.lang,
  };

  const orderInsertResponse = await fetch(
    `${config.url}/rest/v1/orders?on_conflict=provider_reference`,
    {
      method: "POST",
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation,resolution=ignore-duplicates",
      },
      body: JSON.stringify([orderPayload]),
      cache: "no-store",
    },
  );

  if (!orderInsertResponse.ok) {
    return null;
  }

  const createdOrder = (await orderInsertResponse.json()) as
    | Array<{ id: number }>
    | [];

  const orderId = createdOrder[0]?.id;

  if (!orderId) {
    const lookupResponse = await fetch(
      `${config.url}/rest/v1/orders?select=id&provider_reference=eq.${encodeURIComponent(
        input.providerReference,
      )}`,
      {
        headers: {
          apikey: config.serviceRoleKey,
          Authorization: `Bearer ${config.serviceRoleKey}`,
        },
        cache: "no-store",
      },
    );

    if (!lookupResponse.ok) {
      return null;
    }

    const rows = (await lookupResponse.json()) as Array<{ id: number }>;
    return rows[0]?.id ?? null;
  }

  return orderId;
}

async function insertOrderItem(orderId: number, input: CreateOrderInput) {
  const config = getSupabaseConfig();
  if (!config) {
    return;
  }

  const itemPayload = {
    order_id: orderId,
    book_slug: input.bookSlug,
    book_title: input.bookTitle,
    quantity: 1,
    unit_price: input.unitPrice ?? input.amountTotal ?? null,
    currency: input.currency ?? null,
  };

  await fetch(
    `${config.url}/rest/v1/order_items?on_conflict=order_id,book_slug`,
    {
      method: "POST",
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal,resolution=ignore-duplicates",
      },
      body: JSON.stringify([itemPayload]),
      cache: "no-store",
    },
  );
}

async function sendInternalOrderMail(input: CreateOrderInput) {
  const resend = getResendClient();
  if (!resend) {
    return;
  }

  try {
    await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "Negative Dialektik <onboarding@resend.dev>",
      to: process.env.CONTACT_RECEIVER_EMAIL || "info@negative-dialektik.com",
      subject: `Neue Bestellung (${input.paymentProvider}): ${input.bookTitle}`,
      text:
        `Neue Checkout-Bestellung eingegangen.\n\n` +
        `Titel: ${input.bookTitle}\n` +
        `Slug: ${input.bookSlug}\n` +
        `Katalogsprache: ${input.lang}\n` +
        `Kundin/Kunde: ${input.customerName ?? "-"}\n` +
        `E-Mail: ${input.customerEmail ?? "-"}\n` +
        `Betrag: ${formatAmount(input.amountTotal, input.currency)}\n` +
        `Versanddaten:\n${formatShippingAddress(input.shippingAddress)}\n` +
        `Zahlungsanbieter: ${input.paymentProvider}\n` +
        `Zahlungsart: ${input.paymentMethodType ?? "-"}\n` +
        `Zahlungsstatus: ${input.paymentStatus}\n` +
        `Provider Reference: ${input.providerReference}\n` +
        `Provider Transaction ID: ${input.providerTransactionId ?? "-"}`,
    });
  } catch (error) {
    console.error("Order notification mail failed", error);
  }
}

export async function persistOrderAndNotify(input: CreateOrderInput) {
  const orderId = await insertOrder(input);

  if (orderId) {
    await insertOrderItem(orderId, input);
  }

  await sendInternalOrderMail(input);
}
