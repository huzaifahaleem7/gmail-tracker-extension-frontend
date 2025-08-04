import { defineConfig } from 'vite';
import { copyFileSync, mkdirSync } from 'fs';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        background: 'src/background/background.js',
        content: 'src/content/content.js',
        // popup: 'src/popup/popup.html',
        
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'background') return 'background/background.js';
          if (chunkInfo.name === 'content') return 'content/content.js';
          return '[name].js';
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [
    {
      name: 'copy-static',
      closeBundle: () => {
        // Copy manifest
        copyFileSync('src/manifest.json', 'dist/manifest.json');

        // Create icons folder if needed
        mkdirSync('dist/icons', { recursive: true });
        copyFileSync('src/icons/icon.png', 'dist/icons/icon.png');
      }
    }
  ]
});
