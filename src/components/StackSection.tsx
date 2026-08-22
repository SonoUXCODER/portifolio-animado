'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { stack, type Tool } from '@/data/stack';
import { Doodle } from './Doodles';
import { ScrollReveal } from './ScrollReveal';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   "FERRAMENTAS QUE EU USO".

   Uma lista só no HTML. No desktop o CSS joga cada item pra uma coordenada
   escolhida na mão (data/stack.ts) e o resultado parece folha de anotação;
   no celular isso viraria sopa, então a mesma lista volta a ser lista.

   As notinhas ficam em opacity 0 até o hover — opacity não tira o texto da
   árvore de acessibilidade, então leitor de tela continua lendo tudo.
   ------------------------------------------------------------------------- */

const tamanhos: Record<Tool['peso'], string> = {
  1: 'text-[clamp(1.1rem,2.4vw,1.9rem)]',
  2: 'text-[clamp(1.5rem,3.6vw,2.9rem)]',
  3: 'text-[clamp(2rem,5vw,4.2rem)]',
};

function Ferramenta({ t, indice }: { t: Tool; indice: number }) {
  const reduzido = useReducedMotion();
  const [sobre, setSobre] = useState(false);
  const cor = t.cor ?? 'var(--text)';

  return (
    <motion.div
      className="relative inline-flex select-none flex-col items-start"
      style={{ rotate: reduzido ? 0 : t.rot }}
      onHoverStart={() => setSobre(true)}
      onHoverEnd={() => setSobre(false)}
      whileHover={reduzido ? undefined : { x: indice % 2 ? 8 : -8, y: -6, rotate: t.rot * -0.6 }}
      transition={{ type: 'spring', stiffness: 320, damping: 20 }}
    >
      {/* o desenhinho só nasce no hover */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8"
        initial={false}
        animate={sobre ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.4, rotate: -25 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      >
        <Doodle nome={t.doodle} cor={cor} tamanho={38} />
      </motion.span>

      <span
        className={cn(
          'zine-titulo block leading-[0.9] transition-[transform,color] duration-300',
          tamanhos[t.peso],
          sobre && 'scale-[1.08]',
        )}
        style={{ color: sobre ? cor : 'var(--text)', transformOrigin: 'left center' }}
      >
        {t.label}
      </span>

      <motion.span
        /* no celular não existe hover: a notinha fica sempre visível */
        className="mono block text-[10px] tracking-[0.2em] max-lg:!opacity-100"
        style={{ color: 'var(--text-2)' }}
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
    <section id="stack" className="relative overflow-hidden py-[clamp(70px,10vw,140px)]">
      <div className="envelope">
        <ScrollReveal direcao="direita" className="mb-4 flex items-center gap-4">
          <span className="zine-sub">02 — CAIXA DE FERRAMENTAS</span>
          <span className="h-[2px] flex-1" style={{ background: 'var(--border)' }} />
        </ScrollReveal>

        <h2 className="zine-titulo--medio mb-3">
          FERRAMENTAS
          <br />
          <span className="circulado">QUE EU USO</span>
        </h2>
        <p className="corpo mb-10 text-[clamp(0.95rem,1.3vw,1.1rem)]">
          Cada uma tem uma história curta.<span className="hidden lg:inline"> Passa o mouse pra ler.</span>
        </p>

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
            className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-25 lg:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <g fill="none" stroke="var(--text)" strokeWidth="0.18" strokeLinecap="round" strokeDasharray="1.4 1.6">
              <path d="M12 14 46 8 68 22" />
              <path d="M18 34 54 42 76 52" />
              <path d="M12 60 38 68 64 76" />
              <path d="M20 84 48 92 84 86" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
