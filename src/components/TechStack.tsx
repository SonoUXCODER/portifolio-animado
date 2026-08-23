'use client';

import { layers, stack } from '@/data/stack';
import { Lines, Reveal, RevealGroup, RevealItem } from './Reveal';

/* -------------------------------------------------------------------------
   TECHNOLOGY STACK.

   Um blueprint, não uma nuvem de logotipos. Quatro colunas com filete,
   cada ferramenta numa linha numerada, e o ano em que ela entrou pra valer
   alinhado à direita em tabular.

   Duas decisões que sustentam a seção:

   1. Nada de porcentagem. "JavaScript 95%" não é informação, é chute com
      aparência de dado — e todo mundo que lê um portfólio sabe disso. O que
      diz alguma coisa é `note`: o que a ferramenta faz no meu trabalho.
   2. `since` é verificável e envelhece sozinho. Um número de proficiência
      precisa ser reescrito; um ano, não.

   A nota só aparece no hover, e é essa a microanimação da seção: a linha
   inteira se abre
   pra baixo revelando o texto, sem empurrar nada — o espaço já está
   reservado. Empurrar layout no hover é a diferença entre uma tabela viva
   e uma tabela que pula.

   Esta seção não é numerada: ela é a segunda metade de CAPABILITIES, e
   dividir "o que eu faço" de "com o que eu faço" em dois capítulos daria
   dois números para um assunto só.
   ------------------------------------------------------------------------- */

export default function TechStack() {
  return (
    <section aria-labelledby="stack-title" className="shell py-[var(--space-10)]">
      <div className="grid-12 gap-y-[var(--space-6)]">
        <div className="col-span-12 lg:col-span-7">
          <Lines lines={['Tools are', 'just the beginning.']} as="h2" className="display-lg" />
          <span id="stack-title" className="sr-only">
            Technology stack
          </span>
        </div>

        <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
          <Reveal delay={0.1}>
            <p className="body">
              Not a list of everything I have opened once. This is what is running in production
              right now, and what each piece is actually doing there.
            </p>
            <p className="label label--dim mt-[var(--space-5)]">
              {String(stack.length).padStart(2, '0')} tools
              <span className="index-line__sep"> / </span>
              {String(layers.length).padStart(2, '0')} layers
            </p>
          </Reveal>
        </div>
      </div>

      {/* ================= o blueprint ================= */}
      {/* cinco colunas no desktop largo: com cinco camadas, quatro colunas
          deixariam uma sozinha na segunda linha, e é justamente o tipo de
          sobra que faz uma grade parecer acidente */}
      <div className="mt-[var(--space-9)] grid grid-cols-1 gap-x-[var(--space-6)] gap-y-[var(--space-8)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {layers.map((layer) => (
          <div key={layer.id} className="border-t pt-[var(--space-5)]" style={{ borderColor: 'var(--line-strong)' }}>
            <Reveal>
              <h3 className="display-md">{layer.title}</h3>
              <p className="body-sm mt-[var(--space-3)] max-w-[34ch]">{layer.summary}</p>
            </Reveal>

            <RevealGroup as="ul" className="mt-[var(--space-6)] flex flex-col" delay={0.05}>
              {layer.tools.map((tool, i) => (
                <RevealItem
                  as="li"
                  key={tool.label}
                  className="group border-t py-[var(--space-3)]"
                  style={{ borderColor: 'var(--line)' }}
                >
                  <div className="flex items-baseline justify-between gap-[var(--space-3)]">
                    <span className="flex items-baseline gap-[var(--space-3)]">
                      <span className="label label--dim">{String(i + 1).padStart(2, '0')}</span>
                      <span
                        className="title-sm transition-colors duration-[var(--duration-fast)] group-hover:text-[var(--accent)]"
                        style={{ fontSize: '1rem' }}
                      >
                        {tool.label}
                      </span>
                      {tool.primary && (
                        /* o ponto diz "esta é a principal da camada". o title
                           existe porque cor sozinha não é informação. */
                        <span
                          title="Primary tool in this layer"
                          aria-label="Primary tool in this layer"
                          className="inline-block h-[5px] w-[5px] shrink-0 translate-y-[-3px] rounded-full"
                          style={{ background: 'var(--accent)' }}
                        />
                      )}
                    </span>
                    <span className="label label--dim shrink-0">{tool.since}</span>
                  </div>

                  {/* a nota abre no hover e no foco. `grid-template-rows` de
                      0fr pra 1fr é o único jeito de animar altura automática
                      sem medir nada em JS. */}
                  <div
                    className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[var(--duration-normal)] ease-[var(--ease-standard)] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]"
                  >
                    <p className="body-sm overflow-hidden pl-[calc(var(--space-4)+var(--space-3))] opacity-0 transition-opacity duration-[var(--duration-normal)] group-hover:opacity-100 group-focus-within:opacity-100">
                      <span className="block pt-[var(--space-2)]">{tool.note}</span>
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        ))}
      </div>
    </section>
  );
}
