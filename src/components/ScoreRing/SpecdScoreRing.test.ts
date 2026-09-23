import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdScoreRing');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-score-ring') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

/** SpecdScoreRing now animates from 0 to its target score via a ~620ms
 * requestAnimationFrame count-up (see component for why: it's the "score
 * ring fill animation" DESIGN.md's motion section calls for). Tests that
 * care about the settled value need to wait past that, not just the
 * initial Lit update. */
async function makeSettledElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = await makeElement(attrs);
  await new Promise((resolve) => setTimeout(resolve, 700));
  return el;
}

describe('SpecdScoreRing', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-score-ring')).toBeDefined();
  });

  it('renders a .score-circle div', async () => {
    const el = await makeElement({ score: '74', tier: 'good' });
    expect(el.querySelector('.score-circle')).not.toBeNull();
  });

  it('applies tier-excellent class for excellent tier', async () => {
    const el = await makeElement({ score: '92', tier: 'excellent' });
    expect(el.querySelector('.score-circle')?.className).toContain('tier-excellent');
  });

  it('applies tier-good class for good tier', async () => {
    const el = await makeElement({ score: '74', tier: 'good' });
    expect(el.querySelector('.score-circle')?.className).toContain('tier-good');
  });

  it('applies tier-med class for med tier', async () => {
    const el = await makeElement({ score: '51', tier: 'med' });
    expect(el.querySelector('.score-circle')?.className).toContain('tier-med');
  });

  it('applies tier-poor class for poor tier', async () => {
    const el = await makeElement({ score: '28', tier: 'poor' });
    expect(el.querySelector('.score-circle')?.className).toContain('tier-poor');
  });

  it('sets --score-percentage inline style once the count-up settles', async () => {
    const el = await makeSettledElement({ score: '74', tier: 'good' });
    const circle = el.querySelector<HTMLElement>('.score-circle');
    expect(circle?.style.getPropertyValue('--score-percentage')).toBe('74');
  }, 2000);

  it('shows the score number once the count-up settles', async () => {
    const el = await makeSettledElement({ score: '74', tier: 'good' });
    expect(el.querySelector('.score-number-lg')?.textContent?.trim()).toBe('74');
  }, 2000);

  it('starts the count-up from 0 immediately on mount', async () => {
    const el = await makeElement({ score: '74', tier: 'good' });
    expect(el.querySelector('.score-number-lg')?.textContent?.trim()).toBe('0');
  });

  it('shows "/100" denominator', async () => {
    const el = await makeElement({ score: '74', tier: 'good' });
    expect(el.querySelector('.score-denom-new')?.textContent?.trim()).toBe('/100');
  });

  it('responds to size attr by setting --w', async () => {
    const el = await makeElement({ score: '87', tier: 'good', size: '140' });
    const circle = el.querySelector<HTMLElement>('.score-circle');
    expect(circle?.style.getPropertyValue('--w')).toBe('140px');
  });

  it('applies scaled font size for small rings', async () => {
    const el = await makeElement({ size: '52', value: '80' });
    const numEl = el.querySelector('.score-number-lg') as HTMLElement;
    expect(numEl).not.toBeNull();
    // 42 * (52/104) = 21px
    expect(numEl.style.fontSize).toBe('21px');
  });
});
