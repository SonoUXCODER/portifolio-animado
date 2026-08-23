'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useConteudo } from './ContentProvider';
import SectionIndex from './SectionIndex';
import Visual from './Visual';
import { Lines, Reveal } from './Reveal';
import InlineCta from './InlineCta';
import { duration, easeStandard } from '@/lib/motion';

/* -------------------------------------------------------------------------
   WHAT I DO.

   Seis linhas em tipografia de display. A que está aberta mostra o que sai
   da minha mão e um estudo rodando ao vivo, num quadro do tamanho de uma
   figura.

   >>> O QUE FOI DESFEITO AQUI <<<
   A primeira versão punha o estudo como **fundo da seção inteira**, em
   opacidade baixa, trocando a cada hover. Parecia boa ideia no papel e era
   ruim na tela por três motivos, todos visíveis:

     1. moiré e listra diagonal em tela cheia atrás de texto pequeno é
        ruído, não atmosfera: a lista ficava difícil de ler;
     2. a troca acontecia a cada movimento do cursor, então havia algo se
        transformando o tempo todo — e uma coisa acontecendo por vez é a
        regra que sustenta o resto do site;
     3. a grade que seguia o ponteiro escutava a janela inteira, então ela
        se mexia com o cursor longe da seção, e isso lia como defeito.

   Agora o estudo é uma figura: tem moldura, tem tamanho, e existe só no
   item aberto. Mesmo conteúdo, um décimo do barulho.

   >>> AS DUAS INTERAÇÕES <<<
     passar o mouse   acende o título. Não abre nada, não mexe no layout,
                      não tem estado. É resposta imediata e reversível, o
                      único tipo de coisa que hover pode fazer sem irritar.
     clicar / Enter   abre o item. É estado de verdade, então é `<button>`
                      com aria-expanded, funciona no teclado e no toque, e
                      um item aberto fecha o anterior.
   ------------------------------------------------------------------------- */

export default function Capabilities() {
  const { t, capabilities } = useConteudo();
  const reduzido = useReducedMotion();
  const [aberto, setAberto] = useState<string>(capabilities[0].id);
  const [sobre, setSobre] = useState<string | null>(null);

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-title"
      className="shell scroll-mt-[var(--header-h)] py-[var(--space-10)]"
      onPointerLeave={() => setSobre(null)}
    >
      <SectionIndex id="capabilities" />

      <div className="grid-12 mt-[var(--space-8)] gap-y-[var(--space-6)]">
        <div className="col-span-12 lg:col-span-6">
          <Lines lines={t.capabilities.lines} as="h2" className="display-xl" />
          <span id="capabilities-title" className="sr-only">
            {t.sections.capabilities.name}
          </span>
        </div>

        <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
          <Reveal delay={0.1}>
            <p className="body">
              {t.capabilities.intro}
            </p>
          </Reveal>
        </div>
      </div>

      {/* ================= a lista ================= */}
      <ul className="mt-[var(--space-9)] flex flex-col">
        {capabilities.map((c) => {
          const estaAberto = aberto === c.id;
          const destacado = estaAberto || sobre === c.id;

          return (
            <li key={c.id} className="border-t" style={{ borderColor: 'var(--line)' }}>
              <h3>
                <button
                  type="button"
                  aria-expanded={estaAberto}
                  aria-controls={`capability-${c.id}`}
                  onClick={() => setAberto(estaAberto ? '' : c.id)}
                  onPointerEnter={() => setSobre(c.id)}
                  onFocus={() => setSobre(c.id)}
                  className="group flex w-full items-baseline gap-[var(--space-4)] py-[var(--space-6)] text-left sm:gap-[var(--space-7)]"
                  data-cursor={estaAberto ? 'close' : 'open'}
                >
                  {/* o traço no lugar do número: marca onde a linha começa e
                      acende em acento no item ativo */}
                  <span
                    aria-hidden="true"
                    className="block h-px w-[var(--space-6)] shrink-0 translate-y-[-0.35em] transition-colors duration-[var(--duration-normal)]"
                    style={{ background: destacado ? 'var(--accent)' : 'var(--line-strong)' }}
                  />

                  <span
                    className="display-lg flex-1 transition-[color,opacity] duration-[var(--duration-normal)]"
                    style={{
                      color: destacado ? 'var(--text-primary)' : undefined,
                      opacity: destacado ? 1 : 0.55,
                    }}
                  >
                    {c.title}
                  </span>

                  {/* o sinal de mais que vira menos: a única affordance de
                      que a linha abre. A barra vertical encolhe em vez de
                      trocar de glifo, senão pisca na troca. */}
                  <span
                    aria-hidden="true"
                    className="relative mt-[0.4em] block h-[13px] w-[13px] shrink-0"
                    style={{ color: destacado ? 'var(--accent)' : 'var(--text-tertiary)' }}
                  >
                    <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                    <span
                      className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-[var(--duration-normal)] ease-[var(--ease-standard)]"
                      style={{ transform: estaAberto ? 'scaleY(0)' : 'scaleY(1)' }}
                    />
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {estaAberto && (
                  <motion.div
                    id={`capability-${c.id}`}
                    key="detalhe"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduzido ? 0.12 : 0.5, ease: easeStandard }}
                    className="overflow-hidden"
                  >
                    <div className="grid-12 gap-y-[var(--space-6)] pb-[var(--space-8)]">
                      <div className="col-span-12 md:col-span-5 md:col-start-2">
                        <p className="lead" style={{ maxWidth: '40ch' }}>
                          {c.summary}
                        </p>
                        <p className="body mt-[var(--space-4)]">{c.text}</p>
                      </div>

                      <div className="col-span-12 md:col-span-5 md:col-start-8">
                        <p className="label label--dim">{t.capabilities.deliverablesLabel}</p>
                        <ul className="mt-[var(--space-4)] flex flex-col">
                          {c.deliverables.map((d, j) => (
                            <motion.li
                              key={d}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: reduzido ? 0 : 0.1 + j * 0.05,
                                duration: duration.normal,
                                ease: easeStandard,
                              }}
                              className="body-sm border-b py-[var(--space-3)]"
                              style={{ borderColor: 'var(--line)', color: 'var(--text-primary)' }}
                            >
                              {d}
                            </motion.li>
                          ))}
                        </ul>

                        {/* ---- o estudo, como figura ----
                             Moldura, proporção fixa e opacidade contida. É a
                             prova de que o item acima não é só uma palavra
                             numa lista, e cabe num canto em vez de tomar a
                             tela. Só o item aberto monta o dele, então nunca
                             existe mais de um canvas rodando. */}
                        {!reduzido && (
                          <figure
                            className="relative mt-[var(--space-6)] aspect-[16/9] w-full overflow-hidden"
                            style={{ border: '1px solid var(--line)', background: 'var(--surface)' }}
                          >
                            <div className="absolute inset-0 opacity-45">
                              <Visual kind={c.visual} />
                            </div>
                          </figure>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
      <div className="border-t" style={{ borderColor: 'var(--line)' }} />

      <div className="mt-[var(--space-9)]">
        <InlineCta pergunta={t.capabilities.ctaAfter} acao={t.capabilities.ctaAfterLink} />
      </div>
    </section>
  );
}
