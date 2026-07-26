import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves project sites from /<repo-name>/, not the domain
  // root, so every built asset URL must be prefixed accordingly. Vite
  // also serves the dev server under this path (http://localhost:5173/Imposter/),
  // matching production.
  base: '/Imposter/',
})
