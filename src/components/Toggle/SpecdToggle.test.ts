import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdToggle');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-toggle') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdToggle', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-toggle')).toBeDefined();
  });

  it('renders a label.toggle wrapper', async () => {
    const el = await makeElement({ id: 't1' });
    const label = el.querySelector('label.toggle');
    expect(label).not.toBeNull();
  });

  it('renders a toggle-track inside', async () => {
    const el = await makeElement({ id: 't2' });
    expect(el.querySelector('.toggle-track')).not.toBeNull();
  });

  it('renders a toggle-thumb inside the track', async () => {
    const el = await makeElement({ id: 't3' });
    expect(el.querySelector('.toggle-thumb')).not.toBeNull();
  });

  it('renders a hidden checkbox inside', async () => {
    const el = await makeElement({ id: 't4' });
    const cb = el.querySelector('input[type="checkbox"]') as HTMLInputElement | null;
    expect(cb).not.toBeNull();
  });

  it('sets checkbox id attribute', async () => {
    const el = await makeElement({ id: 'my-toggle' });
    const cb = el.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(cb.id).toBe('my-toggle');
  });

  it('is unchecked by default', async () => {
    const el = await makeElement({ id: 't5' });
    const cb = el.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(cb.checked).toBe(false);
  });

  it('is checked when checked attribute is set', async () => {
    const el = await makeElement({ id: 't6', checked: '' });
    const cb = el.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(cb.checked).toBe(true);
  });

  it('is not disabled by default', async () => {
    const el = await makeElement({ id: 't7' });
    const cb = el.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(cb.disabled).toBe(false);
  });

  it('disables the checkbox when disabled attribute is set', async () => {
    const el = await makeElement({ id: 't8', disabled: '' });
    const cb = el.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(cb.disabled).toBe(true);
  });

  it('sets aria-label on the wrapper label', async () => {
    const el = await makeElement({ id: 't9', 'aria-label': 'Dark mode' });
    const label = el.querySelector('label.toggle');
    expect(label?.getAttribute('aria-label')).toBe('Dark mode');
  });
});
