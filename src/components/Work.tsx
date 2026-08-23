'use client';

import Image from 'next/image';
import { projects, projectTotal, type Project } from '@/data/projects';
import SectionIndex from './SectionIndex';
import Statement from './Statement';
import { TransitionLink } from './PageTransition';
import { Lines, Parallax, Reveal } from './Reveal';
import { useSectionSpy } from '@/hooks/useSectionSpy';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   SELECTED WORK — a seção principal.

   Cada projeto é um capítulo, não um cartão: ocupa quase uma tela, tem
   número, ano, disciplina e uma nota escrita à mão sobre o que aconteceu
   ali. A diferença entre "portfólio" e "catálogo" mora nessa nota.

   O `layout` de cada projeto escolhe a composição, e é ele que impede a
   seção de virar grade — nenhuma entrada tem a proporção da anterior:

     wide    chapa larga em 2:1, texto embaixo em coluna estreita
     offset  texto à esquerda, chapa menor deslocada à direita
     tall    print vertical comprido em coluna estreita, texto ao lado
     split   duas chapas montadas, uma mais alta que a outra

   O número do capítulo é grande de propósito e vem antes de tudo: é ele que
   diz "isto é um acervo, e isto é o item três dele". Sai da posição no
   array — inserir um projeto no meio renumera o resto sozinho.

   O hover não é um efeito: é o quadro saindo da penumbra. Em repouso toda
   chapa está em brightness 0.72; a que está sob o cursor volta pra 1 e
   ganha 4% de escala. É a mesma gramática de uma sala com foco de luz, e é
   o motivo de a listagem inteira funcionar sem uma única sombra ou borda
   arredondada.
   ------------------------------------------------------------------------- */

const numero = (i: number) => String(i + 1).padStart(2, '0');

/* -------------------------------------------------------------------------
   As declarações que entram no meio da sequência.

   A chave é o índice do projeto *depois* do qual a frase aparece. Elas
   existem porque cinco capítulos seguidos, por melhor que cada um seja,
   viram uma pilha — e a pilha é o que faz um portfólio parecer uma lista.
   Uma frase em 8rem no vazio, no meio do caminho, é o respiro que separa
   um ato do outro.

   Duas, e só duas. Uma a cada dois projetos é ritmo; uma entre cada par é
   um refrão, e refrão cansa antes do terceiro.
   ------------------------------------------------------------------------- */
const declaracoes: Record<number, { lines: string[]; align: 'left' | 'right' }> = {
  1: { lines: ['Design with', 'intention.'], align: 'left' },
  3: { lines: ['Build with', 'precision.'], align: 'right' },
};

/* ---------- a ficha ---------- */
function Ficha({ project, index }: { project: Project; index: number }) {
  return (
    <>
      <h3 className="display-lg">
        <TransitionLink
          href={`/work/${project.slug}`}
          className="hit inline-block transition-colors duration-[var(--duration-normal)] group-hover:text-[var(--accent)]"
          cursor="case"
          aria-label={`Open the ${project.title} case study`}
        >
          {project.title}
        </TransitionLink>
      </h3>

      {/* disciplina — `UX/UI — FRONTEND — FULL-STACK` */}
      <p className="label mt-[var(--space-4)] flex flex-wrap items-center gap-x-[var(--space-3)] gap-y-[var(--space-1)]">
        {project.disciplines.map((d, i) => (
          <span key={d} className="flex items-center gap-[var(--space-3)]">
            {d}
            {i < project.disciplines.length - 1 && (
              <span className="index-line__sep" aria-hidden="true">
                —
              </span>
            )}
          </span>
        ))}
      </p>

      <p className="body mt-[var(--space-5)] max-w-[44ch]">{project.summary}</p>

      {/* a nota: a única coisa da entrada que não é dado. Fica recuada e com
          o traço na frente, pra parecer escrita depois, na margem. */}
      <p className="body-sm mt-[var(--space-4)] flex max-w-[46ch] gap-[var(--space-3)] italic">
        <span aria-hidden="true" style={{ color: 'var(--accent)' }}>
          ↳
        </span>
        {project.note}
      </p>

      {/* ---- ficha técnica ---- */}
      <dl className="mt-[var(--space-6)] grid grid-cols-2 gap-[var(--space-5)] sm:grid-cols-3">
        <div>
          <dt className="label label--dim">Role</dt>
          <dd className="body-sm mt-[var(--space-2)]" style={{ color: 'var(--text-primary)' }}>
            {project.role.slice(0, 3).join(', ')}
          </dd>
        </div>
        <div>
          <dt className="label label--dim">Stack</dt>
          <dd className="body-sm mt-[var(--space-2)]" style={{ color: 'var(--text-primary)' }}>
            {project.stack.join(', ')}
          </dd>
        </div>
        <div>
          <dt className="label label--dim">Type</dt>
          <dd className="body-sm mt-[var(--space-2)]" style={{ color: 'var(--text-primary)' }}>
            {project.badge}
          </dd>
        </div>
      </dl>

      <p className="mt-[var(--space-7)]">
        <TransitionLink
          href={`/work/${project.slug}`}
          className="btn btn--ghost"
          cursor="case"
          aria-label={`Read the ${project.title} case study`}
        >
          View case study <span aria-hidden="true">↗</span>
        </TransitionLink>
      </p>

      <span className="sr-only">Project {numero(index)}</span>
    </>
  );
}

/* ---------- a chapa, sempre com parallax curto ---------- */
function Chapa({
  src,
  alt,
  width,
  height,
  ratio,
  strength = 34,
  priority = false,
  sizes,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  ratio: string;
  strength?: number;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <Parallax strength={strength}>
      <figure className={cn('media media--dim w-full', ratio)} data-cursor="case">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className="h-full w-full"
        />
      </figure>
    </Parallax>
  );
}

function Capitulo({ project, index }: { project: Project; index: number }) {
  const primeira = index === 0;
  const capa = project.cover;
  const segunda = project.gallery[0];

  const composicao = {
    wide: (
      <div className="grid-12 gap-y-[var(--space-7)]">
        <div className="col-span-12">
          <Chapa
            src={capa.src}
            alt={capa.alt}
            width={capa.width}
            height={capa.height}
            ratio="aspect-[16/10] sm:aspect-[2/1]"
            priority={primeira}
            sizes="(max-width: 1024px) 92vw, 88vw"
          />
        </div>
        <div className="col-span-12 md:col-span-7">
          <Ficha project={project} index={index} />
        </div>
      </div>
    ),

    offset: (
      <div className="grid-12 items-center gap-y-[var(--space-7)]">
        <div className="col-span-12 md:col-span-5">
          <Ficha project={project} index={index} />
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <Chapa
            src={capa.src}
            alt={capa.alt}
            width={capa.width}
            height={capa.height}
            ratio="aspect-[4/3]"
            sizes="(max-width: 768px) 92vw, 46vw"
          />
        </div>
      </div>
    ),

    tall: (
      <div className="grid-12 items-center gap-y-[var(--space-7)]">
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <Chapa
            src={capa.src}
            alt={capa.alt}
            width={capa.width}
            height={capa.height}
            ratio="aspect-[3/4] md:aspect-[9/16]"
            strength={46}
            sizes="(max-width: 768px) 65vw, 30vw"
          />
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6">
          <Ficha project={project} index={index} />
        </div>
      </div>
    ),

    split: (
      <div className="grid-12 gap-y-[var(--space-7)]">
        <div className="col-span-12 sm:col-span-7">
          <Chapa
            src={capa.src}
            alt={capa.alt}
            width={capa.width}
            height={capa.height}
            ratio="aspect-[4/3]"
            sizes="(max-width: 640px) 92vw, 52vw"
          />
        </div>
        {segunda && (
          <div className="col-span-12 sm:col-span-4 sm:col-start-9 sm:self-end">
            <Chapa
              src={segunda.src}
              alt={segunda.alt}
              width={segunda.width}
              height={segunda.height}
              ratio="aspect-[3/4]"
              strength={54}
              sizes="(max-width: 640px) 92vw, 28vw"
            />
          </div>
        )}
        <div className="col-span-12 md:col-span-7">
          <Ficha project={project} index={index} />
        </div>
      </div>
    ),
  }[project.layout];

  return (
    <article
      id={`work-${project.slug}`}
      aria-label={project.title}
      className="group scroll-mt-[var(--header-h)]"
    >
      {/* ---- cabeçalho do capítulo ----
           Número, ano e tipo numa régua só, encostada no filete que separa
           um capítulo do outro. É a linha que dá o ar de ficha de acervo. */}
      <div
        className="mb-[var(--space-7)] flex flex-wrap items-baseline justify-between gap-[var(--space-4)] border-t pt-[var(--space-4)]"
        style={{ borderColor: 'var(--line)' }}
      >
        <p className="index-line">
          <span className="index-line__n">{numero(index)}</span>
          <span className="index-line__sep" aria-hidden="true">
            /
          </span>
          <span>{projectTotal}</span>
        </p>
        <p className="label label--dim">
          {project.kind} <span className="index-line__sep">·</span> {project.year}
        </p>
      </div>

      <Reveal direction="none">{composicao}</Reveal>
    </article>
  );
}

export default function Work() {
  const ids = projects.map((p) => `work-${p.slug}`);
  const ativo = useSectionSpy(ids);
  const indiceAtivo = Math.max(0, ids.indexOf(ativo));

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="shell scroll-mt-[var(--header-h)] py-[var(--space-10)]"
    >
      <SectionIndex id="work" />

      <div className="grid-12 mt-[var(--space-8)] gap-y-[var(--space-6)]">
        <div className="col-span-12 lg:col-span-7">
          <Lines lines={['Selected', 'work.']} as="h2" className="display-xl" />
          <span id="work-title" className="sr-only">
            Selected work
          </span>
        </div>

        <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
          <Reveal delay={0.1}>
            <p className="body">
              Five products, each one carried from the first conversation to the day someone who is
              not me opened it. Every case study states the problem that existed before, the
              decision I took, and what is still standing.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="relative mt-[var(--space-10)]">
        {/* ---- trilho de leitura ----
             Marca em qual capítulo o olho está. Decorativo no sentido
             estrito — o número já está escrito em cada régua — então sai da
             árvore de acessibilidade e some no estreito. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[var(--space-7)] top-0 hidden h-full w-[var(--space-5)] xl:block"
        >
          <ul className="sticky top-[calc(var(--header-h)+var(--space-7))] flex flex-col gap-[var(--space-3)]">
            {projects.map((p, i) => (
              <li
                key={p.slug}
                className="label transition-colors duration-[var(--duration-normal)]"
                style={{ color: i === indiceAtivo ? 'var(--accent)' : 'var(--text-tertiary)' }}
              >
                {numero(i)}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-[var(--space-10)]">
          {projects.map((p, i) => {
            const declaracao = declaracoes[i];
            return (
              <div key={p.slug} className="flex flex-col gap-[var(--space-10)]">
                <Capitulo project={p} index={i} />
                {declaracao && <Statement lines={declaracao.lines} align={declaracao.align} />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
