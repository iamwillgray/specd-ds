import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    include: ['src/**/*.test.ts'],
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['src/react.ts', 'src/test-setup.ts'],
    },
  },
});
