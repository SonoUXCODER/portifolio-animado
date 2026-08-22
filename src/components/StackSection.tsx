'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { stack, type Tool } from '@/data/stack';
import Pagina from './Pagina';
import { Doodle } from './Doodles';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   CADERNO 03 — A OFICINA.

   Uma lista só no HTML. No desktop o CSS joga cada item pra uma coordenada
   escolhida na mão (data/stack.ts) e o resultado parece a bancada vista de
   cima; no celular isso viraria sopa, então a mesma lista volta a ser lista.

   As notinhas ficam em opacity 0 até o hover — opacity não tira o texto da
   árvore de acessibilidade, então leitor de tela continua lendo tudo. No
   celular, onde hover não existe, elas ficam sempre visíveis.
   ------------------------------------------------------------------------- */

const tamanhos: Record<Tool['peso'], string> = {
  1: 'text-[clamp(1.05rem,2.2vw,1.8rem)]',
  2: 'text-[clamp(1.4rem,3.4vw,2.7rem)]',
  3: 'text-[clamp(1.9rem,4.6vw,3.9rem)]',
};

function Ferramenta({ t, indice }: { t: Tool; indice: number }) {
  const reduzido = useReducedMotion();
  const [sobre, setSobre] = useState(false);

  return (
    <motion.div
      className="relative inline-flex select-none flex-col items-start"
      style={{ rotate: reduzido ? 0 : t.rot }}
      onHoverStart={() => setSobre(true)}
      onHoverEnd={() => setSobre(false)}
      whileHover={reduzido ? undefined : { x: indice % 2 ? 7 : -7, y: -5, rotate: t.rot * -0.6 }}
      transition={{ type: 'spring', stiffness: 320, damping: 20 }}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8"
        initial={false}
        animate={sobre ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.4, rotate: -25 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      >
        <Doodle nome={t.doodle} cor="var(--tinta)" tamanho={34} />
      </motion.span>

      <span
        className={cn(
          'zine-titulo block leading-[0.9] transition-transform duration-300',
          tamanhos[t.peso],
          sobre && 'scale-[1.06]',
        )}
        style={{ transformOrigin: 'left center' }}
      >
        {t.label}
      </span>

      <motion.span
        /* no celular não existe hover: a notinha fica sempre visível */
        className="mono block text-[10px] tracking-[0.2em] max-lg:!opacity-100"
        style={{ color: 'var(--tinta-3)' }}
        initial={false}
        animate={sobre ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
        transition={{ duration: 0.2 }}
      >
        {t.nota}
      </motion.span>
    </motion.div>
  );
}

export default function StackSection() {
  return (
    <Pagina id="stack" className="overflow-hidden py-[clamp(44px,7vw,96px)]">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <h2 id="stack-titulo" className="zine-titulo--medio">
          A <span className="circulado">OFICINA</span>
        </h2>
        <p className="olho max-w-[34ch] text-[clamp(0.95rem,1.4vw,1.15rem)]">
          Doze ferramentas, nenhuma escolhida por moda. Cada uma tem uma história curta.
          <span className="hidden lg:inline"> Passa o mouse pra ler.</span>
        </p>
      </div>

      <div className="relative">
        <ul className="palco-stack flex flex-wrap items-end gap-x-7 gap-y-6">
          {stack.map((t, i) => (
            <li key={t.label} style={{ ['--x' as string]: `${t.x}%`, ['--y' as string]: `${t.y}%` }}>
              <Ferramenta t={t} indice={i} />
            </li>
          ))}
        </ul>

        {/* linhas soltas ligando umas às outras, como diagrama de caderno */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-20 lg:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <g fill="none" stroke="var(--tinta)" strokeWidth="0.16" strokeLinecap="round" strokeDasharray="1.4 1.6">
            <path d="M12 14 46 8 68 22" />
            <path d="M18 34 54 42 76 52" />
            <path d="M12 60 38 68 64 76" />
            <path d="M20 84 48 92 84 86" />
          </g>
        </svg>
      </div>
    </Pagina>
  );
}
