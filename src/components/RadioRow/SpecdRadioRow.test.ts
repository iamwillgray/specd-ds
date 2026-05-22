import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => { await import('./SpecdRadioRow.js'); });

describe('SpecdRadioRow', () => {
  it('renders .qf-replace-row button element', async () => {
    const el = document.createElement('specd-radio-row') as any;
    el.label = 'color/primary';
    document.body.appendChild(el);
    await el.updateComplete;
    const row = el.querySelector('.qf-replace-row');
    expect(row).not.toBeNull();
    expect(row?.tagName.toLowerCase()).toBe('button');
    el.remove();
  });

  it('has .qf-replace-radio span as first child of row', async () => {
    const el = document.createElement('specd-radio-row') as any;
    el.label = 'color/primary';
    document.body.appendChild(el);
    await el.updateComplete;
    const radio = el.querySelector('.qf-replace-radio');
    expect(radio).not.toBeNull();
    expect(radio?.tagName.toLowerCase()).toBe('span');
    el.remove();
  });

  it('renders name in .qf-replace-name and collection in .qf-replace-collection', async () => {
    const el = document.createElement('specd-radio-row') as any;
    el.label = 'color/brand/blue';
    el.collection = 'Semantic';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.qf-replace-name')?.textContent?.trim()).toBe('color/brand/blue');
    expect(el.querySelector('.qf-replace-collection')?.textContent?.trim()).toContain('Semantic');
    el.remove();
  });

  it('renders color swatch AFTER the body (swatch on right)', async () => {
    const el = document.createElement('specd-radio-row') as any;
    el.label = 'color/blue';
    el.color = '#3b82f6';
    document.body.appendChild(el);
    await el.updateComplete;
    const row = el.querySelector('.qf-replace-row');
    const swatch = el.querySelector('.qf-replace-swatch');
    const body = el.querySelector('.qf-replace-body');
    expect(swatch).not.toBeNull();
    const children = Array.from(row!.children);
    expect(children.indexOf(swatch as Element)).toBeGreaterThan(children.indexOf(body as Element));
    el.remove();
  });

  it('renders hex in .qf-modal-hex when hex prop is set', async () => {
    const el = document.createElement('specd-radio-row') as any;
    el.label = 'color/blue';
    el.collection = 'Semantic';
    el.hex = '#3B82F6';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.qf-modal-hex')?.textContent?.trim()).toBe('#3B82F6');
    el.remove();
  });

  it('adds .selected class when checked=true', async () => {
    const el = document.createElement('specd-radio-row') as any;
    el.label = 'color/primary';
    el.checked = true;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.qf-replace-row')?.classList.contains('selected')).toBe(true);
    el.remove();
  });

  it('fires specd-change with value on click', async () => {
    const el = document.createElement('specd-radio-row') as any;
    el.value = 'opt-1';
    el.label = 'Option 1';
    document.body.appendChild(el);
    await el.updateComplete;
    let detail: any = null;
    el.addEventListener('specd-change', (e: any) => { detail = e.detail; });
    el.querySelector('.qf-replace-row').click();
    await el.updateComplete;
    expect(detail?.value).toBe('opt-1');
    el.remove();
  });

  it('does NOT render a type chip (no .qf-type-tag)', async () => {
    const el = document.createElement('specd-radio-row') as any;
    el.label = 'color/primary';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.qf-type-tag')).toBeNull();
    el.remove();
  });
});
