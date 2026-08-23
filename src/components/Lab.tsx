'use client';

import { experiments } from '@/data/experiments';
import Experimento from './Experimento';
import Kicker from './Kicker';
import { Reveal, RevealGroup, RevealItem, WordsUp } from './Reveal';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   LABORATÓRIO.

   Oito estudos que rodam de verdade dentro do quadro — nenhum é print. É a
   diferença entre dizer "sei CSS" e deixar o CSS rodando na frente de quem
   está lendo.

   A grade é assimétrica de propósito: `col` e `row` vêm dos dados e cada
   quadro ocupa um pedaço diferente. Antes cada um vinha também com uma
   rotação, o que fazia sentido no impresso (papel torto na mesa) e não faz
   mais nenhum aqui — numa grade suíça, torto só parece defeito. A variedade
   agora vem da proporção, que é o que a grade sabe fazer.

   Cada quadro é `data-pause`: <PauseOffscreen/> congela a animação assim
   que ele sai da tela. Oito loops rodando ao mesmo tempo fora da vista
   custariam bateria por nada.
   ------------------------------------------------------------------------- */

/* Tailwind lê o código-fonte pra decidir o que gerar, então a classe tem de
   existir escrita por extenso em algum lugar. Um template string montado em
   runtime não sairia no CSS. */
const spanMd: Record<number, string> = {
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
};

export default function Lab() {
  return (
    <section
      id="laboratorio"
      aria-labelledby="laboratorio-titulo"
      className="shell scroll-mt-[var(--header-h)] py-[var(--space-10)]"
    >
      <Kicker id="laboratorio" />

      <div className="mt-[var(--space-8)] max-w-[20ch]">
        <WordsUp as="h2" text="O que eu testo quando ninguém pediu." className="display-lg" />
        <span id="laboratorio-titulo" className="sr-only">
          Laboratório
        </span>
      </div>

      <Reveal delay={0.1}>
        <p className="lead mt-[var(--space-5)] max-w-[46ch]">
          Estudos curtos, sem cliente e sem prazo. Ficam aqui porque foi neles que aprendi a maior
          parte do que uso nos projetos de cima — e porque rodam ao vivo, não em captura.
        </p>
      </Reveal>

      <RevealGroup
        as="ul"
        className="mt-[var(--space-9)] grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2 md:grid-cols-6"
      >
        {experiments.map((x) => (
          <RevealItem
            as="li"
            key={x.id}
            /* o span só vale a partir de md: abaixo disso a grade tem duas
               colunas ou uma, e um span de 4 estouraria a linha */
            className={cn('col-span-1 sm:col-span-1', spanMd[x.col] ?? 'md:col-span-2')}
          >
            <figure className="panel flex h-full flex-col">
              <div
                className="relative w-full overflow-hidden"
                data-pause
                style={{ height: `calc(${x.row} * 78px)` }}
              >
                <Experimento kind={x.kind} />
              </div>

              <figcaption className="flex items-baseline justify-between gap-[var(--space-3)] border-t p-[var(--space-3)]" style={{ borderColor: 'var(--border)' }}>
                <span className="title-sm text-[0.9rem]">{x.titulo}</span>
                <span className="label shrink-0">{x.tag}</span>
              </figcaption>

              <p className="body-sm px-[var(--space-3)] pb-[var(--space-3)]">{x.nota}</p>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
