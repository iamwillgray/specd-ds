import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdHealthBadge');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-health-badge') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdHealthBadge', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-health-badge')).toBeDefined();
  });

  it('renders an inner <span> with health-badge class', async () => {
    const el = await makeElement({ label: 'Healthy' });
    const inner = el.querySelector('span');
    expect(inner).not.toBeNull();
    expect(inner?.className).toContain('health-badge');
  });

  it('applies tier-good class by default', async () => {
    const el = await makeElement({ label: 'Healthy' });
    expect(el.querySelector('span')?.className).toContain('tier-good');
  });

  it('applies tier-med class', async () => {
    const el = await makeElement({ tier: 'med', label: 'Okay' });
    expect(el.querySelector('span')?.className).toContain('tier-med');
  });

  it('applies tier-poor class', async () => {
    const el = await makeElement({ tier: 'poor', label: 'Needs work' });
    expect(el.querySelector('span')?.className).toContain('tier-poor');
  });

  it('renders the label text', async () => {
    const el = await makeElement({ label: 'Healthy' });
    expect(el.textContent?.trim()).toBe('Healthy');
  });

  it('renders size="sm" with compact class', async () => {
    const el = document.createElement('specd-health-badge') as any;
    el.size = 'sm'; el.tier = 'good'; el.label = '87';
    document.body.appendChild(el);
    await el.updateComplete;
    const span = el.querySelector('span');
    expect(span?.className).toContain('sz-sm');
    el.remove();
  });

  it('renders size="md" as default', async () => {
    const el = document.createElement('specd-health-badge') as any;
    el.label = 'Healthy';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('span')?.className).toContain('sz-md');
    el.remove();
  });

  it('supports tier=med in sm size', async () => {
    const el = document.createElement('specd-health-badge') as any;
    el.size = 'sm'; el.tier = 'med'; el.label = '61';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('span')?.className).toContain('tier-med');
    expect(el.querySelector('span')?.className).toContain('sz-sm');
    el.remove();
  });
});
