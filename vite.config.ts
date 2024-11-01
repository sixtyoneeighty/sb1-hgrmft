import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-router-dom', 'lucide-react'],
    },
  },
  optimizeDeps: {
    include: ['react-router-dom', 'lucide-react']
  }
});
