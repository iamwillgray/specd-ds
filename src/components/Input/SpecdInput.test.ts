import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdInput');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-input') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

function getInner(el: HTMLElement): HTMLInputElement | null {
  return el.querySelector('input');
}

describe('SpecdInput', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-input')).toBeDefined();
  });

  it('renders an inner <input>', async () => {
    const el = await makeElement();
    expect(getInner(el)).not.toBeNull();
  });

  it('applies input class by default', async () => {
    const el = await makeElement();
    expect(getInner(el)?.className).toContain('input');
  });

  it('defaults to type=text', async () => {
    const el = await makeElement();
    expect(getInner(el)?.type).toBe('text');
  });

  it('applies specified type attribute', async () => {
    const el = await makeElement({ type: 'password' });
    expect(getInner(el)?.type).toBe('password');
  });

  it('sets placeholder attribute', async () => {
    const el = await makeElement({ placeholder: 'Search…' });
    expect(getInner(el)?.placeholder).toBe('Search…');
  });

  it('sets id attribute', async () => {
    const el = await makeElement({ id: 'my-input' });
    expect(getInner(el)?.id).toBe('my-input');
  });

  it('disables the input when disabled attribute is set', async () => {
    const el = await makeElement({ disabled: '' });
    expect(getInner(el)?.disabled).toBe(true);
  });

  it('is not disabled by default', async () => {
    const el = await makeElement();
    expect(getInner(el)?.disabled).toBe(false);
  });

  it('applies table-search class when search is set', async () => {
    const el = await makeElement({ search: '' });
    expect(getInner(el)?.className).toContain('table-search');
  });

  it('does not apply table-search by default', async () => {
    const el = await makeElement();
    expect(getInner(el)?.className).not.toContain('table-search');
  });

  it('applies extra cls to the input', async () => {
    const el = await makeElement({ cls: 'extra-class' });
    expect(getInner(el)?.className).toContain('extra-class');
  });
});
