import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Portafolio_React/',
  build: {
    target: 'esnext',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react/')) return 'vendor-react'
            if (id.includes('react-router')) return 'vendor-router'
            if (id.includes('@emailjs')) return 'vendor-emailjs'
          }
          return undefined
        },
      },
    },
  },
})
