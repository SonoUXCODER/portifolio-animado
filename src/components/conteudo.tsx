"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Dictionary, Lang, Section } from "@/content/types";

/**
 * Só a "moldura" do site (header, rodapé, modais) vive num contexto.
 * A copy de cada seção desce por props, direto do servidor, para o payload
 * de uma página não carregar texto que ela não mostra.
 */
export type Moldura = {
  ui: Dictionary["ui"];
  meta: Dictionary["meta"];
  footer: Dictionary["footer"];
  livePreview: Dictionary["livePreview"];
};

type Valor = Moldura & { lang: Lang; sections: Section[] };

const Ctx = createContext<Valor | null>(null);

export function ProvedorDeConteudo({
  lang,
  moldura,
  sections,
  children,
}: {
  lang: Lang;
  moldura: Moldura;
  sections: Section[];
  children: ReactNode;
}) {
  const valor = useMemo(() => ({ lang, sections, ...moldura }), [lang, sections, moldura]);
  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useConteudo() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useConteudo() precisa estar dentro de <ProvedorDeConteudo>");
  return v;
}

/** Monta um href já no idioma atual: `href("/work/x")` → `/pt/work/x`. */
export function useHref() {
  const { lang } = useConteudo();
  return (path = "") => `/${lang}${path}`;
}
