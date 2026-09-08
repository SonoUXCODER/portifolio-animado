"use client";

import { AnimatePresence, m as motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useConteudo } from "@/components/conteudo";
import { destravarRolagem, travarRolagem } from "@/components/rolagem-suave";
import { fill } from "@/content";
import { useMovimentoReduzido } from "@/lib/hooks";
import { EASE_EMPHASIS, EASE_STANDARD } from "@/lib/motion";

const LARGURAS = { desktop: 1440, mobile: 390 } as const;
type Viewport = keyof typeof LARGURAS;

/** Abre o site do projeto rodando de verdade, dentro da página. */
export default function PreviaAoVivo({
  url,
  title,
  embeddable,
  aoFechar,
}: {
  url: string;
  title: string;
  embeddable: boolean;
  aoFechar: () => void;
}) {
  const { livePreview } = useConteudo();
  const reduzido = useMovimentoReduzido();
  const caixa = useRef<HTMLDivElement>(null);
  const area = useRef<HTMLDivElement>(null);
  const focoAnterior = useRef<Element | null>(null);
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [carregando, setCarregando] = useState(true);
  const [escala, setEscala] = useState(1);
  const [altura, setAltura] = useState(900);

  useEffect(() => {
    focoAnterior.current = document.activeElement;
    travarRolagem();
    document.body.dataset.locked = "1";
    document.body.dataset.nativeCursor = "1";
    caixa.current?.querySelector<HTMLElement>("button, a")?.focus();

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
      delete document.body.dataset.nativeCursor;
      destravarRolagem();
      (focoAnterior.current as HTMLElement | null)?.focus?.();
    };
  }, [aoFechar]);

  useEffect(() => {
    const alvo = area.current;
    if (!alvo) return;
    const medir = () => {
      const largura = LARGURAS[viewport];
      const fator = Math.min(1, alvo.clientWidth / largura);
      setEscala(fator);
      setAltura(alvo.clientHeight / fator);
    };
    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(alvo);
    return () => observador.disconnect();
  }, [viewport]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={caixa}
        role="dialog"
        aria-modal="true"
        aria-label={fill(livePreview.label, title)}
        className="fixed inset-0 z-[96] flex flex-col"
        style={{ background: "var(--background)" }}
        initial={reduzido ? { opacity: 0 } : { y: "100%" }}
        animate={reduzido ? { opacity: 1 } : { y: "0%" }}
        exit={reduzido ? { opacity: 0 } : { y: "100%" }}
        transition={{ duration: reduzido ? 0.15 : 0.6, ease: EASE_EMPHASIS }}
      >
        <div
          className="flex shrink-0 flex-wrap items-center justify-between gap-x-[var(--space-5)] gap-y-[var(--space-3)] border-b px-[var(--gutter)] py-[var(--space-4)]"
          style={{ borderColor: "var(--line)" }}
        >
          <div className="flex min-w-0 items-baseline gap-[var(--space-4)]">
            <span className="title-sm shrink-0">{title}</span>
            <span className="label label--dim truncate">{url.replace(/^https?:\/\//, "")}</span>
          </div>

          <div className="flex items-center gap-[var(--space-5)]">
            {embeddable && (
              <div
                className="hidden items-center gap-[var(--space-1)] sm:flex"
                role="group"
                aria-label={livePreview.viewport}
              >
                {(Object.keys(LARGURAS) as Viewport[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setViewport(v)}
                    aria-pressed={viewport === v}
                    className="label px-[var(--space-3)] py-[var(--space-2)] transition-colors duration-[var(--duration-fast)]"
                    style={{ color: viewport === v ? "var(--accent)" : "var(--text-tertiary)" }}
                  >
                    {v} {LARGURAS[v]}
                  </button>
                ))}
              </div>
            )}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="label hit link"
              style={{ color: "var(--text-primary)" }}
            >
              {livePreview.openInNewTab} <span aria-hidden>↗</span>
            </a>
            <button
              type="button"
              onClick={aoFechar}
              className="label hit flex items-center gap-[var(--space-3)]"
              style={{ color: "var(--text-primary)" }}
            >
              {livePreview.close}
              <span aria-hidden className="relative block h-[11px] w-[11px]">
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
              </span>
            </button>
          </div>
        </div>

        <div ref={area} className="relative min-h-0 flex-1 overflow-hidden">
          {embeddable ? (
            <>
              <motion.div
                className="absolute left-1/2 top-0 origin-top"
                style={{
                  width: LARGURAS[viewport],
                  height: altura,
                  x: "-50%",
                  scale: escala,
                  transformOrigin: "top center",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: carregando ? 0 : 1 }}
                transition={{ duration: 0.4, ease: EASE_STANDARD }}
              >
                <iframe
                  src={url}
                  title={fill(livePreview.liveSite, title)}
                  className="h-full w-full border-0"
                  loading="eager"
                  onLoad={() => setCarregando(false)}
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </motion.div>
              {carregando && (
                <p className="label absolute inset-0 flex items-center justify-center" role="status">
                  {livePreview.loading}
                </p>
              )}
            </>
          ) : (
            <div className="flex h-full items-center justify-center px-[var(--gutter)]">
              <div className="max-w-[52ch] text-center">
                <p className="display-md">{livePreview.blockedTitle}</p>
                <p className="body mx-auto mt-[var(--space-5)]">{livePreview.blockedText}</p>
                <p className="mt-[var(--space-7)]">
                  <a href={url} target="_blank" rel="noopener noreferrer" className="btn">
                    {livePreview.blockedCta} <span aria-hidden>↗</span>
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
