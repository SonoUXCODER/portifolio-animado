'use client';

import Image from 'next/image';
import { projects, type Project } from '@/data/projects';
import Kicker from './Kicker';
import { TransitionLink } from './PageTransition';
import { Parallax, Reveal, WordsUp } from './Reveal';
import { useSectionSpy } from '@/hooks/useSectionSpy';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   O ARQUIVO.

   Cada projeto é uma entrada, não um card: número, ano, categoria, estado,
   e uma nota escrita à mão sobre o que aconteceu ali. A ficha de catálogo é
   o que faz cinco trabalhos parecerem um acervo em vez de uma vitrine.

   O `layout` de cada projeto escolhe a composição, e é ele que impede a
   seção de virar grade — nenhuma entrada tem a proporção da anterior:

     full         imagem larga, texto embaixo em duas colunas
     small-right  texto à esquerda, imagem menor deslocada à direita
     vertical     print comprido em coluna estreita, texto ao lado
     duo          duas imagens montadas, uma mais alta que a outra

   O número da entrada é grande de propósito e vem antes de tudo: é ele que
   diz "isto é um acervo, e isto é o item três dele". Sai da posição no
   array — inserir um projeto no meio renumera o resto sozinho.

   Não existe link pro site do cliente, aqui nem no estudo de caso. Quem
   chega vê o trabalho por dentro deste arquivo; `live` é informação sobre o
   estado da entrada, nunca uma saída. Decisão antiga, mantida de propósito.
   ------------------------------------------------------------------------- */

const numero = (i: number) => String(i + 1).padStart(3, '0');

/* ---------- a ficha ---------- */
function Ficha({ project, index }: { project: Project; index: number }) {
  return (
    <>
      {/* ---- cabeçalho da entrada ---- */}
      <div className="flex flex-wrap items-baseline gap-x-[var(--space-3)] gap-y-[var(--space-1)]">
        <span className="label" style={{ color: 'var(--accent)' }}>
          #{numero(index)}
        </span>
        <span className="kicker__sep" aria-hidden="true">
          ·
        </span>
        <span className="label">{project.year}</span>
        <span className="kicker__sep" aria-hidden="true">
          ·
        </span>
        <span className="label">{project.categoria}</span>
        <span className="kicker__sep" aria-hidden="true">
          ·
        </span>
        {/* o estado é dado, não enfeite: sai de `live`, que é a fonte */}
        <span className="label" style={project.live ? { color: 'var(--text-secondary)' } : undefined}>
          {project.live ? 'no ar' : 'arquivado'}
        </span>
      </div>

      <h3 id={`projeto-${project.slug}-titulo`} className="display-md mt-[var(--space-4)]">
        <TransitionLink
          href={`/projetos/${project.slug}`}
          className="link hit"
          cursor="abrir"
          aria-label={`Abrir o estudo de caso de ${project.title}`}
        >
          {project.title}
        </TransitionLink>
      </h3>

      <p className="body mt-[var(--space-3)] max-w-[46ch]">{project.description}</p>

      {/* ---- a nota ----
           Recuada e com o traço na frente: é a única coisa da entrada que
           não é dado, e precisa parecer escrita depois, na margem. */}
      <p className="nota mt-[var(--space-4)] flex max-w-[44ch] gap-[var(--space-3)]">
        <span aria-hidden="true" style={{ color: 'var(--accent)' }}>
          ↳
        </span>
        {project.nota}
      </p>

      <ul className="mt-[var(--space-5)] flex flex-wrap gap-x-[var(--space-3)] gap-y-[var(--space-2)]">
        {project.technologies.map((t, i) => (
          <li key={t} className="label flex items-baseline gap-[var(--space-3)]">
            {t}
            {i < project.technologies.length - 1 && (
              <span className="kicker__sep" aria-hidden="true">
                /
              </span>
            )}
          </li>
        ))}
      </ul>

      <p className="mt-[var(--space-6)]">
        <TransitionLink
          href={`/projetos/${project.slug}`}
          className="btn btn--ghost"
          cursor="abrir"
          aria-label={`Ver como ${project.title} foi feito`}
        >
          Ver como foi feito
        </TransitionLink>
      </p>
    </>
  );
}

/* ---------- a imagem, sempre em moldura e com parallax curto ---------- */
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
      <figure className={cn('media w-full', ratio)}>
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

function Entrada({ project, index }: { project: Project; index: number }) {
  const primeira = index === 0;
  const capa = project.image;
  const segunda = project.gallery[0];

  const composicao = {
    full: (
      <div className="grid-12 gap-y-[var(--space-6)]">
        <div className="group col-span-12">
          <Chapa
            src={capa.src}
            alt={capa.alt}
            width={capa.width}
            height={capa.height}
            ratio="aspect-[16/10] sm:aspect-[2/1]"
            priority={primeira}
            sizes="(max-width: 1024px) 92vw, 78vw"
          />
        </div>
        <div className="col-span-12 md:col-span-7">
          <Ficha project={project} index={index} />
        </div>
      </div>
    ),

    'small-right': (
      <div className="grid-12 items-center gap-y-[var(--space-6)]">
        <div className="col-span-12 md:col-span-5">
          <Ficha project={project} index={index} />
        </div>
        <div className="group col-span-12 md:col-span-6 md:col-start-7">
          <Chapa
            src={capa.src}
            alt={capa.alt}
            width={capa.width}
            height={capa.height}
            ratio="aspect-[4/3]"
            sizes="(max-width: 768px) 92vw, 44vw"
          />
        </div>
      </div>
    ),

    vertical: (
      <div className="grid-12 items-center gap-y-[var(--space-6)]">
        <div className="group col-span-12 sm:col-span-6 md:col-span-4">
          <Chapa
            src={capa.src}
            alt={capa.alt}
            width={capa.width}
            height={capa.height}
            ratio="aspect-[3/4] md:aspect-[9/16]"
            strength={46}
            sizes="(max-width: 768px) 60vw, 28vw"
          />
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <Ficha project={project} index={index} />
        </div>
      </div>
    ),

    duo: (
      <div className="grid-12 gap-y-[var(--space-6)]">
        <div className="group col-span-12 sm:col-span-7">
          <Chapa
            src={capa.src}
            alt={capa.alt}
            width={capa.width}
            height={capa.height}
            ratio="aspect-[4/3]"
            sizes="(max-width: 640px) 92vw, 50vw"
          />
        </div>
        {segunda && (
          <div className="group col-span-12 sm:col-span-4 sm:col-start-9 sm:self-end">
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
      id={`projeto-${project.slug}`}
      aria-labelledby={`projeto-${project.slug}-titulo`}
      className="scroll-mt-[var(--header-h)] border-t pt-[var(--space-7)]"
      style={{ borderColor: 'var(--border)' }}
    >
      {/* ---- o algarismo da entrada, grande, na margem ----
           Some da árvore de acessibilidade porque o mesmo número já está
           escrito na ficha, em texto. Aqui ele é desenho. */}
      <div
        aria-hidden="true"
        className="numeral mb-[var(--space-6)] text-[clamp(3rem,9vw,7rem)]"
        style={{ color: 'var(--border-strong)' }}
      >
        {numero(index)}
      </div>

      <Reveal direction="none">{composicao}</Reveal>
    </article>
  );
}

export default function Archive() {
  const ids = projects.map((p) => `projeto-${p.slug}`);
  const ativo = useSectionSpy(ids);
  const indiceAtivo = Math.max(0, ids.indexOf(ativo));

  return (
    <section
      id="arquivo"
      aria-labelledby="arquivo-titulo"
      className="shell scroll-mt-[var(--header-h)] py-[var(--space-10)]"
    >
      <Kicker id="arquivo" />

      <div className="mt-[var(--space-7)] max-w-[13ch]">
        {/* quebrado em três linhas de propósito: o título é a imagem da cena */}
        <WordsUp as="h2" text="Cinco coisas que ficaram de pé" className="display-lg" />
        <span id="arquivo-titulo" className="sr-only">
          Arquivo
        </span>
      </div>

      <Reveal delay={0.1}>
        <p className="lead mt-[var(--space-6)] max-w-[48ch]">
          Cada entrada traz o problema que existia antes de mim, a decisão que tomei e o que
          sobrou depois. A imagem é o resultado; o texto é o motivo.
        </p>
      </Reveal>

      <div className="relative mt-[var(--space-9)]">
        {/* ---- trilho de leitura ----
             Marca em qual entrada o olho está. Decorativo no sentido estrito
             — o número já está escrito em cada ficha — então sai da árvore de
             acessibilidade e some no estreito. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[var(--space-7)] top-0 hidden h-full w-[var(--space-5)] lg:block"
        >
          <ul className="sticky top-[calc(var(--header-h)+var(--space-7))] flex flex-col gap-[var(--space-3)]">
            {projects.map((p, i) => (
              <li
                key={p.slug}
                className="label transition-colors duration-[var(--duration-normal)]"
                style={{ color: i === indiceAtivo ? 'var(--accent)' : 'var(--text-tertiary)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-[var(--space-10)]">
          {projects.map((p, i) => (
            <Entrada key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
