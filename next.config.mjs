/**
 * O site é publicado no GitHub Pages, que serve só arquivo estático — daí o
 * `output: 'export'`. Duas consequências que valem lembrar:
 *
 * 1. Não existe servidor pra otimizar imagem. A saída aparentemente óbvia,
 *    `images.unoptimized`, entrega o src cru e sem basePath — toda imagem
 *    daria 404 dentro da subpasta. Por isso o loader custom.
 * 2. O site mora numa subpasta com o nome do repositório, e é o `basePath`
 *    que conserta todo link e todo src. O padrão já é o de produção, então
 *    nem build nem deploy precisam de variável; com domínio próprio basta
 *    publicar com NEXT_PUBLIC_BASE_PATH vazio.
 */

/* mesmo padrão de src/lib/base.ts — este arquivo não importa TypeScript.
   Mudou lá, muda aqui. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/portifolio-animado';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  /* com barra no fim cada rota vira uma pasta com index.html, que é o
     formato que o Pages sabe servir sem reescrita de URL */
  trailingSlash: true,
  /* existe um package-lock solto na pasta do usuário no Windows; sem isto o
     Next chuta a raiz errada na hora de rastrear os arquivos do build */
  outputFileTracingRoot: import.meta.dirname,
  reactStrictMode: true,
  images: {
    loader: 'custom',
    loaderFile: './src/lib/imagemLoader.ts',
    deviceSizes: [320, 375, 430, 640, 768, 1024, 1280, 1440, 1920, 2560],
  },
};

export default nextConfig;
