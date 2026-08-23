/* -------------------------------------------------------------------------
   Tudo que é "identidade" mora aqui. Trocar uma linha aqui muda o site
   inteiro: nav, footer, contato, metadata, JSON-LD.

   O site é escrito em inglês. Não é preferência estética: o trabalho é
   procurado por gente que contrata produto digital na Europa, e essa
   conversa acontece em inglês mesmo quando ninguém ali é nativo.
   ------------------------------------------------------------------------- */

export const site = {
  name: 'SONO',
  /* a marca como ela aparece na navegação — o ® é parte do desenho */
  wordmark: 'sono®',
  handle: 'sonouxcoder',
  role: 'Full-Stack Developer & UX·UI Designer',
  tagline: 'I design experiences. I engineer systems.',
  /* URL de produção. Trocar aqui muda canonical, og:image e sitemap.
     Vem do ambiente pra que uma futura mudança de domínio não precise de
     commit — basta a variável no build. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sonouxcoder.github.io/portifolio-animado',
  email: 'alissonvpt1@gmail.com',

  /* ---- localização ----
     A coordenada aparece no hero e no rodapé. É de Berna, e é real: um
     número inventado é a primeira coisa que alguém confere. */
  city: 'Bern',
  country: 'Switzerland',
  coordinates: '46.9480° N / 7.4474° E',
  timezone: 'Europe/Zurich',

  /* estado de disponibilidade, usado no contato e na navegação */
  availability: 'Available for selected projects',

  /**
   * Quantos produtos já foram entregues, ao todo.
   *
   * Não sai de `projects.length`, e é de propósito: o arquivo de projetos
   * tem os cinco que valem um estudo de caso escrito, não tudo que já saiu
   * daqui. Contar o array daria cinco e subestimaria o trabalho em quatro
   * vezes. Este número é mantido à mão porque é a única coisa da página que
   * o código não tem como saber.
   */
  shipped: 21,

  /* linha de crédito, no fim do rodapé */
  colophon: 'Set in Archivo and Instrument Sans. Hand-written in Next.js and TypeScript.',

  social: [
    { label: 'GitHub', href: 'https://github.com/SonoUXCODER' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sonouxcoder' },
    { label: 'Instagram', href: 'https://instagram.com/somnifobias' },
    { label: 'Email', href: 'mailto:alissonvpt1@gmail.com' },
  ],
};

/** ano corrente, usado no hero e no rodapé */
export const currentYear = () => new Date().getFullYear();
