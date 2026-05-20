import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdChip');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-chip') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdChip', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-chip')).toBeDefined();
  });

  it('renders an inner <span> with chip-v2 class', async () => {
    const el = await makeElement({ label: 'All' });
    const inner = el.querySelector('span');
    expect(inner).not.toBeNull();
    expect(inner?.className).toContain('chip-v2');
  });

  it('renders the label text', async () => {
    const el = await makeElement({ label: 'Critical' });
    expect(el.textContent?.trim()).toContain('Critical');
  });

  it('does not apply active class by default', async () => {
    const el = await makeElement({ label: 'Test' });
    expect(el.querySelector('span')?.className).not.toContain('active');
  });

  it('applies active class when active attribute is set', async () => {
    const el = await makeElement({ label: 'Active', active: '' });
    expect(el.querySelector('span')?.className).toContain('active');
  });

  it('does not render chip-count when count is omitted', async () => {
    const el = await makeElement({ label: 'No count' });
    expect(el.querySelector('.chip-count')).toBeNull();
  });

  it('renders chip-count when count is provided', async () => {
    const el = await makeElement({ label: 'With count', count: '5' });
    const badge = el.querySelector('.chip-count');
    expect(badge).not.toBeNull();
    expect(badge?.textContent?.trim()).toBe('5');
  });

  it('applies is-crit class on count when severity=crit', async () => {
    const el = await makeElement({ label: 'Crit', count: '2', severity: 'crit' });
    expect(el.querySelector('.chip-count')?.className).toContain('is-crit');
  });

  it('applies is-warn class on count when severity=warn', async () => {
    const el = await makeElement({ label: 'Warn', count: '1', severity: 'warn' });
    expect(el.querySelector('.chip-count')?.className).toContain('is-warn');
  });

  it('forwards data-filter attribute', async () => {
    const el = await makeElement({ label: 'Filter', 'data-filter': 'critical' });
    const inner = el.querySelector('span');
    expect(inner?.getAttribute('data-filter')).toBe('critical');
  });

  it('applies extra cls to root span', async () => {
    const el = await makeElement({ label: 'Extra', cls: 'my-class' });
    expect(el.querySelector('span')?.className).toContain('my-class');
  });
});
