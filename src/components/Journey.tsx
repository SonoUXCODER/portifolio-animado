'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import type { Entry } from '@/content';
import { useConteudo, useHref, useT } from './ContentProvider';
import SectionIndex from './SectionIndex';
import { TransitionLink } from './PageTransition';
import { Acende, Lines, Reveal, ScrollLine } from './Reveal';
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
  const t = useT();
  const href = useHref();
  const [aberto, setAberto] = useState(false);
  const reduzido = useReducedMotion();
  const painelId = `journey-${index}`;
  const ref = useRef<HTMLLIElement>(null);

  /* -----------------------------------------------------------------------
     A ENTRADA QUE ESTÁ SENDO LIDA

     Cada item mede a própria passagem pela tela e reage a ela. No meio do
     percurso ele é "o atual": o ano cresce 60%, o bloco fica em opacidade
     cheia. Nas pontas ele recua.

     Isso resolve o problema real de uma linha do tempo com sete entradas,
     que é todas parecerem igualmente importantes o tempo todo. Aqui só uma
     está em foco por vez, e o foco anda com a rolagem — que é o que dá a
     sensação de percorrer o tempo em vez de ler uma tabela.

     O ano é o que cresce, e não o título, por dois motivos: é tabular, então
     crescer não muda a largura e nada empurra do lado; e é o dado que
     organiza a leitura de uma trajetória.
     ----------------------------------------------------------------------- */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'end 10%'] });
  const suave = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });
  const anoEscala = useTransform(suave, [0, 0.5, 1], [1, 1.6, 1]);
  const presenca = useTransform(suave, [0, 0.35, 0.65, 1], [0.4, 1, 1, 0.4]);

  return (
    <li ref={ref} className="relative sm:pl-[var(--space-8)]">
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

      <motion.div
        className="grid-12 gap-y-[var(--space-3)] border-t pt-[var(--space-5)]"
        style={{ borderColor: 'var(--line)', ...(reduzido ? {} : { opacity: presenca }) }}
      >
        {/* ---- período ---- */}
        <div className="col-span-12 md:col-span-3">
          <motion.p
            className="label origin-left"
            style={{
              color: entry.milestone ? 'var(--accent)' : 'var(--text-primary)',
              ...(reduzido ? {} : { scale: anoEscala }),
            }}
          >
            {entry.period}
          </motion.p>
          {entry.milestone && (
            <p className="label label--dim mt-[var(--space-4)]">{t.journey.turningPoint}</p>
          )}
        </div>

        {/* ---- conteúdo ---- */}
        <div className="col-span-12 md:col-span-9 md:col-start-4">
          <h3 className="display-md">
            {entry.slug ? (
              <TransitionLink
                href={href(`/work/${entry.slug}`)}
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
            {aberto ? t.journey.less : t.journey.detail}
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
      </motion.div>
    </li>
  );
}

export default function Journey() {
  const { t, experience } = useConteudo();
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
          <Lines lines={t.journey.lines} as="h2" className="display-xl" />
          <span id="experience-title" className="sr-only">
            {t.sections.experience.name}
          </span>
        </div>

        <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
          <Acende texto={t.journey.intro} className="body" />
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
