import { NextResponse } from "next/server";
import { getBookBySlug } from "@/lib/getCatalog";
import { retrieveMercadoPagoPayment } from "@/lib/checkout";
import { persistOrderAndNotify } from "@/lib/orders";

function parseExternalReference(reference: string | undefined) {
  if (!reference) {
    return null;
  }

  const [rawLang, slug] = reference.split(":");
  if (!slug) {
    return null;
  }

  return {
    lang: rawLang === "es" ? "es" : "de",
    slug,
  };
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const configuredSecret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;
  const receivedSecret = url.searchParams.get("secret");
  const body = (await request.json().catch(() => ({}))) as {
    action?: string;
    data?: { id?: string | number };
    type?: string;
  };

  if (configuredSecret && receivedSecret !== configuredSecret) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const paymentId = body.data?.id ?? url.searchParams.get("data.id");
  const action = body.action ?? body.type ?? url.searchParams.get("type");

  const isPaymentNotification =
    typeof action === "string" &&
    (action.includes("payment") || action.includes("merchant_order"));

  if (!isPaymentNotification || !paymentId) {
    return NextResponse.json({ received: true });
  }

  const payment = await retrieveMercadoPagoPayment(paymentId);
  const paymentData = payment as {
    id?: string | number;
    status?: string;
    external_reference?: string;
    transaction_amount?: number;
    currency_id?: string;
    payer?: {
      email?: string;
      first_name?: string;
      last_name?: string;
    };
    order?: {
      id?: string | number;
    };
  };
  const paymentStatus = String(paymentData.status ?? "");

  if (paymentStatus !== "approved") {
    return NextResponse.json({ received: true });
  }

  const reference = parseExternalReference(
    String(paymentData.external_reference ?? ""),
  );

  if (!reference) {
    return NextResponse.json({ received: true });
  }

  const book = getBookBySlug(reference.lang, reference.slug);
  if (!book) {
    return NextResponse.json({ received: true });
  }

  const customerFirstName = String(
    paymentData.payer?.first_name ?? "",
  );
  const customerLastName = String(
    paymentData.payer?.last_name ?? "",
  );
  const customerName = `${customerFirstName} ${customerLastName}`.trim() || null;

  await persistOrderAndNotify({
    stripeCheckoutSessionId: String(paymentData.id ?? ""),
    stripePaymentIntentId: String(paymentData.order?.id ?? ""),
    amountTotal:
      typeof paymentData.transaction_amount === "number"
        ? Math.round(paymentData.transaction_amount * 100)
        : null,
    currency: String(paymentData.currency_id ?? "COP"),
    paymentStatus: paymentStatus,
    customerEmail: String(paymentData.payer?.email ?? "") || null,
    customerName,
    bookSlug: book.slug,
    bookTitle: book.title,
    lang: reference.lang,
    unitPrice:
      typeof paymentData.transaction_amount === "number"
        ? Math.round(paymentData.transaction_amount * 100)
        : null,
  });

  return NextResponse.json({ received: true });
}
