'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { ExperimentKind } from '@/data/experiments';

/* -------------------------------------------------------------------------
   Os demos de "COISAS QUE EU TESTEI".

   Regra que eu me impus aqui: nada de print. Cada quadro roda de verdade.
   Por isso quase todos são CSS ou SMIL puro — custo zero de JS. Os dois que
   precisam de script (ASCII e a grade) só ligam quando entram na tela e
   desligam ao sair, e param de vez no prefers-reduced-motion.
   ------------------------------------------------------------------------- */

/** liga/desliga o demo conforme ele entra e sai da tela */
function useNaTela<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [dentro, setDentro] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setDentro(e.isIntersecting), { rootMargin: '80px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, dentro };
}

/* ---------- 1. moiré: duas grades brigando ---------- */
function Moire() {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: 'var(--surface)' }}>
      <span
        className="gira absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2"
        style={{
          ['--dur' as string]: '26s',
          backgroundImage:
            'repeating-radial-gradient(circle at 50% 50%, var(--text-primary) 0 1.2px, transparent 1.2px 7px)',
        }}
      />
      <span
        className="gira absolute left-[46%] top-[52%] h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2"
        style={{
          ['--dur' as string]: '19s',
          animationDirection: 'reverse',
          backgroundImage:
            'repeating-radial-gradient(circle at 50% 50%, var(--text-secondary) 0 1.2px, transparent 1.2px 7px)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
}

/* ---------- 2. listras que andam ---------- */
function Listras() {
  return (
    <div
      className="h-full w-full"
      style={{
        backgroundImage:
          'repeating-linear-gradient(115deg, var(--text-secondary) 0 10px, var(--surface) 10px 20px, var(--text-primary) 20px 24px, var(--surface) 24px 42px)',
        backgroundSize: '200% 100%',
        animation: 'desliza-listra 5.5s linear infinite',
      }}
    />
  );
}

/* ---------- 3. onda de ASCII ---------- */
const RAMPA = ' .:-=+*#%@';

function Ascii() {
  const { ref, dentro } = useNaTela<HTMLPreElement>();
  const reduzido = useReducedMotion();
  const [quadro, setQuadro] = useState('');

  useEffect(() => {
    if (!dentro || reduzido) return;
    const COLS = 34;
    const LINHAS = 12;
    let raf = 0;
    let ultimo = 0;

    const desenhar = (t: number) => {
      /* 14 fps chegam de sobra pra uma onda de texto — e não fritam a CPU */
      if (t - ultimo > 70) {
        ultimo = t;
        let saida = '';
        for (let y = 0; y < LINHAS; y++) {
          for (let x = 0; x < COLS; x++) {
            const v =
              Math.sin(x * 0.34 + t * 0.0016) * Math.cos(y * 0.45 - t * 0.0011) * 0.5 + 0.5;
            saida += RAMPA[Math.floor(v * (RAMPA.length - 1))];
          }
          saida += '\n';
        }
        setQuadro(saida);
      }
      raf = requestAnimationFrame(desenhar);
    };

    raf = requestAnimationFrame(desenhar);
    return () => cancelAnimationFrame(raf);
  }, [dentro, reduzido]);

  return (
    <pre
      ref={ref}
      aria-hidden="true"
      className="mono flex h-full w-full items-center justify-center overflow-hidden text-[clamp(5px,1vw,9px)] leading-[1.05]"
      style={{ background: 'var(--border-strong)', color: 'var(--text-primary)' }}
    >
      {quadro || '···'}
    </pre>
  );
}

/* ---------- 4. órbita ---------- */
function Orbita() {
  return (
    <div className="flex h-full w-full items-center justify-center" style={{ background: 'var(--surface)' }}>
      <svg viewBox="0 0 120 120" className="h-[86%] w-[86%]" aria-hidden="true">
        <g fill="none" stroke="var(--text-primary)" strokeWidth="0.7" opacity="0.35">
          <circle cx="60" cy="60" r="46" />
          <circle cx="60" cy="60" r="30" />
          <circle cx="60" cy="60" r="16" />
        </g>
        <circle cx="60" cy="60" r="4.5" fill="var(--text-primary)" />
        <g className="gira" style={{ ['--dur' as string]: '9s', transformOrigin: '60px 60px' }}>
          <circle cx="106" cy="60" r="4" fill="var(--text-primary)" />
        </g>
        <g className="gira" style={{ ['--dur' as string]: '5.5s', transformOrigin: '60px 60px' }}>
          <circle cx="90" cy="60" r="2.8" fill="var(--text-secondary)" />
        </g>
        <g className="gira" style={{ ['--dur' as string]: '3s', animationDirection: 'reverse', transformOrigin: '60px 60px' }}>
          <circle cx="76" cy="60" r="2" fill="var(--text-secondary)" />
        </g>
      </svg>
    </div>
  );
}

/* ---------- 5. chuvisco de tv (SMIL, zero JS) ---------- */
function Ruido() {
  return (
    <svg viewBox="0 0 200 140" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
      <filter id="chuvisco">
        <feTurbulence type="fractalNoise" baseFrequency="0.7 0.9" numOctaves="2" result="n">
          <animate attributeName="baseFrequency" values="0.7 0.9;0.9 0.55;0.7 0.9" dur="3.2s" repeatCount="indefinite" />
        </feTurbulence>
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="200" height="140" fill="var(--border-strong)" />
      <rect width="200" height="140" filter="url(#chuvisco)" opacity="0.3" />
      <rect width="200" height="4" fill="var(--text-primary)" opacity="0.85">
        <animate attributeName="y" values="-6;140;-6" dur="4.5s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}

/* ---------- 6. tipo elástico (só CSS) ---------- */
function Tipo() {
  return (
    <div
      className="tipo-elastico flex h-full w-full items-center justify-center overflow-hidden"
      style={{ background: 'var(--text-primary)' }}
    >
      <span className="display-md leading-none" style={{ color: 'var(--surface)' }}>
        ESTICA
      </span>
    </div>
  );
}

/* ---------- 7. grade que reage ao mouse ---------- */
function Grade() {
  const { ref, dentro } = useNaTela<HTMLDivElement>();
  const reduzido = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !dentro || reduzido) return;
    const mover = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    el.addEventListener('pointermove', mover);
    return () => el.removeEventListener('pointermove', mover);
  }, [ref, dentro, reduzido]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="h-full w-full"
      style={{
        ['--mx' as string]: '50%',
        ['--my' as string]: '50%',
        background: 'var(--surface)',
        backgroundImage:
          'linear-gradient(var(--text-secondary) 1px, transparent 1px), linear-gradient(90deg, var(--text-secondary) 1px, transparent 1px)',
        backgroundSize: '17px 17px',
        maskImage: 'radial-gradient(circle 90px at var(--mx) var(--my), #000 0%, rgba(0,0,0,0.15) 100%)',
        WebkitMaskImage: 'radial-gradient(circle 90px at var(--mx) var(--my), #000 0%, rgba(0,0,0,0.15) 100%)',
      }}
    />
  );
}

/* ---------- 8. gota que nunca repete (SMIL) ---------- */
function Gota() {
  return (
    <div className="flex h-full w-full items-center justify-center" style={{ background: 'var(--border-strong)' }}>
      <svg viewBox="0 0 120 120" className="h-[82%] w-[82%]" aria-hidden="true">
        <path fill="var(--text-primary)">
          <animate
            attributeName="d"
            dur="7s"
            repeatCount="indefinite"
            values="
              M60 12C84 12 108 32 108 60C108 88 84 108 60 108C36 108 12 88 12 60C12 32 36 12 60 12Z;
              M60 8C90 16 100 40 104 64C108 88 82 112 56 108C30 104 14 84 16 56C18 28 34 2 60 8Z;
              M60 16C88 10 112 38 106 64C100 90 78 114 52 106C26 98 10 76 16 50C22 24 34 22 60 16Z;
              M60 12C84 12 108 32 108 60C108 88 84 108 60 108C36 108 12 88 12 60C12 32 36 12 60 12Z"
          />
        </path>
      </svg>
    </div>
  );
}

const demos: Record<ExperimentKind, () => React.JSX.Element> = {
  moire: Moire,
  listras: Listras,
  ascii: Ascii,
  orbita: Orbita,
  ruido: Ruido,
  tipo: Tipo,
  grade: Grade,
  gota: Gota,
};

export default function Experimento({ kind }: { kind: ExperimentKind }) {
  const Demo = demos[kind];
  return <Demo />;
}
