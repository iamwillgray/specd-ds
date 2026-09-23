import { describe, it, expect, beforeAll } from 'vitest';
beforeAll(async () => { await import('./SpecdDiffRow'); });
async function make(attrs: Record<string,string> = {}) {
  const el = document.createElement('specd-diff-row') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k,v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el); await el.updateComplete; return el;
}
describe('SpecdDiffRow', () => {
  it('registers', () => { expect(customElements.get('specd-diff-row')).toBeDefined(); });
  it('renders field, before, after value when a before value exists', async () => {
    const el = await make({ field: 'Description', before: 'Old copy.', after: 'Primary button.' });
    expect(el.querySelector('.diff-row-head .field')?.textContent).toBe('Description');
    expect(el.querySelector('.diff-cell.before .val')?.textContent).toBe('Old copy.');
    expect((el.querySelector('.diff-cell.after input,.diff-cell.after textarea') as HTMLInputElement)?.value).toBe('Primary button.');
  });
  it('empty before renders the empty-state layout, not the before/after grid', async () => {
    const el = await make({ field: 'Doc link', 'before-empty': 'No link', after: 'http://x' });
    expect(el.querySelector('.diff-row')?.classList.contains('diff-row-empty')).toBe(true);
    expect(el.querySelector('.diff-cols')).toBeNull();
    const field = el.querySelector('.diff-empty-body input') as HTMLInputElement;
    expect(field.value).toBe('http://x');
    expect(field.placeholder).toBe('No link');
  });
  it('generatable shows a Generate button in the empty state, non-generatable does not', async () => {
    const withGen = await make({ field: 'Description', 'before-empty': 'No description', after: '', generatable: '' });
    expect(withGen.querySelector('.diff-generate-btn')).not.toBeNull();
    const withoutGen = await make({ field: 'Doc link', 'before-empty': 'No link', after: '' });
    expect(withoutGen.querySelector('.diff-generate-btn')).toBeNull();
  });
  it('emits generate when the Generate button is clicked', async () => {
    const el = await make({ field: 'Description', 'before-empty': 'No description', after: '', generatable: '' });
    let fired = false; el.addEventListener('generate', () => { fired = true; });
    (el.querySelector('.diff-generate-btn') as HTMLButtonElement).click();
    expect(fired).toBe(true);
  });
  it('multiline renders a textarea', async () => {
    const el = await make({ field: 'Description', before: 'x', after: 'y', multiline: '' });
    expect(el.querySelector('textarea')).not.toBeNull();
  });
  it('multiline renders a textarea in the empty state too', async () => {
    const el = await make({ field: 'Description', 'before-empty': 'No description', after: '', multiline: '' });
    expect(el.querySelector('.diff-empty-body textarea')).not.toBeNull();
  });
  it('staged attr adds .staged', async () => {
    const el = await make({ field: 'X', before: 'w', after: 'y', staged: '' });
    expect(el.querySelector('.diff-row')?.classList.contains('staged')).toBe(true);
  });
  it('emits edit on input', async () => {
    const el = await make({ field: 'X', before: 'w', after: 'y' });
    let v = ''; el.addEventListener('edit', (e: any) => { v = e.detail; });
    const inp = el.querySelector('.diff-cell.after input') as HTMLInputElement;
    inp.value = 'z'; inp.dispatchEvent(new Event('input', { bubbles: true }));
    expect(v).toBe('z');
  });
  it('emits edit on input in the empty state too', async () => {
    const el = await make({ field: 'X', 'before-empty': 'No value', after: '' });
    let v = ''; el.addEventListener('edit', (e: any) => { v = e.detail; });
    const inp = el.querySelector('.diff-empty-body input') as HTMLInputElement;
    inp.value = 'z'; inp.dispatchEvent(new Event('input', { bubbles: true }));
    expect(v).toBe('z');
  });
});
