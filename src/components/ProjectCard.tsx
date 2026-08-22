'use client';

import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import type { Project } from '@/data/projects';
import { TransitionLink } from './PageTransition';
import { MaskReveal, Parallax } from './ScrollReveal';
import { Asterisco } from './Doodles';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   Um projeto na home.

   Não é card: é uma composição editorial que muda de forma conforme
   `project.layout`. O que se repete é o comportamento — imagem cresce um
   pouco, gira um grau, o título anda pro lado, a palavra ABRIR aparece e o
   xerox estoura o contraste. Tudo curtinho, 0.4s, sem festa.
   ------------------------------------------------------------------------- */

function Abrir({ classe }: { classe?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute z-10 flex items-center gap-2 border-2 px-4 py-2 opacity-0 transition-all duration-300',
        'translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100',
        classe,
      )}
      style={{ background: 'var(--text)', color: 'var(--bg)', borderColor: 'var(--text)' }}
    >
      <span className="mono text-[11px] tracking-[0.24em]">ABRIR</span>
      <span className="text-sm">↗</span>
    </span>
  );
}

function Moldura({
  children,
  className,
  tilt,
  sombra = 'var(--surface-2)',
}: {
  children: React.ReactNode;
  className?: string;
  tilt: number;
  sombra?: string;
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden border-[1.5px] border-[var(--border-forte)] bg-[var(--surface)]',
        'transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
        'group-hover:[transform:scale(1.02)_rotate(var(--tilt))]',
        'group-focus-visible:[transform:scale(1.02)_rotate(var(--tilt))]',
        'motion-reduce:!transform-none',
        className,
      )}
      style={{ boxShadow: `9px 9px 0 ${sombra}`, ['--tilt' as string]: `${tilt * 0.6}deg` }}
    >
      {children}
    </div>
  );
}

/* ---------- metadados: número, nome, frase, techs ---------- */

function Meta({ p, className, alinhar = 'esquerda' }: { p: Project; className?: string; alinhar?: 'esquerda' | 'direita' }) {
  return (
    <div className={cn('relative', className)}>
      <div className={cn('flex items-baseline gap-3', alinhar === 'direita' && 'lg:justify-end')}>
        <span
          className="zine-titulo text-[clamp(2rem,4vw,3.4rem)] leading-none transition-transform duration-300 group-hover:-rotate-6"
          style={{ color: p.accent }}
        >
          {p.num}
        </span>
        {p.selo && (
          <span className="carimbo shrink-0" style={{ color: p.accent }}>
            {p.selo}
          </span>
        )}
      </div>

      {/* o título anda pro lado no hover — é o sinal de que dá pra clicar.
          `desregistro` + data-texto imprimem duas cópias fora de registro,
          vermelho e azul, como chapa mal alinhada. Só no hover. */}
      <h3
        className="desregistro zine-titulo--medio mt-1 transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-focus-visible:translate-x-3"
        data-texto={p.title}
      >
        {p.title}
      </h3>

      <p className={cn('corpo mt-3 text-[clamp(0.95rem,1.3vw,1.1rem)]', alinhar === 'direita' && 'lg:ml-auto')}>
        {p.description}
      </p>

      <ul className={cn('mt-4 flex flex-wrap gap-x-2 gap-y-1', alinhar === 'direita' && 'lg:justify-end')}>
        {p.technologies.map((t, i) => (
          <li key={t} className="zine-sub" style={{ color: i === 0 ? p.accent : 'var(--text-2)' }}>
            {t}
            {i < p.technologies.length - 1 && <span className="ml-2 opacity-40">/</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- os dois links de fora (não podem morar dentro do <a> do card) ---------- */

function Acoes({ p }: { p: Project }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4">
      {/* a ação principal leva pra dentro do portfólio, não pra fora dele */}
      <TransitionLink href={`/projetos/${p.slug}`} className="botao" cursor="ver">
        ESTUDO DE CASO <span aria-hidden="true">→</span>
      </TransitionLink>
      {p.github ? (
        <a href={p.github} target="_blank" rel="noopener noreferrer" className="botao botao--vazio" data-cursor="abrir">
          VER O CÓDIGO <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <span className="mono text-[11px] tracking-[0.18em] text-[var(--text-2)]">REPO FECHADO · CLIENTE</span>
      )}
    </div>
  );
}

export default function ProjectCard({ p, indice }: { p: Project; indice: number }) {
  const reduzido = useReducedMotion();
  const parallax = reduzido ? 0 : 36;

  const capa = (
    <>
      <Image
        src={p.image.src}
        alt={p.image.alt}
        width={p.image.width}
        height={p.image.height}
        sizes={p.layout === 'full' ? '(max-width: 1024px) 94vw, 78vw' : '(max-width: 1024px) 88vw, 42vw'}
        loading={indice === 0 ? 'eager' : 'lazy'}
        priority={indice === 0}
        className="h-full w-full object-cover object-top transition-[filter] duration-300 group-hover:brightness-110"
      />
      <Abrir classe="bottom-4 right-4" />
    </>
  );

  /* ===================== 01 · imagem gigante ===================== */
  if (p.layout === 'full') {
    return (
      <article className="relative">
        <TransitionLink href={`/projetos/${p.slug}`} className="group block" cursor="ver">
          <div className="grid grid-cols-12 items-end gap-y-4">
            <div className="col-span-12 lg:col-span-5">
              <Meta p={p} />
            </div>
            <div className="col-span-12 lg:col-span-7">
              <span className="mono hidden justify-end gap-4 text-[11px] tracking-[0.2em] opacity-55 lg:flex">
                <span>{p.year}</span>
                <span>—</span>
                <span>SITE NO AR</span>
              </span>
            </div>
          </div>

          {/* estoura a margem do envelope de propósito */}
          <MaskReveal className="mt-6 lg:-mr-[clamp(16px,4vw,64px)]">
            <Moldura tilt={p.tilt} className="aspect-[16/9] w-full" sombra="var(--surface-2)">
              {capa}
            </Moldura>
          </MaskReveal>
        </TransitionLink>
        <Acoes p={p} />
      </article>
    );
  }

  /* ============ 02 · imagem pequena deslocada pra direita ============ */
  if (p.layout === 'small-right') {
    return (
      <article className="relative">
        <TransitionLink href={`/projetos/${p.slug}`} className="group block" cursor="ver">
          <div className="grid grid-cols-12 items-center gap-y-8">
            <div className="col-span-12 lg:col-span-5 lg:pr-6">
              <Meta p={p} />
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-8">
              <Parallax forca={parallax} className="relative">
                <MaskReveal direcao="esquerda">
                  <Moldura tilt={p.tilt} className="aspect-[4/3] w-full" sombra="var(--surface-2)">
                    {capa}
                  </Moldura>
                </MaskReveal>
                {p.gallery[0]?.nota && (
                  <p className="hand mt-3 text-[24px]" style={{ color: 'var(--accent)' }}>
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

  /* ===================== 03 · print vertical ===================== */
  if (p.layout === 'vertical') {
    return (
      <article className="relative">
        <TransitionLink href={`/projetos/${p.slug}`} className="group block" cursor="ver">
          <div className="grid grid-cols-12 items-center gap-y-8">
            <div className="order-2 col-span-12 sm:col-span-7 lg:order-1 lg:col-span-4">
              <Parallax forca={parallax * 1.4} rotacao={reduzido ? 0 : 1.2}>
                <MaskReveal>
                  <Moldura tilt={p.tilt} className="aspect-[3/7] w-full" sombra="var(--surface-2)">
                    {capa}
                  </Moldura>
                </MaskReveal>
              </Parallax>
            </div>

            <div className="order-1 col-span-12 lg:order-2 lg:col-span-7 lg:col-start-6">
              <Meta p={p} />
              {p.gallery[0]?.nota && (
                <p className="hand mt-4 flex items-center gap-2 text-[26px]" style={{ color: p.accent }}>
                  <Asterisco cor={p.accent} tamanho={18} />
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

  /* ===================== 04 · duas imagens ===================== */
  const segunda = p.gallery[1] ?? p.image;
  return (
    <article className="relative">
      <TransitionLink href={`/projetos/${p.slug}`} className="group block" cursor="ver">
        {/* Atenção às colunas: 7 + 4 + 4 estouraria as 12 e jogaria os
            metadados pra uma linha sozinha lá embaixo. Por isso os dois
            últimos blocos têm col-start explícito — a segunda imagem cai
            na linha de baixo e sobe pela margem negativa, sobrepondo. */}
        <div className="grid grid-cols-12 items-start gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <MaskReveal>
              <Moldura tilt={p.tilt} className="aspect-[16/10] w-full" sombra="var(--surface-2)">
                {capa}
              </Moldura>
            </MaskReveal>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <Meta p={p} />
          </div>

          <div className="col-span-9 col-start-4 sm:col-span-6 sm:col-start-6 lg:col-span-4 lg:col-start-6 lg:-mt-[9vw]">
            <Parallax forca={reduzido ? 0 : -40}>
              <MaskReveal atraso={0.12}>
                <Moldura tilt={-p.tilt} className="aspect-[3/5] w-full" sombra="var(--surface-2)">
                  <Image
                    src={segunda.src}
                    alt={segunda.alt}
                    width={segunda.width}
                    height={segunda.height}
                    sizes="(max-width: 1024px) 60vw, 28vw"
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-[filter] duration-300 group-hover:brightness-110"
                  />
                </Moldura>
              </MaskReveal>
            </Parallax>
          </div>
        </div>
      </TransitionLink>
      <Acoes p={p} />
    </article>
  );
}
