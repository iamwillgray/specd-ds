import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => { await import('./SpecdQfReplaceRow.js'); });

describe('SpecdQfReplaceRow', () => {
  it('renders .qf-replace-row label', async () => {
    const el = document.createElement('specd-qf-replace-row') as any;
    el.label = 'color/primary';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.qf-replace-row')).not.toBeNull();
    el.remove();
  });

  it('renders color swatch when color is set', async () => {
    const el = document.createElement('specd-qf-replace-row') as any;
    el.color = '#b8ff57';
    el.label = 'lime';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.qf-replace-swatch')).not.toBeNull();
    el.remove();
  });

  it('renders type tag when type is set', async () => {
    const el = document.createElement('specd-qf-replace-row') as any;
    el.type = 'semantic';
    el.label = 'color/primary';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.qf-type-tag')?.textContent?.trim()).toBe('semantic');
    el.remove();
  });

  it('fires specd-change event on selection', async () => {
    const el = document.createElement('specd-qf-replace-row') as any;
    el.name = 'var-pick';
    el.value = 'opt1';
    el.label = 'Option 1';
    document.body.appendChild(el);
    await el.updateComplete;
    let detail: any = null;
    el.addEventListener('specd-change', (e: any) => { detail = e.detail; });
    el.querySelector('.qf-replace-radio').dispatchEvent(new Event('change', { bubbles: true }));
    await el.updateComplete;
    expect(detail?.value).toBe('opt1');
    el.remove();
  });
});
