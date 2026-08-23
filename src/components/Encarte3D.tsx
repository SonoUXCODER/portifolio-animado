'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { Estampa } from '@/data/estampas';
import { basePath } from '@/lib/base';

/* -------------------------------------------------------------------------
   ESTAMPA — a chapa 3D encartada no meio do arquivo.

   É three.js na unha, sem react-three-fiber: a cena tem um modelo, três
   luzes e nenhuma interação além da rolagem. R3F custaria uns 80kB de
   runtime pra reimplementar exatamente isto.

   Três regras que sustentam a performance:
   1. o three só é baixado quando a estampa chega perto da tela (import
      dinâmico), então quem nunca rola até aqui não paga nada;
   2. o loop de render só gira enquanto a seção está visível — fora dela o
      rAF é cancelado e a GPU dorme;
   3. ao desmontar, geometria, material, textura e o contexto WebGL são
      destruídos na mão. Sem isso, três estampas numa página estouram o
      limite de contextos do navegador.

   O modelo entra na cor que o scan tem — pedra, quase neutra. Antes havia um
   filtro de cinza e uma retícula por cima, pra fazer o render parecer chapa
   impressa; era coerente enquanto a página inteira era um impresso, e virou
   fantasia assim que ela deixou de ser. O canvas é transparente (`alpha`),
   então a escultura assenta sobre o fundo da seção e acompanha o tema.
   ------------------------------------------------------------------------- */

type Recursos = {
  parar: () => void;
  setProgresso: (p: number) => void;
};

export default function Encarte3D({ estampa, indice }: { estampa: Estampa; indice: number }) {
  const secao = useRef<HTMLElement>(null);
  const palco = useRef<HTMLDivElement>(null);
  const recursos = useRef<Recursos | null>(null);
  const progresso = useRef(0);

  const reduzido = useReducedMotion();
  const [estado, setEstado] = useState<'espera' | 'carregando' | 'pronto' | 'erro'>('espera');
  const [perto, setPerto] = useState(false);

  /* ---------- só começa quando a estampa se aproxima da tela ---------- */
  useEffect(() => {
    const el = secao.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPerto(true);
          obs.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ---------- monta a cena ---------- */
  useEffect(() => {
    if (!perto || !palco.current) return;

    let vivo = true;
    setEstado('carregando');

    (async () => {
      try {
        const THREE = await import('three');
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const { MeshoptDecoder } = await import('three/examples/jsm/libs/meshopt_decoder.module.js');
        const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js');
        if (!vivo || !palco.current) return;

        const caixa = palco.current;
        const larg = () => caixa.clientWidth;
        const alt = () => caixa.clientHeight;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
        /* 2 já é mais do que suficiente pra uma escultura em cinza; acima
           disso é só calor no aparelho de quem visita */
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(larg(), alt());
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;
        caixa.appendChild(renderer.domElement);
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.display = 'block';

        const cena = new THREE.Scene();

        /* o ambiente de sala dá reflexo difuso e tira o aspecto de plástico
           chapado que uma escultura ganha só com luz direcional */
        const pmrem = new THREE.PMREMGenerator(renderer);
        cena.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

        const camera = new THREE.PerspectiveCamera(38, larg() / alt(), 0.1, 100);
        camera.position.set(0, 0, 6);

        const chave = new THREE.DirectionalLight(0xffffff, 2.4);
        chave.position.set(3, 5, 4);
        cena.add(chave);
        const preenche = new THREE.DirectionalLight(0xffffff, 0.7);
        preenche.position.set(-4, 1, -3);
        cena.add(preenche);
        cena.add(new THREE.AmbientLight(0xffffff, 0.35));

        const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
        const gltf = await loader.loadAsync(`${basePath}${estampa.arquivo}`);
        if (!vivo) {
          renderer.dispose();
          return;
        }

        const grupo = new THREE.Group();
        const modelo = gltf.scene;

        /* centraliza e normaliza a altura: os três arquivos vêm de origens
           diferentes e chegariam com escalas incomparáveis */
        const caixaLim = new THREE.Box3().setFromObject(modelo);
        const centro = caixaLim.getCenter(new THREE.Vector3());
        const tamanho = caixaLim.getSize(new THREE.Vector3());
        const escala = 3.1 / Math.max(tamanho.y, 0.001);
        modelo.position.sub(centro);
        grupo.scale.setScalar(escala);
        grupo.add(modelo);
        grupo.rotation.y = estampa.giroInicial ?? 0;
        cena.add(grupo);

        /* vértices coloridos (o Daphne é um scan sem textura) precisam ser
           ligados no material, senão o modelo sai branco */
        modelo.traverse((o) => {
          const malha = o as import('three').Mesh;
          if (!malha.isMesh) return;
          const mat = malha.material as import('three').MeshStandardMaterial;
          if (malha.geometry.getAttribute('color')) mat.vertexColors = true;
          mat.envMapIntensity = 0.75;
          malha.castShadow = false;
          malha.receiveShadow = false;
        });

        const redimensionar = () => {
          if (!palco.current) return;
          renderer.setSize(larg(), alt());
          camera.aspect = larg() / alt();
          camera.updateProjectionMatrix();
        };
        const ro = new ResizeObserver(redimensionar);
        ro.observe(caixa);

        let raf = 0;
        let rodando = false;
        let giroSuave = grupo.rotation.y;

        const desenhar = () => {
          const alvoGiro = (estampa.giroInicial ?? 0) + progresso.current * (estampa.giroTotal ?? Math.PI * 1.2);
          if (reduzido) {
            grupo.rotation.y = alvoGiro;
          } else {
            /* a rolagem é picotada; a interpolação tira o degrau sem
               atrasar a ponto de parecer solta */
            giroSuave += (alvoGiro - giroSuave) * 0.09;
            grupo.rotation.y = giroSuave;
            grupo.position.y = Math.sin(progresso.current * Math.PI) * 0.12;
          }
          camera.position.z = 6 - progresso.current * 0.7;
          camera.lookAt(0, 0, 0);
          renderer.render(cena, camera);
          raf = requestAnimationFrame(desenhar);
        };

        const ligar = () => {
          if (rodando) return;
          rodando = true;
          raf = requestAnimationFrame(desenhar);
        };
        const desligar = () => {
          if (!rodando) return;
          rodando = false;
          cancelAnimationFrame(raf);
        };

        /* o loop só existe enquanto a seção está na tela */
        const obsVis = new IntersectionObserver(([e]) => (e.isIntersecting ? ligar() : desligar()), {
          rootMargin: '100px 0px',
        });
        if (secao.current) obsVis.observe(secao.current);

        /* aba escondida: o navegador já congela o rAF, mas isso evita o
           salto de animação quando a pessoa volta */
        const visibilidade = () => (document.hidden ? desligar() : ligar());
        document.addEventListener('visibilitychange', visibilidade);

        renderer.render(cena, camera);
        setEstado('pronto');

        recursos.current = {
          setProgresso: (p) => {
            progresso.current = p;
          },
          parar: () => {
            desligar();
            obsVis.disconnect();
            ro.disconnect();
            document.removeEventListener('visibilitychange', visibilidade);
            cena.traverse((o) => {
              const malha = o as import('three').Mesh;
              if (!malha.isMesh) return;
              malha.geometry.dispose();
              const mats = Array.isArray(malha.material) ? malha.material : [malha.material];
              for (const m of mats) {
                for (const chave of Object.values(m) as unknown[]) {
                  if (chave && typeof chave === 'object' && 'isTexture' in chave) {
                    (chave as import('three').Texture).dispose();
                  }
                }
                m.dispose();
              }
            });
            cena.environment?.dispose();
            pmrem.dispose();
            renderer.dispose();
            renderer.domElement.remove();
          },
        };
      } catch (erro) {
        console.error('estampa 3d:', erro);
        if (vivo) setEstado('erro');
      }
    })();

    return () => {
      vivo = false;
      recursos.current?.parar();
      recursos.current = null;
    };
  }, [perto, estampa, reduzido]);

  /* ---------- rolagem -> progresso ----------
     Sem framer-motion aqui de propósito: um listener passivo escrevendo num
     ref não provoca render nenhum do React a 60fps. */
  useEffect(() => {
    const el = secao.current;
    if (!el) return;

    let raf = 0;
    const medir = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const curso = r.height - window.innerHeight;
      if (curso <= 0) {
        progresso.current = 0.5;
      } else {
        progresso.current = Math.min(1, Math.max(0, -r.top / curso));
      }
      recursos.current?.setProgresso(progresso.current);
    };
    const aoRolar = () => {
      if (!raf) raf = requestAnimationFrame(medir);
    };

    medir();
    window.addEventListener('scroll', aoRolar, { passive: true });
    window.addEventListener('resize', aoRolar);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', aoRolar);
      window.removeEventListener('resize', aoRolar);
    };
  }, [perto]);

  const romano = ['I', 'II', 'III', 'IV', 'V'][indice] ?? String(indice + 1);

  return (
    <section
      ref={secao}
      id={`estampa-${estampa.slug}`}
      aria-labelledby={`estampa-${estampa.slug}-titulo`}
      className="relative h-[170vh] md:h-[200vh]"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* ---- cabeçalho ---- */}
        <div className="shell pointer-events-none pt-[calc(var(--header-h)+var(--space-4))]">
          <div
            className="flex items-start justify-between gap-[var(--space-5)] border-b pb-[var(--space-3)]"
            style={{ borderColor: 'var(--border)' }}
          >
            <p className="label">
              <span style={{ color: 'var(--accent)' }}>{romano}</span> — intervalo
            </p>
            <p className="label text-right">{estampa.tecnica}</p>
          </div>
        </div>

        {/* ---- o palco ----
             flex-1 + min-h-0 em vez de altura fixa: com svh fixo a legenda
             cavalgava o modelo nas telas baixas. Aqui a peça fica com o que
             sobra entre o cabeçalho e a legenda, sempre. */}
        <div className="shell min-h-0 flex-1 py-[var(--space-4)]">
          <div
            className="relative h-full w-full border"
            style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
          >
            <div ref={palco} className="absolute inset-0" aria-hidden="true" />

            {estado !== 'pronto' && (
              <p
                className="label absolute inset-0 flex items-center justify-center"
                role="status"
              >
                {estado === 'erro' ? 'modelo indisponível' : 'carregando…'}
              </p>
            )}
          </div>
        </div>

        {/* ---- legenda ---- */}
        <div className="shell pb-[var(--space-7)]">
          <div
            className="flex flex-wrap items-end justify-between gap-x-[var(--space-7)] gap-y-[var(--space-3)] border-t pt-[var(--space-4)]"
            style={{ borderColor: 'var(--border)' }}
          >
            <div>
              <h2 id={`estampa-${estampa.slug}-titulo`} className="display-md">
                {estampa.titulo}
              </h2>
              <p className="body-sm mt-[var(--space-2)] max-w-[52ch]">{estampa.legenda}</p>
            </div>
            <p className="label">{estampa.credito}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
