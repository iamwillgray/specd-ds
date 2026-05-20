import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdCard');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-card') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdCard', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-card')).toBeDefined();
  });

  it('renders a root div with card class', async () => {
    const el = await makeElement();
    const root = el.querySelector('div.card');
    expect(root).not.toBeNull();
  });

  it('applies card--elevated by default', async () => {
    const el = await makeElement();
    expect(el.querySelector('div')?.className).toContain('card--elevated');
  });

  it('applies card--flat when elevation=flat', async () => {
    const el = await makeElement({ elevation: 'flat' });
    expect(el.querySelector('div')?.className).toContain('card--flat');
  });

  it('applies card--inset when elevation=inset', async () => {
    const el = await makeElement({ elevation: 'inset' });
    expect(el.querySelector('div')?.className).toContain('card--inset');
  });

  it('renders card-inner wrapper by default', async () => {
    const el = await makeElement();
    expect(el.querySelector('.card-inner')).not.toBeNull();
  });

  it('does not render card-inner when inner is false', async () => {
    const el = document.createElement('specd-card') as HTMLElement & { updateComplete: Promise<boolean>; inner: boolean };
    el.inner = false;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.card-inner')).toBeNull();
  });

  it('renders content HTML via content attribute', async () => {
    const el = await makeElement({ content: '<p class="test-p">Hello</p>' });
    expect(el.querySelector('.test-p')).not.toBeNull();
    expect(el.querySelector('.test-p')?.textContent).toBe('Hello');
  });

  it('applies extra cls to the root div', async () => {
    const el = await makeElement({ cls: 'my-card' });
    expect(el.querySelector('div')?.className).toContain('my-card');
  });
});
