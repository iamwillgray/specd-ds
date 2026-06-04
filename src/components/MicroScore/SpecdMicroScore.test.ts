import { describe, it, expect, beforeAll } from 'vitest';
beforeAll(async () => { await import('./SpecdMicroScore'); });
async function make(attrs: Record<string,string> = {}) {
  const el = document.createElement('specd-micro-score') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k,v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el); await el.updateComplete; return el;
}
describe('SpecdMicroScore', () => {
  it('registers', () => { expect(customElements.get('specd-micro-score')).toBeDefined(); });
  it('renders fraction passed/total', async () => {
    const el = await make({ passed: '5', total: '8' });
    expect(el.querySelector('.frac')?.textContent?.replace(/\s/g,'')).toBe('5/8');
  });
  it('caption defaults to "checks passing"', async () => {
    const el = await make({ passed: '5', total: '8' });
    expect(el.querySelector('.micro-cap')?.textContent).toContain('checks passing');
  });
  it('tier med when 5/8 (62.5%)', async () => {
    const el = await make({ passed: '5', total: '8' });
    expect(el.querySelector('.micro-ring')?.classList.contains('med')).toBe(true);
  });
  it('tier good when 8/8', async () => {
    const el = await make({ passed: '8', total: '8' });
    expect(el.querySelector('.micro-ring')?.classList.contains('good')).toBe(true);
  });
});
