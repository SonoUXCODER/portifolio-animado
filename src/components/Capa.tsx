'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { site } from '@/data/site';
import { Asterisco, Seta } from './Doodles';
import { Parallax } from './ScrollReveal';

/* -------------------------------------------------------------------------
   A CAPA.

   Não é um hero de site: é a primeira folha do impresso. Por isso ela carrega
   o que uma capa carrega — nome da publicação, edição, data, chamada, e um
   código de barras no pé. A foto entra como clichê de capa: retícula por
   cima, tinta por baixo.
   ------------------------------------------------------------------------- */

const linhas = ['DESIGN', 'E CÓDIGO', 'NA MESMA'];

/* barras de largura irregular, geradas uma vez — nada de Math.random no
   render, que daria divergência entre servidor e cliente na hidratação */
const BARRAS = [3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 1, 2, 2, 1, 3, 1, 2, 1, 1, 2, 3, 1, 2, 1, 3, 2, 1];

export default function Capa() {
  const reduzido = useReducedMotion();

  const sobe = (i: number) => ({
    initial: reduzido ? { opacity: 0 } : { y: '112%' },
    animate: reduzido ? { opacity: 1 } : { y: '0%' },
    transition: { duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <header className="relative overflow-hidden pb-[clamp(28px,5vw,56px)] pt-[clamp(84px,11vw,132px)]">
      <div className="envelope relative">
        {/* ---------- linha de cabeçalho da publicação ---------- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="cabeco"
        >
          <span>ARQUIVO DE TRABALHO · EDIÇÃO 01</span>
          <span className="hidden sm:inline">SUÍÇA · 2026 · TIRAGEM ILIMITADA</span>
          <span className="sm:hidden">2026</span>
        </motion.div>

        <div className="grid grid-cols-12 items-start gap-y-8">
          {/* ---------- coluna do título ---------- */}
          <div className="col-span-12 lg:col-span-8">
            <h1 className="zine-titulo -ml-[0.05em]">
              {linhas.map((linha, i) => (
                <span key={linha} className="mascara-linha block">
                  <motion.span className="block" {...sobe(i)}>
                    {linha}
                  </motion.span>
                </span>
              ))}
              <span className="mascara-linha block">
                <motion.span className="block" {...sobe(3)}>
                  <span className="tarja">MÃO</span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="olho mt-7 max-w-[30ch] text-[clamp(1.05rem,2vw,1.6rem)]"
            >
              Sou o {site.name}. Desenho a interface, escrevo o código dela e assino as duas coisas.
            </motion.p>
          </div>

          {/* ---------- clichê de capa ---------- */}
          <div className="col-span-12 sm:col-span-7 lg:col-span-4 lg:pl-6">
            <Parallax forca={reduzido ? 0 : 26} className="relative w-full max-w-[300px] lg:ml-auto">
              <motion.figure
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative m-0"
              >
                <div className="relative border border-[var(--linha-forte)]" data-cursor="olhar">
                  <Image
                    src="/assets/foto-cracha.webp"
                    alt={`Retrato de ${site.name}`}
                    width={620}
                    height={827}
                    priority
                    sizes="(max-width: 640px) 80vw, 300px"
                    className="w-full [filter:grayscale(1)_contrast(1.22)]"
                  />
                  {/* a retícula transforma a foto em clichê de jornal */}
                  <span className="reticula" aria-hidden="true" style={{ color: 'var(--tinta)' }} />
                </div>
                <figcaption className="mono mt-2 flex items-center justify-between text-[9px] tracking-[0.18em]" style={{ color: 'var(--tinta-3)' }}>
                  <span>FIG. 0 — O AUTOR</span>
                  <span>{site.handle}</span>
                </figcaption>
              </motion.figure>
            </Parallax>
          </div>
        </div>

        {/* ---------- pé de capa: código de barras + chamada ---------- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-[clamp(32px,5vw,64px)] flex flex-wrap items-end justify-between gap-x-8 gap-y-6 border-t border-[var(--linha)] pt-4"
        >
          <div className="flex items-end gap-4">
            <span className="flex h-9 items-end gap-[2px]" aria-hidden="true">
              {BARRAS.map((largura, i) => (
                <i key={i} className="block h-full" style={{ width: largura, background: 'var(--tinta)' }} />
              ))}
            </span>
            <span className="mono text-[10px] tracking-[0.2em]" style={{ color: 'var(--tinta-3)' }}>
              ED.01
            </span>
          </div>

          <a href="#sumario" className="group flex items-center gap-3" data-cursor="ver">
            <span className="zine-sub">COMEÇAR A FOLHEAR</span>
            <motion.span
              aria-hidden="true"
              className="inline-block text-xl leading-none"
              animate={reduzido ? undefined : { y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              ↓
            </motion.span>
          </a>

          <p className="hand flex w-full items-center gap-2 text-[clamp(20px,2.4vw,26px)] sm:w-auto" style={{ color: 'var(--tinta-2)' }}>
            <Asterisco cor="var(--tinta-2)" tamanho={16} />
            do figma até o deploy, sem escala
          </p>
        </motion.div>

        <Seta className="pointer-events-none absolute -bottom-2 right-[26%] hidden rotate-[12deg] opacity-25 xl:block" cor="var(--tinta)" largura={130} />
      </div>
    </header>
  );
}
