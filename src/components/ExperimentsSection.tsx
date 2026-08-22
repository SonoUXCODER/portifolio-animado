'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { experiments } from '@/data/experiments';
import Pagina from './Pagina';
import Experimento from './Experimento';
import { Traquinhos } from './Doodles';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   CADERNO 05 — A GAVETA.

   As sobras. Grid de propósito desalinhada: cada quadro pega um número
   diferente de colunas e de linhas, e nenhum deles fica reto. O auto-flow
   denso preenche os buracos que os tamanhos diferentes deixariam na direita.

   Cada quadro roda de verdade nesta página. Nenhum print, nenhum vídeo.
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
    <Pagina id="experimentos" className="py-[clamp(44px,7vw,96px)]">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <h2 id="experimentos-titulo" className="zine-titulo--medio">
          A GAVETA
        </h2>
        <div className="flex items-end gap-5">
          <p className="olho max-w-[32ch] text-[clamp(0.92rem,1.3vw,1.1rem)]">
            Coisa pequena que testei e não virou projeto. Tudo aqui roda de verdade nesta página —
            nenhum print, nenhum vídeo.
          </p>
          <Traquinhos cor="var(--tinta)" className="hidden shrink-0 opacity-50 sm:block" />
        </div>
      </div>

      {/* auto-flow denso: os quadros têm tamanhos diferentes e sem isto a
          grid deixa buracos de uma coluna inteira na direita */}
      <div className="grid auto-rows-[82px] grid-flow-row-dense grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-4">
        {experiments.map((x, i) => (
          <motion.figure
            key={x.id}
            className={cn('group relative flex flex-col', colunas[x.col], linhas[x.row])}
            initial={reduzido ? { opacity: 0 } : { opacity: 0, y: 34, rotate: x.rot * 3 }}
            whileInView={reduzido ? { opacity: 1 } : { opacity: 1, y: 0, rotate: x.rot }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: (i % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={reduzido ? undefined : { rotate: 0, scale: 1.015, zIndex: 5 }}
          >
            <div className="relative min-h-0 w-full flex-1 overflow-hidden border border-[var(--linha-forte)]" data-pausa>
              <Experimento kind={x.kind} />

              {/* etiqueta: some no hover pra não tapar o demo */}
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-[var(--papel)]/90 px-2.5 py-1.5 transition-opacity duration-300 group-hover:opacity-0">
                <span className="mono text-[10px] font-semibold tracking-[0.16em]">{x.titulo}</span>
                <span className="mono text-[9px] tracking-[0.14em]" style={{ color: 'var(--tinta-3)' }}>
                  {x.tag}
                </span>
              </figcaption>
            </div>

            <p className="mono mt-1.5 shrink-0 text-[9px] leading-tight tracking-[0.14em]" style={{ color: 'var(--tinta-3)' }}>
              {x.nota}
            </p>
          </motion.figure>
        ))}
      </div>
    </Pagina>
  );
}
