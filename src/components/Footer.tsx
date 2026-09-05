'use client';

import { identity } from '@/content';
import { useT } from './ContentProvider';
import { Parallax, Reveal } from './Reveal';

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
  const t = useT();
  const canais = identity.social.filter((s) => s.href.startsWith('http'));

  return (
    <footer className="shell overflow-clip pb-[var(--space-7)] pt-[var(--space-9)]">
      {/* ---- a assinatura ----
           Ela sobe mais devagar que o resto do rodapé enquanto a página
           chega ao fim. É pouco — 26px de curso — e é o suficiente pra o
           ponto final da página ser **alcançado** em vez de já estar
           parado esperando: as letras ainda estão assentando quando a
           rolagem acaba, e é o último movimento do site.

           `overflow-clip` no rodapé porque a assinatura sangra na largura
           inteira e o deslocamento a empurra por baixo da margem. */}
      <Parallax strength={26}>
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
            {identity.name}
          </p>
        </Reveal>
      </Parallax>

      {/* ---- a régua ---- */}
      <div
        className="mt-[var(--space-7)] flex flex-wrap items-baseline justify-between gap-x-[var(--space-7)] gap-y-[var(--space-4)] border-t pt-[var(--space-5)]"
        style={{ borderColor: 'var(--line)' }}
      >
        <p className="label" style={{ color: 'var(--text-primary)' }}>
          {t.footer.role} <span className="index-line__sep">/</span> UX·UI
        </p>

        <nav aria-label={t.footer.socialLinks}>
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
          {identity.city} <span className="index-line__sep">/</span> {t.meta.country}
        </p>
      </div>

      <div className="mt-[var(--space-5)] flex flex-wrap items-baseline justify-between gap-[var(--space-4)]">
        <p className="label label--dim">
          © {new Date().getFullYear()} {identity.name}
        </p>
        <p className="label label--dim">{t.meta.colophon}</p>
      </div>
    </footer>
  );
}
