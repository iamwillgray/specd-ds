import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdSparkline');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-sparkline') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

const RISING = JSON.stringify([45, 52, 48, 61, 58, 72, 69, 84, 87, 92]);

describe('SpecdSparkline', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-sparkline')).toBeDefined();
  });

  it('renders svg.sparkline', async () => {
    const el = await makeElement({ values: RISING });
    expect(el.querySelector('svg.sparkline')).not.toBeNull();
  });

  it('renders .sparkline-path when values provided', async () => {
    const el = await makeElement({ values: RISING });
    expect(el.querySelector('.sparkline-path')).not.toBeNull();
  });

  it('renders .sparkline-area when values provided', async () => {
    const el = await makeElement({ values: RISING });
    expect(el.querySelector('.sparkline-area')).not.toBeNull();
  });

  it('applies .positive class for positive intent', async () => {
    const el = await makeElement({ values: RISING, intent: 'positive' });
    expect(el.querySelector('.sparkline-path')?.className).toContain('positive');
  });

  it('applies .negative class for negative intent', async () => {
    const el = await makeElement({ values: RISING, intent: 'negative' });
    expect(el.querySelector('.sparkline-path')?.className).toContain('negative');
  });

  it('renders empty svg when values is empty array', async () => {
    const el = await makeElement({ values: '[]' });
    expect(el.querySelector('svg.sparkline')).not.toBeNull();
    expect(el.querySelector('.sparkline-path')).toBeNull();
    expect(el.querySelector('.sparkline-area')).toBeNull();
  });
});
