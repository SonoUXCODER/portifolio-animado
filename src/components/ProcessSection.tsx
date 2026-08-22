'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { processo, type Etapa } from '@/data/process';
import { Doodle, Seta } from './Doodles';
import { ScrollReveal } from './ScrollReveal';
import { useDesktop } from '@/hooks/useMedia';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   "COMO EU FAÇO AS COISAS".

   No desktop a seção gruda na tela e as etapas passam de lado enquanto a
   página rola — é a única parte do site que anda na horizontal, e ela ganha
   isso porque processo é linha do tempo, não pilha.

   No celular a mesma lista volta a descer, com a seta entre uma etapa e
   outra. Mesmo conteúdo, mesmo componente de cartão.
   ------------------------------------------------------------------------- */

function Cartao({ etapa, i, total }: { etapa: Etapa; i: number; total: number }) {
  return (
    <article className="relative flex w-full flex-col">
      <div className="mb-3 flex items-baseline gap-3">
        <span className="zine-titulo text-[clamp(2.6rem,6vw,5rem)] leading-none" style={{ color: 'var(--accent)' }}>
          {etapa.n}
        </span>
        <span className="mono text-[10px] tracking-[0.24em] opacity-45">
          /{String(total).padStart(2, '0')}
        </span>
        <Doodle nome={etapa.doodle} cor="var(--ice)" tamanho={30} className="ml-auto shrink-0" />
      </div>

      <h3 className="zine-titulo--medio mb-3">{etapa.titulo}</h3>
      <p className="corpo text-[clamp(0.95rem,1.3vw,1.1rem)]">{etapa.texto}</p>

      {etapa.shot && (
        <div
          className="relative mt-6 border-[1.5px] border-[var(--border-forte)] bg-[var(--surface-2)]"
          style={{ boxShadow: '7px 7px 0 var(--bg)' }}
        >
          <span className="fita -left-3 -top-2 rotate-[-7deg]" />
          <Image
            src={etapa.shot.src}
            alt={etapa.shot.alt}
            width={etapa.shot.width}
            height={etapa.shot.height}
            sizes="(max-width: 1024px) 88vw, 40vw"
            loading="lazy"
            className="aspect-[16/10] w-full object-cover object-top"
          />
        </div>
      )}
    </article>
  );
}

export default function ProcessSection() {
  const desktop = useDesktop();
  const reduzido = useReducedMotion();
  const alvo = useRef<HTMLDivElement>(null);
  const trilho = useRef<HTMLDivElement>(null);
  const [curso, setCurso] = useState(0);

  /* o alvo só existe no ramo do desktop; passar a ref antes de ela ser
     montada faz o motion reclamar de ref não hidratada */
  const { scrollYProgress } = useScroll({
    target: desktop ? alvo : undefined,
    offset: ['start start', 'end end'],
  });
  const suave = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(suave, [0, 1], [0, -curso]);

  /* quanto o trilho precisa andar = o que sobra dele fora da tela */
  useEffect(() => {
    if (!desktop) return;
    const medir = () => {
      const el = trilho.current;
      if (!el) return;
      setCurso(Math.max(0, el.scrollWidth - window.innerWidth + 96));
    };
    medir();
    window.addEventListener('resize', medir);
    return () => window.removeEventListener('resize', medir);
  }, [desktop]);

  const cabecalho = (
    <div className="envelope">
      <ScrollReveal direcao="esquerda" className="mb-4 flex items-center gap-4">
        <span className="zine-sub">03 — MÉTODO</span>
        <span className="h-[2px] flex-1" style={{ background: 'var(--border)' }} />
      </ScrollReveal>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="zine-titulo--medio">
          COMO EU FAÇO
          <br />
          AS COISAS
        </h2>
        <p className="mono hidden items-center gap-3 text-[11px] tracking-[0.2em] opacity-55 lg:flex">
          ROLA <span aria-hidden="true">→</span> AS ETAPAS ANDAM DE LADO
        </p>
      </div>
    </div>
  );

  /* ---------------- celular e tablet: lista que desce ---------------- */
  if (!desktop) {
    return (
      <section id="processo" className="invertido relative py-[clamp(70px,10vw,140px)]">
        <span aria-hidden="true" className="rasgo absolute inset-x-0 top-0 rotate-180" style={{ color: 'var(--bg)' }} />
        <span aria-hidden="true" className="rasgo absolute inset-x-0 bottom-0" style={{ color: 'var(--bg)' }} />
        {cabecalho}
        <div className="envelope mt-12 flex flex-col gap-10">
          {processo.map((etapa, i) => (
            <div key={etapa.n}>
              <ScrollReveal direcao={i % 2 ? 'direita' : 'esquerda'} giro={i % 2 ? 1.5 : -1.5}>
                <Cartao etapa={etapa} i={i} total={processo.length} />
              </ScrollReveal>
              {i < processo.length - 1 && (
                <div className="mt-8 flex justify-center" aria-hidden="true">
                  <span className="text-3xl leading-none opacity-45">↓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* ---------------- desktop: seção presa, etapas de lado ---------------- */
  return (
    <section id="processo" className="invertido relative pb-[clamp(30px,4vw,60px)]">
      <span aria-hidden="true" className="rasgo absolute inset-x-0 top-0 z-10 rotate-180" style={{ color: 'var(--bg)' }} />
      <span aria-hidden="true" className="rasgo absolute inset-x-0 bottom-0 z-10" style={{ color: 'var(--bg)' }} />
      <div className="pt-[clamp(70px,10vw,140px)]">{cabecalho}</div>

      <div ref={alvo} style={{ height: `${processo.length * 62}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div
            ref={trilho}
            className="flex items-start gap-[clamp(40px,5vw,90px)] px-[clamp(16px,4vw,64px)]"
            style={reduzido ? undefined : { x }}
          >
            {processo.map((etapa, i) => (
              <div key={etapa.n} className="flex shrink-0 items-start gap-[clamp(40px,5vw,90px)]">
                <div
                  className={cn('w-[clamp(300px,34vw,470px)]', i % 2 ? 'mt-[6vh]' : '-mt-[3vh]')}
                  style={{ transform: `rotate(${i % 2 ? 0.8 : -0.8}deg)` }}
                >
                  <Cartao etapa={etapa} i={i} total={processo.length} />
                </div>
                {i < processo.length - 1 && (
                  <Seta className="mt-24 shrink-0 opacity-45" cor="var(--text)" largura={110} />
                )}
              </div>
            ))}
          </motion.div>

          {/* trilhinho de progresso da horizontal */}
          <div className="absolute bottom-10 left-[clamp(16px,4vw,64px)] right-[clamp(16px,4vw,64px)] h-[2px]" style={{ background: 'var(--border)' }}>
            <motion.span className="block h-full origin-left" style={{ scaleX: suave, background: 'var(--accent)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
