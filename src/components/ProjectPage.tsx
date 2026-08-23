'use client';

import Image from 'next/image';
import { projectNumber, projectTotal, type Project } from '@/data/projects';
import { TransitionLink } from './PageTransition';
import Magnetic from './Magnetic';
import { Lines, Parallax, Reveal, RevealGroup, RevealItem } from './Reveal';

/* -------------------------------------------------------------------------
   O ESTUDO DE CASO.

   A ordem é a de uma reportagem, não a de um relatório:

     manchete      nome do projeto em tela cheia, com a ficha por cima
     abertura      a chapa grande, sangrando
     challenge     o que estava quebrado antes de mim
     approach      as cinco etapas, cada uma com o que foi decidido
     system        o sistema de design — cor, tipo, componente, grade
     development   a stack, em blueprint
     experience    a galeria, em rolagem horizontal
     next          o próximo projeto

   A regra que segura tudo: nenhuma dessas seções repete a anterior. Se o
   `challenge` e o `approach` pudessem trocar de lugar sem que o texto
   estranhasse, os dois estão descrevendo a mesma coisa e um deles sobra.

   As cores do sistema não são inventadas: cada hex foi lido do CSS que está
   no ar naquele domínio. Ver data/projects.ts.
   ------------------------------------------------------------------------- */

function Rotulo({ children }: { children: React.ReactNode }) {
  return (
    <p className="label mb-[var(--space-5)] flex items-center gap-[var(--space-3)]">
      <span
        aria-hidden="true"
        className="inline-block h-[5px] w-[5px] shrink-0 rounded-full"
        style={{ background: 'var(--accent)' }}
      />
      {children}
    </p>
  );
}

export default function ProjectPage({ p, proximo }: { p: Project; proximo: Project }) {
  const num = projectNumber(p.slug);

  return (
    <article>
      {/* ================================================================
          MANCHETE — tela cheia
          ================================================================ */}
      <header className="shell flex min-h-[92svh] flex-col justify-between pb-[var(--space-8)] pt-[calc(var(--header-h)+var(--space-7))]">
        <div>
          <p className="index-line">
            <TransitionLink
              href="/#work"
              className="hit inline-flex items-center gap-[var(--space-2)] transition-transform duration-[var(--duration-normal)] hover:-translate-x-[3px]"
              cursor="back"
            >
              <span aria-hidden="true">←</span> Work
            </TransitionLink>
            <span className="index-line__sep" aria-hidden="true">
              /
            </span>
            <span className="index-line__n">
              {num} of {projectTotal}
            </span>
            <span className="index-line__rule" aria-hidden="true" />
            <span className="hidden sm:inline">{p.badge}</span>
          </p>
        </div>

        <div className="py-[var(--space-8)]">
          <Lines lines={[p.title]} as="h1" className="display-hero" immediate delay={0.15} />

          <p className="label mt-[var(--space-6)]" style={{ color: 'var(--text-primary)' }}>
            {p.kind} <span className="index-line__sep">/</span> {p.year}
          </p>

          <div className="grid-12 mt-[var(--space-7)] gap-y-[var(--space-5)]">
            <div className="col-span-12 md:col-span-6 lg:col-span-5">
              <Reveal delay={0.2}>
                <p className="lead">{p.intro}</p>
                <p className="body-sm mt-[var(--space-5)] flex max-w-[46ch] gap-[var(--space-3)] italic">
                  <span aria-hidden="true" style={{ color: 'var(--accent)' }}>
                    ↳
                  </span>
                  {p.note}
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ---- ficha técnica ---- */}
        <Reveal direction="none">
          <dl
            className="grid grid-cols-2 gap-x-[var(--space-5)] gap-y-[var(--space-5)] border-t pt-[var(--space-4)] lg:grid-cols-4"
            style={{ borderColor: 'var(--line)' }}
          >
            <div>
              <dt className="label label--dim">Year</dt>
              <dd className="mt-[var(--space-2)] text-[0.95rem]">{p.year}</dd>
            </div>
            <div>
              <dt className="label label--dim">Role</dt>
              <dd className="mt-[var(--space-2)] text-[0.95rem]">{p.role.join(', ')}</dd>
            </div>
            <div>
              <dt className="label label--dim">Disciplines</dt>
              <dd className="mt-[var(--space-2)] text-[0.95rem]">{p.disciplines.join(' — ')}</dd>
            </div>
            <div>
              <dt className="label label--dim">Status</dt>
              <dd className="mt-[var(--space-2)] text-[0.95rem]">{p.live ? 'Live' : 'Archived'}</dd>
            </div>
          </dl>
        </Reveal>
      </header>

      {/* ================================================================
          ABERTURA — a chapa grande
          ================================================================ */}
      <div className="shell">
        <Reveal direction="none">
          <figure className="media aspect-[16/9] w-full">
            <Image
              src={p.cover.src}
              alt={p.cover.alt}
              width={p.cover.width}
              height={p.cover.height}
              sizes="94vw"
              priority
              className="h-full w-full"
            />
          </figure>
        </Reveal>
      </div>

      {/* ================================================================
          CHALLENGE
          ================================================================ */}
      <section className="shell mt-[var(--space-10)]">
        <div className="grid-12 gap-y-[var(--space-6)]">
          <div className="col-span-12 lg:col-span-5">
            <Reveal>
              <Rotulo>The challenge</Rotulo>
              <Lines lines={['What was', 'broken.']} as="h2" className="display-lg" />
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Reveal direction="left" delay={0.1}>
              <p className="lead">{p.challenge}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          APPROACH — as cinco etapas
          ================================================================ */}
      <section className="shell mt-[var(--space-10)]">
        <Reveal>
          <Rotulo>The approach</Rotulo>
          <Lines lines={['How it', 'was made.']} as="h2" className="display-lg" />
        </Reveal>

        <RevealGroup as="ol" className="mt-[var(--space-8)] flex flex-col">
          {p.approach.map((a, i) => (
            <RevealItem
              as="li"
              key={a.step}
              className="grid-12 gap-y-[var(--space-3)] border-t py-[var(--space-6)]"
              style={{ borderColor: 'var(--line)' }}
            >
              <div className="col-span-12 md:col-span-3">
                <p className="label label--accent">{String(i + 1).padStart(2, '0')}</p>
                <p className="label mt-[var(--space-2)]" style={{ color: 'var(--text-primary)' }}>
                  {a.step}
                </p>
              </div>
              <div className="col-span-12 md:col-span-8 md:col-start-5">
                <h3 className="display-md">{a.title}</h3>
                <p className="body mt-[var(--space-4)] max-w-[54ch]">{a.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ================================================================
          DESIGN SYSTEM
          ================================================================ */}
      <section className="shell mt-[var(--space-10)]">
        <Reveal>
          <Rotulo>Design system</Rotulo>
          <Lines lines={['The rules', 'behind it.']} as="h2" className="display-lg" />
        </Reveal>

        {/* ---- cor ----
             As amostras são quadrados grandes com o hex escrito embaixo. Um
             círculo pequeno com o nome ao lado seria mais bonito e diria
             menos: aqui a cor precisa aparecer em área suficiente pra ser
             julgada, que é o que uma paleta é. */}
        <div className="mt-[var(--space-8)]">
          <Reveal>
            <p className="label label--dim">Palette</p>
          </Reveal>
          <RevealGroup
            as="ul"
            className="mt-[var(--space-4)] grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3 lg:grid-cols-5"
          >
            {p.system.palette.map((c) => (
              <RevealItem as="li" key={c.hex}>
                <span
                  className="block aspect-[4/3] w-full"
                  style={{ background: c.hex, border: '1px solid var(--line)' }}
                  aria-hidden="true"
                />
                <span className="label mt-[var(--space-3)] block" style={{ color: 'var(--text-primary)' }}>
                  {c.name}
                </span>
                <span className="label label--dim mt-[var(--space-1)] block">{c.hex}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* ---- tipografia ---- */}
        <div className="mt-[var(--space-9)]">
          <Reveal>
            <p className="label label--dim">Typography</p>
          </Reveal>
          <RevealGroup as="ul" className="mt-[var(--space-4)] flex flex-col">
            {p.system.type.map((t) => (
              <RevealItem
                as="li"
                key={t.role}
                className="grid-12 gap-y-[var(--space-2)] border-t py-[var(--space-4)]"
                style={{ borderColor: 'var(--line)' }}
              >
                <span className="label col-span-12 md:col-span-2">{t.role}</span>
                <span className="title-sm col-span-12 md:col-span-4">{t.family}</span>
                <span className="body-sm col-span-12 md:col-span-5 md:col-start-8">{t.note}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* ---- componentes, grade e espaço ---- */}
        <div className="grid-12 mt-[var(--space-9)] gap-y-[var(--space-7)]">
          <div className="col-span-12 md:col-span-5">
            <Reveal>
              <p className="label label--dim">Components</p>
              <ul className="mt-[var(--space-4)] flex flex-wrap gap-[var(--space-2)]">
                {p.system.components.map((c) => (
                  <li
                    key={c}
                    className="label px-[var(--space-4)] py-[var(--space-3)]"
                    style={{ border: '1px solid var(--line)', color: 'var(--text-primary)' }}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <Reveal delay={0.08}>
              <div className="border-t py-[var(--space-4)]" style={{ borderColor: 'var(--line)' }}>
                <p className="label label--dim">Grid</p>
                <p className="body mt-[var(--space-2)]" style={{ color: 'var(--text-primary)' }}>
                  {p.system.grid}
                </p>
              </div>
              <div className="border-t py-[var(--space-4)]" style={{ borderColor: 'var(--line)' }}>
                <p className="label label--dim">Spacing</p>
                <p className="body mt-[var(--space-2)]" style={{ color: 'var(--text-primary)' }}>
                  {p.system.spacing}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          DEVELOPMENT — a stack em blueprint
          ================================================================ */}
      <section className="shell mt-[var(--space-10)]">
        <div className="grid-12 gap-y-[var(--space-6)]">
          <div className="col-span-12 lg:col-span-5">
            <Reveal>
              <Rotulo>Development</Rotulo>
              <Lines lines={['What it', 'runs on.']} as="h2" className="display-lg" />
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <RevealGroup as="ul" className="flex flex-col">
              {p.stack.map((t, i) => (
                <RevealItem
                  as="li"
                  key={t}
                  className="flex items-baseline gap-[var(--space-5)] border-t py-[var(--space-4)]"
                  style={{ borderColor: 'var(--line)' }}
                >
                  <span className="label label--dim shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <span className="display-md">{t}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        {/* ---- resultado ---- */}
        <div className="grid-12 mt-[var(--space-9)] gap-y-[var(--space-6)]">
          <div className="col-span-12 md:col-span-3">
            <Reveal>
              <p className="label label--dim">Outcome</p>
            </Reveal>
          </div>
          <RevealGroup as="ol" className="col-span-12 md:col-span-8 md:col-start-5 flex flex-col">
            {p.outcome.map((r, i) => (
              <RevealItem
                as="li"
                key={r}
                className="flex items-baseline gap-[var(--space-4)] border-t py-[var(--space-4)]"
                style={{ borderColor: 'var(--line)' }}
              >
                <span className="label label--accent shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <p className="lead" style={{ maxWidth: '44ch' }}>
                  {r}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ================================================================
          FINAL EXPERIENCE — galeria em rolagem horizontal
          ================================================================ */}
      <section className="mt-[var(--space-10)]">
        <div className="shell">
          <Reveal>
            <Rotulo>Final experience</Rotulo>
            <Lines lines={['See it', 'running.']} as="h2" className="display-lg" />
            <p className="body-sm mt-[var(--space-5)]">
              Drag, scroll or use the arrow keys.
            </p>
          </Reveal>
        </div>

        {/* A faixa sangra pra fora do `shell` de propósito: é o único
            elemento da página que atravessa a margem, e é isso que a marca
            como "outra coisa" antes de qualquer instrução.

            `tabIndex` e `role="region"` porque um contêiner de rolagem que
            só responde ao mouse é inalcançável pelo teclado — o próprio
            padrão WCAG 2.1.1 trata a rolagem como funcionalidade. */}
        <div
          role="region"
          aria-label={`${p.title} screenshots`}
          tabIndex={0}
          className="mt-[var(--space-8)] flex snap-x snap-mandatory gap-[var(--space-5)] overflow-x-auto pb-[var(--space-5)] pl-[var(--gutter)] pr-[var(--gutter)]"
          style={{ scrollbarWidth: 'thin' }}
        >
          {p.gallery.map((g, i) => (
            <figure
              key={g.src + i}
              className="w-[min(86vw,1080px)] shrink-0 snap-start"
              data-cursor="look"
            >
              <div className="media w-full">
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={g.width}
                  height={g.height}
                  sizes="(max-width: 768px) 86vw, 1080px"
                  loading="lazy"
                  className="w-full"
                  style={{ maxHeight: '72vh', objectFit: 'cover', objectPosition: 'top' }}
                />
              </div>
              {g.caption && (
                <figcaption className="label label--dim mt-[var(--space-3)]">
                  {String(i + 1).padStart(2, '0')} <span className="index-line__sep">/</span>{' '}
                  {g.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>

        {/* ---- saídas ---- */}
        <div className="shell mt-[var(--space-8)]">
          <Reveal>
            <div className="flex flex-wrap items-center gap-[var(--space-4)]">
              {p.live && (
                <Magnetic>
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    data-cursor="open"
                  >
                    Visit live project <span aria-hidden="true">↗</span>
                  </a>
                </Magnetic>
              )}
              {p.github ? (
                <Magnetic>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost"
                    data-cursor="open"
                  >
                    Source <span aria-hidden="true">↗</span>
                  </a>
                </Magnetic>
              ) : (
                <p className="body-sm">Repository is private — the code belongs to the client.</p>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          PRÓXIMO
          ================================================================ */}
      <section
        className="mt-[var(--space-10)] border-t pt-[var(--space-8)]"
        style={{ borderColor: 'var(--line)' }}
      >
        <TransitionLink href={`/work/${proximo.slug}`} className="group block" cursor="case">
          <div className="shell">
            <p className="label label--dim mb-[var(--space-4)]">Next project</p>
            <Reveal direction="none">
              <h2 className="display-xl inline-flex items-baseline gap-[var(--space-5)] transition-[color,transform] duration-[var(--duration-slow)] ease-[var(--ease-standard)] group-hover:translate-x-[var(--space-4)] group-hover:text-[var(--accent)]">
                {proximo.title}
                <span className="text-[0.4em]" aria-hidden="true">
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
