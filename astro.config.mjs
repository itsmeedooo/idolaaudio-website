import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'static', // <-- Changed back to 'static'
  adapter: cloudflare({
    imageService: "compile"
  }),
  integrations: [react(), keystatic()],
});