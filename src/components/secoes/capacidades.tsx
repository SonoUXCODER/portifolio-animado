"use client";

import { AnimatePresence, m as motion } from "framer-motion";
import { useState } from "react";
import { LinhasQueSobem, TextoQueAcende } from "@/components/animacoes";
import { ChamadaFinal, IndiceDeSecao } from "@/components/pecas";
import type { Capability, Dictionary } from "@/content/types";
import { useMovimentoReduzido } from "@/lib/hooks";
import { DUR, EASE_STANDARD } from "@/lib/motion";
import { TEMA_CLARO } from "@/lib/tema";

/** Acordeão do que eu faço. Um item aberto por vez. */
export default function Capacidades({
  t,
  itens,
  nomeSecao,
  assunto,
}: {
  t: Dictionary["capabilities"];
  itens: Capability[];
  nomeSecao: string;
  assunto: string;
}) {
  const reduzido = useMovimentoReduzido();
  const [aberta, setAberta] = useState(itens[0]?.id ?? "");
  const [sobre, setSobre] = useState<string | null>(null);

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-title"
      className="w-full overflow-clip scroll-mt-[var(--header-h)] py-[var(--space-10)]"
      style={TEMA_CLARO}
      onPointerLeave={() => setSobre(null)}
    >
      <div className="shell">
        <IndiceDeSecao id="capabilities" />

        <div className="grid-12 mt-[var(--space-8)] gap-y-[var(--space-6)]">
          <div className="col-span-12 lg:col-span-6">
            <LinhasQueSobem lines={t.lines} as="h2" className="display-xl" />
            <span id="capabilities-title" className="sr-only">
              {nomeSecao}
            </span>
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
            {/* creme: texto entra preto e pronto, sem o degradê por palavra */}
            <TextoQueAcende texto={t.intro} className="body" acender={false} />
          </div>
        </div>

        <ul className="mt-[var(--space-9)] flex flex-col">
          {itens.map((item) => {
            const expandida = aberta === item.id;
            const destacada = expandida || sobre === item.id;
            return (
              <li
                key={item.id}
                className="relative border-t"
                style={{ borderColor: "var(--line)" }}
              >
                <motion.span
                  aria-hidden
                  className="absolute left-0 top-0 h-px w-full origin-left"
                  style={{ background: "var(--accent)" }}
                  initial={false}
                  animate={{ scaleX: destacada ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: EASE_STANDARD }}
                />

                <h3>
                  <button
                    type="button"
                    aria-expanded={expandida}
                    aria-controls={`capability-${item.id}`}
                    onClick={() => setAberta(expandida ? "" : item.id)}
                    onPointerEnter={() => setSobre(item.id)}
                    onFocus={() => setSobre(item.id)}
                    className="group flex w-full items-baseline gap-[var(--space-4)] py-[var(--space-6)] text-left sm:gap-[var(--space-7)]"
                    data-cursor={expandida ? "close" : "open"}
                  >
                    <span
                      aria-hidden
                      className="block h-px w-[var(--space-6)] shrink-0 translate-y-[-0.35em] transition-colors duration-[var(--duration-normal)]"
                      style={{ background: destacada ? "var(--accent)" : "var(--line-strong)" }}
                    />
                    <motion.span
                      className="display-lg flex-1 origin-left"
                      initial={false}
                      animate={{
                        scale: destacada ? 1.12 : 1,
                        opacity: destacada ? 1 : 0.38,
                        x: destacada ? 0 : 10,
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.7 }}
                      style={{ color: destacada ? "var(--text-primary)" : undefined }}
                    >
                      {item.title}
                    </motion.span>
                    <span
                      aria-hidden
                      className="relative mt-[0.4em] block h-[13px] w-[13px] shrink-0"
                      style={{ color: destacada ? "var(--accent)" : "var(--text-tertiary)" }}
                    >
                      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                      <span
                        className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-[var(--duration-normal)] ease-[var(--ease-standard)]"
                        style={{ transform: expandida ? "scaleY(0)" : "scaleY(1)" }}
                      />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {expandida && (
                    <motion.div
                      key="detalhe"
                      id={`capability-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduzido ? 0.12 : 0.5, ease: EASE_STANDARD }}
                      className="overflow-hidden"
                    >
                      <div className="pb-[var(--space-8)] pl-0 sm:pl-[calc(var(--space-6)+var(--space-7))]">
                        <div className="grid-12 gap-y-[var(--space-6)]">
                          <div className="col-span-12 md:col-span-6">
                            <motion.p
                              className="lead"
                              style={{ maxWidth: "40ch" }}
                              initial={{ opacity: 0, y: 18 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: reduzido ? 0 : 0.14,
                                duration: 0.5,
                                ease: EASE_STANDARD,
                              }}
                            >
                              {item.summary}
                            </motion.p>
                            <TextoQueAcende
                              texto={item.text}
                              className="body mt-[var(--space-4)]"
                              acender={false}
                            />
                          </div>

                          <div className="col-span-12 md:col-span-5 md:col-start-8">
                            <p className="label label--dim">{t.deliverablesLabel}</p>
                            <ul className="mt-[var(--space-4)] flex flex-col">
                              {item.deliverables.map((entrega, i) => (
                                <motion.li
                                  key={entrega}
                                  initial={{ opacity: 0, x: -14 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    delay: reduzido ? 0 : 0.18 + 0.06 * i,
                                    duration: DUR.normal,
                                    ease: EASE_STANDARD,
                                  }}
                                  className="body-sm flex items-baseline gap-[var(--space-4)] border-b py-[var(--space-3)]"
                                  style={{
                                    borderColor: "var(--line)",
                                    color: "var(--text-primary)",
                                  }}
                                >
                                  <span
                                    aria-hidden
                                    className="block h-px w-[var(--space-4)] shrink-0 translate-y-[-4px]"
                                    style={{ background: "var(--accent)" }}
                                  />
                                  {entrega}
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

        <div className="border-t" style={{ borderColor: "var(--line)" }} />

        <div className="mt-[var(--space-9)]">
          <ChamadaFinal pergunta={t.ctaAfter} acao={t.ctaAfterLink} assunto={assunto} />
        </div>
      </div>
    </section>
  );
}
