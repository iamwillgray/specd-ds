import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdButton');
});

async function makeButton(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-button') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

function getInner(el: HTMLElement): HTMLButtonElement | null {
  return el.querySelector('button');
}

describe('SpecdButton', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-button')).toBeDefined();
  });

  it('renders an inner <button>', async () => {
    const el = await makeButton({ label: 'Click me' });
    expect(getInner(el)).not.toBeNull();
  });

  it('renders the label text', async () => {
    const el = await makeButton({ label: 'Scan now' });
    expect(el.textContent?.trim()).toContain('Scan now');
  });

  it('applies primary variant class by default', async () => {
    const el = await makeButton({ label: 'Primary' });
    expect(getInner(el)?.className).toContain('btn-primary');
  });

  it('applies ghost variant class', async () => {
    const el = await makeButton({ label: 'Ghost', variant: 'ghost' });
    expect(getInner(el)?.className).toContain('btn-ghost');
  });

  it('applies accent variant class', async () => {
    const el = await makeButton({ label: 'Accent', variant: 'accent' });
    expect(getInner(el)?.className).toContain('btn-accent');
  });

  it('applies danger variant class', async () => {
    const el = await makeButton({ label: 'Delete', variant: 'danger' });
    expect(getInner(el)?.className).toContain('btn-danger');
  });

  it('applies btn-sm class for sm size', async () => {
    const el = await makeButton({ label: 'Small', size: 'sm' });
    expect(getInner(el)?.className).toContain('btn-sm');
  });

  it('applies btn-lg class for lg size', async () => {
    const el = await makeButton({ label: 'Large', size: 'lg' });
    expect(getInner(el)?.className).toContain('btn-lg');
  });

  it('applies btn-full when full attribute is set', async () => {
    const el = await makeButton({ label: 'Full', full: '' });
    expect(getInner(el)?.className).toContain('btn-full');
  });

  it('sets disabled when disabled attribute is set', async () => {
    const el = await makeButton({ label: 'Disabled', disabled: '' });
    expect(getInner(el)?.disabled).toBe(true);
  });

  it('applies is-loading and disables button when loading', async () => {
    const el = await makeButton({ label: 'Loading', loading: '' });
    const inner = getInner(el);
    expect(inner?.className).toContain('is-loading');
    expect(inner?.disabled).toBe(true);
  });

  it('sets the button type attribute', async () => {
    const el = await makeButton({ label: 'Submit', type: 'submit' });
    expect(getInner(el)?.type).toBe('submit');
  });

  it('renders .btn-icon when icon attribute is set', async () => {
    const svg = '<svg><circle cx="12" cy="12" r="4"/></svg>';
    const el = await makeButton({ label: 'Icon', icon: svg });
    expect(el.querySelector('.btn-icon')).not.toBeNull();
  });

  it('does not render .btn-icon when icon is empty', async () => {
    const el = await makeButton({ label: 'No icon' });
    expect(el.querySelector('.btn-icon')).toBeNull();
  });

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

  it('renders with variant="sb-muted"', async () => {
    const el = document.createElement('specd-button') as any;
    el.variant = 'sb-muted'; el.label = '—';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('button')?.className).toContain('btn-sb-muted');
    el.remove();
  });

  it('renders with variant="ai-gradient"', async () => {
    const el = document.createElement('specd-button') as any;
    el.variant = 'ai-gradient'; el.label = 'Fix with AI';
    document.body.appendChild(el);
    await el.updateComplete;
    const btn = el.querySelector('button');
    expect(btn?.className).toContain('btn-ai-gradient');
    el.remove();
  });

  it('auto-injects sparkle icon for ai-gradient variant', async () => {
    const el = document.createElement('specd-button') as any;
    el.variant = 'ai-gradient'; el.label = 'Fix with AI';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.btn-icon')).not.toBeNull();
    el.remove();
  });

  it('wraps label in .ai-text span for ai-gradient variant', async () => {
    const el = document.createElement('specd-button') as any;
    el.variant = 'ai-gradient'; el.label = 'Fix with AI';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.ai-text')).not.toBeNull();
    el.remove();
  });

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
});

describe('SpecdButton — action variants', () => {
  it('renders .btn-row-primary for variant="row-primary"', async () => {
    const el = document.createElement('specd-button') as any;
    el.variant = 'row-primary';
    el.label = 'Add doc link';
    document.body.appendChild(el);
    await el.updateComplete;
    const btn = el.querySelector('button');
    expect(btn?.classList.contains('btn-row-primary')).toBe(true);
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
    const btn = el.querySelector('button');
    expect(btn?.classList.contains('btn-row-applied')).toBe(true);
    el.remove();
  });

  it('renders .btn-edit-pill for variant="edit-pill"', async () => {
    const el = document.createElement('specd-button') as any;
    el.variant = 'edit-pill';
    el.label = 'Edit';
    document.body.appendChild(el);
    await el.updateComplete;
    const btn = el.querySelector('button');
    expect(btn?.classList.contains('btn-edit-pill')).toBe(true);
    el.remove();
  });

  it('renders .btn-save-pill for variant="save-pill"', async () => {
    const el = document.createElement('specd-button') as any;
    el.variant = 'save-pill';
    el.label = 'Save';
    document.body.appendChild(el);
    await el.updateComplete;
    const btn = el.querySelector('button');
    expect(btn?.classList.contains('btn-save-pill')).toBe(true);
    el.remove();
  });

  it('renders .btn-cancel-pill for variant="cancel-pill"', async () => {
    const el = document.createElement('specd-button') as any;
    el.variant = 'cancel-pill';
    el.label = 'Cancel';
    document.body.appendChild(el);
    await el.updateComplete;
    const btn = el.querySelector('button');
    expect(btn?.classList.contains('btn-cancel-pill')).toBe(true);
    el.remove();
  });
});
