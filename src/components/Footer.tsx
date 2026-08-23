'use client';

import { currentYear, site } from '@/data/site';
import { Reveal } from './Reveal';

/* -------------------------------------------------------------------------
   RODAPÉ.

   Mínimo, e com um único gesto: a assinatura em tamanho de outdoor,
   sangrando na largura da tela. Ela existe pra dar ponto final visual —
   depois dela não há mais nada, e é o tamanho que comunica isso.

   `aria-hidden` na assinatura porque o nome já está na navegação, no h1 e
   no JSON-LD; repetido aqui seria só ruído no leitor de tela.

   Tudo o mais é uma régua de três informações: quem, o que, onde. Rodapé é
   onde quase todo portfólio cola quatro ícones e desiste — a régua diz mais
   e ocupa menos.
   ------------------------------------------------------------------------- */

export default function Footer() {
  const canais = site.social.filter((s) => s.href.startsWith('http'));

  return (
    <footer className="shell pb-[var(--space-7)] pt-[var(--space-9)]">
      {/* ---- a assinatura ---- */}
      <Reveal direction="none">
        <p
          aria-hidden="true"
          className="numeral select-none"
          style={{
            fontSize: 'clamp(4.5rem, 27vw, 24rem)',
            lineHeight: 0.78,
            color: 'var(--text-primary)',
          }}
        >
          {site.name}
        </p>
      </Reveal>

      {/* ---- a régua ---- */}
      <div
        className="mt-[var(--space-7)] flex flex-wrap items-baseline justify-between gap-x-[var(--space-7)] gap-y-[var(--space-4)] border-t pt-[var(--space-5)]"
        style={{ borderColor: 'var(--line)' }}
      >
        <p className="label" style={{ color: 'var(--text-primary)' }}>
          Full-Stack Developer <span className="index-line__sep">/</span> UX·UI
        </p>

        <nav aria-label="Social links">
          <ul className="flex flex-wrap gap-x-[var(--space-6)] gap-y-[var(--space-3)]">
            {canais.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="open"
                  className="link hit label"
                >
                  {s.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="label" style={{ color: 'var(--text-primary)' }}>
          {site.city} <span className="index-line__sep">/</span> {site.country}
        </p>
      </div>

      <div className="mt-[var(--space-5)] flex flex-wrap items-baseline justify-between gap-[var(--space-4)]">
        <p className="label label--dim">
          © {currentYear()} {site.name}
        </p>
        <p className="label label--dim">{site.colophon}</p>
      </div>
    </footer>
  );
}
