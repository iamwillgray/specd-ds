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
      // Without entryRoot, output paths are relative to the project root,
      // so src/core/index.ts's declaration lands at dist/core/core/index.d.ts
      // (nested) instead of dist/core/index.d.ts (flat, matching where the
      // JS entry actually lands) — this flattens it.
      entryRoot: 'src/core',
      // Without an explicit include, vite-plugin-dts walks the whole
      // tsconfig `include` (all of src/, every component) and emits a
      // .d.ts for each — hundreds of irrelevant files bloating this
      // DOM-less build's output for no reason. Scope it to just this
      // entry's own subtree.
      include: ['src/core/**/*.ts'],
      exclude: ['src/core/**/*.test.ts'],
    }),
  ],
});
