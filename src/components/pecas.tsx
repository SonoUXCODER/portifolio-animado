"use client";

import { ReguaAnimada } from "@/components/animacoes";
import { useConteudo } from "@/components/conteudo";
import Magnetico from "@/components/magnetico";
import { SITE } from "@/content/site";

/** Rótulo de seção: nome, régua e a nota curta da direita. */
export function IndiceDeSecao({ id, note }: { id: string; note?: string }) {
  const { sections } = useConteudo();
  const secao = sections.find((s) => s.id === id);
  return (
    <p className="index-line">
      <span style={{ color: "var(--text-primary)" }}>{secao?.name ?? id}</span>
      <ReguaAnimada />
      <span className="hidden sm:inline">{note ?? secao?.note}</span>
    </p>
  );
}

/** Pergunta + botão de e-mail que fecha várias seções. */
export function ChamadaFinal({
  pergunta,
  acao,
  assunto,
}: {
  pergunta: string;
  acao: string;
  assunto: string;
}) {
  return (
    <aside className="faixa-dados" aria-label={acao}>
      <div className="flex flex-wrap items-end justify-between gap-x-[var(--space-8)] gap-y-[var(--space-6)]">
        <p className="display-md max-w-[22ch]">{pergunta}</p>
        <Magnetico>
          <a
            href={`mailto:${SITE.email}?subject=${encodeURIComponent(assunto)}`}
            className="btn btn--ghost"
            data-cursor="open"
          >
            {acao} <span aria-hidden>↗</span>
          </a>
        </Magnetico>
      </div>
    </aside>
  );
}
