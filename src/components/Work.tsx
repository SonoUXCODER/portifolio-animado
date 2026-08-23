'use client';

import Image from 'next/image';
import { projects, type Project } from '@/data/projects';
import SectionMark from './SectionMark';
import { TransitionLink } from './PageTransition';
import { Parallax, Reveal, WordsUp } from './Reveal';
import { useSectionSpy } from '@/hooks/useSectionSpy';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   PROJETOS.

   Cada trabalho recebe a composição que o print dele pede, não a mesma
   moldura repetida cinco vezes. O campo `layout` em projects.ts escolhe:

     full         imagem larga, texto embaixo em duas colunas
     small-right  texto à esquerda, imagem menor deslocada à direita
     vertical     print comprido em coluna estreita, texto ao lado
     duo          duas imagens montadas, uma mais alta que a outra

   É por isso que a seção não parece uma grade de cards: nenhuma peça tem a
   mesma proporção da anterior. O trilho vertical à esquerda é a única coisa
   que se repete — é ele que diz que ainda é o mesmo capítulo.

   O trilho usa o mesmo observer da navegação e só aparece em `lg`: no
   estreito ele roubaria a largura de que o texto precisa.

   Não existe link pro site do cliente, aqui nem no estudo de caso. Quem
   chega vê o trabalho por dentro deste portfólio; `live` é informação sobre
   o estado do projeto, nunca uma saída. Decisão antiga, mantida de propósito.
   ------------------------------------------------------------------------- */

const numero = (i: number) => String(i + 1).padStart(2, '0');

/* ---------- a ficha de texto, igual em toda peça ---------- */
function Ficha({ project, index }: { project: Project; index: number }) {
  return (
    <>
      <div className="flex flex-wrap items-baseline gap-x-[var(--space-4)] gap-y-[var(--space-1)]">
        <span className="figure text-[0.8rem]" style={{ color: 'var(--accent)' }}>
          {numero(index)}
        </span>
        <span className="label">{project.year}</span>
        {project.selo && <span className="label">{project.selo}</span>}
      </div>

      <h3 id={`projeto-${project.slug}-titulo`} className="display-md mt-[var(--space-3)]">
        <TransitionLink
          href={`/projetos/${project.slug}`}
          className="link hit"
          cursor="abrir"
          aria-label={`Ver o estudo de caso de ${project.title}`}
        >
          {project.title}
        </TransitionLink>
      </h3>

      <p className="body mt-[var(--space-3)] max-w-[46ch]">{project.description}</p>

      <ul className="mt-[var(--space-4)] flex flex-wrap gap-x-[var(--space-4)] gap-y-[var(--space-2)]">
        {project.technologies.map((t) => (
          <li key={t} className="label">
            {t}
          </li>
        ))}
      </ul>

      <p className="mt-[var(--space-5)]">
        <TransitionLink
          href={`/projetos/${project.slug}`}
          className="btn btn--ghost"
          cursor="abrir"
          aria-label={`Abrir o estudo de caso de ${project.title}`}
        >
          Estudo de caso
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

function Peca({ project, index }: { project: Project; index: number }) {
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
      className="scroll-mt-[var(--header-h)]"
    >
      <Reveal direction="none">{composicao}</Reveal>
    </article>
  );
}

export default function Work() {
  const ids = projects.map((p) => `projeto-${p.slug}`);
  const ativo = useSectionSpy(ids);
  const indiceAtivo = Math.max(0, ids.indexOf(ativo));

  return (
    <section
      id="projetos"
      aria-labelledby="projetos-titulo"
      className="shell scroll-mt-[var(--header-h)] py-[var(--space-10)]"
    >
      <SectionMark id="projetos" />

      <div className="mt-[var(--space-8)] max-w-[24ch]">
        <WordsUp as="h2" text="Cinco trabalhos, por dentro." className="display-lg" />
        <span id="projetos-titulo" className="sr-only">
          Projetos
        </span>
      </div>

      <Reveal delay={0.1}>
        <p className="lead mt-[var(--space-5)] max-w-[48ch]">
          Cada um traz o problema que existia antes de mim, a decisão que tomei e o que ficou de pé
          depois. O print é o resultado; o texto é o motivo.
        </p>
      </Reveal>

      <div className="relative mt-[var(--space-9)]">
        {/* ---- trilho de leitura ----
             Marca em qual peça o olho está. Decorativo no sentido estrito —
             a informação já está no número de cada ficha — então sai da
             árvore de acessibilidade e some no estreito. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[var(--space-7)] top-0 hidden h-full w-[var(--space-5)] lg:block"
        >
          <ul className="sticky top-[calc(var(--header-h)+var(--space-7))] flex flex-col gap-[var(--space-3)]">
            {projects.map((p, i) => (
              <li
                key={p.slug}
                className="figure text-[0.7rem] transition-colors duration-[var(--duration-normal)]"
                style={{ color: i === indiceAtivo ? 'var(--accent)' : 'var(--text-tertiary)' }}
              >
                {numero(i)}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-[var(--space-10)]">
          {projects.map((p, i) => (
            <Peca key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
