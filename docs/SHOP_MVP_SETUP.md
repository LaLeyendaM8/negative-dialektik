# Shop MVP Setup mit Wompi

Diese Website nutzt Wompi Web Checkout als direkte Kaufstrecke für einzelne Bücher.
Der Checkout bleibt bewusst schlank: ein Buch, Menge `1`, Zahlung über Wompi,
Order-Speicherung in Supabase und interne Benachrichtigung per Resend.

## 1) Environment Variables

Lokal in `.env.local` und in Vercel setzen:

- `NEXT_PUBLIC_SITE_URL`
- `WOMPI_ENVIRONMENT`
- `WOMPI_PUBLIC_KEY`
- `WOMPI_INTEGRITY_SECRET`
- `WOMPI_EVENTS_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTACT_RECEIVER_EMAIL`

`WOMPI_ENVIRONMENT` ist aktuell nur eine Betriebsmarkierung. Die Checkout-URL
läuft über Wompis Web Checkout; Sandbox oder Produktion ergeben sich über die
verwendeten Wompi-Keys.

## 2) Supabase Migration

In Supabase SQL Editor ausführen:

```sql
-- siehe docs/SUPABASE_WOMPI_MIGRATION.sql
```

Die Migration ersetzt alte Stripe-Spaltennamen durch provider-neutrale Felder:

- `payment_provider`
- `provider_reference`
- `provider_transaction_id`
- `payment_method_type`
- `shipping_address`
- `provider_payload`

## 3) Wompi Dashboard

Webhook-Endpunkt in Wompi hinterlegen:

- `https://<deine-domain>/api/wompi/webhook`

Benötigtes Event:

- `transaction.updated`

Danach das Events-Secret aus Wompi als `WOMPI_EVENTS_SECRET` in Vercel setzen.

## 4) Checkout-Flow

Kaufbare Bücher werden über Katalogdaten gesteuert:

- `checkoutEnabled: true`
- `price: "99.000 COP"`
- `currency: "COP"`
- `stockStatus: "bestellbar-manuell"`

Die Website erzeugt pro Kauf eine eindeutige Wompi-Reference und signiert sie
mit `WOMPI_INTEGRITY_SECRET`.

Der Checkout sendet zusätzlich `collect-shipping=true`, damit Wompi vor der
Zahlung Versanddaten abfragt. Diese Daten werden über den Webhook in
`orders.shipping_address` gespeichert und in der internen Bestellmail
ausgegeben.

## 5) Testablauf

1. Vercel Preview mit allen Env-Variablen deployen.
2. Auf einer Buchseite `Comprar ahora` / `Jetzt kaufen` anklicken.
3. Sandbox-Zahlung in Wompi abschließen.
4. Rückkehr zur Success-Seite prüfen.
5. In Supabase prüfen:
   - eine Zeile in `orders`
   - `orders.shipping_address` ist gefüllt
   - eine Zeile in `order_items`
6. Interne Bestellmail prüfen.
   - Falls keine Mail ankommt, Vercel Function Logs prüfen:
     `Order notification mail failed`
7. Abgebrochene Zahlung über Cancel-Flow testen.

## 6) Was außerhalb des Codes erledigt werden muss

- Wompi-Konto final einrichten.
- Sandbox- und später Production-Keys in Vercel setzen.
- Wompi-Webhook im Dashboard eintragen.
- `docs/SUPABASE_WOMPI_MIGRATION.sql` in Supabase ausführen.
- Preview testen und erst danach auf Production mergen.
