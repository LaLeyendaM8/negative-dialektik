import { NextResponse } from "next/server";
import { getBookBySlug } from "@/lib/getCatalog";
import {
  parseWompiReference,
  verifyWompiEventSignature,
} from "@/lib/checkout";
import { persistOrderAndNotify } from "@/lib/orders";

type WompiTransaction = {
  id?: string;
  reference?: string;
  status?: string;
  amount_in_cents?: number;
  currency?: string;
  customer_email?: string;
  payment_method_type?: string;
  customer_data?: {
    full_name?: string;
    email?: string;
    phone_number?: string;
  };
  shipping_address?: Record<string, unknown> | null;
};

type WompiEvent = {
  event?: string;
  data?: {
    transaction?: WompiTransaction;
  };
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as WompiEvent | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (!verifyWompiEventSignature(body)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const transaction = body.data?.transaction;

  if (!transaction || body.event !== "transaction.updated") {
    return NextResponse.json({ received: true });
  }

  if (transaction.status !== "APPROVED") {
    return NextResponse.json({ received: true });
  }

  const reference = parseWompiReference(transaction.reference);
  if (!reference) {
    return NextResponse.json({ received: true });
  }

  const book = getBookBySlug(reference.lang, reference.slug);
  if (!book) {
    return NextResponse.json({ received: true });
  }

  await persistOrderAndNotify({
    paymentProvider: "wompi",
    providerReference: transaction.reference ?? "",
    providerTransactionId: transaction.id ?? null,
    amountTotal:
      typeof transaction.amount_in_cents === "number"
        ? transaction.amount_in_cents
        : null,
    currency: transaction.currency ?? book.currency ?? "COP",
    paymentStatus: transaction.status,
    paymentMethodType: transaction.payment_method_type ?? null,
    customerEmail:
      transaction.customer_email ?? transaction.customer_data?.email ?? null,
    customerName: transaction.customer_data?.full_name ?? null,
    shippingAddress: transaction.shipping_address ?? null,
    providerPayload: body,
    bookSlug: book.slug,
    bookTitle: book.title,
    lang: reference.lang,
    unitPrice:
      typeof transaction.amount_in_cents === "number"
        ? transaction.amount_in_cents
        : null,
  });

  return NextResponse.json({ received: true });
}
