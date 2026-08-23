'use client';

import Image from 'next/image';
import { numeroDoProjeto, projects, type Project } from '@/data/projects';
import { TransitionLink } from './PageTransition';
import { Parallax, Reveal, RevealGroup, RevealItem, WordsUp } from './Reveal';

/* -------------------------------------------------------------------------
   Estudo de caso.

   A ordem é a de uma reportagem, não a de um relatório: manchete, imagem
   grande, o problema de um lado e a decisão do outro, e só então a ficha.

   Sem link pro site no ar, de propósito. Quem chega aqui vê o projeto por
   dentro deste portfólio, não numa aba nova. O campo `live` continua nos
   dados como informação — o estado do projeto — e nunca como saída.
   ------------------------------------------------------------------------- */

function Rotulo({ children }: { children: React.ReactNode }) {
  return (
    <span className="label mb-[var(--space-4)] flex items-center gap-[var(--space-2)]">
      <span
        aria-hidden="true"
        className="inline-block h-[5px] w-[5px] shrink-0 rounded-full"
        style={{ background: 'var(--accent)' }}
      />
      {children}
    </span>
  );
}

export default function ProjectPage({ p, proximo }: { p: Project; proximo: Project }) {
  const num = numeroDoProjeto(p.slug);
  const total = String(projects.length).padStart(2, '0');

  return (
    <article className="pt-[calc(var(--header-h)+var(--space-8))]">
      {/* ================= manchete ================= */}
      <header className="shell">
        <p className="kicker">
          <TransitionLink
            href="/#arquivo"
            className="hit inline-flex items-center gap-[var(--space-2)] transition-transform duration-[var(--duration-normal)] hover:-translate-x-[3px]"
            cursor="ver"
          >
            <span aria-hidden="true">←</span> Arquivo
          </TransitionLink>
          <span className="kicker__sep" aria-hidden="true">
            ·
          </span>
          <span className="kicker__n">
            #{num} de {total}
          </span>
          <span className="kicker__sep" aria-hidden="true">
            ·
          </span>
          <span>{p.year}</span>
          <span className="kicker__sep" aria-hidden="true">
            ·
          </span>
          <span>{p.categoria}</span>
          <span className="kicker__sep" aria-hidden="true">
            ·
          </span>
          <span>{p.live ? 'no ar' : 'arquivado'}</span>
        </p>

        <div className="mt-[var(--space-8)]">
          <WordsUp as="h1" text={p.title} className="display-xl" />
        </div>

        {/* a nota da entrada abre o estudo de caso: é a voz antes do relato */}
        <p className="nota mt-[var(--space-5)] flex max-w-[46ch] gap-[var(--space-3)]">
          <span aria-hidden="true" style={{ color: 'var(--accent)' }}>
            ↳
          </span>
          {p.nota}
        </p>

        <Reveal delay={0.12}>
          <p className="lead mt-[var(--space-6)] max-w-[52ch]">{p.intro}</p>
        </Reveal>

        <RevealGroup
          as="ul"
          className="mt-[var(--space-6)] flex flex-wrap gap-x-[var(--space-4)] gap-y-[var(--space-2)]"
          delay={0.2}
        >
          {p.technologies.map((t) => (
            <RevealItem as="li" key={t} className="label">
              {t}
            </RevealItem>
          ))}
        </RevealGroup>
      </header>

      {/* ================= abertura ================= */}
      <div className="shell mt-[var(--space-9)]">
        <Reveal direction="none">
          <figure className="media aspect-[16/9] w-full">
            <Image
              src={p.image.src}
              alt={p.image.alt}
              width={p.image.width}
              height={p.image.height}
              sizes="92vw"
              priority
              className="h-full w-full"
            />
          </figure>
        </Reveal>
      </div>

      {/* ================= problema | decisão ================= */}
      <section className="shell mt-[var(--space-10)]">
        <div className="grid-12 gap-y-[var(--space-8)]">
          <Reveal className="col-span-12 lg:col-span-5">
            <Rotulo>O problema</Rotulo>
            <h2 className="display-md mb-[var(--space-4)]">O que estava quebrado</h2>
            <p className="body max-w-[44ch]">{p.problema}</p>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Rotulo>A decisão</Rotulo>
            <h2 className="display-md mb-[var(--space-4)]">O que eu fiz</h2>
            <p className="body max-w-[44ch]">{p.solucao}</p>
          </Reveal>
        </div>
      </section>

      {/* ================= papel + resultado ================= */}
      <section className="shell mt-[var(--space-10)]">
        <div className="grid-12 gap-y-[var(--space-8)]">
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <Rotulo>Meu papel</Rotulo>
            </Reveal>
            <RevealGroup as="ul" className="flex flex-col">
              {p.papel.map((item) => (
                <RevealItem
                  as="li"
                  key={item}
                  className="title-sm border-t py-[var(--space-3)]"
                  style={{ borderColor: 'var(--border)' }}
                >
                  {item}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <Reveal>
              <Rotulo>O resultado</Rotulo>
            </Reveal>
            <RevealGroup as="ol" className="flex flex-col">
              {p.resultado.map((r, i) => (
                <RevealItem
                  as="li"
                  key={r}
                  className="flex items-baseline gap-[var(--space-4)] border-t py-[var(--space-4)]"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <span className="figure shrink-0 text-[0.8rem]" style={{ color: 'var(--accent)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="body">{r}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ================= galeria ================= */}
      <section className="shell mt-[var(--space-10)]">
        <Reveal>
          <Rotulo>Galeria</Rotulo>
        </Reveal>

        <div className="grid-12 gap-y-[var(--space-9)]">
          {p.gallery.map((g, i) => {
            const par = i % 2 === 0;
            return (
              <figure
                key={g.src + i}
                className={par ? 'col-span-12 lg:col-span-7' : 'col-span-12 lg:col-span-4 lg:col-start-9 lg:mt-[6vw]'}
              >
                <div className="group">
                  <Parallax strength={par ? 26 : 40}>
                    <div className="media w-full" data-cursor="olhar">
                      <Image
                        src={g.src}
                        alt={g.alt}
                        width={g.width}
                        height={g.height}
                        sizes="(max-width: 1024px) 92vw, 55vw"
                        loading="lazy"
                        className="w-full"
                        style={{ maxHeight: '78vh', objectFit: 'cover', objectPosition: 'top' }}
                      />
                    </div>
                  </Parallax>
                </div>
                {g.nota && <figcaption className="nota mt-[var(--space-3)]">{g.nota}</figcaption>}
              </figure>
            );
          })}
        </div>
      </section>

      {/* ================= ficha ================= */}
      <section className="shell mt-[var(--space-10)]">
        <Reveal>
          <div className="panel p-[var(--space-7)]">
            <h2 className="display-md mb-[var(--space-6)]">A ficha</h2>

            <dl className="grid grid-cols-2 gap-[var(--space-5)] sm:grid-cols-4">
              {(
                [
                  ['Ano', p.year],
                  ['Tipo', p.selo ?? 'projeto'],
                  ['Estado', p.live ? 'no ar' : 'arquivado'],
                  ['Stack', `${p.technologies.length} tecnologias`],
                ] as Array<[string, string]>
              ).map(([rotulo, valor]) => (
                <div key={rotulo}>
                  <dt className="label">{rotulo}</dt>
                  <dd className="figure mt-[var(--space-2)] text-[0.95rem]">{valor}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-[var(--space-7)]">
              {p.github ? (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--ghost"
                  data-cursor="abrir"
                >
                  Ver o código <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <p className="body-sm">Repositório fechado — o código é do cliente.</p>
              )}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= próximo ================= */}
      <section className="mt-[var(--space-10)] border-t pt-[var(--space-8)]" style={{ borderColor: 'var(--border)' }}>
        <TransitionLink href={`/projetos/${proximo.slug}`} className="group block" cursor="ver">
          <div className="shell">
            <p className="label mb-[var(--space-3)]">Próximo projeto</p>
            <Reveal direction="none">
              <h2 className="display-lg inline-flex items-baseline gap-[var(--space-4)] transition-transform duration-[var(--duration-slow)] ease-[var(--ease-standard)] group-hover:translate-x-[var(--space-3)]">
                {proximo.title}
                <span className="text-[0.5em]" aria-hidden="true">
                  →
                </span>
              </h2>
            </Reveal>
          </div>
        </TransitionLink>
      </section>
    </article>
  );
}
