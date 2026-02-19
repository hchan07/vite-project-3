import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';


// https://vite.dev/config/
export default defineConfig(() => ({
server: {
    port: 5173,
    host: '127.0.0.1',
    hmr: {
      // Use the dev subdomain for HMR so it matches your Caddyfile
      host: 'dev.my-project.dev',
      clientPort: 443,
      protocol: 'wss',
    },
  },
  preview: {
    port: 4173,
    strictPort: true,
    host: '127.0.0.1',
    allowedHosts: ['my-project.dev'],
    // No HMR needed for preview since it's a static build
  },
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: false,
    }),
    react(),
    tailwindcss()
  ],
  base: '/vite-project-3/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    css: true,
    testTimeout: 5000,
    reporters: ['verbose'],
    coverage: {
      provider: 'v8', // or 'istanbul'
      include: ['src/**/*.{ts,tsx}']
    },    
  }
}));

