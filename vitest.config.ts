import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    exclude: ['tests/e2e/**', 'node_modules/**', 'dist/**'],
    // jest-axe + framer-motion renders are genuinely slow; under full-suite
    // parallel CPU contention they can exceed the 5s default and flake.
    testTimeout: 15000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      exclude: ['**/*.config.*', '**/tests/**', '**/.next/**'],
      thresholds: { lines: 80, functions: 80, branches: 70, statements: 80 },
    },
  },
  resolve: { alias: { '@': resolve(__dirname, './src') } },
})
