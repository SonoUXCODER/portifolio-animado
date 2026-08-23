'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { experience, type Entry } from '@/data/experience';
import SectionIndex from './SectionIndex';
import { TransitionLink } from './PageTransition';
import { Lines, Reveal, ScrollLine } from './Reveal';
import { easeStandard } from '@/lib/motion';

/* -------------------------------------------------------------------------
   THE JOURNEY.

   Linha do tempo vertical. A régua da esquerda se preenche com o progresso
   da rolagem — é a única animação da seção ligada ao scroll, e ela existe
   porque a seção é literalmente sobre percurso. `scaleY` num elemento de
   1px composita na GPU e não força layout.

   Cada entrada abre no clique. A regra do que vai em `details`: se o
   detalhe pudesse estar no resumo sem incomodar, ele não é detalhe — é
   resumo mal escrito. O que se abre aqui é decisão técnica e número, o tipo
   de coisa que só interessa a quem já se interessou.

   As entradas saem do trabalho que existe de verdade em projects.ts. Quando
   há estudo de caso, a entrada leva pra dentro dele, e a linha do tempo
   vira mais um caminho pro trabalho em vez de um anexo morto.
   ------------------------------------------------------------------------- */

function Entrada({ entry, index }: { entry: Entry; index: number }) {
  const [aberto, setAberto] = useState(false);
  const reduzido = useReducedMotion();
  const painelId = `journey-${index}`;

  return (
    <li className="relative sm:pl-[var(--space-8)]">
      {/* ponto na régua — cheio quando é virada de fase */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-[10px] hidden h-[13px] w-[13px] items-center justify-center sm:flex"
      >
        <span
          className="block rounded-full transition-transform duration-[var(--duration-normal)]"
          style={{
            width: entry.milestone ? '13px' : '7px',
            height: entry.milestone ? '13px' : '7px',
            background: entry.milestone ? 'var(--accent)' : 'var(--line-strong)',
          }}
        />
      </span>

      <div className="grid-12 gap-y-[var(--space-3)] border-t pt-[var(--space-5)]" style={{ borderColor: 'var(--line)' }}>
        {/* ---- período ---- */}
        <div className="col-span-12 md:col-span-3">
          <p className="label" style={{ color: entry.milestone ? 'var(--accent)' : 'var(--text-primary)' }}>
            {entry.period}
          </p>
          {entry.milestone && <p className="label label--dim mt-[var(--space-2)]">Turning point</p>}
        </div>

        {/* ---- conteúdo ---- */}
        <div className="col-span-12 md:col-span-9 md:col-start-4">
          <h3 className="display-md">
            {entry.slug ? (
              <TransitionLink
                href={`/work/${entry.slug}`}
                className="hit inline-block transition-colors duration-[var(--duration-fast)] hover:text-[var(--accent)]"
                cursor="case"
              >
                {entry.title}
              </TransitionLink>
            ) : (
              entry.title
            )}
          </h3>

          <p className="label label--dim mt-[var(--space-3)]">{entry.org}</p>
          <p className="body mt-[var(--space-4)] max-w-[56ch]">{entry.summary}</p>

          <ul className="mt-[var(--space-4)] flex flex-wrap gap-x-[var(--space-4)] gap-y-[var(--space-2)]">
            {entry.roles.map((r) => (
              <li key={r} className="label label--dim">
                {r}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls={painelId}
            className="label hit mt-[var(--space-5)] flex items-center gap-[var(--space-3)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--accent)]"
            style={{ color: 'var(--text-primary)' }}
            data-cursor={aberto ? 'close' : 'open'}
          >
            {aberto ? 'Less' : 'Detail'}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-[var(--duration-normal)] ease-[var(--ease-standard)]"
              style={{ transform: aberto ? 'rotate(180deg)' : 'none' }}
            >
              ↓
            </span>
          </button>

          <AnimatePresence initial={false}>
            {aberto && (
              <motion.div
                id={painelId}
                key="detalhe"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: reduzido ? 0.12 : 0.46, ease: easeStandard }}
                className="overflow-hidden"
              >
                <ul className="mt-[var(--space-5)] flex flex-col gap-[var(--space-3)] pb-[var(--space-2)]">
                  {entry.details.map((d) => (
                    <li key={d} className="flex gap-[var(--space-4)]">
                      <span
                        aria-hidden="true"
                        className="mt-[0.7em] block h-px w-[var(--space-5)] shrink-0"
                        style={{ background: 'var(--accent)' }}
                      />
                      <p className="body max-w-[54ch]">{d}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </li>
  );
}

export default function Journey() {
  /* a régua mede o bloco da lista, não a seção inteira: senão ela começaria
     a encher enquanto o título ainda está sozinho na tela */
  const lista = useRef<HTMLDivElement>(null);

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="shell scroll-mt-[var(--header-h)] py-[var(--space-10)]"
    >
      <SectionIndex id="experience" />

      <div className="grid-12 mt-[var(--space-8)] gap-y-[var(--space-6)]">
        <div className="col-span-12 lg:col-span-6">
          <Lines lines={['The', 'journey.']} as="h2" className="display-xl" />
          <span id="experience-title" className="sr-only">
            Experience
          </span>
        </div>

        <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
          <Reveal delay={0.1}>
            <p className="body">
              From the first client to my own product, most recent first. Open any entry for the
              decision that made it worth listing.
            </p>
          </Reveal>
        </div>
      </div>

      <div ref={lista} className="relative mt-[var(--space-9)]">
        {/* a régua fica atrás dos pontos, encostada à esquerda da coluna */}
        <span
          aria-hidden="true"
          className="absolute left-[6px] top-[var(--space-4)] hidden w-px sm:block"
          style={{ height: 'calc(100% - var(--space-9))' }}
        >
          <ScrollLine className="h-full w-px" targetRef={lista} />
        </span>

        <ol className="flex flex-col gap-[var(--space-8)]">
          {experience.map((entry, i) => (
            <Entrada key={`${entry.period}-${entry.title}`} entry={entry} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
