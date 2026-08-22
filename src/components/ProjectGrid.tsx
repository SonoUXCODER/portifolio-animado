'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { projects } from '@/data/projects';
import ProjectCard from './ProjectCard';
import Marquee from './Marquee';
import { ScrollReveal } from './ScrollReveal';
import { Seta } from './Doodles';

/* -------------------------------------------------------------------------
   A seção principal do site.

   O título é maior do que a tela de propósito: ele desliza na horizontal
   conforme a página rola, então quem chega lê "COISAS QUE EU FIZ" em
   movimento, como manchete de jornal passando.

   Cada projeto sai deslocado de um jeito diferente, com bastante ar entre
   eles — a lista tem que respirar como página de revista, não empilhar como
   feed.
   ------------------------------------------------------------------------- */

const deslocamentos = ['lg:ml-0', 'lg:ml-[6%]', 'lg:-ml-[2%]', 'lg:ml-[4%]'];

export default function ProjectGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const reduzido = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  /* o título é maior que a tela em qualquer largura, então ele sangra dos
     dois lados o tempo todo: o deslize lê como manchete passando, e não
     como um texto que estourou o contêiner sem querer */
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-13%']);

  return (
    <section id="projetos" className="relative py-[clamp(70px,11vw,150px)]">
      {/* ---------- cabeçalho gigante ---------- */}
      <div ref={ref} className="relative">
        <div className="envelope">
          <ScrollReveal direcao="esquerda" className="mb-3 flex items-center gap-4">
            <span className="zine-sub">01 — TRABALHO</span>
            <span className="h-[2px] flex-1" style={{ background: 'var(--border)' }} />
            <span className="zine-sub" style={{ color: 'var(--accent)' }}>
              {projects.length} PROJETOS
            </span>
          </ScrollReveal>
        </div>

        <div className="overflow-hidden">
          <motion.h2
            className="zine-titulo whitespace-nowrap text-[clamp(3.6rem,17vw,19rem)]"
            style={reduzido ? { paddingLeft: 'clamp(16px,4vw,64px)' } : { x }}
          >
            COISAS QUE EU FIZ
          </motion.h2>
        </div>

        <div className="envelope mt-6 flex items-start justify-between gap-6">
          <p className="corpo max-w-[42ch] text-[clamp(0.95rem,1.4vw,1.15rem)]">
            Site de cliente, produto próprio e umas coisas no meio do caminho. Tudo no ar, tudo escrito à mão.
          </p>
          <Seta className="hidden shrink-0 -rotate-12 opacity-60 lg:block" cor="var(--accent-2)" largura={150} />
        </div>
      </div>

      {/* ---------- os projetos ---------- */}
      <div className="envelope mt-[clamp(48px,7vw,96px)] flex flex-col gap-[clamp(80px,13vw,190px)]">
        {projects.map((p, i) => (
          <div key={p.slug} className={deslocamentos[i % deslocamentos.length]}>
            <ProjectCard p={p} indice={i} />
          </div>
        ))}
      </div>

      {/* ---------- faixa de fechamento ---------- */}
      <div className="mt-[clamp(60px,9vw,120px)]">
        <Marquee
          itens={['MAIS PROJETOS EM BREVE', 'SITE NO AR', 'FEITO À MÃO', 'SEM TEMPLATE', 'SEM TEMA PRONTO']}
          velocidade={40}
          separador="●"
        />
      </div>
    </section>
  );
}
