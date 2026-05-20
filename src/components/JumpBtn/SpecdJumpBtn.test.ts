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

  it('renders a <button> with btn-jump class', async () => {
    const el = await makeElement();
    const btn = el.querySelector('button');
    expect(btn).not.toBeNull();
    expect(btn?.className).toContain('btn-jump');
  });

  it('renders default label "Jump to layer"', async () => {
    const el = await makeElement();
    expect(el.textContent?.trim()).toContain('Jump to layer');
  });

  it('renders a custom label', async () => {
    const el = await makeElement({ label: 'Go to component' });
    expect(el.textContent?.trim()).toContain('Go to component');
  });

  it('renders an SVG arrow icon', async () => {
    const el = await makeElement();
    const svg = el.querySelector('svg');
    expect(svg).not.toBeNull();
  });

  it('fires a click event when the button is clicked', async () => {
    const el = await makeElement();
    const btn = el.querySelector('button') as HTMLButtonElement;
    let clicked = false;
    el.addEventListener('click', () => { clicked = true; });
    btn.click();
    expect(clicked).toBe(true);
  });
});
