# Negative Dialektik Website Roadmap

Dieser Plan dient als gemeinsamer Arbeitsrahmen fuer die naechsten Ausbaustufen der Website. Er ist so strukturiert, dass wir ihn Schritt fuer Schritt direkt im Code abarbeiten koennen.

## Leitidee

V1 hat die Seite als serioese, image-starke Verlagspraesenz etabliert.

Die naechsten Versionen sollen drei Dinge leisten:

1. Das Programm als echten digitalen Katalog erfahrbar machen.
2. Den Newsletter technisch sauber aufsetzen.
3. E-Commerce spaeter sinnvoll und stabil ergaenzen.

## Prioritaeten

Die empfohlene Reihenfolge lautet:

1. Datenstruktur fuer Reihen und Buecher
2. Reihenseiten
3. Buchseiten
4. Programmseite als echter Katalog
5. Newsletter professionell machen
6. Formular-Feedback verbessern
7. E-Commerce vorbereiten
8. E-Commerce live schalten

## Phase 1: Verlag als echter Katalog

Ziel: Die Website soll nicht nur das Institut repraesentieren, sondern das Verlagsprogramm strukturiert abbilden.

### 1. Datenmodell fuer Reihen

Jede Reihe sollte mindestens diese Felder haben:

- `slug`
- `title`
- `subtitle`
- `description`
- `theme`
- `coverImage`
- `status`
- `featuredBooks`
- `seoTitle`
- `seoDescription`

### 2. Datenmodell fuer Buecher

Jedes Buch sollte mindestens diese Felder haben:

- `slug`
- `title`
- `subtitle`
- `author`
- `translator`
- `editor`
- `seriesSlug`
- `description`
- `longDescription`
- `quote`
- `coverImage`
- `isbn`
- `pages`
- `format`
- `language`
- `publicationDate`
- `status`
- `price`
- `currency`
- `buyLink`
- `samplePdf`
- `seoTitle`
- `seoDescription`

### 3. Neue Seitentypen

Diese Seiten sollen entstehen:

- `/programm` als echte Katalogseite mit Reihen und Buechern
- `/reihen/[slug]` als Reihenseite mit Profil und Titeln
- `/buecher/[slug]` oder `/books/[slug]` als Buchdetailseite mit Metadaten und CTA

### 4. Statussystem

Von Anfang an mit festen Stati arbeiten:

- `in-vorbereitung`
- `angekuendigt`
- `vorbestellbar`
- `lieferbar`
- `vergriffen`

## Phase 2: UX und Funktionalitaet

Ziel: Die Seite soll sich nicht nur hochwertig praesentieren, sondern als echtes digitales Produkt anfuehlen.

### 1. Programmseite verbessern

Sinnvolle Bausteine:

- Hero
- Reihenuebersicht
- Alle Titel
- Filter nach Reihe, Thema oder Status
- Neuerscheinungen
- Demnaechst

### 2. Buchseiten hochwertig machen

Jede Buchseite sollte idealerweise enthalten:

- Cover
- Kurzbeschreibung
- laengere editorische Beschreibung
- bibliografische Daten
- Reihe
- Autor, Uebersetzer, Herausgeber
- Status
- Preis
- CTA
- aehnliche Titel
- optional Leseprobe

### 3. Kontaktformulare verbessern

Fuer Kontakt und Newsletter:

- Loading-State
- Success-State
- Error-State
- verstaendliche Rueckmeldungen

### 4. Newsletter richtig aufsetzen

Zielbild:

- echte Speicherung der Abonnenten
- Sprache `de` oder `es`
- Double-Opt-in
- Exportmoeglichkeit oder Tool-Anbindung
- spaeter Versandlogik

## Phase 3: E-Commerce vorbereiten

Ziel: Die Architektur frueh so anlegen, dass ein Shop spaeter sauber integriert werden kann.

### 1. Bereits im Datenmodell vorsehen

- `price`
- `currency`
- `stockStatus`
- `buyLink`
- `sku` optional
- `format`

### 2. Zwischenstufe vor vollem Shop

Bevor Checkout live geht, koennen Buchseiten schon diese CTAs besitzen:

- `Kaufen` zu externem Haendler
- `Vorbestellen`
- `Anfragen`
- `Benachrichtigen, wenn erhaeltlich`

### 3. Spaeterer Vollausbau

- Warenkorb
- Checkout
- Payment
- Bestellmails
- Order-Management
- Versand- und Rechtstexte

## Praktische Modulaufteilung

Um die Arbeit sauber zu strukturieren, teilen wir sie in diese Module:

### 1. Content-Modul

Verantwortung:

- Reihen- und Buchdaten strukturieren
- bestehende Inhalte migrieren

### 2. Routing-Modul

Verantwortung:

- dynamische Seiten fuer Reihen
- dynamische Seiten fuer Buecher

### 3. Catalog-Modul

Verantwortung:

- Programmseite
- Buchkarten
- Verlinkungen
- Filter und Uebersichten

### 4. Newsletter-Modul

Verantwortung:

- Speicherung
- Opt-in-Logik
- Sprachsegmentierung
- Form-Feedback

### 5. Commerce-Modul

Verantwortung:

- Preise
- Kauf-CTAs
- spaeter Checkout

## Empfohlener naechster Sprint

Wenn wir direkt loslegen, ist dieser Sprint die sinnvollste Startphase:

1. Reihendaten und Buchdaten als strukturierte Dateien anlegen
2. Dynamische Buchseiten bauen
3. Dynamische Reihenseiten bauen
4. Startseite und Programmseite auf diese neuen Seiten verlinken
5. Danach den Newsletter sauber nachziehen

## Nächste konkrete Umsetzung

Der erste technische Umsetzungsschritt ist:

1. Typen fuer Reihen und Buecher definieren
2. Content-Struktur fuer beide Sprachen festlegen
3. Erste Beispiel-Datensaetze fuer Reihen und Buecher anlegen
4. Auf dieser Basis neue Seitenrouten bauen

