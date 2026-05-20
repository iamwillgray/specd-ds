# Admiral DS

**Specd's global design system** — framework-agnostic Web Components with auto-generated React wrappers.

Write once. Use everywhere.

## Packages

| Import | Environment | Description |
|---|---|---|
| `@specd/admiral-ds` | Any | Web Components — works in Figma plugins, vanilla web, Vue, Svelte, React 19+ |
| `@specd/admiral-ds/react` | React ≥18 | Auto-generated React wrappers via `@lit/react` |
| `@specd/admiral-ds/tokens.css` | Any | CSS custom property tokens only (colours, spacing, typography) |
| `@specd/admiral-ds/components.css` | Any | Full component class rules (requires tokens) |

## Usage

### Figma plugins / vanilla web

```ts
import '@specd/admiral-ds';           // registers <admiral-*> custom elements
import '@specd/admiral-ds/tokens.css';
import '@specd/admiral-ds/components.css';
```

```html
<admiral-button variant="primary">Scan now</admiral-button>
<admiral-chip label="Critical" count="3"></admiral-chip>
```

### React web apps

```tsx
import { AdmiralButton, AdmiralChip } from '@specd/admiral-ds/react';
import '@specd/admiral-ds/tokens.css';
import '@specd/admiral-ds/components.css';

function App() {
  return (
    <AdmiralButton variant="primary" onClick={handleScan}>
      Scan now
    </AdmiralButton>
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
# From the admiral-ds directory
npm link

# From the plugin directory (e.g. pulse/)
npm link @specd/admiral-ds
```

Or via package.json workspace reference:

```json
"@specd/admiral-ds": "file:../admiral-ds"
```

## Specd products using Admiral DS

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
