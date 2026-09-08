"use client";

import { m as motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { useMemo, useRef } from "react";
import { cn } from "@/lib/cn";
import { useMovimentoReduzido } from "@/lib/hooks";
import { DUR, EASE_STANDARD, STAGGER, TRANSITION, VIEWPORT } from "@/lib/motion";

type Direcao = "up" | "down" | "left" | "right" | "none";

const DESLOCAMENTO: Record<Direcao, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: -28, y: 0 },
  right: { x: 28, y: 0 },
  none: { x: 0, y: 0 },
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const comoMotion = (as: ElementType) => (motion as any)[as as string] ?? motion.div;

/** Entra ao aparecer na tela. */
export function Surge({
  children,
  className,
  direction = "up",
  delay = 0,
  style,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direcao;
  delay?: number;
  style?: CSSProperties;
  as?: ElementType;
}) {
  const reduzido = useMovimentoReduzido();
  const d = DESLOCAMENTO[direction];
  const Tag = comoMotion(as);
  return (
    <Tag
      className={className}
      style={style}
      initial={reduzido ? { opacity: 0 } : { opacity: 0, x: d.x, y: d.y }}
      whileInView={reduzido ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
      viewport={VIEWPORT}
      transition={{ ...TRANSITION, delay, duration: reduzido ? DUR.fast : TRANSITION.duration }}
    >
      {children}
    </Tag>
  );
}

/** Container que escalona a entrada dos filhos (<ItemCascata>). */
export function Cascata({
  children,
  className,
  step = STAGGER,
  delay = 0,
  as = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  step?: number;
  delay?: number;
  as?: ElementType;
  style?: CSSProperties;
}) {
  const Tag = comoMotion(as);
  return (
    <Tag
      className={className}
      style={style}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      transition={{ staggerChildren: step, delayChildren: delay }}
    >
      {children}
    </Tag>
  );
}

export function ItemCascata({
  children,
  className,
  direction = "up",
  as = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direcao;
  as?: ElementType;
  style?: CSSProperties;
}) {
  const reduzido = useMovimentoReduzido();
  const d = DESLOCAMENTO[direction];
  const Tag = comoMotion(as);
  return (
    <Tag
      className={className}
      style={style}
      variants={{
        hidden: reduzido ? { opacity: 0 } : { opacity: 0, x: d.x, y: d.y },
        shown: reduzido ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 },
      }}
      transition={{ ...TRANSITION, duration: reduzido ? DUR.fast : TRANSITION.duration }}
    >
      {children}
    </Tag>
  );
}

/** Deslocamento suave contra a rolagem. */
export function Paralaxe({
  children,
  className,
  strength = 40,
  style,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzido = useMovimentoReduzido();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const suave = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 });
  const y = useTransform(suave, [0, 1], [strength, -strength]);
  return (
    <div ref={ref} className={className} style={style}>
      <motion.div style={reduzido ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/** A régua fina que cresce ao lado dos rótulos de seção. */
export function ReguaAnimada({ className }: { className?: string }) {
  const reduzido = useMovimentoReduzido();
  return (
    <span aria-hidden className={cn("index-line__rule", className)} style={{ background: "none" }}>
      <motion.span
        className="block h-full w-full origin-left"
        style={{ background: "var(--line)" }}
        initial={reduzido ? { opacity: 0 } : { scaleX: 0 }}
        whileInView={reduzido ? { opacity: 1 } : { scaleX: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: reduzido ? DUR.fast : 1.15, ease: EASE_STANDARD }}
      />
    </span>
  );
}

/** Barra de progresso da página, no topo. */
export function ProgressoDaPagina() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[75] h-[2px] w-full origin-left"
      style={{ scaleX, background: "var(--accent)" }}
    />
  );
}

/**
 * Título em linhas que sobem de dentro de uma máscara.
 * `cinema` troca por palavras que chegam com desfoque (usado só no hero).
 */
export function LinhasQueSobem({
  lines,
  className,
  as = "h2",
  delay = 0,
  immediate = false,
  id,
  cinema = false,
}: {
  lines: string[];
  className?: string;
  as?: ElementType;
  delay?: number;
  immediate?: boolean;
  id?: string;
  cinema?: boolean;
}) {
  const reduzido = useMovimentoReduzido();
  const Tag = comoMotion(as);
  const gatilho = immediate
    ? { animate: "shown" as const }
    : { whileInView: "shown" as const, viewport: VIEWPORT };

  if (reduzido) {
    return (
      <Tag
        id={id}
        className={className}
        initial={{ opacity: 0 }}
        {...(immediate ? { animate: { opacity: 1 } } : { whileInView: { opacity: 1 }, viewport: VIEWPORT })}
        transition={{ duration: DUR.fast, delay }}
      >
        {lines.map((linha, i) => (
          <span key={`${linha}-${i}`} className="block">
            {linha}
          </span>
        ))}
      </Tag>
    );
  }

  if (cinema) {
    return (
      <Tag
        id={id}
        className={className}
        initial="hidden"
        {...gatilho}
        transition={{ staggerChildren: 0.075, delayChildren: delay }}
      >
        {lines.map((linha, i) => {
          const palavras = linha.split(" ");
          return (
            <span key={`${linha}-${i}`} className="block">
              {palavras.map((palavra, j) => (
                <motion.span
                  key={`${palavra}-${j}`}
                  className="inline-block"
                  variants={{
                    hidden: { opacity: 0, y: "0.34em", filter: "blur(16px)" },
                    shown: { opacity: 1, y: "0em", filter: "blur(0px)" },
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 13, mass: 0.9 }}
                >
                  {palavra}
                  {j < palavras.length - 1 ? " " : ""}
                </motion.span>
              ))}
            </span>
          );
        })}
      </Tag>
    );
  }

  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      {...gatilho}
      transition={{ staggerChildren: 0.08, delayChildren: delay }}
    >
      {lines.map((linha, i) => (
        <span key={`${linha}-${i}`} className="block overflow-hidden pt-[0.12em] [margin-top:-0.12em]">
          <motion.span
            className="block"
            variants={{ hidden: { y: "106%" }, shown: { y: "0%" } }}
            transition={{ duration: 1, ease: EASE_STANDARD }}
          >
            {linha}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * Parágrafo que acende palavra por palavra conforme entra na tela.
 *
 * Uma assinatura de rolagem por parágrafo — não uma por palavra, como antes.
 * O JS escreve `--p`; o degradê entre as palavras é `calc()` puro (globals.css).
 */
export function TextoQueAcende({
  texto,
  className,
  as = "p",
}: {
  texto: string;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduzido = useMovimentoReduzido();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.35"] });
  const palavras = useMemo(() => texto.split(" "), [texto]);
  const Tag = comoMotion(as);
  const Simples = as as ElementType;

  if (reduzido) return <Simples className={className}>{texto}</Simples>;

  return (
    <Tag
      ref={ref}
      className={cn("palavras", className)}
      style={{ "--n": palavras.length, "--p": scrollYProgress } as CSSProperties}
    >
      {palavras.map((palavra, i) => (
        <span key={`${palavra}-${i}`} style={{ "--i": i } as CSSProperties}>
          {i < palavras.length - 1 ? `${palavra} ` : palavra}
        </span>
      ))}
    </Tag>
  );
}
