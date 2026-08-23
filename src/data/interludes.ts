/* -------------------------------------------------------------------------
   OS INTERVALOS — as esculturas encartadas entre os capítulos.

   Cada uma marca uma virada da narrativa; não são enfeite, são a pausa
   entre um ato e o outro. A ordem em que aparecem está em app/page.tsx.

   Por que escultura, e não uma forma abstrata: a página inteira defende que
   interface é ofício. Um scan de mármore com cinco séculos, girando devagar
   numa sala escura, é o argumento visual mais curto que eu conheço a favor
   disso — e é também o único momento em que a página para de falar sobre
   trabalho e simplesmente mostra alguma coisa.

   >>> TROCAR OS MODELOS <<<
   Ponha o .glb em /public/3d e aponte `file`. O componente centraliza e
   normaliza a altura sozinho, então escala e origem não importam. Os
   arquivos aqui foram reduzidos com:
     gltf-transform optimize in.glb out.glb --compress false \
       --texture-compress false --simplify-ratio 0.06 --simplify-error 0.005
     gltf-transform meshopt out.glb final.glb --level high
   ------------------------------------------------------------------------- */

export type Interlude = {
  slug: string;
  title: string;
  /** a frase embaixo, que explica por que a peça está ali */
  caption: string;
  /** linha técnica, no alto */
  technique: string;
  file: string;
  /** rotação inicial em radianos, pra escolher a cara que abre a peça */
  startAngle?: number;
  /** quanto o modelo gira do começo ao fim da rolagem */
  totalAngle?: number;
};

export const interludes: Interlude[] = [
  {
    slug: 'klio',
    title: 'Klio',
    caption:
      'The muse of history, holding a scroll. Every project starts the same way: someone needs a thing recorded before it disappears.',
    technique: 'Photogrammetry · mesh decimated to 6%',
    file: '/3d/klio.glb',
    startAngle: -0.35,
    totalAngle: Math.PI * 1.15,
  },
  {
    slug: 'daphne',
    title: 'Daphne',
    caption:
      'She turns into a tree mid-escape. Which is roughly what happens to an idea between the sketch and the deploy. It arrives on the other side as something else.',
    technique: 'Point-cloud scan · vertex colour · no texture',
    file: '/3d/daphne.glb',
    startAngle: 0.5,
    totalAngle: -Math.PI * 1.3,
  },
  {
    slug: 'saint-andre',
    title: 'Saint André',
    caption:
      'Five centuries on, the fold of the cloth is still right. It is the shortest argument I know for doing things slowly and by hand.',
    technique: 'Photogrammetry · 1024px texture',
    file: '/3d/saint-andre.glb',
    startAngle: -0.2,
    totalAngle: Math.PI,
  },
];
