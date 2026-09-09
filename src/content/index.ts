import { CAPABILITIES } from "./capabilities";
import { de } from "./dictionaries/de";
import { en } from "./dictionaries/en";
import { pt } from "./dictionaries/pt";
import { INTERLUDES } from "./interludes";
import { PROJECTS } from "./projects";
import { SITE } from "./site";
import type { Capability, Dictionary, Interlude, Lang, Project, Section } from "./types";

export { SITE } from "./site";
export * from "./types";

export const LANGS: Lang[] = ["en", "pt", "de"];
export const LANG_LABEL: Record<Lang, string> = { en: "EN", pt: "PT", de: "DE" };
export const LANG_LOCALE: Record<Lang, string> = {
  en: "en",
  pt: "pt-BR",
  de: "de-CH",
};

export const NAV_SECTIONS = ["about", "work", "capabilities", "contact"] as const;
/** o hero entra só no observador de seção ativa, não no menu */
export const SECTION_ORDER = ["hero", ...NAV_SECTIONS];

const DICTS: Record<Lang, Dictionary> = { en, pt, de };

export function isLang(v: string): v is Lang {
  return (LANGS as string[]).includes(v);
}

/** Substitui o `{title}` dos rótulos de acessibilidade. */
export const fill = (template: string, title: string) => template.replace("{title}", title);

/* ------------------------------------------------------------------ *
 * resolvedores — rodam no servidor (build), nunca no navegador
 * ------------------------------------------------------------------ */

export const getDictionary = (lang: Lang): Dictionary => DICTS[lang];

export function getProject(lang: Lang, slug: string): Project | null {
  const meta = PROJECTS.find((p) => p.slug === slug);
  const copy = DICTS[lang].projects[slug];
  if (!meta || !copy) return null;
  return {
    slug: meta.slug,
    year: meta.year,
    live: meta.live,
    github: meta.github,
    embeddable: meta.embeddable,
    layout: meta.layout,
    stack: meta.stack,
    title: copy.title,
    kind: copy.kind,
    badge: copy.badge,
    summary: copy.summary,
    intro: copy.intro,
    note: copy.note,
    disciplines: copy.disciplines,
    role: copy.role,
    challenge: copy.challenge,
    approach: copy.approach,
    outcome: copy.outcome,
    cover: { ...meta.cover, alt: copy.coverAlt },
    gallery: meta.gallery.map((g, i) => ({
      ...g,
      alt: copy.gallery[i].alt,
      caption: copy.gallery[i].caption,
    })),
    system: {
      palette: meta.paletteHex.map((hex, i) => ({
        hex,
        name: copy.system.palette[i],
      })),
      type: meta.typeFamilies.map((family, i) => ({
        family,
        role: copy.system.type[i].role,
        note: copy.system.type[i].note,
      })),
      components: copy.system.components,
      grid: copy.system.grid,
      spacing: copy.system.spacing,
    },
  };
}

export const getProjects = (lang: Lang): Project[] =>
  PROJECTS.map((p) => getProject(lang, p.slug)!).filter(Boolean);

export const getCapabilities = (lang: Lang): Capability[] =>
  CAPABILITIES.map((c) => ({ ...c, ...DICTS[lang].capabilities.items[c.id] }));

export const getInterludes = (lang: Lang): Interlude[] =>
  INTERLUDES.map((i) => ({ ...i, ...DICTS[lang].interludes.items[i.slug] }));

export const getSections = (lang: Lang): Section[] =>
  NAV_SECTIONS.map((id) => ({ id, ...DICTS[lang].sections[id] }));

/**
 * Um cartão de projeto na home não precisa do estudo de caso inteiro.
 * Mandar só o resumo tira ~15 KB de texto por idioma do payload da home.
 */
export type ProjectCard = Pick<
  Project,
  | "slug"
  | "year"
  | "live"
  | "embeddable"
  | "stack"
  | "title"
  | "kind"
  | "summary"
  | "note"
  | "disciplines"
  | "cover"
>;

export const getProjectCards = (lang: Lang): ProjectCard[] =>
  getProjects(lang).map((p) => ({
    slug: p.slug,
    year: p.year,
    live: p.live,
    embeddable: p.embeddable,
    stack: p.stack,
    title: p.title,
    kind: p.kind,
    summary: p.summary,
    note: p.note,
    disciplines: p.disciplines,
    cover: p.cover,
  }));

/* ------------------------------------------------------------------ *
 * checagem de integridade no build: se faltar copy, o build quebra aqui
 * em vez de renderizar "undefined" em produção
 * ------------------------------------------------------------------ */
if (process.env.NODE_ENV !== "production" || typeof window === "undefined") {
  for (const [lang, dict] of Object.entries(DICTS) as [Lang, Dictionary][]) {
    for (const p of PROJECTS) {
      const copy = dict.projects[p.slug];
      if (!copy) throw new Error(`[content] ${lang}: falta o projeto "${p.slug}"`);
      if (copy.system.palette.length !== p.paletteHex.length)
        throw new Error(
          `[content] ${lang}/${p.slug}: ${copy.system.palette.length} nomes de cor para ${p.paletteHex.length} hex`,
        );
      if (copy.system.type.length !== p.typeFamilies.length)
        throw new Error(
          `[content] ${lang}/${p.slug}: ${copy.system.type.length} papéis de tipo para ${p.typeFamilies.length} famílias`,
        );
      if (copy.gallery.length !== p.gallery.length)
        throw new Error(
          `[content] ${lang}/${p.slug}: ${copy.gallery.length} legendas para ${p.gallery.length} imagens`,
        );
    }
    for (const c of CAPABILITIES)
      if (!dict.capabilities.items[c.id])
        throw new Error(`[content] ${lang}: falta a capacidade "${c.id}"`);
    for (const i of INTERLUDES)
      if (!dict.interludes.items[i.slug])
        throw new Error(`[content] ${lang}: falta o intervalo "${i.slug}"`);
  }
  if (SITE.social.some((s) => /linkedin/i.test(s.href)))
    throw new Error("[content] LinkedIn foi removido do site; tire o link de site.ts");
}

/** Params de rota chegam como `string`; aqui viram `Lang` ou 404. */
export function comoLang(valor: string): Lang {
  if (!isLang(valor)) throw new Error(`[content] idioma desconhecido: ${valor}`);
  return valor;
}
