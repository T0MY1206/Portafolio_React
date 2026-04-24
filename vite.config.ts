import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

const BASE_PATH = process.env.VITE_BASE_PATH ?? '/Portafolio_React/'

export default defineConfig({
  plugins: [react()],
  base: BASE_PATH,
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
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/main.tsx', 'src/i18n/translations.json'],
      thresholds: {
        lines: 45,
        statements: 45,
        functions: 35,
        branches: 30,
      },
    },
  },
})
