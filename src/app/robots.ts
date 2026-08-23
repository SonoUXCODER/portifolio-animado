import type { MetadataRoute } from 'next';
import { identity } from '@/content';

/* com output: export o Next exige a declaração explícita — sem ela o
   arquivo é tratado como rota dinâmica e o build para */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${identity.url}/sitemap.xml`,
  };
}
