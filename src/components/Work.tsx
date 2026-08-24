'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { fill, type Project } from '@/content';
import { useConteudo, useHref } from './ContentProvider';
import type { Content } from '@/content';
import SectionIndex from './SectionIndex';
import Statement from './Statement';
import LivePreview from './LivePreview';
import Magnetic from './Magnetic';
import InlineCta from './InlineCta';
import { TransitionLink } from './PageTransition';
import { Lines, Reveal } from './Reveal';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   SELECTED WORK.

   Cada projeto é um capítulo, não um cartão: ocupa quase uma tela, e tem
   uma nota escrita à mão sobre o que aconteceu ali. A diferença entre
   "portfólio" e "catálogo" mora nessa nota.

   >>> A COMPOSIÇÃO <<<
   O `layout` de cada projeto escolhe a forma, e é ele que impede a seção de
   virar grade. Nenhuma entrada tem a proporção da anterior:

     wide    chapa larga em 2:1, texto embaixo em coluna estreita
     offset  texto à esquerda, chapa menor deslocada à direita
     tall    print vertical comprido em coluna estreita, texto ao lado
     split   duas chapas montadas, uma mais alta que a outra

   >>> O MOVIMENTO <<<
   Cada capítulo vem de longe, chega ao plano da tela, e volta pra longe.
   Vertical com eixo Z: é aproximação de verdade, com perspectiva, e não
   `scale` imitando. Detalhes e o custo de cada escolha estão no comentário
   de <Folha/>, logo abaixo.

   Dois cuidados que fazem isso ser uma cena e não um efeito:
   1. a perspectiva mora no contêiner da lista, e não em cada capítulo.
      Uma perspectiva por elemento faz cada um ter o próprio ponto de fuga,
      e o conjunto perde a sensação de espaço único;
   2. o progresso passa por mola. Sem ela a rolagem picotada aparece como
      tremor na borda da imagem.

   >>> O QUE MUDOU DE PROPÓSITO <<<
   Saiu a numeração (`01 / 05`) e o trilho de leitura com os cinco números.
   Os dois orientavam, mas davam à seção o ar de formulário — e a posição na
   página já diz onde a pessoa está.

   Saiu também a regra antiga de não ter saída pro site do cliente. Agora
   tem, mas sem tirar ninguém daqui: `<LivePreview/>` abre o site rodando
   dentro do portfólio.
   ------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
   As declarações que entram no meio da sequência.

   A chave é o índice do projeto *depois* do qual a frase aparece. Elas
   existem porque cinco capítulos seguidos, por melhor que cada um seja,
   viram uma pilha. Uma frase em 8rem no vazio é o respiro que separa um ato
   do outro.

   Duas, e só duas. Uma a cada dois projetos é ritmo; uma entre cada par é
   refrão, e refrão cansa antes do terceiro.
   ------------------------------------------------------------------------- */
const POSICOES = [1, 3];

/* -------------------------------------------------------------------------
   A PROFUNDIDADE.

   O capítulo entra vindo de longe e sai voltando pra longe. É movimento
   vertical com eixo Z de verdade: a perspectiva mora no contêiner da lista,
   então `translateZ` produz a escala em perspectiva sozinho, do mesmo jeito
   que um objeto se aproximando produziria. Não é `scale` fingindo
   profundidade, e a diferença aparece na borda da imagem.

   >>> O QUE FOI DESFEITO, E POR QUÊ <<<
   A versão anterior inclinava o capítulo em `rotateX` de 12° e animava
   `opacity` no mesmo nó. As duas coisas eram caras pelo mesmo motivo: o nó
   é a coluna inteira do projeto, com quatro mil pixels de altura.

     rotateX   a caixa de composição de um elemento girado em 3D é o volume
               que ele varre, não o retângulo em que ele está. Girar uma
               coluna de 4000px cria uma textura absurda na GPU, e eram
               cinco delas vivas ao mesmo tempo.
     opacity   deixar um nó translúcido obriga o navegador a desenhar a
               subárvore inteira num buffer separado e só então misturar.
               Numa coluna com imagem grande, isso é raster de tela cheia a
               cada quadro de rolagem.
     will-change  estava fixo em 'transform, opacity'. Isso não é dica, é
               ordem: o navegador promove as cinco colunas a camada e as
               mantém em memória mesmo muito longe da tela.

   Agora: `translateZ` e `translateY`, que são a mesma matriz e não custam
   raster nenhum, e o escurecimento virou uma **cortina** — um retângulo de
   cor sólida por cima, com a opacidade nele. Compor um retângulo opaco é
   barato; deixar uma subárvore translúcida não é. O efeito na tela é o
   mesmo, o custo não.
   ------------------------------------------------------------------------- */
function Folha({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzido = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const suave = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.4 });

  /* longe -> perto -> longe. 260px de curso em Z, que com a perspectiva de
     1600px do contêiner dá cerca de 14% de variação aparente de tamanho:
     o bastante pra ler como aproximação, pouco o bastante pra o texto não
     entrar borrado. */
  const z = useTransform(suave, [0, 0.3, 0.7, 1], [-260, 0, 0, -200]);
  /* o deslocamento vertical corre contra a rolagem, então o capítulo parece
     frear ao chegar e acelerar ao sair */
  const y = useTransform(suave, [0, 0.3, 0.7, 1], [70, 0, 0, -70]);
  /* a cortina: 0 no meio da passagem, escura nas pontas */
  const veu = useTransform(suave, [0, 0.32, 0.68, 1], [0.72, 0, 0, 0.72]);

  if (reduzido) return <div ref={ref}>{children}</div>;

  return (
    <div ref={ref} className="relative">
      <motion.div style={{ z, y, transformStyle: 'preserve-3d' }}>{children}</motion.div>

      {/* A cortina fica por cima e não recebe evento nenhum. Ela é da cor do
          fundo, então escurecer é literalmente aproximar a página do preto
          em vez de apagar o conteúdo. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'var(--background)', opacity: veu }}
      />
    </div>
  );
}

/* ---------- a ficha ---------- */
function Ficha({ project, aoVer, t }: { project: Project; aoVer: () => void; t: Content }) {
  const href = useHref();

  return (
    <>
      <h3 className="display-lg">
        <TransitionLink
          href={href(`/work/${project.slug}`)}
          className="hit inline-block transition-colors duration-[var(--duration-normal)] group-hover:text-[var(--accent)]"
          cursor="case"
          aria-label={fill(t.work.openCase, project.title)}
        >
          {project.title}
        </TransitionLink>
      </h3>

      {/* disciplina */}
      <p className="label mt-[var(--space-4)] flex flex-wrap items-center gap-x-[var(--space-3)] gap-y-[var(--space-1)]">
        {project.disciplines.map((d, i) => (
          <span key={d} className="flex items-center gap-[var(--space-3)]">
            {d}
            {i < project.disciplines.length - 1 && (
              <span className="index-line__sep" aria-hidden="true">
                /
              </span>
            )}
          </span>
        ))}
      </p>

      <p className="body mt-[var(--space-5)] max-w-[44ch]">{project.summary}</p>

      {/* a nota: a única coisa da entrada que não é dado. Recuada e com o
          traço na frente, pra parecer escrita depois, na margem. */}
      <p className="body-sm mt-[var(--space-4)] flex max-w-[46ch] gap-[var(--space-3)] italic">
        <span aria-hidden="true" style={{ color: 'var(--accent)' }}>
          ↳
        </span>
        {project.note}
      </p>

      {/* ---- ficha técnica ---- */}
      <dl className="mt-[var(--space-6)] grid grid-cols-2 gap-[var(--space-5)] sm:grid-cols-3">
        <div>
          <dt className="label label--dim">{t.work.roleLabel}</dt>
          <dd className="body-sm mt-[var(--space-2)]" style={{ color: 'var(--text-primary)' }}>
            {project.role.slice(0, 3).join(', ')}
          </dd>
        </div>
        <div>
          <dt className="label label--dim">{t.work.stackLabel}</dt>
          <dd className="body-sm mt-[var(--space-2)]" style={{ color: 'var(--text-primary)' }}>
            {project.stack.join(', ')}
          </dd>
        </div>
        <div>
          <dt className="label label--dim">{t.work.yearLabel}</dt>
          <dd className="body-sm mt-[var(--space-2)]" style={{ color: 'var(--text-primary)' }}>
            {project.year} <span className="index-line__sep">/</span> {project.badge}
          </dd>
        </div>
      </dl>

      <div className="mt-[var(--space-7)] flex flex-wrap items-center gap-[var(--space-4)]">
        {project.live && (
          <Magnetic>
            <button type="button" onClick={aoVer} className="btn" data-cursor="open">
              {t.work.seeLive}
            </button>
          </Magnetic>
        )}
        <Magnetic>
          <TransitionLink
            href={href(`/work/${project.slug}`)}
            className="btn btn--ghost"
            cursor="case"
            aria-label={fill(t.work.readCase, project.title)}
          >
            {t.work.caseStudy} <span aria-hidden="true">↗</span>
          </TransitionLink>
        </Magnetic>
      </div>
    </>
  );
}

/* ---------- a chapa ----------
   O quadro inteiro é um link pro estudo de caso. Antes só o título e o
   botão levavam pra lá, e a imagem — que é a coisa grande e óbvia de
   clicar — não fazia nada. Todo mundo clica na imagem primeiro. */
function Chapa({
  project,
  media,
  ratio,
  priority = false,
  sizes,
}: {
  project: Project;
  media: { src: string; alt: string; width: number; height: number };
  ratio: string;
  priority?: boolean;
  sizes: string;
}) {
  const href = useHref();

  return (
    <TransitionLink
      href={href(`/work/${project.slug}`)}
      className="block"
      cursor="case"
      tabIndex={-1}
      /* -1 porque o título logo ao lado já leva ao mesmo lugar: dois paradas
         de teclado pro mesmo destino é ruído pra quem navega por Tab */
      aria-hidden="true"
    >
      <figure className={cn('media media--dim w-full', ratio)}>
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          sizes={sizes}
          priority={priority}
          className="h-full w-full"
        />
      </figure>
    </TransitionLink>
  );
}

function Capitulo({
  project,
  index,
  aoVer,
  t,
}: {
  project: Project;
  index: number;
  aoVer: () => void;
  t: Content;
}) {
  const primeira = index === 0;
  const capa = project.cover;
  const segunda = project.gallery[0];

  const composicao = {
    wide: (
      <div className="grid-12 gap-y-[var(--space-7)]">
        <div className="col-span-12">
          <Chapa
            project={project}
            media={capa}
            ratio="aspect-[16/10] sm:aspect-[2/1]"
            priority={primeira}
            sizes="(max-width: 1024px) 92vw, 88vw"
          />
        </div>
        <div className="col-span-12 md:col-span-7">
          <Ficha project={project} aoVer={aoVer} t={t} />
        </div>
      </div>
    ),

    offset: (
      <div className="grid-12 items-center gap-y-[var(--space-7)]">
        <div className="col-span-12 md:col-span-5">
          <Ficha project={project} aoVer={aoVer} t={t} />
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <Chapa
            project={project}
            media={capa}
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
            project={project}
            media={capa}
            ratio="aspect-[3/4] md:aspect-[9/16]"
            sizes="(max-width: 768px) 65vw, 30vw"
          />
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6">
          <Ficha project={project} aoVer={aoVer} t={t} />
        </div>
      </div>
    ),

    split: (
      <div className="grid-12 gap-y-[var(--space-7)]">
        <div className="col-span-12 sm:col-span-7">
          <Chapa
            project={project}
            media={capa}
            ratio="aspect-[4/3]"
            sizes="(max-width: 640px) 92vw, 52vw"
          />
        </div>
        {segunda && (
          <div className="col-span-12 sm:col-span-4 sm:col-start-9 sm:self-end">
            <Chapa
              project={project}
              media={segunda}
              ratio="aspect-[3/4]"
              sizes="(max-width: 640px) 92vw, 28vw"
            />
          </div>
        )}
        <div className="col-span-12 md:col-span-7">
          <Ficha project={project} aoVer={aoVer} t={t} />
        </div>
      </div>
    ),
  }[project.layout];

  return (
    <article id={`work-${project.slug}`} aria-label={project.title} className="group scroll-mt-[var(--header-h)]">
      {/* ---- régua do capítulo ---- */}
      <div
        className="mb-[var(--space-7)] flex flex-wrap items-baseline justify-between gap-[var(--space-4)] border-t pt-[var(--space-4)]"
        style={{ borderColor: 'var(--line)' }}
      >
        <p className="label" style={{ color: 'var(--text-primary)' }}>
          {project.kind}
        </p>
        <p className="label label--dim">{project.year}</p>
      </div>

      <Reveal direction="none">{composicao}</Reveal>
    </article>
  );
}

export default function Work() {
  const { t, projects } = useConteudo();
  /* qual projeto está aberto no visualizador; null = nenhum */
  const [aoVivo, setAoVivo] = useState<Project | null>(null);

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="shell scroll-mt-[var(--header-h)] py-[var(--space-10)]"
    >
      <SectionIndex id="work" />

      <div className="grid-12 mt-[var(--space-8)] gap-y-[var(--space-6)]">
        <div className="col-span-12 lg:col-span-7">
          <Lines lines={t.work.lines} as="h2" className="display-xl" />
          <span id="work-title" className="sr-only">
            {t.sections.work.name}
          </span>
        </div>

        <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
          <Reveal delay={0.1}>
            <p className="body">
              {t.work.intro}
            </p>
          </Reveal>
        </div>
      </div>

      {/* A perspectiva mora aqui, uma vez só, e vale pra todos os capítulos:
          é o que faz eles parecerem folhas na mesma mesa em vez de cinco
          animações independentes que por acaso são parecidas. */}
      <div className="mt-[var(--space-10)] flex flex-col gap-[var(--space-10)]" style={{ perspective: 1600 }}>
        {projects.map((p, i) => {
          /* a declaração que entra depois deste projeto, se houver */
          const decl = t.work.statements[POSICOES.indexOf(i)];
          return (
            <div key={p.slug} className="flex flex-col gap-[var(--space-10)]">
              <Folha>
                <Capitulo project={p} index={i} aoVer={() => setAoVivo(p)} t={t} />
              </Folha>
              {POSICOES.includes(i) && decl && (
                <Statement lines={decl.lines} align={decl.align} />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-[var(--space-10)]">
        <InlineCta pergunta={t.work.ctaAfter} acao={t.work.ctaAfterLink} />
      </div>

      {aoVivo?.live && (
        <LivePreview
          url={aoVivo.live}
          title={aoVivo.title}
          embeddable={aoVivo.embeddable}
          aoFechar={() => setAoVivo(null)}
        />
      )}
    </section>
  );
}
