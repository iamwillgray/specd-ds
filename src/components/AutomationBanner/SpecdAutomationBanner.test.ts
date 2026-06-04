import { describe, it, expect, beforeAll } from 'vitest';
beforeAll(async () => { await import('./SpecdAutomationBanner'); });
async function make(attrs: Record<string,string> = {}) {
  const el = document.createElement('specd-automation-banner') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k,v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el); await el.updateComplete; return el;
}
describe('SpecdAutomationBanner', () => {
  it('registers', () => { expect(customElements.get('specd-automation-banner')).toBeDefined(); });
  it('renders title + sub', async () => {
    const el = await make({ title: 'Apply all exact matches', sub: '12 layers map 1:1' });
    expect(el.querySelector('.auto-banner b')?.textContent).toBe('Apply all exact matches');
    expect(el.querySelector('.auto-banner .txt span')?.textContent).toContain('12 layers');
  });
  it('renders default lightning icon', async () => {
    const el = await make({ title: 'X', sub: 'Y' });
    expect(el.querySelector('.auto-banner .ico svg')).not.toBeNull();
  });
});
