import { describe, it, expect, beforeAll } from 'vitest';
beforeAll(async () => { await import('./SpecdStageBar'); });
async function make(attrs: Record<string,string> = {}) {
  const el = document.createElement('specd-stage-bar') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k,v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el); await el.updateComplete; return el;
}
describe('SpecdStageBar', () => {
  it('registers', () => { expect(customElements.get('specd-stage-bar')).toBeDefined(); });
  it('shows count and pluralised label', async () => {
    const el = await make({ count: '3' });
    expect(el.querySelector('.num')?.textContent?.trim()).toBe('3');
    expect(el.querySelector('.lbl')?.textContent).toContain('staged changes');
  });
  it('count 1 is singular', async () => {
    const el = await make({ count: '1' });
    expect(el.querySelector('.lbl')?.textContent).toContain('staged change');
    expect(el.querySelector('.lbl')?.textContent).not.toContain('changes');
  });
  it('count 0 adds .empty', async () => {
    const el = await make({ count: '0' });
    expect(el.querySelector('.stage-bar')?.classList.contains('empty')).toBe(true);
  });
  it('emits apply + discard', async () => {
    const el = await make({ count: '2' });
    let a = false, d = false;
    el.addEventListener('apply', () => { a = true; });
    el.addEventListener('discard', () => { d = true; });
    (el.querySelector('[data-apply]') as HTMLElement).click();
    (el.querySelector('[data-discard]') as HTMLElement).click();
    expect(a && d).toBe(true);
  });
});
