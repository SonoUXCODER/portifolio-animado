"use client";

import { AnimatePresence, m as motion, useMotionValueEvent, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useConteudo } from "@/components/conteudo";
import { destravarRolagem, travarRolagem } from "@/components/rolagem-suave";
import { LinkDeTransicao } from "@/components/transicao";
import { LANG_LABEL, LANGS, SECTION_ORDER } from "@/content";
import { SITE } from "@/content/site";
import { cn } from "@/lib/cn";
import { useMovimentoReduzido } from "@/lib/hooks";
import { DUR, EASE_EMPHASIS, EASE_STANDARD } from "@/lib/motion";

/* ------------------------------------------------------------------ *
 * marca com efeito de embaralhar (uma vez por sessão)
 * ------------------------------------------------------------------ */
const RUIDO = "#$%&*+=<>/\\|[]{}~^";
const CHAVE = "sono:scrambled";

function Marca({ texto, className }: { texto: string; className?: string }) {
  const reduzido = useMovimentoReduzido();
  const [visto, setVisto] = useState(texto);
  const jaRodou = useRef(false);

  useEffect(() => {
    if (reduzido || jaRodou.current) return;
    jaRodou.current = true;
    try {
      if (sessionStorage.getItem(CHAVE)) return;
      sessionStorage.setItem(CHAVE, "1");
    } catch {
      /* sem storage: roda mesmo assim */
    }

    let reveladas = 0;
    let quadro = 0;
    let ultimo = 0;
    const passo = (agora: number) => {
      if (agora - ultimo > 55) {
        ultimo = agora;
        reveladas += 1;
      }
      if (reveladas > texto.length) return setVisto(texto);
      setVisto(
        texto
          .split("")
          .map((c, i) => (i < reveladas || c === " " ? c : RUIDO[Math.floor(Math.random() * RUIDO.length)]))
          .join(""),
      );
      quadro = requestAnimationFrame(passo);
    };
    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, [reduzido, texto]);

  return (
    <span className={className} style={{ fontFamily: "var(--font-display)" }}>
      <span aria-hidden>{visto}</span>
      <span className="sr-only">{texto}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * troca de idioma
 * ------------------------------------------------------------------ */
function Idiomas({ className }: { className?: string }) {
  const { lang, ui } = useConteudo();
  const pathname = usePathname() ?? "/";

  const trocar = (destino: string) => {
    const partes = pathname.split("/").filter(Boolean);
    if (partes.length && (LANGS as string[]).includes(partes[0])) partes[0] = destino;
    else partes.unshift(destino);
    return `/${partes.join("/")}`;
  };

  return (
    <nav aria-label={ui.language} className={cn("flex items-center gap-[var(--space-1)]", className)}>
      {LANGS.map((l, i) => {
        const atual = l === lang;
        return (
          <span key={l} className="flex items-center gap-[var(--space-1)]">
            <LinkDeTransicao
              href={trocar(l)}
              hrefLang={l}
              aria-current={atual ? "true" : undefined}
              className="label hit px-[var(--space-1)] py-[var(--space-2)] transition-colors duration-[var(--duration-fast)]"
              style={{ color: atual ? "var(--accent)" : "var(--text-tertiary)" }}
            >
              {LANG_LABEL[l]}
            </LinkDeTransicao>
            {i < LANGS.length - 1 && (
              <span aria-hidden className="index-line__sep text-[0.6875rem]">
                ·
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

/* ------------------------------------------------------------------ *
 * menu de tela cheia (mobile)
 * ------------------------------------------------------------------ */
function MenuMobile({
  aberto,
  fechar,
  ativa,
}: {
  aberto: boolean;
  fechar: () => void;
  ativa: string;
}) {
  const { ui, meta, sections } = useConteudo();
  const painel = useRef<HTMLDivElement>(null);
  const focoAnterior = useRef<Element | null>(null);

  useEffect(() => {
    if (!aberto) return;
    focoAnterior.current = document.activeElement;
    document.body.dataset.locked = "1";
    travarRolagem();
    painel.current?.querySelector<HTMLElement>("a, button")?.focus();

    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") return fechar();
      if (evento.key !== "Tab") return;
      const botao = document.querySelector<HTMLElement>('[aria-controls="menu-mobile"]');
      const dentro = painel.current?.querySelectorAll<HTMLElement>("a[href], button");
      const focaveis = [...(dentro ?? []), ...(botao ? [botao] : [])];
      if (!focaveis.length) return;
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
  }, [aberto, fechar]);

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          key="menu"
          ref={painel}
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label={ui.navigation}
          className="fixed inset-0 z-[80] flex flex-col justify-between overflow-y-auto px-[var(--gutter)] pb-[var(--space-7)] pt-[calc(var(--header-h)+var(--space-7))] lg:hidden"
          style={{ background: "var(--background)" }}
          initial={{ y: "-100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.62, ease: EASE_EMPHASIS }}
        >
          <nav aria-label={ui.sections}>
            <ul className="flex flex-col">
              {sections.map((secao, i) => {
                const atual = ativa === secao.id;
                return (
                  <li key={secao.id} className="border-b" style={{ borderColor: "var(--line)" }}>
                    <a
                      href={`#${secao.id}`}
                      onClick={fechar}
                      aria-current={atual ? "true" : undefined}
                      className="flex min-h-[68px] items-baseline gap-[var(--space-4)] py-[var(--space-4)]"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.5em] block h-px w-[var(--space-5)] shrink-0 transition-colors"
                        style={{ background: atual ? "var(--accent)" : "var(--line-strong)" }}
                      />
                      <span className="overflow-hidden pt-[0.12em] [margin-top:-0.12em]">
                        <motion.span
                          className="display-lg block"
                          style={{ color: atual ? "var(--accent)" : undefined }}
                          initial={{ y: "106%" }}
                          animate={{ y: "0%" }}
                          transition={{ delay: 0.18 + 0.055 * i, duration: 0.7, ease: EASE_STANDARD }}
                        >
                          {secao.name}
                        </motion.span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: DUR.normal }}
            className="mt-[var(--space-8)] flex flex-col gap-[var(--space-4)] border-t pt-[var(--space-5)]"
            style={{ borderColor: "var(--line)" }}
          >
            <Idiomas />
            <a href={`mailto:${SITE.email}`} className="title-sm link w-fit">
              {SITE.email}
            </a>
            <ul className="flex flex-wrap gap-x-[var(--space-5)] gap-y-[var(--space-3)]">
              {SITE.social
                .filter((s) => s.href.startsWith("http"))
                .map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="hit label link">
                      {s.label} <span aria-hidden>↗</span>
                    </a>
                  </li>
                ))}
            </ul>
            <p className="label label--dim">
              {SITE.city} / {meta.country}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ *
 * seção ativa
 * ------------------------------------------------------------------ */
function useSecaoAtiva(ids: string[]) {
  const [ativa, setAtiva] = useState(ids[0] ?? "");
  useEffect(() => {
    const alvos = ids.map((id) => document.getElementById(id)).filter((n): n is HTMLElement => !!n);
    if (!alvos.length) return;
    const observador = new IntersectionObserver(
      (entradas) => {
        const visiveis = entradas.filter((e) => e.isIntersecting);
        if (!visiveis.length) return;
        setAtiva(
          visiveis.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0].target.id,
        );
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    for (const alvo of alvos) observador.observe(alvo);
    return () => observador.disconnect();
  }, [ids]);
  return ativa;
}

/* ------------------------------------------------------------------ *
 * cabeçalho
 * ------------------------------------------------------------------ */
export default function Cabecalho() {
  const { ui, sections, lang } = useConteudo();
  const { scrollY } = useScroll();
  const [rolado, setRolado] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();
  const naHome = (pathname ?? "").replace(/\/$/, "") === `/${lang}`;
  const ativa = useSecaoAtiva(naHome ? SECTION_ORDER : []);

  useMotionValueEvent(scrollY, "change", (v) => setRolado(v > 24));
  useEffect(() => setMenu(false), [pathname]);

  return (
    <>
      <a
        href="#content"
        className="btn sr-only fixed left-[var(--space-4)] top-[var(--space-4)] z-[95] focus:not-sr-only focus:inline-flex"
      >
        {ui.skipToContent}
      </a>

      <header className={cn("fixed inset-x-0 top-0", menu ? "z-[85]" : "z-[70]")}>
        <div
          className={cn(
            "border-b transition-[background-color,border-color,backdrop-filter] duration-[var(--duration-normal)]",
            rolado && !menu ? "bg-[var(--background)]/72 backdrop-blur-xl" : "backdrop-blur-none",
          )}
          style={{ borderColor: rolado && !menu ? "var(--line)" : "transparent" }}
        >
          <div className="shell flex h-[var(--header-h)] items-center justify-between gap-[var(--space-5)]">
            <LinkDeTransicao
              href={`/${lang}`}
              className="hit group flex items-baseline gap-[var(--space-3)]"
              cursor="home"
            >
              <Marca texto={SITE.wordmark} className="text-[1rem] font-semibold tracking-[-0.02em]" />
              <span className="label label--dim hidden sm:inline">
                {naHome ? ui.roleLabel : ui.caseStudyLabel}
              </span>
            </LinkDeTransicao>

            {naHome && (
              <nav aria-label={ui.sections} className="hidden lg:block">
                <ul className="flex items-center gap-[var(--space-1)]">
                  {sections.map((secao) => {
                    const atual = ativa === secao.id;
                    return (
                      <li key={secao.id} className="relative">
                        <a
                          href={`#${secao.id}`}
                          aria-current={atual ? "true" : undefined}
                          className="label relative block px-[var(--space-4)] py-[var(--space-4)] transition-colors duration-[var(--duration-fast)]"
                          style={{ color: atual ? "var(--text-primary)" : undefined }}
                        >
                          {secao.nav}
                        </a>
                        {/* sublinhado do item ativo: um scaleX por item em vez
                            de um `layoutId` compartilhado — o mesmo efeito de
                            atenção sem carregar o motor de layout animation */}
                        <motion.span
                          aria-hidden
                          className="absolute inset-x-[var(--space-4)] bottom-[14px] h-[1.5px] origin-left"
                          style={{ background: "var(--accent)" }}
                          initial={false}
                          animate={{ scaleX: atual ? 1 : 0, opacity: atual ? 1 : 0 }}
                          transition={{ duration: DUR.normal, ease: EASE_STANDARD }}
                        />
                      </li>
                    );
                  })}
                </ul>
              </nav>
            )}

            <div className="flex items-center gap-[var(--space-4)]">
              <Idiomas className="hidden sm:flex" />
              <button
                type="button"
                onClick={() => setMenu((v) => !v)}
                aria-expanded={menu}
                aria-controls="menu-mobile"
                className="label relative z-[85] -mr-[var(--space-2)] flex min-h-[44px] min-w-[44px] items-center justify-end gap-[var(--space-3)] lg:hidden"
                style={{ color: "var(--text-primary)" }}
              >
                {menu ? ui.close : ui.menu}
                <span aria-hidden className="flex w-4 flex-col gap-[4px]">
                  <span
                    className={cn(
                      "block h-px w-full bg-current transition-transform duration-[var(--duration-normal)]",
                      menu && "translate-y-[5px] rotate-45",
                    )}
                  />
                  <span
                    className={cn(
                      "block h-px w-full bg-current transition-opacity duration-[var(--duration-fast)]",
                      menu && "opacity-0",
                    )}
                  />
                  <span
                    className={cn(
                      "block h-px w-full bg-current transition-transform duration-[var(--duration-normal)]",
                      menu && "-translate-y-[5px] -rotate-45",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MenuMobile aberto={menu} fechar={() => setMenu(false)} ativa={ativa} />
    </>
  );
}
