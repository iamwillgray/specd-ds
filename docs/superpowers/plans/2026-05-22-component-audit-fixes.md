# Component Audit Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all 14 visual regressions, structural bugs, and rename tasks discovered in the specd-ds Storybook audit.

**Architecture:** Each task is isolated to one or two component files. The fixes are ordered so fast/mechanical fixes come first (unblocking Storybook), renames come next (to avoid downstream confusion), then visual/structural bugs, then additive features.

**Tech Stack:** Lit 3, TypeScript, Vitest 3 + happy-dom, Storybook 10 (`@storybook/web-components-vite`), light DOM components (`createRenderRoot() { return this; }`).

---

## File structure

| File | Change |
|------|--------|
| `src/components/Skeleton/SpecdSkeleton.stories.ts` | Add `.js` to import |
| `src/components/CovRow/SpecdCovRow.stories.ts` | Add `.js` to import |
| `src/components/ScoreRing/SpecdScoreRing.stories.ts` | Add `.js` to import |
| `src/components/TabBar/SpecdTabBar.stories.ts` | Add `.js` to import |
| `src/components/ProgressBar/SpecdProgress.stories.ts` | Add `.js` to import |
| `src/components/HealthBadge/` → `src/components/HealthTag/` | Full rename |
| `src/index.ts` | Update HealthBadge → HealthTag export path |
| `src/components/FieldMessage/SpecdFieldMessage.ts` | Fix CSS class + add icons |
| `src/components/Divider/SpecdDivider.ts` | Fix empty rendering |
| `src/components/ChoiceCard/SpecdChoiceCard.ts` | Fix arrow SVG |
| `src/components/StatTileLg/SpecdStatTileLg.ts` | Fix arrow + default icon |
| `src/components/Button/SpecdButton.ts` | Add `badge` prop |
| `src/components/Button/SpecdButton.types.ts` | Add `solid-gradient` variant |
| `src/components/Button/SpecdButton.stories.ts` | Update AllVariants story |
| `src/components/Chip/SpecdChip.ts` | Fix right-padding when count present |
| `src/components/ColorSwatch/SpecdColorSwatch.ts` | Add 3 variant render modes |
| `src/components/ColorSwatch/SpecdColorSwatch.stories.ts` | Update stories |
| `src/components/Segmented/SpecdSegmented.ts` | Add `dark` boolean prop |
| `src/components/Segmented/SpecdSegmented.stories.ts` | Add dark story |
| `src/components/Icon/SpecdIcon.ts` | Add ~30 missing Lucide icons |
| `src/components/Icon/SpecdIcon.types.ts` | Add new names to `IconName` union |
| `src/components/IssuePreviewCard/SpecdIssuePreviewCard.ts` | Rebuild card top, remove Ignore, add expand |
| `src/components/IssueRow/SpecdIssueRow.ts` | Hard-coded type → inline PropFixRow children |

---

### Task 1: Fix `.js` extensions in 5 story files

These five story files use a bare `import './SpecdFoo'` without the `.js` extension. Storybook (Vite/ESM) requires the extension — without it, the dynamic module fetch fails at runtime with "Failed to fetch dynamically imported module".

**Files:**
- Modify: `src/components/Skeleton/SpecdSkeleton.stories.ts:3`
- Modify: `src/components/CovRow/SpecdCovRow.stories.ts:3`
- Modify: `src/components/ScoreRing/SpecdScoreRing.stories.ts:3`
- Modify: `src/components/TabBar/SpecdTabBar.stories.ts:3`
- Modify: `src/components/ProgressBar/SpecdProgress.stories.ts:3`

- [ ] **Step 1: Make all 5 edits**

In `src/components/Skeleton/SpecdSkeleton.stories.ts`, change line 3:
```ts
// BEFORE
import './SpecdSkeleton';
// AFTER
import './SpecdSkeleton.js';
```

In `src/components/CovRow/SpecdCovRow.stories.ts`, change line 3:
```ts
// BEFORE
import './SpecdCovRow';
// AFTER
import './SpecdCovRow.js';
```

In `src/components/ScoreRing/SpecdScoreRing.stories.ts`, change line 3:
```ts
// BEFORE
import './SpecdScoreRing';
// AFTER
import './SpecdScoreRing.js';
```

In `src/components/TabBar/SpecdTabBar.stories.ts`, change line 3:
```ts
// BEFORE
import './SpecdTabBar';
// AFTER
import './SpecdTabBar.js';
```

In `src/components/ProgressBar/SpecdProgress.stories.ts`, change line 3:
```ts
// BEFORE
import './SpecdProgress';
// AFTER
import './SpecdProgress.js';
```

- [ ] **Step 2: Verify tests still pass**

Run: `cd /Users/home/Desktop/code/specd-ds && npm test -- --reporter=verbose 2>&1 | tail -20`

Expected: all tests pass (no failures introduced by changing import strings).

- [ ] **Step 3: Commit**

```bash
git add src/components/Skeleton/SpecdSkeleton.stories.ts \
        src/components/CovRow/SpecdCovRow.stories.ts \
        src/components/ScoreRing/SpecdScoreRing.stories.ts \
        src/components/TabBar/SpecdTabBar.stories.ts \
        src/components/ProgressBar/SpecdProgress.stories.ts
git commit -m "fix: add .js extension to story imports (unblocks Storybook ESM fetch)"
```

---

### Task 2: HealthBadge → HealthTag rename

The design system renamed `specd-health-badge` to `specd-health-tag`. All file names, class names, element tag names, type names, and the main index export must be updated. The rendered CSS class `health-badge` stays the same (CSS doesn't change).

**Files:**
- Rename dir: `src/components/HealthBadge/` → `src/components/HealthTag/`
- Rename: `SpecdHealthBadge.ts` → `SpecdHealthTag.ts`
- Rename: `SpecdHealthBadge.types.ts` → `SpecdHealthTag.types.ts`
- Rename: `SpecdHealthBadge.stories.ts` → `SpecdHealthTag.stories.ts`
- Rename: `SpecdHealthBadge.test.ts` → `SpecdHealthTag.test.ts`
- Modify: `index.ts` (inside the folder)
- Modify: `src/index.ts` (root)

- [ ] **Step 1: Write the failing test**

Read `src/components/HealthBadge/SpecdHealthBadge.test.ts` first. The test should verify the element registers as `specd-health-tag` after the rename. Create the new test file `src/components/HealthTag/SpecdHealthTag.test.ts`:

```ts
import { describe, it, expect, beforeEach } from 'vitest';
import './SpecdHealthTag.js';

describe('SpecdHealthTag', () => {
  let el: HTMLElement;

  beforeEach(() => {
    el = document.createElement('specd-health-tag');
    document.body.appendChild(el);
  });

  afterEach(() => { el.remove(); });

  it('registers as specd-health-tag', () => {
    expect(customElements.get('specd-health-tag')).toBeDefined();
  });

  it('renders health-badge class with tier and size', async () => {
    el.setAttribute('tier', 'good');
    el.setAttribute('label', 'Healthy');
    el.setAttribute('size', 'md');
    await (el as any).updateComplete;
    const span = el.querySelector('.health-badge');
    expect(span).toBeTruthy();
    expect(span?.classList.contains('sz-md')).toBe(true);
    expect(span?.classList.contains('tier-good')).toBe(true);
    expect(span?.textContent?.trim()).toBe('Healthy');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/HealthTag/SpecdHealthTag.test.ts 2>&1 | tail -20`

Expected: FAIL — `SpecdHealthTag.js` not found yet.

- [ ] **Step 3: Perform the rename**

```bash
# Create new directory
mkdir -p /Users/home/Desktop/code/specd-ds/src/components/HealthTag

# Copy files with new names
cp /Users/home/Desktop/code/specd-ds/src/components/HealthBadge/SpecdHealthBadge.ts \
   /Users/home/Desktop/code/specd-ds/src/components/HealthTag/SpecdHealthTag.ts

cp /Users/home/Desktop/code/specd-ds/src/components/HealthBadge/SpecdHealthBadge.types.ts \
   /Users/home/Desktop/code/specd-ds/src/components/HealthTag/SpecdHealthTag.types.ts

cp /Users/home/Desktop/code/specd-ds/src/components/HealthBadge/SpecdHealthBadge.stories.ts \
   /Users/home/Desktop/code/specd-ds/src/components/HealthTag/SpecdHealthTag.stories.ts
```

Then edit `src/components/HealthTag/SpecdHealthTag.ts` — replace all content:

```ts
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HealthTagProps, HealthTagTier, HealthTagSize } from './SpecdHealthTag.types.js';

/**
 * Specd DS — HealthTag
 *
 * A pill with a dot pseudo-element indicating design system health tier.
 * Supports two sizes:
 * - `md` (default): lime brand label badge (e.g. "Healthy", "Needs work")
 * - `sm`: compact score pill
 *
 * @element specd-health-tag
 *
 * @attr {string} tier  - Health tier: good | med | poor
 * @attr {string} label - Text label displayed inside the badge
 * @attr {string} size  - Size variant: md (default) | sm
 *
 * @example
 * <specd-health-tag tier="good" label="Healthy"></specd-health-tag>
 * <specd-health-tag size="sm" tier="good" label="87"></specd-health-tag>
 */
@customElement('specd-health-tag')
export class SpecdHealthTag extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) tier: HealthTagTier = 'good';
  @property({ type: String }) label: string = '';
  @property({ type: String }) size: HealthTagSize = 'md';

  private _classes(): string {
    return ['health-badge', `sz-${this.size}`, `tier-${this.tier}`].join(' ');
  }

  override render() {
    return html`
      <span class=${this._classes()}>${this.label}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-health-tag': SpecdHealthTag;
  }
}
```

Edit `src/components/HealthTag/SpecdHealthTag.types.ts`:

```ts
export type HealthTagTier = 'good' | 'med' | 'poor';
export type HealthTagSize = 'sm' | 'md';

export interface HealthTagProps {
  tier?: HealthTagTier;
  label?: string;
  size?: HealthTagSize;
}
```

Edit `src/components/HealthTag/SpecdHealthTag.stories.ts` — replace all occurrences of `specd-health-badge` with `specd-health-tag`, `HealthBadge` with `HealthTag`, and the component string:

```ts
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdHealthTag.js';

const meta: Meta = {
  title: 'Atoms/HealthTag',
  component: 'specd-health-tag',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-health-tag
      tier=${args.tier ?? 'good'}
      label=${args.label ?? ''}
      size=${args.size ?? 'md'}
    ></specd-health-tag>
  `,
  argTypes: {
    tier:  { control: 'select', options: ['good', 'med', 'poor'] },
    label: { control: 'text' },
    size:  { control: 'select', options: ['md', 'sm'] },
  },
};
export default meta;
type Story = StoryObj;

export const Good: Story = { args: { tier: 'good', label: 'Healthy' } };
export const Med: Story  = { args: { tier: 'med',  label: 'Needs attention' } };
export const Poor: Story = { args: { tier: 'poor', label: 'Needs work' } };

export const AllTiers: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;align-items:center;">
      <specd-health-tag tier="good" label="Healthy"></specd-health-tag>
      <specd-health-tag tier="med" label="Needs attention"></specd-health-tag>
      <specd-health-tag tier="poor" label="Needs work"></specd-health-tag>
    </div>
  `,
};

export const SmSize: Story = {
  name: 'sm — Score pill',
  render: () => html`
    <div style="display:flex;gap:8px;padding:16px;align-items:center;">
      <specd-health-tag size="sm" tier="good" label="87"></specd-health-tag>
      <specd-health-tag size="sm" tier="med"  label="61"></specd-health-tag>
      <specd-health-tag size="sm" tier="poor" label="34"></specd-health-tag>
    </div>
  `,
};

export const MdSize: Story = {
  name: 'md — Label badge',
  render: () => html`
    <div style="display:flex;gap:8px;padding:16px;align-items:center;">
      <specd-health-tag size="md" tier="good" label="Healthy"></specd-health-tag>
      <specd-health-tag size="md" tier="med"  label="At Risk"></specd-health-tag>
      <specd-health-tag size="md" tier="poor" label="Critical"></specd-health-tag>
    </div>
  `,
};

export const AllVariants: Story = {
  name: 'All tier × size',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px;padding:16px;">
      <div style="display:flex;gap:8px;align-items:center;">
        <span style="font:10px var(--font-mono);color:var(--text-muted);width:24px">sm</span>
        <specd-health-tag size="sm" tier="good" label="87"></specd-health-tag>
        <specd-health-tag size="sm" tier="med"  label="61"></specd-health-tag>
        <specd-health-tag size="sm" tier="poor" label="34"></specd-health-tag>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <span style="font:10px var(--font-mono);color:var(--text-muted);width:24px">md</span>
        <specd-health-tag size="md" tier="good" label="Healthy"></specd-health-tag>
        <specd-health-tag size="md" tier="med"  label="At Risk"></specd-health-tag>
        <specd-health-tag size="md" tier="poor" label="Critical"></specd-health-tag>
      </div>
    </div>
  `,
};
```

Create `src/components/HealthTag/index.ts`:

```ts
export { SpecdHealthTag } from './SpecdHealthTag.js';
export type { HealthTagProps, HealthTagTier, HealthTagSize } from './SpecdHealthTag.types.js';
```

- [ ] **Step 4: Update root `src/index.ts`**

Find this line in `src/index.ts`:
```ts
export * from './components/HealthBadge/index.js';
```

Replace with:
```ts
export * from './components/HealthTag/index.js';
```

- [ ] **Step 5: Move test file and verify it passes**

```bash
cp /Users/home/Desktop/code/specd-ds/src/components/HealthBadge/SpecdHealthBadge.test.ts \
   /Users/home/Desktop/code/specd-ds/src/components/HealthTag/SpecdHealthTag.test.ts
```

The test file references `SpecdHealthBadge` — update it to match the test written in Step 1 (replace with the file written in Step 1 above).

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/HealthTag/SpecdHealthTag.test.ts 2>&1 | tail -20`

Expected: PASS — all assertions green.

- [ ] **Step 6: Remove old HealthBadge directory**

```bash
rm -rf /Users/home/Desktop/code/specd-ds/src/components/HealthBadge
```

- [ ] **Step 7: Run full test suite**

Run: `cd /Users/home/Desktop/code/specd-ds && npm test 2>&1 | tail -30`

Expected: all tests pass.

- [ ] **Step 8: Commit**

```bash
git add src/components/HealthTag/ src/index.ts
git rm -r src/components/HealthBadge/
git commit -m "feat: rename HealthBadge → HealthTag (element: specd-health-tag)"
```

---

### Task 3: FieldMessage — fix CSS class and add coloured icons

`SpecdFieldMessage` renders `class="form-hint"` but no CSS rules for `.form-hint.error` or `.form-hint.success` exist. The correct class is `field-message`, which has error (red) and success (green) rules. Add leading SVG icons per type.

**Files:**
- Modify: `src/components/FieldMessage/SpecdFieldMessage.ts`
- Test: `src/components/FieldMessage/SpecdFieldMessage.test.ts`

- [ ] **Step 1: Write the failing test**

Read existing test first, then replace/extend `src/components/FieldMessage/SpecdFieldMessage.test.ts`:

```ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './SpecdFieldMessage.js';

describe('SpecdFieldMessage', () => {
  let el: HTMLElement;

  beforeEach(() => {
    el = document.createElement('specd-field-message');
    document.body.appendChild(el);
  });

  afterEach(() => { el.remove(); });

  it('renders field-message class (not form-hint)', async () => {
    el.setAttribute('message', 'Helper text');
    await (el as any).updateComplete;
    expect(el.querySelector('.field-message')).toBeTruthy();
    expect(el.querySelector('.form-hint')).toBeNull();
  });

  it('adds error class for error type', async () => {
    el.setAttribute('type', 'error');
    el.setAttribute('message', 'Something went wrong');
    await (el as any).updateComplete;
    const div = el.querySelector('.field-message');
    expect(div?.classList.contains('error')).toBe(true);
  });

  it('adds success class for success type', async () => {
    el.setAttribute('type', 'success');
    el.setAttribute('message', 'Saved');
    await (el as any).updateComplete;
    const div = el.querySelector('.field-message');
    expect(div?.classList.contains('success')).toBe(true);
  });

  it('renders an SVG icon for error type', async () => {
    el.setAttribute('type', 'error');
    el.setAttribute('message', 'Something went wrong');
    await (el as any).updateComplete;
    expect(el.querySelector('svg')).toBeTruthy();
  });

  it('renders an SVG icon for success type', async () => {
    el.setAttribute('type', 'success');
    el.setAttribute('message', 'Saved');
    await (el as any).updateComplete;
    expect(el.querySelector('svg')).toBeTruthy();
  });

  it('renders no icon for hint type', async () => {
    el.setAttribute('type', 'hint');
    el.setAttribute('message', 'Just a hint');
    await (el as any).updateComplete;
    expect(el.querySelector('svg')).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/FieldMessage/SpecdFieldMessage.test.ts 2>&1 | tail -20`

Expected: FAIL — `form-hint` class found, `field-message` not found.

- [ ] **Step 3: Implement the fix**

Replace `src/components/FieldMessage/SpecdFieldMessage.ts` with:

```ts
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export type FieldMessageType = 'hint' | 'error' | 'success';

const ICON_ERROR   = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
const ICON_SUCCESS = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;

/**
 * Specd DS — FieldMessage
 *
 * Helper/error text displayed below a form field.
 *
 * @element specd-field-message
 *
 * @attr {string} type    - hint | error | success (default hint)
 * @attr {string} message - Text to display
 */
@customElement('specd-field-message')
export class SpecdFieldMessage extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) type: FieldMessageType = 'hint';
  @property({ type: String }) message: string = '';

  override render() {
    const cls = [
      'field-message',
      this.type === 'error'   ? 'error'   : '',
      this.type === 'success' ? 'success' : '',
    ].filter(Boolean).join(' ');

    const icon = this.type === 'error'
      ? html`${unsafeHTML(ICON_ERROR)}`
      : this.type === 'success'
      ? html`${unsafeHTML(ICON_SUCCESS)}`
      : nothing;

    return html`<div class=${cls}>${icon}${this.message}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-field-message': SpecdFieldMessage; }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/FieldMessage/SpecdFieldMessage.test.ts 2>&1 | tail -20`

Expected: PASS — 6 assertions green.

- [ ] **Step 5: Commit**

```bash
git add src/components/FieldMessage/SpecdFieldMessage.ts \
        src/components/FieldMessage/SpecdFieldMessage.test.ts
git commit -m "fix: FieldMessage use field-message CSS class, add coloured icons for error/success"
```

---

### Task 4: Divider — fix empty rendering

When no `label` prop is provided, `SpecdDivider` renders only one `<div class="divider-line">`. The host element is inline by default, so the flex layout collapses and nothing is visible. Fix: always render a wrapper with `display:block` and `width:100%`, and always render two divider-line elements.

**Files:**
- Modify: `src/components/Divider/SpecdDivider.ts`
- Test: `src/components/Divider/SpecdDivider.test.ts`

- [ ] **Step 1: Write the failing test**

Read existing test first, then replace/extend:

```ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './SpecdDivider.js';

describe('SpecdDivider', () => {
  let el: HTMLElement;

  beforeEach(() => {
    el = document.createElement('specd-divider');
    document.body.appendChild(el);
  });

  afterEach(() => { el.remove(); });

  it('renders two divider-line elements with no label', async () => {
    await (el as any).updateComplete;
    const lines = el.querySelectorAll('.divider-line');
    expect(lines.length).toBe(2);
  });

  it('renders two divider-line elements with a label', async () => {
    el.setAttribute('label', 'Or');
    await (el as any).updateComplete;
    const lines = el.querySelectorAll('.divider-line');
    expect(lines.length).toBe(2);
  });

  it('renders divider-label span when label is set', async () => {
    el.setAttribute('label', 'Or');
    await (el as any).updateComplete;
    const label = el.querySelector('.divider-label');
    expect(label).toBeTruthy();
    expect(label?.textContent?.trim()).toBe('Or');
  });

  it('does not render divider-label span when no label', async () => {
    await (el as any).updateComplete;
    expect(el.querySelector('.divider-label')).toBeNull();
  });

  it('wrapper div has class divider', async () => {
    await (el as any).updateComplete;
    expect(el.querySelector('.divider')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/Divider/SpecdDivider.test.ts 2>&1 | tail -20`

Expected: FAIL — only 1 divider-line renders when no label.

- [ ] **Step 3: Implement the fix**

Replace `src/components/Divider/SpecdDivider.ts` with:

```ts
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DividerProps } from './SpecdDivider.types.js';

/**
 * Specd DS — Divider
 *
 * @element specd-divider
 * @attr {string} label - Optional label text shown in the center
 */
@customElement('specd-divider')
export class SpecdDivider extends LitElement implements DividerProps {
  override createRenderRoot() { return this; }

  @property({ type: String }) label?: string;

  override render() {
    return html`
      <div class="divider" style="display:flex;align-items:center;width:100%;">
        <div class="divider-line"></div>
        ${this.label
          ? html`<span class="divider-label">${this.label}</span><div class="divider-line"></div>`
          : html`<div class="divider-line"></div>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-divider': SpecdDivider;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/Divider/SpecdDivider.test.ts 2>&1 | tail -20`

Expected: PASS — 5 assertions green.

- [ ] **Step 5: Commit**

```bash
git add src/components/Divider/SpecdDivider.ts \
        src/components/Divider/SpecdDivider.test.ts
git commit -m "fix: Divider always renders two lines, wrapper has block display"
```

---

### Task 5: ChoiceCard — fix arrow SVG to arrow-with-tail

`ARROW_SVG` in `SpecdChoiceCard.ts` uses a bare chevron polyline (`<polyline points="9 18 15 12 9 6"/>`). The reference design uses an arrow-with-tail path (`M5 12h14M12 5l7 7-7 7`). Replace the SVG and ensure its class is `choice-card-arrow`.

**Files:**
- Modify: `src/components/ChoiceCard/SpecdChoiceCard.ts`
- Test: `src/components/ChoiceCard/SpecdChoiceCard.test.ts`

- [ ] **Step 1: Write the failing test**

Read existing test first, then extend it:

```ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './SpecdChoiceCard.js';

describe('SpecdChoiceCard', () => {
  let el: HTMLElement;

  beforeEach(() => {
    el = document.createElement('specd-choice-card');
    el.setAttribute('title', 'Test card');
    document.body.appendChild(el);
  });

  afterEach(() => { el.remove(); });

  it('renders choice-card-arrow span', async () => {
    await (el as any).updateComplete;
    expect(el.querySelector('.choice-card-arrow')).toBeTruthy();
  });

  it('arrow uses arrow-with-tail path (not chevron polyline)', async () => {
    await (el as any).updateComplete;
    const arrow = el.querySelector('.choice-card-arrow');
    // The arrow-with-tail uses a <path> element, not <polyline>
    expect(arrow?.querySelector('path')).toBeTruthy();
    expect(arrow?.querySelector('polyline')).toBeNull();
  });

  it('renders icon above title when icon prop set', async () => {
    el.setAttribute('icon', '<svg><circle cx="12" cy="12" r="10"/></svg>');
    await (el as any).updateComplete;
    const icon = el.querySelector('.choice-card-icon');
    const title = el.querySelector('.choice-card-title');
    expect(icon).toBeTruthy();
    expect(title).toBeTruthy();
    // Icon should come before title in DOM order
    const children = Array.from(el.querySelector('button')!.children);
    expect(children.indexOf(icon as Element)).toBeLessThan(children.indexOf(title as Element));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/ChoiceCard/SpecdChoiceCard.test.ts 2>&1 | tail -20`

Expected: FAIL — arrow uses `<polyline>` not `<path>`.

- [ ] **Step 3: Implement the fix**

In `src/components/ChoiceCard/SpecdChoiceCard.ts`, change line 6:

```ts
// BEFORE
const ARROW_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;

// AFTER
const ARROW_SVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/ChoiceCard/SpecdChoiceCard.test.ts 2>&1 | tail -20`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/ChoiceCard/SpecdChoiceCard.ts \
        src/components/ChoiceCard/SpecdChoiceCard.test.ts
git commit -m "fix: ChoiceCard arrow uses arrow-with-tail path not chevron polyline"
```

---

### Task 6: StatTileLg — fix arrow SVG and add default icon

`SpecdStatTileLg` has two bugs:
1. The `chevronSvg` (top-right arrow) uses a chevron polyline — replace with arrow-with-tail path.
2. The `icon` slot is optional with no fallback — reference always shows a grid-like icon; add a default icon when none provided.

**Files:**
- Modify: `src/components/StatTileLg/SpecdStatTileLg.ts`
- Test: `src/components/StatTileLg/SpecdStatTileLg.test.ts`

- [ ] **Step 1: Write the failing test**

Read existing test first, then replace/extend:

```ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './SpecdStatTileLg.js';

describe('SpecdStatTileLg', () => {
  let el: HTMLElement;

  beforeEach(() => {
    el = document.createElement('specd-stat-tile-lg');
    el.setAttribute('num', '42');
    el.setAttribute('title', 'Components');
    document.body.appendChild(el);
  });

  afterEach(() => { el.remove(); });

  it('renders the number', async () => {
    await (el as any).updateComplete;
    expect(el.querySelector('.stat-tile-lg-num')?.textContent?.trim()).toBe('42');
  });

  it('renders arrow using path element (not polyline)', async () => {
    await (el as any).updateComplete;
    const arrow = el.querySelector('.stat-tile-arrow');
    expect(arrow?.querySelector('path')).toBeTruthy();
    expect(arrow?.querySelector('polyline')).toBeNull();
  });

  it('renders a default icon when no icon prop set', async () => {
    await (el as any).updateComplete;
    expect(el.querySelector('.stat-tile-icon')).toBeTruthy();
    expect(el.querySelector('.stat-tile-icon svg')).toBeTruthy();
  });

  it('renders custom icon when icon prop set', async () => {
    el.setAttribute('icon', '<svg id="custom"><circle cx="12" cy="12" r="10"/></svg>');
    await (el as any).updateComplete;
    expect(el.querySelector('#custom')).toBeTruthy();
  });

  it('renders trend pill when trend set', async () => {
    el.setAttribute('trend', '+5%');
    el.setAttribute('trenddir', 'up');
    await (el as any).updateComplete;
    expect(el.querySelector('.stat-trend-pill')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/StatTileLg/SpecdStatTileLg.test.ts 2>&1 | tail -20`

Expected: FAIL — arrow uses polyline, no default icon rendered.

- [ ] **Step 3: Implement the fix**

Replace `src/components/StatTileLg/SpecdStatTileLg.ts` with:

```ts
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { StatTileColor, TrendDir } from './SpecdStatTileLg.types.js';

const DEFAULT_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`;

@customElement('specd-stat-tile-lg')
export class SpecdStatTileLg extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) num: string = '0';
  @property({ type: String }) title: string = '';
  @property({ type: String }) subtitle?: string;
  @property({ type: String }) trend?: string;
  @property({ type: String }) trenddir: TrendDir = 'flat';
  @property({ type: String }) color: StatTileColor = 'default';
  @property({ type: String }) icon?: string;

  override render() {
    const arrowSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
    const trendArrow = this.trenddir === 'up'
      ? `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`
      : this.trenddir === 'down'
      ? `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`
      : '';
    const iconSvg = this.icon ?? DEFAULT_ICON;
    return html`
      <button class="stat-tile-lg ${this.color !== 'default' ? this.color : ''}">
        <div class="stat-tile-header">
          <div class="stat-tile-icon">${unsafeHTML(iconSvg)}</div>
          <span class="stat-tile-title">${this.title}</span>
          <span class="stat-tile-arrow">${unsafeHTML(arrowSvg)}</span>
        </div>
        <div class="stat-tile-lg-num">${this.num}</div>
        ${this.subtitle ? html`<div class="stat-tile-subtitle">${this.subtitle}</div>` : nothing}
        ${this.trend ? html`<div class="stat-trend-pill ${this.trenddir}">${unsafeHTML(trendArrow)} ${this.trend}</div>` : nothing}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-stat-tile-lg': SpecdStatTileLg;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/StatTileLg/SpecdStatTileLg.test.ts 2>&1 | tail -20`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/StatTileLg/SpecdStatTileLg.ts \
        src/components/StatTileLg/SpecdStatTileLg.test.ts
git commit -m "fix: StatTileLg use arrow-with-tail SVG, add default icon fallback"
```

---

### Task 7: Button — add `badge` prop

Add a `badge` prop that renders a trailing count badge (`<span class="btn-badge">`) after the label. This is used in action buttons that show a count (e.g. "Fix all (3)").

**Files:**
- Modify: `src/components/Button/SpecdButton.ts`
- Modify: `src/components/Button/SpecdButton.stories.ts`
- Test: `src/components/Button/SpecdButton.test.ts`

- [ ] **Step 1: Write the failing test**

Read existing test first, then extend:

```ts
// Add to existing SpecdButton.test.ts describe block:

it('renders btn-badge span when badge prop is set', async () => {
  el.setAttribute('badge', '3');
  await (el as any).updateComplete;
  const badge = el.querySelector('.btn-badge');
  expect(badge).toBeTruthy();
  expect(badge?.textContent?.trim()).toBe('3');
});

it('does not render btn-badge span when no badge prop', async () => {
  await (el as any).updateComplete;
  expect(el.querySelector('.btn-badge')).toBeNull();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/Button/SpecdButton.test.ts 2>&1 | tail -20`

Expected: FAIL — no `.btn-badge` element rendered.

- [ ] **Step 3: Implement the fix**

In `src/components/Button/SpecdButton.ts`, add the `badge` property after the `cls` property (around line 46):

```ts
@property({ type: String }) badge: string = '';
```

Then in the `render()` method, add the badge span after the label:

```ts
// BEFORE (the existing label/slot span):
${isAi
  ? html`<span class="ai-text">${this.label ? this.label : html`<slot></slot>`}</span>`
  : html`<span class="btn-label">${this.label ? this.label : html`<slot></slot>`}</span>`
}

// AFTER (add badge after):
${isAi
  ? html`<span class="ai-text">${this.label ? this.label : html`<slot></slot>`}</span>`
  : html`<span class="btn-label">${this.label ? this.label : html`<slot></slot>`}</span>`
}
${this.badge ? html`<span class="btn-badge">${this.badge}</span>` : nothing}
```

The full updated `render()` in `SpecdButton.ts`:

```ts
override render() {
  const isDisabled = this.disabled || this.loading;
  const isAi = this.variant === 'ai-gradient';
  const effectiveIcon = this.icon || (isAi ? SPARKLE_SVG : '');
  return html`
    <button
      class=${this._classes()}
      type=${this.type}
      ?disabled=${isDisabled}
      aria-disabled=${isDisabled ? 'true' : 'false'}
      name=${this.name || nothing}
      value=${this.value || nothing}
      form=${this.form || nothing}
      aria-label=${this.ariaLabel || nothing}
      aria-describedby=${this.ariaDescribedBy || nothing}
      ?autofocus=${this.autofocus}
    >
      ${effectiveIcon ? html`<span class="btn-icon" aria-hidden="true">${unsafeHTML(effectiveIcon)}</span>` : nothing}
      ${isAi
        ? html`<span class="ai-text">${this.label ? this.label : html`<slot></slot>`}</span>`
        : html`<span class="btn-label">${this.label ? this.label : html`<slot></slot>`}</span>`
      }
      ${this.badge ? html`<span class="btn-badge">${this.badge}</span>` : nothing}
    </button>
  `;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/Button/SpecdButton.test.ts 2>&1 | tail -20`

Expected: PASS.

- [ ] **Step 5: Update AllVariants story to show badge**

In `src/components/Button/SpecdButton.stories.ts`, find `AllVariants` and add a badge row:

```ts
export const WithBadge: Story = {
  name: 'With trailing badge',
  render: () => html`
    <div style="display:flex;gap:8px;padding:16px;align-items:center;flex-wrap:wrap;">
      <specd-button variant="primary" label="View fixes" badge="3"></specd-button>
      <specd-button variant="ghost" label="Issues" badge="12"></specd-button>
      <specd-button variant="accent" label="Alerts" badge="!"></specd-button>
    </div>
  `,
};
```

- [ ] **Step 6: Commit**

```bash
git add src/components/Button/SpecdButton.ts \
        src/components/Button/SpecdButton.stories.ts \
        src/components/Button/SpecdButton.test.ts
git commit -m "feat: Button add badge prop for trailing count badge"
```

---

### Task 8: Chip — fix right padding when count badge present

When a `count` badge is rendered, the chip still uses full padding on the right (`11px`), making the badge look cramped. When a `count` is present, add `has-count` to the chip class so CSS can reduce right padding.

**Files:**
- Modify: `src/components/Chip/SpecdChip.ts`
- Test: `src/components/Chip/SpecdChip.test.ts`

- [ ] **Step 1: Write the failing test**

Read existing test first, then extend:

```ts
// Add to existing SpecdChip.test.ts describe block:

it('adds has-count class when count prop is set', async () => {
  el.setAttribute('label', 'Issues');
  el.setAttribute('count', '5');
  await (el as any).updateComplete;
  const chip = el.querySelector('.chip-v2');
  expect(chip?.classList.contains('has-count')).toBe(true);
});

it('does not add has-count class when count prop is not set', async () => {
  el.setAttribute('label', 'Issues');
  await (el as any).updateComplete;
  const chip = el.querySelector('.chip-v2');
  expect(chip?.classList.contains('has-count')).toBe(false);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/Chip/SpecdChip.test.ts 2>&1 | tail -20`

Expected: FAIL — `has-count` class not added.

- [ ] **Step 3: Implement the fix**

In `src/components/Chip/SpecdChip.ts`, update `_classes()`:

```ts
// BEFORE
private _classes(): string {
  return [
    'chip-v2',
    this.active ? 'active' : '',
    this.intent ? this.intent : '',
    this.cls,
  ].filter(Boolean).join(' ');
}

// AFTER
private _classes(): string {
  return [
    'chip-v2',
    this.active ? 'active' : '',
    this.intent ? this.intent : '',
    this.count !== undefined ? 'has-count' : '',
    this.cls,
  ].filter(Boolean).join(' ');
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/Chip/SpecdChip.test.ts 2>&1 | tail -20`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Chip/SpecdChip.ts \
        src/components/Chip/SpecdChip.test.ts
git commit -m "fix: Chip adds has-count class when count badge present (reduces right padding)"
```

---

### Task 9: ColorSwatch — add 3 variant render modes

`SpecdColorSwatch` currently only renders a plain color square. Add a `variant` prop with three modes:
- `square` (default): the existing `<span class="qf-replace-swatch">` square
- `chip`: horizontal pill with color dot + name + hex value (`.color-swatch` layout)
- `typography`: box showing "Aa" text sample in the given color

**Files:**
- Modify: `src/components/ColorSwatch/SpecdColorSwatch.ts`
- Modify: `src/components/ColorSwatch/SpecdColorSwatch.stories.ts`
- Test: `src/components/ColorSwatch/SpecdColorSwatch.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/components/ColorSwatch/SpecdColorSwatch.test.ts` (or replace existing):

```ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './SpecdColorSwatch.js';

describe('SpecdColorSwatch', () => {
  let el: HTMLElement;

  beforeEach(() => {
    el = document.createElement('specd-color-swatch');
    document.body.appendChild(el);
  });

  afterEach(() => { el.remove(); });

  it('renders qf-replace-swatch for square variant (default)', async () => {
    el.setAttribute('color', '#ff0000');
    await (el as any).updateComplete;
    expect(el.querySelector('.qf-replace-swatch')).toBeTruthy();
  });

  it('renders color-swatch for chip variant', async () => {
    el.setAttribute('color', '#ff0000');
    el.setAttribute('variant', 'chip');
    el.setAttribute('label', 'Red');
    await (el as any).updateComplete;
    expect(el.querySelector('.color-swatch')).toBeTruthy();
    expect(el.querySelector('.color-swatch-dot')).toBeTruthy();
    expect(el.querySelector('.color-swatch-label')).toBeTruthy();
  });

  it('renders typography variant with Aa glyph', async () => {
    el.setAttribute('color', '#ff0000');
    el.setAttribute('variant', 'typography');
    await (el as any).updateComplete;
    const typo = el.querySelector('.color-swatch-typography');
    expect(typo).toBeTruthy();
    expect(typo?.textContent?.trim()).toBe('Aa');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/ColorSwatch/SpecdColorSwatch.test.ts 2>&1 | tail -20`

Expected: FAIL — chip and typography variants not rendered.

- [ ] **Step 3: Implement the fix**

Replace `src/components/ColorSwatch/SpecdColorSwatch.ts` with:

```ts
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

export type ColorSwatchVariant = 'square' | 'chip' | 'typography';

/**
 * Specd DS — ColorSwatch
 *
 * Colour preview component. Three display modes:
 * - `square` (default): small colour square used in variable suggestion rows
 * - `chip`: horizontal pill with dot + name + hex value
 * - `typography`: box showing "Aa" sample text in the given color
 *
 * @element specd-color-swatch
 *
 * @attr {string} color   - CSS color value (hex, rgb, var, etc.)
 * @attr {string} label   - Name label shown in chip variant (also used as aria-label)
 * @attr {string} variant - Display mode: square | chip | typography
 */
@customElement('specd-color-swatch')
export class SpecdColorSwatch extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) color: string = '';
  @property({ type: String }) label: string = '';
  @property({ type: String }) variant: ColorSwatchVariant = 'square';

  override render() {
    const bg = this.color || 'transparent';

    if (this.variant === 'chip') {
      return html`
        <span class="color-swatch" aria-label=${this.label || this.color}>
          <span
            class="color-swatch-dot"
            style=${styleMap({ background: bg })}
          ></span>
          <span class="color-swatch-label">
            ${this.label ? html`<span class="color-swatch-name">${this.label}</span>` : nothing}
            <span class="color-swatch-hex">${this.color}</span>
          </span>
        </span>
      `;
    }

    if (this.variant === 'typography') {
      return html`
        <span
          class="color-swatch-typography"
          style=${styleMap({ color: bg })}
          aria-label=${this.label || this.color}
        >Aa</span>
      `;
    }

    // Default: square
    return html`
      <span
        class="qf-replace-swatch"
        style=${styleMap({ background: bg })}
        aria-label=${this.label || this.color}
        role="img"
      ></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-color-swatch': SpecdColorSwatch; }
}
```

Update `src/components/ColorSwatch/SpecdColorSwatch.stories.ts` to show all three variants:

```ts
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdColorSwatch.js';

const meta: Meta = {
  title: 'Atoms/ColorSwatch',
  component: 'specd-color-swatch',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['square', 'chip', 'typography'] },
    color:   { control: 'color' },
    label:   { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Square: Story = {
  args: { color: '#3b82f6', label: 'Blue', variant: 'square' },
  render: (args) => html`<specd-color-swatch color=${args.color} label=${args.label} variant="square"></specd-color-swatch>`,
};

export const Chip: Story = {
  args: { color: '#3b82f6', label: 'Blue 500', variant: 'chip' },
  render: (args) => html`<specd-color-swatch color=${args.color} label=${args.label} variant="chip"></specd-color-swatch>`,
};

export const Typography: Story = {
  args: { color: '#0C1750', label: 'Navy', variant: 'typography' },
  render: (args) => html`<specd-color-swatch color=${args.color} label=${args.label} variant="typography"></specd-color-swatch>`,
};

export const AllVariants: Story = {
  name: 'All three variants',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;padding:16px;">
      <div style="display:flex;gap:12px;align-items:center;">
        <specd-color-swatch color="#3b82f6" variant="square"></specd-color-swatch>
        <specd-color-swatch color="#b8ff57" variant="square"></specd-color-swatch>
        <specd-color-swatch color="#ef4444" variant="square"></specd-color-swatch>
        <specd-color-swatch color="#0C1750" variant="square"></specd-color-swatch>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <specd-color-swatch color="#3b82f6" label="Blue 500" variant="chip"></specd-color-swatch>
        <specd-color-swatch color="#b8ff57" label="Lime" variant="chip"></specd-color-swatch>
        <specd-color-swatch color="#ef4444" label="Red 500" variant="chip"></specd-color-swatch>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <specd-color-swatch color="#0C1750" variant="typography"></specd-color-swatch>
        <specd-color-swatch color="#3b82f6" variant="typography"></specd-color-swatch>
        <specd-color-swatch color="#ef4444" variant="typography"></specd-color-swatch>
      </div>
    </div>
  `,
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/ColorSwatch/SpecdColorSwatch.test.ts 2>&1 | tail -20`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/ColorSwatch/SpecdColorSwatch.ts \
        src/components/ColorSwatch/SpecdColorSwatch.stories.ts \
        src/components/ColorSwatch/SpecdColorSwatch.test.ts
git commit -m "feat: ColorSwatch add chip and typography variant render modes"
```

---

### Task 10: Segmented — add dark variant prop

`SpecdSegmented` has no dark variant. Non-selected buttons render on a white background. Add a `dark` boolean prop that adds class `dark` to `.segmented-toggle`, enabling dark navy background via existing CSS.

**Files:**
- Modify: `src/components/Segmented/SpecdSegmented.ts`
- Modify: `src/components/Segmented/SpecdSegmented.stories.ts`
- Test: `src/components/Segmented/SpecdSegmented.test.ts`

- [ ] **Step 1: Write the failing test**

Read existing test first, then extend:

```ts
// Add to existing SpecdSegmented.test.ts describe block:

it('adds dark class to segmented-toggle when dark prop is set', async () => {
  el.setAttribute('options', '[{"value":"a","label":"A"},{"value":"b","label":"B"}]');
  el.setAttribute('dark', '');
  await (el as any).updateComplete;
  const toggle = el.querySelector('.segmented-toggle');
  expect(toggle?.classList.contains('dark')).toBe(true);
});

it('does not add dark class when dark prop is not set', async () => {
  el.setAttribute('options', '[{"value":"a","label":"A"},{"value":"b","label":"B"}]');
  await (el as any).updateComplete;
  const toggle = el.querySelector('.segmented-toggle');
  expect(toggle?.classList.contains('dark')).toBe(false);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/Segmented/SpecdSegmented.test.ts 2>&1 | tail -20`

Expected: FAIL — no `dark` class applied.

- [ ] **Step 3: Implement the fix**

In `src/components/Segmented/SpecdSegmented.ts`, add the `dark` property and update render:

```ts
// Add after existing @property declarations:
@property({ type: Boolean }) dark: boolean = false;

// Update render() — change the wrapper div class:
// BEFORE:
<div class="segmented-toggle">

// AFTER:
<div class="segmented-toggle ${this.dark ? 'dark' : ''}">
```

Full updated `render()`:

```ts
override render() {
  const opts: SegmentOption[] = (() => { try { return JSON.parse(this.options); } catch { return []; } })();
  return html`
    <div class="segmented-toggle ${this.dark ? 'dark' : ''}">
      ${opts.map(o => html`
        <button
          class="seg-btn ${this.value === o.value ? 'active' : ''}"
          @click=${() => {
            this.value = o.value;
            this.dispatchEvent(new CustomEvent('specd-change', { detail: { value: o.value }, bubbles: true, composed: true }));
          }}
        >${o.label}</button>
      `)}
    </div>
  `;
}
```

Add a dark story to `src/components/Segmented/SpecdSegmented.stories.ts`:

```ts
export const Dark: Story = {
  name: 'Dark variant',
  render: () => html`
    <div style="padding:16px;background:var(--navy,#0C1750);border-radius:8px;display:inline-flex;">
      <specd-segmented
        dark
        options='[{"value":"overview","label":"Overview"},{"value":"issues","label":"Issues"},{"value":"components","label":"Components"}]'
        value="overview"
      ></specd-segmented>
    </div>
  `,
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/Segmented/SpecdSegmented.test.ts 2>&1 | tail -20`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Segmented/SpecdSegmented.ts \
        src/components/Segmented/SpecdSegmented.stories.ts \
        src/components/Segmented/SpecdSegmented.test.ts
git commit -m "feat: Segmented add dark boolean prop for navy background variant"
```

---

### Task 11: Icon — expand catalogue with ~30 missing icons

`SpecdIcon` currently has 18 icons. Add the remaining icons identified in the audit. The `IconName` type union must also be updated.

**Files:**
- Modify: `src/components/Icon/SpecdIcon.ts`
- Modify: `src/components/Icon/SpecdIcon.types.ts`
- Test: `src/components/Icon/SpecdIcon.test.ts`

- [ ] **Step 1: Write the failing test**

Read existing test, then extend to verify new icon names render:

```ts
// Add to existing SpecdIcon.test.ts describe block:

it('renders logo-mark icon', async () => {
  el.setAttribute('name', 'logo-mark');
  await (el as any).updateComplete;
  expect(el.querySelector('svg')).toBeTruthy();
});

it('renders arrow-left icon', async () => {
  el.setAttribute('name', 'arrow-left');
  await (el as any).updateComplete;
  expect(el.querySelector('svg')).toBeTruthy();
});

it('renders plus icon', async () => {
  el.setAttribute('name', 'plus');
  await (el as any).updateComplete;
  expect(el.querySelector('svg')).toBeTruthy();
});

it('renders trash-2 icon', async () => {
  el.setAttribute('name', 'trash-2');
  await (el as any).updateComplete;
  expect(el.querySelector('svg')).toBeTruthy();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/Icon/SpecdIcon.test.ts 2>&1 | tail -20`

Expected: FAIL — new icon names not in ICONS record.

- [ ] **Step 3: Add new icons to `SpecdIcon.types.ts`**

Replace the full `IconName` type in `src/components/Icon/SpecdIcon.types.ts`:

```ts
export type IconName =
  // — existing —
  | 'check' | 'cross' | 'warn' | 'info' | 'crit'
  | 'jump' | 'fix' | 'ignore' | 'refresh' | 'settings'
  | 'eye' | 'eye-off' | 'chevron-down' | 'chevron-right'
  | 'sparkle' | 'search' | 'copy' | 'external'
  // — new —
  | 'logo-mark'
  | 'arrow-left' | 'arrow-right'
  | 'grid' | 'layers'
  | 'align-left' | 'align-justify'
  | 'book-open' | 'package' | 'file' | 'file-text'
  | 'link' | 'link-2' | 'tag' | 'clock'
  | 'bar-chart' | 'bar-chart-2' | 'activity'
  | 'check-circle' | 'upload'
  | 'plus' | 'trash-2' | 'edit-2' | 'edit-3'
  | 'code' | 'lock' | 'zap' | 'diamond' | 'star'
  | 'chevron-left' | 'chevron-up'
  | 'alert-circle' | 'x-circle';
```

- [ ] **Step 4: Add new icon SVGs to `SpecdIcon.ts`**

In `src/components/Icon/SpecdIcon.ts`, add the new entries to the `ICONS` record after the existing 18. Insert after the `'external'` entry (before the closing `};`):

```ts
  // New icons
  'logo-mark':      `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
  'arrow-left':     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>`,
  'arrow-right':    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,
  'grid':           `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  'layers':         `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  'align-left':     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>`,
  'align-justify':  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><line x1="21" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="3" y2="18"/></svg>`,
  'book-open':      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  'package':        `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  'file':           `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>`,
  'file-text':      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  'link':           `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  'link-2':         `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
  'tag':            `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  'clock':          `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  'bar-chart':      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`,
  'bar-chart-2':    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  'activity':       `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  'check-circle':   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  'upload':         `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>`,
  'plus':           `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  'trash-2':        `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,
  'edit-2':         `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>`,
  'edit-3':         `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  'code':           `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  'lock':           `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  'zap':            `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  'diamond':        `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 9-9 9-9-9 9-9z"/></svg>`,
  'star':           `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  'chevron-left':   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  'chevron-up':     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="18 15 12 9 6 15"/></svg>`,
  'alert-circle':   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  'x-circle':       `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/Icon/SpecdIcon.test.ts 2>&1 | tail -20`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/Icon/SpecdIcon.ts \
        src/components/Icon/SpecdIcon.types.ts \
        src/components/Icon/SpecdIcon.test.ts
git commit -m "feat: Icon expand catalogue with 32 additional Lucide icons"
```

---

### Task 12: IssuePreviewCard — rebuild card top, remove Ignore, add expand

Three issues to fix:
1. Card header uses old `issue-comp-tag` pattern (diamond icon + component name in one span). Reference uses `issue-card-icon` + `issue-name` as separate elements.
2. "Ignore…" button appears in footer but the audit says it should not be there — the card should have "View Fixes" as the primary action.
3. No expandable "expanded" state showing PropFixRow children.

For this rebuild: remove the Ignore button from the default footer, make "View Fixes" always visible, and add an `expanded` boolean prop that toggles a slot for fix rows.

**Files:**
- Modify: `src/components/IssuePreviewCard/SpecdIssuePreviewCard.ts`
- Test: `src/components/IssuePreviewCard/SpecdIssuePreviewCard.test.ts`

- [ ] **Step 1: Write the failing test**

Read existing test, then replace/extend:

```ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './SpecdIssuePreviewCard.js';

describe('SpecdIssuePreviewCard', () => {
  let el: HTMLElement;

  beforeEach(() => {
    el = document.createElement('specd-issue-preview-card');
    el.setAttribute('component', 'Button/Primary');
    el.setAttribute('type', 'Missing desc');
    el.setAttribute('severity', 'crit');
    document.body.appendChild(el);
  });

  afterEach(() => { el.remove(); });

  it('renders issue-card-icon element (not issue-comp-tag)', async () => {
    await (el as any).updateComplete;
    expect(el.querySelector('.issue-card-icon')).toBeTruthy();
    expect(el.querySelector('.issue-comp-tag')).toBeNull();
  });

  it('renders issue-name element', async () => {
    await (el as any).updateComplete;
    expect(el.querySelector('.issue-name')).toBeTruthy();
    expect(el.querySelector('.issue-name')?.textContent?.trim()).toBe('Button/Primary');
  });

  it('does not render Ignore button in default footer', async () => {
    await (el as any).updateComplete;
    const buttons = Array.from(el.querySelectorAll('button'));
    const ignoreBtn = buttons.find(b => b.textContent?.includes('Ignore'));
    expect(ignoreBtn).toBeUndefined();
  });

  it('renders View Fixes button by default', async () => {
    await (el as any).updateComplete;
    const buttons = Array.from(el.querySelectorAll('button'));
    const fixesBtn = buttons.find(b => b.textContent?.includes('View Fixes'));
    expect(fixesBtn).toBeTruthy();
  });

  it('fires specd-fixes event when View Fixes clicked', async () => {
    await (el as any).updateComplete;
    let fired = false;
    el.addEventListener('specd-fixes', () => { fired = true; });
    const fixesBtn = Array.from(el.querySelectorAll('button')).find(b => b.textContent?.includes('View Fixes'));
    (fixesBtn as HTMLButtonElement)?.click();
    expect(fired).toBe(true);
  });

  it('renders expand slot area when expanded prop set', async () => {
    el.setAttribute('expanded', '');
    await (el as any).updateComplete;
    expect(el.querySelector('.issue-card-fixes')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/IssuePreviewCard/SpecdIssuePreviewCard.test.ts 2>&1 | tail -20`

Expected: FAIL — `issue-comp-tag` exists, `issue-card-icon` does not, Ignore button found, View Fixes not always visible.

- [ ] **Step 3: Implement the rebuild**

Replace `src/components/IssuePreviewCard/SpecdIssuePreviewCard.ts` with:

```ts
import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../Tag/SpecdTag.js';
import '../JumpBtn/SpecdJumpBtn.js';

export type IssuePreviewCardSeverity = 'crit' | 'warn' | 'info';

interface IssueTag { label: string; sev?: 'crit' | 'warn' | 'info' | 'neutral'; }

const DIAMOND_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" style="width:12px;height:12px;flex-shrink:0;color:var(--icon-secondary)"><path d="M12 3l9 9-9 9-9-9 9-9z"/></svg>`;

/**
 * Specd DS — IssuePreviewCard
 *
 * A component-level issue card. Shows component name, severity badge,
 * issue tags, Jump button, and View Fixes action. Supports an expandable
 * fixes panel via the `expanded` prop and default slot.
 *
 * @element specd-issue-preview-card
 *
 * @attr {string}  component - Component name (e.g. "Button/Primary")
 * @attr {string}  type      - Badge label (e.g. "Missing desc")
 * @attr {string}  count     - Badge count ("!" for crit, number for others)
 * @attr {string}  severity  - crit | warn | info
 * @attr {string}  tags      - JSON: [{label, sev}]
 * @attr {boolean} expanded  - Show the fixes panel (slot content)
 *
 * @fires specd-jump  - Jump to canvas
 * @fires specd-fixes - View Fixes clicked
 */
@customElement('specd-issue-preview-card')
export class SpecdIssuePreviewCard extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String })  component: string                  = '';
  @property({ type: String })  type: string                       = '';
  @property({ type: String })  count: string                      = '';
  @property({ type: String })  severity: IssuePreviewCardSeverity = 'info';
  @property({ type: String })  tags: string                       = '[]';
  @property({ type: Boolean }) expanded: boolean                  = false;

  private _parsedTags(): IssueTag[] {
    try { return JSON.parse(this.tags) as IssueTag[]; } catch { return []; }
  }

  private _badgeCount(): string {
    if (this.count) return this.count;
    return this.severity === 'crit' ? '!' : '';
  }

  private _fire(name: string) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
  }

  override render() {
    const parsedTags = this._parsedTags();
    const badgeCount = this._badgeCount();

    return html`
      <div class="issue-card">

        <!-- Card top: icon + component name + badge -->
        <div class="issue-card-top">
          <div class="issue-card-icon">${unsafeHTML(DIAMOND_SVG)}</div>
          <span class="issue-name">${this.component || 'Unknown component'}</span>
          ${this.type ? html`
            <span class="issue-card-count ${this.severity}">
              ${this.type}
              ${badgeCount ? html`<span class="issue-card-count-badge">${badgeCount}</span>` : nothing}
            </span>
          ` : nothing}
        </div>

        <!-- Issue tags (stacked, each on its own line) -->
        ${parsedTags.length ? html`
          <div class="issue-tag-row stacked">
            ${parsedTags.map(t => html`
              <specd-tag label=${t.label} intent=${t.sev ?? this.severity}></specd-tag>
            `)}
          </div>
        ` : nothing}

        <!-- Footer: Jump + View Fixes -->
        <div class="issue-card-footer">
          <specd-jump-btn
            label="Jump to component"
            @click=${(e: Event) => { e.stopPropagation(); this._fire('specd-jump'); }}
          ></specd-jump-btn>

          <button class="btn-view-fixes" type="button"
            @click=${(e: Event) => {
              e.stopPropagation();
              this.expanded = !this.expanded;
              this._fire('specd-fixes');
            }}>
            View Fixes
            ${badgeCount && badgeCount !== '!' ? html`<span class="view-fixes-count">${badgeCount}</span>` : nothing}
          </button>
        </div>

        <!-- Expandable fixes panel -->
        ${this.expanded ? html`
          <div class="issue-card-fixes">
            <slot></slot>
          </div>
        ` : nothing}

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-issue-preview-card': SpecdIssuePreviewCard; }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/IssuePreviewCard/SpecdIssuePreviewCard.test.ts 2>&1 | tail -20`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/IssuePreviewCard/SpecdIssuePreviewCard.ts \
        src/components/IssuePreviewCard/SpecdIssuePreviewCard.test.ts
git commit -m "fix: IssuePreviewCard rebuild header (icon+name), remove Ignore, add expandable fixes slot"
```

---

### Task 13: IssueRow — hard-coded type expands inline into PropFixRow

Currently, when `fieldtype="hard-coded"`, the IssueRow fires `specd-quick-fix` and doesn't expand. The reference design shows `hard-coded` rows expanding inline to show `PropFixRow` children. Change the EXTERNAL_ACTION list so `hard-coded` enters the `editing` state and renders a slot for fix children rather than firing externally.

**Files:**
- Modify: `src/components/IssueRow/SpecdIssueRow.ts`
- Test: `src/components/IssueRow/SpecdIssueRow.test.ts`

- [ ] **Step 1: Write the failing test**

Read existing test, then extend:

```ts
// Add to existing SpecdIssueRow.test.ts describe block:

describe('hard-coded fieldtype', () => {
  let el: HTMLElement;

  beforeEach(() => {
    el = document.createElement('specd-issue-row');
    el.setAttribute('fieldtype', 'hard-coded');
    el.setAttribute('title', 'Hard-coded fill colour');
    document.body.appendChild(el);
  });

  afterEach(() => { el.remove(); });

  it('starts in initial state', async () => {
    await (el as any).updateComplete;
    expect((el as any)._state).toBe('initial');
  });

  it('transitions to editing state when CTA clicked', async () => {
    await (el as any).updateComplete;
    const cta = el.querySelector('.btn-row-primary') as HTMLButtonElement;
    cta?.click();
    await (el as any).updateComplete;
    expect((el as any)._state).toBe('editing');
  });

  it('renders fix-children slot in editing state', async () => {
    await (el as any).updateComplete;
    const cta = el.querySelector('.btn-row-primary') as HTMLButtonElement;
    cta?.click();
    await (el as any).updateComplete;
    expect(el.querySelector('.issue-row-fix-children')).toBeTruthy();
  });

  it('does NOT fire specd-quick-fix on CTA click', async () => {
    await (el as any).updateComplete;
    let fired = false;
    el.addEventListener('specd-quick-fix', () => { fired = true; });
    const cta = el.querySelector('.btn-row-primary') as HTMLButtonElement;
    cta?.click();
    await (el as any).updateComplete;
    expect(fired).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/IssueRow/SpecdIssueRow.test.ts 2>&1 | tail -20`

Expected: FAIL — `hard-coded` fires event instead of transitioning to editing, no `.issue-row-fix-children` slot.

- [ ] **Step 3: Implement the fix**

In `src/components/IssueRow/SpecdIssueRow.ts`:

1. Remove `'hard-coded'` from `EXTERNAL_ACTION`:

```ts
// BEFORE
const EXTERNAL_ACTION: IssueRowFieldType[] = ['hard-coded'];

// AFTER
const EXTERNAL_ACTION: IssueRowFieldType[] = [];
```

2. Update `_handleCta()` to handle `hard-coded` by entering editing state:

```ts
private _handleCta() {
  if (EXTERNAL_ACTION.includes(this.fieldtype)) {
    this._fire('specd-quick-fix');
    return;
  }
  if (DIRECT_APPLY.includes(this.fieldtype)) {
    this._setState('applied');
    this._fire('specd-save', { fieldtype: this.fieldtype, value: this._editValue });
    return;
  }
  if (this.fieldtype === 'description') {
    this._setState('editing');
    this._fire('specd-ai-write');
    return;
  }
  // hard-coded and doc-link: expand to editing to show inline fix children
  this._setState('editing');
}
```

3. Update `_renderEditingContent()` to handle `hard-coded`:

```ts
private _renderEditingContent() {
  if (this.fieldtype === 'hard-coded') {
    return html`
      <div class="issue-row-fix-children">
        <slot name="fix-children"></slot>
        <slot></slot>
      </div>
    `;
  }
  if (this.fieldtype === 'doc-link') {
    return html`
      <div class="row-link-field is-editing">
        <input
          type="url"
          placeholder="https://…"
          .value=${this._editValue}
          @input=${(e: Event) => { this._editValue = (e.target as HTMLInputElement).value; }}
        />
        ${this._renderEditCluster()}
      </div>
    `;
  }
  if (this.fieldtype === 'description') {
    return html`
      <div class="row-textarea-field is-editing is-gradient">
        <textarea
          placeholder="Describe this component…"
          .value=${this._editValue}
          @input=${(e: Event) => { this._editValue = (e.target as HTMLTextAreaElement).value; }}
        ></textarea>
        ${this._renderEditCluster()}
      </div>
    `;
  }
  return nothing;
}
```

4. Update `_renderInitialCta()` for `hard-coded` to use primary button (not ghost):

```ts
if (this.fieldtype === 'hard-coded') {
  return html`
    <button class="btn-row-primary" type="button"
      @click=${(e: Event) => { e.stopPropagation(); this._handleCta(); }}>
      View Fixes
    </button>
  `;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd /Users/home/Desktop/code/specd-ds && npx vitest run src/components/IssueRow/SpecdIssueRow.test.ts 2>&1 | tail -20`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/IssueRow/SpecdIssueRow.ts \
        src/components/IssueRow/SpecdIssueRow.test.ts
git commit -m "fix: IssueRow hard-coded type expands inline with fix-children slot (not external event)"
```

---

### Task 14: Run full test suite and push

- [ ] **Step 1: Run full test suite**

Run: `cd /Users/home/Desktop/code/specd-ds && npm test 2>&1 | tail -40`

Expected: all tests pass. If any fail, fix the failure before proceeding.

- [ ] **Step 2: Build check**

Run: `cd /Users/home/Desktop/code/specd-ds && npm run build 2>&1 | tail -20`

Expected: build completes with no errors.

- [ ] **Step 3: Push to remote**

Run: `cd /Users/home/Desktop/code/specd-ds && git push origin main`

---

## Self-review

### Spec coverage

| Audit item | Covered by task |
|---|---|
| Story import errors (5 files) | Task 1 ✓ |
| HealthBadge → HealthTag rename | Task 2 ✓ |
| FieldMessage colours + icons | Task 3 ✓ |
| Divider empty | Task 4 ✓ |
| ChoiceCard arrow | Task 5 ✓ |
| StatTileLg arrow + default icon | Task 6 ✓ |
| Button badge prop | Task 7 ✓ |
| Chip padding with count | Task 8 ✓ |
| ColorSwatch 3 variants | Task 9 ✓ |
| Segmented dark variant | Task 10 ✓ |
| Icon catalogue expansion | Task 11 ✓ |
| IssuePreviewCard structural rebuild | Task 12 ✓ |
| IssueRow hard-coded inline expansion | Task 13 ✓ |
| Full test + push | Task 14 ✓ |

**Not in scope (deferred):** NEW Select component — this is additive and can be a separate plan. The audit items above are all bug-fixes and renames.

### Placeholder scan

No TBD, TODO, or "add appropriate" phrases present. Every step shows exact code.

### Type consistency

- `HealthTagTier` / `HealthTagSize` / `HealthTagProps` used consistently across Task 2 files.
- `ColorSwatchVariant` defined in component and referenced in tests.
- `EXTERNAL_ACTION` emptied in Task 13 — no downstream references to `specd-quick-fix` remain in this plan.
- `issue-card-icon` + `issue-name` used in Task 12 component and tests — no conflict with old `issue-comp-tag` which is removed.
