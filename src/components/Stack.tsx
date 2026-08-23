'use client';

import { layers } from '@/data/stack';
import Kicker from './Kicker';
import { Reveal, RevealGroup, RevealItem, WordsUp } from './Reveal';

/* -------------------------------------------------------------------------
   STACK.

   Uma tabela de documentação técnica, não uma nuvem de logotipos. Três
   camadas, e dentro de cada uma as ferramentas em linhas com filete: nome,
   o que ela faz aqui, e desde quando.

   O título da camada é `sticky` na coluna da esquerda. Enquanto as linhas
   passam, ele fica — é assim que se sabe em qual camada se está sem repetir
   o cabeçalho a cada item. Só vale a partir de `lg`: no estreito as colunas
   viram uma só e o sticky não teria contra o que deslizar.

   O acento marca a ferramenta principal da camada, e só isso. Sem estrela,
   sem barra, sem porcentagem inventada.
   ------------------------------------------------------------------------- */

export default function Stack() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-titulo"
      className="shell scroll-mt-[var(--header-h)] py-[var(--space-10)]"
    >
      <Kicker id="stack" />

      <div className="mt-[var(--space-8)] max-w-[20ch]">
        <WordsUp as="h2" text="Ferramentas que aguentam produção." className="display-lg" />
        <span id="stack-titulo" className="sr-only">
          Stack
        </span>
      </div>

      <Reveal delay={0.1}>
        <p className="lead mt-[var(--space-5)] max-w-[46ch]">
          Não é a lista do que já abri uma vez. É o que está em produção agora, e o que cada peça
          resolve quando o projeto é meu do começo ao fim.
        </p>
      </Reveal>

      <div className="mt-[var(--space-9)] flex flex-col gap-[var(--space-9)]">
        {layers.map((layer) => (
          <div key={layer.id} className="grid-12 gap-y-[var(--space-5)]">
            {/* ---- rótulo da camada ---- */}
            <div className="col-span-12 lg:col-span-4">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+var(--space-6))]">
                <Reveal>
                  <h3 className="display-md">{layer.titulo}</h3>
                  <p className="body-sm mt-[var(--space-3)] max-w-[32ch]">{layer.resumo}</p>
                  <p className="label mt-[var(--space-4)]">
                    {String(layer.tools.length).padStart(2, '0')} ferramentas
                  </p>
                </Reveal>
              </div>
            </div>

            {/* ---- as ferramentas ---- */}
            <RevealGroup
              as="ul"
              className="col-span-12 lg:col-span-7 lg:col-start-6"
            >
              {layer.tools.map((tool) => (
                <RevealItem
                  as="li"
                  key={tool.label}
                  className="grid grid-cols-[1fr_auto] items-baseline gap-x-[var(--space-4)] gap-y-[var(--space-1)] border-t py-[var(--space-4)]"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <h4 className="title-sm flex items-baseline gap-[var(--space-2)]">
                    {tool.label}
                    {tool.principal && (
                      /* o ponto diz "esta é a principal da camada". o title
                         existe porque cor sozinha não é informação. */
                      <span
                        title="Ferramenta principal desta camada"
                        aria-label="Ferramenta principal desta camada"
                        className="inline-block h-[5px] w-[5px] shrink-0 rounded-full"
                        style={{ background: 'var(--accent)' }}
                      />
                    )}
                  </h4>

                  <span className="label tabular-nums">desde {tool.desde}</span>

                  <p className="nota col-span-2 max-w-[52ch]">{tool.nota}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        ))}
      </div>
    </section>
  );
}
