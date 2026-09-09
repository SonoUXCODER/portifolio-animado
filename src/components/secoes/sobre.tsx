"use client";

import { m as motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";
import { Cascata, LinhasQueSobem, Paralaxe, Surge, TextoQueAcende } from "@/components/animacoes";
import Imagem from "@/components/imagem";
import { IndiceDeSecao } from "@/components/pecas";
import { SITE } from "@/content/site";
import type { Dictionary } from "@/content/types";
import { usePointerFino, useMovimentoReduzido } from "@/lib/hooks";
import { EASE_STANDARD, VIEWPORT } from "@/lib/motion";

/* ------------------------------------------------------------------ *
 * cartão que se inclina sob o ponteiro
 * ------------------------------------------------------------------ */
const MOLA = { stiffness: 180, damping: 18, mass: 0.5 } as const;

function CartaoInclinado({
  children,
  strength = 9,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fino = usePointerFino();
  const reduzido = useMovimentoReduzido();
  const ativo = fino && !reduzido;

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const dentro = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [strength, -strength]), MOLA);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-strength, strength]), MOLA);
  const rotateZ = useSpring(useTransform(dentro, [0, 1], [0, 0]), MOLA);
  const y = useSpring(useTransform(dentro, [0, 1], [0, -6]), MOLA);
  const brilhoOpacidade = useSpring(dentro, { stiffness: 120, damping: 20 });
  const brilho = useTransform(
    [px, py],
    ([x, yy]: number[]) =>
      `radial-gradient(circle 40% at ${((x ?? 0) + 0.5) * 100}% ${((yy ?? 0) + 0.5) * 100}%, rgba(242,240,235,0.16), transparent 70%)`,
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: 1000 }}
      onPointerMove={(evento) => {
        if (!ativo) return;
        const caixa = ref.current?.getBoundingClientRect();
        if (!caixa) return;
        px.set((evento.clientX - caixa.left) / caixa.width - 0.5);
        py.set((evento.clientY - caixa.top) / caixa.height - 0.5);
        dentro.set(1);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
        dentro.set(0);
      }}
    >
      <motion.div
        className="relative"
        style={ativo ? { rotateX, rotateY, rotateZ, y, transformStyle: "preserve-3d" } : undefined}
      >
        <div
          className="relative"
          style={{
            border: "1px solid var(--line-strong)",
            background: "var(--surface)",
            padding: 6,
          }}
        >
          <motion.div style={ativo ? { translateZ: 22, transformStyle: "preserve-3d" } : undefined}>
            {children}
          </motion.div>
          {ativo && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ opacity: brilhoOpacidade, mixBlendMode: "screen", backgroundImage: brilho }}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * as quatro etapas do método, cada uma com uma entrada diferente
 * ------------------------------------------------------------------ */
const ENTRADAS = [
  {
    hidden: { opacity: 0, y: 26, rotate: -2 },
    shown: { opacity: 1, y: 0, rotate: 0 },
    transition: { duration: 0.75, ease: EASE_STANDARD },
  },
  {
    hidden: { opacity: 0, x: -46 },
    shown: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: [0.85, 0, 0.15, 1] as const },
  },
  {
    hidden: { opacity: 1, clipPath: "inset(0% 100% 0% 0%)" },
    shown: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
    transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] as const },
  },
  {
    hidden: { opacity: 0, scale: 0.94 },
    shown: { opacity: 1, scale: 1 },
    transition: { type: "spring" as const, stiffness: 150, damping: 14, mass: 0.8 },
  },
];

function Metodo({ rotulo, etapas }: { rotulo: string; etapas: { step: string; note: string }[] }) {
  const lista = useRef<HTMLOListElement>(null);
  const reduzido = useMovimentoReduzido();
  const { scrollYProgress } = useScroll({ target: lista, offset: ["start 80%", "end 65%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <>
      <motion.p
        className="label label--dim"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.4 }}
      >
        {rotulo}
      </motion.p>

      <div className="relative mt-[var(--space-5)]">
        <span
          aria-hidden
          className="absolute left-0 top-0 hidden w-px sm:block"
          style={{ height: "100%", background: "var(--line)" }}
        >
          <motion.span
            className="block h-full w-full origin-top"
            style={{ background: "var(--accent)", scaleY: reduzido ? 1 : scaleY }}
          />
        </span>

        <ol ref={lista} className="flex flex-col sm:pl-[var(--space-6)]">
          {etapas.map((etapa, i) => {
            const entrada = ENTRADAS[i % ENTRADAS.length];
            return (
              <motion.li
                key={etapa.step}
                className="border-t py-[var(--space-5)]"
                style={{ borderColor: "var(--line)" }}
                initial={reduzido ? { opacity: 0 } : entrada.hidden}
                whileInView={reduzido ? { opacity: 1 } : entrada.shown}
                viewport={{ once: true, amount: 0.5 }}
                transition={reduzido ? { duration: 0.16 } : entrada.transition}
              >
                <h3 className="display-md">{etapa.step}</h3>
                <p className="body mt-[var(--space-2)] max-w-[46ch]">{etapa.note}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * seção
 * ------------------------------------------------------------------ */
export default function Sobre({
  t,
  nomeSecao,
  country,
}: {
  t: Dictionary["manifesto"];
  nomeSecao: string;
  country: string;
}) {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="shell scroll-mt-[var(--header-h)] py-[var(--space-10)]"
    >
      <IndiceDeSecao id="about" />

      <div className="grid-12 mt-[var(--space-8)] gap-y-[var(--space-8)]">
        <div className="col-span-12 lg:col-span-7">
          <LinhasQueSobem lines={t.lines} as="h2" className="display-xl" />
          <span id="about-title" className="sr-only">
            {nomeSecao}
          </span>
        </div>
        <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
          <Cascata className="flex flex-col gap-[var(--space-4)]" delay={0.1}>
            {t.paragraphs.map((paragrafo) => (
              <TextoQueAcende key={paragrafo} texto={paragrafo} className="body" />
            ))}
          </Cascata>
        </div>
      </div>

      <div className="grid-12 mt-[var(--space-10)] gap-y-[var(--space-8)]">
        <div className="col-span-12 sm:col-span-6 lg:col-span-4">
          <Paralaxe strength={30}>
            <CartaoInclinado className="mx-auto w-full max-w-[420px]">
              <figure className="media media--dim relative aspect-[4/5] w-full">
                <Imagem
                  src={"/assets/foto-cracha.webp"}
                  alt={SITE.name}
                  width={620}
                  height={827}
                  className="h-full w-full"
                />
                <motion.span
                  aria-hidden
                  className="absolute inset-0 origin-bottom"
                  style={{ background: "var(--background)" }}
                  initial={{ scaleY: 1 }}
                  whileInView={{ scaleY: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, ease: EASE_STANDARD }}
                />
              </figure>
            </CartaoInclinado>
          </Paralaxe>

          <Surge delay={0.1}>
            <p className="label label--dim mt-[var(--space-4)]">
              {SITE.handle} <span className="index-line__sep">/</span> {SITE.city}, {country}
            </p>
          </Surge>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <Metodo rotulo={t.methodLabel} etapas={t.chain} />
          <Surge delay={0.1}>
            <p
              className="label mt-[var(--space-6)] flex flex-wrap items-center gap-[var(--space-3)]"
              style={{ color: "var(--text-primary)" }}
            >
              {t.chain.map((etapa, i) => (
                <span key={etapa.step} className="flex items-center gap-[var(--space-3)]">
                  {etapa.step}
                  {i < t.chain.length - 1 && (
                    <span aria-hidden style={{ color: "var(--accent)" }}>
                      →
                    </span>
                  )}
                </span>
              ))}
            </p>
          </Surge>
        </div>
      </div>
    </section>
  );
}
