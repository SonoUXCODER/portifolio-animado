'use client';

import { identity } from '@/content';
import { useT } from './ContentProvider';
import Magnetic from './Magnetic';

/* -------------------------------------------------------------------------
   O CONVITE ENTRE CAPÍTULOS.

   Existe pra resolver um furo comercial que a auditoria do site achou: entre
   o hero e o rodapé havia **vinte e seis telas sem um único convite pra
   falar**. Quem decidia contratar na tela oito tinha de rolar mais vinte ou
   caçar a navegação, e a maioria não faz nem uma coisa nem outra.

   O desenho é deliberadamente contido. A tentação óbvia era uma faixa em
   acento com botão grande, e ela destruiria a página: num site que usa cor
   saturada em menos de 1% da tela, três blocos gritando quebram o silêncio
   que faz o resto funcionar. Então é uma pergunta em tipografia de display,
   um filete em cima, e um link. O peso vem da escala, não da cor.

   É uma pergunta, e não uma ordem, de propósito: "Seu problema se parece
   com algum destes?" continua a leitura de quem acabou de ver cinco
   projetos. "Entre em contato" ignora o que a pessoa estava fazendo.
   ------------------------------------------------------------------------- */

export default function InlineCta({
  pergunta,
  acao,
}: {
  /** a linha em display; costuma ser uma pergunta */
  pergunta: string;
  /** o texto do link */
  acao: string;
}) {
  const t = useT();

  return (
    <aside
      className="border-t pt-[var(--space-7)]"
      style={{ borderColor: 'var(--line)' }}
      aria-label={acao}
    >
      <div className="flex flex-wrap items-end justify-between gap-x-[var(--space-8)] gap-y-[var(--space-6)]">
        <p className="display-md max-w-[22ch]">{pergunta}</p>

        <Magnetic>
          <a
            href={`mailto:${identity.email}?subject=${encodeURIComponent(t.contact.emailSubject)}`}
            className="btn btn--ghost"
            data-cursor="open"
          >
            {acao} <span aria-hidden="true">↗</span>
          </a>
        </Magnetic>
      </div>
    </aside>
  );
}
