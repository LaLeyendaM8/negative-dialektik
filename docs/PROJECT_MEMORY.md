# NEGATIVE DIALEKTIK – Projektgedächtnis

Stand: 17. November 2026  
Zweck: Dauerhafter, knapper Kontext für Menschen und Agenten. Fakten aus Code und freigegebenen Projektgesprächen werden von offenen Annahmen getrennt.

## 1. Projektkern

NEGATIVE DIALEKTIK ist ein Institut für deutsche Philosophie mit Sitz in Tunja, Kolumbien. Es verbindet drei Bereiche in einer gemeinsamen institutionellen Struktur:

- **Verlag / Editorial:** Übersetzung und Edition grundlegender Werke deutscher Philosophie.
- **Akademie / Academia:** Lehre, Programme, Vorträge und akademische Kooperationen.
- **Stiftung / Fundación:** Bildungsarbeit und kulturelle Vermittlung.

Inhaltliche Schwerpunkte sind Kritische Theorie, Sozialphilosophie und Ästhetik. Das Institut will deutsche Philosophie im spanischsprachigen Raum langfristig, wissenschaftlich anspruchsvoll und zugänglich vermitteln.

## 2. Ziele und Zielgruppen

### Bestätigte Projektziele

1. Als seriöse, dauerhafte philosophische Institution auftreten – nicht nur als einzelner Buchshop.
2. Ein zweisprachiges Angebot auf Deutsch und Spanisch betreiben; Spanisch ist Standardsprache und `x-default`.
3. Das kuratierte Verlagsprogramm mit sechs Büchern, Reihen, bibliografischen Angaben und Leseproben korrekt präsentieren.
4. Einzelne Bücher sicher über Wompi verkaufen und Bestellungen über Supabase, Resend und manuellen Versand abwickeln.
5. Erst belastbare Marketing-Infrastruktur aufbauen, danach Kampagnen skalieren.

### Zielgruppen

- **Primär:** spanischsprachige Leserinnen und Leser, Studierende, Lehrende und Forschende mit Interesse an deutscher Philosophie, Kritischer Theorie, Sozialphilosophie und Ästhetik.
- **Primär kommerziell:** Käuferinnen und Käufer anspruchsvoller philosophischer Bücher; die genaue geografische Lieferabdeckung ist noch offen.
- **Sekundär, aus der Positionierung abgeleitet:** Universitäten, Bibliotheken, akademische Kooperationspartner, Autorinnen und Autoren sowie Förderpartner. Priorität und Ansprache dieser Gruppen sind noch nicht abschließend festgelegt.

## 3. Tonalität und Markenstandard

- Ruhig, institutionell, präzise, wissenschaftlich und zugänglich.
- Keine marktschreierische Sprache, kein künstlicher Hype und keine Trendästhetik um ihrer selbst willen.
- Begriffe, Namen, Buchdaten und Übersetzungen sorgfältig prüfen; Unklarheiten markieren statt ergänzen.
- Visuelle Grundwelt: Creme, Schwarz und warme Grautöne; großzügiger Raum; Serifenschrift für starke Titel, sachliche Sans-Serif für Information.
- Website-Schriften: Cormorant Garamond und Inter. Zentrale Farbwerte stehen in `app/globals.css`.
- **ND-Anführungsstandard:** `»…«`, verschachtelt `›…‹`; die Spitzen zeigen nach innen.
- Spanische Social-Media-Kommunikation ist der Standard für das aktuelle Instagram-Profil.

## 4. Technische und operative Entscheidungen

| Entscheidung | Begründung |
| --- | --- |
| GitHub + Vercel, Änderungen über separaten Branch und Pull Request | Prüfung und Preview vor Veröffentlichung; keine ungeprüften Live-Änderungen. |
| Next.js App Router mit TypeScript | Bestehende Projektarchitektur; serverseitige Metadaten und lokalisierte Routen. |
| Inhalte unter `app/content/de` und `app/content/es`, Darstellung separat in Seiten und Komponenten | Redaktionelle Inhalte bleiben von Layout und Logik getrennt und zweisprachig wartbar. |
| Spanisch als Standardsprache und `x-default` | Hauptmarkt und institutioneller Auftrag liegen im spanischsprachigen Raum. |
| Wompi Web Checkout ohne Warenkorb, ein Titel und Menge 1 | Bewusst schlanker MVP mit geringerer technischer und operativer Komplexität. |
| Neutrale Rückmeldung nach Wompi-Checkout in DE und ES | Die Rückkehrseite zeigt den Weg zum Zahlungsstatus bei Wompi. Die Bestellverarbeitung beginnt nach dem bestätigten Zahlungsereignis. |
| Versanddaten über Wompi erfassen; Fulfillment bleibt manuell | Verkauf ist möglich, ohne vorzeitig ein vollständiges Shop- und Logistiksystem aufzubauen. |
| Supabase für Bestellungen, Resend für interne Benachrichtigungen | Bestehender schlanker Betriebsprozess; keine zweite Shop-Plattform. |
| Webhook prüft Signatur, Referenz, Betrag und Währung; Speicherung und Mail sind idempotent | Schutz vor manipulierten oder doppelten Zahlungsereignissen. |
| SEO sprachspezifisch mit Canonical, `hreflang`, Sitemap, robots.txt und Buch-JSON-LD | Saubere Indexierung der zweisprachigen Institution und des Katalogs. |
| GA4 nur nach ausdrücklicher Einwilligung; `begin_checkout` als erstes Commerce-Event | Datenschutzorientierte Tracking-Grundlage vor weiterem Kampagnentracking. |
| Instagram-Beiträge im Format 4:5, nicht 1:1 | Mehr nutzbare Feedfläche; die erstellten Layouts sind dafür ausgelegt. |

Große neue Features, eine neue Shop-Plattform, Warenkorb, automatisierter Versand oder ein Admin-Dashboard gehören derzeit ausdrücklich **nicht** zum Launch-Fokus.

## 5. Aktueller Stand

### Repository und Freigabe

- Arbeitsbranch: `codex/marketing-infrastructure`
- Draft Pull Request: [#2 – Marketing infrastructure](https://github.com/LaLeyendaM8/negative-dialektik/pull/2)
- Zielbranch: `main`
- Lint und Produktions-Build wurden nach den Änderungen erfolgreich ausgeführt.
- Die Änderungen sind noch nicht für Produktion freigegeben; der Pull Request bleibt der Prüf- und Freigabepunkt.

### Master-Checkliste

| Bereich | Status | Stand |
| --- | --- | --- |
| Website-Audit | **Code-seitig abgeschlossen** | Struktur, Build, Checkout und zentrale Sicherheitsrisiken geprüft; Live-Abnahme bleibt offen. |
| SEO | **Weitgehend umgesetzt** | Lokalisierte Metadaten, Canonicals, `hreflang`, Sitemap, robots.txt und strukturierte Buchdaten vorhanden; Deployment und Search Console fehlen. |
| Tracking | **Grundlage umgesetzt** | Consent-basiertes GA4 und `begin_checkout`; Property/ID, Conversion-Konfiguration, weitere Events und UTM-Standard fehlen. |
| Instagram | **Launch umgesetzt** | Profil `@negative.dialektik`, Branding, Bio, drei Startkarussells, Stories und fünf Highlights veröffentlicht. Linktitel soll `Ver libros y programa` lauten. |
| Blog | **Offen** | Noch keine Blogstruktur oder redaktionelle Vorlage umgesetzt. |
| Newsletter | **Teilweise vorhanden, Marketingprozess offen** | Formular und Speicherung existieren im Code; Einwilligungsmodell, E-Mail-Tool, Templates und Versandprozess sind nicht abschließend eingerichtet. |
| Launch-Readiness | **In Arbeit** | Preview und technische Tests vorhanden; vollständiger Wompi-/Supabase-/Mail-/Tracking-Livetest fehlt. |

### Instagram-Entscheidungen

- Profilname: `Negative Dialektik | Filosofía`
- Bio: Institut für deutsche Philosophie; Editorial · Academia · Fundación; Kritische Theorie, Sozialphilosophie und Ästhetik.
- Linkziel: `https://negative-dialektik.com/es/programm`
- Bevorzugter Linktitel: `Ver libros y programa`
- Empfohlene Highlight-Reihenfolge: Instituto · Libros · Academia · Eventos · Fundación.
- Die Startreihe zeigt im Raster: Präsentation · institutionelle Struktur · Verlagsprogramm.

## 6. Nächste Schritte in Prioritätsreihenfolge

1. Draft-PR fachlich prüfen und ausdrücklich freigeben; erst danach nach `main` mergen.
2. Vercel-Variablen gemäß `docs/SHOP_MVP_SETUP.md` vollständig setzen.
3. Supabase-Migration ausführen und Tabellen/Constraints verifizieren.
4. Wompi-Sandbox-Keys und Webhook einrichten; erfolgreiche und abgebrochene Zahlung Ende-zu-Ende testen.
5. Bestellung in Supabase, Versanddaten, Idempotenz und interne Resend-Mail prüfen.
6. GA4-Property/Datastream einrichten, Measurement-ID in Vercel setzen und Consent sowie `begin_checkout` testen.
7. Google Search Console verbinden, Domain verifizieren und `/sitemap.xml` einreichen.
8. Erst danach Blog- und Newsletter-System spezifizieren und umsetzen.

## 7. Offene Ideen und fehlende Informationen

### Offene Ideen – noch nicht beschlossen

- Kampagne für **Autonomía y liberación** mit Christoph Menke; persönlicher Kontakt besteht laut Projektgespräch. Möglich wären ein autorisiertes Zitat, ein kurzes Video, ein Gespräch oder eine Launch-Veranstaltung. Form, Rechte und Zusage sind offen.
- Blog als SEO- und Vermittlungskanal mit Autoren-, Begriffs-, Buch- und Veranstaltungsformaten.
- Späterer Warenkorb, automatisierter Versand, Rechnungen, Lagerbestand und Fulfillment-Dashboard.
- Zentrale, versionierte Ablage der Social-Media- und Markenassets im Repository oder in einem klar definierten Brand-Archiv.

### Fehlende oder zu bestätigende Informationen

- Produktionsstatus und Vollständigkeit aller Vercel-, Wompi-, Supabase-, Resend- und GA4-Zugänge.
- Lieferländer, Versandkosten, Lieferzeiten, Rückgabeprozess und operative Verantwortlichkeiten.
- Priorisierte Marktsegmente, Kampagnenbudget und messbare Ziele für Kampagne 01.
- Newsletter-Tool, Double-Opt-in-/Einwilligungsprozess, Versandrhythmus und Absenderverantwortung.
- Blog-Verantwortung, Veröffentlichungsrhythmus und Freigabeprozess.
- Rechte/Freigaben für Testimonials, Autorenmaterial und Social-Media-Nutzung, insbesondere Christoph Menke.
- Ob das Instagram-Konto als professionelles Business-/Creator-Konto vollständig konfiguriert ist.

## 8. Maßgebliche Quellen im Repository

- Projekt- und Shoprichtung: `docs/ROADMAP.md`, `docs/SHOP_MVP_SETUP.md`
- Institutionelle Positionierung: `app/content/es/pages/institut.ts`, `app/content/es/site/home.ts`
- Katalogfakten: `app/content/es/catalog.ts`, `app/content/de/catalog.ts`
- Markenfarben und Typografie: `app/globals.css`, `app/[lang]/layout.tsx`
- Checkout und Sicherheit: `lib/checkout.ts`, `app/api/wompi/webhook/route.ts`, `lib/orders.ts`
- SEO: `lib/site.ts`, `app/sitemap.ts`, `app/robots.ts`, lokalisierte Seitenmetadaten
- Tracking: `app/components/analytics/`

Zusätzlicher Kontext stammt aus den Projektgesprächen zum Website-Audit, zur Marketing-Infrastruktur und zum Instagram-Launch. Bei Widersprüchen haben aktuelle, überprüfte Projektdateien und neue ausdrückliche Nutzerentscheidungen Vorrang.
