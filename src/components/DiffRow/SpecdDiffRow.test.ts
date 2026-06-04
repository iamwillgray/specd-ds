import { describe, it, expect, beforeAll } from 'vitest';
beforeAll(async () => { await import('./SpecdDiffRow'); });
async function make(attrs: Record<string,string> = {}) {
  const el = document.createElement('specd-diff-row') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k,v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el); await el.updateComplete; return el;
}
describe('SpecdDiffRow', () => {
  it('registers', () => { expect(customElements.get('specd-diff-row')).toBeDefined(); });
  it('renders field, before, after value', async () => {
    const el = await make({ field: 'Description', after: 'Primary button.' });
    expect(el.querySelector('.diff-row-head .field')?.textContent).toBe('Description');
    expect((el.querySelector('.diff-cell.after input,.diff-cell.after textarea') as HTMLInputElement)?.value).toBe('Primary button.');
  });
  it('empty before shows placeholder + empty class', async () => {
    const el = await make({ field: 'Doc link', 'before-empty': 'No link', after: 'http://x' });
    expect(el.querySelector('.diff-cell.before')?.classList.contains('empty')).toBe(true);
    expect(el.querySelector('.diff-cell.before .val')?.textContent).toBe('No link');
  });
  it('multiline renders a textarea', async () => {
    const el = await make({ field: 'Description', after: 'x', multiline: '' });
    expect(el.querySelector('textarea')).not.toBeNull();
  });
  it('staged attr adds .staged', async () => {
    const el = await make({ field: 'X', after: 'y', staged: '' });
    expect(el.querySelector('.diff-row')?.classList.contains('staged')).toBe(true);
  });
  it('emits edit on input', async () => {
    const el = await make({ field: 'X', after: 'y' });
    let v = ''; el.addEventListener('edit', (e: any) => { v = e.detail; });
    const inp = el.querySelector('.diff-cell.after input') as HTMLInputElement;
    inp.value = 'z'; inp.dispatchEvent(new Event('input', { bubbles: true }));
    expect(v).toBe('z');
  });
});
