'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { numeroDoProjeto, projects, type Project } from '@/data/projects';
import { TransitionLink } from './PageTransition';
import { MaskReveal, Parallax, ScrollReveal, TextReveal } from './ScrollReveal';
import Marquee from './Marquee';
import { Asterisco, Rabisco, Seta, Traquinhos } from './Doodles';

/* -------------------------------------------------------------------------
   Estudo de caso — o caderno solto de cada projeto.

   A ordem é a de uma reportagem, não a de um relatório: manchete, foto
   grande, o problema numa página, a solução na outra, e só então os
   detalhes. Nada de tabela de especificação.
   ------------------------------------------------------------------------- */

function Rotulo({ children }: { children: React.ReactNode }) {
  return (
    <span className="zine-sub mb-4 inline-flex items-center gap-2" style={{ color: 'var(--tinta-2)' }}>
      <span className="inline-block h-[6px] w-[6px]" style={{ background: 'var(--tinta)' }} />
      {children}
    </span>
  );
}

export default function ProjectPage({ p, proximo }: { p: Project; proximo: Project }) {
  const reduzido = useReducedMotion();
  const num = numeroDoProjeto(p.slug);
  const total = String(projects.length).padStart(2, '0');

  return (
    <article className="pt-[92px] lg:pt-[116px]">
      {/* ================= manchete ================= */}
      <header className="envelope relative">
        <div className="cabeco">
          <TransitionLink
            href="/#projetos"
            className="alvo inline-flex items-center gap-2 transition-transform duration-200 hover:-translate-x-1"
            cursor="ver"
          >
            <span aria-hidden="true">←</span> VOLTAR AO ARQUIVO
          </TransitionLink>
          <span style={{ color: 'var(--tinta-3)' }}>
            CADERNO SOLTO {num} / {total} · {p.year}
          </span>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          {p.selo && <span className="carimbo">{p.selo}</span>}
          <span className="mono text-[10px] tracking-[0.2em]" style={{ color: 'var(--tinta-3)' }}>
            {p.live ? 'NO AR' : 'ARQUIVADO'}
          </span>
        </div>

        <TextReveal as="h1" texto={p.title.toUpperCase()} className="zine-titulo -ml-[0.05em]" />

        {/* o rabisco vem antes do parágrafo no HTML de propósito: a grid
            preenche por ordem, e se ele viesse depois cairia numa linha
            sozinha, solto no meio do nada */}
        <div className="mt-6 grid grid-cols-12 items-start gap-y-6">
          <Traquinhos cor="var(--tinta)" className="col-span-12 opacity-60 lg:col-span-2 lg:col-start-4 lg:mt-1 lg:justify-self-end" />
          <p className="olho col-span-12 text-[clamp(1.05rem,1.8vw,1.45rem)] lg:col-span-6 lg:col-start-6">
            {p.intro}
          </p>
        </div>
      </header>

      {/* ================= chapa de abertura ================= */}
      <div className="mt-[clamp(32px,5vw,64px)] px-[clamp(8px,2vw,26px)]">
        <MaskReveal>
          <figure className="relative m-0 overflow-hidden border border-[var(--linha-forte)] bg-[var(--papel-2)]">
            <Image
              src={p.image.src}
              alt={p.image.alt}
              width={p.image.width}
              height={p.image.height}
              sizes="98vw"
              priority
              className="aspect-[16/9] w-full object-cover object-top"
            />
          </figure>
        </MaskReveal>
      </div>

      {/* ================= tecnologias, passando de lado ================= */}
      <div className="mt-[clamp(32px,5vw,64px)]">
        <Marquee itens={p.technologies} velocidade={24} separador="/" compacto />
      </div>

      {/* ================= problema | solução ================= */}
      <section className="envelope mt-[clamp(56px,8vw,120px)]">
        <div className="grid grid-cols-12 gap-y-14">
          <ScrollReveal direcao="esquerda" className="col-span-12 lg:col-span-5">
            <Rotulo>O PROBLEMA</Rotulo>
            <h2 className="zine-titulo--medio mb-4 text-[clamp(1.6rem,3.6vw,2.8rem)]">O QUE ESTAVA QUEBRADO</h2>
            <p className="corpo max-w-[38ch] text-[clamp(0.95rem,1.35vw,1.12rem)]">{p.problema}</p>
          </ScrollReveal>

          <div className="col-span-12 hidden items-center justify-center lg:col-span-2 lg:flex">
            <Seta cor="var(--tinta)" largura={120} className="opacity-40" />
          </div>

          <ScrollReveal direcao="direita" atraso={0.1} className="col-span-12 lg:col-span-5">
            <Rotulo>A SOLUÇÃO</Rotulo>
            <h2 className="zine-titulo--medio mb-4 text-[clamp(1.6rem,3.6vw,2.8rem)]">O QUE EU FIZ</h2>
            <p className="corpo max-w-[38ch] text-[clamp(0.95rem,1.35vw,1.12rem)]">{p.solucao}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= papel + resultado ================= */}
      <section className="envelope mt-[clamp(56px,8vw,120px)]">
        <div className="grid grid-cols-12 gap-y-12">
          <ScrollReveal className="col-span-12 md:col-span-5">
            <Rotulo>MEU PAPEL</Rotulo>
            <ul className="flex flex-col gap-2">
              {p.papel.map((item) => (
                <li key={item} className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="shrink-0 text-base leading-none" style={{ color: 'var(--tinta-3)' }}>
                    ✕
                  </span>
                  <span className="zine-titulo--medio text-[clamp(1.05rem,1.9vw,1.6rem)]">{item}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal atraso={0.08} className="col-span-12 md:col-span-6 md:col-start-7">
            <Rotulo>O RESULTADO</Rotulo>
            <ol className="flex flex-col gap-5">
              {p.resultado.map((r, i) => (
                <li key={r} className="flex items-start gap-4 border-b border-[var(--linha)] pb-4">
                  <span className="zine-titulo text-[clamp(1.4rem,2.8vw,2.3rem)] leading-none" style={{ color: 'var(--tinta-3)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="corpo max-w-none text-[clamp(0.95rem,1.4vw,1.18rem)]">{r}</p>
                </li>
              ))}
            </ol>
            <p className="hand mt-5 flex items-center gap-2 text-[24px]" style={{ color: 'var(--tinta-2)' }}>
              <Asterisco cor="var(--tinta-2)" tamanho={16} />
              {p.live ? 'tudo isso continua no ar' : 'projeto encerrado, aprendizado não'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= galeria ================= */}
      <section className="envelope mt-[clamp(64px,9vw,130px)]">
        <Rotulo>GALERIA</Rotulo>
        <div className="grid grid-cols-12 gap-x-4 gap-y-[clamp(28px,5vw,60px)]">
          {p.gallery.map((g, i) => (
            <figure
              key={g.src + i}
              className={i % 2 === 0 ? 'col-span-12 lg:col-span-7' : 'col-span-12 lg:col-span-4 lg:col-start-9 lg:mt-[6vw]'}
            >
              <Parallax forca={reduzido ? 0 : i % 2 === 0 ? 22 : -30}>
                <MaskReveal atraso={0.05 * i}>
                  <div
                    className="relative border border-[var(--linha-forte)] bg-[var(--papel-2)]"
                    style={{ transform: `rotate(${i % 2 ? 0.8 : -0.8}deg)` }}
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
                <figcaption className="hand mt-3 text-[clamp(19px,2vw,24px)]" style={{ color: 'var(--tinta-2)' }}>
                  {g.nota}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </section>

      {/* ================= ficha ==================
          Sem link pro site no ar de propósito: quem chega aqui vê o projeto
          por dentro deste arquivo, não numa aba nova. O campo `live`
          continua nos dados, só que como informação — o estado do projeto —
          e não como saída. */}
      <section className="envelope mt-[clamp(56px,8vw,110px)]">
        <div className="relative border border-[var(--linha-forte)] p-[clamp(22px,4vw,46px)]">
          <Rabisco className="absolute -top-9 right-6 hidden opacity-50 lg:block" cor="var(--tinta)" largura={140} />
          <h2 className="zine-titulo--medio mb-6 text-[clamp(1.6rem,3.6vw,2.8rem)]">A FICHA</h2>

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
              <dd className="mono text-[13px]">{p.live ? 'no ar' : 'arquivado'}</dd>
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
              <span className="mono text-[10px] leading-relaxed tracking-[0.16em]" style={{ color: 'var(--tinta-3)' }}>
                REPOSITÓRIO FECHADO — CÓDIGO DO CLIENTE
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ================= próximo ================= */}
      <section className="mt-[clamp(64px,9vw,130px)] pb-[clamp(36px,6vw,80px)]">
        <TransitionLink href={`/projetos/${proximo.slug}`} className="group block" cursor="ver">
          <div className="envelope">
            <p className="zine-sub mb-2" style={{ color: 'var(--tinta-3)' }}>
              PRÓXIMO CADERNO
            </p>
            <motion.h2
              className="zine-titulo transition-transform duration-500 group-hover:translate-x-4"
              initial={reduzido ? { opacity: 0 } : { opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {proximo.title.toUpperCase()}
              <span className="ml-4 inline-block align-middle text-[0.5em]" aria-hidden="true">
                →
              </span>
            </motion.h2>
          </div>
        </TransitionLink>
      </section>
    </article>
  );
}
