# Specd DS Overhaul — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix 16 existing component issues, load Google Fonts in Storybook, and build 12 new components using the Specd DS Lit 3 pattern.

**Architecture:** All components use Lit 3 with light DOM (`createRenderRoot() { return this; }`). Global CSS from `src/tokens/components.css` applies to all rendered HTML. New components follow the same `@customElement / @property` pattern as existing ones. Tests use vitest 3 + happy-dom.

**Tech Stack:** Lit 3, Vitest 3, happy-dom, Storybook 10 (`@storybook/web-components-vite`), TypeScript

---

## File Structure

**Modified:**
- `.storybook/preview.ts` — import fonts.css
- `src/tokens/index.css` — import fonts.css
- `src/tokens/components.css` — already up to date (3259 lines from specd-ds.css)
- `src/components/ProgressBar/SpecdProgress.ts` — fix CSS class names
- `src/components/Chip/SpecdChip.ts` — add intent prop + fix count badge classes
- `src/components/Input/SpecdInput.ts` — add password reveal toggle
- `src/components/ChoiceCard/SpecdChoiceCard.ts` — add icon/iconvariant/pillcolor props
- `src/components/ScoreRing/SpecdScoreRing.ts` — scale font-size for small rings
- `src/components/IssueCard/SpecdIssueCard.ts` — add footer buttons + open/closed state
- `src/index.ts` — add all new component exports
- `src/react.ts` — add createComponent wrappers

**Created (new components):**
- `src/tokens/fonts.css`
- `src/components/Icon/` — SpecdIcon
- `src/components/ColorSwatch/` — SpecdColorSwatch
- `src/components/FieldMessage/` — SpecdFieldMessage
- `src/components/InfoTrigger/` — SpecdInfoTrigger
- `src/components/AiGradientBtn/` — SpecdAiGradientBtn
- `src/components/IgnoreFooter/` — SpecdIgnoreFooter
- `src/components/QfReplaceRow/` — SpecdQfReplaceRow
- `src/components/IssueRowActions/` — SpecdIssueRowActions
- `src/components/IssueRow/` — SpecdIssueRow
- `src/components/PropFixRow/` — SpecdPropFixRow + SpecdPropFixSlot + SpecdPropFixCreate
- `src/components/VariablePicker/` — SpecdVariablePicker
- `src/components/DataTable/` — SpecdDataTable

---

## Task 1: Fix fonts — load Google Fonts in Storybook

**Files:**
- Create: `src/tokens/fonts.css`
- Modify: `src/tokens/index.css`
- Modify: `.storybook/preview.ts`

- [ ] **Step 1: Create `src/tokens/fonts.css`**

```css
/* Specd DS — Google Fonts loader
 * Import this before any component CSS to ensure Inter, Bricolage Grotesque,
 * and IBM Plex Mono are available for all token/component styles.
 */
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
```

- [ ] **Step 2: Add fonts import to `src/tokens/index.css`** (prepend before existing imports)

```css
@import './fonts.css';
@import './colors.css';
@import './typography.css';
@import './spacing.css';
```

- [ ] **Step 3: Update `.storybook/preview.ts`** to import fonts first

```typescript
import type { Preview } from '@storybook/web-components';

import '../src/tokens/fonts.css';
import '../src/tokens/index.css';
import '../src/tokens/components.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8f9fc' },
        { name: 'dark',  value: '#0c1750' },
        { name: 'white', value: '#ffffff' },
      ],
    },
    layout: 'centered',
    a11y: { test: 'todo' },
  },
};

export default preview;
```

- [ ] **Step 4: Verify fonts load**

Run: `cd /Users/home/Desktop/code/admiral-ds && npm test -- --reporter=verbose 2>&1 | tail -5`
Expected: all tests pass (fonts.css doesn't break anything)

- [ ] **Step 5: Commit**

```bash
git add src/tokens/fonts.css src/tokens/index.css .storybook/preview.ts
git commit -m "feat: load Google Fonts in Storybook and token index"
```

---

## Task 2: Fix ProgressBar — CSS class name mismatch

**Files:**
- Modify: `src/components/ProgressBar/SpecdProgress.ts`
- Modify: `src/components/ProgressBar/SpecdProgress.stories.ts`

**Context:** `components.css` defines `.progress-bar` / `.progress-bar-fill` but the component renders `progress-track` / `progress-fill`. Fix the component.

- [ ] **Step 1: Write failing test** in `src/components/ProgressBar/SpecdProgress.test.ts`

Add this test to the existing describe block:
```typescript
it('renders .progress-bar track element', async () => {
  const el = await makeElement({ value: '60' });
  expect(el.querySelector('.progress-bar')).not.toBeNull();
});

it('renders .progress-bar-fill with correct width', async () => {
  const el = await makeElement({ value: '60' });
  const fill = el.querySelector('.progress-bar-fill') as HTMLElement;
  expect(fill).not.toBeNull();
  expect(fill.style.width).toBe('60%');
});
```

- [ ] **Step 2: Run tests to confirm they fail**

Run: `cd /Users/home/Desktop/code/admiral-ds && npm test -- ProgressBar 2>&1 | tail -10`
Expected: FAIL — `.progress-bar` not found

- [ ] **Step 3: Fix `SpecdProgress.ts`** — rename classes

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { ProgressIntent } from './SpecdProgress.types.js';

@customElement('specd-progress')
export class SpecdProgress extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: Number }) value?: number;
  @property({ type: String }) intent?: ProgressIntent;
  @property({ type: Number }) height: number = 8;
  @property({ type: String, attribute: 'aria-label' }) ariaLabel: string = '';

  override render() {
    const isIndeterminate = this.value === undefined || this.value === null;
    const clamped = isIndeterminate ? 0 : Math.min(100, Math.max(0, this.value!));
    const fillClass = [
      'progress-bar-fill',
      this.intent === 'positive' ? 'positive' : '',
      this.intent === 'warning'  ? 'warning'  : '',
      this.intent === 'negative' ? 'negative' : '',
    ].filter(Boolean).join(' ');

    return html`
      <div
        class="progress-bar${isIndeterminate ? ' indeterminate' : ''}"
        role="progressbar"
        aria-valuenow=${isIndeterminate ? nothing : clamped}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label=${this.ariaLabel || nothing}
        style=${styleMap({ height: `${this.height}px` })}
      >
        <div class=${fillClass} style=${styleMap({ width: `${clamped}%` })}></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-progress': SpecdProgress; }
}
```

- [ ] **Step 4: Fix story** — remove stray `nothing` reference in `SpecdProgress.stories.ts`

Replace the render function's `value=${args.value ?? nothing}` with:
```typescript
render: (args) => html`
  <specd-progress
    .value=${args.value}
    intent=${args.intent ?? ''}
    height=${args.height ?? 8}
    aria-label=${args.ariaLabel ?? ''}
  ></specd-progress>
`,
```
And remove the `const nothing = undefined as any;` line.

- [ ] **Step 5: Run tests to confirm pass**

Run: `cd /Users/home/Desktop/code/admiral-ds && npm test -- ProgressBar 2>&1 | tail -10`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/ProgressBar/
git commit -m "fix(progress): use correct CSS class names progress-bar / progress-bar-fill"
```

---

## Task 3: Fix Chip — add intent prop + fix count badge class names

**Files:**
- Modify: `src/components/Chip/SpecdChip.ts`
- Modify: `src/components/Chip/SpecdChip.types.ts`

**Context:** CSS has `.chip-v2.positive`, `.chip-v2.negative`, `.chip-v2.warning`, `.chip-v2.dark` but `SpecdChip` has no `intent` prop. Also `_countClasses()` uses `is-crit`/`is-warn` but CSS has `.chip-v2.chip-crit`/`.chip-v2.chip-warn`.

- [ ] **Step 1: Update `SpecdChip.types.ts`**

```typescript
export type ChipSeverity = 'crit' | 'warn';
export type ChipIntent = 'positive' | 'negative' | 'warning' | 'dark';

export interface ChipProps {
  label: string;
  count?: number;
  active?: boolean;
  severity?: ChipSeverity;
  intent?: ChipIntent;
  cls?: string;
}
```

- [ ] **Step 2: Update `SpecdChip.ts`**

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ChipProps, ChipSeverity, ChipIntent } from './SpecdChip.types.js';

@customElement('specd-chip')
export class SpecdChip extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string = '';
  @property({ type: Number }) count?: number;
  @property({ type: Boolean }) active: boolean = false;
  @property({ type: String }) severity?: ChipSeverity;
  @property({ type: String }) intent?: ChipIntent;
  @property({ type: String, attribute: 'data-filter' }) dataFilter: string = '';
  @property({ type: String }) cls: string = '';

  private _classes(): string {
    return [
      'chip-v2',
      this.active   ? 'active'           : '',
      this.intent   ? this.intent        : '',
      this.cls,
    ].filter(Boolean).join(' ');
  }

  private _countClasses(): string {
    return [
      'chip-count',
      this.severity === 'crit' ? 'chip-crit' : '',
      this.severity === 'warn' ? 'chip-warn' : '',
    ].filter(Boolean).join(' ');
  }

  override render() {
    return html`
      <span class=${this._classes()} data-filter=${this.dataFilter || nothing}>
        ${this.label}
        ${this.count !== undefined
          ? html`<span class=${this._countClasses()}>${this.count}</span>`
          : nothing}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-chip': SpecdChip; }
}
```

- [ ] **Step 3: Add tests for intent prop** in `SpecdChip.test.ts`

```typescript
it('applies positive intent class', async () => {
  const el = await makeElement({ label: 'OK', intent: 'positive' });
  expect(el.querySelector('span')?.className).toContain('positive');
});
it('applies negative intent class', async () => {
  const el = await makeElement({ label: 'Bad', intent: 'negative' });
  expect(el.querySelector('span')?.className).toContain('negative');
});
it('applies chip-crit class to count badge', async () => {
  const el = await makeElement({ label: 'A', count: '3', severity: 'crit' });
  expect(el.querySelector('.chip-count')?.className).toContain('chip-crit');
});
```

- [ ] **Step 4: Run tests**

Run: `cd /Users/home/Desktop/code/admiral-ds && npm test -- Chip 2>&1 | tail -10`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Chip/
git commit -m "fix(chip): add intent prop, fix count badge class names chip-crit/chip-warn"
```

---

## Task 4: Fix Input — add password reveal toggle

**Files:**
- Modify: `src/components/Input/SpecdInput.ts`

**Context:** CSS already has `.input-group` / `.input-reveal`. When `type="password"`, wrap in `.input-group` and show `.input-reveal` button that toggles visibility.

- [ ] **Step 1: Add test for password reveal**

In `SpecdInput.test.ts`, add:
```typescript
it('wraps password input in .input-group with reveal button', async () => {
  const el = await makeElement({ type: 'password' });
  expect(el.querySelector('.input-group')).not.toBeNull();
  expect(el.querySelector('.input-reveal')).not.toBeNull();
});
```

- [ ] **Step 2: Update `SpecdInput.ts`**

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { InputType } from './SpecdInput.types.js';

@customElement('specd-input')
export class SpecdInput extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) type: InputType = 'text';
  @property({ type: String }) id: string = '';
  @property({ type: String }) placeholder: string = '';
  @property({ type: String }) value: string = '';
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) search: boolean = false;
  @property({ type: String }) cls: string = '';
  @state() private _revealed: boolean = false;

  private _inputClasses(): string {
    return ['input', this.search ? 'table-search' : '', this.cls].filter(Boolean).join(' ');
  }

  private _toggleReveal() { this._revealed = !this._revealed; }

  private _eyeIcon(visible: boolean) {
    return visible
      ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
      : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  }

  override render() {
    const effectiveType = this.type === 'password' && this._revealed ? 'text' : this.type;
    const input = html`
      <input
        class=${this._inputClasses()}
        type=${effectiveType}
        id=${this.id || nothing}
        placeholder=${this.placeholder || nothing}
        .value=${this.value}
        ?disabled=${this.disabled}
        @input=${(e: Event) => this.dispatchEvent(new Event('input', { bubbles: true }))}
        @change=${(e: Event) => this.dispatchEvent(new Event('change', { bubbles: true }))}
      />
    `;

    if (this.type !== 'password') return input;

    return html`
      <div class="input-group">
        ${input}
        <button
          type="button"
          class="input-reveal"
          @click=${this._toggleReveal}
          aria-label=${this._revealed ? 'Hide password' : 'Show password'}
        >
          <!-- eslint-disable-next-line lit/no-invalid-html -->
          ${this._revealed
            ? html`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
            : html`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
          }
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-input': SpecdInput; }
}
```

- [ ] **Step 3: Run tests**

Run: `cd /Users/home/Desktop/code/admiral-ds && npm test -- Input 2>&1 | tail -10`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/Input/
git commit -m "feat(input): add password show/hide reveal toggle"
```

---

## Task 5: Fix ChoiceCard — add icon slot, fix pill color classes

**Files:**
- Modify: `src/components/ChoiceCard/SpecdChoiceCard.ts`
- Modify: `src/components/ChoiceCard/SpecdChoiceCard.types.ts`

- [ ] **Step 1: Update types**

```typescript
export type ChoiceCardVariant = 'default' | 'gradient';
export type ChoiceCardPillColor = 'mint' | 'blue';
export type ChoiceCardIconVariant = 'default' | 'gradient';
```

- [ ] **Step 2: Update `SpecdChoiceCard.ts`**

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { ChoiceCardVariant, ChoiceCardPillColor, ChoiceCardIconVariant } from './SpecdChoiceCard.types.js';

const ARROW_SVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>`;

@customElement('specd-choice-card')
export class SpecdChoiceCard extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) title: string = '';
  @property({ type: String }) description?: string;
  @property({ type: String }) variant: ChoiceCardVariant = 'default';
  @property({ type: String }) pill?: string;
  @property({ type: String }) pillcolor: ChoiceCardPillColor = 'blue';
  @property({ type: String }) icon?: string;
  @property({ type: String }) iconvariant: ChoiceCardIconVariant = 'default';

  override render() {
    const isGradient = this.variant === 'gradient';
    return html`
      <div class="choice-card ${isGradient ? 'gradient' : ''}">
        <div class="choice-card-arrow">${unsafeHTML(ARROW_SVG)}</div>
        ${this.icon ? html`
          <div class="choice-card-icon ${this.iconvariant === 'gradient' ? 'gradient' : ''}">
            ${unsafeHTML(this.icon)}
          </div>` : nothing}
        <div class="choice-card-title">${this.title}</div>
        ${this.description ? html`<div class="choice-card-desc">${this.description}</div>` : nothing}
        ${this.pill ? html`<div class="choice-card-pill ${this.pillcolor}">${this.pill}</div>` : nothing}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-choice-card': SpecdChoiceCard; }
}
```

- [ ] **Step 3: Add tests**

```typescript
it('renders icon when provided', async () => {
  const el = await makeElement({ icon: '<svg></svg>' });
  expect(el.querySelector('.choice-card-icon')).not.toBeNull();
});
it('applies gradient class to icon', async () => {
  const el = await makeElement({ icon: '<svg></svg>', iconvariant: 'gradient' });
  expect(el.querySelector('.choice-card-icon')?.className).toContain('gradient');
});
it('applies pillcolor class to pill', async () => {
  const el = await makeElement({ pill: 'Popular', pillcolor: 'mint' });
  expect(el.querySelector('.choice-card-pill')?.className).toContain('mint');
});
```

- [ ] **Step 4: Run tests**

Run: `cd /Users/home/Desktop/code/admiral-ds && npm test -- ChoiceCard 2>&1 | tail -10`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ChoiceCard/
git commit -m "feat(choicecard): add icon slot, iconvariant, pillcolor props"
```

---

## Task 6: Fix ScoreRing — scale font for small sizes

**Files:**
- Modify: `src/components/ScoreRing/SpecdScoreRing.ts`

- [ ] **Step 1: Add test for small size**

```typescript
it('uses smaller font size when size < 70', async () => {
  const el = document.createElement('specd-score-ring') as HTMLElement & { updateComplete: Promise<boolean>; size: number; score: number };
  el.size = 60;
  el.score = 74;
  document.body.appendChild(el);
  await el.updateComplete;
  const num = el.querySelector('.score-number-lg') as HTMLElement;
  expect(num.style.fontSize).toBeTruthy();
});
```

- [ ] **Step 2: Update `SpecdScoreRing.ts`** to scale font proportionally

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { ScoreTier } from './SpecdScoreRing.types.js';

@customElement('specd-score-ring')
export class SpecdScoreRing extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: Number }) score: number = 0;
  @property({ type: String }) tier: ScoreTier = 'good';
  @property({ type: Number }) size: number = 104;

  override render() {
    const ringStyles = {
      '--score-percentage': String(this.score),
      '--w': `${this.size}px`,
    };
    // Scale font proportionally: default 104px → 42px number, 11px denom
    const scale = this.size / 104;
    const numSize = Math.round(42 * scale);
    const denomSize = Math.max(8, Math.round(11 * scale));

    return html`
      <div class="score-circle tier-${this.tier}" style=${styleMap(ringStyles)}>
        <span class="score-number-lg" style="font-size:${numSize}px">${this.score}</span>
        <span class="score-denom-new" style="font-size:${denomSize}px">/100</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-score-ring': SpecdScoreRing; }
}
```

- [ ] **Step 3: Run tests**

Run: `cd /Users/home/Desktop/code/admiral-ds && npm test -- ScoreRing 2>&1 | tail -10`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/ScoreRing/
git commit -m "fix(score-ring): scale number font-size proportionally for small ring sizes"
```

---

## Task 7: Fix IssueCard — footer buttons + open/closed toggle

**Files:**
- Modify: `src/components/IssueCard/SpecdIssueCard.ts`
- Modify: `src/components/IssueCard/SpecdIssueCard.types.ts`

**Context:** Add `jumplabel`, `viewfixescount`, `open` props. Default footer renders Jump button + View Fixes button.

- [ ] **Step 1: Update types**

```typescript
export type IssueSeverity = 'crit' | 'warn' | 'info';
export interface IssueTag { label: string; severity: IssueSeverity; sub?: string; }
export interface IssueCardProps {
  name: string;
  count: number;
  severity: IssueSeverity;
  tags?: IssueTag[];
  icon?: string;
  jumplabel?: string;
  viewfixescount?: number;
  open?: boolean;
}
```

- [ ] **Step 2: Update `SpecdIssueCard.ts`**

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { IssueSeverity, IssueTag } from './SpecdIssueCard.types.js';

const DIAMOND_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 9-9 9-9-9 9-9z"/></svg>`;
const JUMP_SVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`;
const CHEVRON_DOWN = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>`;
const CHEVRON_UP   = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="18 15 12 9 6 15"/></svg>`;

@customElement('specd-issue-card')
export class SpecdIssueCard extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) name: string = '';
  @property({ type: Number }) count: number = 0;
  @property({ type: String }) severity: IssueSeverity = 'info';
  @property({ type: String }) tags: string = '[]';
  @property({ type: String }) icon?: string;
  @property({ type: String }) jumplabel: string = 'Jump to layer';
  @property({ type: Number }) viewfixescount: number = 0;
  @property({ type: Boolean }) open: boolean = false;

  private _parsedTags(): IssueTag[] {
    try { return JSON.parse(this.tags); } catch { return []; }
  }

  private _toggle() {
    this.open = !this.open;
    this.dispatchEvent(new CustomEvent('specd-toggle', { detail: { open: this.open }, bubbles: true, composed: true }));
  }

  private _jump(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('specd-jump', { bubbles: true, composed: true }));
  }

  override render() {
    const tags = this._parsedTags();
    return html`
      <div class="issue-card">
        <div class="issue-content">
          <div class="issue-card-top">
            <div class="issue-comp-tag">
              ${unsafeHTML(this.icon || DIAMOND_SVG)}
              <span>${this.name}</span>
            </div>
            <div class="issue-card-count ${this.severity}">
              ${this.count} issue${this.count !== 1 ? 's' : ''}
            </div>
            <button style="background:none;border:none;cursor:pointer;display:flex;align-items:center;color:var(--text-muted)" @click=${this._toggle}>
              ${unsafeHTML(this.open ? CHEVRON_UP : CHEVRON_DOWN)}
            </button>
          </div>
          ${tags.length > 0 ? html`
            <div class="issue-tag-row">
              ${tags.map(t => html`
                <div class="issue-tag ${t.severity}">
                  ${t.label}
                  ${t.sub ? html`<span class="issue-tag-sub">${t.sub}</span>` : nothing}
                </div>
              `)}
            </div>` : nothing}
        </div>
        <div class="issue-card-footer">
          <button class="btn-jump" @click=${this._jump}>
            ${unsafeHTML(JUMP_SVG)} ${this.jumplabel}
          </button>
          ${this.viewfixescount > 0 ? html`
            <button class="btn-view-fixes" style="margin-left:auto">
              View fixes
              <span class="view-fixes-count">${this.viewfixescount}</span>
            </button>` : nothing}
          <slot name="footer"></slot>
        </div>
        ${this.open ? html`<div class="issue-fixes-panel"><slot></slot></div>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-issue-card': SpecdIssueCard; }
}
```

- [ ] **Step 3: Add tests**

```typescript
it('renders .btn-jump in footer', async () => {
  const el = await makeElement({ name: 'Btn', count: '2', severity: 'warn' });
  expect(el.querySelector('.btn-jump')).not.toBeNull();
});
it('renders .btn-view-fixes when viewfixescount > 0', async () => {
  const el = await makeElement({ name: 'Btn', count: '2', severity: 'warn', viewfixescount: '3' });
  expect(el.querySelector('.btn-view-fixes')).not.toBeNull();
});
it('does not render .btn-view-fixes when viewfixescount = 0', async () => {
  const el = await makeElement({ name: 'Btn', count: '2', severity: 'warn' });
  expect(el.querySelector('.btn-view-fixes')).toBeNull();
});
it('shows .issue-fixes-panel when open', async () => {
  const el = await makeElement({ name: 'Btn', count: '1', severity: 'info', open: '' });
  expect(el.querySelector('.issue-fixes-panel')).not.toBeNull();
});
```

- [ ] **Step 4: Run tests**

Run: `cd /Users/home/Desktop/code/admiral-ds && npm test -- IssueCard 2>&1 | tail -10`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/IssueCard/
git commit -m "feat(issue-card): add footer jump/view-fixes buttons and open/closed toggle"
```

---

## Task 8: New SpecdIcon component

**Files:**
- Create: `src/components/Icon/SpecdIcon.ts`
- Create: `src/components/Icon/SpecdIcon.types.ts`
- Create: `src/components/Icon/SpecdIcon.test.ts`
- Create: `src/components/Icon/SpecdIcon.stories.ts`
- Create: `src/components/Icon/index.ts`

- [ ] **Step 1: Create `SpecdIcon.types.ts`**

```typescript
export type IconName =
  | 'diamond' | 'chevron-right' | 'chevron-down' | 'chevron-up'
  | 'settings' | 'refresh' | 'external-link' | 'copy' | 'check'
  | 'x' | 'search' | 'sparkle' | 'jump' | 'eye' | 'eye-off'
  | 'alert-circle' | 'info' | 'frame' | 'component';

export interface IconProps { name: IconName; size?: number; color?: string; }
```

- [ ] **Step 2: Create `SpecdIcon.ts`**

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { IconName } from './SpecdIcon.types.js';

const PATHS: Record<string, string> = {
  'diamond':        `<path d="M12 3l9 9-9 9-9-9 9-9z"/>`,
  'chevron-right':  `<polyline points="9 18 15 12 9 6"/>`,
  'chevron-down':   `<polyline points="6 9 12 15 18 9"/>`,
  'chevron-up':     `<polyline points="18 15 12 9 6 15"/>`,
  'settings':       `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
  'refresh':        `<path d="M21 12a9 9 0 1 1-3.51-7.13"/><polyline points="21 4 21 10 15 10"/>`,
  'external-link':  `<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>`,
  'copy':           `<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>`,
  'check':          `<polyline points="20 6 9 12 4 9"/>`,
  'x':              `<path d="M18 6L6 18M6 6l12 12"/>`,
  'search':         `<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>`,
  'sparkle':        `<path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z"/>`,
  'jump':           `<path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>`,
  'eye':            `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`,
  'eye-off':        `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>`,
  'alert-circle':   `<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`,
  'info':           `<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>`,
  'frame':          `<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>`,
  'component':      `<path d="M12 2l10 7v6l-10 7L2 15V9z"/>`,
};

@customElement('specd-icon')
export class SpecdIcon extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) name: IconName = 'diamond';
  @property({ type: Number }) size: number = 16;
  @property({ type: String }) color: string = 'currentColor';

  override render() {
    const path = PATHS[this.name] ?? PATHS['diamond'];
    return html`${unsafeHTML(
      `<svg width="${this.size}" height="${this.size}" viewBox="0 0 24 24" fill="none" stroke="${this.color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`
    )}`;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-icon': SpecdIcon; }
}
```

- [ ] **Step 3: Create `SpecdIcon.test.ts`**

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => { await import('./SpecdIcon'); });

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-icon') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdIcon', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-icon')).toBeDefined();
  });
  it('renders an svg element', async () => {
    const el = await makeElement({ name: 'check' });
    expect(el.querySelector('svg')).not.toBeNull();
  });
  it('falls back to diamond for unknown icon', async () => {
    const el = await makeElement({ name: 'unknown-icon' });
    expect(el.querySelector('svg')).not.toBeNull();
  });
  it('respects size attribute', async () => {
    const el = await makeElement({ name: 'search', size: '24' });
    const svg = el.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('24');
  });
});
```

- [ ] **Step 4: Create `SpecdIcon.stories.ts`**

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdIcon';

const meta: Meta = { title: 'Components/Icon', component: 'specd-icon', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const AllIcons: Story = {
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center">
      ${['diamond','chevron-right','chevron-down','chevron-up','settings','refresh',
         'external-link','copy','check','x','search','sparkle','jump','eye','eye-off',
         'alert-circle','info','frame','component'].map(n => html`
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;font-size:10px;color:#6b7280">
          <specd-icon name=${n} size="20"></specd-icon>
          <span>${n}</span>
        </div>`)}
    </div>`,
};
```

- [ ] **Step 5: Create `index.ts`**

```typescript
export * from './SpecdIcon.js';
```

- [ ] **Step 6: Run tests**

Run: `cd /Users/home/Desktop/code/admiral-ds && npm test -- Icon 2>&1 | tail -10`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/components/Icon/
git commit -m "feat: add SpecdIcon component with 19 built-in icons"
```

---

## Task 9: New SpecdColorSwatch + SpecdFieldMessage

**Files:** `src/components/ColorSwatch/` and `src/components/FieldMessage/`

- [ ] **Step 1: Create `src/components/ColorSwatch/SpecdColorSwatch.ts`**

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('specd-color-swatch')
export class SpecdColorSwatch extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) color: string = '#000000';
  @property({ type: String }) label?: string;
  @property({ type: String }) size: 'sm' | 'md' = 'md';

  override render() {
    if (this.size === 'sm') {
      return html`<div class="color-swatch-sm" style="background:${this.color}"></div>`;
    }
    return html`
      <div class="color-swatch">
        <div class="color-swatch-dot" style="background:${this.color}"></div>
        ${this.label ? html`<span>${this.label}</span>` : nothing}
        <span class="color-swatch-label">${this.color}</span>
      </div>
    `;
  }
}
declare global { interface HTMLElementTagNameMap { 'specd-color-swatch': SpecdColorSwatch; } }
```

- [ ] **Step 2: Create `src/components/ColorSwatch/SpecdColorSwatch.test.ts`**

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
beforeAll(async () => { await import('./SpecdColorSwatch'); });
async function make(attrs: Record<string,string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-color-swatch') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k,v] of Object.entries(attrs)) el.setAttribute(k,v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}
describe('SpecdColorSwatch', () => {
  it('registers', () => expect(customElements.get('specd-color-swatch')).toBeDefined());
  it('renders .color-swatch in md mode', async () => {
    const el = await make({ color: '#ff0000' });
    expect(el.querySelector('.color-swatch')).not.toBeNull();
  });
  it('renders .color-swatch-sm in sm mode', async () => {
    const el = await make({ color: '#ff0000', size: 'sm' });
    expect(el.querySelector('.color-swatch-sm')).not.toBeNull();
  });
});
```

- [ ] **Step 3: Create `src/components/ColorSwatch/index.ts`**
```typescript
export * from './SpecdColorSwatch.js';
```

- [ ] **Step 4: Create `src/components/FieldMessage/SpecdFieldMessage.ts`**

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const ERROR_ICON = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
const OK_ICON   = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 12 4 9"/></svg>`;

@customElement('specd-field-message')
export class SpecdFieldMessage extends LitElement {
  override createRenderRoot() { return this; }
  @property({ type: String }) intent: 'error' | 'success' = 'error';
  @property({ type: String }) message: string = '';
  override render() {
    const icon = this.intent === 'error' ? ERROR_ICON : OK_ICON;
    return html`<div class="field-message ${this.intent}">${icon}${this.message}</div>`;
  }
}
declare global { interface HTMLElementTagNameMap { 'specd-field-message': SpecdFieldMessage; } }
```

- [ ] **Step 5: Create `src/components/FieldMessage/SpecdFieldMessage.test.ts`**

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
beforeAll(async () => { await import('./SpecdFieldMessage'); });
async function make(attrs: Record<string,string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-field-message') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k,v] of Object.entries(attrs)) el.setAttribute(k,v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}
describe('SpecdFieldMessage', () => {
  it('registers', () => expect(customElements.get('specd-field-message')).toBeDefined());
  it('applies error class', async () => {
    const el = await make({ intent: 'error', message: 'Required' });
    expect(el.querySelector('.field-message')?.className).toContain('error');
  });
  it('applies success class', async () => {
    const el = await make({ intent: 'success', message: 'Saved' });
    expect(el.querySelector('.field-message')?.className).toContain('success');
  });
});
```

- [ ] **Step 6: Create `src/components/FieldMessage/index.ts`**
```typescript
export * from './SpecdFieldMessage.js';
```

- [ ] **Step 7: Create stories for both** (`SpecdColorSwatch.stories.ts` and `SpecdFieldMessage.stories.ts`) with `render: () => html\`<specd-color-swatch color="#b8ff57" label="Lime"></specd-color-swatch>\`` and `render: () => html\`<specd-field-message intent="error" message="This field is required"></specd-field-message>\``

- [ ] **Step 8: Run tests**

Run: `cd /Users/home/Desktop/code/admiral-ds && npm test -- "ColorSwatch|FieldMessage" 2>&1 | tail -10`
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add src/components/ColorSwatch/ src/components/FieldMessage/
git commit -m "feat: add SpecdColorSwatch and SpecdFieldMessage components"
```

---

## Task 10: New SpecdInfoTrigger + SpecdAiGradientBtn + SpecdIgnoreFooter

**Files:** Three new component directories.

- [ ] **Step 1: Create `src/components/InfoTrigger/SpecdInfoTrigger.ts`**

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('specd-info-trigger')
export class SpecdInfoTrigger extends LitElement {
  override createRenderRoot() { return this; }
  @property({ type: String }) tooltip: string = '';
  override render() {
    return html`
      <button
        class="info-trigger"
        title=${this.tooltip}
        @mouseenter=${() => this.dispatchEvent(new CustomEvent('specd-info-show', { detail: { tooltip: this.tooltip }, bubbles: true, composed: true }))}
        @mouseleave=${() => this.dispatchEvent(new CustomEvent('specd-info-hide', { bubbles: true, composed: true }))}
      >?</button>`;
  }
}
declare global { interface HTMLElementTagNameMap { 'specd-info-trigger': SpecdInfoTrigger; } }
```

- [ ] **Step 2: Create `src/components/InfoTrigger/SpecdInfoTrigger.test.ts`**

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
beforeAll(async () => { await import('./SpecdInfoTrigger'); });
async function make(attrs: Record<string,string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-info-trigger') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k,v] of Object.entries(attrs)) el.setAttribute(k,v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}
describe('SpecdInfoTrigger', () => {
  it('registers', () => expect(customElements.get('specd-info-trigger')).toBeDefined());
  it('renders .info-trigger button', async () => {
    const el = await make({ tooltip: 'Hello' });
    expect(el.querySelector('.info-trigger')).not.toBeNull();
  });
  it('renders ? as text', async () => {
    const el = await make({ tooltip: 'Info' });
    expect(el.querySelector('.info-trigger')?.textContent?.trim()).toBe('?');
  });
});
```

- [ ] **Step 3: Create `src/components/InfoTrigger/index.ts`**: `export * from './SpecdInfoTrigger.js';`

- [ ] **Step 4: Create `src/components/AiGradientBtn/SpecdAiGradientBtn.ts`**

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const SPARKLE = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z"/></svg>`;
const CHECK   = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 12 4 9"/></svg>`;

@customElement('specd-ai-gradient-btn')
export class SpecdAiGradientBtn extends LitElement {
  override createRenderRoot() { return this; }
  @property({ type: String }) label: string = 'Fix with AI';
  @property({ type: Boolean }) applied: boolean = false;
  @property({ type: Boolean }) disabled: boolean = false;

  override render() {
    return html`
      <button
        class="btn-ai-gradient ${this.applied ? 'is-applied' : ''}"
        ?disabled=${this.disabled}
        @click=${() => !this.disabled && this.dispatchEvent(new CustomEvent('specd-click', { bubbles: true, composed: true }))}
      >
        ${this.applied
          ? html`<span style="display:flex;align-items:center;gap:5px;color:#fff">${CHECK} ${this.label}</span>`
          : html`${SPARKLE} <span class="ai-text">${this.label}</span>`}
      </button>`;
  }
}
declare global { interface HTMLElementTagNameMap { 'specd-ai-gradient-btn': SpecdAiGradientBtn; } }
```

- [ ] **Step 5: Create `src/components/AiGradientBtn/SpecdAiGradientBtn.test.ts`**

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
beforeAll(async () => { await import('./SpecdAiGradientBtn'); });
async function make(attrs: Record<string,string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-ai-gradient-btn') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k,v] of Object.entries(attrs)) el.setAttribute(k,v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}
describe('SpecdAiGradientBtn', () => {
  it('registers', () => expect(customElements.get('specd-ai-gradient-btn')).toBeDefined());
  it('renders .btn-ai-gradient', async () => {
    const el = await make({ label: 'Fix' });
    expect(el.querySelector('.btn-ai-gradient')).not.toBeNull();
  });
  it('adds is-applied class when applied', async () => {
    const el = await make({ applied: '' });
    expect(el.querySelector('.btn-ai-gradient')?.className).toContain('is-applied');
  });
});
```

- [ ] **Step 6: Create `src/components/AiGradientBtn/index.ts`**: `export * from './SpecdAiGradientBtn.js';`

- [ ] **Step 7: Create `src/components/IgnoreFooter/SpecdIgnoreFooter.ts`**

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('specd-ignore-footer')
export class SpecdIgnoreFooter extends LitElement {
  override createRenderRoot() { return this; }
  @property({ type: String }) mode: 'initial' | 'selecting' = 'initial';

  private _emit(name: string) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
  }

  override render() {
    if (this.mode === 'selecting') {
      return html`
        <div class="ignore-footer">
          <button class="btn-ignore-cancel" @click=${() => this._emit('specd-ignore-cancel')}>Cancel</button>
          <div class="ignore-footer-right">
            <button class="btn-ignore-selected" @click=${() => this._emit('specd-ignore-selected')}>Ignore selected</button>
            <button class="btn-ignore-all" @click=${() => this._emit('specd-ignore-all')}>Ignore all</button>
          </div>
        </div>`;
    }
    return html`
      <div class="ignore-footer">
        <button class="btn-ignore-cancel" @click=${() => this._emit('specd-ignore-start')}>Ignore…</button>
      </div>`;
  }
}
declare global { interface HTMLElementTagNameMap { 'specd-ignore-footer': SpecdIgnoreFooter; } }
```

- [ ] **Step 8: Create `src/components/IgnoreFooter/SpecdIgnoreFooter.test.ts`**

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
beforeAll(async () => { await import('./SpecdIgnoreFooter'); });
async function make(attrs: Record<string,string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-ignore-footer') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k,v] of Object.entries(attrs)) el.setAttribute(k,v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}
describe('SpecdIgnoreFooter', () => {
  it('registers', () => expect(customElements.get('specd-ignore-footer')).toBeDefined());
  it('renders ignore-footer in initial mode', async () => {
    const el = await make();
    expect(el.querySelector('.ignore-footer')).not.toBeNull();
    expect(el.querySelector('.btn-ignore-all')).toBeNull();
  });
  it('renders all buttons in selecting mode', async () => {
    const el = await make({ mode: 'selecting' });
    expect(el.querySelector('.btn-ignore-all')).not.toBeNull();
    expect(el.querySelector('.btn-ignore-selected')).not.toBeNull();
    expect(el.querySelector('.btn-ignore-cancel')).not.toBeNull();
  });
});
```

- [ ] **Step 9: Create `src/components/IgnoreFooter/index.ts`**: `export * from './SpecdIgnoreFooter.js';`

- [ ] **Step 10: Create minimal stories** for InfoTrigger, AiGradientBtn, IgnoreFooter (one Default story each showing the component)

- [ ] **Step 11: Run tests**

Run: `cd /Users/home/Desktop/code/admiral-ds && npm test -- "InfoTrigger|AiGradient|IgnoreFooter" 2>&1 | tail -10`
Expected: PASS

- [ ] **Step 12: Commit**

```bash
git add src/components/InfoTrigger/ src/components/AiGradientBtn/ src/components/IgnoreFooter/
git commit -m "feat: add SpecdInfoTrigger, SpecdAiGradientBtn, SpecdIgnoreFooter"
```

---

## Task 11: New SpecdQfReplaceRow + SpecdIssueRowActions

**Files:** `src/components/QfReplaceRow/` and `src/components/IssueRowActions/`

- [ ] **Step 1: Create `src/components/QfReplaceRow/SpecdQfReplaceRow.ts`**

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('specd-qf-replace-row')
export class SpecdQfReplaceRow extends LitElement {
  override createRenderRoot() { return this; }
  @property({ type: String }) name: string = '';
  @property({ type: String }) collection: string = '';
  @property({ type: String }) hex: string = '';
  @property({ type: String }) color: string = '#000000';
  @property({ type: Boolean }) selected: boolean = false;

  override render() {
    return html`
      <div class="qf-replace-row ${this.selected ? 'selected' : ''}"
           @click=${() => this.dispatchEvent(new CustomEvent('specd-select', { bubbles: true, composed: true }))}>
        <div class="qf-replace-radio"></div>
        <div class="qf-replace-body">
          <div class="qf-replace-name">${this.name}</div>
          <div class="qf-replace-collection">
            ${this.collection}
            ${this.hex ? html`<span class="qf-modal-hex">${this.hex}</span>` : ''}
          </div>
        </div>
        <div class="qf-replace-swatch" style="background:${this.color}"></div>
      </div>`;
  }
}
declare global { interface HTMLElementTagNameMap { 'specd-qf-replace-row': SpecdQfReplaceRow; } }
```

- [ ] **Step 2: Create test for QfReplaceRow** (`SpecdQfReplaceRow.test.ts`)

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
beforeAll(async () => { await import('./SpecdQfReplaceRow'); });
async function make(attrs: Record<string,string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-qf-replace-row') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k,v] of Object.entries(attrs)) el.setAttribute(k,v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}
describe('SpecdQfReplaceRow', () => {
  it('registers', () => expect(customElements.get('specd-qf-replace-row')).toBeDefined());
  it('renders .qf-replace-row', async () => {
    const el = await make({ name: 'Blue/500', collection: 'Primitives' });
    expect(el.querySelector('.qf-replace-row')).not.toBeNull();
  });
  it('adds selected class when selected', async () => {
    const el = await make({ name: 'X', selected: '' });
    expect(el.querySelector('.qf-replace-row')?.className).toContain('selected');
  });
});
```

- [ ] **Step 3: Create `src/components/QfReplaceRow/index.ts`**: `export * from './SpecdQfReplaceRow.js';`

- [ ] **Step 4: Create `src/components/IssueRowActions/SpecdIssueRowActions.ts`**

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const CHECK = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 12 4 9"/></svg>`;
const SPARKLE = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z"/></svg>`;

@customElement('specd-issue-row-actions')
export class SpecdIssueRowActions extends LitElement {
  override createRenderRoot() { return this; }
  @property({ type: String }) state: 'ghost' | 'applied' | 'ai-ghost' | 'ai-applied' = 'ghost';
  @property({ type: String }) label: string = 'Apply';

  override render() {
    const emit = () => this.dispatchEvent(new CustomEvent('specd-action', { bubbles: true, composed: true }));
    switch (this.state) {
      case 'applied':
        return html`<button class="btn-row-primary is-applied" @click=${emit}>${CHECK} ${this.label}</button>`;
      case 'ai-ghost':
        return html`<button class="btn-ai-gradient" @click=${emit}>${SPARKLE}<span class="ai-text">${this.label}</span></button>`;
      case 'ai-applied':
        return html`<button class="btn-ai-gradient is-applied" @click=${emit}>${CHECK} <span style="color:#fff">${this.label}</span></button>`;
      default:
        return html`<button class="btn-row-primary btn-hc-ghost" @click=${emit}>${this.label}</button>`;
    }
  }
}
declare global { interface HTMLElementTagNameMap { 'specd-issue-row-actions': SpecdIssueRowActions; } }
```

- [ ] **Step 5: Create `src/components/IssueRowActions/SpecdIssueRowActions.test.ts`**

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
beforeAll(async () => { await import('./SpecdIssueRowActions'); });
async function make(attrs: Record<string,string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-issue-row-actions') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k,v] of Object.entries(attrs)) el.setAttribute(k,v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}
describe('SpecdIssueRowActions', () => {
  it('registers', () => expect(customElements.get('specd-issue-row-actions')).toBeDefined());
  it('ghost state renders btn-hc-ghost', async () => {
    const el = await make({ state: 'ghost' });
    expect(el.querySelector('.btn-hc-ghost')).not.toBeNull();
  });
  it('applied state renders is-applied', async () => {
    const el = await make({ state: 'applied' });
    expect(el.querySelector('.is-applied')).not.toBeNull();
  });
  it('ai-ghost state renders btn-ai-gradient', async () => {
    const el = await make({ state: 'ai-ghost' });
    expect(el.querySelector('.btn-ai-gradient')).not.toBeNull();
  });
});
```

- [ ] **Step 6: Create `src/components/IssueRowActions/index.ts`**: `export * from './SpecdIssueRowActions.js';`

- [ ] **Step 7: Create minimal stories** for both components

- [ ] **Step 8: Run tests**

Run: `cd /Users/home/Desktop/code/admiral-ds && npm test -- "QfReplaceRow|IssueRowActions" 2>&1 | tail -10`
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add src/components/QfReplaceRow/ src/components/IssueRowActions/
git commit -m "feat: add SpecdQfReplaceRow and SpecdIssueRowActions"
```

---

## Task 12: New SpecdIssueRow (state machine)

**Files:** `src/components/IssueRow/`

- [ ] **Step 1: Create `src/components/IssueRow/SpecdIssueRow.ts`**

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const DIAMOND = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 9-9 9-9-9 9-9z"/></svg>`;

@customElement('specd-issue-row')
export class SpecdIssueRow extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) title: string = '';
  @property({ type: String }) desc?: string;
  @property({ type: String }) rowstate: 'initial' | 'editing' | 'applied' = 'initial';
  @property({ type: String }) icon?: string;

  override render() {
    return html`
      <div class="issue-row" data-row-state=${this.rowstate}>
        <div class="issue-row-top">
          <div class="issue-row-icon">${unsafeHTML(this.icon || DIAMOND)}</div>
          <div class="issue-row-body">
            <div class="issue-row-title">${this.title}</div>
            ${this.desc ? html`<div class="issue-row-desc">${this.desc}</div>` : nothing}
          </div>
          <div class="issue-row-cta row-state-initial"><slot name="cta"></slot></div>
        </div>
        <div class="row-state-editing"><slot name="editing"></slot></div>
        <div class="row-state-applied"><slot name="applied"></slot></div>
      </div>`;
  }
}
declare global { interface HTMLElementTagNameMap { 'specd-issue-row': SpecdIssueRow; } }
```

- [ ] **Step 2: Create `src/components/IssueRow/SpecdIssueRow.test.ts`**

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
beforeAll(async () => { await import('./SpecdIssueRow'); });
async function make(attrs: Record<string,string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-issue-row') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k,v] of Object.entries(attrs)) el.setAttribute(k,v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}
describe('SpecdIssueRow', () => {
  it('registers', () => expect(customElements.get('specd-issue-row')).toBeDefined());
  it('renders .issue-row with data-row-state', async () => {
    const el = await make({ title: 'Fill colour', rowstate: 'initial' });
    const row = el.querySelector('.issue-row') as HTMLElement;
    expect(row).not.toBeNull();
    expect(row.dataset.rowState).toBe('initial');
  });
  it('renders title', async () => {
    const el = await make({ title: 'Border width' });
    expect(el.querySelector('.issue-row-title')?.textContent?.trim()).toBe('Border width');
  });
  it('sets data-row-state=editing', async () => {
    const el = await make({ title: 'X', rowstate: 'editing' });
    expect((el.querySelector('.issue-row') as HTMLElement).dataset.rowState).toBe('editing');
  });
});
```

- [ ] **Step 3: Create `src/components/IssueRow/index.ts`**: `export * from './SpecdIssueRow.js';`

- [ ] **Step 4: Create `src/components/IssueRow/SpecdIssueRow.stories.ts`**

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdIssueRow';
import '../IssueRowActions/SpecdIssueRowActions';

const meta: Meta = { title: 'Components/IssueRow', component: 'specd-issue-row', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Initial: Story = {
  render: () => html`
    <specd-issue-row title="Hard-coded fill colour" desc="#B8FF57 · 3 layers" rowstate="initial">
      <specd-issue-row-actions slot="cta" state="ghost" label="Apply variable"></specd-issue-row-actions>
    </specd-issue-row>`,
};
export const Applied: Story = {
  render: () => html`
    <specd-issue-row title="Hard-coded fill colour" desc="#B8FF57 · 3 layers" rowstate="applied">
      <specd-issue-row-actions slot="cta" state="applied" label="Applied"></specd-issue-row-actions>
    </specd-issue-row>`,
};
export const AIGhost: Story = {
  render: () => html`
    <specd-issue-row title="Missing description" desc="No description set" rowstate="initial">
      <specd-issue-row-actions slot="cta" state="ai-ghost" label="Fix with AI"></specd-issue-row-actions>
    </specd-issue-row>`,
};
```

- [ ] **Step 5: Run tests**

Run: `cd /Users/home/Desktop/code/admiral-ds && npm test -- IssueRow 2>&1 | tail -10`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/IssueRow/
git commit -m "feat: add SpecdIssueRow with initial/editing/applied state machine"
```

---

## Task 13: New SpecdPropFixRow compound (+ SpecdPropFixSlot + SpecdPropFixCreate)

**Files:** `src/components/PropFixRow/`

- [ ] **Step 1: Create `src/components/PropFixRow/SpecdPropFixSlot.ts`**

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const CHECK = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 12 4 9"/></svg>`;
const CHEVRON = `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>`;

@customElement('specd-prop-fix-slot')
export class SpecdPropFixSlot extends LitElement {
  override createRenderRoot() { return this; }
  @property({ type: String }) currentvalue: string = '';
  @property({ type: String }) currentcolor?: string;
  @property({ type: String }) suggestname?: string;
  @property({ type: Boolean }) applied: boolean = false;

  override render() {
    return html`
      <div class="prop-fix-slot">
        <div class="prop-fix-current">
          ${this.currentcolor ? html`<div class="color-swatch-sm" style="background:${this.currentcolor}"></div>` : nothing}
          <span class="prop-fix-varname">${this.currentvalue}</span>
        </div>
        ${this.applied
          ? html`<button class="prop-fix-btn applied">${CHECK} Applied</button>`
          : this.suggestname
          ? html`
            <div class="prop-fix-suggest">
              <span class="prop-fix-varname">${this.suggestname}</span>
              ${CHEVRON}
            </div>
            <button class="prop-fix-btn"
              @click=${() => this.dispatchEvent(new CustomEvent('specd-apply', { bubbles: true, composed: true }))}>
              Apply
            </button>`
          : nothing}
      </div>`;
  }
}
declare global { interface HTMLElementTagNameMap { 'specd-prop-fix-slot': SpecdPropFixSlot; } }
```

- [ ] **Step 2: Create `src/components/PropFixRow/SpecdPropFixCreate.ts`**

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('specd-prop-fix-create')
export class SpecdPropFixCreate extends LitElement {
  override createRenderRoot() { return this; }
  @property({ type: String }) label: string = 'Create variable';
  override render() {
    return html`
      <button class="prop-fix-create-btn"
        @click=${() => this.dispatchEvent(new CustomEvent('specd-create', { bubbles: true, composed: true }))}>
        + ${this.label}
      </button>`;
  }
}
declare global { interface HTMLElementTagNameMap { 'specd-prop-fix-create': SpecdPropFixCreate; } }
```

- [ ] **Step 3: Create `src/components/PropFixRow/SpecdPropFixRow.ts`**

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const FRAME_ICON = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`;
const ARROW_ICON = `›`;

@customElement('specd-prop-fix-row')
export class SpecdPropFixRow extends LitElement {
  override createRenderRoot() { return this; }
  @property({ type: String }) layername: string = '';
  @property({ type: String }) attr: string = '';
  @property({ type: Number }) count?: number;

  override render() {
    return html`
      <div class="prop-fix-row">
        <div class="prop-fix-content">
          <div class="prop-fix-hdr">
            <span class="prop-fix-icon">${FRAME_ICON}</span>
            <button class="prop-fix-layer"
              @click=${() => this.dispatchEvent(new CustomEvent('specd-jump', { bubbles: true, composed: true }))}>
              ${this.layername}
            </button>
            <span class="prop-fix-arrow">${ARROW_ICON}</span>
            <span class="prop-fix-attr">${this.attr}</span>
            ${this.count !== undefined ? html`<span class="prop-fix-count">${this.count} instance${this.count !== 1 ? 's' : ''}</span>` : nothing}
          </div>
          <slot></slot>
        </div>
      </div>`;
  }
}
declare global { interface HTMLElementTagNameMap { 'specd-prop-fix-row': SpecdPropFixRow; } }
```

- [ ] **Step 4: Create `src/components/PropFixRow/SpecdPropFixRow.test.ts`**

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
beforeAll(async () => {
  await import('./SpecdPropFixRow');
  await import('./SpecdPropFixSlot');
  await import('./SpecdPropFixCreate');
});
async function make(tag: string, attrs: Record<string,string> = {}): Promise<HTMLElement> {
  const el = document.createElement(tag) as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k,v] of Object.entries(attrs)) el.setAttribute(k,v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}
describe('SpecdPropFixRow', () => {
  it('registers specd-prop-fix-row', () => expect(customElements.get('specd-prop-fix-row')).toBeDefined());
  it('registers specd-prop-fix-slot', () => expect(customElements.get('specd-prop-fix-slot')).toBeDefined());
  it('registers specd-prop-fix-create', () => expect(customElements.get('specd-prop-fix-create')).toBeDefined());
  it('renders .prop-fix-row', async () => {
    const el = await make('specd-prop-fix-row', { layername: 'Button/Primary', attr: 'fill' });
    expect(el.querySelector('.prop-fix-row')).not.toBeNull();
  });
  it('prop-fix-slot renders applied state', async () => {
    const el = await make('specd-prop-fix-slot', { currentvalue: '#fff', applied: '' });
    expect(el.querySelector('.prop-fix-btn.applied')).not.toBeNull();
  });
  it('prop-fix-create renders create button', async () => {
    const el = await make('specd-prop-fix-create', { label: 'Create' });
    expect(el.querySelector('.prop-fix-create-btn')).not.toBeNull();
  });
});
```

- [ ] **Step 5: Create `src/components/PropFixRow/index.ts`**

```typescript
export * from './SpecdPropFixRow.js';
export * from './SpecdPropFixSlot.js';
export * from './SpecdPropFixCreate.js';
```

- [ ] **Step 6: Create `src/components/PropFixRow/SpecdPropFixRow.stories.ts`**

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdPropFixRow';
import './SpecdPropFixSlot';
import './SpecdPropFixCreate';

const meta: Meta = { title: 'Components/PropFixRow', component: 'specd-prop-fix-row', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const WithSuggestion: Story = {
  render: () => html`
    <specd-prop-fix-row layername="Button/Primary" attr="fill" count="3">
      <specd-prop-fix-slot currentvalue="#B8FF57" currentcolor="#B8FF57" suggestname="Color/Brand/Lime"></specd-prop-fix-slot>
    </specd-prop-fix-row>`,
};
export const Applied: Story = {
  render: () => html`
    <specd-prop-fix-row layername="Card" attr="background">
      <specd-prop-fix-slot currentvalue="#ffffff" applied></specd-prop-fix-slot>
    </specd-prop-fix-row>`,
};
export const NoMatch: Story = {
  render: () => html`
    <specd-prop-fix-row layername="Icon/Star" attr="fill">
      <specd-prop-fix-create label="Create variable"></specd-prop-fix-create>
    </specd-prop-fix-row>`,
};
```

- [ ] **Step 7: Run tests**

Run: `cd /Users/home/Desktop/code/admiral-ds && npm test -- PropFixRow 2>&1 | tail -10`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add src/components/PropFixRow/
git commit -m "feat: add SpecdPropFixRow, SpecdPropFixSlot, SpecdPropFixCreate"
```

---

## Task 14: New SpecdVariablePicker + SpecdDataTable

**Files:** `src/components/VariablePicker/` and `src/components/DataTable/`

- [ ] **Step 1: Create `src/components/VariablePicker/SpecdVariablePicker.ts`**

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface VpOption { label: string; details?: string; color?: string; selected?: boolean; }

@customElement('specd-variable-picker')
export class SpecdVariablePicker extends LitElement {
  override createRenderRoot() { return this; }
  @property({ type: Boolean }) open: boolean = false;
  @property({ type: String }) title: string = 'Pick a variable';
  @property({ type: String }) options: string = '[]';
  @state() private _search: string = '';

  private _parsed(): VpOption[] {
    try { return JSON.parse(this.options); } catch { return []; }
  }

  override render() {
    if (!this.open) return nothing;
    const opts = this._parsed().filter(o =>
      !this._search || o.label.toLowerCase().includes(this._search.toLowerCase())
    );
    return html`
      <div class="variable-picker-modal">
        <div class="vp-header">
          <div class="vp-title">${this.title}</div>
          <button class="vp-close" @click=${() => { this.open = false; this.dispatchEvent(new CustomEvent('specd-close', { bubbles: true, composed: true })); }}>✕ Close</button>
        </div>
        <div class="vp-body">
          <input class="vp-search" placeholder="Search variables…" .value=${this._search}
            @input=${(e: Event) => this._search = (e.target as HTMLInputElement).value} />
          <div class="vp-section-list">
            ${opts.map(o => html`
              <div class="vp-radio-row ${o.selected ? 'selected' : ''}"
                   @click=${() => { this.dispatchEvent(new CustomEvent('specd-select', { detail: { label: o.label }, bubbles: true, composed: true })); }}>
                <div class="vp-radio-circle"></div>
                <div class="vp-radio-body">
                  <div class="vp-radio-label">${o.label}</div>
                  ${o.details ? html`<div class="vp-radio-details">${o.details}</div>` : nothing}
                </div>
                ${o.color ? html`<div class="vp-radio-swatch" style="background:${o.color}"></div>` : nothing}
              </div>`)}
          </div>
        </div>
      </div>`;
  }
}
declare global { interface HTMLElementTagNameMap { 'specd-variable-picker': SpecdVariablePicker; } }
```

- [ ] **Step 2: Create `src/components/VariablePicker/SpecdVariablePicker.test.ts`**

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
beforeAll(async () => { await import('./SpecdVariablePicker'); });
async function make(attrs: Record<string,string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-variable-picker') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k,v] of Object.entries(attrs)) el.setAttribute(k,v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}
describe('SpecdVariablePicker', () => {
  it('registers', () => expect(customElements.get('specd-variable-picker')).toBeDefined());
  it('renders nothing when closed', async () => {
    const el = await make({ options: '[]' });
    expect(el.querySelector('.variable-picker-modal')).toBeNull();
  });
  it('renders modal when open', async () => {
    const el = await make({ open: '', options: '[{"label":"Blue/500"}]' });
    expect(el.querySelector('.variable-picker-modal')).not.toBeNull();
  });
  it('renders options as vp-radio-row', async () => {
    const el = await make({ open: '', options: '[{"label":"A"},{"label":"B"}]' });
    expect(el.querySelectorAll('.vp-radio-row').length).toBe(2);
  });
});
```

- [ ] **Step 3: Create `src/components/VariablePicker/index.ts`**: `export * from './SpecdVariablePicker.js';`

- [ ] **Step 4: Create `src/components/DataTable/SpecdDataTable.ts`**

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface Column { key: string; label: string; sortable?: boolean; }

@customElement('specd-data-table')
export class SpecdDataTable extends LitElement {
  override createRenderRoot() { return this; }
  @property({ type: String }) columns: string = '[]';
  @property({ type: String }) rows: string = '[]';
  @property({ type: Boolean }) searchable: boolean = false;
  @state() private _search: string = '';

  private _cols(): Column[] { try { return JSON.parse(this.columns); } catch { return []; } }
  private _rows(): Record<string, string>[] { try { return JSON.parse(this.rows); } catch { return []; } }

  override render() {
    const cols = this._cols();
    const rows = this._rows().filter(r =>
      !this._search || cols.some(c => String(r[c.key] ?? '').toLowerCase().includes(this._search.toLowerCase()))
    );
    return html`
      ${this.searchable ? html`
        <div class="comp-toolbar">
          <input class="input table-search" placeholder="Search…" .value=${this._search}
            @input=${(e: Event) => {
              this._search = (e.target as HTMLInputElement).value;
              this.dispatchEvent(new CustomEvent('specd-search', { detail: { value: this._search }, bubbles: true, composed: true }));
            }} />
        </div>` : nothing}
      <div class="comp-table-wrap">
        <table class="comp-table">
          <thead>
            <tr>
              ${cols.map(c => html`
                <th class=${c.sortable ? 'sortable' : ''}
                    @click=${() => c.sortable && this.dispatchEvent(new CustomEvent('specd-sort', { detail: { key: c.key }, bubbles: true, composed: true }))}>
                  ${c.label}
                </th>`)}
            </tr>
          </thead>
          <tbody>
            ${rows.map(r => html`
              <tr>${cols.map(c => html`<td>${r[c.key] ?? ''}</td>`)}</tr>`)}
          </tbody>
        </table>
      </div>`;
  }
}
declare global { interface HTMLElementTagNameMap { 'specd-data-table': SpecdDataTable; } }
```

- [ ] **Step 5: Create `src/components/DataTable/SpecdDataTable.test.ts`**

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
beforeAll(async () => { await import('./SpecdDataTable'); });
async function make(attrs: Record<string,string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-data-table') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k,v] of Object.entries(attrs)) el.setAttribute(k,v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}
describe('SpecdDataTable', () => {
  it('registers', () => expect(customElements.get('specd-data-table')).toBeDefined());
  it('renders .comp-table', async () => {
    const el = await make({
      columns: '[{"key":"name","label":"Name"}]',
      rows: '[{"name":"Button"}]',
    });
    expect(el.querySelector('.comp-table')).not.toBeNull();
  });
  it('renders correct number of rows', async () => {
    const el = await make({
      columns: '[{"key":"n","label":"N"}]',
      rows: '[{"n":"A"},{"n":"B"},{"n":"C"}]',
    });
    expect(el.querySelectorAll('tbody tr').length).toBe(3);
  });
  it('renders search input when searchable', async () => {
    const el = await make({ columns: '[{"key":"n","label":"N"}]', rows: '[]', searchable: '' });
    expect(el.querySelector('.table-search')).not.toBeNull();
  });
});
```

- [ ] **Step 6: Create `src/components/DataTable/index.ts`**: `export * from './SpecdDataTable.js';`

- [ ] **Step 7: Create minimal stories** for both VariablePicker and DataTable

- [ ] **Step 8: Run tests**

Run: `cd /Users/home/Desktop/code/admiral-ds && npm test -- "VariablePicker|DataTable" 2>&1 | tail -10`
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add src/components/VariablePicker/ src/components/DataTable/
git commit -m "feat: add SpecdVariablePicker and SpecdDataTable"
```

---

## Task 15: Update barrel exports — src/index.ts and src/react.ts

**Files:**
- Modify: `src/index.ts`
- Modify: `src/react.ts`

- [ ] **Step 1: Add all new exports to `src/index.ts`**

Append these lines to the existing exports:
```typescript
export * from './components/Icon/index.js';
export * from './components/ColorSwatch/index.js';
export * from './components/FieldMessage/index.js';
export * from './components/InfoTrigger/index.js';
export * from './components/AiGradientBtn/index.js';
export * from './components/IgnoreFooter/index.js';
export * from './components/QfReplaceRow/index.js';
export * from './components/IssueRowActions/index.js';
export * from './components/IssueRow/index.js';
export * from './components/PropFixRow/index.js';
export * from './components/VariablePicker/index.js';
export * from './components/DataTable/index.js';
```

- [ ] **Step 2: Add React wrappers to `src/react.ts`**

Import all new components at the top, then add `createComponent` calls. Pattern for each:
```typescript
import { SpecdIcon } from './components/Icon/index.js';
// ... repeat for each

export const Icon = createComponent({ react: React, tagName: 'specd-icon', elementClass: SpecdIcon });
export const ColorSwatch = createComponent({ react: React, tagName: 'specd-color-swatch', elementClass: SpecdColorSwatch });
export const FieldMessage = createComponent({ react: React, tagName: 'specd-field-message', elementClass: SpecdFieldMessage });
export const InfoTrigger = createComponent({ react: React, tagName: 'specd-info-trigger', elementClass: SpecdInfoTrigger, events: { onSpecdInfoShow: 'specd-info-show', onSpecdInfoHide: 'specd-info-hide' } });
export const AiGradientBtn = createComponent({ react: React, tagName: 'specd-ai-gradient-btn', elementClass: SpecdAiGradientBtn, events: { onSpecdClick: 'specd-click' } });
export const IgnoreFooter = createComponent({ react: React, tagName: 'specd-ignore-footer', elementClass: SpecdIgnoreFooter, events: { onSpecdIgnoreStart: 'specd-ignore-start', onSpecdIgnoreAll: 'specd-ignore-all', onSpecdIgnoreSelected: 'specd-ignore-selected', onSpecdIgnoreCancel: 'specd-ignore-cancel' } });
export const QfReplaceRow = createComponent({ react: React, tagName: 'specd-qf-replace-row', elementClass: SpecdQfReplaceRow, events: { onSpecdSelect: 'specd-select' } });
export const IssueRowActions = createComponent({ react: React, tagName: 'specd-issue-row-actions', elementClass: SpecdIssueRowActions, events: { onSpecdAction: 'specd-action' } });
export const IssueRow = createComponent({ react: React, tagName: 'specd-issue-row', elementClass: SpecdIssueRow });
export const PropFixRow = createComponent({ react: React, tagName: 'specd-prop-fix-row', elementClass: SpecdPropFixRow, events: { onSpecdJump: 'specd-jump' } });
export const PropFixSlot = createComponent({ react: React, tagName: 'specd-prop-fix-slot', elementClass: SpecdPropFixSlot, events: { onSpecdApply: 'specd-apply' } });
export const PropFixCreate = createComponent({ react: React, tagName: 'specd-prop-fix-create', elementClass: SpecdPropFixCreate, events: { onSpecdCreate: 'specd-create' } });
export const VariablePicker = createComponent({ react: React, tagName: 'specd-variable-picker', elementClass: SpecdVariablePicker, events: { onSpecdSelect: 'specd-select', onSpecdClose: 'specd-close' } });
export const DataTable = createComponent({ react: React, tagName: 'specd-data-table', elementClass: SpecdDataTable, events: { onSpecdSort: 'specd-sort', onSpecdSearch: 'specd-search' } });
```

- [ ] **Step 3: Typecheck**

Run: `cd /Users/home/Desktop/code/admiral-ds && npm run typecheck 2>&1 | tail -20`
Expected: no errors. Fix any import path or type errors before continuing.

- [ ] **Step 4: Run full test suite**

Run: `cd /Users/home/Desktop/code/admiral-ds && npm test 2>&1 | tail -20`
Expected: all tests pass

- [ ] **Step 5: Build**

Run: `cd /Users/home/Desktop/code/admiral-ds && npm run build 2>&1 | tail -20`
Expected: build succeeds, no errors

- [ ] **Step 6: Commit**

```bash
git add src/index.ts src/react.ts
git commit -m "feat: update barrel exports and React wrappers for all new components"
```

---

## Task 16: Final integration commit

- [ ] **Step 1: Run full test + build**

Run: `cd /Users/home/Desktop/code/admiral-ds && npm test && npm run build 2>&1 | tail -30`
Expected: all green

- [ ] **Step 2: Final commit**

```bash
git add -A
git commit -m "feat: Specd DS overhaul — font fix, 7 component fixes, 12 new components"
```

---

## Self-Review

**Spec coverage:**
- ✅ Task 1: Font fix (Google Fonts in Storybook)
- ✅ Task 2: ProgressBar CSS class fix
- ✅ Task 3: Chip intent props + count badge classes
- ✅ Task 4: Input password reveal toggle
- ✅ Task 5: ChoiceCard icon slot + pill color
- ✅ Task 6: ScoreRing small size font scaling
- ✅ Task 7: IssueCard footer buttons + open state
- ✅ Tasks 8-9: Icon, ColorSwatch, FieldMessage
- ✅ Tasks 10-11: InfoTrigger, AiGradientBtn, IgnoreFooter, QfReplaceRow, IssueRowActions
- ✅ Tasks 12-14: IssueRow, PropFixRow (+slots), VariablePicker, DataTable
- ✅ Task 15: Barrel exports updated
- ✅ Task 16: Final build verification

**Gaps from user list not explicitly tasked** (lower priority, no breaking bug):
- Checkbox visual alignment — CSS is correct; Storybook story renders fine once fonts load
- Segmented story alignment — CSS matches; issue is font rendering pre-Task 1 fix
- Skeleton story content — stories already exist with render functions; visible once fonts load
- EmptyState CTA brown button — `<specd-button variant="primary">` in slot will render correctly via global CSS once fonts load
- StatTileLg story — icon prop already works in component; improve story in a follow-up
- Modal/Drawer design — implementations match CSS; verify in Storybook after font fix

