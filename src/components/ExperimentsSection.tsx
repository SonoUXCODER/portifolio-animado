'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { experiments } from '@/data/experiments';
import Experimento from './Experimento';
import { ScrollReveal } from './ScrollReveal';
import { Traquinhos } from './Doodles';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   "COISAS QUE EU TESTEI".

   Grid de propósito desalinhada: cada quadro pega um número diferente de
   colunas e de linhas, e nenhum deles fica reto. É a gaveta de sobras —
   coisa pequena que não vira projeto mas ensina alguma coisa.
   ------------------------------------------------------------------------- */

/* Tailwind precisa ver a classe inteira escrita, então nada de string montada */
const colunas: Record<number, string> = {
  2: 'col-span-2 md:col-span-2 lg:col-span-2',
  3: 'col-span-2 md:col-span-2 lg:col-span-3',
  4: 'col-span-2 md:col-span-4 lg:col-span-4',
};

const linhas: Record<number, string> = {
  2: 'row-span-2',
  3: 'row-span-3',
};

export default function ExperimentsSection() {
  const reduzido = useReducedMotion();

  return (
    <section id="experimentos" className="relative py-[clamp(70px,10vw,140px)]">
      <div className="envelope">
        <ScrollReveal direcao="esquerda" className="mb-4 flex items-center gap-4">
          <span className="zine-sub">04 — GAVETA</span>
          <span className="h-[2px] flex-1" style={{ background: 'var(--border)' }} />
          <Traquinhos cor="var(--accent-2)" />
        </ScrollReveal>

        <div className="mb-3 flex flex-wrap items-end justify-between gap-5">
          <h2 className="zine-titulo--medio">
            COISAS QUE
            <br />
            EU TESTEI
          </h2>
          <p className="corpo text-[clamp(0.9rem,1.2vw,1.05rem)]">
            Tudo aqui roda de verdade nesta página. Nenhum print, nenhum vídeo.
          </p>
        </div>

        {/* auto-flow denso: os quadros têm tamanhos diferentes e sem isto a
            grid deixa buracos de uma coluna inteira na direita */}
        <div className="mt-10 grid auto-rows-[86px] grid-flow-row-dense grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-4">
          {experiments.map((x, i) => (
            <motion.figure
              key={x.id}
              className={cn('group relative flex flex-col', colunas[x.col], linhas[x.row])}
              initial={reduzido ? { opacity: 0 } : { opacity: 0, y: 40, rotate: x.rot * 3 }}
              whileInView={reduzido ? { opacity: 1 } : { opacity: 1, y: 0, rotate: x.rot }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileHover={reduzido ? undefined : { rotate: 0, scale: 1.02, zIndex: 5 }}
            >
              <div className="relative min-h-0 w-full flex-1 overflow-hidden border-[1.5px] border-[var(--border-forte)] shadow-[6px_6px_0_var(--surface-2)]">
                <Experimento kind={x.kind} />

                {/* etiqueta: some no hover pra não tapar o demo */}
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-[var(--bg)]/92 px-2.5 py-1.5 transition-opacity duration-300 group-hover:opacity-0">
                  <span className="mono text-[10px] font-semibold tracking-[0.16em]">{x.titulo}</span>
                  <span className="mono text-[9px] tracking-[0.14em]" style={{ color: 'var(--accent)' }}>
                    {x.tag}
                  </span>
                </figcaption>
              </div>

              <p className="mono mt-1.5 shrink-0 text-[9px] leading-tight tracking-[0.14em] opacity-55">{x.nota}</p>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
