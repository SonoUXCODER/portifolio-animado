'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { processo, type Etapa } from '@/data/process';
import { cadernoDe, folioDe, totalDeCadernos } from '@/data/arquivo';
import { Doodle, Seta } from './Doodles';
import { ScrollReveal } from './ScrollReveal';
import { useDesktop } from '@/hooks/useMedia';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   CADERNO 04 — COMO EU FAÇO. A dobradura.

   No desktop este caderno abre de lado: a página gruda na tela e as etapas
   passam na horizontal, como um encarte desdobrável. É a única parte do
   arquivo que anda de lado, e ganha isso porque processo é linha do tempo,
   não pilha.

   No celular a dobradura não cabe, então a mesma lista volta a descer, com
   a seta entre uma etapa e outra. Mesmo conteúdo, mesmo componente de ficha.
   ------------------------------------------------------------------------- */

function Ficha({ etapa, total }: { etapa: Etapa; total: number }) {
  return (
    <article className="relative flex w-full flex-col">
      <div className="mb-3 flex items-baseline gap-3 border-b border-[var(--linha)] pb-2">
        <span className="zine-titulo text-[clamp(2.2rem,5vw,4.2rem)] leading-none">{etapa.n}</span>
        <span className="mono text-[10px] tracking-[0.22em]" style={{ color: 'var(--tinta-3)' }}>
          /{String(total).padStart(2, '0')}
        </span>
        <Doodle nome={etapa.doodle} cor="var(--tinta)" tamanho={26} className="ml-auto shrink-0 opacity-70" />
      </div>

      <h3 className="zine-titulo--medio mb-3 text-[clamp(1.5rem,3.4vw,2.6rem)]">{etapa.titulo}</h3>
      <p className="corpo text-[clamp(0.9rem,1.2vw,1.05rem)]">{etapa.texto}</p>

      {etapa.shot && (
        <figure className="relative m-0 mt-6 border border-[var(--linha-forte)] bg-[var(--papel-2)]">
          <span className="fita -left-3 -top-2 rotate-[-7deg]" />
          <Image
            src={etapa.shot.src}
            alt={etapa.shot.alt}
            width={etapa.shot.width}
            height={etapa.shot.height}
            sizes="(max-width: 1024px) 88vw, 38vw"
            loading="lazy"
            className="aspect-[16/10] w-full object-cover object-top"
          />
        </figure>
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

  const caderno = cadernoDe('processo');
  const folio = folioDe('processo');

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
      <div className="cabeco">
        <span>
          {folio} — {caderno?.titulo}
        </span>
        <span className="hidden sm:inline" style={{ color: 'var(--tinta-3)' }}>
          {caderno?.chamada}
        </span>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="processo-titulo" className="zine-titulo--medio">
          COMO EU FAÇO
          <br />
          AS COISAS
        </h2>
        <p className="mono hidden items-center gap-3 text-[10px] tracking-[0.2em] lg:flex" style={{ color: 'var(--tinta-3)' }}>
          ENCARTE DESDOBRÁVEL <span aria-hidden="true">→</span> ROLA PRA ABRIR
        </p>
      </div>
    </div>
  );

  const pe = (
    <div className="envelope">
      <div className="folio">
        <span className="escala-cinza" aria-hidden="true">
          <i style={{ opacity: 0.15 }} />
          <i style={{ opacity: 0.35 }} />
          <i style={{ opacity: 0.55 }} />
          <i style={{ opacity: 0.75 }} />
          <i style={{ opacity: 1 }} />
        </span>
        <span>
          PÁG. {folio} / {totalDeCadernos}
        </span>
      </div>
    </div>
  );

  /* ---------------- celular e tablet: lista que desce ---------------- */
  if (!desktop) {
    return (
      <section id="processo" aria-labelledby="processo-titulo" className="pagina relative py-[clamp(44px,7vw,96px)]">
        {cabecalho}
        <div className="envelope mt-10 flex flex-col gap-9">
          {processo.map((etapa, i) => (
            <div key={etapa.n}>
              <ScrollReveal direcao={i % 2 ? 'direita' : 'esquerda'} giro={i % 2 ? 1.2 : -1.2}>
                <Ficha etapa={etapa} total={processo.length} />
              </ScrollReveal>
              {i < processo.length - 1 && (
                <div className="mt-7 flex justify-center" aria-hidden="true">
                  <span className="text-2xl leading-none" style={{ color: 'var(--tinta-3)' }}>
                    ↓
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        {pe}
      </section>
    );
  }

  /* ---------------- desktop: a dobradura ---------------- */
  return (
    <section id="processo" aria-labelledby="processo-titulo" className="pagina relative pb-[clamp(24px,4vw,56px)]">
      <div className="pt-[clamp(44px,7vw,96px)]">{cabecalho}</div>

      <div ref={alvo} style={{ height: `${processo.length * 62}vh` }}>
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <motion.div
            ref={trilho}
            className="flex items-start gap-[clamp(36px,5vw,84px)] px-[clamp(18px,5vw,76px)]"
            style={reduzido ? undefined : { x }}
          >
            {processo.map((etapa, i) => (
              <div key={etapa.n} className="flex shrink-0 items-start gap-[clamp(36px,5vw,84px)]">
                <div
                  className={cn('w-[clamp(290px,32vw,440px)]', i % 2 ? 'mt-[6vh]' : '-mt-[3vh]')}
                  style={{ transform: `rotate(${i % 2 ? 0.6 : -0.6}deg)` }}
                >
                  <Ficha etapa={etapa} total={processo.length} />
                </div>
                {i < processo.length - 1 && (
                  <Seta className="mt-24 shrink-0 opacity-35" cor="var(--tinta)" largura={100} />
                )}
              </div>
            ))}
          </motion.div>

          {/* trilhinho de progresso da dobradura */}
          <div
            className="absolute bottom-9 left-[clamp(18px,5vw,76px)] right-[clamp(18px,5vw,76px)] h-px"
            style={{ background: 'var(--linha)' }}
          >
            <motion.span className="block h-full origin-left" style={{ scaleX: suave, background: 'var(--tinta)' }} />
          </div>
        </div>
      </div>

      {pe}
    </section>
  );
}
