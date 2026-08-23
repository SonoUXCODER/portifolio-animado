'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

/* -------------------------------------------------------------------------
   Duas edições do mesmo objeto: a de papel e a noturna.

   O estado tem três valores, e isso é de propósito: "sistema" não é o mesmo
   que "claro". Quem nunca escolheu segue a preferência do aparelho e muda
   junto com ela; quem escolheu fica com o que escolheu.

   O atributo mora no <html> porque o CSS precisa dele antes de qualquer
   componente montar — veja o script de anti-piscada logo abaixo.
   ------------------------------------------------------------------------- */

export type Theme = 'light' | 'dark' | 'system';

const CHAVE = 'sono:theme';

type Ctx = { theme: Theme; isDark: boolean; toggle: () => void; set: (t: Theme) => void };
const ThemeCtx = createContext<Ctx>({ theme: 'system', isDark: false, toggle: () => {}, set: () => {} });
export const useTheme = () => useContext(ThemeCtx);

/**
 * Roda no <head>, antes da primeira pintura. Sem isto, a página nasce clara
 * e pisca pro escuro depois que o React monta — o famoso flash branco na
 * cara de quem usa tema escuro.
 *
 * É string crua porque precisa ser síncrono e inline; não dá pra esperar
 * bundle nenhum.
 */
export const themeBootScript = `(function(){try{
var t=localStorage.getItem('${CHAVE}');
if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}
document.documentElement.classList.add('theme-ready');
}catch(e){document.documentElement.classList.add('theme-ready');}})();`;

function resolveDark(t: Theme) {
  if (t === 'dark') return true;
  if (t === 'light') return false;
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [isDark, setIsDark] = useState(false);

  /* lê a escolha guardada uma vez, no cliente */
  useEffect(() => {
    let inicial: Theme = 'system';
    try {
      const guardado = localStorage.getItem(CHAVE);
      if (guardado === 'light' || guardado === 'dark') inicial = guardado;
    } catch {
      /* modo anônimo bloqueia localStorage; seguimos com 'system' */
    }
    setTheme(inicial);
    setIsDark(resolveDark(inicial));
  }, []);

  /* quem está em 'system' acompanha o aparelho mudando de tema no meio da visita */
  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const ouvir = () => setIsDark(mq.matches);
    mq.addEventListener('change', ouvir);
    return () => mq.removeEventListener('change', ouvir);
  }, [theme]);

  const set = useCallback((t: Theme) => {
    setTheme(t);
    setIsDark(resolveDark(t));
    const raiz = document.documentElement;
    if (t === 'system') raiz.removeAttribute('data-theme');
    else raiz.setAttribute('data-theme', t);
    try {
      if (t === 'system') localStorage.removeItem(CHAVE);
      else localStorage.setItem(CHAVE, t);
    } catch {
      /* sem localStorage a escolha vale só nesta visita, e tudo bem */
    }
  }, []);

  const toggle = useCallback(() => set(resolveDark(theme) ? 'light' : 'dark'), [theme, set]);

  return (
    <ThemeCtx.Provider value={{ theme, isDark, toggle, set }}>{children}</ThemeCtx.Provider>
  );
}

/* -------------------------------------------------------------------------
   O botão. Desenhado como um interruptor de gráfica: dois quadrados, o
   cheio marca a edição em uso.
   ------------------------------------------------------------------------- */

export function ThemeToggle({ className }: { className?: string }) {
  const { isDark, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);

  /* o servidor não sabe qual edição está valendo. Renderizar o rótulo antes
     da hidratação daria divergência, então o texto só entra depois. */
  useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={mounted ? isDark : undefined}
      aria-label={mounted ? (isDark ? 'Mudar para o tema claro' : 'Mudar para o tema escuro') : 'Trocar tema'}
      title={mounted ? (isDark ? 'tema claro' : 'tema escuro') : undefined}
      className={className}
      data-cursor="trocar"
    >
      {/* .label em vez de um tamanho digitado à mão: o rótulo do tema é o
          mesmo tipo de metadado que todo o resto da interface */}
      <span className="label" aria-hidden="true">
        {mounted ? (isDark ? 'Escuro' : 'Claro') : '     '}
      </span>
      <span aria-hidden="true" className="flex items-center gap-[3px]">
        <span
          className="block h-[9px] w-[9px] border border-current transition-colors"
          style={{ background: mounted && !isDark ? 'currentColor' : 'transparent' }}
        />
        <span
          className="block h-[9px] w-[9px] border border-current transition-colors"
          style={{ background: mounted && isDark ? 'currentColor' : 'transparent' }}
        />
      </span>
    </button>
  );
}
