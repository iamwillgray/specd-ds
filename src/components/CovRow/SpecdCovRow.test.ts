import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdCovRow');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-cov-row') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdCovRow', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-cov-row')).toBeDefined();
  });

  it('renders .cov-row-v2', async () => {
    const el = await makeElement({ label: 'Descriptions', pct: '94' });
    expect(el.querySelector('.cov-row-v2')).not.toBeNull();
  });

  it('shows label text', async () => {
    const el = await makeElement({ label: 'Token Coverage', pct: '50' });
    expect(el.querySelector('.cov-label')?.textContent?.trim()).toBe('Token Coverage');
  });

  it('shows percentage', async () => {
    const el = await makeElement({ label: 'Dev Status', pct: '75' });
    expect(el.querySelector('.cov-pct')?.textContent?.trim()).toBe('75%');
  });

  it('applies tier-excellent chip for pct >= 80', async () => {
    const el = await makeElement({ label: 'Descriptions', pct: '94' });
    expect(el.querySelector('.cov-status-chip')?.className).toContain('tier-excellent');
  });

  it('applies tier-good chip for pct = 65', async () => {
    const el = await makeElement({ label: 'Doc Links', pct: '65' });
    expect(el.querySelector('.cov-status-chip')?.className).toContain('tier-good');
  });

  it('applies tier-med chip for pct = 45', async () => {
    const el = await makeElement({ label: 'Token Coverage', pct: '45' });
    expect(el.querySelector('.cov-status-chip')?.className).toContain('tier-med');
  });

  it('applies tier-poor chip for pct = 20', async () => {
    const el = await makeElement({ label: 'Dev Status', pct: '20' });
    expect(el.querySelector('.cov-status-chip')?.className).toContain('tier-poor');
  });

  it('explicit tier attr overrides derived tier', async () => {
    const el = await makeElement({ label: 'Descriptions', pct: '94', tier: 'poor' });
    expect(el.querySelector('.cov-status-chip')?.className).toContain('tier-poor');
  });

  it('renders .cov-fill with correct width style', async () => {
    const el = await makeElement({ label: 'Descriptions', pct: '72' });
    const fill = el.querySelector('.cov-fill') as HTMLElement;
    expect(fill).not.toBeNull();
    expect(fill.style.width).toBe('72%');
  });

  it('renders icon when icon attr set', async () => {
    const svgIcon = '<svg width="14" height="14"><circle cx="7" cy="7" r="7"/></svg>';
    const el = await makeElement({ label: 'Descriptions', pct: '80', icon: svgIcon });
    expect(el.querySelector('.cov-icon')).not.toBeNull();
    expect(el.querySelector('.cov-icon svg')).not.toBeNull();
  });
});
