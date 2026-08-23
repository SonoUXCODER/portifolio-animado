'use client';

import { usePathname } from 'next/navigation';
import { langShort, langs, type Lang } from '@/lib/lang';
import { useConteudo } from './ContentProvider';
import { TransitionLink } from './PageTransition';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   O SELETOR DE IDIOMA.

   Três siglas em linha: EN · PT · DE. Não é `<select>`, e não é bandeira.

   Sem `<select>` porque com três opções um menu suspenso custa dois cliques
   pra fazer o que um link faz em um, e esconde as outras duas — que é
   justamente a informação que importa aqui (o site *tem* três idiomas).

   Sem bandeira porque bandeira é país, não idioma. Alemão não é a Alemanha
   quando o site diz que a base é Berna, e português com bandeira de Portugal
   estaria errado em duas camadas.

   >>> A PARTE QUE IMPORTA <<<
   Cada sigla é um `<a>` de verdade pra mesma página no outro idioma, não um
   botão que troca estado. Isso é o que faz o buscador enxergar as três
   versões, e é o que faz o botão "voltar" funcionar. `trocarIdioma()` troca
   só o primeiro segmento do caminho, então quem está lendo um estudo de
   caso em inglês cai no mesmo estudo em alemão, e não na home.
   ------------------------------------------------------------------------- */

/** troca o prefixo de idioma mantendo o resto do caminho */
export function trocarIdioma(pathname: string, destino: Lang) {
  /* o pathname que o Next entrega já vem sem o basePath */
  const partes = pathname.split('/').filter(Boolean);
  if (partes.length && (langs as readonly string[]).includes(partes[0])) partes[0] = destino;
  else partes.unshift(destino);
  return `/${partes.join('/')}`;
}

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, t } = useConteudo();
  const pathname = usePathname() ?? '/';

  return (
    <nav aria-label={t.ui.language} className={cn('flex items-center gap-[var(--space-1)]', className)}>
      {langs.map((l, i) => {
        const atual = l === lang;
        return (
          <span key={l} className="flex items-center gap-[var(--space-1)]">
            <TransitionLink
              href={trocarIdioma(pathname, l)}
              hrefLang={l}
              aria-current={atual ? 'true' : undefined}
              className="label hit px-[var(--space-1)] py-[var(--space-2)] transition-colors duration-[var(--duration-fast)]"
              style={{ color: atual ? 'var(--accent)' : 'var(--text-tertiary)' }}
            >
              {langShort[l]}
            </TransitionLink>
            {i < langs.length - 1 && (
              <span aria-hidden="true" className="index-line__sep text-[0.6875rem]">
                ·
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
