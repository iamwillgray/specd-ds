import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdScoreTrend');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-score-trend') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdScoreTrend', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-score-trend')).toBeDefined();
  });

  it('renders a .score-trend div', async () => {
    const el = await makeElement({ delta: '+1.0', direction: 'up' });
    expect(el.querySelector('.score-trend')).not.toBeNull();
  });

  it('applies .score-trend-delta.up for up direction', async () => {
    const el = await makeElement({ delta: '+4.2', direction: 'up' });
    const delta = el.querySelector('.score-trend-delta');
    expect(delta?.className).toContain('up');
  });

  it('applies .score-trend-delta.down for down direction', async () => {
    const el = await makeElement({ delta: '-1.8', direction: 'down' });
    const delta = el.querySelector('.score-trend-delta');
    expect(delta?.className).toContain('down');
  });

  it('applies .score-trend-delta.flat for flat direction', async () => {
    const el = await makeElement({ delta: '±0', direction: 'flat' });
    const delta = el.querySelector('.score-trend-delta');
    expect(delta?.className).toContain('flat');
  });

  it('shows the delta text', async () => {
    const el = await makeElement({ delta: '+4.2', direction: 'up' });
    expect(el.querySelector('.score-trend-delta')?.textContent?.trim()).toBe('+4.2');
  });

  it('shows meta when meta attr is set', async () => {
    const el = await makeElement({ delta: '+4.2', direction: 'up', meta: 'vs last scan' });
    const metaEl = el.querySelector('.score-trend-meta');
    expect(metaEl).not.toBeNull();
    expect(metaEl?.textContent?.trim()).toBe('vs last scan');
  });

  it('omits meta span when meta attr is not set', async () => {
    const el = await makeElement({ delta: '+2.1', direction: 'up' });
    expect(el.querySelector('.score-trend-meta')).toBeNull();
  });
});
