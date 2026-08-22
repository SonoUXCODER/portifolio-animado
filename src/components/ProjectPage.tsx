'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import type { Project } from '@/data/projects';
import { TransitionLink } from './PageTransition';
import { MaskReveal, Parallax, ScrollReveal, TextReveal } from './ScrollReveal';
import Marquee from './Marquee';
import { Asterisco, Rabisco, Seta, Traquinhos } from './Doodles';

/* -------------------------------------------------------------------------
   Estudo de caso.

   A ordem é a de uma reportagem, não a de um relatório: manchete, foto
   grande, o problema numa página, a solução na outra, e só então os
   detalhes. Nada de tabela de especificação.
   ------------------------------------------------------------------------- */

function Rotulo({ children, cor }: { children: React.ReactNode; cor?: string }) {
  return (
    <span className="zine-sub mb-4 inline-flex items-center gap-2" style={{ color: cor ?? 'var(--text-2)' }}>
      <span className="inline-block h-[7px] w-[7px]" style={{ background: cor ?? 'var(--accent)' }} />
      {children}
    </span>
  );
}

export default function ProjectPage({ p, proximo }: { p: Project; proximo: Project }) {
  const reduzido = useReducedMotion();

  return (
    <article className="pt-[104px] lg:pt-[128px]">
      {/* ================= manchete ================= */}
      <header className="envelope relative">
        <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2">
          <TransitionLink
            href="/#projetos"
            className="mono inline-flex items-center gap-2 text-[11px] tracking-[0.2em] transition-transform duration-200 hover:-translate-x-1 hover:text-[var(--accent)]"
            cursor="ver"
          >
            <span aria-hidden="true">←</span> VOLTAR
          </TransitionLink>
          <span className="mono text-[11px] tracking-[0.2em] opacity-45">
            PROJETO {p.num} · {p.year}
          </span>
          {p.selo && (
            <span className="carimbo" style={{ color: p.accent }}>
              {p.selo}
            </span>
          )}
        </div>

        <TextReveal as="h1" texto={p.title.toUpperCase()} className="zine-titulo -ml-[0.05em]" />

        {/* o rabisco vem antes do parágrafo no HTML de propósito: a grid
            preenche por ordem, e se ele viesse depois cairia numa linha
            sozinha, solto no meio do nada */}
        <div className="mt-6 grid grid-cols-12 items-start gap-y-6">
          <Traquinhos cor={p.accent} className="col-span-12 lg:col-span-2 lg:col-start-4 lg:mt-1 lg:justify-self-end" />
          <p className="corpo col-span-12 max-w-none text-[clamp(1.05rem,1.8vw,1.45rem)] lg:col-span-6 lg:col-start-6">
            {p.intro}
          </p>
        </div>
      </header>

      {/* ================= foto de abertura ================= */}
      <div className="mt-[clamp(36px,5vw,70px)] px-[clamp(8px,2vw,28px)]">
        <MaskReveal>
          <div
            className="relative overflow-hidden border-[1.5px] border-[var(--border-forte)] bg-[var(--surface)]"
            style={{ boxShadow: '12px 12px 0 var(--surface-2)' }}
          >
            <Image
              src={p.image.src}
              alt={p.image.alt}
              width={p.image.width}
              height={p.image.height}
              sizes="98vw"
              priority
              className="aspect-[16/9] w-full object-cover object-top"
            />
          </div>
        </MaskReveal>
      </div>

      {/* ================= tecnologias, passando de lado ================= */}
      <div className="mt-[clamp(36px,5vw,70px)]">
        <Marquee itens={p.technologies} velocidade={24} separador="/" compacto />
      </div>

      {/* ================= problema | solução ================= */}
      <section className="envelope mt-[clamp(60px,9vw,130px)]">
        <div className="grid grid-cols-12 gap-y-16">
          <ScrollReveal direcao="esquerda" className="col-span-12 lg:col-span-5">
            <Rotulo cor="var(--accent)">O PROBLEMA</Rotulo>
            <h2 className="zine-titulo--medio mb-4">O QUE ESTAVA QUEBRADO</h2>
            <p className="corpo max-w-[38ch] text-[clamp(1rem,1.4vw,1.15rem)]">{p.problema}</p>
          </ScrollReveal>

          <div className="col-span-12 hidden items-center justify-center lg:col-span-2 lg:flex">
            <Seta cor="var(--text)" largura={130} className="opacity-50" />
          </div>

          <ScrollReveal direcao="direita" atraso={0.1} className="col-span-12 lg:col-span-5">
            <Rotulo cor="var(--accent-2)">A SOLUÇÃO</Rotulo>
            <h2 className="zine-titulo--medio mb-4">O QUE EU FIZ</h2>
            <p className="corpo max-w-[38ch] text-[clamp(1rem,1.4vw,1.15rem)]">{p.solucao}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= papel + resultado ================= */}
      <section className="envelope mt-[clamp(60px,9vw,130px)]">
        <div className="grid grid-cols-12 gap-y-14">
          <ScrollReveal className="col-span-12 md:col-span-5">
            <Rotulo>MEU PAPEL</Rotulo>
            <ul className="flex flex-col gap-2">
              {p.papel.map((item) => (
                <li key={item} className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="shrink-0 text-lg leading-none" style={{ color: p.accent }}>
                    ✕
                  </span>
                  <span className="zine-titulo--medio text-[clamp(1.1rem,2vw,1.7rem)]">{item}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal atraso={0.08} className="col-span-12 md:col-span-6 md:col-start-7">
            <Rotulo cor={p.accent}>O RESULTADO</Rotulo>
            <ol className="flex flex-col gap-6">
              {p.resultado.map((r, i) => (
                <li key={r} className="flex items-start gap-4 border-b-2 border-[var(--border)] pb-5">
                  <span className="zine-titulo text-[clamp(1.6rem,3vw,2.6rem)] leading-none opacity-25">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="corpo max-w-none text-[clamp(1rem,1.5vw,1.25rem)]">{r}</p>
                </li>
              ))}
            </ol>
            <p className="hand mt-5 flex items-center gap-2 text-[26px]" style={{ color: p.accent }}>
              <Asterisco cor={p.accent} tamanho={18} />
              tudo isso continua no ar
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= galeria ================= */}
      <section className="envelope mt-[clamp(70px,10vw,140px)]">
        <Rotulo>GALERIA</Rotulo>
        <div className="grid grid-cols-12 gap-x-4 gap-y-[clamp(30px,5vw,64px)]">
          {p.gallery.map((g, i) => (
            <figure
              key={g.src + i}
              className={i % 2 === 0 ? 'col-span-12 lg:col-span-7' : 'col-span-12 lg:col-span-4 lg:col-start-9 lg:mt-[6vw]'}
            >
              <Parallax forca={reduzido ? 0 : i % 2 === 0 ? 24 : -34}>
                <MaskReveal atraso={0.05 * i}>
                  <div
                    className="relative border-[1.5px] border-[var(--border-forte)] bg-[var(--surface)]"
                    style={{ boxShadow: '9px 9px 0 var(--surface-2)', transform: `rotate(${i % 2 ? 1 : -1}deg)` }}
                    data-cursor="olhar"
                  >
                    <span className="fita -left-4 -top-3 rotate-[-8deg]" />
                    <Image
                      src={g.src}
                      alt={g.alt}
                      width={g.width}
                      height={g.height}
                      sizes="(max-width: 1024px) 92vw, 55vw"
                      loading="lazy"
                      className="w-full object-cover"
                      style={{ maxHeight: '78vh', objectPosition: 'top' }}
                    />
                  </div>
                </MaskReveal>
              </Parallax>
              {g.nota && (
                <figcaption className="hand mt-3 text-[clamp(20px,2vw,26px)]" style={{ color: i % 2 ? 'var(--accent-2)' : 'var(--accent)' }}>
                  {g.nota}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </section>

      {/* ================= ficha ==================
          Sem link pro site no ar de propósito: quem chega aqui vê o
          projeto por dentro deste portfólio, não numa aba nova. O campo
          `live` continua nos dados, só que como informação — o estado do
          projeto — e não como saída. */}
      <section className="envelope mt-[clamp(60px,9vw,120px)]">
        <div className="relative border-[1.5px] border-[var(--border-forte)] p-[clamp(22px,4vw,50px)]" style={{ boxShadow: '12px 12px 0 var(--surface-2)' }}>
          <Rabisco className="absolute -top-9 right-6 hidden opacity-60 lg:block" cor={p.accent} largura={150} />
          <h2 className="zine-titulo--medio mb-6">A FICHA</h2>

          <dl className="mb-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            <div>
              <dt className="rotulo mb-1">ano</dt>
              <dd className="mono text-[13px]">{p.year}</dd>
            </div>
            <div>
              <dt className="rotulo mb-1">tipo</dt>
              <dd className="mono text-[13px]">{p.selo ?? 'projeto'}</dd>
            </div>
            <div>
              <dt className="rotulo mb-1">estado</dt>
              <dd className="mono text-[13px]" style={{ color: p.accent }}>
                {p.live ? 'no ar' : 'arquivado'}
              </dd>
            </div>
            <div>
              <dt className="rotulo mb-1">stack</dt>
              <dd className="mono text-[13px]">{p.technologies.length} tecnologias</dd>
            </div>
          </dl>

          <div className="flex flex-wrap items-center gap-4">
            {p.github ? (
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="botao botao--vazio" data-cursor="abrir">
                VER O CÓDIGO <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className="mono text-[11px] leading-relaxed tracking-[0.16em] text-[var(--text-2)]">
                REPOSITÓRIO FECHADO — CÓDIGO DO CLIENTE
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ================= próximo ================= */}
      <section className="mt-[clamp(70px,10vw,140px)] pb-[clamp(40px,6vw,90px)]">
        <TransitionLink href={`/projetos/${proximo.slug}`} className="group block" cursor="ver">
          <div className="envelope">
            <p className="zine-sub mb-2 opacity-60">PRÓXIMO PROJETO</p>
            <motion.h2
              className="zine-titulo transition-transform duration-500 group-hover:translate-x-4"
              initial={reduzido ? { opacity: 0 } : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {proximo.title.toUpperCase()}
              <span className="ml-4 inline-block align-middle text-[0.5em]" style={{ color: proximo.accent }} aria-hidden="true">
                →
              </span>
            </motion.h2>
          </div>
        </TransitionLink>
      </section>
    </article>
  );
}
