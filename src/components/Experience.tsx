'use client';

import { useRef } from 'react';
import { experience } from '@/data/experience';
import SectionMark from './SectionMark';
import { TransitionLink } from './PageTransition';
import { Reveal, RevealGroup, RevealItem, ScrollLine, WordsUp } from './Reveal';

/* -------------------------------------------------------------------------
   EXPERIÊNCIA.

   A linha vertical se preenche com o progresso da rolagem — é a única
   animação da seção ligada ao scroll, e existe porque a linha do tempo é
   literalmente sobre percurso. `ScrollLine` anima `scaleY` num elemento de
   1px: composita na GPU e não força layout.

   As entradas saem do trabalho que existe de verdade em projects.ts. Nada
   de cargo inventado pra encher currículo — quando há estudo de caso, a
   entrada leva pra dentro dele, e a timeline vira mais um caminho pro
   trabalho em vez de um anexo morto.

   O marco (`milestone`) recebe o ponto em acento. Dois numa lista de cinco:
   se todos fossem marco, nenhum seria.
   ------------------------------------------------------------------------- */

export default function Experience() {
  /* a linha mede o bloco da lista, não a seção inteira: senão ela começaria
     a encher enquanto o título ainda está sozinho na tela */
  const lista = useRef<HTMLDivElement>(null);

  return (
    <section
      id="experiencia"
      aria-labelledby="experiencia-titulo"
      className="shell scroll-mt-[var(--header-h)] py-[var(--space-10)]"
    >
      <SectionMark id="experiencia" />

      <div className="mt-[var(--space-8)] max-w-[20ch]">
        <WordsUp as="h2" text="Do primeiro cliente ao produto próprio." className="display-lg" />
        <span id="experiencia-titulo" className="sr-only">
          Experiência
        </span>
      </div>

      <Reveal delay={0.1}>
        <p className="lead mt-[var(--space-5)] max-w-[46ch]">
          Dois anos e cinco projetos, do mais recente para o começo. A linha da esquerda se
          preenche conforme a leitura desce.
        </p>
      </Reveal>

      <div ref={lista} className="relative mt-[var(--space-9)]">
        {/* a régua fica atrás dos pontos, encostada à esquerda da coluna */}
        <span
          aria-hidden="true"
          className="absolute left-[5px] top-[var(--space-2)] hidden w-px sm:block"
          style={{ height: 'calc(100% - var(--space-8))' }}
        >
          <ScrollLine className="h-full w-px" targetRef={lista} />
        </span>

        <RevealGroup as="ol" className="flex flex-col gap-[var(--space-8)]">
          {experience.map((entry) => (
            <RevealItem as="li" key={`${entry.year}-${entry.title}`} className="relative sm:pl-[var(--space-7)]">
              {/* ponto na régua */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-[9px] hidden h-[11px] w-[11px] items-center justify-center sm:flex"
              >
                <span
                  className="block rounded-full"
                  style={{
                    width: entry.milestone ? '11px' : '7px',
                    height: entry.milestone ? '11px' : '7px',
                    background: entry.milestone ? 'var(--accent)' : 'var(--border-strong)',
                  }}
                />
              </span>

              <div className="grid-12 gap-y-[var(--space-3)]">
                {/* ---- ano ---- */}
                <div className="col-span-12 md:col-span-2">
                  <span className="figure text-[1.1rem]">{entry.year}</span>
                  {entry.milestone && (
                    <span className="label mt-[var(--space-1)] block" style={{ color: 'var(--accent)' }}>
                      virada
                    </span>
                  )}
                </div>

                {/* ---- conteúdo ---- */}
                <div className="col-span-12 md:col-span-9 md:col-start-4">
                  <h3 className="title-sm">
                    {entry.slug ? (
                      <TransitionLink href={`/projetos/${entry.slug}`} className="link hit" cursor="abrir">
                        {entry.title}
                      </TransitionLink>
                    ) : (
                      entry.title
                    )}
                  </h3>

                  <p className="label mt-[var(--space-2)]">{entry.org}</p>

                  <p className="body mt-[var(--space-3)] max-w-[54ch]">{entry.summary}</p>

                  <ul className="mt-[var(--space-4)] flex flex-wrap gap-x-[var(--space-4)] gap-y-[var(--space-2)]">
                    {entry.roles.map((r) => (
                      <li key={r} className="label">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
