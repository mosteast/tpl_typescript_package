import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['./test/setup.ts'],
    testTimeout: 3 * 60 * 1000,
  },
});
