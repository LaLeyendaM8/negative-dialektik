# Newsletter in Betrieb nehmen

Negative Dialektik verwaltet Anmeldung, Bestätigung und Einwilligungsnachweis
in Supabase. Resend verschickt Bestätigungsmails und ist für Broadcasts und
Abmeldelinks zuständig. Für DE und ES gibt es getrennte Marketing-Segmente in
der globalen Resend-Audience.

## Testumgebung

1. In einem getrennten Supabase-Testprojekt im SQL Editor
   `SUPABASE_NEWSLETTER_MIGRATION.sql` ausführen. Die Migration erstellt
   gesonderte Tabellen mit RLS und Funktionen für die serverseitige
   `service_role`. Sie greift nicht auf `newsletter_subscribers` zu.
2. Für die Preview ein isoliertes Resend-Konto bzw. einen getrennten Team-Bereich
   und zwei leere Segmente anlegen. Eine verifizierte Absenderdomain verwenden.
   Den API-Schlüssel für Versand und Kontaktverwaltung im Newsletter-Konto
   erstellen. Den bestehenden Transaktionsschlüssel der Website weiter für
   Kontakt- und Shopmails verwenden.
3. Im Resend-Dashboard einen Webhook mit `contact.updated` und
   `contact.deleted` auf `https://<preview-host>/api/newsletter/resend-webhook`
   einrichten. Der Endpunkt muss von Resend erreichbar sein. Bei geschützter
   Preview die von Vercel vorgesehene Freigabe für Webhook-Aufrufe prüfen.
4. Vercel-Variablen für den Preview-Branch setzen und anschließend neu bauen.

| Variable | Zweck |
| --- | --- |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Bereits verwendete serverseitige Datenbankkonfiguration. Für die Abnahme ein Testprojekt verwenden. |
| `NEXT_PUBLIC_SITE_URL` | In Produktion die kanonische Domain, in der isolierten Testumgebung der feste Preview-Host für Bestätigungslinks. Derselbe Wert steuert die SEO-Basis der Preview. |
| `NEWSLETTER_RESEND_API_KEY` | Separater Schlüssel mit Versand- und Kontaktberechtigungen im Newsletter-Konto. |
| `NEWSLETTER_FROM_EMAIL` | Verifizierter Newsletter-Absender. |
| `NEWSLETTER_SEGMENT_DE`, `NEWSLETTER_SEGMENT_ES` | Unterschiedliche IDs zweier dedizierter Segmente. |
| `NEWSLETTER_RESEND_WEBHOOK_SECRET` | Signing Secret des Resend-Webhooks. |
| `NEWSLETTER_RATE_LIMIT_SECRET` | Mindestens 32 zufällige Zeichen für die IP-Pseudonymisierung. |
| `NEWSLETTER_SYNC_SECRET` | Eigenes, mindestens 32 Zeichen langes zufälliges Secret für den Synchronisationsaufruf. |

Schlüssel und Secrets ausschließlich als serverseitige Vercel-Variablen
speichern. Resend soll die Bestätigungslinks nicht per Click-Tracking
umschreiben. Teste, dass der Link einschließlich Fragment im Mailclient funktioniert.

5. Einen Scheduler für einen POST pro Minute auf
   `https://<host>/api/newsletter/sync` einrichten. Er muss den Header
   `Authorization: Bearer <NEWSLETTER_SYNC_SECRET>` setzen können.
   Der Endpunkt verarbeitet pro Aufruf einen Datensatz und meldet `synced`
   oder `empty`. Bei 503 bleibt der Eintrag zur Wiederholung vorgemerkt.
   Den Scheduler in der Preview zuerst einmal manuell auslösen.

## Abnahmetests vor dem Merge

- Je eine Testadresse in DE und ES anmelden. Der Eintrag ist `pending`,
  die Bestätigungsmail trifft ein und in Resend erscheint noch kein Kontakt.
- Bestätigungslink öffnen. Der Status bleibt bis zum Klick auf den
  Bestätigungsbutton unverändert. Danach `confirmed` und einen
  Einwilligungseintrag prüfen. Derselbe Link ist anschließend ungültig.
- Synchronisation auslösen. Kontakt erscheint im passenden Sprachsegment.
  Die zweite Sprache darf nur nach einer erneuten bestätigten Anmeldung
  nach Abmeldung im entsprechenden Segment landen.
- Eine Testausgabe an das eigene Testsegment senden und den nativen
  Abmeldelink betätigen. In Resend muss der Kontakt abgemeldet sein, in
  Supabase muss `unsubscribed_at` gesetzt werden. Erneut anmelden, ohne
  zu bestätigen. Der Kontakt muss abgemeldet bleiben.
- In beiden Sprachen ungültigen Link, Fehlermeldungen und Links zurück
  zum Formular prüfen. Einen Versandfehler oder Zustellfehler im
  isolierten Konto simulieren und Resend-Logs überprüfen.
- `npm test` mit Node.js 22 oder neuer prüft Token, Rechte, Migration,
  Verfall, Einmaligkeit, Sprachbindung, Limits, Warteschlange, Resend-Aufrufe
  und die Webhook-Signatur lokal. Die Provider-Abnahme verwendet getrennte Testkonten.

## Betrieb und Broadcasts

- Nur die beiden vorgesehenen Segmente auswählen. Keine CSV-Imports,
  alten Adressen oder manuellen Reaktivierungen. Resends Abmeldung ist
  global innerhalb des Resend-Kontos und wird per signiertem Webhook nach
  Supabase gespiegelt. Ein Wiedereintritt erfordert ein neues Double-Opt-in.
- [DE-Vorlage](newsletter/de.html) und [ES-Vorlage](newsletter/es.html)
  als Grundlage für einen HTML-Broadcast im Dashboard verwenden. Die
  Platzhalter für Betreff, Inhalt, Link und Kontaktblock vor dem Testversand
  ersetzen. Den nativen Resend-Abmeldeplatzhalter im HTML belassen.
- Vor jedem Broadcast sicherstellen, dass der Sync-Endpunkt regelmäßig
  läuft und die Sprache stimmt. Offene Einträge erkennt ihr in Supabase
  an `revision > synced_revision`. Bei Rückstau oder Webhook-Fehlern
  den Broadcast zurückstellen, Fehlerbehebung abschließen und erneut prüfen.
- Rate-Limits laufen in der Datenbank über alle Instanzen. Nach fünf
  Anfragen pro IP und Stunde oder 60 insgesamt sowie innerhalb von
  15 Minuten pro Adresse wird keine weitere E-Mail erzeugt. Die Antwort
  verrät den Anmeldestatus nicht. Der Worker bereinigt alte Rate-Buckets
  und abgelaufene ausstehende Anmeldungen. Datenschutz- und
  Löschaufbewahrung für bestätigte Kontakte und Belege vor Freigabe prüfen.

## Produktion nach Freigabe

Migration, Resend-Konfiguration, Variablen, Scheduler und Abnahme zuerst in
Preview prüfen. Erst nach Freigabe dieselben Einrichtungsschritte für
Produktion durchführen. Eine frühere Website-Version kann beim Rollback
das alte Formular wieder aktivieren. Bei einem Rollback Newsletter-Broadcasts
pausieren und die alte Tabelle weiterhin vom Marketingverteiler getrennt halten.

[Resend-Broadcasts](https://resend.com/features/broadcasts) ·
[Resend-Kontakt-Webhooks](https://resend.com/changelog/new-contact-webhooks) ·
[Vercel-Anfrageheader](https://vercel.com/docs/headers/request-headers)
