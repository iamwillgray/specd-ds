# Specd DS

**Specd's global design system** — framework-agnostic Web Components with auto-generated React wrappers.

Write once. Use everywhere.

## Packages

| Import | Environment | Description |
|---|---|---|
| `@specd/specd-ds` | Any | Web Components — works in Figma plugins, vanilla web, Vue, Svelte, React 19+ |
| `@specd/specd-ds/react` | React ≥18 | Auto-generated React wrappers via `@lit/react` |
| `@specd/specd-ds/tokens.css` | Any | CSS custom property tokens only (colours, spacing, typography) |
| `@specd/specd-ds/components.css` | Any | Full component class rules (requires tokens) |

## Usage

### Figma plugins / vanilla web

```ts
import '@specd/specd-ds';           // registers <specd-*> custom elements
import '@specd/specd-ds/tokens.css';
import '@specd/specd-ds/components.css';
```

```html
<specd-button variant="primary">Scan now</specd-button>
<specd-chip label="Critical" count="3"></specd-chip>
```

### React web apps

```tsx
import { SpecdButton, SpecdChip } from '@specd/specd-ds/react';
import '@specd/specd-ds/tokens.css';
import '@specd/specd-ds/components.css';

function App() {
  return (
    <SpecdButton variant="primary" onClick={handleScan}>
      Scan now
    </SpecdButton>
  );
}
```

## Development

```bash
npm install
npm run dev          # Storybook at localhost:6006
npm test             # Vitest unit tests
npm run build        # Build both WC and React outputs
npm run typecheck    # TypeScript check
```

## Architecture

- **Source**: Lit 3 Web Components (TypeScript, light DOM — no Shadow DOM)
- **WC output**: `dist/web-components/` — ESM + CJS + type declarations
- **React output**: `dist/react/` — auto-generated via `@lit/react`, ESM only
- **CSS**: Token files in `src/tokens/`, component rules in `src/tokens/components.css`
- **Storybook**: Web Components renderer with autodocs from TS types
- **Tests**: Vitest + happy-dom + @open-wc/testing

## Consuming in Specd plugins (local development)

```bash
# From the specd-ds directory
npm link

# From the plugin directory (e.g. pulse/)
npm link @specd/specd-ds
```

Or via package.json workspace reference:

```json
"@specd/specd-ds": "file:../specd-ds"
```

## Specd products using Specd DS

| Product | Status |
|---|---|
| Pulse by Specd | Migrating |
| Specced by Specd | Planned |
| Mapped by Specd | Planned |
| Shipped by Specd | Planned |
| Shift by Specd | Planned |
| Released by Specd | Planned |

## Tokens

All design tokens are CSS custom properties on `:root`. They pierce Shadow DOM, so they work in any rendering context.

| Token file | Contents |
|---|---|
| `src/tokens/colors.css` | Brand palette, semantic colours, intent tiers |
| `src/tokens/typography.css` | Font families, scale, line heights |
| `src/tokens/spacing.css` | Spacing scale, border radius, shadows, z-index |
| `src/tokens/components.css` | Component class rules (`.btn-primary`, `.chip`, etc.) |
