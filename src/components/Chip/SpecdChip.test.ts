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

  it('applies chip-crit class on count when severity=crit', async () => {
    const el = await makeElement({ label: 'Crit', count: '2', severity: 'crit' });
    expect(el.querySelector('.chip-count')?.className).toContain('chip-crit');
  });

  it('applies chip-warn class on count when severity=warn', async () => {
    const el = await makeElement({ label: 'Warn', count: '1', severity: 'warn' });
    expect(el.querySelector('.chip-count')?.className).toContain('chip-warn');
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

  it('applies positive intent class', async () => {
    const el = await makeElement({ label: 'OK', intent: 'positive' });
    expect(el.querySelector('span')?.className).toContain('positive');
  });
  it('applies negative intent class', async () => {
    const el = await makeElement({ label: 'Bad', intent: 'negative' });
    expect(el.querySelector('span')?.className).toContain('negative');
  });
  it('applies chip-crit class to count badge', async () => {
    const el = await makeElement({ label: 'A', count: '3', severity: 'crit' });
    expect(el.querySelector('.chip-count')?.className).toContain('chip-crit');
  });
  it('applies chip-warn class to count badge', async () => {
    const el = await makeElement({ label: 'B', count: '2', severity: 'warn' });
    expect(el.querySelector('.chip-count')?.className).toContain('chip-warn');
  });

  it('renders a button when clickable=true', async () => {
    const el = document.createElement('specd-chip') as any;
    el.label = 'Filter';
    el.clickable = true;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('button')).not.toBeNull();
    expect(el.querySelector('button')?.getAttribute('type')).toBe('button');
    el.remove();
  });

  it('renders a span when clickable is false (default)', async () => {
    const el = document.createElement('specd-chip') as any;
    el.label = 'Tag';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('span')).not.toBeNull();
    expect(el.querySelector('button')).toBeNull();
    el.remove();
  });

  it('forwards disabled to button when clickable', async () => {
    const el = document.createElement('specd-chip') as any;
    el.clickable = true;
    el.disabled = true;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('button')?.disabled).toBe(true);
    el.remove();
  });
});
