import type { MetadataRoute } from 'next';
import { identity } from '@/content';
import { projectShapes } from '@/content/shared';
import { langTag, langs } from '@/lib/lang';

/* com output: export o Next exige a declaração explícita — sem ela o
   arquivo é tratado como rota dinâmica e o build para */
export const dynamic = 'force-static';

/* -------------------------------------------------------------------------
   18 URLs: 3 idiomas × (1 home + 5 estudos de caso).

   Cada entrada declara os irmãos em `alternates.languages`. É a mesma
   informação do hreflang no <head>, e os dois lugares valem: o buscador lê
   o sitemap antes de rastrear as páginas, e é ali que ele aprende que /pt e
   /de existem sem precisar tropeçar num link.

   A raiz `/` fica de fora de propósito: ela é uma porta de redirecionamento
   e está marcada como noindex.
   ------------------------------------------------------------------------- */

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();

  const alternativas = (caminho: string) => ({
    languages: Object.fromEntries(langs.map((l) => [langTag[l], `${identity.url}/${l}${caminho}`])),
  });

  const homes = langs.map((l) => ({
    url: `${identity.url}/${l}`,
    lastModified: agora,
    changeFrequency: 'monthly' as const,
    priority: 1,
    alternates: alternativas(''),
  }));

  const casos = langs.flatMap((l) =>
    projectShapes.map((p) => ({
      url: `${identity.url}/${l}/work/${p.slug}`,
      lastModified: agora,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
      alternates: alternativas(`/work/${p.slug}`),
    })),
  );

  return [...homes, ...casos];
}
