import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// Headless-logic build — zero DOM/Lit dependency.
// Output: dist/core/index.esm.js + index.cjs.js + index.d.ts
// Consumed by: Figma plugin sandbox contexts (main.ts) and any other
// DOM-less environment, as well as UI contexts that just want the pure
// logic without pulling in the Web Component barrel. See src/core/index.ts
// for why this is a separate entry point from the main "." export.
export default defineConfig({
  build: {
    lib: {
      entry: 'src/core/index.ts',
      name: 'SpecdDSCore',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'esm' : 'cjs'}.js`,
    },
    outDir: 'dist/core',
    emptyOutDir: true,
  },
  plugins: [
    dts({
      outDir: 'dist/core',
      insertTypesEntry: true,
    }),
  ],
});
