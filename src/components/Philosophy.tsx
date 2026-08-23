'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Lines, Reveal } from './Reveal';
import { useT } from './ContentProvider';

/* -------------------------------------------------------------------------
   FILOSOFIA.

   A única tela clara do site, e é por isso que ela funciona. Depois de sete
   capítulos numa sala escura, inverter a página inteira por uma tela é mais
   forte do que qualquer animação que eu pudesse colocar aqui — o olho
   registra a virada antes de ler a primeira palavra.

   A inversão é local: as variáveis de cor são redefinidas no escopo desta
   seção, então tudo que estiver dentro (rótulo, filete, texto) acompanha
   sem precisar saber que está invertido. É a razão de os tokens existirem.

   Não é seção numerada de propósito. É um intervalo — como as esculturas —
   e intervalo não entra em navegação: ninguém clica em "filosofia" num
   menu, mas todo mundo passa por ela rolando.
   ------------------------------------------------------------------------- */

export default function Philosophy() {
  const t = useT();
  const ref = useRef<HTMLElement>(null);
  const reduzido = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section
      ref={ref}
      aria-labelledby="philosophy-title"
      className="w-full overflow-clip py-[var(--space-10)]"
      style={
        {
          /* a inversão inteira em cinco linhas: tudo que está dentro lê
             estes valores em vez dos do :root */
          background: '#f2f0eb',
          '--text-primary': '#0a0a0a',
          '--text-secondary': '#575450',
          '--text-tertiary': '#6f6b66',
          '--line': 'rgba(10, 10, 10, 0.14)',
          '--line-strong': 'rgba(10, 10, 10, 0.3)',
          color: '#0a0a0a',
        } as React.CSSProperties
      }
    >
      <motion.div className="shell" style={reduzido ? undefined : { y }}>
        <p className="index-line">
          <span style={{ color: 'var(--text-primary)' }}>{t.philosophy.label}</span>
          <span className="index-line__rule" aria-hidden="true" />
        </p>

        <div className="grid-12 mt-[var(--space-8)] gap-y-[var(--space-7)]">
          <div className="col-span-12 lg:col-span-8">
            <Lines lines={t.philosophy.lines} as="h2" className="display-xl" />
            <span id="philosophy-title" className="sr-only">
              {t.philosophy.label}
            </span>
          </div>

          <div className="col-span-12 md:col-span-8 lg:col-span-3 lg:col-start-10 lg:self-end">
            <Reveal delay={0.1}>
              <p className="body">
                {t.philosophy.text}
              </p>
            </Reveal>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
