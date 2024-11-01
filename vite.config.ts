import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [],
    },
  },
  optimizeDeps: {
    include: ['react-router-dom', 'lucide-react']
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  server: {
    port: 3000
  }
});
