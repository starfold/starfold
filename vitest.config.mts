import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: ['vitest.dom.config.mts', 'vitest.node.config.mts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'commitlint.config.mjs',
        'node_modules/**',
        'dist/**',
        '**/*.d.ts',
        '**/*/index.ts',
        '**/theme.ts',
        'vitest*.config.mts',
        'tsup.config.ts',
      ],
    },
  },
})
