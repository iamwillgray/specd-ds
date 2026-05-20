import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// React wrappers build — auto-generated via @lit/react
// Output: dist/react/index.esm.js + index.d.ts
// Consumed by: React web apps
// NOTE: This file is auto-generated from Web Components — never hand-edit React wrappers
export default defineConfig({
  build: {
    lib: {
      entry: 'src/react.ts',
      name: 'AdmiralDSReact',
      formats: ['es'],
      fileName: () => 'index.esm.js',
    },
    outDir: 'dist/react',
    rollupOptions: {
      // React and Lit are always external for the React wrapper output
      external: ['react', 'react-dom', '@lit/react', 'lit', /^lit\//],
    },
  },
  plugins: [
    dts({
      outDir: 'dist/react',
      insertTypesEntry: true,
    }),
  ],
});
