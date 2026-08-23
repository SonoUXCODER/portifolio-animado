import type { ProjectCopy } from './types';

/* -------------------------------------------------------------------------
   OS ESTUDOS DE CASO, EM ALEMÃO.

   Registro informal ("du") e ortografia suíça ("ss", nunca "ß"), pelos
   motivos escritos no topo de de.ts. Ver en.projects.ts para a regra dos
   arrays casados por índice com shared.ts.
   ------------------------------------------------------------------------- */

export const deProjects: Record<string, ProjectCopy> = {
  phobiacori: {
    title: 'PHOBIACORI',
    kind: 'E-Commerce / Digitales Produkt',
    badge: 'Kundenprojekt',
    summary: 'Ein Shop für eine Tuschezeichnerin. Kleinauflagen, kein Lager, kein Kundenkonto.',
    intro:
      'PHOBIACORI zeichnet seit 2019 seltsame Wesen in Tusche und verkaufte sie über Direktnachrichten, eine nach der anderen. Der Shop musste zu dieser Arbeitsweise passen: kleine Auflagen, von Hand verpackt, nichts, was an ein Fliessband erinnert.',
    note: 'der warenkorb lebt im browser der besucherin. kein konto, keine anmeldung, keine datenbank.',
    disciplines: ['ART DIRECTION', 'UX/UI', 'FRONTEND'],
    role: ['Art Direction', 'UI-Design', 'Frontend', 'Inhaltsarchitektur', 'Deployment'],
    challenge:
      'Kunst in Kleinauflage zu verkaufen hat nichts mit einem generischen Shop zu tun. Der Katalog wechselt wöchentlich, die Hälfte der Stücke ist ein Unikat, und ein Marktplatz-Layout liess ihre Arbeit wie Fabrikware aussehen. Dazu: kein Budget für ein Backend, und keine Lust auf eine Plattform, die bei jedem Verkauf mitverdient.',
    approach: [
      {
        step: 'Recherche',
        title: 'Zwei Jahre Direktnachrichten gelesen',
        text: 'Vor jedem Interface habe ich gelesen, wie sie bereits verkaufte. Niemand fragte je nach einer Grössentabelle. Gefragt wurde, ob das Stück noch da ist und wie es verpackt wird. Dieser eine Befund entschied die gesamte Informationshierarchie.',
      },
      {
        step: 'UX-Strategie',
        title: 'Ein Archiv, kein Schaufenster',
        text: 'Jedes Stück wurde zur Karteikarte: die Zeichnung gross, der Text daneben, die Verfügbarkeit in klarer Sprache. Kaufen sind drei Taps und fragt nie, wer du bist. Der Warenkorb lebt im Local Storage, und die Bestellung geht als geschriebene Nachricht raus.',
      },
      {
        step: 'Wireframes',
        title: 'Eine Seite, zwei Aufgaben',
        text: 'Shop und Archiv teilen sich einen Scroll. Getrennte Routen testeten schlechter: die Leute kamen zum Schauen und entschieden sich erst danach zum Kauf. Ausverkaufte Arbeiten bleiben als Archiv sichtbar, statt zu verschwinden.',
      },
      {
        step: 'UI-Design',
        title: 'Fotokopie, Klebeband, Tusche',
        text: 'Das Interface borgt sich die Materialsprache der Arbeit selbst: Papierweiss, Tuscheschwarz, ein Rot für Warnungen. Nichts ist zentriert, nichts ist abgerundet, und jedes Bild sitzt absichtlich leicht neben dem Raster.',
      },
      {
        step: 'Entwicklung',
        title: 'Statisch, und deshalb dauerhaft',
        text: 'Next.js mit statischem Export auf GitHub Pages. Es gibt keinen Server, der ausfallen kann, keine monatliche Rechnung und keine Datenbank, die migriert werden muss. Die Produktliste ist eine typisierte Datendatei, die sie selbst bearbeitet.',
      },
    ],
    system: {
      palette: ['Tusche', 'Papier', 'Zeitungspapier', 'Warnrot', 'Ocker'],
      type: [
        { role: 'Display', note: 'Plakatschnitt, nur in drei Grössen im Einsatz' },
        { role: 'Technisch', note: 'Preise, Lagerstatus, Bestellnummern' },
        { role: 'Text', note: 'Beschreibungen und Versandtexte' },
      ],
      components: ['Stück-Karte', 'Warenkorb-Schublade', 'Verfügbarkeits-Label', 'Geklebte Abbildung', 'Bestell-Composer'],
      grid: '12 Spalten, 24px Steg, max. 1180px. Die Stücke brechen das Raster mit Absicht',
      spacing: '4 / 8 / 16 / 32 / 64. Eine Skala, keine losen Werte',
    },
    outcome: [
      'Sie aktualisiert den Katalog, ohne mich anzurufen',
      'Ausverkaufte Arbeiten verlassen das Regal von selbst',
      'Null laufende Kosten: kein Server, keine Plattformgebühr',
    ],
    coverAlt: 'Startseite von PHOBIACORI, mit Tuschezeichnungen auf Papiergrund geklebt',
    gallery: [
      {
        alt: 'Die ganze PHOBIACORI-Seite, vom Titel bis zum Fuss, Shop und Archiv zusammen',
        caption: 'Shop und Archiv auf derselben Seite',
      },
      {
        alt: 'Detail des Shop-Kopfs, mit Menü und Warenkorbzähler',
        caption: 'Tusche, Fotokopie und Sturheit',
      },
    ],
  },

  'knifes-me': {
    title: 'knifes.me',
    kind: 'SaaS / Eigenes Produkt',
    badge: 'Eigenes Produkt',
    summary: 'Mein Produkt: ein Link-in-Bio, bei dem die Seite wirklich der Person gehört.',
    intro:
      'Ich habe angefangen, weil jedes Link-in-Bio-Tool aussah wie dieselbe Seite in einer anderen Farbe. Hier wählt die Person Palette, Hintergrund, Musik und Layout, und das Ergebnis liest sich weiterhin als ihres, nicht als das der Vorlage.',
    note: 'das schwere war nie das bauen. es war zu entscheiden, was nicht gebaut wird.',
    disciplines: ['PRODUKT', 'UX/UI', 'FULL-STACK'],
    role: ['Produkt', 'UI-Design', 'Frontend', 'Backend', 'Datenbank', 'Abonnements'],
    challenge:
      'Echte Anpassbarkeit kostet Performance: jedes neue Theme wird zu mehr CSS, das jemand ausgeliefert bekommt, der nur auf einen Link tippen wollte. Das Produkt musste fast alles änderbar machen, ohne die öffentliche Seite für Besucher langsamer zu machen, die gar nichts ändern.',
    approach: [
      {
        step: 'Recherche',
        title: 'Wo die bestehenden Tools aufhören',
        text: 'Ich habe katalogisiert, was konkurrierende Produkte ändern lassen und wo sie hart abriegeln. Die Wand ist immer dieselbe: Farbe ja, Struktur nein. Struktur ist genau das, was eine Seite nach jemandem aussehen lässt.',
      },
      {
        step: 'UX-Strategie',
        title: 'Editor für die Besitzerin, nichts für Besucher',
        text: 'Die beiden Zielgruppen teilen sich nie Code. Die Besitzerin bekommt hinter Auth einen Live-Editor; Besucher bekommen eine serverseitig gerenderte Seite ohne Editor-Bundle, ohne Framework-State und ohne Theme-Auflösung im Client.',
      },
      {
        step: 'Wireframes',
        title: 'Vorschau immer neben dem Regler',
        text: 'Jeder Regler sitzt neben dem, was er verändert, und die Vorschau ist die echte Seite, keine Annäherung. Nichts zu veröffentlichen, nichts zu bestätigen: Speichern ist das Deployment.',
      },
      {
        step: 'UI-Design',
        title: 'Ein dunkler Rahmen, der verschwindet',
        text: 'Das Interface ist absichtlich fast monochrom, damit es nie mit der Seite konkurriert, die darin gebaut wird. Der einzige violette Akzent markiert Zustand, sonst nichts.',
      },
      {
        step: 'Entwicklung',
        title: 'Das Theme ist Daten, nicht Code',
        text: 'Ein Theme ist eine Handvoll CSS-Variablen, gespeichert als Datenbankzeile. Das öffentliche Profil rendert auf dem Server mit diesen Werten bereits inline, sodass ein neues Theme Bytes in einer Datenbank kostet und nicht Kilobytes in einem Bundle.',
      },
    ],
    system: {
      palette: ['Leere', 'Pflaume', 'Signalviolett', 'Tiefviolett', 'Weiss'],
      type: [
        { role: 'Display', note: 'Enge Laufweite, für Profilnamen' },
        { role: 'Interface', note: 'Editor-Labels, Formulare, Dashboard' },
        { role: 'Technisch', note: 'Slugs, Keys, Analytics-Zahlen' },
      ],
      components: [
        'Link-Block',
        'Theme-Token-Editor',
        'Live-Vorschaurahmen',
        'Auth-Flow',
        'Plan-Schranke',
        'Analytics-Kachel',
      ],
      grid: '12 Spalten im Dashboard, eine 520px-Spalte im öffentlichen Profil',
      spacing: '4 / 8 / 12 / 16 / 24 / 32 / 48 / 64. Von Design-Tokens gesteuert',
    },
    outcome: [
      'Öffentliches Profil live unter knifes.me/name',
      'Themes ohne Code änderbar',
      'Konten, Ranking und Stripe-Abos im Produktivbetrieb',
    ],
    coverAlt: 'Eine knifes.me-Profilseite, von oben bis unten',
    gallery: [
      {
        alt: 'Editor-Ansicht von knifes.me, mit Live-Vorschau neben den Reglern',
        caption: 'Hier ändern, sofort sehen',
      },
      { alt: 'Ein vollständiges Profil, erzeugt von knifes.me', caption: 'knifes.me/deinname' },
    ],
  },

  'sandra-hair-salon': {
    title: 'Sandra Hair Salon',
    kind: 'Markenauftritt / Mehrsprachig',
    badge: 'Kundenprojekt',
    summary: 'Ein Schweizer Salon in drei Sprachen, mit CHF-Preisen und Terminanfrage vom Handy.',
    intro:
      'Ein Salon in Buchs (SG) bedient Deutsch, Englisch und Portugiesisch am selben Tresen. Die Seite musste genau das können, ohne zu drei Seiten zu werden, die eine Person pflegt, die keinen Code schreibt.',
    note: 'hier habe ich aufgehört, übersetzung als schicht zu behandeln, und angefangen, sie als architektur zu behandeln.',
    disciplines: ['UX/UI', 'FRONTEND', 'I18N'],
    role: ['UI-Design', 'Frontend', 'i18n-Architektur', 'Deployment'],
    challenge:
      'Das Quartier ist dreisprachig. Nachträglich zu übersetzen, als Schicht obendrauf, geht immer irgendwo kaputt: ein Preis wird falsch gerendert, ein Button läuft über, jemand landet auf einer halb deutschen Seite. Und der Salon musste seine Preise selbst ändern können, ohne einen Code-Editor zu öffnen.',
    approach: [
      {
        step: 'Recherche',
        title: 'Welche Sprache tatsächlich hereinkommt',
        text: 'Drei Tage Beobachtung am Tresen, keine Analytics. Deutsch für Termine, Portugiesisch für die langen Gespräche, Englisch für alle auf der Durchreise. Diese Reihenfolge wurde zur Reihenfolge im Sprachumschalter.',
      },
      {
        step: 'UX-Strategie',
        title: 'Eine Seite, drei Lesarten',
        text: 'Sprache ist Zustand, nicht Route. Der Wechsel passiert an Ort und Stelle, behält die Scrollposition und schreibt Währung, Öffnungszeiten und Datumsformat zusammen mit den Wörtern um.',
      },
      {
        step: 'Wireframes',
        title: 'Die Preistabelle ist die Seite',
        text: 'Alles andere stützt sie. Leistung, Dauer, Preis in CHF, und ein Terminbutton an jeder Zeile, denn die Frage, die eine Salonseite beantworten muss, ist immer „wie viel, wie lange“.',
      },
      {
        step: 'UI-Design',
        title: 'Gold auf Espresso',
        text: 'Das Interieur des Salons ist dunkles Holz und warmes Messing, also ist es die Seite auch. Die Typografie ist grosszügig, der Kontrast hoch, und die Tap-Ziele sind für einen nassen Daumen in einem spiegelhellen Raum bemessen.',
      },
      {
        step: 'Entwicklung',
        title: 'Ein Wörterbuch, kein Build-Schritt',
        text: 'Jeder Text liegt in einem einzigen Wörterbuch, nach Sprache indiziert. Die Leistungstabelle liest eine schlichte Datendatei, die der Salon direkt bearbeitet; der Terminbutton baut eine fertige WhatsApp-Nachricht in der gerade gewählten Sprache.',
      },
    ],
    system: {
      palette: ['Espresso', 'Gold', 'Bronze', 'Champagner', 'Creme'],
      type: [
        { role: 'Display', note: 'Salonname und Abschnittstitel' },
        { role: 'Text', note: 'Leistungstexte in drei Sprachen' },
        { role: 'Technisch', note: 'CHF-Preise und Dauern, ausgerichtet' },
      ],
      components: ['Sprachumschalter', 'Leistungszeile', 'Preisschild', 'Termin-Composer', 'Öffnungszeiten-Block'],
      grid: '12 Spalten, 20px Steg, max. 1140px. Eine Spalte unter 720px',
      spacing: '8 / 16 / 24 / 40 / 64. Grössere Schritte als üblich, wegen des Daumens',
    },
    outcome: [
      'Drei Sprachen ohne drei Seiten',
      'Leistungstabelle, die der Salon selbst aktualisiert',
      'Terminanfragen kommen fertig geschrieben an, vom Handy',
    ],
    coverAlt: 'Startseite des Sandra Hair Salon, in Gold auf Fastschwarz',
    gallery: [
      {
        alt: 'Die ganze Salonseite, mit Leistungstabelle und Terminblock',
        caption: 'Preise in CHF, ohne Kleingedrucktes',
      },
      {
        alt: 'Detail des Seitenkopfs mit dem Sprachumschalter',
        caption: 'DE / EN / PT hinter einem Regler',
      },
    ],
  },

  'thayse-marques': {
    title: 'Dra. Thayse Marques',
    kind: 'Markenauftritt / Anfrage-Routing',
    badge: 'Kundenprojekt',
    summary: 'Eine Kanzleiseite, deren Formular den Fall liest und ins richtige Rechtsgebiet leitet.',
    intro:
      'Eine Kanzlei in Rio de Janeiro bekam Familien-, Arbeits- und Sozialrechtsfälle über dieselbe Telefonnummer, ohne jeden Kontext. Die Idee war, das erste Gespräch umzudrehen: die Triage passiert vor dem Kontakt, nicht währenddessen.',
    note: 'acht seiten statt einer war eine inhaltsentscheidung. das ranking kam gratis dazu.',
    disciplines: ['CONTENT-STRATEGIE', 'UX/UI', 'FRONTEND'],
    role: ['Recherche und Inhalt', 'UI-Design', 'Frontend', 'Technisches SEO', 'Deployment'],
    challenge:
      'Alles kam über einen Kanal an, ohne Kontext. Die Anwältin verbrachte die erste halbe Stunde jedes Gesprächs damit, überhaupt herauszufinden, worum es ging, und ein guter Teil dieser Fälle war gar nicht ihrer.',
    approach: [
      {
        step: 'Recherche',
        title: 'Ein Jahr erster Nachrichten sortiert',
        text: 'Ich habe die eingehenden Anfragen danach gruppiert, was die Person tatsächlich brauchte, nicht danach, wie sie es formulierte. Acht Cluster kamen heraus, und diese acht Cluster wurden zur Architektur der Seite.',
      },
      {
        step: 'UX-Strategie',
        title: 'Triage vor dem Kontakt',
        text: 'Jedes Rechtsgebiet ist eine eigene Seite mit eigener Sprache, sodass Leute sich selbst einordnen, bevor sie irgendetwas schreiben. Das kurze Formular am Ende jeder Seite baut eine Nachricht, die bereits sagt, wohin sie gehört.',
      },
      {
        step: 'Wireframes',
        title: 'Eine Antwort pro Screen',
        text: 'Juristischer Text ist von Natur aus dicht, also trägt jeder Screen eine Idee und einen Ausgang. Der Weg von „ich habe dieses Problem“ bis „Nachricht geschrieben“ sind vier Screens, ohne Sackgassen.',
      },
      {
        step: 'UI-Design',
        title: 'Ernst, ohne kalt zu sein',
        text: 'Knochenfarbenes Papier, fast schwarzer Text, ein einziges gedämpftes Rosa für Betonung. Das Porträt ist absichtlich gross und warm: bei so einer Entscheidung wählen Leute einen Menschen, keine Kanzlei.',
      },
      {
        step: 'Entwicklung',
        title: 'Acht statische Seiten, sauber indexiert',
        text: 'Von Hand geschriebenes HTML und CSS, strukturierte Daten für die Kanzlei, ein Skript für das Formular. Es lädt in unter einer Sekunde über Mobilfunk, und von dort kommt der meiste Verkehr.',
      },
    ],
    system: {
      palette: ['Fastschwarz', 'Knochen', 'Sand', 'Gedämpftes Rosa', 'Weiss'],
      type: [
        { role: 'Display', note: 'Namen der Rechtsgebiete und Schlagzeilen' },
        { role: 'Text', note: 'Langer juristischer Text, Zeilenmass 62ch' },
        { role: 'Technisch', note: 'Fristen, Artikelnummern, Daten' },
      ],
      components: ['Rechtsgebiets-Karte', 'Fallformular', 'Nachrichten-Composer', 'Qualifikations-Block', 'FAQ-Zeile'],
      grid: '12 Spalten, 24px Steg, max. 1120px',
      spacing: '4 / 8 / 16 / 24 / 40 / 72',
    },
    outcome: [
      'Anfragen kommen geschrieben und nach Rechtsgebiet sortiert an',
      'Acht indexierte Seiten statt einer',
      'Terminfindung ohne Hin und Her',
    ],
    coverAlt: 'Startseite von Dra. Thayse Marques, mit Porträt und Menü der Rechtsgebiete',
    gallery: [
      { alt: 'Die ganze Kanzleiseite, von oben bis unten', caption: 'Die ganze Seite, von oben bis unten' },
      { alt: 'Detail des Seitenkopfs der Kanzlei', caption: 'Wo die erste Minute entschieden wird' },
    ],
  },

  'truffle-nb': {
    title: 'Truffle N.B.',
    kind: 'Katalog / Saisonprodukt',
    badge: 'Kundenprojekt',
    summary: 'Ein Katalog für frische italienische Trüffel, geliefert in der ganzen Schweiz.',
    intro:
      'Frischer Trüffel hält Tage, nicht Monate. Die Seite musste sagen, was es heute gibt und wie lange die Lieferung dauert, und nichts darüber hinaus, weil alles darüber hinaus schneller veraltet, als es jemand pflegen kann.',
    note: 'für inhalte zu gestalten, die von selbst altern, hat verändert, wie ich über haltbarkeit denke.',
    disciplines: ['UX/UI', 'FRONTEND'],
    role: ['UI-Design', 'Frontend mit React', 'Inhaltsintegration', 'Deployment'],
    challenge:
      'Saisonware altert auf dem Bildschirm. Eine statische Seite, die noch einen Trüffel bewirbt, der vor drei Wochen ausgegangen ist, ist schlimmer als gar keine Seite. Sie kostet Vertrauen, und Vertrauen ist das ganze Produkt, wenn jemand CHF 200 für etwas ausgibt, das er nicht sehen kann.',
    approach: [
      {
        step: 'Recherche',
        title: 'Wie sich die Saison wirklich bewegt',
        text: 'Drei Sorten, drei Zeitfenster, und ein Lieferradius, der sich mit dem Kalender ändert. Ich habe das ganze Jahr kartiert, bevor ich irgendetwas gezeichnet habe, denn der Kalender ist hier die eigentliche Informationsarchitektur.',
      },
      {
        step: 'UX-Strategie',
        title: 'Verfügbarkeit ist der oberste Filter',
        text: 'Die Seite öffnet mit dem, was gerade Saison hat. Alles andere liegt einen Scroll darunter, markiert mit dem Monat der Rückkehr. Nicht verfügbar wird zur Information statt zur Sackgasse.',
      },
      {
        step: 'Wireframes',
        title: 'Drei Karten und eine Lieferzeile',
        text: 'Der ganze Katalog ist mit Absicht kurz. Filter, Sortierung und ein Suchfeld für neun Produkte wären Interface um seiner selbst willen.',
      },
      {
        step: 'UI-Design',
        title: 'Erde, Rost, Leinen',
        text: 'Farben aus dem Produkt selbst. Die Fotografie läuft gross und unbeschnitten; die Typografie bleibt klein und leise, damit nichts mit dem konkurriert, was verkauft wird.',
      },
      {
        step: 'Entwicklung',
        title: 'Der Katalog liest eine Datendatei',
        text: 'React und Vite, mit der Produktliste in einer typisierten Datei, die der Kunde bearbeitet. Was ausserhalb der Saison liegt, fällt von der Liste, und der Liefertext ändert sich mit. Die Seite verfällt korrekt, von selbst.',
      },
    ],
    system: {
      palette: ['Rost', 'Gold', 'Weizen', 'Leinen', 'Gebrochenes Weiss'],
      type: [
        { role: 'Display', note: 'Produktnamen, gross und luftig' },
        { role: 'Text', note: 'Herkunft, Gewicht, Lieferfenster' },
        { role: 'Technisch', note: 'Grammpreise und Lieferzeiten' },
      ],
      components: ['Produktkarte', 'Saison-Label', 'Lieferrechner', 'Herkunftsnotiz', 'Bestell-Composer'],
      grid: '12 Spalten, 32px Steg, max. 1240px',
      spacing: '8 / 16 / 32 / 64 / 96. Grosszügig, weil die Fotografie trägt',
    },
    outcome: [
      'Ein Katalog, der korrekt verfällt, von selbst',
      'Unter einer Sekunde bis zum First Paint im 4G',
      'Der Kunde aktualisiert ihn, ohne mich anzurufen',
    ],
    coverAlt: 'Startseite von Truffle N.B. Tricolore',
    gallery: [
      { alt: 'Oberer Teil der Truffle-N.B.-Seite', caption: 'Rost, Erde und ein Atemzug Platz' },
      { alt: 'Die ganze Seite von Truffle N.B. Tricolore', caption: 'Nur was die Saison wirklich hat' },
    ],
  },
};
