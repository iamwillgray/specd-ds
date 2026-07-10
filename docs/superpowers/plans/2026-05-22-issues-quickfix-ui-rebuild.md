# Issues / Quick-Fix / Bulk-Issues UI Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild seven UI components used on the Issues, Quick-Fix, and Bulk-Issues pages to match the Specd DS reference design at `/Users/home/Desktop/code/pulse/src/design-system/`.

**Architecture:** Each task is self-contained — no shared state between them. Tasks 1–4 are pure atom/molecule upgrades. Tasks 5–7 require Task 1 (Button) and Task 2 (RadioRow) to be complete first.

**Tech Stack:** Lit 3, TypeScript, Vitest 3 + happy-dom, Storybook 10, light DOM (`createRenderRoot() { return this; }`), all CSS in `src/tokens/components.css`.

---

## File Map

**New files (create):**
- `src/components/RadioRow/SpecdRadioRow.ts` — renamed + rebuilt QfReplaceRow
- `src/components/RadioRow/SpecdRadioRow.stories.ts`
- `src/components/RadioRow/SpecdRadioRow.test.ts`
- `src/components/IssuePreviewCard/SpecdIssuePreviewCard.ts` — renamed existing IssueRow
- `src/components/IssuePreviewCard/SpecdIssuePreviewCard.stories.ts`
- `src/components/IssuePreviewCard/SpecdIssuePreviewCard.test.ts`

**Modified files:**
- `src/components/Button/SpecdButton.types.ts` — expand `ButtonVariant`
- `src/components/Button/SpecdButton.ts` — handle new variants
- `src/components/Button/SpecdButton.stories.ts` — action button stories
- `src/components/Button/SpecdButton.test.ts` — tests for new variants
- `src/components/ChoiceCard/SpecdChoiceCard.ts` — add arrow element
- `src/components/ChoiceCard/SpecdChoiceCard.test.ts` — add arrow test
- `src/components/PropFixRow/SpecdPropFixRow.ts` — rebuild header props
- `src/components/PropFixRow/SpecdPropFixSlot.ts` — rebuild full slot structure
- `src/components/PropFixRow/SpecdPropFixRow.stories.ts` — update stories
- `src/components/PropFixRow/SpecdPropFixRow.test.ts` — update tests
- `src/components/IssueRow/SpecdIssueRow.ts` — replace with new action-state component
- `src/components/IssueRow/SpecdIssueRow.stories.ts` — stories for all states × fieldtypes
- `src/components/IssueRow/SpecdIssueRow.test.ts` — state machine tests
- `src/components/VariablePicker/SpecdVariablePicker.ts` — search + sections + RadioRow
- `src/components/VariablePicker/SpecdVariablePicker.stories.ts` — search/section stories
- `src/components/VariablePicker/SpecdVariablePicker.test.ts` — search + section tests
- `src/index.ts` — update exports (add RadioRow, IssuePreviewCard; remove QfReplaceRow)
- `src/react.ts` — update React wrappers

**Deleted files (after Task 2 is complete):**
- `src/components/QfReplaceRow/SpecdQfReplaceRow.ts`
- `src/components/QfReplaceRow/SpecdQfReplaceRow.stories.ts`
- `src/components/QfReplaceRow/SpecdQfReplaceRow.test.ts`

---

## Task 1: Button — Add Action Button Variants

**Reference:** `src/tokens/components.css` lines 941–1091 — `.btn-row-primary`, `.btn-row-primary.btn-hc-ghost`, `.btn-row-applied`, `.btn-edit-pill`, `.btn-save-pill`, `.btn-cancel-pill`

**Files:**
- Modify: `src/components/Button/SpecdButton.types.ts`
- Modify: `src/components/Button/SpecdButton.ts`
- Modify: `src/components/Button/SpecdButton.stories.ts`
- Modify: `src/components/Button/SpecdButton.test.ts`

- [ ] **Step 1: Write the failing test**

Add to `src/components/Button/SpecdButton.test.ts`:

```typescript
describe('SpecdButton — action variants', () => {
  it('renders .btn-row-primary for variant="row-primary"', async () => {
    const el = document.createElement('specd-button') as any;
    el.variant = 'row-primary';
    el.label = 'Add doc link';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.btn-row-primary')).not.toBeNull();
    el.remove();
  });

  it('renders .btn-row-primary.btn-hc-ghost for variant="row-primary-ghost"', async () => {
    const el = document.createElement('specd-button') as any;
    el.variant = 'row-primary-ghost';
    el.label = 'View in Quick Fix';
    document.body.appendChild(el);
    await el.updateComplete;
    const btn = el.querySelector('button');
    expect(btn?.classList.contains('btn-row-primary')).toBe(true);
    expect(btn?.classList.contains('btn-hc-ghost')).toBe(true);
    el.remove();
  });

  it('renders .btn-row-applied for variant="row-applied"', async () => {
    const el = document.createElement('specd-button') as any;
    el.variant = 'row-applied';
    el.label = 'Applied';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.btn-row-applied')).not.toBeNull();
    el.remove();
  });

  it('renders .btn-edit-pill for variant="edit-pill"', async () => {
    const el = document.createElement('specd-button') as any;
    el.variant = 'edit-pill';
    el.label = 'Edit';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.btn-edit-pill')).not.toBeNull();
    el.remove();
  });

  it('renders .btn-save-pill for variant="save-pill"', async () => {
    const el = document.createElement('specd-button') as any;
    el.variant = 'save-pill';
    el.label = 'Save';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.btn-save-pill')).not.toBeNull();
    el.remove();
  });

  it('renders .btn-cancel-pill for variant="cancel-pill"', async () => {
    const el = document.createElement('specd-button') as any;
    el.variant = 'cancel-pill';
    el.label = 'Cancel';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.btn-cancel-pill')).not.toBeNull();
    el.remove();
  });
});
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
cd /Users/home/Desktop/code/admiral-ds && npm test -- --reporter=verbose 2>&1 | grep -E "FAIL|PASS|action variants" | head -20
```

Expected: 6 failures — element renders with wrong class names.

- [ ] **Step 3: Update ButtonVariant type**

Replace `src/components/Button/SpecdButton.types.ts`:

```typescript
export type ButtonVariant =
  | 'primary' | 'ghost' | 'accent' | 'danger'
  | 'sb-good' | 'sb-bad' | 'sb-muted'
  | 'ai-gradient'
  | 'row-primary' | 'row-primary-ghost' | 'row-applied'
  | 'edit-pill' | 'save-pill' | 'cancel-pill';
export type ButtonSize    = 'sm' | 'md' | 'lg';
export type ButtonType    = 'button' | 'submit' | 'reset';

/**
 * Props for the SpecdButton (`<specd-button>`) component.
 */
export interface ButtonProps {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: ButtonType;
  icon?: string;
  cls?: string;
}
```

- [ ] **Step 4: Update `_classes()` in SpecdButton.ts**

The `row-primary-ghost` variant needs TWO classes (`btn-row-primary btn-hc-ghost`). All others follow the `btn-${variant}` pattern. Replace the `_classes()` method:

```typescript
private _classes(): string {
  let variantClass: string;
  if (this.variant === 'row-primary-ghost') {
    variantClass = 'btn-row-primary btn-hc-ghost';
  } else {
    variantClass = `btn-${this.variant}`;
  }
  return [
    variantClass,
    this.size === 'sm' ? 'btn-sm' : this.size === 'lg' ? 'btn-lg' : '',
    this.full    ? 'btn-full'    : '',
    this.loading ? 'is-loading'  : '',
    this.cls,
  ].filter(Boolean).join(' ');
}
```

- [ ] **Step 5: Run tests to confirm they pass**

```bash
cd /Users/home/Desktop/code/admiral-ds && npm test -- --reporter=verbose 2>&1 | grep -E "FAIL|PASS|action variants" | head -20
```

Expected: all 6 new tests pass.

- [ ] **Step 6: Add stories for action variants**

Add to `src/components/Button/SpecdButton.stories.ts`:

```typescript
export const ActionVariants: Story = {
  name: 'Action Variants (rounded square)',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px;padding:16px;max-width:300px;">
      <specd-button variant="row-primary" label="Add doc link"></specd-button>
      <specd-button variant="row-primary-ghost" label="View in Quick Fix"></specd-button>
      <specd-button variant="row-applied" label="Applied"></specd-button>
      <specd-button variant="edit-pill" label="Edit"></specd-button>
      <specd-button variant="save-pill" label="Save"></specd-button>
      <specd-button variant="cancel-pill" label="Cancel"></specd-button>
    </div>
  `,
};
```

- [ ] **Step 7: Run full test suite to ensure no regressions**

```bash
cd /Users/home/Desktop/code/admiral-ds && npm test 2>&1 | tail -10
```

Expected: all pre-existing tests still pass.

- [ ] **Step 8: Commit**

```bash
cd /Users/home/Desktop/code/admiral-ds && git add src/components/Button/ && git commit -m "feat(button): add action button variants — row-primary, row-applied, pill sizes"
```

---

## Task 2: RadioRow — Rename QfReplaceRow + Fix Structure

**Reference:** `src/tokens/components.css` lines 1154–1226. CSS comment at line 1208: "Layout: [radio] [body: name + collection+hex] [swatch]". Reference HTML: `quick-fixes.html` right panel.

**What changes:**
- Tag: `specd-qf-replace-row` → `specd-radio-row`
- Class: `SpecdQfReplaceRow` → `SpecdRadioRow`
- Directory: `QfReplaceRow/` → `RadioRow/`
- Structure: `<button>` (not `<label>+<input>`), custom `.qf-replace-radio` span, body with name+collection+hex, swatch on the **right**
- Remove `type` prop (no type chip in reference design)
- Keep `name`, `value`, `checked`, `label`, `collection`, `color` props
- Add `hex` prop — optional explicit hex string shown inside collection line

**Files:**
- Create: `src/components/RadioRow/SpecdRadioRow.ts`
- Create: `src/components/RadioRow/SpecdRadioRow.stories.ts`
- Create: `src/components/RadioRow/SpecdRadioRow.test.ts`
- Delete: `src/components/QfReplaceRow/SpecdQfReplaceRow.ts`, `.stories.ts`, `.test.ts`
- Modify: `src/index.ts`
- Modify: `src/react.ts`

- [ ] **Step 1: Write the failing test**

Create `src/components/RadioRow/SpecdRadioRow.test.ts`:

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => { await import('./SpecdRadioRow.js'); });

describe('SpecdRadioRow', () => {
  it('renders .qf-replace-row button element', async () => {
    const el = document.createElement('specd-radio-row') as any;
    el.label = 'color/primary';
    document.body.appendChild(el);
    await el.updateComplete;
    const row = el.querySelector('.qf-replace-row');
    expect(row).not.toBeNull();
    expect(row?.tagName.toLowerCase()).toBe('button');
    el.remove();
  });

  it('has .qf-replace-radio span as first child of row', async () => {
    const el = document.createElement('specd-radio-row') as any;
    el.label = 'color/primary';
    document.body.appendChild(el);
    await el.updateComplete;
    const radio = el.querySelector('.qf-replace-radio');
    expect(radio).not.toBeNull();
    expect(radio?.tagName.toLowerCase()).toBe('span');
    el.remove();
  });

  it('renders name in .qf-replace-name and collection in .qf-replace-collection', async () => {
    const el = document.createElement('specd-radio-row') as any;
    el.label = 'color/brand/blue';
    el.collection = 'Semantic';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.qf-replace-name')?.textContent?.trim()).toBe('color/brand/blue');
    expect(el.querySelector('.qf-replace-collection')?.textContent?.trim()).toContain('Semantic');
    el.remove();
  });

  it('renders color swatch AFTER the body (swatch on right)', async () => {
    const el = document.createElement('specd-radio-row') as any;
    el.label = 'color/blue';
    el.color = '#3b82f6';
    document.body.appendChild(el);
    await el.updateComplete;
    const row = el.querySelector('.qf-replace-row');
    const swatch = el.querySelector('.qf-replace-swatch');
    const body = el.querySelector('.qf-replace-body');
    expect(swatch).not.toBeNull();
    // swatch must come after body in DOM order
    const children = Array.from(row!.children);
    expect(children.indexOf(swatch as Element)).toBeGreaterThan(children.indexOf(body as Element));
    el.remove();
  });

  it('renders hex in .qf-modal-hex when hex prop is set', async () => {
    const el = document.createElement('specd-radio-row') as any;
    el.label = 'color/blue';
    el.collection = 'Semantic';
    el.hex = '#3B82F6';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.qf-modal-hex')?.textContent?.trim()).toBe('#3B82F6');
    el.remove();
  });

  it('adds .selected class when checked=true', async () => {
    const el = document.createElement('specd-radio-row') as any;
    el.label = 'color/primary';
    el.checked = true;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.qf-replace-row')?.classList.contains('selected')).toBe(true);
    el.remove();
  });

  it('fires specd-change with value on click', async () => {
    const el = document.createElement('specd-radio-row') as any;
    el.value = 'opt-1';
    el.label = 'Option 1';
    document.body.appendChild(el);
    await el.updateComplete;
    let detail: any = null;
    el.addEventListener('specd-change', (e: any) => { detail = e.detail; });
    el.querySelector('.qf-replace-row').click();
    await el.updateComplete;
    expect(detail?.value).toBe('opt-1');
    el.remove();
  });

  it('does NOT render a type chip (no .qf-type-tag)', async () => {
    const el = document.createElement('specd-radio-row') as any;
    el.label = 'color/primary';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.qf-type-tag')).toBeNull();
    el.remove();
  });
});
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
cd /Users/home/Desktop/code/admiral-ds && npm test -- RadioRow --reporter=verbose 2>&1 | tail -20
```

Expected: errors — `specd-radio-row` not defined.

- [ ] **Step 3: Create SpecdRadioRow.ts**

Create `src/components/RadioRow/SpecdRadioRow.ts`:

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * Specd DS — RadioRow
 *
 * A selectable replacement option row. Used in the Quick Fix wizard and
 * Variable Picker to let the user choose between token candidates.
 *
 * Layout: [radio indicator] [body: name + collection + hex] [color swatch]
 *
 * @element specd-radio-row
 *
 * @attr {string}  value      - Unique value for this option (used in specd-change event)
 * @attr {boolean} checked    - Whether this row is currently selected
 * @attr {string}  label      - Variable / token name (primary text)
 * @attr {string}  collection - Collection name shown below the label
 * @attr {string}  color      - CSS color value for the preview swatch (optional)
 * @attr {string}  hex        - Hex string shown inline in the collection line (optional)
 *
 * @fires specd-change - User clicked the row; detail: { value: string }
 */
@customElement('specd-radio-row')
export class SpecdRadioRow extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) value: string = '';
  @property({ type: Boolean }) checked: boolean = false;
  @property({ type: String }) label: string = '';
  @property({ type: String }) collection: string = '';
  @property({ type: String }) color: string = '';
  @property({ type: String }) hex: string = '';

  private _handleClick() {
    this.checked = true;
    this.dispatchEvent(new CustomEvent('specd-change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    return html`
      <button
        class="qf-replace-row${this.checked ? ' selected' : ''}"
        type="button"
        @click=${this._handleClick}
      >
        <span class="qf-replace-radio"></span>
        <div class="qf-replace-body">
          <div class="qf-replace-name">${this.label}</div>
          ${this.collection ? html`
            <div class="qf-replace-collection">
              ${this.collection}
              ${this.hex ? html`<span class="qf-modal-hex">${this.hex}</span>` : nothing}
            </div>
          ` : nothing}
        </div>
        ${this.color ? html`
          <span class="qf-replace-swatch" style=${styleMap({ background: this.color })}></span>
        ` : nothing}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-radio-row': SpecdRadioRow; }
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
cd /Users/home/Desktop/code/admiral-ds && npm test -- RadioRow --reporter=verbose 2>&1 | tail -20
```

Expected: all 8 tests pass.

- [ ] **Step 5: Create SpecdRadioRow.stories.ts**

Create `src/components/RadioRow/SpecdRadioRow.stories.ts`:

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdRadioRow.js';

const meta: Meta = {
  title: 'Molecules/RadioRow',
  component: 'specd-radio-row',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="width:320px;display:flex;flex-direction:column;gap:4px;padding:16px;">
      <specd-radio-row
        value="a"
        label="theme/background"
        collection="Theme · Primary"
        color="#1d4ed8"
        hex="#1D4ED8"
        checked
      ></specd-radio-row>
      <specd-radio-row
        value="b"
        label="semantic/fill/primary"
        collection="Semantic · Fills"
        color="#2563eb"
        hex="#2563EB"
      ></specd-radio-row>
      <specd-radio-row
        value="c"
        label="primitives/blue-500"
        collection="Primitives"
        color="#3b82f6"
        hex="#3B82F6"
      ></specd-radio-row>
    </div>
  `,
};

export const NoSwatch: Story = {
  render: () => html`
    <div style="width:320px;display:flex;flex-direction:column;gap:4px;padding:16px;">
      <specd-radio-row value="sp1" label="spacing/300" collection="Spacing scale" checked></specd-radio-row>
      <specd-radio-row value="sp2" label="spacing/400" collection="Spacing scale"></specd-radio-row>
    </div>
  `,
};
```

- [ ] **Step 6: Delete the old QfReplaceRow directory**

```bash
rm -rf /Users/home/Desktop/code/admiral-ds/src/components/QfReplaceRow
```

- [ ] **Step 7: Update src/index.ts**

Remove the `SpecdQfReplaceRow` export and add `SpecdRadioRow`:

Find and replace in `src/index.ts`:
- Remove: `export { SpecdQfReplaceRow }    from './components/QfReplaceRow/SpecdQfReplaceRow.js';`
- Add: `export { SpecdRadioRow }     from './components/RadioRow/SpecdRadioRow.js';`

- [ ] **Step 8: Update src/react.ts**

Find and replace in `src/react.ts`:
- Remove: `import { SpecdQfReplaceRow }    from './components/QfReplaceRow/SpecdQfReplaceRow.js';`
- Add: `import { SpecdRadioRow }     from './components/RadioRow/SpecdRadioRow.js';`

Replace the `QfReplaceRow` export block:
```typescript
// Remove:
export const QfReplaceRow = createComponent({
  tagName: 'specd-qf-replace-row',
  elementClass: SpecdQfReplaceRow,
  react: React,
});

// Add:
export const RadioRow = createComponent({
  tagName: 'specd-radio-row',
  elementClass: SpecdRadioRow,
  react: React,
});
```

- [ ] **Step 9: Run full test suite to ensure no regressions**

```bash
cd /Users/home/Desktop/code/admiral-ds && npm test 2>&1 | tail -10
```

Expected: all tests pass (QfReplaceRow tests gone, RadioRow tests in).

- [ ] **Step 10: Commit**

```bash
cd /Users/home/Desktop/code/admiral-ds && git add src/components/RadioRow/ src/components/QfReplaceRow/ src/index.ts src/react.ts && git commit -m "feat(radio-row): rename QfReplaceRow→RadioRow, fix structure to button+custom-radio+swatch-right"
```

---

## Task 3: PropFixRow — Rebuild Header and Slot Structure

**Reference:** `issues.html` lines 200–285. The header row shows [icon SVG | layer button | › | attr text | count text]. The slot row shows [current swatch+value | → | varname + match-tag + chevron | Apply button].

**What changes in SpecdPropFixRow:**
- Remove `current` and `label` props
- Add `layer: string` (layer path, e.g. "Button/Primary/Default")
- Add `attr: string` (attribute name, e.g. "background fill")
- Add `count: string` (e.g. "1 layer", "3 layers")
- Icon SVG auto-derived from `prop` type (fill/stroke=rect, spacing=arrows, typography=text)
- Fires `specd-layer-jump` when layer button is clicked
- Slot remains for PropFixSlot/PropFixCreate children

**What changes in SpecdPropFixSlot:**
- Add `current: string` — current raw value text
- Add `currentcolor: string` — color for current swatch (optional)
- Add `matchtype: 'exact' | 'closest' | 'none' | ''` — match quality badge
- Rename existing `selected` → `applied`
- Add `count: string` — count shown on Apply button badge (optional)
- Fires `specd-jump` when varname link is clicked

**Files:**
- Modify: `src/components/PropFixRow/SpecdPropFixRow.ts`
- Modify: `src/components/PropFixRow/SpecdPropFixSlot.ts`
- Modify: `src/components/PropFixRow/SpecdPropFixRow.stories.ts`
- Modify: `src/components/PropFixRow/SpecdPropFixRow.test.ts`

- [ ] **Step 1: Write the failing tests**

Replace `src/components/PropFixRow/SpecdPropFixRow.test.ts`:

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdPropFixRow.js');
  await import('./SpecdPropFixSlot.js');
  await import('./SpecdPropFixCreate.js');
});

describe('SpecdPropFixRow', () => {
  it('renders .prop-fix-row with .prop-fix-hdr', async () => {
    const el = document.createElement('specd-prop-fix-row') as any;
    el.prop = 'fill';
    el.layer = 'Button/Primary/Default';
    el.attr = 'background fill';
    el.count = '1 layer';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.prop-fix-row')).not.toBeNull();
    expect(el.querySelector('.prop-fix-hdr')).not.toBeNull();
    el.remove();
  });

  it('renders .prop-fix-layer button with layer text', async () => {
    const el = document.createElement('specd-prop-fix-row') as any;
    el.layer = 'Input/Text/Default';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.prop-fix-layer')?.textContent?.trim()).toBe('Input/Text/Default');
    el.remove();
  });

  it('renders .prop-fix-attr with attr text', async () => {
    const el = document.createElement('specd-prop-fix-row') as any;
    el.attr = 'border stroke';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.prop-fix-attr')?.textContent?.trim()).toBe('border stroke');
    el.remove();
  });

  it('renders .prop-fix-count with count text', async () => {
    const el = document.createElement('specd-prop-fix-row') as any;
    el.count = '3 layers';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.prop-fix-count')?.textContent?.trim()).toBe('3 layers');
    el.remove();
  });

  it('renders .prop-fix-icon with SVG', async () => {
    const el = document.createElement('specd-prop-fix-row') as any;
    el.prop = 'fill';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.prop-fix-icon svg')).not.toBeNull();
    el.remove();
  });

  it('fires specd-layer-jump when layer button is clicked', async () => {
    const el = document.createElement('specd-prop-fix-row') as any;
    el.layer = 'Button/Primary';
    document.body.appendChild(el);
    await el.updateComplete;
    let fired = false;
    el.addEventListener('specd-layer-jump', () => { fired = true; });
    el.querySelector('.prop-fix-layer').click();
    expect(fired).toBe(true);
    el.remove();
  });
});

describe('SpecdPropFixSlot', () => {
  it('renders .prop-fix-slot with current value', async () => {
    const el = document.createElement('specd-prop-fix-slot') as any;
    el.current = '#3b82f6';
    el.varname = 'color/brand/blue';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.prop-fix-slot')).not.toBeNull();
    expect(el.querySelector('.prop-fix-current')?.textContent).toContain('#3b82f6');
    el.remove();
  });

  it('renders color swatch when currentcolor is set', async () => {
    const el = document.createElement('specd-prop-fix-slot') as any;
    el.current = '#3b82f6';
    el.currentcolor = '#3b82f6';
    el.varname = 'color/brand/blue';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.prop-fix-current .prop-fix-swatch')).not.toBeNull();
    el.remove();
  });

  it('renders .prop-fix-varname with variable name', async () => {
    const el = document.createElement('specd-prop-fix-slot') as any;
    el.varname = 'color/border/default';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.prop-fix-varname')?.textContent?.trim()).toBe('color/border/default');
    el.remove();
  });

  it('renders .prop-fix-match-tag with matchtype class', async () => {
    const el = document.createElement('specd-prop-fix-slot') as any;
    el.varname = 'color/brand/blue';
    el.matchtype = 'exact';
    document.body.appendChild(el);
    await el.updateComplete;
    const tag = el.querySelector('.prop-fix-match-tag');
    expect(tag).not.toBeNull();
    expect(tag?.classList.contains('exact')).toBe(true);
    el.remove();
  });

  it('shows Applied state when applied=true', async () => {
    const el = document.createElement('specd-prop-fix-slot') as any;
    el.varname = 'spacing/300';
    el.applied = true;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.prop-fix-btn.applied')).not.toBeNull();
    el.remove();
  });

  it('fires specd-apply with varname on Apply click', async () => {
    const el = document.createElement('specd-prop-fix-slot') as any;
    el.varname = 'color/lime/400';
    document.body.appendChild(el);
    await el.updateComplete;
    let detail: any = null;
    el.addEventListener('specd-apply', (e: any) => { detail = e.detail; });
    el.querySelector('.prop-fix-btn').click();
    expect(detail?.varname).toBe('color/lime/400');
    el.remove();
  });

  it('fires specd-jump when varname link is clicked', async () => {
    const el = document.createElement('specd-prop-fix-slot') as any;
    el.varname = 'color/brand/blue';
    document.body.appendChild(el);
    await el.updateComplete;
    let fired = false;
    el.addEventListener('specd-jump', () => { fired = true; });
    el.querySelector('.prop-fix-layer-link').click();
    expect(fired).toBe(true);
    el.remove();
  });
});

describe('SpecdPropFixCreate', () => {
  it('renders create label with value', async () => {
    const el = document.createElement('specd-prop-fix-create') as any;
    el.value = '#ff0000';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.prop-fix-create-label')?.textContent).toContain('#ff0000');
    el.remove();
  });

  it('fires specd-create on click', async () => {
    const el = document.createElement('specd-prop-fix-create') as any;
    el.value = '#cccccc';
    document.body.appendChild(el);
    await el.updateComplete;
    let detail: any = null;
    el.addEventListener('specd-create', (e: any) => { detail = e.detail; });
    el.querySelector('.prop-fix-btn').click();
    expect(detail?.value).toBe('#cccccc');
    el.remove();
  });
});
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
cd /Users/home/Desktop/code/admiral-ds && npm test -- PropFixRow --reporter=verbose 2>&1 | tail -20
```

Expected: multiple failures — missing `.prop-fix-layer`, `.prop-fix-attr`, `.prop-fix-count`, `.prop-fix-current`, `.prop-fix-varname`, `.prop-fix-layer-link`.

- [ ] **Step 3: Rebuild SpecdPropFixRow.ts**

Replace `src/components/PropFixRow/SpecdPropFixRow.ts`:

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export type PropFixRowProp = 'fill' | 'typography' | 'spacing' | 'stroke';

const ICON_FILL     = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/></svg>`;
const ICON_STROKE   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/></svg>`;
const ICON_SPACING  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><polyline points="5 8 2 12 5 16"/><polyline points="19 8 22 12 19 16"/><line x1="2" y1="12" x2="22" y2="12"/></svg>`;
const ICON_TYPO     = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>`;

function iconFor(prop: PropFixRowProp): string {
  if (prop === 'spacing')    return ICON_SPACING;
  if (prop === 'typography') return ICON_TYPO;
  if (prop === 'stroke')     return ICON_STROKE;
  return ICON_FILL;
}

/**
 * Specd DS — PropFixRow
 *
 * Header row for a hard-coded value fix. Shows: property icon, layer path,
 * attribute type, and instance count. Slot accepts PropFixSlot / PropFixCreate children.
 *
 * @element specd-prop-fix-row
 *
 * @attr {string} prop  - Property type: fill | typography | spacing | stroke
 * @attr {string} layer - Layer path shown as a clickable button (e.g. "Button/Primary/Default")
 * @attr {string} attr  - Attribute label (e.g. "background fill", "border stroke")
 * @attr {string} count - Instance count label (e.g. "1 layer", "3 layers")
 *
 * @fires specd-layer-jump - User clicked the layer path button
 */
@customElement('specd-prop-fix-row')
export class SpecdPropFixRow extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) prop: PropFixRowProp = 'fill';
  @property({ type: String }) layer: string = '';
  @property({ type: String }) attr: string = '';
  @property({ type: String }) count: string = '';

  override render() {
    return html`
      <div class="prop-fix-row">
        <div class="prop-fix-content">
          <div class="prop-fix-hdr">
            <span class="prop-fix-icon">${unsafeHTML(iconFor(this.prop))}</span>
            ${this.layer ? html`
              <button
                class="prop-fix-layer"
                type="button"
                @click=${(e: Event) => {
                  e.stopPropagation();
                  this.dispatchEvent(new CustomEvent('specd-layer-jump', { bubbles: true, composed: true }));
                }}
              >${this.layer}</button>
              <span class="prop-fix-arrow">›</span>
            ` : nothing}
            ${this.attr ? html`<span class="prop-fix-attr">${this.attr}</span>` : nothing}
            ${this.count ? html`<span class="prop-fix-count">${this.count}</span>` : nothing}
          </div>
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-prop-fix-row': SpecdPropFixRow; }
}
```

- [ ] **Step 4: Rebuild SpecdPropFixSlot.ts**

Replace `src/components/PropFixRow/SpecdPropFixSlot.ts`:

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

export type PropFixMatchType = 'exact' | 'closest' | 'none' | '';

const CHECK_SVG = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

/**
 * Specd DS — PropFixSlot
 *
 * A single token-suggestion row inside a PropFixRow.
 * Layout: [current value] → [suggested variable + match badge + chevron] [Apply button]
 *
 * @element specd-prop-fix-slot
 *
 * @attr {string}  current      - Current raw value text (e.g. "#3b82f6", "12px")
 * @attr {string}  currentcolor - Hex/CSS color for the current value swatch (optional)
 * @attr {string}  varname      - Suggested variable name
 * @attr {string}  color        - Hex/CSS color for the suggestion swatch (optional)
 * @attr {string}  matchtype    - Match quality: exact | closest | none | '' (no badge)
 * @attr {boolean} applied      - Applied/selected state — shows green Applied button
 * @attr {string}  count        - Optional count badge on Apply button
 *
 * @fires specd-apply - User clicked Apply; detail: { varname: string }
 * @fires specd-jump  - User clicked the variable name link
 */
@customElement('specd-prop-fix-slot')
export class SpecdPropFixSlot extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) current: string = '';
  @property({ type: String }) currentcolor: string = '';
  @property({ type: String }) varname: string = '';
  @property({ type: String }) color: string = '';
  @property({ type: String }) matchtype: PropFixMatchType = '';
  @property({ type: Boolean }) applied: boolean = false;
  @property({ type: String }) count: string = '';

  override render() {
    return html`
      <div class="prop-fix-slot${this.applied ? ' applied' : ''}">

        <!-- Current value -->
        ${this.current ? html`
          <span class="prop-fix-current">
            ${this.currentcolor ? html`
              <span class="prop-fix-swatch" style=${styleMap({ background: this.currentcolor, width: '10px', height: '10px', borderRadius: '2px', border: '1px solid rgba(0,0,0,0.1)', flexShrink: '0', display: 'inline-block' })}></span>
            ` : nothing}
            <span style="font-family:var(--font-mono);font-size:10px;color:#0c1f3f;">${this.current}</span>
          </span>
          <span class="prop-fix-arrow">→</span>
        ` : nothing}

        <!-- Suggested variable -->
        <span class="prop-fix-suggest">
          ${this.color ? html`
            <span class="prop-fix-swatch" style=${styleMap({ background: this.color, width: '10px', height: '10px', borderRadius: '2px', border: '1px solid rgba(0,0,0,0.1)', flexShrink: '0', display: 'inline-block' })}></span>
          ` : nothing}
          <button
            class="prop-fix-layer-link"
            type="button"
            @click=${(e: Event) => {
              e.stopPropagation();
              this.dispatchEvent(new CustomEvent('specd-jump', { bubbles: true, composed: true }));
            }}
          >${this.varname}</button>
          ${this.matchtype ? html`
            <span class="prop-fix-match-tag ${this.matchtype}">${this.matchtype.toUpperCase()}</span>
          ` : nothing}
          <span class="prop-fix-chevron">›</span>
        </span>

        <!-- Apply button -->
        ${this.applied
          ? html`
            <button class="prop-fix-btn applied" type="button" disabled>
              <span class="prop-fix-swatch" style="display:inline-block;"></span>
              Applied
            </button>
          `
          : html`
            <button
              class="prop-fix-btn"
              type="button"
              @click=${(e: Event) => {
                e.stopPropagation();
                this.dispatchEvent(new CustomEvent('specd-apply', {
                  detail: { varname: this.varname },
                  bubbles: true,
                  composed: true,
                }));
              }}
            >Apply${this.count ? html` <span class="prop-fix-btn-badge">${this.count}</span>` : nothing}</button>
          `
        }

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-prop-fix-slot': SpecdPropFixSlot; }
}
```

- [ ] **Step 5: Run tests to confirm they pass**

```bash
cd /Users/home/Desktop/code/admiral-ds && npm test -- PropFixRow --reporter=verbose 2>&1 | tail -20
```

Expected: all tests pass.

- [ ] **Step 6: Update stories**

Replace `src/components/PropFixRow/SpecdPropFixRow.stories.ts`:

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdPropFixRow.js';
import './SpecdPropFixSlot.js';
import './SpecdPropFixCreate.js';

const meta: Meta = {
  title: 'Molecules/PropFixRow',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const FillWithSuggestion: Story = {
  render: () => html`
    <div style="width:360px;padding:16px;">
      <specd-prop-fix-row prop="fill" layer="Input/Text/Default" attr="background fill" count="1 layer">
        <specd-prop-fix-slot
          current="#3b82f6"
          currentcolor="#3b82f6"
          varname="color/brand/blue-500"
          color="#3b82f6"
          matchtype="exact"
        ></specd-prop-fix-slot>
      </specd-prop-fix-row>
    </div>
  `,
};

export const StrokeClosestMatch: Story = {
  render: () => html`
    <div style="width:360px;padding:16px;">
      <specd-prop-fix-row prop="stroke" layer="Input/Text/Default" attr="border stroke" count="1 layer">
        <specd-prop-fix-slot
          current="#d1d5db"
          currentcolor="#d1d5db"
          varname="color/border/default"
          color="#d1d5db"
          matchtype="closest"
        ></specd-prop-fix-slot>
      </specd-prop-fix-row>
    </div>
  `,
};

export const SpacingApplied: Story = {
  render: () => html`
    <div style="width:360px;padding:16px;">
      <specd-prop-fix-row prop="spacing" layer="Input/Text/Default" attr="padding horizontal" count="3 layers">
        <specd-prop-fix-slot
          current="12px"
          varname="spacing/300"
          applied
        ></specd-prop-fix-slot>
      </specd-prop-fix-row>
    </div>
  `,
};

export const NoMatch: Story = {
  render: () => html`
    <div style="width:360px;padding:16px;">
      <specd-prop-fix-row prop="fill" layer="Badge/Count" attr="background fill" count="2 layers">
        <specd-prop-fix-create value="#ab12cd"></specd-prop-fix-create>
      </specd-prop-fix-row>
    </div>
  `,
};
```

- [ ] **Step 7: Run full test suite**

```bash
cd /Users/home/Desktop/code/admiral-ds && npm test 2>&1 | tail -10
```

Expected: all tests pass.

- [ ] **Step 8: Commit**

```bash
cd /Users/home/Desktop/code/admiral-ds && git add src/components/PropFixRow/ && git commit -m "feat(prop-fix-row): rebuild header props (layer/attr/count) and full slot structure with current→suggest→apply"
```

---

## Task 4: ChoiceCard — Add Missing Arrow Element

**Reference:** `src/tokens/components.css` lines 890–894 — `.choice-card-arrow { position:absolute; top:14px; right:14px; }`. The arrow is a chevron-right SVG (20×20). The button element already has `position:relative` from the card CSS.

**Files:**
- Modify: `src/components/ChoiceCard/SpecdChoiceCard.ts`
- Modify: `src/components/ChoiceCard/SpecdChoiceCard.test.ts`

- [ ] **Step 1: Write the failing test**

Read `src/components/ChoiceCard/SpecdChoiceCard.test.ts` and add:

```typescript
it('renders .choice-card-arrow element', async () => {
  const el = document.createElement('specd-choice-card') as any;
  el.title = 'Import Variables';
  document.body.appendChild(el);
  await el.updateComplete;
  expect(el.querySelector('.choice-card-arrow')).not.toBeNull();
  expect(el.querySelector('.choice-card-arrow svg')).not.toBeNull();
  el.remove();
});
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
cd /Users/home/Desktop/code/admiral-ds && npm test -- ChoiceCard --reporter=verbose 2>&1 | tail -20
```

Expected: 1 failure — `.choice-card-arrow` not found.

- [ ] **Step 3: Add arrow to SpecdChoiceCard render()**

In `src/components/ChoiceCard/SpecdChoiceCard.ts`, add the `ARROW_SVG` constant after the imports:

```typescript
const ARROW_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
```

Then in the `render()` method, add the arrow element as the first child inside the `<button>` (before the icon div), using `unsafeHTML`:

```typescript
// Add inside the button, as first child:
html`<span class="choice-card-arrow">${unsafeHTML(ARROW_SVG)}</span>`
```

The full updated `render()` method:

```typescript
override render() {
  const iconClass = [
    'choice-card-icon',
    this.iconvariant === 'gradient' ? 'gradient' : '',
  ].filter(Boolean).join(' ');

  const pillClass = [
    'choice-card-pill',
    this.pillcolor === 'blue' ? 'blue' : 'mint',
  ].filter(Boolean).join(' ');

  return html`
    <button class="choice-card ${this.variant === 'gradient' ? 'gradient' : ''}" type="button" ?disabled=${this.disabled}>
      <span class="choice-card-arrow">${unsafeHTML(ARROW_SVG)}</span>
      ${this.icon ? html`<div class=${iconClass}>${unsafeHTML(this.icon)}</div>` : nothing}
      <div class="choice-card-title">${this.title}</div>
      ${this.description ? html`<div class="choice-card-desc">${this.description}</div>` : nothing}
      ${this.pill ? html`<div class=${pillClass}>${this.pill}</div>` : nothing}
      <slot></slot>
    </button>
  `;
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
cd /Users/home/Desktop/code/admiral-ds && npm test -- ChoiceCard --reporter=verbose 2>&1 | tail -20
```

Expected: all tests pass including new arrow test.

- [ ] **Step 5: Run full test suite**

```bash
cd /Users/home/Desktop/code/admiral-ds && npm test 2>&1 | tail -10
```

Expected: all tests pass.

- [ ] **Step 6: Commit**

```bash
cd /Users/home/Desktop/code/admiral-ds && git add src/components/ChoiceCard/ && git commit -m "fix(choice-card): add missing choice-card-arrow element (chevron top-right)"
```

---

## Task 5: IssuePreviewCard — Rename Existing IssueRow

**What this does:** Creates `specd-issue-preview-card` (the panel-style issue card with tags, severity badge, and footer). This frees up the `specd-issue-row` tag name and `IssueRow` directory for Task 6's new action-state component.

**Files:**
- Create: `src/components/IssuePreviewCard/SpecdIssuePreviewCard.ts`
- Create: `src/components/IssuePreviewCard/SpecdIssuePreviewCard.stories.ts`
- Create: `src/components/IssuePreviewCard/SpecdIssuePreviewCard.test.ts`
- Modify: `src/index.ts`
- Modify: `src/react.ts`

- [ ] **Step 1: Write the failing test**

Create `src/components/IssuePreviewCard/SpecdIssuePreviewCard.test.ts`:

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdIssuePreviewCard.js');
  await import('../IgnoreFooter/SpecdIgnoreFooter.js');
});

describe('SpecdIssuePreviewCard', () => {
  it('renders .issue-card with default state', async () => {
    const el = document.createElement('specd-issue-preview-card') as any;
    el.component = 'Button/Primary';
    el.type = 'Missing desc';
    el.severity = 'crit';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.issue-card')).not.toBeNull();
    expect(el.getAttribute('data-row-state')).toBe('default');
    el.remove();
  });

  it('renders component name in .issue-comp-tag', async () => {
    const el = document.createElement('specd-issue-preview-card') as any;
    el.component = 'Card/Default';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.issue-comp-tag')?.textContent?.trim()).toContain('Card/Default');
    el.remove();
  });

  it('renders severity badge with correct class', async () => {
    const el = document.createElement('specd-issue-preview-card') as any;
    el.severity = 'crit';
    el.type = 'Missing desc';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.issue-card-count')?.className).toContain('crit');
    el.remove();
  });

  it('renders tags from JSON', async () => {
    const el = document.createElement('specd-issue-preview-card') as any;
    el.tags = JSON.stringify([
      { label: 'No description', sev: 'crit' },
      { label: 'Published', sev: 'neutral' },
    ]);
    document.body.appendChild(el);
    await el.updateComplete;
    const tagEls = el.querySelectorAll('specd-tag');
    expect(tagEls.length).toBe(2);
    el.remove();
  });

  it('shows footer with Jump button in default state', async () => {
    const el = document.createElement('specd-issue-preview-card') as any;
    el.component = 'Button/Primary';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.issue-card-footer')).not.toBeNull();
    expect(el.querySelector('specd-jump-btn')).not.toBeNull();
    el.remove();
  });

  it('transitions to ignore state on Ignore… click', async () => {
    const el = document.createElement('specd-issue-preview-card') as any;
    el.component = 'Button/Primary';
    document.body.appendChild(el);
    await el.updateComplete;
    el.querySelector('.btn-ghost').click();
    await el.updateComplete;
    expect(el.getAttribute('data-row-state')).toBe('ignore');
    expect(el.querySelector('specd-ignore-footer')).not.toBeNull();
    el.remove();
  });
});
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
cd /Users/home/Desktop/code/admiral-ds && npm test -- IssuePreviewCard --reporter=verbose 2>&1 | tail -10
```

Expected: all 6 tests fail — `specd-issue-preview-card` not defined.

- [ ] **Step 3: Create SpecdIssuePreviewCard.ts**

Create `src/components/IssuePreviewCard/SpecdIssuePreviewCard.ts` — this is the existing `SpecdIssueRow.ts` with class name and `@customElement` tag updated:

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../IgnoreFooter/SpecdIgnoreFooter.js';
import '../Tag/SpecdTag.js';
import '../JumpBtn/SpecdJumpBtn.js';

export type IssuePreviewCardState    = 'default' | 'ignore';
export type IssuePreviewCardSeverity = 'crit' | 'warn' | 'info';

interface IssueTag { label: string; sev?: 'crit' | 'warn' | 'info' | 'neutral'; }

const DIAMOND_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" style="width:14px;height:14px;flex-shrink:0;color:var(--icon-secondary)"><path d="M12 3l9 9-9 9-9-9 9-9z"/></svg>`;

/**
 * Specd DS — IssuePreviewCard
 *
 * A component-level issue card for the Issues panel. Shows component name,
 * severity badge, issue tags, and footer actions (jump, view-fixes, ignore).
 *
 * @element specd-issue-preview-card
 *
 * @attr {string}  component  - Component name (e.g. "Button/Primary")
 * @attr {string}  type       - Badge label (e.g. "Missing desc", "Hard-coded")
 * @attr {string}  count      - Badge count value ("!" for crit, number for others)
 * @attr {string}  severity   - crit | warn | info
 * @attr {string}  tags       - JSON: [{label, sev}]
 * @attr {boolean} showfixes  - Show the "View Fixes" button in the footer
 * @attr {string}  rowstate   - Initial state: default | ignore
 *
 * @fires specd-jump          - Jump to canvas
 * @fires specd-fixes         - View Fixes clicked
 * @fires specd-ignore-all    - Ignore confirmed
 * @fires specd-ignore-cancel - Ignore cancelled
 */
@customElement('specd-issue-preview-card')
export class SpecdIssuePreviewCard extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) component: string              = '';
  @property({ type: String }) type: string                   = '';
  @property({ type: String }) count: string                  = '';
  @property({ type: String }) severity: IssuePreviewCardSeverity = 'info';
  @property({ type: String }) tags: string                   = '[]';
  @property({ type: Boolean }) showfixes: boolean            = false;
  @property({ type: String }) rowstate: IssuePreviewCardState = 'default';

  @state() private _state: IssuePreviewCardState = 'default';

  override connectedCallback() {
    super.connectedCallback();
    this._state = this.rowstate;
    this._syncAttr();
  }

  private _syncAttr() { this.setAttribute('data-row-state', this._state); }
  private _setState(s: IssuePreviewCardState) { this._state = s; this._syncAttr(); }

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
        <div class="issue-content">
          <div class="issue-card-top">
            <span class="issue-comp-tag">
              ${unsafeHTML(DIAMOND_SVG)}
              ${this.component || 'Unknown component'}
            </span>
            ${this.type ? html`
              <span class="issue-card-count ${this.severity}">
                ${this.type}
                ${badgeCount ? html`<span class="issue-card-count-badge">${badgeCount}</span>` : nothing}
              </span>
            ` : nothing}
          </div>
          ${parsedTags.length ? html`
            <div class="issue-tag-row">
              ${parsedTags.map(t => html`
                <specd-tag label=${t.label} intent=${t.sev ?? this.severity}></specd-tag>
              `)}
            </div>
          ` : nothing}
        </div>

        ${this._state === 'default' ? html`
          <div class="issue-card-footer">
            <specd-jump-btn
              label="Jump to component"
              @click=${(e: Event) => { e.stopPropagation(); this._fire('specd-jump'); }}
            ></specd-jump-btn>
            ${this.showfixes ? html`
              <button class="btn-view-fixes" type="button"
                @click=${(e: Event) => { e.stopPropagation(); this._fire('specd-fixes'); }}>
                View Fixes
                ${badgeCount && badgeCount !== '!' ? html`<span class="view-fixes-count">${badgeCount}</span>` : nothing}
              </button>
            ` : nothing}
            <button class="btn-ghost" type="button"
              style="margin-left:${this.showfixes ? '0' : 'auto'}"
              @click=${(e: Event) => { e.stopPropagation(); this._setState('ignore'); }}>
              Ignore…
            </button>
          </div>
        ` : nothing}

        ${this._state === 'ignore' ? html`
          <specd-ignore-footer
            @specd-ignore-all=${(e: Event) => {
              e.stopPropagation();
              this._fire('specd-ignore-all');
              this._setState('default');
            }}
            @specd-ignore-cancel=${(e: Event) => {
              e.stopPropagation();
              this._fire('specd-ignore-cancel');
              this._setState('default');
            }}
          ></specd-ignore-footer>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-issue-preview-card': SpecdIssuePreviewCard; }
}
```

- [ ] **Step 4: Create SpecdIssuePreviewCard.stories.ts**

Create `src/components/IssuePreviewCard/SpecdIssuePreviewCard.stories.ts`:

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdIssuePreviewCard.js';

const meta: Meta = {
  title: 'Organisms/IssuePreviewCard',
  component: 'specd-issue-preview-card',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const tags = (arr: { label: string; sev?: string }[]) => JSON.stringify(arr);

export const Critical: Story = {
  render: () => html`
    <div style="width:420px;padding:12px;">
      <specd-issue-preview-card
        component="Button/Primary"
        type="Missing desc"
        severity="crit"
        tags=${tags([{ label: 'No description', sev: 'crit' }, { label: 'Published', sev: 'neutral' }])}
      ></specd-issue-preview-card>
    </div>
  `,
};

export const Warning: Story = {
  render: () => html`
    <div style="width:420px;padding:12px;">
      <specd-issue-preview-card
        component="Input/Text"
        type="Hard-coded"
        count="5"
        severity="warn"
        showfixes
        tags=${tags([{ label: 'HC colours', sev: 'warn' }, { label: 'HC spacing', sev: 'warn' }])}
      ></specd-issue-preview-card>
    </div>
  `,
};

export const IgnoreState: Story = {
  render: () => html`
    <div style="width:420px;padding:12px;">
      <specd-issue-preview-card
        component="Chip/Filter"
        type="No status"
        severity="info"
        rowstate="ignore"
        tags=${tags([{ label: 'Dev status not set', sev: 'info' }])}
      ></specd-issue-preview-card>
    </div>
  `,
};
```

- [ ] **Step 5: Run tests to confirm they pass**

```bash
cd /Users/home/Desktop/code/admiral-ds && npm test -- IssuePreviewCard --reporter=verbose 2>&1 | tail -20
```

Expected: all 6 tests pass.

- [ ] **Step 6: Update src/index.ts**

Add after existing IssueRow export:
```typescript
export { SpecdIssuePreviewCard } from './components/IssuePreviewCard/SpecdIssuePreviewCard.js';
export type { IssuePreviewCardState, IssuePreviewCardSeverity } from './components/IssuePreviewCard/SpecdIssuePreviewCard.js';
```

- [ ] **Step 7: Update src/react.ts**

Add import:
```typescript
import { SpecdIssuePreviewCard } from './components/IssuePreviewCard/SpecdIssuePreviewCard.js';
```

Add export:
```typescript
export const IssuePreviewCard = createComponent({
  tagName: 'specd-issue-preview-card',
  elementClass: SpecdIssuePreviewCard,
  react: React,
});
```

- [ ] **Step 8: Run full test suite**

```bash
cd /Users/home/Desktop/code/admiral-ds && npm test 2>&1 | tail -10
```

Expected: all tests pass.

- [ ] **Step 9: Commit**

```bash
cd /Users/home/Desktop/code/admiral-ds && git add src/components/IssuePreviewCard/ src/index.ts src/react.ts && git commit -m "feat(issue-preview-card): rename IssueRow→IssuePreviewCard, new specd-issue-preview-card tag"
```

---

## Task 6: New IssueRow — Action State Machine

**Reference:** `specd-ds.css` lines 989–1128. Five field types × three states (initial/editing/applied). CSS state machine at lines 1016–1021 hides `.row-state-editing` and `.row-state-applied` sections based on `data-row-state` attribute.

**Field types and their behaviours:**

| `fieldtype`     | Icon class   | Initial CTA                     | Editing UI          | Event fired on CTA     |
|-----------------|--------------|---------------------------------|---------------------|------------------------|
| `doc-link`      | link         | Primary "Add doc link"          | `row-link-field`    | `specd-edit` → editing |
| `description`   | align-left   | AI gradient "Write with AI"     | `row-textarea-field.is-gradient` | `specd-ai-write` (no edit state) / editing via `specd-edit` |
| `dev-ready`     | check-circle | Primary "Mark dev ready"        | none — direct apply | `specd-save`           |
| `mark-complete` | check-square | Primary "Mark complete"         | none — direct apply | `specd-save`           |
| `hard-coded`    | code         | Ghost "View in Quick Fix"       | none                | `specd-quick-fix`      |

**Files:**
- Modify: `src/components/IssueRow/SpecdIssueRow.ts` (replace entirely)
- Modify: `src/components/IssueRow/SpecdIssueRow.stories.ts` (replace entirely)
- Modify: `src/components/IssueRow/SpecdIssueRow.test.ts` (replace entirely)
- Modify: `src/index.ts` — update IssueRow export to include new types
- Modify: `src/react.ts` — keep IssueRow export (elementClass stays SpecdIssueRow)

- [ ] **Step 1: Write the failing tests**

Replace `src/components/IssueRow/SpecdIssueRow.test.ts`:

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => { await import('./SpecdIssueRow.js'); });

describe('SpecdIssueRow', () => {
  it('renders .issue-row with data-row-state="initial" by default', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.fieldtype = 'doc-link';
    el.title = 'Add documentation link';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.issue-row')).not.toBeNull();
    expect(el.getAttribute('data-row-state')).toBe('initial');
    el.remove();
  });

  it('renders .issue-row-title with title text', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.title = 'Add documentation link';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.issue-row-title')?.textContent?.trim()).toContain('Add documentation link');
    el.remove();
  });

  it('renders .issue-row-desc with description text', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.description = 'No doc link set for this component.';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.issue-row-desc')?.textContent?.trim()).toContain('No doc link set');
    el.remove();
  });

  it('shows .row-state-initial CTA in initial state', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.fieldtype = 'doc-link';
    el.title = 'Add doc link';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.row-state-initial')).not.toBeNull();
    el.remove();
  });

  it('transitions to editing state when edit CTA clicked (doc-link)', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.fieldtype = 'doc-link';
    el.title = 'Add doc link';
    document.body.appendChild(el);
    await el.updateComplete;
    el.querySelector('.btn-row-primary')?.click();
    await el.updateComplete;
    expect(el.getAttribute('data-row-state')).toBe('editing');
    expect(el.querySelector('.row-link-field')).not.toBeNull();
    el.remove();
  });

  it('transitions to editing state for description fieldtype', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.fieldtype = 'description';
    el.title = 'Write description';
    document.body.appendChild(el);
    await el.updateComplete;
    el.querySelector('.btn-ai-gradient')?.click();
    await el.updateComplete;
    expect(el.getAttribute('data-row-state')).toBe('editing');
    expect(el.querySelector('.row-textarea-field')).not.toBeNull();
    el.remove();
  });

  it('transitions to applied state when save pill clicked', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.fieldtype = 'doc-link';
    el.title = 'Add doc link';
    document.body.appendChild(el);
    await el.updateComplete;
    // Go to editing first
    el.querySelector('.btn-row-primary')?.click();
    await el.updateComplete;
    // Click save
    el.querySelector('.btn-save-pill')?.click();
    await el.updateComplete;
    expect(el.getAttribute('data-row-state')).toBe('applied');
    expect(el.querySelector('.btn-row-applied')).not.toBeNull();
    el.remove();
  });

  it('returns to initial state when cancel pill clicked', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.fieldtype = 'doc-link';
    el.title = 'Add doc link';
    document.body.appendChild(el);
    await el.updateComplete;
    el.querySelector('.btn-row-primary')?.click();
    await el.updateComplete;
    el.querySelector('.btn-cancel-pill')?.click();
    await el.updateComplete;
    expect(el.getAttribute('data-row-state')).toBe('initial');
    el.remove();
  });

  it('goes directly to applied for dev-ready fieldtype (no edit state)', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.fieldtype = 'dev-ready';
    el.title = 'Mark dev ready';
    document.body.appendChild(el);
    await el.updateComplete;
    el.querySelector('.btn-row-primary')?.click();
    await el.updateComplete;
    expect(el.getAttribute('data-row-state')).toBe('applied');
    el.remove();
  });

  it('fires specd-quick-fix for hard-coded fieldtype', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.fieldtype = 'hard-coded';
    el.title = 'Hard-coded values';
    document.body.appendChild(el);
    await el.updateComplete;
    let fired = false;
    el.addEventListener('specd-quick-fix', () => { fired = true; });
    el.querySelector('.btn-row-primary')?.click();
    expect(fired).toBe(true);
    el.remove();
  });

  it('fires specd-save with value when saved', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.fieldtype = 'doc-link';
    el.title = 'Add doc link';
    document.body.appendChild(el);
    await el.updateComplete;
    let detail: any = null;
    el.addEventListener('specd-save', (e: any) => { detail = e.detail; });
    el.querySelector('.btn-row-primary')?.click();
    await el.updateComplete;
    el.querySelector('.btn-save-pill')?.click();
    await el.updateComplete;
    expect(detail?.fieldtype).toBe('doc-link');
    el.remove();
  });
});
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
cd /Users/home/Desktop/code/admiral-ds && npm test -- src/components/IssueRow --reporter=verbose 2>&1 | tail -20
```

Expected: failures — old `SpecdIssueRow` with `.issue-card` structure doesn't match `.issue-row` / `data-row-state` expectations.

- [ ] **Step 3: Replace SpecdIssueRow.ts**

Replace `src/components/IssueRow/SpecdIssueRow.ts` entirely:

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export type IssueRowFieldType =
  | 'doc-link'
  | 'description'
  | 'dev-ready'
  | 'mark-complete'
  | 'hard-coded';

export type IssueRowState = 'initial' | 'editing' | 'applied';

const ICON_LINK    = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;
const ICON_TEXT    = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>`;
const ICON_CHECK   = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
const ICON_CODE    = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
const SPARKLE_SVG  = `<svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor"><path d="M15.75 12C15.9498 12 16.1308 12.1186 16.209 12.3027L16.8809 13.8691L18.4473 14.541C18.6314 14.6192 18.75 14.8002 18.75 15C18.75 15.1998 18.6314 15.3808 18.4473 15.459L16.8809 16.1309L16.209 17.6973C16.1308 17.8814 15.9498 18 15.75 18C15.5502 18 15.3692 17.8814 15.291 17.6973L14.6191 16.1309L13.0527 15.459C12.8686 15.3808 12.75 15.1998 12.75 15C12.75 14.8002 12.8686 14.6192 13.0527 14.541L14.6191 13.8691L15.291 12.3027C15.3692 12.1186 15.5502 12 15.75 12Z"/></svg>`;
const CHECK_SVG    = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

function iconFor(ft: IssueRowFieldType): string {
  if (ft === 'doc-link')    return ICON_LINK;
  if (ft === 'description') return ICON_TEXT;
  if (ft === 'hard-coded')  return ICON_CODE;
  return ICON_CHECK;
}

/** Direct-apply field types — no edit state, CTA jumps straight to applied */
const DIRECT_APPLY: IssueRowFieldType[] = ['dev-ready', 'mark-complete'];
/** External-action types — no state change, just fires an event */
const EXTERNAL_ACTION: IssueRowFieldType[] = ['hard-coded'];

/**
 * Specd DS — IssueRow
 *
 * An action row for a single issue field. Implements a three-state machine:
 * initial → editing → applied. State is tracked on the `data-row-state`
 * host attribute so CSS visibility rules in components.css apply automatically.
 *
 * @element specd-issue-row
 *
 * @attr {string} fieldtype   - doc-link | description | dev-ready | mark-complete | hard-coded
 * @attr {string} title       - Row heading text
 * @attr {string} description - Sub-text shown below the title
 * @attr {string} value       - Current field value (URL, text, etc.)
 * @attr {string} rowstate    - Initial state: initial | editing | applied
 *
 * @fires specd-save       - Save pill clicked or direct-apply CTA clicked; detail: { fieldtype, value }
 * @fires specd-cancel     - Cancel pill clicked
 * @fires specd-ai-write   - AI gradient button clicked (description fieldtype)
 * @fires specd-quick-fix  - "View in Quick Fix" clicked (hard-coded fieldtype)
 * @fires specd-edit       - Edit pill clicked in applied state
 */
@customElement('specd-issue-row')
export class SpecdIssueRow extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) fieldtype: IssueRowFieldType = 'doc-link';
  @property({ type: String }) title: string = '';
  @property({ type: String }) description: string = '';
  @property({ type: String }) value: string = '';
  @property({ type: String }) rowstate: IssueRowState = 'initial';

  @state() private _state: IssueRowState = 'initial';
  @state() private _editValue: string = '';

  override connectedCallback() {
    super.connectedCallback();
    this._state = this.rowstate;
    this._editValue = this.value;
    this._syncAttr();
  }

  private _syncAttr() { this.setAttribute('data-row-state', this._state); }

  private _setState(s: IssueRowState) { this._state = s; this._syncAttr(); }

  private _fire(name: string, detail?: Record<string, unknown>) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

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
    this._setState('editing');
  }

  private _handleSave() {
    this._setState('applied');
    this._fire('specd-save', { fieldtype: this.fieldtype, value: this._editValue });
  }

  private _handleCancel() {
    this._editValue = this.value;
    this._setState('initial');
    this._fire('specd-cancel');
  }

  private _renderEditCluster() {
    return html`
      <div class="row-edit-cluster">
        <button class="btn-save-pill" type="button"
          @click=${(e: Event) => { e.stopPropagation(); this._handleSave(); }}>Save</button>
        <button class="btn-cancel-pill" type="button"
          @click=${(e: Event) => { e.stopPropagation(); this._handleCancel(); }}>Cancel</button>
      </div>
    `;
  }

  private _renderInitialCta() {
    if (this.fieldtype === 'description') {
      return html`
        <button class="btn-ai-gradient" type="button"
          @click=${(e: Event) => { e.stopPropagation(); this._handleCta(); }}>
          ${unsafeHTML(SPARKLE_SVG)}
          <span class="ai-text">Write with AI</span>
        </button>
      `;
    }
    if (this.fieldtype === 'hard-coded') {
      return html`
        <button class="btn-row-primary btn-hc-ghost" type="button"
          @click=${(e: Event) => { e.stopPropagation(); this._handleCta(); }}>
          View in Quick Fix
        </button>
      `;
    }
    const labels: Record<IssueRowFieldType, string> = {
      'doc-link':      'Add doc link',
      'description':   'Write with AI',
      'dev-ready':     'Mark dev ready',
      'mark-complete': 'Mark complete',
      'hard-coded':    'View in Quick Fix',
    };
    return html`
      <button class="btn-row-primary" type="button"
        @click=${(e: Event) => { e.stopPropagation(); this._handleCta(); }}>
        ${labels[this.fieldtype]}
      </button>
    `;
  }

  private _renderEditingContent() {
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

  override render() {
    return html`
      <div class="issue-row" data-row-state=${this._state}>

        <!-- Top row: always visible -->
        <div class="issue-row-top">
          <div class="issue-row-body">
            <div class="issue-row-title">
              ${unsafeHTML(iconFor(this.fieldtype))}
              ${this.title}
            </div>
            ${this.description ? html`<div class="issue-row-desc">${this.description}</div>` : nothing}
          </div>

          <!-- Initial CTA (hidden in editing/applied via CSS) -->
          <div class="row-state-initial">
            ${this._renderInitialCta()}
          </div>

          <!-- Applied: show applied button + edit pill -->
          <div class="row-state-applied" style="display:flex;align-items:center;gap:6px;">
            <button class="btn-row-applied" type="button" disabled>
              ${unsafeHTML(CHECK_SVG)}
              Applied
            </button>
            <button class="btn-edit-pill" type="button"
              @click=${(e: Event) => { e.stopPropagation(); this._setState('initial'); this._fire('specd-edit'); }}>
              Edit
            </button>
          </div>
        </div>

        <!-- Editing content (hidden in initial/applied via CSS) -->
        <div class="row-state-editing">
          ${this._renderEditingContent()}
        </div>

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-issue-row': SpecdIssueRow; }
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
cd /Users/home/Desktop/code/admiral-ds && npm test -- src/components/IssueRow --reporter=verbose 2>&1 | tail -20
```

Expected: all 11 tests pass.

- [ ] **Step 5: Create SpecdIssueRow.stories.ts**

Replace `src/components/IssueRow/SpecdIssueRow.stories.ts`:

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdIssueRow.js';

const meta: Meta = {
  title: 'Organisms/IssueRow',
  component: 'specd-issue-row',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const DocLink: Story = {
  name: 'Doc Link — Initial',
  render: () => html`
    <div style="width:420px;padding:12px;">
      <specd-issue-row
        fieldtype="doc-link"
        title="Add documentation link"
        description="No doc link is set for this component."
      ></specd-issue-row>
    </div>
  `,
};

export const DocLinkEditing: Story = {
  name: 'Doc Link — Editing',
  render: () => html`
    <div style="width:420px;padding:12px;">
      <specd-issue-row
        fieldtype="doc-link"
        title="Add documentation link"
        description="No doc link is set for this component."
        rowstate="editing"
        value="https://zeroheight.com/button"
      ></specd-issue-row>
    </div>
  `,
};

export const DocLinkApplied: Story = {
  name: 'Doc Link — Applied',
  render: () => html`
    <div style="width:420px;padding:12px;">
      <specd-issue-row
        fieldtype="doc-link"
        title="Add documentation link"
        rowstate="applied"
      ></specd-issue-row>
    </div>
  `,
};

export const Description: Story = {
  name: 'Description — Initial (AI)',
  render: () => html`
    <div style="width:420px;padding:12px;">
      <specd-issue-row
        fieldtype="description"
        title="Write component description"
        description="This component has no description."
      ></specd-issue-row>
    </div>
  `,
};

export const DevReady: Story = {
  name: 'Dev Ready — Initial',
  render: () => html`
    <div style="width:420px;padding:12px;">
      <specd-issue-row
        fieldtype="dev-ready"
        title="Mark as dev ready"
        description="Dev status has not been set."
      ></specd-issue-row>
    </div>
  `,
};

export const HardCoded: Story = {
  name: 'Hard Coded — Initial (ghost)',
  render: () => html`
    <div style="width:420px;padding:12px;">
      <specd-issue-row
        fieldtype="hard-coded"
        title="Hard-coded colour values"
        description="5 layers use raw hex values instead of variables."
      ></specd-issue-row>
    </div>
  `,
};

export const AllFieldTypes: Story = {
  name: 'All Field Types',
  render: () => html`
    <div style="width:420px;padding:12px;display:flex;flex-direction:column;gap:8px;">
      <specd-issue-row fieldtype="doc-link" title="Add documentation link" description="No doc link set."></specd-issue-row>
      <specd-issue-row fieldtype="description" title="Write description" description="No description set."></specd-issue-row>
      <specd-issue-row fieldtype="dev-ready" title="Mark dev ready" description="Dev status not set."></specd-issue-row>
      <specd-issue-row fieldtype="mark-complete" title="Mark complete" description="Not marked complete."></specd-issue-row>
      <specd-issue-row fieldtype="hard-coded" title="Hard-coded values" description="5 layers have raw values."></specd-issue-row>
    </div>
  `,
};
```

- [ ] **Step 6: Update src/index.ts**

Replace the old IssueRow export:
```typescript
// Remove:
export { SpecdIssueRow } from './components/IssueRow/SpecdIssueRow.js';
export type { IssueRowState, IssueRowSeverity } from './components/IssueRow/SpecdIssueRow.js';

// Add:
export { SpecdIssueRow } from './components/IssueRow/SpecdIssueRow.js';
export type { IssueRowFieldType, IssueRowState } from './components/IssueRow/SpecdIssueRow.js';
```

- [ ] **Step 7: Run full test suite**

```bash
cd /Users/home/Desktop/code/admiral-ds && npm test 2>&1 | tail -10
```

Expected: all tests pass.

- [ ] **Step 8: Commit**

```bash
cd /Users/home/Desktop/code/admiral-ds && git add src/components/IssueRow/ src/index.ts && git commit -m "feat(issue-row): new action-state component with initial/editing/applied state machine for 5 field types"
```

---

## Task 7: VariablePicker — Search Input + Suggested/All Sections + RadioRow Atoms

**Reference:** `src/tokens/components.css` lines 2365–2434 — `.vp-search`, `.vp-section-header`, `.vp-section-title`, `.vp-section-meta`, `.vp-section-list`, `.vp-radio-row`. All CSS already exists.

**What changes:**
- Add `suggestions: string = '[]'` prop — JSON array of `VariableOption` shown in "Suggested" section
- Add `_query: string = ''` internal state for search filter
- Add `.vp-search` input that filters options by name (case-insensitive)
- When `suggestions` is non-empty and `_query` is empty: render "Suggested" section + "All Variables" section
- When `_query` is non-empty: render one flat filtered section (no headers)
- When `suggestions` is empty: render flat unfiltered list (backward-compatible)
- Replace inline `<label class="vp-radio-row">` with `<specd-radio-row>` atoms (import from RadioRow)

**Files:**
- Modify: `src/components/VariablePicker/SpecdVariablePicker.ts`
- Modify: `src/components/VariablePicker/SpecdVariablePicker.stories.ts`
- Modify: `src/components/VariablePicker/SpecdVariablePicker.test.ts`

- [ ] **Step 1: Write the failing tests**

Replace `src/components/VariablePicker/SpecdVariablePicker.test.ts`:

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('../RadioRow/SpecdRadioRow.js');
  await import('./SpecdVariablePicker.js');
});

const OPTS = JSON.stringify([
  { id: 'v1', name: 'color/primary/navy', collection: 'Brand', color: '#0C1750' },
  { id: 'v2', name: 'color/lime/400',     collection: 'Primitives', color: '#b8ff57' },
]);

const SUGG = JSON.stringify([
  { id: 'v1', name: 'color/primary/navy', collection: 'Brand', color: '#0C1750' },
]);

describe('SpecdVariablePicker', () => {
  it('renders nothing when open=false', async () => {
    const el = document.createElement('specd-variable-picker') as any;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.variable-picker-modal')).toBeNull();
    el.remove();
  });

  it('renders modal when open=true', async () => {
    const el = document.createElement('specd-variable-picker') as any;
    el.open = true;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.variable-picker-modal')).not.toBeNull();
    el.remove();
  });

  it('renders .vp-search input', async () => {
    const el = document.createElement('specd-variable-picker') as any;
    el.open = true;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.vp-search')).not.toBeNull();
    el.remove();
  });

  it('renders specd-radio-row per option (flat list when no suggestions)', async () => {
    const el = document.createElement('specd-variable-picker') as any;
    el.open = true;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelectorAll('specd-radio-row').length).toBe(2);
    el.remove();
  });

  it('renders Suggested and All Variables sections when suggestions provided', async () => {
    const el = document.createElement('specd-variable-picker') as any;
    el.open = true;
    el.options = OPTS;
    el.suggestions = SUGG;
    document.body.appendChild(el);
    await el.updateComplete;
    const headers = el.querySelectorAll('.vp-section-title');
    const titles = Array.from(headers).map((h: any) => h.textContent.trim());
    expect(titles).toContain('Suggested');
    expect(titles).toContain('All Variables');
    el.remove();
  });

  it('section meta shows correct count', async () => {
    const el = document.createElement('specd-variable-picker') as any;
    el.open = true;
    el.options = OPTS;
    el.suggestions = SUGG;
    document.body.appendChild(el);
    await el.updateComplete;
    const metas = el.querySelectorAll('.vp-section-meta');
    expect(metas[0]?.textContent?.trim()).toBe('1 result');
    expect(metas[1]?.textContent?.trim()).toBe('2 results');
    el.remove();
  });

  it('filters options by search query', async () => {
    const el = document.createElement('specd-variable-picker') as any;
    el.open = true;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    const input = el.querySelector('.vp-search') as HTMLInputElement;
    input.value = 'navy';
    input.dispatchEvent(new Event('input'));
    await el.updateComplete;
    expect(el.querySelectorAll('specd-radio-row').length).toBe(1);
    el.remove();
  });

  it('fires specd-pick when specd-radio-row fires specd-change', async () => {
    const el = document.createElement('specd-variable-picker') as any;
    el.open = true;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    let detail: any = null;
    el.addEventListener('specd-pick', (e: any) => { detail = e.detail; });
    el.querySelectorAll('specd-radio-row')[0].dispatchEvent(
      new CustomEvent('specd-change', { detail: { value: 'v1' }, bubbles: true })
    );
    expect(detail?.id).toBe('v1');
    el.remove();
  });

  it('fires specd-close when close button clicked', async () => {
    const el = document.createElement('specd-variable-picker') as any;
    el.open = true;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    let fired = false;
    el.addEventListener('specd-close', () => { fired = true; });
    el.querySelector('.vp-close').click();
    expect(fired).toBe(true);
    el.remove();
  });
});
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
cd /Users/home/Desktop/code/admiral-ds && npm test -- VariablePicker --reporter=verbose 2>&1 | tail -20
```

Expected: failures — no `.vp-search`, no `specd-radio-row`, no section headers.

- [ ] **Step 3: Rebuild SpecdVariablePicker.ts**

Replace `src/components/VariablePicker/SpecdVariablePicker.ts`:

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../RadioRow/SpecdRadioRow.js';

export interface VariableOption {
  id: string;
  name: string;
  collection?: string;
  color?: string;
  hex?: string;
}

/**
 * Specd DS — VariablePicker
 *
 * Modal overlay for picking a design token variable.
 * Supports search filtering and two-section layout (Suggested / All Variables).
 *
 * @element specd-variable-picker
 *
 * @attr {string}  title       - Modal header title (default "Pick a variable")
 * @attr {string}  options     - JSON array of VariableOption objects (all candidates)
 * @attr {string}  suggestions - JSON array of VariableOption (subset to show as "Suggested")
 * @attr {string}  value       - Currently selected variable id
 * @attr {boolean} open        - Whether the modal is visible
 *
 * @fires specd-pick   - User selected a variable; detail: { id, name }
 * @fires specd-close  - User closed the modal
 */
@customElement('specd-variable-picker')
export class SpecdVariablePicker extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) title: string = 'Pick a variable';
  @property({ type: String }) options: string = '[]';
  @property({ type: String }) suggestions: string = '[]';
  @property({ type: String }) value: string = '';
  @property({ type: Boolean }) open: boolean = false;

  @state() private _selected: string = '';
  @state() private _query: string = '';

  override connectedCallback() {
    super.connectedCallback();
    this._selected = this.value;
  }

  private _opts(): VariableOption[] {
    try { return JSON.parse(this.options) as VariableOption[]; } catch { return []; }
  }

  private _sugg(): VariableOption[] {
    try { return JSON.parse(this.suggestions) as VariableOption[]; } catch { return []; }
  }

  private _filter(opts: VariableOption[]): VariableOption[] {
    if (!this._query) return opts;
    const q = this._query.toLowerCase();
    return opts.filter(o => o.name.toLowerCase().includes(q));
  }

  private _pick(opt: VariableOption) {
    this._selected = opt.id;
    this.dispatchEvent(new CustomEvent('specd-pick', {
      detail: { id: opt.id, name: opt.name },
      bubbles: true,
      composed: true,
    }));
  }

  private _metaLabel(count: number): string {
    return count === 1 ? '1 result' : `${count} results`;
  }

  private _renderRows(opts: VariableOption[]) {
    return opts.map(opt => html`
      <specd-radio-row
        value=${opt.id}
        label=${opt.name}
        collection=${opt.collection ?? ''}
        color=${opt.color ?? ''}
        hex=${opt.hex ?? ''}
        ?checked=${this._selected === opt.id}
        @specd-change=${() => this._pick(opt)}
      ></specd-radio-row>
    `);
  }

  private _renderBody() {
    const sugg = this._sugg();
    const all  = this._opts();

    // Searching: flat filtered list
    if (this._query) {
      const filtered = this._filter(all);
      return html`
        ${filtered.length === 0
          ? html`<div class="vp-empty">No results for "${this._query}"</div>`
          : this._renderRows(filtered)
        }
      `;
    }

    // No suggestions prop: flat list (backward-compatible)
    if (sugg.length === 0) {
      return all.length === 0
        ? html`<div class="vp-empty">No variables found</div>`
        : html`${this._renderRows(all)}`;
    }

    // Two-section layout
    return html`
      <div>
        <div class="vp-section-header">
          <span class="vp-section-title">Suggested</span>
          <span class="vp-section-meta">${this._metaLabel(sugg.length)}</span>
        </div>
        <div class="vp-section-list">${this._renderRows(sugg)}</div>
      </div>
      <div style="margin-top:12px;">
        <div class="vp-section-header">
          <span class="vp-section-title">All Variables</span>
          <span class="vp-section-meta">${this._metaLabel(all.length)}</span>
        </div>
        <div class="vp-section-list">${this._renderRows(all)}</div>
      </div>
    `;
  }

  override render() {
    if (!this.open) return nothing;

    return html`
      <div class="variable-picker-modal">
        <div class="vp-header">
          <span class="vp-title">${this.title}</span>
          <button class="btn-ghost vp-close" type="button"
            @click=${() => this.dispatchEvent(new CustomEvent('specd-close', { bubbles: true, composed: true }))}>
            ✕
          </button>
        </div>
        <div class="vp-body">
          <input
            class="vp-search"
            type="search"
            placeholder="Search variables…"
            .value=${this._query}
            @input=${(e: Event) => { this._query = (e.target as HTMLInputElement).value; }}
          />
          ${this._renderBody()}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-variable-picker': SpecdVariablePicker; }
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
cd /Users/home/Desktop/code/admiral-ds && npm test -- VariablePicker --reporter=verbose 2>&1 | tail -20
```

Expected: all 9 tests pass.

- [ ] **Step 5: Update stories**

Replace `src/components/VariablePicker/SpecdVariablePicker.stories.ts`:

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdVariablePicker.js';

const meta: Meta = {
  title: 'Organisms/VariablePicker',
  component: 'specd-variable-picker',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

const ALL = JSON.stringify([
  { id: 'v1', name: 'color/primary/navy',  collection: 'Brand',      color: '#0C1750', hex: '#0C1750' },
  { id: 'v2', name: 'color/lime/400',      collection: 'Primitives',  color: '#b8ff57', hex: '#B8FF57' },
  { id: 'v3', name: 'color/blue/500',      collection: 'Primitives',  color: '#3b82f6', hex: '#3B82F6' },
  { id: 'v4', name: 'color/border/default',collection: 'Semantic',    color: '#d1d5db', hex: '#D1D5DB' },
]);

const SUGG = JSON.stringify([
  { id: 'v3', name: 'color/blue/500', collection: 'Primitives', color: '#3b82f6', hex: '#3B82F6' },
]);

export const FlatList: Story = {
  name: 'Flat list (no suggestions)',
  render: () => html`
    <div style="width:320px;padding:16px;">
      <specd-variable-picker open .options=${ALL} value="v2"></specd-variable-picker>
    </div>
  `,
};

export const WithSections: Story = {
  name: 'With Suggested section',
  render: () => html`
    <div style="width:320px;padding:16px;">
      <specd-variable-picker open .options=${ALL} .suggestions=${SUGG}></specd-variable-picker>
    </div>
  `,
};
```

- [ ] **Step 6: Run the full test suite**

```bash
cd /Users/home/Desktop/code/admiral-ds && npm test 2>&1 | tail -15
```

Expected: all tests pass with no failures.

- [ ] **Step 7: Commit**

```bash
cd /Users/home/Desktop/code/admiral-ds && git add src/components/VariablePicker/ && git commit -m "feat(variable-picker): add search input, Suggested/All sections, compose specd-radio-row atoms"
```

---

## Self-Review Checklist

Run before considering all tasks complete:

- [ ] All 7 tasks committed cleanly
- [ ] `npm test` passes with zero failures
- [ ] `src/index.ts` exports: `SpecdRadioRow`, `SpecdIssuePreviewCard`, `SpecdIssueRow` (new), updated `IssueRowFieldType`; old `SpecdQfReplaceRow` removed
- [ ] `src/react.ts` wrappers: `RadioRow`, `IssuePreviewCard`, `IssueRow`; old `QfReplaceRow` removed
- [ ] `src/components/QfReplaceRow/` directory deleted
- [ ] All five IssueRow field types covered in stories
- [ ] ChoiceCard arrow renders in all story variants
- [ ] PropFixSlot renders `prop-fix-layer-link` button (varname is clickable)
- [ ] VariablePicker search input filters in real-time (check stories visually)
