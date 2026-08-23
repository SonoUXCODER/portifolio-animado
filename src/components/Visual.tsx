'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { VisualKind } from '@/content';

/* -------------------------------------------------------------------------
   OS VISUAIS DAS CAPACIDADES.

   Cinco estudos que rodam de verdade — nenhum é imagem. É a diferença
   entre escrever "creative development" e deixar o creative development
   acontecendo na tela enquanto a pessoa lê a palavra.

   Regra que eu me impus: quase tudo é CSS ou SMIL puro, custo zero de JS.
   Os dois que precisam de script (ASCII e a grade) só ligam quando entram
   na tela, desligam ao sair, e param de vez no prefers-reduced-motion.

   Todos são `aria-hidden`: o que eles comunicam já está escrito ao lado, em
   texto. Um leitor de tela receberia uma tigela de pontuação.
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

/* ---------- grid: a grade que reage ao cursor ----------
   UX/UI. É literalmente um wireframe se revelando sob o ponteiro. */
function Grid() {
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
    /* O listener é do próprio elemento, não da janela. Já foi da janela,
       quando isto era fundo de seção inteira — e o resultado era a grade se
       mexendo com o cursor do outro lado da página, que lia como defeito.
       Agora o estudo é uma figura com moldura, e só reage quando o ponteiro
       está dentro dela. */
    el.addEventListener('pointermove', mover, { passive: true });
    return () => el.removeEventListener('pointermove', mover);
  }, [ref, dentro, reduzido]);

  return (
    <div
      ref={ref}
      className="h-full w-full"
      style={{
        ['--mx' as string]: '50%',
        ['--my' as string]: '50%',
        backgroundImage:
          'linear-gradient(var(--text-secondary) 1px, transparent 1px), linear-gradient(90deg, var(--text-secondary) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
        maskImage: 'radial-gradient(circle 120px at var(--mx) var(--my), #000 0%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(circle 120px at var(--mx) var(--my), #000 0%, transparent 100%)',
      }}
    />
  );
}

/* ---------- stripes: listras que andam ----------
   Frontend. Movimento contínuo e barato, que é exatamente o assunto. */
function Stripes() {
  return (
    <div
      className="h-full w-full"
      data-pause
      style={{
        backgroundImage:
          'repeating-linear-gradient(115deg, var(--text-secondary) 0 10px, transparent 10px 22px, var(--text-primary) 22px 24px, transparent 24px 46px)',
        backgroundSize: '200% 100%',
        animation: 'desliza-listra 6.5s linear infinite',
      }}
    />
  );
}

/* ---------- orbit: três corpos, zero física ----------
   Full-stack. Um sistema com camadas girando em velocidades diferentes. */
function Orbit() {
  return (
    <div className="flex h-full w-full items-center justify-center" data-pause>
      <svg viewBox="0 0 120 120" className="h-[92%] max-h-[520px] w-auto" aria-hidden="true">
        <g fill="none" stroke="var(--text-secondary)" strokeWidth="0.4" opacity="0.6">
          <circle cx="60" cy="60" r="52" />
          <circle cx="60" cy="60" r="38" />
          <circle cx="60" cy="60" r="22" />
        </g>
        <circle cx="60" cy="60" r="3.4" fill="var(--accent)" />
        <g className="gira" style={{ ['--dur' as string]: '14s', transformOrigin: '60px 60px' }}>
          <circle cx="112" cy="60" r="3" fill="var(--text-primary)" />
        </g>
        <g className="gira" style={{ ['--dur' as string]: '9s', transformOrigin: '60px 60px' }}>
          <circle cx="98" cy="60" r="2.2" fill="var(--text-secondary)" />
        </g>
        <g
          className="gira"
          style={{ ['--dur' as string]: '5s', animationDirection: 'reverse', transformOrigin: '60px 60px' }}
        >
          <circle cx="82" cy="60" r="1.6" fill="var(--text-secondary)" />
        </g>
      </svg>
    </div>
  );
}

/* ---------- moire: duas grades brigando ----------
   Design systems. Duas repetições regulares que, sobrepostas, produzem uma
   terceira coisa — que é o argumento inteiro de um sistema. */
function Moire() {
  return (
    <div className="relative h-full w-full overflow-hidden" data-pause>
      <span
        className="gira absolute left-1/2 top-1/2 h-[220%] w-[220%] -translate-x-1/2 -translate-y-1/2"
        style={{
          ['--dur' as string]: '38s',
          backgroundImage:
            'repeating-radial-gradient(circle at 50% 50%, var(--text-secondary) 0 1px, transparent 1px 9px)',
        }}
      />
      <span
        className="gira absolute left-[47%] top-[52%] h-[220%] w-[220%] -translate-x-1/2 -translate-y-1/2"
        style={{
          ['--dur' as string]: '27s',
          animationDirection: 'reverse',
          backgroundImage:
            'repeating-radial-gradient(circle at 50% 50%, var(--text-secondary) 0 1px, transparent 1px 9px)',
        }}
      />
    </div>
  );
}

/* ---------- graph: nós que acendem em sequência ----------
   AI engineering. Um grafo pequeno onde o sinal atravessa as camadas — que
   é a única imagem honesta de um modelo sem cair no cérebro de circuito
   impresso que toda página de IA usa. SMIL puro, zero JS. */
function Graph() {
  /* três camadas: 3 entradas, 4 no meio, 2 saídas. As posições são fixas
     porque um grafo aleatório muda de composição a cada render, e aqui ele
     precisa assentar na grade como qualquer outro elemento. */
  const camadas = [
    [26, 60, 94],
    [18, 52, 86, 120],
    [52, 94],
  ];
  const x = [24, 70, 116];

  return (
    <div className="flex h-full w-full items-center justify-center" data-pause>
      <svg viewBox="0 0 140 140" className="h-[88%] max-h-[480px] w-auto" aria-hidden="true">
        {/* as arestas, todas com todas entre camadas vizinhas */}
        <g stroke="var(--text-secondary)" strokeWidth="0.3" opacity="0.45">
          {camadas.slice(0, -1).flatMap((coluna, c) =>
            coluna.flatMap((y1) =>
              camadas[c + 1].map((y2) => (
                <line key={`${c}-${y1}-${y2}`} x1={x[c]} y1={y1} x2={x[c + 1]} y2={y2} />
              )),
            ),
          )}
        </g>

        {/* os nós. O atraso escalonado faz o pulso atravessar da esquerda
            pra direita, que é o sentido em que o dado corre. */}
        {camadas.map((coluna, c) =>
          coluna.map((y, i) => (
            <circle key={`${c}-${y}`} cx={x[c]} cy={y} r="3" fill="var(--text-primary)">
              <animate
                attributeName="r"
                values="2;4.2;2"
                dur="3.2s"
                begin={`${c * 0.42 + i * 0.12}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.35;1;0.35"
                dur="3.2s"
                begin={`${c * 0.42 + i * 0.12}s`}
                repeatCount="indefinite"
              />
            </circle>
          )),
        )}

        {/* a saída em acento: é o único ponto colorido, e marca onde o
            resultado sai */}
        {camadas[2].map((y) => (
          <circle key={`out-${y}`} cx={x[2]} cy={y} r="1.4" fill="var(--accent)" />
        ))}
      </svg>
    </div>
  );
}

/* ---------- ascii: onda feita de caractere ----------
   Creative development. Texto virando imagem em tempo real. */
const RAMPA = ' .:-=+*#%@';

function Ascii() {
  const { ref, dentro } = useNaTela<HTMLPreElement>();
  const reduzido = useReducedMotion();
  const [quadro, setQuadro] = useState('');

  useEffect(() => {
    if (!dentro || reduzido) return;
    const COLS = 78;
    const LINHAS = 26;
    let raf = 0;
    let ultimo = 0;

    const desenhar = (t: number) => {
      /* 14 fps chegam de sobra pra uma onda de texto — e não fritam a CPU */
      if (t - ultimo > 70) {
        ultimo = t;
        let saida = '';
        for (let y = 0; y < LINHAS; y++) {
          for (let x = 0; x < COLS; x++) {
            const v = Math.sin(x * 0.22 + t * 0.0014) * Math.cos(y * 0.34 - t * 0.001) * 0.5 + 0.5;
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
      className="mono flex h-full w-full items-center justify-center overflow-hidden text-[clamp(6px,0.85vw,12px)] leading-[1.08]"
      style={{ color: 'var(--text-secondary)' }}
    >
      {quadro || '···'}
    </pre>
  );
}

const demos: Record<VisualKind, () => React.JSX.Element> = {
  grid: Grid,
  stripes: Stripes,
  orbit: Orbit,
  moire: Moire,
  graph: Graph,
  ascii: Ascii,
};

export default function Visual({ kind }: { kind: VisualKind }) {
  const Demo = demos[kind];
  return (
    <div aria-hidden="true" className="h-full w-full">
      <Demo />
    </div>
  );
}
