import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Debe coincidir exactamente con el nombre del repo en GitHub Pages
  base: '/Portafolio_React/',
})

