"use client";

import { Paralaxe, Surge } from "@/components/animacoes";
import { useConteudo } from "@/components/conteudo";
import { SITE } from "@/content/site";

export default function Rodape() {
  const { footer, meta } = useConteudo();
  const redes = SITE.social.filter((s) => s.href.startsWith("http"));

  return (
    <footer
      className="w-full overflow-clip pb-[var(--space-7)] pt-[var(--space-9)]"
      style={{ background: "var(--tom-1)" }}
    >
      <div className="shell">
        <Paralaxe strength={26}>
          <Surge direction="none">
            <p
              aria-hidden
              className="numeral select-none"
              style={{
                fontSize: "clamp(4.5rem, 27vw, 24rem)",
                lineHeight: 0.78,
                color: "var(--text-primary)",
              }}
            >
              {SITE.name}
            </p>
          </Surge>
        </Paralaxe>

        <div className="mt-[var(--space-7)] flex flex-wrap items-baseline justify-between gap-x-[var(--space-7)] gap-y-[var(--space-4)] pt-[var(--space-5)]">
          <p className="label" style={{ color: "var(--text-primary)" }}>
            {footer.role} <span className="index-line__sep">/</span> UX·UI
          </p>

          <nav aria-label={footer.socialLinks}>
            <ul className="flex flex-wrap gap-x-[var(--space-6)] gap-y-[var(--space-3)]">
              {redes.map((rede) => (
                <li key={rede.label}>
                  <a
                    href={rede.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="open"
                    className="link hit label"
                  >
                    {rede.label} <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="label" style={{ color: "var(--text-primary)" }}>
            {SITE.city} <span className="index-line__sep">/</span> {meta.country}
          </p>
        </div>

        <div className="mt-[var(--space-5)] flex flex-wrap items-baseline justify-between gap-[var(--space-4)]">
          <p className="label label--dim">
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <p className="label label--dim">{meta.colophon}</p>
        </div>
      </div>
    </footer>
  );
}
