/* -------------------------------------------------------------------------
   Tudo que é "identidade" mora aqui. Trocar uma linha aqui muda o site
   inteiro: nav, footer, contato, metadata, JSON-LD.
   ------------------------------------------------------------------------- */

export const site = {
  name: 'SONO',
  handle: 'sonoUXcoder',
  tagline: 'desenvolvedor full-stack e designer de produto',
  /* URL de produção. Trocar aqui muda canonical, og:image e sitemap.
     Vem do ambiente pra que uma futura mudança de domínio não precise de
     commit — basta a variável no build. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sonouxcoder.github.io/portifolio-animado',
  email: 'alissonvpt1@gmail.com',
  /* linha de crédito, no fim do rodapé */
  colofao: 'Composto em Fraunces e Instrument Sans. Escrito à mão em Next.js e TypeScript.',
  social: [
    { label: 'GITHUB', href: 'https://github.com/SonoUXCODER' },
    { label: 'INSTAGRAM', href: 'https://instagram.com/somnifobias' },
    /* TODO: trocar pelo perfil real */
    { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/sonouxcoder' },
    { label: 'E-MAIL', href: 'mailto:alissonvpt1@gmail.com' },
  ],
};

