/* -------------------------------------------------------------------------
   Desenhinhos. São todos SVG inline, traço aberto, sem preenchimento —
   é a mesma caneta em todo o site.

   O filtro `#tremido` (declarado uma vez em <FiltrosSVG/>, no layout)
   empurra os pontos da linha com ruído: é o que tira o cheiro de vetor
   perfeito e deixa parecido com mão.
   ------------------------------------------------------------------------- */

import type { DoodleKey } from '@/data/stack';

/** as definições de filtro vivem uma vez só, no fim do <body> */
export function FiltrosSVG() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <filter id="tremido">
          <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves="3" seed="7" result="r" />
          <feDisplacementMap in="SourceGraphic" in2="r" scale="2.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="tremido-forte">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="3" result="r" />
          <feDisplacementMap in="SourceGraphic" in2="r" scale="4.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

const tracos: Record<DoodleKey, React.ReactNode> = {
  estrela: (
    <>
      <path d="M32 6 38 26 58 32 38 38 32 58 26 38 6 32 26 26Z" />
      <path d="M50 10l3 6M11 48l4 5" />
    </>
  ),
  raio: (
    <>
      <path d="M36 5 16 34h13L26 59 50 27H35Z" />
    </>
  ),
  seta: (
    <>
      <path d="M6 44c12-6 20-18 26-30 4 12 12 22 26 26" />
      <path d="M46 44l12-4-4 13" />
    </>
  ),
  espiral: (
    <>
      <path d="M32 32c0-5 6-6 8-2s-3 11-9 11-13-7-11-16S31 3 43 6s18 16 14 29" />
    </>
  ),
  coracao: (
    <>
      <path d="M32 56C14 44 6 34 8 23 10 12 24 8 32 20c8-12 22-8 24 3 2 11-6 21-24 33Z" />
    </>
  ),
  olho: (
    <>
      <path d="M4 32c10-14 22-21 28-21s18 7 28 21c-10 14-22 21-28 21S14 46 4 32Z" />
      <circle cx="32" cy="32" r="8" />
      <path d="M32 4v-3M56 12l3-3M8 12 5 9" />
    </>
  ),
  triangulo: (
    <>
      <path d="M32 6 60 56H4Z" />
      <path d="M20 44h24" />
    </>
  ),
  nuvem: (
    <>
      <path d="M14 44c-7 0-11-5-10-11 1-5 6-8 11-7 1-9 9-14 17-12 7 2 11 8 11 14 7-1 12 3 12 9s-4 7-9 7Z" />
      <path d="M20 52l-3 7M34 52l-3 7M48 52l-3 7" />
    </>
  ),
  peixe: (
    <>
      <path d="M6 32c10-13 26-16 38-9 6 3 10 6 14 9-4 3-8 6-14 9-12 7-28 4-38-9Z" />
      <path d="M46 26a2 2 0 1 0 .1 0" />
      <path d="M18 24c4 5 4 11 0 16" />
    </>
  ),
};

type DoodleProps = {
  nome: DoodleKey;
  className?: string;
  cor?: string;
  tamanho?: number;
  larguraTraco?: number;
};

export function Doodle({ nome, className, cor = 'currentColor', tamanho = 44, larguraTraco = 2.6 }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={tamanho}
      height={tamanho}
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ overflow: 'visible' }}
    >
      <g
        fill="none"
        stroke={cor}
        strokeWidth={larguraTraco}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#tremido)"
      >
        {tracos[nome]}
      </g>
    </svg>
  );
}

/* ---------- peças avulsas usadas na composição ---------- */

/** seta comprida, dessas de anotação de caderno */
export function Seta({
  className,
  cor = 'currentColor',
  largura = 160,
  virada = false,
}: {
  className?: string;
  cor?: string;
  largura?: number;
  virada?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 160 60"
      width={largura}
      height={(largura * 60) / 160}
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ overflow: 'visible', transform: virada ? 'scaleX(-1)' : undefined }}
    >
      <g fill="none" stroke={cor} strokeWidth="2.4" strokeLinecap="round" filter="url(#tremido)">
        <path d="M4 40C34 46 62 34 78 20c14-12 34-14 48-2" />
        <path d="M114 6l14 12-16 8" />
      </g>
    </svg>
  );
}

/** rabisco solto, tapa buraco de composição */
export function Rabisco({ className, cor = 'currentColor', largura = 120 }: { className?: string; cor?: string; largura?: number }) {
  return (
    <svg
      viewBox="0 0 120 60"
      width={largura}
      height={(largura * 60) / 120}
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ overflow: 'visible' }}
    >
      <g fill="none" stroke={cor} strokeWidth="2.2" strokeLinecap="round" filter="url(#tremido-forte)">
        <path d="M6 44c14-8 18-30 30-30s10 26 22 26 14-24 26-24 12 20 30 14" />
      </g>
    </svg>
  );
}

/** três traços de ênfase, tipo marca-texto a caneta */
export function Traquinhos({ className, cor = 'currentColor' }: { className?: string; cor?: string }) {
  return (
    <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true" focusable="false" className={className} style={{ overflow: 'visible' }}>
      <g fill="none" stroke={cor} strokeWidth="2.4" strokeLinecap="round" filter="url(#tremido)">
        <path d="M6 26 16 8M18 30 28 10M30 32 38 18" />
      </g>
    </svg>
  );
}

/** moldura torta, pra circular um pedaço de texto */
export function Circulo({ className, cor = 'currentColor' }: { className?: string; cor?: string }) {
  return (
    <svg
      viewBox="0 0 200 90"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ overflow: 'visible' }}
    >
      <g fill="none" stroke={cor} strokeWidth="2.6" strokeLinecap="round" filter="url(#tremido)">
        <path d="M100 6C46 6 8 22 8 45s40 39 94 39 90-17 90-39S154 6 100 6Z" />
      </g>
    </svg>
  );
}

/** asterisco de nota de rodapé */
export function Asterisco({ className, cor = 'currentColor', tamanho = 28 }: { className?: string; cor?: string; tamanho?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={tamanho} height={tamanho} aria-hidden="true" focusable="false" className={className} style={{ overflow: 'visible' }}>
      <g fill="none" stroke={cor} strokeWidth="2.8" strokeLinecap="round" filter="url(#tremido)">
        <path d="M20 4v32M6 12l28 16M34 12 6 28" />
      </g>
    </svg>
  );
}
