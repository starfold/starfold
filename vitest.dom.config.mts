import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: 'dom',
    include: [
      'src/components/**/*.test.ts',
      'src/components/**/*.test.tsx',
      'src/app/*frontend*/**/*.test.tsx',
      'src/app/*frontend*/**/*.test.ts',
    ],
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./src/test/setup.dom.ts'],
    testTimeout: 10000,
  },
  resolve: {
    tsconfigPaths: true,
  },
})
