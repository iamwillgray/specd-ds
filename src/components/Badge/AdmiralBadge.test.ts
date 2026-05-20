import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./AdmiralBadge');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('admiral-badge') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('AdmiralBadge', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('admiral-badge')).toBeDefined();
  });

  it('renders an inner <span> with badge class', async () => {
    const el = await makeElement({ value: '3' });
    const inner = el.querySelector('span');
    expect(inner).not.toBeNull();
    expect(inner?.className).toContain('badge');
  });

  it('renders the value text', async () => {
    const el = await makeElement({ value: '7' });
    expect(el.textContent?.trim()).toBe('7');
  });

  it('applies badge-neutral class by default', async () => {
    const el = await makeElement({ value: '1' });
    expect(el.querySelector('span')?.className).toContain('badge-neutral');
  });

  it('applies badge-positive class', async () => {
    const el = await makeElement({ value: '2', intent: 'positive' });
    expect(el.querySelector('span')?.className).toContain('badge-positive');
  });

  it('applies badge-negative class', async () => {
    const el = await makeElement({ value: '2', intent: 'negative' });
    expect(el.querySelector('span')?.className).toContain('badge-negative');
  });

  it('applies badge-warning class', async () => {
    const el = await makeElement({ value: '2', intent: 'warning' });
    expect(el.querySelector('span')?.className).toContain('badge-warning');
  });

  it('applies badge-dot class and omits text when dot is set', async () => {
    const el = await makeElement({ dot: '' });
    const inner = el.querySelector('span');
    expect(inner?.className).toContain('badge-dot');
    expect(inner?.textContent?.trim()).toBe('');
  });

  it('applies badge-anchored class when anchored is set', async () => {
    const el = await makeElement({ value: '1', anchored: '' });
    expect(el.querySelector('span')?.className).toContain('badge-anchored');
  });

  it('does not apply badge-anchored by default', async () => {
    const el = await makeElement({ value: '1' });
    expect(el.querySelector('span')?.className).not.toContain('badge-anchored');
  });
});
