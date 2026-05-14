import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Production builds target GitHub Pages project site:
// https://aneeshkashyap004.github.io/Vaman-TextPrints/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/Vaman-TextPrints/' : '/',
}));
