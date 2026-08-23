import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { site } from '@/data/site';

/* com output: export o Next exige a declaração explícita — sem ela o
   arquivo é tratado como rota dinâmica e o build para */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();

  return [
    { url: site.url, lastModified: agora, changeFrequency: 'monthly', priority: 1 },
    ...projects.map((p) => ({
      url: `${site.url}/work/${p.slug}`,
      lastModified: agora,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  ];
}
