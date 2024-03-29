import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dependencies } from './package.json';

function renderChunks(deps: Record<string, string>) {
  const chunks = {};
  Object.keys(deps).forEach(key => {
    if (
        ['react', 'react-router-dom', 'react-dom'].includes(key)
    )
      return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-router-dom', 'react-dom'],
          ...renderChunks(dependencies),
        },
      },
    },
  },
  plugins: [react()],
})
