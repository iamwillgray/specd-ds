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

  it('renders an inner <span> with sb-pill class', async () => {
    const el = await makeElement({ label: 'Matched' });
    const inner = el.querySelector('span');
    expect(inner).not.toBeNull();
    expect(inner?.className).toContain('sb-pill');
  });

  it('applies sb-pill-muted class by default', async () => {
    const el = await makeElement({ label: 'Unknown' });
    expect(el.querySelector('span')?.className).toContain('sb-pill-muted');
  });

  it('applies sb-pill-good class', async () => {
    const el = await makeElement({ intent: 'good', label: 'Matched' });
    expect(el.querySelector('span')?.className).toContain('sb-pill-good');
  });

  it('applies sb-pill-bad class', async () => {
    const el = await makeElement({ intent: 'bad', label: 'Missing' });
    expect(el.querySelector('span')?.className).toContain('sb-pill-bad');
  });

  it('renders the label text', async () => {
    const el = await makeElement({ intent: 'good', label: 'Matched' });
    expect(el.textContent?.trim()).toBe('Matched');
  });
});
