import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    include: [
      'packages/**/src/**/*.test.ts',
      'apps/**/src/**/*.test.ts',
      // Colocated vitest unit tests for Playwright helpers (Action 7).
      'packages/app/e2e/_helpers/**/*.test.ts',
    ],
  },
});
