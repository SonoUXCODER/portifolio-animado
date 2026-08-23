import type { Content } from './types';
import { deProjects } from './de.projects';

/* -------------------------------------------------------------------------
   ALEMÃO (registro suíço).

   Duas decisões que valem pra este arquivo inteiro:

   1. **"du", não "Sie".** É a escolha mais arriscada aqui e é deliberada:
      o público é estúdio, startup e cliente pequeno, onde o tratamento
      informal já é o padrão — e um portfólio que fala em "Sie" soa como
      escritório de contabilidade. Se um dia o alvo virar corporação suíça,
      é este parágrafo que precisa ser revisto primeiro.
   2. **"ss", nunca "ß".** É o uso suíço, e o site diz que a base é Berna.
      Escrever "Strasse" em vez de "Straße" é o tipo de detalhe que um
      leitor alemão nota em dois segundos.

   As quebras de linha dos títulos são as mais diferentes dos três idiomas:
   palavra composta alemã é longa, e uma linha de display com
   "Digitalerlebnisse" precisa de mais espaço que "experiences".
   ------------------------------------------------------------------------- */

export const de: Content = {
  meta: {
    role: 'Full-Stack-Entwickler & UX·UI-Designer',
    tagline: 'Ich gestalte Erlebnisse. Ich baue Systeme.',
    description:
      'Portfolio eines Full-Stack-Entwicklers und UX/UI-Designers mit Sitz in Bern, Schweiz. Fünf Produkte mit vollständiger Fallstudie, der Stack im Produktivbetrieb und Studien, die live laufen.',
    country: 'Schweiz',
    availability: 'Verfügbar für ausgewählte Projekte',
    colophon: 'Gesetzt in Archivo und Instrument Sans. Von Hand geschrieben in Next.js und TypeScript.',
  },

  ui: {
    skipToContent: 'Zum Inhalt springen',
    menu: 'Menü',
    close: 'Schliessen',
    open: 'Öffnen',
    available: 'Verfügbar',
    sections: 'Abschnitte',
    navigation: 'Navigation',
    caseStudyLabel: 'Fallstudie',
    roleLabel: 'Full-Stack · UX·UI',
    language: 'Sprache',
    cursor: { case: 'FALL', open: 'ÖFFNEN', look: 'SEHEN', close: 'ZU', back: 'ZURÜCK', home: 'START' },
  },

  sections: {
    about: { name: 'Über mich', nav: 'Über mich', note: 'Eine Person, zwei Disziplinen' },
    work: { name: 'Ausgewählte Arbeiten', nav: 'Arbeiten', note: 'Fünf Produkte, vom Start bis live' },
    capabilities: { name: 'Leistungen', nav: 'Skills', note: 'Vom Interface bis zur Infrastruktur' },
    experience: { name: 'Erfahrung', nav: 'Werdegang', note: 'In umgekehrter Reihenfolge' },
    contact: { name: 'Kontakt', nav: 'Kontakt', note: 'Wo das hier endet und etwas anfängt' },
  },

  hero: {
    lines: ['Ich baue', 'digitale', 'Erlebnisse.'],
    lead: 'Full-Stack-Entwickler und UX/UI-Designer. Ich baue digitale Produkte, in denen Design und Technik ein einziges System sind.',
    ctaWork: 'Ausgewählte Arbeiten',
    ctaContact: 'Gespräch starten',
    basedIn: 'Standort',
    localTime: 'Ortszeit',
    disciplines: 'Disziplinen',
    disciplinesValue: 'Design · Technik',
    languages: 'Sprachen',
    languagesValue: 'DE · EN · PT',
    scroll: 'Scrollen zum Start',
  },

  manifesto: {
    lines: ['Code ist', 'mein Material.'],
    paragraphs: [
      'Ich arbeite zwischen Design-Systemen, Interfaces, Frontend-Architektur und digitalen Erlebnissen. Mein Prozess verbindet Strategie, UX, visuelles Design und Technik, weil ich beide Hälften zur gleichen Zeit gelernt habe, ohne jemanden, dem ich die andere hätte übergeben können.',
      'Früher war das eine Einschränkung. Heute ist es das Argument: die Interface-Entscheidung fällt schon mit dem Wissen, was sie im Bau kostet, und der Code entsteht schon mit dem Wissen, wie er sich anfühlen muss. Nichts geht in der Übersetzung verloren, weil es keine Übersetzung gibt.',
    ],
    methodLabel: 'Die Methode, jedes Mal',
    chain: [
      { step: 'Design', note: 'Recherche, Flows, Interface. Entschieden, solange Ändern noch billig ist.' },
      { step: 'System', note: 'Tokens und Komponenten, damit der zweite Screen einen Bruchteil des ersten kostet.' },
      { step: 'Build', note: 'Von Hand geschrieben. Kein Baukasten, kein fertiges Theme, keine Übergabe zwischen zwei Leuten.' },
      { step: 'Launch', note: 'Domain, Metriken, und der erste Besuch von jemandem, der nicht ich bin.' },
    ],
    stats: {
      shipped: 'Ausgelieferte Produkte',
      years: 'Jahre im Bau',
      tools: 'Tools im Produktivbetrieb',
      languages: 'Gesprochene Sprachen',
    },
  },

  work: {
    lines: ['Ausgewählte', 'Arbeiten.'],
    intro:
      'Fünf Produkte, jedes vom ersten Gespräch bis zu dem Tag getragen, an dem jemand anderes als ich es geöffnet hat. Jedes davon lässt sich direkt hier öffnen, laufend, ohne diese Seite zu verlassen.',
    roleLabel: 'Rolle',
    stackLabel: 'Stack',
    yearLabel: 'Jahr',
    seeLive: 'Live ansehen',
    caseStudy: 'Fallstudie',
    openCase: 'Fallstudie zu {title} öffnen',
    readCase: 'Fallstudie zu {title} lesen',
    statements: [
      { lines: ['Mit Absicht', 'gestalten.'], align: 'left' },
      { lines: ['Mit Präzision', 'bauen.'], align: 'right' },
    ],
  },

  capabilities: {
    lines: ['Was ich', 'mache.'],
    intro:
      'Sechs Dinge, und nur sechs. Eine Leistungsseite mit elf Punkten sagt nicht „ich mache alles“. Sie sagt, dass niemand entschieden hat, was das hier ist.',
    deliverablesLabel: 'Was dabei herauskommt',
    items: {
      'ux-ui': {
        title: 'UX / UI Design',
        summary: 'Recherche, User Flows, Wireframes, Interfaces und Design-Systeme.',
        text: 'Es beginnt vor dem ersten Screen. Was wollte die Person hier erledigen, in welcher Reihenfolge, und was steht im Weg. Struktur wird zuerst geklärt, Interface danach, denn ein Screen, der gut aussieht und die falsche Frage beantwortet, muss trotzdem weg.',
        deliverables: ['User Flows', 'Wireframes', 'UI-Design in Figma', 'Prototypen', 'Übergabespezifikation'],
      },
      frontend: {
        title: 'Frontend-Entwicklung',
        summary: 'Responsive Interfaces, Animation, Performance und Barrierefreiheit.',
        text: 'Die meisten Designentscheidungen sterben im Bau. Ich schreibe das Interface selbst, damit das, was in der Datei vereinbart wurde, auch live geht. Bis hin zu den Teilen, die niemand bemerkt, bevor sie kaputtgehen: Tab-Reihenfolge, Fokusring, Kontrast, und die Sekunde, die eine Seite bei schlechtem Mobilfunk zum Erscheinen braucht.',
        deliverables: ['Interfaces mit React / Next.js', 'Motion- und Scroll-Systeme', 'Core Web Vitals', 'WCAG 2.2 AA'],
      },
      'full-stack': {
        title: 'Full-Stack-Entwicklung',
        summary: 'APIs, Datenbanken, Authentifizierung und skalierbare Anwendungen.',
        text: 'Die Hälfte, die niemand sieht, entscheidet, ob es das Produkt überhaupt gibt. Zuerst das Schema, dann die API, dann das Interface, das sie konsumiert. In dieser Reihenfolge bleibt das Datenmodell eine Entscheidung, statt ein Unfall zu sein, der über drei Sprints ausgehärtet ist.',
        deliverables: ['PostgreSQL-Schemas', 'REST-Endpunkte', 'Auth und Sessions', 'Stripe-Abonnements', 'Deployment'],
      },
      'design-systems': {
        title: 'Design-Systeme',
        summary: 'Wiederverwendbare Komponenten und konsistente Produkt-Ökosysteme.',
        text: 'Tokens, Komponenten, und die geschriebene Regel, wann man zu welcher greift. Zum System wird es durch die bereits getroffenen Entscheidungen, und die Komponentenbibliothek ist nur der Ort, an dem sie liegen. Richtig gebaut kostet der zweite Screen einen Nachmittag und der zehnte eine Stunde.',
        deliverables: ['Token-Architektur', 'Komponentenbibliothek', 'Nutzungsdokumentation', 'Barrierefreiheits-Basis'],
      },
      ai: {
        title: 'AI Engineering',
        summary: 'LLM-Funktionen im Produktivbetrieb, und KI als Teil der Arbeitsweise.',
        text: 'Zwei getrennte Dinge, und ich mache beide. Funktionen auf Sprachmodellen ausliefern: Streaming-Antworten, Kontext, der ins Budget passt, Ausgaben, denen man vor einem zahlenden Kunden wirklich trauen kann. Und KI täglich im eigenen Ablauf nutzen, dort, wo sie wirklich schneller ist: Grundgerüste, Refactorings, Testabdeckung, zweite Meinung um zwei Uhr nachts. Sie schreibt Entwürfe. Die Entscheidungen bleiben meine, und jede Zeile, die das Review überlebt, auch.',
        deliverables: [
          'Anbindung von LLM-APIs',
          'Prompt- und Kontextdesign',
          'Streaming-Chat-Interfaces',
          'Evaluation und Leitplanken',
          'KI-gestützter Build-Ablauf',
        ],
      },
      creative: {
        title: 'Creative Development',
        summary: 'Interaktive Erlebnisse, Motion und experimentelle Interfaces.',
        text: 'WebGL, Canvas, scrollgetriebene Erzählung, generative Typografie. Die drei Skulpturen auf dieser Seite sind deswegen hier. Hier gehen auch die unbezahlten Stunden hin, und genau deshalb wird alles darüber immer besser.',
        deliverables: ['Three.js-Szenen', 'Scroll-Choreografie', 'Generative Visuals', 'Interaktive Prototypen'],
      },
    },
  },

  stack: {
    lines: ['Werkzeuge sind', 'erst der Anfang.'],
    intro:
      'Keine Liste von allem, was ich einmal geöffnet habe. Das hier läuft gerade im Produktivbetrieb, und dahinter steht, was jedes Teil dort tatsächlich tut.',
    toolsWord: 'Tools',
    layersWord: 'Ebenen',
    primaryTool: 'Wichtigstes Werkzeug dieser Ebene',
    layers: {
      frontend: {
        title: 'Frontend',
        summary: 'Was die Person sieht und anfasst. Wo Design und Code dieselbe Entscheidung sind.',
      },
      backend: {
        title: 'Backend',
        summary: 'Die Hälfte, die niemand sieht, und die entscheidet, ob das Produkt echt ist.',
      },
      design: {
        title: 'Design',
        summary: 'Wo entschieden wird, solange Ändern noch billig ist.',
      },
      ai: {
        title: 'KI',
        summary: 'Funktionen auf Modellen ausliefern, und mit ihnen schneller bauen.',
      },
      workflow: {
        title: 'Workflow',
        summary: 'Wie die Arbeit meine Maschine verlässt und auf einer fremden am Leben bleibt.',
      },
    },
    notes: {
      React: 'die Basis von allem, was ich seit 2022 gebaut habe',
      'Next.js': 'Routing, Server-Rendering, und der Build hinter dieser Seite',
      TypeScript: 'Vertrag vor Ausführung, und genau das lässt mich schlafen',
      JavaScript: 'die Teile von vor dem Framework, die immer noch live sind',
      'Tailwind CSS': 'Tempo ohne Chaos, mit Design-Tokens darüber',
      CSS: 'Raster, Typografie und Motion von Hand, wenn es darauf ankommt',
      'Node.js': 'APIs, Build-Skripte, alles ausserhalb des Browsers',
      PostgreSQL: 'eine durchdachte Tabelle löst das Problem, bevor es entsteht',
      Supabase: 'Auth, Storage und Realtime, ohne Infrastruktur zu bauen',
      'REST APIs': 'typisierte Verträge zwischen den beiden Hälften desselben Produkts',
      Authentication: 'Sessions, Rollen, und die Teile, die niemals lecken dürfen',
      Stripe: 'Abonnements und Webhooks im Produktivbetrieb bei knifes.me',
      Figma: 'ich denke vor dem Coden, weil Irren hier nichts kostet',
      'UX Research': 'lesen, was Leute schon tun, bevor ich zeichne, was sie tun sollten',
      Prototyping: 'hässlich und schnell, denn ein ehrlicher Prototyp ist ein hässlicher',
      'Design Systems': 'Tokens, Komponenten und die Regel, wann man welche nimmt',
      'Three.js': 'die Skulpturen auf dieser Seite, ohne Framework darüber',
      Blender: 'Meshes vorbereiten und reduzieren, bevor sie ins Web kommen',
      'Claude API': 'das Modell, auf dem ich baue, und das, mit dem ich arbeite',
      'OpenAI API': 'wenn ein Projekt schon darauf läuft, oder wenn der Preis entscheidet',
      'Prompt design': 'Kontextbudgets, strukturierte Ausgabe, notierte Fehlermodi',
      'Streaming UI': 'Antworten Token für Token, die beim Eintreffen lesbar bleiben',
      Evaluations: 'eine Testsuite für Ausgaben, denn „sah gut aus“ ist keine Prüfung',
      'AI-assisted build': 'Grundgerüst, Refactoring und Abdeckung: die Entwürfe, nie die Entscheidungen',
      Git: 'das Strg+Z, das wirklich funktioniert',
      GitHub: 'wo jedes Projekt dieses Portfolios liegt',
      'CI/CD': 'bauen, prüfen und veröffentlichen ohne Mensch dazwischen',
      Agile: 'kurze Zyklen, sichtbare Inkremente, keine Zeremonie um ihrer selbst willen',
      'Accessibility audits': 'Tastatur, Screenreader und Kontrast, vor dem Launch statt danach',
      'Performance budgets': 'eine vorher vereinbarte Zahl ist das einzige Budget, das hält',
    },
  },

  journey: {
    lines: ['Der', 'Werdegang.'],
    intro:
      'Vom ersten Kunden bis zum eigenen Produkt, das Neueste zuerst. Öffne einen Eintrag für die Entscheidung, die ihn erwähnenswert macht.',
    turningPoint: 'Wendepunkt',
    detail: 'Details',
    less: 'Weniger',
    entries: {
      now: {
        period: '2026 / Heute',
        title: 'Full-Stack-Entwickler & Produktdesigner',
        org: 'Selbstständig · Bern, Schweiz',
        summary:
          'Digitale Produkte von Anfang bis Ende gestalten und bauen, für Kunden in der Schweiz und in Brasilien, und für mich selbst.',
        details: [
          'Arbeit in drei Sprachen: Deutsch, Englisch und Portugiesisch.',
          'Jedes Projekt läuft von der Recherche über Design und Build bis zum Deployment, mit einer Person, die für alles geradesteht.',
          'Verfügbar für ausgewählte freie Aufträge und Produktkooperationen.',
        ],
        roles: ['Produkt', 'UX/UI', 'Full-Stack', 'Deployment'],
      },
      knifes: {
        period: '2026',
        title: 'knifes.me',
        org: 'Eigenes Produkt · SaaS',
        summary:
          'Vom Frontend zum ganzen Produkt: Datenbank, Konten, Abonnements, und die Entscheidung, was nicht gebaut wird.',
        details: [
          'Theme-Engine auf CSS-Variablen, die als Datenbankzeilen liegen, sodass neue Themes Bytes kosten und nicht Bundle-Grösse.',
          'Stripe-Abonnements mit Webhook-Abgleich im Produktivbetrieb.',
          'Das Schwerste war der Umfang: drei Funktionen wurden gestrichen, nachdem sie fertig waren.',
        ],
        roles: ['Produkt', 'Full-Stack', 'Datenbank', 'Abonnements'],
      },
      phobia: {
        period: '2026',
        title: 'PHOBIACORI',
        org: 'Kundin · Unabhängige Künstlerin',
        summary:
          'Der erste Shop, den ich von null gebaut habe. Das Problem war nie das Verkaufen. Es war, einen Katalog in Kleinauflage nicht wie Fabrikware aussehen zu lassen.',
        details: [
          'Der Warenkorb lebt komplett im Browser: keine Konten, keine Datenbank, keine laufenden Kosten.',
          'Die Produktliste ist eine typisierte Datendatei, die die Künstlerin selbst bearbeitet.',
          'Statischer Export auf GitHub Pages: nichts, was ausfallen kann, nichts, was verlängert werden muss.',
        ],
        roles: ['Art Direction', 'UI-Design', 'Frontend', 'Inhaltsarchitektur'],
      },
      truffle: {
        period: '2025',
        title: 'Truffle N.B. Tricolore',
        org: 'Kunde · Schweiz',
        summary:
          'Ein saisonales Produkt zwang mich, für Inhalte zu gestalten, die von selbst altern. Der Katalog musste veralten können, ohne zu brechen.',
        details: [
          'Die Verfügbarkeit steuert das Layout: was ausserhalb der Saison ist, wird zur Information statt zur Sackgasse.',
          'React und Vite, First Paint unter einer Sekunde im 4G.',
          'Der Kunde bearbeitet die Saisondatei; der Liefertext folgt automatisch.',
        ],
        roles: ['UI-Design', 'React-Frontend', 'Inhaltsintegration'],
      },
      sandra: {
        period: '2025',
        title: 'Sandra Hair Salon',
        org: 'Kundin · Buchs SG',
        summary:
          'Drei Sprachen am selben Tresen. Hier habe ich aufgehört, Übersetzung als Schicht zu behandeln, und angefangen, sie als Architektur zu behandeln.',
        details: [
          'Sprache ist Zustand, nicht Route: der Wechsel behält die Scrollposition und schreibt Währung, Öffnungszeiten und Datumsformat mit um.',
          'Eine Wörterbuchdatei, kein Build-Schritt, kein CMS.',
          'Die Terminanfrage baut eine fertige Nachricht in der gerade gewählten Sprache.',
        ],
        roles: ['UI-Design', 'Frontend', 'i18n-Architektur'],
      },
      thayse: {
        period: '2025',
        title: 'Dra. Thayse Marques',
        org: 'Kundin · Rio de Janeiro',
        summary:
          'Das erste Projekt, in dem die Inhaltsarbeit die Interface-Arbeit überwog: acht Rechtsgebiete, jedes mit eigenem Text und eigener Suchintention.',
        details: [
          'Ein Jahr eingehender Anfragen wurde nach Bedarf gruppiert, und diese Gruppen wurden zur Architektur der Seite.',
          'Das Formular baut eine Nachricht, die bereits nach Rechtsgebiet eingeordnet ist.',
          'Acht indexierte Seiten ersetzten eine einzige, und das Ranking folgte dem Inhalt, nicht umgekehrt.',
        ],
        roles: ['Recherche und Inhalt', 'UI-Design', 'Frontend', 'Technisches SEO'],
      },
      foundations: {
        period: '2021 / 2024',
        title: 'Beide Hälften gleichzeitig lernen',
        org: 'Autodidaktisch',
        summary:
          'Ich habe Design und Technik im selben Zeitraum gelernt, weil es niemanden gab, dem ich die andere Hälfte hätte übergeben können.',
        details: [
          'Start mit HTML, CSS und Figma 2021; React 2022; TypeScript und Next.js 2023.',
          'Datenbanken und Authentifizierung kamen 2024 dazu, als ein privates Projekt nicht mehr in den Browser passte.',
          'Was einmal eine Einschränkung war, ist heute das Argument: keine Übergabe, keine stille Post.',
        ],
        roles: ['Grundlagen', 'Selbstgesteuerte Praxis'],
      },
    },
  },

  interludes: {
    label: 'Zwischenspiel',
    items: {
      klio: {
        title: 'Klio',
        caption:
          'Die Muse der Geschichte, mit einer Schriftrolle in der Hand. Jedes Projekt beginnt gleich: jemand muss etwas festhalten, bevor es verschwindet.',
        technique: 'Fotogrammetrie · Mesh auf 6% reduziert',
      },
      daphne: {
        title: 'Daphne',
        caption:
          'Sie wird mitten auf der Flucht zum Baum. Ungefähr das passiert einer Idee zwischen Skizze und Deployment. Sie kommt auf der anderen Seite als etwas anderes an.',
        technique: 'Punktwolken-Scan · Vertex-Farbe · ohne Textur',
      },
      'saint-andre': {
        title: 'Saint André',
        caption:
          'Fünf Jahrhunderte später sitzt der Faltenwurf immer noch. Das ist das kürzeste Argument, das ich kenne, für langsam und von Hand.',
        technique: 'Fotogrammetrie · 1024px-Textur',
      },
    },
  },

  philosophy: {
    label: 'Haltung',
    lines: ['Gutes Design', 'wirkt', 'zwangsläufig.'],
    text: 'Die besten digitalen Erlebnisse sind nicht nur schön. Sie sind klar, nützlich, schnell und darauf gebaut, sich weiterzuentwickeln. Wenn du das Design bemerkst, sollte es sich längst wie der einzig mögliche Weg anfühlen.',
  },

  contact: {
    lines: ['Lass uns etwas', 'bauen, das', 'zählt.'],
    lead: 'Verfügbar für freie Aufträge, Produktkooperationen und kreative digitale Projekte.',
    cta: 'Gespräch starten',
    emailSubject: 'Projektanfrage',
    basedIn: 'Standort',
    coordinates: 'Koordinaten',
    responseTime: 'Antwortzeit',
    responseValue: 'Innerhalb von zwei Tagen',
    working: 'Arbeitsweise',
    workingValue: 'Remote oder vor Ort',
  },

  footer: {
    role: 'Full-Stack-Entwickler',
    socialLinks: 'Soziale Netzwerke',
  },

  livePreview: {
    viewport: 'Ansicht',
    openInNewTab: 'In neuem Tab öffnen',
    close: 'Schliessen',
    loading: 'Live-Seite wird geladen…',
    blockedTitle: 'Diese hier lässt sich nicht einbetten.',
    blockedText:
      'Ihre Sicherheitsrichtlinie blockiert das Einbetten, und das ist die richtige Einstellung für ein Produkt mit Konten und Zahlungen. Ich habe sie selbst so gesetzt.',
    blockedCta: 'In neuem Tab öffnen',
    screenshots: 'Screenshots von {title}',
    liveSite: 'Live-Seite von {title}',
    label: 'Live-Vorschau von {title}',
  },

  project: {
    back: 'Arbeiten',
    year: 'Jahr',
    role: 'Rolle',
    disciplines: 'Disziplinen',
    status: 'Status',
    live: 'Live',
    archived: 'Archiviert',
    challengeLabel: 'Die Aufgabe',
    challengeLines: ['Was kaputt', 'war.'],
    approachLabel: 'Das Vorgehen',
    approachLines: ['Wie es', 'entstand.'],
    systemLabel: 'Design-System',
    systemLines: ['Die Regeln', 'dahinter.'],
    palette: 'Palette',
    typography: 'Typografie',
    components: 'Komponenten',
    grid: 'Raster',
    spacing: 'Abstände',
    developmentLabel: 'Entwicklung',
    developmentLines: ['Worauf es', 'läuft.'],
    outcome: 'Ergebnis',
    experienceLabel: 'Das Ergebnis live',
    experienceLines: ['In Betrieb', 'sehen.'],
    galleryHint: 'Ziehen, scrollen oder Pfeiltasten benutzen.',
    visitLive: 'Projekt live ansehen',
    source: 'Quellcode',
    privateRepo: 'Repository ist privat. Der Code gehört der Kundschaft.',
    nextProject: 'Nächstes Projekt',
  },

  notFound: {
    label: 'Nicht gefunden',
    title: 'Diese Seite gibt es nicht.',
    text: 'Oder es gab sie, und sie ist offline gegangen. Der Weg zurück ist in beiden Fällen derselbe.',
    cta: 'Zurück zum Anfang',
  },

  projects: deProjects,
};
