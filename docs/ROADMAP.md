# Negative Dialektik Shop Roadmap

Dieser Plan ersetzt die bisherige Ausbau-Roadmap und bildet den letzten grossen Entwicklungsblock ab: den eigenen Shop von Negative Dialektik.

Die Website ist bereits als Verlagspraesenz, Katalog, Newsletter-Basis und manuelle Bestellstrecke aufgestellt. Der naechste Schritt ist der Uebergang zu einem echten Checkout-System mit sauberer Bestell- und Betriebslogik.

## Zielbild

Negative Dialektik soll ueber die eigene Website Buecher direkt anbieten und verkaufen koennen.

Der Shop soll:

1. zur bestehenden Gestaltung und Tonalitaet passen
2. auf den schon gebauten Buchseiten aufsetzen
3. Bestellungen, Zahlungen und spaetere Auslieferung sauber abbilden
4. klein und kontrollierbar starten, aber spaeter wachsen koennen

## Architekturidee

### Stripe

Stripe ist sehr wahrscheinlich die beste erste Loesung fuer den Shop.

Warum:

- schnell und professionell integrierbar
- gute Checkout- und Payment-Infrastruktur
- spaeter erweiterbar auf Rechnungen, Webhooks und Order-Handling
- solide Dokumentation und einfacher Standard fuer kleine bis mittlere Shops

### Supabase

Supabase bleibt sehr sinnvoll und wird weiterhin gebraucht.

Stripe speichert nicht euren gesamten Shop-Zustand fuer euch in der Form, wie ihr ihn braucht.

Supabase kann fuer euch speichern:

- Produkte und interne Shopdaten
- Lager-/Verfuegbarkeitsstatus
- Bestellungen
- Order-Status
- Versandstatus
- Newsletter-Abonnenten
- spaetere Kunden- oder Adressdaten, falls noetig

Kurz gesagt:

- Stripe = Zahlung und Checkout
- Supabase = eure Datenbasis und euer Betriebs-Backbone

## Phase 4: Finalen Shop aufstellen

Ziel: Aus der vorbereiteten manuellen Bestellstrecke wird ein echter, kontrollierter Shop.

### 4.1 Produkt- und Shop-Datenmodell fertigstellen

Die Buchdaten muessen fuer echten Verkauf vervollstaendigt werden.

Zusaetzliche oder sauber definierte Felder:

- `sku`
- `stripePriceId`
- `stripeProductId`
- `price`
- `currency`
- `stockStatus`
- `inventoryCount` optional
- `isPhysicalProduct`
- `shippingCategory`
- `checkoutEnabled`
- `taxCategory` optional

Ziel:

- jedes Buch kann technisch eindeutig verkauft werden
- Preis und Verfuegbarkeit kommen nicht mehr nur aus Text, sondern aus belastbaren Feldern

### 4.2 Checkout-Einstieg auf Buchseiten

Die bestehenden manuellen CTAs werden auf echte Kaufpfade vorbereitet.

Geplante Zustandslogik:

- `Kaufen` bei sofort kaufbaren Titeln
- `Vorbestellen` bei vorbestellbaren Titeln
- `Anfragen` bei Spezialfaellen
- `Nicht verfuegbar` bei noch nicht offenen Titeln

Das Ziel ist:

- die Buchseite bleibt die zentrale Produktseite
- der CTA richtet sich aus den Daten logisch ab

### 4.3 Stripe Checkout integrieren

Erster echter Kaufpfad:

- User klickt auf `Kaufen`
- Server erstellt eine Stripe Checkout Session
- User bezahlt ueber Stripe
- Rueckleitung auf Success-/Cancel-Seite

Spaeter moegliche Erweiterungen:

- mehrere Zahlungsarten
- Vorbestellung mit Zahlungslogik
- Promotion Codes

### 4.4 Bestellungen in Supabase speichern

Bestellungen sollen nicht nur bei Stripe existieren, sondern auch in eurem System.

Empfohlene Tabellen:

- `orders`
- `order_items`
- optional `shipping_addresses`

Wichtige Felder fuer `orders`:

- `id`
- `stripe_checkout_session_id`
- `stripe_payment_intent_id` optional
- `customer_email`
- `customer_name` optional
- `status`
- `currency`
- `total_amount`
- `created_at`

Wichtige Felder fuer `order_items`:

- `id`
- `order_id`
- `book_slug`
- `quantity`
- `unit_price`
- `title_snapshot`

Ziel:

- ihr koennt Bestellungen intern nachvollziehen
- ihr seid nicht nur vom Stripe-Dashboard abhaengig

### 4.5 Webhooks und Zahlungsbestaetigung

Nach erfolgreicher Zahlung muss das System sauber reagieren.

Dafuer braucht ihr:

- Stripe Webhook Endpoint
- Validierung der Events
- Update der Bestellung in Supabase

Typische Events:

- `checkout.session.completed`
- optional spaeter `payment_intent.payment_failed`

Ziel:

- Bestellungen werden automatisch bestaetigt
- euer interner Order-Status stimmt mit Stripe ueberein

### 4.6 Success-, Cancel- und Order-Status-Seiten

Noetige Seiten:

- Erfolg nach Kauf
- Abbruch / nicht abgeschlossene Zahlung
- spaeter evtl. einfache Bestellstatus-Ansicht

Diese Seiten sollen:

- klar und ruhig wirken
- zur Verlagssprache passen
- keine generischen SaaS-Vibes haben

### 4.7 Versand- und Fulfillment-Logik vorbereiten

Noch nicht sofort vollautomatisieren, aber strukturell vorbereiten.

Mindestens noetig:

- Versandstatus in Supabase
- manuelles internes Fulfillment
- interne Kennzeichnung wie:
  - `neu`
  - `bezahlt`
  - `in bearbeitung`
  - `versandt`
  - `abgeschlossen`

Spaeter moeglich:

- Tracking-Nummern
- Versandbestaetigungs-Mails

### 4.8 Shop-Rechtstexte und Vertrauen

Vor echtem Launch muessen fuer den Shop geprueft oder erweitert werden:

- Impressum
- Datenschutz
- Widerruf
- AGB falls gewuenscht
- Versandinformationen
- Zahlungsinformationen

Ziel:

- der Shop wirkt nicht improvisiert
- der Kaufprozess ist seriös und vertrauenswuerdig

## Empfohlene Reihenfolge

Diese Reihenfolge ist fuer euch wahrscheinlich am sinnvollsten:

1. Shop-Datenmodell fertigstellen
2. Stripe vorbereiten und Product-/Price-IDs anbinden
3. Checkout-Session serverseitig bauen
4. Success-/Cancel-Seiten bauen
5. Orders in Supabase speichern
6. Stripe Webhooks anbinden
7. Versand-/Fulfillment-Status einfuehren
8. Shop final testen und dann live schalten

## Praktische Modulaufteilung

### 1. Commerce-Data-Modul

Verantwortung:

- Produktfelder
- Preislogik
- Stripe-Referenzen
- Verfuegbarkeit

### 2. Checkout-Modul

Verantwortung:

- Stripe Session Creation
- Kauf-CTA-Logik
- Success-/Cancel-Pfade

### 3. Order-Modul

Verantwortung:

- Order-Speicherung
- Order-Items
- Status-Updates
- interne Nachvollziehbarkeit

### 4. Webhook-Modul

Verantwortung:

- Stripe Events
- Zahlungsbestaetigung
- Datenabgleich mit Supabase

### 5. Fulfillment-Modul

Verantwortung:

- Versandstatus
- manuelle Bearbeitung
- spaeter Versandbestaetigung

## Was wir spaeter brauchen

Wenn wir mit dieser finalen Phase starten, werden wir sehr wahrscheinlich brauchen:

- Stripe Account
- Stripe API Keys
- Stripe Webhook Secret
- Supabase Tabellen fuer Orders
- evtl. zusaetzliche Env-Variablen fuer Checkout und Webhooks

## Erster sinnvoller Sprint fuer den Shop

Wenn wir den Shop-Block starten, ist das der sinnvollste erste Sprint:

1. Buchmodell final fuer Verkauf erweitern
2. Stripe Product-/Price-Referenzen vorbereiten
3. Kauf-Buttons auf Buchseiten an echte Checkout-Logik anbinden
4. Success- und Cancel-Seiten bauen

## Abschlussziel

Am Ende dieser Phase soll Negative Dialektik:

- Buecher direkt ueber die Website verkaufen koennen
- Zahlungen professionell ueber Stripe abwickeln
- Bestellungen in Supabase nachvollziehen
- Versand intern organisiert bearbeiten
- die eigene verlegerische Identitaet auch im Shop bewahren
