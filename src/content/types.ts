import type { SectionId } from './shared';

/* -------------------------------------------------------------------------
   O CONTRATO DA TRADUÇÃO.

   Um tipo só, cumprido por en.ts, pt.ts e de.ts. É ele que garante que
   nenhum idioma saia com um pedaço faltando: esquecer uma frase em alemão
   não vira um buraco na página no ar, vira erro de compilação.

   Regra que vale pra tudo aqui: **nada de estrutura**. Nenhum slug, nenhuma
   URL, nenhum hex, nenhuma dimensão. Isso mora em shared.ts e existe uma
   vez só. Aqui é prosa, e nada além de prosa.

   >>> SOBRE AS LINHAS DE DISPLAY <<<
   Vários títulos são `string[]`, não `string`. A quebra de linha nesta
   tipografia é composição, não acidente de largura: "I BUILD / DIGITAL /
   EXPERIENCES." forma um retângulo, e é o retângulo que se compõe contra a
   grade. Cada idioma escolhe as próprias quebras, porque a mesma frase tem
   comprimentos diferentes em alemão e em português.
   ------------------------------------------------------------------------- */

export type ApproachCopy = {
  /** o nome da etapa: Research, UX Strategy… */
  step: string;
  title: string;
  text: string;
};

export type ProjectCopy = {
  /** o nome do projeto. Quase sempre igual nos três, mas é do cliente */
  title: string;
  /** `DIGITAL PRODUCT / 2026` no topo do estudo */
  kind: string;
  /** carimbo curto: trabalho de cliente, produto próprio */
  badge: string;
  summary: string;
  intro: string;
  /**
   * A observação em minúscula que aparece junto da entrada.
   *
   * Não é resumo nem argumento de venda. É a coisa que só quem construiu
   * saberia dizer: o que quase deu errado, o que mudou de ideia no meio.
   */
  note: string;
  disciplines: string[];
  role: string[];
  challenge: string;
  approach: ApproachCopy[];
  system: {
    /** nomes das cores, casados por índice com `paletteHex` */
    palette: string[];
    /** casados por índice com `typeFamilies` */
    type: { role: string; note: string }[];
    components: string[];
    grid: string;
    spacing: string;
  };
  outcome: string[];
  coverAlt: string;
  gallery: { alt: string; caption: string }[];
};

export type EntryCopy = {
  /** o período como ele aparece: `2026 / Now` */
  period: string;
  title: string;
  org: string;
  summary: string;
  /** o que se abre no clique */
  details: string[];
  roles: string[];
};

export type CapabilityCopy = {
  title: string;
  summary: string;
  text: string;
  deliverables: string[];
};

export type Content = {
  /* ---------- identidade e metadata ---------- */
  meta: {
    role: string;
    tagline: string;
    /** a descrição que vai pro Google e pro preview de link */
    description: string;
    country: string;
    availability: string;
    colophon: string;
  };

  /* ---------- interface ---------- */
  ui: {
    skipToContent: string;
    menu: string;
    close: string;
    open: string;
    available: string;
    sections: string;
    navigation: string;
    caseStudyLabel: string;
    roleLabel: string;
    language: string;
    /** as palavras do cursor, em caixa alta */
    cursor: { case: string; open: string; look: string; close: string; back: string; home: string };
  };

  /* ---------- capítulos ---------- */
  sections: Record<SectionId, { name: string; nav: string; note: string }>;

  hero: {
    lines: string[];
    lead: string;
    ctaWork: string;
    ctaContact: string;
    basedIn: string;
    localTime: string;
    disciplines: string;
    disciplinesValue: string;
    languages: string;
    languagesValue: string;
    scroll: string;
  };

  manifesto: {
    lines: string[];
    paragraphs: string[];
    methodLabel: string;
    chain: { step: string; note: string }[];
    stats: { shipped: string; years: string; tools: string; languages: string };
  };

  work: {
    lines: string[];
    intro: string;
    roleLabel: string;
    stackLabel: string;
    yearLabel: string;
    seeLive: string;
    caseStudy: string;
    openCase: (t: string) => string;
    readCase: (t: string) => string;
    statements: { lines: string[]; align: 'left' | 'right' }[];
  };

  capabilities: {
    lines: string[];
    intro: string;
    deliverablesLabel: string;
    items: Record<string, CapabilityCopy>;
  };

  stack: {
    lines: string[];
    intro: string;
    toolsWord: string;
    layersWord: string;
    primaryTool: string;
    layers: Record<string, { title: string; summary: string }>;
    /** a nota de cada ferramenta, pela `label` de shared.ts */
    notes: Record<string, string>;
  };

  journey: {
    lines: string[];
    intro: string;
    turningPoint: string;
    detail: string;
    less: string;
    entries: Record<string, EntryCopy>;
  };

  interludes: {
    label: string;
    items: Record<string, { title: string; caption: string; technique: string }>;
  };

  philosophy: {
    label: string;
    lines: string[];
    text: string;
  };

  contact: {
    lines: string[];
    lead: string;
    cta: string;
    emailSubject: string;
    basedIn: string;
    coordinates: string;
    responseTime: string;
    responseValue: string;
    working: string;
    workingValue: string;
  };

  footer: {
    role: string;
    socialLinks: string;
  };

  livePreview: {
    viewport: string;
    openInNewTab: string;
    close: string;
    loading: string;
    blockedTitle: string;
    blockedText: string;
    blockedCta: string;
    screenshots: (t: string) => string;
    liveSite: (t: string) => string;
    label: (t: string) => string;
  };

  project: {
    back: string;
    year: string;
    role: string;
    disciplines: string;
    status: string;
    live: string;
    archived: string;
    challengeLabel: string;
    challengeLines: string[];
    approachLabel: string;
    approachLines: string[];
    systemLabel: string;
    systemLines: string[];
    palette: string;
    typography: string;
    components: string;
    grid: string;
    spacing: string;
    developmentLabel: string;
    developmentLines: string[];
    outcome: string;
    experienceLabel: string;
    experienceLines: string[];
    galleryHint: string;
    visitLive: string;
    source: string;
    privateRepo: string;
    nextProject: string;
  };

  notFound: {
    label: string;
    title: string;
    text: string;
    cta: string;
  };
};
