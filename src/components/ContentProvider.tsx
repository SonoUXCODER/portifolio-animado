'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { Lang } from '@/lib/lang';
import {
  getCapabilities,
  getContent,
  getExperience,
  getInterludes,
  getLayers,
  getProjects,
  getTools,
  type Capability,
  type Content,
  type Entry,
  type Interlude,
  type Layer,
  type Project,
  type Section,
  type Tool,
} from '@/content';
import { getSections } from '@/content';

/* -------------------------------------------------------------------------
   O IDIOMA, DISPONÍVEL EM QUALQUER LUGAR.

   Contexto em vez de prop: são quinze componentes precisando de texto, e
   passar o dicionário de mão em mão pela árvore inteira transformaria cada
   assinatura de componente numa lista de coisas que ele não usa.

   O provedor recebe o `lang` da rota (o layout de app/[lang]/ é servidor e
   lê o params) e monta o pacote uma vez. `useMemo` na dependência do lang:
   sem ele, cada render do provedor remonta os cinco projetos inteiros,
   inclusive as galerias, e todo consumidor re-renderiza junto.

   Não existe fallback silencioso. Um componente que chamar `useConteudo()`
   fora do provedor recebe um erro com nome, e não `undefined` estourando
   trinta linhas abaixo num `.map` sem contexto nenhum.
   ------------------------------------------------------------------------- */

type Pacote = {
  lang: Lang;
  t: Content;
  projects: Project[];
  layers: Layer[];
  tools: Tool[];
  experience: Entry[];
  interludes: Interlude[];
  capabilities: Capability[];
  sections: Section[];
};

const Ctx = createContext<Pacote | null>(null);

export function ContentProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const valor = useMemo<Pacote>(
    () => ({
      lang,
      t: getContent(lang),
      projects: getProjects(lang),
      layers: getLayers(lang),
      tools: getTools(lang),
      experience: getExperience(lang),
      interludes: getInterludes(lang),
      capabilities: getCapabilities(lang),
      sections: getSections(lang),
    }),
    [lang],
  );

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useConteudo(): Pacote {
  const v = useContext(Ctx);
  if (!v) throw new Error('useConteudo() precisa estar dentro de <ContentProvider>');
  return v;
}

/** atalho para quem só quer as strings de interface */
export const useT = () => useConteudo().t;

/** atalho para montar link interno já com o prefixo do idioma */
export function useHref() {
  const { lang } = useConteudo();
  return (caminho = '') => `/${lang}${caminho}`;
}
