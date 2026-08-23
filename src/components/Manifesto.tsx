'use client';

import Image from 'next/image';
import { currentYear, site } from '@/data/site';
import { projects } from '@/data/projects';
import { stack } from '@/data/stack';
import { startYear } from '@/data/experience';
import SectionIndex from './SectionIndex';
import { Counter, Lines, Parallax, Reveal, RevealGroup, RevealItem } from './Reveal';

/* -------------------------------------------------------------------------
   MANIFESTO.

   A seção "sobre" de um portfólio quase sempre falha do mesmo jeito: vira
   uma lista de adjetivos sobre a pessoa. Aqui ela é uma afirmação sobre o
   *material* — "code is my material" — e o resto da seção é a prova de que
   a frase tem lastro: o método em quatro tempos, e quatro números que se
   contam sozinhos a partir dos arquivos de dados.

   Nenhum número é digitado à mão. Acrescentar um projeto em data/projects
   muda a estatística aqui, no rodapé e no sitemap, e nada mais precisa ser
   lembrado. É a diferença entre um número que envelhece e um que não.

   A cadeia DESIGN → SYSTEM → BUILD → SHIP fica embaixo do texto e não é
   decoração: é a resposta curta pra única pergunta que um cliente faz antes
   de fechar, que é "como é trabalhar com você".
   ------------------------------------------------------------------------- */

const cadeia = [
  { step: 'Design', note: 'Research, flows, interface — decided while it is still cheap to change.' },
  { step: 'System', note: 'Tokens and components, so the second screen costs a fraction of the first.' },
  { step: 'Build', note: 'Written by hand. No builder, no theme, no handoff between two people.' },
  { step: 'Ship', note: 'Domain, metrics, and the first visit from someone who is not me.' },
];

export default function Manifesto() {
  const anos = currentYear() - startYear;

  const estatisticas: Array<{ valor: number; sufixo?: string; rotulo: string }> = [
    { valor: projects.length, rotulo: 'Products shipped' },
    { valor: anos, sufixo: '+', rotulo: 'Years building' },
    { valor: stack.length, rotulo: 'Tools in production' },
    { valor: 3, rotulo: 'Languages spoken' },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="shell scroll-mt-[var(--header-h)] py-[var(--space-10)]"
    >
      <SectionIndex id="about" />

      {/* ================= a afirmação ================= */}
      <div className="grid-12 mt-[var(--space-8)] gap-y-[var(--space-8)]">
        <div className="col-span-12 lg:col-span-7">
          <Lines lines={['Code is', 'my material.']} as="h2" className="display-xl" />
          <span id="about-title" className="sr-only">
            About
          </span>
        </div>

        <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
          <RevealGroup className="flex flex-col gap-[var(--space-4)]" delay={0.1}>
            <RevealItem>
              <p className="body">
                I work between design systems, interfaces, front-end architecture and digital
                experiences. My process connects strategy, UX, visual design and engineering —
                because I learned both halves at the same time, with nobody to hand the other one to.
              </p>
            </RevealItem>
            <RevealItem>
              <p className="body">
                That used to be a limitation. Now it is the argument: the interface decision is made
                already knowing what it costs to build, and the code is written already knowing what
                it has to feel like. Nothing is lost in translation, because there is no translation.
              </p>
            </RevealItem>
          </RevealGroup>
        </div>
      </div>

      {/* ================= retrato + cadeia ================= */}
      <div className="grid-12 mt-[var(--space-10)] gap-y-[var(--space-8)]">
        <div className="col-span-12 sm:col-span-6 lg:col-span-4">
          <Parallax strength={30}>
            <figure className="media media--dim aspect-[4/5] w-full max-w-[420px]">
              <Image
                src="/assets/foto-cracha.webp"
                alt={`Portrait of ${site.name}`}
                width={620}
                height={827}
                sizes="(max-width: 640px) 80vw, 400px"
                className="h-full w-full"
              />
            </figure>
          </Parallax>
          <Reveal delay={0.1}>
            <p className="label label--dim mt-[var(--space-4)]">
              {site.handle} <span className="index-line__sep">/</span> {site.city}, {site.country}
            </p>
          </Reveal>
        </div>

        {/* ---- o método em quatro tempos ----
             Cada etapa é uma linha com filete, não um cartão. Quatro cartões
             lado a lado é a forma que todo template usa pra dizer "processo",
             e ela dá a mesma leitura em qualquer site. A linha empilhada dá
             ritmo de documento. */}
        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <Reveal>
            <p className="label label--dim">The method, every time</p>
          </Reveal>

          <RevealGroup as="ol" className="mt-[var(--space-5)] flex flex-col">
            {cadeia.map((c, i) => (
              <RevealItem
                as="li"
                key={c.step}
                className="grid grid-cols-[auto_1fr] items-baseline gap-x-[var(--space-5)] gap-y-[var(--space-2)] border-t py-[var(--space-5)]"
                style={{ borderColor: 'var(--line)' }}
              >
                <span className="label label--accent">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="display-md">{c.step}</h3>
                  <p className="body mt-[var(--space-2)] max-w-[46ch]">{c.note}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <p
              className="label mt-[var(--space-6)] flex flex-wrap items-center gap-[var(--space-3)]"
              style={{ color: 'var(--text-primary)' }}
            >
              {cadeia.map((c, i) => (
                <span key={c.step} className="flex items-center gap-[var(--space-3)]">
                  {c.step}
                  {i < cadeia.length - 1 && (
                    <span aria-hidden="true" style={{ color: 'var(--accent)' }}>
                      →
                    </span>
                  )}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </div>

      {/* ================= os números ================= */}
      <RevealGroup
        as="dl"
        className="mt-[var(--space-10)] grid grid-cols-2 gap-x-[var(--space-5)] gap-y-[var(--space-8)] border-t pt-[var(--space-6)] lg:grid-cols-4"
        style={{ borderColor: 'var(--line)' }}
      >
        {estatisticas.map((e) => (
          /* `flex-col-reverse` põe o número em cima sem inverter o HTML: em
             <dl> o <dt> tem de vir antes do <dd>, e um leitor de tela que
             recebesse "05" antes de "products shipped" leria um número solto */
          <RevealItem key={e.rotulo} className="flex flex-col-reverse">
            <dt className="label mt-[var(--space-4)]">{e.rotulo}</dt>
            <dd className="numeral text-[clamp(3.5rem,8vw,7rem)]">
              <Counter to={e.valor} suffix={e.sufixo} pad={2} />
            </dd>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
