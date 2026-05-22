# DS Foundation Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish a proper Atom/Molecule/Organism taxonomy, enforce semantic HTML wrapping across all components, ensure molecules compose atoms rather than re-implementing HTML, introduce missing atoms, and retire confirmed duplicates.

**Architecture:** Three-phase refactor — (1) reclassify all 54 component stories into the correct AMO tier with no logic changes, (2) fix semantic HTML wrapping in atoms and interactive components while adding prop-forwarding, (3) refactor molecules to compose atoms instead of raw HTML. New atom `specd-tag` is introduced to support `SpecdIssueRow` and any future tag-style pills. Two confirmed duplicates (`SpecdIssueCard`, `SpecdIssueRowActions`) are retired. Three ambiguous duplicates (`SpecdSbPill`, `SpecdHealthBadge`, `SpecdNavScore`) are flagged as separate decisions per the user.

**Tech Stack:** Lit 3 (light DOM, `createRenderRoot() { return this; }`), TypeScript, Vitest 3 + happy-dom, Storybook 10, `specd-ds.css` / `components.css` for all styles.

---

## ⚠️ Decisions Needed From User Before Executing Tasks 11–14

The following components overlap significantly. The plan retires the "confirmed" duplicates (IssueCard, IssueRowActions) but pauses on these until you decide:

| Component | Overlaps With | Detail | Options |
|---|---|---|---|
| `specd-sb-pill` | `specd-badge` | SbPill = Badge with intent good/bad/muted. Structurally identical (`<span class>label</span>`). | A) Merge into `specd-badge` with `intent="good\|bad\|muted"` B) Keep separate (Storybook-specific name aids clarity) |
| `specd-health-badge` | `specd-badge` | HealthBadge = Badge with tier good/warn/poor. Same shape as SbPill. | A) Merge into `specd-badge` B) Keep (domain naming) |
| `specd-nav-score` | `specd-badge` | NavScore = a single green score pill. One prop: `score`. Could be `<specd-badge value="87" intent="score">`. | A) Merge B) Keep (AppHeader-specific atom) |
| `specd-ai-pill` | `specd-chip` | AiPill = a non-interactive pill with sparkle icon. Unique animation. | A) Merge as `<specd-chip variant="ai">` B) Keep separate |

**Recommendation:** Merge `specd-health-badge` and `specd-sb-pill` into `specd-badge`. Keep `specd-nav-score` and `specd-ai-pill` (distinct enough visually). **Confirm before running Tasks 11b–11d.**

---

## File Structure

```
src/components/
  Tag/                          ← NEW atom
    SpecdTag.ts
    SpecdTag.stories.ts
    SpecdTag.test.ts

  # Reclassified (stories only — no ts changes in Task 1):
  Button/SpecdButton.stories.ts       → Atoms/Button
  Chip/SpecdChip.stories.ts           → Atoms/Chip
  Badge/SpecdBadge.stories.ts         → Atoms/Badge
  Icon/SpecdIcon.stories.ts           → Atoms/Icon  (already correct)
  Toggle/SpecdToggle.stories.ts       → Atoms/Toggle
  Input/SpecdInput.stories.ts         → Atoms/Input
  Progress/SpecdProgress.stories.ts   → Atoms/Progress
  Skeleton/SpecdSkeleton.stories.ts   → Atoms/Skeleton
  Divider/SpecdDivider.stories.ts     → Atoms/Divider
  SectionLabel/...stories.ts          → Atoms/SectionLabel
  FieldMessage/...stories.ts          → Atoms/FieldMessage  (already correct)
  ColorSwatch/...stories.ts           → Atoms/ColorSwatch   (already correct)
  InfoTrigger/...stories.ts           → Atoms/InfoTrigger   (already correct)
  Avatar/...stories.ts                → Atoms/Avatar
  JumpBtn/...stories.ts               → Atoms/JumpBtn
  SbPill/...stories.ts                → Atoms/SbPill
  HealthBadge/...stories.ts           → Atoms/HealthBadge
  NavScore/...stories.ts              → Atoms/NavScore
  AiPill/...stories.ts                → Atoms/AiPill
  SeverityHeader/...stories.ts        → Atoms/SeverityHeader
  AiGradientBtn/...stories.ts         → Molecules/AiGradientBtn (was Atoms — it composes)

  # Molecules:
  FormRow/...stories.ts               → Molecules/FormRow
  CheckboxGroup/...stories.ts         → Molecules/CheckboxGroup
  RadioGroup/...stories.ts            → Molecules/RadioGroup
  Segmented/...stories.ts             → Molecules/Segmented
  ToggleRow/...stories.ts             → Molecules/ToggleRow
  Card/...stories.ts                  → Molecules/Card
  Alert/...stories.ts                 → Molecules/Alert
  ChoiceCard/...stories.ts            → Molecules/ChoiceCard
  CodeBlock/...stories.ts             → Molecules/CodeBlock
  KvRow/...stories.ts                 → Molecules/KvRow
  CovRow/...stories.ts                → Molecules/CovRow
  Breadcrumb/...stories.ts            → Molecules/Breadcrumb
  TabBar/...stories.ts                → Molecules/TabBar
  Stepper/...stories.ts               → Molecules/Stepper
  ScoreRing/...stories.ts             → Molecules/ScoreRing
  ScoreTrend/...stories.ts            → Molecules/ScoreTrend
  Sparkline/...stories.ts             → Molecules/Sparkline
  StatTileLg/...stories.ts            → Molecules/StatTileLg
  StatTileSm/...stories.ts            → Molecules/StatTileSm
  Pagination/...stories.ts            → Molecules/Pagination
  EmptyState/...stories.ts            → Molecules/EmptyState
  Toast/...stories.ts                 → Molecules/Toast
  AppHeader/...stories.ts             → Molecules/AppHeader
  IgnoreFooter/...stories.ts          → Molecules/IgnoreFooter (already correct)
  PropFixRow/...stories.ts            → Molecules/PropFixRow   (already correct)
  PropFixSlot/...stories.ts           → Molecules/PropFixSlot
  PropFixCreate/...stories.ts         → Molecules/PropFixCreate
  QfReplaceRow/...stories.ts          → Molecules/QfReplaceRow (already correct)

  # Organisms:
  DataTable/...stories.ts             → Organisms/DataTable    (already correct)
  IssueRow/...stories.ts              → Organisms/IssueRow     (already correct)
  VariablePicker/...stories.ts        → Organisms/VariablePicker (already correct)
  Modal/...stories.ts                 → Organisms/Modal
  Drawer/...stories.ts                → Organisms/Drawer

  # Retired (Tasks 11a, 11e):
  IssueCard/  → deleted
  IssueRowActions/ → deleted
```

---

## Task 1: Reclassify All Stories Into AMO Taxonomy

**Goal:** Fix `title:` in every `.stories.ts` so the Storybook sidebar reflects Atoms / Molecules / Organisms. No logic changes.

**Files:**
- Modify: all `src/components/**/*.stories.ts` listed above

- [ ] **Step 1: Update all stories titles in one pass**

Run this sed script to batch-rename `Components/X` → correct tier:

```bash
cd /Users/home/Desktop/code/admiral-ds

# Atoms
for comp in Button Chip Badge Toggle Input Progress Skeleton Divider Avatar JumpBtn SbPill HealthBadge NavScore AiPill SeverityHeader; do
  file="src/components/${comp}/Specd${comp}.stories.ts"
  [[ -f "$file" ]] && sed -i '' "s|title: 'Components/${comp}'|title: 'Atoms/${comp}'|" "$file"
done
# SectionLabel special case
sed -i '' "s|title: 'Components/SectionLabel'|title: 'Atoms/SectionLabel'|" src/components/SectionLabel/SpecdSectionLabel.stories.ts

# Molecules
for comp in FormRow CheckboxGroup RadioGroup Segmented ToggleRow Card Alert ChoiceCard CodeBlock KvRow CovRow Breadcrumb TabBar Stepper ScoreRing ScoreTrend Sparkline StatTileLg StatTileSm Pagination EmptyState Toast AppHeader; do
  file="src/components/${comp}/Specd${comp}.stories.ts"
  [[ -f "$file" ]] && sed -i '' "s|title: 'Components/${comp}'|title: 'Molecules/${comp}'|" "$file"
done
# AiGradientBtn was Atoms — move to Molecules (it composes)
sed -i '' "s|title: 'Atoms/AiGradientBtn'|title: 'Molecules/AiGradientBtn'|" src/components/AiGradientBtn/SpecdAiGradientBtn.stories.ts
# PropFixSlot and PropFixCreate
sed -i '' "s|title: 'Components/PropFixSlot'|title: 'Molecules/PropFixSlot'|" src/components/PropFixSlot/SpecdPropFixSlot.stories.ts 2>/dev/null || true
sed -i '' "s|title: 'Components/PropFixCreate'|title: 'Molecules/PropFixCreate'|" src/components/PropFixCreate/SpecdPropFixCreate.stories.ts 2>/dev/null || true

# Organisms
sed -i '' "s|title: 'Components/Modal'|title: 'Organisms/Modal'|" src/components/Modal/SpecdModal.stories.ts
sed -i '' "s|title: 'Components/Drawer'|title: 'Organisms/Drawer'|" src/components/Drawer/SpecdDrawer.stories.ts
```

- [ ] **Step 2: Verify in Storybook** — navigate to http://localhost:6006 and confirm sidebar shows ATOMS / MOLECULES / ORGANISMS sections. No more `Components/` at the top level.

- [ ] **Step 3: Commit**

```bash
cd /Users/home/Desktop/code/admiral-ds
git add src/components/**/*.stories.ts
git commit -m "refactor(storybook): reclassify all components into Atoms/Molecules/Organisms taxonomy"
```

---

## Task 2: New Atom — `specd-tag`

**Goal:** Create a `<specd-tag>` atom for the `.issue-tag` pill (crit/warn/info/neutral). Used by `SpecdIssueRow` and anywhere issue-type tags appear. Removes the inline `<span class="issue-tag ...">` from organisms.

**Files:**
- Create: `src/components/Tag/SpecdTag.ts`
- Create: `src/components/Tag/SpecdTag.stories.ts`
- Create: `src/components/Tag/SpecdTag.test.ts`
- Modify: `src/index.ts` (add export)
- Modify: `src/react.ts` (add createComponent wrapper)

- [ ] **Step 1: Write the failing test**

```typescript
// src/components/Tag/SpecdTag.test.ts
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => { await import('./SpecdTag.js'); });

describe('SpecdTag', () => {
  it('renders a span with .issue-tag', async () => {
    const el = document.createElement('specd-tag') as any;
    el.label = 'No description';
    el.intent = 'crit';
    document.body.appendChild(el);
    await el.updateComplete;
    const span = el.querySelector('span');
    expect(span?.className).toContain('issue-tag');
    expect(span?.className).toContain('crit');
    expect(span?.textContent?.trim()).toBe('No description');
    el.remove();
  });

  it('renders neutral intent', async () => {
    const el = document.createElement('specd-tag') as any;
    el.label = 'Published';
    el.intent = 'neutral';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('span')?.className).toContain('neutral');
    el.remove();
  });

  it('renders sub label when provided', async () => {
    const el = document.createElement('specd-tag') as any;
    el.label = 'HC colours';
    el.sub = 'Fill';
    el.intent = 'warn';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.issue-tag-sub')).not.toBeNull();
    el.remove();
  });
});
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
cd /Users/home/Desktop/code/admiral-ds
npx vitest run src/components/Tag/SpecdTag.test.ts --reporter=verbose
```
Expected: FAIL — "Cannot find module './SpecdTag.js'"

- [ ] **Step 3: Implement `SpecdTag`**

```typescript
// src/components/Tag/SpecdTag.ts
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type TagIntent = 'crit' | 'warn' | 'info' | 'neutral';

/**
 * Specd DS — Tag
 *
 * Coloured pill label for issue type tagging. Maps to `.issue-tag` CSS class.
 *
 * @element specd-tag
 *
 * @attr {string} label  - Tag text
 * @attr {string} intent - crit | warn | info | neutral
 * @attr {string} sub    - Optional sub-label (smaller text below main label)
 *
 * @example
 * <specd-tag label="No description" intent="crit"></specd-tag>
 * <specd-tag label="Published" intent="neutral"></specd-tag>
 */
@customElement('specd-tag')
export class SpecdTag extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string     = '';
  @property({ type: String }) intent: TagIntent = 'info';
  @property({ type: String }) sub: string       = '';

  override render() {
    return html`
      <span class="issue-tag ${this.intent}">
        ${this.label}
        ${this.sub ? html`<span class="issue-tag-sub">${this.sub}</span>` : nothing}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-tag': SpecdTag; }
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npx vitest run src/components/Tag/SpecdTag.test.ts --reporter=verbose
```

- [ ] **Step 5: Create story**

```typescript
// src/components/Tag/SpecdTag.stories.ts
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdTag.js';

const meta: Meta = {
  title: 'Atoms/Tag',
  component: 'specd-tag',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const AllIntents: Story = {
  name: 'All Intents',
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;padding:16px;">
      <specd-tag label="No description" intent="crit"></specd-tag>
      <specd-tag label="HC colours"     intent="warn"></specd-tag>
      <specd-tag label="No doc link"    intent="info"></specd-tag>
      <specd-tag label="Published"      intent="neutral"></specd-tag>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;padding:0 16px 16px;">
      <specd-tag label="HC colours" sub="Fill" intent="warn"></specd-tag>
      <specd-tag label="HC spacing" sub="Padding" intent="warn"></specd-tag>
    </div>
  `,
};
```

- [ ] **Step 6: Export from index and react**

In `src/index.ts` add after other Atom exports:
```typescript
export { SpecdTag } from './components/Tag/SpecdTag.js';
export type { TagIntent } from './components/Tag/SpecdTag.js';
```

In `src/react.ts` add:
```typescript
import { SpecdTag } from './components/Tag/SpecdTag.js';
export const Tag = createComponent({ react: React, tagName: 'specd-tag', elementClass: SpecdTag });
```

- [ ] **Step 7: Run all tests**

```bash
npx vitest run --reporter=dot
```
Expected: all passing.

- [ ] **Step 8: Commit**

```bash
git add src/components/Tag/ src/index.ts src/react.ts
git commit -m "feat(atoms): add specd-tag for issue-type pill labels"
```

---

## Task 3: Semantic HTML — `specd-chip` interactive wrapping

**Goal:** When a Chip is interactive (has `@click` or is used as a filter), it should render as `<button>` not `<span>`. Add `clickable` boolean prop; when true the host element renders a `<button>`. Pass `type`, `aria-pressed`, `disabled` through.

**Files:**
- Modify: `src/components/Chip/SpecdChip.ts`
- Modify: `src/components/Chip/SpecdChip.test.ts`

- [ ] **Step 1: Add failing test**

Add to `SpecdChip.test.ts`:
```typescript
it('renders a button when clickable=true', async () => {
  const el = document.createElement('specd-chip') as any;
  el.label = 'Filter';
  el.clickable = true;
  document.body.appendChild(el);
  await el.updateComplete;
  expect(el.querySelector('button')).not.toBeNull();
  expect(el.querySelector('button')?.getAttribute('type')).toBe('button');
  el.remove();
});

it('renders a span when clickable is false (default)', async () => {
  const el = document.createElement('specd-chip') as any;
  el.label = 'Tag';
  document.body.appendChild(el);
  await el.updateComplete;
  expect(el.querySelector('span')).not.toBeNull();
  expect(el.querySelector('button')).toBeNull();
  el.remove();
});

it('forwards disabled to button when clickable', async () => {
  const el = document.createElement('specd-chip') as any;
  el.clickable = true;
  el.disabled = true;
  document.body.appendChild(el);
  await el.updateComplete;
  expect(el.querySelector('button')?.disabled).toBe(true);
  el.remove();
});
```

- [ ] **Step 2: Run to confirm failure**

```bash
npx vitest run src/components/Chip/SpecdChip.test.ts --reporter=verbose
```

- [ ] **Step 3: Update `SpecdChip.ts`**

Read current `src/components/Chip/SpecdChip.ts` first, then add `clickable` and `disabled` props and branch the render:

```typescript
@property({ type: Boolean }) clickable: boolean = false;
@property({ type: Boolean }) disabled:  boolean = false;

override render() {
  const classes = this._classes();
  const inner = html`
    ${this.label}
    ${this.count != null ? html`<span class=${this._countClasses()}>${this.count}</span>` : nothing}
  `;

  if (this.clickable) {
    return html`
      <button
        class=${classes}
        type="button"
        ?disabled=${this.disabled}
        ?aria-pressed=${this.active}
        data-filter=${this.dataFilter || nothing}
      >${inner}</button>
    `;
  }
  return html`
    <span class=${classes} data-filter=${this.dataFilter || nothing}>${inner}</span>
  `;
}
```

- [ ] **Step 4: Run tests — expect all passing**

```bash
npx vitest run src/components/Chip/SpecdChip.test.ts --reporter=verbose
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Chip/
git commit -m "feat(Chip): add clickable/disabled props with button semantic wrapping"
```

---

## Task 4: Semantic HTML — `specd-choice-card` as `<button>`

**Goal:** ChoiceCard is a clickable card. It should render a `<button>` at its root so keyboard users can activate it, it receives focus, and it fires `click` events natively. Forward `disabled` and `type`.

**Files:**
- Modify: `src/components/ChoiceCard/SpecdChoiceCard.ts`
- Modify: `src/components/ChoiceCard/SpecdChoiceCard.test.ts`

- [ ] **Step 1: Add failing tests**

Add to `SpecdChoiceCard.test.ts`:
```typescript
it('renders a button element at root', async () => {
  const el = document.createElement('specd-choice-card') as any;
  el.title = 'Option A';
  document.body.appendChild(el);
  await el.updateComplete;
  expect(el.querySelector('button')).not.toBeNull();
  expect(el.querySelector('button')?.getAttribute('type')).toBe('button');
  el.remove();
});

it('forwards disabled to button', async () => {
  const el = document.createElement('specd-choice-card') as any;
  el.disabled = true;
  document.body.appendChild(el);
  await el.updateComplete;
  expect(el.querySelector('button')?.disabled).toBe(true);
  el.remove();
});
```

- [ ] **Step 2: Run to confirm failure**

```bash
npx vitest run src/components/ChoiceCard/SpecdChoiceCard.test.ts --reporter=verbose
```

- [ ] **Step 3: Update `SpecdChoiceCard.ts`**

Add `disabled` prop and change the outer `<div class="choice-card ...">` to `<button class="choice-card ..." type="button" ?disabled=${this.disabled}>`:

```typescript
@property({ type: Boolean }) disabled: boolean = false;

override render() {
  const cls = `choice-card${this.variant === 'gradient' ? ' gradient' : ''}${this.selected ? ' selected' : ''}`;
  return html`
    <button class=${cls} type="button" ?disabled=${this.disabled}>
      ${this.icon ? html`<div class=${iconClass}>${unsafeHTML(this.icon)}</div>` : nothing}
      <div class="choice-card-title">${this.title}</div>
      ${this.description ? html`<div class="choice-card-desc">${this.description}</div>` : nothing}
      ${this.pill ? html`<div class=${pillClass}>${this.pill}</div>` : nothing}
    </button>
  `;
}
```

- [ ] **Step 4: Run tests — expect all passing**

```bash
npx vitest run src/components/ChoiceCard/SpecdChoiceCard.test.ts --reporter=verbose
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ChoiceCard/
git commit -m "feat(ChoiceCard): render as <button> for semantic keyboard/click support"
```

---

## Task 5: Semantic HTML — `specd-modal` uses `<dialog>`

**Goal:** Replace `.modal-backdrop` + `.modal-card` divs with a native `<dialog>` element. Use `dialog.showModal()` / `dialog.close()`. This gives free Escape-key closing, `::backdrop` CSS, and proper ARIA `role="dialog"`.

**Files:**
- Modify: `src/components/Modal/SpecdModal.ts`
- Modify: `src/components/Modal/SpecdModal.test.ts`

- [ ] **Step 1: Add failing tests**

Add to `SpecdModal.test.ts`:
```typescript
it('renders a <dialog> element', async () => {
  const el = document.createElement('specd-modal') as any;
  el.open = true;
  document.body.appendChild(el);
  await el.updateComplete;
  expect(el.querySelector('dialog')).not.toBeNull();
  el.remove();
});

it('dialog has aria-modal="true" and aria-labelledby when title set', async () => {
  const el = document.createElement('specd-modal') as any;
  el.open = true;
  el.title = 'Confirm action';
  document.body.appendChild(el);
  await el.updateComplete;
  const dialog = el.querySelector('dialog');
  expect(dialog?.getAttribute('aria-modal')).toBe('true');
  expect(dialog?.getAttribute('aria-labelledby')).toBe('modal-title');
  el.remove();
});
```

- [ ] **Step 2: Run to confirm failure**

```bash
npx vitest run src/components/Modal/SpecdModal.test.ts --reporter=verbose
```

- [ ] **Step 3: Read current modal implementation**

```bash
cat src/components/Modal/SpecdModal.ts
```

- [ ] **Step 4: Rewrite `SpecdModal.ts` using `<dialog>`**

```typescript
// Key changes only — preserve all existing @property and event logic
override render() {
  return html`
    <dialog
      class="modal-dialog"
      aria-modal="true"
      aria-labelledby=${this.title ? 'modal-title' : nothing}
      @click=${(e: MouseEvent) => { if (e.target === e.currentTarget) this._close(); }}
      @cancel=${(e: Event) => { e.preventDefault(); this._close(); }}
    >
      <div class="modal-card" @click=${(e: Event) => e.stopPropagation()}>
        <div class="modal-header">
          ${this.title ? html`<div id="modal-title" class="modal-title">${this.title}</div>` : nothing}
          <button class="modal-close-btn" type="button" aria-label="Close" @click=${() => this._close()}>
            ${unsafeHTML(CLOSE_SVG)}
          </button>
        </div>
        <div class="modal-body"><slot></slot></div>
        ${this.footer ? html`<div class="modal-footer"><slot name="footer"></slot></div>` : nothing}
      </div>
    </dialog>
  `;
}

// Use dialog.showModal() / dialog.close() in updated() lifecycle:
override updated(changed: Map<string, unknown>) {
  const dialog = this.querySelector('dialog') as HTMLDialogElement | null;
  if (!dialog) return;
  if (changed.has('open')) {
    if (this.open) { try { dialog.showModal(); } catch { /* already open */ } }
    else { dialog.close(); }
  }
}
```

Add to `components.css` after existing `.modal-*` rules:
```css
/* <dialog> native element resets */
dialog.modal-dialog { padding: 0; border: none; background: transparent; max-width: none; }
dialog.modal-dialog::backdrop { background: rgba(0,0,0,0.45); }
```

- [ ] **Step 5: Run tests — expect all passing**

```bash
npx vitest run src/components/Modal/SpecdModal.test.ts --reporter=verbose
```

- [ ] **Step 6: Commit**

```bash
git add src/components/Modal/ src/tokens/components.css
git commit -m "feat(Modal): replace div backdrop with native <dialog> for accessibility"
```

---

## Task 6: Semantic HTML — `specd-drawer` uses `<dialog>` as slide-over

**Goal:** Same pattern as Modal. `<dialog>` with a side-panel layout. Uses `dialog.showModal()`, gets free Escape key and `::backdrop`. The CSS positions it to the right edge.

**Files:**
- Modify: `src/components/Drawer/SpecdDrawer.ts`
- Modify: `src/components/Drawer/SpecdDrawer.test.ts`
- Modify: `src/tokens/components.css`

- [ ] **Step 1: Add failing test**

```typescript
it('renders a <dialog> element', async () => {
  const el = document.createElement('specd-drawer') as any;
  el.open = true;
  document.body.appendChild(el);
  await el.updateComplete;
  expect(el.querySelector('dialog')).not.toBeNull();
  el.remove();
});
```

- [ ] **Step 2: Run to confirm failure**

```bash
npx vitest run src/components/Drawer/SpecdDrawer.test.ts --reporter=verbose
```

- [ ] **Step 3: Update `SpecdDrawer.ts`**

```typescript
override render() {
  return html`
    <dialog
      class="drawer-dialog"
      aria-modal="true"
      aria-labelledby=${this.title ? 'drawer-title' : nothing}
      @cancel=${(e: Event) => { e.preventDefault(); this._close(); }}
    >
      <div class="drawer-panel">
        <div class="drawer-header">
          ${this.title ? html`<div id="drawer-title" class="drawer-title">${this.title}</div>` : nothing}
          <button class="modal-close-btn" type="button" aria-label="Close" @click=${() => this._close()}>
            ${unsafeHTML(CLOSE_SVG)}
          </button>
        </div>
        <div class="drawer-body"><slot></slot></div>
        ${this.footer ? html`<div class="drawer-footer"><slot name="footer"></slot></div>` : nothing}
      </div>
    </dialog>
  `;
}

override updated(changed: Map<string, unknown>) {
  const dialog = this.querySelector('dialog') as HTMLDialogElement | null;
  if (!dialog) return;
  if (changed.has('open')) {
    if (this.open) { try { dialog.showModal(); } catch { /* already open */ } }
    else { dialog.close(); }
  }
}
```

Add to `components.css`:
```css
dialog.drawer-dialog {
  padding: 0; border: none; background: transparent;
  position: fixed; inset: 0 0 0 auto; margin: 0; height: 100%; max-height: 100%;
  width: min(380px, 90vw);
}
dialog.drawer-dialog::backdrop { background: rgba(0,0,0,0.35); }
```

- [ ] **Step 4: Run tests**

```bash
npx vitest run src/components/Drawer/SpecdDrawer.test.ts --reporter=verbose
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Drawer/ src/tokens/components.css
git commit -m "feat(Drawer): replace div backdrop with native <dialog> slide-over"
```

---

## Task 7: Semantic HTML — `specd-alert` ARIA role

**Goal:** `SpecdAlert` renders a `<div>` with no ARIA role. Add `role="alert"` for assertive live regions (error/warning), `role="status"` for non-urgent ones (success/info). Use `<specd-icon>` for the icon slot instead of inline SVG strings.

**Files:**
- Modify: `src/components/Alert/SpecdAlert.ts`
- Modify: `src/components/Alert/SpecdAlert.test.ts`

- [ ] **Step 1: Add failing tests**

```typescript
it('has role="alert" for negative intent', async () => {
  const el = document.createElement('specd-alert') as any;
  el.intent = 'negative';
  document.body.appendChild(el);
  await el.updateComplete;
  expect(el.querySelector('[role="alert"]')).not.toBeNull();
  el.remove();
});

it('has role="status" for positive intent', async () => {
  const el = document.createElement('specd-alert') as any;
  el.intent = 'positive';
  document.body.appendChild(el);
  await el.updateComplete;
  expect(el.querySelector('[role="status"]')).not.toBeNull();
  el.remove();
});
```

- [ ] **Step 2: Run to confirm failure**

```bash
npx vitest run src/components/Alert/SpecdAlert.test.ts --reporter=verbose
```

- [ ] **Step 3: Update `SpecdAlert.ts`**

Change the outer `<div class="alert alert-${this.intent}">` to:
```typescript
const role = (this.intent === 'negative' || this.intent === 'warning') ? 'alert' : 'status';
return html`
  <div class="alert alert-${this.intent}" role=${role}>
    ...
  </div>
`;
```

- [ ] **Step 4: Run tests**

```bash
npx vitest run src/components/Alert/SpecdAlert.test.ts --reporter=verbose
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Alert/
git commit -m "feat(Alert): add role=alert/status ARIA live region semantics"
```

---

## Task 8: Molecule Composition — `specd-toggle-row` uses `<specd-toggle>`

**Goal:** `SpecdToggleRow` currently reimplements the toggle inline (`<label class="toggle"><input type="checkbox">`). It should import and render `<specd-toggle>` for DRY atom composition.

**Files:**
- Modify: `src/components/ToggleRow/SpecdToggleRow.ts`
- Modify: `src/components/ToggleRow/SpecdToggleRow.test.ts`

- [ ] **Step 1: Add failing test**

```typescript
it('contains a specd-toggle element', async () => {
  const el = document.createElement('specd-toggle-row') as any;
  el.label = 'Some setting';
  document.body.appendChild(el);
  await el.updateComplete;
  expect(el.querySelector('specd-toggle')).not.toBeNull();
  el.remove();
});

it('forwards checked to specd-toggle', async () => {
  const el = document.createElement('specd-toggle-row') as any;
  el.label = 'Setting';
  el.checked = true;
  document.body.appendChild(el);
  await el.updateComplete;
  expect((el.querySelector('specd-toggle') as any)?.checked).toBe(true);
  el.remove();
});
```

- [ ] **Step 2: Run to confirm failure**

```bash
npx vitest run src/components/ToggleRow/SpecdToggleRow.test.ts --reporter=verbose
```

- [ ] **Step 3: Update `SpecdToggleRow.ts`**

```typescript
import '../Toggle/SpecdToggle.js';

// Replace the inline <label class="toggle">...</label> block with:
return html`
  <div class="toggle-row">
    <div class="toggle-row-text">
      <div class="toggle-row-label">${this.label}</div>
      ${this.hint ? html`<div class="toggle-row-hint">${this.hint}</div>` : nothing}
    </div>
    <specd-toggle
      .checked=${this.checked}
      @specd-change=${(e: CustomEvent) => {
        this.checked = e.detail.checked;
        this.dispatchEvent(new CustomEvent('specd-change', { detail: { checked: this.checked }, bubbles: true, composed: true }));
      }}
    ></specd-toggle>
  </div>
`;
```

> Note: `SpecdToggle` must fire `specd-change` with `detail: { checked }` — verify this before running.

- [ ] **Step 4: Run tests**

```bash
npx vitest run src/components/ToggleRow/SpecdToggleRow.test.ts --reporter=verbose
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ToggleRow/
git commit -m "refactor(ToggleRow): compose specd-toggle atom instead of inline implementation"
```

---

## Task 9: Molecule Composition — `specd-ignore-footer` uses `<specd-button>`

**Goal:** `SpecdIgnoreFooter` uses raw `<button class="btn-ignore-all">` etc. It should use `<specd-button>` atoms. This ensures consistency with the button system and removes hardcoded inline button styles.

**Files:**
- Modify: `src/components/IgnoreFooter/SpecdIgnoreFooter.ts`
- Modify: `src/components/IgnoreFooter/SpecdIgnoreFooter.test.ts`

- [ ] **Step 1: Add failing test**

```typescript
it('uses specd-button elements internally', async () => {
  const el = document.createElement('specd-ignore-footer') as any;
  document.body.appendChild(el);
  await el.updateComplete;
  expect(el.querySelectorAll('specd-button').length).toBeGreaterThan(0);
  el.remove();
});
```

- [ ] **Step 2: Run to confirm failure**

```bash
npx vitest run src/components/IgnoreFooter/SpecdIgnoreFooter.test.ts --reporter=verbose
```

- [ ] **Step 3: Update `SpecdIgnoreFooter.ts`**

```typescript
import '../Button/SpecdButton.js';

override render() {
  return html`
    <div class="ignore-footer">
      <specd-button
        variant="danger"
        size="sm"
        label="Ignore all"
        @click=${() => this._fire('specd-ignore-all')}
      ></specd-button>

      ${this.showselected ? html`
        <specd-button
          variant="ghost"
          size="sm"
          label="Ignore selected"
          @click=${() => this._fire('specd-ignore-selected')}
        ></specd-button>
      ` : nothing}

      <specd-button
        variant="ghost"
        size="sm"
        label="Cancel"
        @click=${() => this._fire('specd-ignore-cancel')}
      ></specd-button>
    </div>
  `;
}
```

> Note: Verify `SpecdButton` supports `variant="danger"` — check `SpecdButton.ts`. If not, use `variant="primary"` and add `danger` as a variant in the same commit.

- [ ] **Step 4: Run tests**

```bash
npx vitest run src/components/IgnoreFooter/SpecdIgnoreFooter.test.ts --reporter=verbose
```

- [ ] **Step 5: Commit**

```bash
git add src/components/IgnoreFooter/ src/components/Button/
git commit -m "refactor(IgnoreFooter): compose specd-button atoms, remove raw <button> elements"
```

---

## Task 10: Molecule Composition — `specd-issue-row` uses `<specd-tag>` and `<specd-jump-btn>`

**Goal:** `SpecdIssueRow` currently renders `<span class="issue-tag ...">` inline (from a JSON array) and uses raw `unsafeHTML` SVG + `<button class="btn-jump">`. Switch to `<specd-tag>` and `<specd-jump-btn>` atoms.

**Files:**
- Modify: `src/components/IssueRow/SpecdIssueRow.ts`
- Modify: `src/components/IssueRow/SpecdIssueRow.test.ts`

- [ ] **Step 1: Add failing test**

```typescript
it('renders specd-tag elements for each tag', async () => {
  const el = document.createElement('specd-issue-row') as any;
  el.tags = JSON.stringify([{ label: 'No description', sev: 'crit' }, { label: 'Published', sev: 'neutral' }]);
  document.body.appendChild(el);
  await el.updateComplete;
  expect(el.querySelectorAll('specd-tag').length).toBe(2);
  el.remove();
});

it('renders specd-jump-btn in the footer', async () => {
  const el = document.createElement('specd-issue-row') as any;
  el.component = 'Button/Primary';
  document.body.appendChild(el);
  await el.updateComplete;
  expect(el.querySelector('specd-jump-btn')).not.toBeNull();
  el.remove();
});
```

- [ ] **Step 2: Run to confirm failure**

```bash
npx vitest run src/components/IssueRow/SpecdIssueRow.test.ts --reporter=verbose
```

- [ ] **Step 3: Update `SpecdIssueRow.ts`**

```typescript
import '../Tag/SpecdTag.js';
import '../JumpBtn/SpecdJumpBtn.js';

// In render — replace the tags map:
${parsedTags.length ? html`
  <div class="issue-tag-row">
    ${parsedTags.map(t => html`
      <specd-tag label=${t.label} intent=${t.sev ?? this.severity}></specd-tag>
    `)}
  </div>
` : nothing}

// In footer — replace raw btn-jump button:
<specd-jump-btn
  label="Jump to component"
  @click=${(e: Event) => { e.stopPropagation(); this._fire('specd-jump'); }}
></specd-jump-btn>
```

Also remove the `JUMP_SVG` constant (no longer needed).

- [ ] **Step 4: Run tests**

```bash
npx vitest run src/components/IssueRow/SpecdIssueRow.test.ts --reporter=verbose
```

- [ ] **Step 5: Commit**

```bash
git add src/components/IssueRow/
git commit -m "refactor(IssueRow): compose specd-tag and specd-jump-btn atoms"
```

---

## Task 11a: Retire `SpecdIssueCard` (confirmed duplicate of `SpecdIssueRow`)

**Goal:** `SpecdIssueCard` uses an old design (icon-based, `chip-v2 dark` type chip, no tag row). `SpecdIssueRow` is the reference-aligned canonical implementation. Delete `SpecdIssueCard`.

**Files:**
- Delete: `src/components/IssueCard/` (entire directory)
- Modify: `src/index.ts` (remove export)
- Modify: `src/react.ts` (remove createComponent)

- [ ] **Step 1: Verify no tests import IssueCard**

```bash
grep -r "SpecdIssueCard\|specd-issue-card\|IssueCard" /Users/home/Desktop/code/admiral-ds/src --include="*.test.ts"
```
Expected: no results. If any exist, update them to use `specd-issue-row` first.

- [ ] **Step 2: Delete the directory**

```bash
rm -rf src/components/IssueCard
```

- [ ] **Step 3: Remove from index.ts and react.ts**

In `src/index.ts` remove:
```typescript
export { SpecdIssueCard } from './components/IssueCard/SpecdIssueCard.js';
```

In `src/react.ts` remove the `IssueCard` createComponent line.

- [ ] **Step 4: Run full test suite**

```bash
npx vitest run --reporter=dot
```
Expected: all passing.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: retire SpecdIssueCard (superseded by SpecdIssueRow)"
```

---

## Task 11e: Retire `SpecdIssueRowActions` (absorbed into `SpecdIssueRow`)

**Goal:** `SpecdIssueRowActions` rendered Jump + View Fixes + Ignore buttons in a row. This is now inlined directly in `SpecdIssueRow`. The component is no longer referenced anywhere.

**Files:**
- Delete: `src/components/IssueRowActions/` (entire directory)
- Modify: `src/index.ts`
- Modify: `src/react.ts`

- [ ] **Step 1: Verify no remaining usages**

```bash
grep -r "specd-issue-row-actions\|SpecdIssueRowActions\|IssueRowActions" \
  /Users/home/Desktop/code/admiral-ds/src --include="*.ts"
```
Expected: only in the component's own file. If referenced elsewhere, update those callers first.

- [ ] **Step 2: Delete**

```bash
rm -rf src/components/IssueRowActions
```

- [ ] **Step 3: Remove from index.ts and react.ts**

- [ ] **Step 4: Run full test suite**

```bash
npx vitest run --reporter=dot
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: retire SpecdIssueRowActions (functionality absorbed into SpecdIssueRow)"
```

---

## Task 12: `specd-button` and `specd-input` prop forwarding

**Goal:** Both `SpecdButton` and `SpecdInput` wrap a `<button>` / `<input>` respectively. They should forward all valid HTML attributes to their inner element via a `...rest` spread pattern using Lit's `spread` directive or by explicitly forwarding known attributes (`name`, `value`, `form`, `autofocus`, `tabindex`, `aria-label`, `aria-describedby`).

**Files:**
- Modify: `src/components/Button/SpecdButton.ts`
- Modify: `src/components/Button/SpecdButton.test.ts`
- Modify: `src/components/Input/SpecdInput.ts`
- Modify: `src/components/Input/SpecdInput.test.ts`

- [ ] **Step 1: Add failing tests for Button forwarding**

```typescript
it('forwards name and value to inner button', async () => {
  const el = document.createElement('specd-button') as any;
  el.setAttribute('name', 'submit-btn');
  el.setAttribute('value', 'confirm');
  document.body.appendChild(el);
  await el.updateComplete;
  const btn = el.querySelector('button');
  expect(btn?.getAttribute('name')).toBe('submit-btn');
  expect(btn?.getAttribute('value')).toBe('confirm');
  el.remove();
});

it('forwards aria-label to inner button', async () => {
  const el = document.createElement('specd-button') as any;
  el.setAttribute('aria-label', 'Close dialog');
  document.body.appendChild(el);
  await el.updateComplete;
  expect(el.querySelector('button')?.getAttribute('aria-label')).toBe('Close dialog');
  el.remove();
});
```

- [ ] **Step 2: Run to confirm failure**

```bash
npx vitest run src/components/Button/SpecdButton.test.ts --reporter=verbose
```

- [ ] **Step 3: Update `SpecdButton.ts` to add forwarded props**

```typescript
@property({ type: String }) name: string          = '';
@property({ type: String, attribute: 'aria-label' }) ariaLabel: string = '';
@property({ type: String, attribute: 'aria-describedby' }) ariaDescribedBy: string = '';
@property({ type: String }) value: string         = '';
@property({ type: String }) form: string          = '';
@property({ type: Boolean }) autofocus: boolean   = false;
@property({ type: Number }) tabIndex_: number | null = null;

// In render, on the <button>:
name=${this.name || nothing}
value=${this.value || nothing}
form=${this.form || nothing}
aria-label=${this.ariaLabel || nothing}
aria-describedby=${this.ariaDescribedBy || nothing}
?autofocus=${this.autofocus}
tabindex=${this.tabIndex_ ?? nothing}
```

- [ ] **Step 4: Add failing tests for Input forwarding**

```typescript
it('forwards name and form to inner input', async () => {
  const el = document.createElement('specd-input') as any;
  el.setAttribute('name', 'email');
  el.setAttribute('form', 'login-form');
  document.body.appendChild(el);
  await el.updateComplete;
  const input = el.querySelector('input');
  expect(input?.getAttribute('name')).toBe('email');
  expect(input?.getAttribute('form')).toBe('login-form');
  el.remove();
});

it('forwards autocomplete to inner input', async () => {
  const el = document.createElement('specd-input') as any;
  el.setAttribute('autocomplete', 'email');
  document.body.appendChild(el);
  await el.updateComplete;
  expect(el.querySelector('input')?.getAttribute('autocomplete')).toBe('email');
  el.remove();
});
```

- [ ] **Step 5: Update `SpecdInput.ts`** to forward `name`, `form`, `autocomplete`, `aria-label`, `aria-describedby`, `min`, `max`, `step`, `pattern`, `inputmode`.

- [ ] **Step 6: Run all tests**

```bash
npx vitest run --reporter=dot
```
Expected: all passing.

- [ ] **Step 7: Commit**

```bash
git add src/components/Button/ src/components/Input/
git commit -m "feat(Button,Input): forward native HTML attributes to inner element"
```

---

## Self-Review

**1. Spec coverage check:**

| Requirement | Task |
|---|---|
| Semantic HTML wrapping + prop forwarding | Tasks 3, 4, 5, 6, 7, 12 |
| AMO taxonomy in Storybook | Task 1 |
| Molecules compose atoms | Tasks 8, 9, 10 |
| Missing atom `specd-tag` | Task 2 |
| Retire confirmed duplicates | Tasks 11a, 11e |
| Duplicate list for user decision | Pre-plan table above |

**2. Placeholder scan:** ✅ No TBDs, all steps have code.

**3. Type consistency:** `TagIntent` used in Task 2 matches `intent` prop naming in Tasks 9, 10. `IssueTag.sev` in IssueRow task matches `specd-tag intent` prop. ✅

---

## Pending Decisions (Do Not Execute Until Confirmed)

These tasks are drafted but held pending user confirmation on the duplicate table above:

- **Task 11b:** Merge `SpecdSbPill` into `SpecdBadge` — add `intent="good|bad|muted"` to Badge, update CovRow story, retire SbPill
- **Task 11c:** Merge `SpecdHealthBadge` into `SpecdBadge` — add `intent="healthy|warn|poor"`, retire HealthBadge
- **Task 11d:** Optionally retire `SpecdNavScore` — replace with `<specd-badge intent="score" value="87">`

---

## Task 11b: Merge `specd-nav-score` into `specd-health-badge` (add `size` prop)

**Decision:** HealthBadge and NavScore are the same concept at two sizes. `specd-health-badge` becomes the single component with `size="sm"` (compact, nav-header use) and `size="md"` (current label badge, the default). Full tier × size coverage for all 3 tiers.

**Mapping:**
- Old `<specd-nav-score score="87">` → New `<specd-health-badge size="sm" tier="good" label="87">`
- Old `<specd-health-badge tier="good" label="Healthy">` → `<specd-health-badge size="md" tier="good" label="Healthy">` (unchanged, md is default)

**CSS plan — sm size tokens:**

| size | tier | bg | border | text | dot |
|---|---|---|---|---|---|
| sm | good | `--positive-light` | `--positive-accent` (opacity 0.4) | `--positive-dark` | `--positive-accent` |
| sm | med  | `--warning-light` | `rgba(217,119,6,0.3)` | `--warning-dark` | `--warning-accent` |
| sm | poor | `--negative-light` | `rgba(220,38,38,0.3)` | `--negative-dark` | `--negative-accent` |
| md | good | `--brand` (#b8ff57) | `rgba(184,255,87,0.4)` | `--blue-100` | `--blue-100` |
| md | med  | `--warning-light` | `rgba(217,119,6,0.3)` | `--warning-dark` | `--warning-accent` |
| md | poor | `--negative-light` | `rgba(220,38,38,0.3)` | `--negative-dark` | `--negative-accent` |

**Files:**
- Modify: `src/components/HealthBadge/SpecdHealthBadge.ts`
- Modify: `src/components/HealthBadge/SpecdHealthBadge.types.ts`
- Modify: `src/components/HealthBadge/SpecdHealthBadge.stories.ts`
- Modify: `src/components/HealthBadge/SpecdHealthBadge.test.ts`
- Modify: `src/tokens/components.css` (add `sz-sm` size variant CSS)
- Delete: `src/components/NavScore/` (entire dir)
- Modify: `src/index.ts` — remove NavScore export, update HealthBadge export
- Modify: `src/react.ts` — remove NavScore wrapper

- [ ] **Step 1: Write failing tests**

```typescript
// Add to SpecdHealthBadge.test.ts:
it('renders size="sm" with compact class', async () => {
  const el = document.createElement('specd-health-badge') as any;
  el.size = 'sm'; el.tier = 'good'; el.label = '87';
  document.body.appendChild(el);
  await el.updateComplete;
  const span = el.querySelector('span');
  expect(span?.className).toContain('sz-sm');
  el.remove();
});

it('renders size="md" as default', async () => {
  const el = document.createElement('specd-health-badge') as any;
  el.label = 'Healthy';
  document.body.appendChild(el);
  await el.updateComplete;
  expect(el.querySelector('span')?.className).toContain('sz-md');
  el.remove();
});

it('supports tier=med in sm size', async () => {
  const el = document.createElement('specd-health-badge') as any;
  el.size = 'sm'; el.tier = 'med'; el.label = '61';
  document.body.appendChild(el);
  await el.updateComplete;
  expect(el.querySelector('span')?.className).toContain('tier-med');
  expect(el.querySelector('span')?.className).toContain('sz-sm');
  el.remove();
});
```

- [ ] **Step 2: Run to confirm failure**

```bash
cd /Users/home/Desktop/code/admiral-ds
npx vitest run src/components/HealthBadge/SpecdHealthBadge.test.ts --reporter=verbose
```

- [ ] **Step 3: Update `SpecdHealthBadge.types.ts`**

```typescript
export type HealthBadgeTier = 'good' | 'med' | 'poor';
export type HealthBadgeSize = 'sm' | 'md';

export interface HealthBadgeProps {
  tier?: HealthBadgeTier;
  size?: HealthBadgeSize;
  label?: string;
}
```

- [ ] **Step 4: Update `SpecdHealthBadge.ts`**

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HealthBadgeProps, HealthBadgeTier, HealthBadgeSize } from './SpecdHealthBadge.types.js';

/**
 * Specd DS — HealthBadge
 *
 * Unified health indicator badge with two size variants:
 * - size="sm" — compact pill for nav/header contexts (replaces specd-nav-score)
 * - size="md" — label badge for cards/overviews (default, replaces legacy health-badge)
 *
 * @element specd-health-badge
 *
 * @attr {string} tier  - good | med | poor
 * @attr {string} size  - sm | md (default: md)
 * @attr {string} label - Text or numeric label
 *
 * @example
 * <specd-health-badge size="sm" tier="good" label="87"></specd-health-badge>
 * <specd-health-badge size="md" tier="poor" label="At Risk"></specd-health-badge>
 */
@customElement('specd-health-badge')
export class SpecdHealthBadge extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) tier: HealthBadgeTier = 'good';
  @property({ type: String }) size: HealthBadgeSize = 'md';
  @property({ type: String }) label: string = '';

  private _classes(): string {
    return ['health-badge', `sz-${this.size}`, `tier-${this.tier}`].join(' ');
  }

  override render() {
    return html`<span class=${this._classes()}>${this.label}</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-health-badge': SpecdHealthBadge; }
}
```

- [ ] **Step 5: Add CSS for size variants to `src/tokens/components.css`**

Replace the existing `.health-badge` and `.nav-score-badge` blocks with:

```css
/* ── HEALTH BADGE (unified: md=label badge, sm=score pill) ── */
.health-badge {
  display: inline-flex; align-items: center; gap: 5px;
  border-radius: var(--radius-pill); font-family: var(--font-mono);
  font-weight: 700; letter-spacing: 0.04em; white-space: nowrap;
}
.health-badge::before {
  content: ''; border-radius: 50%; flex-shrink: 0;
}

/* ── size: md (default — label badge) ───────────────────── */
.health-badge.sz-md {
  padding: 4px 12px 4px 10px;
  font-size: 10px; text-transform: uppercase;
}
.health-badge.sz-md::before { width: 6px; height: 6px; }

/* ── size: sm (compact score pill, replaces nav-score-badge) */
.health-badge.sz-sm {
  padding: 3px 10px 3px 8px; height: 22px;
  font-size: 11px; font-weight: 800;
}
.health-badge.sz-sm::before { width: 6px; height: 6px; }

/* ── tier colours — apply to both sizes ─────────────────── */
/* good: brand lime (md) / positive green (sm) */
.health-badge.sz-md.tier-good {
  background: var(--brand); border: 1px solid rgba(184,255,87,0.4); color: var(--blue-100);
}
.health-badge.sz-md.tier-good::before { background: var(--blue-100); }

.health-badge.sz-sm.tier-good {
  background: var(--positive-light); border: 1px solid rgba(34,197,94,0.4); color: var(--positive-dark);
}
.health-badge.sz-sm.tier-good::before { background: var(--positive-accent); }

/* med: warning amber */
.health-badge.tier-med {
  background: var(--warning-light); border: 1px solid rgba(217,119,6,0.3); color: var(--warning-dark);
}
.health-badge.tier-med::before { background: var(--warning-accent); }

/* poor: negative red */
.health-badge.tier-poor {
  background: var(--negative-light); border: 1px solid rgba(220,38,38,0.3); color: var(--negative-dark);
}
.health-badge.tier-poor::before { background: var(--negative-accent); }
```

- [ ] **Step 6: Update stories**

```typescript
// src/components/HealthBadge/SpecdHealthBadge.stories.ts
export const SmSize: Story = {
  name: 'sm — Score pill (replaces NavScore)',
  render: () => html`
    <div style="display:flex;gap:8px;padding:16px;align-items:center;">
      <specd-health-badge size="sm" tier="good" label="87"></specd-health-badge>
      <specd-health-badge size="sm" tier="med"  label="61"></specd-health-badge>
      <specd-health-badge size="sm" tier="poor" label="34"></specd-health-badge>
    </div>
  `,
};

export const MdSize: Story = {
  name: 'md — Label badge',
  render: () => html`
    <div style="display:flex;gap:8px;padding:16px;align-items:center;">
      <specd-health-badge size="md" tier="good" label="Healthy"></specd-health-badge>
      <specd-health-badge size="md" tier="med"  label="At Risk"></specd-health-badge>
      <specd-health-badge size="md" tier="poor" label="Critical"></specd-health-badge>
    </div>
  `,
};

export const AllVariants: Story = {
  name: 'All tier × size',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px;padding:16px;">
      <div style="display:flex;gap:8px;align-items:center;">
        <span style="font:10px var(--font-mono);color:var(--text-muted);width:24px">sm</span>
        <specd-health-badge size="sm" tier="good" label="87"></specd-health-badge>
        <specd-health-badge size="sm" tier="med"  label="61"></specd-health-badge>
        <specd-health-badge size="sm" tier="poor" label="34"></specd-health-badge>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <span style="font:10px var(--font-mono);color:var(--text-muted);width:24px">md</span>
        <specd-health-badge size="md" tier="good" label="Healthy"></specd-health-badge>
        <specd-health-badge size="md" tier="med"  label="At Risk"></specd-health-badge>
        <specd-health-badge size="md" tier="poor" label="Critical"></specd-health-badge>
      </div>
    </div>
  `,
};
```

- [ ] **Step 7: Run tests**

```bash
npx vitest run src/components/HealthBadge/SpecdHealthBadge.test.ts --reporter=verbose
```
Expected: all passing.

- [ ] **Step 8: Delete NavScore dir, remove from index + react**

```bash
rm -rf src/components/NavScore
# Remove from src/index.ts: export { SpecdNavScore } line
# Remove from src/react.ts: NavScore createComponent line
# Update src/index.ts HealthBadge export to include HealthBadgeSize type
```

- [ ] **Step 9: Run full suite**

```bash
npx vitest run --reporter=dot
```

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat(HealthBadge): add size=sm/md variants, absorb NavScore — full tier×size coverage"
```

---

## Task 11c: Merge `specd-sb-pill` and `specd-ai-gradient-btn` into `specd-button` variants

**Decision:** SbPill and AiGradientBtn both render as interactive elements (button/clickable). They become `variant` types on `SpecdButton`. This makes the button system the single source for all button-style interactions.

**Mapping:**
- Old `<specd-sb-pill intent="good" label="Matched">` → `<specd-button variant="sb-good" label="Matched">`
- Old `<specd-sb-pill intent="bad" label="Missing">` → `<specd-button variant="sb-bad" label="Missing">`
- Old `<specd-sb-pill intent="muted" label="—">` → `<specd-button variant="sb-muted" label="—">`
- Old `<specd-ai-gradient-btn label="Fix with AI">` → `<specd-button variant="ai-gradient" label="Fix with AI">`

**CSS for new button variants** (add to `components.css` button section):

```css
/* ── SB pill variants — Storybook status pills as buttons ── */
.btn-sb-good, .btn-sb-bad, .btn-sb-muted {
  display: inline-flex; align-items: center; padding: 2px 7px;
  border-radius: var(--radius-pill); font-family: var(--font-mono);
  font-size: 9px; font-weight: 700; line-height: 1.4; white-space: nowrap;
  border: none; cursor: pointer; transition: opacity 0.12s;
}
.btn-sb-good  { background: var(--positive-light); color: var(--positive-dark); }
.btn-sb-bad   { background: var(--negative-light); color: var(--negative-dark); }
.btn-sb-muted { background: var(--bg);             color: var(--text-muted);   }
.btn-sb-good:hover  { opacity: 0.8; }
.btn-sb-bad:hover   { opacity: 0.8; }
.btn-sb-muted:hover { opacity: 0.8; }
/* ai-gradient already exists as .btn-ai-gradient */
```

**Files:**
- Modify: `src/components/Button/SpecdButton.types.ts`
- Modify: `src/components/Button/SpecdButton.ts`
- Modify: `src/components/Button/SpecdButton.stories.ts`
- Modify: `src/components/Button/SpecdButton.test.ts`
- Modify: `src/tokens/components.css`
- Delete: `src/components/SbPill/`
- Delete: `src/components/AiGradientBtn/`
- Modify: `src/index.ts`, `src/react.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// Add to SpecdButton.test.ts:
it('renders with variant="sb-good"', async () => {
  const el = document.createElement('specd-button') as any;
  el.variant = 'sb-good'; el.label = 'Matched';
  document.body.appendChild(el);
  await el.updateComplete;
  expect(el.querySelector('button')?.className).toContain('btn-sb-good');
  el.remove();
});

it('renders with variant="sb-bad"', async () => {
  const el = document.createElement('specd-button') as any;
  el.variant = 'sb-bad'; el.label = 'Missing';
  document.body.appendChild(el);
  await el.updateComplete;
  expect(el.querySelector('button')?.className).toContain('btn-sb-bad');
  el.remove();
});

it('renders with variant="ai-gradient" including sparkle icon', async () => {
  const el = document.createElement('specd-button') as any;
  el.variant = 'ai-gradient'; el.label = 'Fix with AI';
  document.body.appendChild(el);
  await el.updateComplete;
  const btn = el.querySelector('button');
  expect(btn?.className).toContain('btn-ai-gradient');
  el.remove();
});
```

- [ ] **Step 2: Run to confirm failure**

```bash
npx vitest run src/components/Button/SpecdButton.test.ts --reporter=verbose
```

- [ ] **Step 3: Update `SpecdButton.types.ts`**

```typescript
export type ButtonVariant =
  | 'primary' | 'ghost' | 'accent' | 'danger'
  | 'sb-good' | 'sb-bad' | 'sb-muted'
  | 'ai-gradient';
```

- [ ] **Step 4: Update `SpecdButton.ts`**

The `_classes()` method already generates `btn-${this.variant}` so `sb-good` → `btn-sb-good` automatically. However `ai-gradient` must **not** add `btn-ai-gradient` via the prefix — the CSS class IS `btn-ai-gradient` so it works directly.

Add sparkle SVG constant and special `ai-gradient` rendering:

```typescript
const SPARKLE_SVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 L13.5 9 L20 10.5 L13.5 12 L12 19 L10.5 12 L4 10.5 L10.5 9 Z"/></svg>`;

// In _classes(), keep as-is — btn-${this.variant} generates the right class for all variants

// In render(), add sparkle auto-injection for ai-gradient variant:
const effectiveIcon = this.icon ||
  (this.variant === 'ai-gradient' ? SPARKLE_SVG : '');

// Also wrap label in .ai-text span for gradient text effect when ai-gradient:
const labelEl = this.variant === 'ai-gradient'
  ? html`<span class="ai-text">${this.label || html`<slot></slot>`}</span>`
  : html`<span class="btn-label">${this.label ? this.label : html`<slot></slot>`}</span>`;

return html`
  <button class=${this._classes()} type=${this.type} ?disabled=${isDisabled} aria-disabled=${isDisabled ? 'true' : 'false'}>
    ${effectiveIcon ? html`<span class="btn-icon" aria-hidden="true">${unsafeHTML(effectiveIcon)}</span>` : nothing}
    ${labelEl}
  </button>
`;
```

- [ ] **Step 5: Add CSS for sb button variants to `components.css`** (after existing `.btn-ghost` rules)

```css
/* ── SB Pill variants — Storybook match status as buttons ── */
.btn-sb-good, .btn-sb-bad, .btn-sb-muted {
  display: inline-flex; align-items: center; padding: 2px 7px;
  border-radius: var(--radius-pill); font-family: var(--font-mono);
  font-size: 9px; font-weight: 700; line-height: 1.4; white-space: nowrap;
  border: none; cursor: pointer; transition: opacity 0.12s;
}
.btn-sb-good  { background: var(--positive-light); color: var(--positive-dark); }
.btn-sb-bad   { background: var(--negative-light); color: var(--negative-dark); }
.btn-sb-muted { background: var(--bg);             color: var(--text-muted);   }
.btn-sb-good:hover, .btn-sb-bad:hover, .btn-sb-muted:hover { opacity: 0.8; }
.btn-sb-good:disabled, .btn-sb-bad:disabled, .btn-sb-muted:disabled { opacity: 0.4; cursor: not-allowed; }
```

- [ ] **Step 6: Update Button stories — add new variant group**

```typescript
export const SbVariants: Story = {
  name: 'SB Match variants',
  render: () => html`
    <div style="display:flex;gap:8px;padding:16px;align-items:center;">
      <specd-button variant="sb-good"  label="Matched"></specd-button>
      <specd-button variant="sb-bad"   label="Missing"></specd-button>
      <specd-button variant="sb-muted" label="—"></specd-button>
    </div>
  `,
};

export const AiGradient: Story = {
  name: 'AI Gradient',
  render: () => html`
    <div style="display:flex;gap:8px;padding:16px;">
      <specd-button variant="ai-gradient" label="Fix with AI"></specd-button>
      <specd-button variant="ai-gradient" label="Generating…" disabled></specd-button>
    </div>
  `,
};
```

- [ ] **Step 7: Run tests**

```bash
npx vitest run src/components/Button/SpecdButton.test.ts --reporter=verbose
```

- [ ] **Step 8: Delete retired components**

```bash
rm -rf src/components/SbPill
rm -rf src/components/AiGradientBtn
# Remove both from src/index.ts and src/react.ts
```

- [ ] **Step 9: Run full test suite**

```bash
npx vitest run --reporter=dot
```
Expected: all passing.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat(Button): add sb-good/sb-bad/sb-muted/ai-gradient variants; retire SbPill and AiGradientBtn"
```
