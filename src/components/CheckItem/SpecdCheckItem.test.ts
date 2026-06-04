import { describe, it, expect, beforeAll } from 'vitest';
beforeAll(async () => { await import('./SpecdCheckItem'); });
async function make(attrs: Record<string,string> = {}) {
  const el = document.createElement('specd-check-item') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k,v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el); await el.updateComplete; return el;
}
describe('SpecdCheckItem', () => {
  it('registers', () => { expect(customElements.get('specd-check-item')).toBeDefined(); });
  it('renders label + sub + state class', async () => {
    const el = await make({ label: 'Description', sub: 'missing', state: 'fail' });
    expect(el.querySelector('.check')?.classList.contains('fail')).toBe(true);
    expect(el.querySelector('.check')?.textContent).toContain('Description');
    expect(el.querySelector('.ck-sub')?.textContent).toBe('missing');
  });
  it('pass renders a checkmark svg', async () => {
    const el = await make({ label: 'Publish', sub: 'current', state: 'pass' });
    expect(el.querySelector('.check.pass .badge svg')).not.toBeNull();
  });
});
