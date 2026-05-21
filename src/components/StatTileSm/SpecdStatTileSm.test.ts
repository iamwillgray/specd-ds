import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdStatTileSm');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-stat-tile-sm') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdStatTileSm', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-stat-tile-sm')).toBeDefined();
  });

  it('renders .stat-tile-sm', async () => {
    const el = await makeElement({ num: '42', label: 'Components' });
    expect(el.querySelector('.stat-tile-sm')).not.toBeNull();
  });

  it('shows num', async () => {
    const el = await makeElement({ num: '1,247', label: 'Components' });
    expect(el.querySelector('.stat-tile-sm-num')?.textContent?.trim()).toBe('1,247');
  });

  it('shows label', async () => {
    const el = await makeElement({ num: '42', label: 'Components' });
    expect(el.querySelector('.stat-tile-sm-label')?.textContent?.trim()).toBe('Components');
  });

  it('no extra class for default intent', async () => {
    const el = await makeElement({ num: '42', label: 'Components' });
    const tile = el.querySelector('.stat-tile-sm') as HTMLElement;
    expect(tile.className.trim()).toBe('stat-tile-sm');
  });

  it('adds .positive class for positive intent', async () => {
    const el = await makeElement({ num: '94%', label: 'Coverage', intent: 'positive' });
    expect(el.querySelector('.stat-tile-sm')?.className).toContain('positive');
  });

  it('adds .negative class for negative intent', async () => {
    const el = await makeElement({ num: '12', label: 'Issues', intent: 'negative' });
    expect(el.querySelector('.stat-tile-sm')?.className).toContain('negative');
  });

  it('adds .warning class for warning intent', async () => {
    const el = await makeElement({ num: '5', label: 'Warnings', intent: 'warning' });
    expect(el.querySelector('.stat-tile-sm')?.className).toContain('warning');
  });

  it('adds .neutral class for neutral intent', async () => {
    const el = await makeElement({ num: '0', label: 'Ignored', intent: 'neutral' });
    expect(el.querySelector('.stat-tile-sm')?.className).toContain('neutral');
  });
});
