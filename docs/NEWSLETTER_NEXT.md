# Newsletter-Ausbau

Das bestehende Kontaktformular speichert Adressen in Supabase. Ein Eintrag
allein belegt keine bestätigte Newsletter-Anmeldung.

1. Vor dem Versand einen dedizierten Verteiler und Absender festlegen. Mit
   Resend kann der bestehende Dienst für Transaktionsmails weiterverwendet
   werden. Die Verwaltung des Marketingverteilers ist separat einzurichten.
2. Double-Opt-in in DE und ES umsetzen. Anmeldungen zunächst als ausstehend
   speichern. Die Bestätigung braucht ein einmaliges, befristetes Token
   und eine explizite Aktion auf der Bestätigungsseite. Wiederholte
   Anmeldungen drosseln. Alte Einträge erst nach belegter Zustimmung nutzen.
3. Nach Bestätigung in den passenden Sprachverteiler aufnehmen. Jede
   Ausgabe erhält einen Abmeldelink. Abmeldungen vor weiteren Sendungen
   dauerhaft im Verteiler berücksichtigen.
4. Versand im Anbieter-Dashboard vorbereiten und erst nach Testmail und
   redaktioneller Freigabe auslösen.

## Vorlagenstruktur

- Bestätigung: Institutsname, Anlass der E-Mail, Bestätigungsbutton,
  Hinweis zum Ignorieren bei unveranlasster Anmeldung.
- Ausgabe: Betreff, Preheader, kurzer Editorial-Absatz, Buch oder Artikel
  mit einem Hauptlink, Kontakt, Abmeldung. Separate Fassungen für DE und ES.
