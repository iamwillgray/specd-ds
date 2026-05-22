# Specd DS — Remaining Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add every component visible in specd-preview.html that isn't yet a Lit web component.

**Architecture:** Each component is a Lit 3 LitElement with light DOM (no Shadow DOM), registered as `specd-*`. CSS classes come from `specd-ds.css` which is imported globally. All components export from `src/index.ts` and get a React wrapper in `src/react.ts`.

**Tech Stack:** Lit 3, TypeScript, Vitest 3 + happy-dom, Storybook 10, @lit/react

---

## Task 1 — Status Pills & Badges

**Components:** `SpecdHealthBadge`, `SpecdNavScore`, `SpecdAiPill`, `SpecdJumpBtn`, `SpecdSbPill`

### 1.1 — SpecdHealthBadge

- [ ] **Step 1:** Write failing test at `src/components/HealthBadge/SpecdHealthBadge.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdHealthBadge');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-health-badge') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdHealthBadge', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-health-badge')).toBeDefined();
  });

  it('renders inner span with health-badge class', async () => {
    const el = await makeElement({ label: 'Excellent' });
    const span = el.querySelector('span');
    expect(span).not.toBeNull();
    expect(span?.className).toContain('health-badge');
  });

  it('renders the label text', async () => {
    const el = await makeElement({ label: 'Good' });
    expect(el.textContent?.trim()).toBe('Good');
  });

  it('applies tier-good class by default', async () => {
    const el = await makeElement({ label: 'OK' });
    expect(el.querySelector('span')?.className).toContain('tier-good');
  });

  it('applies tier-med class when tier=med', async () => {
    const el = await makeElement({ label: 'OK', tier: 'med' });
    expect(el.querySelector('span')?.className).toContain('tier-med');
  });

  it('applies tier-poor class when tier=poor', async () => {
    const el = await makeElement({ label: 'Poor', tier: 'poor' });
    expect(el.querySelector('span')?.className).toContain('tier-poor');
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 3:** Create `src/components/HealthBadge/SpecdHealthBadge.types.ts`

```typescript
export type HealthBadgeTier = 'good' | 'med' | 'poor';

/**
 * Props for the SpecdHealthBadge (`<specd-health-badge>`) component.
 *
 * @example
 * <specd-health-badge label="Excellent" tier="good"></specd-health-badge>
 * <specd-health-badge label="Needs Work" tier="poor"></specd-health-badge>
 */
export interface HealthBadgeProps {
  /** Text label displayed inside the badge. */
  label: string;
  /** Tier variant controlling colour. @default 'good' */
  tier?: HealthBadgeTier;
}
```

- [ ] **Step 4:** Create `src/components/HealthBadge/SpecdHealthBadge.ts`

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HealthBadgeProps, HealthBadgeTier } from './SpecdHealthBadge.types.js';

/**
 * Specd DS — Health Badge
 *
 * A pill-shaped status badge indicating design system health tier.
 * Uses `.health-badge` CSS class with optional `.tier-good/.tier-med/.tier-poor` variants.
 *
 * @element specd-health-badge
 *
 * @attr {string} label - Text label
 * @attr {string} tier  - 'good' | 'med' | 'poor'
 *
 * @example
 * <specd-health-badge label="Excellent" tier="good"></specd-health-badge>
 */
@customElement('specd-health-badge')
export class SpecdHealthBadge extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string = '';
  @property({ type: String }) tier: HealthBadgeTier = 'good';

  private _classes(): string {
    return ['health-badge', `tier-${this.tier}`].join(' ');
  }

  override render() {
    return html`<span class=${this._classes()}>${this.label}</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-health-badge': SpecdHealthBadge;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 6:** Create `src/components/HealthBadge/SpecdHealthBadge.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdHealthBadge';

const meta: Meta = {
  title: 'Components/HealthBadge',
  component: 'specd-health-badge',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-health-badge
      label=${args.label ?? 'Health'}
      tier=${args.tier ?? 'good'}
    ></specd-health-badge>
  `,
  argTypes: {
    label: { control: 'text' },
    tier:  { control: 'select', options: ['good', 'med', 'poor'] },
  },
};
export default meta;
type Story = StoryObj;

export const Good: Story = { args: { label: 'Excellent', tier: 'good' } };
export const Med:  Story = { args: { label: 'Moderate',  tier: 'med'  } };
export const Poor: Story = { args: { label: 'Needs Work', tier: 'poor' } };

export const AllTiers: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;align-items:center;">
      <specd-health-badge label="Excellent" tier="good"></specd-health-badge>
      <specd-health-badge label="Moderate"  tier="med"></specd-health-badge>
      <specd-health-badge label="Needs Work" tier="poor"></specd-health-badge>
    </div>
  `,
};
```

- [ ] **Step 7:** Create `src/components/HealthBadge/index.ts`

```typescript
export { SpecdHealthBadge } from './SpecdHealthBadge.js';
export type { HealthBadgeProps, HealthBadgeTier } from './SpecdHealthBadge.types.js';
```

### 1.2 — SpecdNavScore

- [ ] **Step 1:** Write failing test at `src/components/NavScore/SpecdNavScore.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdNavScore');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-nav-score') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdNavScore', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-nav-score')).toBeDefined();
  });

  it('renders inner span with nav-score-badge class', async () => {
    const el = await makeElement({ score: '82' });
    const span = el.querySelector('span');
    expect(span).not.toBeNull();
    expect(span?.className).toContain('nav-score-badge');
  });

  it('renders the score value', async () => {
    const el = await makeElement({ score: '74' });
    expect(el.textContent?.trim()).toBe('74');
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 3:** Create `src/components/NavScore/SpecdNavScore.types.ts`

```typescript
/**
 * Props for the SpecdNavScore (`<specd-nav-score>`) component.
 *
 * @example
 * <specd-nav-score score="82"></specd-nav-score>
 */
export interface NavScoreProps {
  /** Numeric score to display (0–100). */
  score: number | string;
}
```

- [ ] **Step 4:** Create `src/components/NavScore/SpecdNavScore.ts`

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { NavScoreProps } from './SpecdNavScore.types.js';

/**
 * Specd DS — Nav Score Badge
 *
 * Small green pill used in the navigation header to display the current health score.
 * Uses `.nav-score-badge` CSS class.
 *
 * @element specd-nav-score
 *
 * @attr {number|string} score - Numeric score value (0–100)
 *
 * @example
 * <specd-nav-score score="82"></specd-nav-score>
 */
@customElement('specd-nav-score')
export class SpecdNavScore extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) score: string | number = 0;

  override render() {
    return html`<span class="nav-score-badge">${this.score}</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-nav-score': SpecdNavScore;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 6:** Create `src/components/NavScore/SpecdNavScore.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdNavScore';

const meta: Meta = {
  title: 'Components/NavScore',
  component: 'specd-nav-score',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-nav-score score=${args.score ?? 82}></specd-nav-score>
  `,
  argTypes: {
    score: { control: 'number' },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story  = { args: { score: 82 } };
export const Perfect: Story  = { args: { score: 100 } };
export const Low: Story      = { args: { score: 34 } };
```

- [ ] **Step 7:** Create `src/components/NavScore/index.ts`

```typescript
export { SpecdNavScore } from './SpecdNavScore.js';
export type { NavScoreProps } from './SpecdNavScore.types.js';
```

### 1.3 — SpecdAiPill

- [ ] **Step 1:** Write failing test at `src/components/AiPill/SpecdAiPill.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdAiPill');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-ai-pill') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdAiPill', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-ai-pill')).toBeDefined();
  });

  it('renders a button with ai-pill class', async () => {
    const el = await makeElement({ label: 'Fix with AI' });
    const btn = el.querySelector('button');
    expect(btn).not.toBeNull();
    expect(btn?.className).toContain('ai-pill');
  });

  it('renders the label text', async () => {
    const el = await makeElement({ label: 'Suggest Fix' });
    expect(el.textContent?.trim()).toContain('Suggest Fix');
  });

  it('renders a sparkle SVG icon', async () => {
    const el = await makeElement({ label: 'AI' });
    expect(el.querySelector('svg')).not.toBeNull();
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 3:** Create `src/components/AiPill/SpecdAiPill.types.ts`

```typescript
/**
 * Props for the SpecdAiPill (`<specd-ai-pill>`) component.
 *
 * @example
 * <specd-ai-pill label="Fix with AI"></specd-ai-pill>
 */
export interface AiPillProps {
  /** Text label displayed next to the sparkle icon. */
  label: string;
  /** Whether the button is disabled. @default false */
  disabled?: boolean;
}
```

- [ ] **Step 4:** Create `src/components/AiPill/SpecdAiPill.ts`

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { AiPillProps } from './SpecdAiPill.types.js';

/**
 * Specd DS — AI Pill
 *
 * A glassmorphism ghost pill button with sparkle icon, used to trigger AI actions.
 * Uses `.ai-pill` CSS class.
 *
 * @element specd-ai-pill
 *
 * @attr {string}  label    - Button label text
 * @attr {boolean} disabled - Disables the button
 *
 * @fires click - When the pill is clicked
 *
 * @example
 * <specd-ai-pill label="Fix with AI"></specd-ai-pill>
 */
@customElement('specd-ai-pill')
export class SpecdAiPill extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string = '';
  @property({ type: Boolean }) disabled: boolean = false;

  private _sparkleIcon() {
    return html`<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.636 5.636l2.121 2.121m8.485 8.485 2.121 2.121M5.636 18.364l2.121-2.121m8.485-8.485 2.121-2.121"/>
    </svg>`;
  }

  override render() {
    return html`
      <button class="ai-pill" ?disabled=${this.disabled}>
        ${this._sparkleIcon()}
        ${this.label}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-ai-pill': SpecdAiPill;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 6:** Create `src/components/AiPill/SpecdAiPill.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdAiPill';

const meta: Meta = {
  title: 'Components/AiPill',
  component: 'specd-ai-pill',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-ai-pill
      label=${args.label ?? 'Fix with AI'}
      ?disabled=${args.disabled}
    ></specd-ai-pill>
  `,
  argTypes: {
    label:    { control: 'text' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

export const Default:  Story = { args: { label: 'Fix with AI' } };
export const Suggest:  Story = { args: { label: 'Suggest Variable' } };
export const Disabled: Story = { args: { label: 'Fix with AI', disabled: true } };
```

- [ ] **Step 7:** Create `src/components/AiPill/index.ts`

```typescript
export { SpecdAiPill } from './SpecdAiPill.js';
export type { AiPillProps } from './SpecdAiPill.types.js';
```

### 1.4 — SpecdJumpBtn

- [ ] **Step 1:** Write failing test at `src/components/JumpBtn/SpecdJumpBtn.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdJumpBtn');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-jump-btn') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdJumpBtn', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-jump-btn')).toBeDefined();
  });

  it('renders a button with btn-jump class', async () => {
    const el = await makeElement({ label: 'Jump' });
    const btn = el.querySelector('button');
    expect(btn).not.toBeNull();
    expect(btn?.className).toContain('btn-jump');
  });

  it('renders the label text', async () => {
    const el = await makeElement({ label: 'View in Figma' });
    expect(el.textContent?.trim()).toContain('View in Figma');
  });

  it('renders an arrow SVG icon', async () => {
    const el = await makeElement({ label: 'Jump' });
    expect(el.querySelector('svg')).not.toBeNull();
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 3:** Create `src/components/JumpBtn/SpecdJumpBtn.types.ts`

```typescript
/**
 * Props for the SpecdJumpBtn (`<specd-jump-btn>`) component.
 *
 * @example
 * <specd-jump-btn label="View in Figma"></specd-jump-btn>
 */
export interface JumpBtnProps {
  /** Button label text. @default 'Jump' */
  label?: string;
  /** Whether the button is disabled. @default false */
  disabled?: boolean;
}
```

- [ ] **Step 4:** Create `src/components/JumpBtn/SpecdJumpBtn.ts`

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { JumpBtnProps } from './SpecdJumpBtn.types.js';

/**
 * Specd DS — Jump Button
 *
 * A small ghost button with an arrow-up-right icon, used to jump to a node in Figma.
 * Uses `.btn-jump` CSS class.
 *
 * @element specd-jump-btn
 *
 * @attr {string}  label    - Button label text
 * @attr {boolean} disabled - Disables the button
 *
 * @fires click - When the button is clicked
 *
 * @example
 * <specd-jump-btn label="View in Figma"></specd-jump-btn>
 */
@customElement('specd-jump-btn')
export class SpecdJumpBtn extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string = 'Jump';
  @property({ type: Boolean }) disabled: boolean = false;

  private _arrowIcon() {
    return html`<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M7 7h10v10"/>
    </svg>`;
  }

  override render() {
    return html`
      <button class="btn-jump" ?disabled=${this.disabled}>
        ${this.label}${this._arrowIcon()}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-jump-btn': SpecdJumpBtn;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 6:** Create `src/components/JumpBtn/SpecdJumpBtn.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdJumpBtn';

const meta: Meta = {
  title: 'Components/JumpBtn',
  component: 'specd-jump-btn',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-jump-btn
      label=${args.label ?? 'Jump'}
      ?disabled=${args.disabled}
    ></specd-jump-btn>
  `,
  argTypes: {
    label:    { control: 'text' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

export const Default:      Story = { args: { label: 'Jump' } };
export const ViewInFigma:  Story = { args: { label: 'View in Figma' } };
export const Disabled:     Story = { args: { label: 'Jump', disabled: true } };
```

- [ ] **Step 7:** Create `src/components/JumpBtn/index.ts`

```typescript
export { SpecdJumpBtn } from './SpecdJumpBtn.js';
export type { JumpBtnProps } from './SpecdJumpBtn.types.js';
```

### 1.5 — SpecdSbPill

- [ ] **Step 1:** Write failing test at `src/components/SbPill/SpecdSbPill.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdSbPill');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-sb-pill') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdSbPill', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-sb-pill')).toBeDefined();
  });

  it('renders inner span with sb-pill class', async () => {
    const el = await makeElement({ label: 'Matched', variant: 'good' });
    const span = el.querySelector('span');
    expect(span).not.toBeNull();
    expect(span?.className).toContain('sb-pill');
  });

  it('applies sb-pill-good class for good variant', async () => {
    const el = await makeElement({ label: 'Matched', variant: 'good' });
    expect(el.querySelector('span')?.className).toContain('sb-pill-good');
  });

  it('applies sb-pill-bad class for bad variant', async () => {
    const el = await makeElement({ label: 'Missing', variant: 'bad' });
    expect(el.querySelector('span')?.className).toContain('sb-pill-bad');
  });

  it('applies sb-pill-muted class for muted variant', async () => {
    const el = await makeElement({ label: 'N/A', variant: 'muted' });
    expect(el.querySelector('span')?.className).toContain('sb-pill-muted');
  });

  it('applies sb-pill-muted class by default', async () => {
    const el = await makeElement({ label: 'N/A' });
    expect(el.querySelector('span')?.className).toContain('sb-pill-muted');
  });

  it('renders the label text', async () => {
    const el = await makeElement({ label: 'Matched' });
    expect(el.textContent?.trim()).toBe('Matched');
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 3:** Create `src/components/SbPill/SpecdSbPill.types.ts`

```typescript
export type SbPillVariant = 'good' | 'bad' | 'muted';

/**
 * Props for the SpecdSbPill (`<specd-sb-pill>`) component.
 *
 * @example
 * <specd-sb-pill label="Matched" variant="good"></specd-sb-pill>
 * <specd-sb-pill label="Missing" variant="bad"></specd-sb-pill>
 */
export interface SbPillProps {
  /** Text label displayed in the pill. */
  label: string;
  /** Visual variant controlling colour. @default 'muted' */
  variant?: SbPillVariant;
}
```

- [ ] **Step 4:** Create `src/components/SbPill/SpecdSbPill.ts`

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SbPillProps, SbPillVariant } from './SpecdSbPill.types.js';

/**
 * Specd DS — Storybook Pill
 *
 * Tiny mono pill used to show Storybook matching status per component row.
 * Uses `.sb-pill` base class plus `.sb-pill-good/.sb-pill-bad/.sb-pill-muted` variant.
 *
 * @element specd-sb-pill
 *
 * @attr {string} label   - Text label
 * @attr {string} variant - 'good' | 'bad' | 'muted'
 *
 * @example
 * <specd-sb-pill label="Matched" variant="good"></specd-sb-pill>
 */
@customElement('specd-sb-pill')
export class SpecdSbPill extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string = '';
  @property({ type: String }) variant: SbPillVariant = 'muted';

  private _classes(): string {
    return `sb-pill sb-pill-${this.variant}`;
  }

  override render() {
    return html`<span class=${this._classes()}>${this.label}</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-sb-pill': SpecdSbPill;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 6:** Create `src/components/SbPill/SpecdSbPill.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdSbPill';

const meta: Meta = {
  title: 'Components/SbPill',
  component: 'specd-sb-pill',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-sb-pill
      label=${args.label ?? 'N/A'}
      variant=${args.variant ?? 'muted'}
    ></specd-sb-pill>
  `,
  argTypes: {
    label:   { control: 'text' },
    variant: { control: 'select', options: ['good', 'bad', 'muted'] },
  },
};
export default meta;
type Story = StoryObj;

export const Good:  Story = { args: { label: 'Matched', variant: 'good'  } };
export const Bad:   Story = { args: { label: 'Missing', variant: 'bad'   } };
export const Muted: Story = { args: { label: 'N/A',     variant: 'muted' } };

export const AllVariants: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;align-items:center;">
      <specd-sb-pill label="Matched" variant="good"></specd-sb-pill>
      <specd-sb-pill label="Missing" variant="bad"></specd-sb-pill>
      <specd-sb-pill label="N/A"     variant="muted"></specd-sb-pill>
    </div>
  `,
};
```

- [ ] **Step 7:** Create `src/components/SbPill/index.ts`

```typescript
export { SpecdSbPill } from './SpecdSbPill.js';
export type { SbPillProps, SbPillVariant } from './SpecdSbPill.types.js';
```

### 1.6 — Wire Task 1 into src/index.ts and src/react.ts

- [ ] **Step 1:** Add exports to `src/index.ts` after the Avatar export line:

```typescript
export * from './components/HealthBadge/index.js';
export * from './components/NavScore/index.js';
export * from './components/AiPill/index.js';
export * from './components/JumpBtn/index.js';
export * from './components/SbPill/index.js';
```

- [ ] **Step 2:** Add React wrappers to `src/react.ts`. Add these imports after the SpecdAvatar import:

```typescript
import { SpecdHealthBadge } from './components/HealthBadge/SpecdHealthBadge.js';
import { SpecdNavScore }    from './components/NavScore/SpecdNavScore.js';
import { SpecdAiPill }      from './components/AiPill/SpecdAiPill.js';
import { SpecdJumpBtn }     from './components/JumpBtn/SpecdJumpBtn.js';
import { SpecdSbPill }      from './components/SbPill/SpecdSbPill.js';
```

Then add these wrapper exports after the Avatar createComponent call:

```typescript
/** Auto-generated React wrapper for <specd-health-badge>. Do not hand-edit. */
export const HealthBadge = createComponent({
  react: React,
  tagName: 'specd-health-badge',
  elementClass: SpecdHealthBadge,
  events: {},
});

/** Auto-generated React wrapper for <specd-nav-score>. Do not hand-edit. */
export const NavScore = createComponent({
  react: React,
  tagName: 'specd-nav-score',
  elementClass: SpecdNavScore,
  events: {},
});

/** Auto-generated React wrapper for <specd-ai-pill>. Do not hand-edit. */
export const AiPill = createComponent({
  react: React,
  tagName: 'specd-ai-pill',
  elementClass: SpecdAiPill,
  events: { onClick: 'click' },
});

/** Auto-generated React wrapper for <specd-jump-btn>. Do not hand-edit. */
export const JumpBtn = createComponent({
  react: React,
  tagName: 'specd-jump-btn',
  elementClass: SpecdJumpBtn,
  events: { onClick: 'click' },
});

/** Auto-generated React wrapper for <specd-sb-pill>. Do not hand-edit. */
export const SbPill = createComponent({
  react: React,
  tagName: 'specd-sb-pill',
  elementClass: SpecdSbPill,
  events: {},
});
```

- [ ] **Step 3:** Run all unit tests — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 4:** Commit
```bash
cd /Users/home/Desktop/code/admiral-ds
git add src/components/HealthBadge src/components/NavScore src/components/AiPill src/components/JumpBtn src/components/SbPill src/index.ts src/react.ts
git commit -m "feat(ds): add SpecdHealthBadge, SpecdNavScore, SpecdAiPill, SpecdJumpBtn, SpecdSbPill"
```

---

## Task 2 — Severity Header & Score Trend

**Components:** `SpecdSeverityHeader`, `SpecdScoreTrend`

### 2.1 — SpecdSeverityHeader

- [ ] **Step 1:** Write failing test at `src/components/SeverityHeader/SpecdSeverityHeader.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdSeverityHeader');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-severity-header') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdSeverityHeader', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-severity-header')).toBeDefined();
  });

  it('renders root div with severity-header class', async () => {
    const el = await makeElement({ intent: 'critical', label: 'Critical', count: '3' });
    const div = el.querySelector('div');
    expect(div).not.toBeNull();
    expect(div?.className).toContain('severity-header');
  });

  it('renders the label text', async () => {
    const el = await makeElement({ intent: 'critical', label: 'Critical', count: '3' });
    expect(el.textContent).toContain('Critical');
  });

  it('renders the count', async () => {
    const el = await makeElement({ intent: 'warning', label: 'Warning', count: '7' });
    expect(el.textContent).toContain('7');
  });

  it('applies critical intent class on dot', async () => {
    const el = await makeElement({ intent: 'critical', label: 'Critical', count: '2' });
    expect(el.querySelector('.severity-dot')?.className).toContain('critical');
  });

  it('applies warning intent class on dot', async () => {
    const el = await makeElement({ intent: 'warning', label: 'Warning', count: '5' });
    expect(el.querySelector('.severity-dot')?.className).toContain('warning');
  });

  it('applies info intent class on dot', async () => {
    const el = await makeElement({ intent: 'info', label: 'Info', count: '1' });
    expect(el.querySelector('.severity-dot')?.className).toContain('info');
  });

  it('applies critical intent class on count', async () => {
    const el = await makeElement({ intent: 'critical', label: 'Critical', count: '4' });
    expect(el.querySelector('.severity-count')?.className).toContain('critical');
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 3:** Create `src/components/SeverityHeader/SpecdSeverityHeader.types.ts`

```typescript
export type SeverityIntent = 'critical' | 'warning' | 'info';

/**
 * Props for the SpecdSeverityHeader (`<specd-severity-header>`) component.
 *
 * @example
 * <specd-severity-header intent="critical" label="Critical" count="3"></specd-severity-header>
 */
export interface SeverityHeaderProps {
  /** Severity level controlling dot colour and count colour. */
  intent: SeverityIntent;
  /** Uppercase label text (e.g. "Critical", "Warning", "Info"). */
  label: string;
  /** Issue count displayed on the right. */
  count: number;
}
```

- [ ] **Step 4:** Create `src/components/SeverityHeader/SpecdSeverityHeader.ts`

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SeverityHeaderProps, SeverityIntent } from './SpecdSeverityHeader.types.js';

/**
 * Specd DS — Severity Header
 *
 * A section header row used in the Issues panel to separate critical / warning / info groups.
 * Uses `.severity-header`, `.severity-dot`, `.severity-title`, `.severity-count` CSS classes.
 *
 * @element specd-severity-header
 *
 * @attr {string} intent - 'critical' | 'warning' | 'info'
 * @attr {string} label  - Section label text
 * @attr {number} count  - Issue count
 *
 * @example
 * <specd-severity-header intent="critical" label="Critical" count="3"></specd-severity-header>
 */
@customElement('specd-severity-header')
export class SpecdSeverityHeader extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) intent: SeverityIntent = 'info';
  @property({ type: String }) label: string = '';
  @property({ type: Number }) count: number = 0;

  override render() {
    return html`
      <div class="severity-header">
        <span class="severity-dot ${this.intent}"></span>
        <span class="severity-title">${this.label}</span>
        <span class="severity-count ${this.intent}">${this.count}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-severity-header': SpecdSeverityHeader;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 6:** Create `src/components/SeverityHeader/SpecdSeverityHeader.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdSeverityHeader';

const meta: Meta = {
  title: 'Components/SeverityHeader',
  component: 'specd-severity-header',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-severity-header
      intent=${args.intent ?? 'info'}
      label=${args.label ?? 'Info'}
      count=${args.count ?? 0}
    ></specd-severity-header>
  `,
  argTypes: {
    intent: { control: 'select', options: ['critical', 'warning', 'info'] },
    label:  { control: 'text' },
    count:  { control: 'number' },
  },
};
export default meta;
type Story = StoryObj;

export const Critical: Story = { args: { intent: 'critical', label: 'Critical', count: 3 } };
export const Warning:  Story = { args: { intent: 'warning',  label: 'Warning',  count: 7 } };
export const Info:     Story = { args: { intent: 'info',     label: 'Info',     count: 12 } };

export const AllIntents: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:0;">
      <specd-severity-header intent="critical" label="Critical" count="3"></specd-severity-header>
      <specd-severity-header intent="warning"  label="Warning"  count="7"></specd-severity-header>
      <specd-severity-header intent="info"     label="Info"     count="12"></specd-severity-header>
    </div>
  `,
};
```

- [ ] **Step 7:** Create `src/components/SeverityHeader/index.ts`

```typescript
export { SpecdSeverityHeader } from './SpecdSeverityHeader.js';
export type { SeverityHeaderProps, SeverityIntent } from './SpecdSeverityHeader.types.js';
```

### 2.2 — SpecdScoreTrend

- [ ] **Step 1:** Write failing test at `src/components/ScoreTrend/SpecdScoreTrend.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdScoreTrend');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-score-trend') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdScoreTrend', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-score-trend')).toBeDefined();
  });

  it('renders root div with score-trend class', async () => {
    const el = await makeElement({ delta: '+4.2', direction: 'up', meta: 'vs last scan' });
    const div = el.querySelector('div');
    expect(div).not.toBeNull();
    expect(div?.className).toContain('score-trend');
  });

  it('renders the delta text', async () => {
    const el = await makeElement({ delta: '+4.2', direction: 'up', meta: 'vs last scan' });
    expect(el.textContent).toContain('+4.2');
  });

  it('renders the meta text', async () => {
    const el = await makeElement({ delta: '+4.2', direction: 'up', meta: 'vs last scan' });
    expect(el.textContent).toContain('vs last scan');
  });

  it('applies up direction class on delta', async () => {
    const el = await makeElement({ delta: '+4.2', direction: 'up', meta: '' });
    expect(el.querySelector('.score-trend-delta')?.className).toContain('up');
  });

  it('applies down direction class on delta', async () => {
    const el = await makeElement({ delta: '-2.1', direction: 'down', meta: '' });
    expect(el.querySelector('.score-trend-delta')?.className).toContain('down');
  });

  it('applies flat direction class on delta', async () => {
    const el = await makeElement({ delta: '0.0', direction: 'flat', meta: '' });
    expect(el.querySelector('.score-trend-delta')?.className).toContain('flat');
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 3:** Create `src/components/ScoreTrend/SpecdScoreTrend.types.ts`

```typescript
export type TrendDirection = 'up' | 'down' | 'flat';

/**
 * Props for the SpecdScoreTrend (`<specd-score-trend>`) component.
 *
 * @example
 * <specd-score-trend delta="+4.2" direction="up" meta="vs last scan"></specd-score-trend>
 */
export interface ScoreTrendProps {
  /** Delta string, e.g. "+4.2" or "-2.1". */
  delta: string;
  /** Direction for colour: 'up' (green), 'down' (red), 'flat' (muted). */
  direction: TrendDirection;
  /** Contextual label, e.g. "vs last scan". */
  meta?: string;
}
```

- [ ] **Step 4:** Create `src/components/ScoreTrend/SpecdScoreTrend.ts`

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ScoreTrendProps, TrendDirection } from './SpecdScoreTrend.types.js';

/**
 * Specd DS — Score Trend
 *
 * Displays a score delta with directional colour cue and optional meta label.
 * Uses `.score-trend`, `.score-trend-delta.up/down/flat`, `.score-trend-meta` CSS classes.
 *
 * @element specd-score-trend
 *
 * @attr {string} delta     - Delta string (e.g. "+4.2")
 * @attr {string} direction - 'up' | 'down' | 'flat'
 * @attr {string} meta      - Optional contextual label
 *
 * @example
 * <specd-score-trend delta="+4.2" direction="up" meta="vs last scan"></specd-score-trend>
 */
@customElement('specd-score-trend')
export class SpecdScoreTrend extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) delta: string = '';
  @property({ type: String }) direction: TrendDirection = 'flat';
  @property({ type: String }) meta: string = '';

  override render() {
    return html`
      <div class="score-trend">
        <span class="score-trend-delta ${this.direction}">${this.delta}</span>
        ${this.meta ? html`<span class="score-trend-meta">${this.meta}</span>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-score-trend': SpecdScoreTrend;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 6:** Create `src/components/ScoreTrend/SpecdScoreTrend.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdScoreTrend';

const meta: Meta = {
  title: 'Components/ScoreTrend',
  component: 'specd-score-trend',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-score-trend
      delta=${args.delta ?? '0.0'}
      direction=${args.direction ?? 'flat'}
      meta=${args.meta ?? ''}
    ></specd-score-trend>
  `,
  argTypes: {
    delta:     { control: 'text' },
    direction: { control: 'select', options: ['up', 'down', 'flat'] },
    meta:      { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Up:   Story = { args: { delta: '+4.2', direction: 'up',   meta: 'vs last scan' } };
export const Down: Story = { args: { delta: '-2.1', direction: 'down', meta: 'vs last scan' } };
export const Flat: Story = { args: { delta: '0.0',  direction: 'flat', meta: 'no change' } };
export const NoMeta: Story = { args: { delta: '+1.5', direction: 'up' } };
```

- [ ] **Step 7:** Create `src/components/ScoreTrend/index.ts`

```typescript
export { SpecdScoreTrend } from './SpecdScoreTrend.js';
export type { ScoreTrendProps, TrendDirection } from './SpecdScoreTrend.types.js';
```

### 2.3 — Wire Task 2 into src/index.ts and src/react.ts

- [ ] **Step 1:** Add exports to `src/index.ts` after the SbPill export:

```typescript
export * from './components/SeverityHeader/index.js';
export * from './components/ScoreTrend/index.js';
```

- [ ] **Step 2:** Add imports to `src/react.ts` after the SbPill import:

```typescript
import { SpecdSeverityHeader } from './components/SeverityHeader/SpecdSeverityHeader.js';
import { SpecdScoreTrend }     from './components/ScoreTrend/SpecdScoreTrend.js';
```

Then add wrapper exports after the SbPill createComponent call:

```typescript
/** Auto-generated React wrapper for <specd-severity-header>. Do not hand-edit. */
export const SeverityHeader = createComponent({
  react: React,
  tagName: 'specd-severity-header',
  elementClass: SpecdSeverityHeader,
  events: {},
});

/** Auto-generated React wrapper for <specd-score-trend>. Do not hand-edit. */
export const ScoreTrend = createComponent({
  react: React,
  tagName: 'specd-score-trend',
  elementClass: SpecdScoreTrend,
  events: {},
});
```

- [ ] **Step 3:** Run all unit tests — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 4:** Commit
```bash
cd /Users/home/Desktop/code/admiral-ds
git add src/components/SeverityHeader src/components/ScoreTrend src/index.ts src/react.ts
git commit -m "feat(ds): add SpecdSeverityHeader and SpecdScoreTrend"
```

---

## Task 3 — Score Ring

**Component:** `SpecdScoreRing`

- [ ] **Step 1:** Write failing test at `src/components/ScoreRing/SpecdScoreRing.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdScoreRing');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-score-ring') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdScoreRing', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-score-ring')).toBeDefined();
  });

  it('renders root div with score-circle class', async () => {
    const el = await makeElement({ score: '82' });
    const div = el.querySelector('div');
    expect(div).not.toBeNull();
    expect(div?.className).toContain('score-circle');
  });

  it('renders the score number', async () => {
    const el = await makeElement({ score: '74' });
    expect(el.querySelector('.score-number-lg')?.textContent?.trim()).toBe('74');
  });

  it('renders the /100 denominator', async () => {
    const el = await makeElement({ score: '50' });
    expect(el.querySelector('.score-denom-new')?.textContent?.trim()).toBe('/100');
  });

  it('applies tier-excellent class when tier=excellent', async () => {
    const el = await makeElement({ score: '95', tier: 'excellent' });
    expect(el.querySelector('.score-circle')?.className).toContain('tier-excellent');
  });

  it('applies tier-good class when tier=good', async () => {
    const el = await makeElement({ score: '75', tier: 'good' });
    expect(el.querySelector('.score-circle')?.className).toContain('tier-good');
  });

  it('applies tier-med class when tier=med', async () => {
    const el = await makeElement({ score: '55', tier: 'med' });
    expect(el.querySelector('.score-circle')?.className).toContain('tier-med');
  });

  it('applies tier-poor class when tier=poor', async () => {
    const el = await makeElement({ score: '25', tier: 'poor' });
    expect(el.querySelector('.score-circle')?.className).toContain('tier-poor');
  });

  it('sets --score-percentage CSS variable on host', async () => {
    const el = await makeElement({ score: '60' });
    const style = (el as HTMLElement).style.getPropertyValue('--score-percentage');
    expect(style).toBe('60');
  });

  it('defaults tier to excellent when not specified', async () => {
    const el = await makeElement({ score: '90' });
    expect(el.querySelector('.score-circle')?.className).toContain('tier-excellent');
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 3:** Create `src/components/ScoreRing/SpecdScoreRing.types.ts`

```typescript
export type ScoreRingTier = 'excellent' | 'good' | 'med' | 'poor';

/**
 * Props for the SpecdScoreRing (`<specd-score-ring>`) component.
 *
 * @example
 * <specd-score-ring score="82" tier="good"></specd-score-ring>
 */
export interface ScoreRingProps {
  /** Health score (0–100). Sets the arc fill percentage. */
  score: number;
  /** Tier variant controlling arc colour. @default 'excellent' */
  tier?: ScoreRingTier;
  /** Ring diameter in px. @default 104 */
  size?: number;
}
```

- [ ] **Step 4:** Create `src/components/ScoreRing/SpecdScoreRing.ts`

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ScoreRingProps, ScoreRingTier } from './SpecdScoreRing.types.js';

/**
 * Specd DS — Score Ring
 *
 * Conic-gradient ring displaying a 0–100 health score with tier-based arc colour.
 * Uses `.score-circle` CSS class. Sets `--score-percentage` and `--w` as inline CSS
 * custom properties on the host element so the conic-gradient in the stylesheet
 * responds reactively.
 *
 * @element specd-score-ring
 *
 * @attr {number} score - Health score (0–100)
 * @attr {string} tier  - 'excellent' | 'good' | 'med' | 'poor'
 * @attr {number} size  - Ring diameter in px (default 104)
 *
 * @example
 * <specd-score-ring score="82" tier="good"></specd-score-ring>
 */
@customElement('specd-score-ring')
export class SpecdScoreRing extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: Number }) score: number = 0;
  @property({ type: String }) tier: ScoreRingTier = 'excellent';
  @property({ type: Number }) size: number = 104;

  override updated() {
    // Set CSS custom properties directly on the host so the stylesheet's conic-gradient picks them up.
    this.style.setProperty('--score-percentage', String(Math.min(100, Math.max(0, this.score))));
    this.style.setProperty('--w', `${this.size}px`);
  }

  override render() {
    const clampedScore = Math.min(100, Math.max(0, this.score));
    return html`
      <div class="score-circle tier-${this.tier}">
        <span class="score-number-lg">${clampedScore}</span>
        <span class="score-denom-new">/100</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-score-ring': SpecdScoreRing;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 6:** Create `src/components/ScoreRing/SpecdScoreRing.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdScoreRing';

const meta: Meta = {
  title: 'Components/ScoreRing',
  component: 'specd-score-ring',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-score-ring
      score=${args.score ?? 0}
      tier=${args.tier ?? 'excellent'}
      size=${args.size ?? 104}
    ></specd-score-ring>
  `,
  argTypes: {
    score: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    tier:  { control: 'select', options: ['excellent', 'good', 'med', 'poor'] },
    size:  { control: 'number' },
  },
};
export default meta;
type Story = StoryObj;

export const Excellent: Story = { args: { score: 94, tier: 'excellent' } };
export const Good:      Story = { args: { score: 76, tier: 'good'      } };
export const Med:       Story = { args: { score: 55, tier: 'med'       } };
export const Poor:      Story = { args: { score: 28, tier: 'poor'      } };
export const Large:     Story = { args: { score: 82, tier: 'good', size: 140 } };
export const Small:     Story = { args: { score: 82, tier: 'good', size: 80  } };

export const AllTiers: Story = {
  render: () => html`
    <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
      <specd-score-ring score="94" tier="excellent"></specd-score-ring>
      <specd-score-ring score="76" tier="good"></specd-score-ring>
      <specd-score-ring score="55" tier="med"></specd-score-ring>
      <specd-score-ring score="28" tier="poor"></specd-score-ring>
    </div>
  `,
};
```

- [ ] **Step 7:** Create `src/components/ScoreRing/index.ts`

```typescript
export { SpecdScoreRing } from './SpecdScoreRing.js';
export type { ScoreRingProps, ScoreRingTier } from './SpecdScoreRing.types.js';
```

### 3.1 — Wire Task 3 into src/index.ts and src/react.ts

- [ ] **Step 1:** Add export to `src/index.ts` after the ScoreTrend export:

```typescript
export * from './components/ScoreRing/index.js';
```

- [ ] **Step 2:** Add import to `src/react.ts` after the ScoreTrend import:

```typescript
import { SpecdScoreRing } from './components/ScoreRing/SpecdScoreRing.js';
```

Then add wrapper export after the ScoreTrend createComponent call:

```typescript
/** Auto-generated React wrapper for <specd-score-ring>. Do not hand-edit. */
export const ScoreRing = createComponent({
  react: React,
  tagName: 'specd-score-ring',
  elementClass: SpecdScoreRing,
  events: {},
});
```

- [ ] **Step 3:** Run all unit tests — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 4:** Commit
```bash
cd /Users/home/Desktop/code/admiral-ds
git add src/components/ScoreRing src/index.ts src/react.ts
git commit -m "feat(ds): add SpecdScoreRing with conic-gradient arc and tier colour variants"
```

---

## Task 4 — Coverage Row

**Component:** `SpecdCovRow`

- [ ] **Step 1:** Write failing test at `src/components/CovRow/SpecdCovRow.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdCovRow');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-cov-row') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdCovRow', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-cov-row')).toBeDefined();
  });

  it('renders root div with cov-row-v2 class', async () => {
    const el = await makeElement({ label: 'Descriptions', pct: '94' });
    const div = el.querySelector('div');
    expect(div).not.toBeNull();
    expect(div?.className).toContain('cov-row-v2');
  });

  it('renders the label', async () => {
    const el = await makeElement({ label: 'Descriptions', pct: '94' });
    expect(el.textContent).toContain('Descriptions');
  });

  it('renders the percentage', async () => {
    const el = await makeElement({ label: 'Doc Links', pct: '61' });
    expect(el.querySelector('.cov-pct')?.textContent?.trim()).toBe('61%');
  });

  it('applies cov-excellent class on fill when pct>=80', async () => {
    const el = await makeElement({ label: 'Descriptions', pct: '94' });
    expect(el.querySelector('.cov-fill')?.className).toContain('cov-excellent');
  });

  it('applies cov-good class on fill when pct>=60 and <80', async () => {
    const el = await makeElement({ label: 'Doc Links', pct: '61' });
    expect(el.querySelector('.cov-fill')?.className).toContain('cov-good');
  });

  it('applies cov-med class on fill when pct>=40 and <60', async () => {
    const el = await makeElement({ label: 'Token Coverage', pct: '47' });
    expect(el.querySelector('.cov-fill')?.className).toContain('cov-med');
  });

  it('applies cov-poor class on fill when pct<40', async () => {
    const el = await makeElement({ label: 'Dev Status', pct: '23' });
    expect(el.querySelector('.cov-fill')?.className).toContain('cov-poor');
  });

  it('respects explicit tier prop over derived tier', async () => {
    const el = await makeElement({ label: 'Test', pct: '94', tier: 'poor' });
    expect(el.querySelector('.cov-fill')?.className).toContain('cov-poor');
  });

  it('sets cov-fill width style to pct%', async () => {
    const el = await makeElement({ label: 'Test', pct: '75' });
    const fill = el.querySelector('.cov-fill') as HTMLElement | null;
    expect(fill?.style.width).toBe('75%');
  });

  it('renders status chip with tier class', async () => {
    const el = await makeElement({ label: 'Test', pct: '94' });
    const chip = el.querySelector('.cov-status-chip');
    expect(chip?.className).toContain('tier-good');
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 3:** Create `src/components/CovRow/SpecdCovRow.types.ts`

```typescript
export type CovRowTier = 'excellent' | 'good' | 'med' | 'poor';

/**
 * Props for the SpecdCovRow (`<specd-cov-row>`) component.
 *
 * @example
 * <specd-cov-row label="Descriptions" pct="94"></specd-cov-row>
 * <specd-cov-row label="Doc Links" pct="61" tier="good"></specd-cov-row>
 */
export interface CovRowProps {
  /** Row label (e.g. "Descriptions", "Token Coverage"). */
  label: string;
  /** Coverage percentage (0–100). */
  pct: number;
  /**
   * Explicit tier override. If not provided, tier is derived from pct:
   * ≥80 → excellent, ≥60 → good, ≥40 → med, else → poor.
   */
  tier?: CovRowTier;
  /** Optional raw SVG string for the leading icon. */
  icon?: string;
}
```

- [ ] **Step 4:** Create `src/components/CovRow/SpecdCovRow.ts`

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { CovRowProps, CovRowTier } from './SpecdCovRow.types.js';

/**
 * Specd DS — Coverage Row
 *
 * A single row in the coverage table showing a label, chip, progress bar, and percentage.
 * Uses `.cov-row-v2`, `.cov-details`, `.cov-icon`, `.cov-label`, `.cov-scoring`,
 * `.cov-status-chip`, `.cov-bar-track`, `.cov-fill`, `.cov-pct` CSS classes.
 *
 * Tier is derived from `pct` if not explicitly provided:
 * - ≥80 → excellent
 * - ≥60 → good
 * - ≥40 → med
 * - <40  → poor
 *
 * @element specd-cov-row
 *
 * @attr {string} label - Row label text
 * @attr {number} pct   - Coverage percentage 0–100
 * @attr {string} tier  - Optional explicit tier ('excellent'|'good'|'med'|'poor')
 * @attr {string} icon  - Optional raw SVG string for leading icon
 *
 * @example
 * <specd-cov-row label="Descriptions" pct="94"></specd-cov-row>
 */
@customElement('specd-cov-row')
export class SpecdCovRow extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string = '';
  @property({ type: Number }) pct: number = 0;
  @property({ type: String }) tier: CovRowTier | '' = '';
  @property({ type: String }) icon: string = '';

  private _derivedTier(): CovRowTier {
    if (this.tier) return this.tier as CovRowTier;
    const p = Math.min(100, Math.max(0, this.pct));
    if (p >= 80) return 'excellent';
    if (p >= 60) return 'good';
    if (p >= 40) return 'med';
    return 'poor';
  }

  /** Map tier → chip display label */
  private _chipLabel(t: CovRowTier): string {
    if (t === 'excellent') return 'EXC';
    if (t === 'good')      return 'GOOD';
    if (t === 'med')       return 'MED';
    return 'POOR';
  }

  /** Map tier → chip CSS modifier (tier-good/med/poor — no tier-excellent in CSS) */
  private _chipClass(t: CovRowTier): string {
    if (t === 'excellent') return 'tier-good';
    return `tier-${t}`;
  }

  override render() {
    const tier = this._derivedTier();
    const clampedPct = Math.min(100, Math.max(0, this.pct));

    return html`
      <div class="cov-row-v2">
        <div class="cov-details">
          ${this.icon
            ? html`<span class="cov-icon">${unsafeHTML(this.icon)}</span>`
            : nothing}
          <span class="cov-label">${this.label}</span>
        </div>
        <div class="cov-scoring">
          <span class="cov-status-chip ${this._chipClass(tier)}">${this._chipLabel(tier)}</span>
          <div class="cov-bar-track">
            <div
              class="cov-fill cov-${tier}"
              style=${styleMap({ width: `${clampedPct}%` })}
            ></div>
          </div>
          <span class="cov-pct">${clampedPct}%</span>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-cov-row': SpecdCovRow;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 6:** Create `src/components/CovRow/SpecdCovRow.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdCovRow';

const meta: Meta = {
  title: 'Components/CovRow',
  component: 'specd-cov-row',
  tags: ['autodocs'],
  render: (args) => html`
    <div style="background:white;border:1px solid #dbeafe;border-radius:10px;overflow:hidden;width:360px;">
      <specd-cov-row
        label=${args.label ?? 'Coverage'}
        pct=${args.pct ?? 50}
        tier=${args.tier ?? ''}
        icon=${args.icon ?? ''}
      ></specd-cov-row>
    </div>
  `,
  argTypes: {
    label: { control: 'text' },
    pct:   { control: { type: 'range', min: 0, max: 100, step: 1 } },
    tier:  { control: 'select', options: ['', 'excellent', 'good', 'med', 'poor'] },
    icon:  { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Excellent: Story = { args: { label: 'Descriptions',   pct: 94 } };
export const Good:      Story = { args: { label: 'Doc Links',      pct: 61 } };
export const Med:       Story = { args: { label: 'Token Coverage', pct: 47 } };
export const Poor:      Story = { args: { label: 'Dev Status',     pct: 23 } };

export const AllRows: Story = {
  render: () => html`
    <div style="background:white;border:1px solid #dbeafe;border-radius:10px;overflow:hidden;width:380px;">
      <specd-cov-row label="Descriptions"   pct="94"></specd-cov-row>
      <specd-cov-row label="Doc Links"      pct="61"></specd-cov-row>
      <specd-cov-row label="Token Coverage" pct="47"></specd-cov-row>
      <specd-cov-row label="Dev Status"     pct="23"></specd-cov-row>
    </div>
  `,
};
```

- [ ] **Step 7:** Create `src/components/CovRow/index.ts`

```typescript
export { SpecdCovRow } from './SpecdCovRow.js';
export type { CovRowProps, CovRowTier } from './SpecdCovRow.types.js';
```

### 4.1 — Wire Task 4 into src/index.ts and src/react.ts

- [ ] **Step 1:** Add export to `src/index.ts` after the ScoreRing export:

```typescript
export * from './components/CovRow/index.js';
```

- [ ] **Step 2:** Add import to `src/react.ts` after the ScoreRing import:

```typescript
import { SpecdCovRow } from './components/CovRow/SpecdCovRow.js';
```

Then add wrapper export after the ScoreRing createComponent call:

```typescript
/** Auto-generated React wrapper for <specd-cov-row>. Do not hand-edit. */
export const CovRow = createComponent({
  react: React,
  tagName: 'specd-cov-row',
  elementClass: SpecdCovRow,
  events: {},
});
```

- [ ] **Step 3:** Run all unit tests — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 4:** Commit
```bash
cd /Users/home/Desktop/code/admiral-ds
git add src/components/CovRow src/index.ts src/react.ts
git commit -m "feat(ds): add SpecdCovRow with derived tier, progress bar, and status chip"
```

---

## Task 5 — Stat Tiles

**Components:** `SpecdStatTileSm`, `SpecdStatTileLg`

### 5.1 — SpecdStatTileSm

- [ ] **Step 1:** Write failing test at `src/components/StatTileSm/SpecdStatTileSm.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdStatTileSm');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-stat-tile-sm') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdStatTileSm', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-stat-tile-sm')).toBeDefined();
  });

  it('renders root div with stat-tile-sm class', async () => {
    const el = await makeElement({ num: '42', label: 'Components' });
    const div = el.querySelector('div');
    expect(div).not.toBeNull();
    expect(div?.className).toContain('stat-tile-sm');
  });

  it('renders the num value', async () => {
    const el = await makeElement({ num: '142', label: 'Total' });
    expect(el.querySelector('.stat-tile-sm-num')?.textContent?.trim()).toBe('142');
  });

  it('renders the label text', async () => {
    const el = await makeElement({ num: '12', label: 'Issues Found' });
    expect(el.querySelector('.stat-tile-sm-label')?.textContent?.trim()).toBe('Issues Found');
  });

  it('applies no intent class by default', async () => {
    const el = await makeElement({ num: '5', label: 'Items' });
    const cls = el.querySelector('.stat-tile-sm')?.className ?? '';
    expect(cls).not.toContain('positive');
    expect(cls).not.toContain('negative');
    expect(cls).not.toContain('warning');
    expect(cls).not.toContain('neutral');
  });

  it('applies positive class for positive intent', async () => {
    const el = await makeElement({ num: '5', label: 'Passed', intent: 'positive' });
    expect(el.querySelector('.stat-tile-sm')?.className).toContain('positive');
  });

  it('applies negative class for negative intent', async () => {
    const el = await makeElement({ num: '3', label: 'Failed', intent: 'negative' });
    expect(el.querySelector('.stat-tile-sm')?.className).toContain('negative');
  });

  it('applies warning class for warning intent', async () => {
    const el = await makeElement({ num: '7', label: 'Warnings', intent: 'warning' });
    expect(el.querySelector('.stat-tile-sm')?.className).toContain('warning');
  });

  it('applies neutral class for neutral intent', async () => {
    const el = await makeElement({ num: '20', label: 'Skipped', intent: 'neutral' });
    expect(el.querySelector('.stat-tile-sm')?.className).toContain('neutral');
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 3:** Create `src/components/StatTileSm/SpecdStatTileSm.types.ts`

```typescript
export type StatTileSmIntent = 'default' | 'positive' | 'negative' | 'warning' | 'neutral';

/**
 * Props for the SpecdStatTileSm (`<specd-stat-tile-sm>`) component.
 *
 * @example
 * <specd-stat-tile-sm num="142" label="Components"></specd-stat-tile-sm>
 * <specd-stat-tile-sm num="12" label="Issues" intent="negative"></specd-stat-tile-sm>
 */
export interface StatTileSmProps {
  /** The primary numeric or string value to display (large, bold). */
  num: string;
  /** Short label below the number. */
  label: string;
  /** Colour intent variant. @default 'default' */
  intent?: StatTileSmIntent;
}
```

- [ ] **Step 4:** Create `src/components/StatTileSm/SpecdStatTileSm.ts`

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { StatTileSmProps, StatTileSmIntent } from './SpecdStatTileSm.types.js';

/**
 * Specd DS — Stat Tile (Small)
 *
 * A compact metric tile used in the 4-column `.stat-tiles-row` grid.
 * Displays a large number above a short mono label.
 * Uses `.stat-tile-sm`, `.stat-tile-sm-num`, `.stat-tile-sm-label` CSS classes.
 * Intent variants add `.positive/.negative/.warning/.neutral` to the root element.
 *
 * @element specd-stat-tile-sm
 *
 * @attr {string} num    - Primary value string (e.g. "142", "94%")
 * @attr {string} label  - Short descriptor label
 * @attr {string} intent - 'default' | 'positive' | 'negative' | 'warning' | 'neutral'
 *
 * @example
 * <specd-stat-tile-sm num="142" label="Components"></specd-stat-tile-sm>
 */
@customElement('specd-stat-tile-sm')
export class SpecdStatTileSm extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) num: string = '';
  @property({ type: String }) label: string = '';
  @property({ type: String }) intent: StatTileSmIntent = 'default';

  private _classes(): string {
    const base = 'stat-tile-sm';
    return this.intent !== 'default' ? `${base} ${this.intent}` : base;
  }

  override render() {
    return html`
      <div class=${this._classes()}>
        <div class="stat-tile-sm-num">${this.num}</div>
        <div class="stat-tile-sm-label">${this.label}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-stat-tile-sm': SpecdStatTileSm;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 6:** Create `src/components/StatTileSm/SpecdStatTileSm.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdStatTileSm';

const meta: Meta = {
  title: 'Components/StatTileSm',
  component: 'specd-stat-tile-sm',
  tags: ['autodocs'],
  render: (args) => html`
    <div style="width:120px;">
      <specd-stat-tile-sm
        num=${args.num ?? '0'}
        label=${args.label ?? 'Label'}
        intent=${args.intent ?? 'default'}
      ></specd-stat-tile-sm>
    </div>
  `,
  argTypes: {
    num:    { control: 'text' },
    label:  { control: 'text' },
    intent: { control: 'select', options: ['default', 'positive', 'negative', 'warning', 'neutral'] },
  },
};
export default meta;
type Story = StoryObj;

export const Default:  Story = { args: { num: '142', label: 'Components',    intent: 'default'  } };
export const Positive: Story = { args: { num: '94%', label: 'Health Score',  intent: 'positive' } };
export const Negative: Story = { args: { num: '12',  label: 'Issues Found',  intent: 'negative' } };
export const Warning:  Story = { args: { num: '7',   label: 'Warnings',      intent: 'warning'  } };
export const Neutral:  Story = { args: { num: '20',  label: 'Skipped',       intent: 'neutral'  } };

export const GridRow: Story = {
  render: () => html`
    <div class="stat-tiles-row" style="width:480px;border:1px solid #f5f8ff;border-radius:10px;overflow:hidden;">
      <specd-stat-tile-sm num="142" label="Components"   intent="default"></specd-stat-tile-sm>
      <specd-stat-tile-sm num="12"  label="Issues"       intent="negative"></specd-stat-tile-sm>
      <specd-stat-tile-sm num="94%" label="Health Score" intent="positive"></specd-stat-tile-sm>
      <specd-stat-tile-sm num="7"   label="Warnings"     intent="warning"></specd-stat-tile-sm>
    </div>
  `,
};
```

- [ ] **Step 7:** Create `src/components/StatTileSm/index.ts`

```typescript
export { SpecdStatTileSm } from './SpecdStatTileSm.js';
export type { StatTileSmProps, StatTileSmIntent } from './SpecdStatTileSm.types.js';
```

### 5.2 — SpecdStatTileLg

- [ ] **Step 1:** Write failing test at `src/components/StatTileLg/SpecdStatTileLg.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdStatTileLg');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-stat-tile-lg') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdStatTileLg', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-stat-tile-lg')).toBeDefined();
  });

  it('renders a button with stat-tile-lg class', async () => {
    const el = await makeElement({ num: '142', title: 'Components', subtitle: 'Total scanned' });
    const btn = el.querySelector('button');
    expect(btn).not.toBeNull();
    expect(btn?.className).toContain('stat-tile-lg');
  });

  it('renders the num value', async () => {
    const el = await makeElement({ num: '94', title: 'Health', subtitle: '' });
    expect(el.querySelector('.stat-tile-lg-num')?.textContent?.trim()).toBe('94');
  });

  it('renders the title', async () => {
    const el = await makeElement({ num: '12', title: 'Issues Found', subtitle: '' });
    expect(el.querySelector('.stat-tile-title')?.textContent?.trim()).toBe('Issues Found');
  });

  it('renders the subtitle', async () => {
    const el = await makeElement({ num: '12', title: 'Issues', subtitle: 'Needs attention' });
    expect(el.querySelector('.stat-tile-subtitle')?.textContent?.trim()).toBe('Needs attention');
  });

  it('renders trend pill when trend is provided', async () => {
    const el = await makeElement({ num: '82', title: 'Score', subtitle: '', trend: '+4.2', trenddir: 'up' });
    expect(el.querySelector('.stat-trend-pill')).not.toBeNull();
  });

  it('applies up class on trend pill', async () => {
    const el = await makeElement({ num: '82', title: 'Score', subtitle: '', trend: '+4.2', trenddir: 'up' });
    expect(el.querySelector('.stat-trend-pill')?.className).toContain('up');
  });

  it('applies down class on trend pill', async () => {
    const el = await makeElement({ num: '78', title: 'Score', subtitle: '', trend: '-2.1', trenddir: 'down' });
    expect(el.querySelector('.stat-trend-pill')?.className).toContain('down');
  });

  it('applies flat class on trend pill', async () => {
    const el = await makeElement({ num: '80', title: 'Score', subtitle: '', trend: '0.0', trenddir: 'flat' });
    expect(el.querySelector('.stat-trend-pill')?.className).toContain('flat');
  });

  it('applies green color class', async () => {
    const el = await makeElement({ num: '12', title: 'Passed', subtitle: '', color: 'green' });
    expect(el.querySelector('.stat-tile-lg')?.className).toContain('green');
  });

  it('applies red color class', async () => {
    const el = await makeElement({ num: '3', title: 'Failed', subtitle: '', color: 'red' });
    expect(el.querySelector('.stat-tile-lg')?.className).toContain('red');
  });

  it('applies blue color class', async () => {
    const el = await makeElement({ num: '5', title: 'Info', subtitle: '', color: 'blue' });
    expect(el.querySelector('.stat-tile-lg')?.className).toContain('blue');
  });

  it('applies amber color class', async () => {
    const el = await makeElement({ num: '8', title: 'Warnings', subtitle: '', color: 'amber' });
    expect(el.querySelector('.stat-tile-lg')?.className).toContain('amber');
  });

  it('does not render trend pill when trend is empty', async () => {
    const el = await makeElement({ num: '42', title: 'Components', subtitle: '' });
    expect(el.querySelector('.stat-trend-pill')).toBeNull();
  });

  it('renders icon SVG when icon is provided', async () => {
    const icon = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>';
    const el = await makeElement({ num: '5', title: 'Test', subtitle: '', icon });
    expect(el.querySelector('.stat-tile-icon svg')).not.toBeNull();
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 3:** Create `src/components/StatTileLg/SpecdStatTileLg.types.ts`

```typescript
export type StatTileLgColor = 'default' | 'green' | 'red' | 'blue' | 'amber';
export type StatTileLgTrendDir = 'up' | 'down' | 'flat';

/**
 * Props for the SpecdStatTileLg (`<specd-stat-tile-lg>`) component.
 *
 * @example
 * <specd-stat-tile-lg
 *   num="142"
 *   title="Components"
 *   subtitle="Total scanned"
 *   trend="+12"
 *   trenddir="up"
 *   color="green"
 * ></specd-stat-tile-lg>
 */
export interface StatTileLgProps {
  /** Primary large number or value string. */
  num: string;
  /** Mono header title. */
  title: string;
  /** Subtitle / description below the number. */
  subtitle?: string;
  /** Trend delta string, e.g. "+4.2". Omit to hide the trend pill. */
  trend?: string;
  /** Trend direction controlling pill colour. @default 'flat' */
  trendDir?: StatTileLgTrendDir;
  /** Colour variant affecting num, icon, and title colour. @default 'default' */
  color?: StatTileLgColor;
  /** Optional raw SVG string for the tile icon. */
  icon?: string;
}
```

- [ ] **Step 4:** Create `src/components/StatTileLg/SpecdStatTileLg.ts`

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { StatTileLgProps, StatTileLgColor, StatTileLgTrendDir } from './SpecdStatTileLg.types.js';

/**
 * Specd DS — Stat Tile (Large)
 *
 * A clickable metric card with a header row (icon + mono title + arrow),
 * a large number, subtitle, and an optional trend pill.
 * Uses `.stat-tile-lg`, `.stat-tile-header`, `.stat-tile-icon`, `.stat-tile-title`,
 * `.stat-tile-lg-num`, `.stat-tile-subtitle`, `.stat-trend-pill` CSS classes.
 *
 * @element specd-stat-tile-lg
 *
 * @attr {string} num      - Primary value string
 * @attr {string} title    - Header title text
 * @attr {string} subtitle - Description below the number
 * @attr {string} trend    - Trend delta string (e.g. "+4.2")
 * @attr {string} trenddir - 'up' | 'down' | 'flat'
 * @attr {string} color    - 'default' | 'green' | 'red' | 'blue' | 'amber'
 * @attr {string} icon     - Raw SVG string for header icon
 *
 * @fires click - When the tile is clicked
 *
 * @example
 * <specd-stat-tile-lg num="142" title="Components" subtitle="Total scanned" trend="+12" trenddir="up" color="green"></specd-stat-tile-lg>
 */
@customElement('specd-stat-tile-lg')
export class SpecdStatTileLg extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) num: string = '';
  @property({ type: String }) title: string = '';
  @property({ type: String }) subtitle: string = '';
  @property({ type: String }) trend: string = '';
  @property({ type: String }) trenddir: StatTileLgTrendDir = 'flat';
  @property({ type: String }) color: StatTileLgColor = 'default';
  @property({ type: String }) icon: string = '';

  private _tileClasses(): string {
    const base = 'stat-tile-lg';
    return this.color !== 'default' ? `${base} ${this.color}` : base;
  }

  private _arrowIcon() {
    return html`<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M7 7h10v10"/>
    </svg>`;
  }

  private _trendIcon(dir: StatTileLgTrendDir) {
    if (dir === 'up') {
      return html`<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>`;
    }
    if (dir === 'down') {
      return html`<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`;
    }
    return html`<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/></svg>`;
  }

  override render() {
    return html`
      <button class=${this._tileClasses()}>
        <div class="stat-tile-header">
          ${this.icon
            ? html`<span class="stat-tile-icon">${unsafeHTML(this.icon)}</span>`
            : nothing}
          <span class="stat-tile-title">${this.title}</span>
          <span class="stat-tile-arrow">${this._arrowIcon()}</span>
        </div>
        <div class="stat-tile-lg-num">${this.num}</div>
        ${this.subtitle
          ? html`<div class="stat-tile-subtitle">${this.subtitle}</div>`
          : nothing}
        ${this.trend
          ? html`<div class="stat-trend-pill ${this.trenddir}">${this._trendIcon(this.trenddir)}${this.trend}</div>`
          : nothing}
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

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 6:** Create `src/components/StatTileLg/SpecdStatTileLg.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdStatTileLg';

const ICON_COMPONENTS = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/></svg>`;
const ICON_ISSUES = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;

const meta: Meta = {
  title: 'Components/StatTileLg',
  component: 'specd-stat-tile-lg',
  tags: ['autodocs'],
  render: (args) => html`
    <div style="width:200px;">
      <specd-stat-tile-lg
        num=${args.num ?? '0'}
        title=${args.title ?? 'Title'}
        subtitle=${args.subtitle ?? ''}
        trend=${args.trend ?? ''}
        trenddir=${args.trenddir ?? 'flat'}
        color=${args.color ?? 'default'}
        icon=${args.icon ?? ''}
      ></specd-stat-tile-lg>
    </div>
  `,
  argTypes: {
    num:      { control: 'text' },
    title:    { control: 'text' },
    subtitle: { control: 'text' },
    trend:    { control: 'text' },
    trenddir: { control: 'select', options: ['up', 'down', 'flat'] },
    color:    { control: 'select', options: ['default', 'green', 'red', 'blue', 'amber'] },
    icon:     { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { num: '142', title: 'Components', subtitle: 'Total scanned', trend: '+12', trenddir: 'up', color: 'default' },
};
export const Green: Story = {
  args: { num: '94', title: 'Health Score', subtitle: 'Excellent', trend: '+4.2', trenddir: 'up', color: 'green', icon: ICON_COMPONENTS },
};
export const Red: Story = {
  args: { num: '12', title: 'Issues Found', subtitle: 'Needs attention', trend: '+3', trenddir: 'down', color: 'red', icon: ICON_ISSUES },
};
export const Blue: Story = {
  args: { num: '58', title: 'Token Coverage', subtitle: 'Variables bound', trend: '+5.1', trenddir: 'up', color: 'blue' },
};
export const Amber: Story = {
  args: { num: '7', title: 'Warnings', subtitle: 'Review needed', trend: '-2', trenddir: 'flat', color: 'amber' },
};
export const NoTrend: Story = {
  args: { num: '42', title: 'Components', subtitle: 'Published', color: 'default' },
};

export const AllColors: Story = {
  render: () => html`
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;width:430px;">
      <specd-stat-tile-lg num="94"  title="Health Score"   subtitle="Excellent"      trend="+4.2" trenddir="up"   color="green"></specd-stat-tile-lg>
      <specd-stat-tile-lg num="12"  title="Issues Found"   subtitle="Needs attention" trend="+3"  trenddir="down" color="red"></specd-stat-tile-lg>
      <specd-stat-tile-lg num="58"  title="Token Coverage" subtitle="Variables bound" trend="+5.1" trenddir="up"  color="blue"></specd-stat-tile-lg>
      <specd-stat-tile-lg num="7"   title="Warnings"       subtitle="Review needed"  trend="-2"   trenddir="flat" color="amber"></specd-stat-tile-lg>
    </div>
  `,
};
```

- [ ] **Step 7:** Create `src/components/StatTileLg/index.ts`

```typescript
export { SpecdStatTileLg } from './SpecdStatTileLg.js';
export type { StatTileLgProps, StatTileLgColor, StatTileLgTrendDir } from './SpecdStatTileLg.types.js';
```

### 5.3 — Wire Task 5 into src/index.ts and src/react.ts

- [ ] **Step 1:** Add exports to `src/index.ts` after the CovRow export:

```typescript
export * from './components/StatTileSm/index.js';
export * from './components/StatTileLg/index.js';
```

- [ ] **Step 2:** Add imports to `src/react.ts` after the CovRow import:

```typescript
import { SpecdStatTileSm } from './components/StatTileSm/SpecdStatTileSm.js';
import { SpecdStatTileLg } from './components/StatTileLg/SpecdStatTileLg.js';
```

Then add wrapper exports after the CovRow createComponent call:

```typescript
/** Auto-generated React wrapper for <specd-stat-tile-sm>. Do not hand-edit. */
export const StatTileSm = createComponent({
  react: React,
  tagName: 'specd-stat-tile-sm',
  elementClass: SpecdStatTileSm,
  events: {},
});

/** Auto-generated React wrapper for <specd-stat-tile-lg>. Do not hand-edit. */
export const StatTileLg = createComponent({
  react: React,
  tagName: 'specd-stat-tile-lg',
  elementClass: SpecdStatTileLg,
  events: { onClick: 'click' },
});
```

- [ ] **Step 3:** Run all unit tests — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 4:** Commit
```bash
cd /Users/home/Desktop/code/admiral-ds
git add src/components/StatTileSm src/components/StatTileLg src/index.ts src/react.ts
git commit -m "feat(ds): add SpecdStatTileSm and SpecdStatTileLg metric tile components"
```

---

*Tasks 6–10 continue in Part 2 of this plan.*

## Task 6 — Navigation & Shell

**Components:** `SpecdTabBar`, `SpecdAppHeader`, `SpecdSegmented`

---

### 6.1 — SpecdTabBar

- [ ] **Step 1:** Write failing test at `src/components/TabBar/SpecdTabBar.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdTabBar');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-tab-bar') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdTabBar', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-tab-bar')).toBeDefined();
  });

  it('renders a nav with tab-bar-v2 class', async () => {
    const tabs = JSON.stringify([{ id: 'a', label: 'Alpha' }, { id: 'b', label: 'Beta' }]);
    const el = await makeElement({ tabs, active: 'a' });
    const nav = el.querySelector('nav');
    expect(nav).not.toBeNull();
    expect(nav?.className).toContain('tab-bar-v2');
  });

  it('renders one button per tab', async () => {
    const tabs = JSON.stringify([{ id: 'a', label: 'Alpha' }, { id: 'b', label: 'Beta' }, { id: 'c', label: 'Gamma' }]);
    const el = await makeElement({ tabs, active: 'a' });
    const btns = el.querySelectorAll('button.tab-v2');
    expect(btns.length).toBe(3);
  });

  it('marks the active tab with active class', async () => {
    const tabs = JSON.stringify([{ id: 'x', label: 'X' }, { id: 'y', label: 'Y' }]);
    const el = await makeElement({ tabs, active: 'y' });
    const btns = Array.from(el.querySelectorAll('button.tab-v2'));
    expect(btns[1].classList.contains('active')).toBe(true);
    expect(btns[0].classList.contains('active')).toBe(false);
  });

  it('fires specd-tab-change event on click', async () => {
    const tabs = JSON.stringify([{ id: 'foo', label: 'Foo' }, { id: 'bar', label: 'Bar' }]);
    const el = await makeElement({ tabs, active: 'foo' });
    let detail: { id: string } | null = null;
    el.addEventListener('specd-tab-change', (e) => { detail = (e as CustomEvent).detail; });
    const btns = el.querySelectorAll('button.tab-v2');
    (btns[1] as HTMLButtonElement).click();
    expect(detail).not.toBeNull();
    expect(detail!.id).toBe('bar');
  });

  it('renders badge span when tab has badge', async () => {
    const tabs = JSON.stringify([{ id: 'a', label: 'Issues', badge: '3' }]);
    const el = await makeElement({ tabs, active: 'a' });
    const badge = el.querySelector('.tab-badge');
    expect(badge).not.toBeNull();
    expect(badge?.textContent?.trim()).toBe('3');
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/TabBar --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 3:** Create `src/components/TabBar/SpecdTabBar.types.ts`

```typescript
export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  badge?: string | number;
}

/**
 * Props for SpecdTabBar (`<specd-tab-bar>`).
 *
 * @example
 * <specd-tab-bar tabs='[{"id":"overview","label":"Overview"}]' active="overview"></specd-tab-bar>
 */
export interface TabBarProps {
  /** JSON string of TabItem[]. */
  tabs: string;
  /** Active tab id. */
  active: string;
  /** Number of columns for grid-template-columns. @default 6 */
  columns?: number;
}
```

- [ ] **Step 4:** Create `src/components/TabBar/SpecdTabBar.ts`

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { TabBarProps, TabItem } from './SpecdTabBar.types.js';

/**
 * Specd DS — Tab Bar
 *
 * A fixed-height navigation tab bar that renders one button per tab.
 * Uses `.tab-bar-v2` and `.tab-v2` CSS classes from specd-ds.css.
 *
 * @element specd-tab-bar
 *
 * @attr {string} tabs    - JSON string of {id, label, icon?, badge?}[]
 * @attr {string} active  - Active tab id
 * @attr {number} columns - Grid column count (default 6)
 *
 * @fires specd-tab-change - CustomEvent<{id: string}> when a tab is clicked
 *
 * @example
 * <specd-tab-bar tabs='[{"id":"a","label":"Overview"}]' active="a"></specd-tab-bar>
 */
@customElement('specd-tab-bar')
export class SpecdTabBar extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) tabs: string = '[]';
  @property({ type: String }) active: string = '';
  @property({ type: Number }) columns: number = 6;

  private _parsedTabs(): TabItem[] {
    try { return JSON.parse(this.tabs); } catch { return []; }
  }

  private _handleClick(id: string) {
    this.active = id;
    this.dispatchEvent(new CustomEvent('specd-tab-change', { detail: { id }, bubbles: true, composed: true }));
  }

  override render() {
    const tabs = this._parsedTabs();
    const cols = this.columns || tabs.length || 6;
    return html`
      <nav class="tab-bar-v2" style="grid-template-columns:repeat(${cols},1fr)">
        ${tabs.map(tab => html`
          <button
            class="tab-v2${tab.id === this.active ? ' active' : ''}"
            @click=${() => this._handleClick(tab.id)}
            data-tab-id=${tab.id}
          >
            ${tab.icon ? html`<span class="tab-icon" aria-hidden="true">${tab.icon}</span>` : nothing}
            ${tab.label}
            ${tab.badge !== undefined && tab.badge !== '' ? html`<span class="tab-badge">${tab.badge}</span>` : nothing}
          </button>
        `)}
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-tab-bar': SpecdTabBar;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/TabBar --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 6:** Create `src/components/TabBar/SpecdTabBar.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdTabBar';

const TABS = JSON.stringify([
  { id: 'overview',    label: 'Overview' },
  { id: 'components',  label: 'Components' },
  { id: 'issues',      label: 'Issues', badge: '5' },
  { id: 'storybook',   label: 'Storybook' },
  { id: 'variables',   label: 'Variables' },
  { id: 'settings',    label: 'Settings' },
]);

const meta: Meta = {
  title: 'Navigation/TabBar',
  component: 'specd-tab-bar',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-tab-bar
      tabs=${args.tabs ?? TABS}
      active=${args.active ?? 'overview'}
      columns=${args.columns ?? 6}
    ></specd-tab-bar>
  `,
  argTypes: {
    tabs:    { control: 'text' },
    active:  { control: 'text' },
    columns: { control: 'number' },
  },
};
export default meta;
type Story = StoryObj;

export const Default:     Story = { args: { tabs: TABS, active: 'overview' } };
export const IssuesActive: Story = { args: { tabs: TABS, active: 'issues' } };
export const FourColumns: Story = {
  args: {
    tabs: JSON.stringify([
      { id: 'a', label: 'Alpha' },
      { id: 'b', label: 'Beta' },
      { id: 'c', label: 'Gamma' },
      { id: 'd', label: 'Delta' },
    ]),
    active: 'a',
    columns: 4,
  },
};
```

- [ ] **Step 7:** Create `src/components/TabBar/index.ts`

```typescript
export { SpecdTabBar } from './SpecdTabBar.js';
export type { TabBarProps, TabItem } from './SpecdTabBar.types.js';
```

---

### 6.2 — SpecdAppHeader

- [ ] **Step 1:** Write failing test at `src/components/AppHeader/SpecdAppHeader.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdAppHeader');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-app-header') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdAppHeader', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-app-header')).toBeDefined();
  });

  it('renders a header with app-header-v2 class', async () => {
    const el = await makeElement({ name: 'Pulse' });
    const header = el.querySelector('header');
    expect(header).not.toBeNull();
    expect(header?.className).toContain('app-header-v2');
  });

  it('renders the app name', async () => {
    const el = await makeElement({ name: 'Pulse' });
    expect(el.textContent).toContain('Pulse');
  });

  it('defaults name to Pulse', async () => {
    const el = await makeElement({});
    expect(el.textContent).toContain('Pulse');
  });

  it('renders refresh button when showrefresh is set', async () => {
    const el = await makeElement({ name: 'Pulse', showrefresh: '' });
    const btns = el.querySelectorAll('button.header-icon-btn');
    expect(btns.length).toBeGreaterThan(0);
  });

  it('fires specd-refresh on refresh button click', async () => {
    const el = await makeElement({ name: 'Pulse', showrefresh: '' });
    let fired = false;
    el.addEventListener('specd-refresh', () => { fired = true; });
    const btn = el.querySelector('[data-action="refresh"]') as HTMLButtonElement;
    btn?.click();
    expect(fired).toBe(true);
  });

  it('fires specd-settings on settings button click', async () => {
    const el = await makeElement({ name: 'Pulse', showsettings: '' });
    let fired = false;
    el.addEventListener('specd-settings', () => { fired = true; });
    const btn = el.querySelector('[data-action="settings"]') as HTMLButtonElement;
    btn?.click();
    expect(fired).toBe(true);
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/AppHeader --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 3:** Create `src/components/AppHeader/SpecdAppHeader.types.ts`

```typescript
/**
 * Props for SpecdAppHeader (`<specd-app-header>`).
 *
 * @example
 * <specd-app-header name="Pulse" showrefresh showsettings></specd-app-header>
 */
export interface AppHeaderProps {
  /** Plugin/app name displayed in the header. @default 'Pulse' */
  name?: string;
  /** Show the refresh icon button. @default false */
  showRefresh?: boolean;
  /** Show the settings icon button. @default false */
  showSettings?: boolean;
}
```

- [ ] **Step 4:** Create `src/components/AppHeader/SpecdAppHeader.ts`

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { AppHeaderProps } from './SpecdAppHeader.types.js';

/**
 * Specd DS — App Header
 *
 * Top-of-plugin header with logo, name, and optional icon buttons.
 * Uses `.app-header-v2` CSS class from specd-ds.css.
 *
 * @element specd-app-header
 *
 * @attr {string}  name         - App/plugin name (default "Pulse")
 * @attr {boolean} showrefresh  - Show refresh icon button
 * @attr {boolean} showsettings - Show settings icon button
 *
 * @fires specd-refresh  - When refresh button is clicked
 * @fires specd-settings - When settings button is clicked
 *
 * @example
 * <specd-app-header name="Pulse" showrefresh showsettings></specd-app-header>
 */
@customElement('specd-app-header')
export class SpecdAppHeader extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) name: string = 'Pulse';
  @property({ type: Boolean, attribute: 'showrefresh' }) showRefresh: boolean = false;
  @property({ type: Boolean, attribute: 'showsettings' }) showSettings: boolean = false;

  private _logoSvg() {
    return html`<svg class="logo-mark" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#b8ff57"/>
      <path d="M8 16c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8" stroke="#0C1750" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="16" cy="16" r="3" fill="#0C1750"/>
    </svg>`;
  }

  private _refreshIcon() {
    return html`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
    </svg>`;
  }

  private _settingsIcon() {
    return html`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>`;
  }

  override render() {
    return html`
      <header class="app-header-v2">
        ${this._logoSvg()}
        <div class="header-text">
          <div class="header-name">${this.name}</div>
        </div>
        ${this.showRefresh ? html`
          <button class="header-icon-btn" data-action="refresh" aria-label="Refresh"
            @click=${() => this.dispatchEvent(new CustomEvent('specd-refresh', { bubbles: true, composed: true }))}>
            ${this._refreshIcon()}
          </button>
        ` : nothing}
        ${this.showSettings ? html`
          <button class="header-icon-btn" data-action="settings" aria-label="Settings"
            @click=${() => this.dispatchEvent(new CustomEvent('specd-settings', { bubbles: true, composed: true }))}>
            ${this._settingsIcon()}
          </button>
        ` : nothing}
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-app-header': SpecdAppHeader;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/AppHeader --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 6:** Create `src/components/AppHeader/SpecdAppHeader.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdAppHeader';

const meta: Meta = {
  title: 'Navigation/AppHeader',
  component: 'specd-app-header',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-app-header
      name=${args.name ?? 'Pulse'}
      ?showrefresh=${args.showRefresh}
      ?showsettings=${args.showSettings}
    ></specd-app-header>
  `,
  argTypes: {
    name:         { control: 'text' },
    showRefresh:  { control: 'boolean' },
    showSettings: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

export const Default:     Story = { args: { name: 'Pulse', showRefresh: true, showSettings: true } };
export const NameOnly:    Story = { args: { name: 'Mapped by Specd' } };
export const NoButtons:   Story = { args: { name: 'Pulse', showRefresh: false, showSettings: false } };
```

- [ ] **Step 7:** Create `src/components/AppHeader/index.ts`

```typescript
export { SpecdAppHeader } from './SpecdAppHeader.js';
export type { AppHeaderProps } from './SpecdAppHeader.types.js';
```

---

### 6.3 — SpecdSegmented

- [ ] **Step 1:** Write failing test at `src/components/Segmented/SpecdSegmented.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdSegmented');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-segmented') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdSegmented', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-segmented')).toBeDefined();
  });

  it('renders a div with segmented-toggle class', async () => {
    const options = JSON.stringify([{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Beta' }]);
    const el = await makeElement({ options, value: 'a' });
    const div = el.querySelector('div.segmented-toggle');
    expect(div).not.toBeNull();
  });

  it('renders one button per option', async () => {
    const options = JSON.stringify([{ value: 'x', label: 'X' }, { value: 'y', label: 'Y' }, { value: 'z', label: 'Z' }]);
    const el = await makeElement({ options, value: 'x' });
    const btns = el.querySelectorAll('button.seg-btn');
    expect(btns.length).toBe(3);
  });

  it('marks the active option with active class', async () => {
    const options = JSON.stringify([{ value: 'foo', label: 'Foo' }, { value: 'bar', label: 'Bar' }]);
    const el = await makeElement({ options, value: 'bar' });
    const btns = Array.from(el.querySelectorAll('button.seg-btn'));
    expect(btns[1].classList.contains('active')).toBe(true);
    expect(btns[0].classList.contains('active')).toBe(false);
  });

  it('fires specd-change with {value} on click', async () => {
    const options = JSON.stringify([{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }]);
    const el = await makeElement({ options, value: 'one' });
    let detail: { value: string } | null = null;
    el.addEventListener('specd-change', (e) => { detail = (e as CustomEvent).detail; });
    const btns = el.querySelectorAll('button.seg-btn');
    (btns[1] as HTMLButtonElement).click();
    expect(detail).not.toBeNull();
    expect(detail!.value).toBe('two');
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/Segmented --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 3:** Create `src/components/Segmented/SpecdSegmented.types.ts`

```typescript
export interface SegmentOption {
  value: string;
  label: string;
}

/**
 * Props for SpecdSegmented (`<specd-segmented>`).
 *
 * @example
 * <specd-segmented options='[{"value":"a","label":"All"}]' value="a"></specd-segmented>
 */
export interface SegmentedProps {
  /** JSON string of SegmentOption[]. */
  options: string;
  /** Currently active value. */
  value: string;
}
```

- [ ] **Step 4:** Create `src/components/Segmented/SpecdSegmented.ts`

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SegmentedProps, SegmentOption } from './SpecdSegmented.types.js';

/**
 * Specd DS — Segmented Control
 *
 * A pill-shaped toggle with mutually exclusive options.
 * Uses `.segmented-toggle` and `.seg-btn` CSS classes from specd-ds.css.
 *
 * @element specd-segmented
 *
 * @attr {string} options - JSON string of {value, label}[]
 * @attr {string} value   - Active value
 *
 * @fires specd-change - CustomEvent<{value: string}> on selection
 *
 * @example
 * <specd-segmented options='[{"value":"severity","label":"Severity"},{"value":"component","label":"Component"}]' value="severity"></specd-segmented>
 */
@customElement('specd-segmented')
export class SpecdSegmented extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) options: string = '[]';
  @property({ type: String }) value: string = '';

  private _parsedOptions(): SegmentOption[] {
    try { return JSON.parse(this.options); } catch { return []; }
  }

  private _handleClick(val: string) {
    this.value = val;
    this.dispatchEvent(new CustomEvent('specd-change', { detail: { value: val }, bubbles: true, composed: true }));
  }

  override render() {
    const opts = this._parsedOptions();
    return html`
      <div class="segmented-toggle">
        ${opts.map(opt => html`
          <button
            class="seg-btn${opt.value === this.value ? ' active' : ''}"
            @click=${() => this._handleClick(opt.value)}
          >${opt.label}</button>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-segmented': SpecdSegmented;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/Segmented --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 6:** Create `src/components/Segmented/SpecdSegmented.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdSegmented';

const VIEW_OPTIONS = JSON.stringify([
  { value: 'severity', label: 'Severity' },
  { value: 'component', label: 'Component' },
]);

const FILTER_OPTIONS = JSON.stringify([
  { value: 'all', label: 'All' },
  { value: 'critical', label: 'Critical' },
  { value: 'warning', label: 'Warning' },
  { value: 'info', label: 'Info' },
]);

const meta: Meta = {
  title: 'Navigation/Segmented',
  component: 'specd-segmented',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-segmented
      options=${args.options ?? VIEW_OPTIONS}
      value=${args.value ?? 'severity'}
    ></specd-segmented>
  `,
  argTypes: {
    options: { control: 'text' },
    value:   { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const TwoOptions:  Story = { args: { options: VIEW_OPTIONS, value: 'severity' } };
export const FourOptions: Story = { args: { options: FILTER_OPTIONS, value: 'all' } };
```

- [ ] **Step 7:** Create `src/components/Segmented/index.ts`

```typescript
export { SpecdSegmented } from './SpecdSegmented.js';
export type { SegmentedProps, SegmentOption } from './SpecdSegmented.types.js';
```

### 6.4 — Wire Task 6 into src/index.ts and src/react.ts

- [ ] **Step 1:** Add exports to `src/index.ts`:

```typescript
export * from './components/TabBar/index.js';
export * from './components/AppHeader/index.js';
export * from './components/Segmented/index.js';
```

- [ ] **Step 2:** Add to `src/react.ts` imports:

```typescript
import { SpecdTabBar }    from './components/TabBar/SpecdTabBar.js';
import { SpecdAppHeader } from './components/AppHeader/SpecdAppHeader.js';
import { SpecdSegmented } from './components/Segmented/SpecdSegmented.js';
```

Then add wrapper exports:

```typescript
/** Auto-generated React wrapper for <specd-tab-bar>. Do not hand-edit. */
export const TabBar = createComponent({
  react: React,
  tagName: 'specd-tab-bar',
  elementClass: SpecdTabBar,
  events: { onSpecdTabChange: 'specd-tab-change' },
});

/** Auto-generated React wrapper for <specd-app-header>. Do not hand-edit. */
export const AppHeader = createComponent({
  react: React,
  tagName: 'specd-app-header',
  elementClass: SpecdAppHeader,
  events: { onSpecdRefresh: 'specd-refresh', onSpecdSettings: 'specd-settings' },
});

/** Auto-generated React wrapper for <specd-segmented>. Do not hand-edit. */
export const Segmented = createComponent({
  react: React,
  tagName: 'specd-segmented',
  elementClass: SpecdSegmented,
  events: { onSpecdChange: 'specd-change' },
});
```

- [ ] **Step 3:** Run all unit tests — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 4:** Commit
```bash
cd /Users/home/Desktop/code/admiral-ds
git add src/components/TabBar src/components/AppHeader src/components/Segmented src/index.ts src/react.ts
git commit -m "feat(ds): add SpecdTabBar, SpecdAppHeader, SpecdSegmented navigation components"
```

---

## Task 7 — Form Primitives

**Components:** `SpecdSectionLabel`, `SpecdFormRow`, `SpecdToggleRow`, `SpecdRadioGroup`, `SpecdCheckboxGroup`

---

### 7.1 — SpecdSectionLabel

- [ ] **Step 1:** Write failing test at `src/components/SectionLabel/SpecdSectionLabel.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdSectionLabel');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-section-label') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdSectionLabel', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-section-label')).toBeDefined();
  });

  it('renders label with section-label class', async () => {
    const el = await makeElement({ label: 'Settings' });
    const div = el.querySelector('.section-label');
    expect(div).not.toBeNull();
    expect(div?.textContent?.trim()).toBe('Settings');
  });

  it('renders hint when provided', async () => {
    const el = await makeElement({ label: 'Settings', hint: 'Configure your preferences' });
    const hint = el.querySelector('.section-label-hint');
    expect(hint).not.toBeNull();
    expect(hint?.textContent?.trim()).toBe('Configure your preferences');
  });

  it('does not render hint div when hint is absent', async () => {
    const el = await makeElement({ label: 'Settings' });
    const hint = el.querySelector('.section-label-hint');
    expect(hint).toBeNull();
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/SectionLabel --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 3:** Create `src/components/SectionLabel/SpecdSectionLabel.types.ts`

```typescript
/**
 * Props for SpecdSectionLabel (`<specd-section-label>`).
 *
 * @example
 * <specd-section-label label="Connected Libraries" hint="Manage your linked libraries"></specd-section-label>
 */
export interface SectionLabelProps {
  /** Section heading text. */
  label: string;
  /** Optional sub-heading hint text. */
  hint?: string;
}
```

- [ ] **Step 4:** Create `src/components/SectionLabel/SpecdSectionLabel.ts`

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SectionLabelProps } from './SpecdSectionLabel.types.js';

/**
 * Specd DS — Section Label
 *
 * A bold heading with optional hint text used to group form sections.
 * Uses `.section-label` and `.section-label-hint` CSS classes.
 *
 * @element specd-section-label
 *
 * @attr {string} label - Section heading text
 * @attr {string} hint  - Optional sub-heading hint
 *
 * @example
 * <specd-section-label label="Settings" hint="Manage plugin preferences"></specd-section-label>
 */
@customElement('specd-section-label')
export class SpecdSectionLabel extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string = '';
  @property({ type: String }) hint?: string;

  override render() {
    return html`
      <div class="section-label">${this.label}</div>
      ${this.hint ? html`<div class="section-label-hint">${this.hint}</div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-section-label': SpecdSectionLabel;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/SectionLabel --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 6:** Create `src/components/SectionLabel/SpecdSectionLabel.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdSectionLabel';

const meta: Meta = {
  title: 'Form/SectionLabel',
  component: 'specd-section-label',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-section-label
      label=${args.label ?? 'Section Title'}
      hint=${args.hint ?? ''}
    ></specd-section-label>
  `,
  argTypes: {
    label: { control: 'text' },
    hint:  { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Default:  Story = { args: { label: 'Connected Libraries' } };
export const WithHint: Story = { args: { label: 'Scan Options', hint: 'Control what gets included in your audit' } };
```

- [ ] **Step 7:** Create `src/components/SectionLabel/index.ts`

```typescript
export { SpecdSectionLabel } from './SpecdSectionLabel.js';
export type { SectionLabelProps } from './SpecdSectionLabel.types.js';
```

---

### 7.2 — SpecdFormRow

- [ ] **Step 1:** Write failing test at `src/components/FormRow/SpecdFormRow.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdFormRow');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-form-row') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdFormRow', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-form-row')).toBeDefined();
  });

  it('renders a div with form-row class', async () => {
    const el = await makeElement({ label: 'API Key' });
    const div = el.querySelector('.form-row');
    expect(div).not.toBeNull();
  });

  it('renders label with form-label class', async () => {
    const el = await makeElement({ label: 'API Key' });
    const label = el.querySelector('.form-label');
    expect(label).not.toBeNull();
    expect(label?.textContent?.trim()).toBe('API Key');
  });

  it('renders hint when provided', async () => {
    const el = await makeElement({ label: 'Token', hint: 'Your personal access token' });
    const hint = el.querySelector('.form-hint');
    expect(hint).not.toBeNull();
    expect(hint?.textContent?.trim()).toBe('Your personal access token');
  });

  it('renders a slot element for child input', async () => {
    const el = await makeElement({ label: 'Input' });
    const slot = el.querySelector('slot');
    expect(slot).not.toBeNull();
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/FormRow --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 3:** Create `src/components/FormRow/SpecdFormRow.types.ts`

```typescript
/**
 * Props for SpecdFormRow (`<specd-form-row>`).
 *
 * @example
 * <specd-form-row label="API Token" hint="Found in your Figma account settings">
 *   <specd-input></specd-input>
 * </specd-form-row>
 */
export interface FormRowProps {
  /** Field label shown above the input. */
  label: string;
  /** Optional helper text shown below the label. */
  hint?: string;
}
```

- [ ] **Step 4:** Create `src/components/FormRow/SpecdFormRow.ts`

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { FormRowProps } from './SpecdFormRow.types.js';

/**
 * Specd DS — Form Row
 *
 * A label + optional hint wrapper with a slot for any input child.
 * Uses `.form-row`, `.form-label`, `.form-hint` CSS classes.
 *
 * @element specd-form-row
 *
 * @attr {string} label - Field label text
 * @attr {string} hint  - Optional helper text
 *
 * @slot default - The input element
 *
 * @example
 * <specd-form-row label="Token" hint="Your PAT">
 *   <specd-input placeholder="fig_…"></specd-input>
 * </specd-form-row>
 */
@customElement('specd-form-row')
export class SpecdFormRow extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string = '';
  @property({ type: String }) hint?: string;

  override render() {
    return html`
      <div class="form-row">
        <div class="form-label">${this.label}</div>
        ${this.hint ? html`<div class="form-hint">${this.hint}</div>` : nothing}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-form-row': SpecdFormRow;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/FormRow --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 6:** Create `src/components/FormRow/SpecdFormRow.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdFormRow';

const meta: Meta = {
  title: 'Form/FormRow',
  component: 'specd-form-row',
  tags: ['autodocs'],
  render: (args) => html`
    <div style="width:320px;padding:16px;">
      <specd-form-row label=${args.label ?? 'Label'} hint=${args.hint ?? ''}>
        <input style="width:100%;padding:8px;border:1px solid #dbeafe;border-radius:8px;" placeholder="Enter value…" />
      </specd-form-row>
    </div>
  `,
  argTypes: {
    label: { control: 'text' },
    hint:  { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Default:  Story = { args: { label: 'Personal Access Token' } };
export const WithHint: Story = { args: { label: 'Storybook URL', hint: 'The root URL of your published Storybook' } };
```

- [ ] **Step 7:** Create `src/components/FormRow/index.ts`

```typescript
export { SpecdFormRow } from './SpecdFormRow.js';
export type { FormRowProps } from './SpecdFormRow.types.js';
```

---

### 7.3 — SpecdToggleRow

- [ ] **Step 1:** Write failing test at `src/components/ToggleRow/SpecdToggleRow.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdToggleRow');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-toggle-row') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdToggleRow', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-toggle-row')).toBeDefined();
  });

  it('renders a div with toggle-row class', async () => {
    const el = await makeElement({ label: 'Dark mode' });
    const div = el.querySelector('.toggle-row');
    expect(div).not.toBeNull();
  });

  it('renders label text', async () => {
    const el = await makeElement({ label: 'Dark mode' });
    const label = el.querySelector('.toggle-row-label');
    expect(label?.textContent?.trim()).toBe('Dark mode');
  });

  it('renders hint when provided', async () => {
    const el = await makeElement({ label: 'Dark mode', hint: 'Enable dark theme' });
    const hint = el.querySelector('.toggle-row-hint');
    expect(hint?.textContent?.trim()).toBe('Enable dark theme');
  });

  it('reflects checked state on the toggle track', async () => {
    const el = await makeElement({ label: 'Dark mode', checked: '' });
    const track = el.querySelector('.toggle');
    expect(track).not.toBeNull();
  });

  it('fires specd-change with {checked} on click', async () => {
    const el = await makeElement({ label: 'Dark mode' });
    let detail: { checked: boolean } | null = null;
    el.addEventListener('specd-change', (e) => { detail = (e as CustomEvent).detail; });
    const row = el.querySelector('.toggle-row') as HTMLElement;
    row?.click();
    expect(detail).not.toBeNull();
    expect(typeof detail!.checked).toBe('boolean');
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/ToggleRow --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 3:** Create `src/components/ToggleRow/SpecdToggleRow.types.ts`

```typescript
/**
 * Props for SpecdToggleRow (`<specd-toggle-row>`).
 *
 * @example
 * <specd-toggle-row label="Ignore hidden layers" hint="Skip layers with visibility off" checked></specd-toggle-row>
 */
export interface ToggleRowProps {
  /** Row label text. */
  label: string;
  /** Optional sub-text hint. */
  hint?: string;
  /** Whether the toggle is on. @default false */
  checked?: boolean;
}
```

- [ ] **Step 4:** Create `src/components/ToggleRow/SpecdToggleRow.ts`

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ToggleRowProps } from './SpecdToggleRow.types.js';

/**
 * Specd DS — Toggle Row
 *
 * A full-width row with a label, optional hint, and an inline toggle switch.
 * Uses `.toggle-row`, `.toggle`, `.toggle-track` CSS classes.
 *
 * @element specd-toggle-row
 *
 * @attr {string}  label   - Row label text
 * @attr {string}  hint    - Optional hint text
 * @attr {boolean} checked - Toggle state
 *
 * @fires specd-change - CustomEvent<{checked: boolean}> on toggle
 *
 * @example
 * <specd-toggle-row label="Ignore hidden layers" checked></specd-toggle-row>
 */
@customElement('specd-toggle-row')
export class SpecdToggleRow extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string = '';
  @property({ type: String }) hint?: string;
  @property({ type: Boolean }) checked: boolean = false;

  private _handleClick() {
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('specd-change', { detail: { checked: this.checked }, bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <div class="toggle-row" @click=${this._handleClick} role="switch" aria-checked=${this.checked} tabindex="0">
        <div class="toggle-row-text">
          <div class="toggle-row-label">${this.label}</div>
          ${this.hint ? html`<div class="toggle-row-hint">${this.hint}</div>` : nothing}
        </div>
        <div class="toggle${this.checked ? ' on' : ''}">
          <div class="toggle-track"></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-toggle-row': SpecdToggleRow;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/ToggleRow --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 6:** Create `src/components/ToggleRow/SpecdToggleRow.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdToggleRow';

const meta: Meta = {
  title: 'Form/ToggleRow',
  component: 'specd-toggle-row',
  tags: ['autodocs'],
  render: (args) => html`
    <div style="width:320px;padding:0 16px;border:1px solid #dbeafe;border-radius:10px;">
      <specd-toggle-row
        label=${args.label ?? 'Enable feature'}
        hint=${args.hint ?? ''}
        ?checked=${args.checked}
      ></specd-toggle-row>
    </div>
  `,
  argTypes: {
    label:   { control: 'text' },
    hint:    { control: 'text' },
    checked: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

export const Off:      Story = { args: { label: 'Ignore hidden layers', hint: 'Skip layers with visibility off' } };
export const On:       Story = { args: { label: 'Ignore hidden layers', hint: 'Skip layers with visibility off', checked: true } };
export const NoHint:   Story = { args: { label: 'Enable scan on open' } };
```

- [ ] **Step 7:** Create `src/components/ToggleRow/index.ts`

```typescript
export { SpecdToggleRow } from './SpecdToggleRow.js';
export type { ToggleRowProps } from './SpecdToggleRow.types.js';
```

---

### 7.4 — SpecdRadioGroup

- [ ] **Step 1:** Write failing test at `src/components/RadioGroup/SpecdRadioGroup.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdRadioGroup');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-radio-group') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdRadioGroup', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-radio-group')).toBeDefined();
  });

  it('renders a div with radio-group class', async () => {
    const options = JSON.stringify([{ value: 'a', label: 'Alpha' }]);
    const el = await makeElement({ options, value: 'a', name: 'group1' });
    const div = el.querySelector('.radio-group');
    expect(div).not.toBeNull();
  });

  it('renders one radio input per option', async () => {
    const options = JSON.stringify([
      { value: 'x', label: 'X' },
      { value: 'y', label: 'Y' },
      { value: 'z', label: 'Z' },
    ]);
    const el = await makeElement({ options, value: 'x', name: 'grp' });
    const inputs = el.querySelectorAll('input[type="radio"]');
    expect(inputs.length).toBe(3);
  });

  it('checks the radio that matches value attr', async () => {
    const options = JSON.stringify([{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]);
    const el = await makeElement({ options, value: 'b', name: 'grp' });
    const inputs = Array.from(el.querySelectorAll('input[type="radio"]')) as HTMLInputElement[];
    expect(inputs[0].checked).toBe(false);
    expect(inputs[1].checked).toBe(true);
  });

  it('fires specd-change with {value} on radio change', async () => {
    const options = JSON.stringify([{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]);
    const el = await makeElement({ options, value: 'a', name: 'grp' });
    let detail: { value: string } | null = null;
    el.addEventListener('specd-change', (e) => { detail = (e as CustomEvent).detail; });
    const inputs = el.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
    inputs[1].dispatchEvent(new Event('change', { bubbles: true }));
    expect(detail).not.toBeNull();
    expect(detail!.value).toBe('b');
  });

  it('applies inline class when inline attr is set', async () => {
    const options = JSON.stringify([{ value: 'a', label: 'A' }]);
    const el = await makeElement({ options, value: 'a', name: 'g', inline: '' });
    const div = el.querySelector('.radio-group');
    expect(div?.classList.contains('inline')).toBe(true);
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/RadioGroup --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 3:** Create `src/components/RadioGroup/SpecdRadioGroup.types.ts`

```typescript
export interface RadioOption {
  value: string;
  label: string;
  hint?: string;
}

/**
 * Props for SpecdRadioGroup (`<specd-radio-group>`).
 *
 * @example
 * <specd-radio-group name="view" options='[{"value":"list","label":"List"},{"value":"grid","label":"Grid"}]' value="list"></specd-radio-group>
 */
export interface RadioGroupProps {
  /** JSON string of RadioOption[]. */
  options: string;
  /** Currently selected value. */
  value: string;
  /** Input group name attribute (for accessibility). */
  name: string;
  /** Display options in a horizontal row. @default false */
  inline?: boolean;
}
```

- [ ] **Step 4:** Create `src/components/RadioGroup/SpecdRadioGroup.ts`

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { RadioGroupProps, RadioOption } from './SpecdRadioGroup.types.js';

/**
 * Specd DS — Radio Group
 *
 * A group of mutually exclusive radio buttons with optional hints.
 * Uses `.radio-group`, `.radio-item` CSS classes.
 *
 * @element specd-radio-group
 *
 * @attr {string}  options - JSON string of {value, label, hint?}[]
 * @attr {string}  value   - Currently selected value
 * @attr {string}  name    - Input group name (for accessibility)
 * @attr {boolean} inline  - Lay options out horizontally
 *
 * @fires specd-change - CustomEvent<{value: string}> on selection change
 *
 * @example
 * <specd-radio-group name="view" options='[{"value":"severity","label":"By Severity"}]' value="severity"></specd-radio-group>
 */
@customElement('specd-radio-group')
export class SpecdRadioGroup extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) options: string = '[]';
  @property({ type: String }) value: string = '';
  @property({ type: String }) name: string = 'radio-group';
  @property({ type: Boolean }) inline: boolean = false;

  private _parsedOptions(): RadioOption[] {
    try { return JSON.parse(this.options); } catch { return []; }
  }

  private _handleChange(val: string) {
    this.value = val;
    this.dispatchEvent(new CustomEvent('specd-change', { detail: { value: val }, bubbles: true, composed: true }));
  }

  override render() {
    const opts = this._parsedOptions();
    return html`
      <div class="radio-group${this.inline ? ' inline' : ''}">
        ${opts.map(opt => html`
          <label class="radio-item">
            <input
              type="radio"
              name=${this.name}
              value=${opt.value}
              .checked=${opt.value === this.value}
              @change=${() => this._handleChange(opt.value)}
            />
            <div>
              <div class="radio-item-label">${opt.label}</div>
              ${opt.hint ? html`<div class="radio-item-hint">${opt.hint}</div>` : nothing}
            </div>
          </label>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-radio-group': SpecdRadioGroup;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/RadioGroup --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 6:** Create `src/components/RadioGroup/SpecdRadioGroup.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdRadioGroup';

const VIEW_OPTIONS = JSON.stringify([
  { value: 'severity',  label: 'By Severity',  hint: 'Group issues by critical / warning / info' },
  { value: 'component', label: 'By Component', hint: 'One card per scanned component' },
]);

const meta: Meta = {
  title: 'Form/RadioGroup',
  component: 'specd-radio-group',
  tags: ['autodocs'],
  render: (args) => html`
    <div style="width:320px;padding:16px;">
      <specd-radio-group
        name=${args.name ?? 'view'}
        options=${args.options ?? VIEW_OPTIONS}
        value=${args.value ?? 'severity'}
        ?inline=${args.inline}
      ></specd-radio-group>
    </div>
  `,
  argTypes: {
    name:    { control: 'text' },
    options: { control: 'text' },
    value:   { control: 'text' },
    inline:  { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

export const Vertical: Story = { args: { options: VIEW_OPTIONS, value: 'severity', name: 'view' } };
export const Inline:   Story = {
  args: {
    options: JSON.stringify([{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Beta' }, { value: 'c', label: 'Gamma' }]),
    value: 'a',
    name: 'abc',
    inline: true,
  },
};
```

- [ ] **Step 7:** Create `src/components/RadioGroup/index.ts`

```typescript
export { SpecdRadioGroup } from './SpecdRadioGroup.js';
export type { RadioGroupProps, RadioOption } from './SpecdRadioGroup.types.js';
```

---

### 7.5 — SpecdCheckboxGroup

- [ ] **Step 1:** Write failing test at `src/components/CheckboxGroup/SpecdCheckboxGroup.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdCheckboxGroup');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-checkbox-group') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdCheckboxGroup', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-checkbox-group')).toBeDefined();
  });

  it('renders a div with radio-group class', async () => {
    const options = JSON.stringify([{ value: 'a', label: 'Alpha' }]);
    const el = await makeElement({ options, values: '["a"]' });
    const div = el.querySelector('.radio-group');
    expect(div).not.toBeNull();
  });

  it('renders one checkbox per option', async () => {
    const options = JSON.stringify([
      { value: 'x', label: 'X' },
      { value: 'y', label: 'Y' },
    ]);
    const el = await makeElement({ options, values: '[]' });
    const inputs = el.querySelectorAll('input[type="checkbox"]');
    expect(inputs.length).toBe(2);
  });

  it('checks checkboxes that are in values', async () => {
    const options = JSON.stringify([{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }, { value: 'c', label: 'C' }]);
    const el = await makeElement({ options, values: '["a","c"]' });
    const inputs = Array.from(el.querySelectorAll('input[type="checkbox"]')) as HTMLInputElement[];
    expect(inputs[0].checked).toBe(true);
    expect(inputs[1].checked).toBe(false);
    expect(inputs[2].checked).toBe(true);
  });

  it('fires specd-change with {values} array on change', async () => {
    const options = JSON.stringify([{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]);
    const el = await makeElement({ options, values: '["a"]' });
    let detail: { values: string[] } | null = null;
    el.addEventListener('specd-change', (e) => { detail = (e as CustomEvent).detail; });
    const inputs = el.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    inputs[1].checked = true;
    inputs[1].dispatchEvent(new Event('change', { bubbles: true }));
    expect(detail).not.toBeNull();
    expect(detail!.values).toContain('b');
  });

  it('applies inline class when inline attr is set', async () => {
    const options = JSON.stringify([{ value: 'a', label: 'A' }]);
    const el = await makeElement({ options, values: '[]', inline: '' });
    const div = el.querySelector('.radio-group');
    expect(div?.classList.contains('inline')).toBe(true);
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/CheckboxGroup --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 3:** Create `src/components/CheckboxGroup/SpecdCheckboxGroup.types.ts`

```typescript
export interface CheckboxOption {
  value: string;
  label: string;
  hint?: string;
}

/**
 * Props for SpecdCheckboxGroup (`<specd-checkbox-group>`).
 *
 * @example
 * <specd-checkbox-group options='[{"value":"colours","label":"Hard-coded colours"}]' values='["colours"]'></specd-checkbox-group>
 */
export interface CheckboxGroupProps {
  /** JSON string of CheckboxOption[]. */
  options: string;
  /** JSON string array of currently checked values. */
  values: string;
  /** Display options in a horizontal row. @default false */
  inline?: boolean;
}
```

- [ ] **Step 4:** Create `src/components/CheckboxGroup/SpecdCheckboxGroup.ts`

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { CheckboxGroupProps, CheckboxOption } from './SpecdCheckboxGroup.types.js';

/**
 * Specd DS — Checkbox Group
 *
 * A group of independent checkboxes with optional hints.
 * Reuses `.radio-group` and `.radio-item` CSS classes.
 *
 * @element specd-checkbox-group
 *
 * @attr {string}  options - JSON string of {value, label, hint?}[]
 * @attr {string}  values  - JSON string array of checked values
 * @attr {boolean} inline  - Lay options out horizontally
 *
 * @fires specd-change - CustomEvent<{values: string[]}> on change
 *
 * @example
 * <specd-checkbox-group options='[{"value":"a","label":"Alpha"}]' values='["a"]'></specd-checkbox-group>
 */
@customElement('specd-checkbox-group')
export class SpecdCheckboxGroup extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) options: string = '[]';
  @property({ type: String }) values: string = '[]';
  @property({ type: Boolean }) inline: boolean = false;

  private _parsedOptions(): CheckboxOption[] {
    try { return JSON.parse(this.options); } catch { return []; }
  }

  private _parsedValues(): string[] {
    try { return JSON.parse(this.values); } catch { return []; }
  }

  private _handleChange(val: string, checked: boolean) {
    const current = this._parsedValues();
    const next = checked
      ? [...new Set([...current, val])]
      : current.filter(v => v !== val);
    this.values = JSON.stringify(next);
    this.dispatchEvent(new CustomEvent('specd-change', { detail: { values: next }, bubbles: true, composed: true }));
  }

  override render() {
    const opts = this._parsedOptions();
    const vals = this._parsedValues();
    return html`
      <div class="radio-group${this.inline ? ' inline' : ''}">
        ${opts.map(opt => html`
          <label class="radio-item">
            <input
              type="checkbox"
              value=${opt.value}
              .checked=${vals.includes(opt.value)}
              @change=${(e: Event) => this._handleChange(opt.value, (e.target as HTMLInputElement).checked)}
            />
            <div>
              <div class="radio-item-label">${opt.label}</div>
              ${opt.hint ? html`<div class="radio-item-hint">${opt.hint}</div>` : nothing}
            </div>
          </label>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-checkbox-group': SpecdCheckboxGroup;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/CheckboxGroup --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 6:** Create `src/components/CheckboxGroup/SpecdCheckboxGroup.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdCheckboxGroup';

const ISSUE_OPTIONS = JSON.stringify([
  { value: 'colours',  label: 'Hard-coded colours',  hint: 'Colours not bound to a token' },
  { value: 'spacing',  label: 'Hard-coded spacing',  hint: 'Padding/gap not bound to a token' },
  { value: 'text',     label: 'Hard-coded text',     hint: 'Typography not using a style' },
  { value: 'no-desc',  label: 'Missing description', hint: 'Component has no description' },
]);

const meta: Meta = {
  title: 'Form/CheckboxGroup',
  component: 'specd-checkbox-group',
  tags: ['autodocs'],
  render: (args) => html`
    <div style="width:320px;padding:16px;">
      <specd-checkbox-group
        options=${args.options ?? ISSUE_OPTIONS}
        values=${args.values ?? '["colours","spacing"]'}
        ?inline=${args.inline}
      ></specd-checkbox-group>
    </div>
  `,
  argTypes: {
    options: { control: 'text' },
    values:  { control: 'text' },
    inline:  { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

export const Vertical: Story = { args: { options: ISSUE_OPTIONS, values: '["colours"]' } };
export const Inline:   Story = {
  args: {
    options: JSON.stringify([{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Beta' }, { value: 'c', label: 'Gamma' }]),
    values: '["a","c"]',
    inline: true,
  },
};
```

- [ ] **Step 7:** Create `src/components/CheckboxGroup/index.ts`

```typescript
export { SpecdCheckboxGroup } from './SpecdCheckboxGroup.js';
export type { CheckboxGroupProps, CheckboxOption } from './SpecdCheckboxGroup.types.js';
```

### 7.6 — Wire Task 7 into src/index.ts and src/react.ts

- [ ] **Step 1:** Add exports to `src/index.ts`:

```typescript
export * from './components/SectionLabel/index.js';
export * from './components/FormRow/index.js';
export * from './components/ToggleRow/index.js';
export * from './components/RadioGroup/index.js';
export * from './components/CheckboxGroup/index.js';
```

- [ ] **Step 2:** Add to `src/react.ts` imports:

```typescript
import { SpecdSectionLabel }   from './components/SectionLabel/SpecdSectionLabel.js';
import { SpecdFormRow }        from './components/FormRow/SpecdFormRow.js';
import { SpecdToggleRow }      from './components/ToggleRow/SpecdToggleRow.js';
import { SpecdRadioGroup }     from './components/RadioGroup/SpecdRadioGroup.js';
import { SpecdCheckboxGroup }  from './components/CheckboxGroup/SpecdCheckboxGroup.js';
```

Then add wrapper exports:

```typescript
/** Auto-generated React wrapper for <specd-section-label>. Do not hand-edit. */
export const SectionLabel = createComponent({
  react: React,
  tagName: 'specd-section-label',
  elementClass: SpecdSectionLabel,
  events: {},
});

/** Auto-generated React wrapper for <specd-form-row>. Do not hand-edit. */
export const FormRow = createComponent({
  react: React,
  tagName: 'specd-form-row',
  elementClass: SpecdFormRow,
  events: {},
});

/** Auto-generated React wrapper for <specd-toggle-row>. Do not hand-edit. */
export const ToggleRow = createComponent({
  react: React,
  tagName: 'specd-toggle-row',
  elementClass: SpecdToggleRow,
  events: { onSpecdChange: 'specd-change' },
});

/** Auto-generated React wrapper for <specd-radio-group>. Do not hand-edit. */
export const RadioGroup = createComponent({
  react: React,
  tagName: 'specd-radio-group',
  elementClass: SpecdRadioGroup,
  events: { onSpecdChange: 'specd-change' },
});

/** Auto-generated React wrapper for <specd-checkbox-group>. Do not hand-edit. */
export const CheckboxGroup = createComponent({
  react: React,
  tagName: 'specd-checkbox-group',
  elementClass: SpecdCheckboxGroup,
  events: { onSpecdChange: 'specd-change' },
});
```

- [ ] **Step 3:** Run all unit tests — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 4:** Commit
```bash
cd /Users/home/Desktop/code/admiral-ds
git add src/components/SectionLabel src/components/FormRow src/components/ToggleRow src/components/RadioGroup src/components/CheckboxGroup src/index.ts src/react.ts
git commit -m "feat(ds): add SpecdSectionLabel, SpecdFormRow, SpecdToggleRow, SpecdRadioGroup, SpecdCheckboxGroup form primitives"
```

---

## Task 8 — Overlays & Notifications

**Components:** `SpecdModal`, `SpecdDrawer`, `SpecdToast`, `SpecdAlert`

---

### 8.1 — SpecdModal

- [ ] **Step 1:** Write failing test at `src/components/Modal/SpecdModal.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdModal');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-modal') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdModal', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-modal')).toBeDefined();
  });

  it('renders a backdrop div', async () => {
    const el = await makeElement({ title: 'My Modal' });
    const backdrop = el.querySelector('.modal-backdrop');
    expect(backdrop).not.toBeNull();
  });

  it('has hidden class when open is false', async () => {
    const el = await makeElement({ title: 'My Modal' });
    const backdrop = el.querySelector('.modal-backdrop');
    expect(backdrop?.classList.contains('hidden')).toBe(true);
  });

  it('removes hidden class when open is set', async () => {
    const el = await makeElement({ title: 'My Modal', open: '' });
    const backdrop = el.querySelector('.modal-backdrop');
    expect(backdrop?.classList.contains('hidden')).toBe(false);
  });

  it('renders title text', async () => {
    const el = await makeElement({ title: 'Confirm Action', open: '' });
    const titleEl = el.querySelector('.modal-title');
    expect(titleEl?.textContent?.trim()).toBe('Confirm Action');
  });

  it('fires specd-close when close button is clicked', async () => {
    const el = await makeElement({ title: 'Test', open: '' });
    let fired = false;
    el.addEventListener('specd-close', () => { fired = true; });
    const closeBtn = el.querySelector('.modal-close-btn') as HTMLButtonElement;
    closeBtn?.click();
    expect(fired).toBe(true);
  });

  it('fires specd-close when backdrop is clicked', async () => {
    const el = await makeElement({ title: 'Test', open: '' });
    let fired = false;
    el.addEventListener('specd-close', () => { fired = true; });
    const backdrop = el.querySelector('.modal-backdrop') as HTMLElement;
    backdrop?.click();
    expect(fired).toBe(true);
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/Modal --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 3:** Create `src/components/Modal/SpecdModal.types.ts`

```typescript
/**
 * Props for SpecdModal (`<specd-modal>`).
 *
 * @example
 * <specd-modal title="Confirm" open>
 *   <p>Are you sure?</p>
 *   <specd-button slot="footer" variant="primary">Confirm</specd-button>
 * </specd-modal>
 */
export interface ModalProps {
  /** Whether the modal is visible. @default false */
  open?: boolean;
  /** Modal heading text. */
  title: string;
}
```

- [ ] **Step 4:** Create `src/components/Modal/SpecdModal.ts`

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ModalProps } from './SpecdModal.types.js';

/**
 * Specd DS — Modal
 *
 * A centered dialog overlay with header, body slot, and footer slot.
 * Uses `.modal-backdrop`, `.modal-card`, `.modal-header`, `.modal-body`, `.modal-footer` CSS classes.
 *
 * @element specd-modal
 *
 * @attr {boolean} open  - Whether the modal is visible
 * @attr {string}  title - Modal heading text
 *
 * @slot default - Modal body content
 * @slot footer  - Footer buttons
 *
 * @fires specd-close - When the X button or backdrop is clicked
 *
 * @example
 * <specd-modal title="Confirm" open>
 *   <p>Are you sure?</p>
 * </specd-modal>
 */
@customElement('specd-modal')
export class SpecdModal extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: Boolean }) open: boolean = false;
  @property({ type: String }) title: string = '';

  private _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('specd-close', { bubbles: true, composed: true }));
  }

  private _backdropClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {
      this._close();
    }
  }

  private _closeIcon() {
    return html`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>`;
  }

  override render() {
    return html`
      <div class="modal-backdrop${this.open ? '' : ' hidden'}" @click=${this._backdropClick}>
        <div class="modal-card" role="dialog" aria-modal="true" aria-label=${this.title}>
          <div class="modal-header">
            <div class="modal-title">${this.title}</div>
            <button class="modal-close-btn" aria-label="Close" @click=${this._close}>${this._closeIcon()}</button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-modal': SpecdModal;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/Modal --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 6:** Create `src/components/Modal/SpecdModal.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdModal';

const meta: Meta = {
  title: 'Overlays/Modal',
  component: 'specd-modal',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-modal
      title=${args.title ?? 'Modal Title'}
      ?open=${args.open}
    >
      <p style="font-size:13px;color:#4a6080;margin:0;">Modal body content goes here. Add any child elements via the default slot.</p>
      <div slot="footer">
        <button style="padding:8px 16px;background:#0c1f3f;color:white;border:none;border-radius:8px;cursor:pointer;">Confirm</button>
      </div>
    </specd-modal>
  `,
  argTypes: {
    title: { control: 'text' },
    open:  { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

export const Open:   Story = { args: { title: 'Confirm Action', open: true } };
export const Closed: Story = { args: { title: 'Confirm Action', open: false } };
```

- [ ] **Step 7:** Create `src/components/Modal/index.ts`

```typescript
export { SpecdModal } from './SpecdModal.js';
export type { ModalProps } from './SpecdModal.types.js';
```

---

### 8.2 — SpecdDrawer

- [ ] **Step 1:** Write failing test at `src/components/Drawer/SpecdDrawer.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdDrawer');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-drawer') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdDrawer', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-drawer')).toBeDefined();
  });

  it('renders a backdrop div', async () => {
    const el = await makeElement({ title: 'Details' });
    const backdrop = el.querySelector('.drawer-backdrop');
    expect(backdrop).not.toBeNull();
  });

  it('has hidden class when open is false', async () => {
    const el = await makeElement({ title: 'Details' });
    const backdrop = el.querySelector('.drawer-backdrop');
    expect(backdrop?.classList.contains('hidden')).toBe(true);
  });

  it('removes hidden class when open is set', async () => {
    const el = await makeElement({ title: 'Details', open: '' });
    const backdrop = el.querySelector('.drawer-backdrop');
    expect(backdrop?.classList.contains('hidden')).toBe(false);
  });

  it('renders drawer title', async () => {
    const el = await makeElement({ title: 'Component Details', open: '' });
    const titleEl = el.querySelector('.drawer-title');
    expect(titleEl?.textContent?.trim()).toBe('Component Details');
  });

  it('fires specd-close when backdrop is clicked', async () => {
    const el = await makeElement({ title: 'Test', open: '' });
    let fired = false;
    el.addEventListener('specd-close', () => { fired = true; });
    const backdrop = el.querySelector('.drawer-backdrop') as HTMLElement;
    backdrop?.click();
    expect(fired).toBe(true);
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/Drawer --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 3:** Create `src/components/Drawer/SpecdDrawer.types.ts`

```typescript
/**
 * Props for SpecdDrawer (`<specd-drawer>`).
 *
 * @example
 * <specd-drawer title="Component Details" open>
 *   <p>Drawer body content</p>
 * </specd-drawer>
 */
export interface DrawerProps {
  /** Whether the drawer is visible. @default false */
  open?: boolean;
  /** Drawer heading text. */
  title: string;
}
```

- [ ] **Step 4:** Create `src/components/Drawer/SpecdDrawer.ts`

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DrawerProps } from './SpecdDrawer.types.js';

/**
 * Specd DS — Drawer
 *
 * A slide-in side panel overlay with header, body slot, and footer slot.
 * Uses `.drawer-backdrop`, `.drawer-panel`, `.drawer-header`, `.drawer-body`, `.drawer-footer` CSS classes.
 *
 * @element specd-drawer
 *
 * @attr {boolean} open  - Whether the drawer is visible
 * @attr {string}  title - Drawer heading text
 *
 * @slot default - Drawer body content
 * @slot footer  - Footer buttons
 *
 * @fires specd-close - When the backdrop is clicked
 *
 * @example
 * <specd-drawer title="Details" open>
 *   <p>Content here</p>
 * </specd-drawer>
 */
@customElement('specd-drawer')
export class SpecdDrawer extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: Boolean }) open: boolean = false;
  @property({ type: String }) title: string = '';

  private _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('specd-close', { bubbles: true, composed: true }));
  }

  private _backdropClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('drawer-backdrop')) {
      this._close();
    }
  }

  private _closeIcon() {
    return html`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>`;
  }

  override render() {
    return html`
      <div class="drawer-backdrop${this.open ? '' : ' hidden'}" @click=${this._backdropClick}>
        <div class="drawer-panel" role="dialog" aria-modal="true" aria-label=${this.title}>
          <div class="drawer-header">
            <div class="drawer-title">${this.title}</div>
            <button class="modal-close-btn" aria-label="Close" @click=${this._close}>${this._closeIcon()}</button>
          </div>
          <div class="drawer-body">
            <slot></slot>
          </div>
          <div class="drawer-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-drawer': SpecdDrawer;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/Drawer --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 6:** Create `src/components/Drawer/SpecdDrawer.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdDrawer';

const meta: Meta = {
  title: 'Overlays/Drawer',
  component: 'specd-drawer',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-drawer title=${args.title ?? 'Drawer Title'} ?open=${args.open}>
      <p style="font-size:13px;color:#4a6080;margin:0;">Drawer body content goes here.</p>
    </specd-drawer>
  `,
  argTypes: {
    title: { control: 'text' },
    open:  { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

export const Open:   Story = { args: { title: 'Component Details', open: true } };
export const Closed: Story = { args: { title: 'Component Details', open: false } };
```

- [ ] **Step 7:** Create `src/components/Drawer/index.ts`

```typescript
export { SpecdDrawer } from './SpecdDrawer.js';
export type { DrawerProps } from './SpecdDrawer.types.js';
```

---

### 8.3 — SpecdToast

- [ ] **Step 1:** Write failing test at `src/components/Toast/SpecdToast.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdToast');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-toast') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdToast', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-toast')).toBeDefined();
  });

  it('renders a div with toast class', async () => {
    const el = await makeElement({ title: 'Success', duration: '0' });
    const div = el.querySelector('.toast');
    expect(div).not.toBeNull();
  });

  it('renders title text', async () => {
    const el = await makeElement({ title: 'Saved!', duration: '0' });
    const titleEl = el.querySelector('.toast-title');
    expect(titleEl?.textContent?.trim()).toBe('Saved!');
  });

  it('renders description when provided', async () => {
    const el = await makeElement({ title: 'Done', description: 'All changes saved', duration: '0' });
    const desc = el.querySelector('.toast-desc');
    expect(desc?.textContent?.trim()).toBe('All changes saved');
  });

  it('applies toast-positive class for positive intent', async () => {
    const el = await makeElement({ title: 'OK', intent: 'positive', duration: '0' });
    expect(el.querySelector('.toast')?.classList.contains('toast-positive')).toBe(true);
  });

  it('applies toast-warning class for warning intent', async () => {
    const el = await makeElement({ title: 'Warn', intent: 'warning', duration: '0' });
    expect(el.querySelector('.toast')?.classList.contains('toast-warning')).toBe(true);
  });

  it('applies toast-negative class for negative intent', async () => {
    const el = await makeElement({ title: 'Error', intent: 'negative', duration: '0' });
    expect(el.querySelector('.toast')?.classList.contains('toast-negative')).toBe(true);
  });

  it('fires specd-dismiss when close button is clicked', async () => {
    const el = await makeElement({ title: 'Test', duration: '0' });
    let fired = false;
    el.addEventListener('specd-dismiss', () => { fired = true; });
    const btn = el.querySelector('.toast-close') as HTMLButtonElement;
    btn?.click();
    expect(fired).toBe(true);
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/Toast --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 3:** Create `src/components/Toast/SpecdToast.types.ts`

```typescript
export type ToastIntent = 'default' | 'positive' | 'warning' | 'negative';

/**
 * Props for SpecdToast (`<specd-toast>`).
 *
 * @example
 * <specd-toast title="Saved!" intent="positive" duration="3000"></specd-toast>
 */
export interface ToastProps {
  /** Toast heading text. */
  title: string;
  /** Optional body text. */
  description?: string;
  /** Visual intent. @default 'default' */
  intent?: ToastIntent;
  /** Auto-dismiss delay in ms. 0 = persistent. @default 4000 */
  duration?: number;
}
```

- [ ] **Step 4:** Create `src/components/Toast/SpecdToast.ts`

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ToastProps, ToastIntent } from './SpecdToast.types.js';

/**
 * Specd DS — Toast
 *
 * A transient notification with auto-dismiss. Also exports an imperative `toast()` helper.
 * Uses `.toast`, `.toast-title`, `.toast-desc`, `.toast-close` CSS classes.
 *
 * @element specd-toast
 *
 * @attr {string} title       - Toast heading text
 * @attr {string} description - Optional body text
 * @attr {string} intent      - 'default' | 'positive' | 'warning' | 'negative'
 * @attr {number} duration    - Auto-dismiss ms (0 = persistent, default 4000)
 *
 * @fires specd-dismiss - When dismissed (auto or manual)
 *
 * @example
 * <specd-toast title="Saved!" intent="positive"></specd-toast>
 */
@customElement('specd-toast')
export class SpecdToast extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) title: string = '';
  @property({ type: String }) description?: string;
  @property({ type: String }) intent: ToastIntent = 'default';
  @property({ type: Number }) duration: number = 4000;

  private _timer: ReturnType<typeof setTimeout> | null = null;

  override connectedCallback() {
    super.connectedCallback();
    if (this.duration > 0) {
      this._timer = setTimeout(() => this._dismiss(), this.duration);
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timer) { clearTimeout(this._timer); this._timer = null; }
  }

  private _dismiss() {
    if (this._timer) { clearTimeout(this._timer); this._timer = null; }
    this.dispatchEvent(new CustomEvent('specd-dismiss', { bubbles: true, composed: true }));
    this.remove();
  }

  private _intentClass(): string {
    if (this.intent === 'positive') return ' toast-positive';
    if (this.intent === 'warning')  return ' toast-warning';
    if (this.intent === 'negative') return ' toast-negative';
    return '';
  }

  override render() {
    return html`
      <div class="toast${this._intentClass()}">
        <div style="flex:1">
          <div class="toast-title">${this.title}</div>
          ${this.description ? html`<div class="toast-desc">${this.description}</div>` : nothing}
        </div>
        <button class="toast-close" aria-label="Dismiss" @click=${this._dismiss}>×</button>
      </div>
    `;
  }
}

/**
 * Imperatively mount a toast on document.body.
 *
 * @example
 * import { toast } from '@specd/specd-ds/components/Toast/SpecdToast.js';
 * toast({ title: 'Saved!', intent: 'positive' });
 */
export function toast(opts: ToastProps): SpecdToast {
  const el = document.createElement('specd-toast') as SpecdToast;
  el.title = opts.title;
  if (opts.description !== undefined) el.description = opts.description;
  if (opts.intent !== undefined) el.intent = opts.intent;
  if (opts.duration !== undefined) el.duration = opts.duration;
  document.body.appendChild(el);
  return el;
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-toast': SpecdToast;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/Toast --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 6:** Create `src/components/Toast/SpecdToast.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdToast';

const meta: Meta = {
  title: 'Overlays/Toast',
  component: 'specd-toast',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-toast
      title=${args.title ?? 'Notification'}
      description=${args.description ?? ''}
      intent=${args.intent ?? 'default'}
      duration=${args.duration ?? 0}
    ></specd-toast>
  `,
  argTypes: {
    title:       { control: 'text' },
    description: { control: 'text' },
    intent:      { control: 'select', options: ['default', 'positive', 'warning', 'negative'] },
    duration:    { control: 'number' },
  },
};
export default meta;
type Story = StoryObj;

export const Default:  Story = { args: { title: 'Scan complete', description: 'Found 42 components', duration: 0 } };
export const Positive: Story = { args: { title: 'Saved!', intent: 'positive', duration: 0 } };
export const Warning:  Story = { args: { title: 'Stale data', description: 'Re-scan to refresh results', intent: 'warning', duration: 0 } };
export const Negative: Story = { args: { title: 'Scan failed', description: 'Could not access library', intent: 'negative', duration: 0 } };
```

- [ ] **Step 7:** Create `src/components/Toast/index.ts`

```typescript
export { SpecdToast, toast } from './SpecdToast.js';
export type { ToastProps, ToastIntent } from './SpecdToast.types.js';
```

---

### 8.4 — SpecdAlert

- [ ] **Step 1:** Write failing test at `src/components/Alert/SpecdAlert.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdAlert');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-alert') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdAlert', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-alert')).toBeDefined();
  });

  it('renders a div with alert class', async () => {
    const el = await makeElement({ title: 'Note', intent: 'neutral' });
    const div = el.querySelector('.alert');
    expect(div).not.toBeNull();
  });

  it('applies alert-neutral class for neutral intent', async () => {
    const el = await makeElement({ title: 'Note', intent: 'neutral' });
    expect(el.querySelector('.alert')?.classList.contains('alert-neutral')).toBe(true);
  });

  it('applies alert-positive class for positive intent', async () => {
    const el = await makeElement({ title: 'OK', intent: 'positive' });
    expect(el.querySelector('.alert')?.classList.contains('alert-positive')).toBe(true);
  });

  it('applies alert-warning class for warning intent', async () => {
    const el = await makeElement({ title: 'Warn', intent: 'warning' });
    expect(el.querySelector('.alert')?.classList.contains('alert-warning')).toBe(true);
  });

  it('applies alert-negative class for negative intent', async () => {
    const el = await makeElement({ title: 'Error', intent: 'negative' });
    expect(el.querySelector('.alert')?.classList.contains('alert-negative')).toBe(true);
  });

  it('renders title text', async () => {
    const el = await makeElement({ title: 'Important notice', intent: 'neutral' });
    expect(el.querySelector('.alert-title')?.textContent?.trim()).toBe('Important notice');
  });

  it('renders description when provided', async () => {
    const el = await makeElement({ title: 'Note', description: 'More detail here', intent: 'neutral' });
    expect(el.querySelector('.alert-desc')?.textContent?.trim()).toBe('More detail here');
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/Alert --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 3:** Create `src/components/Alert/SpecdAlert.types.ts`

```typescript
export type AlertIntent = 'neutral' | 'positive' | 'warning' | 'negative';

/**
 * Props for SpecdAlert (`<specd-alert>`).
 *
 * @example
 * <specd-alert intent="warning" title="Stale data" description="Re-scan to refresh"></specd-alert>
 */
export interface AlertProps {
  /** Visual intent controlling colours. */
  intent: AlertIntent;
  /** Alert heading text. */
  title: string;
  /** Optional body text. */
  description?: string;
}
```

- [ ] **Step 4:** Create `src/components/Alert/SpecdAlert.ts`

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { AlertProps, AlertIntent } from './SpecdAlert.types.js';

/**
 * Specd DS — Alert
 *
 * An inline status message with title, optional description, and intent colour.
 * Uses `.alert`, `.alert-title`, `.alert-desc`, `.alert-{intent}` CSS classes.
 *
 * @element specd-alert
 *
 * @attr {string} intent      - 'neutral' | 'positive' | 'warning' | 'negative'
 * @attr {string} title       - Alert heading
 * @attr {string} description - Optional body text
 *
 * @example
 * <specd-alert intent="warning" title="Stale scan data" description="Re-run the scan to refresh results."></specd-alert>
 */
@customElement('specd-alert')
export class SpecdAlert extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) intent: AlertIntent = 'neutral';
  @property({ type: String }) title: string = '';
  @property({ type: String }) description?: string;

  override render() {
    return html`
      <div class="alert alert-${this.intent}">
        <div>
          <div class="alert-title">${this.title}</div>
          ${this.description ? html`<div class="alert-desc">${this.description}</div>` : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-alert': SpecdAlert;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/Alert --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 6:** Create `src/components/Alert/SpecdAlert.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdAlert';

const meta: Meta = {
  title: 'Overlays/Alert',
  component: 'specd-alert',
  tags: ['autodocs'],
  render: (args) => html`
    <div style="width:360px;padding:16px;">
      <specd-alert
        intent=${args.intent ?? 'neutral'}
        title=${args.title ?? 'Alert title'}
        description=${args.description ?? ''}
      ></specd-alert>
    </div>
  `,
  argTypes: {
    intent:      { control: 'select', options: ['neutral', 'positive', 'warning', 'negative'] },
    title:       { control: 'text' },
    description: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Neutral:  Story = { args: { intent: 'neutral',  title: 'Informational',    description: 'This is a neutral notice.' } };
export const Positive: Story = { args: { intent: 'positive', title: 'Scan complete',     description: 'All components analysed.' } };
export const Warning:  Story = { args: { intent: 'warning',  title: 'Stale data',        description: 'Re-run to refresh results.' } };
export const Negative: Story = { args: { intent: 'negative', title: 'Scan failed',       description: 'Could not connect to library.' } };
```

- [ ] **Step 7:** Create `src/components/Alert/index.ts`

```typescript
export { SpecdAlert } from './SpecdAlert.js';
export type { AlertProps, AlertIntent } from './SpecdAlert.types.js';
```

### 8.5 — Wire Task 8 into src/index.ts and src/react.ts

- [ ] **Step 1:** Add exports to `src/index.ts`:

```typescript
export * from './components/Modal/index.js';
export * from './components/Drawer/index.js';
export * from './components/Toast/index.js';
export * from './components/Alert/index.js';
```

- [ ] **Step 2:** Add to `src/react.ts` imports:

```typescript
import { SpecdModal }  from './components/Modal/SpecdModal.js';
import { SpecdDrawer } from './components/Drawer/SpecdDrawer.js';
import { SpecdToast }  from './components/Toast/SpecdToast.js';
import { SpecdAlert }  from './components/Alert/SpecdAlert.js';
```

Then add wrapper exports:

```typescript
/** Auto-generated React wrapper for <specd-modal>. Do not hand-edit. */
export const Modal = createComponent({
  react: React,
  tagName: 'specd-modal',
  elementClass: SpecdModal,
  events: { onSpecdClose: 'specd-close' },
});

/** Auto-generated React wrapper for <specd-drawer>. Do not hand-edit. */
export const Drawer = createComponent({
  react: React,
  tagName: 'specd-drawer',
  elementClass: SpecdDrawer,
  events: { onSpecdClose: 'specd-close' },
});

/** Auto-generated React wrapper for <specd-toast>. Do not hand-edit. */
export const Toast = createComponent({
  react: React,
  tagName: 'specd-toast',
  elementClass: SpecdToast,
  events: { onSpecdDismiss: 'specd-dismiss' },
});

/** Auto-generated React wrapper for <specd-alert>. Do not hand-edit. */
export const Alert = createComponent({
  react: React,
  tagName: 'specd-alert',
  elementClass: SpecdAlert,
  events: {},
});
```

- [ ] **Step 3:** Run all unit tests — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 4:** Commit
```bash
cd /Users/home/Desktop/code/admiral-ds
git add src/components/Modal src/components/Drawer src/components/Toast src/components/Alert src/index.ts src/react.ts
git commit -m "feat(ds): add SpecdModal, SpecdDrawer, SpecdToast, SpecdAlert overlay components"
```

---

## Task 9 — Layout & Navigation Primitives

**Components:** `SpecdDivider`, `SpecdKvRow`, `SpecdCodeBlock`, `SpecdSkeleton`, `SpecdEmptyState`, `SpecdBreadcrumb`, `SpecdPagination`, `SpecdStepper`

---

### 9.1 — SpecdDivider

- [ ] **Step 1:** Write failing test at `src/components/Divider/SpecdDivider.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdDivider');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-divider') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdDivider', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-divider')).toBeDefined();
  });

  it('renders a div with divider class', async () => {
    const el = await makeElement({});
    const div = el.querySelector('.divider');
    expect(div).not.toBeNull();
  });

  it('renders two divider-line elements', async () => {
    const el = await makeElement({});
    const lines = el.querySelectorAll('.divider-line');
    expect(lines.length).toBe(2);
  });

  it('renders label when provided', async () => {
    const el = await makeElement({ label: 'OR' });
    const label = el.querySelector('.divider-label');
    expect(label?.textContent?.trim()).toBe('OR');
  });

  it('does not render label div when label is absent', async () => {
    const el = await makeElement({});
    const label = el.querySelector('.divider-label');
    expect(label).toBeNull();
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/Divider --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 3:** Create `src/components/Divider/SpecdDivider.types.ts`

```typescript
/**
 * Props for SpecdDivider (`<specd-divider>`).
 *
 * @example
 * <specd-divider label="OR"></specd-divider>
 * <specd-divider></specd-divider>
 */
export interface DividerProps {
  /** Optional label text centered in the divider. */
  label?: string;
}
```

- [ ] **Step 4:** Create `src/components/Divider/SpecdDivider.ts`

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DividerProps } from './SpecdDivider.types.js';

/**
 * Specd DS — Divider
 *
 * A horizontal rule with an optional centered label.
 * Uses `.divider`, `.divider-line`, `.divider-label` CSS classes.
 *
 * @element specd-divider
 *
 * @attr {string} label - Optional centered label text
 *
 * @example
 * <specd-divider label="OR"></specd-divider>
 */
@customElement('specd-divider')
export class SpecdDivider extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) label?: string;

  override render() {
    return html`
      <div class="divider">
        <span class="divider-line"></span>
        ${this.label ? html`<span class="divider-label">${this.label}</span>` : nothing}
        <span class="divider-line"></span>
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

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/Divider --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 6:** Create `src/components/Divider/SpecdDivider.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdDivider';

const meta: Meta = {
  title: 'Layout/Divider',
  component: 'specd-divider',
  tags: ['autodocs'],
  render: (args) => html`
    <div style="width:300px;padding:16px;">
      <specd-divider label=${args.label ?? ''}></specd-divider>
    </div>
  `,
  argTypes: { label: { control: 'text' } },
};
export default meta;
type Story = StoryObj;

export const Plain:     Story = { args: {} };
export const WithLabel: Story = { args: { label: 'OR' } };
export const SectionBreak: Story = { args: { label: 'Advanced Settings' } };
```

- [ ] **Step 7:** Create `src/components/Divider/index.ts`

```typescript
export { SpecdDivider } from './SpecdDivider.js';
export type { DividerProps } from './SpecdDivider.types.js';
```

---

### 9.2 — SpecdKvRow

- [ ] **Step 1:** Write failing test at `src/components/KvRow/SpecdKvRow.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdKvRow');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-kv-row') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdKvRow', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-kv-row')).toBeDefined();
  });

  it('renders a div with kv-row class', async () => {
    const el = await makeElement({ label: 'Name', value: 'Button' });
    expect(el.querySelector('.kv-row')).not.toBeNull();
  });

  it('renders label text', async () => {
    const el = await makeElement({ label: 'Component', value: 'Badge' });
    expect(el.querySelector('.kv-label')?.textContent?.trim()).toBe('Component');
  });

  it('renders value text', async () => {
    const el = await makeElement({ label: 'Component', value: 'Badge' });
    expect(el.querySelector('.kv-value')?.textContent?.trim()).toBe('Badge');
  });

  it('applies mono class when mono attr is set', async () => {
    const el = await makeElement({ label: 'Token', value: '--blue-100', mono: '' });
    expect(el.querySelector('.kv-value')?.classList.contains('mono')).toBe(true);
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/KvRow --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 3:** Create `src/components/KvRow/SpecdKvRow.types.ts`

```typescript
/**
 * Props for SpecdKvRow (`<specd-kv-row>`).
 *
 * @example
 * <specd-kv-row label="Token" value="--blue-100" mono></specd-kv-row>
 */
export interface KvRowProps {
  /** Row label (key). */
  label: string;
  /** Row value. */
  value: string;
  /** Render value in monospace font. @default false */
  mono?: boolean;
}
```

- [ ] **Step 4:** Create `src/components/KvRow/SpecdKvRow.ts`

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { KvRowProps } from './SpecdKvRow.types.js';

/**
 * Specd DS — Key-Value Row
 *
 * A label/value pair row with bottom border, used in detail panels.
 * Uses `.kv-row`, `.kv-label`, `.kv-value` CSS classes.
 *
 * @element specd-kv-row
 *
 * @attr {string}  label - Row key label
 * @attr {string}  value - Row value
 * @attr {boolean} mono  - Render value in monospace
 *
 * @example
 * <specd-kv-row label="File key" value="abc123" mono></specd-kv-row>
 */
@customElement('specd-kv-row')
export class SpecdKvRow extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string = '';
  @property({ type: String }) value: string = '';
  @property({ type: Boolean }) mono: boolean = false;

  override render() {
    return html`
      <div class="kv-row">
        <span class="kv-label">${this.label}</span>
        <span class="kv-value${this.mono ? ' mono' : ''}">${this.value}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-kv-row': SpecdKvRow;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/KvRow --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 6:** Create `src/components/KvRow/SpecdKvRow.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdKvRow';

const meta: Meta = {
  title: 'Layout/KvRow',
  component: 'specd-kv-row',
  tags: ['autodocs'],
  render: (args) => html`
    <div style="width:360px;padding:0 16px;">
      <specd-kv-row label=${args.label ?? 'Key'} value=${args.value ?? 'Value'} ?mono=${args.mono}></specd-kv-row>
    </div>
  `,
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    mono:  { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = { args: { label: 'Component name', value: 'Button / Primary' } };
export const Mono:    Story = { args: { label: 'Variable token', value: '--blue-100', mono: true } };
export const Stack:   Story = {
  render: () => html`
    <div style="width:360px;padding:0 16px;">
      <specd-kv-row label="Component"    value="Button / Primary"></specd-kv-row>
      <specd-kv-row label="File key"     value="abc123xyz"        mono></specd-kv-row>
      <specd-kv-row label="Dev status"   value="Ready for dev"></specd-kv-row>
      <specd-kv-row label="Last updated" value="2 hours ago"></specd-kv-row>
    </div>
  `,
};
```

- [ ] **Step 7:** Create `src/components/KvRow/index.ts`

```typescript
export { SpecdKvRow } from './SpecdKvRow.js';
export type { KvRowProps } from './SpecdKvRow.types.js';
```

---

### 9.3 — SpecdCodeBlock

- [ ] **Step 1:** Write failing test at `src/components/CodeBlock/SpecdCodeBlock.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdCodeBlock');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-code-block') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdCodeBlock', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-code-block')).toBeDefined();
  });

  it('renders a div with code-block class', async () => {
    const el = await makeElement({ code: 'const x = 1;' });
    expect(el.querySelector('.code-block')).not.toBeNull();
  });

  it('renders the code text', async () => {
    const el = await makeElement({ code: 'const x = 1;' });
    const pre = el.querySelector('pre');
    expect(pre?.textContent).toContain('const x = 1;');
  });

  it('renders a copy button', async () => {
    const el = await makeElement({ code: 'const x = 1;' });
    const btn = el.querySelector('.code-block-copy');
    expect(btn).not.toBeNull();
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/CodeBlock --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 3:** Create `src/components/CodeBlock/SpecdCodeBlock.types.ts`

```typescript
/**
 * Props for SpecdCodeBlock (`<specd-code-block>`).
 *
 * @example
 * <specd-code-block code="const x = 1;" language="typescript"></specd-code-block>
 */
export interface CodeBlockProps {
  /** Source code to display. */
  code: string;
  /** Optional language hint (for display only, no syntax highlighting). */
  language?: string;
}
```

- [ ] **Step 4:** Create `src/components/CodeBlock/SpecdCodeBlock.ts`

```typescript
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { CodeBlockProps } from './SpecdCodeBlock.types.js';

/**
 * Specd DS — Code Block
 *
 * A dark monospace code display with a one-click copy button.
 * Uses `.code-block` and `.code-block-copy` CSS classes.
 *
 * @element specd-code-block
 *
 * @attr {string} code     - Source code to display
 * @attr {string} language - Optional language hint label
 *
 * @example
 * <specd-code-block code="npm install @specd/specd-ds" language="bash"></specd-code-block>
 */
@customElement('specd-code-block')
export class SpecdCodeBlock extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) code: string = '';
  @property({ type: String }) language?: string;
  @state() private _copied: boolean = false;

  private async _copy() {
    const text = this.code;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
    } catch (_) { /* silent */ }
    this._copied = true;
    setTimeout(() => { this._copied = false; }, 1500);
  }

  override render() {
    return html`
      <div class="code-block">
        <pre>${this.code}</pre>
        <button class="code-block-copy" @click=${this._copy}>
          ${this._copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-code-block': SpecdCodeBlock;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/CodeBlock --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 6:** Create `src/components/CodeBlock/SpecdCodeBlock.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdCodeBlock';

const meta: Meta = {
  title: 'Layout/CodeBlock',
  component: 'specd-code-block',
  tags: ['autodocs'],
  render: (args) => html`
    <div style="width:420px;padding:16px;">
      <specd-code-block code=${args.code ?? ''} language=${args.language ?? ''}></specd-code-block>
    </div>
  `,
  argTypes: {
    code:     { control: 'text' },
    language: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Install:   Story = { args: { code: 'npm install @specd/specd-ds', language: 'bash' } };
export const Import:    Story = { args: { code: "import '@specd/specd-ds';\nimport '@specd/specd-ds/tokens.css';", language: 'typescript' } };
export const MultiLine: Story = {
  args: {
    code: `const el = document.createElement('specd-badge');
el.setAttribute('value', '5');
el.setAttribute('intent', 'negative');
document.body.appendChild(el);`,
    language: 'javascript',
  },
};
```

- [ ] **Step 7:** Create `src/components/CodeBlock/index.ts`

```typescript
export { SpecdCodeBlock } from './SpecdCodeBlock.js';
export type { CodeBlockProps } from './SpecdCodeBlock.types.js';
```

---

### 9.4 — SpecdSkeleton

- [ ] **Step 1:** Write failing test at `src/components/Skeleton/SpecdSkeleton.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdSkeleton');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-skeleton') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdSkeleton', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-skeleton')).toBeDefined();
  });

  it('renders a skeleton element by default (text variant)', async () => {
    const el = await makeElement({});
    const skels = el.querySelectorAll('.skeleton');
    expect(skels.length).toBeGreaterThan(0);
  });

  it('renders skeleton-text class for text variant', async () => {
    const el = await makeElement({ variant: 'text' });
    expect(el.querySelector('.skeleton-text')).not.toBeNull();
  });

  it('renders skeleton-rect class for rect variant', async () => {
    const el = await makeElement({ variant: 'rect' });
    expect(el.querySelector('.skeleton-rect')).not.toBeNull();
  });

  it('renders skeleton-circle class for circle variant', async () => {
    const el = await makeElement({ variant: 'circle' });
    expect(el.querySelector('.skeleton-circle')).not.toBeNull();
  });

  it('renders multiple lines for text variant with lines attr', async () => {
    const el = await makeElement({ variant: 'text', lines: '3' });
    const skels = el.querySelectorAll('.skeleton-text');
    expect(skels.length).toBe(3);
  });

  it('last text line is narrower (has short-line class)', async () => {
    const el = await makeElement({ variant: 'text', lines: '3' });
    const skels = Array.from(el.querySelectorAll('.skeleton-text'));
    expect(skels[skels.length - 1].classList.contains('short-line')).toBe(true);
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/Skeleton --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 3:** Create `src/components/Skeleton/SpecdSkeleton.types.ts`

```typescript
export type SkeletonVariant = 'text' | 'rect' | 'circle';

/**
 * Props for SpecdSkeleton (`<specd-skeleton>`).
 *
 * @example
 * <specd-skeleton variant="text" lines="3"></specd-skeleton>
 * <specd-skeleton variant="rect" height="80px"></specd-skeleton>
 */
export interface SkeletonProps {
  /** Shape variant. @default 'text' */
  variant?: SkeletonVariant;
  /** CSS width override. */
  width?: string;
  /** CSS height override. */
  height?: string;
  /** Number of stacked text lines (text variant only). @default 1 */
  lines?: number;
}
```

- [ ] **Step 4:** Create `src/components/Skeleton/SpecdSkeleton.ts`

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SkeletonProps, SkeletonVariant } from './SpecdSkeleton.types.js';

/**
 * Specd DS — Skeleton
 *
 * Animated shimmer placeholder for loading states.
 * Uses `.skeleton`, `.skeleton-text`, `.skeleton-rect`, `.skeleton-circle`, `.short-line` CSS classes.
 *
 * @element specd-skeleton
 *
 * @attr {string} variant - 'text' | 'rect' | 'circle' (default 'text')
 * @attr {string} width   - CSS width
 * @attr {string} height  - CSS height
 * @attr {number} lines   - Number of text lines (text variant)
 *
 * @example
 * <specd-skeleton variant="text" lines="3"></specd-skeleton>
 */
@customElement('specd-skeleton')
export class SpecdSkeleton extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) variant: SkeletonVariant = 'text';
  @property({ type: String }) width?: string;
  @property({ type: String }) height?: string;
  @property({ type: Number }) lines: number = 1;

  private _style(): string {
    const parts: string[] = [];
    if (this.width)  parts.push(`width:${this.width}`);
    if (this.height) parts.push(`height:${this.height}`);
    return parts.join(';');
  }

  override render() {
    if (this.variant === 'rect') {
      return html`<div class="skeleton skeleton-rect" style=${this._style()}></div>`;
    }
    if (this.variant === 'circle') {
      return html`<div class="skeleton skeleton-circle" style=${this._style()}></div>`;
    }
    // text: render N lines, last one is 60% width
    const count = Math.max(1, this.lines);
    return html`
      <div>
        ${Array.from({ length: count }, (_, i) => html`
          <div class="skeleton skeleton-text${i === count - 1 && count > 1 ? ' short-line' : ''}"
               style=${i === count - 1 && count > 1 ? 'width:60%' : ''}></div>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-skeleton': SpecdSkeleton;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/Skeleton --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 6:** Create `src/components/Skeleton/SpecdSkeleton.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdSkeleton';

const meta: Meta = {
  title: 'Layout/Skeleton',
  component: 'specd-skeleton',
  tags: ['autodocs'],
  render: (args) => html`
    <div style="width:300px;padding:16px;">
      <specd-skeleton
        variant=${args.variant ?? 'text'}
        lines=${args.lines ?? 1}
        width=${args.width ?? ''}
        height=${args.height ?? ''}
      ></specd-skeleton>
    </div>
  `,
  argTypes: {
    variant: { control: 'select', options: ['text', 'rect', 'circle'] },
    lines:   { control: 'number' },
    width:   { control: 'text' },
    height:  { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Text:       Story = { args: { variant: 'text', lines: 3 } };
export const Rect:       Story = { args: { variant: 'rect', height: '80px' } };
export const Circle:     Story = { args: { variant: 'circle', width: '48px', height: '48px' } };
export const SingleLine: Story = { args: { variant: 'text', lines: 1 } };
```

- [ ] **Step 7:** Create `src/components/Skeleton/index.ts`

```typescript
export { SpecdSkeleton } from './SpecdSkeleton.js';
export type { SkeletonProps, SkeletonVariant } from './SpecdSkeleton.types.js';
```

---

### 9.5 — SpecdEmptyState

- [ ] **Step 1:** Write failing test at `src/components/EmptyState/SpecdEmptyState.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdEmptyState');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-empty-state') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdEmptyState', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-empty-state')).toBeDefined();
  });

  it('renders a div with empty-state class', async () => {
    const el = await makeElement({ title: 'No results' });
    expect(el.querySelector('.empty-state')).not.toBeNull();
  });

  it('renders title text', async () => {
    const el = await makeElement({ title: 'Nothing here yet' });
    expect(el.querySelector('.empty-state-title')?.textContent?.trim()).toBe('Nothing here yet');
  });

  it('renders description when provided', async () => {
    const el = await makeElement({ title: 'No results', description: 'Try adjusting filters' });
    expect(el.querySelector('.empty-state-desc')?.textContent?.trim()).toBe('Try adjusting filters');
  });

  it('renders icon container', async () => {
    const el = await makeElement({ title: 'Empty' });
    expect(el.querySelector('.empty-state-icon')).not.toBeNull();
  });

  it('renders a slot', async () => {
    const el = await makeElement({ title: 'Empty' });
    expect(el.querySelector('slot')).not.toBeNull();
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/EmptyState --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 3:** Create `src/components/EmptyState/SpecdEmptyState.types.ts`

```typescript
/**
 * Props for SpecdEmptyState (`<specd-empty-state>`).
 *
 * @example
 * <specd-empty-state title="No components found" description="Run a scan to see results.">
 *   <specd-button>Run Scan</specd-button>
 * </specd-empty-state>
 */
export interface EmptyStateProps {
  /** Heading text. */
  title: string;
  /** Optional body text. */
  description?: string;
  /** Raw SVG string for the icon. */
  icon?: string;
}
```

- [ ] **Step 4:** Create `src/components/EmptyState/SpecdEmptyState.ts`

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { EmptyStateProps } from './SpecdEmptyState.types.js';

const DEFAULT_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`;

/**
 * Specd DS — Empty State
 *
 * A centred illustration + heading + description + CTA slot for empty list states.
 * Uses `.empty-state`, `.empty-state-icon`, `.empty-state-title`, `.empty-state-desc` CSS classes.
 *
 * @element specd-empty-state
 *
 * @attr {string} title       - Heading text
 * @attr {string} description - Optional body text
 * @attr {string} icon        - Raw SVG string for the icon
 *
 * @slot default - CTA button or other content
 *
 * @example
 * <specd-empty-state title="No results" description="Adjust your filters."></specd-empty-state>
 */
@customElement('specd-empty-state')
export class SpecdEmptyState extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) title: string = '';
  @property({ type: String }) description?: string;
  @property({ type: String }) icon?: string;

  override render() {
    const iconSvg = this.icon ?? DEFAULT_ICON;
    return html`
      <div class="empty-state">
        <div class="empty-state-icon" .innerHTML=${iconSvg}></div>
        <p class="empty-state-title">${this.title}</p>
        ${this.description ? html`<p class="empty-state-desc">${this.description}</p>` : nothing}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-empty-state': SpecdEmptyState;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/EmptyState --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 6:** Create `src/components/EmptyState/SpecdEmptyState.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdEmptyState';

const meta: Meta = {
  title: 'Layout/EmptyState',
  component: 'specd-empty-state',
  tags: ['autodocs'],
  render: (args) => html`
    <div style="width:360px;border:1px solid #dbeafe;border-radius:14px;overflow:hidden;">
      <specd-empty-state
        title=${args.title ?? 'Nothing here yet'}
        description=${args.description ?? ''}
      ></specd-empty-state>
    </div>
  `,
  argTypes: {
    title:       { control: 'text' },
    description: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = { args: { title: 'No components found', description: 'Run a scan to see your library.' } };
export const NoDesc:  Story = { args: { title: 'No issues' } };
export const WithCta: Story = {
  render: () => html`
    <div style="width:360px;border:1px solid #dbeafe;border-radius:14px;overflow:hidden;">
      <specd-empty-state title="No components found" description="Run a scan to get started.">
        <button style="margin-top:4px;padding:8px 16px;background:#0c1f3f;color:white;border:none;border-radius:8px;cursor:pointer;">Run Scan</button>
      </specd-empty-state>
    </div>
  `,
};
```

- [ ] **Step 7:** Create `src/components/EmptyState/index.ts`

```typescript
export { SpecdEmptyState } from './SpecdEmptyState.js';
export type { EmptyStateProps } from './SpecdEmptyState.types.js';
```

---

### 9.6 — SpecdBreadcrumb

- [ ] **Step 1:** Write failing test at `src/components/Breadcrumb/SpecdBreadcrumb.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdBreadcrumb');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-breadcrumb') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdBreadcrumb', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-breadcrumb')).toBeDefined();
  });

  it('renders a nav with breadcrumb class', async () => {
    const items = JSON.stringify([{ label: 'Home' }]);
    const el = await makeElement({ items });
    expect(el.querySelector('nav.breadcrumb')).not.toBeNull();
  });

  it('renders last item as breadcrumb-current', async () => {
    const items = JSON.stringify([{ label: 'Home', href: '/' }, { label: 'Components' }]);
    const el = await makeElement({ items });
    const current = el.querySelector('.breadcrumb-current');
    expect(current?.textContent?.trim()).toBe('Components');
  });

  it('renders preceding items as breadcrumb-link', async () => {
    const items = JSON.stringify([{ label: 'Home', href: '/' }, { label: 'Settings', href: '/settings' }, { label: 'Tokens' }]);
    const el = await makeElement({ items });
    const links = el.querySelectorAll('.breadcrumb-link');
    expect(links.length).toBe(2);
  });

  it('renders separators between items', async () => {
    const items = JSON.stringify([{ label: 'A' }, { label: 'B' }, { label: 'C' }]);
    const el = await makeElement({ items });
    const seps = el.querySelectorAll('.breadcrumb-sep');
    expect(seps.length).toBe(2);
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/Breadcrumb --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 3:** Create `src/components/Breadcrumb/SpecdBreadcrumb.types.ts`

```typescript
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Props for SpecdBreadcrumb (`<specd-breadcrumb>`).
 *
 * @example
 * <specd-breadcrumb items='[{"label":"Home","href":"/"},{"label":"Components"}]'></specd-breadcrumb>
 */
export interface BreadcrumbProps {
  /** JSON string of BreadcrumbItem[]. Last item is current page. */
  items: string;
}
```

- [ ] **Step 4:** Create `src/components/Breadcrumb/SpecdBreadcrumb.ts`

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { BreadcrumbProps, BreadcrumbItem } from './SpecdBreadcrumb.types.js';

/**
 * Specd DS — Breadcrumb
 *
 * A horizontal breadcrumb trail. Last item is the current page (non-linked).
 * Uses `.breadcrumb`, `.breadcrumb-link`, `.breadcrumb-current`, `.breadcrumb-sep` CSS classes.
 *
 * @element specd-breadcrumb
 *
 * @attr {string} items - JSON string of {label, href?}[]
 *
 * @example
 * <specd-breadcrumb items='[{"label":"Home","href":"/"},{"label":"Tokens"}]'></specd-breadcrumb>
 */
@customElement('specd-breadcrumb')
export class SpecdBreadcrumb extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) items: string = '[]';

  private _parsedItems(): BreadcrumbItem[] {
    try { return JSON.parse(this.items); } catch { return []; }
  }

  override render() {
    const items = this._parsedItems();
    return html`
      <nav class="breadcrumb" aria-label="Breadcrumb">
        ${items.map((item, i) => {
          const isLast = i === items.length - 1;
          return html`
            ${isLast
              ? html`<span class="breadcrumb-current" aria-current="page">${item.label}</span>`
              : html`<a class="breadcrumb-link" href=${item.href ?? '#'}>${item.label}</a>`
            }
            ${!isLast ? html`<span class="breadcrumb-sep" aria-hidden="true">/</span>` : nothing}
          `;
        })}
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-breadcrumb': SpecdBreadcrumb;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/Breadcrumb --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 6:** Create `src/components/Breadcrumb/SpecdBreadcrumb.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdBreadcrumb';

const ITEMS = JSON.stringify([
  { label: 'Design System', href: '/' },
  { label: 'Components', href: '/components' },
  { label: 'Badge' },
]);

const meta: Meta = {
  title: 'Navigation/Breadcrumb',
  component: 'specd-breadcrumb',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-breadcrumb items=${args.items ?? ITEMS}></specd-breadcrumb>
  `,
  argTypes: { items: { control: 'text' } },
};
export default meta;
type Story = StoryObj;

export const ThreeLevels: Story = { args: { items: ITEMS } };
export const TwoLevels:   Story = { args: { items: JSON.stringify([{ label: 'Home', href: '/' }, { label: 'Settings' }]) } };
export const SingleItem:  Story = { args: { items: JSON.stringify([{ label: 'Dashboard' }]) } };
```

- [ ] **Step 7:** Create `src/components/Breadcrumb/index.ts`

```typescript
export { SpecdBreadcrumb } from './SpecdBreadcrumb.js';
export type { BreadcrumbProps, BreadcrumbItem } from './SpecdBreadcrumb.types.js';
```

---

### 9.7 — SpecdPagination

- [ ] **Step 1:** Write failing test at `src/components/Pagination/SpecdPagination.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdPagination');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-pagination') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdPagination', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-pagination')).toBeDefined();
  });

  it('renders a div with pagination class', async () => {
    const el = await makeElement({ page: '1', total: '50', pagesize: '20' });
    expect(el.querySelector('.pagination')).not.toBeNull();
  });

  it('renders prev and next buttons', async () => {
    const el = await makeElement({ page: '2', total: '100', pagesize: '20' });
    const btns = el.querySelectorAll('.page-btn');
    expect(btns.length).toBeGreaterThanOrEqual(2);
  });

  it('disables prev button on first page', async () => {
    const el = await makeElement({ page: '1', total: '100', pagesize: '20' });
    const prev = el.querySelector('[data-prev]') as HTMLButtonElement;
    expect(prev?.disabled).toBe(true);
  });

  it('disables next button on last page', async () => {
    const el = await makeElement({ page: '5', total: '100', pagesize: '20' });
    const next = el.querySelector('[data-next]') as HTMLButtonElement;
    expect(next?.disabled).toBe(true);
  });

  it('marks the current page button as active', async () => {
    const el = await makeElement({ page: '2', total: '60', pagesize: '20' });
    const active = el.querySelector('.page-btn.active');
    expect(active?.textContent?.trim()).toBe('2');
  });

  it('fires specd-page-change with {page} on button click', async () => {
    const el = await makeElement({ page: '1', total: '60', pagesize: '20' });
    let detail: { page: number } | null = null;
    el.addEventListener('specd-page-change', (e) => { detail = (e as CustomEvent).detail; });
    const next = el.querySelector('[data-next]') as HTMLButtonElement;
    next?.click();
    expect(detail?.page).toBe(2);
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/Pagination --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 3:** Create `src/components/Pagination/SpecdPagination.types.ts`

```typescript
/**
 * Props for SpecdPagination (`<specd-pagination>`).
 *
 * @example
 * <specd-pagination page="1" total="120" pagesize="20"></specd-pagination>
 */
export interface PaginationProps {
  /** Current 1-based page number. */
  page: number;
  /** Total number of items. */
  total: number;
  /** Items per page. @default 20 */
  pageSize?: number;
}
```

- [ ] **Step 4:** Create `src/components/Pagination/SpecdPagination.ts`

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PaginationProps } from './SpecdPagination.types.js';

/**
 * Specd DS — Pagination
 *
 * Previous/next buttons with numbered page buttons. Shows up to 5 pages with ellipsis.
 * Uses `.pagination`, `.page-btn` CSS classes.
 *
 * @element specd-pagination
 *
 * @attr {number} page     - Current 1-based page
 * @attr {number} total    - Total item count
 * @attr {number} pagesize - Items per page (default 20)
 *
 * @fires specd-page-change - CustomEvent<{page: number}> on page navigation
 *
 * @example
 * <specd-pagination page="1" total="120" pagesize="20"></specd-pagination>
 */
@customElement('specd-pagination')
export class SpecdPagination extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: Number }) page: number = 1;
  @property({ type: Number }) total: number = 0;
  @property({ type: Number, attribute: 'pagesize' }) pageSize: number = 20;

  private _totalPages(): number {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  private _goTo(p: number) {
    const clamped = Math.max(1, Math.min(p, this._totalPages()));
    this.page = clamped;
    this.dispatchEvent(new CustomEvent('specd-page-change', { detail: { page: clamped }, bubbles: true, composed: true }));
  }

  private _visiblePages(): (number | '…')[] {
    const total = this._totalPages();
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    const cur = this.page;
    if (cur <= 3) return [1, 2, 3, 4, '…', total];
    if (cur >= total - 2) return [1, '…', total - 3, total - 2, total - 1, total];
    return [1, '…', cur - 1, cur, cur + 1, '…', total];
  }

  override render() {
    const totalPages = this._totalPages();
    const pages = this._visiblePages();
    return html`
      <div class="pagination">
        <button class="page-btn" data-prev ?disabled=${this.page <= 1} @click=${() => this._goTo(this.page - 1)} aria-label="Previous">←</button>
        ${pages.map(p => p === '…'
          ? html`<span class="page-btn" style="cursor:default;opacity:0.5">…</span>`
          : html`<button class="page-btn${p === this.page ? ' active' : ''}" @click=${() => this._goTo(p as number)}>${p}</button>`
        )}
        <button class="page-btn" data-next ?disabled=${this.page >= totalPages} @click=${() => this._goTo(this.page + 1)} aria-label="Next">→</button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-pagination': SpecdPagination;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/Pagination --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 6:** Create `src/components/Pagination/SpecdPagination.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdPagination';

const meta: Meta = {
  title: 'Navigation/Pagination',
  component: 'specd-pagination',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-pagination
      page=${args.page ?? 1}
      total=${args.total ?? 100}
      pagesize=${args.pageSize ?? 20}
    ></specd-pagination>
  `,
  argTypes: {
    page:     { control: 'number' },
    total:    { control: 'number' },
    pageSize: { control: 'number' },
  },
};
export default meta;
type Story = StoryObj;

export const FirstPage:  Story = { args: { page: 1,  total: 100, pageSize: 20 } };
export const MiddlePage: Story = { args: { page: 3,  total: 100, pageSize: 20 } };
export const LastPage:   Story = { args: { page: 5,  total: 100, pageSize: 20 } };
export const FewPages:   Story = { args: { page: 2,  total: 60,  pageSize: 20 } };
export const ManyPages:  Story = { args: { page: 10, total: 500, pageSize: 20 } };
```

- [ ] **Step 7:** Create `src/components/Pagination/index.ts`

```typescript
export { SpecdPagination } from './SpecdPagination.js';
export type { PaginationProps } from './SpecdPagination.types.js';
```

---

### 9.8 — SpecdStepper

- [ ] **Step 1:** Write failing test at `src/components/Stepper/SpecdStepper.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdStepper');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-stepper') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdStepper', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-stepper')).toBeDefined();
  });

  it('renders a div with stepper class', async () => {
    const steps = JSON.stringify([{ label: 'Step 1' }, { label: 'Step 2' }]);
    const el = await makeElement({ steps, current: '0' });
    expect(el.querySelector('.stepper')).not.toBeNull();
  });

  it('renders one step div per step', async () => {
    const steps = JSON.stringify([{ label: 'A' }, { label: 'B' }, { label: 'C' }]);
    const el = await makeElement({ steps, current: '1' });
    const stepEls = el.querySelectorAll('.step');
    expect(stepEls.length).toBe(3);
  });

  it('marks current step with active class', async () => {
    const steps = JSON.stringify([{ label: 'First' }, { label: 'Second' }, { label: 'Third' }]);
    const el = await makeElement({ steps, current: '1' });
    const stepEls = Array.from(el.querySelectorAll('.step'));
    expect(stepEls[1].classList.contains('active')).toBe(true);
  });

  it('marks steps before current with done class', async () => {
    const steps = JSON.stringify([{ label: 'A' }, { label: 'B' }, { label: 'C' }]);
    const el = await makeElement({ steps, current: '2' });
    const stepEls = Array.from(el.querySelectorAll('.step'));
    expect(stepEls[0].classList.contains('done')).toBe(true);
    expect(stepEls[1].classList.contains('done')).toBe(true);
    expect(stepEls[2].classList.contains('active')).toBe(true);
  });

  it('renders step labels', async () => {
    const steps = JSON.stringify([{ label: 'Scan' }, { label: 'Review' }, { label: 'Publish' }]);
    const el = await makeElement({ steps, current: '0' });
    const labels = Array.from(el.querySelectorAll('.step-label')).map(l => l.textContent?.trim());
    expect(labels).toEqual(['Scan', 'Review', 'Publish']);
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/Stepper --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 3:** Create `src/components/Stepper/SpecdStepper.types.ts`

```typescript
export interface StepperStep {
  label: string;
}

/**
 * Props for SpecdStepper (`<specd-stepper>`).
 *
 * @example
 * <specd-stepper steps='[{"label":"Connect"},{"label":"Scan"},{"label":"Review"}]' current="1"></specd-stepper>
 */
export interface StepperProps {
  /** JSON string of {label}[]. */
  steps: string;
  /** 0-based index of the active step. */
  current: number;
}
```

- [ ] **Step 4:** Create `src/components/Stepper/SpecdStepper.ts`

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { StepperProps, StepperStep } from './SpecdStepper.types.js';

/**
 * Specd DS — Stepper
 *
 * A horizontal step indicator showing progress through a multi-step flow.
 * Uses `.stepper`, `.step`, `.step.done`, `.step.active`, `.step-dot`, `.step-label` CSS classes.
 *
 * @element specd-stepper
 *
 * @attr {string} steps   - JSON string of {label}[]
 * @attr {number} current - 0-based active step index
 *
 * @example
 * <specd-stepper steps='[{"label":"Connect"},{"label":"Scan"}]' current="0"></specd-stepper>
 */
@customElement('specd-stepper')
export class SpecdStepper extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) steps: string = '[]';
  @property({ type: Number }) current: number = 0;

  private _parsedSteps(): StepperStep[] {
    try { return JSON.parse(this.steps); } catch { return []; }
  }

  private _checkIcon() {
    return html`<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;
  }

  override render() {
    const steps = this._parsedSteps();
    return html`
      <div class="stepper">
        ${steps.map((step, i) => {
          const isDone   = i < this.current;
          const isActive = i === this.current;
          const cls = `step${isDone ? ' done' : ''}${isActive ? ' active' : ''}`;
          return html`
            <div class=${cls}>
              <div class="step-dot">
                ${isDone ? this._checkIcon() : i + 1}
              </div>
              <div class="step-label">${step.label}</div>
            </div>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-stepper': SpecdStepper;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/Stepper --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 6:** Create `src/components/Stepper/SpecdStepper.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdStepper';

const STEPS = JSON.stringify([
  { label: 'Connect Library' },
  { label: 'Run Scan' },
  { label: 'Review Issues' },
  { label: 'Publish' },
]);

const meta: Meta = {
  title: 'Navigation/Stepper',
  component: 'specd-stepper',
  tags: ['autodocs'],
  render: (args) => html`
    <div style="width:420px;padding:24px;">
      <specd-stepper steps=${args.steps ?? STEPS} current=${args.current ?? 0}></specd-stepper>
    </div>
  `,
  argTypes: {
    steps:   { control: 'text' },
    current: { control: 'number' },
  },
};
export default meta;
type Story = StoryObj;

export const Step1: Story = { args: { steps: STEPS, current: 0 } };
export const Step2: Story = { args: { steps: STEPS, current: 1 } };
export const Step3: Story = { args: { steps: STEPS, current: 2 } };
export const Step4: Story = { args: { steps: STEPS, current: 3 } };
```

- [ ] **Step 7:** Create `src/components/Stepper/index.ts`

```typescript
export { SpecdStepper } from './SpecdStepper.js';
export type { StepperProps, StepperStep } from './SpecdStepper.types.js';
```

### 9.9 — Wire Task 9 into src/index.ts and src/react.ts

- [ ] **Step 1:** Add exports to `src/index.ts`:

```typescript
export * from './components/Divider/index.js';
export * from './components/KvRow/index.js';
export * from './components/CodeBlock/index.js';
export * from './components/Skeleton/index.js';
export * from './components/EmptyState/index.js';
export * from './components/Breadcrumb/index.js';
export * from './components/Pagination/index.js';
export * from './components/Stepper/index.js';
```

- [ ] **Step 2:** Add to `src/react.ts` imports:

```typescript
import { SpecdDivider }    from './components/Divider/SpecdDivider.js';
import { SpecdKvRow }      from './components/KvRow/SpecdKvRow.js';
import { SpecdCodeBlock }  from './components/CodeBlock/SpecdCodeBlock.js';
import { SpecdSkeleton }   from './components/Skeleton/SpecdSkeleton.js';
import { SpecdEmptyState } from './components/EmptyState/SpecdEmptyState.js';
import { SpecdBreadcrumb } from './components/Breadcrumb/SpecdBreadcrumb.js';
import { SpecdPagination } from './components/Pagination/SpecdPagination.js';
import { SpecdStepper }    from './components/Stepper/SpecdStepper.js';
```

Then add wrapper exports:

```typescript
/** Auto-generated React wrapper for <specd-divider>. Do not hand-edit. */
export const Divider = createComponent({
  react: React,
  tagName: 'specd-divider',
  elementClass: SpecdDivider,
  events: {},
});

/** Auto-generated React wrapper for <specd-kv-row>. Do not hand-edit. */
export const KvRow = createComponent({
  react: React,
  tagName: 'specd-kv-row',
  elementClass: SpecdKvRow,
  events: {},
});

/** Auto-generated React wrapper for <specd-code-block>. Do not hand-edit. */
export const CodeBlock = createComponent({
  react: React,
  tagName: 'specd-code-block',
  elementClass: SpecdCodeBlock,
  events: {},
});

/** Auto-generated React wrapper for <specd-skeleton>. Do not hand-edit. */
export const Skeleton = createComponent({
  react: React,
  tagName: 'specd-skeleton',
  elementClass: SpecdSkeleton,
  events: {},
});

/** Auto-generated React wrapper for <specd-empty-state>. Do not hand-edit. */
export const EmptyState = createComponent({
  react: React,
  tagName: 'specd-empty-state',
  elementClass: SpecdEmptyState,
  events: {},
});

/** Auto-generated React wrapper for <specd-breadcrumb>. Do not hand-edit. */
export const Breadcrumb = createComponent({
  react: React,
  tagName: 'specd-breadcrumb',
  elementClass: SpecdBreadcrumb,
  events: {},
});

/** Auto-generated React wrapper for <specd-pagination>. Do not hand-edit. */
export const Pagination = createComponent({
  react: React,
  tagName: 'specd-pagination',
  elementClass: SpecdPagination,
  events: { onSpecdPageChange: 'specd-page-change' },
});

/** Auto-generated React wrapper for <specd-stepper>. Do not hand-edit. */
export const Stepper = createComponent({
  react: React,
  tagName: 'specd-stepper',
  elementClass: SpecdStepper,
  events: {},
});
```

- [ ] **Step 3:** Run all unit tests — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 4:** Commit
```bash
cd /Users/home/Desktop/code/admiral-ds
git add src/components/Divider src/components/KvRow src/components/CodeBlock src/components/Skeleton src/components/EmptyState src/components/Breadcrumb src/components/Pagination src/components/Stepper src/index.ts src/react.ts
git commit -m "feat(ds): add SpecdDivider, SpecdKvRow, SpecdCodeBlock, SpecdSkeleton, SpecdEmptyState, SpecdBreadcrumb, SpecdPagination, SpecdStepper layout primitives"
```

---

## Task 10 — Compound & Data Viz

**Components:** `SpecdIssueCard`, `SpecdChoiceCard`, `SpecdSparkline`

---

### 10.1 — SpecdIssueCard

- [ ] **Step 1:** Write failing test at `src/components/IssueCard/SpecdIssueCard.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdIssueCard');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-issue-card') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdIssueCard', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-issue-card')).toBeDefined();
  });

  it('renders a div with issue-card class', async () => {
    const el = await makeElement({ name: 'Button', count: '3', severity: 'warn', tags: '[]' });
    expect(el.querySelector('.issue-card')).not.toBeNull();
  });

  it('renders component name', async () => {
    const el = await makeElement({ name: 'Badge / Primary', count: '2', severity: 'crit', tags: '[]' });
    expect(el.querySelector('.issue-comp-tag')?.textContent?.trim()).toBe('Badge / Primary');
  });

  it('renders count badge with correct severity class', async () => {
    const el = await makeElement({ name: 'Button', count: '5', severity: 'crit', tags: '[]' });
    const countEl = el.querySelector('.issue-card-count');
    expect(countEl?.textContent?.trim()).toBe('5');
    expect(countEl?.classList.contains('crit')).toBe(true);
  });

  it('renders warn severity class on count badge', async () => {
    const el = await makeElement({ name: 'Button', count: '2', severity: 'warn', tags: '[]' });
    expect(el.querySelector('.issue-card-count')?.classList.contains('warn')).toBe(true);
  });

  it('renders info severity class on count badge', async () => {
    const el = await makeElement({ name: 'Button', count: '1', severity: 'info', tags: '[]' });
    expect(el.querySelector('.issue-card-count')?.classList.contains('info')).toBe(true);
  });

  it('renders issue tags', async () => {
    const tags = JSON.stringify([{ label: 'Missing description', severity: 'crit' }]);
    const el = await makeElement({ name: 'Card', count: '1', severity: 'crit', tags });
    const tagEls = el.querySelectorAll('.issue-tag');
    expect(tagEls.length).toBe(1);
    expect(tagEls[0].textContent?.trim()).toBe('Missing description');
  });

  it('renders a footer slot', async () => {
    const el = await makeElement({ name: 'Icon', count: '1', severity: 'info', tags: '[]' });
    expect(el.querySelector('slot[name="footer"]')).not.toBeNull();
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/IssueCard --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 3:** Create `src/components/IssueCard/SpecdIssueCard.types.ts`

```typescript
export type IssueSeverity = 'crit' | 'warn' | 'info';

export interface IssueTag {
  label: string;
  sub?: string;
  severity: IssueSeverity;
}

/**
 * Props for SpecdIssueCard (`<specd-issue-card>`).
 *
 * @example
 * <specd-issue-card name="Button" count="3" severity="warn" tags='[{"label":"Hard-coded colour","severity":"warn"}]'></specd-issue-card>
 */
export interface IssueCardProps {
  /** Component name. */
  name: string;
  /** Total issue count. */
  count: number;
  /** Highest severity level. */
  severity: IssueSeverity;
  /** JSON string of IssueTag[]. */
  tags: string;
  /** Raw SVG icon string. */
  icon?: string;
}
```

- [ ] **Step 4:** Create `src/components/IssueCard/SpecdIssueCard.ts`

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { IssueCardProps, IssueSeverity, IssueTag } from './SpecdIssueCard.types.js';

const DEFAULT_COMP_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="9" height="9" rx="1"/><rect x="13" y="2" width="9" height="9" rx="1"/><rect x="2" y="13" width="9" height="9" rx="1"/><rect x="13" y="13" width="9" height="9" rx="1"/></svg>`;

/**
 * Specd DS — Issue Card
 *
 * A summary card for a component's audit issues, showing severity count and issue type tags.
 * Uses `.issue-card`, `.issue-card-top`, `.issue-comp-tag`, `.issue-card-count`, `.issue-tag-row`, `.issue-tag`, `.issue-card-footer` CSS classes.
 *
 * @element specd-issue-card
 *
 * @attr {string} name     - Component name
 * @attr {number} count    - Total issue count
 * @attr {string} severity - Highest severity: 'crit' | 'warn' | 'info'
 * @attr {string} tags     - JSON string of {label, sub?, severity}[]
 * @attr {string} icon     - Raw SVG string for the component icon
 *
 * @slot footer - Jump/Fix action buttons
 *
 * @example
 * <specd-issue-card name="Button" count="2" severity="warn" tags='[]'></specd-issue-card>
 */
@customElement('specd-issue-card')
export class SpecdIssueCard extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) name: string = '';
  @property({ type: Number }) count: number = 0;
  @property({ type: String }) severity: IssueSeverity = 'info';
  @property({ type: String }) tags: string = '[]';
  @property({ type: String }) icon?: string;

  private _parsedTags(): IssueTag[] {
    try { return JSON.parse(this.tags); } catch { return []; }
  }

  override render() {
    const tags = this._parsedTags();
    const iconSvg = this.icon ?? DEFAULT_COMP_ICON;
    return html`
      <div class="issue-card">
        <div class="issue-content">
          <div class="issue-card-top">
            <div class="issue-comp-tag">
              <span .innerHTML=${iconSvg}></span>
              ${this.name}
            </div>
            <span class="issue-card-count ${this.severity}">${this.count}</span>
          </div>
          ${tags.length > 0 ? html`
            <div class="issue-tag-row">
              ${tags.map(tag => html`
                <div class="issue-tag ${tag.severity}">
                  <span>${tag.label}</span>
                  ${tag.sub ? html`<span style="font-weight:400;opacity:0.7;font-size:10px;">${tag.sub}</span>` : nothing}
                </div>
              `)}
            </div>
          ` : nothing}
        </div>
        <div class="issue-card-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-issue-card': SpecdIssueCard;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/IssueCard --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 6:** Create `src/components/IssueCard/SpecdIssueCard.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdIssueCard';

const CRIT_TAGS = JSON.stringify([
  { label: 'Missing description', severity: 'crit' },
  { label: 'Hard-coded colour',   severity: 'warn', sub: '3 layers' },
]);

const meta: Meta = {
  title: 'Compound/IssueCard',
  component: 'specd-issue-card',
  tags: ['autodocs'],
  render: (args) => html`
    <div style="width:340px;">
      <specd-issue-card
        name=${args.name ?? 'Button / Primary'}
        count=${args.count ?? 2}
        severity=${args.severity ?? 'warn'}
        tags=${args.tags ?? CRIT_TAGS}
      ></specd-issue-card>
    </div>
  `,
  argTypes: {
    name:     { control: 'text' },
    count:    { control: 'number' },
    severity: { control: 'select', options: ['crit', 'warn', 'info'] },
    tags:     { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Critical: Story = {
  args: {
    name: 'Button / Primary',
    count: 3,
    severity: 'crit',
    tags: JSON.stringify([
      { label: 'Missing description', severity: 'crit' },
      { label: 'Hard-coded colour', severity: 'warn' },
    ]),
  },
};
export const Warning: Story = {
  args: {
    name: 'Icon / Arrow Right',
    count: 1,
    severity: 'warn',
    tags: JSON.stringify([{ label: 'Hard-coded spacing', severity: 'warn', sub: '2 frames' }]),
  },
};
export const Info: Story = {
  args: {
    name: 'Card / Default',
    count: 1,
    severity: 'info',
    tags: JSON.stringify([{ label: 'Missing doc link', severity: 'info' }]),
  },
};
export const WithActions: Story = {
  render: () => html`
    <div style="width:340px;">
      <specd-issue-card
        name="Badge / Status"
        count="2"
        severity="warn"
        tags=${JSON.stringify([{ label: 'Hard-coded colour', severity: 'warn' }])}
      >
        <div slot="footer">
          <button style="padding:5px 12px;background:#0c1f3f;color:white;border:none;border-radius:6px;font-size:11px;cursor:pointer;">Jump →</button>
        </div>
      </specd-issue-card>
    </div>
  `,
};
```

- [ ] **Step 7:** Create `src/components/IssueCard/index.ts`

```typescript
export { SpecdIssueCard } from './SpecdIssueCard.js';
export type { IssueCardProps, IssueTag, IssueSeverity } from './SpecdIssueCard.types.js';
```

---

### 10.2 — SpecdChoiceCard

- [ ] **Step 1:** Write failing test at `src/components/ChoiceCard/SpecdChoiceCard.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdChoiceCard');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-choice-card') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdChoiceCard', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-choice-card')).toBeDefined();
  });

  it('renders a div with choice-card class', async () => {
    const el = await makeElement({ title: 'Option A', description: 'Do this' });
    expect(el.querySelector('.choice-card')).not.toBeNull();
  });

  it('renders title and description', async () => {
    const el = await makeElement({ title: 'Scan Now', description: 'Run a full scan' });
    expect(el.querySelector('.choice-card-title')?.textContent?.trim()).toBe('Scan Now');
    expect(el.querySelector('.choice-card-desc')?.textContent?.trim()).toBe('Run a full scan');
  });

  it('applies gradient class when variant=gradient', async () => {
    const el = await makeElement({ title: 'Premium', description: 'Upgrade', variant: 'gradient' });
    expect(el.querySelector('.choice-card')?.classList.contains('gradient')).toBe(true);
  });

  it('does not apply gradient class for default variant', async () => {
    const el = await makeElement({ title: 'Standard', description: 'Basic', variant: 'default' });
    expect(el.querySelector('.choice-card')?.classList.contains('gradient')).toBe(false);
  });

  it('renders a slot', async () => {
    const el = await makeElement({ title: 'A', description: 'B' });
    expect(el.querySelector('slot')).not.toBeNull();
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/ChoiceCard --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 3:** Create `src/components/ChoiceCard/SpecdChoiceCard.types.ts`

```typescript
export type ChoiceCardVariant = 'default' | 'gradient';

/**
 * Props for SpecdChoiceCard (`<specd-choice-card>`).
 *
 * @example
 * <specd-choice-card title="Quick Scan" description="Scan the current page only" variant="default"></specd-choice-card>
 */
export interface ChoiceCardProps {
  /** Card heading text. */
  title: string;
  /** Card body text. */
  description: string;
  /** Visual variant. @default 'default' */
  variant?: ChoiceCardVariant;
  /** Optional pill label. */
  pill?: string;
}
```

- [ ] **Step 4:** Create `src/components/ChoiceCard/SpecdChoiceCard.ts`

```typescript
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ChoiceCardProps, ChoiceCardVariant } from './SpecdChoiceCard.types.js';

/**
 * Specd DS — Choice Card
 *
 * A clickable card used to present mutually exclusive or prominent options.
 * Uses `.choice-card`, `.choice-card-title`, `.choice-card-desc`, `.choice-card-pill` CSS classes.
 *
 * @element specd-choice-card
 *
 * @attr {string} title       - Card heading
 * @attr {string} description - Card body text
 * @attr {string} variant     - 'default' | 'gradient'
 * @attr {string} pill        - Optional pill label
 *
 * @slot default - Replaces the pill area if you need custom content
 *
 * @example
 * <specd-choice-card title="Full Scan" description="All pages and components" variant="gradient"></specd-choice-card>
 */
@customElement('specd-choice-card')
export class SpecdChoiceCard extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) title: string = '';
  @property({ type: String }) description: string = '';
  @property({ type: String }) variant: ChoiceCardVariant = 'default';
  @property({ type: String }) pill?: string;

  override render() {
    const isGradient = this.variant === 'gradient';
    return html`
      <div class="choice-card${isGradient ? ' gradient' : ''}">
        <div class="choice-card-title">${this.title}</div>
        <div class="choice-card-desc">${this.description}</div>
        ${this.pill ? html`<div class="choice-card-pill"><slot>${this.pill}</slot></div>` : html`<slot></slot>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-choice-card': SpecdChoiceCard;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/ChoiceCard --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 6:** Create `src/components/ChoiceCard/SpecdChoiceCard.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdChoiceCard';

const meta: Meta = {
  title: 'Compound/ChoiceCard',
  component: 'specd-choice-card',
  tags: ['autodocs'],
  render: (args) => html`
    <div style="width:220px;">
      <specd-choice-card
        title=${args.title ?? 'Option'}
        description=${args.description ?? 'Description'}
        variant=${args.variant ?? 'default'}
        pill=${args.pill ?? ''}
      ></specd-choice-card>
    </div>
  `,
  argTypes: {
    title:       { control: 'text' },
    description: { control: 'text' },
    variant:     { control: 'select', options: ['default', 'gradient'] },
    pill:        { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Default:  Story = { args: { title: 'Quick Scan', description: 'Current page only', pill: 'Fast' } };
export const Gradient: Story = { args: { title: 'Full Scan', description: 'All pages and libraries', variant: 'gradient', pill: 'Recommended' } };
export const Side:     Story = {
  render: () => html`
    <div style="display:flex;gap:12px;">
      <div style="width:200px;"><specd-choice-card title="Quick Scan" description="Current page only"></specd-choice-card></div>
      <div style="width:200px;"><specd-choice-card title="Full Scan" description="All pages" variant="gradient"></specd-choice-card></div>
    </div>
  `,
};
```

- [ ] **Step 7:** Create `src/components/ChoiceCard/index.ts`

```typescript
export { SpecdChoiceCard } from './SpecdChoiceCard.js';
export type { ChoiceCardProps, ChoiceCardVariant } from './SpecdChoiceCard.types.js';
```

---

### 10.3 — SpecdSparkline

- [ ] **Step 1:** Write failing test at `src/components/Sparkline/SpecdSparkline.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdSparkline');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-sparkline') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdSparkline', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-sparkline')).toBeDefined();
  });

  it('renders an SVG element', async () => {
    const el = await makeElement({ values: '[10,20,15,30,25]' });
    expect(el.querySelector('svg')).not.toBeNull();
  });

  it('renders a sparkline path', async () => {
    const el = await makeElement({ values: '[10,20,15,30,25]' });
    expect(el.querySelector('.sparkline-path')).not.toBeNull();
  });

  it('renders an area path', async () => {
    const el = await makeElement({ values: '[10,20,15,30,25]' });
    expect(el.querySelector('.sparkline-area')).not.toBeNull();
  });

  it('applies positive class for positive intent', async () => {
    const el = await makeElement({ values: '[1,2,3]', intent: 'positive' });
    expect(el.querySelector('.sparkline-path')?.classList.contains('positive')).toBe(true);
  });

  it('applies negative class for negative intent', async () => {
    const el = await makeElement({ values: '[3,2,1]', intent: 'negative' });
    expect(el.querySelector('.sparkline-path')?.classList.contains('negative')).toBe(true);
  });

  it('uses provided width and height as SVG dimensions', async () => {
    const el = await makeElement({ values: '[1,2,3]', width: '100', height: '40' });
    const svg = el.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('100');
    expect(svg?.getAttribute('height')).toBe('40');
  });

  it('handles a single value without error', async () => {
    const el = await makeElement({ values: '[42]' });
    expect(el.querySelector('svg')).not.toBeNull();
  });

  it('handles all-equal values without error', async () => {
    const el = await makeElement({ values: '[5,5,5,5]' });
    expect(el.querySelector('svg')).not.toBeNull();
  });
});
```

- [ ] **Step 2:** Run failing test
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/Sparkline --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 3:** Create `src/components/Sparkline/SpecdSparkline.types.ts`

```typescript
export type SparklineIntent = 'default' | 'positive' | 'negative';

/**
 * Props for SpecdSparkline (`<specd-sparkline>`).
 *
 * @example
 * <specd-sparkline values="[10,25,18,40,35]" intent="positive" width="80" height="28"></specd-sparkline>
 */
export interface SparklineProps {
  /** JSON number[] of data points. */
  values: string;
  /** SVG width in pixels. @default 80 */
  width?: number;
  /** SVG height in pixels. @default 28 */
  height?: number;
  /** Colour intent. @default 'default' */
  intent?: SparklineIntent;
}
```

- [ ] **Step 4:** Create `src/components/Sparkline/SpecdSparkline.ts`

```typescript
import { LitElement, html, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SparklineProps, SparklineIntent } from './SpecdSparkline.types.js';

/**
 * Specd DS — Sparkline
 *
 * An inline mini line chart rendered as SVG. Normalises values to fit the SVG viewBox.
 * Uses `.sparkline`, `.sparkline-path`, `.sparkline-area` CSS classes.
 *
 * @element specd-sparkline
 *
 * @attr {string} values - JSON number[]
 * @attr {number} width  - SVG width (default 80)
 * @attr {number} height - SVG height (default 28)
 * @attr {string} intent - 'default' | 'positive' | 'negative'
 *
 * @example
 * <specd-sparkline values="[10,25,18,40,35]" intent="positive"></specd-sparkline>
 */
@customElement('specd-sparkline')
export class SpecdSparkline extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) values: string = '[]';
  @property({ type: Number }) width: number = 80;
  @property({ type: Number }) height: number = 28;
  @property({ type: String }) intent: SparklineIntent = 'default';

  private _parsedValues(): number[] {
    try {
      const v = JSON.parse(this.values);
      return Array.isArray(v) ? v.map(Number).filter(n => !isNaN(n)) : [];
    } catch { return []; }
  }

  private _buildPaths(vals: number[], w: number, h: number): { line: string; area: string } {
    if (vals.length === 0) return { line: '', area: '' };

    const pad = 2;
    const innerW = w - pad * 2;
    const innerH = h - pad * 2;

    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const range = max - min || 1;

    const points = vals.map((v, i) => {
      const x = pad + (vals.length === 1 ? innerW / 2 : (i / (vals.length - 1)) * innerW);
      const y = pad + innerH - ((v - min) / range) * innerH;
      return { x, y };
    });

    const lineParts = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`);
    const line = lineParts.join(' ');

    const firstX = points[0].x.toFixed(2);
    const lastX  = points[points.length - 1].x.toFixed(2);
    const bottom = (pad + innerH).toFixed(2);
    const area   = `${line} L${lastX},${bottom} L${firstX},${bottom} Z`;

    return { line, area };
  }

  override render() {
    const vals = this._parsedValues();
    const w = this.width;
    const h = this.height;
    const intentCls = this.intent !== 'default' ? ` ${this.intent}` : '';
    const { line, area } = this._buildPaths(vals, w, h);

    return html`
      <span class="sparkline">
        <svg width=${w} height=${h} viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
          ${area ? svg`<path class="sparkline-area${intentCls}" d=${area}></path>` : ''}
          ${line ? svg`<path class="sparkline-path${intentCls}" d=${line}></path>` : ''}
        </svg>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-sparkline': SpecdSparkline;
  }
}
```

- [ ] **Step 5:** Run test again — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run src/components/Sparkline --reporter=verbose 2>&1 | tail -20
```

- [ ] **Step 6:** Create `src/components/Sparkline/SpecdSparkline.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdSparkline';

const RISING  = '[10,15,12,22,20,30,28,40]';
const FALLING = '[40,35,30,22,20,15,12,10]';
const FLAT    = '[20,20,20,20,20,20]';

const meta: Meta = {
  title: 'DataViz/Sparkline',
  component: 'specd-sparkline',
  tags: ['autodocs'],
  render: (args) => html`
    <div style="padding:16px;background:#f5f8ff;display:inline-flex;align-items:center;gap:12px;">
      <specd-sparkline
        values=${args.values ?? RISING}
        width=${args.width ?? 80}
        height=${args.height ?? 28}
        intent=${args.intent ?? 'default'}
      ></specd-sparkline>
    </div>
  `,
  argTypes: {
    values: { control: 'text' },
    width:  { control: 'number' },
    height: { control: 'number' },
    intent: { control: 'select', options: ['default', 'positive', 'negative'] },
  },
};
export default meta;
type Story = StoryObj;

export const Default:  Story = { args: { values: RISING,  intent: 'default' } };
export const Positive: Story = { args: { values: RISING,  intent: 'positive' } };
export const Negative: Story = { args: { values: FALLING, intent: 'negative' } };
export const Flat:     Story = { args: { values: FLAT,    intent: 'default' } };
export const Wide:     Story = { args: { values: RISING,  width: 120, height: 36, intent: 'positive' } };
export const InlineUsage: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:8px;padding:16px;width:300px;">
      <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px;">
        <span>Health Score</span>
        <specd-sparkline values=${RISING}  intent="positive" width="80" height="24"></specd-sparkline>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px;">
        <span>Issues</span>
        <specd-sparkline values=${FALLING} intent="negative" width="80" height="24"></specd-sparkline>
      </div>
    </div>
  `,
};
```

- [ ] **Step 7:** Create `src/components/Sparkline/index.ts`

```typescript
export { SpecdSparkline } from './SpecdSparkline.js';
export type { SparklineProps, SparklineIntent } from './SpecdSparkline.types.js';
```

### 10.4 — Wire Task 10 into src/index.ts and src/react.ts

- [ ] **Step 1:** Add exports to `src/index.ts`:

```typescript
export * from './components/IssueCard/index.js';
export * from './components/ChoiceCard/index.js';
export * from './components/Sparkline/index.js';
```

- [ ] **Step 2:** Add to `src/react.ts` imports:

```typescript
import { SpecdIssueCard }  from './components/IssueCard/SpecdIssueCard.js';
import { SpecdChoiceCard } from './components/ChoiceCard/SpecdChoiceCard.js';
import { SpecdSparkline }  from './components/Sparkline/SpecdSparkline.js';
```

Then add wrapper exports:

```typescript
/** Auto-generated React wrapper for <specd-issue-card>. Do not hand-edit. */
export const IssueCard = createComponent({
  react: React,
  tagName: 'specd-issue-card',
  elementClass: SpecdIssueCard,
  events: {},
});

/** Auto-generated React wrapper for <specd-choice-card>. Do not hand-edit. */
export const ChoiceCard = createComponent({
  react: React,
  tagName: 'specd-choice-card',
  elementClass: SpecdChoiceCard,
  events: {},
});

/** Auto-generated React wrapper for <specd-sparkline>. Do not hand-edit. */
export const Sparkline = createComponent({
  react: React,
  tagName: 'specd-sparkline',
  elementClass: SpecdSparkline,
  events: {},
});
```

- [ ] **Step 3:** Run all unit tests — must pass
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | grep -E "PASS|FAIL|Tests"
```

- [ ] **Step 4:** Commit
```bash
cd /Users/home/Desktop/code/admiral-ds
git add src/components/IssueCard src/components/ChoiceCard src/components/Sparkline src/index.ts src/react.ts
git commit -m "feat(ds): add SpecdIssueCard, SpecdChoiceCard, SpecdSparkline compound and data-viz components"
```

---

## Task 11 — Barrel Updates & Final Verification

**Goal:** Update `src/index.ts` and `src/react.ts` to include all components from Tasks 1–10, run the full build and test suite, then commit everything.

> **Note:** Tasks 1–10 each update the barrel files incrementally. Task 11 is a reconciliation step that ensures the final state of both barrel files is complete, runs a clean build, and makes the final commit.

---

### 11.1 — Verify and complete src/index.ts

- [ ] **Step 1:** Ensure `src/index.ts` contains all of the following exports (add any that are missing):

```typescript
/**
 * Specd DS — Web Components entry point
 *
 * Import this file to register all <specd-*> custom elements.
 * Works in any environment with a DOM: Figma plugins, browsers, any framework.
 *
 * @example
 * // Figma plugin or vanilla web
 * import '@specd/specd-ds';
 *
 * // Then in HTML:
 * // <specd-button variant="primary">Scan now</specd-button>
 */

// ── Foundation components (Tasks 1–5 from original barrel) ──────────────────
export * from './components/Button/index.js';
export * from './components/Chip/index.js';
export * from './components/Badge/index.js';
export * from './components/Input/index.js';
export * from './components/Toggle/index.js';
export * from './components/Card/index.js';
export * from './components/ProgressBar/index.js';
export * from './components/Avatar/index.js';

// ── Task 1: Status Pills & Badges ───────────────────────────────────────────
export * from './components/HealthBadge/index.js';
export * from './components/NavScore/index.js';
export * from './components/AiPill/index.js';
export * from './components/JumpBtn/index.js';
export * from './components/SbPill/index.js';

// ── Task 2: Severity Header & Score Trend ───────────────────────────────────
export * from './components/SeverityHeader/index.js';
export * from './components/ScoreTrend/index.js';

// ── Task 3: Score Ring ───────────────────────────────────────────────────────
export * from './components/ScoreRing/index.js';

// ── Task 4: Coverage Row ─────────────────────────────────────────────────────
export * from './components/CovRow/index.js';

// ── Task 5: Stat Tiles ───────────────────────────────────────────────────────
export * from './components/StatTileSm/index.js';
export * from './components/StatTileLg/index.js';

// ── Task 6: Navigation & Shell ───────────────────────────────────────────────
export * from './components/TabBar/index.js';
export * from './components/AppHeader/index.js';
export * from './components/Segmented/index.js';

// ── Task 7: Form Primitives ──────────────────────────────────────────────────
export * from './components/SectionLabel/index.js';
export * from './components/FormRow/index.js';
export * from './components/ToggleRow/index.js';
export * from './components/RadioGroup/index.js';
export * from './components/CheckboxGroup/index.js';

// ── Task 8: Overlays & Notifications ─────────────────────────────────────────
export * from './components/Modal/index.js';
export * from './components/Drawer/index.js';
export * from './components/Toast/index.js';
export * from './components/Alert/index.js';

// ── Task 9: Layout & Navigation Primitives ───────────────────────────────────
export * from './components/Divider/index.js';
export * from './components/KvRow/index.js';
export * from './components/CodeBlock/index.js';
export * from './components/Skeleton/index.js';
export * from './components/EmptyState/index.js';
export * from './components/Breadcrumb/index.js';
export * from './components/Pagination/index.js';
export * from './components/Stepper/index.js';

// ── Task 10: Compound & Data Viz ─────────────────────────────────────────────
export * from './components/IssueCard/index.js';
export * from './components/ChoiceCard/index.js';
export * from './components/Sparkline/index.js';
```

---

### 11.2 — Verify and complete src/react.ts

- [ ] **Step 1:** Ensure `src/react.ts` contains all of the following (replace the entire file if needed):

```typescript
/**
 * Specd DS — React wrappers entry point
 *
 * Auto-generated React components via @lit/react.
 * These are thin wrappers around the Web Components — never hand-edit.
 *
 * @example
 * import { SpecdButton } from '@specd/specd-ds/react';
 * import '@specd/specd-ds/tokens.css';
 *
 * <SpecdButton variant="primary" onClick={handleClick}>Scan now</SpecdButton>
 */

import React from 'react';
import { createComponent } from '@lit/react';

// Foundation
import { SpecdButton }   from './components/Button/SpecdButton.js';
import { SpecdChip }     from './components/Chip/SpecdChip.js';
import { SpecdBadge }    from './components/Badge/SpecdBadge.js';
import { SpecdInput }    from './components/Input/SpecdInput.js';
import { SpecdToggle }   from './components/Toggle/SpecdToggle.js';
import { SpecdCard }     from './components/Card/SpecdCard.js';
import { SpecdProgress } from './components/ProgressBar/SpecdProgress.js';
import { SpecdAvatar }   from './components/Avatar/SpecdAvatar.js';

// Task 1
import { SpecdHealthBadge } from './components/HealthBadge/SpecdHealthBadge.js';
import { SpecdNavScore }    from './components/NavScore/SpecdNavScore.js';
import { SpecdAiPill }      from './components/AiPill/SpecdAiPill.js';
import { SpecdJumpBtn }     from './components/JumpBtn/SpecdJumpBtn.js';
import { SpecdSbPill }      from './components/SbPill/SpecdSbPill.js';

// Task 2
import { SpecdSeverityHeader } from './components/SeverityHeader/SpecdSeverityHeader.js';
import { SpecdScoreTrend }     from './components/ScoreTrend/SpecdScoreTrend.js';

// Task 3
import { SpecdScoreRing } from './components/ScoreRing/SpecdScoreRing.js';

// Task 4
import { SpecdCovRow } from './components/CovRow/SpecdCovRow.js';

// Task 5
import { SpecdStatTileSm } from './components/StatTileSm/SpecdStatTileSm.js';
import { SpecdStatTileLg } from './components/StatTileLg/SpecdStatTileLg.js';

// Task 6
import { SpecdTabBar }    from './components/TabBar/SpecdTabBar.js';
import { SpecdAppHeader } from './components/AppHeader/SpecdAppHeader.js';
import { SpecdSegmented } from './components/Segmented/SpecdSegmented.js';

// Task 7
import { SpecdSectionLabel }  from './components/SectionLabel/SpecdSectionLabel.js';
import { SpecdFormRow }       from './components/FormRow/SpecdFormRow.js';
import { SpecdToggleRow }     from './components/ToggleRow/SpecdToggleRow.js';
import { SpecdRadioGroup }    from './components/RadioGroup/SpecdRadioGroup.js';
import { SpecdCheckboxGroup } from './components/CheckboxGroup/SpecdCheckboxGroup.js';

// Task 8
import { SpecdModal }  from './components/Modal/SpecdModal.js';
import { SpecdDrawer } from './components/Drawer/SpecdDrawer.js';
import { SpecdToast }  from './components/Toast/SpecdToast.js';
import { SpecdAlert }  from './components/Alert/SpecdAlert.js';

// Task 9
import { SpecdDivider }    from './components/Divider/SpecdDivider.js';
import { SpecdKvRow }      from './components/KvRow/SpecdKvRow.js';
import { SpecdCodeBlock }  from './components/CodeBlock/SpecdCodeBlock.js';
import { SpecdSkeleton }   from './components/Skeleton/SpecdSkeleton.js';
import { SpecdEmptyState } from './components/EmptyState/SpecdEmptyState.js';
import { SpecdBreadcrumb } from './components/Breadcrumb/SpecdBreadcrumb.js';
import { SpecdPagination } from './components/Pagination/SpecdPagination.js';
import { SpecdStepper }    from './components/Stepper/SpecdStepper.js';

// Task 10
import { SpecdIssueCard }  from './components/IssueCard/SpecdIssueCard.js';
import { SpecdChoiceCard } from './components/ChoiceCard/SpecdChoiceCard.js';
import { SpecdSparkline }  from './components/Sparkline/SpecdSparkline.js';

// ── Foundation wrappers ──────────────────────────────────────────────────────

/** Auto-generated React wrapper for <specd-button>. Do not hand-edit. */
export const Button = createComponent({
  react: React, tagName: 'specd-button', elementClass: SpecdButton,
  events: { onClick: 'click', onFocus: 'focus', onBlur: 'blur' },
});

/** Auto-generated React wrapper for <specd-chip>. Do not hand-edit. */
export const Chip = createComponent({
  react: React, tagName: 'specd-chip', elementClass: SpecdChip,
  events: { onClick: 'click' },
});

/** Auto-generated React wrapper for <specd-badge>. Do not hand-edit. */
export const Badge = createComponent({
  react: React, tagName: 'specd-badge', elementClass: SpecdBadge,
  events: {},
});

/** Auto-generated React wrapper for <specd-input>. Do not hand-edit. */
export const Input = createComponent({
  react: React, tagName: 'specd-input', elementClass: SpecdInput,
  events: { onInput: 'input', onChange: 'change', onFocus: 'focus', onBlur: 'blur' },
});

/** Auto-generated React wrapper for <specd-toggle>. Do not hand-edit. */
export const Toggle = createComponent({
  react: React, tagName: 'specd-toggle', elementClass: SpecdToggle,
  events: { onChange: 'change' },
});

/** Auto-generated React wrapper for <specd-card>. Do not hand-edit. */
export const Card = createComponent({
  react: React, tagName: 'specd-card', elementClass: SpecdCard,
  events: {},
});

/** Auto-generated React wrapper for <specd-progress>. Do not hand-edit. */
export const Progress = createComponent({
  react: React, tagName: 'specd-progress', elementClass: SpecdProgress,
  events: {},
});

/** Auto-generated React wrapper for <specd-avatar>. Do not hand-edit. */
export const Avatar = createComponent({
  react: React, tagName: 'specd-avatar', elementClass: SpecdAvatar,
  events: {},
});

// ── Task 1 wrappers ──────────────────────────────────────────────────────────

/** Auto-generated React wrapper for <specd-health-badge>. Do not hand-edit. */
export const HealthBadge = createComponent({
  react: React, tagName: 'specd-health-badge', elementClass: SpecdHealthBadge,
  events: {},
});

/** Auto-generated React wrapper for <specd-nav-score>. Do not hand-edit. */
export const NavScore = createComponent({
  react: React, tagName: 'specd-nav-score', elementClass: SpecdNavScore,
  events: {},
});

/** Auto-generated React wrapper for <specd-ai-pill>. Do not hand-edit. */
export const AiPill = createComponent({
  react: React, tagName: 'specd-ai-pill', elementClass: SpecdAiPill,
  events: { onClick: 'click' },
});

/** Auto-generated React wrapper for <specd-jump-btn>. Do not hand-edit. */
export const JumpBtn = createComponent({
  react: React, tagName: 'specd-jump-btn', elementClass: SpecdJumpBtn,
  events: { onClick: 'click' },
});

/** Auto-generated React wrapper for <specd-sb-pill>. Do not hand-edit. */
export const SbPill = createComponent({
  react: React, tagName: 'specd-sb-pill', elementClass: SpecdSbPill,
  events: {},
});

// ── Task 2 wrappers ──────────────────────────────────────────────────────────

/** Auto-generated React wrapper for <specd-severity-header>. Do not hand-edit. */
export const SeverityHeader = createComponent({
  react: React, tagName: 'specd-severity-header', elementClass: SpecdSeverityHeader,
  events: {},
});

/** Auto-generated React wrapper for <specd-score-trend>. Do not hand-edit. */
export const ScoreTrend = createComponent({
  react: React, tagName: 'specd-score-trend', elementClass: SpecdScoreTrend,
  events: {},
});

// ── Task 3 wrappers ──────────────────────────────────────────────────────────

/** Auto-generated React wrapper for <specd-score-ring>. Do not hand-edit. */
export const ScoreRing = createComponent({
  react: React, tagName: 'specd-score-ring', elementClass: SpecdScoreRing,
  events: {},
});

// ── Task 4 wrappers ──────────────────────────────────────────────────────────

/** Auto-generated React wrapper for <specd-cov-row>. Do not hand-edit. */
export const CovRow = createComponent({
  react: React, tagName: 'specd-cov-row', elementClass: SpecdCovRow,
  events: {},
});

// ── Task 5 wrappers ──────────────────────────────────────────────────────────

/** Auto-generated React wrapper for <specd-stat-tile-sm>. Do not hand-edit. */
export const StatTileSm = createComponent({
  react: React, tagName: 'specd-stat-tile-sm', elementClass: SpecdStatTileSm,
  events: {},
});

/** Auto-generated React wrapper for <specd-stat-tile-lg>. Do not hand-edit. */
export const StatTileLg = createComponent({
  react: React, tagName: 'specd-stat-tile-lg', elementClass: SpecdStatTileLg,
  events: { onClick: 'click' },
});

// ── Task 6 wrappers ──────────────────────────────────────────────────────────

/** Auto-generated React wrapper for <specd-tab-bar>. Do not hand-edit. */
export const TabBar = createComponent({
  react: React, tagName: 'specd-tab-bar', elementClass: SpecdTabBar,
  events: { onSpecdTabChange: 'specd-tab-change' },
});

/** Auto-generated React wrapper for <specd-app-header>. Do not hand-edit. */
export const AppHeader = createComponent({
  react: React, tagName: 'specd-app-header', elementClass: SpecdAppHeader,
  events: { onSpecdRefresh: 'specd-refresh', onSpecdSettings: 'specd-settings' },
});

/** Auto-generated React wrapper for <specd-segmented>. Do not hand-edit. */
export const Segmented = createComponent({
  react: React, tagName: 'specd-segmented', elementClass: SpecdSegmented,
  events: { onSpecdChange: 'specd-change' },
});

// ── Task 7 wrappers ──────────────────────────────────────────────────────────

/** Auto-generated React wrapper for <specd-section-label>. Do not hand-edit. */
export const SectionLabel = createComponent({
  react: React, tagName: 'specd-section-label', elementClass: SpecdSectionLabel,
  events: {},
});

/** Auto-generated React wrapper for <specd-form-row>. Do not hand-edit. */
export const FormRow = createComponent({
  react: React, tagName: 'specd-form-row', elementClass: SpecdFormRow,
  events: {},
});

/** Auto-generated React wrapper for <specd-toggle-row>. Do not hand-edit. */
export const ToggleRow = createComponent({
  react: React, tagName: 'specd-toggle-row', elementClass: SpecdToggleRow,
  events: { onSpecdChange: 'specd-change' },
});

/** Auto-generated React wrapper for <specd-radio-group>. Do not hand-edit. */
export const RadioGroup = createComponent({
  react: React, tagName: 'specd-radio-group', elementClass: SpecdRadioGroup,
  events: { onSpecdChange: 'specd-change' },
});

/** Auto-generated React wrapper for <specd-checkbox-group>. Do not hand-edit. */
export const CheckboxGroup = createComponent({
  react: React, tagName: 'specd-checkbox-group', elementClass: SpecdCheckboxGroup,
  events: { onSpecdChange: 'specd-change' },
});

// ── Task 8 wrappers ──────────────────────────────────────────────────────────

/** Auto-generated React wrapper for <specd-modal>. Do not hand-edit. */
export const Modal = createComponent({
  react: React, tagName: 'specd-modal', elementClass: SpecdModal,
  events: { onSpecdClose: 'specd-close' },
});

/** Auto-generated React wrapper for <specd-drawer>. Do not hand-edit. */
export const Drawer = createComponent({
  react: React, tagName: 'specd-drawer', elementClass: SpecdDrawer,
  events: { onSpecdClose: 'specd-close' },
});

/** Auto-generated React wrapper for <specd-toast>. Do not hand-edit. */
export const Toast = createComponent({
  react: React, tagName: 'specd-toast', elementClass: SpecdToast,
  events: { onSpecdDismiss: 'specd-dismiss' },
});

/** Auto-generated React wrapper for <specd-alert>. Do not hand-edit. */
export const Alert = createComponent({
  react: React, tagName: 'specd-alert', elementClass: SpecdAlert,
  events: {},
});

// ── Task 9 wrappers ──────────────────────────────────────────────────────────

/** Auto-generated React wrapper for <specd-divider>. Do not hand-edit. */
export const Divider = createComponent({
  react: React, tagName: 'specd-divider', elementClass: SpecdDivider,
  events: {},
});

/** Auto-generated React wrapper for <specd-kv-row>. Do not hand-edit. */
export const KvRow = createComponent({
  react: React, tagName: 'specd-kv-row', elementClass: SpecdKvRow,
  events: {},
});

/** Auto-generated React wrapper for <specd-code-block>. Do not hand-edit. */
export const CodeBlock = createComponent({
  react: React, tagName: 'specd-code-block', elementClass: SpecdCodeBlock,
  events: {},
});

/** Auto-generated React wrapper for <specd-skeleton>. Do not hand-edit. */
export const Skeleton = createComponent({
  react: React, tagName: 'specd-skeleton', elementClass: SpecdSkeleton,
  events: {},
});

/** Auto-generated React wrapper for <specd-empty-state>. Do not hand-edit. */
export const EmptyState = createComponent({
  react: React, tagName: 'specd-empty-state', elementClass: SpecdEmptyState,
  events: {},
});

/** Auto-generated React wrapper for <specd-breadcrumb>. Do not hand-edit. */
export const Breadcrumb = createComponent({
  react: React, tagName: 'specd-breadcrumb', elementClass: SpecdBreadcrumb,
  events: {},
});

/** Auto-generated React wrapper for <specd-pagination>. Do not hand-edit. */
export const Pagination = createComponent({
  react: React, tagName: 'specd-pagination', elementClass: SpecdPagination,
  events: { onSpecdPageChange: 'specd-page-change' },
});

/** Auto-generated React wrapper for <specd-stepper>. Do not hand-edit. */
export const Stepper = createComponent({
  react: React, tagName: 'specd-stepper', elementClass: SpecdStepper,
  events: {},
});

// ── Task 10 wrappers ─────────────────────────────────────────────────────────

/** Auto-generated React wrapper for <specd-issue-card>. Do not hand-edit. */
export const IssueCard = createComponent({
  react: React, tagName: 'specd-issue-card', elementClass: SpecdIssueCard,
  events: {},
});

/** Auto-generated React wrapper for <specd-choice-card>. Do not hand-edit. */
export const ChoiceCard = createComponent({
  react: React, tagName: 'specd-choice-card', elementClass: SpecdChoiceCard,
  events: {},
});

/** Auto-generated React wrapper for <specd-sparkline>. Do not hand-edit. */
export const Sparkline = createComponent({
  react: React, tagName: 'specd-sparkline', elementClass: SpecdSparkline,
  events: {},
});
```

---

### 11.3 — Final build and test verification

- [ ] **Step 1:** Run full test suite
```bash
cd /Users/home/Desktop/code/admiral-ds && npx vitest run --reporter=verbose 2>&1 | tail -30
```

- [ ] **Step 2:** Run npm build
```bash
cd /Users/home/Desktop/code/admiral-ds && npm run build 2>&1 | tail -20
```

- [ ] **Step 3:** Verify no TypeScript errors
```bash
cd /Users/home/Desktop/code/admiral-ds && npx tsc --noEmit 2>&1 | head -40
```

---

### 11.4 — Final commit

- [ ] **Step 1:** Stage all new component directories and updated barrel files
```bash
cd /Users/home/Desktop/code/admiral-ds
git add \
  src/components/TabBar \
  src/components/AppHeader \
  src/components/Segmented \
  src/components/SectionLabel \
  src/components/FormRow \
  src/components/ToggleRow \
  src/components/RadioGroup \
  src/components/CheckboxGroup \
  src/components/Modal \
  src/components/Drawer \
  src/components/Toast \
  src/components/Alert \
  src/components/Divider \
  src/components/KvRow \
  src/components/CodeBlock \
  src/components/Skeleton \
  src/components/EmptyState \
  src/components/Breadcrumb \
  src/components/Pagination \
  src/components/Stepper \
  src/components/IssueCard \
  src/components/ChoiceCard \
  src/components/Sparkline \
  src/index.ts \
  src/react.ts
```

- [ ] **Step 2:** Commit
```bash
cd /Users/home/Desktop/code/admiral-ds
git commit -m "feat: add all remaining Specd DS components (35 total)

Navigation & Shell: SpecdTabBar, SpecdAppHeader, SpecdSegmented
Form Primitives: SpecdSectionLabel, SpecdFormRow, SpecdToggleRow, SpecdRadioGroup, SpecdCheckboxGroup
Overlays: SpecdModal, SpecdDrawer, SpecdToast, SpecdAlert
Layout: SpecdDivider, SpecdKvRow, SpecdCodeBlock, SpecdSkeleton, SpecdEmptyState, SpecdBreadcrumb, SpecdPagination, SpecdStepper
Compound/DataViz: SpecdIssueCard, SpecdChoiceCard, SpecdSparkline

All components use light DOM (createRenderRoot returns this), have Vitest tests,
Storybook stories, types files, and React wrappers via @lit/react."
```

---
