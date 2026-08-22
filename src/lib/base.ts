/**
 * Onde o site mora.
 *
 * No GitHub Pages ele fica numa subpasta com o nome do repositório, e é este
 * prefixo que conserta todo link, todo src e todo ícone. O padrão já é o de
 * produção pra que `npm run build` não precise de variável nenhuma — o dev
 * roda em http://localhost:3000/portifolio-animado e vê exatamente o que vai
 * pro ar.
 *
 * Com domínio próprio, é só publicar com `NEXT_PUBLIC_BASE_PATH=` (vazio).
 * O `??` respeita string vazia de propósito; `||` não respeitaria.
 *
 * Este mesmo padrão está repetido em next.config.mjs, que não consegue
 * importar TypeScript. Mudou aqui, muda lá.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/portifolio-animado';
