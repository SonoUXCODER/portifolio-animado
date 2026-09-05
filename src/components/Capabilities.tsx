'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useConteudo } from './ContentProvider';
import SectionIndex from './SectionIndex';
import { Acende, Lines } from './Reveal';
import InlineCta from './InlineCta';
import { duration, easeStandard } from '@/lib/motion';

/* -------------------------------------------------------------------------
   WHAT I DO.

   Seis linhas em tipografia de display. A que está aberta mostra o que sai
   da minha mão, escrito: o resumo, o parágrafo, e a lista de entregáveis.

   >>> OS ESTUDOS ANIMADOS SAÍRAM, E NÃO VOLTAM <<<
   Esta seção já teve seis padrões geométricos rodando ao vivo, um por
   capacidade — grade, listras, órbita, moiré, grafo, ASCII. Primeiro como
   fundo da seção inteira, depois reduzidos a uma faixa dentro do item
   aberto. As duas versões foram removidas, e a segunda pelo motivo mais
   forte: abstração geométrica animada não diz nada sobre o trabalho ao
   lado dela, e virou o vocabulário visual que todo site gerado usa. A
   figura estava ali dando a impressão de prova sem provar nada.

   O que ficou é mais difícil de falsificar do que qualquer animação: o que
   eu entrego em cada disciplina, em texto específico.

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
          <Acende texto={t.capabilities.intro} className="body" />
        </div>
      </div>

      {/* ================= a lista ================= */}
      <ul className="mt-[var(--space-9)] flex flex-col">
        {capabilities.map((c) => {
          const estaAberto = aberto === c.id;
          const destacado = estaAberto || sobre === c.id;

          return (
            <li key={c.id} className="relative border-t" style={{ borderColor: 'var(--line)' }}>
              {/* a régua que varre da esquerda no hover. É a resposta
                  imediata que faltava: antes o item fechado só mudava de
                  opacidade, e mudança de opacidade em texto grande lê como
                  "a tela piscou", não como "isto responde ao meu mouse". */}
              <motion.span
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-full origin-left"
                style={{ background: 'var(--accent)' }}
                initial={false}
                animate={{ scaleX: destacado ? 1 : 0 }}
                transition={{ duration: 0.45, ease: easeStandard }}
              />
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

                  {/* O item ativo cresce 12% e os outros recuam: encolhem,
                      apagam e escorregam um pouco pra direita. É a diferença
                      entre "este está selecionado" e "estamos olhando pra
                      este agora" — o segundo precisa que os outros percam
                      presença, não só que um ganhe.

                      12% é o teto. Acima disso a linha ativa empurra as de
                      baixo enquanto abre, e o acordeão inteiro treme. Cresce
                      a partir da esquerda pra a margem não se mexer. */}
                  <motion.span
                    className="display-lg flex-1 origin-left"
                    /* `initial={false}` pinta já no estado final em vez de
                       animar a partir do padrão: sem isso os cinco itens
                       inativos nascem em opacidade 1 e escurecem no
                       primeiro quadro, o que lê como piscada */
                    initial={false}
                    animate={{
                      scale: destacado ? 1.12 : 1,
                      opacity: destacado ? 1 : 0.38,
                      x: destacado ? 0 : 10,
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.7 }}
                    style={{ color: destacado ? 'var(--text-primary)' : undefined }}
                  >
                    {c.title}
                  </motion.span>

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
                    {/* ---------------------------------------------------
                        O PAINEL ABERTO

                        >>> A FAIXA DE ESTUDO SAIU <<<
                        Havia aqui uma faixa de 21:9 com um estudo animado
                        rodando — grade, listras, órbita, moiré, grafo,
                        ASCII, um por capacidade. A ideia era mostrar
                        "creative development" acontecendo em vez de
                        escrever a palavra. O que ela mostrava de verdade
                        era outra coisa: seis padrões geométricos abstratos
                        que não têm relação com o trabalho listado logo
                        abaixo deles, que é o vocabulário visual mais
                        gasto que existe hoje e o que faz um portfólio
                        parecer gerado.

                        O que prova capacidade nesta seção é o que sobrou:
                        a frase do que sai da minha mão, o parágrafo que
                        acende palavra a palavra, e a lista de entregáveis
                        — coisas escritas, específicas, e que ninguém
                        consegue produzir sem ter feito o trabalho.

                        O texto passa a ser a primeira coisa que abre, e é
                        a leitura certa: o item abre e já se lê.
                        --------------------------------------------------- */}
                    <div className="pb-[var(--space-8)] pl-0 sm:pl-[calc(var(--space-6)+var(--space-7))]">
                      <div className="grid-12 gap-y-[var(--space-6)]">
                        <div className="col-span-12 md:col-span-6">
                          {/* o resumo entra de baixo, e o parágrafo longo
                              acende palavra por palavra logo atrás: duas
                              velocidades diferentes pro olho ter onde pousar
                              primeiro */}
                          <motion.p
                            className="lead"
                            style={{ maxWidth: '40ch' }}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: reduzido ? 0 : 0.14, duration: 0.5, ease: easeStandard }}
                          >
                            {c.summary}
                          </motion.p>
                          <Acende texto={c.text} className="body mt-[var(--space-4)]" />
                        </div>

                        <div className="col-span-12 md:col-span-5 md:col-start-8">
                          <p className="label label--dim">{t.capabilities.deliverablesLabel}</p>
                          <ul className="mt-[var(--space-4)] flex flex-col">
                            {c.deliverables.map((d, j) => (
                              <motion.li
                                key={d}
                                initial={{ opacity: 0, x: -14 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: reduzido ? 0 : 0.18 + j * 0.06,
                                  duration: duration.normal,
                                  ease: easeStandard,
                                }}
                                className="body-sm flex items-baseline gap-[var(--space-4)] border-b py-[var(--space-3)]"
                                style={{ borderColor: 'var(--line)', color: 'var(--text-primary)' }}
                              >
                                <span
                                  aria-hidden="true"
                                  className="block h-px w-[var(--space-4)] shrink-0 translate-y-[-4px]"
                                  style={{ background: 'var(--accent)' }}
                                />
                                {d}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
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
