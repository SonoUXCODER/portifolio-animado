"use client";

import { AnimatePresence, m as motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Imagem from "@/components/imagem";
import { Cascata, ItemCascata, LinhasQueSobem, Surge } from "@/components/animacoes";
import { useConteudo, useHref } from "@/components/conteudo";
import Magnetico from "@/components/magnetico";
import { ChamadaFinal } from "@/components/pecas";
import PreviaAoVivo from "@/components/previa-ao-vivo";
import { destravarRolagem, travarRolagem } from "@/components/rolagem-suave";
import { LinkDeTransicao } from "@/components/transicao";
import { fill } from "@/content";
import type { Dictionary, Project } from "@/content/types";
import { useMovimentoReduzido } from "@/lib/hooks";
import { EASE_EMPHASIS } from "@/lib/motion";

type Imagem = Project["gallery"][number];

/* ------------------------------------------------------------------ *
 * lightbox da imagem longa
 * ------------------------------------------------------------------ */
function Ampliada({ imagem, aoFechar }: { imagem: Imagem; aoFechar: () => void }) {
  const { livePreview } = useConteudo();
  const reduzido = useMovimentoReduzido();
  const caixa = useRef<HTMLDivElement>(null);
  const focoAnterior = useRef<Element | null>(null);

  useEffect(() => {
    focoAnterior.current = document.activeElement;
    travarRolagem();
    document.body.dataset.locked = "1";
    caixa.current?.querySelector("button")?.focus();

    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") return aoFechar();
      if (evento.key !== "Tab") return;
      const focaveis = caixa.current?.querySelectorAll<HTMLElement>("button, a[href]");
      if (!focaveis?.length) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    };

    window.addEventListener("keydown", aoTeclar);
    return () => {
      window.removeEventListener("keydown", aoTeclar);
      delete document.body.dataset.locked;
      destravarRolagem();
      (focoAnterior.current as HTMLElement | null)?.focus?.();
    };
  }, [aoFechar]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={caixa}
        role="dialog"
        aria-modal="true"
        aria-label={imagem.alt}
        className="fixed inset-0 z-[96] flex flex-col"
        style={{ background: "var(--background)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduzido ? 0.12 : 0.32, ease: EASE_EMPHASIS }}
      >
        <div
          className="flex shrink-0 items-center justify-between gap-[var(--space-5)] border-b px-[var(--gutter)] py-[var(--space-4)]"
          style={{ borderColor: "var(--line)" }}
        >
          <span className="label label--dim truncate">{imagem.caption ?? imagem.alt}</span>
          <button
            type="button"
            onClick={aoFechar}
            className="label hit flex shrink-0 items-center gap-[var(--space-3)]"
            style={{ color: "var(--text-primary)" }}
          >
            {livePreview.close}
            <span aria-hidden className="relative block h-[11px] w-[11px]">
              <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-current" />
              <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-[var(--gutter)] py-[var(--space-6)]"
          onClick={aoFechar}
          data-cursor="close"
          data-lenis-prevent
        >
          <div className="mx-auto w-full max-w-[1080px]">
            <Imagem
              src={imagem.src}
              alt={imagem.alt}
              width={imagem.width}
              height={imagem.height}
              className="h-auto w-full cursor-default"
              onClick={(e) => e.stopPropagation()}
              data-cursor=""
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

/* ------------------------------------------------------------------ *
 * rótulo com marcador
 * ------------------------------------------------------------------ */
function Marcador({ children }: { children: React.ReactNode }) {
  return (
    <p className="label mb-[var(--space-5)] flex items-center gap-[var(--space-3)]">
      <span
        aria-hidden
        className="inline-block h-[5px] w-[5px] shrink-0 rounded-full"
        style={{ background: "var(--accent)" }}
      />
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ *
 * página
 * ------------------------------------------------------------------ */
export default function EstudoDeCaso({
  p,
  proximo,
  t,
  assunto,
}: {
  p: Project;
  proximo: { slug: string; title: string };
  t: Dictionary["project"];
  assunto: string;
}) {
  const href = useHref();
  const [aoVivo, setAoVivo] = useState(false);
  const [ampliada, setAmpliada] = useState<Imagem | null>(null);
  const { livePreview } = useConteudo();

  return (
    <article>
      <header className="shell flex min-h-[92svh] flex-col justify-between pb-[var(--space-8)] pt-[calc(var(--header-h)+var(--space-7))]">
        <div>
          <p className="index-line">
            <LinkDeTransicao
              href={href("/#work")}
              className="hit inline-flex items-center gap-[var(--space-2)] transition-transform duration-[var(--duration-normal)] hover:-translate-x-[3px]"
              cursor="back"
            >
              <span aria-hidden>←</span> {t.back}
            </LinkDeTransicao>
            <span className="index-line__rule" aria-hidden />
            <span className="hidden sm:inline">{p.badge}</span>
          </p>
        </div>

        <div className="py-[var(--space-8)]">
          <LinhasQueSobem
            lines={[p.title]}
            as="h1"
            className="display-hero"
            immediate
            delay={0.15}
          />
          <p className="label mt-[var(--space-6)]" style={{ color: "var(--text-primary)" }}>
            {p.kind} <span className="index-line__sep">/</span> {p.year}
          </p>

          <div className="grid-12 mt-[var(--space-7)] gap-y-[var(--space-5)]">
            <div className="col-span-12 md:col-span-6 lg:col-span-5">
              <Surge delay={0.2}>
                <p className="lead">{p.intro}</p>
                <p className="body-sm mt-[var(--space-5)] flex max-w-[46ch] gap-[var(--space-3)] italic">
                  <span aria-hidden style={{ color: "var(--accent)" }}>
                    ↳
                  </span>
                  {p.note}
                </p>
              </Surge>
            </div>
          </div>
        </div>

        <Surge direction="none">
          <dl className="faixa-dados grid grid-cols-2 gap-x-[var(--space-5)] gap-y-[var(--space-5)] lg:grid-cols-4">
            {(
              [
                [t.year, p.year],
                [t.role, p.role.join(", ")],
                [t.disciplines, p.disciplines.join(" / ")],
                [t.status, p.live ? t.live : t.archived],
              ] as [string, string][]
            ).map(([rotulo, valor]) => (
              <div key={rotulo}>
                <dt className="label label--dim">{rotulo}</dt>
                <dd className="mt-[var(--space-2)] text-[0.95rem]">{valor}</dd>
              </div>
            ))}
          </dl>
        </Surge>
      </header>

      <div className="shell">
        <Surge direction="none">
          <figure className="media aspect-[16/9] w-full">
            <Imagem
              src={p.cover.src}
              alt={p.cover.alt}
              width={p.cover.width}
              height={p.cover.height}
              priority
              className="h-full w-full"
            />
          </figure>
        </Surge>
      </div>

      {/* desafio */}
      <section className="shell mt-[var(--space-10)]">
        <div className="grid-12 gap-y-[var(--space-6)]">
          <div className="col-span-12 lg:col-span-5">
            <Surge>
              <Marcador>{t.challengeLabel}</Marcador>
              <LinhasQueSobem lines={t.challengeLines} as="h2" className="display-lg" />
            </Surge>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Surge direction="left" delay={0.1}>
              <p className="lead">{p.challenge}</p>
            </Surge>
          </div>
        </div>
      </section>

      {/* abordagem */}
      <section className="shell mt-[var(--space-10)]">
        <Surge>
          <Marcador>{t.approachLabel}</Marcador>
          <LinhasQueSobem lines={t.approachLines} as="h2" className="display-lg" />
        </Surge>
        <Cascata as="ol" className="mt-[var(--space-8)] flex flex-col">
          {p.approach.map((etapa) => (
            <ItemCascata
              key={etapa.step}
              as="li"
              className="linha-hover grid-12 gap-y-[var(--space-3)] py-[var(--space-6)]"
            >
              <div className="col-span-12 md:col-span-3">
                <p className="label" style={{ color: "var(--accent)" }}>
                  {etapa.step}
                </p>
              </div>
              <div className="col-span-12 md:col-span-8 md:col-start-5">
                <h3 className="display-md">{etapa.title}</h3>
                <p className="body mt-[var(--space-4)] max-w-[54ch]">{etapa.text}</p>
              </div>
            </ItemCascata>
          ))}
        </Cascata>
      </section>

      {/* sistema */}
      <section className="shell mt-[var(--space-10)]">
        <Surge>
          <Marcador>{t.systemLabel}</Marcador>
          <LinhasQueSobem lines={t.systemLines} as="h2" className="display-lg" />
        </Surge>

        <div className="mt-[var(--space-8)]">
          <Surge>
            <p className="label label--dim">{t.palette}</p>
          </Surge>
          <Cascata
            as="ul"
            className="mt-[var(--space-4)] grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3 lg:grid-cols-5"
          >
            {p.system.palette.map((cor) => (
              <ItemCascata key={cor.hex} as="li">
                <span
                  aria-hidden
                  className="block aspect-[4/3] w-full"
                  style={{ background: cor.hex, border: "1px solid var(--line)" }}
                />
                <span
                  className="label mt-[var(--space-3)] block"
                  style={{ color: "var(--text-primary)" }}
                >
                  {cor.name}
                </span>
                <span className="label label--dim mt-[var(--space-1)] block">{cor.hex}</span>
              </ItemCascata>
            ))}
          </Cascata>
        </div>

        <div className="mt-[var(--space-9)]">
          <Surge>
            <p className="label label--dim">{t.typography}</p>
          </Surge>
          <Cascata as="ul" className="mt-[var(--space-4)] flex flex-col">
            {p.system.type.map((tipo) => (
              <ItemCascata
                key={tipo.role}
                as="li"
                className="linha-hover grid-12 gap-y-[var(--space-2)] py-[var(--space-3)]"
              >
                <span className="label col-span-12 md:col-span-2">{tipo.role}</span>
                <span className="title-sm col-span-12 md:col-span-4">{tipo.family}</span>
                <span className="body-sm col-span-12 md:col-span-5 md:col-start-8">
                  {tipo.note}
                </span>
              </ItemCascata>
            ))}
          </Cascata>
        </div>

        <div className="grid-12 mt-[var(--space-9)] gap-y-[var(--space-7)]">
          <div className="col-span-12 md:col-span-5">
            <Surge>
              <p className="label label--dim">{t.components}</p>
              <ul className="mt-[var(--space-4)] flex flex-wrap gap-[var(--space-2)]">
                {p.system.components.map((c) => (
                  <li
                    key={c}
                    className="label px-[var(--space-4)] py-[var(--space-3)]"
                    style={{ border: "1px solid var(--line)", color: "var(--text-primary)" }}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </Surge>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <Surge delay={0.08}>
              <div className="faixa-dados">
                <p className="label label--dim">{t.grid}</p>
                <p className="body mt-[var(--space-2)]" style={{ color: "var(--text-primary)" }}>
                  {p.system.grid}
                </p>
              </div>
              <div className="faixa-dados mt-[var(--space-3)]">
                <p className="label label--dim">{t.spacing}</p>
                <p className="body mt-[var(--space-2)]" style={{ color: "var(--text-primary)" }}>
                  {p.system.spacing}
                </p>
              </div>
            </Surge>
          </div>
        </div>
      </section>

      {/* desenvolvimento + resultado */}
      <section className="shell mt-[var(--space-10)]">
        <div className="grid-12 gap-y-[var(--space-6)]">
          <div className="col-span-12 lg:col-span-5">
            <Surge>
              <Marcador>{t.developmentLabel}</Marcador>
              <LinhasQueSobem lines={t.developmentLines} as="h2" className="display-lg" />
            </Surge>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Cascata as="ul" className="flex flex-col">
              {p.stack.map((item) => (
                <ItemCascata key={item} as="li" className="linha-hover py-[var(--space-3)]">
                  <span className="display-md">{item}</span>
                </ItemCascata>
              ))}
            </Cascata>
          </div>
        </div>

        <div className="grid-12 mt-[var(--space-9)] gap-y-[var(--space-6)]">
          <div className="col-span-12 md:col-span-3">
            <Surge>
              <p className="label label--dim">{t.outcome}</p>
            </Surge>
          </div>
          <Cascata as="ol" className="col-span-12 flex flex-col md:col-span-8 md:col-start-5">
            {p.outcome.map((linha) => (
              <ItemCascata
                key={linha}
                as="li"
                className="linha-hover flex items-baseline gap-[var(--space-4)] py-[var(--space-4)]"
              >
                <span
                  aria-hidden
                  className="mt-[0.6em] block h-px w-[var(--space-6)] shrink-0"
                  style={{ background: "var(--accent)" }}
                />
                <p className="lead" style={{ maxWidth: "44ch" }}>
                  {linha}
                </p>
              </ItemCascata>
            ))}
          </Cascata>
        </div>
      </section>

      {/* experiência */}
      <section className="mt-[var(--space-10)]">
        <div className="shell">
          <Surge>
            <Marcador>{t.experienceLabel}</Marcador>
            <LinhasQueSobem lines={t.experienceLines} as="h2" className="display-lg" />
          </Surge>

          {p.gallery.slice(0, 1).map((imagem) => (
            <Surge key={imagem.src} delay={0.1}>
              <figure className="mt-[var(--space-8)]">
                <button
                  type="button"
                  onClick={() => setAmpliada(imagem)}
                  data-cursor="look"
                  aria-label={fill(livePreview.screenshots, p.title)}
                  className="media block w-full"
                >
                  <Imagem
                    src={imagem.src}
                    alt={imagem.alt}
                    width={imagem.width}
                    height={imagem.height}
                    loading="lazy"
                    className="w-full"
                    style={{ maxHeight: "72svh", objectFit: "cover", objectPosition: "top" }}
                  />
                </button>
                {imagem.caption && (
                  <figcaption className="label label--dim mt-[var(--space-3)]">
                    {imagem.caption}
                  </figcaption>
                )}
              </figure>
            </Surge>
          ))}
        </div>

        <div className="shell mt-[var(--space-8)]">
          <Surge>
            <div className="flex flex-wrap items-center gap-[var(--space-4)]">
              {p.live && (
                <Magnetico>
                  <button
                    type="button"
                    onClick={() => setAoVivo(true)}
                    className="btn"
                    data-cursor="open"
                  >
                    {t.visitLive}
                  </button>
                </Magnetico>
              )}
              {p.github ? (
                <Magnetico>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost"
                    data-cursor="open"
                  >
                    {t.source} <span aria-hidden>↗</span>
                  </a>
                </Magnetico>
              ) : (
                <p className="body-sm">{t.privateRepo}</p>
              )}
            </div>
          </Surge>
        </div>
      </section>

      <section className="shell mt-[var(--space-10)]">
        <ChamadaFinal pergunta={t.ctaEnd} acao={t.ctaEndLink} assunto={assunto} />
      </section>

      <section
        className="mt-[var(--space-10)] py-[var(--space-9)]"
        style={{ background: "var(--tom-2)" }}
      >
        <LinkDeTransicao href={href(`/work/${proximo.slug}`)} className="group block" cursor="case">
          <div className="shell">
            <p className="label label--dim mb-[var(--space-4)]">{t.nextProject}</p>
            <Surge direction="none">
              <h2 className="display-xl inline-flex items-baseline gap-[var(--space-5)] transition-[color,transform] duration-[var(--duration-slow)] ease-[var(--ease-standard)] group-hover:translate-x-[var(--space-4)] group-hover:text-[var(--accent)]">
                {proximo.title}
                <span className="text-[0.4em]" aria-hidden>
                  →
                </span>
              </h2>
            </Surge>
          </div>
        </LinkDeTransicao>
      </section>

      {aoVivo && p.live && (
        <PreviaAoVivo
          url={p.live}
          title={p.title}
          embeddable={p.embeddable}
          aoFechar={() => setAoVivo(false)}
        />
      )}
      {ampliada && <Ampliada imagem={ampliada} aoFechar={() => setAmpliada(null)} />}
    </article>
  );
}
