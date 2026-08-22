'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { projects } from '@/data/projects';
import { cadernoDe, folioDe } from '@/data/arquivo';
import Folio from './Folio';
import ProjectCard from './ProjectCard';
import Marquee from './Marquee';
import { ScrollReveal } from './ScrollReveal';
import { Seta } from './Doodles';

/* -------------------------------------------------------------------------
   CADERNO 02 — O QUE EU FIZ. O caderno central do arquivo.

   Não usa <Pagina> porque a manchete precisa sangrar nos dois lados da
   folha, e o envelope do componente conteria ela. O cabeço e o fólio são
   montados aqui na mão, com os mesmos dados de data/arquivo.ts.

   O título é maior que a folha em qualquer largura, então ele sangra dos
   dois lados o tempo todo: o deslize lê como manchete passando, e não como
   um texto que estourou o contêiner sem querer.
   ------------------------------------------------------------------------- */

const deslocamentos = ['lg:ml-0', 'lg:ml-[5%]', 'lg:-ml-[2%]', 'lg:ml-[3%]', 'lg:ml-[1%]'];

export default function ProjectGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const reduzido = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-13%']);

  const caderno = cadernoDe('projetos');
  const folio = folioDe('projetos');

  return (
    <section id="projetos" aria-labelledby="projetos-titulo" className="pagina relative py-[clamp(44px,7vw,96px)]">
      {/* ---------- manchete ---------- */}
      <div ref={ref} className="relative">
        <div className="envelope">
          <div className="cabeco">
            <span>
              {folio} — {caderno?.titulo}
            </span>
            <span className="hidden sm:inline" style={{ color: 'var(--tinta-3)' }}>
              {projects.length} TRABALHOS · CHAPAS EM COR
            </span>
          </div>
        </div>

        <div className="overflow-hidden">
          <motion.h2
            id="projetos-titulo"
            className="zine-titulo whitespace-nowrap text-[clamp(3.2rem,16vw,18rem)]"
            style={reduzido ? { paddingLeft: 'clamp(18px,5vw,76px)' } : { x }}
          >
            O QUE EU FIZ
          </motion.h2>
        </div>

        <div className="envelope mt-6 flex items-start justify-between gap-6">
          <p className="olho max-w-[40ch] text-[clamp(1rem,1.6vw,1.3rem)]">
            Site de cliente, produto próprio e a loja de uma artista. Tudo no ar, tudo escrito à mão —
            e cada um com o estudo de caso inteiro aqui dentro.
          </p>
          <Seta className="hidden shrink-0 -rotate-12 opacity-40 lg:block" cor="var(--tinta)" largura={140} />
        </div>
      </div>

      {/* ---------- os projetos ---------- */}
      <div className="envelope mt-[clamp(44px,7vw,96px)] flex flex-col gap-[clamp(72px,12vw,170px)]">
        {projects.map((p, i) => (
          <div key={p.slug} className={deslocamentos[i % deslocamentos.length]}>
            <ProjectCard p={p} indice={i} />
          </div>
        ))}
      </div>

      <div className="mt-[clamp(52px,8vw,110px)]">
        <Marquee
          itens={['CADA UM COM ESTUDO DE CASO', 'SEM TEMPLATE', 'SEM TEMA PRONTO', 'TUDO NO AR']}
          velocidade={40}
          separador="·"
        />
      </div>

      <div className="envelope">
        <Folio id="projetos" />
      </div>
    </section>
  );
}
