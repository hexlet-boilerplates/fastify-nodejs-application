// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// Собирается только стиль: клиентского js у приложения нет, страницы рендерит шаблонизатор на сервере.
// Имя файла фиксировано, потому что шаблон зовёт его как main.css.
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'assets/css/source.css',
      output: { assetFileNames: 'main.css' },
    },
  },
});
