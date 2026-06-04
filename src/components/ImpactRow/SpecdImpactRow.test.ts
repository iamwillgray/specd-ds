import { describe, it, expect, beforeAll } from 'vitest';
beforeAll(async () => { await import('./SpecdImpactRow'); });
async function make(attrs: Record<string,string> = {}) {
  const el = document.createElement('specd-impact-row') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k,v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el); await el.updateComplete; return el;
}
describe('SpecdImpactRow', () => {
  it('registers', () => { expect(customElements.get('specd-impact-row')).toBeDefined(); });
  it('renders rank + name + delta', async () => {
    const el = await make({ rank: '1', name: 'Card / Elevated', delta: '4' });
    expect(el.querySelector('.impact-rank')?.textContent?.trim()).toBe('1');
    expect(el.querySelector('.impact-name')?.textContent).toContain('Card / Elevated');
    expect(el.querySelector('.impact-delta')?.textContent).toContain('+4');
  });
  it('renders sub html', async () => {
    const el = await make({ rank: '2', name: 'Button', delta: '3', sub: '6 hard-coded values' });
    expect(el.querySelector('.impact-sub')?.textContent).toContain('6 hard-coded values');
  });
  it('emits open on name click', async () => {
    const el = await make({ rank: '1', name: 'X', delta: '1' });
    let id = ''; el.addEventListener('open', (e: any) => { id = e.detail; });
    el.setAttribute('component-id', 'node:9');
    await el.updateComplete;
    (el.querySelector('.impact-name') as HTMLElement).click();
    expect(id).toBe('node:9');
  });
});
