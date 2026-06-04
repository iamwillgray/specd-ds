import { describe, it, expect, beforeAll } from 'vitest';
beforeAll(async () => { await import('./SpecdDeepLink'); });
async function make(attrs: Record<string,string> = {}) {
  const el = document.createElement('specd-deep-link') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k,v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el); await el.updateComplete; return el;
}
describe('SpecdDeepLink', () => {
  it('registers', () => { expect(customElements.get('specd-deep-link')).toBeDefined(); });
  it('renders name, sub, value', async () => {
    const el = await make({ name: 'Descriptions', sub: 'Next weakest', value: '48' });
    expect(el.querySelector('.dl-name')?.textContent).toBe('Descriptions');
    expect(el.querySelector('.dl-sub')?.textContent).toBe('Next weakest');
    expect(el.querySelector('.dl-pct')?.textContent?.trim()).toBe('48');
  });
  it('value tier class from pct: poor < 60', async () => {
    const el = await make({ name: 'X', sub: 'Y', value: '48' });
    expect(el.querySelector('.dl-pct')?.classList.contains('poor')).toBe(true);
  });
  it('emits navigate with to', async () => {
    const el = await make({ name: 'X', sub: 'Y', value: '90', to: 'props' });
    let to = ''; el.addEventListener('navigate', (e: any) => { to = e.detail; });
    (el.querySelector('.deep-link') as HTMLElement).click();
    expect(to).toBe('props');
  });
});
