# Pulse → Specd DS — Migration Plan

> Companion document to `GAP-ANALYSIS.md`. Defines **how** we migrate the Pulse
> plugin onto the shared component library, in phases that each leave the
> plugin shippable.
>
> All work happens in **`/Users/home/Desktop/code/pulse-beta/`** (already
> duplicated, manifest renamed, depends on `@specd/specd-ds`). The original
> `pulse/` is untouched until v0.2 is signed off.

---

## Prerequisites

Before any phase begins, the following one-time setup work runs in `pulse-beta`:

| # | Task | Status |
|---|---|---|
| P-1 | Duplicate `pulse/` → `pulse-beta/` (excluding `node_modules`, `dist`, `.git`, `.zip`) | **done** |
| P-2 | Rename Figma plugin id + manifest name so both can coexist as dev plugins | **done** |
| P-3 | Update `package.json` to depend on `file:../specd-ds` and bump version to `0.2.0-beta.0` | **done** |
| P-4 | `cd pulse-beta && npm install` | **next step in Phase 1** |
| P-5 | Wire `@specd/specd-ds` CSS imports into `ui.html` `<head>` (tokens + components) | **Phase 1** |
| P-6 | Wire `@specd/specd-ds` JS register into `ui.ts` (single side-effect import) | **Phase 1** |
| P-7 | Confirm `build.mjs` / Vite singlefile still inlines everything (no dynamic imports introduced) | **Phase 1** |
| P-8 | Run a full audit, sanity-check the plugin opens in Figma and renders | **Phase 1 sign-off** |

---

## Migration phases

Each phase is independently shippable. After each phase the plugin must still
build (`npm run build`) and pass an end-to-end audit in Figma.

### Phase 1 — Wire the library in, no UI change

**Goal:** load Specd DS alongside the existing local DS so both coexist.
At the end of Phase 1, **no rendered UI has changed yet** — but custom
elements (`specd-button`, etc.) are available everywhere.

1. Install `@specd/specd-ds` as a workspace dependency.
2. In `src/ui.html`, add a single `<link rel="stylesheet">` (or inlined `@import`)
   to the published `@specd/specd-ds/components.css` + `tokens.css`. **Keep**
   the existing `specd-ds.css` for now.
3. In `src/ui.ts`, add `import '@specd/specd-ds';` once at the top so all
   custom elements register on load.
4. Run `npm run build`. Confirm `dist/ui.html` size grew by an expected amount
   (~120 KB component CSS + JS) and that no dynamic-import warnings appear.
5. Smoke-test in Figma. The UI should be visually identical to `pulse/`.

**Acceptance:** build succeeds, plugin opens, all existing tabs render, no
console errors. Storybook continues to reflect what `pulse-beta` will look like.

### Phase 2 — Swap atoms (highest occurrence first)

Mechanical search-and-replace. Each sub-step is a single commit.

| Step | Replace | With | Affected |
|---|---|---|---|
| 2.1 | `buttonHtml(...)` calls + `<button class="btn-primary…">` | `<specd-button variant="..." size="...">…</specd-button>` | ui.ts |
| 2.2 | `inputHtml(...)` / `<input class="input…">` | `<specd-input …>` | ui.ts, ui.html |
| 2.3 | `chipHtml(...)` / `<span class="chip-v2…">` | `<specd-chip …>` | ui.ts |
| 2.4 | `<span class="issue-tag…">` | `<specd-tag …>` | ui.ts |
| 2.5 | `healthBadgeHtml(...)` / `<span class="health-badge…">` | `<specd-health-tag …>` | ui.ts |
| 2.6 | `aiPillHtml(...)` | `<specd-ai-pill …>` | ui.ts |
| 2.7 | `jumpButtonHtml(...)` | `<specd-jump-btn …>` | ui.ts |
| 2.8 | `colorSwatchHtml(...)` + inline 10×10 swatches | `<specd-color-swatch …>` | ui.ts |
| 2.9 | `sectionLabelHtml(...)` | `<specd-section-label …>` | ui.ts |
| 2.10 | `sbPillHtml(...)` | `<specd-interactive-tag …>` | ui.ts |
| 2.11 | `toggleHtml(...)` / `toggleRowHtml(...)` | `<specd-toggle>` / `<specd-toggle-row>` | ui.ts |
| 2.12 | `kvRowHtml(...)` | `<specd-kv-row …>` | ui.ts |
| 2.13 | `dividerHtml(...)` | `<specd-divider …>` | ui.ts |
| 2.14 | `alertHtml(...)` | `<specd-alert …>` | ui.ts |
| 2.15 | `badgeHtml(...)` | `<specd-badge …>` | ui.ts |

**Acceptance after each step:** plugin rebuilds, the swapped element renders
identically to before, and event handlers (via `addEventListener` on parent
delegation) still fire. Visual diff: zero.

### Phase 3 — Swap composite components

| Step | Replace | With | Affected |
|---|---|---|---|
| 3.1 | `covRowHtml(...)` / `<div class="cov-row-v2">` | `<specd-cov-row …>` | ui.ts |
| 3.2 | `scoreRingHtml(...)` / `<div class="score-circle">` | `<specd-score-ring …>` | ui.ts |
| 3.3 | `scoreTrendHtml(...)` / `<div class="score-trend">` | `<specd-score-trend values="[…]" …>` | ui.ts |
| 3.4 | `statTileLgHtml(...)` / `statTileSmHtml(...)` | `<specd-stat-tile-lg>` / `<specd-stat-tile-sm>` | ui.ts |
| 3.5 | `issueCardHtml(...)` + ad-hoc card HTML | `<specd-issue-preview-card>` + slotted `<specd-prop-fix-row>` | ui.ts |
| 3.6 | `severityHeaderHtml(...)` | `<specd-severity-header …>` | ui.ts |
| 3.7 | `<div class="modal-…">` flows | `<specd-modal>` | ui.ts |
| 3.8 | `<div class="drawer-…">` flows | `<specd-drawer>` | ui.ts |
| 3.9 | Issue row state machine (`.issue-row` + state classes) | `<specd-issue-row>` | ui.ts |
| 3.10 | Ignore footer | `<specd-ignore-footer>` | ui.ts |
| 3.11 | Form row + label + hint | `<specd-form-row>` + `<specd-field-message>` | ui.ts |
| 3.12 | Inline edit fields (`.row-link-field`, `.row-textarea-field`) | covered by `specd-issue-row` `fieldtype` | ui.ts |
| 3.13 | Component table (`.comp-table` + toolbar) | `<specd-data-table>` | ui.ts |
| 3.14 | `<button class="btn-jump">` | `<specd-jump-btn>` (verify already done in 2.7) | ui.ts |

**Acceptance:** every tab still functional; no regression in scan / fix / ignore flows.

### Phase 4 — Page shells

| Step | Replace | With |
|---|---|---|
| 4.1 | `<header class="app-header-v2">…</header>` | `<specd-app-header>` |
| 4.2 | `<nav class="tab-bar-v2">…</nav>` | `<specd-tab-bar>` |
| 4.3 | Score hero 4-up stat strip | `<specd-hero-stats>` (build during Phase 0 if not done) |

**Acceptance:** header refresh / settings buttons fire correct events; tab clicks switch panels.

### Phase 5 — Wizards & overlays

| Step | Replace | With |
|---|---|---|
| 5.1 | Quick-Fix wizard chrome (`.qf-wizard`, topbar) | `<specd-wizard-shell>` |
| 5.2 | Quick-Fix replace list rows | `<specd-radio-row>` |
| 5.3 | Quick-Fix tab strip (`.qf-filter-label` or raw tabs) | `<specd-segmented dark>` |
| 5.4 | Bulk-Fix wizard chrome | `<specd-wizard-shell mode="bulk">` |
| 5.5 | Bulk-Fix property rows | `<specd-prop-fix-row>` with bulk-fix slot content |
| 5.6 | Variable picker overlay (`.modal-picker`) | `<specd-variable-picker>` |

**Acceptance:** both wizards open, both apply real fixes, both close cleanly.

### Phase 6 — Retire the local DS

1. Audit `ui.ts` for any remaining `*Html()` helpers from `src/design-system/specd-ds.ts`.
2. Remove unused exports from `src/design-system/specd-ds.ts`.
3. Eventually delete `src/design-system/` entirely — only `src/design-system/icons.ts` remains if it has unique SVGs (otherwise move to `@specd/specd-ds/icon` registry).
4. Drop `src/design-system/specd-ds.css` + `specd.css` from the build pipeline.
5. Confirm `dist/ui.html` size drops by the equivalent of the old `specd.css`/`specd-ds.css` payload.

**Acceptance:** plugin works end-to-end with `@specd/specd-ds` as the sole UI source.

### Phase 7 — Cut-over

1. Tag `pulse-beta` `v0.2.0-rc.1`.
2. Run final QA against the original `pulse/` to confirm parity.
3. Copy the migrated `pulse-beta/src/` back into `pulse/src/` (or rename
   `pulse-beta` → `pulse` and archive the old `pulse/`).
4. Bump the original plugin to `v0.2.0` and publish.

---

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| Vite singlefile fails to inline external `@specd/specd-ds` package | Resolve via `vite-plugin-singlefile` config — already inlines `node_modules` js |
| Custom-elements registry collision with existing local DS classes (`<specd-button>` etc.) | Local DS uses **HTML-string** helpers, not custom elements — no collision |
| Event delegation broke because component renders new internal DOM | Component event handlers use `bubbles: true; composed: true` — delegation continues to fire |
| Token names mismatch (plugin uses `--blue-100`, etc., Specd DS uses same) | Same token names — already aligned. Validate during Phase 1 |
| Light-DOM rendering re-runs and clobbers user-typed input values | Inputs are uncontrolled — value lives in DOM. Verified during Phase 2 tests |
| Plugin's `<script>` event handlers reference removed CSS classes | Add a deprecation grep step: `grep -n "btn-primary\|chip-v2\|…" src/ui.ts` after each phase; replace any selectors |

---

## Rollback strategy

- After every phase, `pulse-beta` builds independently. The `pulse/` original is untouched.
- If a regression appears, revert the last commit in `pulse-beta`.
- Cut-over only happens in Phase 7 — until then, all changes are reversible.

---

## Estimated effort

Phases are scoped to ~half-day chunks once a developer has paged in the
codebase. Mechanical replacement (Phase 2) is fastest; composite components
(Phase 3, 5) require eyeballing each call site.

| Phase | Estimate |
|---|---|
| Prep | 0.5 day |
| Phase 1 (wiring) | 0.5 day |
| Phase 2 (atoms) | 1.5 days |
| Phase 3 (composites) | 2 days |
| Phase 4 (shell) | 0.5 day |
| Phase 5 (wizards) | 1.5 days |
| Phase 6 (retirement) | 0.5 day |
| Phase 7 (cut-over) | 0.5 day |
| **Total** | **~7.5 days** |

---

## Open questions for the human partner

1. **`spacing.css` vs `colors.css` tokens** — the audit flagged that both
   define `--space-*` / `--radius-*` with different scales. Confirm
   `colors.css` is canonical before Phase 1 (recommended).
2. **AI-gradient `applied` state** — Pulse uses `.btn-ai-gradient.is-applied`
   to show a success state after an AI fix. Add an `applied` prop to
   `<specd-button variant="ai-gradient">` or handle via `loading=false; icon=check-svg`?
3. **Icon migration** — Pulse maintains its own `src/design-system/icons.ts`
   SVG set. Audit overlap with `specd-icon` registry; either consolidate
   into `specd-icon` or keep Pulse's set and reference it as raw SVG strings.
4. **`<specd-toast>` adoption** — Pulse currently uses `figma.notify()` in
   the sandbox. Consider also wiring `specd-toast` for UI-side notifications
   (e.g. "Variable applied to 3 layers"). Out of scope for v0.2 but flag for v0.3.
