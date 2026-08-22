/* -------------------------------------------------------------------------
   As estampas: chapas 3D encartadas entre as páginas do arquivo.

   Cada uma marca uma virada da narrativa — não são enfeite, são a pausa
   entre um capítulo e o outro. A ordem em que aparecem está em app/page.tsx.

   >>> CRÉDITO <<<
   Os três arquivos são scans de escultura. Se vieram de um acervo de
   terceiros (Sketchfab, Scan the World, museu), quase sempre a licença é
   CC-BY e exige nome do autor e link. Preencha `credito` com a atribuição
   real antes de publicar — o campo já aparece na legenda da chapa.

   >>> TROCAR OS MODELOS <<<
   Ponha o .glb em /public/3d e aponte `arquivo`. O componente centraliza e
   normaliza a altura sozinho, então escala e posição de origem não importam.
   Os arquivos aqui foram reduzidos com:
     gltf-transform optimize in.glb out.glb --compress false \
       --texture-compress false --simplify-ratio 0.06 --simplify-error 0.005
     gltf-transform meshopt out.glb final.glb --level high
   ------------------------------------------------------------------------- */

export type Estampa = {
  slug: string;
  titulo: string;
  /** o que aparece embaixo, explicando por que a chapa está ali */
  legenda: string;
  /** linha técnica, no alto da chapa */
  tecnica: string;
  /** atribuição do modelo — veja o aviso acima */
  credito: string;
  arquivo: string;
  /** rotação inicial em radianos, pra escolher a cara que abre a chapa */
  giroInicial?: number;
  /** quanto o modelo gira do começo ao fim da rolagem */
  giroTotal?: number;
};

export const estampas: Estampa[] = [
  {
    slug: 'klio',
    titulo: 'KLIO',
    legenda:
      'A musa da história segura um rolo de papel. Todo projeto começa assim: alguém precisando registrar uma coisa antes que ela se perca.',
    tecnica: 'FOTOGRAMETRIA · 3D · MALHA REDUZIDA A 6%',
    credito: 'MODELO 3D — CRÉDITO A PREENCHER',
    arquivo: '/3d/klio.glb',
    giroInicial: -0.35,
    giroTotal: Math.PI * 1.15,
  },
  {
    slug: 'daphne',
    titulo: 'DAPHNE',
    legenda:
      'Ela vira árvore no meio da fuga. É mais ou menos o que acontece com uma ideia entre o rascunho e o deploy — chega do outro lado sendo outra coisa.',
    tecnica: 'SCAN EM PONTOS · COR POR VÉRTICE · SEM TEXTURA',
    credito: 'MODELO 3D — CRÉDITO A PREENCHER',
    arquivo: '/3d/daphne.glb',
    giroInicial: 0.5,
    giroTotal: -Math.PI * 1.3,
  },
  {
    slug: 'saint-andre',
    titulo: 'SAINT ANDRÉ',
    legenda:
      'Cinco séculos e a dobra do tecido ainda está certa. É o argumento mais curto que eu conheço a favor de fazer devagar e fazer à mão.',
    tecnica: 'FOTOGRAMETRIA · 3D · TEXTURA 1024px',
    credito: 'MODELO 3D — CRÉDITO A PREENCHER',
    arquivo: '/3d/saint-andre.glb',
    giroInicial: -0.2,
    giroTotal: Math.PI,
  },
];
