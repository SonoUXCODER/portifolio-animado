import type { NextConfig } from "next";

/**
 * O site é publicado como export estático no GitHub Pages, sob um subcaminho.
 * Trocar de repositório (ou apontar um domínio próprio) é mudar só estas duas
 * variáveis de ambiente — nenhum caminho fica escrito à mão no código.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/portifolio-animado";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    // export estático não roda o otimizador de imagem do Next
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
