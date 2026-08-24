'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { fill, type Content, type Project } from '@/content';
import { useConteudo, useHref } from './ContentProvider';
import SectionIndex from './SectionIndex';
import LivePreview from './LivePreview';
import Magnetic from './Magnetic';
import InlineCta from './InlineCta';
import { TransitionLink } from './PageTransition';
import { Lines, Reveal } from './Reveal';
import { useMedia } from '@/hooks/useMedia';

/* -------------------------------------------------------------------------
   SELECTED WORK — a galeria horizontal.

   A seção prende na tela e os capítulos correm de lado enquanto a pessoa
   rola pra baixo. É o único lugar do site onde a leitura muda de eixo, e é
   de propósito: o resto da página é uma coluna, e essa quebra é o que faz o
   trabalho parecer uma sala separada em vez de mais uma seção.

   >>> POR QUE FIXAR E TRANSLADAR, E NÃO overflow-x <<<
   Um contêiner com rolagem horizontal nativa parece mais simples e é pior
   em duas coisas que importam: no desktop com roda de mouse a pessoa
   simplesmente não consegue rolar de lado, e o teclado só chega lá se o
   contêiner virar região focável. Aqui a rolagem continua sendo a vertical
   de sempre — seta, espaço, Page Down e roda funcionam sem saber que existe
   uma galeria — e o movimento lateral é consequência dela.

   No toque a conta se inverte: o dedo arrasta de lado nativamente, e fixar
   a tela num celular costuma dar a sensação de que a página travou. Por
   isso abaixo de 1024px a mesma lista vira uma faixa com rolagem nativa e
   scroll-snap, sem prender nada.

   >>> A PROFUNDIDADE <<<
   Cada painel encolhe e escurece conforme se afasta do centro da tela. Não
   é enfeite: com os painéis em 76vw, dois vizinhos ficam sempre visíveis
   nas bordas, e sem a profundidade os três competiriam pela atenção. O que
   está no centro é o que está sendo lido; o resto recua.

   >>> A DENSIDADE CAIU, E ISSO É O PREÇO <<<
   Um painel tem de caber em uma tela, então saiu a tabela de papel, stack e
   ano que existia na versão em coluna. O que sobrou é o que decide se a
   pessoa clica: nome, disciplina, uma linha do que é, a nota, a stack numa
   linha só, e os dois botões. O resto está no estudo de caso, a um clique.
   ------------------------------------------------------------------------- */

/** largura de cada painel de projeto, em % da tela */
const PAINEL_VW = 76;
/** largura dos painéis de declaração, que são só uma frase */
const FRASE_VW = 46;
/** depois de qual projeto entra cada declaração */
const POSICOES = [1, 3];

type Item =
  | { tipo: 'projeto'; project: Project }
  | { tipo: 'frase'; lines: string[]; align: 'left' | 'right' };

function montarItens(projects: Project[], t: Content): Item[] {
  const out: Item[] = [];
  projects.forEach((project, i) => {
    out.push({ tipo: 'projeto', project });
    const j = POSICOES.indexOf(i);
    if (j > -1 && t.work.statements[j]) out.push({ tipo: 'frase', ...t.work.statements[j] });
  });
  return out;
}

/* -------------------------------------------------------------------------
   O PAINEL

   Componente próprio, e não um trecho dentro do map, porque cada um precisa
   dos próprios `useTransform`. Hook dentro de laço só é legal enquanto a
   contagem não muda entre renders; extrair tira a armadilha de vez.
   ------------------------------------------------------------------------- */
function Painel({
  children,
  progresso,
  centro,
  janela,
  largura,
  reduzido,
}: {
  children: React.ReactNode;
  progresso: MotionValue<number>;
  /** em que ponto do progresso (0..1) este painel está no meio da tela */
  centro: number;
  /** quanto de progresso separa um painel do vizinho */
  janela: number;
  largura: number;
  reduzido: boolean;
}) {
  const faixa = [centro - janela, centro, centro + janela];
  const escala = useTransform(progresso, faixa, [0.82, 1, 0.82]);
  const veu = useTransform(progresso, faixa, [0.72, 0, 0.72]);

  return (
    /* a perspectiva mora no painel: ela só alcança filho direto, e um ponto
       de fuga compartilhado por uma faixa de sete telas de largura
       distorceria as pontas */
    <div
      className="relative h-full shrink-0"
      style={{ width: `${largura}vw`, perspective: 1400 }}
    >
      <motion.div
        className="flex h-full items-center"
        style={reduzido ? undefined : { scale: escala, transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>

      {!reduzido && (
        /* a cortina em vez de opacidade no conteúdo: compor um retângulo de
           cor sólida é barato, deixar uma subárvore translúcida não é */
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'var(--background)', opacity: veu }}
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
   O CONTEÚDO DE UM PROJETO
   ------------------------------------------------------------------------- */
function Cartao({
  project,
  aoVer,
  t,
  prioridade,
}: {
  project: Project;
  aoVer: () => void;
  t: Content;
  prioridade: boolean;
}) {
  const href = useHref();

  return (
    <article
      id={`work-${project.slug}`}
      aria-label={project.title}
      className="group grid w-full grid-cols-1 items-center gap-[var(--space-6)] px-[var(--space-5)] lg:grid-cols-[1.15fr_1fr] lg:gap-[var(--space-8)]"
    >
      {/* ---- a chapa ----
           O quadro inteiro leva ao estudo de caso. `aria-hidden` e tabIndex
           -1 porque o título ao lado leva ao mesmo lugar, e duas paradas de
           teclado pro mesmo destino é ruído. */}
      <TransitionLink
        href={href(`/work/${project.slug}`)}
        className="block"
        cursor="case"
        tabIndex={-1}
        aria-hidden="true"
      >
        <figure className="media media--dim aspect-[4/3] max-h-[52svh] w-full lg:max-h-[62svh]">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(max-width: 1024px) 88vw, 44vw"
            priority={prioridade}
            className="h-full w-full"
          />
        </figure>
      </TransitionLink>

      {/* ---- a ficha ---- */}
      <div>
        <p className="label label--dim">
          {project.kind} <span className="index-line__sep">·</span> {project.year}
        </p>

        <h3 className="display-lg mt-[var(--space-4)]">
          <TransitionLink
            href={href(`/work/${project.slug}`)}
            className="hit inline-block transition-colors duration-[var(--duration-normal)] group-hover:text-[var(--accent)]"
            cursor="case"
            aria-label={fill(t.work.openCase, project.title)}
          >
            {project.title}
          </TransitionLink>
        </h3>

        <p className="label mt-[var(--space-4)] flex flex-wrap items-center gap-x-[var(--space-3)]">
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

        <p className="body mt-[var(--space-5)] max-w-[42ch]">{project.summary}</p>

        <p className="body-sm mt-[var(--space-4)] flex max-w-[44ch] gap-[var(--space-3)] italic">
          <span aria-hidden="true" style={{ color: 'var(--accent)' }}>
            ↳
          </span>
          {project.note}
        </p>

        <p className="label label--dim mt-[var(--space-5)]">{project.stack.join(' · ')}</p>

        <div className="mt-[var(--space-6)] flex flex-wrap items-center gap-[var(--space-4)]">
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
      </div>
    </article>
  );
}

function Frase({ lines, align }: { lines: string[]; align: 'left' | 'right' }) {
  return (
    <div className={`w-full px-[var(--space-5)] ${align === 'right' ? 'text-right' : ''}`}>
      <Lines lines={lines} as="p" className="display-xl" />
    </div>
  );
}

/* -------------------------------------------------------------------------
   A FAIXA FIXADA — desktop
   ------------------------------------------------------------------------- */
function Faixa({ itens, aoVer, t }: { itens: Item[]; aoVer: (p: Project) => void; t: Content }) {
  const trilho = useRef<HTMLDivElement>(null);
  const palco = useRef<HTMLDivElement>(null);
  const reduzido = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: trilho, offset: ['start start', 'end end'] });
  const suave = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.35 });

  /* Quanto o trilho anda: a largura total menos uma tela. Em vw, porque é a
     unidade em que os painéis foram declarados, e assim a conta continua
     certa quando a janela muda de tamanho sem precisar medir nada. */
  const larguraTotal = itens.reduce(
    (soma, it) => soma + (it.tipo === 'projeto' ? PAINEL_VW : FRASE_VW),
    0,
  );
  const curso = Math.max(1, larguraTotal - 100);
  const x = useTransform(suave, [0, 1], ['0vw', `-${curso}vw`]);

  /* o centro de cada painel, em progresso de 0 a 1 */
  const centros: number[] = [];
  let acumulado = 0;
  for (const it of itens) {
    const w = it.tipo === 'projeto' ? PAINEL_VW : FRASE_VW;
    const centroVw = acumulado + w / 2 - 50;
    centros.push(Math.min(1, Math.max(0, centroVw / curso)));
    acumulado += w;
  }
  const janela = PAINEL_VW / curso;

  /* Tabular pra um link dentro de um painel fora de vista faz o navegador
     tentar trazê-lo pra tela rolando o contêiner na horizontal, e aí a
     posição real deixa de bater com a do transform. Devolver o scrollLeft
     pra zero mantém as duas fontes de verdade em uma só. */
  useEffect(() => {
    const el = palco.current;
    if (!el) return;
    const conserta = () => {
      if (el.scrollLeft !== 0) el.scrollLeft = 0;
    };
    el.addEventListener('scroll', conserta, { passive: true });
    return () => el.removeEventListener('scroll', conserta);
  }, []);

  return (
    /* a altura é a distância de rolagem: uma tela por painel, mais uma
       folga pra o último não sair correndo */
    <div ref={trilho} style={{ height: `${itens.length * 90 + 40}svh` }}>
      <div ref={palco} className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="flex h-full items-center pt-[var(--header-h)]" style={{ x }}>
          {itens.map((it, i) => (
            <Painel
              key={it.tipo === 'projeto' ? it.project.slug : `frase-${i}`}
              progresso={suave}
              centro={centros[i]}
              janela={janela}
              largura={it.tipo === 'projeto' ? PAINEL_VW : FRASE_VW}
              reduzido={Boolean(reduzido)}
            >
              {it.tipo === 'projeto' ? (
                <Cartao
                  project={it.project}
                  aoVer={() => aoVer(it.project)}
                  t={t}
                  prioridade={i === 0}
                />
              ) : (
                <Frase lines={it.lines} align={it.align} />
              )}
            </Painel>
          ))}
        </motion.div>

        <Progresso progresso={suave} />
      </div>
    </div>
  );
}

/** a régua fina no pé da faixa, que diz quanto falta */
function Progresso({ progresso }: { progresso: MotionValue<number> }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-[var(--gutter)] bottom-[var(--space-6)] h-px"
      style={{ background: 'var(--line)' }}
    >
      <motion.div
        className="h-full origin-left"
        style={{ background: 'var(--accent)', scaleX: progresso }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------
   A FAIXA NATIVA — toque

   No dedo a rolagem lateral já existe e é boa. Fixar a tela num celular dá
   a sensação de que a página travou, então aqui não se prende nada: é
   overflow-x com scroll-snap, que é o gesto que a pessoa já conhece.
   ------------------------------------------------------------------------- */
function FaixaToque({
  itens,
  aoVer,
  t,
}: {
  itens: Item[];
  aoVer: (p: Project) => void;
  t: Content;
}) {
  return (
    <div
      role="region"
      aria-label={t.sections.work.name}
      tabIndex={0}
      /* a margem lateral do site vira padding do trilho e do snap: sem
         isso o primeiro cartão encosta na borda da tela e o último não tem
         pra onde parar centralizado */
      className="mt-[var(--space-8)] flex snap-x snap-mandatory gap-[var(--space-6)] overflow-x-auto px-[var(--gutter)] pb-[var(--space-5)]"
      style={{ scrollPaddingInline: 'var(--gutter)' }}
    >
      {itens.map((it, i) =>
        it.tipo === 'projeto' ? (
          <div key={it.project.slug} className="w-[86vw] shrink-0 snap-center">
            <Cartao
              project={it.project}
              aoVer={() => aoVer(it.project)}
              t={t}
              prioridade={i === 0}
            />
          </div>
        ) : (
          <div key={`frase-${i}`} className="flex w-[70vw] shrink-0 snap-center items-center">
            <Frase lines={it.lines} align="left" />
          </div>
        ),
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
   A SEÇÃO
   ------------------------------------------------------------------------- */
export default function Work() {
  const { t, projects } = useConteudo();
  const [aoVivo, setAoVivo] = useState<Project | null>(null);
  const desktop = useMedia('(min-width: 1024px)');
  const itens = montarItens(projects, t);

  return (
    <>
      <section
        id="work"
        aria-labelledby="work-title"
        className="scroll-mt-[var(--header-h)] pt-[var(--space-10)]"
      >
        <div className="shell">
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
                <p className="body">{t.work.intro}</p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* `useMedia` só responde no cliente, então o servidor entrega sempre
            a faixa de toque. É a escolha certa pra esse empate: ela é HTML
            comum, funciona sem JavaScript nenhum, e não prende a tela. */}
        {desktop ? (
          <Faixa itens={itens} aoVer={setAoVivo} t={t} />
        ) : (
          <FaixaToque itens={itens} aoVer={setAoVivo} t={t} />
        )}

        <div className="shell mt-[var(--space-9)]">
          <InlineCta pergunta={t.work.ctaAfter} acao={t.work.ctaAfterLink} />
        </div>
      </section>

      {aoVivo?.live && (
        <LivePreview
          url={aoVivo.live}
          title={aoVivo.title}
          embeddable={aoVivo.embeddable}
          aoFechar={() => setAoVivo(null)}
        />
      )}
    </>
  );
}
