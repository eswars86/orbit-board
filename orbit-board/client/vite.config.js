import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// OrbitBoard client build config.
// In production the built files are served by the Express server (port 3000),
// so the client calls the API on the same origin at `/api` by default.
// In standalone dev (`npm run dev:client`), requests to /api are proxied to 3000.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
