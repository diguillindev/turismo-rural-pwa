// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';   // <-- plugin Vite para Tailwind 4
import react from '@astrojs/react';
import pwa from '@vite-pwa/astro';

export default defineConfig({
  integrations: [
    react(), // React en islas
    pwa({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
        runtimeCaching: [{
          urlPattern: /^https:\/\/fonts\.googleapis/,
          handler: 'CacheFirst',
        }],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()], // <-- Tailwind 4 como plugin Vite
  },
  output: 'static',
  //site: 'https://TU_USUARIO.github.io', // <-- reemplaza TU_USUARIO
  base: '/turismo-rural-pwa',
});