import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// KOLINN_NAV — Astro starter
// Static output; the entire site is server-rendered at build time and the
// behavior layer ships as tiny, dependency-free module scripts per component.
export default defineConfig({
  site: 'https://kolinn.dev',
  integrations: [
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
        const isLegacyProjectRoute =
          /^\/projects\/[^/]+\/$/.test(pathname) && pathname !== '/projects/releases/';
        return !['/about/', '/contact/'].includes(pathname) && !isLegacyProjectRoute;
      },
    }),
  ],
});
