# Phase 6 — Legacy CSS Retirement Audit

> Inventory of what's still in `pulse-beta/src/design-system/specd.css` and
> `pulse-beta/src/design-system/specd-ds.css` after Phases 1–5, with notes on
> what's now redundant with `@specd/specd-ds/components.css` and what's still
> uniquely Pulse-specific.

## Sizes

| File | Lines | Status |
|---|---|---|
| `specd.css` | 1321 | ~50% redundant with `@specd/specd-ds/components.css` after Phases 1–5 |
| `specd-ds.css` | 3350 | ~80% redundant (older, broader copy of the same patterns) |
| `@specd/specd-ds/components.css` (now inlined) | ~3500 | Authoritative source |
| `@specd/specd-ds/tokens.css` (now inlined) | ~200 | Authoritative source |

Estimated saving after Phase 6: **~150 KB uncompressed / ~30 KB gzipped** from `dist/ui.html`.

## A. Safe to delete (fully covered by `@specd/specd-ds`)

These rules in `specd.css` / `specd-ds.css` have a 1:1 equivalent in `@specd/specd-ds/components.css`:

| Selector(s) | Component-CSS equivalent | Notes |
|---|---|---|
| `.btn-primary`, `.btn-ghost`, `.btn-accent`, `.btn-danger`, `.btn-pulse`, `.btn-sm`, `.btn-lg`, `.btn-full`, `.btn-icon`, `.btn-label`, `.btn-badge`, `.is-loading`, `.no-adornment` | yes | Defined in component-CSS |
| `.chip-v2`, `.chip-v2.active`, `.chip-count`, `.chip-crit`, `.chip-warn`, `.chip-v2.dark`, `.chip-v2.negative`, `.chip-v2.warning`, `.chip-v2.has-count` | yes | |
| `.health-badge`, `.health-badge.sz-xs`, `.health-badge.sz-sm`, `.health-badge.sz-md`, `.health-badge.tier-*`, `.health-badge.no-dot` | yes | New xs / no-dot from Phase 0 |
| `.issue-tag`, `.issue-tag-row`, `.issue-tag-sub`, `.issue-tag.crit/.warn/.info/.neutral/.success` | yes | `success` added Phase 0 |
| `.input`, `.input-group`, `.input-reveal`, `.input.input-error`, `.input.input-success` | yes | |
| `.toggle`, `.toggle-track`, `.toggle-row`, `.toggle-row-label`, `.toggle-row-hint`, `.toggle-row-text` | yes | |
| `.cov-row-v2`, `.cov-details`, `.cov-icon`, `.cov-label`, `.cov-scoring`, `.cov-bar-track`, `.cov-fill`, `.cov-pct`, `.cov-status-chip.tier-*` | yes | |
| `.score-circle`, `.score-number-lg`, `.score-denom-new`, `.score-circle.tier-*` | yes | |
| `.score-trend`, `.score-trend-delta`, `.score-trend-meta`, `.score-trend-arrow`, `.score-trend-spark` | yes | sparkline added Phase 0 |
| `.stat-tile-lg`, `.stat-tile-lg-num`, `.stat-tile-subtitle`, `.stat-tile-header`, `.stat-tile-icon`, `.stat-tile-title`, `.stat-tile-arrow`, `.stat-tile-lg.green/.red/.blue/.amber` | yes | |
| `.stat-tile-sm`, `.stat-tile-sm-num`, `.stat-tile-sm-label`, `.stat-tile-sm.positive/.negative/.warning/.neutral` | yes | |
| `.tab-bar-v2`, `.tab-v2`, `.tab-v2.active`, `.tab-badge`, `.app-header-v2`, `.logo-mark`, `.header-text`, `.header-name`, `.header-icon-btn` | yes | (header markup now uses `<specd-app-header>` but classes inside the component still match) |
| `.severity-header`, `.severity-dot`, `.severity-title`, `.severity-count` | yes | |
| `.alert`, `.alert-positive/.negative/.warning/.neutral`, `.alert-icon`, `.alert-body`, `.alert-title`, `.alert-desc` | yes | |
| `.divider`, `.divider-line`, `.divider-label` | yes | |
| `.kv-row`, `.kv-label`, `.kv-value` | yes | |
| `.color-swatch`, `.color-swatch-dot`, `.color-swatch-label`, `.color-swatch-sm`, `.qf-replace-swatch` | yes | |
| `.code-block`, `.code-block-copy` | yes | |
| `.badge`, `.badge-neutral/.positive/.warning/.negative`, `.badge-dot`, `.badge-anchored` | yes | |
| `.avatar`, `.avatar-sm/.md/.lg` | yes | |
| `.progress-bar`, `.progress-bar-fill`, `.progress-bar-fill.positive/.warning/.negative`, `.progress-bar.indeterminate` | yes | |
| `.ai-pill` | yes | |
| `.btn-jump` | yes | |
| `.section-label`, `.section-label-hint` | yes | |
| `.form-row`, `.form-label`, `.form-hint` | yes | |
| `.field-message`, `.field-message.error/.success`, `.input-group` | yes | |
| `.segmented-toggle`, `.seg-btn`, `.segmented-toggle.dark`, `.seg-btn.active` | yes | |
| `.empty-state`, `.empty-state-icon`, `.empty-state-title`, `.empty-state-desc` | yes | |
| `.modal-backdrop`, `.modal-card`, `.modal-header`, `.modal-title`, `.modal-close-btn`, `.modal-body`, `.modal-footer` | yes | Static markup still used for Pulse modals (Phase 5 follow-up) |
| `.drawer-backdrop`, `.drawer-panel`, `.drawer-header`, `.drawer-title`, `.drawer-body`, `.drawer-footer` | yes | Same as above |
| `.issue-card`, `.issue-card-top`, `.issue-card-icon`, `.issue-card-body`, `.issue-card-title`, `.issue-card-desc`, `.issue-card-count`, `.issue-card-footer`, `.btn-view-fixes`, `.issue-fixes-panel` | yes | Used by `<specd-issue-preview-card>` |
| `.sb-pill`, `.sb-pill-good/.bad/.muted`, `.btn-sb-good/.bad/.muted` | yes | |

**Estimated lines retired:** ~1800 (combined across both files)

## B. Keep — Pulse-only patterns

These exist only in Pulse and should remain in a slim local `pulse-app.css`:

| Selector(s) | Why it stays |
|---|---|
| `.btn-rescan-inline` | Inline rescan in score hero — Pulse-specific affordance |
| `.choice-card-*` family | Onboarding two-card landing page; only used in Issues landing |
| `.coverage-section`, `.coverage-table`, `.coverage-wrap` | Wrapping containers for score panel — layout only |
| `.hcp-*`, `.hard-coded-property-header`, `.hc-layer-link` | Hard-coded property fix layout inside expanded issue cards |
| `.qf-wizard` and all `.qf-*` sub-rules | Wizard chrome — pending Phase 5 follow-up (`<specd-wizard-shell>`) |
| `.qf-bulk-*` family | Bulk-fix wizard layout — same pending Phase 5 work |
| `.bulk-fix-row`, `.bulk-current`, `.bulk-suggestion`, `.bulk-arrow`, `.bulk-var-name`, `.bulk-match-chip` | Bulk-fix swap row internals — could be a future `<specd-bulk-fix-row>` |
| `.prop-dropdown`, `.prop-dropdown-*` | Inline colour-swap dropdown — earmarked as `<specd-prop-dropdown>` in the gap analysis |
| `.severity-group-*`, `.empty-state-msg` | Inline-style hotspots flagged in audit; can convert to component classes |
| `.lib-row-bar`, `.lib-row-bar.green/.amber/.red` | Library analytics — covered by `<specd-progress>` intent variants; remove once page swap done |
| `.tab-panel`, `.tab-panel.active`, `.panel-scroll`, `.plugin-scroll` | Plugin window scroll containers — layout helpers |
| `.score-section`, `.score-hero-top`, `.score-hero-stats`, `.hero-stat`, `.hero-stat-num`, `.hero-stat-lbl` | Hero layout for score band; consider `<specd-hero-stats>` |
| `.score-info`, `.score-tier-label`, `.score-meta-line` | Wrapping divs in score hero |
| `.stat-tiles-row`, `.stat-tiles-2x2`, `.stat-tiles-3col` | Grid wrappers for stat tile layouts |
| `.section-mono-lbl`, `.section-header-row`, `.section-heading`, `.section-hint` | Pulse section heading variants |
| `.app-shell`, `.app-shell-*` | App-level layout (out of scope for component library) |
| `.scan-progress`, `.sp-*`, `.sp-track`, `.sp-fill` | Scan progress bar — Pulse-specific |
| `.toast` and `.toast-*` | Notification system — Pulse currently uses local toast; `<specd-toast>` adoption queued for v0.3 |
| `.action-bar`, `.action-bar-*` | Bottom action strip on overview |

**Estimated lines retained:** ~700–900 (after dedup)

## C. Phase 6 execution sketch

1. Branch `pulse-beta` to `pulse-beta/phase-6-css-cull`.
2. Delete the Section A selectors from `specd.css` and `specd-ds.css` (use a single combined regex pass).
3. Visually diff the bundle against the verified Phase 5 build — should look identical.
4. Move the Section B retained rules into a slimmer `pulse-app.css` (~700 lines).
5. Delete `specd.css` and `specd-ds.css`.
6. Update `ui.ts` import: `import "./design-system/specd.css"` → `import "./design-system/pulse-app.css"`.
7. Rebuild — expect `dist/ui.html` to drop by ~150 KB uncompressed.
8. Smoke-test all tabs again.
9. Move any remaining `src/design-system/specd-ds.ts` factory functions still wrapping local CSS to either Pulse-specific helpers or remove if redundant.

After Phase 6, the only DS source in pulse-beta is `@specd/specd-ds` (CSS + custom elements), plus a slim `pulse-app.css` for Pulse-only layout. The wizard chrome migration (Phase 5 follow-up) becomes the only remaining major work item before cut-over.
