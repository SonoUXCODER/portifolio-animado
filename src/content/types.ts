export type Lang = "en" | "pt" | "de";

export type SocialLink = { label: string; href: string };

export type SiteConfig = {
  name: string;
  wordmark: string;
  handle: string;
  email: string;
  city: string;
  coordinates: string;
  timezone: string;
  shipped: number;
  startYear: number;
  url: string;
  social: SocialLink[];
};

export type ImageMeta = { src: string; width: number; height: number };

export type ProjectMeta = {
  slug: string;
  year: string;
  live: string | null;
  github: string | null;
  embeddable: boolean;
  layout: string;
  stack: string[];
  cover: ImageMeta;
  gallery: ImageMeta[];
  paletteHex: string[];
  typeFamilies: string[];
};

export type InterludeMeta = {
  slug: string;
  file: string;
  startAngle: number;
  totalAngle: number;
  carater: "descoberta" | "metamorfose";
};

export type CapabilityMeta = { id: string; visual: string };

/* ------------------------------------------------------------------ *
 * copy
 * ------------------------------------------------------------------ */

export type ProjectCopy = {
  title: string;
  kind: string;
  badge: string;
  summary: string;
  intro: string;
  note: string;
  disciplines: string[];
  role: string[];
  challenge: string;
  approach: { step: string; title: string; text: string }[];
  outcome: string[];
  coverAlt: string;
  gallery: { alt: string; caption: string }[];
  system: {
    palette: string[];
    type: { role: string; note: string }[];
    components: string[];
    grid: string;
    spacing: string;
  };
};

export type CapabilityCopy = {
  title: string;
  summary: string;
  text: string;
  deliverables: string[];
};

export type SectionCopy = { name: string; nav: string; note: string };

export type Dictionary = {
  meta: {
    role: string;
    tagline: string;
    description: string;
    country: string;
    availability: string;
    colophon: string;
  };
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
    cursor: Record<string, string>;
  };
  sections: Record<"about" | "work" | "capabilities" | "contact", SectionCopy>;
  hero: {
    lines: string[];
    lead: string;
    proof: string;
    productsLabel: string;
    basedIn: string;
    localTime: string;
    languages: string;
    languagesValue: string;
    scroll: string;
  };
  manifesto: {
    lines: string[];
    paragraphs: string[];
    methodLabel: string;
    chain: { step: string; note: string }[];
    stats?: unknown;
  };
  work: {
    lines: string[];
    intro: string;
    roleLabel: string;
    stackLabel: string;
    yearLabel: string;
    ctaAfter: string;
    ctaAfterLink: string;
    seeLive: string;
    caseStudy: string;
    openCase: string;
    readCase: string;
    statements: { lines: string[]; align?: "left" | "right" }[];
  };
  capabilities: {
    lines: string[];
    intro: string;
    ctaAfter: string;
    ctaAfterLink: string;
    deliverablesLabel: string;
    items: Record<string, CapabilityCopy>;
  };
  interludes: {
    label: string;
    items: Record<string, { title: string; caption: string; technique: string }>;
  };
  philosophy: { label: string; lines: string[]; text: string };
  contact: {
    lines: string[];
    lead: string;
    cta: string;
    emailSubject: string;
    howItWorks: string;
    basedIn: string;
    coordinates: string;
    responseTime: string;
    responseValue: string;
    working: string;
    workingValue: string;
  };
  footer: { role: string; socialLinks: string };
  livePreview: {
    viewport: string;
    openInNewTab: string;
    close: string;
    loading: string;
    blockedTitle: string;
    blockedText: string;
    blockedCta: string;
    screenshots: string;
    liveSite: string;
    label: string;
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
    ctaEnd: string;
    ctaEndLink: string;
    nextProject: string;
  };
  notFound: { label: string; title: string; text: string; cta: string };
  projects: Record<string, ProjectCopy>;
};

/* ------------------------------------------------------------------ *
 * formas já resolvidas (metadados + copy), que é o que os componentes veem
 * ------------------------------------------------------------------ */

export type Project = Omit<ProjectMeta, "paletteHex" | "typeFamilies" | "cover" | "gallery"> &
  Omit<ProjectCopy, "coverAlt" | "gallery" | "system"> & {
    cover: ImageMeta & { alt: string };
    gallery: (ImageMeta & { alt: string; caption: string })[];
    system: {
      palette: { hex: string; name: string }[];
      type: { family: string; role: string; note: string }[];
      components: string[];
      grid: string;
      spacing: string;
    };
  };

export type Capability = CapabilityMeta & CapabilityCopy;
export type Interlude = InterludeMeta & { title: string; caption: string; technique: string };
export type Section = SectionCopy & { id: string };
