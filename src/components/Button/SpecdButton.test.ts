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
});
