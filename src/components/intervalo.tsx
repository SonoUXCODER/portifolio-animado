"use client";

import { m as motion, useMotionValueEvent, useTransform } from "framer-motion";
import type * as TRES from "three";
import { useEffect, useRef, useState } from "react";
import { useConteudo } from "@/components/conteudo";
import { useProgressoDoCorredor } from "@/lib/corredor";
import type { Interlude } from "@/content/types";
import { asset } from "@/lib/base-path";
import { useMovimentoReduzido } from "@/lib/hooks";

type Estado = "espera" | "carregando" | "pronto" | "erro";

/**
 * Onde a revelação da próxima seção começa, dentro do progresso do intervalo.
 *
 * A seção tem 300svh e o painel preso tem 100svh, então o progresso corre por
 * 200svh. O corredor da `.passagem` ocupa os últimos 100svh — ou seja, a
 * metade final. Ver o comentário de geometria em globals.css.
 */
const INICIO_REVELACAO = 0.5;

type Controle = {
  setProgresso: (v: number) => void;
  parar: () => void;
};

export default function Intervalo({ peca, label }: { peca: Interlude; label: string }) {
  const secao = useRef<HTMLElement>(null);
  const palco = useRef<HTMLDivElement>(null);
  const controle = useRef<Controle | null>(null);
  const progressoRef = useRef(0);
  const ponteiro = useRef({ x: 0, y: 0 });
  const reduzido = useMovimentoReduzido();
  const { livePreview } = useConteudo();
  const [estado, setEstado] = useState<Estado>("espera");
  const [perto, setPerto] = useState(false);

  /**
   * Um progresso só, da mesma fonte que a passagem usa: a posição que o Lenis
   * acabou de aplicar neste quadro. Lido pelo 3D (via ref, sem re-render) e
   * pelo HUD (via MotionValue).
   *
   * Antes eram três medições de rolagem independentes — uma no 3D, uma no HUD
   * e uma na passagem. Quando uma delas media a página em outro momento (fonte
   * trocando, imagem carregando, canvas entrando), as três discordavam e o
   * nome da obra ainda estava visível quando a próxima seção já vinha subindo.
   */
  const progresso = useProgressoDoCorredor(secao, "folga");

  /* HUD some antes de o círculo chegar ao meio da tela; e o pouco que ele se
     mexe é para LONGE do centro, nunca atravessando-o. */
  const opacidadeHud = useTransform(progresso, [INICIO_REVELACAO, 0.72], [1, 0]);
  const yTopo = useTransform(progresso, [INICIO_REVELACAO, 0.75], [0, -24]);
  const yBase = useTransform(progresso, [INICIO_REVELACAO, 0.75], [0, 24]);

  /**
   * Monta a cena antes de ela aparecer — e monta UMA vez só.
   *
   * Montar custa caro, e tudo na thread principal: 1,6 MB de GLB na Klio, o
   * decode meshopt, o `toNonIndexed()` que triplica 135 mil triângulos para
   * ~406 mil vértices, o laço que calcula centroide e semente de cada caco, e
   * a compilação do shader.
   *
   * Duas correções aqui:
   *
   * 1. A margem era de 1000px, então essa conta caía em cima de quem já
   *    estava rolando na direção da escultura. Agora são 1800px — duas telas
   *    de antecedência — e só depois de a página terminar de carregar e ficar
   *    ociosa, para o 3D não disputar banda com o hero.
   *
   * 2. Antes isto era `setPerto(entrada.isIntersecting)`: ao se afastar, a
   *    cena era DESTRUÍDA e remontada do zero na volta. Rolar da Klio até a
   *    Daphne e voltar refazia os 406 mil vértices e recompilava o shader.
   *    Agora trava em `true` na primeira vez e o observador se desliga; quem
   *    controla o custo por quadro é o outro observador, de 100px, que só
   *    liga e desliga o loop de desenho.
   */
  useEffect(() => {
    const alvo = secao.current;
    if (!alvo) return;
    let cancelado = false;

    const rede = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    /* em conexão econômica ou lenta, espera-se até mais perto: não se gasta o
       plano de dados de quem talvez nem chegue na escultura */
    const econômica = rede?.saveData || /^(slow-)?2g$/.test(rede?.effectiveType ?? "");

    const agendarOcioso: (cb: () => void) => void =
      typeof window.requestIdleCallback === "function"
        ? (cb) => window.requestIdleCallback(cb, { timeout: 2500 })
        : (cb) => void window.setTimeout(cb, 300);

    const montar = () => {
      if (cancelado) return;
      agendarOcioso(() => {
        if (!cancelado) setPerto(true);
      });
    };

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador.disconnect();
        if (document.readyState === "complete") montar();
        else window.addEventListener("load", montar, { once: true });
      },
      { rootMargin: econômica ? "600px 0px" : "1800px 0px" },
    );
    observador.observe(alvo);

    return () => {
      cancelado = true;
      observador.disconnect();
      window.removeEventListener("load", montar);
    };
  }, []);

  /* --- cena --- */
  useEffect(() => {
    if (!perto || !palco.current) return;
    let vivo = true;
    setEstado("carregando");

    (async () => {
      try {
        const THREE = await import("three");
        const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
        const { MeshoptDecoder } = await import(
          "three/examples/jsm/libs/meshopt_decoder.module.js"
        );
        const { RoomEnvironment } = await import(
          "three/examples/jsm/environments/RoomEnvironment.js"
        );
        if (!vivo || !palco.current) return;

        const caixa = palco.current;
        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
        });
        const compacto = window.innerWidth < 768;
        /* metade dos pixels de antes. Numa escultura escura, sem textura e com
           antialias ligado, a diferença não aparece — e o custo por quadro de um
           canvas em tela cheia cai junto, que é onde a rolagem estava engasgando. */
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, compacto ? 1.25 : 1.5));
        renderer.setSize(caixa.clientWidth, caixa.clientHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMappingExposure = compacto ? 1.15 : 0.95;
        caixa.appendChild(renderer.domElement);
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        renderer.domElement.style.display = "block";

        const cena = new THREE.Scene();
        const pmrem = new THREE.PMREMGenerator(renderer);
        cena.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

        const camera = new THREE.PerspectiveCamera(
          38,
          caixa.clientWidth / caixa.clientHeight,
          0.1,
          100,
        );
        camera.position.set(0, 0, { descoberta: 8.6, metamorfose: 7.2 }[peca.carater]);

        const chave = new THREE.DirectionalLight(0xfff2e6, 3.1);
        chave.position.set(3.4, 5, 3.4);
        cena.add(chave);
        const reforco = compacto ? 1.5 : 1;
        const fria = new THREE.DirectionalLight(0xbfd4ff, 0.55 * reforco);
        fria.position.set(-4.2, 0.6, -2.6);
        cena.add(fria);
        const contra = new THREE.DirectionalLight(0xffffff, 0.4 * reforco);
        contra.position.set(-0.6, 1.4, -5);
        cena.add(contra);
        cena.add(new THREE.AmbientLight(0xffffff, 0.16 * reforco));

        const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
        const gltf = await loader.loadAsync(asset(peca.file));
        if (!vivo) return renderer.dispose();

        const grupo = new THREE.Group();
        const modelo = gltf.scene;
        const limites = new THREE.Box3().setFromObject(modelo);
        const centro = limites.getCenter(new THREE.Vector3());
        const tamanho = limites.getSize(new THREE.Vector3());
        modelo.position.sub(centro);
        grupo.scale.setScalar(3.2 / Math.max(tamanho.y, 0.001));
        grupo.add(modelo);
        grupo.rotation.y = peca.startAngle ?? 0;
        cena.add(grupo);

        modelo.traverse((no) => {
          const malha = no as TRES.Mesh;
          if (!malha.isMesh) return;
          const material = malha.material as TRES.MeshStandardMaterial;
          if (malha.geometry.getAttribute("color")) material.vertexColors = true;
          material.envMapIntensity = 0.9;
          if (material.isMeshStandardMaterial) {
            material.roughness = Math.max(material.roughness ?? 1, 0.72);
            material.metalness = Math.min(material.metalness ?? 0, 0.05);
          }
          malha.castShadow = false;
          malha.receiveShadow = false;
        });

        await Promise.race([
          new Promise((r) => requestAnimationFrame(() => r(null))),
          new Promise((r) => window.setTimeout(r, 120)),
        ]);
        if (!vivo) return renderer.dispose();

        const estilhaco = prepararEstilhacos(THREE, modelo);

        let larguraAtual = caixa.clientWidth;
        let alturaAtual = caixa.clientHeight;
        let quadroResize = 0;
        let esperaResize = 0;

        const medir = () => {
          quadroResize = 0;
          if (!palco.current) return;
          const l = caixa.clientWidth;
          const a = caixa.clientHeight;
          if (!l || !a) return;
          larguraAtual = l;
          alturaAtual = a;
          renderer.setSize(l, a);
          camera.aspect = l / a;
          camera.updateProjectionMatrix();
        };
        const agendarMedida = () => {
          if (!quadroResize) quadroResize = requestAnimationFrame(medir);
        };
        const observadorTamanho = new ResizeObserver(() => {
          /* mudança de largura é real; mudança só de altura costuma ser a
             barra do navegador no celular, que não vale um resize de canvas */
          if (Math.abs(caixa.clientWidth - larguraAtual) > 1) {
            window.clearTimeout(esperaResize);
            esperaResize = 0;
            agendarMedida();
            return;
          }
          if (Math.abs(caixa.clientHeight - alturaAtual) <= 1) return;
          window.clearTimeout(esperaResize);
          esperaResize = window.setTimeout(agendarMedida, 220);
        });
        observadorTamanho.observe(caixa);

        const ALVO = {
          descoberta: { z: [8.6, 4.6], fov: [38, 44], orbita: 0, luz: [0.9, 3.6] },
          metamorfose: { z: [7.2, 4.9], fov: [38, 46], orbita: 2.4, luz: [4.6, 3.4] },
        }[peca.carater];

        const entre = (par: number[], t: number) => par[0] + (par[1] - par[0]) * t;
        const trava = (v: number) => Math.min(1, Math.max(0, v));

        let z = ALVO.z[0];
        let fov = ALVO.fov[0];
        let orbita = 0;
        let desvioX = 0;
        let desvioY = 0;
        let anguloSuave = grupo.rotation.y;
        let explosao = reduzido ? 0 : 1;
        let opacidade = 1;
        let quadro = 0;
        let rodando = false;
        let anterior: number[] | null = null;
        let ultimoInstante = 0;
        let tAnterior = progressoRef.current;
        let encaixar = true;

        /**
         * Suavização por meia-vida, em segundos, e não por fração de quadro.
         *
         * `x += (alvo - x) * 0.07` depende da taxa de quadros: a 30 fps a
         * câmera chega na metade da velocidade. E, o que importa mais aqui:
         * z, fov, órbita e ângulo são acumuladores, então carregam histórico.
         * Depois de um trecho sem desenhar (fora da tela, aba escondida) ou de
         * uma rolagem rápida, eles ficam para trás do progresso e a escultura
         * aparece fora do lugar antes de escorregar de volta.
         */
        const suavizar = (atual: number, alvo: number, meiaVida: number, dt: number) =>
          alvo + (atual - alvo) * Math.pow(2, -dt / meiaVida);

        const desenhar = (instante: number) => {
          const dt = ultimoInstante ? Math.min(0.05, (instante - ultimoInstante) / 1000) : 1 / 60;
          ultimoInstante = instante;

          const t = progressoRef.current;

          /**
           * Salto: primeiro quadro, loop voltando à tela, ou o progresso
           * pulando muito de uma vez (rolagem rápida, âncora, F5 no meio do
           * intervalo). Nesses casos não há nada para suavizar — a escultura
           * assume a pose do progresso atual em vez de perseguir ela.
           */
          const salto = encaixar || Math.abs(t - tAnterior) > 0.06;
          tAnterior = t;
          encaixar = false;
          const mover = (atual: number, alvo: number, meiaVida: number) =>
            salto ? alvo : suavizar(atual, alvo, meiaVida, dt);

          /* a peça se junta na entrada e se despedaça durante a revelação —
             agora as duas coisas acontecem com ela parada na tela */
          const juntando = 1 - trava(t / 0.17);
          const saindo = trava((t - INICIO_REVELACAO) / 0.42);
          const alvoExplosao = reduzido ? 0 : Math.max(juntando, saindo);

          const anguloAlvo = (peca.startAngle ?? 0) + t * (peca.totalAngle ?? Math.PI * 1.2);
          /**
           * O enquadramento percorre o curso inteiro do progresso, devagar.
           *
           * Antes eu comprimia isso em `t / 0.5`, para a câmera "chegar" antes
           * de a revelação começar. Só que aí ela batia no ponto mais fechado
           * (z 4.6 na Klio, contra 8.6 no início) já na metade e ficava lá: a
           * escultura aparecia grande demais, cortada, a maior parte do tempo.
           * Com o curso inteiro a peça entra longe e só fecha no fim, quando o
           * canvas já está saindo.
           */
          const acomodar = t;

          if (reduzido) {
            grupo.rotation.y = anguloAlvo;
            camera.position.set(0, 0, 6);
            camera.lookAt(0, 0, 0);
          } else {
            anguloSuave = mover(anguloSuave, anguloAlvo, 0.12);
            grupo.rotation.y = anguloSuave;
            grupo.position.y = 0.12 * Math.sin(acomodar * Math.PI);
            z = mover(z, entre(ALVO.z, acomodar) - 1.4 * saindo, 0.16);
            fov = mover(fov, entre(ALVO.fov, acomodar), 0.16);
            orbita = mover(orbita, Math.sin(acomodar * Math.PI) * ALVO.orbita, 0.16);
            desvioX = mover(desvioX, 0.5 * ponteiro.current.x, 0.22);
            desvioY = mover(desvioY, -0.35 * ponteiro.current.y, 0.22);
            camera.position.z = z;
            camera.position.x = orbita + desvioX;
            camera.position.y = 0.75 * Math.sin(acomodar * Math.PI) + desvioY;
            camera.fov = fov;
            camera.updateProjectionMatrix();
            camera.lookAt(0, 0, 0);
            chave.intensity = entre(ALVO.luz, acomodar);
          }

          explosao = mover(explosao, alvoExplosao, 0.08);
          estilhaco.explodir(explosao);

          /* o canvas some depois do HUD e antes de o círculo fechar a tela */
          const alvoOpacidade = 1 - trava((t - 0.72) / 0.23);
          if (Math.abs(alvoOpacidade - opacidade) > 0.004) {
            opacidade = alvoOpacidade;
            renderer.domElement.style.opacity = String(opacidade);
          }

          /**
           * Só desenha se alguma coisa mudou.
           *
           * Parado no meio do intervalo (lendo a legenda, por exemplo) o
           * quadro anterior continua valendo: nada de re-renderizar uma cena
           * idêntica 60 vezes por segundo enquanto o resto da página quer CPU.
           *
           * Comparação valor a valor, de propósito. A primeira versão disto
           * somava tudo num número só e comparava com `Number.NaN` no começo —
           * e `Math.abs(NaN - x) > 1e-4` é `false`. O primeiro quadro nunca
           * passava, a comparação nunca saía do NaN, e a escultura ficava
           * congelada no único quadro desenhado antes do loop começar. Uma
           * soma também deixa duas mudanças se cancelarem: se `z` cai o
           * tanto que `t` sobe, o total não muda e o quadro é pulado.
           */
          const atual = [t, anguloSuave, z, fov, orbita, desvioX, desvioY, explosao];
          let mudou = anterior === null;
          if (anterior) {
            for (let i = 0; i < atual.length; i++) {
              if (Math.abs(atual[i] - anterior[i]) > 1e-4) {
                mudou = true;
                break;
              }
            }
          }
          if (mudou) {
            anterior = atual;
            renderer.render(cena, camera);
          }
          quadro = requestAnimationFrame(desenhar);
        };

        const ligar = () => {
          if (rodando) return;
          rodando = true;
          anterior = null; /* voltou à tela: desenha pelo menos uma vez */
          ultimoInstante = 0; /* o intervalo parado não conta como tempo */
          encaixar = true; /* ...e a pose é assumida, não perseguida */
          quadro = requestAnimationFrame(desenhar);
        };
        const desligar = () => {
          if (!rodando) return;
          rodando = false;
          cancelAnimationFrame(quadro);
        };

        let naTela = false;
        const observadorTela = new IntersectionObserver(
          ([entrada]) => {
            naTela = entrada.isIntersecting;
            if (naTela && !document.hidden) ligar();
            else desligar();
          },
          { rootMargin: "100px 0px" },
        );
        if (secao.current) observadorTela.observe(secao.current);

        const aoTrocarAba = () => (document.hidden ? desligar() : naTela && ligar());
        document.addEventListener("visibilitychange", aoTrocarAba);

        /* compila o shader dos cacos agora, e não no primeiro quadro visível:
           é a última coisa cara que sobrava para acontecer em cima da hora */
        renderer.compile(cena, camera);
        renderer.render(cena, camera);
        setEstado("pronto");

        controle.current = {
          setProgresso: (v) => {
            progressoRef.current = v;
          },
          parar: () => {
            desligar();
            if (quadroResize) cancelAnimationFrame(quadroResize);
            window.clearTimeout(esperaResize);
            observadorTela.disconnect();
            observadorTamanho.disconnect();
            document.removeEventListener("visibilitychange", aoTrocarAba);
            cena.traverse((no) => {
              const malha = no as TRES.Mesh;
              if (!malha.isMesh) return;
              malha.geometry.dispose();
              const materiais = Array.isArray(malha.material) ? malha.material : [malha.material];
              for (const material of materiais) {
                for (const valor of Object.values(material)) {
                  if (valor && typeof valor === "object" && "isTexture" in valor) {
                    (valor as TRES.Texture).dispose();
                  }
                }
                material.dispose();
              }
            });
            estilhaco.descartar();
            cena.environment?.dispose();
            pmrem.dispose();
            renderer.dispose();
            renderer.domElement.remove();
          },
        };
      } catch (erro) {
        console.error("intervalo 3d:", erro);
        if (vivo) setEstado("erro");
      }
    })();

    return () => {
      vivo = false;
      controle.current?.parar();
      controle.current = null;
      setEstado("espera");
    };
  }, [perto, peca, reduzido]);

  /* --- paralaxe leve do ponteiro --- */
  useEffect(() => {
    if (reduzido || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const aoMover = (evento: PointerEvent) => {
      ponteiro.current = {
        x: evento.clientX / window.innerWidth - 0.5,
        y: evento.clientY / window.innerHeight - 0.5,
      };
    };
    window.addEventListener("pointermove", aoMover, { passive: true });
    return () => window.removeEventListener("pointermove", aoMover);
  }, [reduzido]);

  /* --- o 3D lê o mesmo progresso da passagem, no mesmo quadro --- */
  useMotionValueEvent(progresso, "change", (v) => {
    progressoRef.current = v;
    controle.current?.setProgresso(v);
  });

  return (
    <section
      ref={secao}
      id={`interlude-${peca.slug}`}
      aria-labelledby={`interlude-${peca.slug}-title`}
      className="pinado"
      style={{ background: "var(--tom-0)" }}
    >
      <div className="pinado__painel">
        <motion.div
          className="shell pointer-events-none pt-[calc(var(--header-h)+var(--space-5))]"
          style={reduzido ? undefined : { opacity: opacidadeHud, y: yTopo }}
        >
          {/* sem o fio do visor: o rótulo e a ficha técnica já se separam da
              escultura pelo espaço, e eram dois dos traços mais visíveis da
              página inteira, atravessando a tela de ponta a ponta */}
          <div className="flex items-start justify-between gap-[var(--space-5)] pb-[var(--space-3)]">
            <p className="label" style={{ color: "var(--accent)" }}>
              {label}
            </p>
            <p className="label label--dim text-right">{peca.technique}</p>
          </div>
        </motion.div>

        <div className="relative min-h-0 flex-1">
          <div ref={palco} className="absolute inset-0" aria-hidden />
          {estado !== "pronto" && (
            <p className="label absolute inset-0 flex items-center justify-center" role="status">
              {estado === "erro" ? livePreview.blockedTitle : livePreview.loading}
            </p>
          )}
        </div>

        <motion.div
          className="shell pb-[var(--space-7)]"
          style={reduzido ? undefined : { opacity: opacidadeHud, y: yBase }}
        >
          <div className="flex flex-wrap items-end justify-between gap-x-[var(--space-7)] gap-y-[var(--space-3)] pt-[var(--space-4)]">
            <div>
              <h2 id={`interlude-${peca.slug}-title`} className="display-md">
                {peca.title}
              </h2>
              <p className="body-sm mt-[var(--space-2)] max-w-[56ch]">{peca.caption}</p>
            </div>
            <p className="label label--dim">{peca.title}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * despedaçar a malha em cacos, no vertex shader
 * ------------------------------------------------------------------ */
type THREENS = typeof TRES;

function prepararEstilhacos(THREE: THREENS, raiz: TRES.Object3D) {
  const uniforme = { value: 0 };
  const descartaveis: TRES.BufferGeometry[] = [];

  raiz.traverse((no) => {
    const malha = no as TRES.Mesh;
    if (!malha.isMesh) return;

    const original = malha.geometry;
    const geo = original.index ? original.toNonIndexed() : original;
    if (geo !== original) descartaveis.push(original);
    geo.computeVertexNormals();

    const posicao = geo.getAttribute("position");
    const total = posicao.count;
    const centroides = new Float32Array(total * 3);
    const sementes = new Float32Array(total);

    for (let i = 0; i < total; i += 3) {
      const cx = (posicao.getX(i) + posicao.getX(i + 1) + posicao.getX(i + 2)) / 3;
      const cy = (posicao.getY(i) + posicao.getY(i + 1) + posicao.getY(i + 2)) / 3;
      const cz = (posicao.getZ(i) + posicao.getZ(i + 1) + posicao.getZ(i + 2)) / 3;
      const semente = Math.abs(Math.sin(12.9898 * cx + 78.233 * cy + 37.719 * cz) * 43758.5453) % 1;
      for (let k = 0; k < 3; k++) {
        const j = (i + k) * 3;
        centroides[j] = cx;
        centroides[j + 1] = cy;
        centroides[j + 2] = cz;
        sementes[i + k] = semente;
      }
    }

    geo.setAttribute("aCentroide", new THREE.BufferAttribute(centroides, 3));
    geo.setAttribute("aSemente", new THREE.BufferAttribute(sementes, 1));
    malha.geometry = geo;
    geo.computeBoundingSphere();
    if (geo.boundingSphere) geo.boundingSphere.radius *= 4;

    const material = malha.material as TRES.Material;
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uExplodir = uniforme;
      shader.vertexShader = shader.vertexShader
        .replace(
          "#include <common>",
          `#include <common>
           uniform float uExplodir;
           attribute vec3 aCentroide;
           attribute float aSemente;

           /* rotação em torno de um eixo qualquer, fórmula de Rodrigues.
              Cada caco gira no próprio eixo enquanto se afasta; sem isso os
              triângulos viajam paralelos e a peça parece derreter em vez de
              se despedaçar. */
           vec3 girar(vec3 v, vec3 eixo, float ang) {
             float c = cos(ang);
             return v * c + cross(eixo, v) * sin(ang) + eixo * dot(eixo, v) * (1.0 - c);
           }`,
        )
        .replace(
          "#include <beginnormal_vertex>",
          `#include <beginnormal_vertex>
           if (uExplodir > 0.0001) {
             float s = aSemente;
             vec3 eixo = normalize(vec3(s - 0.5, fract(s * 7.3) - 0.5, fract(s * 3.1) - 0.5));
             /* a normal gira junto, senão a luz continua batendo como se o
                caco não tivesse virado e o brilho denuncia a trapaça */
             objectNormal = girar(objectNormal, eixo, uExplodir * s * 9.0);
           }`,
        )
        .replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
           if (uExplodir > 0.0001) {
             float s = aSemente;
             vec3 eixo = normalize(vec3(s - 0.5, fract(s * 7.3) - 0.5, fract(s * 3.1) - 0.5));
             vec3 rel = girar(position - aCentroide, eixo, uExplodir * s * 9.0);

             /* pra fora a partir do centro da peça, com alcance variando por
                caco: alcance igual faria uma casca oca perfeita, que lê como
                balão inflando e não como coisa quebrando */
             vec3 fuga = normalize(aCentroide + vec3(0.0001)) * (0.9 + s * 2.6);
             /* e um empurrão pra frente, na direção da câmera: é ele que dá
                a sensação de atravessar a peça em vez de vê-la abrir */
             fuga.z += s * 1.4;

             transformed = aCentroide + rel + fuga * uExplodir * uExplodir;
           }`,
        );
    };
    material.needsUpdate = true;
  });

  return {
    explodir: (v: number) => {
      uniforme.value = v;
    },
    descartar: () => {
      for (const geo of descartaveis) geo.dispose();
      descartaveis.length = 0;
    },
  };
}
