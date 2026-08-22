'use client';

import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import type { Project } from '@/data/projects';
import { TransitionLink } from './PageTransition';
import { MaskReveal, Parallax } from './ScrollReveal';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   Um projeto no arquivo.

   Não é card: é uma composição de página que muda de forma conforme
   `project.layout`. As imagens são a única cor do impresso — tudo em volta
   é tinta — então elas entram inteiras, sem filtro, e o resto se comporta.

   No hover: a chapa cresce um fio, gira um grau, o título anda pro lado e a
   palavra ABRIR aparece. 0.4s, sem festa.
   ------------------------------------------------------------------------- */

function Abrir({ classe }: { classe?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute z-10 flex items-center gap-2 px-4 py-2 opacity-0 transition-all duration-300',
        'translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100',
        classe,
      )}
      style={{ background: 'var(--tinta-base)', color: 'var(--papel-base)' }}
    >
      <span className="mono text-[11px] tracking-[0.24em]">ABRIR</span>
      <span className="text-sm">↗</span>
    </span>
  );
}

function Chapa({ children, className, tilt }: { children: React.ReactNode; className?: string; tilt: number }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden border border-[var(--linha-forte)] bg-[var(--papel-2)]',
        'transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
        'group-hover:[transform:scale(1.015)_rotate(var(--tilt))]',
        'group-focus-visible:[transform:scale(1.015)_rotate(var(--tilt))]',
        'motion-reduce:!transform-none',
        className,
      )}
      style={{ ['--tilt' as string]: `${tilt * 0.6}deg` }}
    >
      {children}
    </div>
  );
}

/* ---------- ficha: número, nome, frase, techs ---------- */

function Ficha({
  p,
  num,
  className,
  alinhar = 'esquerda',
}: {
  p: Project;
  num: string;
  className?: string;
  alinhar?: 'esquerda' | 'direita';
}) {
  return (
    <div className={cn('relative', className)}>
      <div className={cn('flex items-baseline gap-3', alinhar === 'direita' && 'lg:justify-end')}>
        <span className="zine-titulo text-[clamp(1.8rem,3.6vw,3rem)] leading-none transition-transform duration-300 group-hover:-rotate-6">
          {num}
        </span>
        {p.selo && <span className="carimbo shrink-0">{p.selo}</span>}
        <span className="mono text-[10px] tracking-[0.2em]" style={{ color: 'var(--tinta-3)' }}>
          {p.year}
        </span>
      </div>

      <h3
        className="desregistro zine-titulo--medio mt-1 text-[clamp(1.7rem,4.4vw,3.2rem)] transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2"
        data-texto={p.title}
      >
        {p.title}
      </h3>

      <p className={cn('corpo mt-3 text-[clamp(0.92rem,1.25vw,1.05rem)]', alinhar === 'direita' && 'lg:ml-auto')}>
        {p.description}
      </p>

      <ul className={cn('mt-4 flex flex-wrap gap-x-2 gap-y-1', alinhar === 'direita' && 'lg:justify-end')}>
        {p.technologies.map((t, i) => (
          <li key={t} className="zine-sub" style={{ color: 'var(--tinta-3)' }}>
            {t}
            {i < p.technologies.length - 1 && <span className="ml-2 opacity-50">/</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- as ações ficam fora do <a> do card ---------- */

function Acoes({ p }: { p: Project }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
      {/* a ação principal leva pra dentro do arquivo, não pra fora dele */}
      <TransitionLink href={`/projetos/${p.slug}`} className="botao" cursor="ver">
        ESTUDO DE CASO <span aria-hidden="true">→</span>
      </TransitionLink>
      {p.github ? (
        <a href={p.github} target="_blank" rel="noopener noreferrer" className="botao botao--vazio" data-cursor="abrir">
          VER O CÓDIGO <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <span className="mono text-[10px] tracking-[0.18em]" style={{ color: 'var(--tinta-3)' }}>
          REPO FECHADO · CLIENTE
        </span>
      )}
    </div>
  );
}

export default function ProjectCard({ p, indice }: { p: Project; indice: number }) {
  const reduzido = useReducedMotion();
  const parallax = reduzido ? 0 : 32;
  const num = String(indice + 1).padStart(2, '0');

  const capa = (
    <>
      <Image
        src={p.image.src}
        alt={p.image.alt}
        width={p.image.width}
        height={p.image.height}
        sizes={p.layout === 'full' ? '(max-width: 1024px) 92vw, 74vw' : '(max-width: 1024px) 88vw, 40vw'}
        loading={indice === 0 ? 'eager' : 'lazy'}
        priority={indice === 0}
        className="h-full w-full object-cover object-top transition-[filter] duration-300 group-hover:brightness-105"
      />
      <Abrir classe="bottom-4 right-4" />
    </>
  );

  /* ===================== imagem gigante, sangrando ===================== */
  if (p.layout === 'full') {
    return (
      <article className="relative">
        <TransitionLink href={`/projetos/${p.slug}`} className="group block" cursor="ver">
          <div className="grid grid-cols-12 items-end gap-y-4">
            <div className="col-span-12 lg:col-span-6">
              <Ficha p={p} num={num} />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <p className="mono hidden justify-end text-[10px] tracking-[0.2em] lg:flex" style={{ color: 'var(--tinta-3)' }}>
                FIG. {num} — CHAPA INTEIRA
              </p>
            </div>
          </div>

          {/* sangra na margem da folha de propósito */}
          <MaskReveal className="mt-6 lg:-mr-[clamp(18px,5vw,76px)]">
            <Chapa tilt={p.tilt} className="aspect-[16/9] w-full">
              {capa}
            </Chapa>
          </MaskReveal>
        </TransitionLink>
        <Acoes p={p} />
      </article>
    );
  }

  /* ============ imagem pequena deslocada pra direita ============ */
  if (p.layout === 'small-right') {
    return (
      <article className="relative">
        <TransitionLink href={`/projetos/${p.slug}`} className="group block" cursor="ver">
          <div className="grid grid-cols-12 items-center gap-y-8">
            <div className="col-span-12 lg:col-span-5 lg:pr-6">
              <Ficha p={p} num={num} />
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-8">
              <Parallax forca={parallax} className="relative">
                <MaskReveal direcao="esquerda">
                  <Chapa tilt={p.tilt} className="aspect-[4/3] w-full">
                    {capa}
                  </Chapa>
                </MaskReveal>
                {p.gallery[0]?.nota && (
                  <p className="hand mt-3 text-[clamp(19px,2vw,23px)]" style={{ color: 'var(--tinta-2)' }}>
                    {p.gallery[0].nota}
                  </p>
                )}
              </Parallax>
            </div>
          </div>
        </TransitionLink>
        <Acoes p={p} />
      </article>
    );
  }

  /* ===================== print vertical ===================== */
  if (p.layout === 'vertical') {
    return (
      <article className="relative">
        <TransitionLink href={`/projetos/${p.slug}`} className="group block" cursor="ver">
          <div className="grid grid-cols-12 items-center gap-y-8">
            <div className="order-2 col-span-12 sm:col-span-7 lg:order-1 lg:col-span-4">
              <Parallax forca={parallax * 1.3} rotacao={reduzido ? 0 : 1}>
                <MaskReveal>
                  <Chapa tilt={p.tilt} className="aspect-[3/7] w-full">
                    {capa}
                  </Chapa>
                </MaskReveal>
              </Parallax>
            </div>

            <div className="order-1 col-span-12 lg:order-2 lg:col-span-7 lg:col-start-6">
              <Ficha p={p} num={num} />
              {p.gallery[0]?.nota && (
                <p className="hand mt-4 text-[clamp(20px,2.2vw,26px)]" style={{ color: 'var(--tinta-2)' }}>
                  {p.gallery[0].nota}
                </p>
              )}
            </div>
          </div>
        </TransitionLink>
        <Acoes p={p} />
      </article>
    );
  }

  /* ===================== duas imagens ===================== */
  const segunda = p.gallery[1] ?? p.image;
  return (
    <article className="relative">
      <TransitionLink href={`/projetos/${p.slug}`} className="group block" cursor="ver">
        {/* Atenção às colunas: 7 + 4 + 4 estouraria as 12 e jogaria a ficha
            pra uma linha sozinha lá embaixo. Por isso os dois últimos blocos
            têm col-start explícito — a segunda imagem cai na linha de baixo
            e sobe pela margem negativa, sobrepondo. */}
        <div className="grid grid-cols-12 items-start gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <MaskReveal>
              <Chapa tilt={p.tilt} className="aspect-[16/10] w-full">
                {capa}
              </Chapa>
            </MaskReveal>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <Ficha p={p} num={num} />
          </div>

          <div className="col-span-9 col-start-4 sm:col-span-6 sm:col-start-6 lg:col-span-4 lg:col-start-6 lg:-mt-[9vw]">
            <Parallax forca={reduzido ? 0 : -36}>
              <MaskReveal atraso={0.12}>
                <Chapa tilt={-p.tilt} className="aspect-[3/5] w-full">
                  <Image
                    src={segunda.src}
                    alt={segunda.alt}
                    width={segunda.width}
                    height={segunda.height}
                    sizes="(max-width: 1024px) 60vw, 28vw"
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-[filter] duration-300 group-hover:brightness-105"
                  />
                </Chapa>
              </MaskReveal>
            </Parallax>
          </div>
        </div>
      </TransitionLink>
      <Acoes p={p} />
    </article>
  );
}
