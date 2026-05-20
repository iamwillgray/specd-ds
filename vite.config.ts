import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// Web Components build — framework-agnostic
// Output: dist/web-components/index.esm.js + index.cjs.js + index.d.ts
// Consumed by: Figma plugins, vanilla web apps, any framework via custom elements
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'AdmiralDS',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'esm' : 'cjs'}.js`,
    },
    outDir: 'dist/web-components',
    rollupOptions: {
      // Lit is bundled in — consumers shouldn't need to install it
      // React is always external
      external: ['react', 'react-dom', '@lit/react'],
    },
  },
  plugins: [
    dts({
      outDir: 'dist/web-components',
      insertTypesEntry: true,
    }),
  ],
});
