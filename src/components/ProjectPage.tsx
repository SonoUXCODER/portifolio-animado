'use client';

import { useState } from 'react';
import Image from 'next/image';
import { fill, type Media, type Project } from '@/content';
import { useHref, useT } from './ContentProvider';
import { TransitionLink } from './PageTransition';
import LivePreview from './LivePreview';
import Lightbox from './Lightbox';
import Magnetic from './Magnetic';
import InlineCta from './InlineCta';
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
  const t = useT();
  const href = useHref();
  const [aoVivo, setAoVivo] = useState(false);
  const [ampliada, setAmpliada] = useState<Media | null>(null);

  return (
    <article>
      {/* ================================================================
          MANCHETE — tela cheia
          ================================================================ */}
      <header className="shell flex min-h-[92svh] flex-col justify-between pb-[var(--space-8)] pt-[calc(var(--header-h)+var(--space-7))]">
        <div>
          <p className="index-line">
            <TransitionLink
              href={href('/#work')}
              className="hit inline-flex items-center gap-[var(--space-2)] transition-transform duration-[var(--duration-normal)] hover:-translate-x-[3px]"
              cursor="back"
            >
              <span aria-hidden="true">←</span> {t.project.back}
            </TransitionLink>
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
              <dt className="label label--dim">{t.project.year}</dt>
              <dd className="mt-[var(--space-2)] text-[0.95rem]">{p.year}</dd>
            </div>
            <div>
              <dt className="label label--dim">{t.project.role}</dt>
              <dd className="mt-[var(--space-2)] text-[0.95rem]">{p.role.join(', ')}</dd>
            </div>
            <div>
              <dt className="label label--dim">{t.project.disciplines}</dt>
              <dd className="mt-[var(--space-2)] text-[0.95rem]">{p.disciplines.join(' / ')}</dd>
            </div>
            <div>
              <dt className="label label--dim">{t.project.status}</dt>
              <dd className="mt-[var(--space-2)] text-[0.95rem]">
                {p.live ? t.project.live : t.project.archived}
              </dd>
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
              <Rotulo>{t.project.challengeLabel}</Rotulo>
              <Lines lines={t.project.challengeLines} as="h2" className="display-lg" />
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
          <Rotulo>{t.project.approachLabel}</Rotulo>
          <Lines lines={t.project.approachLines} as="h2" className="display-lg" />
        </Reveal>

        <RevealGroup as="ol" className="mt-[var(--space-8)] flex flex-col">
          {p.approach.map((a) => (
            <RevealItem
              as="li"
              key={a.step}
              className="grid-12 gap-y-[var(--space-3)] border-t py-[var(--space-6)]"
              style={{ borderColor: 'var(--line)' }}
            >
              <div className="col-span-12 md:col-span-3">
                <p className="label" style={{ color: 'var(--accent)' }}>
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
          <Rotulo>{t.project.systemLabel}</Rotulo>
          <Lines lines={t.project.systemLines} as="h2" className="display-lg" />
        </Reveal>

        {/* ---- cor ----
             As amostras são quadrados grandes com o hex escrito embaixo. Um
             círculo pequeno com o nome ao lado seria mais bonito e diria
             menos: aqui a cor precisa aparecer em área suficiente pra ser
             julgada, que é o que uma paleta é. */}
        <div className="mt-[var(--space-8)]">
          <Reveal>
            <p className="label label--dim">{t.project.palette}</p>
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
            <p className="label label--dim">{t.project.typography}</p>
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
              <p className="label label--dim">{t.project.components}</p>
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
                <p className="label label--dim">{t.project.grid}</p>
                <p className="body mt-[var(--space-2)]" style={{ color: 'var(--text-primary)' }}>
                  {p.system.grid}
                </p>
              </div>
              <div className="border-t py-[var(--space-4)]" style={{ borderColor: 'var(--line)' }}>
                <p className="label label--dim">{t.project.spacing}</p>
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
              <Rotulo>{t.project.developmentLabel}</Rotulo>
              <Lines lines={t.project.developmentLines} as="h2" className="display-lg" />
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <RevealGroup as="ul" className="flex flex-col">
              {p.stack.map((t) => (
                <RevealItem
                  as="li"
                  key={t}
                  className="border-t py-[var(--space-4)]"
                  style={{ borderColor: 'var(--line)' }}
                >
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
              <p className="label label--dim">{t.project.outcome}</p>
            </Reveal>
          </div>
          <RevealGroup as="ol" className="col-span-12 md:col-span-8 md:col-start-5 flex flex-col">
            {p.outcome.map((r) => (
              <RevealItem
                as="li"
                key={r}
                className="flex items-baseline gap-[var(--space-4)] border-t py-[var(--space-4)]"
                style={{ borderColor: 'var(--line)' }}
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.6em] block h-px w-[var(--space-6)] shrink-0"
                  style={{ background: 'var(--accent)' }}
                />
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
        {/* -------------------------------------------------------------
            A GALERIA VIROU UMA CHAPA SÓ, E ELA ABRE.

            Duas coisas estavam erradas aqui ao mesmo tempo.

            A primeira: eram duas capturas lado a lado, e uma delas era
            **literalmente a mesma imagem** que abre o estudo de caso alguns
            metros de rolagem acima. A pessoa via o mesmo print duas vezes na
            mesma página, com uma faixa de rolagem horizontal montada em
            volta pra acomodar a repetição. Ficou a que não se repete: a
            captura da página inteira do site no ar.

            A segunda: a figura era marcada com `data-cursor="look"`, então o
            cursor virava uma bolha escrita LOOK por cima dela — e não havia
            clique nenhum. O único botão que funcionava era o "ver no ar".
            Agora o clique abre a chapa em tela cheia, onde ela aparece
            **inteira e rolável**: são 1400 x 4400, e no fluxo ela é cortada
            em 72svh, então o visitante via o topo do site do cliente e mais
            nada.

            Com uma imagem só, some junto o contêiner de rolagem horizontal
            (não há o que rolar) e a dica de "arraste ou use as setas", que
            passaria a instruir um gesto que não existe mais.
            ------------------------------------------------------------- */}
        <div className="shell">
          <Reveal>
            <Rotulo>{t.project.experienceLabel}</Rotulo>
            <Lines lines={t.project.experienceLines} as="h2" className="display-lg" />
          </Reveal>

          {p.gallery.slice(0, 1).map((g) => (
            <Reveal key={g.src} delay={0.1}>
              <figure className="mt-[var(--space-8)]">
                <button
                  type="button"
                  onClick={() => setAmpliada(g)}
                  data-cursor="look"
                  aria-label={fill(t.livePreview.screenshots, p.title)}
                  className="media block w-full"
                >
                  <Image
                    src={g.src}
                    alt={g.alt}
                    width={g.width}
                    height={g.height}
                    sizes="(max-width: 1160px) 92vw, 1080px"
                    loading="lazy"
                    className="w-full"
                    style={{ maxHeight: '72svh', objectFit: 'cover', objectPosition: 'top' }}
                  />
                </button>
                {g.caption && (
                  <figcaption className="label label--dim mt-[var(--space-3)]">
                    {g.caption}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          ))}
        </div>

        {/* ---- saídas ---- */}
        <div className="shell mt-[var(--space-8)]">
          <Reveal>
            <div className="flex flex-wrap items-center gap-[var(--space-4)]">
              {p.live && (
                <Magnetic>
                  {/* abre o site aqui dentro, não numa aba nova: quem sai
                      pra outra aba quase nunca volta pro estudo de caso */}
                  <button type="button" onClick={() => setAoVivo(true)} className="btn" data-cursor="open">
                    {t.project.visitLive}
                  </button>
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
                    {t.project.source} <span aria-hidden="true">↗</span>
                  </a>
                </Magnetic>
              ) : (
                <p className="body-sm">{t.project.privateRepo}</p>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          A SAÍDA COMERCIAL

          O estudo de caso terminava em "próximo projeto", e só. Quem leu
          duas mil palavras sobre o processo é exatamente quem contrataria,
          e era devolvido pro laço em vez de pro contato. O convite vem
          primeiro; o próximo projeto continua logo abaixo, como segunda
          opção pra quem quer continuar lendo.
          ================================================================ */}
      <section className="shell mt-[var(--space-10)]">
        <InlineCta pergunta={t.project.ctaEnd} acao={t.project.ctaEndLink} />
      </section>

      {/* ================================================================
          PRÓXIMO
          ================================================================ */}
      <section
        className="mt-[var(--space-10)] border-t pt-[var(--space-8)]"
        style={{ borderColor: 'var(--line)' }}
      >
        <TransitionLink href={href(`/work/${proximo.slug}`)} className="group block" cursor="case">
          <div className="shell">
            <p className="label label--dim mb-[var(--space-4)]">{t.project.nextProject}</p>
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

      {aoVivo && p.live && (
        <LivePreview
          url={p.live}
          title={p.title}
          embeddable={p.embeddable}
          aoFechar={() => setAoVivo(false)}
        />
      )}

      {ampliada && (
        <Lightbox
          src={ampliada.src}
          alt={ampliada.alt}
          width={ampliada.width}
          height={ampliada.height}
          legenda={ampliada.caption}
          aoFechar={() => setAmpliada(null)}
        />
      )}
    </article>
  );
}
