/**
 * Loader de imagem do next/image.
 *
 * Por que existe: no export estático a saída óbvia é `images.unoptimized`,
 * mas nesse modo o Next entrega o `src` cru — sem o basePath. Como o site
 * mora em /portifolio-animado no Pages, toda imagem daria 404, e o
 * `<link rel="preload">` que o Next injeta apontaria pro lugar errado
 * também. O loader custom é o único ponto por onde todo src passa.
 *
 * Ele ignora `width` e `quality` de propósito: não há servidor pra redimensionar
 * nada, os arquivos já são .webp e são servidos como estão.
 */
import { basePath } from './base';

export default function imagemLoader({ src }: { src: string; width: number; quality?: number }) {
  return src.startsWith('/') ? `${basePath}${src}` : src;
}
