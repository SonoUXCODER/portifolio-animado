import type { Lang } from '@/lib/lang';
import type { Content, ProjectCopy } from './types';
import {
  capabilityShapes,
  entryShapes,
  identity,
  interludeShapes,
  layerShapes,
  projectShapes,
  sectionIds,
  type CaraterInterlude,
  type ProjectLayout,
  type SectionId,
  type VisualKind,
} from './shared';
import { en } from './en';
import { pt } from './pt';
import { de } from './de';

/* -------------------------------------------------------------------------
   A MONTAGEM.

   Aqui a estrutura de shared.ts encontra a prosa de en/pt/de e sai do outro
   lado como os objetos que os componentes já consumiam antes de o site ter
   três idiomas. É de propósito: nenhum componente precisou aprender o que é
   um `ProjectShape` — eles continuam recebendo um `Project` inteiro.

   >>> A CONFERÊNCIA <<<
   `paletteHex` e `typeFamilies` são casados por índice com os arrays de cada
   idioma. Isso é compacto e frágil, então a checagem abaixo roda no import,
   e o import acontece no build: tirar uma cor sem tirar o nome dela em
   alemão derruba `npm run build`, em vez de publicar uma amostra sem
   legenda que ninguém percebe por três meses.
   ------------------------------------------------------------------------- */

const dicts: Record<Lang, Content> = { en, pt, de };

/* -------------------------------------------------------------------------
   OS TIPOS QUE OS COMPONENTES VEEM
   ------------------------------------------------------------------------- */

export type Media = { src: string; alt: string; width: number; height: number; caption?: string };

export type Project = {
  slug: string;
  title: string;
  kind: string;
  badge: string;
  year: string;
  summary: string;
  intro: string;
  note: string;
  disciplines: string[];
  role: string[];
  stack: string[];
  cover: Media;
  gallery: Media[];
  live: string | null;
  github: string | null;
  embeddable: boolean;
  layout: ProjectLayout;
  challenge: string;
  approach: { step: string; title: string; text: string }[];
  system: {
    palette: { name: string; hex: string }[];
    type: { role: string; family: string; note: string }[];
    components: string[];
    grid: string;
    spacing: string;
  };
  outcome: string[];
};

export type Tool = { label: string; note: string; since: string; primary?: boolean };
export type Layer = { id: string; title: string; summary: string; tools: Tool[] };

export type Entry = {
  id: string;
  period: string;
  title: string;
  org: string;
  summary: string;
  details: string[];
  roles: string[];
  slug?: string;
  milestone?: boolean;
};

export type Interlude = {
  slug: string;
  title: string;
  caption: string;
  technique: string;
  file: string;
  startAngle: number;
  totalAngle: number;
  /** decide o comportamento da câmera; ver CaraterInterlude em shared.ts */
  carater: CaraterInterlude;
};

export type Capability = {
  id: string;
  title: string;
  summary: string;
  text: string;
  deliverables: string[];
  visual: VisualKind;
};

export type Section = { id: SectionId; name: string; nav: string; note: string };

/* -------------------------------------------------------------------------
   A CONFERÊNCIA DE INTEGRIDADE

   Roda uma vez, na primeira importação. Não é defensividade genérica: cada
   uma destas três coisas já quebrou em algum momento durante a tradução, e
   todas quebram silenciosamente na tela.
   ------------------------------------------------------------------------- */

function conferir() {
  for (const [lang, dict] of Object.entries(dicts)) {
    for (const forma of projectShapes) {
      const copy = dict.projects[forma.slug];
      if (!copy) throw new Error(`[content] ${lang}: falta o projeto "${forma.slug}"`);

      if (copy.system.palette.length !== forma.paletteHex.length) {
        throw new Error(
          `[content] ${lang}/${forma.slug}: ${copy.system.palette.length} nomes de cor para ${forma.paletteHex.length} hex`,
        );
      }
      if (copy.system.type.length !== forma.typeFamilies.length) {
        throw new Error(
          `[content] ${lang}/${forma.slug}: ${copy.system.type.length} papéis de tipo para ${forma.typeFamilies.length} famílias`,
        );
      }
      if (copy.gallery.length !== forma.gallery.length) {
        throw new Error(
          `[content] ${lang}/${forma.slug}: ${copy.gallery.length} legendas para ${forma.gallery.length} imagens`,
        );
      }
    }

    for (const camada of layerShapes) {
      if (!dict.stack.layers[camada.id]) {
        throw new Error(`[content] ${lang}: falta a camada "${camada.id}"`);
      }
      for (const tool of camada.tools) {
        if (!dict.stack.notes[tool.label]) {
          throw new Error(`[content] ${lang}: falta a nota da ferramenta "${tool.label}"`);
        }
      }
    }

    for (const e of entryShapes) {
      if (!dict.journey.entries[e.id]) {
        throw new Error(`[content] ${lang}: falta a entrada de trajetória "${e.id}"`);
      }
    }
    for (const c of capabilityShapes) {
      if (!dict.capabilities.items[c.id]) {
        throw new Error(`[content] ${lang}: falta a capacidade "${c.id}"`);
      }
    }
    for (const i of interludeShapes) {
      if (!dict.interludes.items[i.slug]) {
        throw new Error(`[content] ${lang}: falta o intervalo "${i.slug}"`);
      }
    }
  }
}

conferir();

/* -------------------------------------------------------------------------
   OS MONTADORES
   ------------------------------------------------------------------------- */

const montarProjeto = (slug: string, lang: Lang): Project => {
  const forma = projectShapes.find((p) => p.slug === slug)!;
  const copy: ProjectCopy = dicts[lang].projects[slug];

  return {
    slug: forma.slug,
    year: forma.year,
    live: forma.live,
    github: forma.github,
    embeddable: forma.embeddable,
    layout: forma.layout,
    stack: forma.stack,
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
    cover: { ...forma.cover, alt: copy.coverAlt },
    gallery: forma.gallery.map((g, i) => ({
      ...g,
      alt: copy.gallery[i].alt,
      caption: copy.gallery[i].caption,
    })),
    system: {
      palette: forma.paletteHex.map((hex, i) => ({ hex, name: copy.system.palette[i] })),
      type: forma.typeFamilies.map((family, i) => ({
        family,
        role: copy.system.type[i].role,
        note: copy.system.type[i].note,
      })),
      components: copy.system.components,
      grid: copy.system.grid,
      spacing: copy.system.spacing,
    },
  };
};

export const getContent = (lang: Lang): Content => dicts[lang];

export const getProjects = (lang: Lang): Project[] =>
  projectShapes.map((p) => montarProjeto(p.slug, lang));

export const getProject = (lang: Lang, slug: string): Project | undefined =>
  projectShapes.some((p) => p.slug === slug) ? montarProjeto(slug, lang) : undefined;

export const getLayers = (lang: Lang): Layer[] =>
  layerShapes.map((camada) => ({
    id: camada.id,
    title: dicts[lang].stack.layers[camada.id].title,
    summary: dicts[lang].stack.layers[camada.id].summary,
    tools: camada.tools.map((t) => ({ ...t, note: dicts[lang].stack.notes[t.label] })),
  }));

/** todas as ferramentas, achatadas — usado nos contadores */
export const getTools = (lang: Lang): Tool[] => getLayers(lang).flatMap((l) => l.tools);

export const getExperience = (lang: Lang): Entry[] =>
  entryShapes.map((e) => ({ ...e, ...dicts[lang].journey.entries[e.id] }));

export const getInterludes = (lang: Lang): Interlude[] =>
  interludeShapes.map((i) => ({ ...i, ...dicts[lang].interludes.items[i.slug] }));

export const getCapabilities = (lang: Lang): Capability[] =>
  capabilityShapes.map((c) => ({ ...c, ...dicts[lang].capabilities.items[c.id] }));

export const getSections = (lang: Lang): Section[] =>
  sectionIds.map((id) => ({ id, ...dicts[lang].sections[id] }));

/** os ids que o espião de rolagem observa, incluindo o topo */
export const spyIds = ['hero', ...sectionIds];

export { identity };
export type { Content, SectionId, VisualKind, ProjectLayout, CaraterInterlude };

/** troca {title} pelo nome do projeto */
export const fill = (molde: string, valor: string) => molde.replace('{title}', valor);
