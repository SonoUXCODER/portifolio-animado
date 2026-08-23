'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { capabilities } from '@/data/capabilities';
import SectionIndex from './SectionIndex';
import Visual from './Visual';
import { Lines, Reveal } from './Reveal';
import { duration, easeStandard } from '@/lib/motion';
import { usePonteiroFino } from '@/hooks/useMedia';

/* -------------------------------------------------------------------------
   WHAT I DO.

   Cinco linhas em tipografia de display, e um estudo rodando atrás delas.

   A peça toda existe pra resolver um problema específico: uma seção de
   serviços é, por natureza, cinco parágrafos que se parecem. O que a salva
   não é escrever melhor — é dar a cada item um comportamento próprio. Aqui
   o item sob o cursor troca o fundo da seção inteira por um visual que roda
   ao vivo, e o item aberto revela o que sai da minha mão no fim.

   Duas interações, de propósito separadas:

     passar o mouse   troca o visual do fundo. Não abre nada, não mexe no
                      layout, e não tem estado — é resposta imediata e
                      reversível, que é o único tipo de coisa que hover
                      pode fazer sem irritar.
     clicar / Enter   abre o item. É estado de verdade, então é `<button>`
                      com aria-expanded, funciona no teclado e no toque,
                      e um item aberto fecha o anterior.

   No toque não existe hover: o visual segue o item aberto, e o primeiro já
   nasce aberto pra que a seção nunca apareça vazia.
   ------------------------------------------------------------------------- */

export default function Capabilities() {
  const fino = usePonteiroFino();
  const reduzido = useReducedMotion();
  const [aberto, setAberto] = useState<string>(capabilities[0].id);
  const [sobre, setSobre] = useState<string | null>(null);

  /* o fundo segue o cursor quando há cursor; senão segue o item aberto */
  const visivel = (fino ? sobre ?? aberto : aberto) ?? capabilities[0].id;
  const atual = capabilities.find((c) => c.id === visivel) ?? capabilities[0];

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-title"
      className="relative scroll-mt-[var(--header-h)] overflow-clip py-[var(--space-10)]"
      onPointerLeave={() => setSobre(null)}
    >
      {/* ---- o estudo, atrás de tudo ----
           Em opacidade baixa e com máscara: ele é atmosfera, não conteúdo.
           Se competisse com o texto, a seção viraria um papel de parede com
           uma lista por cima. */}
      {!reduzido && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.34]"
          style={{
            maskImage: 'radial-gradient(ellipse 80% 70% at 70% 50%, #000 10%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 70% 50%, #000 10%, transparent 75%)',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={atual.id}
              className="h-full w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: easeStandard }}
            >
              <Visual kind={atual.visual} />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      <div className="shell relative">
        <SectionIndex id="capabilities" />

        <div className="grid-12 mt-[var(--space-8)] gap-y-[var(--space-6)]">
          <div className="col-span-12 lg:col-span-6">
            <Lines lines={['What', 'I do.']} as="h2" className="display-xl" />
            <span id="capabilities-title" className="sr-only">
              Capabilities
            </span>
          </div>

          <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
            <Reveal delay={0.1}>
              <p className="body">
                Five things, and only five. A services page with eleven items does not say “I do
                everything”. It says nobody decided what this is.
              </p>
            </Reveal>
          </div>
        </div>

        {/* ================= a lista ================= */}
        <ul className="mt-[var(--space-9)] flex flex-col">
          {capabilities.map((c, i) => {
            const estaAberto = aberto === c.id;
            const destacado = visivel === c.id;

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
                    {/* o traço substituiu o número. Ele faz o mesmo trabalho
                        de marcar onde a linha começa, e acende em acento no
                        item ativo — sem dar à lista o ar de formulário. */}
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
                        que a linha abre. Rotaciona em vez de trocar de
                        glifo, senão pisca na troca. */}
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
                      <div className="grid-12 gap-y-[var(--space-5)] pb-[var(--space-8)]">
                        <div className="col-span-12 md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-2">
                          <p className="lead" style={{ maxWidth: '40ch' }}>
                            {c.summary}
                          </p>
                          <p className="body mt-[var(--space-4)]">{c.text}</p>
                        </div>

                        <div className="col-span-12 md:col-span-4 md:col-start-9">
                          <p className="label label--dim">What you get</p>
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
      </div>
    </section>
  );
}
