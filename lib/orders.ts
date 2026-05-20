import { Resend } from "resend";

type CreateOrderInput = {
  stripeCheckoutSessionId: string;
  stripePaymentIntentId?: string | null;
  customerEmail?: string | null;
  customerName?: string | null;
  amountTotal?: number | null;
  currency?: string | null;
  paymentStatus: string;
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

async function insertOrder(input: CreateOrderInput) {
  const config = getSupabaseConfig();

  if (!config) {
    return null;
  }

  const orderPayload = {
    stripe_checkout_session_id: input.stripeCheckoutSessionId,
    stripe_payment_intent_id: input.stripePaymentIntentId ?? null,
    customer_email: input.customerEmail ?? null,
    customer_name: input.customerName ?? null,
    amount_total: input.amountTotal ?? null,
    currency: input.currency ?? null,
    payment_status: input.paymentStatus,
    order_status: "paid",
    locale: input.lang,
  };

  const orderInsertResponse = await fetch(`${config.url}/rest/v1/orders`, {
    method: "POST",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation,resolution=ignore-duplicates",
    },
    body: JSON.stringify([orderPayload]),
    cache: "no-store",
  });

  if (!orderInsertResponse.ok) {
    return null;
  }

  const createdOrder = (await orderInsertResponse.json()) as
    | Array<{ id: number }>
    | [];

  const orderId = createdOrder[0]?.id;

  if (!orderId) {
    const lookupResponse = await fetch(
      `${config.url}/rest/v1/orders?select=id&stripe_checkout_session_id=eq.${encodeURIComponent(
        input.stripeCheckoutSessionId,
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

  await fetch(`${config.url}/rest/v1/order_items`, {
    method: "POST",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal,resolution=ignore-duplicates",
    },
    body: JSON.stringify([itemPayload]),
    cache: "no-store",
  });
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
      subject: `Neue Bestellung (Checkout): ${input.bookTitle}`,
      text:
        `Neue Checkout-Bestellung eingegangen.\n\n` +
        `Titel: ${input.bookTitle}\n` +
        `Slug: ${input.bookSlug}\n` +
        `Katalogsprache: ${input.lang}\n` +
        `Kundin/Kunde: ${input.customerName ?? "-"}\n` +
        `E-Mail: ${input.customerEmail ?? "-"}\n` +
        `Betrag: ${input.amountTotal ?? "-"} ${input.currency ?? ""}\n` +
        `Zahlungsstatus: ${input.paymentStatus}\n` +
        `Provider Session/Payment ID: ${input.stripeCheckoutSessionId}\n` +
        `Provider Order/Intent ID: ${input.stripePaymentIntentId ?? "-"}`,
    });
  } catch {
    // Keep the checkout pipeline resilient even if mail fails.
  }
}

export async function persistOrderAndNotify(input: CreateOrderInput) {
  const orderId = await insertOrder(input);

  if (orderId) {
    await insertOrderItem(orderId, input);
  }

  await sendInternalOrderMail(input);
}
