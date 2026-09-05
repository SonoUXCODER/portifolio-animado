'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { Interlude as Peca } from '@/content';
import { useT } from './ContentProvider';
import { basePath } from '@/lib/base';
import { prepararEstilhaco, type Estilhaco } from '@/lib/estilhaco';

/* -------------------------------------------------------------------------
   INTERVALO — a escultura entre dois capítulos.

   É three.js na unha, sem react-three-fiber: a cena tem um modelo, três
   luzes e nenhuma interação além da rolagem. R3F custaria uns 80kB de
   runtime pra reimplementar exatamente isto.

   A rolagem comanda quatro coisas na câmera — aproximação, giro, altura e
   abertura da lente. Está detalhado no laço de desenho, mais abaixo.

   Três regras que sustentam a performance:
   1. o three só é baixado quando a peça chega perto da tela (import
      dinâmico), então quem nunca rola até aqui não paga nada;
   2. o loop de render só gira enquanto a seção está visível — fora dela o
      rAF é cancelado e a GPU dorme;
   3. ao desmontar, geometria, material, textura e o contexto WebGL são
      destruídos na mão. Sem isso, três peças numa página estouram o limite
      de contextos WebGL do navegador.

   A luz é de museu, não de estúdio de produto: uma chave forte e alta pela
   direita, um preenchimento frio e fraco pela esquerda, e ambiente quase
   zero. É a diferença entre mármore num nicho escuro e um render de
   e-commerce. O canvas é transparente (`alpha`), então a peça assenta
   direto sobre o preto da página, sem moldura e sem caixa.
   ------------------------------------------------------------------------- */

type Recursos = {
  parar: () => void;
  setProgresso: (p: number) => void;
};

export default function Interlude({ peca }: { peca: Peca }) {
  const t = useT();
  const secao = useRef<HTMLElement>(null);
  const palco = useRef<HTMLDivElement>(null);
  const recursos = useRef<Recursos | null>(null);
  const progresso = useRef(0);

  const reduzido = useReducedMotion();
  const [estado, setEstado] = useState<'espera' | 'carregando' | 'pronto' | 'erro'>('espera');
  const [perto, setPerto] = useState(false);
  /* posição do ponteiro, de -0.5 a 0.5, escrita num ref e lida pelo laço de
     desenho. Passar por estado aqui seria um render de React por quadro. */
  const ponteiro = useRef({ x: 0, y: 0 });

  /* ---------- a moldura sai junto com a peça ----------
     Enquanto a escultura se desmonta, a régua de cima e a legenda de baixo
     se afastam pra fora da tela e apagam. Sem isso a peça explode dentro de
     uma moldura que continua parada, e a moldura parada denuncia que aquilo
     é um quadro com um efeito dentro — exatamente a leitura que a seção
     inteira existe pra evitar.

     Aqui é framer-motion e não o ref do laço 3D de propósito: são elementos
     de DOM, e MotionValue escreve direto no estilo sem passar por render do
     React. O laço de desenho continua com a própria medição. */
  const { scrollYProgress } = useScroll({ target: secao, offset: ['start start', 'end end'] });
  const molduraOpacidade = useTransform(scrollYProgress, [0.62, 0.88], [1, 0]);
  const reguaY = useTransform(scrollYProgress, [0.62, 1], [0, -70]);
  const legendaY = useTransform(scrollYProgress, [0.62, 1], [0, 90]);

  /* ---------- monta perto, desmonta longe ----------

     Antes este observador se desconectava na primeira aproximação, e a peça
     nunca mais era desmontada. O efeito colateral só aparece numa página
     desta altura: são três esculturas, e depois de rolar até o fim as três
     ficam com contexto WebGL vivo, cada uma segurando geometria, textura e
     o ambiente PMREM na memória da GPU. O laço de render estava pausado,
     então não custava quadro nenhum, mas custava memória o tempo todo, e em
     celular de meio termo isso é a diferença entre rolar liso e o navegador
     começar a descartar aba.

     Agora o observador continua escutando. Sair da margem desmonta a cena, e
     o `parar()` no fim do efeito principal destrói tudo na mão. Voltar
     remonta: o .glb já está no cache HTTP, então o custo é reprocessar a
     malha, e isso acontece 1000px antes de a peça aparecer.

     1000px de margem, e não 600: com a margem curta demais uma rolagem
     rápida cruzaria a fronteira duas vezes em poucos quadros e a cena
     ficaria montando e desmontando. */
  useEffect(() => {
    const el = secao.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setPerto(e.isIntersecting), {
      rootMargin: '1000px 0px',
    });
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

        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: 'low-power',
        });
        /* 2 já é mais do que suficiente pra uma escultura em pedra; acima
           disso é só calor no aparelho de quem visita */
        /* 2 em tela grande, 1.5 no telefone. O canvas ocupa a viewport
           inteira, então cada 0.5 de razão são milhões de pixels a mais por
           quadro, e numa escultura em pedra cinza ninguém vê a diferença. */
        const estreito = window.innerWidth < 768;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, estreito ? 1.5 : 2));
        renderer.setSize(larg(), alt());
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        /* -------------------------------------------------------------
           A EXPOSIÇÃO SUBIU, E NO TELEFONE SUBIU MAIS.

           Era 0.85 fixo, escolhido olhando um monitor. No telefone a mesma
           cena chegava perto do preto: a tela é menor, então a escultura
           ocupa menos área e o olho tem menos superfície pra reconstruir a
           forma; o brilho da tela costuma estar em automático num ambiente
           que não é uma sala escura; e o ACES comprime justamente as
           sombras, que é quase tudo que uma peça em pedra cinza tem.

           O resultado é que a Daphne, que já era a mais fechada das duas,
           virava uma silhueta preta sobre fundo preto no aparelho.

           Não é caso de "clarear tudo": a peça tem de sair da penumbra, e
           não estar acesa. 0.95 no monitor é meio ponto acima do que era e
           não muda a leitura; 1.15 no telefone é o que devolve a forma sem
           chegar no ponto em que o ACES lava a pedra e ela vira gesso.

           Estes dois números e o `apoio` logo abaixo são os parafusos desta
           cena: se um dia ela ficar clara demais num aparelho, é aqui que
           se mexe, e em nenhum outro lugar.
           ------------------------------------------------------------- */
        renderer.toneMappingExposure = estreito ? 1.15 : 0.95;
        caixa.appendChild(renderer.domElement);
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.display = 'block';

        const cena = new THREE.Scene();

        /* o ambiente de sala dá reflexo difuso e tira o aspecto de plástico
           chapado que uma escultura ganha só com luz direcional */
        const pmrem = new THREE.PMREMGenerator(renderer);
        cena.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

        /* a câmera nasce já no começo do percurso da peça: montar num
           lugar e saltar pro outro no primeiro quadro dá um tranco visível.
           O valor sai do caráter, definido mais abaixo. */
        const INICIO = { descoberta: 8.6, metamorfose: 7.2 } as const;
        const camera = new THREE.PerspectiveCamera(38, larg() / alt(), 0.1, 100);
        camera.position.set(0, 0, INICIO[peca.carater]);

        /* chave quente e alta pela direita — é ela que desenha a forma, e
           no caráter "descoberta" é ela que sobe com a rolagem */
        const chave = new THREE.DirectionalLight(0xfff2e6, 3.1);
        chave.position.set(3.4, 5, 3.4);
        cena.add(chave);
        /* -------------------------------------------------------------
           AS LUZES DE APOIO SÃO MAIS FORTES NO TELEFONE.

           Preenchimento e contraluz são o que impede a silhueta de colar no
           fundo. Num monitor calibrado, num quarto, os valores originais
           bastavam. Num telefone — tela menor, brilho automático, e muitas
           vezes luz ambiente de verdade batendo nela — o que era "quase
           imperceptível de propósito" virava "não existe", e a peça ficava
           com um contorno só.

           O fator é 1.5, e ele não vale pra chave: clarear a chave mataria
           o claro-escuro que dá volume. O que se ilumina é a borda.
           ------------------------------------------------------------- */
        const apoio = estreito ? 1.5 : 1;
        /* preenchimento frio e fraco: separa a peça do fundo sem iluminá-la */
        const preenche = new THREE.DirectionalLight(0xbfd4ff, 0.55 * apoio);
        preenche.position.set(-4.2, 0.6, -2.6);
        cena.add(preenche);
        /* contraluz mínima, pra a silhueta não colar no preto */
        const contra = new THREE.DirectionalLight(0xffffff, 0.4 * apoio);
        contra.position.set(-0.6, 1.4, -5);
        cena.add(contra);
        cena.add(new THREE.AmbientLight(0xffffff, 0.16 * apoio));

        const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
        const gltf = await loader.loadAsync(`${basePath}${peca.file}`);
        if (!vivo) {
          renderer.dispose();
          return;
        }

        const grupo = new THREE.Group();
        const modelo = gltf.scene;

        /* centraliza e normaliza a altura: os três arquivos vêm de origens
           diferentes e chegariam com escalas incomparáveis */
        const limites = new THREE.Box3().setFromObject(modelo);
        const centro = limites.getCenter(new THREE.Vector3());
        const tamanho = limites.getSize(new THREE.Vector3());
        const escala = 3.2 / Math.max(tamanho.y, 0.001);
        modelo.position.sub(centro);
        grupo.scale.setScalar(escala);
        grupo.add(modelo);
        grupo.rotation.y = peca.startAngle ?? 0;
        cena.add(grupo);

        /* vértices coloridos (o Daphne é um scan sem textura) precisam ser
           ligados no material, senão o modelo sai branco */
        modelo.traverse((o) => {
          const malha = o as import('three').Mesh;
          if (!malha.isMesh) return;
          const mat = malha.material as import('three').MeshStandardMaterial;
          if (malha.geometry.getAttribute('color')) mat.vertexColors = true;
          /* -----------------------------------------------------------
             O AMBIENTE PESA MAIS AGORA.

             0.55 deixava a peça dependendo quase só das três direcionais,
             e três direcionais fazem sombra dura: o lado que não recebe
             chave fica em preto puro. É o que fazia a Daphne parecer
             recortada em vez de esculpida, e no telefone o lado escuro
             sumia inteiro dentro do fundo.

             O ambiente PMREM é justamente a luz que não vem de lugar
             nenhum, e é ela que desenha a curvatura do lado escuro. Em 0.9
             a pedra ganha o reflexo difuso de um nicho de museu sem virar
             o plástico brilhante de render de e-commerce, que é o que
             acontece passando de 1.
             ----------------------------------------------------------- */
          mat.envMapIntensity = 0.9;
          /* pedra é fosca. Deixar a rugosidade do arquivo, que vem de um
             scan e costuma vir baixa, dava um brilho de cerâmica na chave */
          if (mat.isMeshStandardMaterial) {
            mat.roughness = Math.max(mat.roughness ?? 1, 0.72);
            mat.metalness = Math.min(mat.metalness ?? 0, 0.05);
          }
          malha.castShadow = false;
          malha.receiveShadow = false;
        });

        /* -------------------------------------------------------------
           O ESTILHAÇO

           Converte a malha pra não-indexada e injeta o deslocamento por
           triângulo no shader. É a parte cara do carregamento — no Klio são
           135 mil triângulos virando 405 mil vértices — e por isso acontece
           aqui, colada no parse do .glb, que já é um bloqueio de linha
           principal. Engorda uma pausa que já existe em vez de criar uma
           nova, e acontece 1000px antes de a peça entrar na tela.

           A matemática toda está em lib/estilhaco.ts.

           >>> UM QUADRO DE FOLGA ANTES <<<
           O parse do .glb e a preparação do estilhaço são duas pausas
           longas, e encostadas uma na outra elas viram **uma** pausa que
           atravessa vários quadros — que é o tranco que se sentia ao rolar
           em direção à escultura. Ceder um quadro entre as duas não torna
           o trabalho mais barato; ele deixa o navegador pintar o que já
           tem no meio do caminho, e duas pausas curtas se lêem como
           carregamento, enquanto uma longa se lê como a página travando.

           `requestAnimationFrame` e não `setTimeout(0)` de propósito: a
           tarefa é de desenho, e o rAF é a fila que o navegador esvazia
           logo depois de pintar.

           O `setTimeout` ao lado não é redundância defensiva: **numa aba de
           fundo o rAF simplesmente não dispara**, e sozinho ele deixaria a
           montagem pendurada até a pessoa voltar pra aba. Quem chegar
           primeiro solta — o rAF no caminho normal, o relógio quando não há
           quadro nenhum pra esperar. */
        await Promise.race([
          new Promise<void>((r) => requestAnimationFrame(() => r())),
          new Promise<void>((r) => window.setTimeout(r, 120)),
        ]);
        if (!vivo) {
          renderer.dispose();
          return;
        }
        const estilhaco: Estilhaco = prepararEstilhaco(THREE, modelo);

        /* -------------------------------------------------------------
           O RESIZE ERA UM DOS TRANCOS, E SÓ APARECIA NO TELEFONE.

           O palco tem altura em `svh` dentro de um `sticky`. No celular, a
           barra de endereço encolhe e cresce **enquanto a pessoa rola**, e
           cada pixel disso é um disparo do ResizeObserver — que aqui
           chamava `setSize()` na hora. `setSize` realoca o buffer de
           desenho do WebGL: é das operações mais caras que existem, e ela
           estava sendo pedida dezenas de vezes por segundo, no meio do
           gesto de rolagem, com o estilhaço já ocupando a GPU.

           Duas guardas resolvem:

             coalescer   várias mudanças no mesmo quadro viram uma. O
                         ResizeObserver dispara em rajada; sem isto, uma
                         rajada de seis vira seis realocações.
             histerese   mudança só de altura, e pequena, é a barra do
                         navegador — não é a tela virando. Ignorar até 64px
                         de variação vertical cobre a barra de qualquer
                         telefone; a largura continua com tolerância de 1px,
                         porque largura mudando é rotação de verdade.

           O custo de ignorar é que o aspecto fica até 64px errado enquanto
           a barra está a meio caminho, o que numa escultura centralizada é
           literalmente invisível.
           ------------------------------------------------------------- */
        let larguraAnterior = larg();
        let alturaAnterior = alt();
        let rafResize = 0;

        const aplicarTamanho = () => {
          rafResize = 0;
          if (!palco.current) return;
          const l = larg();
          const a = alt();
          if (l === 0 || a === 0) return;
          larguraAnterior = l;
          alturaAnterior = a;
          renderer.setSize(l, a);
          camera.aspect = l / a;
          camera.updateProjectionMatrix();
        };

        const redimensionar = () => {
          const l = larg();
          const a = alt();
          const mudouLargura = Math.abs(l - larguraAnterior) > 1;
          const mudouAltura = Math.abs(a - alturaAnterior) > 64;
          if (!mudouLargura && !mudouAltura) return;
          if (!rafResize) rafResize = requestAnimationFrame(aplicarTamanho);
        };
        const ro = new ResizeObserver(redimensionar);
        ro.observe(caixa);

        let raf = 0;
        let rodando = false;
        let giroSuave = grupo.rotation.y;

        /* -------------------------------------------------------------
           A CÂMERA É A ROLAGEM.

           Não existe rotação automática nenhuma aqui: cada quadro é uma
           função da posição da barra de rolagem, e parar de rolar para a
           peça. É o que faz a escultura parecer um objeto que a pessoa está
           examinando, e não um GIF girando no canto.

           O que a rolagem comanda, em ordem de quanto se percebe:

             dolly   a câmera vai de 7.4 a 4.5 no eixo Z. Era de 6 a 5.2, um
                     movimento de 13% que praticamente não se lia. Agora são
                     39%, e a peça de fato vem em direção a quem olha.
             giro    a rotação inteira declarada em content/shared.ts.
             altura  a câmera sobe de leve e continua olhando pro centro,
                     então o ponto de vista desce ao redor da peça em vez de
                     só se aproximar dela em linha reta.
             lente   38° a 46° de campo. Abrir a lente enquanto a câmera se
                     aproxima é o "dolly zoom": o fundo parece se afastar
                     enquanto o objeto fica do mesmo tamanho. Em dose alta é
                     o efeito de vertigem do Hitchcock; nesta dose é só uma
                     inquietação que ninguém consegue nomear.

           A interpolação existe porque a rolagem chega picotada. Sem ela o
           mármore treme; com ela demais, ele fica pendurado atrás do dedo.
           ------------------------------------------------------------- */
        /* -------------------------------------------------------------
           O CARÁTER

           As três não podem entrar iguais: se entrarem, a segunda já é
           repetição da primeira e a terceira é preguiça. Cada uma responde
           a uma ideia, e a ideia mora em content/shared.ts.

             descoberta   Klio. Percurso longo de câmera, de 8.6 a 4.6, com
                          a luz-chave subindo de 0.9 a 3.6 conforme a
                          rolagem. Ela literalmente emerge do escuro, que é
                          o gesto de achar uma coisa enterrada.
             metamorfose  Daphne. A câmera orbita 2.4 unidades no eixo X
                          enquanto o modelo gira no dele, então a silhueta
                          nunca se repete duas vezes. É a peça que mais muda
                          de forma ao ser vista, e ela vira árvore no mito.

           A interpolação é a mesma nas três, então continuam parecendo do
           mesmo site. O que muda é o alvo, não o modo de chegar nele.
           ------------------------------------------------------------- */
        /* -------------------------------------------------------------
           A DAPHNE ERA A PEÇA ESCURA, E A CULPA ERA DESTA LINHA.

           `luz: [3.1, 3.1]` — a única das duas com a chave **constante**.
           A ideia era que a metamorfose fosse contada pela silhueta e não
           pela luz, e a ideia continua valendo; o problema é que 3.1 é o
           valor de chegada do Klio, que só o alcança no fim do percurso
           depois de subir de 0.9. Ou seja: a Daphne passava a seção inteira
           no ponto em que a outra peça está no clímax — e como ela orbita,
           a chave passa a maior parte do tempo batendo de raspão, não de
           frente. Somando com a exposição baixa, era uma peça em pedra
           cinza em preto sobre preto.

           Agora ela também respira, só que ao contrário do Klio: entra
           acesa e **fecha** conforme se aproxima e se abre. Ele emerge do
           escuro; ela mergulha nele. As duas ganham um arco de luz, as duas
           contam coisas diferentes, e nenhuma passa a seção num valor só.

           O piso de 3.4 é o que garante que, mesmo no fim, a forma continue
           legível num telefone.
           ------------------------------------------------------------- */
        const CARATER = {
          descoberta: { z: [8.6, 4.6], fov: [38, 44], orbita: 0, luz: [0.9, 3.6] },
          metamorfose: { z: [7.2, 4.9], fov: [38, 46], orbita: 2.4, luz: [4.6, 3.4] },
        } as const;
        const c = CARATER[peca.carater];

        let zSuave = c.z[0];
        let fovSuave = c.fov[0];
        let orbSuave = 0;
        let pxSuave = 0;
        let pySuave = 0;
        /* nasce desmontada: o primeiro quadro tem de ser o mesmo estado que
           o progresso 0 pede, senão a peça aparece inteira e salta pra
           despedaçada no quadro seguinte */
        let eSuave = reduzido ? 0 : 1;
        let opacidadeEscrita = 1;

        const entre = (par: readonly [number, number], p: number) => par[0] + (par[1] - par[0]) * p;
        const preso = (v: number) => Math.min(1, Math.max(0, v));

        const desenhar = () => {
          const p = progresso.current;
          const alvoGiro = (peca.startAngle ?? 0) + p * (peca.totalAngle ?? Math.PI * 1.2);

          /* -----------------------------------------------------------
             O ARCO EM TRÊS TEMPOS

               0    -> 0.34   ela se monta. Entra em cacos suspensos e se
                              fecha, e é a rolagem que fecha: parar no meio
                              deixa a peça pela metade no ar.
               0.34 -> 0.62   ela existe. Inteira, girando, com a câmera
                              fazendo o que o caráter dela manda.
               0.62 -> 1      ela se desmonta e abre o vão por onde a
                              próxima seção entra.

             O mesmo número comanda os dois extremos, então montar é
             literalmente desmontar ao contrário, e voltar a rolar pra cima
             refaz o caminho. Não há estado escondido: a posição de cada caco
             é uma função da barra de rolagem, como o resto da seção.
             ----------------------------------------------------------- */
          const montagem = 1 - preso(p / 0.34);
          const desmonte = preso((p - 0.62) / 0.38);
          const alvoE = reduzido ? 0 : Math.max(montagem, desmonte);

          if (reduzido) {
            grupo.rotation.y = alvoGiro;
            camera.position.set(0, 0, 6);
            camera.lookAt(0, 0, 0);
          } else {
            giroSuave += (alvoGiro - giroSuave) * 0.09;
            grupo.rotation.y = giroSuave;
            grupo.position.y = Math.sin(p * Math.PI) * 0.12;

            /* na saída a câmera mergulha 2.2 a mais pra dentro da casca
               que está se abrindo: é o que transforma "a peça explodiu" em
               "eu atravessei a peça" */
            zSuave += (entre(c.z, p) - desmonte * 2.2 - zSuave) * 0.07;
            fovSuave += (entre(c.fov, p) - fovSuave) * 0.07;
            orbSuave += (Math.sin(p * Math.PI) * c.orbita - orbSuave) * 0.07;

            /* o ponteiro entra por último e com peso pequeno: ele tempera a
               posição que a rolagem definiu, nunca disputa com ela */
            pxSuave += (ponteiro.current.x * 0.5 - pxSuave) * 0.05;
            pySuave += (ponteiro.current.y * -0.35 - pySuave) * 0.05;

            camera.position.z = zSuave;
            camera.position.x = orbSuave + pxSuave;
            camera.position.y = Math.sin(p * Math.PI) * 0.75 + pySuave;
            camera.fov = fovSuave;
            camera.updateProjectionMatrix();
            camera.lookAt(0, 0, 0);

            chave.intensity = entre(c.luz, p);
          }

          /* interpolar o estilhaço, e não usar o alvo cru, é o que impede a
             peça de tremer quando a rolagem chega picotada — mesma razão do
             resto do laço */
          eSuave += (alvoE - eSuave) * 0.14;
          estilhaco.explodir(eSuave);

          /* no fim do desmonte o canvas apaga, pra os últimos cacos não
             ficarem pendurados enquanto a próxima seção já está subindo.
             Só escreve no estilo quando o valor muda de verdade: escrever
             igual todo quadro é um recálculo de estilo de graça. */
          const alvoOpacidade = 1 - preso((desmonte - 0.72) / 0.28);
          if (Math.abs(alvoOpacidade - opacidadeEscrita) > 0.004) {
            opacidadeEscrita = alvoOpacidade;
            renderer.domElement.style.opacity = String(alvoOpacidade);
          }

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
        let naTela = false;
        const obsVis = new IntersectionObserver(
          ([e]) => {
            naTela = e.isIntersecting;
            if (naTela && !document.hidden) ligar();
            else desligar();
          },
          { rootMargin: '100px 0px' },
        );
        if (secao.current) obsVis.observe(secao.current);

        /* -------------------------------------------------------------
           VOLTAR PRA ABA NÃO PODE LIGAR UMA CENA QUE ESTÁ FORA DA TELA.

           Este handler era `document.hidden ? desligar() : ligar()`, e o
           `ligar()` não perguntava nada. O efeito: quem tinha rolado além
           das esculturas, trocava de aba e voltava, ligava **as duas** ao
           mesmo tempo — dois loops de WebGL renderizando peças que ninguém
           está vendo, em cima do que quer que estivesse na tela. É a
           travada que aparece "do nada" no desktop, sem relação com o que
           a pessoa está fazendo, porque a causa aconteceu numa troca de
           aba minutos antes.

           `naTela` é a resposta que faltava: quem manda continua sendo o
           observador de visibilidade da seção, e a aba só tem direito de
           **desligar**, ou de religar o que já estava visível.
           ------------------------------------------------------------- */
        const visibilidade = () => {
          if (document.hidden) desligar();
          else if (naTela) ligar();
        };
        document.addEventListener('visibilitychange', visibilidade);

        renderer.render(cena, camera);
        setEstado('pronto');

        recursos.current = {
          setProgresso: (p) => {
            progresso.current = p;
          },
          parar: () => {
            desligar();
            if (rafResize) cancelAnimationFrame(rafResize);
            obsVis.disconnect();
            ro.disconnect();
            document.removeEventListener('visibilitychange', visibilidade);
            cena.traverse((o) => {
              const malha = o as import('three').Mesh;
              if (!malha.isMesh) return;
              malha.geometry.dispose();
              const mats = Array.isArray(malha.material) ? malha.material : [malha.material];
              for (const m of mats) {
                for (const valor of Object.values(m) as unknown[]) {
                  if (valor && typeof valor === 'object' && 'isTexture' in valor) {
                    (valor as import('three').Texture).dispose();
                  }
                }
                m.dispose();
              }
            });
            /* toNonIndexed() deixou as geometrias originais órfãs: elas não
               estão mais na cena, então o traverse acima não as alcança */
            estilhaco.descartar();
            cena.environment?.dispose();
            pmrem.dispose();
            renderer.dispose();
            renderer.domElement.remove();
          },
        };
      } catch (erro) {
        console.error('interlude 3d:', erro);
        if (vivo) setEstado('erro');
      }
    })();

    return () => {
      vivo = false;
      recursos.current?.parar();
      recursos.current = null;
      /* volta pro estado inicial: sem isto a legenda continuaria dizendo
         que a peça está pronta depois de a cena ter sido destruída */
      setEstado('espera');
    };
  }, [perto, peca, reduzido]);

  /* ---------- o ponteiro desloca a câmera ----------
     Um quarto de unidade de deslocamento, com o olhar sempre no centro: o
     efeito é o de andar um passo ao redor da peça, não o de arrastá-la. Só
     em ponteiro fino, porque no dedo não há posição de repouso e a
     escultura ficaria pulando a cada toque. */
  useEffect(() => {
    if (reduzido) return;
    const fino = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fino) return;

    const mover = (e: PointerEvent) => {
      ponteiro.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      };
    };
    window.addEventListener('pointermove', mover, { passive: true });
    return () => window.removeEventListener('pointermove', mover);
  }, [reduzido]);

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

  return (
    <section
      ref={secao}
      id={`interlude-${peca.slug}`}
      aria-labelledby={`interlude-${peca.slug}-title`}
      className="relative h-[180vh] md:h-[210vh]"
    >
      <div className="sticky top-0 z-10 flex h-[100svh] flex-col overflow-hidden">
        {/* ---- régua superior ---- */}
        <motion.div
          className="shell pointer-events-none pt-[calc(var(--header-h)+var(--space-5))]"
          style={reduzido ? undefined : { opacity: molduraOpacidade, y: reguaY }}
        >
          <div
            className="flex items-start justify-between gap-[var(--space-5)] border-b pb-[var(--space-3)]"
            style={{ borderColor: 'var(--line)' }}
          >
            <p className="label" style={{ color: 'var(--accent)' }}>
              {t.interludes.label}
            </p>
            <p className="label label--dim text-right">{peca.technique}</p>
          </div>
        </motion.div>

        {/* ---- o palco ----
             flex-1 + min-h-0 em vez de altura fixa: com svh fixo a legenda
             cavalgava o modelo nas telas baixas. Aqui a peça fica com o que
             sobra entre a régua e a legenda, sempre. */}
        <div className="relative min-h-0 flex-1">
          <div ref={palco} className="absolute inset-0" aria-hidden="true" />

          {estado !== 'pronto' && (
            <p className="label absolute inset-0 flex items-center justify-center" role="status">
              {estado === 'erro' ? t.livePreview.blockedTitle : t.livePreview.loading}
            </p>
          )}
        </div>

        {/* ---- legenda ---- */}
        <motion.div
          className="shell pb-[var(--space-7)]"
          style={reduzido ? undefined : { opacity: molduraOpacidade, y: legendaY }}
        >
          <div
            className="flex flex-wrap items-end justify-between gap-x-[var(--space-7)] gap-y-[var(--space-3)] border-t pt-[var(--space-4)]"
            style={{ borderColor: 'var(--line)' }}
          >
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
