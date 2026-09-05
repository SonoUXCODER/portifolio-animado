import type * as THREE_NS from 'three';

/* -------------------------------------------------------------------------
   ESTILHAÇAR UMA ESCULTURA.

   Prepara uma malha pra que ela possa se desmontar em triângulos e voltar,
   comandada por um número só. Devolve `explodir(0..1)`.

   >>> POR QUE NÃO DÁ PRA SEPARAR "PARTES" <<<
   A tentação é afastar os pedaços que o modelo já tem. Não existem: os três
   arquivos são scan de fotogrametria, e conferindo dentro do .glb cada um é
   **uma malha só, com uma primitiva só** — 135 mil triângulos no Klio, 113
   mil no Saint André, 66 mil na Daphne, e nenhum nó filho. Não há braço,
   base nem rolo de papel pra separar. Desmontar aqui só pode significar
   fragmentar a superfície.

   >>> POR QUE NÃO-INDEXADA <<<
   Numa geometria indexada os triângulos vizinhos compartilham vértice. Se
   um triângulo se afasta, o vizinho é esticado junto e o resultado é uma
   teia de triângulos compridos, não um estilhaço. `toNonIndexed()` dá a
   cada triângulo os próprios três vértices, e é isso que permite eles se
   separarem de verdade.

   O preço é memória. O Klio sai de 181 mil pra 405 mil vértices; com
   posição, normal, UV, centroide e semente são ~48 bytes por vértice, ou
   cerca de 19 MB de buffer. Como só uma peça fica montada por vez, o pico é
   esse. É caro e é o custo real do efeito — não há versão barata disso.

   De brinde, `computeVertexNormals()` numa geometria não-indexada produz
   normal por face em vez de suavizada, que é exatamente o que se quer pra
   estilhaço: cada caco reflete a luz como uma lasca plana. E resolve o Klio
   não trazer NORMAL nenhuma no arquivo.

   >>> POR QUE NO SHADER <<<
   Mover 135 mil triângulos em JavaScript a cada quadro é impossível. Aqui
   a posição de cada caco é calculada na GPU a partir de um uniform só, e o
   custo por quadro em JS é escrever um número. O trabalho de montar isto
   acontece uma vez, quando a peça carrega.
   ------------------------------------------------------------------------- */

export type Estilhaco = {
  /** 0 = inteira, 1 = totalmente desmontada */
  explodir: (v: number) => void;
  /** libera a geometria original, que `toNonIndexed` deixou órfã */
  descartar: () => void;
};

export function prepararEstilhaco(THREE: typeof THREE_NS, raiz: THREE_NS.Object3D): Estilhaco {
  const uniformes = { uExplodir: { value: 0 } };
  const orfas: THREE_NS.BufferGeometry[] = [];

  raiz.traverse((o) => {
    const malha = o as THREE_NS.Mesh;
    if (!malha.isMesh) return;

    const original = malha.geometry;
    const geo = original.index ? original.toNonIndexed() : original;
    if (geo !== original) orfas.push(original);

    /* normal por face: é o que faz cada caco parecer uma lasca plana */
    geo.computeVertexNormals();

    /* -------- centroide e semente, um par por triângulo --------
       Os dois são escritos igual nos três vértices do triângulo, e é essa
       igualdade que faz os três andarem juntos como um caco só.

       >>> LEIA COM getX(), NUNCA COM pos.array <<<
       Já tentei trocar as chamadas por acesso direto ao array, atrás do
       argumento de que são 1,2 milhão de chamadas de método no Klio e que
       o laço ficaria várias vezes mais rápido. O laço ficou. A escultura
       quebrou inteira, e a razão está nos próprios arquivos:

         extensionsUsed: EXT_meshopt_compression, KHR_mesh_quantization
         POSITION: componentType=SHORT, normalized=true, byteStride=8

       Ou seja, a posição **não é Float32**. É um inteiro de 16 bits com
       `normalized: true`, e quem desfaz a quantização é justamente o
       `getX()`, que divide por 32767. Lendo o array cru vinham valores na
       casa dos milhares no lugar de frações de unidade: todo centroide
       saía cerca de 32 mil vezes maior que a peça, e como o shader começa
       em `uExplodir = 1`, a escultura nascia estourada em geometria
       astronômica e nunca se montava.

       `toNonIndexed()` não salva disso — ele copia os atributos
       preservando tipo e normalização — e o `byteStride` de 8 ainda
       abre a possibilidade de o atributo chegar interleaved, em que
       `array` é o buffer inteiro e o passo nem sequer é 3.

       O custo das chamadas é real e continua aqui. Ele é pago com o quadro
       de folga que <Interlude/> cede antes de chamar esta função, e não
       com uma leitura que assume um formato que os arquivos não têm. */
    const pos = geo.getAttribute('position');
    const total = pos.count;
    const centroides = new Float32Array(total * 3);
    const sementes = new Float32Array(total);

    for (let i = 0; i < total; i += 3) {
      const cx = (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3;
      const cy = (pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3;
      const cz = (pos.getZ(i) + pos.getZ(i + 1) + pos.getZ(i + 2)) / 3;

      /* Semente determinística, tirada da própria posição do triângulo.
         Com Math.random() a peça se desmontaria diferente a cada visita, e
         a diferença apareceria justamente ao voltar pela mesma seção: o
         caco que voou pra esquerda da primeira vez iria pra direita na
         segunda, e o efeito passaria a parecer instável em vez de físico. */
      const s = Math.abs(Math.sin(cx * 12.9898 + cy * 78.233 + cz * 37.719) * 43758.5453) % 1;

      for (let k = 0; k < 3; k++) {
        const d = (i + k) * 3;
        centroides[d] = cx;
        centroides[d + 1] = cy;
        centroides[d + 2] = cz;
        sementes[i + k] = s;
      }
    }

    geo.setAttribute('aCentroide', new THREE.BufferAttribute(centroides, 3));
    geo.setAttribute('aSemente', new THREE.BufferAttribute(sementes, 1));
    malha.geometry = geo;

    /* a caixa de corte precisa cobrir a peça desmontada, senão o navegador
       descarta os cacos que saíram do volume original e eles somem no meio
       do voo */
    geo.computeBoundingSphere();
    if (geo.boundingSphere) geo.boundingSphere.radius *= 4;

    const mat = malha.material as THREE_NS.MeshStandardMaterial;
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uExplodir = uniformes.uExplodir;

      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>
           uniform float uExplodir;
           attribute vec3 aCentroide;
           attribute float aSemente;

           /* rotação em torno de um eixo arbitrário, fórmula de Rodrigues.
              Cada caco gira no próprio eixo enquanto se afasta; sem isso os
              triângulos viajam paralelos e a peça parece derreter em vez de
              se despedaçar. */
           vec3 girar(vec3 v, vec3 eixo, float ang) {
             float c = cos(ang);
             return v * c + cross(eixo, v) * sin(ang) + eixo * dot(eixo, v) * (1.0 - c);
           }`,
        )
        .replace(
          '#include <beginnormal_vertex>',
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
          '#include <begin_vertex>',
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
    /* o material já pode ter sido compilado antes do patch */
    mat.needsUpdate = true;
  });

  return {
    explodir: (v) => {
      uniformes.uExplodir.value = v;
    },
    descartar: () => {
      for (const g of orfas) g.dispose();
      orfas.length = 0;
    },
  };
}
