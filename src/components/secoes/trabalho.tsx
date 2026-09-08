"use client";

import { m as motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { LinhasQueSobem, TextoQueAcende } from "@/components/animacoes";
import { useHref } from "@/components/conteudo";
import Imagem from "@/components/imagem";
import Magnetico from "@/components/magnetico";
import { ChamadaFinal, IndiceDeSecao } from "@/components/pecas";
import PreviaAoVivo from "@/components/previa-ao-vivo";
import { LinkDeTransicao } from "@/components/transicao";
import { fill, type ProjectCard } from "@/content";
import type { Dictionary } from "@/content/types";
import { useMediaQuery, useMovimentoReduzido } from "@/lib/hooks";

const MEDIDAS = {
  desktop: { painel: 76, frase: 46, telaPorPainel: 90 },
  toque: { painel: 92, frase: 74, telaPorPainel: 72 },
} as const;

/** Depois de qual projeto entra cada frase de respiro. */
const POSICOES_DAS_FRASES = [1, 3];

type Item =
  | { tipo: "projeto"; project: ProjectCard }
  | { tipo: "frase"; lines: string[]; align?: "left" | "right" };

/* ------------------------------------------------------------------ *
 * um painel do trilho
 * ------------------------------------------------------------------ */
function Painel({
  children,
  progresso,
  centro,
  janela,
  largura,
  reduzido,
  leve,
}: {
  children: ReactNode | ((zoom: MotionValue<number> | undefined) => ReactNode);
  progresso: MotionValue<number>;
  centro: number;
  janela: number;
  largura: number;
  reduzido: boolean;
  leve: boolean;
}) {
  const faixa = [centro - janela, centro, centro + janela];
  const z = useTransform(progresso, faixa, [-520, 0, -520]);
  const rotateY = useTransform(progresso, faixa, [9, 0, -9]);
  const escurecer = useTransform(progresso, faixa, [0.78, 0, 0.78]);
  const escala = useTransform(progresso, faixa, [0.86, 1, 0.86]);
  const zoom = useTransform(progresso, faixa, [0.7, 1, 0.7]);

  return (
    <div
      className="relative h-full shrink-0"
      style={{ width: `${largura}vw`, ...(leve ? null : { perspective: 1100 }) }}
    >
      <motion.div
        className="flex h-full items-center"
        style={
          reduzido
            ? undefined
            : leve
              ? { scale: escala }
              : { z, rotateY, transformStyle: "preserve-3d" }
        }
      >
        {typeof children === "function" ? children(leve ? undefined : zoom) : children}
      </motion.div>
      {!reduzido && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--background)", opacity: escurecer }}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * cartão de projeto
 * ------------------------------------------------------------------ */
function Cartao({
  project,
  aoVer,
  t,
  prioridade,
  zoom,
}: {
  project: ProjectCard;
  aoVer: () => void;
  t: Dictionary["work"];
  prioridade: boolean;
  zoom?: MotionValue<number>;
}) {
  const href = useHref();
  return (
    <article
      id={`work-${project.slug}`}
      aria-label={project.title}
      className="group grid w-full grid-cols-1 items-center gap-[var(--space-6)] px-[var(--space-5)] lg:grid-cols-[1.15fr_1fr] lg:gap-[var(--space-8)]"
    >
      <LinkDeTransicao
        href={href(`/work/${project.slug}`)}
        className="block"
        cursor="case"
        tabIndex={-1}
        aria-hidden="true"
      >
        <figure className="media media--dim aspect-[16/10] max-h-[26svh] w-full sm:aspect-[4/3] sm:max-h-[52svh] lg:max-h-[62svh]">
          <Imagem
            src={(project.cover.src)}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            priority={prioridade}
            className="h-full w-full"
          />
        </figure>
      </LinkDeTransicao>

      <div>
        <p className="label label--dim">
          {project.kind} <span className="index-line__sep">·</span> {project.year}
        </p>

        <motion.h3 className="display-lg mt-[var(--space-4)] origin-left" style={zoom ? { scale: zoom } : undefined}>
          <LinkDeTransicao
            href={href(`/work/${project.slug}`)}
            className="hit inline-block transition-colors duration-[var(--duration-normal)] group-hover:text-[var(--accent)]"
            cursor="case"
            aria-label={fill(t.openCase, project.title)}
          >
            {project.title}
          </LinkDeTransicao>
        </motion.h3>

        <p className="label mt-[var(--space-4)] flex flex-wrap items-center gap-x-[var(--space-3)]">
          {project.disciplines.map((d, i) => (
            <span key={d} className="flex items-center gap-[var(--space-3)]">
              {d}
              {i < project.disciplines.length - 1 && (
                <span className="index-line__sep" aria-hidden>
                  /
                </span>
              )}
            </span>
          ))}
        </p>

        <p className="body mt-[var(--space-5)] max-w-[42ch]" style={{ color: "var(--text-primary)" }}>
          {project.summary}
        </p>

        <p className="body-sm mt-[var(--space-4)] flex max-w-[44ch] gap-[var(--space-3)] italic [@media(max-height:760px)]:hidden">
          <span aria-hidden style={{ color: "var(--accent)" }}>
            ↳
          </span>
          {project.note}
        </p>

        <p className="label label--dim mt-[var(--space-5)] [@media(max-height:760px)]:hidden">
          {project.stack.join(" · ")}
        </p>

        <div className="mt-[var(--space-6)] flex flex-wrap items-center gap-[var(--space-4)]">
          {project.live && (
            <Magnetico>
              <button type="button" onClick={aoVer} className="btn" data-cursor="open">
                {t.seeLive}
              </button>
            </Magnetico>
          )}
          <Magnetico>
            <LinkDeTransicao
              href={href(`/work/${project.slug}`)}
              className="btn btn--ghost btn--discreto"
              cursor="case"
              aria-label={fill(t.readCase, project.title)}
            >
              {t.caseStudy} <span aria-hidden>↗</span>
            </LinkDeTransicao>
          </Magnetico>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ *
 * trilho horizontal
 * ------------------------------------------------------------------ */
function Trilho({
  itens,
  aoVer,
  t,
  medidas,
  leve,
}: {
  itens: Item[];
  aoVer: (p: ProjectCard) => void;
  t: Dictionary["work"];
  medidas: (typeof MEDIDAS)["desktop"] | (typeof MEDIDAS)["toque"];
  leve: boolean;
}) {
  const trilho = useRef<HTMLDivElement>(null);
  const janela = useRef<HTMLDivElement>(null);
  const reduzido = useMovimentoReduzido();
  const { scrollYProgress } = useScroll({ target: trilho, offset: ["start start", "end end"] });
  const suave = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.35 });

  const larguraDe = (item: Item) => (item.tipo === "projeto" ? medidas.painel : medidas.frase);
  const percurso = Math.max(1, itens.reduce((soma, item) => soma + larguraDe(item), 0) - 100);
  const x = useTransform(suave, [0, 1], ["0vw", `-${percurso}vw`]);

  const centros: number[] = [];
  let acumulado = 0;
  for (const item of itens) {
    const largura = larguraDe(item);
    centros.push(Math.min(1, Math.max(0, (acumulado + largura / 2 - 50) / percurso)));
    acumulado += largura;
  }
  const meiaJanela = medidas.painel / percurso;

  /* teclado e trackpad podem rolar a janela de verdade; isso a devolve */
  useEffect(() => {
    const alvo = janela.current;
    if (!alvo) return;
    const corrigir = () => {
      if (alvo.scrollLeft !== 0) alvo.scrollLeft = 0;
    };
    alvo.addEventListener("scroll", corrigir, { passive: true });
    return () => alvo.removeEventListener("scroll", corrigir);
  }, []);

  return (
    <div ref={trilho} style={{ height: `${itens.length * medidas.telaPorPainel + 40}svh` }}>
      <div ref={janela} className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="flex h-full items-center pt-[var(--header-h)]" style={{ x }}>
          {itens.map((item, i) => (
            <Painel
              key={item.tipo === "projeto" ? item.project.slug : `frase-${i}`}
              progresso={suave}
              centro={centros[i]}
              janela={meiaJanela}
              largura={larguraDe(item)}
              reduzido={reduzido}
              leve={leve}
            >
              {item.tipo === "projeto"
                ? (zoom) => (
                    <Cartao
                      project={item.project}
                      aoVer={() => aoVer(item.project)}
                      t={t}
                      prioridade={i === 0}
                      zoom={reduzido ? undefined : zoom}
                    />
                  )
                : (
                    <div className={`w-full px-[var(--space-5)] ${item.align === "right" ? "text-right" : ""}`}>
                      <LinhasQueSobem lines={item.lines} as="p" className="display-xl" />
                    </div>
                  )}
            </Painel>
          ))}
        </motion.div>

        <div
          aria-hidden
          className="absolute inset-x-[var(--gutter)] bottom-[var(--space-6)] h-px"
          style={{ background: "var(--line)" }}
        >
          <motion.div className="h-full origin-left" style={{ background: "var(--accent)", scaleX: suave }} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * seção
 * ------------------------------------------------------------------ */
export default function Trabalho({
  t,
  projects,
  nomeSecao,
  assunto,
}: {
  t: Dictionary["work"];
  projects: ProjectCard[];
  nomeSecao: string;
  assunto: string;
}) {
  const [aberto, setAberto] = useState<ProjectCard | null>(null);
  const desktop = useMediaQuery("(min-width: 1024px)");

  const itens: Item[] = [];
  projects.forEach((project, i) => {
    itens.push({ tipo: "projeto", project });
    const pos = POSICOES_DAS_FRASES.indexOf(i);
    if (pos > -1 && t.statements[pos]) itens.push({ tipo: "frase", ...t.statements[pos] });
  });

  return (
    <>
      <section id="work" aria-labelledby="work-title" className="scroll-mt-[var(--header-h)] pt-[var(--space-10)]">
        <div className="shell">
          <IndiceDeSecao id="work" />
          <div className="grid-12 mt-[var(--space-8)] gap-y-[var(--space-6)]">
            <div className="col-span-12 lg:col-span-7">
              <LinhasQueSobem lines={t.lines} as="h2" className="display-xl" />
              <span id="work-title" className="sr-only">
                {nomeSecao}
              </span>
            </div>
            <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
              <TextoQueAcende texto={t.intro} className="body" />
            </div>
          </div>
        </div>

        <Trilho
          itens={itens}
          aoVer={setAberto}
          t={t}
          medidas={desktop ? MEDIDAS.desktop : MEDIDAS.toque}
          leve={!desktop}
        />

        <div className="shell mt-[var(--space-9)]">
          <ChamadaFinal pergunta={t.ctaAfter} acao={t.ctaAfterLink} assunto={assunto} />
        </div>
      </section>

      {aberto?.live && (
        <PreviaAoVivo
          url={aberto.live}
          title={aberto.title}
          embeddable={aberto.embeddable}
          aoFechar={() => setAberto(null)}
        />
      )}
    </>
  );
}
