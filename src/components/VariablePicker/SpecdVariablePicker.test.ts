import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('../RadioRow/SpecdRadioRow.js');
  await import('./SpecdVariablePicker.js');
});

const OPTS = JSON.stringify([
  { id: 'v1', name: 'color/primary/navy', collection: 'Brand', color: '#0C1750' },
  { id: 'v2', name: 'color/lime/400',     collection: 'Primitives', color: '#b8ff57' },
]);

const SUGG = JSON.stringify([
  { id: 'v1', name: 'color/primary/navy', collection: 'Brand', color: '#0C1750' },
]);

describe('SpecdVariablePicker', () => {
  it('renders nothing when open=false', async () => {
    const el = document.createElement('specd-variable-picker') as any;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.variable-picker-modal')).toBeNull();
    el.remove();
  });

  it('renders modal when open=true', async () => {
    const el = document.createElement('specd-variable-picker') as any;
    el.open = true;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.variable-picker-modal')).not.toBeNull();
    el.remove();
  });

  it('renders .vp-search input', async () => {
    const el = document.createElement('specd-variable-picker') as any;
    el.open = true;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.vp-search')).not.toBeNull();
    el.remove();
  });

  it('renders specd-radio-row per option (flat list when no suggestions)', async () => {
    const el = document.createElement('specd-variable-picker') as any;
    el.open = true;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelectorAll('specd-radio-row').length).toBe(2);
    el.remove();
  });

  it('renders Suggested and All Variables sections when suggestions provided', async () => {
    const el = document.createElement('specd-variable-picker') as any;
    el.open = true;
    el.options = OPTS;
    el.suggestions = SUGG;
    document.body.appendChild(el);
    await el.updateComplete;
    const headers = el.querySelectorAll('.vp-section-title');
    const titles = Array.from(headers).map((h: any) => h.textContent.trim());
    expect(titles).toContain('Suggested');
    expect(titles).toContain('All Variables');
    el.remove();
  });

  it('section meta shows correct count', async () => {
    const el = document.createElement('specd-variable-picker') as any;
    el.open = true;
    el.options = OPTS;
    el.suggestions = SUGG;
    document.body.appendChild(el);
    await el.updateComplete;
    const metas = el.querySelectorAll('.vp-section-meta');
    expect(metas[0]?.textContent?.trim()).toBe('1 result');
    expect(metas[1]?.textContent?.trim()).toBe('2 results');
    el.remove();
  });

  it('filters options by search query', async () => {
    const el = document.createElement('specd-variable-picker') as any;
    el.open = true;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    const input = el.querySelector('.vp-search') as HTMLInputElement;
    input.value = 'navy';
    input.dispatchEvent(new Event('input'));
    await el.updateComplete;
    expect(el.querySelectorAll('specd-radio-row').length).toBe(1);
    el.remove();
  });

  it('fires specd-pick when specd-radio-row fires specd-change', async () => {
    const el = document.createElement('specd-variable-picker') as any;
    el.open = true;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    let detail: any = null;
    el.addEventListener('specd-pick', (e: any) => { detail = e.detail; });
    el.querySelectorAll('specd-radio-row')[0].dispatchEvent(
      new CustomEvent('specd-change', { detail: { value: 'v1' }, bubbles: true })
    );
    expect(detail?.id).toBe('v1');
    el.remove();
  });

  it('fires specd-close when close button clicked', async () => {
    const el = document.createElement('specd-variable-picker') as any;
    el.open = true;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    let fired = false;
    el.addEventListener('specd-close', () => { fired = true; });
    el.querySelector('.vp-close').click();
    expect(fired).toBe(true);
    el.remove();
  });
});
