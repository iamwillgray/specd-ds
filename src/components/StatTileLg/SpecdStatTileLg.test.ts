import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdStatTileLg');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-stat-tile-lg') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdStatTileLg', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-stat-tile-lg')).toBeDefined();
  });

  it('renders .stat-tile-lg', async () => {
    const el = await makeElement({ num: '1,247', title: 'Components' });
    expect(el.querySelector('.stat-tile-lg')).not.toBeNull();
  });

  it('shows num', async () => {
    const el = await makeElement({ num: '1,247', title: 'Components' });
    expect(el.querySelector('.stat-tile-lg-num')?.textContent?.trim()).toBe('1,247');
  });

  it('shows title', async () => {
    const el = await makeElement({ num: '42', title: 'Components' });
    expect(el.querySelector('.stat-tile-title')?.textContent?.trim()).toBe('Components');
  });

  it('no extra class for default color', async () => {
    const el = await makeElement({ num: '42', title: 'Components' });
    const tile = el.querySelector('.stat-tile-lg') as HTMLElement;
    expect(tile.className.trim()).toBe('stat-tile-lg');
  });

  it('applies green class for green color', async () => {
    const el = await makeElement({ num: '94%', title: 'Descriptions', color: 'green' });
    expect(el.querySelector('.stat-tile-lg')?.className).toContain('green');
  });

  it('applies red class for red color', async () => {
    const el = await makeElement({ num: '12', title: 'Critical Issues', color: 'red' });
    expect(el.querySelector('.stat-tile-lg')?.className).toContain('red');
  });

  it('applies amber class for amber color', async () => {
    const el = await makeElement({ num: '47%', title: 'Token Coverage', color: 'amber' });
    expect(el.querySelector('.stat-tile-lg')?.className).toContain('amber');
  });

  it('shows trend pill with up direction class', async () => {
    const el = await makeElement({ num: '94%', title: 'Descriptions', trend: '+3%', trenddir: 'up' });
    const pill = el.querySelector('.stat-trend-pill');
    expect(pill).not.toBeNull();
    expect(pill?.className).toContain('up');
  });

  it('shows trend pill with down direction class', async () => {
    const el = await makeElement({ num: '12', title: 'Issues', trend: '+2', trenddir: 'down' });
    const pill = el.querySelector('.stat-trend-pill');
    expect(pill).not.toBeNull();
    expect(pill?.className).toContain('down');
  });

  it('shows subtitle when set', async () => {
    const el = await makeElement({ num: '1,247', title: 'Components', subtitle: 'in library' });
    expect(el.querySelector('.stat-tile-subtitle')?.textContent?.trim()).toBe('in library');
  });

  it('omits subtitle when not set', async () => {
    const el = await makeElement({ num: '1,247', title: 'Components' });
    expect(el.querySelector('.stat-tile-subtitle')).toBeNull();
  });

  it('omits trend when not set', async () => {
    const el = await makeElement({ num: '1,247', title: 'Components' });
    expect(el.querySelector('.stat-trend-pill')).toBeNull();
  });
});
