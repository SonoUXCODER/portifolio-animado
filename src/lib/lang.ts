/* -------------------------------------------------------------------------
   OS TRÊS IDIOMAS.

   Inglês, português do Brasil e alemão. Não é enfeite de portfólio: são os
   três públicos que aparecem de verdade — cliente suíço fala alemão,
   cliente brasileiro fala português, e a conversa com produto e startup na
   Europa acontece em inglês mesmo quando ninguém ali é nativo.

   >>> POR QUE ROTA, E NÃO ESTADO <<<
   O idioma podia ser um botão que troca o texto na hora, sem recarregar. É
   mais simples de escrever e foi o que eu fiz no site do salão. Aqui não
   serve: um portfólio precisa ser **encontrado** nos três mercados, e uma
   URL só significa uma página indexada só. Com /en/, /pt/ e /de/ existem
   três documentos, cada um com título, descrição e hreflang próprios, e o
   buscador entrega o certo pra cada pessoa.

   O preço é que todo link interno carrega o prefixo. `href()` abaixo existe
   pra que nenhum componente precise lembrar disso.
   ------------------------------------------------------------------------- */

export const langs = ['en', 'pt', 'de'] as const;

export type Lang = (typeof langs)[number];

/** o idioma que atende quem chega sem preferência conhecida */
export const defaultLang: Lang = 'en';

/** o nome de cada idioma no próprio idioma — nunca traduzido */
export const langNames: Record<Lang, string> = {
  en: 'English',
  pt: 'Português',
  de: 'Deutsch',
};

/** rótulo curto do alternador */
export const langShort: Record<Lang, string> = {
  en: 'EN',
  pt: 'PT',
  de: 'DE',
};

/** o código de `<html lang>` e do og:locale */
export const langTag: Record<Lang, string> = {
  en: 'en',
  pt: 'pt-BR',
  de: 'de-CH',
};

export const isLang = (v: string): v is Lang => (langs as readonly string[]).includes(v);

/**
 * Monta um caminho interno já com o prefixo do idioma.
 *
 *   href('pt')            -> '/pt'
 *   href('de', '/work')   -> '/de/work'
 *
 * O basePath do GitHub Pages é problema do Next, não daqui: `<Link>` e o
 * roteador já o acrescentam sozinhos.
 */
export const href = (lang: Lang, caminho = '') => `/${lang}${caminho}`;

/**
 * Escolhe o melhor idioma a partir do que o navegador pede.
 *
 * `navigator.languages` vem em ordem de preferência ('de-CH', 'de', 'en').
 * Comparo só as duas primeiras letras: quem tem 'pt-PT' configurado quer
 * português, e recusar por causa da região seria pedantismo.
 */
export function melhorIdioma(preferidos: readonly string[]): Lang {
  for (const p of preferidos) {
    const base = p.toLowerCase().slice(0, 2);
    const achado = langs.find((l) => l === base);
    if (achado) return achado;
  }
  return defaultLang;
}
