/**
 * build-css.mjs
 * Concatenates token files and component styles into dist/tokens.css and dist/components.css
 * Run after vite build via `npm run build:css`
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const tokensDir = join(root, 'src', 'tokens');
const distDir = join(root, 'dist');

mkdirSync(distDir, { recursive: true });

// tokens.css = colors + typography + spacing (no component rules)
const tokenFiles = ['colors.css', 'typography.css', 'spacing.css'];
const tokensCss = tokenFiles
  .map(f => `/* === ${f} === */\n` + readFileSync(join(tokensDir, f), 'utf8'))
  .join('\n');
writeFileSync(join(distDir, 'tokens.css'), tokensCss);

// components.css = all component class rules (requires tokens)
const componentsCss = readFileSync(join(tokensDir, 'components.css'), 'utf8');
writeFileSync(join(distDir, 'components.css'), componentsCss);

console.log(`✓ dist/tokens.css       (${(tokensCss.length / 1024).toFixed(1)} kB)`);
console.log(`✓ dist/components.css   (${(componentsCss.length / 1024).toFixed(1)} kB)`);
