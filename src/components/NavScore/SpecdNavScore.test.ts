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

  it('renders an inner <span> with nav-score-badge class', async () => {
    const el = await makeElement({ score: '87' });
    const inner = el.querySelector('span');
    expect(inner).not.toBeNull();
    expect(inner?.className).toContain('nav-score-badge');
  });

  it('renders the score value', async () => {
    const el = await makeElement({ score: '87' });
    expect(el.textContent?.trim()).toBe('87');
  });

  it('renders a different score value', async () => {
    const el = await makeElement({ score: '42' });
    expect(el.textContent?.trim()).toBe('42');
  });
});
