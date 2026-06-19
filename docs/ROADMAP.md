# Negative Dialektik Website Roadmap

Stand: Wompi-Launch-Sprint.

## Zielbild

Die Website soll als professionelle, zweisprachige Verlagspage funktionieren:

1. institutionell sauber auftreten,
2. sechs Bücher korrekt präsentieren,
3. Leseproben und Fichas bereitstellen,
4. direkte Käufe über Wompi ermöglichen,
5. Bestellungen intern über Supabase und Mail abwickeln.

## Aktueller Fokus

- Keine großen neuen Features.
- Keine neue Shop-Plattform.
- Kein Warenkorb.
- Kein automatisierter Versand.
- Fokus auf saubere Sprache, konsistente Gestaltung, korrekte Buchdaten und stabilen Checkout.

## Umgesetzte Shop-Vorstufe

- Einzeltitel-Checkout über Wompi Web Checkout.
- Katalogdaten steuern Kaufbarkeit über `checkoutEnabled`, `price`, `currency` und `stockStatus`.
- Wompi-Webhook speichert genehmigte Transaktionen in Supabase.
- Interne Bestellmail informiert über Titel, Betrag, Kundendaten und Provider-Referenz.
- Fulfillment bleibt manuell.

## Nächste operative Aufgaben

1. Wompi-Sandbox vollständig testen.
2. Supabase-Migration ausführen.
3. Preview in Vercel prüfen.
4. Alle sechs Buchseiten in `de` und `es` gegenlesen.
5. Production-Keys setzen.
6. Final auf `main` mergen.

## Späterer Ausbau

- Versanddaten strukturierter erfassen.
- Bestellstatus im Admin-Prozess pflegen.
- Optional Warenkorb für mehrere Titel.
- Optional automatische Versand- und Rechnungsprozesse.
- Optional Lagerbestand und Fulfillment-Dashboard.
