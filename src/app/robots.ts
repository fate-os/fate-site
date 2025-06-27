import { CONFIG } from '@/config-global';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: CONFIG.site.assetURL + '/sitemap.xml',
  };
}
