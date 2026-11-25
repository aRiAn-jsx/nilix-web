// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nilix.co',
  trailingSlash: 'never',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'fa',
    locales: ['fa', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'fa', locales: { fa: 'fa-IR', en: 'en' } },
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
