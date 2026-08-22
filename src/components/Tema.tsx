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

export type Tema = 'claro' | 'escuro' | 'sistema';

const CHAVE = 'sono:tema';

type Ctx = { tema: Tema; escuroAgora: boolean; trocar: () => void; definir: (t: Tema) => void };
const TemaCtx = createContext<Ctx>({ tema: 'sistema', escuroAgora: false, trocar: () => {}, definir: () => {} });
export const useTema = () => useContext(TemaCtx);

/**
 * Roda no <head>, antes da primeira pintura. Sem isto, a página nasce clara
 * e pisca pro escuro depois que o React monta — o famoso flash branco na
 * cara de quem usa tema escuro.
 *
 * É string crua porque precisa ser síncrono e inline; não dá pra esperar
 * bundle nenhum.
 */
export const scriptAntiPiscada = `(function(){try{
var t=localStorage.getItem('${CHAVE}');
if(t==='claro'||t==='escuro'){document.documentElement.setAttribute('data-tema',t);}
document.documentElement.classList.add('tema-pronto');
}catch(e){document.documentElement.classList.add('tema-pronto');}})();`;

function ehEscuro(t: Tema) {
  if (t === 'escuro') return true;
  if (t === 'claro') return false;
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function ProvedorDeTema({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>('sistema');
  const [escuroAgora, setEscuroAgora] = useState(false);

  /* lê a escolha guardada uma vez, no cliente */
  useEffect(() => {
    let inicial: Tema = 'sistema';
    try {
      const guardado = localStorage.getItem(CHAVE);
      if (guardado === 'claro' || guardado === 'escuro') inicial = guardado;
    } catch {
      /* modo anônimo bloqueia localStorage; seguimos com 'sistema' */
    }
    setTema(inicial);
    setEscuroAgora(ehEscuro(inicial));
  }, []);

  /* quem está em 'sistema' acompanha o aparelho mudando de tema no meio da visita */
  useEffect(() => {
    if (tema !== 'sistema') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const ouvir = () => setEscuroAgora(mq.matches);
    mq.addEventListener('change', ouvir);
    return () => mq.removeEventListener('change', ouvir);
  }, [tema]);

  const definir = useCallback((t: Tema) => {
    setTema(t);
    setEscuroAgora(ehEscuro(t));
    const raiz = document.documentElement;
    if (t === 'sistema') raiz.removeAttribute('data-tema');
    else raiz.setAttribute('data-tema', t);
    try {
      if (t === 'sistema') localStorage.removeItem(CHAVE);
      else localStorage.setItem(CHAVE, t);
    } catch {
      /* sem localStorage a escolha vale só nesta visita, e tudo bem */
    }
  }, []);

  const trocar = useCallback(() => definir(ehEscuro(tema) ? 'claro' : 'escuro'), [tema, definir]);

  return (
    <TemaCtx.Provider value={{ tema, escuroAgora, trocar, definir }}>{children}</TemaCtx.Provider>
  );
}

/* -------------------------------------------------------------------------
   O botão. Desenhado como um interruptor de gráfica: dois quadrados, o
   cheio marca a edição em uso.
   ------------------------------------------------------------------------- */

export function BotaoTema({ className }: { className?: string }) {
  const { escuroAgora, trocar } = useTema();
  const [montado, setMontado] = useState(false);

  /* o servidor não sabe qual edição está valendo. Renderizar o rótulo antes
     da hidratação daria divergência, então o texto só entra depois. */
  useEffect(() => setMontado(true), []);

  return (
    <button
      type="button"
      onClick={trocar}
      aria-pressed={montado ? escuroAgora : undefined}
      aria-label={montado ? (escuroAgora ? 'Mudar para a edição em papel' : 'Mudar para a edição noturna') : 'Trocar edição'}
      title={montado ? (escuroAgora ? 'edição papel' : 'edição noturna') : undefined}
      className={className}
      data-cursor="trocar"
    >
      <span className="mono text-[10px] tracking-[0.2em]" aria-hidden="true">
        {montado ? (escuroAgora ? 'NOITE' : 'PAPEL') : '     '}
      </span>
      <span aria-hidden="true" className="flex items-center gap-[3px]">
        <span
          className="block h-[9px] w-[9px] border border-current transition-colors"
          style={{ background: montado && !escuroAgora ? 'currentColor' : 'transparent' }}
        />
        <span
          className="block h-[9px] w-[9px] border border-current transition-colors"
          style={{ background: montado && escuroAgora ? 'currentColor' : 'transparent' }}
        />
      </span>
    </button>
  );
}
