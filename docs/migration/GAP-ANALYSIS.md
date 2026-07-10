# Pulse → Specd DS — Gap Analysis

> Maps every UI primitive used by the **Pulse** plugin (`/Users/home/Desktop/code/pulse`)
> to a component in **Specd DS** (`/Users/home/Desktop/code/specd-ds`).
>
> Each row identifies what action is needed: **`USE`** (drop-in replacement),
> **`VARIANT`** (existing component needs a new prop/variant), **`NEW`** (no
> equivalent — build it), or **`CSS-ONLY`** (kept as a layout helper, not a
> component).
>
> The **Preview** column links to the running Storybook (`http://localhost:6006`)
> for visual reference. Hold ⌘ + click to open.

---

## A. Direct drop-ins (USE)

These plugin classes have a 1:1 specd-ds component. Migration is mechanical.

| Pulse class / pattern | Specd DS component | Variant / props | Preview | Notes |
|---|---|---|---|---|
| `.btn-primary`, `.btn-ghost`, `.btn-accent`, `.btn-danger` | `<specd-button>` | `variant="primary\|ghost\|accent\|danger"` | [Button stories](http://localhost:6006/?path=/story/atoms-button) | All radii already aligned (square). `.btn-sm`/`.btn-lg` → `size` prop. |
| `.btn-jump` | `<specd-jump-btn>` | `label` | [JumpBtn](http://localhost:6006/?path=/story/atoms-jumpbtn) | Existing icon SVG matches plugin |
| `.ai-pill` | `<specd-ai-pill>` | `label` | [AiPill](http://localhost:6006/?path=/story/atoms-aipill) | Sparkle icon baked in |
| `.btn-view-fixes` | `<specd-button variant="primary" size="sm">` + `badge` | use `badge` prop for the count | — | No special component needed |
| `.btn-row-primary`, `.btn-hc-ghost` | `<specd-button variant="row-primary-ghost">` | already wired | — | CSS class mapping handled internally |
| `.chip-v2` (filter / count chip) | `<specd-chip>` | `label`, `count`, `active`, `severity`, `intent` | [Chip](http://localhost:6006/?path=/story/atoms-chip) | Active dark variant via `active` |
| `.issue-tag` | `<specd-tag>` | `intent="crit\|warn\|info\|neutral\|success"` | [Tag](http://localhost:6006/?path=/story/atoms-tag) | `success` intent added for "matched" / "applied" labels |
| `.cov-status-chip.tier-*` | `<specd-health-tag size="xs" nodot>` | `tier`, `label`, `size`, `nodot` | [HealthTag](http://localhost:6006/?path=/story/atoms-healthtag) | Used internally by CovRow; also exposed standalone |
| `.health-badge.sz-md` | `<specd-health-tag size="md">` | `tier`, `label` | — | Lime brand pill for top-tier indicator |
| `.sb-pill-good\|bad\|muted` | `<specd-interactive-tag>` | `variant="matched\|missing\|muted"` | [InteractiveTag](http://localhost:6006/?path=/story/atoms-interactivetag) | Used in Storybook tab mapping table |
| `.input`, `.table-search` | `<specd-input>` | `search` boolean for icon | [Input](http://localhost:6006/?path=/story/atoms-input) | Password type auto-adds reveal |
| `.toggle` / `.toggle-row` | `<specd-toggle>` / `<specd-toggle-row>` | — | [Toggle](http://localhost:6006/?path=/story/atoms-toggle) | toggle-row composes label + toggle |
| `.form-row` / `.form-label` / `.form-hint` | `<specd-form-row>` | `label`, `hint` | [FormRow](http://localhost:6006/?path=/story/atoms-formrow) | Slot holds the control |
| `.cov-row-v2` | `<specd-cov-row>` | `label`, `pct`, `tier?`, `icon?` | [CovRow](http://localhost:6006/?path=/story/atoms-covrow) | Internally renders HealthTag xs |
| `.score-circle` + denom | `<specd-score-ring>` | `score`, `tier`, `size` | [ScoreRing](http://localhost:6006/?path=/story/atoms-scorering) | Border + fonts auto-scale by size |
| `.score-trend` | `<specd-score-trend>` | `delta`, `direction`, `meta?` | [ScoreTrend](http://localhost:6006/?path=/story/atoms-scoretrend) | Arrow SVG added inside delta |
| `.stat-tile-lg` | `<specd-stat-tile-lg>` | `num`, `title`, `subtitle`, `color`, `icon`, `trend`, `trenddir` | [StatTileLg](http://localhost:6006/?path=/story/atoms-stattilelg) | colour variants: default/green/red/blue/amber |
| `.stat-tile-sm` | `<specd-stat-tile-sm>` | `num`, `label`, `intent` | [StatTileSm](http://localhost:6006/?path=/story/atoms-stattilesm) | 4-up grid wrapper kept as CSS-only |
| `.section-label` / `.section-label-hint` | `<specd-section-label>` | `label`, `hint?` | [SectionLabel](http://localhost:6006/?path=/story/atoms-sectionlabel) | Bricolage Grotesque |
| `.coverage-table` wrapper | CSS class kept | — | — | Container is layout-only; rows are components |
| `.tab-bar-v2` + `.tab-v2` | `<specd-tab-bar>` | `tabs` (JSON), `active` | [TabBar](http://localhost:6006/?path=/story/atoms-tabbar) | Each tab supports `icon` SVG + `badge` |
| `.app-header-v2` | `<specd-app-header>` | `name`, `showrefresh`, `showexport`, `showsettings` | [AppHeader](http://localhost:6006/?path=/story/atoms-appheader) | Logo mark baked in |
| `.severity-header` | `<specd-severity-header>` | `intent="critical\|warning\|info"`, `label`, `count` | [SeverityHeader](http://localhost:6006/?path=/story/atoms-severityheader) | Coloured dot + mono caps label |
| `.issue-card` (and sub-elements) | `<specd-issue-preview-card>` | `component`, `type`, `count`, `severity`, `tags` (JSON), `expanded` | [IssuePreviewCard](http://localhost:6006/?path=/story/atoms-issuepreviewcard) | Slot accepts `<specd-prop-fix-row>` children |
| `.issue-row` (inline state machine) | `<specd-issue-row>` | `fieldtype`, `title`, `description`, `value`, `rowstate` | [IssueRow](http://localhost:6006/?path=/story/atoms-issuerow) | 3-state visual (initial/editing/applied) |
| `.modal-*` | `<specd-modal>` | `open`, `title`; slot=body, slot=footer | [Modal](http://localhost:6006/?path=/story/atoms-modal) | Uses native `<dialog>` |
| `.drawer-*` | `<specd-drawer>` | `open`, `title`; slot=body, slot=footer | [Drawer](http://localhost:6006/?path=/story/atoms-drawer) | Side panel |
| `.alert` (4 intents) | `<specd-alert>` | `intent`, `title`, `description?` | [Alert](http://localhost:6006/?path=/story/atoms-alert) | — |
| `.divider` (with optional label) | `<specd-divider>` | `label?` | [Divider](http://localhost:6006/?path=/story/atoms-divider) | — |
| `.kv-row` | `<specd-kv-row>` | `label`, `value`, `mono?` | [KvRow](http://localhost:6006/?path=/story/atoms-kvrow) | Metadata row |
| `.card` + `.card-inner` | `<specd-card>` | `elevation="elevated\|flat\|inset"`, `inner` | [Card](http://localhost:6006/?path=/story/atoms-card) | — |
| `.badge` (component) | `<specd-badge>` | `value`, `intent`, `dot`, `anchored` | [Badge](http://localhost:6006/?path=/story/atoms-badge) | Standalone count badge |
| `.color-swatch` | `<specd-color-swatch>` | `color`, `label`, `sm` | [ColorSwatch](http://localhost:6006/?path=/story/atoms-colorswatch) | — |
| `.avatar*` | `<specd-avatar>` | `src`, `name`, `size` | [Avatar](http://localhost:6006/?path=/story/atoms-avatar) | Initials fallback |
| `.code-block` | `<specd-code-block>` | `code`, `language?` | [CodeBlock](http://localhost:6006/?path=/story/atoms-codeblock) | Copy button included |
| `.choice-card` | `<specd-choice-card>` | `title`, `description`, `variant="default\|gradient"`, `icon` | [ChoiceCard](http://localhost:6006/?path=/story/atoms-choicecard) | — |
| `.comp-table` (data table shell) | `<specd-data-table>` | `columns` (JSON), `rows` (JSON), `search` | [DataTable](http://localhost:6006/?path=/story/atoms-datatable) | Search input wired in |
| `.qf-replace-row` | `<specd-radio-row>` | `value`, `checked`, `label`, `collection`, `color`, `hex` | [RadioRow](http://localhost:6006/?path=/story/atoms-radiorow) | Fills width |
| `.ignore-footer` + buttons | `<specd-ignore-footer>` | `showselected` | [IgnoreFooter](http://localhost:6006/?path=/story/atoms-ignorefooter) | Internally uses 3 buttons |
| `.property-fix-row` / `.hc-bulk-row` (header part) | `<specd-prop-fix-row>` | `prop`, `layer`, `attr`, `count`; slot=fix body | [PropFixRow](http://localhost:6006/?path=/story/atoms-propfixrow) | Layer click fires `specd-layer-jump` |

---

## B. Existing component + new variant required (VARIANT)

These plugin classes need an existing component to gain a small variant/prop addition.

| Pulse class / pattern | Specd DS component | Variant to add | Action |
|---|---|---|---|
| `.btn-pulse` (gradient pulse button) | `<specd-button>` | `variant="pulse"` already declared in types but no CSS class wired; ensure `btn-pulse` class is emitted | Update `_classes()` in `SpecdButton.ts` to map `variant="pulse"` → `btn-pulse` |
| `.btn-ai-gradient` (with `.is-applied` state) | `<specd-button>` | already `variant="ai-gradient"`; add `loading`/`applied` micro-state | Add `applied: boolean` prop |
| `.lib-row-bar.green\|amber\|red` (library analytics horizontal bars) | `<specd-progress-bar>` | `intent="positive\|warning\|negative"` colour variants | Add intent prop to ProgressBar |
| `.score-trend-spark` (sparkline shown inside ScoreTrend on overview) | `<specd-score-trend>` | optional `values` JSON array → renders inline sparkline | Compose `<specd-sparkline>` inside ScoreTrend |
| `.qf-bulk-filter-chip` (white chip on navy wizard) | `<specd-chip>` | `intent="dark"` already supported — verify CSS treatment on navy background context | No new variant; doc the usage |
| `.input-group` + `.input-reveal` (password reveal) | `<specd-input>` | already handled by `type="password"` | No change — confirm |
| `.btn-rescan-inline` (inline rescan pill on score hero) | `<specd-button>` | `variant="ghost" size="sm"` with icon | Use existing — no new variant |
| `.row-link-field` / `.row-textarea-field` (inline edit forms) | `<specd-issue-row>` | already part of `rowstate="editing"` | No change — confirm |
| `.prop-dropdown` (current/target colour picker dropdown inside hardcoded fix) | New micro component `<specd-prop-dropdown>` OR slot on `specd-prop-fix-row` | NEW (see section C) | See C |
| `.hero-stat` (mini 4-up stat strip in overview score hero) | New `<specd-hero-stats>` | NEW (see section C) | See C |
| `.choice-card-grid`, `.stat-tiles-2x2`, `.stat-tiles-3col` | CSS-only layout helpers | None | Keep `.choice-card-grid` etc. in `components.css` |

---

## C. New components needed (NEW)

| Pattern | Where used | Proposed component | API sketch |
|---|---|---|---|
| 4-up condensed metric strip ("152 / 18 / 6 / 47") in Overview score hero | Overview score hero band | `<specd-hero-stats>` | `items` JSON `[{num, label, intent?}]` |
| Wizard chrome (full-screen navy overlay with topbar + close + brand + body) | Quick-Fix Wizard, Bulk-Fix Wizard | `<specd-wizard-shell>` | `title`, `open`, `mode="single\|bulk"`; slot=body, slot=footer |
| Bulk-fix scrollable list with sticky filters | Bulk wizard mid-section | `<specd-bulk-fix-list>` | `filters` JSON, `rows` JSON; rows render `specd-prop-fix-row` |
| Hardcoded value swap dropdown (small variable picker trigger) | Inside Issues / Quick-Fix expanded rows | `<specd-prop-dropdown>` | `value`, `swatch`, `chevron`; opens `specd-variable-picker` overlay |
| Score breakdown sub-table (weighted scoring panel with dynamic-colour percentages) | Overview report | `<specd-score-breakdown>` | `rows` JSON `[{label, pct, weight, contribution}]` |
| Inline-editable description / link field cell | Issues + Components table | Already covered by `specd-issue-row` `fieldtype="description\|doc-link"` | Confirm coverage; no new component |
| Sparkline-equipped score trend variant (overview only) | Overview hero | Compose: extend `<specd-score-trend>` with `values` prop, render inline `<specd-sparkline>` | Already noted in B |

---

## D. CSS-only helpers (layout / grid wrappers)

Keep as plain CSS classes in `components.css` — these are not worth componentising:

| Class | Purpose |
|---|---|
| `.score-section`, `.score-hero-top`, `.score-info` | Score hero layout |
| `.score-hero-stats` | 4-col grid (used by `specd-hero-stats`) |
| `.stat-tiles-row`, `.stat-tiles-2x2`, `.stat-tiles-3col` | Stat tile grids |
| `.coverage-table`, `.coverage-wrap` | Coverage table containers |
| `.choice-card-grid` | Onboarding 2-col grid |
| `.filter-chips`, `.qf-filter-chips`, `.comp-filter-chips` | Flex wrappers for chip rows |
| `.hidden` utility | Visibility helper |
| `.plugin-scroll`, `.plugin-wrap` | Plugin window scroll container |

---

## E. Net-new specd-ds components with no Pulse equivalent (parked)

These exist in specd-ds but Pulse doesn't currently use them. They might inform future Pulse features but are **NOT** part of the v0.2 migration:

`specd-breadcrumb`, `specd-pagination`, `specd-stepper`, `specd-empty-state`,
`specd-skeleton`, `specd-toast`, `specd-info-trigger`, `specd-icon`,
`specd-segmented` (Pulse has bespoke segmented patterns we can adopt).

---

## F. Top 10 high-impact migrations (ranked by occurrence)

Drive the migration order by counting plugin references:

| Rank | Pulse class | ~Refs | Target component | Effort |
|---|---|---|---|---|
| 1 | `.btn-primary` / `.btn-ghost` | 30+ | `<specd-button>` | Low (mechanical) |
| 2 | `.cov-row-v2` (Overview) | 24+ | `<specd-cov-row>` | Low |
| 3 | `.input` / `.table-search` | 22+ | `<specd-input>` | Low |
| 4 | `.btn-row-primary` (Issues fix CTAs) | 15+ | `<specd-button variant="row-primary-ghost">` | Low |
| 5 | `.section-label` | 12+ | `<specd-section-label>` | Low |
| 6 | `.issue-row` family | 12+ | `<specd-issue-row>` | Med (state machine) |
| 7 | `.stat-tile-lg` family | 10+ | `<specd-stat-tile-lg>` | Low |
| 8 | `.sb-pill-*` | 9+ | `<specd-interactive-tag>` | Low |
| 9 | `.qf-replace-row` | 8+ | `<specd-radio-row>` | Low |
| 10 | `.health-badge` | 8+ | `<specd-health-tag>` | Low |

---

## G. Recommended specd-ds updates before migration begins

A short backlog inferred from the gap analysis. These ship **before** Phase 1 of the migration:

1. **`<specd-button>` — wire up `variant="pulse"`** (currently declared, not implemented). Map to `btn-pulse` class.
2. **`<specd-progress-bar>` — add `intent` prop** with `positive\|warning\|negative` colours for library analytics rows.
3. **`<specd-score-trend>` — add optional `values` JSON prop** that renders an inline `<specd-sparkline>` between the delta and meta text.
4. **Reconcile token files.** Keep `colors.css` as the canonical token source; remove `spacing.css` from default imports until reconciled.
5. **New `<specd-hero-stats>`** component for the 4-up mini-stat band used in Overview.
6. **New `<specd-wizard-shell>`** component to consolidate the topbar + brand + close button pattern shared by QuickFix and BulkFix.
7. **New `<specd-prop-dropdown>`** for the inline colour-swap trigger inside hardcoded value fix rows.

Each of these gets a Storybook story and goes live before any Pulse code is touched.
