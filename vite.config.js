// @ts-check

import { defineConfig } from 'vite';

// Сборка отдаёт main.js и main.css, на них ссылается server/views/layouts/application.eta
export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: 'src/index.js',
      output: {
        format: 'iife',
        entryFileNames: 'main.js',
        assetFileNames: 'main[extname]',
      },
    },
  },
});
