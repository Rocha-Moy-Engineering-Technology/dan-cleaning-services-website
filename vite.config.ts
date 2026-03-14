import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [tailwindcss(), react()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts,tsx}'],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    passWithNoTests: true,
  },
});
