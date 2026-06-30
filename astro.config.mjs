import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://nsf.stki.org/',
  output: 'server',
  adapter: cloudflare(),
  integrations: [tailwind(), sitemap()],
});
